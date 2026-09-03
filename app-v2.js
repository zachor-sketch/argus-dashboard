import './app.js';
import {BASELINE_V10_25 as B} from './datasets/baseline_v10_25.js';
import {DEFAULT_PORTFOLIO} from './datasets/portfolio.js';
import {MARKET_SNAPSHOT} from './datasets/market_snapshot.js';
import {UNIVERSE} from './datasets/universe_v10_33.js';
import {RESEARCH_SHADOW} from './datasets/research_shadow.js';
import {PROOF_LEDGER} from './datasets/proof_ledger.js';
import {EVENT_LOG} from './datasets/event_log.js';
import {canonical,sha256} from './lib/integrity.js';
import {portfolio,savePortfolio,records,recordEvent,recordForecast,recordLearning} from './lib/state.js';
import {holdingMetrics,companyMeta,reviewState,authorization,estimate} from './lib/calculations.js';
import {originalEngine} from './lib/engine_v10_25.js';
import * as V from './lib/view.js';
import {translateDOM} from './lib/i18n.js';

const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const tr=(en,he)=>V.t(en,he), esc=V.esc;
let P; try{P=portfolio()}catch{P=structuredClone(DEFAULT_PORTFOLIO)}
try{V.setLanguage(localStorage.getItem('ARGUS_V2_LANGUAGE')||'he')}catch{V.setLanguage('he')}
let integrity={ok:false,actual:'checking'},query='';
const stock=t=>B.stocks.find(x=>x.ticker===t), engine=t=>B.engine[t], lock=t=>B.lockedBaselines[t];
const local=k=>{try{return records(k)}catch{return []}};
const material=t=>local('EVENT_LOG').some(e=>e.ticker===t&&e.status==='OPEN');
const show=(title,eyebrow,html)=>{const d=$('#research-dialog');$('#dialog-title').textContent=title;$('#dialog-eyebrow').textContent=eyebrow;$('#dialog-content').innerHTML='<p class="source-note">'+tr('Original source evidence is preserved in its source language. Historical prices are not current quotes.','ראיות המקור נשמרות בשפת המקור. מחירים היסטוריים אינם ציטוטים נוכחיים.')+'</p>'+html;d.showModal()};

