# ARGUS Challenger Phase C.1 — company-specific normalization and PIT prices

Eight companies only. No new modules, journal namespaces, network collector, universe entries, or Core decisions. The existing Phase C recipe now records specialist adjustment bridges and selects admissible reviewed quotes.

**Outcome: all eight remain UNKNOWN.** Price evidence is now available for eight of eight. Normalized economics and complete PIT valuation are not established. Bear/Base/Bull intrinsic values and reverse valuation remain UNKNOWN for every company. Partial subtotals below are review arithmetic, not normalized owner cash, annual forecasts or fair value.

Evidence cutoff: `2026-09-04T16:17:59.899Z`. Reviewed independent freeze: `6099c4bb6fdd220a25db6792c5159c3c007209d420d0f641964cb92980a46363`, at `2026-09-04T16:19:19.896Z`. All four Core reads occur after this durable freeze; external candidates never receive Core state.

C.1 appended 11 source packs (eight initial plus three source-attribution corrections), 16 independent packets (initial and reviewed batches), two freeze receipts and eight final debates. The initial freeze has no Debate. Corrections narrow FIS/CLS/INTU references to the correct transaction, offering or annual-index evidence; earlier records remain immutable. Final results use only the reviewed batch above.

## Governance and arithmetic

- Existing Phase A/B/B.1/C boundaries, hash chains and trusted committed prefixes remain enforced. All evidence writes stay under the existing three underwriting journals.
- Each company has its own required review topics. Every bridge adjustment has an explicit sign, source fact, period and rationale; unsupported amounts stay UNKNOWN. Known-row subtotals do not satisfy the normalization gate.
- TNK uses fleet NAV/TCE review; the specialist calculator suppresses a generic FCF subtotal and rejects labeling generic FCF as normalized shipping earnings. Its normalized sector estimates remain UNKNOWN.
- No quarter is annualized. Diluted weighted-average shares divide period cash; valuation requires point-in-time outstanding shares and a reviewed capital-action bridge.
- A quote does not complete valuation. C.1 requires separate share, cash/debt and other-claims reviews; future balance dates are rejected. No discount rate, terminal growth, margin, TCE or fleet value is silently supplied.
- HIGH disagreement can only request research/re-underwriting. NEW_OPPORTUNITY for external candidates can only route to ZERO_BASED_ONBOARDING_RESEARCH with reviewed onboarding; no BUY/SELL/TRIM/ADD or canonical insertion.

## Quote fallback and access review

The immutable ARGUS snapshot contains pilot quotes only for FIS and INTU; those are selected first while fresh. Public fallback accepts exact ticker paths at Nasdaq, StockAnalysis and Yahoo Finance, requires an explicit quote instant and USD basis, preserves URL/publication/observation provenance, rejects future/stale quotes and fails closed on conflicting prices at the same selected timestamp. It does not fetch, synthesize or interpolate prices.

