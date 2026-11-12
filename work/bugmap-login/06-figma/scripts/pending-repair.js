// Prepared repair only. NOT EXECUTED: official Figma Starter quota was reached.
// Before execution, run current harness guard/check and confirm these ledger IDs.
const page=await figma.getNodeByIdAsync('0:1');await figma.setCurrentPageAsync(page);
for(const style of ['Light','Medium','Bold'])await figma.loadFontAsync({family:'Noto Sans KR',style});
const affected=[],bounds=[];
for(const [rootId,expected]of [['72:325',173],['72:450',173],['72:930',158],['72:1055',158]]){
 const root=await figma.getNodeByIdAsync(rootId);
 if(!root||root.type!=='FRAME'||root.parent.id!=='0:1')throw new Error('Expected recorded screen root');
 const buttons=root.findAll(n=>n.type==='INSTANCE'&&(n.name==='recovery / primary'||n.name==='recovery / secondary'));
 if(buttons.length!==2)throw new Error('Expected exactly two recovery instances');
 for(const n of buttons){n.layoutSizingHorizontal='FIXED';n.resize(expected,48);affected.push(n.id);bounds.push({id:n.id,width:n.width,height:n.height});}
}
// Approved loading HTML uses secondary gray for the progress icon.
const icon=await figma.getNodeByIdAsync('70:26');
if(!icon||icon.type!=='COMPONENT'||icon.name!=='BugMap Login / Lucide LoaderCircle')throw new Error('Unexpected progress icon');
const secondary=await figma.variables.getVariableByIdAsync('VariableID:69:45');
for(const n of icon.findAll(()=>true))if('strokes'in n&&n.strokes.length){n.strokes=n.strokes.map(p=>p.type==='SOLID'?figma.variables.setBoundVariableForPaint({...p,color:{r:75/255,g:85/255,b:99/255}},'color',secondary):p);affected.push(n.id);}
return{mutatedNodeIds:affected,bounds};
