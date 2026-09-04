// Deterministic excerpt detection, not valuation or recommendation logic.
export const RULES=[
 ['guidance','Guidance / forward operating outlook',/guidance|outlook|forecast/i,'high'],
 ['earnings','Reported earnings',/quarter(?:ly)? (?:results|earnings)|financial results|annual results/i,'high'],
 ['revenue','Revenue / organic growth',/\brevenue\b|net sales|organic growth/i,'medium'],
 ['margin','Operating / gross margin',/gross margin|operating margin|profit margin/i,'medium'],
 ['cash_flow','FCF / cash conversion',/free cash flow|operating cash flow|cash (?:provided by|used in) operating/i,'medium'],
 ['backlog','Backlog / bookings conversion',/\bbacklog\b|\bbookings\b|remaining performance obligations/i,'medium'],
 ['customer_concentration','Customer concentration',/customer concentration|largest customer|major customer|single customer/i,'high'],
 ['debt_liquidity','Debt / liquidity / survival',/covenant|going concern|liquidity|debt maturit|credit facilit|default on/i,'high'],
 ['dilution','Share count / SBC / per-share economics',/stock.based compensation|share.based compensation|dilut(?:ion|ed shares)|shares outstanding/i,'medium'],
 ['capital_allocation','Capital allocation / incremental returns',/share repurchase|buyback|capital expenditure|dividend|capital allocation/i,'medium'],
 ['merger_acquisition','Acquisition / integration / price paid',/acqui(?:re|red|sition)|merger|divestiture/i,'high'],
 ['management','Management / stewardship',/chief executive|chief financial|CEO|CFO|resign(?:ed|ation)|succession/i,'high'],
 ['regulatory','Regulatory / legal transmission',/export control|sanction|antitrust|regulatory approval|clinical trial|FDA approval/i,'high']
];
export function plainText(html){return html.replace(/<(script|style|noscript)\b[^>]*>[\s\S]*?<\/\1>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&(?:nbsp|#160);/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim()}
export function sensorTerms(company){return [...new Set((company.sensors+' '+company.engine).toLowerCase().match(/[a-z][a-z0-9-]{2,}/g)||[])].filter(w=>!new Set(['and','the','for','per','not','are','was','any','all','with','from','that','this','into','around','before','after','require','normalized','independently','verified','versus','through','between','their']).has(w))}
export function extractEvidence(html,company){
 const text=plainText(html),out=[];
 for(const [type,variable,pattern,materiality] of RULES){
  const matches=[...text.matchAll(new RegExp(pattern.source,'gi'))];
  // Keep up to two representative excerpts per category, including numbers when disclosed.
  const candidates=matches.map(m=>text.slice(Math.max(0,m.index-100),Math.min(text.length,m.index+400))).filter(s=>/\d|increase|decrease|raise|lower|appoint|resign|acquir|merger|default/i.test(s));
  for(const rawFact of [...new Set(candidates)].slice(0,2))out.push({eventType:type,variable,rawFact,likelyDirection:'ambiguous',materiality,reviewRequired:materiality==='high',interpretation:'Keyword-matched source excerpt; human review required to establish change, period, causality and significance.'});
 }
 const terms=sensorTerms(company),sentences=text.split(/(?<=[.!?])\s+(?=[A-Z])/);
 const matches=sentences.filter(s=>s.length>30&&terms.filter(w=>s.toLowerCase().includes(w)).length>=2&&/\d|increase|decrease|change|growth|decline/i.test(s));
 for(const s of matches.slice(0,3))out.push({eventType:'company_sensor',variable:company.sensors,rawFact:s.slice(0,700),likelyDirection:'ambiguous',materiality:'medium',reviewRequired:false,interpretation:'Company-specific critical sensor match; no inferred valuation change.'});
 return out;
}
export function filingRows(data,cutoff,now){
 const r=data?.filings?.recent;if(!Array.isArray(r?.accessionNumber)||!Array.isArray(r.form)||!Array.isArray(r.filingDate)||!Array.isArray(r.primaryDocument))throw Error('INVALID_SEC_SUBMISSIONS');
 return r.accessionNumber.map((id,i)=>({accession:id,form:r.form[i],date:r.acceptanceDateTime?.[i]||r.filingDate[i]+'T00:00:00Z',document:r.primaryDocument[i],items:r.items?.[i]||''})).filter(r=>/^(10-[KQ]|8-K|6-K|20-F|40-F|NT 10-[KQ]|S-[134]|F-[134]|DEF 14A)(\/A)?$/.test(r.form)&&Date.parse(r.date)>=cutoff&&Date.parse(r.date)<=now);
}
export function documentLinks(html,base){
 const found=[];for(const m of html.matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi)){
  try{const u=new URL(m[1].replace(/&amp;/g,'&'),base);u.hash='';if(u.protocol!=='https:'||u.origin!==new URL(base).origin)continue;const label=plainText(m[2]);if(/earnings|results|release|guidance|acqui|merger|ex(?:hibit)?[\s._-]*99/i.test(label+' '+u.pathname))found.push({url:u.href,title:label})}catch{}
 }return [...new Map(found.map(x=>[x.url,x])).values()];
}
export function attributes(tag){return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g)].map(m=>[m[1].toLowerCase(),m[2]??m[3]]))}
export function sourceDate(value,dateOrder){
 if(!value)return null;value=plainText(value).trim();let m=value.match(/^(\d{4})-(\d{2})-(\d{2})(?:$|T)/),year,month,day;
 if(m){[,year,month,day]=m.map(Number)}else{
  const months='jan feb mar apr may jun jul aug sep oct nov dec'.split(' ');
  m=value.match(/^(\d{1,2})\s+([A-Za-z]{3,9})\s+(\d{4})(?:\b)/);if(m){day=+m[1];month=months.indexOf(m[2].slice(0,3).toLowerCase())+1;year=+m[3]}
  else if((m=value.match(/^([A-Za-z]{3,9})\s+(\d{1,2}),?\s+(\d{4})\b/))){month=months.indexOf(m[1].slice(0,3).toLowerCase())+1;day=+m[2];year=+m[3]}
  else if((m=value.match(/^(\d{1,2})[/.](\d{1,2})[/.](\d{4})$/))){const order=dateOrder||(+m[1]>12?'DMY':+m[2]>12?'MDY':null);if(!order)return null;year=+m[3];month=+(order==='MDY'?m[1]:m[2]);day=+(order==='MDY'?m[2]:m[1])}
  else if(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s+\d{1,2}\s+[A-Za-z]{3}\s+\d{4}\s+\d{2}:\d{2}/.test(value)){const t=Date.parse(value);return Number.isFinite(t)?new Date(t).toISOString():null}
  else return null;
 }
 const d=new Date(Date.UTC(year,month-1,day));if(d.getUTCFullYear()!==year||d.getUTCMonth()!==month-1||d.getUTCDate()!==day)return null;
 if(/^\d{4}-\d\d-\d\dT/.test(value)){const t=Date.parse(value);return Number.isFinite(t)?new Date(t).toISOString():null}return d.toISOString();
}
export function publicationDate(html,{dateOrder,headerDate=false}={}){
 // Never use modification dates, HTTP Last-Modified, arbitrary footer years, or one entry's date for a whole index.
 const raw=[];
 for(const m of html.matchAll(/<(?:meta|time)\b[^>]*>/gi)){const a=attributes(m[0]);if(/^(?:article:published_time|datepublished|date)$/i.test(a.property||a.name||a.itemprop||''))raw.push(a.content||a.datetime);else if(/^<time\b/i.test(m[0])&&a.datetime)raw.push(a.datetime)}
 for(const m of html.matchAll(/"datePublished"\s*:\s*"([^"]+)"/gi))raw.push(m[1]);
 const visible=html.replace(/<(script|style|nav|footer)\b[^>]*>[\s\S]*?<\/\1>/gi,' ');
 const explicit=[...visible.matchAll(/<[^>]+>\s*(?:Published on\s+)([^<]+)(?=<)/gi)].map(m=>sourceDate(m[1],dateOrder)).filter(Boolean);
 for(const m of visible.matchAll(/<[^>]+(?:class|itemprop)=["'][^"']*(?:date|published)[^"']*["'][^>]*>([^<]+)(?=<)/gi)){if(/updated|modified/i.test(m[0]))continue;const d=sourceDate(m[1],dateOrder);if(d)explicit.push(d)}
 // Enabled only for a source route whose visible article-header date format was inspected.
 if(headerDate){const h=visible.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/i);if(h){const head=visible.slice(h.index+h[0].length,h.index+h[0].length+10000);for(const m of [...head.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)].slice(0,3)){const v=plainText(m[1]);if(/^\d{1,2}[/.]\d{1,2}[/.]\d{4}$/.test(v)){const d=sourceDate(v,dateOrder);if(d)explicit.push(d)}}}}
 const unique=[...new Set(explicit)],dates=[...new Set(raw.map(v=>sourceDate(v,dateOrder)).filter(Boolean))];
 if(unique.length){if(unique.length!==1)return null;return dates.length===1&&dates[0].slice(0,10)===unique[0].slice(0,10)?dates[0]:unique[0]}
 return dates.length===1?dates[0]:null;
}
