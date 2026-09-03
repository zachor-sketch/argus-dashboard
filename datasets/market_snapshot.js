import {deepFreeze} from '../lib/integrity.js';
// Attachment PIT quotes are historical observations in research_shadow.js, not live quotes.
// Populate only after independent quote/source/timestamp verification.
export const MARKET_SNAPSHOT=deepFreeze({verifiedAt:null,quotes:{},maxAgeHours:24,status:'REFRESH_REQUIRED'});
