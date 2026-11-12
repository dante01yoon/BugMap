import { check } from './harness.mjs';
import { handoffDocument } from './handoff-document.mjs';
import { evidence, stringify, writeBundle } from './io.mjs';
export function createHandoff(base, options) {
  const report = check(base);
  const blocked = report.stages.slice(0, 7).find(stage => stage.status !== 'passed');
  if (blocked) throw new Error(`Cannot handoff: ${blocked.stage} has not passed (${blocked.issues.join('; ')})`);
  const approvals = report.stages[6].upstreamApprovals;
  const { inputs, content } = handoffDocument(base, approvals);
  const outputs = { '08-handoff/HANDOFF.md': content };
  const manifest = { ...evidence('handoff', inputs, outputs), approvals };
  writeBundle(base, { ...outputs, '08-handoff/manifest.json': stringify(manifest) }, options.force);
  return manifest;
}
