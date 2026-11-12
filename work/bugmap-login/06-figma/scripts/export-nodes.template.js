const p=await figma.getNodeByIdAsync('0:1');await figma.setCurrentPageAsync(p);
async function serialize(n){const o={id:n.id,name:n.name,type:n.type,width:n.width,height:n.height,x:n.x,y:n.y,visible:n.visible,opacity:n.opacity,rotation:n.rotation,fills:'fills'in n?JSON.parse(JSON.stringify(n.fills)):[]};
for(const k of ['strokes','strokeWeight','strokeTopWeight','strokeBottomWeight','strokeLeftWeight','strokeRightWeight','cornerRadius','layoutMode','primaryAxisAlignItems','counterAxisAlignItems','primaryAxisSizingMode','counterAxisSizingMode','layoutSizingHorizontal','layoutSizingVertical','itemSpacing','paddingTop','paddingBottom','paddingLeft','paddingRight','clipsContent','boundVariables','textStyleId'])if(k in n&&typeof n[k]!=='symbol')o[k]=JSON.parse(JSON.stringify(n[k]));
if(n.type==='TEXT'){o.characters=n.characters;o.fontSize=n.fontSize;o.fontName=n.fontName;o.lineHeight=n.lineHeight;o.letterSpacing=n.letterSpacing;o.textAutoResize=n.textAutoResize;}
if(n.type==='INSTANCE'){const main=await n.getMainComponentAsync();o.componentId=main?.id;o.mainComponentName=main?.name;}
if(META[n.id])Object.assign(o,META[n.id]);
if('children'in n){o.children=[];for(const c of n.children)o.children.push(await serialize(c));}
return o;}
const root=await figma.getNodeByIdAsync(ROOT_ID);if(!root||root.parent.id!=='0:1')throw new Error('Wrong export root');const node=await serialize(root);return{node,exportedAt:new Date().toISOString()};
