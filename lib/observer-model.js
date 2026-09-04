export function parseJournal(text){return text.trim()?text.trim().split('\n').map(line=>JSON.parse(line)):[]}
export function openObserverReviews(events,reviews=[]){const closed=new Set(reviews.map(r=>r.eventId));return events.filter(e=>e.reviewRequired&&!closed.has(e.id))}
export function classifyScan(companies,failedSources,expectedCount,connector={}){
 const complete=companies.filter(c=>c.ok===true).length,usable=companies.filter(c=>c.ok===true||c.usable===true).length,minimumUsable=Math.max(1,Math.ceil(expectedCount*0.2));
 const applicable=companies.filter(c=>c.secApplicable===true),secSuccessfulCompanies=applicable.filter(c=>c.secSuccessful===true).length,secSubmissionsSuccessfulCompanies=applicable.filter(c=>c.secSubmissionsSuccessful===true).length;
 const globalSEC=applicable.length>0&&(secSuccessfulCompanies===0||(connector.blockedHosts||[]).some(h=>['www.sec.gov','data.sec.gov'].includes(h)));
 const reasons=[];
 if(globalSEC)reasons.push('GLOBAL_SEC_CONNECTOR_FAILURE');
 if(failedSources.some(f=>f.error==='SEC_CONTACT_EMAIL_REQUIRED'))reasons.push('SEC_CONTACT_EMAIL_REQUIRED');
 if(complete===0)reasons.push('ZERO_COMPLETE_COMPANIES');
 if(companies.length!==expectedCount)reasons.push('INCOMPLETE_UNIVERSE_SCAN');
 if(usable<minimumUsable)reasons.push('UNUSABLE_UNIVERSE_COVERAGE');
 if(failedSources.some(f=>/SCAN_BUDGET_EXHAUSTED|INTEGRITY_FAILURE/.test(f.error)))reasons.push('SCAN_BUDGET_OR_INTEGRITY_FAILURE');
 return {status:reasons.length?'SYSTEM_FAILURE':complete===expectedCount&&!failedSources.length?'SUCCESS':'PARTIAL',completeCompanies:complete,usableCompanies:usable,minimumUsableCompanies:minimumUsable,unavailableCompanies:expectedCount-usable,secApplicableCompanies:applicable.length,secSuccessfulCompanies,secSubmissionsSuccessfulCompanies,secConnectorStatus:globalSEC?'SYSTEM_FAILURE':!applicable.length?'NOT_APPLICABLE':secSuccessfulCompanies===applicable.length?'SUCCESS':'PARTIAL',reasonCodes:reasons,reason:reasons.length?reasons.join('; '):'Source gaps remain local to affected companies'};
}
// Interpret old journals without rewriting them. A successful CI run cannot override zero complete coverage.
export function scanSystemFailure(scan){return !!scan&&(['SYSTEM_FAILURE','FAILED'].includes(scan.status)||scan.secConnectorStatus==='SYSTEM_FAILURE'||scan.completeCompanies===0||Array.isArray(scan.companies)&&!scan.companies.some(c=>c.ok===true))}
export function observerHealth(company,scan,events,now=Date.now(),workflow='unknown'){
 const row=scan?.companies?.find(r=>r.ticker===company.ticker),age=now-Date.parse(row?.lastSuccessfulScan||''),due=Date.parse(company.reviewDue);
 if(workflow==='failed'||scanSystemFailure(scan)||events.some(e=>e.ticker===company.ticker&&e.reviewRequired)||row?.ok!==true||!Number.isFinite(age)||age<0||age>36*3600000||!Number.isFinite(due)||now>due)return 'red';
 if(workflow!=='success'||age>24*3600000||due-now<=48*3600000)return 'orange';
 return 'green';
}
