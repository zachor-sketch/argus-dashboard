import { BASELINE, PORTFOLIO, COMPANIES, RISK_BUCKETS, RADAR, intuMetrics } from './data.js';

const $ = selector => document.querySelector(selector);
const money = (value, digits=0) => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',minimumFractionDigits:digits,maximumFractionDigits:digits}).format(value);
const pct = value => `${value.toFixed(2)}%`;
const tones = { BUY:'positive', WAIT:'caution', 'PROVE IT':'caution', WATCH:'watch' };
const pill = (text,tone='neutral') => `<span class="pill ${tone}">${text}</span>`;
const list = values => `<ul>${values.map(v=>`<li>${v}</li>`).join('')}</ul>`;
const box = (title,content) => `<div class="detail-box"><h3>${title}</h3>${content}</div>`;
const stats = values => `<div class="stat-list">${values.map(([k,v])=>`<div><span>${k}</span><strong>${v}</strong></div>`).join('')}</div>`;
const panes = [['overview','Overview','◇'],['buy','Why Buy','+'],['risks','Why Not','△'],['forecast','Forecast','⌁'],['holdings','Holdings','▤'],['engine','Decision Engine','⊙']];
let basis = 'lock', filter = 'all', lastOpener;

function renderBoard() {
  $('#board-rows').innerHTML = Object.entries(COMPANIES).map(([ticker,c]) => {
    const b = BASELINE[ticker];
    return `<tr><td><div class="company-cell"><span class="ticker-icon ${ticker.toLowerCase()}">${c.mark}</span><div class="table-company">${ticker}<small>${c.shortName || c.name}</small></div></div></td><td class="live-missing">—<small>Refresh required</small></td><td>${money(b.lock,2)}</td><td>${money(b.iv[0])}–${b.iv[1]}</td><td>~${money(b.expected)}</td><td><span class="score">${b.score}<span>/100</span></span><div class="score-line"><i style="width:${b.score}%"></i></div></td><td>${pill(b.decision,tones[b.decision])}</td><td class="overlay-cell">${pill(ticker==='INTU'?'DO NOT ADD':'NO ACTION',ticker==='INTU'?'negative':'neutral')}</td><td><button class="row-open" data-ticker="${ticker}" data-pane="overview" aria-label="Open ${ticker} research">↗</button></td></tr>`;
  }).join('');
}

function renderCards() {
  const m = intuMetrics(basis);
  const query = $('#company-search').value.trim().toLowerCase();
  const shown = Object.entries(COMPANIES).filter(([t,c]) => (filter==='all'||BASELINE[t].decision===filter) && `${t} ${c.name}`.toLowerCase().includes(query));
  $('#stock-cards').innerHTML = shown.map(([t,c])=>{
    const b = BASELINE[t];
    return `<article class="stock-card" id="stock-${t}" aria-label="${t} research"><div class="stock-top"><span class="ticker-icon ${t.toLowerCase()}">${c.mark}</span><div><h3>${t}</h3><small>${c.shortName||c.name}</small></div>${pill(b.decision,tones[b.decision])}</div><p class="stock-thesis">${c.thesis}</p><div class="valuation-strip"><div><small>Lock price</small><strong>${money(b.lock,2)}</strong></div><div><small>Intrinsic value range</small><strong>${money(b.iv[0])}–${b.iv[1]}</strong></div><div><small>Expected IV</small><strong class="expected">~${money(b.expected)}</strong></div></div><div class="card-lock-label"><span>◈ V10.25 · Score ${b.score}/100</span><span>Live price: refresh required</span></div><div class="card-overlay"><div class="card-overlay-top"><span>PORTFOLIO OVERLAY · V10.34</span>${pill(t==='INTU'?'DO NOT ADD':'NO ACTION',t==='INTU'?'negative':'neutral')}</div><div class="card-position"><div><small>Current weight</small><strong class="${t==='INTU'?'red':'muted'}">${t==='INTU'?`${pct(m.weight)} est.`:'Not supplied'}</strong></div><div><small>Target</small><strong>${t==='INTU'?'6–8%':t==='FIS'?'0% · gated':'Not set'}</strong></div><div><small>Hard max</small><strong>${t==='INTU'?'12%':'Not set'}</strong></div><div><small>Add capacity</small><strong>${t==='INTU'?'$0':t==='FIS'?'$0 · gated':'Unassessed'}</strong></div></div><div class="card-bucket">Risk Bucket · ${c.bucket}</div></div><div class="card-actions">${panes.map(([id,label,icon])=>`<button data-ticker="${t}" data-pane="${id}" aria-label="${t} ${label}"><span aria-hidden="true">${icon}</span>${label}</button>`).join('')}</div></article>`;
  }).join('');
  $('#no-results').hidden = shown.length !== 0;
}

