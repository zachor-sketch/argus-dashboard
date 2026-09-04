# ARGUS Challenger V1 — Phase B controlled pilot

Phase B adds an explicitly invoked, source-first research pilot. It preserves the
Phase A `/1` packet contract and its UNKNOWN-only behavior; `/2` packets enable
evidence-grounded independent economic stances. No Core engine, canonical
valuation, holdings, action, Observer journal or historical proof file is modified.
There is no 100-company rollout, web scraper, new data ingestion service, model
training, scheduled scoring or promotion into Core.

## Source-first architecture

1. `scripts/challenger-evidence.mjs` verifies existing Observer hash chains and
   projects only authoritative company identity, source excerpts, provenance and
   PIT-valid verified prices. It excludes Observer interpretations, direction,
   materiality, review flags, company-sensor narratives, filing notices and all
   Core research fields. The source adapter internally reads the universe only to
   resolve membership, identity and issuer URL. It does not deliver research rows
   to the independent model. Canonical valuation and research-shadow narratives
   are deliberately not used as independent valuation inputs.
2. `lib/challenger-pilot-model.js` receives only the detached, frozen source bundle,
   an analyst-authored draft, cutoff and packet metadata. It has no Core accessor.
   The controlled pilot uses reviewed drafts, not autonomous text generation or
   keyword scoring. Missing evidence is UNKNOWN; a blank draft never generates a
   substantive view. The source bundle and draft are embedded in each independent
   packet so the analyst's inputs and claims are auditable.
3. The `freeze` command validates every draft, appends `/2` independent packets to
   `challenger/challenges.jsonl`, fsyncs them and appends an `INDEPENDENT_FROZEN`
   batch receipt to `challenger/runs.jsonl`. The receipt pins every packet's hash.
   No Core reader is imported during this stage.
4. Only `debate`, after checking the persisted batch and replaying its evidence,
   dynamically imports `scripts/challenger-core-read.mjs`. Core state and thesis
   are read from locked baselines where available, otherwise from the authoritative
   universe's frozen state and reason. The snapshot pins the source record hash,
   source-file Git revision, availability, review/lock time and read time.
5. `lib/challenger-pilot-debate.js` compares the frozen stance with Core and returns
   a research-only result. `scripts/challenger-pilot-records.mjs` verifies references,
   sequencing, timestamps and recomputes the comparison before appending a distinct
   Debate record to `runs.jsonl`. Re-running debate reuses existing results; it
   does not revise the initial hypothesis after seeing Core.

The code enforces the data-access sequence, not a claim that a human analyst can
forget prior knowledge. The actual pilot was authored from source-only bundles,
frozen, and only then inspected against Core. There are no Core callbacks, imports
or narrative parameters in the independent model. All outputs remain inert data.

## Evidence and conclusion gates

Each source excerpt retains its exact text, excerpt SHA-256, URL, publication time,
availability time, Observer event ID/hash, and matching document ID, record hash
and content hash. A document must match the event's company, URL, publication and
observation time. SEC sources require a recorded validated issuer CIK; issuer
sources require explicit article-date provenance. Unlinked or ambiguous records,
old issuer index dates, derived filing notices and unsupported authority fail
closed. Official macro titles need relevant subject matter and remain labelled
title-only context, never standalone economic proof. Exact duplicates are removed;
overlapping excerpts from one release are not independent corroboration.

The adapter does not re-fetch documents or claim that stored excerpts reconstruct
the entire source. Its guarantee is traceability to unchanged existing records.
`verify` replays each stored excerpt/provenance pair against those records. Quote
availability includes manual verification time, a maximum 24-hour freshness gate,
and source timestamps; a quote is not intrinsic value. The cutoff is fixed and
cannot be replaced by observation or execution time. Timezone-less Core review
dates remain UNKNOWN rather than being assigned an invented timezone.

A substantive independent stance requires both evidence FOR and AGAINST,
falsification, mechanism, owner economics, survivability, valuation implication,
catalyst/proof event, contrarian-trap analysis, hypothesis and evidence quality.
Every supplied assessment references admitted source evidence. Two-sided
underwriting cannot consist only of prices or announcement titles. This is a
structural evidence gate, not an automated guarantee that analyst reasoning is
correct. Analyst review remains necessary.

Independent stances are `FAVORABLE`, `UNFAVORABLE`, `NEW_OPPORTUNITY`,
`CONTRARIAN_TRAP`, or `UNKNOWN`. The initial packet can emit NEW_OPPORTUNITY or
CONTRARIAN_TRAP only after all gates pass. FAVORABLE/UNFAVORABLE packets keep their
Core-relative output UNKNOWN until Debate. With a PIT-valid, explicitly typed
Core economic direction, matching stances yield SUPPORT_CORE/LOW; opposing stances
yield CHALLENGE_CORE/HIGH. Existing BUY/WATCH/PROVE IT labels are displayed as Core
state, never converted into an invented economic direction. This pilot's canonical
records do not carry a typed economic direction, so relative classification would
also require an explicit reviewed comparison contract in a later iteration.

HIGH disagreement creates only a REUNDERWRITE priority. All four substantive
states are covered by evidence-complete synthetic tests; none is forced in the
real pilot. All conclusions, including opportunity and trap, retain
`canAuthorizePortfolioAction: false`. The Phase A trade authorization function
continues to throw unconditionally.

## Controlled commands

