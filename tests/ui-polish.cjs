const {chromium}=require(process.argv[2]||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
(async()=>{
 const server=require('../scripts/serve.cjs');
 await new Promise(r=>server.listening?r():server.once('listening',r));
 let browser;
 try{
  browser=await chromium.launch({headless:true,channel:'msedge'});
  const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:4173');await page.locator('.review-chip').last().waitFor();
  fs.mkdirSync('test-results',{recursive:true});
  for(const lang of ['he','en']){
   if(lang==='en')await Promise.all([page.waitForNavigation(),page.locator('[data-lang="en"]').click()]);
   await page.locator('.review-chip').last().waitFor();
   assert.equal(await page.locator('html').getAttribute('dir'),lang==='he'?'rtl':'ltr');
   assert.equal(await page.locator('.review-chip').count(),16);
   assert.equal(await page.locator('.review-dates').count(),4);
   for(const width of [1920,1440,1366,1280,1100,1024,900,820,768,390,320]){
    await page.setViewportSize({width,height:1000});
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,lang+' page overflow '+width);
    if(width>=1024){
     assert.equal(await page.locator('#daily .table-scroll').evaluate(e=>e.scrollWidth>e.clientWidth+1),false,lang+' board clipping '+width);
     const clipped=await page.locator('.review-chip').evaluateAll(els=>els.some(e=>e.scrollWidth>e.clientWidth+1));
     assert.equal(clipped,false,lang+' review label clipped '+width);
    }
    if([1440,1024,390].includes(width))await page.locator('#daily').screenshot({path:'test-results/polish-'+lang+'-'+width+'.png'});
   }
   await page.setViewportSize({width:1440,height:1000});
   for(const key of ['price','weekly','forecast','full']){
    const chip=page.locator('.review-chip[data-review="'+key+'"]').first();
    assert.ok((await chip.getAttribute('title')).length>30);
    await chip.click();
    assert.equal(await page.locator('dialog').isVisible(),true);
    assert.match(await page.locator('#dialog-content').innerText(),lang==='he'?/בדיקה אחרונה/:/Last Review/);
    await page.keyboard.press('Escape');
    assert.equal(await chip.evaluate(e=>e===document.activeElement),true);
   }
   await page.setViewportSize({width:1100,height:1000});
   await page.locator('.daily-ticker button').first().click();
   assert.ok((await page.locator('#dialog-content').innerText()).length>100);
   await page.keyboard.press('Escape');
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: 22 bilingual viewport checks; desktop board and labels fit; 8 review dialogs, hover details, focus return and laptop rationale access.');
 }finally{if(browser)await browser.close();server.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