function renderOverlay() {
  const m=intuMetrics(basis), weight=pct(m.weight), unknown=pct(100-m.weight);
  $('#holding-value').textContent=money(m.value);
  $('#valuation-label').textContent=basis==='lock'?'5,300 shares × $359.30 locked price':'5,300 shares × $357.21283 average cost';
  $('#current-weight').innerHTML=`${weight}<span class="unit red">OVER MAX</span>`;
  $('#overlay-weight').innerHTML=`${m.weight.toFixed(2)}<span>%</span>`;
  $('#over-max').textContent=money(m.excess);
  $('#alert-description').textContent=`Estimated ${weight} weight (${basis==='lock'?'locked-price':'cost'} basis) versus a 12% limit. The supplied portfolio decision is DO NOT ADD.`;
  $('#weight-fill').style.width=`${m.weight}%`;
  $('#weight-chart').setAttribute('aria-label',`INTU estimated weight ${weight}; target 6 to 8 percent; hard maximum 12 percent`);
  $('#known-percent').textContent=weight;
  $('#unknown-percent').textContent=unknown;
  $('#portfolio-donut').style.background=`conic-gradient(var(--red) 0% ${m.weight}%,#2a3a50 ${m.weight}% 100%)`;
  $('#portfolio-donut').setAttribute('aria-label',`${weight} known INTU estimate, ${unknown} unclassified. Not a live portfolio valuation.`);
  $('#risk-rows').innerHTML=RISK_BUCKETS.map(r=>`<tr><td>${r.name}${r.note?`<span class="risk-sub">${r.note}</span>`:''}</td><td class="${r.id==='software'?'red':'muted'}">${r.id==='software'?`At least ${weight}`:'Not supplied'}</td><td>${r.target[0]}–${r.target[1]}%</td><td>${r.max===null?'Not set':r.max+'%'}</td><td>${pill(r.id==='software'?'RED · ABOVE HARD MAX':'ORANGE · INCOMPLETE',r.id==='software'?'negative':'caution')}</td></tr>`).join('');
  renderCards();
}

function holdingsPanel(t) {
  const c=COMPANIES[t], r=RISK_BUCKETS.find(r=>r.id===c.risk), m=intuMetrics(basis);
  let content;
  if(t==='INTU') {
    const h=PORTFOLIO.holdings.INTU;
    content=`${pill('PORTFOLIO · DO NOT ADD','negative')}${stats([['Shares','5,300'],['Average purchase price','$357.21283'],['Purchase date · prior snapshot','31 Aug 2026'],['Total cost',money(h.shares*h.averageCost,2)],['Live market price','Refresh required'],['Live value / P&L','Unavailable'],['Estimated position value',money(m.value,2)],['Estimate basis',basis==='lock'?'Locked price $359.30':'Average cost $357.21283'],['Estimated current weight',pct(m.weight)],['Target portfolio weight','6–8%'],['Hard maximum','12% · $480,000'],['Remaining add capacity','$0']])}<p class="dialog-note">Estimated values are not a live market valuation. Changing the estimate basis does not change the locked price, score, or company decision.</p>`;
  } else {
    content=`${pill('HOLDINGS NOT SUPPLIED','caution')}<p>No ${t} shares or purchase cost have been supplied. Unknown holdings are not treated as zero.</p>${stats([['Shares / average cost','Not supplied'],['Current portfolio weight','Unknown'],['Stock target weight',t==='FIS'?'0% until gate passes':'Not set'],['Stock hard maximum','Not set'],['Add capacity',t==='FIS'?'$0 · capital-allocation gate':'Cannot assess'],['Portfolio decision','NO ACTION']])}`;
  }
  return content+box('Sector & economic exposure',stats([['Sector / industry',c.sector],['Sector weight',c.risk==='software'?`At least ${pct(m.weight)} · estimate`:'Incomplete'],['Sector-specific target / max','Not separately set'],['Economic Risk Bucket',c.bucket],['Broader bucket target',`${r.target[0]}–${r.target[1]}%`],['Broader bucket hard max',`${r.max}%`],['Concentration status',c.risk==='software'?'RED · bucket above max':'ORANGE · incomplete']]))+'<p class="small muted">Sector labels and economic buckets are distinct. The restored limits apply to economic buckets; no additional GICS-sector caps have been invented.</p>';
}

