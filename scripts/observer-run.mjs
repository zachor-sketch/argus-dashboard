import {fileURLToPath} from 'node:url';
import path from 'node:path';
import {MONITORS,OBSERVER_CONFIG as C,MACRO_SOURCES} from '../lib/observer-config.js';
import {extractEvidence,filingRows,documentLinks,publicationDate,plainText} from '../lib/observer-rules.js';
import {appendJournal,readJournal,assertBaseline,hash,validateChain,JOURNALS} from './observer-store.mjs';

const root=path.resolve(fileURLToPath(new URL('..',import.meta.url)));
export {makeClient} from './observer-http.mjs';
import {makeClient} from './observer-http.mjs';
import {resolveCompanySEC,assertSECIdentity} from './observer-sec.mjs';
import {classifyScan} from '../lib/observer-model.js';
import {collectIssuer} from './observer-ir.mjs';
import {failureCategory} from '../lib/observer-failures.js';
export async function runObserver({directory=root,client=makeClient(),companies=MONITORS,now=new Date(),runId=process.env.GITHUB_RUN_ID?process.env.GITHUB_RUN_ID+'-'+(process.env.GITHUB_RUN_ATTEMPT||1):now.toISOString(),macroSources=MACRO_SOURCES}={}){
 assertBaseline();for(const name of JOURNALS)validateChain(readJournal(directory,name));
 const started=now.toISOString(),cutoff=now.getTime()-C.lookbackDays*86400000,deadline=Date.now()+16*60*1000;
 const existing=readJournal(directory,'documents.jsonl'),seen=new Set(existing.map(d=>d.id)),complete=new Set(existing.filter(d=>d.complete).map(d=>d.url));
 const history=readJournal(directory,'scans.jsonl');
 const events=[],documents=[],results=[],failedSources=[];let tickerMap={};
 const failure=(ticker,source,error,context={})=>{const message=String(error.message||error).slice(0,180),f={ticker,source,error:message,category:failureCategory(message),...(context.discoveredFrom?{discoveredFrom:context.discoveredFrom}:{})};failedSources.push(f);return f};
 const get=async url=>{if(Date.now()>deadline)throw Error('SCAN_BUDGET_EXHAUSTED');return client(url)};
 function event(company,source,timestamp,tier,item){
  const payload={ticker:company.ticker,timestamp,detectedAt:started,source,sourceAuthorityTier:tier,...item,decisionImpact:'NONE',status:item.reviewRequired?'OPEN':'EVIDENCE',ruleVersion:1};
  payload.id=hash([payload.ticker,source,timestamp,item.eventType,item.variable,item.rawFact]);events.push(payload);
 }
 async function ingest(company,url,date,tier,windowStart=cutoff,context={}){
  const html=context.html??await get(url);if(plainText(html).length<100)throw Error('EMPTY_OR_UNPARSEABLE_DOCUMENT');
  const timestamp=date||publicationDate(html);if(!timestamp)throw Error('PUBLICATION_DATE_UNAVAILABLE');
  if(Date.parse(timestamp)>now.getTime())throw Error('FUTURE_PUBLICATION_DATE');
  if(Date.parse(timestamp)<windowStart)return html;
  const id=hash([company.ticker,url,hash(html)]);if(seen.has(id))return html;
  const provenance=context.dateSource?{publicationDateSource:context.dateSource,publicationDateMethod:context.dateMethod}:{};
  for(const item of extractEvidence(html,company))event(company,url,timestamp,tier,{...item,...provenance});
  documents.push({id,ticker:company.ticker,url,contentHash:hash(html),observedAt:started,publishedAt:timestamp,complete:false,...provenance});seen.add(id);return html;
 }
 try{tickerMap=JSON.parse(await get('https://www.sec.gov/files/company_tickers.json'));if(!Object.values(tickerMap).some(r=>r.ticker&&r.cik_str))throw Error('INVALID_SEC_TICKER_MAP')}catch(e){failure('*','https://www.sec.gov/files/company_tickers.json',e)}
 for(const company of companies){
  const prior=history.slice().reverse().flatMap(s=>s.companies||[]).find(c=>c.ticker===company.ticker&&c.ok);
  const companyCutoff=prior?Date.parse(prior.lastSuccessfulScan):history.length?Date.parse(history[0].startedAt)-C.lookbackDays*86400000:cutoff;
  const before=failedSources.length;let secOK=false,irOK=false,sources=[];
  try{
   if(!company.secApplicable)throw Error('SEC_NOT_APPLICABLE');
   const entry=resolveCompanySEC(company,tickerMap,existing),ticker=entry.ticker;
   const cik=entry.cik,url=`https://data.sec.gov/submissions/CIK${cik}.json`;sources.push(url);
   const data=JSON.parse(await get(url));assertSECIdentity(data,entry);
   documents.push({id:hash(['SEC_IDENTITY',ticker,cik]),kind:'SEC_IDENTITY',ticker,cik,source:url,mappingSource:entry.mappingSource,validated:true,observedAt:started,...(company.secTicker?{universeTicker:company.ticker,aliasAuthority:company.sourceRoute.source}:{})});
   const filings=filingRows(data,companyCutoff,now.getTime()).map(r=>({...r,url:`https://www.sec.gov/Archives/edgar/data/${Number(cik)}/${r.accession.replaceAll('-','')}/${r.document}`})).filter(r=>!complete.has(r.url));
   if(filings.length>C.maxDocumentsPerCompany)failure(company.ticker,url,'FILING_BACKLOG_REQUIRES_NEXT_SCAN');
   for(const filing of filings.slice(0,C.maxDocumentsPerCompany)){
    event(company,filing.url,filing.date,'T1_SEC_FILING',{eventType:'regulatory_filing',variable:company.engine,rawFact:`SEC ${filing.form} filed; accession ${filing.accession}; items ${filing.items||'not specified'}. Contents require underwriting review.`,likelyDirection:'ambiguous',materiality:'high',reviewRequired:true});
    try{
     const html=await ingest(company,filing.url,filing.date,'T1_SEC_FILING',companyCutoff);
     const exhibits=documentLinks(html,filing.url).filter(x=>/99|exhibit/i.test(x.url+' '+x.title));
     if(exhibits.length>3)throw Error('EXHIBIT_BACKLOG_REQUIRES_MANUAL_REVIEW');
     for(const exhibit of exhibits)await ingest(company,exhibit.url,filing.date,'T1_SEC_EXHIBIT',companyCutoff);
     documents.push({id:hash(['complete',filing.url]),ticker:company.ticker,url:filing.url,observedAt:started,complete:true});
    }catch(e){failure(company.ticker,filing.url,e)}
   }
   secOK=true;
  }catch(e){if(company.secApplicable)failure(company.ticker,'SEC EDGAR',e)}
  // Issuer site fallback for non-US listings or unavailable SEC coverage. Never treat an IR home page as a release.
  if(!secOK){
   const issuerGet=url=>get(url);issuerGet.finalURL=url=>client.finalURL?.(url)||url;
   const result=await collectIssuer({company,get:issuerGet,maxDocuments:C.maxDocumentsPerCompany,failure:(url,e,context)=>failure(company.ticker,url,e,context),ingest:(url,date,html,dateSource,dateMethod)=>ingest(company,url,date,'T1_ISSUER',companyCutoff,{html,dateSource,dateMethod})});
   irOK=result.usable;sources.push(...result.sources);
  }
  const ok=failedSources.length===before&&(secOK||irOK);
  results.push({ticker:company.ticker,ok,usable:secOK||irOK,secApplicable:company.secApplicable,secSubmissionsSuccessful:secOK,secSuccessful:secOK&&ok,coverage:secOK?'SEC_FILINGS_AND_EXHIBITS':irOK?'PARTIAL_IR':'UNAVAILABLE',sources,lastSuccessfulScan:ok?started:prior?.lastSuccessfulScan||null,attemptedAt:started});
 }
 for(const feed of macroSources){
  try{
   const content=await get(feed.url);let entries;
   if(feed.url.includes('federalregister.gov')){const data=JSON.parse(content);if(!Array.isArray(data.results))throw Error('INVALID_REGULATOR_RESPONSE');entries=data.results.map(r=>({title:r.title,url:r.html_url,date:r.publication_date+'T00:00:00Z'}))}
   else{if(!/<rss|<feed/i.test(content))throw Error('INVALID_RSS');entries=[...content.matchAll(/<item>([\s\S]*?)<\/item>/gi)].map(m=>{const field=k=>plainText((m[1].match(new RegExp('<'+k+'[^>]*>([\\s\\S]*?)</'+k+'>','i'))||[])[1]||'');return {title:field('title'),url:field('link'),date:field('pubDate')}})}
   for(const entry of entries){const time=Date.parse(entry.date);if(!Number.isFinite(time)||time<cutoff||time>now.getTime()||!feed.terms.test(entry.title)||!/^https:\/\//.test(entry.url))continue;
    for(const company of companies.filter(c=>!feed.sectors||feed.sectors.includes(c.sector)))event(company,entry.url,new Date(time).toISOString(),feed.tier,{eventType:'macro_transmission',variable:feed.variable+' → '+company.engine,rawFact:entry.title,likelyDirection:'ambiguous',materiality:'high',reviewRequired:true,interpretation:'Official announcement title; sector transmission is a review hypothesis, not established company impact.'});
   }
  }catch(e){failure('*',feed.url,e)}
 }
 const added=appendJournal(directory,'events.jsonl',events);appendJournal(directory,'documents.jsonl',documents);
 const secDiagnostics=client.diagnostics?.()||{blockedHosts:[],requests:[]};
 const previous=readJournal(directory,'scans.jsonl').at(-1),classification=classifyScan(results,failedSources,companies.length,secDiagnostics),ok=classification.status==='SUCCESS';
 const scan={id:'scan-'+runId,startedAt:started,finishedAt:new Date().toISOString(),...classification,secDiagnostics,lastSuccessfulScan:ok?started:previous?.lastSuccessfulScan||null,universeCount:companies.length,companies:results,failedSources,newEvidence:added.length,highMateriality:added.filter(e=>e.materiality==='high').length,windowStart:new Date(cutoff).toISOString(),runUrl:process.env.GITHUB_RUN_ID?`https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`:null};
 appendJournal(directory,'scans.jsonl',[scan]);assertBaseline();return scan;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 try{const scan=await runObserver();console.log(JSON.stringify({status:scan.status,completeCompanies:scan.completeCompanies,usableCompanies:scan.usableCompanies,unavailableCompanies:scan.unavailableCompanies,secSuccessfulCompanies:scan.secSuccessfulCompanies,secSubmissionsSuccessfulCompanies:scan.secSubmissionsSuccessfulCompanies,secConnectorStatus:scan.secConnectorStatus,reasonCodes:scan.reasonCodes,newEvidence:scan.newEvidence,failedSources:scan.failedSources.length}));if(scan.status==='SYSTEM_FAILURE')process.exitCode=2}
 catch(e){appendJournal(root,'scans.jsonl',[{id:'scan-'+(process.env.GITHUB_RUN_ID?process.env.GITHUB_RUN_ID+'-'+(process.env.GITHUB_RUN_ATTEMPT||1):new Date().toISOString()),startedAt:new Date().toISOString(),status:'SYSTEM_FAILURE',companies:[],failedSources:[{ticker:'*',source:'runner',error:e.message}],lastSuccessfulScan:null}]);console.error(e.message);process.exitCode=1}
}
