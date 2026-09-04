# Challenger Phase C: independent underwriting evidence

Phase C adds traceable underwriting packs and calculations for the existing eight companies. No companies were added to Core or to the candidate registry. **All eight investment conclusions remain UNKNOWN.** This run improved primary evidence and reported cash-flow calculations but did not establish sufficiently supported normalized earnings and valuation to issue a first substantive conclusion.

## Governance and architecture

`lib/challenger-underwriting.js` defines the strict `argus.underwriting-pack/1` and `argus.underwriting-packet/1` contracts, the fixed eight-company lane/SEC-identity map, calculation recipes and research-only routing. Unknown fields are rejected, including Core narratives and portfolio actions. Sources carry URL, regulatory/issuer role, publication and observation times, date precision, reporting period and locators. Facts carry numeric units, periods, share basis and source references. Journal envelope SHA-256 hashes bind the curated facts and recipes; they are not represented as hashes of original HTML documents.

`scripts/challenger-underwriting-records.mjs` verifies source-pack references, recalculates packets and enforces complete eight-company freeze batches before any debate. `scripts/challenger-c.mjs` separates capture, freeze, debate and read-only replay. The shared writer adds exactly three allowed append-only paths:

- `challenger/underwriting/packs.jsonl`: source evidence first.
- `challenger/underwriting/packets.jsonl`: independent underwriting and calculations second.
- `challenger/underwriting/runs.jsonl`: complete freeze receipt followed by separate debates and inert research routes.

The Core reader is dynamically imported only after validation of the durable batch. Historical Core state is shown for comparison only; trading labels are not inferred to be typed economic opinions. SUPPORT_CORE/CHALLENGE_CORE require both a substantive independent economic stance and a PIT-valid typed Core direction. HIGH disagreement produces REUNDERWRITE only. External candidates can emit only UNKNOWN, NEW_OPPORTUNITY or CONTRARIAN_TRAP. NEW_OPPORTUNITY routes to ZERO_BASED_ONBOARDING_RESEARCH and requires later reviewed onboarding. No automatic promotion or trade interface exists.

The fixed writer retains path allowlists, ancestor symlink/junction and hardlink rejection, hash-chain validation and trusted Git-prefix truncation checks. Committed-history truncation is detected; removal of a wholly uncommitted tail requires a separately retained trusted checkpoint. This is a repository governance boundary, not an operating-system sandbox against arbitrary code run with filesystem privileges.

## Financial and PIT gates

Reported FCF is CFO less the explicitly captured cash-capex measure, divided by **same-period diluted weighted-average shares**. A quarter or half-year is never annualized. The separate SBC-charged sensitivity subtracts recorded compensation as an illustrative owner-cost charge; it is expressly **not normalized earnings**. Tax, working capital, acquisitions, fleet renewal and growth-capex issues can make either reported number unsuitable for valuation.

Normalized earnings require explicit signed, source-linked adjustments and reviewed treatment of working capital, capex, SBC, one-offs, cycle and transactions. A substantive state also requires annual/quarterly/issuer coverage, no unresolved pack gaps, both evidence sides, supported mechanism, owner economics, survivability, valuation, falsification, catalyst, trap and evidence-quality assessments.

Valuation uses a PIT-valid quote no older than 24 hours at the frozen cutoff, outstanding shares across all classes rather than the period diluted denominator, a reviewed share/capital-action bridge, and date-aligned cash/debt. The simple EV calculation is equity value plus debt minus cash; it does not silently include other claims or establish fair value. Missing valuation blocks all substantive states. Numerical overflow, invalid share denominators, mixed periods and unlinked adjustments are rejected.

Source publication and observation must both precede cutoff. Date-only publication uses conservative UTC day-end. FIS and INTU prices are read from the unchanged, owner-verified ARGUS market snapshot; their URLs, values, times and raw-file hash are replayed. Those prices alone do not complete valuation.