function enginePanel(t) {
  const b=BASELINE[t], c=COMPANIES[t];
  return `${pill('V10.25 · LOCKED COMPANY DECISION','baseline')}${stats([['Company decision',b.decision],['Engine score',`${b.score}/100`],['Lock price',money(b.lock,2)],['Intrinsic value range',`${money(b.iv[0])}–${b.iv[1]}`],['Expected intrinsic value',`~${money(b.expected)}`],['Expected-IV gap at lock',`${((b.expected/b.lock-1)*100).toFixed(1)}%`]])}<p class="dialog-note">Expected-IV gap = expected IV ÷ locked price − 1. It is a valuation comparison, not a forecast return. Detailed original score weights and valuation-model inputs were not supplied; they are not reconstructed.</p><div class="dialog-grid">${box('Business quality & moat',`<p>${c.moat}</p>`)}${box('Management & capital allocation',`<p>${c.management}</p>`)}</div><details open><summary>Hard gates & controlling decision</summary><p>${c.gate}</p></details><details><summary>Valuation ensemble · Bear / Base / Bull</summary>${stats([['Supplied IV lower bound',money(b.iv[0])],['Supplied expected IV',`~${money(b.expected)}`],['Supplied IV upper bound',money(b.iv[1])],['Scenario probabilities','Not supplied'],['DCF / multiple-model weights','Not supplied'],['Explicit entry / exit bands','Not supplied']])}<p>The supplied interval is an intrinsic-value range. Its endpoints are not relabeled as probability-weighted bear and bull scenarios without the original model.</p></details><details><summary>Evidence, uncertainty & loss protection</summary>${list(c.risks)}<p>Evidence comes from the prior ARGUS research snapshot. Current filings and prices require fresh verification. A hard maximum limits added exposure; it does not eliminate the risk in an existing position.</p></details><details><summary>Kill thesis & falsification</summary><p>${c.kill}</p></details><details><summary>Forward test & review conditions</summary><p>Preserve the historical decision and record subsequent evidence separately. The prior first six-month checkpoint is 01 Mar 2027. No resolved forward outcomes or current proof score have been verified in this dashboard.</p>${list(c.drivers)}</details><details open><summary>V10.34 · Portfolio fit & allocation veto</summary>${holdingsPanel(t)}</details>`;
}

function dataPanel() {
  return `${pill('LIVE PRICES · REFRESH REQUIRED','caution')}<p>No live market-price provider is connected. No old premarket, after-hours, or closing quotes from earlier conversations are presented as current prices.</p><div class="dialog-grid">${box('Locked research · V10.25','<p>The four prices, intrinsic-value ranges, expected values, scores, and company decisions are the exact baselines supplied for this build. They remain separate from holdings and allocation estimates.</p>')}${box('Portfolio overlay · V10.34','<p>The $4,000,000 portfolio size, 5,300 INTU shares, $357.21283 average cost, 6–8% target, 12% hard max, and DO NOT ADD decision were supplied by you.</p>')}</div><h3>Estimate methodology</h3>${list(['Locked-price estimate: 5,300 × $359.30 = $1,904,290, or 47.60725% of the supplied portfolio.', 'Cost basis: 5,300 × $357.21283 = $1,893,227.999, or 47.33070%. This is purchase cost, not current market value.', 'Hard maximum: 12% × $4,000,000 = $480,000. Additional capacity is clamped at zero when the position exceeds its limit.', 'The valuation-basis selector changes estimates only. It never mutates V10.25 or the supplied portfolio decision.', 'Other holdings are unknown. Unclassified portfolio value is not cash, and known bucket exposure is a lower bound.'])}<h3>Restored research context</h3><p>Company narratives, radar statuses, economic-bucket ranges, the FIS 0% gated target, purchase date, and proof counters were restored from the prior ARGUS conversation “תצוגת ארגוס בצ׳אט” dated 03 Sep 2026. They are historical research snapshots, not independently refreshed financial facts. The detailed original HTML and valuation formulas were not available in this folder.</p><h3>What a verified price refresh needs</h3><p>A quote source, price, quote timestamp, and market session for each ticker, plus updated holdings and a consistent portfolio valuation date. This version does not fetch quotes or execute trades. Refreshing the browser reloads the saved snapshot only.</p>`;
}

