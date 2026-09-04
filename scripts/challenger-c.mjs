import fs from 'node:fs';import path from 'node:path';import {fileURLToPath} from 'node:url';
import {appendLane,verifyLanes} from './challenger-lane-store.mjs';
import {formUnderwriting,researchRoute,same} from '../lib/challenger-underwriting.js';
import {compareC} from './challenger-underwriting-records.mjs';
import {snapshotProtected,assertProtected,verifyHistory} from './challenger-guard.mjs';
export function capturePacks(root,packs){const before=snapshotProtected(root);const rows=packs.map(p=>appendLane(root,'underwriting/packs.jsonl',p));assertProtected(root,before);return rows;}
export function freezeC(root,packHashes,drafts,batchId){
 const before=snapshotProtected(root),packs=verifyLanes(root)[5];
 if(!Array.isArray(packHashes)||packHashes.length!==8||new Set(packHashes).size!==8||!Array.isArray(drafts)||drafts.length!==8||new Set(drafts.map(d=>d.ticker)).size!==8||!/^[-\w]+$/.test(batchId))throw Error('UNDERWRITING_BATCH_SCOPE');
 const prepared=packHashes.map(h=>{const p=packs.find(p=>p.hash===h)?.payload;if(!p)throw Error('UNDERWRITING_PACK_REQUIRED');return formUnderwriting(p,drafts.find(d=>d.ticker===p.ticker),{id:`${batchId}:${p.ticker}`,timestamp:new Date().toISOString(),packHash:h});});
 if(new Set(prepared.map(p=>p.evidenceCutoff)).size!==1)throw Error('UNDERWRITING_BATCH_CUTOFF');
 const rows=prepared.map(p=>appendLane(root,'underwriting/packets.jsonl',p));
 const batch=appendLane(root,'underwriting/runs.jsonl',{schemaVersion:'argus.underwriting-batch/1',id:batchId,timestamp:new Date().toISOString(),packetHashes:rows.map(r=>r.hash)});assertProtected(root,before);return batch;
}
export async function debateC(root,batchId){
 const before=snapshotProtected(root),data=verifyLanes(root),batch=data[7].find(r=>r.payload.id===batchId&&r.payload.schemaVersion==='argus.underwriting-batch/1');if(!batch)throw Error('UNDERWRITING_FROZEN_BATCH_REQUIRED');
 // The complete durable eight-company batch is validated before this import.
 const {readCore}=await import('./challenger-core-read.mjs');
 const rows=[];for(const h of batch.payload.packetHashes){
  if(data[7].some(r=>r.payload.packetHash===h))continue;
  const p=data[6].find(r=>r.hash===h).payload,core=p.lane==='CORE_CHALLENGE'?await readCore(root,p.ticker,p.evidenceCutoff):'NOT_APPLICABLE';
  rows.push(appendLane(root,'underwriting/runs.jsonl',{schemaVersion:'argus.underwriting-debate/1',id:`${batchId}:debate:${p.ticker}`,timestamp:new Date().toISOString(),batchHash:batch.hash,packetHash:h,core,comparison:compareC(p,core,batch.payload.timestamp),route:researchRoute(p)}));
 }assertProtected(root,before);return rows;
}
export async function verifyC(root){
 verifyHistory(root);const data=verifyLanes(root),debates=data[7].filter(r=>r.payload.schemaVersion==='argus.underwriting-debate/1'&&r.payload.core!=='NOT_APPLICABLE');
 if(debates.length){const {readCore}=await import('./challenger-core-read.mjs');for(const {payload:r} of debates){const p=data[6].find(p=>p.hash===r.packetHash).payload,actual=await readCore(root,p.ticker,p.evidenceCutoff);const omitTime=({readAt,...rest})=>rest;if(!same(omitTime(actual),omitTime(r.core)))throw Error('UNDERWRITING_CORE_REPLAY');}}
 return{status:'VERIFIED',packs:data[5].length,packets:data[6].length,records:data[7].length,canAuthorizePortfolioAction:false};
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const [mode,a,b,...rest]=process.argv.slice(2);if(rest.length)throw Error('UNDERWRITING_ARGUMENTS');let result;
 if(mode==='capture'&&a&&!b)result=capturePacks(process.cwd(),JSON.parse(fs.readFileSync(a)));
 else if(mode==='freeze'&&a&&b){const {packHashes,drafts}=JSON.parse(fs.readFileSync(a));result=freezeC(process.cwd(),packHashes,drafts,b);}
 else if(mode==='debate'&&a&&!b)result=await debateC(process.cwd(),a);
 else if(mode==='verify'&&!a)result=await verifyC(process.cwd());else throw Error('UNDERWRITING_ARGUMENTS');console.log(JSON.stringify(result,null,2));
}
