import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, realpathSync, rmSync, mkdirSync, readFileSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { resolve, join } from 'node:path';
import { spawnSync } from 'node:child_process';
const root = resolve(import.meta.dirname, '../../..');
test('two documented commands install a standalone plugin with working CLI and hooks', t => {
  const home = mkdtempSync(join(realpathSync(tmpdir()), 'harness-plugin-'));
  t.after(() => rmSync(home, { recursive: true, force: true }));
  const env = { ...process.env, CODEX_HOME: home };
  for (const args of [['plugin', 'marketplace', 'add', root, '--json'], ['plugin', 'add', 'design-harness@bugmap-design', '--json']]) {
    const result = spawnSync('codex', args, { env, encoding: 'utf8', timeout: 30000 });
    assert.equal(result.status, 0, result.stderr + result.stdout);
  }
  function find(path, name) {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      if (entry.isFile() && entry.name === name) return join(path, entry.name);
      if (entry.isDirectory()) { const found = find(join(path, entry.name), name); if (found) return found; }
    }
  }
  const manifest = find(join(home, 'plugins/cache'), 'plugin.json'); assert.ok(manifest);
  const plugin = resolve(manifest, '..');
  const other = join(home, 'other-project'); mkdirSync(other);
  const cli = spawnSync(process.execPath, [join(plugin, 'bin/design-harness'), 'check', '--project', 'other', '--root', other, '--json'], { encoding: 'utf8' });
  assert.equal(cli.status, 1, cli.stderr); assert.equal(JSON.parse(cli.stdout).currentStage, 'prd');
  const hooks = JSON.parse(readFileSync(join(plugin, 'hooks/hooks.json')));
  const result = spawnSync(process.execPath, [join(plugin, 'hooks/run.mjs'), 'PreToolUse'], { cwd: other, input: JSON.stringify({ cwd: other, tool_name: 'mcp__figma__use_figma', tool_input: { fileKey: 'X' } }), encoding: 'utf8' });
  assert.equal(JSON.parse(result.stdout).hookSpecificOutput.permissionDecision, 'deny');
  for (const event of ['PreToolUse', 'PostToolUse', 'Stop']) {
    const command = hooks.hooks[event][0].hooks[0].command;
    const executed = spawnSync('/bin/sh', ['-c', command], { cwd: other, env: { ...env, PLUGIN_ROOT: plugin }, input: JSON.stringify({ cwd: other, tool_name: 'mcp__figma__use_figma', tool_input: { fileKey: 'X' } }), encoding: 'utf8' });
    assert.equal(executed.status, 0, executed.stderr);
    const output = JSON.parse(executed.stdout);
    if (event === 'PreToolUse') assert.equal(output.hookSpecificOutput.permissionDecision, 'deny');
    if (event === 'PostToolUse') assert.match(output.hookSpecificOutput.additionalContext, /nodes.json/);
    if (event === 'Stop') assert.deepEqual(output, {});
  }
  assert.ok(readFileSync(join(plugin, 'skills/design-flow/SKILL.md'), 'utf8').length);
});
