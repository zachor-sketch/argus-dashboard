const {chromium}=require(process.argv[2]||'playwright');const assert=require('node:assert/strict');
(async()=>{const server=require('../scripts/serve.cjs');await new Promise(r=>server.listening?r():server.once('listening',r));let browser;
try{
 browser=await chromium.launch({headless:true,channel:'msedge'});const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.clock.install({time:new Date('2026-09-04T08:00:00Z')});
 const event={id:'fixture',ticker:'INTU',timestamp:'2026-09-03T20:00:00Z',detectedAt:'2026-09-04T06:17:00Z',source:'https://www.sec.gov/Archives/fixture',sourceAuthorityTier:'T1_SEC_FILING',eventType:'guidance',rawFact:'TEST FIXTURE: Guidance lowered 10%.',variable:'Forward revenue',materiality:'high',reviewRequired:true,likelyDirection:'ambiguous',status:'OPEN'};
 await page.route('**/observer/events.jsonl',r=>r.fulfill({body:JSON.stringify(event)+'\n'}));
 await page.route('**/observer/scans.jsonl',r=>r.fulfill({body:JSON.stringify({status:'PARTIAL_OR_FAILED',companies:[{ticker:'INTU',ok:false,coverage:'UNAVAILABLE'}],failedSources:[{ticker:'INTU',source:'SEC',error:'HTTP_429'}]})+'\n'}));
 await page.route('https://api.github.com/**',r=>r.fulfill({json:{workflow_runs:[{event:'workflow_dispatch',status:'completed',conclusion:'failure'}]}}));
 await page.goto('http://127.0.0.1:4173');await page.locator('#observer-queue .observer-event').waitFor();
 const locked=await page.locator('#board-rows tr').first().locator('td').nth(2).innerText();
 for(const lang of ['he','en']){
  if(lang==='en')await Promise.all([page.waitForNavigation(),page.locator('[data-lang="en"]').click()]);
  await page.locator('#observer-queue .observer-event').waitFor();
  assert.equal(await page.locator('#observer tbody tr').count(),100);
  assert.match(await page.locator('#observer .observer-warning').innerText(),lang==='he'?/נכשלה/:/failed/);
  assert.equal(await page.locator('#observer .observer-state.green').count(),0);
  assert.equal(await page.locator('.review-chip[data-review="weekly"][data-review-ticker="INTU"].red').count(),1);
  for(const width of [1440,1024,768,390]){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);}
  await page.setViewportSize({width:1440,height:1000});await page.locator('#observer').screenshot({path:'test-results/observer-'+lang+'.png'});
 }
 await page.locator('#observer-queue summary').first().click();await page.locator('#observer-queue input').fill('Reviewed fixture only; no decision changed.');await page.locator('#observer-queue button').click();
 assert.equal(await page.locator('#observer-queue .observer-event').count(),0);assert.equal(await page.locator('#board-rows tr').first().locator('td').nth(2).innerText(),locked);
 const {MONITORS}=await import('../lib/observer-config.js');
 await page.route('**/observer/scans.jsonl',r=>r.fulfill({body:JSON.stringify({status:'PARTIAL',usableCompanies:20,minimumUsableCompanies:20,companies:MONITORS.map((c,i)=>({ticker:c.ticker,ok:i<20,usable:i<20,lastSuccessfulScan:i<20?'2026-09-04T06:17:00Z':null,coverage:i<20?'SEC_FILINGS_AND_EXHIBITS':'UNAVAILABLE'})),failedSources:[{ticker:'INTU',source:'Issuer',error:'PDF_REQUIRES_MANUAL_REVIEW'}]})+'\n'}));
 await page.route('https://api.github.com/**',r=>r.fulfill({json:{workflow_runs:[{event:'workflow_dispatch',status:'completed',conclusion:'success'}]}}));
 await page.reload();await page.waitForFunction(()=>document.querySelector('#observer .observer-warning')?.textContent.includes('Partial coverage'));
 assert.match(await page.locator('#observer .section-heading').innerText(),/PARTIAL/);
 assert.equal(await page.locator('#observer tbody tr').filter({has:page.locator('bdi',{hasText:/^IONQ$/})}).locator('.observer-state.green').count(),1);
 assert.equal(await page.locator('#observer tbody tr').filter({has:page.locator('bdi',{hasText:/^INTU$/})}).locator('.observer-state.red').count(),1);
 await page.route('https://api.github.com/**',r=>r.abort());await page.reload();await page.locator('#observer .observer-warning').waitFor();
 assert.equal(await page.locator('#observer .observer-state.green').count(),0);assert.deepEqual(errors,[]);
 console.log('PASS: Observer bilingual responsive status, failed/unavailable workflow, PARTIAL versus per-company fail-closed health, 100 profiles, review routing, local acknowledgment, unchanged lock.');
}finally{if(browser)await browser.close();server.close()}})().catch(e=>{console.error(e);process.exitCode=1});
