import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { Client } from '/Users/mac/Documents/cursor-talk-to-figma-mcp/node_modules/@modelcontextprotocol/sdk/dist/esm/client/index.js';
import { StdioClientTransport } from '/Users/mac/Documents/cursor-talk-to-figma-mcp/node_modules/@modelcontextprotocol/sdk/dist/esm/client/stdio.js';
import { runHook } from '../../../../tools/design-harness/hooks/policy.mjs';

const base = new URL('../', import.meta.url);
const read = async name => JSON.parse(await readFile(new URL(name, base), 'utf8'));
const save = async (name, value) => writeFile(new URL(name, base), JSON.stringify(value, null, 2) + '\n');
const target = await read('../control/figma.json');
const map = await read('node-map.json');
const components = await read('component-ledger.json');
const plan = [
  { root: '72:325', width: 173, buttons: ['72:380', '72:382'] },
  { root: '72:450', width: 173, buttons: ['72:505', '72:507'] },
  { root: '72:930', width: 158, buttons: ['72:985', '72:987'] },
  { root: '72:1055', width: 158, buttons: ['72:1110', '72:1112'] },
];
const guard = runHook('PreToolUse', {
  cwd: process.cwd(), tool_name: 'mcp__talk_to_figma__resize_node',
  tool_input: { fileKey: target.fileKey, nodeIds: plan.flatMap(p => p.buttons) },
});
if (guard.hookSpecificOutput?.permissionDecision === 'deny') throw new Error(JSON.stringify(guard));
const log = { startedAt: new Date().toISOString(), fileKey: target.fileKey, pageId: target.pageId,
  channel: 't0852evy', guard, identityLimitation: 'Talk does not expose fileKey; page/root identity is compared with preserved roots and creation ledgers.',
  calls: [], mutatedNodeIds: [], captures: [], fullRawExportSupported: false };
const client = new Client({ name: 'bugmap-login-repair', version: '1.0.0' });
const transport = new StdioClientTransport({ command: '/Users/mac/.bun/bin/bun', args: ['/Users/mac/Documents/cursor-talk-to-figma-mcp/dist/server.js'], stderr: 'pipe' });
async function call(name, args) {
  const result = await client.callTool({ name, arguments: args });
  const error = result.isError || result.content?.some(c => c.type === 'text' && /^Error\b/.test(c.text));
  if (error) throw new Error(JSON.stringify(result));
  return result;
}
function data(result) { return JSON.parse(result.content.find(c => c.type === 'text').text); }
function walk(n, out = []) { out.push(n); for (const c of n.children ?? []) walk(c, out); return out; }
await mkdir(new URL('captures/talk/', base), { recursive: true });
try {
  await client.connect(transport);
  await new Promise(resolve => setTimeout(resolve, 1200));
  const joined = await call('join_channel', { channel: log.channel });
  log.calls.push({ tool: 'join_channel', result: joined });
  const doc = data(await call('get_document_info', {}));
  if (doc.id !== target.pageId) throw new Error('Page identity mismatch');
  const expected = [...target.preserveNodeIds, ...components.rootIds, ...map.nodes.map(n => n.nodeId)];
  if (expected.some(id => !doc.children.some(n => n.id === id))) throw new Error('Root identity mismatch');
  log.identity = { document: doc, expectedRootIds: expected, allExpectedRootsPresent: true };
  await save('talk-repair-log.json', log);
  for (const p of plan) {
    const before = data(await call('get_node_info', { nodeId: p.root }));
    const nodes = walk(before);
    if (before.type !== 'FRAME' || p.buttons.some(id => !nodes.some(n => n.id === id && n.type === 'INSTANCE' && /^recovery \/ (primary|secondary)$/.test(n.name)))) throw new Error('Repair node identity mismatch');
    await save(`talk-before-${p.root.replace(':', '-')}.json`, before);
    for (const id of p.buttons) {
      const result = await call('resize_node', { nodeId: id, width: p.width, height: 48 });
      log.calls.push({ tool: 'resize_node', arguments: { nodeId: id, width: p.width, height: 48 }, result });
      log.mutatedNodeIds.push(id);
      await save('talk-repair-log.json', log);
    }
    const after = data(await call('get_node_info', { nodeId: p.root }));
    const afterNodes = walk(after);
    const bounds = p.buttons.map(id => ({ id, ...afterNodes.find(n => n.id === id)?.absoluteBoundingBox }));
    if (bounds.some(b => Math.abs(b.width - p.width) > .001 || Math.abs(b.height - 48) > .001)) throw new Error(`Bounds mismatch ${JSON.stringify(bounds)}`);
    await save(`talk-after-${p.root.replace(':', '-')}.json`, after);
    log.calls.push({ verification: 'get_node_info', root: p.root, bounds });
    await save('talk-repair-log.json', log);
  }
  for (const n of map.nodes) {
    const result = await call('export_node_as_image', { nodeId: n.nodeId, format: 'PNG', scale: 1 });
    const img = result.content.find(c => c.type === 'image' && c.mimeType === 'image/png');
    if (!img) throw new Error('PNG not returned');
    const bytes = Buffer.from(img.data, 'base64');
    if (bytes.toString('hex', 0, 8) !== '89504e470d0a1a0a') throw new Error('Invalid PNG');
    const width = bytes.readUInt32BE(16), height = bytes.readUInt32BE(20);
    if (width !== n.width || height !== n.height) throw new Error('Unexpected PNG size');
    const path = `captures/talk/${n.nodeId.replace(':', '-')}.png`;
    await writeFile(new URL(path, base), bytes);
    log.captures.push({ nodeId: n.nodeId, screen: n.screen, state: n.state, path, width, height, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex'), source: 'Talk To Figma export_node_as_image scale=1', capturedAt: new Date().toISOString() });
    await save('talk-repair-log.json', log);
    console.log(JSON.stringify({ capture: path, width, height }));
  }
  log.endedAt = new Date().toISOString();
  log.status = 'recovery-repaired; full-raw-export-and-loader-binding-blocked';
  await save('talk-repair-log.json', log);
  console.log(JSON.stringify({ mutatedNodeIds: log.mutatedNodeIds, captures: log.captures.length, status: log.status }));
} catch (error) {
  log.failure = String(error); await save('talk-repair-log.json', log); throw error;
} finally { await client.close(); }
