import { fillPipeline } from './fixtures.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import { realpathSync, mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync, existsSync, symlinkSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const cli = fileURLToPath(new URL('../bin/design-harness', import.meta.url));
function fixture(t) {
  const root = mkdtempSync(join(realpathSync(tmpdir()), 'design-harness-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const project = join(root, 'work', 'demo');
  function put(path, content = path.endsWith('.json') ? '{}' : 'evidence\n') {
    mkdirSync(join(project, path, '..'), { recursive: true });
    writeFileSync(join(project, path), content);
  }
  function run(...args) {
    return spawnSync(process.execPath, [cli, ...args, '--root', root, '--project', 'demo'], { encoding: 'utf8' });
  }
  function check() {
    const result = run('check', '--json');
    assert.ok([0, 1].includes(result.status), result.stderr);
    return JSON.parse(result.stdout);
  }
  function approve(stage) {
    const result = run('approve', String(stage), '--by', '민수');
    assert.equal(result.status, 0, result.stderr);
  }
  function fill() { fillPipeline(project); }
  return { root, project, put, run, check, approve, fill };
}

test('check reports first missing stage and never creates files', t => {
  const f = fixture(t);
  const result = f.check();
  assert.equal(result.currentStage, 'prd');
  assert.ok(result.stages[0].issues.some(s => s.includes('01-prd/PRD.md')));
  assert.equal(result.stages[1].status, 'blocked');
  assert.equal(existsSync(f.project), false);
});

test('approve records author, time and SHA-256 then advances through automatic stages', t => {
  const f = fixture(t); f.fill();
  assert.equal(f.check().currentStage, 'prd');
  f.approve('prd');
  const log = JSON.parse(readFileSync(join(f.project, 'control/approvals.json')));
  const entry = log.approvals[0];
  assert.equal(entry.by, '민수');
  assert.ok(Number.isFinite(Date.parse(entry.at)));
  assert.match(entry.files['01-prd/PRD.md'], /^[a-f0-9]{64}$/);
  assert.equal(f.check().currentStage, 'wireframes');
  assert.equal(f.check().stages[1].status, 'passed');
});

test('all mandatory approvals are needed before completion; check is read only', t => {
  const f = fixture(t); f.fill();
  for (const n of [1, 4, 5, 7]) f.approve(n);
  assert.equal(f.check().currentStage, 'handoff');
  assert.equal(f.run('handoff', '--force').status, 0);
  f.approve(8);
  const before = readFileSync(join(f.project, 'control/approvals.json'), 'utf8');
  assert.equal(f.check().currentStage, null);
  assert.equal(f.run('check').status, 0);
  assert.equal(readFileSync(join(f.project, 'control/approvals.json'), 'utf8'), before);
});

for (const mutation of ['edit', 'add', 'delete']) {
  test(`${mutation} after approval invalidates it and blocks downstream`, t => {
    const f = fixture(t); f.fill(); f.approve(1); f.approve(4);
    if (mutation === 'edit') f.put('01-prd/PRD.md', 'changed');
    if (mutation === 'add') f.put('01-prd/notes.md', 'new input');
    if (mutation === 'delete') rmSync(join(f.project, '01-prd/PRD.md'));
    assert.equal(f.check().currentStage, 'prd');
    assert.equal(f.check().stages[0].status, 'needs_revision');
    assert.equal(f.check().stages[3].status, 'blocked');
    assert.notEqual(f.run('approve', '5', '--by', '민수').status, 0);
  });
}

test('reapproval preserves history and forces downstream reapproval even for identical bytes', t => {
  const f = fixture(t); f.fill(); f.approve(1); f.approve(4); f.approve(1);
  const result = f.check();
  assert.equal(result.currentStage, 'wireframes');
  assert.equal(result.stages[3].status, 'needs_revision');
  assert.equal(JSON.parse(readFileSync(join(f.project, 'control/approvals.json'))).approvals.length, 3);
});

test('empty required files, malformed JSON and empty capture directories do not pass', t => {
  const f = fixture(t); f.fill();
  f.put('01-prd/PRD.md', '   ');
  assert.notEqual(f.run('approve', '1', '--by', '민수').status, 0);
  f.put('01-prd/PRD.md'); f.approve(1);
  rmSync(join(f.project, '04-wireframes/captures/map/default.png'));
  assert.ok(f.check().stages[3].issues.some(s => s.includes('captures')));
  f.put('05-design-system/tokens.json', '{');
  assert.ok(f.check().stages[4].issues.some(s => s.includes('tokens.json')));
});

test('invalid arguments and corrupt approval history fail without overwriting it', t => {
  const f = fixture(t); f.fill();
  for (const args of [ ['approve', '1'], ['approve', '9', '--by', '민수'], ['approve', '1', '--by', '  '], ['check', '--wat'], ['check', '--project', '../escape'] ]) {
    assert.notEqual(f.run(...args).status, 0);
  }
  for (const content of ['{', '{}', '{"version":1,"approvals":[{}]}']) {
    f.put('control/approvals.json', content);
    const result = f.run('approve', '1', '--by', '민수');
    assert.notEqual(result.status, 0);
    assert.equal(readFileSync(join(f.project, 'control/approvals.json'), 'utf8'), content);
  }
});

test('symlink artifacts and symlink control directory are rejected', t => {
  const f = fixture(t); f.fill();
  const outside = join(f.root, 'outside.md'); writeFileSync(outside, 'outside');
  rmSync(join(f.project, '01-prd/PRD.md'));
  symlinkSync(outside, join(f.project, '01-prd/PRD.md'));
  assert.ok(f.check().stages[0].issues.some(s => s.includes('symlink')));
  assert.notEqual(f.run('approve', '1', '--by', '민수').status, 0);
  f.put('control/approvals.json', '{"version":1,"approvals":[]}');
  rmSync(join(f.project, 'control'), { recursive: true });
  symlinkSync(f.root, join(f.project, 'control'));
  assert.notEqual(f.run('approve', '1', '--by', '민수').status, 0);
  assert.equal(existsSync(join(f.root, 'approvals.json')), false);
});

test('common input changes invalidate approvals but future-stage changes do not', t => {
  const f = fixture(t); f.fill(); f.approve(1);
  f.put('08-handoff/open-items.md', 'future edit');
  assert.equal(f.check().currentStage, 'wireframes');
  f.put('control/decisions.md', 'scope changed');
  assert.equal(f.check().stages[0].status, 'needs_revision');
});

test('automatic stage edits invalidate later approvals without invalidating PRD', t => {
  const f = fixture(t); f.fill(); f.approve(1); f.approve(4);
  f.put('02-research/findings.md', 'new findings');
  const report = f.check();
  assert.equal(report.stages[0].status, 'passed');
  assert.equal(report.stages[3].status, 'needs_revision');
  f.approve(4);
  assert.equal(f.check().currentStage, 'design-system');
});

test('an existing approval lock prevents writes and is not removed by another writer', t => {
  const f = fixture(t); f.fill();
  f.put('control/.approvals.lock', 'other writer');
  const result = f.run('approve', '1', '--by', '민수');
  assert.equal(result.status, 2);
  assert.equal(existsSync(join(f.project, 'control/approvals.json')), false);
  assert.equal(readFileSync(join(f.project, 'control/.approvals.lock'), 'utf8'), 'other writer');
});

test('project path traversal and symlink project roots fail before reading approvals', t => {
  const f = fixture(t); f.fill();
  const result = spawnSync(process.execPath, [cli, 'check', '--project', '../escape', '--root', f.root], { encoding: 'utf8' });
  assert.equal(result.status, 2);
  assert.match(result.stderr, /project ID/);
  rmSync(f.project, { recursive: true });
  symlinkSync(f.root, f.project);
  assert.equal(f.run('check').status, 2);
});

test('corrupt approval history makes check fail and never resets to unapproved', t => {
  const f = fixture(t); f.fill(); f.put('control/approvals.json', 'null');
  assert.equal(f.run('check', '--json').status, 2);
  assert.equal(readFileSync(join(f.project, 'control/approvals.json'), 'utf8'), 'null');
});
