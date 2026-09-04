import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {makeClient,publicAddress,safeURL,secUserAgent} from '../scripts/observer-http.mjs';
import {resolveSEC,assertSECIdentity} from '../scripts/observer-sec.mjs';
import {runObserver} from '../scripts/observer-run.mjs';
import {readJournal} from '../scripts/observer-store.mjs';
import {MONITORS} from '../lib/observer-config.js';
import {SEC_CIK_SEED} from '../lib/sec-cik-seed.js';
import {classifyScan,observerHealth,scanSystemFailure} from '../lib/observer-model.js';
const resolver=async()=>[{address:'93.184.216.34',family:4}];
test('safe relative and cross-host HTTPS redirects are bounded, rate limited and DNS-pinned',async()=>{
 const calls=[],delays=[];const client=makeClient({resolver,wait:async ms=>delays.push(ms),fetcher:async(url,options)=>{calls.push({url,options});return calls.length===1?new Response(null,{status:301,headers:{location:'/news'}}):calls.length===2?new Response(null,{status:302,headers:{location:'https://ir.issuer.com/releases'}}):new Response('Issuer results') }});
 assert.equal(await client('https://issuer.com/'),'Issuer results');assert.equal(calls.length,3);assert.equal(client.finalURL('https://issuer.com/'),'https://ir.issuer.com/releases');assert.ok(delays[1]>900);
 assert.ok(calls.every(c=>c.options.redirect==='manual'&&c.options.addresses[0].address==='93.184.216.34'));
});
test('unsafe redirects and private DNS are rejected before any destination request',async()=>{
 for(const location of ['http://issuer.com/','ftp://issuer.com/','https://127.0.0.1/','https://2130706433/','https://[::1]/','https://user:pass@issuer.com/','https://issuer.com:8443/','https://metadata.google.internal/']){
  let calls=0;const client=makeClient({resolver,wait:async()=>{},fetcher:async()=>{calls++;return new Response(null,{status:302,headers:{location}})}});
  await assert.rejects(client('https://issuer.com/'));assert.equal(calls,1,location);
 }
 let called=false;const client=makeClient({resolver:async()=>[{address:'169.254.169.254',family:4}],fetcher:async()=>{called=true}});await assert.rejects(client('https://issuer.com/'),/UNSAFE_DNS/);assert.equal(called,false);
 for(const ip of ['127.0.0.1','10.0.0.1','172.16.0.1','192.168.1.1','100.64.0.1','::ffff:127.0.0.1','fc00::1','fe80::1','2001:db8::1'])assert.equal(publicAddress(ip),false,ip);
 assert.throws(()=>safeURL('https://localhost/'),/UNSAFE/);
});
test('redirect loops and chains exceeding four hops fail closed',async()=>{
 const loop=makeClient({resolver,wait:async()=>{},fetcher:async()=>new Response(null,{status:302,headers:{location:'/'}})});await assert.rejects(loop('https://issuer.com/'),/REDIRECT_LOOP/);
 let count=0;const chain=makeClient({resolver,wait:async()=>{},fetcher:async()=>new Response(null,{status:302,headers:{location:'/'+(++count)}})});await assert.rejects(chain('https://issuer.com/'),/REDIRECT_LIMIT/);assert.equal(count,5);
});
test('identity, size, PDF and denial protections survive redirect support',async()=>{
 assert.match(secUserAgent('observer@example.org'),/contact:observer@example.org/);assert.throws(()=>secUserAgent('a\r\nb'),/INVALID/);
 for(const [response,error] of [[new Response('x',{headers:{'content-length':'9000000'}}),'DOCUMENT_TOO_LARGE'],[new Response('pdf',{headers:{'content-type':'application/pdf'}}),'PDF_REQUIRES'],[new Response('x'.repeat(8_000_001)),'DOCUMENT_TOO_LARGE']]){
  const client=makeClient({resolver,wait:async()=>{},fetcher:async()=>response});await assert.rejects(client('https://issuer.com/'),new RegExp(error));
 }
 let calls=0;const client=makeClient({resolver,wait:async()=>{},fetcher:async()=>{calls++;return new Response(null,{status:403})}});await assert.rejects(client('https://issuer.com/a'),/HTTP_403/);await assert.rejects(client('https://issuer.com/b'),/BLOCKED_FOR_RUN/);assert.equal(calls,1);
});
test('SEC fallback is lookup-only, validates CIK plus ticker and refuses conflicting identity',()=>{
 assert.equal(Object.keys(SEC_CIK_SEED.entries).length,89);
 const entry=resolveSEC('INTU',{},[]);assert.equal(entry.cik,'0000896878');
 assertSECIdentity({cik:'896878',tickers:['INTU']},entry);
 assert.throws(()=>assertSECIdentity({cik:'896878',tickers:['NVDA']},entry),/IDENTITY/);assert.throws(()=>assertSECIdentity({cik:'123',tickers:['INTU']},entry),/IDENTITY/);
 const cached={kind:'SEC_IDENTITY',ticker:'INTU',cik:'896878',validated:true};assert.equal(resolveSEC('INTU',{},[cached],{entries:{}}).mappingSource,'VALIDATED_JOURNAL');
 assert.throws(()=>resolveSEC('INTU',{0:{ticker:'INTU',cik_str:123}},[cached]),/CONFLICT/);
 assert.throws(()=>resolveSEC('FISV',{},[]),/MAPPING_UNAVAILABLE/);
});
test('SEC directory 403 does not prevent verified submissions through seed and cached mappings',async()=>{
 const directory=fs.mkdtempSync(path.join(os.tmpdir(),'argus-fallback-')),company=MONITORS.find(c=>c.ticker==='INTU');let submissions=0;
 const client=async url=>{if(url.includes('company_tickers'))throw Error('HTTP_403');if(url.includes('CIK0000896878')){submissions++;return JSON.stringify({cik:'896878',tickers:['INTU'],filings:{recent:{accessionNumber:[],form:[],filingDate:[],primaryDocument:[]}}})}throw Error('Unexpected request')};
 try{const options={directory,companies:[company],client,macroSources:[],now:new Date('2026-09-04T10:00:00Z')};const scan=await runObserver({...options,runId:'seed'});assert.equal(scan.status,'PARTIAL');assert.equal(scan.companies[0].ok,true);assert.equal(scan.completeCompanies,1);assert.equal(scan.failedSources[0].error,'HTTP_403');
  assert.equal(readJournal(directory,'documents.jsonl')[0].kind,'SEC_IDENTITY');await runObserver({...options,runId:'cached'});assert.equal(submissions,2);assert.equal(readJournal(directory,'documents.jsonl').length,1);
 }finally{fs.rmSync(directory,{recursive:true,force:true})}
});
test('partial coverage is not a system failure, but unusable or interrupted scans are',()=>{
 const good={ticker:'A',ok:true,usable:true},partial={ticker:'B',ok:false,usable:true},missing={ticker:'C',ok:false,usable:false};
 assert.equal(classifyScan([good,partial,missing],[{error:'HTTP_403'}],3).status,'PARTIAL');
 assert.equal(classifyScan([good],[],1).status,'SUCCESS');assert.equal(classifyScan([missing],[],1).status,'SYSTEM_FAILURE');
 assert.equal(classifyScan([good],[],3).status,'SYSTEM_FAILURE');assert.equal(classifyScan([good],[{error:'SCAN_BUDGET_EXHAUSTED'}],1).status,'SYSTEM_FAILURE');
 assert.equal(classifyScan([...Array(19).fill(good),...Array(81).fill(missing)],[],100).status,'SYSTEM_FAILURE');
 assert.equal(classifyScan([...Array(20).fill(partial),...Array(80).fill(missing)],[],100).status,'SYSTEM_FAILURE');
 const now=Date.parse('2026-09-04T10:00:00Z'),company={ticker:'A',reviewDue:'2026-09-10'},scan={status:'PARTIAL',companies:[{...good,lastSuccessfulScan:'2026-09-04T08:00:00Z'}]};
 assert.equal(observerHealth(company,scan,[],now,'success'),'green');scan.companies[0].ok=false;assert.equal(observerHealth(company,scan,[],now,'success'),'red');scan.companies[0].ok=true;scan.status='SYSTEM_FAILURE';assert.equal(observerHealth(company,scan,[],now,'success'),'red');
});
test('global SEC outage plus 31 usable IR companies is SYSTEM_FAILURE, never healthy',()=>{
 const companies=Array.from({length:100},(_,i)=>({ticker:String(i),ok:false,usable:i<31,secApplicable:i<91,secSubmissionsSuccessful:false,secSuccessful:false}));
 const scan=classifyScan(companies,[{source:'SEC EDGAR',error:'HTTP_403'}],100,{blockedHosts:['www.sec.gov','data.sec.gov']});
 assert.equal(scan.status,'SYSTEM_FAILURE');assert.equal(scan.completeCompanies,0);assert.equal(scan.usableCompanies,31);assert.equal(scan.unavailableCompanies,69);assert.equal(scan.secSuccessfulCompanies,0);assert.equal(scan.secConnectorStatus,'SYSTEM_FAILURE');
 assert.deepEqual(scan.reasonCodes,['GLOBAL_SEC_CONNECTOR_FAILURE','ZERO_COMPLETE_COMPANIES']);
 assert.equal(scanSystemFailure({...scan,companies}),true);
 assert.equal(scanSystemFailure({status:'PARTIAL',companies}),true,'legacy green workflow does not change historical zero coverage interpretation');
 // Even one complete non-SEC company cannot mask the unavailable global connector.
 companies[99]={...companies[99],ok:true,usable:true};assert.equal(classifyScan(companies,[],100).status,'SYSTEM_FAILURE');
 // Submissions access alone cannot mask a blocked required SEC archive host.
 companies[0]={...companies[0],ok:true,secSubmissionsSuccessful:true,secSuccessful:true};assert.equal(classifyScan(companies,[],100,{blockedHosts:['www.sec.gov']}).status,'SYSTEM_FAILURE');
});
test('SEC denial diagnostics retain bounded evidence and never retry the denied host',async()=>{
 let calls=0;const client=makeClient({userAgent:secUserAgent('observer@example.org'),resolver,wait:async()=>{},fetcher:async()=>{calls++;return new Response('<title>SEC.gov | Your Request Originates from an Undeclared Automated Tool</title>'+ 'x'.repeat(10000),{status:403,headers:{server:'AkamaiGHost','content-type':'text/html'}})}});
 await assert.rejects(client('https://www.sec.gov/files/company_tickers.json'),/HTTP_403/);
 await assert.rejects(client('https://www.sec.gov/Archives/anything'),/SOURCE_BLOCKED_FOR_RUN/);
 const diagnostic=client.diagnostics();assert.equal(calls,1);assert.deepEqual(diagnostic.blockedHosts,['www.sec.gov']);assert.equal(diagnostic.requests[0].denialCategory,'UNDECLARED_AUTOMATED_TOOL');assert.equal(diagnostic.requests[0].bodySampleBytes,4096);assert.equal(diagnostic.requests[0].bodySampleSha256.length,64);
});
test('missing contact email cannot send SEC requests, while issuer access remains available',async()=>{
 for(const contact of ['https://github.com/zachor-sketch/argus-dashboard/issues','123+owner@users.noreply.github.com']){
  let calls=0;const client=makeClient({userAgent:secUserAgent(contact),resolver,wait:async()=>{},fetcher:async()=>{calls++;return new Response('issuer content')}});
  await assert.rejects(client('https://data.sec.gov/submissions/CIK0000896878.json'),/SEC_CONTACT_EMAIL_REQUIRED/);assert.equal(calls,0);
  assert.equal(await client('https://issuer.com/'),'issuer content');assert.equal(calls,1);
 }
});
test('actual scan with failed SEC and dated IR is journaled as systemic failure',async()=>{
 const directory=fs.mkdtempSync(path.join(os.tmpdir(),'argus-sec-outage-')),company=MONITORS.find(c=>c.ticker==='INTU');
 const client=async url=>{if(url.includes('sec.gov'))throw Error('HTTP_403');return '<html><meta property="article:published_time" content="2026-09-03T10:00:00Z"><p>'+ 'Revenue increased. '.repeat(20)+'</p></html>'};
 try{const scan=await runObserver({directory,companies:[company],client,macroSources:[],now:new Date('2026-09-04T10:00:00Z'),runId:'outage'});assert.equal(scan.status,'SYSTEM_FAILURE');assert.equal(scan.usableCompanies,1);assert.equal(scan.completeCompanies,0);assert.equal(scan.secSuccessfulCompanies,0);assert.equal(scan.companies[0].ok,false);assert.equal(readJournal(directory,'scans.jsonl')[0].status,'SYSTEM_FAILURE')}
 finally{fs.rmSync(directory,{recursive:true,force:true})}
});
