# ARGUS Challenger V1 — Phase A

Phase A remains the approved `/1` contract below. The opt-in controlled pilot uses
a separate `/2` contract; see [CHALLENGER_PHASE_B.md](CHALLENGER_PHASE_B.md) for its
source-first sequence, evidence gates and audited pilot results.

Challenger is an independent research component. It has no integration with the
Core execution path or dashboard, and no scoring engine, live source retrieval,
portfolio executor, retraining, or recommendation override. No company challenge
or conclusion is generated in Phase A. Both production journals start empty.

## Modules and contracts

| File | Responsibility |
| --- | --- |
| `lib/challenger-model.js` | Versioned packet factory and strict runtime validation; detached, deeply frozen values |
| `challenger/challenge-packet.schema.json` | JSON Schema 2020-12 transport contract for `argus.challenge/1` |
| `lib/challenger-rules.js` | Evidence completeness checks; portfolio authorization always throws |
| `lib/challenger-debate.js` | Independent snapshot-reference comparison and research-priority records |
| `scripts/challenger-store.mjs` | Fixed-destination append-only writer, SHA-256 chains and prefix verification |
| `scripts/challenger-guard.mjs` | Trusted Git-prefix lookup, history verification and protected-file snapshots |
| `scripts/challenger-run.mjs` | Architecture verification only; optional architecture run receipt |
| `challenger/challenges.jsonl` | Challenge packets inside hash-chained envelopes |
| `challenger/runs.jsonl` | Architecture run receipts inside hash-chained envelopes |
| `.github/workflows/challenger.yml` | Separate read-only CI checks; no schedule, scoring, journal writes or push credentials |

No UI module is needed for Phase A. Existing ARGUS decisions and rendering remain
unchanged. The existing Pages staging process copies the new library modules;
Challenger journals are not added to the public deployment artifact.

## Packet schema and unknowns

Every packet requires an ID, ticker, company, creation timestamp, and explicit PIT
evidence cutoff. Missing information is the literal `UNKNOWN`, or an empty evidence
or research-request list. Neither empty evidence side means evidence of absence.

The packet includes a content-hashed Core snapshot reference; market/consensus
belief; contrarian hypothesis; evidence for and against; falsification conditions;
economic mechanism; valuation implication; balance-sheet/survivability; owner
economics; catalyst/proof event; contrarian-trap analysis; evidence quality;
disagreement level; output state; and required next research.

Each supplied assessment has a `value` and nonempty `evidenceRefs`. References must
resolve to evidence in that packet. Each evidence item carries a source reference,
content SHA-256, original fact, publication time and availability time. Both times
must be at or before the cutoff, and publication cannot follow availability.
Core snapshot `asOf` and `availableAt` obey the same cutoff. The cutoff cannot be
later than packet creation. UTC timestamps are explicit and are never replaced
with the current date. Later-discovered historical evidence requires a new packet;
an earlier packet is never backfilled or edited.

The reserved future output states are `SUPPORT_CORE`, `CHALLENGE_CORE`,
`NEW_OPPORTUNITY`, and `CONTRARIAN_TRAP`. **Phase A accepts only `UNKNOWN` as
`outputState`**, even for a fully populated packet. Thus UNKNOWN is an unassessed
sentinel, not a fifth substantive conclusion. A later release must explicitly
change the phase gate before any conclusion can be emitted.

Runtime validation additionally enforces PIT ordering, reference resolution,
duplicate-evidence rejection and phase policy beyond JSON Schema. Source references
and hashes record provenance; this architecture does not authenticate source truth.
Any future ingestion adapter must verify source content, timestamps and identity
before supplying evidence. No fabricated consensus, valuations or research facts
are supplied by the factory or runner.

## Debate and permitted effects

`debate(coreSnapshotRef, packet)` takes independent detached inputs. The reference
must match the packet's Core reference exactly. It never calls Core or changes its
state. Explicit, evidence-backed HIGH disagreement returns an immutable
`researchPriority` record with `kind: REUNDERWRITE` and `priority: HIGH`, preserving
the challenge ID, evidence references and PIT cutoff in the debate result.
Missing evidence is reported as `INSUFFICIENT_EVIDENCE`; it cannot become support,
a challenge conclusion, or a trade. A priority record only requests investigation,
including when the rest of the packet is incomplete. Lower or unknown disagreement
does not create a high-priority record.

