# Challenger Phase B.1 governance and pilot

Phase B.1 adds two separated research lanes. It does not change ARGUS decisions. All eight pilot outputs remain UNKNOWN; no candidate was promoted and no trade was authorized.

## Architecture

`lib/challenger-evidence-completion.js` indexes only already-admitted primary Observer excerpts into liquidity, owner-economics, working-capital and valuation research topics. Prices cannot substitute for operating evidence. Source coverage is an aid to underwriting, never a conclusion. FIS, IFF and INTU have no eligible operating primary excerpts in the current local adapter output; AVGO has partial evidence. Core narratives are never recycled.

`lib/challenger-discovery.js` defines strict versioned schemas and research-only routing. `scripts/challenger-lane-store.mjs` enforces fixed destinations, immutable chains, committed-prefix anchors, source identity, packet/source replay and candidate exclusion from canonical membership. `scripts/challenger-b1.mjs` provides separate preparation, freeze, debate and verification commands.

New append-only namespaces under `challenger/`:

| File | Purpose |
|---|---|
| discovery/candidates.jsonl | External identity registry, never canonical membership |
| discovery/evidence.jsonl | Reviewed public primary-source claims and provenance |
| discovery/packets.jsonl | Frozen independent external views |
| discovery/runs.jsonl | Separate research queue records |
| core/coverage.jsonl | Source-only coverage pinned to frozen Core-lane batch |

Core-lane independent packets and subsequent debates retain the existing Phase B `challenges.jsonl` and `runs.jsonl` formats. All eight B.1 packets were persisted before the B.1 Core debate. External packets cannot enter those legacy journals. Core membership lookup exposes only company identity; Core narrative snapshots are loaded only by the later debate operation. HIGH disagreement continues to request RESEARCH/REUNDERWRITE only.

## Schema and source contract

Runtime validators are the authoritative schemas: unknown fields are rejected. `argus.external-candidate/1` requires ticker, company, registration time, EXTERNAL_CANDIDATE label, SEC CIK, issuer hosts and two observed identity sources. The current source adapter covers SEC-reporting issuers; another regulatory jurisdiction requires an explicitly reviewed adapter extension.

`argus.discovery-source/1` binds the candidate hash, regulatory/issuer URL, publication time and precision, retrieval time/method, curated claim facts, source locators and coverage dimensions. The SHA-256 digest covers curated facts, **not the original web document**. These are manually reviewed public sources; no autonomous scraper, access bypass or historical backdating was added. Date-only publications use a conservative UTC day-end bound. Evidence is eligible only after both publication and actual review, preserving PIT availability.

`argus.discovery-packet/1` retains every Phase A assessment and evidence field, adding lane, external classification, candidate hash, frozen source bundle/hash and coverage. Core snapshot and disagreement must remain UNKNOWN. External states are only UNKNOWN, NEW_OPPORTUNITY or CONTRARIAN_TRAP. Every substantive state requires both evidence sides, all substantive assessments and regulatory, issuer, liquidity, FCF/share, dilution, capex, working-capital and timestamped valuation coverage. Field coverage does not itself establish economic sufficiency; reviewed underwriting is still required.

NEW_OPPORTUNITY creates an inert ZERO_BASED_UNDERWRITING research queue record. It cannot authorize BUY/SELL/TRIM/ADD or onboard a company. Promotion requires a later explicit reviewed onboarding process outside this architecture. All writes remain confined to Challenger journals; canonical engine, universe, holdings, valuation, Observer journals and proof history are protected. The writer rejects traversal, symlinks/junctions and hardlinks. Git prefix anchors detect committed-tail truncation; uncommitted tails require an external trusted checkpoint to detect complete removal, as with Phase A/B.

## Reproduction and validation

Use `node scripts/challenger-b1.mjs prepare-core <cutoff>` or `prepare-external <cutoff>` for source-only preparation; then `freeze-core` / `freeze-external` with reviewed draft JSON and unique batch IDs. Only after freezing invoke `debate-core <batchId>`. `verify` replays existing records without scoring, fetching or writing. Registration and capture use reviewed JSON through `register` and `capture`; records are appended rather than edited.

Validation: 153 unit tests (115 existing plus 38 new), all passing, plus all four existing browser suites. Tests cover external membership exclusion, forbidden states/actions, source identity/hash binding, PIT, missing evidence dimensions, packet-before-route sequencing, protected destinations, links, journal edits/truncation and independent source preparation. The integrity manifest records before/after raw SHA-256 values for every protected Core/Observer/proof artifact.

## Pilot results

The following comparison is generated from the frozen records. UNKNOWN means insufficient evidence, not agreement, disagreement or a trading view. A hypothesis below is a research question, not a proven consensus belief. No independently evidenced market-consensus belief was established for any company.

