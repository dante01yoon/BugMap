import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, realpathSync, mkdirSync, writeFileSync, rmSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';
import { fillPipeline } from './fixtures.mjs';
const cli = fileURLToPath(new URL('../bin/design-harness', import.meta.url));
const hook = fileURLToPath(new URL('../hooks/run.mjs', import.meta.url));
function fixture(t) {
  const root = mkdtempSync(join(realpathSync(tmpdir()), 'figma-guard-'));
  t.after(() => rmSync(root, { recursive: true, force: true }));
  const base = join(root, 'work/demo'); fillPipeline(base);
  const put = (p, v) => { mkdirSync(join(base, p, '..'), { recursive: true }); writeFileSync(join(base, p), typeof v === 'string' ? v : JSON.stringify(v)); };
  const run = (...a) => spawnSync(process.execPath, [cli, ...a, '--root', root, '--project', 'demo'], { encoding: 'utf8' });
  const invoke = (event, extra = {}) => {
    const r = spawnSync(process.execPath, [hook, event], { cwd: root, input: JSON.stringify({ cwd: root, hook_event_name: event, tool_name: 'mcp__codex_apps__figma__use_figma', tool_input: { fileKey: 'DemoFile' }, ...extra }), encoding: 'utf8' });
    assert.equal(r.status, 0, r.stderr); return JSON.parse(r.stdout);
  };
  const approve = () => { for (const s of [1, 4, 5]) assert.equal(run('approve', String(s), '--by', 'fixture human').status, 0); };
  return { root, base, put, run, invoke, approve };
}
test('lint:figma validates actual node data and check rejects stale or failed lint', t => {
  const f = fixture(t);
  let r = f.run('lint:figma', '--force', '--json'); assert.equal(r.status, 0, r.stderr);
  const data = JSON.parse(readFileSync(join(f.base, '06-figma/nodes.json')));
  data.nodes[0].children = [{ id: '2:1', type: 'TEXT', name: 'Bad copy', width: 80, height: 30, characters: '무조건 성공', fontSize: 13, fills: [{ type: 'SOLID', color: { r: 1, g: 0, b: 0 } }] }];
  f.put('06-figma/nodes.json', data);
  r = f.run('check', '--json'); assert.match(r.stdout, /Stale.*figma/i);
  r = f.run('lint:figma', '--force', '--json'); assert.equal(r.status, 1, r.stderr);
  assert.match(r.stdout, /forbidden-copy/); assert.match(r.stdout, /font-size/); assert.match(r.stdout, /color/);
});
test('Figma writes require valid system approval and exact configured file', t => {
  const f = fixture(t);
  assert.equal(f.invoke('PreToolUse').hookSpecificOutput.permissionDecision, 'deny');
  f.approve();
  assert.equal(f.invoke('PreToolUse').hookSpecificOutput?.permissionDecision, undefined);
  for (const input of [{ fileKey: 'OtherFile' }, {}, { fileKey: 'DemoFile', file_key: 'OtherFile' }]) {
    assert.equal(f.invoke('PreToolUse', { tool_input: input }).hookSpecificOutput.permissionDecision, 'deny');
  }
  f.put('control/figma.json', { fileKey: 'OtherFile', pageId: '0:1' });
  assert.equal(f.invoke('PreToolUse', { tool_input: { fileKey: 'OtherFile' } }).hookSpecificOutput.permissionDecision, 'deny');
});
test('read-only tools pass; unknown Figma writes and file creation fail closed', t => {
  const f = fixture(t);
  assert.deepEqual(f.invoke('PreToolUse', { tool_name: 'mcp__figma__get_metadata', tool_input: {} }), {});
  assert.equal(f.invoke('PreToolUse', { tool_name: 'mcp__figma__create_new_file', tool_input: {} }).hookSpecificOutput.permissionDecision, 'deny');
  f.approve();
  assert.equal(f.invoke('PreToolUse', { tool_name: 'mcp__figma__future_write', tool_input: {} }).hookSpecificOutput.permissionDecision, 'deny');
});
test('post write prompts fresh node export and Stop runs check without approval loops', t => {
  const f = fixture(t);
  assert.match(f.invoke('PostToolUse').hookSpecificOutput.additionalContext, /nodes.json/);
  const stop = f.invoke('Stop'); assert.match(stop.systemMessage, /prd/); assert.equal(stop.decision, undefined);
  assert.equal(f.invoke('Stop', { stop_hook_active: true }).decision, undefined);
  f.approve();
  f.put('05-design-system/preview.svg', 'changed');
  assert.equal(f.invoke('PreToolUse').hookSpecificOutput.permissionDecision, 'deny');
});
test('missing target/export, wrong file, duplicate node IDs, incomplete map and symlinks fail', t => {
  const f = fixture(t);
  const original = readFileSync(join(f.base, '06-figma/nodes.json'), 'utf8');
  for (const data of [{}, { ...JSON.parse(original), fileKey: 'OtherFile' }, { ...JSON.parse(original), nodes: [] }, { ...JSON.parse(original), nodes: [...JSON.parse(original).nodes, ...JSON.parse(original).nodes] }]) {
    f.put('06-figma/nodes.json', data); assert.equal(f.run('lint:figma', '--force').status, 2);
  }
  f.put('06-figma/nodes.json', original);
  f.put('06-figma/node-map.json', { nodes: [{ screen: 'map', state: 'default', nodeId: '9:9' }] });
  assert.equal(f.run('lint:figma', '--force').status, 2);
});

