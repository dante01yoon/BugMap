import { verifyFigma } from './figma.mjs';
import { refs, wireframes, design, viewports } from './contracts.mjs';
import { designMarkdown, renderWireframe } from './documents.mjs';
import { read, hashes, verifyEvidence, pngSize, sha256, same } from './io.mjs';
import { webInputs } from './snapshots.mjs';
import { verifyReview } from './reviews.mjs';
import { handoffDocument } from './handoff-document.mjs';
export const webCapturePath = (html, size) => `07-validation/captures/${sha256(html).slice(0, 12)}-${size.width}x${size.height}.png`;
function checkPNG(base, path, expected) {
  const actual = pngSize(read(base, path));
  if (!same(actual, expected)) throw new Error(`Capture viewport mismatch: ${path}`);
}
export function inspectStage(base, stage, approvals) {
  try {
    if (stage.id === 'research') {
      const references = refs(base);
      const outputs = references.map(r => `02-research/captures/${r.id}.png`);
      const report = verifyEvidence(base, '02-research/captures.json', 'refs:capture', hashes(base, ['02-research/refs.json']), outputs);
      if (!Array.isArray(report.references) || report.references.length !== references.length) throw new Error('Incomplete reference capture coverage');
      references.forEach((r, i) => {
        const actual = report.references[i];
        if (actual.id !== r.id || actual.url !== r.url || !same(actual.viewport, r.viewport)
          || !['http:', 'https:'].includes(new URL(actual.finalUrl).protocol)) throw new Error(`Reference capture metadata mismatch: ${r.id}`);
        checkPNG(base, outputs[i], r.viewport);
      });
    } else if (stage.id === 'wireframes') {
      const screens = wireframes(base);
      const outputs = screens.flatMap(s => [`04-wireframes/${s.id}/${s.state}.svg`, `04-wireframes/captures/${s.id}/${s.state}.png`]);
      verifyEvidence(base, '04-wireframes/wireframes-report.json', 'wireframe', hashes(base, ['04-wireframes/wireframes.json']), outputs);
      for (const s of screens) {
        if (read(base, `04-wireframes/${s.id}/${s.state}.svg`).toString() !== renderWireframe(s)) throw new Error('Wireframe SVG differs from source JSON');
        checkPNG(base, `04-wireframes/captures/${s.id}/${s.state}.png`, { width: s.width, height: s.height });
      }
    } else if (stage.id === 'design-system') {
      const { inputs } = design(base);
      verifyEvidence(base, '05-design-system/design-md.json', 'design-md', inputs, ['05-design-system/DESIGN.md']);
      if (read(base, '05-design-system/DESIGN.md').toString() !== designMarkdown(base)) throw new Error('DESIGN.md differs from source JSON');
    } else if (stage.id === 'figma') {
      verifyFigma(base);
    } else if (stage.id === 'validation') {
      const { html, inputs } = webInputs(base);
      const sizes = viewports(base);
      const paths = html.flatMap(path => sizes.map(v => webCapturePath(path, v)));
      const report = verifyEvidence(base, '07-validation/web-lint.json', 'lint:web', inputs, paths);
      if (report.minTarget !== 44 || !Array.isArray(report.runs) || report.runs.length !== paths.length) throw new Error('Incomplete web lint coverage');
      let i = 0;
      for (const path of html) for (const size of sizes) {
        const run = report.runs[i++];
        if (run.html !== path || !same(run.viewport, size) || run.capture !== webCapturePath(path, size)
          || !Array.isArray(run.issues) || run.issues.length) throw new Error(`Web lint failed or incomplete: ${path}`);
        checkPNG(base, run.capture, size);
      }
      verifyReview(base, 'validation');
    } else if (stage.id === 'handoff') {
      const expected = handoffDocument(base, approvals);
      const report = verifyEvidence(base, '08-handoff/manifest.json', 'handoff', expected.inputs, ['08-handoff/HANDOFF.md']);
      if (!same(report.approvals, approvals) || read(base, '08-handoff/HANDOFF.md').toString() !== expected.content) throw new Error('Stale HANDOFF.md or approval versions');
    }
    return [];
  } catch (error) { return [`${stage.id}: ${error.message}`]; }
}
