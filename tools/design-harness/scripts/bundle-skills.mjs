// Deterministically package canonical repository skills; --check never writes.
import { readFileSync, readdirSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, relative, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const plugin = fileURLToPath(new URL('..', import.meta.url)), repo = resolve(plugin, '../..');
const check = process.argv.includes('--check');
function output(path, content) {
  if (check) {
    if (readFileSync(path, 'utf8') !== content) throw new Error(`Stale bundle: ${relative(plugin, path)}`);
  } else { mkdirSync(dirname(path), { recursive: true }); writeFileSync(path, content); }
}
function copy(from, to) {
  for (const entry of readdirSync(from, { withFileTypes: true })) {
    const source = join(from, entry.name), dest = join(to, entry.name);
    if (entry.isDirectory()) copy(source, dest);
    else {
      let content = readFileSync(source, 'utf8');
      content = content.replaceAll('node tools/design-harness/bin/design-harness', 'node <plugin-root>/bin/design-harness')
        .replaceAll('tools/design-harness/README.md', '<plugin-root>/README.md')
        .replaceAll('docs/design-harness.md', '<plugin-root>/README.md')
        .replaceAll('.codex/agents/', '<plugin-root>/roles/').replaceAll('.agents/skills/', '<plugin-root>/skills/');
      if (entry.name === 'SKILL.md') content += '\n플러그인 설치본에서는 이 SKILL.md의 `skills/<skill>/` 상위 디렉터리를 `<plugin-root>`로 사용한다. 명령의 `<plugin-root>`를 실제 절대 경로로 치환한다. 산출물은 대상 저장소 work/<project>/에 둔다. 패키지 roles/는 등록된 역할이 없을 때 읽는 지침이며 사용자 설정을 자동 변경하지 않는다.\n';
      if (dest.endsWith('design-figma/SKILL.md')) content += '\nFigma 작업 전에 [대상 설정·노드 내보내기·lint 계약](../../FIGMA.md)을 읽는다. 원격에서 다시 조회한 nodes.json과 node-map.json을 저장하고 lint:figma 및 check를 실행한다. 훅 신뢰는 사람이 직접 검토하며 우회하지 않는다.\n';
      output(dest, content);
    }
  }
}
for (const name of readdirSync(join(repo, '.agents/skills')).filter(n => n.startsWith('design-'))) copy(join(repo, '.agents/skills', name), join(plugin, 'skills', name));
copy(join(repo, '.codex/agents'), join(plugin, 'roles'));
console.log(check ? 'Plugin skill bundle is current' : 'Plugin skill bundle generated');
