import {canonical,deepFreeze} from './integrity.js';
export {canonical,deepFreeze};
export const DOMAINS=['AI_INFRASTRUCTURE','ENERGY_GRID_POWER','DEFENSE_STRATEGIC'];
export const ACTIONS=['RESEARCH','REUNDERWRITE','ZERO_BASED_RESEARCH','HISTORICAL_ANALOG_REVIEW'];
export const STRUCTURE=['mechanism','industryStructure','concentration','bottleneck','capitalIntensity','complianceCost','certification','supplyElasticity','durability','politicalContext','implementation','capture'];
export const EVENT_FIELDS=('jurisdiction agency policyType title publicationDate effectiveDate sector valueChainLayer verifiedPolicyMechanism statedObjective directBeneficiaries indirectBeneficiaries secondOrderBeneficiaries likelyLosers bottleneckBeneficiaries entryBarrierEffect complianceCostEffect subsidyMechanism procurementMechanism taxMechanism tariffMechanism reimbursementMechanism exportControlMechanism licensingMechanism domesticContentMechanism standardsMechanism publicLobbyingEvidence tradeAssociationEvidence standardsParticipation evidenceFor evidenceAgainst observedEconomics revenueImpact marginImpact backlogImpact marketShareImpact roicImpact fcfImpact competitiveResponse durability reversibility politicalRisk legalRisk implementationRisk causalityQuality evidenceQuality payer analogyConditions analogyFailure').split(' ');
export const HISTORY_FIELDS=('historicalEvent jurisdiction date policyMechanism industryBefore relevantCompanies publiclyObservableInterests lobbying statedGoal expectedBeneficiary actualBeneficiary expectedLoser actualLoser directBeneficiary secondOrderBeneficiary bottleneckBeneficiary transmission capitalRequirements concentration entryBarrierChange revenueOutcome marginOutcome backlogOutcome marketShareOutcome fcfOutcome roicOutcome valuationOutcome timeLag duration competedAway reversed politicalDestruction wrongBeneficiary lessons').split(' ');
export const COMPANY_FIELDS=('relationship valueChain bottleneck capacity competitors approvals certifications contracts customerConcentration revenueExposure backlogExposure marginEvidence fcfEvidence pricingPower counterevidence').split(' ');
export function exact(o,keys){if(!o||typeof o!=='object'||Array.isArray(o)||Object.keys(o).sort().join('|')!==[...keys].sort().join('|'))throw Error('RADAR_SCHEMA');}
export function text(x){if(typeof x!=='string'||!x.trim())throw Error('RADAR_TEXT');}
export function time(x){if(typeof x!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/.test(x)||!Number.isFinite(Date.parse(x)))throw Error('RADAR_TIME');return Date.parse(x);}
export function hashText(x){if(!/^[a-f0-9]{64}$/.test(x))throw Error('RADAR_HASH');}
export function claim(c,sources){
 if(c==='UNKNOWN')return;
 exact(c,['value','kind','evidenceRefs']);text(c.value);
 if(!['VERIFIED_POLICY','VERIFIED_PARTICIPATION','INFERRED_TRANSMISSION','OBSERVED_ECONOMICS','RESEARCH_INTERPRETATION'].includes(c.kind)||!Array.isArray(c.evidenceRefs)||!c.evidenceRefs.length)throw Error('RADAR_CLAIM');
 for(const id of c.evidenceRefs){const s=sources.find(s=>s.id===id);if(!s)throw Error('RADAR_PROVENANCE');
  if(c.kind==='VERIFIED_POLICY'&&(s.authority!=='GOVERNMENT'||s.category!=='POLICY'))throw Error('RADAR_POLICY_EVIDENCE');
  if(c.kind==='VERIFIED_PARTICIPATION'&&s.category!=='PARTICIPATION')throw Error('RADAR_PARTICIPATION');
  if(c.kind==='OBSERVED_ECONOMICS'&&!['OPERATING','OUTCOME'].includes(s.category))throw Error('RADAR_CAPTURE_EVIDENCE');
 }
}
export function claims(o,keys,sources){exact(o,keys);Object.values(o).forEach(c=>claim(c,sources));}
export const COMMON=['schemaVersion','id','timestamp','evidenceCutoff','mode','sources'];
export function base(p){
 text(p.id);if(time(p.evidenceCutoff)>time(p.timestamp)||!['CURRENT_REVIEW','RETROSPECTIVE_PIT'].includes(p.mode)||!Array.isArray(p.sources))throw Error('RADAR_PIT');
 const ids=new Set();for(const s of p.sources){
  exact(s,['id','url','publishedAt','observedAt','precision','authority','category','edition','locator','text','contentHash']);text(s.id);text(s.locator);text(s.text);hashText(s.contentHash);
  const u=new URL(s.url);if(u.protocol!=='https:'||u.username||u.password||u.port||!u.hostname.includes('.')||/^[\d.]+$/.test(u.hostname))throw Error('RADAR_URL');
  if(!['GOVERNMENT','ISSUER','PUBLIC_DISCLOSURE'].includes(s.authority)||!['POLICY','PARTICIPATION','OPERATING','OUTCOME'].includes(s.category)||!['DAY_END_BOUND','INSTANT','OBSERVATION_BOUND'].includes(s.precision)||!['PUBLIC_PAGE','DATED_DOCUMENT','ARCHIVED_PUBLICATION'].includes(s.edition)||ids.has(s.id))throw Error('RADAR_SOURCE');ids.add(s.id);
  if(s.authority==='GOVERNMENT'&&!/\.(gov|mil)$/.test(u.hostname))throw Error('RADAR_AUTHORITY');
  if(s.precision==='DAY_END_BOUND'&&!s.publishedAt.endsWith('T23:59:59.999Z'))throw Error('RADAR_PRECISION');
  const available=s.precision==='OBSERVATION_BOUND'&&s.publishedAt==='UNKNOWN'?time(s.observedAt):time(s.publishedAt);
  if(available>time(p.evidenceCutoff)||available>time(s.observedAt)||time(s.observedAt)>time(p.timestamp)||p.mode==='CURRENT_REVIEW'&&time(s.observedAt)>time(p.evidenceCutoff))throw Error('RADAR_PIT');
  if(p.mode==='RETROSPECTIVE_PIT'&&(s.edition==='PUBLIC_PAGE'||s.authority!=='GOVERNMENT'||s.publishedAt==='UNKNOWN'))throw Error('RADAR_CONTEMPORANEOUS_SOURCE_REQUIRED');
 }
}
export function validateEvent(p){
 exact(p,[...COMMON,'domain','stage','mechanismHash','fields','structure','transmission','companies','rentInputs','confidence','unsupportedIntent','nextResearch','output']);base(p);
 if(p.schemaVersion!=='argus.regulatory-event/1'||!DOMAINS.includes(p.domain)||p.mode!=='CURRENT_REVIEW'||!['POLICY_MAP','RESEARCH_FLAG'].includes(p.stage)||!['LOW','MEDIUM','HIGH'].includes(p.confidence)||p.unsupportedIntent!=='UNKNOWN'||!['UNKNOWN','REGULATORY_RESEARCH_FLAG'].includes(p.output))throw Error('RADAR_AUTHORITY_OR_SCOPE');
 claims(p.fields,EVENT_FIELDS,p.sources);claims(p.structure,STRUCTURE,p.sources);
 if(p.fields.verifiedPolicyMechanism!=='UNKNOWN'&&p.fields.verifiedPolicyMechanism.kind!=='VERIFIED_POLICY')throw Error('RADAR_POLICY_EVIDENCE');
 for(const k of ['publicLobbyingEvidence','tradeAssociationEvidence','standardsParticipation'])if(p.fields[k]!=='UNKNOWN'&&p.fields[k].kind!=='VERIFIED_PARTICIPATION')throw Error('RADAR_PARTICIPATION');
 for(const k of ['observedEconomics','revenueImpact','marginImpact','backlogImpact','marketShareImpact','roicImpact','fcfImpact'])if(p.fields[k]!=='UNKNOWN'&&p.fields[k].kind!=='OBSERVED_ECONOMICS')throw Error('RADAR_CAPTURE_EVIDENCE');
 if(p.fields.causalityQuality!=='UNKNOWN'&&!['INFERRED','OBSERVED_ASSOCIATION','ATTRIBUTED_STUDY'].includes(p.fields.causalityQuality.value))throw Error('RADAR_UNSUPPORTED_CAUSALITY');
 if(p.fields.causalityQuality!=='UNKNOWN'&&p.fields.causalityQuality.value!=='INFERRED'&&!p.fields.causalityQuality.evidenceRefs.some(id=>p.sources.some(s=>s.id===id&&['OPERATING','OUTCOME'].includes(s.category))))throw Error('RADAR_UNSUPPORTED_CAUSALITY');
 if(!Array.isArray(p.companies)||!Array.isArray(p.nextResearch)||!p.nextResearch.length)throw Error('RADAR_SCHEMA');
 p.nextResearch.forEach(r=>{exact(r,['kind','question']);if(!ACTIONS.includes(r.kind))throw Error('RADAR_NO_TRADE');text(r.question);});
 for(const c of p.companies){exact(c,['name','beneficiaryClass','status','fields']);text(c.name);claim(c.beneficiaryClass,p.sources);if(c.beneficiaryClass==='UNKNOWN'||!['POTENTIAL_BENEFICIARY','OBSERVED_RENT_CAPTURE'].includes(c.status))throw Error('RADAR_COMPANY');claims(c.fields,COMPANY_FIELDS,p.sources);if(c.fields.relationship==='UNKNOWN'||c.fields.counterevidence==='UNKNOWN')throw Error('RADAR_COMPANY_EVIDENCE');if(c.status==='OBSERVED_RENT_CAPTURE'&&![c.fields.marginEvidence,c.fields.fcfEvidence,c.fields.pricingPower].some(v=>v!=='UNKNOWN'&&v.kind==='OBSERVED_ECONOMICS'))throw Error('RADAR_CAPTURE_EVIDENCE');}
 if(p.stage==='POLICY_MAP'){if(p.mechanismHash!=='UNKNOWN'||p.companies.length||p.output!=='UNKNOWN')throw Error('RADAR_POLICY_FIRST');}else hashText(p.mechanismHash);
 return deepFreeze(structuredClone(p));
}
