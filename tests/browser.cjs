// Run with: node tests/browser.cjs [path-to-playwright-package] [base-url]
const {chromium} = require(process.argv[2] || 'playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
(async()=>{
  const server=require('../scripts/serve.cjs');
  await new Promise(r=>server.listening?r():server.once('listening',r));
  const browser=await chromium.launch({headless:true,channel:'msedge'});
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  await page.clock.install({time:new Date('2026-09-05T00:00:00Z')}); // Exercise historical-estimate fallback deterministically.
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('console',msg=>{if(msg.type()==='error') errors.push(msg.text());});
  const response=await page.goto(process.argv[3] || 'http://127.0.0.1:4173');
  assert.equal(response.status(),200);
  await page.locator('.stock-card').last().waitFor();
  assert.equal(await page.title(),'ARGUS V2 Dashboard');
  assert.equal(await page.locator('#board-rows tr').count(),4);
  assert.equal(await page.locator('.stock-card').count(),4);
  assert.equal(await page.locator('.radar-card').count(),8);
  assert.equal(await page.locator('#universe tbody tr').count(),100);
  assert.equal(await page.locator('[data-v2-engine]').count(),4);
  assert.equal(await page.locator('html').getAttribute('lang'),'he');
  assert.equal(await page.locator('html').getAttribute('dir'),'rtl');
  assert.match(await page.locator('#current-weight').innerText(),/47.61%/);
  const locked=await page.locator('#board-rows').innerText();
  fs.mkdirSync('test-results',{recursive:true});
  await page.screenshot({path:'test-results/desktop.png',fullPage:true});
  for(const ticker of ['INTU','NVDA','FIS','CRM']){
    for(const pane of ['overview','buy','risks','forecast','holdings','engine']){
      const opener=page.locator(`#stock-${ticker} [data-pane="${pane}"]`);
      await opener.click();
      assert.equal(await page.locator('dialog').isVisible(),true);
      assert.ok((await page.locator('#dialog-content').innerText()).length>100);
      if(pane==='engine'){
        assert.ok((await page.locator('#dialog-content').innerText()).includes('V10.25'));
        assert.ok((await page.locator('#dialog-content').innerText()).includes('ציון גולמי'));
        assert.equal((await page.locator('#dialog-content').innerText()).includes('unavailable'),false);
      }
      if(ticker==='INTU'&&pane==='holdings')await page.screenshot({path:'test-results/holdings-panel.png'});
      await page.keyboard.press('Escape');
      assert.equal(await page.locator('dialog').isVisible(),false);
      assert.equal(await opener.evaluate(el=>el===document.activeElement),true);
    }
  }
  await page.locator('[data-filter="BUY"]').click();
  assert.equal(await page.locator('.stock-card').count(),1);
  assert.equal(await page.locator('#stock-INTU').count(),1);
  await page.locator('[data-filter="all"]').click();
  await page.locator('#company-search').fill('nvidia');
  assert.equal(await page.locator('.stock-card').count(),1);
  assert.equal(await page.locator('#stock-NVDA').count(),1);
  await page.locator('#company-search').fill('unmatched-company');
  assert.equal(await page.locator('#no-results').isVisible(),true);
  await page.locator('#company-search').fill('');
  await page.locator('#valuation-basis').selectOption('cost');
  assert.match(await page.locator('#current-weight').innerText(),/47.33%/);
  assert.match(await page.locator('#stock-INTU').innerText(),/47.33%/);
  assert.match(await page.locator('#known-percent').innerText(),/47.33%/);
  assert.equal(await page.locator('#board-rows').innerText(),locked);
  await page.locator('#valuation-basis').selectOption('lock');
  await page.locator('[data-open="data"]').first().click();
  assert.match(await page.locator('#dialog-content').innerText(),/0c6c0ddd63284379/);
  await page.locator('#close-dialog').click();
  for(const width of [1920,1440,1100,1024,768,390,320]){
    await page.setViewportSize({width,height:900});
    await page.evaluate(()=>window.scrollTo(0,0));
    const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
    if(overflow)console.log(await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,scrollX,body:document.body.getBoundingClientRect().toJSON(),elements:[...document.querySelectorAll('body *')].filter(el=>{const r=el.getBoundingClientRect();return r.right+scrollX>innerWidth+1;}).map(el=>({tag:el.tagName,cls:el.className,width:el.getBoundingClientRect().width,right:el.getBoundingClientRect().right,overflow:getComputedStyle(el).overflowX})).slice(0,30)})));
    assert.equal(overflow,false,`Page overflow at ${width}px`);
    if(width===390)await page.screenshot({path:'test-results/mobile.png',fullPage:true});
    if(width===320){
      await page.locator('#stock-INTU [data-pane="engine"]').click();
      const dialog=await page.locator('dialog').boundingBox();
      assert.ok(dialog.x>=0&&dialog.x+dialog.width<=width);
      assert.equal(await page.locator('dialog').evaluate(el=>el.scrollWidth<=el.clientWidth),true);
      await page.keyboard.press('Escape');
    }
  }
  await page.setViewportSize({width:1440,height:1000});
  await Promise.all([page.waitForNavigation(),page.locator('[data-lang="en"]').click()]);
  await page.locator('#universe tbody tr').first().waitFor();
  assert.equal(await page.locator('html').getAttribute('lang'),'en');
  assert.equal(await page.locator('html').getAttribute('dir'),'ltr');
  assert.equal(await page.locator('#universe tbody tr').count(),100);
  for(const width of [1440,390]){
    await page.setViewportSize({width,height:900});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,'English layout overflow');
    await page.screenshot({path:'test-results/english-'+width+'.png',fullPage:true});
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.locator('#stock-INTU [data-pane="forecast"]').click();
  await page.locator('#user-notes').fill('Local forecast note for persistence test');
  await page.keyboard.press('Escape');
  await page.locator('#stock-INTU [data-pane="forecast"]').click();
  assert.equal(await page.locator('#user-notes').inputValue(),'Local forecast note for persistence test');
  await page.keyboard.press('Escape');
  await page.locator('#portfolio-form [name="shares-0"]').fill('5301');
  await Promise.all([page.waitForNavigation(),page.locator('#portfolio-form button:not([type="button"])').click()]);
  await page.locator('#universe tbody tr').first().waitFor();
  assert.equal(await page.locator('#portfolio-form [name="shares-0"]').inputValue(),'5301');
  await page.locator('#portfolio-form [name="shares-0"]').fill('5300');
  await Promise.all([page.waitForNavigation(),page.locator('#portfolio-form button:not([type="button"])').click()]);
  await page.locator('#universe tbody tr').first().waitFor();
  await Promise.all([page.waitForNavigation(),page.locator('[data-lang="he"]').click()]);
  await page.locator('#universe tbody tr').first().waitFor();
  assert.equal(await page.locator('html').getAttribute('dir'),'rtl');
  assert.deepEqual(errors,[]);
  await browser.close();
  server.close();
  console.log('PASS: V2 Hebrew RTL / English LTR, 24 legacy panels, full engine access, 100-company universe, AI chain, immutable baseline, allocation estimates, seven responsive widths; no runtime errors.');
})().catch(error=>{console.error(error);process.exit(1);});