StockAnalysis supplied explicitly timestamped public quotes for the other six names. A separately reviewed [Yahoo Japan AVGO quote](https://finance.yahoo.co.jp/quote/AVGO) supplies a second provider, with US local time converted to UTC. AVGO's later provider observation agrees in value with the earlier StockAnalysis close. Public Yahoo history requests for IFF/TNK/CRDO/ARM/CLS returned tool access errors and were not retried. Phase C Nasdaq unavailable responses and ARM issuer HTTP403 were not bypassed or retried. Existing PIT-valid ARM capture and accessible SEC filing remain the evidence.

CLS historical data conflicted: StockAnalysis displayed September 3 USD309.84 while a Yahoo localized search result displayed USD311.40. Neither conflicting historical value is selected. The recorded CLS value is the separately explicit September 4 12:04 EDT live quote USD315.00, not an inferred correction to the historical close. Quotes in this run are asynchronous observations, not a synchronized market snapshot.

The [Intuit issuer annual index](https://investors.intuit.com/sec-filings/annual-reports) still listed FY2025 as the latest 10-K at review; FY2026 annual evidence remains not located. The FY2026 issuer earnings release is retained. No claim is made that a filing can never exist.

## Pilot comparison

| Company | Lane | Selected USD price / UTC instant | Partial period cash/share | Normalized metric | Independent state | Core state |
|---|---|---|---:|---|---|---|
| FIS | CORE_MEMBER | $42.28 / 2026-09-03T20:00:00Z | $1.7369 | UNKNOWN | UNKNOWN | PROVE IT |
| IFF | CORE_MEMBER | $86.35 / 2026-09-04T15:42:00Z | $1.5292 | UNKNOWN | UNKNOWN | HOLD / BUY LOWER |
| AVGO | CORE_MEMBER | $357.16 / 2026-09-03T21:20:00Z | $2.3831 | UNKNOWN | UNKNOWN | WATCH |
| INTU | CORE_MEMBER | $349.04 / 2026-09-03T20:00:00Z | $22.6318 | UNKNOWN | UNKNOWN | BUY |
| CLS | EXTERNAL_CANDIDATE | $315 / 2026-09-04T16:04:00Z | $1.0826 | UNKNOWN | UNKNOWN | Not applicable |
| TNK | EXTERNAL_CANDIDATE | $93.2 / 2026-09-04T13:58:00Z | Not used: fleet NAV/TCE | UNKNOWN | UNKNOWN | Not applicable |
| CRDO | EXTERNAL_CANDIDATE | $169.25 / 2026-09-04T15:40:00Z | $-0.0259 | UNKNOWN | UNKNOWN | Not applicable |
| ARM | EXTERNAL_CANDIDATE | $251.69 / 2026-09-04T15:48:00Z | $0.2987 | UNKNOWN | UNKNOWN | Not applicable |

Partial values have different reporting periods and incomplete adjustments; they must not be compared as annual earning power or used as valuation denominators.

## FIS — CORE_CHALLENGE

| Requested field | Result |
|---|---|
| Normalized owner FCF/share or sector metric | UNKNOWN. Known-row partial subtotal: $1.7369 for 2026-01-01 through 2026-06-30. |
| Bear / Base / Bull intrinsic value | UNKNOWN / UNKNOWN / UNKNOWN |
| Market price and PIT timestamp | $42.28 USD at 2026-09-03T20:00:00Z; [source](https://stockanalysis.com/stocks/fis/); ARGUS_VERIFIED_FIRST |
| Implied expectations / reverse valuation | UNKNOWN; no normalized annual denominator or supported scenario/discount assumptions. |
| Challenger state | UNKNOWN |
| Core state | PROVE IT |
| Strongest FOR the research concern | H1 cash capex includes USD76m property/equipment and USD441m software; issuer headline H1 FCF of USD999m excludes USD309m Worldpay transaction taxes, compared with USD690m unadjusted FCF. ([source](https://www.investor.fisglobal.com/news-releases/news-release-details/fis-reports-second-quarter-2026-results)) |
| Strongest AGAINST the research concern | Q2 revenue increased 29% to USD3.4bn and pro-forma growth was 5.3%; adjusted EPS increased 8.8%. ([source](https://www.investor.fisglobal.com/news-releases/news-release-details/fis-reports-second-quarter-2026-results)) |
| Key falsification condition | Reject the concern if four comparable quarters show rising cash/share after recurring software capex and debt service, without transaction-tax addbacks. |
| Confidence | Reported source arithmetic traceable; insufficient confidence in normalized owner economics and intrinsic valuation. No substantive conclusion. |
| Exact remaining UNKNOWN fields | `integration`, `debtService`, `recurringAcquisitionCosts`, `workingCapital`, `valuation.shares`, `valuation.cashDebt`, `valuation.otherClaims`, `adjustment.integration_cash_nonrecurring`, `adjustment.working_capital_reversal`, `normalizedOwnerMetric`, `intrinsicValue.Bear`, `intrinsicValue.Base`, `intrinsicValue.Bull`, `reverseValuation`, `normalizedAnnualCashForecast`, `discountRate`, `terminalGrowthOrExitAssumption` |
| Balance-sheet assessment | Debt USD21.174bn versus cash USD0.744bn requires a maturity, covenant and interest-cost review. |
| Contrarian-trap assessment | Acquisition accounting and tax addbacks may create apparent cheapness; unresolved. |
| Required next research | Full-year recurring integration cash, normalized tax/WC cycle, future interest/maturities and acquisition cost recurrence remain UNKNOWN. |

Specialist review: H1 M&A/integration expense 118; transformation 265; other 3. Severance expense 135 versus cash paid 67. These expense totals are not cash addbacks. Net interest expense 397 is retained, not deducted twice. Software cash investment 441 remains fully deducted. ([source](https://www.sec.gov/Archives/edgar/data/1136893/000113689326000050/fis-20260630.htm))

Transaction-tax evidence: Issuer H1 free-cash-flow reconciliation: Worldpay taxes ([source](https://www.investor.fisglobal.com/news-releases/news-release-details/fis-reports-second-quarter-2026-results))

Bridge begins with reported CFO 1207m minus cash capex 517m = 690.0000m. The period diluted denominator is 517m shares.

| Adjustment | Sign | USD million | Rationale / source |
|---|---:|---:|---|
| worldpay_cash_tax | + | 309 | Remove disclosed transaction cash tax, not recurring tax. [Source](https://www.investor.fisglobal.com/news-releases/news-release-details/fis-reports-second-quarter-2026-results) — Issuer H1 free-cash-flow reconciliation: Worldpay taxes |
| owner_compensation | − | 101 | Charge SBC as an explicit compensation-cost sensitivity. [Source](https://www.investor.fisglobal.com/news-releases/news-release-details/fis-reports-second-quarter-2026-results) — Cash-flow statement / cash-flow reconciliation |
| integration_cash_nonrecurring | + | UNKNOWN | Expense 118/265 cannot establish genuinely nonrecurring cash. |
| working_capital_reversal | + | UNKNOWN | Do not add back recurring contract investment or assume all working-capital use reverses. |

Known-row subtotal: 898.0000m / 517m = $1.7369. **Incomplete; UNKNOWN adjustments are not assumed zero.**

Audit: source pack `d8ef3fbe50e3fe6b81c4ea5c3c2978e2fca81dec91b50c4a7b8013c1ffc8c108`; frozen packet `b1fe3c7a43ba4cb6440a7a29f61a501ce1834058e3375549b5c48867a4508972`; Debate `0c59c9beeb8b2584d7e3cf648426e7fcbbbdaa3bda65785a8a68ec2b281a9536`.

## IFF — CORE_CHALLENGE

| Requested field | Result |
|---|---|
| Normalized owner FCF/share or sector metric | UNKNOWN. Known-row partial subtotal: $1.5292 for 2026-01-01 through 2026-06-30. |
| Bear / Base / Bull intrinsic value | UNKNOWN / UNKNOWN / UNKNOWN |
| Market price and PIT timestamp | $86.35 USD at 2026-09-04T15:42:00Z; [source](https://stockanalysis.com/stocks/iff/history/); PUBLIC_TIMESTAMPED_FALLBACK |
| Implied expectations / reverse valuation | UNKNOWN; no normalized annual denominator or supported scenario/discount assumptions. |
| Challenger state | UNKNOWN |
| Core state | HOLD / BUY LOWER |
| Strongest FOR the research concern | Cash flow includes discontinued operations. H1 property/equipment spending was USD301m and intangible additions USD2m; reported USD378m FCF excludes the latter. ([source](https://ir.iff.com/news-releases/news-release-details/iff-reports-second-quarter-2026-results-announces-use-proceeds)) |
| Strongest AGAINST the research concern | H1 continuing Taste sales grew 5%, Health & Biosciences 9% and Scent 8% on a reported basis. ([source](https://www.sec.gov/Archives/edgar/data/51253/000005125326000030/iff-20260630.htm)) |
| Key falsification condition | Reject the concern if post-disposal continuing-business cash/share rises after stranded costs, investment and debt service across a full year. |
| Confidence | Reported source arithmetic traceable; insufficient confidence in normalized owner economics and intrinsic valuation. No substantive conclusion. |
| Exact remaining UNKNOWN fields | `continuingCFO`, `strandedCosts`, `disposalDebtBridge`, `buybackShares`, `valuation.shares`, `valuation.cashDebt`, `valuation.otherClaims`, `adjustment.discontinued_cfo`, `adjustment.stranded_costs`, `normalizedOwnerMetric`, `intrinsicValue.Bear`, `intrinsicValue.Base`, `intrinsicValue.Bull`, `reverseValuation`, `normalizedAnnualCashForecast`, `discountRate`, `terminalGrowthOrExitAssumption` |
| Balance-sheet assessment | USD5.735bn debt versus USD0.569bn cash; planned disposal proceeds and buybacks must be reconciled before concluding on survivability. |
| Contrarian-trap assessment | Pre-disposal FCF capitalized against post-disposal economics could be a trap; unresolved. |
| Required next research | Continuing CFO/SBC allocation, stranded costs, closing net proceeds, debt repayment and completed post-ASR share count remain UNKNOWN. |

Specialist review: H1 discontinued PP&E 68 can be removed from aggregate capex, but Note 3 gives selected discontinued cash items, not full discontinued CFO. Stranded costs remain unquantified. H1 disposals 201 and buyer payment 12 are investing flows; net commercial-paper repayments 264 and buybacks 71 are financing flows, not owner-FCF addbacks. July31 shares 255.149963m; future ASR cannot be treated as completed. ([source](https://www.sec.gov/Archives/edgar/data/51253/000005125326000030/iff-20260630.htm))

Bridge begins with reported CFO 679m minus cash capex 303m = 376.0000m. The period diluted denominator is 257m shares.

| Adjustment | Sign | USD million | Rationale / source |
|---|---:|---:|---|
| discontinued_capex | + | 68 | Remove discontinued PP&E from aggregate cash capex. [Source](https://www.sec.gov/Archives/edgar/data/51253/000005125326000030/iff-20260630.htm) — Note 3 discontinued cash-flow selected information |
| discontinued_cfo | − | UNKNOWN | Full discontinued CFO is not disclosed in selected cash items. |
| owner_compensation | − | 51 | Aggregate SBC sensitivity; continuing-only allocation remains unresolved. [Source](https://ir.iff.com/news-releases/news-release-details/iff-reports-second-quarter-2026-results-announces-use-proceeds) — Cash-flow statement / cash-flow reconciliation |
| stranded_costs | − | UNKNOWN | Incremental continuing stranded cash costs are not quantified. |

Known-row subtotal: 393.0000m / 257m = $1.5292. **Incomplete; UNKNOWN adjustments are not assumed zero.**

Audit: source pack `8814bdf1458ef6c8b7f16f9d409b4b6a942f0e5cc9c629c0cb8c55e6cf8fa7b3`; frozen packet `f5c736d098c021dd3a2a95e43700a4d59002a28e90dcad259812b1709d82fb8c`; Debate `75bd57184efe342cda7dd8ef8efbc88c7458fee078d7119de94338512baba6a0`.

## AVGO — CORE_CHALLENGE

| Requested field | Result |
|---|---|
| Normalized owner FCF/share or sector metric | UNKNOWN. Known-row partial subtotal: $2.3831 for 2026-05-04 through 2026-08-02. |
| Bear / Base / Bull intrinsic value | UNKNOWN / UNKNOWN / UNKNOWN |
| Market price and PIT timestamp | $357.16 USD at 2026-09-03T21:20:00Z; [source](https://finance.yahoo.co.jp/quote/AVGO); PUBLIC_TIMESTAMPED_FALLBACK |
| Implied expectations / reverse valuation | UNKNOWN; no normalized annual denominator or supported scenario/discount assumptions. |
| Challenger state | UNKNOWN |
| Core state | WATCH |
| Strongest FOR the research concern | Q3 stock compensation totals USD2019m across cost of revenue, R&D and SG&A; GAAP diluted shares are 4887m, distinct from the 4937m non-GAAP denominator. ([source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial)) |
| Strongest AGAINST the research concern | Q3 revenue grew 86% to USD29.6bn and AI semiconductor revenue grew 221% to USD16.7bn. ([source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial)) |
| Key falsification condition | Reject the concern if four quarters of cash/share after recurring SBC and investment remain resilient through slower AI demand and normal working capital. |
| Confidence | Reported source arithmetic traceable; insufficient confidence in normalized owner economics and intrinsic valuation. No substantive conclusion. |
| Exact remaining UNKNOWN fields | `hyperscalerDemand`, `workingCapitalCapex`, `bearBaseBullDemand`, `valuation.shares`, `valuation.cashDebt`, `valuation.otherClaims`, `adjustment.sustainable_demand_cash`, `adjustment.working_capital_cycle`, `normalizedOwnerMetric`, `intrinsicValue.Bear`, `intrinsicValue.Base`, `intrinsicValue.Bull`, `reverseValuation`, `normalizedAnnualCashForecast`, `discountRate`, `terminalGrowthOrExitAssumption` |
| Balance-sheet assessment | USD23.975bn cash and USD59.419bn stated debt; substantial liquidity coexists with leverage and commitments requiring stress review. |
| Contrarian-trap assessment | Growth extrapolation and compensation exclusions are potential traps; current valuation is UNKNOWN. |
| Required next research | Normalized hyperscaler demand, customer-level exposure, recurring WC/capacity investment and Bear/Base/Bull growth margins remain UNKNOWN. |

Specialist review: Q3 GAAP diluted shares 4887m versus non-GAAP 4937m; use GAAP denominator. SBC 2019 is charged explicitly. Acquisition amortization 2006 is noncash and already reconciled in CFO; no second addback. Acquisition-related cost line is zero this quarter, not proof of future zero costs. Receivables -2859, inventory -195, payables +1630 remain in cash. Hyperscaler demand and concentration prevent extrapolating Q3 into Bear/Base/Bull. ([source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial))

Bridge begins with reported CFO 14197m minus cash capex 532m = 13665.0000m. The period diluted denominator is 4887m shares.

| Adjustment | Sign | USD million | Rationale / source |
|---|---:|---:|---|
| owner_compensation | − | 2019 | Charge disclosed compensation; no unsupported tax adjustment. [Source](https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial) — Cash-flow statement / cash-flow reconciliation |
| sustainable_demand_cash | − | UNKNOWN | Normalized AI demand and customer concentration stress not quantified. |
| working_capital_cycle | + | UNKNOWN | Do not assume receivables and inventory fully reverse. |

Known-row subtotal: 11646.0000m / 4887m = $2.3831. **Incomplete; UNKNOWN adjustments are not assumed zero.**

Audit: source pack `b438c19514b91f0421032dfd5f2c0063597f697fbd3d71cfd67b08004550240a`; frozen packet `1399753576017786db086bd752e758970aee59bd2a8b452fbda94ce561976b71`; Debate `d936b8325f6b5e8ff4dc31b9d24f93c5183266e136e3fb3a7c432d66783f1e5f`.

## INTU — CORE_CHALLENGE

| Requested field | Result |
|---|---|
| Normalized owner FCF/share or sector metric | UNKNOWN. Known-row partial subtotal: $22.6318 for 2025-08-01 through 2026-07-31. |
| Bear / Base / Bull intrinsic value | UNKNOWN / UNKNOWN / UNKNOWN |
| Market price and PIT timestamp | $349.04 USD at 2026-09-03T20:00:00Z; [source](https://stockanalysis.com/stocks/intu/history/); ARGUS_VERIFIED_FIRST |
| Implied expectations / reverse valuation | UNKNOWN; no normalized annual denominator or supported scenario/discount assumptions. |
| Challenger state | UNKNOWN |
| Core state | BUY |
| Strongest FOR the research concern | FY2026 CFO includes USD1279m deferred-tax and USD2056m SBC adjustments. Net lending investment was USD292m; ordinary CFO less capex omits that reinvestment. ([source](https://investors.intuit.com/sec-filings/all-sec-filings/content/0000896878-26-000029/fy26q4earningspressrelease.htm)) |
| Strongest AGAINST the research concern | FY2026 revenue grew 14% to USD21.4bn, while repurchases reduced weighted-average diluted shares from 283m to 277m. ([source](https://investors.intuit.com/sec-filings/all-sec-filings/content/0000896878-26-000029/fy26q4earningspressrelease.htm)) |
| Key falsification condition | Reject the concern if the annual filing and subsequent year confirm rising cash/share after normalized taxes, lending reinvestment and SBC, despite slower revenue growth. |
| Confidence | Reported source arithmetic traceable; insufficient confidence in normalized owner economics and intrinsic valuation. No substantive conclusion. |
| Exact remaining UNKNOWN fields | `fy2026Annual`, `workingCapitalTaxes`, `capitalizedInvestmentLending`, `valuation.shares`, `valuation.cashDebt`, `valuation.otherClaims`, `adjustment.normalized_tax_timing`, `adjustment.recurring_capitalized_investment`, `normalizedOwnerMetric`, `intrinsicValue.Bear`, `intrinsicValue.Base`, `intrinsicValue.Bull`, `reverseValuation`, `normalizedAnnualCashForecast`, `discountRate`, `terminalGrowthOrExitAssumption` |
| Balance-sheet assessment | USD4.705bn corporate cash plus USD2.495bn investments versus USD7.669bn debt; customer funds are not corporate liquidity. |
| Contrarian-trap assessment | Low multiples of unadjusted cash flow may be misleading if tax timing reverses; unresolved. |
| Required next research | FY2026 10-K, normalized cash taxes, recurring capitalized investment and valuation-date outstanding shares remain UNKNOWN. |

Specialist review: Retain 221 PP&E; separately deduct net lending investment 6755-2210-4253=292. Charge SBC 2056; use diluted 277m versus prior 283m. CFO deferred-tax reconciliation 1279 is not automatically a removable cash windfall; WC net -4. Customer funds 4511 are excluded from corporate cash. ([source](https://investors.intuit.com/sec-filings/all-sec-filings/content/0000896878-26-000029/fy26q4earningspressrelease.htm))

Annual evidence search: Observed issuer index lists FY2025 10-K as latest annual filing; FY2026 10-K not located. ([source](https://investors.intuit.com/sec-filings/annual-reports))

Bridge begins with reported CFO 8838m minus cash capex 221m = 8617.0000m. The period diluted denominator is 277m shares.

| Adjustment | Sign | USD million | Rationale / source |
|---|---:|---:|---|
| owner_compensation | − | 2056 | Charge SBC without silently forecasting future dilution. [Source](https://investors.intuit.com/sec-filings/all-sec-filings/content/0000896878-26-000029/fy26q4earningspressrelease.htm) — Cash-flow statement / cash-flow reconciliation |
| lending_reinvestment | − | 292 | Deduct reported net lending deployment outside CFO. [Source](https://investors.intuit.com/sec-filings/all-sec-filings/content/0000896878-26-000029/fy26q4earningspressrelease.htm) — FY2026 investing cash flows: 6755 - 2210 - 4253 |
| normalized_tax_timing | − | UNKNOWN | Deferred-tax reconciliation does not quantify sustainable cash taxes. |
| recurring_capitalized_investment | − | UNKNOWN | Full recurring capitalized investment bridge awaits annual detail. |

Known-row subtotal: 6269.0000m / 277m = $22.6318. **Incomplete; UNKNOWN adjustments are not assumed zero.**

Audit: source pack `ad32d47eaf0c5295870fbd1e308afe2c760c7a50b163998b67b145044422cc4c`; frozen packet `805b8cb860cbab17e4b23cc4a55d221f1b4da2810a68a7b339c48326807818fc`; Debate `67478ca187b3fab2376313ead3752245204f8b0eeffa4e1b59b67737c96170e8`.

## CLS — EXTERNAL_DISCOVERY

| Requested field | Result |
|---|---|
| Normalized owner FCF/share or sector metric | UNKNOWN. Known-row partial subtotal: $1.0826 for 2026-04-01 through 2026-06-30. |
| Bear / Base / Bull intrinsic value | UNKNOWN / UNKNOWN / UNKNOWN |
| Market price and PIT timestamp | $315 USD at 2026-09-04T16:04:00Z; [source](https://stockanalysis.com/stocks/cls/history/); PUBLIC_TIMESTAMPED_FALLBACK |
| Implied expectations / reverse valuation | UNKNOWN; no normalized annual denominator or supported scenario/discount assumptions. |
| Challenger state | UNKNOWN |
| Core state | Not applicable — EXTERNAL_CANDIDATE |
| Strongest FOR the research concern | Q2 inventory absorbed USD728.8m and receivables USD170.8m; payables/accruals supplied USD1025.3m. Cash conversion depends on supplier funding and capacity investment. ([source](https://www.sec.gov/Archives/edgar/data/1030894/000103089426000044/cls-20260630.htm)) |
| Strongest AGAINST the research concern | Q2 revenue rose 62% to USD4.70bn and GAAP operating margin was 9.8%. ([source](https://www.sec.gov/Archives/edgar/data/1030894/000103089426000044/cls-20260630.htm)) |
| Key falsification condition | Reject the concern if four post-offering quarters grow cash/share after recurring capacity investment and normalized supplier funding. |
| Confidence | Reported source arithmetic traceable; insufficient confidence in normalized owner economics and intrinsic valuation. No substantive conclusion. |
| Exact remaining UNKNOWN fields | `workingCapitalFunding`, `maintenanceGrowthCapex`, `ownerCashPerShareGrowth`, `valuation.shares`, `valuation.cashDebt`, `valuation.otherClaims`, `adjustment.supplier_funding_normalization`, `adjustment.growth_capex_addback`, `normalizedOwnerMetric`, `intrinsicValue.Bear`, `intrinsicValue.Base`, `intrinsicValue.Bull`, `reverseValuation`, `normalizedAnnualCashForecast`, `discountRate`, `terminalGrowthOrExitAssumption` |
| Balance-sheet assessment | June cash USD535.7m versus USD810.4m credit/finance-lease obligations precede the August offering; do not combine stale shares with post-offering proceeds. |
| Contrarian-trap assessment | Rapid growth plus a stale share denominator can obscure financing costs; unresolved. |
| Required next research | Sustainable supplier financing, maintenance/capacity capex split, post-offering net cash/current shares and per-share growth conversion remain UNKNOWN. |

Specialist review: Q2 410.9 CFO minus 263.8 PP&E; no Q2 asset-sale proceeds. H1 gross PP&E is 493.3, versus 482.2 net of 11.1 asset disposals; do not confuse net and maintenance capex. Q2 receivables -170.8, inventory -728.8, other -17.1 and liabilities +1025.3 sum to +108.6 funding. ([source](https://www.sec.gov/Archives/edgar/data/1030894/000103089426000044/cls-20260630.htm))

Offering bridge: 114.982086m July22 shares +11.129031m August7 issuance =126.111117m before other changes; gross cash proceeds are not net cash. ([source](https://corporate.celestica.com/news-releases/news-release-details/celestica-completes-equity-offering))

Bridge begins with reported CFO 410.9m minus cash capex 263.8m = 147.1000m. The period diluted denominator is 116.2m shares.

| Adjustment | Sign | USD million | Rationale / source |
|---|---:|---:|---|
| owner_compensation | − | 19.3 | Charge disclosed SBC sensitivity. [Source](https://www.sec.gov/Archives/edgar/data/1030894/000103089426000044/cls-20260630.htm) — Cash-flow statement / cash-flow reconciliation |
| finance_lease_principal | − | 2 | Deduct Q2 principal payments outside CFO and PP&E. [Source](https://www.sec.gov/Archives/edgar/data/1030894/000103089426000044/cls-20260630.htm) — Cash flows: principal payments of finance leases |
| supplier_funding_normalization | − | UNKNOWN | Recurring portion of +108.6 WC funding is unproven. |
| growth_capex_addback | + | UNKNOWN | No quantitative maintenance/growth split; retain gross spending pending evidence. |

Known-row subtotal: 125.8000m / 116.2m = $1.0826. **Incomplete; UNKNOWN adjustments are not assumed zero.**

Audit: source pack `1f62377c15b64b83da85b9d0649b277c1686b9cf6eb047489b29eb454aac30e0`; frozen packet `712da24a9f6fcc2ce40db9f0e47c02b114e5362a1f6a20e880933daa15446b8b`; Debate `a5b38e03131576ed27058b3ff237fa504eb8bdc4be6e568d165fed00d6629daa`.

## TNK — EXTERNAL_DISCOVERY

| Requested field | Result |
|---|---|
| Normalized owner FCF/share or sector metric | UNKNOWN. Reported Q2 TCE: Suezmax $109,200/day; Aframax/LR2 $74,100/day. Neither is a mid-cycle estimate. Fleet NAV and normalized sector earnings/FCF remain UNKNOWN. |
| Bear / Base / Bull intrinsic value | UNKNOWN / UNKNOWN / UNKNOWN |
| Market price and PIT timestamp | $93.2 USD at 2026-09-04T13:58:00Z; [source](https://stockanalysis.com/stocks/tnk/history/); PUBLIC_TIMESTAMPED_FALLBACK |
| Implied expectations / reverse valuation | UNKNOWN; no normalized annual denominator or supported scenario/discount assumptions. |
| Challenger state | UNKNOWN |
| Core state | Not applicable — EXTERNAL_CANDIDATE |
| Strongest FOR the research concern | Q2 tanker rates were exceptional following Hormuz disruption; net income included USD32.3m vessel-sale gains. H1 cash vessel spending includes USD1.515m equipment, USD42.449m acquisitions and USD33.412m newbuild advances. ([source](https://www.sec.gov/Archives/edgar/data/1419945/000141994526000054/tnkq2-26erdocument.htm)) |
| Strongest AGAINST the research concern | Reported liquidity was approximately USD1.3bn, including cash, short-term investments and undrawn facilities; Q2 revenue was USD379.508m. ([source](https://www.sec.gov/Archives/edgar/data/1419945/000141994526000054/tnkq2-26erdocument.htm)) |
| Key falsification condition | Reject the concern if mid-cycle charter assumptions fund fleet renewal, drydock and shareholder cash returns without drawing down liquidity. |
| Confidence | Reported source arithmetic traceable; insufficient confidence in normalized owner economics and intrinsic valuation. No substantive conclusion. |
| Exact remaining UNKNOWN fields | `fleetMarketValueNAV`, `netCash`, `normalizedTCE`, `bearBaseBullSector`, `valuation.shares`, `valuation.cashDebt`, `valuation.otherClaims`, `normalizedOwnerMetric`, `intrinsicValue.Bear`, `intrinsicValue.Base`, `intrinsicValue.Bull`, `reverseValuation`, `normalizedAnnualCashForecast`, `discountRate`, `terminalGrowthOrExitAssumption` |
| Balance-sheet assessment | Large reported liquidity provides a buffer, but fleet renewal, drydock and remaining newbuild commitments need a normalized-cycle funding assessment. |
| Contrarian-trap assessment | Peak earnings and prior-year escrow distort simple cash multiples; requires fleet NAV and cycle underwriting. |
| Required next research | Vessel-by-vessel current market values/NAV, net cash after all claims, normalized TCE/utilization/opex, sustainable drydock/renewal and Bear/Base/Bull earnings/FCF remain UNKNOWN. |

Specialist review: Shipping underwriting uses fleet NAV and TCE, not generic FCF. June cash 735.007 plus short investments 476.582 excludes restricted 3.655; unrestricted liquidity before obligations 1211.589. Q2 sale gain 32.3 excluded from adjusted income; adjusted basic EPS 5.56 is peak-quarter, not normalized. H1 drydock cash 12.575 already in CFO. Two Suezmax newbuild contracts cost 190 with 156.6 remaining; do not expense prior-year 99 escrow again. Q2 Suezmax TCE 109200/day and Aframax/LR2 74100/day are reported peak rates. Vessel sale comparables (53.5 Suezmax, 84.5 VLCC) do not value every ship. ([source](https://www.sec.gov/Archives/edgar/data/1419945/000141994526000054/tnkq2-26erdocument.htm))

Audit: source pack `82744cdf40868633b0727f8e18fdf4bee369dc269d793f9388fe5246e07b7f78`; frozen packet `b8bafa0555270d5be26f57bbb1f5bd5e1350f8d3718dfbe5cb0a73cd1848ab2d`; Debate `be38d3542037c07a4f2b37d9b2ba941f286172ed016e92a7b18a796f19241866`.

## CRDO — EXTERNAL_DISCOVERY

| Requested field | Result |
|---|---|
| Normalized owner FCF/share or sector metric | UNKNOWN. Known-row partial subtotal: $-0.0259 for 2026-05-03 through 2026-08-01. |
| Bear / Base / Bull intrinsic value | UNKNOWN / UNKNOWN / UNKNOWN |
| Market price and PIT timestamp | $169.25 USD at 2026-09-04T15:40:00Z; [source](https://stockanalysis.com/stocks/crdo/history/); PUBLIC_TIMESTAMPED_FALLBACK |
| Implied expectations / reverse valuation | UNKNOWN; no normalized annual denominator or supported scenario/discount assumptions. |
| Challenger state | UNKNOWN |
| Core state | Not applicable — EXTERNAL_CANDIDATE |
| Strongest FOR the research concern | Q1 working capital absorbed USD151.3m and acquisition cash outflow was USD735.619m. Diluted shares increased from 184.577m to 194.378m; SBC was USD87.979m. ([source](https://www.sec.gov/Archives/edgar/data/1807794/000162828026060111/crdo-20260801.htm)) |
| Strongest AGAINST the research concern | Q1 revenue increased 114.7% to USD479m; cash plus short-term investments totaled USD764.258m. ([source](https://www.sec.gov/Archives/edgar/data/1807794/000162828026060111/crdo-20260801.htm)) |
| Key falsification condition | Reject the concern if four quarters show positive improving SBC-charged cash/share after normalized working capital and acquisition obligations. |
| Confidence | Reported source arithmetic traceable; insufficient confidence in normalized owner economics and intrinsic valuation. No substantive conclusion. |
| Exact remaining UNKNOWN fields | `workingCapital`, `ownerCashPerShareGrowth`, `valuation.shares`, `valuation.cashDebt`, `valuation.otherClaims`, `adjustment.working_capital_recovery`, `adjustment.recurring_acquisition_investment`, `normalizedOwnerMetric`, `intrinsicValue.Bear`, `intrinsicValue.Base`, `intrinsicValue.Bull`, `reverseValuation`, `normalizedAnnualCashForecast`, `discountRate`, `terminalGrowthOrExitAssumption` |
| Balance-sheet assessment | Cash USD466.869m plus short investments USD297.389m exceed reported current liabilities USD198.165m; full commitments and acquisition obligations remain to be reconciled. |
| Contrarian-trap assessment | SBC-charged current-period cash is weak despite revenue growth; valuation and durability remain UNKNOWN. |
| Required next research | Sustainable WC, earn-out settlement/dilution, recurring acquisition economics, commitment funding and quote-date shares/claims remain UNKNOWN. |

Specialist review: Quarter diluted shares 194.378m versus 184.577m; SBC 87.979 exceeds CFO-minus-capex 82.949. Quarter-end acquisition earn-out fair values: cash liability 10 and equity 300; not interchangeable cash debt. Noncancelable purchase commitments 222.212. Acquisition cash 735.619 is not an FCF addback. Aug25 ordinary shares 187.951918m differ from diluted average. WC cash use 151.3 includes customer ramp inventory and receivables; recovery not assumed. ([source](https://www.sec.gov/Archives/edgar/data/1807794/000162828026060111/crdo-20260801.htm))

Bridge begins with reported CFO 90.231m minus cash capex 7.282m = 82.9490m. The period diluted denominator is 194.378m shares.

| Adjustment | Sign | USD million | Rationale / source |
|---|---:|---:|---|
| owner_compensation | − | 87.979 | Charge recurring compensation sensitivity without assumed tax shield. [Source](https://www.sec.gov/Archives/edgar/data/1807794/000162828026060111/crdo-20260801.htm) — Cash-flow statement / cash-flow reconciliation |
| working_capital_recovery | + | UNKNOWN | Cash use is real; no assumed customer-ramp reversal. |
| recurring_acquisition_investment | − | UNKNOWN | Do not amortize purchase cash into recurring economics without support. |

Known-row subtotal: -5.0300m / 194.378m = $-0.0259. **Incomplete; UNKNOWN adjustments are not assumed zero.**

Audit: source pack `5b78940b2ca3a02a691af7ae08aae275f1b851387448320da15e75ddb749f358`; frozen packet `c45c2d98b05a1d5ffb4c76fa2731a00f7abc6a363db39f6b94f62965d6bb1c6d`; Debate `25bb897f338d12c4e39c60bcd734bf935a716e6f7cbc0d903011465db13eaa3f`.

## ARM — EXTERNAL_DISCOVERY

| Requested field | Result |
|---|---|
| Normalized owner FCF/share or sector metric | UNKNOWN. Known-row partial subtotal: $0.2987 for 2026-04-01 through 2026-06-30. |
| Bear / Base / Bull intrinsic value | UNKNOWN / UNKNOWN / UNKNOWN |
| Market price and PIT timestamp | $251.69 USD at 2026-09-04T15:48:00Z; [source](https://stockanalysis.com/stocks/arm/history/); PUBLIC_TIMESTAMPED_FALLBACK |
| Implied expectations / reverse valuation | UNKNOWN; no normalized annual denominator or supported scenario/discount assumptions. |
| Challenger state | UNKNOWN |
| Core state | Not applicable — EXTERNAL_CANDIDATE |
| Strongest FOR the research concern | Q1 operating cash flow benefited from collections and tax timing. SBC was USD343m; diluted shares rose from 1065m to 1078m. ([source](https://www.sec.gov/Archives/edgar/data/1973239/000197323926000114/arm-20260630.htm)) |
| Strongest AGAINST the research concern | Revenue rose from USD1053m to USD1289m; cash and short-term investments totaled USD3888m. ([source](https://www.sec.gov/Archives/edgar/data/1973239/000197323926000114/arm-20260630.htm)) |
| Key falsification condition | Reject the concern if subsequent full-year cash/share remains strong after normal collections, tax payments, recurring SBC and silicon investment. |
| Confidence | Reported source arithmetic traceable; insufficient confidence in normalized owner economics and intrinsic valuation. No substantive conclusion. |
| Exact remaining UNKNOWN fields | `collectionsTaxes`, `ownerCashPerShare`, `valuation.shares`, `valuation.cashDebt`, `valuation.otherClaims`, `adjustment.collections_tax_timing`, `adjustment.silicon_investment_runrate`, `normalizedOwnerMetric`, `intrinsicValue.Bear`, `intrinsicValue.Base`, `intrinsicValue.Bull`, `reverseValuation`, `normalizedAnnualCashForecast`, `discountRate`, `terminalGrowthOrExitAssumption` |
| Balance-sheet assessment | Cash USD3058m plus short investments USD830m exceed current liabilities USD1207m; review lease, design-software and silicon commitments separately. |
| Contrarian-trap assessment | Timing-driven cash, minority governance and new investment needs can mislead valuation; unresolved. |
| Required next research | Normalized collections/tax cash, silicon investment run rate, ADS/ordinary capital-action bridge and all EV claims remain UNKNOWN. |

Specialist review: Q1 CFO 902; PP&E 197 plus intangible purchases 11 are retained. Deduct 29 intangible-obligation financing payments as recurring-investment cash sensitivity. SBC 343 charged; do not also deduct vested-share withholding 278 as compensation. Receivables +181, contract assets +50, contract liabilities -107, other liabilities +285 show timing; deferred taxes -66 is not cash tax normalization. 1068m ordinary shares at June30 versus 1078m diluted average. Silicon expansion changes recurring capital requirements. ([source](https://www.sec.gov/Archives/edgar/data/1973239/000197323926000114/arm-20260630.htm))

Bridge begins with reported CFO 902m minus cash capex 208m = 694.0000m. The period diluted denominator is 1078m shares.

| Adjustment | Sign | USD million | Rationale / source |
|---|---:|---:|---|
| owner_compensation | − | 343 | Charge SBC once, not SBC plus employee withholding. [Source](https://www.sec.gov/Archives/edgar/data/1973239/000197323926000114/arm-20260630.htm) — Cash-flow statement / cash-flow reconciliation |
| intangible_obligations | − | 29 | Deduct financing-classified intangible cash payments. [Source](https://www.sec.gov/Archives/edgar/data/1973239/000197323926000114/arm-20260630.htm) — Cash flows: payments of intangible asset obligations |
| collections_tax_timing | − | UNKNOWN | Sustainable collection and tax timing cannot be estimated from one quarter. |
| silicon_investment_runrate | − | UNKNOWN | Recurring silicon investment above present spending is not quantified. |

Known-row subtotal: 322.0000m / 1078m = $0.2987. **Incomplete; UNKNOWN adjustments are not assumed zero.**

Audit: source pack `f8447e92297fa0ffcc1489486a04dbe88aeb2e3d363a9bb6bd9a8044351809e9`; frozen packet `44cae5566fc373886397a57f157b8e7325ec479ae19dba453242df314e1fa663`; Debate `54f4451556c5990f83cbf3af4901d069728323c6adf5924b283b513547f9c8ac`.

## Verification

213 unit tests passed (192 existing +21 new), zero failures/skips; four browser suites passed; 54 application modules passed syntax checks. All 21 protected Core/Observer/proof and prior integrity artifacts are raw-byte identical to the C.1 start snapshot. All 10 existing Challenger journals retain exact committed byte prefixes. [Machine-readable hashes and sequence proof](CHALLENGER_PHASE_C1_INTEGRITY.json) record every file and freeze/read timestamp.
