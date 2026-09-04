export function parseJournal(text){return text.trim()?text.trim().split('\n').map(line=>JSON.parse(line)):[]}
export function openObserverReviews(events,reviews=[]){const closed=new Set(reviews.map(r=>r.eventId));return events.filter(e=>e.reviewRequired&&!closed.has(e.id))}
export function observerHealth(company,scan,events,now=Date.now(),workflow='unknown'){
 const row=scan?.companies?.find(r=>r.ticker===company.ticker),age=now-Date.parse(row?.lastSuccessfulScan||''),due=Date.parse(company.reviewDue);
 if(workflow==='failed'||events.some(e=>e.ticker===company.ticker&&e.reviewRequired)||!row?.ok||!Number.isFinite(age)||age<0||age>36*3600000||!Number.isFinite(due)||now>due)return 'red';
 if(workflow!=='success'||age>24*3600000||due-now<=48*3600000)return 'orange';
 return 'green';
}