Evidence cutoff: `2026-09-04T15:30:18.389Z`. All external candidates remain EXTERNAL_CANDIDATE. Disagreement is UNKNOWN throughout.

### FIS

| Field | Frozen result |
|---|---|
| Lane | CORE_CHALLENGE |
| Independent state | UNKNOWN |
| Core state | PROVE IT |
| Challenged assumption | UNKNOWN |
| Strongest evidence FOR | UNKNOWN |
| Strongest evidence AGAINST | UNKNOWN |
| Owner-economics concern | UNKNOWN |
| Valuation implication | UNKNOWN |
| Falsification condition | UNKNOWN |
| Contrarian-trap result | UNKNOWN |
| Required next research | Obtain PIT-valid operating, owner-earnings, debt, valuation and counterevidence inputs before concluding. |

### IFF

| Field | Frozen result |
|---|---|
| Lane | CORE_CHALLENGE |
| Independent state | UNKNOWN |
| Core state | HOLD / BUY LOWER |
| Challenged assumption | UNKNOWN |
| Strongest evidence FOR | UNKNOWN |
| Strongest evidence AGAINST | UNKNOWN |
| Owner-economics concern | UNKNOWN |
| Valuation implication | UNKNOWN |
| Falsification condition | UNKNOWN |
| Contrarian-trap result | UNKNOWN |
| Required next research | Obtain PIT-valid operating, owner-earnings, debt, valuation and counterevidence inputs before concluding. |

### AVGO

| Field | Frozen result |
|---|---|
| Lane | CORE_CHALLENGE |
| Independent state | UNKNOWN |
| Core state | WATCH |
| Challenged assumption | Adjusted performance may overstate owner economics if recurring exclusions consume shareholder value. |
| Strongest evidence FOR | AP basis. This non-GAAP information excludes amortization of acquisition-related intangible assets, stock-based compensation expense, restructuring and other charges, acquisition-related costs, including integration costs, non-GAAP tax reconciling adjustments, and other adjustments. Management does not believe that these items are reflective of the Company&#8217;s underlying performance. Internally, these non-GAAP measures are significant measures used by management for purposes of evaluating th ([primary source](https://www.sec.gov/Archives/edgar/data/1730168/000173016826000076/avgo-08022026x8kxex99.htm)) |
| Strongest evidence AGAINST | capital expenditures of $0.5 billion, resulted in $13.7 billion of free cash flow, or 46 percent of revenue &#8226; Quarterly common stock dividend of $0.65 per share &#8226; Fourth quarter fiscal year 2026 revenue guidance of approximately $34.8 billion, an increase of 93 percent from the prior year period &#8226; Fourth quarter fiscal year 2026 Non-GAAP operating income guidance of approximately 66 percent of projected revenue (1) PALO ALTO, Calif. &#8211; September 2, 2026 &#8211; Broadcom In ([primary source](https://www.sec.gov/Archives/edgar/data/1730168/000173016826000076/avgo-08022026x8kxex99.htm)) |
| Owner-economics concern | Reconcile stock compensation and acquisition-related exclusions with per-share owner cash. |
| Valuation implication | UNKNOWN |
| Falsification condition | Reject this concern if recurring cash per diluted share supports adjusted performance after all recurring costs. |
| Contrarian-trap result | UNKNOWN |
| Required next research | Obtain PIT-valid operating, owner-earnings, debt, valuation and counterevidence inputs before concluding. |

### INTU

| Field | Frozen result |
|---|---|
| Lane | CORE_CHALLENGE |
| Independent state | UNKNOWN |
| Core state | BUY |
| Challenged assumption | UNKNOWN |
| Strongest evidence FOR | UNKNOWN |
| Strongest evidence AGAINST | UNKNOWN |
| Owner-economics concern | UNKNOWN |
| Valuation implication | UNKNOWN |
| Falsification condition | UNKNOWN |
| Contrarian-trap result | UNKNOWN |
| Required next research | Obtain PIT-valid operating, owner-earnings, debt, valuation and counterevidence inputs before concluding. |

### CLS

