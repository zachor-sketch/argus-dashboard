import {deepFreeze} from '../lib/integrity.js';
// Attachment PIT quotes are historical observations in research_shadow.js, not live quotes.
// Manual verification provenance and timestamps are retained; freshness is checked by verifiedQuote().
const timestamp='2026-09-03T20:00:00Z';
const quote=(price,source,sourceLabel='StockAnalysis')=>({price,currency:'USD',timestamp,source,sourceLabel,verified:true,session:'REGULAR_CLOSE'});
// Manually verified prices and provenance supplied by the portfolio owner; no automatic feed.
export const MARKET_SNAPSHOT=deepFreeze({verifiedAt:'2026-09-04T04:53:27Z',session:'REGULAR_CLOSE',maxAgeHours:24,status:'MANUALLY_VERIFIED',quotes:{
 INTU:quote(349.04,'https://stockanalysis.com/stocks/intu/history/','StockAnalysis / S&P Global Market Intelligence'),
 NVDA:{...quote(228.45,'https://stockanalysis.com/stocks/nvda/'),secondarySource:'https://www.reuters.com/business/wall-st-futures-subdued-investors-weigh-earnings-oil-prices-2026-09-03/'},
 FIS:quote(42.28,'https://stockanalysis.com/stocks/fis/'),
 CRM:quote(264.43,'https://stockanalysis.com/stocks/crm/history/')
}});
