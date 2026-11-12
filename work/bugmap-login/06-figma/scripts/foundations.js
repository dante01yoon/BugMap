const TOKENS={"colors": {"primary": "#15803D", "primaryPressed": "#166534", "text": "#111827", "secondary": "#4B5563", "muted": "#6B7280", "surface": "#FFFFFF", "subtle": "#F9FAFB", "disabled": "#F3F4F6", "border": "#E5E7EB", "strongBorder": "#D1D5DB", "naverBorder": "#D9D9D9", "kakao": "#FEE500", "kakaoInk": "#191919", "naver": "#03A94D", "black": "#000000", "white": "#FFFFFF"}, "fontSizes": {"caption": 12, "small": 13, "body": 14, "label": 16, "brand": 20, "title": 26}, "fontFamily": {"preferred": "Pretendard", "fallback": "-apple-system, BlinkMacSystemFont, Apple SD Gothic Neo, Arial, sans-serif"}, "typography": {"body": {"fontSize": 14, "fontWeight": 300, "lineHeight": 22}, "label": {"fontSize": 16, "fontWeight": 500, "lineHeight": 24}, "title": {"fontSize": 26, "fontWeight": 700, "lineHeight": 34}, "caption": {"fontSize": 12, "fontWeight": 500, "lineHeight": 18}}, "responsive": {"compact": {"maxWidth": 380, "titleLineHeight": 32, "valueCardHeight": 72, "introGap": 16, "chooseGap": 16, "descriptionGap": 8, "footerGap": 18}}, "spacing": {"unit": 4, "gutter": 16, "buttonGap": 12, "section": 20, "card": 16, "topSafe": 44, "bottomSafe": 34}, "radii": {"card": 32, "primary": 32, "providerNaver": 8, "providerApple": 8, "providerKakao": 8.347826}, "dimensions": {"minTarget": 44, "primaryHeight": 48, "policySlot": 44, "icon": 24}, "motion": {"duration": 0, "reducedMotion": "No decorative animation. Status is static in this review."}};
/**
 * createSemanticTokens
 *
 * Creates a batch of Figma variables in the given collection, one per entry in
 * `tokenMap`. Supports raw values, variable alias references, code syntax, and
 * scopes. Returns a map of token name → Variable for use in subsequent steps.
 *
 * @param {VariableCollection} collection - The target variable collection.
 * @param {Record<string, string>} modeIds - Map of {modeName: modeId} from createVariableCollection.
 * @param {Array<{
 *   name: string,
 *   type: 'COLOR' | 'FLOAT' | 'STRING' | 'BOOLEAN' | 'TIMING' | 'EASING',
 *   values: Record<string, string | number | boolean | MotionEasing | {type: 'VARIABLE_ALIAS', id: string}>,
 *   scopes?: VariableScope[],
 *   codeSyntax?: {WEB?: string, ANDROID?: string, iOS?: string}
 * }>} tokenMap - Ordered list of token definitions.
 *   - `name`: Variable name using slash hierarchy (e.g. "color/bg/primary").
 *   - `type`: Figma variable type.
 *   - `values`: Map of {modeName: value}. Values can be raw (hex string for COLOR,
 *     number for FLOAT) or alias objects {type: 'VARIABLE_ALIAS', id: variableId}.
 *     For COLOR, raw values are accepted as hex strings ("#rrggbb" or "#rrggbbaa")
 *     and converted to {r, g, b, a} automatically.
 *   - `scopes`: Array of VariableScope strings. Omit to use [] (hidden/primitive).
 *   - `codeSyntax`: Platform code syntax strings. Omit to skip.
 * @returns {Promise<{variables: Record<string, Variable>}>}
 *   `variables` maps each token name to its created Variable object.
 */
async function createSemanticTokens(collection, modeIds, tokenMap) {
  const variables = {}

  for (const token of tokenMap) {
    // Create the variable
    const variable = figma.variables.createVariable(token.name, collection, token.type)

    // Set values for each mode
    for (const [modeName, rawValue] of Object.entries(token.values)) {
      const modeId = modeIds[modeName]
      if (!modeId) {
        throw new Error(
          `createSemanticTokens: mode "${modeName}" not found in modeIds for token "${token.name}". ` +
            `Available modes: ${Object.keys(modeIds).join(', ')}`,
        )
      }

      let value = rawValue

      // Convert hex strings to Figma RGBA for COLOR type
      if (token.type === 'COLOR' && typeof rawValue === 'string' && rawValue.startsWith('#')) {
        value = hexToFigmaColor(rawValue)
      }

      variable.setValueForMode(modeId, value)
    }

    // Set scopes (default: empty array = hidden from property pickers / primitives)
    variable.scopes = token.scopes || []

    // Set code syntax per platform
    if (token.codeSyntax) {
      if (token.codeSyntax.WEB) {
        variable.setVariableCodeSyntax('WEB', token.codeSyntax.WEB)
      }
      if (token.codeSyntax.ANDROID) {
        variable.setVariableCodeSyntax('ANDROID', token.codeSyntax.ANDROID)
      }
      if (token.codeSyntax.iOS) {
        variable.setVariableCodeSyntax('iOS', token.codeSyntax.iOS)
      }
    }

    variables[token.name] = variable
  }

  return { variables }
}