test('hooks resolve subdirectories, reject ambiguity and malformed input, and accept target URLs', t => {
  const f = fixture(t); f.approve();
  const sub = join(f.root, 'src/deep'); mkdirSync(sub, { recursive: true });
  assert.deepEqual(f.invoke('PreToolUse', { cwd: sub, tool_input: { url: 'https://www.figma.com/design/DemoFile/Screen' } }), {});
  const second = join(f.root, 'work/second/control'); mkdirSync(second, { recursive: true }); writeFileSync(join(second, 'project.json'), '{}');
  assert.equal(f.invoke('PreToolUse').hookSpecificOutput.permissionDecision, 'deny');
  writeFileSync(join(f.root, '.design-harness.json'), JSON.stringify({ project: 'demo' }));
  assert.deepEqual(f.invoke('PreToolUse'), {});
  writeFileSync(join(f.root, '.design-harness.json'), '{');
  assert.equal(f.invoke('PreToolUse').hookSpecificOutput.permissionDecision, 'deny');
  const malformed = spawnSync(process.execPath, [hook, 'PreToolUse'], { input: '{', encoding: 'utf8' });
  assert.equal(malformed.status, 0); assert.equal(JSON.parse(malformed.stdout).hookSpecificOutput.permissionDecision, 'deny');
});

test('lint flags layout, components, touch targets and refuses symlink exports', async t => {
  const f = fixture(t), data = JSON.parse(readFileSync(join(f.base, '06-figma/nodes.json')));
  Object.assign(data.nodes[0], { name: 'Button', width: 20, height: 20, layoutMode: 'NONE', componentName: 'missing' });
  f.put('06-figma/nodes.json', data);
  const result = f.run('lint:figma', '--force', '--json'); assert.equal(result.status, 1, result.stderr);
  const rules = JSON.parse(result.stdout).issues.map(i => i.rule);
  for (const rule of ['auto-layout', 'component', 'touch-target']) assert.ok(rules.includes(rule));
  const { symlinkSync } = await import('node:fs');
  rmSync(join(f.base, '06-figma/nodes.json'));
  const outside = join(f.root, 'outside.json'); writeFileSync(outside, JSON.stringify(data));
  symlinkSync(outside, join(f.base, '06-figma/nodes.json'));
  assert.equal(f.run('lint:figma', '--force').status, 2);
});

test('Figma contracts reject numeric file keys and non-string export timestamps', t => {
  const f = fixture(t), original = JSON.parse(readFileSync(join(f.base, '06-figma/nodes.json')));
  f.put('control/figma.json', { fileKey: 123, pageId: '0:1' });
  f.put('06-figma/nodes.json', { ...original, fileKey: 123 });
  assert.equal(f.run('lint:figma', '--force').status, 2);
  f.put('control/figma.json', { fileKey: 'DemoFile', pageId: '0:1' });
  f.put('06-figma/nodes.json', { ...original, exportedAt: 1 });
  assert.equal(f.run('lint:figma', '--force').status, 2);
});