## Collection limits and remaining work

This was a bounded manual review through public-source browsing, not a new scraper. Existing Observer SEC identity, rate-limit, redirect and DNS protections were unchanged. No direct SEC scraping, proxy rotation, credential workaround or access-control bypass was introduced. Public Nasdaq pages returned no usable quote for IFF, AVGO, CLS, TNK, CRDO and ARM. ARM's issuer HTML refresh returned HTTP 403: no retry was made, and the previously reviewed B.1 issuer capture retains its original observation time. Current regulatory evidence remains separately identified.

Annual and quarterly filings listed below are the latest located during this review, not a claim of exhaustive EDGAR-feed completeness. INTU FY2026 annual and AVGO Q3 regulatory detail remain follow-up items; their newer issuer releases are separately included. Non-disclosed maintenance/growth splits remain UNKNOWN. No consensus belief was invented.

## Validation and reproduction

Run `node scripts/check.cjs`, `node --test tests/*.test.js`, `node scripts/challenger-c.mjs verify` and the four existing browser suites. The separate Challenger CI workflow replays Phase C without collection, scoring or persistence.

For another reviewed run, `capture <packs.json>` appends source packs; `freeze <drafts.json> <batch-id>` accepts `{packHashes, drafts}` for all eight; only then may `debate <batch-id>` read Core. Use unique record IDs and retain previous records. Verification recalculates all results, checks journal links and replays the stored Core snapshots after freeze.

The companion integrity manifest records before/after raw SHA-256 values for all 17 protected canonical/Observer/proof artifacts and three earlier Challenger integrity proofs, plus the preserved byte prefixes of all prior Challenger journals.

## Frozen pilot comparison

The comparisons below are generated from the actual frozen packets. A stated hypothesis or trap concern is a question under investigation, not an accepted investment conclusion.

Cutoff: `2026-09-04T15:52:10.113Z`. Records: 8 source packs, 8 independent packets, 1 freeze receipt and 8 separate debates.

| Company | Lane | Independent state | Reported FCF/share | SBC sensitivity/share | Normalized FCF/share |
|---|---|---|---:|---:|---|
| FIS | CORE_CHALLENGE | UNKNOWN | $1.3346 | $1.1393 | UNKNOWN |
| IFF | CORE_CHALLENGE | UNKNOWN | $1.4630 | $1.2646 | UNKNOWN |
| AVGO | CORE_CHALLENGE | UNKNOWN | $2.7962 | $2.3831 | UNKNOWN |
| INTU | CORE_CHALLENGE | UNKNOWN | $31.1083 | $23.6859 | UNKNOWN |
| CLS | EXTERNAL_DISCOVERY | UNKNOWN | $1.2659 | $1.0998 | UNKNOWN |
| TNK | EXTERNAL_DISCOVERY | UNKNOWN | $8.2186 | UNKNOWN | UNKNOWN |
| CRDO | EXTERNAL_DISCOVERY | UNKNOWN | $0.4267 | $-0.0259 | UNKNOWN |
| ARM | EXTERNAL_DISCOVERY | UNKNOWN | $0.6438 | $0.3256 | UNKNOWN |

All amounts above are USD per share for the specified reporting period, not comparable annual yields.

### FIS — CORE_CHALLENGE

