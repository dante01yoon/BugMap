import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { strict as assert } from 'node:assert';

const directory = new URL('../assets/login/', import.meta.url);
const sources = JSON.parse(await readFile(new URL('sources.json', directory), 'utf8'));
const content = await readFile(new URL('../src/features/auth/loginContent.ts', import.meta.url), 'utf8');
const files = [];
for (const [name, source] of Object.entries(sources)) {
  const file = new URL(source.file, directory);
  const bytes = await readFile(file);
  assert.equal(bytes.subarray(1, 4).toString(), 'PNG', `${name}: invalid PNG`);
  assert(bytes.readUInt32BE(16) > 1 && bytes.readUInt32BE(20) > 1, `${name}: empty or clipped export`);
  assert.equal(bytes.readUInt32BE(16), source.pixelWidth, `${name}: unexpected width`);
  assert.equal(bytes.readUInt32BE(20), source.pixelHeight, `${name}: unexpected height`);
  assert(content.includes(`assets/login/${source.file}`), `${name}: missing app reference`);
  files.push({ name, node: source.figmaNode, pixels: `${bytes.readUInt32BE(16)}×${bytes.readUInt32BE(20)}`, path: fileURLToPath(file) });
}
console.table(files.map(({ path, ...entry }) => entry));
console.log(`Verified ${files.length} local Figma PNG assets and app references.`);
