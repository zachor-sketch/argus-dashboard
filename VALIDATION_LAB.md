# ARGUS Validation Lab V1

The Validation Lab is a research-only, append-only measurement layer. It reads existing ARGUS artifacts without modifying Core, Challenger, Radar, Observer, portfolio, universe, baseline, proof history, the authoritative validation ledger or its forward locks. Lab records cannot authorize trades or promote rules.

## Sequence and architecture

`PREDICT → FREEZE → REVEAL → SCORE → DIAGNOSE`

Six modules implement exact schemas, PIT admission, immutable freeze/reveal, fundamental-first scoring, four-way ablation, failure taxonomy, calibration and correlation-aware effective N. Four scripts verify journals, replay the dry run and print the scoreboard. Six independent JSONL journals are hash-chained and anchored to committed Git prefixes. CI has read-only repository credentials.

Historical sources require publication and observation at or before T0 and reject mutable current pages. High hindsight-contamination cases cannot count as clean holdout evidence. Predictions are hashed before outcomes; revealed holdouts cannot become clean again. Fundamental/owner-economics evidence is primary, hard gates are separate, and price is secondary.

## 20-case dry run

The Lab froze exactly 20 anonymized slots across Development (8), Validation (6) and Holdout (6). It accepted **0** and rejected **20**. This is deliberate: the authoritative V10.25 ledger permanently labels the existing historical reconstruction contaminated and diagnostic-only, and the repository contains no separate admissible PIT source packs for a new clean replay. V1 does not invent those packs or relabel old cases.

Output: `VALIDATION_LAB_DRY_RUN` / `NOT_AUTHORIZATION_EVIDENCE`.

Raw N and effective independent N are both 0. Core fundamental score, hard-gate score, confidence calibration, Challenger uplift, Radar uplift and Full ARGUS uplift remain `UNKNOWN`. The recorded failure is `HINDSIGHT_CONTAMINATION` with secondary `EVIDENCE_GAP`. No shadow patch is proposed or implemented.

## Existing forward program

The authoritative ledger is imported read-only: 30 clean forward locks, 0 resolved, first 6M horizon due 2027-03-01. No outcome is scored early. The existing ≥60% gate and minimum resolved requirements are unchanged. Authorization remains `FAIL`; promotion eligibility and trading authority are false.

## Commands

```text
node scripts/validation-lab-verify.mjs
node scripts/validation-lab-replay.mjs
node scripts/validation-lab-scoreboard.mjs
```

The dry run validates the Lab’s fail-closed behavior. It provides no investment-performance evidence and cannot support autonomy or model-rule promotion.
