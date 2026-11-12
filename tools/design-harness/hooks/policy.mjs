import { dirname, join, resolve } from 'node:path';
import { readdirSync } from 'node:fs';
import { check, projectPath } from '../harness.mjs';
import { figmaTarget } from '../figma.mjs';
import { json, safeStat } from '../io.mjs';

// Unknown Figma operations are treated as writes. use_figma can execute arbitrary JS.
const reads = new Set(['list_files', 'get_document', 'get_node', 'get_selection', 'get_styles', 'get_motion_styles', 'get_node_motion', 'save_screenshots', 'get_metadata', 'get_design_context', 'get_screenshot', 'get_variable_defs', 'search_design_system', 'get_code_connect_map', 'get_code_connect_suggestions', 'get_figma_data', 'get_file', 'get_nodes', 'export_nodes', 'get_status', 'get_session', 'create_session']);
export function isFigmaWrite(name) {
  if (typeof name !== 'string' || !/figma/i.test(name)) return false;
  const operation = name.split('__').at(-1).replace(/^figma_/, '');
  return !reads.has(operation);
}
export function locateProject(cwd) {
  let root = resolve(cwd);
  while (true) {
    const marker = join(root, '.design-harness.json');
    if (safeStat(marker)) {
      const config = json(root, '.design-harness.json');
      return { root, project: config.project, base: projectPath(root, config.project) };
    }
    const work = join(root, 'work');
    if (safeStat(work)?.isDirectory()) {
      const candidates = readdirSync(work).filter(id => safeStat(join(work, id))?.isDirectory() && safeStat(join(work, id, 'control/project.json'))?.isFile());
      if (candidates.length > 1) throw new Error('Multiple harness projects; select project in .design-harness.json');
      if (candidates.length === 1) return { root, project: candidates[0], base: projectPath(root, candidates[0]) };
    }
    // Do not accidentally select a parent repository's project.
    if (safeStat(join(root, '.git'))) return null;
    const parent = dirname(root); if (parent === root) return null; root = parent;
  }
}
function targetKeys(input) {
  const keys = [];
  function scan(value) {
    if (!value || typeof value !== 'object') return;
    for (const [name, child] of Object.entries(value)) {
      if (['fileKey', 'file_key', 'fileId', 'file_id'].includes(name)) keys.push(child);
      else if (['url', 'fileUrl', 'file_url', 'figmaUrl'].includes(name) && typeof child === 'string') {
        let url; try { url = new URL(child); } catch { throw new Error('Invalid Figma target URL'); }
        const match = url.pathname.match(/^\/(?:design|file|board|slides)\/([A-Za-z0-9_-]+)(?:\/|$)/);
        if (!['figma.com', 'www.figma.com'].includes(url.hostname) || !match) throw new Error('Invalid Figma target URL');
        keys.push(match[1]);
      } else if (typeof child === 'object') scan(child);
    }
  }
  scan(input); return keys;
}
const deny = reason => ({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: reason } });
export function runHook(event, input) {
  const writing = isFigmaWrite(input.tool_name);
  if (['PreToolUse', 'PostToolUse'].includes(event) && !writing) return {};
  if (event === 'PostToolUse') return { hookSpecificOutput: { hookEventName: event, additionalContext: 'Figma 호출 후 변경한 노드를 원격에서 다시 조회·내보내 06-figma/nodes.json과 node-map.json을 갱신하세요. 실제 캡처를 검수하고 lint:figma --force 및 check를 실행하세요. 실패한 호출은 부분 변경 여부를 확인하세요.' } };
  try {
    const location = locateProject(input.cwd ?? process.cwd());
    if (!location) {
      if (event === 'PreToolUse') return deny('No harness project configured. Set .design-harness.json and control/figma.json before Figma writes.');
      return {};
    }
    const report = check(location.base);
    if (event === 'Stop') {
      const current = report.stages.find(s => s.stage === report.currentStage);
      return { systemMessage: `design-harness check (${location.project}): ${report.currentStage ?? 'complete'}${current ? ` [${current.status}]: ${current.issues.join('; ')}` : ''}. 사람 review/approve를 대행하지 말고 현재 상태와 남은 작업을 답변에 명시하세요.` };
    }
    if (report.stages.find(s => s.stage === 'design-system')?.status !== 'passed') return deny('Design system approval missing or stale. A human must approve the current inputs before Figma writes.');
    const target = figmaTarget(location.base), keys = targetKeys(input.tool_input);
    if (!keys.length || keys.some(key => key !== target.fileKey)) return deny('Figma target missing, conflicting, or different from control/figma.json. File creation without a configured target is blocked.');
    return {};
  } catch (error) {
    return event === 'PreToolUse' ? deny(error.message) : { systemMessage: `design-harness check failed: ${error.message}. 완료로 보고하지 마세요.` };
  }
}
