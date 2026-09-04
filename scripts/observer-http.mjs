import https from 'node:https';
import {lookup} from 'node:dns/promises';
import {isIP} from 'node:net';
import {Readable} from 'node:stream';
import {OBSERVER_CONFIG as C} from '../lib/observer-config.js';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
export function publicAddress(address){
 if(isIP(address)===4){const [a,b,c]=address.split('.').map(Number);return !(a===0||a===10||a===127||a>=224||a===169&&b===254||a===172&&b>=16&&b<=31||a===192&&(b===168||b===0||b===2)||a===100&&b>=64&&b<=127||a===198&&(b===18||b===19||b===51&&c===100)||a===203&&b===0&&c===113)}
 // Only global unicast IPv6; reject mapped, local, link-local, multicast and documentation addresses.
 const [first,second]=address.split(':').map(s=>parseInt(s,16));
 return isIP(address)===6&&/^[23][0-9a-f]{3}:/i.test(address)&&first!==0x2002&&!(first===0x2001&&[0,0xdb8,0x10,0x20].includes(second));
}
export function safeURL(value){
 const u=new URL(value);const h=u.hostname.replace(/^\[|\]$/g,'');
 if(u.protocol!=='https:'||u.username||u.password||u.port&&u.port!=='443'||isIP(h)||!h.includes('.')||/(?:^|\.)(?:localhost|local|internal|test|invalid|onion)$/.test(h))throw Error('UNSAFE_SOURCE_URL');
 return u;
}
export function secUserAgent(contact=process.env.SEC_CONTACT||'https://github.com/zachor-sketch/argus-dashboard/issues'){
 if(/[\r\n]/.test(contact)||!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact)||/^https:\/\/github\.com\/zachor-sketch\/argus-dashboard\/issues$/.test(contact)))throw Error('INVALID_SEC_CONTACT');
 return `ARGUS-Observer/1.1 zachor-sketch contact:${contact}`;
}
// Pin the validated DNS addresses to the TLS request, avoiding a validation/fetch DNS-rebinding gap.
export function pinnedFetch(url,{headers,signal,addresses}){
 return new Promise((resolve,reject)=>{const req=https.request(url,{headers,signal,lookup:(_host,options,callback)=>options.all?callback(null,addresses):callback(null,addresses[0].address,addresses[0].family)},res=>{
  resolve(new Response(Readable.toWeb(res),{status:res.statusCode,headers:Object.fromEntries(Object.entries(res.headers).filter(([,v])=>v!==undefined).map(([k,v])=>[k,Array.isArray(v)?v.join(', '):v]))}));
 });req.on('error',reject);req.end()});
}
export function makeClient({fetcher=pinnedFetch,resolver=host=>lookup(host,{all:true,verbatim:true}),wait=sleep,userAgent=secUserAgent(),interval=C.requestIntervalMs,maxRedirects=4}={}){
 let last=0,tail=Promise.resolve();const blocked=new Set(),finalURLs=new Map();
 const request=async original=>{
  let url=original;const visited=new Set();
  for(let hop=0;hop<=maxRedirects;hop++){
   const u=safeURL(url);if(visited.has(u.href))throw Error('REDIRECT_LOOP');visited.add(u.href);
   if(blocked.has(u.hostname))throw Error('SOURCE_BLOCKED_FOR_RUN');
   let timer;const addresses=await Promise.race([resolver(u.hostname),new Promise((_,reject)=>{timer=setTimeout(()=>reject(Error('DNS_TIMEOUT')),10000)})]).finally(()=>clearTimeout(timer));
   if(!addresses.length||addresses.some(a=>!publicAddress(a.address)))throw Error('UNSAFE_DNS_ADDRESS');
   await wait(Math.max(0,interval-(Date.now()-last)));last=Date.now();
   const r=await fetcher(u.href,{headers:{'User-Agent':userAgent,Accept:'application/json, application/xml, text/html, text/plain','Accept-Encoding':'identity'},signal:AbortSignal.timeout(15000),redirect:'manual',addresses});
   // Respect denial/throttling for the entire host for the rest of this scan; no rotated identity or proxy.
   if([403,429].includes(r.status))blocked.add(u.hostname);
   if([301,302,303,307,308].includes(r.status)){
    await r.body?.cancel();if(hop===maxRedirects)throw Error('REDIRECT_LIMIT');const location=r.headers.get('location');if(!location)throw Error('REDIRECT_LOCATION_MISSING');url=safeURL(new URL(location,u).href).href;continue;
   }
   if(!r.ok){await r.body?.cancel();throw Error('HTTP_'+r.status)}
   if(Number(r.headers.get('content-length'))>C.maxDocumentBytes){await r.body?.cancel();throw Error('DOCUMENT_TOO_LARGE')}
   if(/application\/pdf/i.test(r.headers.get('content-type')||'')){await r.body?.cancel();throw Error('PDF_REQUIRES_MANUAL_REVIEW')}
   const reader=r.body.getReader();let size=0;const chunks=[];
   try{while(true){const {value,done}=await reader.read();if(done)break;size+=value.byteLength;if(size>C.maxDocumentBytes)throw Error('DOCUMENT_TOO_LARGE');chunks.push(Buffer.from(value))}}finally{await reader.cancel()}
   finalURLs.set(original,u.href);return Buffer.concat(chunks).toString('utf8');
  }
 };
 // Even accidental concurrent callers share the same serial rate limiter.
 const client=url=>{const next=tail.then(()=>request(url));tail=next.catch(()=>{});return next};
 client.finalURL=url=>finalURLs.get(url)||url;return client;
}
