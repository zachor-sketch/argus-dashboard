# ARGUS V2

V2 extends the existing dark dashboard and sidebar. Hebrew is the default RTL interface; the language toggle stores a local preference and English uses LTR.

## Authoritative sources and isolation

The four supplied artifacts are retained unchanged. The importer reads the original HTML literals and copies the original formula functions into an isolated historical replay module. Official recorded decisions remain separate from a replay's computed outputs: for example, INTU's recorded score is 82, its raw weighted factor score is 88, its recorded expected IV is $425, and its scenario-weighted EV is $413.50. These distinct source facts must not be silently reconciled.

The canonical baseline SHA-256 is:

`0c6c0ddd63284379e5da3f84ccfefe7b6a79850bd82ff6722586579104544415`

Baseline, holdings, market snapshot, shadow research, event log and proof ledger are separate modules. Baseline objects are recursively frozen. Unit tests pin the canonical hash and the raw hashes of all four sources. The importer refuses unexpected source/hash changes. CI runs syntax and integrity tests.

## Restored workflows

- Daily decision board and four independent review clocks, source freshness and missing quote status.
- Full V10.25 factor, gate, valuation, lineage, forensic, regime, clock, stress, consensus, model-risk, action-price, allocator, factor-exposure, exit, attribution and learning layers.
- Original forecasts, source links, watch variables and success/failure conditions; local notes and append-only shadow forecast updates.
- Local holdings editor with cost and verified-quote P/L calculations, target/max/capacity rules and explicit unknown exposure.
- Append-only material events with dated research snapshots; price movement alone is rejected.
- 100-company universe, owner-test and source coverage records, 67 deep reviews, and eight AI-chain reviews (3 core / 5 external).
- Full authoritative validation ledger, forward cohorts, 6M/12M/24M criteria, historical contamination, error taxonomy and proposed shadow rules.

## Explicit limits

There is no live-price provider or automated event collector. Current prices and current P/L remain unavailable until verified timestamped quotes are supplied to the separate market snapshot. Historical source prices are labeled as historical and never promoted into current quotes.

Original analyst evidence remains verbatim in its source language inside source drill-downs; Hebrew controls and labels surround it. Missing normalized cash-conversion figures and other absent original fields are labeled unavailable. No missing formula is invented.

Local edits and notes are stored only in this browser. Local research and learning proposals do not promote model rules or authorize trading. Historical diagnostic results cannot satisfy clean-forward proof; authorization remains blocked with zero resolved clean outcomes.

The 33 P3 universe companies remain unvalidated as in the supplied source. Workbook simulation rules are not empirical evidence.

## Verification

`node scripts/check.cjs` checks all application modules. `node --test tests/portfolio.test.js tests/v2.test.js` checks calculations, source integrity and isolation. `node tests/browser.cjs <playwright-package-path>` checks desktop/mobile, RTL/LTR, dialogs, search, allocations and local persistence. Test screenshots are ignored and are not deployed.
