import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {canonical} from '../lib/integrity.js';
import {BASELINE_V10_25 as B} from '../datasets/baseline_v10_25.js';
export const JOURNALS=['events.jsonl','scans.jsonl','documents.jsonl'];
export const hash=value=>createHash('sha256').update(typeof value==='string'?value:canonical(value)).digest('hex');
export function assertBaseline(){if(hash(B)!=='0c6c0ddd63284379e5da3f84ccfefe7b6a79850bd82ff6722586579104544415')throw Error('BASELINE_INTEGRITY_FAILURE')}
export function journal(root,name){
 if(!JOURNALS.includes(name))throw Error('OBSERVER_WRITE_DENIED');
 const dir=path.resolve(root,'observer'),file=path.resolve(dir,name);
 if(fs.existsSync(dir)&&fs.lstatSync(dir).isSymbolicLink()||fs.existsSync(file)&&fs.lstatSync(file).isSymbolicLink())throw Error('OBSERVER_SYMLINK_DENIED');
 return file;
}
export function readJournal(root,name){const f=journal(root,name);if(!fs.existsSync(f))return [];const s=fs.readFileSync(f,'utf8');return s.trim()?s.trim().split('\n').map(JSON.parse):[]}
export function appendJournal(root,name,rows){
 assertBaseline();const file=journal(root,name),old=readJournal(root,name),ids=new Set(old.map(r=>r.id));let previous=old.at(-1)?.hash||null;
 const fresh=[];for(const row of rows){if(ids.has(row.id))continue;ids.add(row.id);const item={...row,previousHash:previous};item.hash=hash(item);fresh.push(item);previous=item.hash}
 if(fresh.length){fs.mkdirSync(path.dirname(file),{recursive:true});fs.appendFileSync(file,fresh.map(x=>JSON.stringify(x)).join('\n')+'\n')}
 return fresh;
}
export function validateChain(rows){let previous=null;const ids=new Set();for(const row of rows){const {hash:stored,...body}=row;if(ids.has(row.id)||body.previousHash!==previous||hash(body)!==stored)throw Error('OBSERVER_CHAIN_INVALID');ids.add(row.id);previous=stored}return true}
