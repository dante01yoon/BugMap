const page=await figma.getNodeByIdAsync('0:1');await figma.setCurrentPageAsync(page);
for(const style of ['Light','Medium','Bold'])await figma.loadFontAsync({family:'Noto Sans KR',style});
const V=Object.fromEntries(await Promise.all(Object.entries(LEDGER.variables).map(async([k,id])=>[k,await figma.variables.getVariableByIdAsync(id)])));
const C=Object.fromEntries(await Promise.all(Object.entries(MASTERS.components).map(async([k,id])=>[k,await figma.getNodeByIdAsync(id)])));
const created=[],roots=[],interactive=[],metadata={};
function track(n){created.push(n.id);return n;}
function rgb(h){return{r:parseInt(h.slice(1,3),16)/255,g:parseInt(h.slice(3,5),16)/255,b:parseInt(h.slice(5,7),16)/255};}
function paint(k){return figma.variables.setBoundVariableForPaint({type:'SOLID',color:rgb(TOKENS.colors[k])},'color',V['colors/'+k]);}
function box(parent,name,w,h,dir='VERTICAL',hug=false){const n=track(figma.createAutoLayout(dir));n.name=name;n.fills=[];n.primaryAxisSizingMode='FIXED';n.counterAxisSizingMode='FIXED';n.resize(w,h);parent.appendChild(n);if(hug)n.primaryAxisSizingMode='AUTO';return n;}
function gap(parent,w,h){return box(parent,'Spacing',w,h);}
async function txt(parent,name,str,w,style='body',color='text'){const n=track(figma.createText());n.name=name;await n.setTextStyleIdAsync(LEDGER.styles[style]);n.characters=str;n.fills=[paint(color)];n.textAutoResize='HEIGHT';n.resize(w,n.height);parent.appendChild(n);n.layoutSizingHorizontal='FIXED';return n;}
function inst(parent,key,w){const n=track(C[key].createInstance());parent.appendChild(n);if(w)n.resize(w,n.height);return n;}
function pad(n,x,y){n.paddingLeft=x;n.paddingRight=x;n.paddingTop=y;n.paddingBottom=y;}
for(let device=0;device<2;device++){const width=device?360:390,W=width-32,H=device?800:844,compact=!!device;
for(let index=0;index<STATES.length;index++){const state=STATES[index];const name='04 · 로그인 / '+width+' / '+state;if(page.children.some(n=>n.name===name))throw new Error('Screen already exists: '+name);
const root=box(page,name,width,H);root.x=2500+index*450;root.y=device?1100:100;root.fills=[paint('surface')];root.paddingTop=44;root.paddingBottom=34;root.paddingLeft=16;root.paddingRight=16;root.setBoundVariable('paddingTop',V['spacing/topSafe']);root.setBoundVariable('paddingBottom',V['spacing/bottomSafe']);root.setBoundVariable('paddingLeft',V['spacing/gutter']);root.setBoundVariable('paddingRight',V['spacing/gutter']);root.clipsContent=true;roots.push({screen:device?'login-compact':'login',state,nodeId:root.id,width,height:H});
inst(root,'brand',W);gap(root,W,compact?16:20);
const intro=box(root,'Introduction',W,1,'VERTICAL',true);await txt(intro,'Title','작은 발견을\n사진으로, 지도에.',W,compact?'titleCompact':'title');gap(intro,W,compact?8:10);await txt(intro,'Description','곤충을 사진과 위치로 기록하고\n함께 나눠요.',Math.min(W,290),'body','secondary');gap(root,W,20);inst(root,'valueCard/'+W);gap(root,W,compact?16:20);await txt(root,'Choose',COPY.choose,W,'label');gap(root,W,12);
const providers=box(root,'Provider choices',W,168);providers.itemSpacing=12;providers.setBoundVariable('itemSpacing',V['spacing/buttonGap']);
for(const provider of ['kakao','naver','apple']){const n=inst(providers,'providerButton/'+provider+'/'+W);n.name='providerButton / '+provider;interactive.push(n.id);metadata[n.id]={componentName:'providerButton',interactive:true,provider,disabled:state.startsWith('loading')||state==='success'||(state==='unsupported'&&provider==='apple')};}
gap(root,W,16);
const panel=['network_error','unsupported','service_outage'].includes(state);const status=box(root,'status / '+state,W,44,'VERTICAL',true);metadata[status.id]={componentName:'status'};
if(panel){status.fills=[paint('subtle')];status.strokes=[paint('border')];status.strokeWeight=1;status.cornerRadius=20;pad(status,compact?12:14,compact?10:12);status.itemSpacing=4;const inner=W-2*(compact?12:14);await txt(status,'Status title',COPY[state],inner,'label');
const keys=state==='network_error'?['network_help']:state==='unsupported'?['unsupported_reason','unsupported_help']:['outage_help'];for(const key of keys)await txt(status,'Status explanation',COPY[key],inner,'body','secondary');
}else if(state.startsWith('loading')){status.layoutMode='HORIZONTAL';status.counterAxisAlignItems='CENTER';status.primaryAxisSizingMode='FIXED';status.itemSpacing=8;inst(status,'icon/LoaderCircle');await txt(status,'Progress',COPY[state],W-28,'label','secondary');}
else{await txt(status,'Status message',COPY[state]||COPY.default,W,'body');status.minHeight=44;}
if(['network_error','service_outage'].includes(state)){gap(root,W,12);const recovery=box(root,'Recovery actions',W,48,'HORIZONTAL');recovery.itemSpacing=12;for(const kind of ['primary','secondary']){const n=inst(recovery,'recovery/'+kind,(W-12)/2);n.name='recovery / '+kind;n.layoutSizingHorizontal='FILL';interactive.push(n.id);metadata[n.id]={componentName:'recovery',interactive:true};}}
const footer=box(root,'Policy footer',W,compact?106:112);footer.layoutSizingVertical='FILL';footer.primaryAxisAlignItems='MAX';footer.paddingTop=compact?18:24;const policies=box(footer,'Policy review slots',W,88);for(const key of ['terms','privacy']){const slot=box(policies,'policySlot / '+key,W,44);metadata[slot.id]={componentName:'policySlot',interactive:false};slot.counterAxisAlignItems='MIN';slot.primaryAxisAlignItems='CENTER';slot.strokes=[paint('border')];slot.strokeTopWeight=1;slot.strokeBottomWeight=key==='privacy'?1:0;slot.strokeLeftWeight=0;slot.strokeRightWeight=0;await txt(slot,'Policy placeholder',COPY[key],W,'caption','muted');}
}}
const all=[];for(const r of roots){const n=await figma.getNodeByIdAsync(r.nodeId);all.push(n.id,...n.findAll(()=>true).map(x=>x.id));}
return{createdNodeIds:all,roots,interactive,metadata,summary:roots.map(r=>{const n=page.children.find(n=>n.id===r.nodeId);return{...r,children:n.children.length,bottom:n.children.at(-1).y+n.children.at(-1).height,descendants:n.findAll(()=>true).length};})};
