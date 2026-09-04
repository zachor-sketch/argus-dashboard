import {exact,claim,validateEvent} from './regulatory-radar-model.js';
import {validateTransmission,secondOrderFlag} from './regulatory-radar-transmission.js';
export const RENT_COMPONENTS=['magnitude','durability','bottleneck','entryBarrier','concentration','actualCapture','capitalAdvantage','reversalResistance','implementation','secondOrderCapture'];
export function rentScore(inputs,sources){exact(inputs,RENT_COMPONENTS);const missing=[];let sum=0;for(const [k,v] of Object.entries(inputs)){if(v==='UNKNOWN'){missing.push(k);continue;}exact(v,['score','basis']);if(!Number.isInteger(v.score)||v.score<0||v.score>4||v.basis==='UNKNOWN')throw Error('RADAR_SCORE');claim(v.basis,sources);if(['actualCapture','secondOrderCapture'].includes(k)&&v.basis.kind!=='OBSERVED_ECONOMICS')throw Error('RADAR_CAPTURE_EVIDENCE');sum+=v.score;}return{type:'REGULATORY_RENT_SCORE',value:missing.length?'UNKNOWN':sum/40*100,missing,coverage:(10-missing.length)+'/10',scope:'RESEARCH_PRIORITIZATION_ONLY',rubric:'0 absent/adverse, 1 weak, 2 moderate, 3 strong, 4 strong quantified; human judgments with evidence; equal weights'};}
export function evaluateEvent(input,analog=null){const p=validateEvent(input);validateTransmission(p.transmission,p.sources);const score=rentScore(p.rentInputs,p.sources);
 const missing=['verifiedPolicyMechanism','evidenceFor','evidenceAgainst','analogyFailure'].filter(k=>p.fields[k]==='UNKNOWN');
 if(!analog||analog.status==='HISTORICAL_ANALOG_ONLY'||!analog.inverseHash)missing.push('CURRENT_AND_INVERSE_ANALOG');
 if(p.transmission.path.bottleneck==='UNKNOWN')missing.push('BOTTLENECK');
 if(p.confidence==='HIGH'&&(missing.length||score.value==='UNKNOWN'||p.fields.observedEconomics==='UNKNOWN'))throw Error('RADAR_HIGH_CONFIDENCE_GATE');
 const output=p.stage==='RESEARCH_FLAG'&&!missing.length?'REGULATORY_RESEARCH_FLAG':'UNKNOWN';
 if(p.output!==output)throw Error('RADAR_FAIL_CLOSED');
 return{output,score,secondOrder:output==='UNKNOWN'?'UNKNOWN':secondOrderFlag(p),missing,canAuthorizePortfolioAction:false};
}
