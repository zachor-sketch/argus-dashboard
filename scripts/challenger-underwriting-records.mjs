import {C_IDENTITIES,validatePack,formUnderwriting,researchRoute,same} from '../lib/challenger-underwriting.js';
import {exact} from '../lib/challenger-pilot-model.js';
import {instant} from '../lib/challenger-model.js';
import {validateCoreRead} from '../lib/challenger-pilot-debate.js';
export function validateCRecord(name,p){
 if(name.endsWith('packs.jsonl')){validatePack(p);return;}
 if(name.endsWith('packets.jsonl')){exact(p,['schemaVersion','id','timestamp','ticker','lane','classification','evidenceCutoff','packHash','draft','calculations','missingGates','canAuthorizePortfolioAction']);if(p.schemaVersion!=='argus.underwriting-packet/1'||p.canAuthorizePortfolioAction!==false)throw Error('UNDERWRITING_PACKET');return;}
 if(p.schemaVersion==='argus.underwriting-batch/1')exact(p,['schemaVersion','id','timestamp','packetHashes']);
 else if(p.schemaVersion==='argus.underwriting-debate/1')exact(p,['schemaVersion','id','timestamp','batchHash','packetHash','core','comparison','route']);
 else throw Error('UNDERWRITING_RUN');
 instant(p.timestamp);if(typeof p.id!=='string'||!p.id)throw Error('UNDERWRITING_ID');
}
export function compareC(p,core,batchTime){
 let state=p.draft.independentState, disagreement='UNKNOWN';
 if(core!=='NOT_APPLICABLE'){
  validateCoreRead(core,p.evidenceCutoff);if(p.lane!=='CORE_CHALLENGE'||core.ticker!==p.ticker||instant(core.readAt)<instant(batchTime))throw Error('UNDERWRITING_CORE_BEFORE_FREEZE');
  if(['FAVORABLE','UNFAVORABLE'].includes(state)){
   if(core.economicDirection==='UNKNOWN'||core.asOf==='UNKNOWN'||core.availableAt==='UNKNOWN')state='UNKNOWN';
   else {disagreement=state===core.economicDirection?'LOW':'HIGH';state=disagreement==='LOW'?'SUPPORT_CORE':'CHALLENGE_CORE';}
  }
 }else if(p.lane!=='EXTERNAL_DISCOVERY')throw Error('UNDERWRITING_CORE_REQUIRED');
 return {state,disagreement,researchPriority:disagreement==='HIGH'?{kind:'REUNDERWRITE',priority:'HIGH'}:null,canAuthorizePortfolioAction:false};
}
export function validateCLinks(data,coreIdentities,candidates){
 const [packs,packets,runs]=data,core=new Map(coreIdentities.map(c=>[c.ticker,c.company]));
 for(const row of packs){const p=row.payload;
  if(p.lane==='CORE_CHALLENGE'?(core.get(p.ticker)!==p.company):core.has(p.ticker)||!candidates.some(c=>c.hash===p.candidateHash&&c.payload.ticker===p.ticker&&c.payload.company===p.company&&instant(c.payload.timestamp)<=instant(p.evidenceCutoff)))throw Error('UNDERWRITING_MEMBERSHIP');
 }
 for(const row of packets){const p=row.payload,pack=packs.find(r=>r.hash===p.packHash);if(!pack||!same(p,formUnderwriting(pack.payload,p.draft,{id:p.id,timestamp:p.timestamp,packHash:p.packHash})))throw Error('UNDERWRITING_REPLAY');}
 const debated=new Set();
 for(const row of runs){const r=row.payload;
  if(r.schemaVersion==='argus.underwriting-batch/1'){
   if(!Array.isArray(r.packetHashes)||r.packetHashes.length!==8||new Set(r.packetHashes).size!==8)throw Error('UNDERWRITING_BATCH_SCOPE');
   const ps=r.packetHashes.map(h=>packets.find(p=>p.hash===h)?.payload);
   if(ps.some(p=>!p||instant(p.timestamp)>instant(r.timestamp))||new Set(ps.map(p=>p.ticker)).size!==8||new Set(ps.map(p=>p.evidenceCutoff)).size!==1||ps.some(p=>!C_IDENTITIES[p.ticker]))throw Error('UNDERWRITING_BATCH_SEQUENCE');
  }else{
   const batch=runs.find(b=>b.hash===r.batchHash)?.payload,p=packets.find(p=>p.hash===r.packetHash)?.payload;
   if(!batch||batch.schemaVersion!=='argus.underwriting-batch/1'||!batch.packetHashes.includes(r.packetHash)||!p||instant(r.timestamp)<instant(batch.timestamp)||debated.has(r.packetHash))throw Error('UNDERWRITING_DEBATE_SEQUENCE');
   if(!same(r.comparison,compareC(p,r.core,batch.timestamp))||!same(r.route,researchRoute(p)))throw Error('UNDERWRITING_DEBATE_OR_ACTION');
   if(r.core!=='NOT_APPLICABLE'&&instant(r.core.readAt)>instant(r.timestamp))throw Error('UNDERWRITING_DEBATE_SEQUENCE');debated.add(r.packetHash);
  }
 }
}
