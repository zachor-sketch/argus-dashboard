import {verify} from './regulatory-radar-verify.mjs';import {validationSummary} from '../lib/regulatory-radar-validation.js';
// Historical ingestion uses the same guarded record command; this reader never writes.
const d=verify(process.cwd());console.log(JSON.stringify({cases:d['historical-cases.jsonl'].map(r=>({id:r.payload.id,result:r.payload.result,falsePositiveReason:r.payload.falsePositiveReason})),validation:validationSummary(d['validation.jsonl'])},null,2));
