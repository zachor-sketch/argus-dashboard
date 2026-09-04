import {attributes,plainText,sourceDate} from './observer-rules.js';
export function sameIssuerURL(value,base,documentLanguage){try{if(!value?.trim())return null;const origin=new URL(base),u=new URL(value.replace(/&amp;/g,'&'),base);u.hash='';const language=p=>p.split('/').find(s=>/^(?:en|fr|de|he|es|it|pt|nl|ja|zh)(?:-[a-z]{2})?$/i.test(s)),a=language(origin.pathname)||documentLanguage,b=language(u.pathname);if(a&&b&&a.toLowerCase().split('-')[0]!==b.toLowerCase().split('-')[0])return null;return u.protocol==='https:'&&!u.username&&!u.password&&u.origin===origin.origin?u.href:null}catch{return null}}
export function isIndexURL(url){const p=new URL(url).pathname.replace(/\/$/,'');return !p||/(?:^|\/)(?:investors?|investor-relations|financial-results|results-reports|results-presentations-and-reports|media-releases|press-releases|publications|news|acquisitions|investor-announcements|financial-reports|key-figures|financial-targets|results-centre|press|press-contacts|key-documents|documents-cles|archive[^/]*)(?:\.html)?$/i.test(p)||/\/financial-calendar\//i.test(p)}
export function issuerCardDates(html,base){
 const dates=new Map(),stack=[],clean=html.replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi,'');
 for(const m of clean.matchAll(/<\/?([a-z][\w:-]*)\b(?:"[^"]*"|'[^']*'|[^'">])*>/gi)){
  const tag=m[1].toLowerCase();if(/^<\//.test(m[0])){const i=stack.findLastIndex(n=>n.tag===tag);if(i<0)continue;const nodes=stack.splice(i),node=nodes[0];if(!node.card||m.index-node.start>20000)continue;
   const part=clean.slice(node.start,m.index),urls=[...new Set([...part.matchAll(/<a\b[^>]*>/gi)].map(a=>sameIssuerURL(attributes(a[0]).href,base)).filter(Boolean))];if(urls.length!==1)continue;
   const values=[...new Set([...part.matchAll(/>([^<]+)(?=<)/g)].map(x=>sourceDate(x[1])).filter(Boolean))];if(values.length===1){const prior=dates.get(urls[0]);dates.set(urls[0],dates.has(urls[0])&&prior!==values[0]?null:values[0])}
  }else if(!/^(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/.test(tag)&&!m[0].endsWith('/>')){const a=attributes(m[0]);stack.push({tag,start:m.index,card:/card/i.test(a.class||'')})}
 }
 return dates;
}
export function issuerLinks(html,base){
 const links=[],cardDates=issuerCardDates(html,base),documentLanguage=attributes(html.match(/<html\b[^>]*>/i)?.[0]||'').lang;
 for(const m of html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)){
  const a=attributes(m[0].slice(0,m[0].indexOf('>')+1));if(!a.href)continue;const url=sameIssuerURL(a.href,base,documentLanguage);if(!url||url===base.replace(/#.*$/,''))continue;
  const title=plainText(m[0]),p=new URL(url).pathname;if(/contact|careers|\/keyword\//i.test(p))continue;
  if(!/earnings|results|release|guidance|acqui|merger|divest|financial.report|announcement|media information|media relations|rss|atom|press|newsroom\/article|\/publications\/|\/media-information\/\d{4}\//i.test(title+' '+p))continue;
  const date=sourceDate(title)||cardDates.get(url)||null,kind=/\.(?:xml|rss)(?:$|\?)/i.test(url)?'feed':isIndexURL(url)?'index':/\.pdf(?:$|\?)/i.test(url)||/\/assets\/pdf\//i.test(url)?'pdf':/\.(?:xlsx?|pptx?|docx?|zip|mp[34])(?:$|\?)/i.test(url)?'manual':'document';
  links.push({url,title,kind,date,dateSource:date?base:null});
 }
 for(const m of html.matchAll(/<link\b[^>]*>/gi)){const a=attributes(m[0]);if(/(?:rss|atom)\+xml/i.test(a.type||'')){const url=a.href&&sameIssuerURL(a.href,base);if(url)links.push({url,title:'Issuer feed',kind:'feed',date:null})}}
 const rank={feed:0,document:1,index:2,pdf:3,manual:4};return [...new Map(links.map(l=>[l.url,l])).values()].sort((a,b)=>rank[a.kind]-rank[b.kind]||Number(/results|earnings|acqui|guidance/i.test(b.title+' '+b.url))-Number(/results|earnings|acqui|guidance/i.test(a.title+' '+a.url)));
}
// Inventory only: external report links are never fetched, parsed or promoted to evidence.
export function externalIssuerDocuments(html,base){
 const found=new Map();for(const m of html.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)){
  const a=attributes(m[0].slice(0,m[0].indexOf('>')+1)),title=plainText(m[0]);if(!a.href||!/results|report|earnings|acquisition|dividend|guidance/i.test(title))continue;
  try{const u=new URL(a.href.replace(/&amp;/g,'&'),base);if(u.origin===new URL(base).origin||u.protocol!=='https:'||u.username||u.password||u.port||!u.hostname.includes('.')||/^[\d.]+$|:|(?:^|\.)(?:localhost|local|internal|test|invalid|onion)$/.test(u.hostname))continue;u.hash='';found.set(u.href,{url:u.href,discoveredFrom:base})}catch{}
 }return [...found.values()];
}
export function issuerFeed(xml,base){
 if(!/<(?:rss|feed)\b/i.test(xml))return null;if(/<!DOCTYPE|<!ENTITY/i.test(xml))throw Error('UNSAFE_FEED_DECLARATION');
 const entries=[];for(const m of xml.matchAll(/<(item|entry)\b[^>]*>([\s\S]*?)<\/\1>/gi)){
  const body=m[2],field=name=>{const raw=(body.match(new RegExp('<'+name+'\\b[^>]*>([\\s\\S]*?)<\\/'+name+'>','i'))||[])[1]||'';return plainText(raw.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g,'$1'))};
  let link=field('link');if(m[1].toLowerCase()==='entry'){const tag=[...body.matchAll(/<link\b[^>]*>/gi)].map(x=>attributes(x[0])).find(a=>!a.rel||a.rel==='alternate');link=tag?.href||''}
  const url=sameIssuerURL(link,base),date=sourceDate(field(m[1].toLowerCase()==='item'?'pubDate':'published'));
  if(url)entries.push({url,title:field('title'),date,dateSource:base,kind:'document'});
 }
 if(!entries.length)throw Error('NO_ISSUER_FEED_ENTRIES');return [...new Map(entries.map(e=>[e.url,e])).values()].sort((a,b)=>Date.parse(b.date||0)-Date.parse(a.date||0));
}
