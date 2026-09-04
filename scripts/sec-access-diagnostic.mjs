// A manual, bounded diagnostic of the production transport. No retries or alternate identities.
import {makeClient} from './observer-http.mjs';
const client=makeClient(),outcomes=[];
for(const url of ['https://www.sec.gov/files/company_tickers.json','https://data.sec.gov/submissions/CIK0000896878.json']){
 try{const body=await client(url);const data=JSON.parse(body);outcomes.push({url,success:true,validJSON:true,identityMatches:url.includes('/submissions/')?Number(data.cik)===896878&&data.tickers?.includes('INTU'):null})}
 catch(e){outcomes.push({url,success:false,error:e.message})}
}
console.log(JSON.stringify({timestamp:new Date().toISOString(),runnerEnvironment:process.env.RUNNER_ENVIRONMENT||'local',runnerOS:process.env.RUNNER_OS||process.platform,imageVersion:process.env.ImageVersion||null,node:process.version,contactEmailConfigured:!!process.env.SEC_CONTACT&&!process.env.SEC_CONTACT.startsWith('https:'),outcomes,...client.diagnostics()},null,2));
if(outcomes.some(r=>!r.success||r.identityMatches===false))process.exitCode=2;
