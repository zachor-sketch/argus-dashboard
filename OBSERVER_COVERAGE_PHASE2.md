# Observer coverage hardening audit

Original scan: scan-33859287768-1. Complete: 89; usable: 92; unavailable: 8; failed sources: 29.

Unavailable: SU.PA (Schneider), SY1.DE (Symrise), TRPZ.TA (Turpaz), MUV2 (Munich Re), ALV.DE (Allianz), LLOY (Lloyds), LUMI.TA (Leumi), MC.PA (LVMH).

## Every original failure

| # | Ticker | Exact source | Recorded error | Root-cause category | Treatment |
|---|---|---|---|---|---|
| 1 | SU.PA | [Source](https://www.se.com/ww/en/about-us/investor-relations/financial-results) | PUBLICATION_DATE_UNAVAILABLE | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |
| 2 | SU.PA | [Source](https://www.se.com/ww/en/assets/pdf/release-hy-results-2026) | PDF_REQUIRES_MANUAL_REVIEW | PDF/manual-review limitation | Keep manual review; prefer available issuer HTML releases. |
| 3 | SU.PA | [Source](https://www.se.com/ww/en/assets/pdf/release-q1-revenues-2026) | PDF_REQUIRES_MANUAL_REVIEW | PDF/manual-review limitation | Keep manual review; prefer available issuer HTML releases. |
| 4 | SU.PA | [Source](https://www.se.com/ww/en/assets/564/document/528237/release-fy-results-2025.pdf) | PDF_REQUIRES_MANUAL_REVIEW | PDF/manual-review limitation | Keep manual review; prefer available issuer HTML releases. |
| 5 | SU.PA | [Source](https://www.se.com/ww/en/about-us/investor-relations/) | NO_DATED_IR_RELEASES | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |
| 6 | GIVN.SW | [Source](https://www.givaudan.com/investors/financial-results) | PUBLICATION_DATE_UNAVAILABLE | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |
| 7 | GIVN.SW | [Source](https://www.givaudan.com/investors/financial-results/key-figures) | PUBLICATION_DATE_UNAVAILABLE | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |
| 8 | GIVN.SW | [Source](https://www.givaudan.com/investors/financial-results/financial-targets) | PUBLICATION_DATE_UNAVAILABLE | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |
| 9 | GIVN.SW | [Source](https://www.givaudan.com/investors/financial-results/results-centre) | PUBLICATION_DATE_UNAVAILABLE | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |
| 10 | GIVN.SW | [Source](https://www.givaudan.com/investors) | IR_ONLY_PARTIAL_COVERAGE_NO_REGULATORY_CONNECTOR | Unsupported non-US regulatory source | Issuer evidence remains partial, never complete. |
| 11 | SY1.DE | [Source](https://www.symrise.com/newsroom/press-releases/) | PUBLICATION_DATE_UNAVAILABLE | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |
| 12 | SY1.DE | [Source](https://www.symrise.com/investors/financial-results/) | PUBLICATION_DATE_UNAVAILABLE | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |
| 13 | SY1.DE | [Source](https://www.symrise.com/newsroom/press-releases/rss.xml) | PUBLICATION_DATE_UNAVAILABLE | Publication-date parsing: unsupported RSS | Parse per-item publication dates and same-origin article links. |
| 14 | SY1.DE | [Source](https://www.symrise.com/securedl/sdl-eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3ODg1MTMzNDMsImV4cCI6MTc4ODUyMDU0MywidXNlciI6MCwiZ3JvdXBzIjpbMCwtMV0sImZpbGUiOiJmaWxlYWRtaW4vc3ltcmlzZS9Eb3dubG9hZHNfcmVwb3J0cy9yZXBvcnRzL2RvY3VtZW50cy8yMDI2LzI2MDQyOS1TeW1yaXNlLVExLTIwMjYtcHJlc3MtcmVsZWFzZS5wZGYiLCJwYWdlIjo3MX0.fsViO0CgVwX5OeDPvwlVZ3H0K1lsFw_KT2hZIjtSZ84/260429-Symrise-Q1-2026-press-release.pdf) | PDF_REQUIRES_MANUAL_REVIEW | PDF/manual-review limitation | Keep manual review; prefer available issuer HTML releases. |
| 15 | SY1.DE | [Source](https://www.symrise.com/investors) | NO_DATED_IR_RELEASES | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |
| 16 | CRDA.L | [Source](https://www.croda.com/en-gb/investors/results-presentations-and-reports) | PUBLICATION_DATE_UNAVAILABLE | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |
| 17 | CRDA.L | [Source](https://www.croda.com/en-gb/investors/acquisitions) | PUBLICATION_DATE_UNAVAILABLE | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |
| 18 | CRDA.L | [Source](https://www.croda.com/en-gb/investors) | IR_ONLY_PARTIAL_COVERAGE_NO_REGULATORY_CONNECTOR | Unsupported non-US regulatory source | Issuer evidence remains partial, never complete. |
| 19 | TRPZ.TA | [Source](https://market.tase.co.il/he/market_data/security/1175611/major_data) | IR_DISCOVERY_UNSUPPORTED | Stale/wrong IR URL | Original route was a TASE quote page; use actual issuer announcements. PDFs remain a limitation. |
| 20 | MUV2 | [Source](https://www.munichre.com/en/company/investors/reports-and-presentations/results-reports.html) | PUBLICATION_DATE_UNAVAILABLE | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |
| 21 | MUV2 | [Source](https://www.munichre.com/en/company/investors.html) | NO_DATED_IR_RELEASES | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |
| 22 | HSBC | [Source](https://data.sec.gov/submissions/CIK0001089113.json) | FILING_BACKLOG_REQUIRES_NEXT_SCAN | Other: bounded filing backlog | Drain on subsequent append-only scan; retain per-company cap. |
| 23 | ALV.DE | [Source](https://www.allianz.com/en/investor_relations.html) | HTTP_403 | Legitimate 403/anti-bot | Preserve host block; no bypass. |
| 24 | LLOY | [Source](SEC EDGAR) | SEC_TICKER_MAPPING_UNAVAILABLE | Other: exchange ticker alias | LLOY maps to issuer-confirmed NYSE ADR LYG; require pinned CIK and live SEC identity validation. |
| 25 | LLOY | [Source](https://www.lloydsbankinggroup.com/investors.html) | IR_DISCOVERY_UNSUPPORTED | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |
| 26 | LUMI.TA | [Source](https://english.leumi.co.il/Investor_Relations) | HTTP_404 | Stale/wrong IR URL; HTTP 404 | Replace operational route with current issuer Investor-Relations page. |
| 27 | MC.PA | [Source](https://www.lvmh.com/en/publications?tag=Press%20releases) | PUBLICATION_DATE_UNAVAILABLE | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |
| 28 | MC.PA | [Source](https://www.lvmh.com/en/financial-calendar/2026-first-half-results) | PUBLICATION_DATE_UNAVAILABLE | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |
| 29 | MC.PA | [Source](https://www.lvmh.com/investors) | NO_DATED_IR_RELEASES | Publication-date parsing / index discovery | Follow bounded issuer links to actual dated releases; never assign an index date to an article. |

## Boundaries

Operational source corrections live in lib/observer-sources.js with issuer provenance. Historical imports remain untouched. Discovery is same-origin, bounded, rate-limited and uses the existing DNS-pinned HTTPS transport. Dates must belong to an actual release, a single scoped article card or its individual feed entry. Missing/ambiguous dates, PDFs and denied sources remain explicit gaps.

The nine non-US profiles without a regulatory connector cannot become complete through issuer HTML alone. Under the current connector set the legitimate complete ceiling is 91; achieving 95 requires additional regulatory connectors, not a relaxed definition. The real post-change scan is recorded separately in the append-only observer journals.