/**
 * Converts a hex color string to a Figma RGBA object.
 * Supports "#rgb", "#rrggbb", and "#rrggbbaa".
 *
 * @param {string} hex
 * @returns {{ r: number, g: number, b: number, a: number }}
 */
function hexToFigmaColor(hex) {
  let h = hex.replace('#', '')

  // Expand shorthand #rgb → #rrggbb
  if (h.length === 3) {
    h = h
      .split('')
      .map((c) => c + c)
      .join('')
  }

  const r = parseInt(h.substring(0, 2), 16) / 255
  const g = parseInt(h.substring(2, 4), 16) / 255
  const b = parseInt(h.substring(4, 6), 16) / 255
  const a = h.length === 8 ? parseInt(h.substring(6, 8), 16) / 255 : 1

  return { r, g, b, a }
}

const page=await figma.getNodeByIdAsync('0:1'); await figma.setCurrentPageAsync(page);
if((await figma.variables.getLocalVariableCollectionsAsync()).some(c=>c.name==='BugMap Login / Tokens'))throw new Error('Foundations already exist; inspect ledger before retry');
for(const style of ['Light','Medium','Bold'])await figma.loadFontAsync({family:'Noto Sans KR',style});
const primitives=figma.variables.createVariableCollection('BugMap Login / Primitives'); primitives.renameMode(primitives.modes[0].modeId,'Value');
const semantic=figma.variables.createVariableCollection('BugMap Login / Tokens'); semantic.renameMode(semantic.modes[0].modeId,'Light');
const pm={Value:primitives.modes[0].modeId},sm={Light:semantic.modes[0].modeId};
const defs=[];
for(const [name,value] of Object.entries(TOKENS.colors))defs.push({name:'colors/'+name,type:'COLOR',value,scopes:['FRAME_FILL','SHAPE_FILL','TEXT_FILL','STROKE_COLOR'],css:'--'+name});
for(const [group,scope] of [['spacing','GAP'],['radii','CORNER_RADIUS'],['fontSizes','FONT_SIZE'],['dimensions','WIDTH_HEIGHT']])for(const [name,value]of Object.entries(TOKENS[group]))defs.push({name:group+'/'+name,type:'FLOAT',value,scopes:[scope],css:'--'+group+'-'+name});
const {variables:pv}=await createSemanticTokens(primitives,pm,defs.map(d=>({name:d.name,type:d.type,values:{Value:d.value},scopes:[],codeSyntax:{WEB:'var('+d.css+')'}})));
const {variables:sv}=await createSemanticTokens(semantic,sm,defs.map(d=>({name:d.name,type:d.type,values:{Light:{type:'VARIABLE_ALIAS',id:pv[d.name].id}},scopes:d.scopes,codeSyntax:{WEB:'var('+d.css+')'}})));
const styles={};
const roles=[['title',26,34,'Bold'],['titleCompact',26,32,'Bold'],['brand',20,28,'Bold'],['body',14,22,'Light'],['label',14,22,'Medium'],['small',13,22,'Medium'],['caption',12,18,'Medium']];
for(const [role,size,line,weight]of roles){const s=figma.createTextStyle();s.name='BugMap Login/'+role;s.fontName={family:'Noto Sans KR',style:weight};s.fontSize=size;s.lineHeight={unit:'PIXELS',value:line};s.letterSpacing={unit:'PIXELS',value:role.startsWith('title')?-.6:0};const sizeKey=Object.keys(TOKENS.fontSizes).find(k=>TOKENS.fontSizes[k]===size);s.setBoundVariable('fontSize',sv['fontSizes/'+sizeKey]);styles[role]=s.id;}
return {createdNodeIds:[],collections:{primitives:primitives.id,semantic:semantic.id},variables:Object.fromEntries(Object.entries(sv).map(([k,v])=>[k,v.id])),primitiveIds:Object.values(pv).map(v=>v.id),styles,font:{family:'Noto Sans KR',body:'Light',label:'Medium',title:'Bold'},counts:{variables:defs.length*2,textStyles:roles.length},aliasesValid:Object.values(sv).every(v=>v.valuesByMode[sm.Light].type==='VARIABLE_ALIAS')};
