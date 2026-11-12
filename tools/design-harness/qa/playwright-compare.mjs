// Optional QA only: install Playwright and pngjs outside the runtime package.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
const [url, expectedFile, outputDir, width = '390', height = '844', playwrightModule] = process.argv.slice(2);
if (!url || !expectedFile || !outputDir) throw new Error('Usage: node qa/playwright-compare.mjs <URL> <expected.png> <output-dir> [width] [height]');
const { chromium } = await import((playwrightModule ?? process.env.DESIGN_HARNESS_PLAYWRIGHT_MODULE) ? pathToFileURL(resolve(playwrightModule ?? process.env.DESIGN_HARNESS_PLAYWRIGHT_MODULE)).href : 'playwright');
const pngModule = await import(process.env.DESIGN_HARNESS_PNG_MODULE ? pathToFileURL(resolve(process.env.DESIGN_HARNESS_PNG_MODULE)).href : 'pngjs');
const PNG = pngModule.PNG ?? pngModule.default.PNG;
if (['actual.png', 'diff.png', 'comparison.json'].some(name => resolve(expectedFile) === resolve(outputDir, name))) throw new Error('Comparison outputs overlap the expected input');
const expectedBytes = readFileSync(expectedFile);
const expected = PNG.sync.read(expectedBytes);
const browser = await chromium.launch({ channel: 'chrome', headless: true });
let actualBytes;
try {
  const page = await browser.newPage({ viewport: { width: Number(width), height: Number(height) }, deviceScaleFactor: 1, colorScheme: 'light' });
  await page.goto(url, { waitUntil: 'load' });
  await page.evaluate(async () => { await document.fonts.ready; await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); });
  actualBytes = await page.screenshot({ animations: 'disabled', caret: 'hide' });
} finally { await browser.close(); }
const actual = PNG.sync.read(actualBytes);
if (expected.width !== actual.width || expected.height !== actual.height) throw new Error(`Image dimensions differ: ${expected.width}x${expected.height} vs ${actual.width}x${actual.height}`);
const diff = new PNG({ width: actual.width, height: actual.height });
let changedPixels = 0;
for (let i = 0; i < actual.data.length; i += 4) {
  const changed = [0, 1, 2, 3].some(channel => actual.data[i + channel] !== expected.data[i + channel]);
  if (changed) changedPixels++;
  diff.data[i] = changed ? 255 : Math.round(actual.data[i] * .3 + 255 * .7);
  diff.data[i + 1] = changed ? 0 : Math.round(actual.data[i + 1] * .3 + 255 * .7);
  diff.data[i + 2] = changed ? 180 : Math.round(actual.data[i + 2] * .3 + 255 * .7);
  diff.data[i + 3] = 255;
}
mkdirSync(outputDir, { recursive: true });
writeFileSync(join(outputDir, 'actual.png'), actualBytes);
writeFileSync(join(outputDir, 'expected.png'), expectedBytes);
writeFileSync(join(outputDir, 'diff.png'), PNG.sync.write(diff));
const report = { engine: 'Playwright', width: actual.width, height: actual.height, changedPixels,
  totalPixels: actual.width * actual.height, diffRatio: changedPixels / (actual.width * actual.height) };
writeFileSync(join(outputDir, 'comparison.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report));
process.exitCode = changedPixels ? 1 : 0;
