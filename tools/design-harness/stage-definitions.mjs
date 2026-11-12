// Directory requirements end in '/'. All files in each stage enter its snapshot,
// including optional files, so additions and removals change approval validity.
export const stages = [
  { id: 'prd', dir: '01-prd', approval: true, files: ['PRD.md', 'requirements.csv'] },
  { id: 'research', dir: '02-research', files: ['sources.md', 'findings.md', 'recommendations.md', 'refs.json', 'captures.json'] },
  { id: 'structure', dir: '03-structure', files: ['screens.csv', 'flows.mmd', 'states.csv'] },
  { id: 'wireframes', dir: '04-wireframes', approval: true, files: ['review.md', 'wireframes.json', 'wireframes-report.json', 'captures/'] },
  { id: 'design-system', dir: '05-design-system', approval: true, files: ['tokens.json', 'components.json', 'copy.json', 'DESIGN.md', 'design-md.json', 'icons.csv', 'preview.svg', 'captures/'] },
  { id: 'figma', dir: '06-figma', files: ['node-map.json', 'change-log.md', 'captures/'] },
  { id: 'validation', dir: '07-validation', approval: true, files: ['coverage.csv', 'report.md', 'issues.csv', 'web-lint.json', 'reviews.json', 'captures/'] },
  { id: 'handoff', dir: '08-handoff', approval: true, files: ['HANDOFF.md', 'implementation-notes.md', 'assets/', 'manifest.json', 'open-items.md'] },
];
