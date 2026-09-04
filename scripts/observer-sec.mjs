import {SEC_CIK_SEED} from '../lib/sec-cik-seed.js';
export function resolveSEC(ticker,liveMap,documents,seed=SEC_CIK_SEED){
 ticker=ticker.replace('.','-');
 const live=Object.values(liveMap||{}).find(r=>r?.ticker===ticker&&/^\d{1,10}$/.test(String(r.cik_str)));
 const cache=documents.filter(d=>d.kind==='SEC_IDENTITY'&&d.ticker===ticker&&d.validated===true).at(-1);
 const entry=live?{cik:String(live.cik_str),mappingSource:'SEC_DIRECTORY'}:cache?{cik:cache.cik,mappingSource:'VALIDATED_JOURNAL'}:seed.entries[ticker]?{...seed.entries[ticker],mappingSource:seed.source}:null;
 if(!entry||!/^\d{1,10}$/.test(entry.cik))throw Error('SEC_TICKER_MAPPING_UNAVAILABLE');
 if(live&&cache&&Number(live.cik_str)!==Number(cache.cik))throw Error('SEC_MAPPING_CONFLICT_REQUIRES_REVIEW');
 return {...entry,ticker,cik:String(entry.cik).padStart(10,'0')};
}
export function assertSECIdentity(data,entry){
 if(Number(data.cik)!==Number(entry.cik)||!Array.isArray(data.tickers)||!data.tickers.map(t=>t.replace('.','-')).includes(entry.ticker))throw Error('SEC_TICKER_IDENTITY_MISMATCH');
}
export function resolveCompanySEC(company,liveMap,documents){
 const entry=resolveSEC(company.secTicker||company.ticker,liveMap,documents);
 if(company.secTicker&&(!company.secCIK||Number(entry.cik)!==Number(company.secCIK)||!company.sourceRoute?.source))throw Error('SEC_ALIAS_IDENTITY_UNVERIFIED');
 return entry;
}