```
node scripts/challenger-pilot.mjs prepare 2026-09-04T14:25:00Z
node scripts/challenger-pilot.mjs freeze 2026-09-04T14:25:00Z <drafts.json> <unique-batch-id>
node scripts/challenger-pilot.mjs debate <unique-batch-id>
node scripts/challenger-pilot.mjs verify
```

`prepare` emits source-only JSON and blank draft templates to stdout. The analyst
supplies research fields and evidence IDs; drafts cannot add unadmitted facts or
Core fields. Runtime persistence uses only the two existing append-only journals.
The default Phase A runner remains read only. CI verifies historical prefixes and
replays saved Phase B provenance; it never runs prepare/freeze/debate automatically.
No dashboard integration is enabled.

Use a single writer and retain trusted Git prefixes as described in CHALLENGER.md.
An interrupted independent batch may leave unreferenced packets, which are never
debated without a complete batch receipt. Do not remove or revise such history;
use a new batch ID after investigation. This is not an OS sandbox against arbitrary
privileged code or a malicious writer rewriting the journals and their anchors.

## Actual pilot: 4 September 2026

Evidence cutoff: **2026-09-04 14:25:00 UTC**. Batch ID:
`pilot-b-20260904-1425`. Independent batch frozen at
`2026-09-04T14:32:46.615Z`, before Core inspection. Batch hash:
`3ba0e1288e776f70457aceb551fb8af77b52e170c1231e850dcce312250c3a06`.
The journals contain four independent packets, one batch receipt and four separate
Debate records; the latter pin the packet hash and Core read timestamp.

| Company | Core state | Challenger state | Disagreement | Challenged assumption | Strongest FOR | Strongest AGAINST | Falsification / next research |
| --- | --- | --- | --- | --- | --- | --- | --- |
| CLS | Not in authoritative universe | SKIPPED | — | — | — | — | Confirm authoritative inclusion before research |
| FIS | PROVE IT | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN; eligible evidence is only a verified $42.28 close | UNKNOWN | Falsification UNKNOWN. Obtain primary operating results, owner-cash/debt bridge, valuation and counterevidence |
| TNK | Not in authoritative universe | SKIPPED | — | — | — | — | Confirm authoritative inclusion before research |
| IFF | HOLD / BUY LOWER | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN; no eligible operating excerpts | UNKNOWN | Falsification UNKNOWN. Obtain dated filings/results, debt/liquidity, owner economics, valuation and counterevidence |
| AVGO | WATCH | UNKNOWN | UNKNOWN | Research hypothesis: adjusted growth may overstate durable per-share owner earnings when recurring exclusions remain material; no mispricing claim | Stored issuer excerpt excludes SBC and acquisition-related costs from non-GAAP measures | Stored SEC-linked excerpt reports $13.7bn FCF and 46% revenue conversion | Reject hypothesis if reconciliations show recurring exclusions immaterial to sustainable owner cash/share while conversion persists. Obtain full period-labelled reconciliations, dilution, liquidity/debt and independent valuation inputs |
| CRDO | Not in authoritative universe | SKIPPED | — | — | — | — | Confirm authoritative inclusion before research |
| ARM | Not in authoritative universe | SKIPPED | — | — | — | — | Confirm authoritative inclusion before research |
| INTU | BUY | UNKNOWN | UNKNOWN | UNKNOWN | UNKNOWN; eligible evidence is only a verified $349.04 close | UNKNOWN | Falsification UNKNOWN. Obtain PIT-valid operating results, owner earnings, debt/liquidity, valuation and counterevidence |

Core state above is a historical research label, not a new action authorization.
No change was made to INTU sizing restrictions, portfolio actions or holdings.
The AVGO hypothesis is an incomplete research question, not CHALLENGE_CORE or a
negative recommendation. Its survivability and valuation implication remain
explicitly UNKNOWN, so no substantive economic stance passes the gate.

Admitted inputs: FIS 1 price, IFF 0, AVGO 23 SEC-linked excerpts, INTU 1 price.
AVGO excluded 28 records (issuer date provenance, derived notices/sensors and two
unsubstantiated macro relevance matches); INTU excluded 21. Multiple AVGO excerpts
come from the same reporting event, not 23 independent sources. No historical
Core research claims were recycled to fill the independent evidence gaps.

The strongest AVGO FOR excerpt is Observer event
`5a02998d352690c6fbb77329ffd67154f6a921e2b160195b20fc75916eeb3469`;
AGAINST is `b335385da57a3c464773a921440084b3f6e6516cf471b2a96d2a0fb2f1406d6d`.
Both link to the stored [SEC Exhibit 99.1](https://www.sec.gov/Archives/edgar/data/1730168/000173016826000076/avgo-08022026x8kxex99.htm).
The journal preserves the complete excerpts and hashes; no source was fetched anew.

The release integrity record is `CHALLENGER_PHASE_B_INTEGRITY.json`: raw before/after
SHA-256 hashes for all 17 protected Core, baseline, price, proof and Observer
artifacts, relative to approved Phase A commit
`4dec168464999cb1316d550386fea72300435fa7`.

Validation: **115/115 unit tests** (78 existing, 37 Phase B), all four existing
browser suites, syntax checks on 47 modules, trusted-prefix journal verification,
and source/Core replay all passed. The local package scripts were run through
their direct Node equivalents because npm is not on PATH. Browser tests exercised
unchanged dashboard decisions, lock values, portfolio presentation and Observer
behavior in Hebrew/English and desktop/mobile layouts.
