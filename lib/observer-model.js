export function parseJournal(text){return text.trim()?text.trim().split('\n').map(line=>JSON.parse(line)):[]}
export function openObserverReviews(events,reviews=[]){const closed=new Set(reviews.map(r=>r.eventId));return events.filter(e=>e.reviewRequired&&!closed.has(e.id))}
export function classifyScan(companies,failedSources,expectedCount){
 const complete=companies.filter(c=>c.ok===true).length,usable=companies.filter(c=>c.ok===true||c.usable===true).length,minimumUsable=Math.max(1,Math.ceil(expectedCount*0.2));
 const systemic=companies.length!==expectedCount||usable<minimumUsable||failedSources.some(f=>/SCAN_BUDGET_EXHAUSTED|INTEGRITY_FAILURE/.test(f.error));
 return {status:systemic?'SYSTEM_FAILURE':complete===expectedCount&&!failedSources.length?'SUCCESS':'PARTIAL',completeCompanies:complete,usableCompanies:usable,minimumUsableCompanies:minimumUsable,unavailableCompanies:expectedCount-usable,reason:systemic?'Incomplete scan, integrity failure, or fewer than 20% usable company sources':'Source gaps remain local to affected companies'};
}
export function observerHealth(company,scan,events,now=Date.now(),workflow='unknown'){
 const row=scan?.companies?.find(r=>r.ticker===company.ticker),age=now-Date.parse(row?.lastSuccessfulScan||''),due=Date.parse(company.reviewDue);
 if(workflow==='failed'||['SYSTEM_FAILURE','FAILED'].includes(scan?.status)||events.some(e=>e.ticker===company.ticker&&e.reviewRequired)||row?.ok!==true||!Number.isFinite(age)||age<0||age>36*3600000||!Number.isFinite(due)||now>due)return 'red';
 if(workflow!=='success'||age>24*3600000||due-now<=48*3600000)return 'orange';
 return 'green';
}