function openPanel(t,pane,opener) {
  lastOpener=opener;
  const dialog=$('#research-dialog');
  if(pane==='data') {
    $('#dialog-eyebrow').textContent='DATA INTEGRITY / METHODOLOGY';
    $('#dialog-title').textContent='Know what the numbers mean.';
    $('#dialog-content').innerHTML=dataPanel();
  } else {
    const c=COMPANIES[t], b=BASELINE[t];
    const title=panes.find(p=>p[0]===pane)[1];
    $('#dialog-eyebrow').textContent=`${t} / ${c.name}`;
    $('#dialog-title').textContent=title==='Decision Engine'?'Full Decision Engine':pane==='forecast'?'Forecast / Drivers':title;
    const source='<p class="dialog-note">Prior ARGUS research context · 03 Sep 2026. Historical thesis, not a refreshed recommendation. Company and portfolio decisions are separate.</p>';
    const content={
      overview:()=>`${pill(b.decision,tones[b.decision])}<p>${c.thesis}</p><div class="dialog-grid">${box('Company essence',`<p>${c.essence}</p>`)}${box('Moat',`<p>${c.moat}</p>`)}</div>${source}${box('Decision in context',`<p>${c.gate}</p>`)}`,
      buy:()=>`${pill('COMPANY THESIS','baseline')}${list(c.buy)}${source}${t==='INTU'?box('Portfolio veto', '<p class="red">Company BUY does not permit adding to this position. The supplied portfolio decision is DO NOT ADD.</p>'):''}`,
      risks:()=>`${pill('RISK & DISCONFIRMING EVIDENCE','caution')}${list(c.risks)}${box('What would break the thesis?',`<p>${c.kill}</p>`)}${source}`,
      forecast:()=>`${stats([['Horizon','6–12 months · prior research'],['Live forecast update','Requires new evidence']])}${box('Direction / confidence',`<p>${c.bias}</p><p>${c.confidence}</p>`)}<h3>Forecast / Drivers to monitor</h3>${list(c.drivers)}${box('Negative drivers',list(c.risks))}${source}`,
      holdings:()=>holdingsPanel(t), engine:()=>enginePanel(t)
    };
    $('#dialog-content').innerHTML=content[pane]();
  }
  dialog.showModal();
  dialog.scrollTop=0;
  document.body.style.overflow='hidden';
  $('#close-dialog').focus();
}

renderBoard();
renderOverlay();
$('#radar-cards').innerHTML=RADAR.map(r=>`<article class="radar-card"><div class="radar-top"><div><h3>${r.ticker}</h3><small>${r.name}</small></div><span class="muted" aria-hidden="true">◎</span></div>${pill(r.status,r.tone)}<p>${r.description}</p><div class="radar-checks">${r.checks.map(([label,result,tone])=>`<div><span>${label}</span><strong class="${tone}">● ${result}</strong></div>`).join('')}</div><div class="radar-next"><strong>NEXT EVIDENCE</strong>${r.next}</div><div class="radar-source">Live price & latest event: refresh required</div></article>`).join('');

$('#valuation-basis').addEventListener('change',e=>{basis=e.target.value;renderOverlay();});
$('#company-search').addEventListener('input',renderCards);
document.addEventListener('click',event=>{
  const btn=event.target.closest('button');
  if(!btn)return;
  if(btn.dataset.filter){filter=btn.dataset.filter;document.querySelectorAll('.filter').forEach(f=>{const active=f===btn;f.classList.toggle('active',active);f.setAttribute('aria-pressed',String(active));});renderCards();}
  if(btn.dataset.pane)openPanel(btn.dataset.ticker,btn.dataset.pane,btn);
  if(btn.dataset.open==='data')openPanel(null,'data',btn);
});
$('#close-dialog').addEventListener('click',()=>$('#research-dialog').close());
$('#research-dialog').addEventListener('click',e=>{if(e.target!==e.currentTarget)return;const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.currentTarget.close();});
$('#research-dialog').addEventListener('close',()=>{document.body.style.overflow='';lastOpener?.focus({preventScroll:true});});
const navLinks=[...document.querySelectorAll('nav a')];
const observer=new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);if(visible[0])navLinks.forEach(a=>{const active=a.hash===`#${visible[0].target.id}`;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});},{rootMargin:'-5% 0px -60% 0px',threshold:0});
document.querySelectorAll('main>section').forEach(s=>observer.observe(s));
