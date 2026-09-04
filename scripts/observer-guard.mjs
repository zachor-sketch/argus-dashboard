import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {JOURNALS,validateChain,readJournal,assertBaseline,assertAppendOnly} from './observer-store.mjs';
assertBaseline();
for(const name of JOURNALS){
 const file='observer/'+name;validateChain(readJournal(process.cwd(),name));
 let old='';try{old=execFileSync('git',['show','HEAD:'+file],{encoding:'utf8',stdio:['ignore','pipe','ignore']})}catch{}
 assertAppendOnly(old,fs.readFileSync(file,'utf8'));
}
const changed=execFileSync('git',['diff','--name-only'],{encoding:'utf8'}).trim().split('\n').filter(Boolean);
if(changed.some(f=>!JOURNALS.some(n=>f==='observer/'+n)))throw Error('OBSERVER_CHANGED_PROTECTED_FILE');
console.log('PASS: observer journal hash chains, append-only prefixes and write boundary.');
