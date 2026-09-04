import {publicationDate,attributes} from '../lib/observer-rules.js';
import {issuerFeed,issuerLinks,isIndexURL,externalIssuerDocuments} from '../lib/issuer-discovery.js';
// Bounded discovery through actual issuer links; never synthesize article URLs or treat an index as a release.
export async function collectIssuer({company,get,ingest,failure,maxDocuments=4,maxDiscoveryPages=4,maxDepth=2}){
 const queue=(company.discoveryURLs||[company.ir]).map(url=>({url,depth:0,root:true})),seen=new Set(),external=new Set(),sources=[];let pages=0,documents=0,attempts=0,usable=false,limited=false;
 while(queue.length&&attempts<maxDiscoveryPages+maxDocuments){
  const item=queue.shift();if(seen.has(item.url))continue;if(item.depth>maxDepth){limited=true;continue}seen.add(item.url);
  try{
   const assumedIndex=item.kind==='index'||item.kind==='feed'||item.root;
   if(assumedIndex&&pages>=maxDiscoveryPages||!assumedIndex&&documents>=maxDocuments){limited=true;continue}
   if(assumedIndex)pages++;else documents++;attempts++;
   if(item.kind==='manual')throw Error('UNSUPPORTED_DOCUMENT_FORMAT_MANUAL_REVIEW');
   sources.push(item.url);const html=await get(item.url),base=get.finalURL?.(item.url)||item.url,discoveryLanguage=attributes(html.match(/<html\b[^>]*>/i)?.[0]||'').lang||item.discoveryLanguage,feed=issuerFeed(html,base,discoveryLanguage),links=feed||issuerLinks(html,base),date=publicationDate(html,{dateOrder:company.dateOrder,headerDate:company.headerDate});
   const index=!!feed||isIndexURL(base)||!date&&!item.date&&links.length>0;
   if(index){
    for(const link of externalIssuerDocuments(html,base)){if(external.has(link.url))continue;if(external.size>=maxDocuments){limited=true;break}external.add(link.url);failure(link.url,Error('EXTERNAL_DOCUMENT_REQUIRES_MANUAL_REVIEW'),{discoveredFrom:link.discoveredFrom})}
    if(!assumedIndex){documents--;pages++}if(!links.length)throw Error('IR_DISCOVERY_UNSUPPORTED');
    if(pages>maxDiscoveryPages){limited=true;continue}
    queue.push(...links.slice(0,20).map(l=>({...l,depth:item.depth+1,discoveryLanguage})));if(links.length>20)limited=true;
    continue;
   }
   if(assumedIndex){pages--;documents++}if(documents>maxDocuments){limited=true;continue}
   if(!date&&!item.date)throw Error('PUBLICATION_DATE_UNAVAILABLE');
   await ingest(item.url,date||item.date,html,date?item.url:item.dateSource,date?'DOCUMENT_PUBLICATION_DATE':'ISSUER_LINK_OR_FEED_DATE');usable=true;
  }catch(e){failure(item.url,e)}
 }
 if(queue.length)limited=true;
 if(limited)failure(company.ir,Error('IR_DISCOVERY_LIMIT_REQUIRES_REVIEW'));
 if(!usable)failure(company.ir,Error('NO_USABLE_IR_EVIDENCE'));
 if(usable)failure(company.ir,Error('IR_ONLY_PARTIAL_COVERAGE_NO_REGULATORY_CONNECTOR'));
 return {usable,sources};
}
