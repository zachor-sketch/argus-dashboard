const {chromium}=require(process.argv[2]||'playwright');
const assert=require('node:assert/strict');
(async()=>{
 const server=require('../scripts/serve.cjs');await new Promise(r=>server.listening?r():server.once('listening',r));let browser;
 try{
 browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.clock.install({time:new Date('2026-09-04T04:53:27Z')});
  await page.route('https://api.github.com/**',r=>r.fulfill({json:{workflow_runs:[{event:'workflow_dispatch',status:'completed',conclusion:'success'}]}}));
 await page.goto('http://127.0.0.1:4173');await page.locator('.review-chip').last().waitFor();assert.deepEqual(errors,[]);
 for(const lang of ['he','en']){
  if(lang==='en')await Promise.all([page.waitForNavigation(),page.locator('[data-lang="en"]').click()]);
  await page.locator('.review-chip').last().waitFor();
  assert.equal(await page.locator('.review-chip[data-review="price"].green').count(),4);
  assert.match(await page.locator('#holding-value').innerText(),/1,849,912/);
  assert.match(await page.locator('#current-weight').innerText(),/46.25%/);
  const intu=page.locator('#daily tbody tr').filter({has:page.locator('.daily-ticker', {hasText:'INTU'})});
  assert.match(await intu.innerText(),/349.04/);assert.match(await intu.innerText(),/S&P Global Market Intelligence/);
  const locked=page.locator('#board-rows tr').first();assert.match(await locked.locator('td').nth(1).innerText(),/349.04/);assert.match(await locked.locator('td').nth(2).innerText(),/359.30/);
  assert.match(await page.locator('#v2-holdings tr').first().innerText(),/-\$43,316.00/);
  for(const width of [1440,1024,768,390]){await page.setViewportSize({width,height:1000});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);if(width>=1024)assert.equal(await page.locator('#daily .table-scroll').evaluate(e=>e.scrollWidth>e.clientWidth+1),false)}
 }
 await page.clock.fastForward(16*3600000);
 assert.equal(await page.locator('.review-chip[data-review="price"].green').count(),0);
 assert.equal(await page.locator('#daily .price-refresh').count(),4);
 assert.doesNotMatch(await page.locator('#daily').innerText(),/349.04/);
 assert.equal(await page.locator('#v2-holdings tr td').nth(5).innerText(),'—');
 assert.match(await page.locator('#board-rows tr').first().locator('td').nth(2).innerText(),/359.30/);
 assert.deepEqual(errors,[]);console.log('PASS: fresh snapshot and automatic expiry, verified summary/P&L, source provenance, separate lock, Hebrew/English and four viewport widths.');
 }finally{if(browser)await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
