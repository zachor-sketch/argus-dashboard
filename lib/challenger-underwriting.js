import {instant, ASSESSMENTS} from './challenger-model.js';
import {exact} from './challenger-pilot-model.js';
import {canonical, deepFreeze} from './integrity.js';

export const C_IDENTITIES = deepFreeze({
  FIS: {cik:'1136893', host:'www.investor.fisglobal.com', lane:'CORE_CHALLENGE'},
  IFF: {cik:'51253', host:'ir.iff.com', lane:'CORE_CHALLENGE'},
  AVGO: {cik:'1730168', host:'investors.broadcom.com', lane:'CORE_CHALLENGE'},
  INTU: {cik:'896878', host:'investors.intuit.com', lane:'CORE_CHALLENGE'},
  CLS: {cik:'1030894', host:'corporate.celestica.com', lane:'EXTERNAL_DISCOVERY'},
  TNK: {cik:'1419945', host:'www.teekay.com', lane:'EXTERNAL_DISCOVERY'},
  CRDO: {cik:'1807794', host:'investors.credosemi.com', lane:'EXTERNAL_DISCOVERY'},
  ARM: {cik:'1973239', host:'investors.arm.com', lane:'EXTERNAL_DISCOVERY'}
});
export const C_JOURNALS = Object.freeze(['underwriting/packs.jsonl','underwriting/packets.jsonl','underwriting/runs.jsonl']);
export const NORMALIZATION_TOPICS = Object.freeze(['workingCapital','capex','sbc','oneOffs','cycle','transactions']);
const text = x => { if(typeof x!=='string'||!x.trim())throw Error('UNDERWRITING_TEXT'); };
const digest = x => {if(!/^[a-f0-9]{64}$/.test(x))throw Error('UNDERWRITING_HASH');};
const date = x => { if(!/^\d{4}-\d{2}-\d{2}$/.test(x))throw Error('UNDERWRITING_DATE');instant(x+'T00:00:00Z'); };
export function validatePack(input) {
  const p=structuredClone(input);exact(p,['schemaVersion','id','timestamp','evidenceCutoff','ticker','company','lane','classification','candidateHash','sources','facts','gaps']);
  const identity=C_IDENTITIES[p.ticker];
  if(p.schemaVersion!=='argus.underwriting-pack/1'||!identity||p.lane!==identity.lane||p.classification!==(p.lane==='EXTERNAL_DISCOVERY'?'EXTERNAL_CANDIDATE':'CORE_MEMBER'))throw Error('UNDERWRITING_SCOPE');
  if(p.lane==='EXTERNAL_DISCOVERY')digest(p.candidateHash);else if(p.candidateHash!=='UNKNOWN')throw Error('UNDERWRITING_CANDIDATE');
  text(p.id);text(p.company);if(instant(p.evidenceCutoff)>instant(p.timestamp))throw Error('UNDERWRITING_PIT');
  if(!Array.isArray(p.sources)||!Array.isArray(p.facts)||!Array.isArray(p.gaps))throw Error('UNDERWRITING_SCHEMA');
  const ids=new Set();
  for(const s of p.sources){
    exact(s,['id','kind','url','publishedAt','observedAt','periodEnd','locator','method','precision']);text(s.id);text(s.locator);
    if(ids.has(s.id)||!['ANNUAL','QUARTERLY','ISSUER','MARKET','VERIFIED_PRICE'].includes(s.kind)||s.method!==(s.kind==='VERIFIED_PRICE'?'ARGUS_VERIFIED_SNAPSHOT':'PUBLIC_SOURCE_REVIEW')||!['DAY_END_BOUND','INSTANT'].includes(s.precision))throw Error('UNDERWRITING_SOURCE');ids.add(s.id);
    if(s.precision==='DAY_END_BOUND'&&!s.publishedAt.endsWith('T23:59:59.999Z'))throw Error('UNDERWRITING_PRECISION');
    if(instant(s.publishedAt)>instant(s.observedAt)||instant(s.observedAt)>instant(p.evidenceCutoff))throw Error('UNDERWRITING_PIT');date(s.periodEnd);
    if(Date.parse(s.periodEnd)>instant(s.publishedAt))throw Error('UNDERWRITING_PIT');
    const u=new URL(s.url);if(u.protocol!=='https:'||u.username||u.password||u.port||['MARKET','VERIFIED_PRICE'].includes(s.kind)&&(u.search||u.hash))throw Error('UNDERWRITING_SOURCE_AUTHORITY');
    const regulatory=u.hostname==='www.sec.gov'&&u.pathname.startsWith(`/Archives/edgar/data/${identity.cik}/`);
    const market=s.kind==='VERIFIED_PRICE'?['FIS','INTU'].includes(p.ticker)&&u.hostname==='stockanalysis.com'&&u.pathname.startsWith(`/stocks/${p.ticker.toLowerCase()}/`):
      u.hostname==='www.nasdaq.com'&&u.pathname===`/market-activity/stocks/${p.ticker.toLowerCase()}`||
      u.hostname==='stockanalysis.com'&&[`/stocks/${p.ticker.toLowerCase()}/`,`/stocks/${p.ticker.toLowerCase()}/history/`].includes(u.pathname)||
      ['finance.yahoo.com','finance.yahoo.co.jp'].includes(u.hostname)&&[`/quote/${p.ticker}`,`/quote/${p.ticker}/`,`/quote/${p.ticker}/history/`].includes(u.pathname);
    if(['ANNUAL','QUARTERLY'].includes(s.kind)?!regulatory:s.kind==='ISSUER'?![identity.host].includes(u.hostname):!market)throw Error('UNDERWRITING_SOURCE_AUTHORITY');
  }
  ids.clear();for(const f of p.facts){
    exact(f,['id','sourceId','locator','fact','metric','value','unit','periodStart','periodEnd','basis']);text(f.id);text(f.fact);text(f.locator);text(f.basis);
    const s=p.sources.find(s=>s.id===f.sourceId);if(!s||ids.has(f.id))throw Error('UNDERWRITING_PROVENANCE');ids.add(f.id);
    if(f.metric!=='NARRATIVE'&&(!['CFO','CAPEX','DILUTED_SHARES','SBC','CASH','DEBT','PRICE','OUTSTANDING_SHARES','ADJUSTMENT'].includes(f.metric)||!Number.isFinite(f.value)))throw Error('UNDERWRITING_METRIC');
    if(f.metric==='NARRATIVE'?(f.value!=='UNKNOWN'||f.unit!=='TEXT'):!['USD_M','SHARES_M','USD_PER_SHARE'].includes(f.unit))throw Error('UNDERWRITING_UNIT');
    const unit={DILUTED_SHARES:'SHARES_M',OUTSTANDING_SHARES:'SHARES_M',PRICE:'USD_PER_SHARE'}[f.metric]||'USD_M';
    if(f.metric!=='NARRATIVE'&&f.unit!==unit)throw Error('UNDERWRITING_UNIT');
    date(f.periodStart);date(f.periodEnd);if(f.periodStart>f.periodEnd||Date.parse(f.periodEnd)>instant(s.publishedAt))throw Error('UNDERWRITING_PERIOD');
    if(['CAPEX','SBC','CASH','DEBT'].includes(f.metric)&&f.value<0||['DILUTED_SHARES','OUTSTANDING_SHARES','PRICE'].includes(f.metric)&&f.value<=0)throw Error('UNDERWRITING_VALUE');
    if(f.metric==='DILUTED_SHARES'&&f.basis!=='DILUTED_WEIGHTED_AVERAGE'||f.metric==='OUTSTANDING_SHARES'&&f.basis!=='OUTSTANDING_ALL_CLASSES'||f.metric==='PRICE'&&(f.basis!=='MARKET_QUOTE'||!['MARKET','VERIFIED_PRICE'].includes(s.kind)||s.precision!=='INSTANT'))throw Error('UNDERWRITING_SHARE_OR_PRICE_BASIS');
    if(f.metric==='PRICE'&&(f.periodStart!==f.periodEnd||f.periodEnd!==s.publishedAt.slice(0,10)||s.periodEnd!==f.periodEnd))throw Error('UNDERWRITING_PRICE_DATE');
  }
  p.gaps.forEach(text);return deepFreeze(p);
}
function fact(p,id,metric){const f=p.facts.find(f=>f.id===id);if(!f||f.metric!==metric)throw Error('UNDERWRITING_CALC_REFERENCE');return f;}
function assessment(a,ids){if(a==='UNKNOWN')return;exact(a,['value','evidenceRefs']);text(a.value);if(a.value==='UNKNOWN'||!Array.isArray(a.evidenceRefs)||!a.evidenceRefs.length||a.evidenceRefs.some(id=>!ids.has(id)))throw Error('UNDERWRITING_UNSUPPORTED');}
export function calculateUnderwriting(input, recipe) {
  const p=validatePack(input);exact(recipe,['cfo','capex','shares','normalization','valuation',...('specialist' in recipe?['specialist']:[])]);
  let reported='UNKNOWN', normalized='UNKNOWN', valuation='UNKNOWN', sbcChargedSensitivity='UNKNOWN';
  if([recipe.cfo,recipe.capex,recipe.shares].every(x=>x!=='UNKNOWN')){
    const c=fact(p,recipe.cfo,'CFO'),k=fact(p,recipe.capex,'CAPEX'),s=fact(p,recipe.shares,'DILUTED_SHARES');
    if([k,s].some(f=>f.periodStart!==c.periodStart||f.periodEnd!==c.periodEnd))throw Error('UNDERWRITING_PERIOD_MISMATCH');
    reported={fcf:c.value-k.value,fcfPerShare:(c.value-k.value)/s.value,periodStart:c.periodStart,periodEnd:c.periodEnd,unit:'USD_M / USD_PER_SHARE',formula:'(CFO - total cash capex) / diluted weighted-average shares',evidenceRefs:[c.id,k.id,s.id]};
    const compensation=p.facts.filter(f=>f.metric==='SBC'&&f.periodStart===c.periodStart&&f.periodEnd===c.periodEnd);
    if(compensation.length===1)sbcChargedSensitivity={fcf:reported.fcf-compensation[0].value,fcfPerShare:(reported.fcf-compensation[0].value)/s.value,formula:'(CFO - cash capex - reported SBC) / diluted weighted-average shares',evidenceRefs:[c.id,k.id,s.id,compensation[0].id],status:'SENSITIVITY_ONLY_NOT_NORMALIZED',limitations:'No tax, working-capital, transaction, cycle or replacement-capex normalization; not fair value.'};
    if(recipe.normalization!=='UNKNOWN'){
      const n=recipe.normalization;exact(n,['adjustments','review']);exact(n.review,NORMALIZATION_TOPICS);
      if(!Array.isArray(n.adjustments))throw Error('UNDERWRITING_NORMALIZATION');const ids=new Set(p.facts.map(f=>f.id));
      for(const topic of NORMALIZATION_TOPICS){assessment(n.review[topic],ids);if(n.review[topic]==='UNKNOWN')throw Error('UNDERWRITING_NORMALIZATION');}
      let adjustment=0;const seen=new Set();for(const a of n.adjustments){exact(a,['factId','sign','rationale']);text(a.rationale);if(![-1,1].includes(a.sign)||seen.has(a.factId))throw Error('UNDERWRITING_NORMALIZATION');seen.add(a.factId);
        const f=p.facts.find(f=>f.id===a.factId&&['ADJUSTMENT','SBC'].includes(f.metric));if(!f||f.periodStart!==c.periodStart||f.periodEnd!==c.periodEnd)throw Error('UNDERWRITING_NORMALIZATION');adjustment+=a.sign*f.value;
      }
      normalized={...reported,fcf:reported.fcf+adjustment,fcfPerShare:(reported.fcf+adjustment)/s.value,formula:'(CFO - total cash capex + reviewed signed adjustments) / diluted weighted-average shares',evidenceRefs:[...reported.evidenceRefs,...n.adjustments.map(a=>a.factId)],review:n.review};
    }
  } else if(recipe.normalization!=='UNKNOWN')throw Error('UNDERWRITING_NORMALIZATION');
  if(recipe.valuation!=='UNKNOWN'){
    const v=recipe.valuation;exact(v,['price','shares','cash','debt','shareBridge']);
    const price=fact(p,v.price,'PRICE'),shares=fact(p,v.shares,'OUTSTANDING_SHARES'),cash=fact(p,v.cash,'CASH'),debt=fact(p,v.debt,'DEBT');
    const source=p.sources.find(s=>s.id===price.sourceId),age=instant(p.evidenceCutoff)-instant(source.publishedAt);
    if(age<0||age>24*60*60*1000||shares.periodEnd>price.periodEnd||cash.periodEnd>price.periodEnd||cash.periodEnd!==debt.periodEnd)throw Error('UNDERWRITING_VALUATION_PIT');
    assessment(v.shareBridge,new Set(p.facts.map(f=>f.id)));if(v.shareBridge==='UNKNOWN')throw Error('UNDERWRITING_SHARE_BRIDGE');
    valuation={equityValueUSDm:price.value*shares.value,enterpriseValueUSDm:price.value*shares.value+debt.value-cash.value,price:price.value,priceAt:source.publishedAt,sharesAsOf:shares.periodEnd,balanceSheetAsOf:cash.periodEnd,evidenceRefs:[price.id,shares.id,cash.id,debt.id],formula:'price * outstanding shares + debt - cash',scope:'Simple EV; other claims require reviewed assessment. No annualization or fair value implied.'};
  }
  for(const result of [reported,normalized,sbcChargedSensitivity,valuation])if(result!=='UNKNOWN'&&Object.values(result).some(v=>typeof v==='number'&&!Number.isFinite(v)))throw Error('UNDERWRITING_NUMERIC_OVERFLOW');
  const result={reported,normalized,sbcChargedSensitivity,valuation};
  if('specialist' in recipe){
    result.specialist=calculateSpecialist(p,recipe.specialist,reported);
    if(normalized!=='UNKNOWN'&&result.specialist.missing.length)throw Error('UNDERWRITING_SPECIALIST_INCOMPLETE');
    if(p.ticker==='TNK'&&normalized!=='UNKNOWN')throw Error('UNDERWRITING_TNK_SECTOR_REQUIRED');
    if(valuation!=='UNKNOWN'&&(result.specialist.price==='UNKNOWN'||result.specialist.price.factId!==recipe.valuation.price||Object.values(recipe.specialist.valuationReview).some(v=>v==='UNKNOWN')))throw Error('UNDERWRITING_VALUATION_BRIDGE');
  }
  return deepFreeze(result);
}