Phase A returns debate records in memory; it does not publish them into Observer,
Core or portfolio queues. They can be reproduced from the immutable challenge
packet. Research requests accept only `RESEARCH` and `REUNDERWRITE`. No structured
BUY/SELL/TRIM/ADD action field is accepted, and `authorizePortfolioAction` always
throws. Quoted evidence may contain trading words; prose is inert data and is never
parsed into executable actions.

## Write boundaries and journal integrity

Only `challenges.jsonl` and `runs.jsonl` are accepted by the Challenger writer, under
the supplied repository root's `challenger/` directory. Arbitrary paths, traversal,
symlink/junction redirects and hardlinked journal files are rejected. All other
tracked repository files are protected by the runner's before/after byte comparison,
including Core, baseline, prices, imported proof history and Observer journals.

Each journal envelope has a monotonically increasing sequence, previous hash,
payload, and SHA-256 over canonical JSON of those three fields. IDs are unique
within each journal. Appends validate all prior records before writing, use append
mode, fsync the file and verify the result. An interrupted partial record fails
closed; do not silently truncate it or reconstruct history.

A hash chain alone cannot detect deletion of an entire valid tail or a fully
rehashed history. Verification therefore requires a trusted prior prefix. The
runner reads it from committed Git history and refuses unresolved commits. CI
compares against the push's previous commit or PR base commit. Git CRLF/LF checkout
normalization is allowed; journal content changes are not. Preserve reviewed Git
history and an external trusted commit/checkpoint: a privileged actor rewriting
both journals and their trusted anchor is outside this application's guarantees.
Uncommitted appends must retain their prior prefix externally until committed.

The writer assumes a single authorized writer with exclusive access to its
namespace; it is not a hostile-process filesystem sandbox or multi-process
transaction system. Do not run concurrent writers. Future production execution
must mount Core, proof artifacts and Observer read-only, grant writes only to the
two journal files, serialize appends, and preserve external checkpoints. CI grants
no repository write token. Node modules do not grant arbitrary code OS isolation.

## Running and governance

```
node scripts/challenger-run.mjs
node scripts/challenger-guard.mjs HEAD
node --test tests/*.test.js
node scripts/check.cjs
```

The default runner is read only. `--record-run` optionally appends an
`ARCHITECTURE_ONLY` / `VERIFIED_NO_SCORING` receipt to `runs.jsonl`; it never creates
a Challenge Packet. Other CLI arguments, including live-scoring flags, fail closed.
This release does not run `--record-run` against production journals.

Future Core outputs, Observer evidence, coverage, verified prices, company research,
portfolio constraints and research shadows can be supplied only through read-only
adapters with PIT provenance. No such adapter is enabled in Phase A. Any future
integration requires explicit review of source verification, phase activation,
write permissions and human research routing. Challenger output has no authority
over Core recommendations, canonical valuations or portfolio actions.

The regression suite covers immutable inputs, write destinations, Core/Observer
byte preservation, forbidden actions, absent evidence, PIT leakage, malformed
records, hash edits, reordered records, tail truncation, rehashed histories,
hardlinks/junctions and read-only CI. Existing baseline hash tests remain intact.

Phase A release validation passed 78 unit tests (49 existing, 29 Challenger), all
four existing browser suites (`browser`, `market-browser`, `observer-browser`,
`ui-polish`), and syntax checks on 41 application modules. Local validation used
the direct Node equivalents of the package scripts because npm was not on PATH.
`CHALLENGER_PHASE_A_INTEGRITY.json` records matching before/after raw SHA-256 hashes
for 17 protected artifacts relative to starting commit
`83291af67046d433fe091adacff8629de2918d0c`. This is a release audit record, not a
replacement canonical baseline or validation ledger.

See [Phase B.1 discovery lanes, governance and frozen pilot results](CHALLENGER_PHASE_B1.md).

See [Phase C underwriting evidence, gates and frozen pilot](CHALLENGER_PHASE_C.md).

Phase C.1 extends the existing underwriting recipe with company-specific signed adjustment bridges and reviewed public quote fallback. It adds no journal namespace or company. Incomplete bridge subtotals cannot become normalized earnings; TNK requires fleet NAV/TCE underwriting. Quotes alone cannot authorize valuation without share, cash/debt and other-claims reviews. See the [C.1 pilot and exact remaining UNKNOWN fields](CHALLENGER_PHASE_C1.md) and [integrity proof](CHALLENGER_PHASE_C1_INTEGRITY.json).
