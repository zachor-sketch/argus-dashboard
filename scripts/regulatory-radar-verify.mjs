import fs from 'node:fs';import path from 'node:path';import {createHash} from 'node:crypto';import {execFileSync} from 'node:child_process';import {fileURLToPath} from 'node:url';
import {canonical,exact,base,COMMON,hashText,time,validateEvent} from '../lib/regulatory-radar-model.js';
import {evaluateEvent} from '../lib/regulatory-radar-rules.js';
import {validateHistory,validatePattern} from '../lib/regulatory-radar-history.js';
import {searchAnalogs,same} from '../lib/regulatory-radar-analogs.js';
import {validateBackward,linkOutcome} from '../lib/regulatory-radar-validation.js';
export const JOURNALS=['events.jsonl','patterns.jsonl','historical-cases.jsonl','analogs.jsonl','validation.jsonl','runs.jsonl'];
export const hash=x=>createHash('sha256').update(Buffer.isBuffer(x)||typeof x==='string'?x:canonical(x)).digest('hex');
export function journalPath(root,name){if(!JOURNALS.includes(name))throw Error('RADAR_WRITE_DENIED');const file=path.resolve(root,'radar',name);for(let p=file;;p=path.dirname(p)){if(fs.existsSync(p)){const s=fs.lstatSync(p);if(s.isSymbolicLink()||p===file&&(!s.isFile()||s.nlink!==1))throw Error('RADAR_LINK_DENIED');}if(path.dirname(p)===p)break;}return file;}
function payload(name,p){
 if(name==='events.jsonl')return validateEvent(p); // Linked output evaluation follows.
 if(name==='patterns.jsonl')return validatePattern(p);
 if(name==='historical-cases.jsonl')return validateHistory(p);
 if(name==='validation.jsonl')return validateBackward(p);
 if(name==='analogs.jsonl'){exact(p,[...COMMON,'eventHash','caseHashes','search']);base(p);if(p.schemaVersion!=='argus.regulatory-analogs/1'||p.sources.length)throw Error('RADAR_ANALOG');hashText(p.eventHash);if(!Array.isArray(p.caseHashes)||!p.caseHashes.length||new Set(p.caseHashes).size!==p.caseHashes.length)throw Error('RADAR_ANALOG');p.caseHashes.forEach(hashText);}
 if(name==='runs.jsonl'){exact(p,['schemaVersion','id','timestamp','eventHashes','output','canAuthorizePortfolioAction']);if(p.schemaVersion!=='argus.regulatory-run/1'||p.output!=='REGULATORY_RESEARCH_FLAG'||p.canAuthorizePortfolioAction!==false||!Array.isArray(p.eventHashes)||!p.eventHashes.length)throw Error('RADAR_NO_TRADE');time(p.timestamp);p.eventHashes.forEach(hashText);}
}
export function parseJournal(name,bytes,trusted){if(trusted===undefined)throw Error('RADAR_ANCHOR_REQUIRED');const normalize=b=>Buffer.from(b).toString('utf8').replace(/\r\n/g,'\n'),str=normalize(bytes);if(!str.startsWith(normalize(trusted)))throw Error('RADAR_TRUNCATION_OR_EDIT');if(str&&!str.endsWith('\n'))throw Error('RADAR_PARTIAL');let previousHash=null;const rows=[],ids=new Set();for(const line of str?str.slice(0,-1).split('\n'):[]){const r=JSON.parse(line);exact(r,['sequence','previousHash','payload','hash']);const {hash:h,...body}=r;if(r.previousHash!==previousHash||r.sequence!==rows.length+1||hash(body)!==h||ids.has(r.payload.id))throw Error('RADAR_CHAIN');payload(name,r.payload);for(const s of r.payload.sources??[])if(hash(s.text)!==s.contentHash)throw Error('RADAR_SOURCE_HASH');ids.add(r.payload.id);previousHash=h;rows.push(r);}return rows;}
const git=(root,args)=>execFileSync('git',args,{cwd:root,encoding:null,stdio:['ignore','pipe','pipe']});
function prefix(root,name,ref){const files=git(root,['ls-tree','-r','--name-only',ref]).toString().trim().split('\n');return files.includes('radar/'+name)?git(root,['show',`${ref}:radar/${name}`]):Buffer.alloc(0);}
export function verifyLinks(data){const all=Object.values(data).flat(),byHash=h=>all.find(r=>r.hash===h);const patterns=new Set(data['patterns.jsonl'].map(r=>r.payload.id));
 for(const r of data['historical-cases.jsonl'])if(r.payload.patternIds.some(id=>!patterns.has(id)))throw Error('RADAR_PATTERN_REFERENCE');
 const analogMaps=new Set();for(const {payload:p} of data['analogs.jsonl']){const e=byHash(p.eventHash),cases=p.caseHashes.map(h=>byHash(h));const eligible=data['historical-cases.jsonl'].filter(r=>time(r.payload.timestamp)<=time(p.timestamp)&&time(r.payload.evidenceCutoff)<=time(p.evidenceCutoff));if(analogMaps.has(p.eventHash)||!same([...p.caseHashes].sort(),eligible.map(r=>r.hash).sort())||!e||e.payload.stage!=='POLICY_MAP'||cases.some(c=>!c||c.payload.schemaVersion!=='argus.regulatory-history/1')||[e,...cases].some(r=>time(r.payload.timestamp)>time(p.timestamp)||time(r.payload.evidenceCutoff)>time(p.evidenceCutoff))||!same(p.search,searchAnalogs(e.payload,cases)))throw Error('RADAR_ANALOG_REPLAY');analogMaps.add(p.eventHash);}
 for(const {payload:p} of data['events.jsonl']){
  const analog=data['analogs.jsonl'].find(r=>r.payload.eventHash===p.mechanismHash);
  evaluateEvent(p,analog?.payload.search);
  if(p.stage==='RESEARCH_FLAG'){const m=byHash(p.mechanismHash)?.payload;if(!m||m.stage!=='POLICY_MAP'||m.domain!==p.domain||time(m.timestamp)>time(p.timestamp)||m.evidenceCutoff!==p.evidenceCutoff||!same(m.fields,p.fields)||!same(m.structure,p.structure)||!same(m.transmission,p.transmission)||!same(m.sources,p.sources.slice(0,m.sources.length)))throw Error('RADAR_POLICY_FIRST');if(!analog||time(analog.payload.timestamp)>time(p.timestamp))throw Error('RADAR_INVERSE_REQUIRED');}
 }
 const horizons=new Set();for(const {payload:p} of data['validation.jsonl'])if(p.schemaVersion==='argus.regulatory-outcome/1'){const pred=byHash(p.predictionHash)?.payload;if(!pred)throw Error('RADAR_FROZEN_PREDICTION_REQUIRED');linkOutcome(p,pred);const key=p.predictionHash+':'+p.horizonYears;if(horizons.has(key))throw Error('RADAR_DUPLICATE_HORIZON');horizons.add(key);}
 for(const {payload:p} of data['runs.jsonl'])if(p.eventHashes.some(h=>{const e=byHash(h)?.payload;return !e||e.output!=='REGULATORY_RESEARCH_FLAG'||time(e.timestamp)>time(p.timestamp);}))throw Error('RADAR_RUN_LINK');
}
export function verify(root,ref='HEAD'){git(root,['rev-parse','--verify',ref+'^{commit}']);const data=Object.fromEntries(JOURNALS.map(name=>{const file=journalPath(root,name);return[name,parseJournal(name,fs.existsSync(file)?fs.readFileSync(file):'',prefix(root,name,ref))];}));verifyLinks(data);return data;}
export function protectedSnapshot(root){const files=git(root,['ls-files']).toString().trim().split('\n').filter(f=>f&&!JOURNALS.some(n=>f==='radar/'+n));return Object.fromEntries(files.map(f=>[f,hash(fs.readFileSync(path.join(root,f)))]));}
export function assertProtected(root,before){for(const [f,h] of Object.entries(before))if(!fs.existsSync(path.join(root,f))||hash(fs.readFileSync(path.join(root,f)))!==h)throw Error('RADAR_PROTECTED_CHANGED '+f);}
export function append(root,name,p){
 const file=journalPath(root,name),before=protectedSnapshot(root);fs.mkdirSync(path.dirname(file),{recursive:true});
 const lock=path.join(root,'radar','.writer.lock');let fd;try{fd=fs.openSync(lock,'wx');}catch{throw Error('RADAR_WRITER_BUSY');}
 try{const data=verify(root),rows=data[name];if(rows.some(r=>r.payload.id===p.id))throw Error('RADAR_DUPLICATE_ID');const body={sequence:rows.length+1,previousHash:rows.at(-1)?.hash??null,payload:p},row={...body,hash:hash(body)};
  parseJournal(name,JSON.stringify({...row,sequence:1,previousHash:null,hash:hash({sequence:1,previousHash:null,payload:p})})+'\n','');data[name].push(row);verifyLinks(data);
  const out=fs.openSync(journalPath(root,name),fs.constants.O_WRONLY|fs.constants.O_APPEND|fs.constants.O_CREAT|(fs.constants.O_NOFOLLOW||0));try{if(fs.fstatSync(out).nlink!==1)throw Error('RADAR_LINK_DENIED');fs.writeFileSync(out,JSON.stringify(row)+'\n');fs.fsyncSync(out);}finally{fs.closeSync(out);}assertProtected(root,before);return row;
 }finally{fs.closeSync(fd);fs.unlinkSync(lock);}
}
export function assertBaseIsolation(root,ref){const allowed=f=>f.startsWith('radar/')||/^lib\/regulatory-radar-/.test(f)||/^scripts\/regulatory-radar-/.test(f)||/^tests\/regulatory-radar/.test(f)||/^REGULATORY_RADAR/.test(f)||f==='.github/workflows/regulatory-radar.yml';const existing=git(root,['ls-tree','-r','--name-only',ref]).toString().trim().split('\n');for(const f of existing.filter(f=>!allowed(f))){const current=git(root,['show',`HEAD:${f}`]);if(!current.equals(git(root,['show',`${ref}:${f}`])))throw Error('RADAR_BASE_ISOLATION '+f);}return existing.filter(f=>!allowed(f)).length;}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){const ref=process.argv[2]||'HEAD';const data=verify(process.cwd(),ref);console.log(JSON.stringify({status:'VERIFIED',journals:Object.fromEntries(Object.entries(data).map(([k,v])=>[k,v.length])),protectedFiles:assertBaseIsolation(process.cwd(),ref),canAuthorizePortfolioAction:false},null,2));}