// C.1 extends the existing recipe and journals; historical Phase C replay is unchanged.
export const SPECIALIST_TOPICS=deepFreeze({
 FIS:['worldpayTaxes','integration','capitalizedSoftware','debtService','recurringAcquisitionCosts','workingCapital'],
 IFF:['continuingCFO','discontinuedCapex','strandedCosts','disposalDebtBridge','buybackShares'],
 AVGO:['gaapNonGaapShares','sbc','acquisitionCosts','hyperscalerDemand','workingCapitalCapex','bearBaseBullDemand'],
 INTU:['fy2026Annual','workingCapitalTaxes','sbc','capitalizedInvestmentLending','dilutedShares'],
 CLS:['workingCapitalFunding','maintenanceGrowthCapex','shareIssuance','ownerCashPerShareGrowth'],
 TNK:['fleetMarketValueNAV','netCash','vesselSaleGains','normalizedTCE','drydock','fleetRenewal','bearBaseBullSector'],
 CRDO:['sbcDilution','acquisitionObligations','workingCapital','ownerCashPerShareGrowth'],
 ARM:['collectionsTaxes','sbcDilution','recurringCapitalIntangibles','ownerCashPerShare']
});
export function selectPrice(input){
 const p=validatePack(input);
 const eligible=p.facts.filter(f=>f.metric==='PRICE').map(f=>({f,s:p.sources.find(s=>s.id===f.sourceId)})).filter(({s})=>instant(p.evidenceCutoff)-instant(s.publishedAt)<=86400000);
 const verified=eligible.filter(({s})=>s.kind==='VERIFIED_PRICE');
 const pool=verified.length?verified:eligible;if(!pool.length)return 'UNKNOWN';
 pool.sort((a,b)=>instant(b.s.publishedAt)-instant(a.s.publishedAt));const first=pool[0];
 if(pool.some(({f,s})=>instant(s.publishedAt)===instant(first.s.publishedAt)&&f.value!==first.f.value))return 'UNKNOWN';
 return deepFreeze({factId:first.f.id,value:first.f.value,at:first.s.publishedAt,source:first.s.url,policy:verified.length?'ARGUS_VERIFIED_FIRST':'PUBLIC_TIMESTAMPED_FALLBACK'});
}
function calculateSpecialist(p,b,reported){
 exact(b,['method','adjustments','review','valuationReview']);
 if(b.method!==(p.ticker==='TNK'?'FLEET_NAV_TCE':p.ticker+'_OWNER_ECONOMICS'))throw Error('UNDERWRITING_SPECIALIST_METHOD');
 exact(b.review,SPECIALIST_TOPICS[p.ticker]);exact(b.valuationReview,['shares','cashDebt','otherClaims']);
 const ids=new Set(p.facts.map(f=>f.id)),missing=[];
 for(const [k,v] of Object.entries(b.review)){assessment(v,ids);if(v==='UNKNOWN')missing.push(k);}
 for(const [k,v] of Object.entries(b.valuationReview)){assessment(v,ids);if(v==='UNKNOWN')missing.push('valuation.'+k);}
 if(!Array.isArray(b.adjustments))throw Error('UNDERWRITING_SPECIALIST_ADJUSTMENT');
 const seen=new Set(),keys=new Set();let delta=0;
 const rows=b.adjustments.map(a=>{
   exact(a,['key','sign','factId','rationale']);text(a.key);text(a.rationale);
   if(![-1,1].includes(a.sign)||keys.has(a.key))throw Error('UNDERWRITING_SPECIALIST_ADJUSTMENT');keys.add(a.key);
   if(a.factId==='UNKNOWN'){missing.push('adjustment.'+a.key);return {...a,signedUSDm:'UNKNOWN',source:'UNKNOWN'};}
   const f=p.facts.find(f=>f.id===a.factId);
   if(!f||!['ADJUSTMENT','SBC'].includes(f.metric)||f.value<0||seen.has(f.id)||reported==='UNKNOWN'||f.periodStart!==reported.periodStart||f.periodEnd!==reported.periodEnd)throw Error('UNDERWRITING_SPECIALIST_ADJUSTMENT');
   seen.add(f.id);delta+=a.sign*f.value;return {...a,signedUSDm:a.sign*f.value,source:p.sources.find(s=>s.id===f.sourceId).url,locator:f.locator};
 });
 const shares=reported==='UNKNOWN'?null:fact(p,reported.evidenceRefs[2],'DILUTED_SHARES');
 const subtotal=p.ticker==='TNK'||reported==='UNKNOWN'?'UNKNOWN':{fcf:reported.fcf+delta,fcfPerShare:(reported.fcf+delta)/shares.value,periodStart:reported.periodStart,periodEnd:reported.periodEnd,status:'PARTIAL_BRIDGE_NOT_NORMALIZED',evidenceRefs:[...reported.evidenceRefs,...seen]};
 if(subtotal!=='UNKNOWN'&&(!Number.isFinite(subtotal.fcf)||!Number.isFinite(subtotal.fcfPerShare)))throw Error('UNDERWRITING_NUMERIC_OVERFLOW');
 return {method:b.method,rows,subtotal,price:selectPrice(p),missing};
}
export function formUnderwriting(packInput,draft,{id,timestamp,packHash}) {
  const p=validatePack(packInput);digest(packHash);text(id);
  exact(draft,['ticker','independentState','recipe','assessments','evidenceFor','evidenceAgainst','nextResearch']);exact(draft.assessments,ASSESSMENTS);
  if(draft.ticker!==p.ticker||instant(timestamp)<instant(p.timestamp))throw Error('UNDERWRITING_IDENTITY_OR_SEQUENCE');
  const allowed=p.lane==='EXTERNAL_DISCOVERY'?['UNKNOWN','NEW_OPPORTUNITY','CONTRARIAN_TRAP']:['UNKNOWN','FAVORABLE','UNFAVORABLE','NEW_OPPORTUNITY','CONTRARIAN_TRAP'];
  if(!allowed.includes(draft.independentState))throw Error('UNDERWRITING_ACTION_OR_ANCHOR');
  const ids=new Set(p.facts.map(f=>f.id));for(const side of ['evidenceFor','evidenceAgainst'])if(!Array.isArray(draft[side])||draft[side].some(id=>!ids.has(id)))throw Error('UNDERWRITING_PROVENANCE');
  if(draft.evidenceFor.some(id=>draft.evidenceAgainst.includes(id)))throw Error('UNDERWRITING_DUPLICATE_SIDES');
  for(const a of Object.values(draft.assessments))assessment(a,ids);
  if(!Array.isArray(draft.nextResearch)||!draft.nextResearch.length)throw Error('UNDERWRITING_RESEARCH');
  draft.nextResearch.forEach(r=>{exact(r,['kind','question']);if(!['RESEARCH','REUNDERWRITE'].includes(r.kind))throw Error('UNDERWRITING_ACTION');text(r.question);});
  const calculations=calculateUnderwriting(p,draft.recipe);
  const missing=[...p.gaps];for(const kind of ['ANNUAL','QUARTERLY','ISSUER'])if(!p.sources.some(s=>s.kind===kind))missing.push(kind);
  for(const k of ['normalized','valuation'])if(calculations[k]==='UNKNOWN')missing.push(k.toUpperCase());
  for(const k of ASSESSMENTS.filter(k=>k!=='marketConsensusBelief'))if(draft.assessments[k]==='UNKNOWN')missing.push(k);
  if(!draft.evidenceFor.length||!draft.evidenceAgainst.length)missing.push('TWO_SIDED_EVIDENCE');
  if(draft.independentState!=='UNKNOWN'&&missing.length)throw Error('UNDERWRITING_INSUFFICIENT_EVIDENCE');
  return deepFreeze({schemaVersion:'argus.underwriting-packet/1',id,timestamp,ticker:p.ticker,lane:p.lane,classification:p.classification,evidenceCutoff:p.evidenceCutoff,packHash,draft,calculations,missingGates:missing,canAuthorizePortfolioAction:false});
}
export function researchRoute(p){return {kind:'RESEARCH',queue:p.draft.independentState==='NEW_OPPORTUNITY'?'ZERO_BASED_ONBOARDING_RESEARCH':'EVIDENCE_COMPLETION',requiresReviewedOnboarding:p.lane==='EXTERNAL_DISCOVERY',canAuthorizePortfolioAction:false};}
export function same(a,b){return canonical(a)===canonical(b);}
