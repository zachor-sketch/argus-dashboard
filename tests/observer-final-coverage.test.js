import test from 'node:test';import assert from 'node:assert/strict';
import {issuerLinks,externalIssuerDocuments} from '../lib/issuer-discovery.js';
import {collectIssuer} from '../scripts/observer-ir.mjs';
import {failureCategory} from '../lib/observer-failures.js';

test('declared page language filters translation URLs when the root URL has no language segment',()=>{
 const html='<html lang="en-GB"><a href="/fr/media/releases/old">Results</a><a href="/en/media/releases/current">Results</a><a href="/media/releases/current">Results</a></html>';
 const links=issuerLinks(html,'https://issuer.com/media/press-releases');assert.equal(links.length,2);assert.ok(links.every(l=>!l.url.includes('/fr/')));
 assert.equal(issuerLinks(html.replace('en-GB','fr'),'https://issuer.com/media/press-releases').filter(l=>l.url.includes('/fr/')).length,1);
 assert.equal(issuerLinks('<a href="/fr/releases/current">Results</a>','https://issuer.com/investors').length,1); // Unknown language is not assumed English.
});
test('external report inventory preserves exact origin provenance without accepting unsafe URLs',()=>{
 const links=externalIssuerDocuments('<a href="https://reports.exchange.org/123.pdf">Annual results</a><a href="https://reports.exchange.org/123.pdf">Report</a><a href="https://news.org/story">Quarterly results</a>'+['http://x.org/file','https://user:pass@x.org/file','https://127.0.0.1/a','https://x.local/a','javascript:alert(1)','https://x.org:8443/a'].map(u=>`<a href="${u}">Results</a>`).join(''),'https://issuer.com/investors');
 assert.equal(links.length,2);assert.equal(links[0].discoveredFrom,'https://issuer.com/investors');assert.equal(links[0].url,'https://reports.exchange.org/123.pdf');
});
test('external documents remain bounded manual gaps, never fetched or promoted to usable evidence',async()=>{
 let requests=0;const failures=[];const company={ir:'https://issuer.com/investors'};
 const result=await collectIssuer({company,get:async()=>{requests++;return Array.from({length:12},(_,i)=>`<a href="https://reports.exchange.org/${i}.pdf">Annual report</a>`).join('')},ingest:async()=>assert.fail('External link became evidence'),failure:(source,e,context)=>failures.push({source,error:e.message,...context})});
 assert.equal(requests,1);assert.equal(result.usable,false);const external=failures.filter(f=>f.error==='EXTERNAL_DOCUMENT_REQUIRES_MANUAL_REVIEW');assert.equal(external.length,4);assert.ok(external.every(f=>f.discoveredFrom===company.ir));assert.ok(failures.some(f=>f.error==='IR_DISCOVERY_LIMIT_REQUIRES_REVIEW'));
});
test('denied access retains its actual cause and does not manufacture a date parsing error',async()=>{
 const errors=[];const result=await collectIssuer({company:{ir:'https://issuer.com/investors'},get:async()=>{throw Error('HTTP_403')},ingest:async()=>assert.fail(),failure:(url,e)=>errors.push(e.message)});
 assert.equal(result.usable,false);assert.deepEqual(errors,['HTTP_403','NO_USABLE_IR_EVIDENCE']);assert.equal(failureCategory(errors[0]),'LEGITIMATE_403_ANTIBOT');assert.equal(failureCategory(errors[1]),'NO_USABLE_EVIDENCE');assert.equal(failureCategory('IR_DISCOVERY_LIMIT_REQUIRES_REVIEW'),'BOUNDED_DISCOVERY_BACKLOG');assert.equal(failureCategory('EXTERNAL_DOCUMENT_REQUIRES_MANUAL_REVIEW'),'EXTERNAL_DOCUMENT_MANUAL_REVIEW');
});
test('issuer page language follows discovered RSS links and filters mixed-language feed entries',async()=>{
 const calls=[],ingested=[];const result=await collectIssuer({company:{ir:'https://issuer.com/investors'},get:async url=>{calls.push(url);if(url.endsWith('/investors'))return '<html lang="en"><a href="/rss">RSS</a></html>';if(url.endsWith('/rss'))return '<rss><channel><item><link>/fr/releases/old</link><pubDate>Thu, 03 Sep 2026 10:00:00 GMT</pubDate></item><item><link>/releases/current</link><pubDate>Thu, 03 Sep 2026 10:00:00 GMT</pubDate></item></channel></rss>';return '<p>Quarterly results</p>'},ingest:async url=>ingested.push(url),failure:()=>{}});
 assert.equal(result.usable,true);assert.deepEqual(ingested,['https://issuer.com/releases/current']);assert.equal(calls.some(url=>url.includes('/fr/')),false);
});
