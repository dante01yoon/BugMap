// Serialized and executed inside Chromium: no Node imports or outer closures.
export function inspectWeb({ colors, fontSizes, forbidden, origin }) {
  const issues = [], canvas = document.createElement('canvas');
  canvas.width = canvas.height = 1;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  const normalize = value => value.normalize('NFKC').replace(/\s+/gu, ' ').trim().toLocaleLowerCase('en');
  function colorKey(value) {
    if (!CSS.supports('color', value)) return null;
    context.clearRect(0, 0, 1, 1); context.fillStyle = value; context.fillRect(0, 0, 1, 1);
    const pixels = [...context.getImageData(0, 0, 1, 1).data];
    return pixels[3] === 0 ? 'transparent' : pixels.join(',');
  }
  const allowed = new Set(Object.values(colors).map(colorKey));
  function selector(el) {
    if (el.id) return `${el.tagName.toLowerCase()}#${el.id}`;
    const parts = [];
    for (let n = el; n?.parentElement && parts.length < 5; n = n.parentElement) parts.unshift(`${n.tagName.toLowerCase()}:nth-child(${[...n.parentElement.children].indexOf(n) + 1})`);
    return parts.join(' > ') || el.tagName.toLowerCase();
  }
  function issue(code, el, property, value) { issues.push({ code, selector: typeof el === 'string' ? el : selector(el), property, value }); }
  function visible(el) {
    if (!el.getClientRects().length || getComputedStyle(el).visibility !== 'visible') return false;
    for (let n = el; n instanceof Element; n = n.parentElement ?? n.getRootNode().host) {
      const s = getComputedStyle(n);
      if (s.display === 'none' || Number(s.opacity) === 0) return false;
    }
    return true;
  }
  function checkColor(el, property, value) {
    const key = colorKey(value);
    if (key && key !== 'transparent' && !allowed.has(key)) issue('color', el, property, value);
  }
  function checkStyle(el, s, hasText, suffix = '') {
    const target = `${selector(el)}${suffix}`;
    if (hasText) {
      if (!(el instanceof SVGElement)) checkColor(target, 'color', s.color);
      const size = Number.parseFloat(s.fontSize);
      if (!fontSizes.some(value => Math.abs(value - size) < 0.01)) issue('font-size', target, 'font-size', s.fontSize);
    }
    checkColor(target, 'background-color', s.backgroundColor);
    for (const side of ['Top', 'Right', 'Bottom', 'Left']) {
      if (Number.parseFloat(s[`border${side}Width`]) > 0 && !['none', 'hidden'].includes(s[`border${side}Style`])) checkColor(target, `border-${side.toLowerCase()}-color`, s[`border${side}Color`]);
    }
    if (Number.parseFloat(s.outlineWidth) > 0 && s.outlineStyle !== 'none') checkColor(target, 'outline-color', s.outlineColor);
    for (const property of ['backgroundImage', 'boxShadow', 'textShadow']) {
      const value = s[property];
      if (value !== 'none') {
        const colorFunctions = value.match(/(?:rgba?|hsla?|oklch|oklab|lab|lch|color)\([^)]*\)/g) ?? [];
        for (const color of colorFunctions) checkColor(target, property, color);
        if (property === 'backgroundImage' && /gradient\(/i.test(value) && !colorFunctions.length) issue('unsupported-paint', target, property, value);
      }
    }
    if (el instanceof SVGElement) for (const property of ['fill', 'stroke']) if (s[property] && s[property] !== 'none') checkColor(target, property, s[property]);
  }
  function wording(value, target) {
    const haystack = normalize(value);
    for (const term of forbidden) if (haystack.includes(normalize(term))) issue('forbidden-copy', target, 'text', term);
  }
  const all = [];
  function collect(root) {
    for (const el of root.querySelectorAll('*')) {
      all.push(el);
      if (el.shadowRoot) { collect(el.shadowRoot); wording(el.shadowRoot.textContent ?? '', selector(el)); }
    }
  }
  collect(document);
  for (const el of all) {
    if (['SCRIPT', 'STYLE', 'LINK', 'META', 'HEAD', 'TITLE'].includes(el.tagName) || !visible(el)) continue;
    if (el.tagName === 'IFRAME') issue('unsupported-frame', el, 'frame', el.getAttribute('src') ?? '');
    const s = getComputedStyle(el);
    const hasText = [...el.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()) || el.matches('input,textarea,select');
    checkStyle(el, s, hasText);
    if (el.matches('button,[role="button"],input[type="button"],input[type="submit"],input[type="reset"]')) {
      const rect = el.getBoundingClientRect();
      if (rect.width < 44 || rect.height < 44) issue('touch-target', el, 'size', `${rect.width}x${rect.height}`);
    }
    for (const property of ['aria-label', 'title', 'alt', 'placeholder', 'value']) {
      const value = property === 'value' && 'value' in el ? el.value : el.getAttribute(property);
      if (value) wording(value, selector(el));
    }
    for (const pseudo of ['::before', '::after']) {
      const ps = getComputedStyle(el, pseudo);
      if (ps.content && !['none', 'normal', '""', "''"].includes(ps.content) && ps.display !== 'none' && ps.visibility === 'visible') {
        checkStyle(el, ps, true, pseudo); wording(ps.content, `${selector(el)}${pseudo}`);
      }
    }
  }
  wording(document.body?.innerText ?? '', 'body');
  for (const resource of performance.getEntriesByType('resource')) {
    if (resource.responseStatus >= 400) issue('resource-load', 'document', 'url', resource.name);
    const url = new URL(resource.name, location.href);
    if (!['data:', 'blob:'].includes(url.protocol) && url.origin !== origin) issue('untracked-resource', 'document', 'url', resource.name);
  }
  return { issues, title: document.title, finalUrl: location.href };
}
