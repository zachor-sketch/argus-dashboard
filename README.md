# ARGUS Dashboard

ARGUS Challenger V1 Phase A is an isolated, research-only architecture with no live
scoring or effect on Core decisions. See [CHALLENGER.md](CHALLENGER.md) for its packet
contract, Debate interface, append-only journals and governance.
The [Phase B controlled pilot](CHALLENGER_PHASE_B.md) adds source-first independent
packets and separate audited Debate records, with no promotion into Core or trades.

A dependency-free, responsive dashboard published from the root of `main` through GitHub Pages.

Live site: https://zachor-sketch.github.io/argus-dashboard/

## Local preview

With Node.js installed, run `npm run dev`, then open http://127.0.0.1:4173. No installation or compilation is needed. The preview server serves only the public dashboard assets and binds to localhost.

Run `npm run check` for JavaScript syntax and `npm test` for portfolio calculation and baseline-isolation checks. Browser validation uses `node tests/browser.cjs [path-to-playwright-package] [base-url]` with Playwright and Microsoft Edge available. Screenshots are stored in ignored `test-results/`.

## Data provenance and boundaries

- `data.js` contains the exact user-supplied V10.25 lock prices, IV ranges, expected IVs, scores, and company decisions. Nested baseline data is frozen; the UI has no write path to it.
- The V10.34 portfolio is separate: total $4,000,000; INTU 5,300 shares; average purchase price $357.21283; target 6–8%; hard maximum 12%; portfolio decision DO NOT ADD.
- Qualitative research, economic risk-bucket limits, radar statuses, the FIS zero target until its gate passes, the prior INTU purchase date, and forward-proof counters are restored from the user's prior ARGUS conversation “תצוגת ארגוס בצ׳אט”, 03 September 2026. They are labeled as a prior snapshot, not independently verified current data. The original HTML and detailed scoring/valuation formulas were unavailable; missing engine inputs are explicitly marked as not supplied.
- No live quotes are embedded or fetched. Old market quotes from prior conversations were deliberately excluded. Live price, live portfolio weight, live P/L, and live event fields require a verified refresh.
- Default INTU estimate: 5,300 × $359.30 = $1,904,290; weight = 47.60725%. Cost-basis alternative: $1,893,227.999; weight = 47.330699975%. Neither is described as live market value.
- Stock capacity is max(0, hard-max dollar allocation − position estimate), subject to the other gates. INTU's supplied NO ADD decision remains controlling. Switching the estimate basis never rewrites the baseline.
- Other holdings are unknown, not zero. The unclassified remainder is not cash. Software exposure is a known lower bound; economic-bucket limits are distinguished from sector-specific limits that were not provided.
- Forward counters and radar decisions are historical snapshots. The dashboard does not claim an active monitoring service, a verified proof score, or trading/API authorization.

## Publishing

Commit public files to `main` and push to `origin`. GitHub Pages is configured to publish `main` from `/` (repository root). `.nojekyll` preserves direct static serving. All frontend URLs are relative so the project subpath works. No credentials, local runtime paths, or test screenshots are required on the deployed site.

Before declaring a release live, confirm that the HTML, JavaScript, and stylesheet served at the Pages URL match the pushed files. A successful push alone does not prove that Pages has finished deploying.

See [Phase B.1 discovery lanes, governance and frozen pilot results](CHALLENGER_PHASE_B1.md).

See [Phase C underwriting evidence, gates and frozen pilot](CHALLENGER_PHASE_C.md).