| Field | Frozen result |
|---|---|
| Lane | EXTERNAL_DISCOVERY |
| Independent state | UNKNOWN |
| Core state | Not applicable |
| Challenged assumption | Growth may fail to improve owner cash per share after capacity investment and financing dilution. |
| Strongest evidence FOR | Q2 2026 operating cash flow was USD410.9m and capex USD263.8m; company-defined FCF was USD147.1m. Dividing by 116.2m diluted weighted-average shares gives approximately USD1.266 per share, not normalized owner earnings. ([primary source](https://www.sec.gov/Archives/edgar/data/1030894/000103089426000043/cls-20260630prcondensedfs.htm)) |
| Strongest evidence AGAINST | Q2 revenue was USD4.70bn, up 62% year over year. ([primary source](https://www.sec.gov/Archives/edgar/data/1030894/000103089426000043/cls-20260630prcondensedfs.htm)) |
| Owner-economics concern | Normalize working-capital funding and the August share issuance before evaluating owner returns. |
| Valuation implication | UNKNOWN |
| Falsification condition | Reject the concern if sustained post-offering cash generation per share rises after recurring investment needs. |
| Contrarian-trap result | UNKNOWN |
| Required next research | Obtain current verified market inputs, a post-offering share bridge and normalized working-capital/capex underwriting. |

### TNK

| Field | Frozen result |
|---|---|
| Lane | EXTERNAL_DISCOVERY |
| Independent state | UNKNOWN |
| Core state | Not applicable |
| Challenged assumption | Exceptional tanker-cycle earnings may overstate sustainable owner economics. |
| Strongest evidence FOR | Q2 net income was USD225.9m, including USD32.3m vessel-sale gains; exceptional spot rates reflected Strait of Hormuz disruption. These earnings are not FCF per share. ([primary source](https://www.sec.gov/Archives/edgar/data/1419945/000141994526000054/tnkq2-26erdocument.htm)) |
| Strongest evidence AGAINST | Liquidity was approximately USD1.3bn: USD735m cash, USD476.6m short-term investments and USD97.6m undrawn facilities. Two newbuild contracts total USD190m, with USD156.6m remaining. ([primary source](https://www.sec.gov/Archives/edgar/data/1419945/000141994526000054/tnkq2-26erdocument.htm)) |
| Owner-economics concern | Separate vessel-sale gains, drydock spending and newbuild commitments from recurring cash generation. |
| Valuation implication | UNKNOWN |
| Falsification condition | Reject the concern if normalized freight conditions still support durable per-share cash returns after fleet renewal. |
| Contrarian-trap result | UNKNOWN |
| Required next research | Obtain cycle-normalized FCF/share, dilution and working-capital data, fleet NAV and timestamped valuation inputs. |

### CRDO

| Field | Frozen result |
|---|---|
| Lane | EXTERNAL_DISCOVERY |
| Independent state | UNKNOWN |
| Core state | Not applicable |
| Challenged assumption | Rapid revenue growth may overstate owner cash conversion after stock compensation, working capital and acquisition spending. |
| Strongest evidence FOR | Quarter ended August 1 operating cash flow was USD90.231m, capex USD7.282m and diluted average shares 194.378m versus 184.577m. Simple CFO less capex per diluted share is approximately USD0.427, before other obligations and normalization. ([primary source](https://www.sec.gov/Archives/edgar/data/1807794/000162828026060111/crdo-20260801.htm)) |
| Strongest evidence AGAINST | Cash of USD466.869m plus short-term investments of USD297.389m totaled USD764.258m. ([primary source](https://www.sec.gov/Archives/edgar/data/1807794/000162828026060111/crdo-20260801.htm)) |
| Owner-economics concern | Reconcile diluted shares, stock compensation and acquisition obligations to normalized FCF per share. |
| Valuation implication | UNKNOWN |
| Falsification condition | Reject the concern if sustained cash conversion improves after recurring working-capital, dilution and integration costs. |
| Contrarian-trap result | UNKNOWN |
| Required next research | Obtain independent valuation inputs and a normalized per-share cash bridge including acquisition obligations. |

### ARM

| Field | Frozen result |
|---|---|
| Lane | EXTERNAL_DISCOVERY |
| Independent state | UNKNOWN |
| Core state | Not applicable |
| Challenged assumption | A strong cash quarter may not represent repeatable owner cash generation after timing effects and dilution. |
| Strongest evidence FOR | Quarterly CFO was USD902m and company-defined FCF USD665m after capex USD197m, intangible purchases USD11m and obligation payments USD29m. Collections and tax timing boosted cash flow. ([primary source](https://investors.arm.com/node/8356/html)) |
| Strongest evidence AGAINST | Revenue rose to USD1289m from USD1053m; cash plus short-term investments totaled USD3888m. ([primary source](https://investors.arm.com/node/8356/html)) |
| Owner-economics concern | Normalize collections and tax timing, stock compensation and share withholding before capitalizing cash flow. |
| Valuation implication | UNKNOWN |
| Falsification condition | Reject the concern if subsequent quarters sustain normalized cash per diluted share after recurring investment and dilution. |
| Contrarian-trap result | UNKNOWN |
| Required next research | Obtain timestamped valuation inputs and a multi-quarter normalized owner-cash bridge. |