| Field | Result |
|---|---|
| Independent state | UNKNOWN |
| Core state | PROVE IT |
| Normalized owner earnings / FCF per share | UNKNOWN; normalization gate remains open. |
| Reported arithmetic | 2026-01-01 to 2026-06-30: CFO 1207m minus captured cash capex 517m = FCF 690.000m; divided by 517m diluted shares = $1.3346. |
| Balance-sheet assessment | Debt USD21.174bn versus cash USD0.744bn requires a maturity, covenant and interest-cost review. |
| Valuation implication | UNKNOWN; Current outstanding-share/capital-action bridge is incomplete; valuation is not authorized merely by a valid price. |
| Strongest FOR evidence | H1 cash capex includes USD76m property/equipment and USD441m software; issuer headline H1 FCF of USD999m excludes USD309m Worldpay transaction taxes, compared with USD690m unadjusted FCF. ([source](https://www.investor.fisglobal.com/news-releases/news-release-details/fis-reports-second-quarter-2026-results)) |
| Strongest AGAINST evidence | Q2 revenue increased 29% to USD3.4bn and pro-forma growth was 5.3%; adjusted EPS increased 8.8%. ([source](https://www.investor.fisglobal.com/news-releases/news-release-details/fis-reports-second-quarter-2026-results)) |
| Falsification condition | Reject the concern if four comparable quarters show rising cash/share after recurring software capex and debt service, without transaction-tax addbacks. |
| Contrarian-trap assessment | Acquisition accounting and tax addbacks may create apparent cheapness; unresolved. |
| Confidence / evidence quality | Primary-source evidence supports reported arithmetic; confidence in normalized earnings and investment conclusion remains insufficient. |
| Next research action | Normalize transaction taxes, recurring software investment, debt service and acquisition integration across a full comparable year. Current outstanding-share/capital-action bridge is incomplete; valuation is not authorized merely by a valid price. Maintenance/growth capex split and normalized owner earnings require explicit reviewed assumptions; reported FCF is not normalized. |

Source inventory:

- [ANNUAL: period 2025-12-31](https://www.sec.gov/Archives/edgar/data/1136893/000113689326000013/fis-20251231.htm); publication 2026-02-24T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [QUARTERLY: period 2026-06-30](https://www.sec.gov/Archives/edgar/data/1136893/000113689326000050/fis-20260630.htm); publication 2026-08-04T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [ISSUER: period 2026-06-30](https://www.investor.fisglobal.com/news-releases/news-release-details/fis-reports-second-quarter-2026-results); publication 2026-08-04T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [VERIFIED_PRICE: period 2026-09-03](https://stockanalysis.com/stocks/fis/); publication 2026-09-03T20:00:00Z; observed 2026-09-04T04:53:27Z.

### IFF — CORE_CHALLENGE

| Field | Result |
|---|---|
| Independent state | UNKNOWN |
| Core state | HOLD / BUY LOWER |
| Normalized owner earnings / FCF per share | UNKNOWN; normalization gate remains open. |
| Reported arithmetic | 2026-01-01 to 2026-06-30: CFO 679m minus captured cash capex 303m = FCF 376.000m; divided by 257m diluted shares = $1.4630. |
| Balance-sheet assessment | USD5.735bn debt versus USD0.569bn cash; planned disposal proceeds and buybacks must be reconciled before concluding on survivability. |
| Valuation implication | UNKNOWN; Separate continuing-business cash flows, stranded costs and post-divestiture debt/share count before normalization. No usable timestamped quote returned from https://www.nasdaq.com/market-activity/stocks/iff during public review at 2026-09-04T15:52:10.113Z; no access bypass or synthetic quote. |
| Strongest FOR evidence | Cash flow includes discontinued operations. H1 property/equipment spending was USD301m and intangible additions USD2m; reported USD378m FCF excludes the latter. ([source](https://ir.iff.com/news-releases/news-release-details/iff-reports-second-quarter-2026-results-announces-use-proceeds)) |
| Strongest AGAINST evidence | H1 continuing Taste sales grew 5%, Health & Biosciences 9% and Scent 8% on a reported basis. ([source](https://www.sec.gov/Archives/edgar/data/51253/000005125326000030/iff-20260630.htm)) |
| Falsification condition | Reject the concern if post-disposal continuing-business cash/share rises after stranded costs, investment and debt service across a full year. |
| Contrarian-trap assessment | Pre-disposal FCF capitalized against post-disposal economics could be a trap; unresolved. |
| Confidence / evidence quality | Primary-source evidence supports reported arithmetic; confidence in normalized earnings and investment conclusion remains insufficient. |
| Next research action | Separate continuing-business cash flows, stranded costs and post-divestiture debt/share count before normalization. No usable timestamped quote returned from https://www.nasdaq.com/market-activity/stocks/iff during public review at 2026-09-04T15:52:10.113Z; no access bypass or synthetic quote. Maintenance/growth capex split and normalized owner earnings require explicit reviewed assumptions; reported FCF is not normalized. |

Source inventory:

- [ANNUAL: period 2025-12-31](https://www.sec.gov/Archives/edgar/data/51253/000005125326000006/iff-20251231.htm); publication 2026-02-27T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [QUARTERLY: period 2026-06-30](https://www.sec.gov/Archives/edgar/data/51253/000005125326000030/iff-20260630.htm); publication 2026-08-04T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [ISSUER: period 2026-06-30](https://ir.iff.com/news-releases/news-release-details/iff-reports-second-quarter-2026-results-announces-use-proceeds); publication 2026-08-04T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.

### AVGO — CORE_CHALLENGE

| Field | Result |
|---|---|
| Independent state | UNKNOWN |
| Core state | WATCH |
| Normalized owner earnings / FCF per share | UNKNOWN; normalization gate remains open. |
| Reported arithmetic | 2026-05-04 to 2026-08-02: CFO 14197m minus captured cash capex 532m = FCF 13665.000m; divided by 4887m diluted shares = $2.7962. |
| Balance-sheet assessment | USD23.975bn cash and USD59.419bn stated debt; substantial liquidity coexists with leverage and commitments requiring stress review. |
| Valuation implication | UNKNOWN; Obtain Q3 filing when available and normalize hyperscaler demand, working capital, SBC and capital commitments; no verified current quote was returned. No usable timestamped quote returned from https://www.nasdaq.com/market-activity/stocks/avgo during public review at 2026-09-04T15:52:10.113Z; no access bypass or synthetic quote. |
| Strongest FOR evidence | Q3 stock compensation totals USD2019m across cost of revenue, R&D and SG&A; GAAP diluted shares are 4887m, distinct from the 4937m non-GAAP denominator. ([source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial)) |
| Strongest AGAINST evidence | Q3 revenue grew 86% to USD29.6bn and AI semiconductor revenue grew 221% to USD16.7bn. ([source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial)) |
| Falsification condition | Reject the concern if four quarters of cash/share after recurring SBC and investment remain resilient through slower AI demand and normal working capital. |
| Contrarian-trap assessment | Growth extrapolation and compensation exclusions are potential traps; current valuation is UNKNOWN. |
| Confidence / evidence quality | Primary-source evidence supports reported arithmetic; confidence in normalized earnings and investment conclusion remains insufficient. |
| Next research action | Obtain Q3 filing when available and normalize hyperscaler demand, working capital, SBC and capital commitments; no verified current quote was returned. No usable timestamped quote returned from https://www.nasdaq.com/market-activity/stocks/avgo during public review at 2026-09-04T15:52:10.113Z; no access bypass or synthetic quote. Maintenance/growth capex split and normalized owner earnings require explicit reviewed assumptions; reported FCF is not normalized. |

Source inventory:

- [ANNUAL: period 2025-11-02](https://www.sec.gov/Archives/edgar/data/1730168/000173016825000121/avgo-20251102.htm); publication 2025-12-18T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [QUARTERLY: period 2026-05-03](https://www.sec.gov/Archives/edgar/data/1730168/000173016826000054/avgo-20260503.htm); publication 2026-06-09T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [ISSUER: period 2026-08-02](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial); publication 2026-09-02T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.

### INTU — CORE_CHALLENGE

| Field | Result |
|---|---|
| Independent state | UNKNOWN |
| Core state | BUY |
| Normalized owner earnings / FCF per share | UNKNOWN; normalization gate remains open. |
| Reported arithmetic | 2025-08-01 to 2026-07-31: CFO 8838m minus captured cash capex 221m = FCF 8617.000m; divided by 277m diluted shares = $31.1083. |
| Balance-sheet assessment | USD4.705bn corporate cash plus USD2.495bn investments versus USD7.669bn debt; customer funds are not corporate liquidity. |
| Valuation implication | UNKNOWN; Reconcile deferred taxes, lending reinvestment and sustainable growth to normalized cash earnings; confirm FY2026 annual filing and current outstanding share bridge. Current outstanding-share/capital-action bridge is incomplete; valuation is not authorized merely by a valid price. |
| Strongest FOR evidence | FY2026 CFO includes USD1279m deferred-tax and USD2056m SBC adjustments. Net lending investment was USD292m; ordinary CFO less capex omits that reinvestment. ([source](https://investors.intuit.com/sec-filings/all-sec-filings/content/0000896878-26-000029/fy26q4earningspressrelease.htm)) |
| Strongest AGAINST evidence | FY2026 revenue grew 14% to USD21.4bn, while repurchases reduced weighted-average diluted shares from 283m to 277m. ([source](https://investors.intuit.com/sec-filings/all-sec-filings/content/0000896878-26-000029/fy26q4earningspressrelease.htm)) |
| Falsification condition | Reject the concern if the annual filing and subsequent year confirm rising cash/share after normalized taxes, lending reinvestment and SBC, despite slower revenue growth. |
| Contrarian-trap assessment | Low multiples of unadjusted cash flow may be misleading if tax timing reverses; unresolved. |
| Confidence / evidence quality | Primary-source evidence supports reported arithmetic; confidence in normalized earnings and investment conclusion remains insufficient. |
| Next research action | Reconcile deferred taxes, lending reinvestment and sustainable growth to normalized cash earnings; confirm FY2026 annual filing and current outstanding share bridge. Current outstanding-share/capital-action bridge is incomplete; valuation is not authorized merely by a valid price. Maintenance/growth capex split and normalized owner earnings require explicit reviewed assumptions; reported FCF is not normalized. |

Source inventory:

- [ANNUAL: period 2025-07-31](https://www.sec.gov/Archives/edgar/data/896878/000089687825000035/intu-20250731.htm); publication 2025-09-03T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [QUARTERLY: period 2026-04-30](https://www.sec.gov/Archives/edgar/data/896878/000089687826000025/intu-20260430.htm); publication 2026-05-20T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [ISSUER: period 2026-07-31](https://investors.intuit.com/sec-filings/all-sec-filings/content/0000896878-26-000029/fy26q4earningspressrelease.htm); publication 2026-08-25T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [VERIFIED_PRICE: period 2026-09-03](https://stockanalysis.com/stocks/intu/history/); publication 2026-09-03T20:00:00Z; observed 2026-09-04T04:53:27Z.

### CLS — EXTERNAL_DISCOVERY

| Field | Result |
|---|---|
| Independent state | UNKNOWN |
| Core state | Not applicable — EXTERNAL_CANDIDATE |
| Normalized owner earnings / FCF per share | UNKNOWN; normalization gate remains open. |
| Reported arithmetic | 2026-04-01 to 2026-06-30: CFO 410.9m minus captured cash capex 263.8m = FCF 147.100m; divided by 116.2m diluted shares = $1.2659. |
| Balance-sheet assessment | June cash USD535.7m versus USD810.4m credit/finance-lease obligations precede the August offering; do not combine stale shares with post-offering proceeds. |
| Valuation implication | UNKNOWN; Reconcile post-offering cash and shares, maintenance versus growth capex, and sustainable supplier funding; current valuation remains unavailable. No usable timestamped quote returned from https://www.nasdaq.com/market-activity/stocks/cls during public review at 2026-09-04T15:52:10.113Z; no access bypass or synthetic quote. |
| Strongest FOR evidence | Q2 inventory absorbed USD728.8m and receivables USD170.8m; payables/accruals supplied USD1025.3m. Cash conversion depends on supplier funding and capacity investment. ([source](https://www.sec.gov/Archives/edgar/data/1030894/000103089426000044/cls-20260630.htm)) |
| Strongest AGAINST evidence | Q2 revenue rose 62% to USD4.70bn and GAAP operating margin was 9.8%. ([source](https://www.sec.gov/Archives/edgar/data/1030894/000103089426000044/cls-20260630.htm)) |
| Falsification condition | Reject the concern if four post-offering quarters grow cash/share after recurring capacity investment and normalized supplier funding. |
| Contrarian-trap assessment | Rapid growth plus a stale share denominator can obscure financing costs; unresolved. |
| Confidence / evidence quality | Primary-source evidence supports reported arithmetic; confidence in normalized earnings and investment conclusion remains insufficient. |
| Next research action | Reconcile post-offering cash and shares, maintenance versus growth capex, and sustainable supplier funding; current valuation remains unavailable. No usable timestamped quote returned from https://www.nasdaq.com/market-activity/stocks/cls during public review at 2026-09-04T15:52:10.113Z; no access bypass or synthetic quote. Maintenance/growth capex split and normalized owner earnings require explicit reviewed assumptions; reported FCF is not normalized. |

Source inventory:

- [ANNUAL: period 2025-12-31](https://www.sec.gov/Archives/edgar/data/1030894/000103089426000011/cls-20251231.htm); publication 2026-02-27T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [QUARTERLY: period 2026-06-30](https://www.sec.gov/Archives/edgar/data/1030894/000103089426000044/cls-20260630.htm); publication 2026-07-27T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [ISSUER: period 2026-06-30](https://corporate.celestica.com/news-releases/news-release-details/celestica-announces-second-quarter-2026-financial-results); publication 2026-07-27T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [ISSUER: period 2026-08-07](https://corporate.celestica.com/news-releases/news-release-details/celestica-completes-equity-offering); publication 2026-08-07T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.

### TNK — EXTERNAL_DISCOVERY

| Field | Result |
|---|---|
| Independent state | UNKNOWN |
| Core state | Not applicable — EXTERNAL_CANDIDATE |
| Normalized owner earnings / FCF per share | UNKNOWN; normalization gate remains open. |
| Reported arithmetic | 2026-01-01 to 2026-06-30: CFO 364.303m minus captured cash capex 77.376m = FCF 286.927m; divided by 34.911886m diluted shares = $8.2186. |
| Balance-sheet assessment | Large reported liquidity provides a buffer, but fleet renewal, drydock and remaining newbuild commitments need a normalized-cycle funding assessment. |
| Valuation implication | UNKNOWN; Build cycle-normalized fleet renewal and drydock economics, isolate SBC and confirm obligations plus a timestamped price/NAV; do not treat peak earnings as recurring. No usable timestamped quote returned from https://www.nasdaq.com/market-activity/stocks/tnk during public review at 2026-09-04T15:52:10.113Z; no access bypass or synthetic quote. |
| Strongest FOR evidence | Q2 tanker rates were exceptional following Hormuz disruption; net income included USD32.3m vessel-sale gains. H1 cash vessel spending includes USD1.515m equipment, USD42.449m acquisitions and USD33.412m newbuild advances. ([source](https://www.sec.gov/Archives/edgar/data/1419945/000141994526000054/tnkq2-26erdocument.htm)) |
| Strongest AGAINST evidence | Reported liquidity was approximately USD1.3bn, including cash, short-term investments and undrawn facilities; Q2 revenue was USD379.508m. ([source](https://www.sec.gov/Archives/edgar/data/1419945/000141994526000054/tnkq2-26erdocument.htm)) |
| Falsification condition | Reject the concern if mid-cycle charter assumptions fund fleet renewal, drydock and shareholder cash returns without drawing down liquidity. |
| Contrarian-trap assessment | Peak earnings and prior-year escrow distort simple cash multiples; requires fleet NAV and cycle underwriting. |
| Confidence / evidence quality | Primary-source evidence supports reported arithmetic; confidence in normalized earnings and investment conclusion remains insufficient. |
| Next research action | Build cycle-normalized fleet renewal and drydock economics, isolate SBC and confirm obligations plus a timestamped price/NAV; do not treat peak earnings as recurring. No usable timestamped quote returned from https://www.nasdaq.com/market-activity/stocks/tnk during public review at 2026-09-04T15:52:10.113Z; no access bypass or synthetic quote. Maintenance/growth capex split and normalized owner earnings require explicit reviewed assumptions; reported FCF is not normalized. |

Source inventory:

- [ANNUAL: period 2025-12-31](https://www.sec.gov/Archives/edgar/data/1419945/000141994526000007/tnk-20251231.htm); publication 2026-03-13T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [QUARTERLY: period 2026-06-30](https://www.sec.gov/Archives/edgar/data/1419945/000141994526000054/tnkq2-26erdocument.htm); publication 2026-07-29T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [ISSUER: period 2026-06-30](https://www.teekay.com/blog/2026/07/29/teekay-tankers-ltd-reports-second-quarter-2026-results-and-declares-dividend/); publication 2026-07-29T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.

### CRDO — EXTERNAL_DISCOVERY

| Field | Result |
|---|---|
| Independent state | UNKNOWN |
| Core state | Not applicable — EXTERNAL_CANDIDATE |
| Normalized owner earnings / FCF per share | UNKNOWN; normalization gate remains open. |
| Reported arithmetic | 2026-05-03 to 2026-08-01: CFO 90.231m minus captured cash capex 7.282m = FCF 82.949m; divided by 194.378m diluted shares = $0.4267. |
| Balance-sheet assessment | Cash USD466.869m plus short investments USD297.389m exceed reported current liabilities USD198.165m; full commitments and acquisition obligations remain to be reconciled. |
| Valuation implication | UNKNOWN; Normalize customer ramp working capital, SBC and acquisition obligations, and obtain current price plus fully reconciled outstanding shares. No usable timestamped quote returned from https://www.nasdaq.com/market-activity/stocks/crdo during public review at 2026-09-04T15:52:10.113Z; no access bypass or synthetic quote. |
| Strongest FOR evidence | Q1 working capital absorbed USD151.3m and acquisition cash outflow was USD735.619m. Diluted shares increased from 184.577m to 194.378m; SBC was USD87.979m. ([source](https://www.sec.gov/Archives/edgar/data/1807794/000162828026060111/crdo-20260801.htm)) |
| Strongest AGAINST evidence | Q1 revenue increased 114.7% to USD479m; cash plus short-term investments totaled USD764.258m. ([source](https://www.sec.gov/Archives/edgar/data/1807794/000162828026060111/crdo-20260801.htm)) |
| Falsification condition | Reject the concern if four quarters show positive improving SBC-charged cash/share after normalized working capital and acquisition obligations. |
| Contrarian-trap assessment | SBC-charged current-period cash is weak despite revenue growth; valuation and durability remain UNKNOWN. |
| Confidence / evidence quality | Primary-source evidence supports reported arithmetic; confidence in normalized earnings and investment conclusion remains insufficient. |
| Next research action | Normalize customer ramp working capital, SBC and acquisition obligations, and obtain current price plus fully reconciled outstanding shares. No usable timestamped quote returned from https://www.nasdaq.com/market-activity/stocks/crdo during public review at 2026-09-04T15:52:10.113Z; no access bypass or synthetic quote. Maintenance/growth capex split and normalized owner earnings require explicit reviewed assumptions; reported FCF is not normalized. |

Source inventory:

- [ANNUAL: period 2026-05-02](https://www.sec.gov/Archives/edgar/data/1807794/000162828026043303/crdo-20260502.htm); publication 2026-06-15T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [QUARTERLY: period 2026-08-01](https://www.sec.gov/Archives/edgar/data/1807794/000162828026060111/crdo-20260801.htm); publication 2026-09-02T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [ISSUER: period 2026-08-01](https://investors.credosemi.com/news-events/news/news-details/2026/Credo-Technology-Group-Holding-Ltd-Reports-First-Quarter-of-Fiscal-Year-2027-Financial-Results/default.aspx); publication 2026-09-01T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.

### ARM — EXTERNAL_DISCOVERY

| Field | Result |
|---|---|
| Independent state | UNKNOWN |
| Core state | Not applicable — EXTERNAL_CANDIDATE |
| Normalized owner earnings / FCF per share | UNKNOWN; normalization gate remains open. |
| Reported arithmetic | 2026-04-01 to 2026-06-30: CFO 902m minus captured cash capex 208m = FCF 694.000m; divided by 1078m diluted shares = $0.6438. |
| Balance-sheet assessment | Cash USD3058m plus short investments USD830m exceed current liabilities USD1207m; review lease, design-software and silicon commitments separately. |
| Valuation implication | UNKNOWN; Normalize cash timing, silicon-investment needs, dilution and obligations; obtain an ADS/ordinary-share valuation bridge and current quote. Issuer refresh returned HTTP403; retained prior PIT-valid B.1 capture without retry. No usable timestamped quote returned from https://www.nasdaq.com/market-activity/stocks/arm during public review at 2026-09-04T15:52:10.113Z; no access bypass or synthetic quote. |
| Strongest FOR evidence | Q1 operating cash flow benefited from collections and tax timing. SBC was USD343m; diluted shares rose from 1065m to 1078m. ([source](https://www.sec.gov/Archives/edgar/data/1973239/000197323926000114/arm-20260630.htm)) |
| Strongest AGAINST evidence | Revenue rose from USD1053m to USD1289m; cash and short-term investments totaled USD3888m. ([source](https://www.sec.gov/Archives/edgar/data/1973239/000197323926000114/arm-20260630.htm)) |
| Falsification condition | Reject the concern if subsequent full-year cash/share remains strong after normal collections, tax payments, recurring SBC and silicon investment. |
| Contrarian-trap assessment | Timing-driven cash, minority governance and new investment needs can mislead valuation; unresolved. |
| Confidence / evidence quality | Primary-source evidence supports reported arithmetic; confidence in normalized earnings and investment conclusion remains insufficient. |
| Next research action | Normalize cash timing, silicon-investment needs, dilution and obligations; obtain an ADS/ordinary-share valuation bridge and current quote. Issuer refresh returned HTTP403; retained prior PIT-valid B.1 capture without retry. No usable timestamped quote returned from https://www.nasdaq.com/market-activity/stocks/arm during public review at 2026-09-04T15:52:10.113Z; no access bypass or synthetic quote. Maintenance/growth capex split and normalized owner earnings require explicit reviewed assumptions; reported FCF is not normalized. |

Source inventory:

- [ANNUAL: period 2026-03-31](https://www.sec.gov/Archives/edgar/data/1973239/000197323926000097/arm-20260331.htm); publication 2026-05-26T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [QUARTERLY: period 2026-06-30](https://www.sec.gov/Archives/edgar/data/1973239/000197323926000114/arm-20260630.htm); publication 2026-07-29T23:59:59.999Z; observed 2026-09-04T15:52:10.113Z.
- [ISSUER: period 2026-06-30](https://investors.arm.com/node/8356/html); publication 2026-07-29T23:59:59.999Z; observed 2026-09-04T15:30:15.444Z.
