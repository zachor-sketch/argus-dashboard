import fs from 'node:fs';import {append,verify} from './regulatory-radar-verify.mjs';
import {evaluateEvent} from '../lib/regulatory-radar-rules.js';
import {validationSummary} from '../lib/regulatory-radar-validation.js';
const [mode,file,...rest]=process.argv.slice(2);if(rest.length)throw Error('RADAR_ARGUMENTS');
if(mode==='record'&&file){const x=JSON.parse(fs.readFileSync(file));if(!Array.isArray(x))throw Error('RADAR_INPUT');for(const r of x)console.log(append(process.cwd(),r.journal,r.payload).hash);}
else if((!mode||mode==='verify')&&!file){const d=verify(process.cwd());console.log(JSON.stringify({events:d['events.jsonl'].filter(r=>r.payload.stage==='RESEARCH_FLAG').map(r=>({id:r.payload.id,...evaluateEvent(r.payload,d['analogs.jsonl'].find(a=>a.payload.eventHash===r.payload.mechanismHash)?.payload.search)})),validation:validationSummary(d['validation.jsonl'])},null,2));}else throw Error('RADAR_ARGUMENTS');
