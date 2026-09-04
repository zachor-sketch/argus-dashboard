import test from 'node:test';import assert from 'node:assert/strict';import fs from 'node:fs';import os from 'node:os';import path from 'node:path';
import {publicationDate,sourceDate} from '../lib/observer-rules.js';
import {issuerLinks,issuerFeed,sameIssuerURL,issuerCardDates} from '../lib/issuer-discovery.js';
import {collectIssuer} from '../scripts/observer-ir.mjs';
import {resolveCompanySEC,assertSECIdentity} from '../scripts/observer-sec.mjs';
import {MONITORS} from '../lib/observer-config.js';import {UNIVERSE} from '../datasets/universe_v10_33.js';
import {runObserver} from '../scripts/observer-run.mjs';import {readJournal} from '../scripts/observer-store.mjs';
import {failureCategory} from '../lib/observer-failures.js';
const article='<meta content="2026-09-03" property="article:published_time"><p>'+ 'Revenue increased 12%. '.repeat(12)+'</p>';
test('publication dates support attribute order and explicit labels, reject invalid or ambiguous dates',()=>{
 assert.equal(publicationDate(article),'2026-09-03T00:00:00.000Z');assert.equal(publicationDate('<p>Published on 07.27.2026</p>'),'2026-07-27T00:00:00.000Z');
 assert.equal(publicationDate('<span class="article-date">08/07/2026</span>',{dateOrder:'MDY'}),'2026-08-07T00:00:00.000Z');
 for(const value of ['2026-02-30','02/03/2026','31/02/2026'])assert.equal(sourceDate(value),null);
 assert.equal(sourceDate('12 August 2026 release'),'2026-08-12T00:00:00.000Z');
 assert.equal(publicationDate('<time datetime="2026-09-03"></time><time datetime="2026-09-02"></time>'),null);
 assert.equal(publicationDate('<meta name="dateModified" content="2026-09-03"><footer>2026-09-03</footer>'),null);
});
test('issuer RSS/Atom binds dates to individual same-origin links and never substitutes feed updated time',()=>{
 const base='https://issuer.com/rss.xml',rows=issuerFeed('<rss><channel><lastBuildDate>Fri, 04 Sep 2026 00:00:00 GMT</lastBuildDate><item><pubDate>Thu, 03 Sep 2026 10:00:00 GMT</pubDate><title>Results</title><link>/releases/one</link></item><item><pubDate>Thu, 03 Sep 2026 10:00:00 GMT</pubDate><link>https://other.com/fake</link></item></channel></rss>',base);
 assert.equal(rows.length,1);assert.equal(rows[0].date,'2026-09-03T10:00:00.000Z');assert.equal(rows[0].dateSource,base);
 const atom=issuerFeed('<feed><entry><title>Results</title><updated>2026-09-04</updated><link rel="alternate" href="/release/two" /></entry></feed>',base);assert.equal(atom[0].date,null);
 assert.throws(()=>issuerFeed('<!DOCTYPE x SYSTEM "file:///etc/passwd"><rss></rss>',base),/UNSAFE_FEED/);
 for(const u of ['', 'http://issuer.com/a','https://user:pass@issuer.com/a','https://127.0.0.1/a'])assert.equal(sameIssuerURL(u,base),null);
});
test('issuer discovery prioritizes actual releases and preserves link-bound date provenance',()=>{
 const rows=issuerLinks('<a href="/financial-results">Results</a><a href="/releases/one"><h3>12 August 2026</h3>Financial results</a><a href="https://elsewhere.com/releases/fake">Results</a>','https://issuer.com/investors');
 assert.equal(rows[0].url,'https://issuer.com/releases/one');assert.equal(rows[0].date,'2026-08-12T00:00:00.000Z');assert.equal(rows[0].dateSource,'https://issuer.com/investors');assert.equal(rows.length,2);
});
test('bounded issuer index traversal fetches the release once and cannot promote a dated index',async()=>{
 const company={ir:'https://issuer.com/investors'},calls=[],ingested=[],failures=[];
 const get=async url=>{calls.push(url);return url.endsWith('/investors')?'<meta name="datePublished" content="2026-09-04"><a href="/financial-results">Results</a>':url.endsWith('/financial-results')?'<a href="/releases/current">Quarterly results</a>':article};
 const result=await collectIssuer({company,get,ingest:async(...args)=>ingested.push(args),failure:(url,e)=>failures.push(e.message)});
 assert.equal(result.usable,true);assert.equal(ingested.length,1);assert.equal(calls.length,3);assert.equal(ingested[0][0],'https://issuer.com/releases/current');assert.ok(failures.includes('IR_ONLY_PARTIAL_COVERAGE_NO_REGULATORY_CONNECTOR'));
 const empty=await collectIssuer({company,get:async()=>'<meta name="datePublished" content="2026-09-04">',ingest:async()=>assert.fail('Index became evidence'),failure:()=>{}});assert.equal(empty.usable,false);
});
test('PDF/access failures and discovery budgets never create usable evidence',async()=>{
 for(const error of ['PDF_REQUIRES_MANUAL_REVIEW','HTTP_403']){let requests=0;const failures=[];const result=await collectIssuer({company:{ir:'https://issuer.com/investors'},get:async url=>{requests++;if(url.endsWith('investors'))return Array.from({length:30},(_,i)=>`<a href="/releases/${i}.pdf">Results</a>`).join('');throw Error(error)},ingest:async()=>assert.fail('Failed document became evidence'),failure:(url,e)=>failures.push(e.message)});assert.equal(result.usable,false);assert.ok(requests<=5);assert.ok(failures.includes(error));assert.ok(failures.includes('IR_DISCOVERY_LIMIT_REQUIRES_REVIEW'))}
});
test('Lloyds alias requires pinned issuer CIK, exact SEC ticker and authoritative route; research import is unchanged',()=>{
 const c=MONITORS.find(c=>c.ticker==='LLOY'),entry=resolveCompanySEC(c,{0:{ticker:'LYG',cik_str:1160106}},[]);assert.equal(entry.ticker,'LYG');assertSECIdentity({cik:'1160106',tickers:['LYG']},entry);
 assert.throws(()=>resolveCompanySEC(c,{0:{ticker:'LYG',cik_str:123}},[]),/ALIAS_IDENTITY/);assert.throws(()=>assertSECIdentity({cik:'1160106',tickers:['LLOY']},entry),/IDENTITY/);
 assert.equal(UNIVERSE['Company Universe'].find(c=>c.Ticker==='LUMI.TA')['Primary Source URL'],'https://english.leumi.co.il/Investor_Relations');assert.equal(MONITORS.find(c=>c.ticker==='LUMI.TA').ir,'https://www.leumi.co.il/en/Investor-Relations');
});
test('SEC backlog drains across append-only scans without increasing per-company document limit',async()=>{
 const directory=fs.mkdtempSync(path.join(os.tmpdir(),'argus-backlog-')),company=MONITORS.find(c=>c.ticker==='INTU'),forms=Array.from({length:5},(_,i)=>'0000896878-26-00000'+i);let fetched=0;
 const client=async url=>url.includes('company_tickers')?JSON.stringify({0:{ticker:'INTU',cik_str:896878}}):url.includes('submissions')?JSON.stringify({cik:'896878',tickers:['INTU'],filings:{recent:{accessionNumber:forms,form:forms.map(()=> '8-K'),filingDate:forms.map(()=> '2026-09-03'),primaryDocument:forms.map((_,i)=>i+'.htm')}}}):(fetched++,article);
 try{const opts={directory,companies:[company],client,now:new Date('2026-09-04T10:00:00Z'),macroSources:[]};const first=await runObserver({...opts,runId:'first'});assert.equal(fetched,4);assert.equal(first.completeCompanies,0);assert.ok(first.failedSources.some(f=>f.error==='FILING_BACKLOG_REQUIRES_NEXT_SCAN'));const second=await runObserver({...opts,runId:'second'});assert.equal(fetched,5);assert.equal(second.completeCompanies,1);assert.equal(readJournal(directory,'scans.jsonl').length,2)}finally{fs.rmSync(directory,{recursive:true,force:true})}
});
test('failure categories distinguish access, PDF, dates, regulatory, DNS, and timeout gaps',()=>{
 assert.equal(failureCategory('HTTP_403'),'LEGITIMATE_403_ANTIBOT');assert.equal(failureCategory('HTTP_404'),'DNS_404');assert.equal(failureCategory('read ETIMEDOUT'),'TIMEOUT');assert.equal(failureCategory('PUBLICATION_DATE_UNAVAILABLE'),'PUBLICATION_DATE_PARSING');assert.equal(failureCategory('PDF_REQUIRES_MANUAL_REVIEW'),'PDF_MANUAL_REVIEW_LIMITATION');assert.equal(failureCategory('IR_ONLY_PARTIAL_COVERAGE_NO_REGULATORY_CONNECTOR'),'UNSUPPORTED_NON_US_REGULATORY_SOURCE');assert.equal(failureCategory('FILING_BACKLOG_REQUIRES_NEXT_SCAN'),'OTHER');
});
test('card dates stay scoped to one article and do not leak between adjacent releases or locales',()=>{
 const html='<div class="card"><a href="/en/news/results-a">Results</a><div class="card-text">28 July 2026: Results for period ended 30 June 2026</div></div><div class="card"><a href="/en/news/results-b">Results</a><div class="card-text">4 August 2026: Earnings</div></div>';
 const dates=issuerCardDates(html,'https://issuer.com/en/news');assert.equal(dates.get('https://issuer.com/en/news/results-a'),'2026-07-28T00:00:00.000Z');assert.equal(dates.get('https://issuer.com/en/news/results-b'),'2026-08-04T00:00:00.000Z');
 assert.equal(sameIssuerURL('/fr/news/resultats','https://issuer.com/en/news'),null);
 const ambiguous='<div class="card"><a href="/en/news/results-a">A</a><a href="/en/news/results-b">B</a><p>4 August 2026</p></div>';assert.equal(issuerCardDates(ambiguous,'https://issuer.com/en/news').size,0);
});
test('nested visible publication markers and explicitly configured header dates beat unrelated attachment dates',()=>{
 assert.equal(publicationDate('<div class="publicationDate">\n<p class="publication__date">08/07/2026</p></div>',{dateOrder:'MDY'}),'2026-08-07T00:00:00.000Z');
 const html='<script>{"datePublished":"2025-11-03"}</script><script>{"datePublished":"2026-07-29"}</script><h1>Issuer release</h1><p>Paris</p><p><svg></svg>30/07/2026</p><p>Reported results for 30 June 2026</p>';
 assert.equal(publicationDate(html),null);assert.equal(publicationDate(html,{dateOrder:'DMY',headerDate:true}),'2026-07-30T00:00:00.000Z');
 assert.equal(publicationDate('<time class="datetime" datetime="2026-07-23T04:30:00Z">23 Jul 2026 - 06:30 CEST</time>'),'2026-07-23T04:30:00.000Z');
});