function decision(d){return V.pill(V.decision(d),V.tones[d]||'neutral')}
function reviewDots(t){
 const items=[['price','Market / Price','שוק / מחיר',true],['weekly','Fundamental Review','בדיקת יסודות'],['forecast','Forecast / Drivers','תחזית / מנועים'],['full','Full Underwriting','חיתום מלא']];
 return items.map(([k,en,he,price])=>{const c=B.reviews[k],s=reviewState(c,{materialEvent:material(t),missingPrice:price});return `<span class="review-item"><b class="${s}">●</b><small>${tr(en,he)}<br>${tr('Last checked','בדיקה אחרונה')}: ${V.date(c.last,true)}<br>${tr('Next review','בדיקה הבאה')}: ${V.date(c.next,true)}</small></span>`}).join('');
}
function dailyBoard(){
 const sec=document.createElement('section');sec.id='daily';
 sec.innerHTML=`<div class="section-heading"><div><div class="eyebrow accent">00 / ${tr('DAILY OPERATING BOARD','לוח תפעול יומי')}</div><h2>${tr('What needs attention today','מה דורש תשומת לב היום')}</h2></div><button class="button v2-method">${tr('Data status','מצב נתונים')} ↗</button></div>
 <div class="panel board-panel"><div class="table-scroll"><table><thead><tr>${[tr('Ticker','סימול'),tr('Market price','מחיר שוק'),'IV',tr('Company decision','החלטת חברה'),tr('Portfolio decision','החלטת תיק'),tr('Portfolio weight','משקל בתיק'),tr('Review status','מצב בדיקות'),tr('Why','למה')].map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>
 ${B.stocks.map(s=>{const h=P.holdings.find(x=>x.ticker===s.ticker),m=h?holdingMetrics(h,P.total):null,p=P.policies?.[s.ticker]||DEFAULT_PORTFOLIO.policies[s.ticker];return `<tr><td><bdi>${s.ticker}</bdi></td><td class="amber">${V.missingPrice()}<small>${tr('Freshness','רעננות')}: ${tr('overdue','באיחור')}<br>${tr('Quote time/source','זמן/מקור ציטוט')}: — / —</small></td><td><bdi>${esc(lock(s.ticker).intrinsicValueRange)}</bdi></td><td>${decision(lock(s.ticker).decision)}</td><td>${decision(p?.decision||'NO ACTION')}</td><td>${V.percent(m?.weight??null)}</td><td><div class="review-grid">${reviewDots(s.ticker)}</div></td><td>${esc(engine(s.ticker).whyNow||s.logic||V.missing())}</td></tr>`}).join('')}</tbody></table></div></div>`;
 $('#summary').before(sec);
}
function editor(){
 const sec=document.createElement('section');sec.id='portfolio-editor';
 sec.innerHTML=`<div class="section-heading"><div><div class="eyebrow">V10.34 / ${tr('LOCAL OVERLAY','שכבה מקומית')}</div><h2>${tr('Holdings editor and P/L','עורך אחזקות ורווח/הפסד')}</h2></div><span class="pill overlay">${tr('SEPARATE FROM V10.25','נפרד מ־V10.25')}</span></div>
 <div class="construction-rule"><strong>Company BUY ≠ Portfolio BUY</strong><span>${tr('Unknown portfolio assets are not classified as cash. Verified values and P/L require a current verified quote.','נכסי תיק לא ידועים אינם מסווגים כמזומן. שווי ורווח/הפסד דורשים ציטוט מאומת ועדכני.')}</span></div>
 <form id="portfolio-form" class="panel form-panel"><label>${tr('Portfolio total','סך התיק')} <input name="total" type="number" min="1" step="any" value="${P.total}"></label><div class="table-scroll"><table><thead><tr>${[tr('Ticker','סימול'),tr('Shares','מניות'),tr('Average cost','מחיר ממוצע'),tr('Purchase date','תאריך רכישה'),tr('Cost','עלות'),tr('Verified value','שווי מאומת'),'P/L $','P/L %',tr('Weight','משקל'),tr('Target','יעד'),tr('Hard max','תקרה'),tr('Add capacity','קיבולת הוספה'),tr('Sector','סקטור'),tr('Risk bucket','דלי סיכון')].map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody id="v2-holdings">${P.holdings.map(row).join('')}</tbody></table></div><div class="form-actions"><button type="button" id="add-holding">+ ${tr('Add holding','הוסף אחזקה')}</button><button class="button">${tr('Save locally','שמור מקומית')}</button><span id="portfolio-message"></span></div></form>`;
 $('#construction').append(sec);
}
function row(h,i){const m=holdingMetrics(h,P.total),meta=companyMeta(h.ticker);return `<tr><td><input name="ticker-${i}" value="${esc(h.ticker)}" size="7"></td><td><input name="shares-${i}" type="number" min="0" step="any" value="${h.shares}"></td><td><input name="cost-${i}" type="number" min="0" step="any" value="${h.averageCost}"></td><td><input name="date-${i}" type="date" value="${h.purchaseDate}"></td><td>${V.money(m.cost,2)}</td><td>${V.money(m.value,2)}</td><td>${V.money(m.pl,2)}</td><td>${V.percent(m.plPct)}</td><td>${V.percent(m.weight)}</td><td>${m.target?m.target.join('–')+'%':'—'}</td><td>${m.hardMax===null?'—':m.hardMax+'%'}</td><td>${V.money(m.capacity)}</td><td>${esc(meta.sector||V.missing())}</td><td>${esc(meta.bucket||V.missing())}</td></tr>`}
function events(){
 const sec=document.createElement('section');sec.id='events';
 sec.innerHTML=`<div class="section-heading"><div><div class="eyebrow">APPEND ONLY</div><h2>${tr('Event Queue','תור אירועים')}</h2></div><span class="pill caution">${EVENT_LOG.day0?.length||0} ${tr('source items','פריטי מקור')} · ${local('EVENT_LOG').length} ${tr('local','מקומיים')}</span></div><div class="split-grid"><form id="event-form" class="panel form-panel"><h3>${tr('Create a dated review snapshot','צור תצלום בדיקה מתוארך')}</h3><label>${tr('Ticker','סימול')}<input name="ticker" required></label><label>${tr('Material event','אירוע מהותי')}<select name="type"><option value="earnings">Earnings</option><option value="guidance">Guidance</option><option value="m&a">M&A</option><option value="capital allocation">Capital allocation</option><option value="debt">Debt</option><option value="regulatory">Regulatory / geopolitical</option><option value="price">Price dislocation + evidence</option></select></label><label>${tr('Occurred at','מועד')}<input name="occurredAt" type="datetime-local" required></label><label>${tr('Evidence','ראיות')}<textarea name="evidence" required></textarea></label><label>${tr('New fundamental evidence (required for price events)','ראיות יסוד חדשות (חובה לאירוע מחיר)')}<textarea name="fundamentalEvidence"></textarea></label><label>${tr('Source URL','קישור מקור')}<input name="source" type="url" required></label><button class="button">${tr('Append event + research snapshot','הוסף אירוע + תצלום מחקר')}</button><span id="event-message"></span></form><article class="panel"><h3>${tr('Open local review items','פריטי בדיקה מקומיים')}</h3>${local('EVENT_LOG').length?V.sourceData(local('EVENT_LOG')):`<p class="muted">${tr('No local events.','אין אירועים מקומיים.')}</p>`}<button id="source-events">${tr('Authoritative Day-0 queue','תור יום 0 הסמכותי')}</button></article></div>`;
 $('#radar').before(sec);
}
function universe(){
 const sec=document.createElement('section');sec.id='universe';const all=UNIVERSE['Company Universe'],owners=Object.values(UNIVERSE).find(rows=>rows?.some?.(r=>r.Overall&&r.Ticker))||[];const rows=all.filter(r=>!query||`${r.Company} ${r.Ticker} ${r['Sector Family']}`.toLowerCase().includes(query));
 sec.innerHTML=`<div class="section-heading"><div><div class="eyebrow">V10.33</div><h2>${tr('100-company ARGUS universe','יקום 100 החברות של ARGUS')}</h2></div><span class="pill neutral">${rows.length}/100</span></div><div class="filter-row"><input id="universe-search" type="search" value="${esc(query)}" placeholder="${tr('Search company, ticker or sector','חפש חברה, סימול או סקטור')}"></div><div class="panel table-scroll"><table><thead><tr>${['Company','Ticker','Sector Family','Economic Engine','Primary Valuation Lens','Priority','Research Status','Owner Test','Classification','Last Review','Review Due','Next Action'].map(V.label).map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>{const o=owners.find(x=>x.Ticker===r.Ticker);return `<tr><td><button data-universe="${esc(r.Ticker)}">${esc(r.Company)}</button></td><td><bdi>${esc(r.Ticker)}</bdi></td><td>${esc(r['Sector Family']||'—')}</td><td>${esc(r['Economic Engine']||'—')}</td><td>${esc(r['Primary Valuation Lens']||'—')}</td><td>${esc(r.Priority||'—')}</td><td>${esc(r['Research Status']||'—')}</td><td>${esc(o?.Overall||'—')}</td><td>${esc(r.Classification||'—')}</td><td>${V.date(r['Last Review'])}</td><td>${V.date(r['Review Due'])}</td><td>${esc(r['Next Action']||'—')}</td></tr>`}).join('')}</tbody></table></div>`;
 $('#radar').before(sec);
}
function expandRadar(){
 const host=$('#radar-cards');host.innerHTML=RESEARCH_SHADOW.ai.records.map(r=>`<article class="radar-card"><div class="radar-head"><span class="ticker">${r.ticker}</span>${V.pill(r.status,r.status.includes('BLOCKED')?'negative':'caution')}</div><h3>${esc(r.company)}</h3><p>${esc(r.chain_node)}</p><div class="stat-list">${[['Demand proof',r.demand_proof],['Owner economics',r.owner_economics],['Valuation',r.valuation],['Concentration',r.concentration],['Normalized cash conversion',r.normalizedCashConversion||V.missing()],['Scope',r.scope]].map(x=>`<div><span>${esc(x[0])}</span><strong>${esc(x[1])}</strong></div>`).join('')}</div><button data-ai="${r.ticker}">${tr('Three-pass review + Dalio loss paths','סקירה תלת־שלבית + מסלולי הפסד Dalio')}</button></article>`).join('');
}
function enginePanel(t){
 const e=engine(t),official=lock(t);let replay={};try{const x=originalEngine({asOf:official.lockedAt||'2026-09-01T13:30:00+03:00'});replay={rawScore:x.engineScore(e),adjustedScore:x.engineAdjustedScore(e),computedDecision:x.engineDecision(e),scenarioExpectedValue:x.expectedValue(e),valuationMethodAgreement:x.ensembleSummary(e),dynamicActionPrices:x.actionPriceBands(e),opportunityCostCapitalAllocator:x.allocatorRank(t)}}catch(err){replay={unavailable:err.message}}
 return `<div class="immutable-banner">V10.25 · READ ONLY · ${tr('Official values never change','הערכים הרשמיים אינם משתנים')}</div>${V.box(tr('Canonical locked decision','החלטה קנונית נעולה'),V.stats([[tr('Score','ציון'),official.engineScore],[tr('Decision','החלטה'),V.decision(official.decision)],['IV',esc(official.intrinsicValueRange)],[tr('Recorded expected IV','שווי צפוי רשום'),V.money(official.expectedValue)]]))}${V.box(tr('Original formula replay at lock','הרצת נוסחאות המקור במועד הנעילה'),V.sourceData(replay))}${Object.entries(e).map(([k,v])=>`<details><summary>${esc(V.label(k))}</summary>${V.sourceData(v)}</details>`).join('')}`;
}
function forecast(t){
 const s=stock(t);let note='';try{note=localStorage.getItem('ARGUS_V2_NOTE_'+t)||''}catch{}
 return `<div class="immutable-banner">${tr('Original lock + append-only shadow updates','נעילה מקורית + עדכוני צל בהוספה בלבד')}</div>${V.sourceData(s.forecast)}${V.box(tr('Verified current price / performance','מחיר נוכחי מאומת / ביצועים'),`<p class="amber">${V.missingPrice()} · ${tr('Performance unavailable','ביצועים אינם זמינים')}</p>`)}<label>${tr('User notes (local)','הערות משתמש (מקומיות)')}<textarea id="user-notes" data-ticker="${t}">${esc(note)}</textarea></label><form id="forecast-form" class="form-panel"><input type="hidden" name="ticker" value="${t}"><label>${tr('Horizon','אופק')}<input name="horizon" required></label><label>${tr('Thesis update','עדכון תזה')}<textarea name="thesis" required></textarea></label><label>${tr('Source URL','קישור מקור')}<input name="source" type="url" required></label><button>${tr('Append shadow forecast','הוסף תחזית צל')}</button><span></span></form>${V.box(tr('Forecast history','היסטוריית תחזית'),V.sourceData(local('FORECAST_LOG').filter(x=>x.ticker===t))) }`;
}
function learning(t){const e=engine(t);return `${V.box(tr('Decision Attribution','ייחוס החלטה'),V.sourceData(e.attribution))}${V.box(tr('Learning Loop','לולאת למידה'),V.sourceData([...e.learning,...local('LEARNING_LOG')]))}<form id="learning-form" class="form-panel"><input type="hidden" name="ticker" value="${t}">${[['result','Result','תוצאה'],['failure','Failure','כשל'],['lesson','Lesson','לקח'],['rule','Proposed rule change','שינוי כלל מוצע']].map(x=>`<label>${tr(x[1],x[2])}<input name="${x[0]}" required></label>`).join('')}<button>${tr('Append proposed lesson','הוסף לקח מוצע')}</button><span></span></form>`}
function addButtons(){
 $$('.stock-card').forEach(c=>{const t=c.id.replace('stock-',''),a=$('.card-actions',c);a.insertAdjacentHTML('beforeend',`<button data-v2-engine="${t}">${tr('Full V10.25 engine','מנוע V10.25 מלא')}</button><button data-v2-forecast="${t}">${tr('Forecast tracking','מעקב תחזית')}</button><button data-v2-learning="${t}">${tr('Attribution & learning','ייחוס ולמידה')}</button>`)});
}
function proof(){
 const l=PROOF_LEDGER.ledger,a=authorization(local('PROOF_LOG'),integrity.ok,l.protocol.scoreWeights);$('#proof .section-heading .pill').textContent='AUTHORIZATION '+a.state;
 $('.proof-content').insertAdjacentHTML('beforeend',`<div class="validation-actions"><p><strong>${tr('Historical diagnostic performance is contaminated and ineligible.','ביצועי האבחון ההיסטוריים מזוהמים ואינם כשירים.')}</strong> ${tr('Clean resolved outcomes','תוצאות נקיות שהוכרעו')}: ${a.resolved}/30.</p><button id="proof-detail">${tr('Full ledger: locks, 6M/12M/24M, errors and shadow changes','ספר מלא: נעילות, 6M/12M/24M, שגיאות ושינויי צל')}</button></div>`);
}
function language(){
 $('.topbar-right').insertAdjacentHTML('afterbegin',`<div class="lang-toggle"><button data-lang="he" class="${V.language==='he'?'active':''}">עברית</button><button data-lang="en" class="${V.language==='en'?'active':''}">English</button></div>`);
 if(V.language==='he'){const dict=new Map([['Portfolio overview','סקירת התיק'],['Decision board','לוח החלטות'],['Company research','מחקר חברות'],['Portfolio construction','בניית תיק'],['AI infrastructure','תשתיות AI'],['Forward proof','הוכחה קדימה'],['Your portfolio. In perspective.','התיק שלך. בפרספקטיבה.'],['Main Decision Board','לוח ההחלטות הראשי'],['Portfolio Construction Overlay','שכבת בניית התיק'],['AI Infrastructure Event Radar','רדאר אירועי תשתיות AI'],['Forward Proof / System Status','הוכחה קדימה / מצב המערכת']]);const w=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const s=n.nodeValue.trim();if(dict.has(s))n.nodeValue=n.nodeValue.replace(s,dict.get(s))}}
}
function wire(){
 $$('[data-lang]').forEach(b=>b.onclick=()=>{V.setLanguage(b.dataset.lang);location.reload()});
 $$('.v2-method').forEach(b=>b.onclick=()=>show(tr('Data & methodology','נתונים ומתודולוגיה'),'ARGUS V2',V.sourceData({integrity,marketSnapshot:MARKET_SNAPSHOT,separation:{baseline:'baseline_v10_25.js — immutable',portfolio:'portfolio.js + local state',market:'market_snapshot.js — verified only',research:'research_shadow.js',events:'event_log.js — append only',proof:'proof_ledger.js — append only'},rules:['Company BUY ≠ Portfolio BUY','Missing verified price → refresh required','Historical decisions are never rewritten']})));
 $$('[data-v2-engine]').forEach(b=>b.onclick=()=>show(stock(b.dataset.v2Engine).company,'V10.25 FULL ENGINE',enginePanel(b.dataset.v2Engine)));
 $$('[data-v2-forecast]').forEach(b=>b.onclick=()=>show(stock(b.dataset.v2Forecast).company,tr('Forecast / Drivers','תחזית / מנועים'),forecast(b.dataset.v2Forecast)));
 $$('[data-v2-learning]').forEach(b=>b.onclick=()=>show(stock(b.dataset.v2Learning).company,tr('Attribution / Learning','ייחוס / למידה'),learning(b.dataset.v2Learning)));
 $$('[data-ai]').forEach(b=>b.onclick=()=>{const r=RESEARCH_SHADOW.ai.records.find(x=>x.ticker===b.dataset.ai);show(r.company,'V10.33 SHADOW',V.sourceData(r))});
 $$('[data-universe]').forEach(b=>b.onclick=()=>{const t=b.dataset.universe,r=UNIVERSE['Company Universe'].find(x=>x.Ticker===t),linked=Object.fromEntries(Object.entries(UNIVERSE).filter(([k])=>k!=='Company Universe').map(([k,v])=>[k,v.filter(x=>x.Ticker===t)]));show(r.Company,t,V.sourceData({company:r,...linked}))});
 $('#universe-search').oninput=e=>{query=e.target.value.toLowerCase();$$('#universe tbody tr').forEach(r=>r.hidden=!r.textContent.toLowerCase().includes(query))};
 $('#add-holding').onclick=()=>{const i=$$('#v2-holdings tr').length;$('#v2-holdings').insertAdjacentHTML('beforeend',row({ticker:'',shares:0,averageCost:0,purchaseDate:new Date().toISOString().slice(0,10)},i))};
 $('#portfolio-form').onsubmit=e=>{e.preventDefault();const f=new FormData(e.currentTarget),holdings=[];for(let i=0;f.has('ticker-'+i);i++)holdings.push({ticker:String(f.get('ticker-'+i)).trim().toUpperCase(),shares:Number(f.get('shares-'+i)),averageCost:Number(f.get('cost-'+i)),purchaseDate:String(f.get('date-'+i))});try{savePortfolio({total:Number(f.get('total')),holdings});location.reload()}catch{$('#portfolio-message').textContent=tr('Invalid holding data','נתוני אחזקה לא תקינים')}};
 $('#event-form').onsubmit=e=>{e.preventDefault();const o=Object.fromEntries(new FormData(e.currentTarget));try{recordEvent({...o,parent:B.version,occurredAt:new Date(o.occurredAt).toISOString()});location.reload()}catch(err){$('#event-message').textContent=tr(err.message==='PRICE_ALONE_BLOCKED'?'Price alone cannot trigger review':'Valid evidence and source required',err.message==='PRICE_ALONE_BLOCKED'?'מחיר לבדו אינו מפעיל בדיקה':'נדרשים ראיות ומקור תקף')}};
 $('#source-events').onclick=()=>show(tr('Authoritative Day-0 queue','תור יום 0 הסמכותי'),'APPEND ONLY',V.sourceData(EVENT_LOG));
 $('#proof-detail').onclick=()=>show(tr('Full validation ledger','ספר האימות המלא'),'V10.25 READ ONLY',V.sourceData(PROOF_LEDGER));
 $('#research-dialog').addEventListener('input',e=>{if(e.target.id==='user-notes')try{localStorage.setItem('ARGUS_V2_NOTE_'+e.target.dataset.ticker,e.target.value)}catch{}});
 $('#research-dialog').addEventListener('submit',e=>{e.preventDefault();const o=Object.fromEntries(new FormData(e.target));try{e.target.id==='forecast-form'?recordForecast(o):recordLearning(o);e.target.querySelector('span').textContent=tr('Appended locally','נוסף מקומית')}catch{e.target.querySelector('span').textContent=tr('Complete every field and source','יש למלא את כל השדות והמקור')}});
}
function syncOverlay(){
 const h=P.holdings.find(x=>x.ticker==='INTU'),basis=$('#valuation-basis').value,e=h?estimate(h,P.total,basis):null,w=e?.weight||0;
 $('#summary .metric strong').innerHTML=V.money(P.total)+'<span class="unit">USD</span>';
 $('#holding-value').innerHTML=V.money(e?.value??null);$('#current-weight').innerHTML=V.percent(e?.weight??null);
 $('#valuation-label').textContent=h?tr(h.shares+' shares × '+e.price+' historical / cost reference',h.shares+' מניות × '+e.price+' מחיר היסטורי / עלות'):tr('No INTU holding','אין אחזקת INTU');
 $('#overlay-weight').innerHTML=V.percent(e?.weight??null);$('#known-percent').innerHTML=V.percent(e?.weight??null);$('#unknown-percent').innerHTML=V.percent(Math.max(0,100-w));$('#over-max').innerHTML=V.money(Math.max(0,(e?.value||0)-P.total*.12));
 $('#alert-description').textContent=tr('Historical estimate '+w.toFixed(2)+'%; target 6–8%, hard max 12%. Current market weight requires a verified quote.','אומדן היסטורי '+w.toFixed(2)+'%; יעד 6–8%, תקרה 12%. משקל שוק נוכחי דורש ציטוט מאומת.');
 $('#weight-fill').style.width=Math.min(100,w)+'%';$('#portfolio-donut').style.background='conic-gradient(var(--red) 0 '+Math.min(100,w)+'%, var(--surface-3) '+Math.min(100,w)+'% 100%)';
 const val=$('#stock-INTU .card-position strong');if(val)val.innerHTML=V.percent(e?.weight??null)+' '+tr('est.','אומדן');
}
function boot(){
 dailyBoard();editor();events();universe();expandRadar();addButtons();proof();language();wire();syncOverlay();
 $('#events .pill').textContent=EVENT_LOG.day0.summary.companiesScanned+' '+tr('source reviews','בדיקות מקור')+' · '+local('EVENT_LOG').length+' '+tr('local events','אירועים מקומיים');
 $('.sidebar a[href="#radar"] small').textContent='8';
 $('#valuation-basis').addEventListener('change',syncOverlay);
 $('.sidebar nav').insertAdjacentHTML('beforeend',`<a href="#daily">◇ ${tr('Daily operating board','לוח תפעול יומי')}</a><a href="#events">◇ ${tr('Event Queue','תור אירועים')}</a><a href="#universe">◇ ${tr('Universe · 100','יקום החברות · 100')}</a>`);
 $('#radar .section-heading').insertAdjacentHTML('beforeend',`<button id="shadow-layers">${tr('Source authority / Dalio / later layers','סמכות מקורות / Dalio / שכבות מאוחרות')}</button>`);
 $('#shadow-layers').onclick=()=>show(tr('Authoritative research layers','שכבות מחקר סמכותיות'),'V10.26–V10.33 SHADOW',V.sourceData(RESEARCH_SHADOW.layers));
 $('#universe .filter-row').insertAdjacentHTML('beforeend',`<select id="universe-priority"><option value="">${tr('All priorities','כל העדיפויות')}</option><option>P1</option><option>P2</option><option>P3</option></select>`);
 $('#universe-priority').onchange=e=>$$('#universe tbody tr').forEach(r=>r.hidden=!!e.target.value&&!r.cells[5].textContent.includes(e.target.value));
 translateDOM();
}
async function verify(){try{const m=await fetch('./integrity-manifest.json',{cache:'no-store'}).then(r=>r.json()),actual=await sha256(canonical(B));integrity={ok:actual===m.canonicalBaselineSha256,actual,expected:m.canonicalBaselineSha256}}catch(e){integrity={ok:false,actual:e.message}}const el=$('.sidebar-bottom .dot');if(el){el.className='dot '+(integrity.ok?'green-dot':'red-dot');el.parentElement.title=integrity.ok?'SHA-256 '+integrity.actual:'INTEGRITY FAILURE'}}
document.addEventListener('click',e=>{
 const method=e.target.closest('[data-open="data"]');if(method){e.stopImmediatePropagation();e.preventDefault();show(tr('Data and methodology','נתונים ומתודולוגיה'),'ARGUS V2',V.sourceData({integrity,marketSnapshot:MARKET_SNAPSHOT,sources:['ARGUS_Master_V10_25.html','ARGUS_Validation_Ledger_V10_25.json','ARGUS_AI_Chain_Signal_V10_33.json','ARGUS_Global_Opportunity_Universe_V10_33_AI_Chain_Signal.xlsx']}));return}
 const b=e.target.closest('[data-pane]');if(!b)return;const ticker=b.dataset.ticker||b.closest('.stock-card')?.id.replace('stock-','');if(!ticker||!stock(ticker))return;e.stopImmediatePropagation();e.preventDefault();const s=stock(ticker),p=b.dataset.pane,h=P.holdings.find(x=>x.ticker===ticker);
 const body=p==='engine'?enginePanel(ticker):p==='forecast'?forecast(ticker):p==='holdings'?(V.sourceData(h?{...h,...holdingMetrics(h,P.total)}:{holding:V.missing()})+learning(ticker)):p==='buy'?V.sourceData(s.buy):p==='risks'?V.sourceData(s.no):V.sourceData({essence:s.essence,moat:s.moat,why:s.why,logic:s.logic});
 show(s.company,p==='engine'?'V10.25 FULL ENGINE':V.label(p),body);
},true);
boot();verify();
