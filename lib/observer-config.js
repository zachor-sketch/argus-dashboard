import {UNIVERSE} from '../datasets/universe_v10_33.js';
import {SOURCE_ROUTES} from './observer-sources.js';
// Read-only projections of authoritative research. These are sensors, never decisions.
export const MONITORS=UNIVERSE['Company Universe'].map(c=>{
 const coverage=UNIVERSE['Source Coverage 100'].find(r=>r.Ticker===c.Ticker)||{};
  return {ticker:c.Ticker,company:c.Company,exchange:c.Exchange,sector:c['Sector Family'],engine:c['Economic Engine'],sensors:coverage['Critical Sensors']||c['Fatal Unknown'],ir:c['Primary Source URL'],lastReview:c['Last Review'],reviewDue:c['Review Due'],secApplicable:/NYSE|NASDAQ/i.test(c.Exchange),sourceRoute:SOURCE_ROUTES[c.Ticker]||null,...SOURCE_ROUTES[c.Ticker]};
});
export const OBSERVER_CONFIG={version:1,schedule:'17 6 * * *',maxAgeHours:36,approachingHours:24,lookbackDays:7,requestIntervalMs:1100,maxDocumentsPerCompany:4,maxDocumentBytes:8_000_000};
export const MACRO_SOURCES=[
 {url:'https://www.federalreserve.gov/feeds/press_all.xml',label:'Federal Reserve',tier:'T2_OFFICIAL_REGULATOR',sectors:null,terms:/interest rate|federal funds|monetary policy|capital requirement|liquidity|stress test/i,variable:'Funding costs / discount-rate and credit transmission'},
 {url:'https://www.federalregister.gov/api/v1/documents.json?per_page=20&order=newest&conditions%5Bterm%5D=export%20controls',label:'Federal Register',tier:'T2_OFFICIAL_REGULATOR',sectors:['AI & Semiconductors','Quantum Computing','Industrials & Defense'],terms:/export|sanction|semiconductor|restriction/i,variable:'Export access / supply-chain and geopolitical transmission'}
];
