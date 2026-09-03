import { deepFreeze } from "../lib/integrity.js";
export const PROOF_LEDGER = deepFreeze({
  "ledger": {
    "protocol": {
      "version": "V10.25",
      "launched": "2026-09-01",
      "targetLockedDecisions": 100,
      "promotionGatePct": 60,
      "minimumResolvedHoldout": 30,
      "scoreWeights": {
        "fundamentalValueOutcome": 0.6,
        "hardGateAccuracy": 0.25,
        "priceAlpha": 0.15
      },
      "errorCosts": {
        "FALSE_BUY": 5,
        "FALSE_HOLD": 3,
        "FALSE_NO_ACTION": 1.5,
        "FALSE_SELL": 2.5
      },
      "errorTaxonomy": [
        "VALUATION",
        "BUSINESS_UNDERSTANDING",
        "MACRO_REGIME",
        "MANAGEMENT_CAPITAL_ALLOCATION",
        "ACCOUNTING_FORENSIC",
        "DATA_QUALITY",
        "TIMING",
        "OVERCONFIDENCE",
        "PORTFOLIO_SIZING"
      ],
      "historicalReplay": {
        "status": "HISTORICAL 100/100 CORE-RECONSTRUCTED — DIAGNOSTIC ONLY; HISTORICAL HOLDOUT CONTAMINATED",
        "targetCases": 100,
        "resolvedCases": 100,
        "rules": [
          "Information-time lock: only evidence published by the replay date may be used.",
          "No later filings, revised guidance or future price paths may enter the model.",
          "Decision thresholds and success criteria are frozen before revealing the forward period.",
          "Model changes are tested on development history first and promoted only if holdout performance is not degraded."
        ],
        "lockedCases": 20,
        "coreRevealedCases": 20,
        "fullEligibleCases": 0,
        "developmentCoreScorePct": 89.9,
        "passPartialFail": {
          "PASS": 13,
          "PARTIAL": 4,
          "FAIL": 3
        },
        "selectionBiasWarning": "This first 20-case batch is curated across known archetypes and is therefore Development evidence, not a random or sealed holdout. The next 80 historical cases must be stratified/pre-registered from the existing universe before reveal.",
        "selectedCases": 100,
        "developmentCases": 60,
        "validationCases": 20,
        "holdoutCases": 20,
        "developmentRevealed": 20,
        "developmentQueued": 40,
        "validationSealed": 20,
        "holdoutSealed": 20,
        "selectionLockFile": "ARGUS_Historical80_CaseSelection_Lock_V10_20.json",
        "selectionMasterSha256": "a9d66863404ffd36056aa4319c4173ad62fe5faf6dcb771acac8c67d90a39b07"
      },
      "benchmarks": {
        "INTU": [
          "SPY",
          "IGV"
        ],
        "NVDA": [
          "SPY",
          "SOXX"
        ],
        "FIS": [
          "SPY",
          "XLK"
        ],
        "CRM": [
          "SPY",
          "IGV"
        ]
      },
      "governance": {
        "rule": "No engine rule is promoted because it sounds sensible. Every change must have a version, rationale, expected failure mode and holdout comparison.",
        "gate": "Automation/API authorization remains blocked until the pre-registered out-of-sample framework reaches at least 60% on forward fundamental/value outcomes and hard-gate accuracy.",
        "antiOverfit": "A rule that improves development/backtest performance but weakens holdout is rejected."
      },
      "forwardProgram": {
        "status": "FORWARD COHORT 01 LOCKED — 30/100 CLEAN DECISIONS; 0 RESOLVED",
        "cleanForwardLocked": 30,
        "newUniqueLocksInFC01": 26,
        "carriedExistingLocks": 4,
        "resolved": 0,
        "target": 100,
        "minimumResolvedForGate": 30,
        "promotionGatePct": 60,
        "first6mDue": "2027-03-01",
        "cohortId": "FC01",
        "cohortSha256": "4809893161a27af500d7c6e4c5a67b41a853614134f55083b50c9e726cdee080",
        "shadowSha256": "9697727bf855047003c60241a0b02dbf03f567836e410887d9d807dbaafb219a",
        "duplicatePolicy": "INTU, NVDA, FIS and CRM were already clean-locked on 2026-09-01. They are incorporated into FC01 for one coherent 30-name cohort but are not counted as new locks.",
        "authorizationEligible": false,
        "reason": "No clean forward outcome has reached a pre-registered horizon; historical diagnostics remain ineligible after contamination audit."
      },
      "independenceOverlay": {
        "effectiveObservationEstimate": 40.65,
        "rawForwardLocks": 60,
        "effectiveObservationGoal": 100,
        "rule": "Accuracy and resolved-outcome summaries must report correlation-adjusted weights; raw rows are never described as independent trials."
      },
      "eventMonitoring": {
        "status": "ACTIVE — DAY-0 60/60 SCAN COMPLETE",
        "day0QueueFile": "ARGUS_Day0_Event_Queue_V10_25.json",
        "scanCutoff": "2026-09-01T19:51:03+03:00",
        "companiesScanned": 60,
        "snapshotRequired": 0,
        "killThesis": 0,
        "newSnapshotsCreated": 0,
        "queueSha256": "c63dcb4f922253ea3c4cfcb1e55513d9539c556a9d51543e3acc333720842bfd",
        "nextMode": "DAILY 03:00 ASIA/JERUSALEM + event-driven review"
      }
    },
    "lockedBaselines": {
      "INTU": {
        "id": "ARGUS-20260901-INTU-V1017",
        "lockedAt": "2026-09-01T13:30:00+03:00",
        "sourceVersion": "V10.17 LIVE",
        "decision": "BUY",
        "action": "BUY / ADD",
        "price": 359.3,
        "engineScore": 82,
        "intrinsicValueRange": "$385–475",
        "expectedValue": 425,
        "thesis": "Owner cash compounding remains durable despite FY27 growth reset; valuation offers enough protection if GBS and TurboTax moat hold.",
        "forwardTests": [
          {
            "horizon": "6M",
            "due": "2027-03-01",
            "success": "GBS remains near the FY27 13–14% guide or the shortfall is clearly cyclical; owner cash/share remains healthy; no structural TurboTax pricing impairment.",
            "failure": "Structural GBS slowdown plus weaker owner cash/share, or a verified policy/AI moat break."
          },
          {
            "horizon": "12M",
            "due": "2027-09-01",
            "success": "Per-share owner earnings/FCF supports at least the lower end of the locked IV range and capital allocation remains per-share accretive.",
            "failure": "Normalized IV falls >20% from the locked base primarily from structural business deterioration rather than discount-rate noise."
          },
          {
            "horizon": "24M",
            "due": "2028-09-01",
            "success": "Economic engine remains intact and normalized per-share value compounds positively from the locked baseline.",
            "failure": "Permanent moat erosion or capital allocation destroys per-share value despite reported growth."
          }
        ],
        "sha256": "936f6e0ebed80f1dfb7d272a71ef3091d7a6212372fc4eb555fc3d52fa84b8a0"
      },
      "NVDA": {
        "id": "ARGUS-20260901-NVDA-V1017",
        "lockedAt": "2026-09-01T13:30:00+03:00",
        "sourceVersion": "V10.17 LIVE",
        "decision": "WAIT",
        "action": "NO ACTION",
        "price": 220.78,
        "engineScore": 66,
        "intrinsicValueRange": "$205–290",
        "expectedValue": 249,
        "thesis": "Business quality is exceptional, but normalized-cycle duration and AI customer ROI do not yet justify the risk-adjusted entry gate.",
        "forwardTests": [
          {
            "horizon": "6M",
            "due": "2027-03-01",
            "success": "Revenue/margins remain strong without evidence that customer ROI or platform share is deteriorating; WAIT is validated if price still embeds more duration than evidence supports.",
            "failure": "A much stronger normalized-ROI case emerges while ARGUS remains inactive at an attractive price without updating its evidence gate."
          },
          {
            "horizon": "12M",
            "due": "2027-09-01",
            "success": "Normalized FCF and platform share can be reconciled to the locked risk-adjusted valuation; no permanent export/TAM impairment is ignored.",
            "failure": "ARGUS materially underestimates durable normalized cash generation and misses a clearly attractive entry because of excessive cycle pessimism."
          },
          {
            "horizon": "24M",
            "due": "2028-09-01",
            "success": "Decision quality is judged on normalized business value and alpha versus SOXX/SPY, not merely whether the stock rose.",
            "failure": "Persistent false-negative evidence: business value compounds far above the locked model with no corresponding rise in permanent-loss risk."
          }
        ],
        "sha256": "2f069f4e982a1dcd41474be765109e14e31112dde12eb84a607bc16754bf8139"
      },
      "FIS": {
        "id": "ARGUS-20260901-FIS-V1017",
        "lockedAt": "2026-09-01T13:30:00+03:00",
        "sourceVersion": "V10.17 LIVE",
        "decision": "PROVE IT",
        "action": "NO ACTION",
        "price": 40.77,
        "engineScore": 52,
        "intrinsicValueRange": "$48–60",
        "expectedValue": 54,
        "thesis": "Cheapness is insufficient; the investment must prove that FCF reaches equity via deleveraging and disciplined capital allocation.",
        "forwardTests": [
          {
            "horizon": "6M",
            "due": "2027-03-01",
            "success": "Reported debt/net leverage declines and FCF reconciliation remains clean; no material debt-funded M&A before repair.",
            "failure": "Leverage stalls/rises, FCF exclusions expand, or management resumes acquisition-led balance-sheet risk."
          },
          {
            "horizon": "12M",
            "due": "2027-09-01",
            "success": "Clear progress toward ~2.8x leverage with pro-forma growth sufficient to support normalized FCF.",
            "failure": "Value-trap pattern: low multiple persists because growth/FCF-to-equity weakens or leverage remains elevated."
          },
          {
            "horizon": "24M",
            "due": "2028-09-01",
            "success": "If upgraded later, the upgrade must be traceable to reported deleveraging evidence and positive per-share value creation.",
            "failure": "ARGUS upgrades on valuation alone before the capital-allocation gate is actually repaired."
          }
        ],
        "sha256": "d11275b6ab0b658d4d2d02e1a062d0c3d87cb43fe7c140a9fbff7fd968d03bcf"
      },
      "CRM": {
        "id": "ARGUS-20260901-CRM-V1017",
        "lockedAt": "2026-09-01T13:30:00+03:00",
        "sourceVersion": "V10.17 LIVE",
        "decision": "WATCH",
        "action": "NO ACTION",
        "price": 261.61,
        "engineScore": 71,
        "intrinsicValueRange": "$240–300",
        "expectedValue": 269,
        "thesis": "Recurring demand is solid, but organic AI monetization and per-share FCF must outrun acquisition contribution, SBC and the more levered capital structure.",
        "forwardTests": [
          {
            "horizon": "6M",
            "due": "2027-03-01",
            "success": "cRPO stays roughly >=12% and paid AI usage begins to appear in organic metrics; acquisition contribution is separately reconciled.",
            "failure": "Headline growth remains dependent on acquisitions/investment gains while organic per-share economics weaken."
          },
          {
            "horizon": "12M",
            "due": "2027-09-01",
            "success": "FCF/share improves after SBC and debt effects, with debt stable or falling and paid AI economics measurable.",
            "failure": "Seat compression, SBC/M&A or leverage prevent per-share value compounding despite product adoption."
          },
          {
            "horizon": "24M",
            "due": "2028-09-01",
            "success": "Normalized organic value compounds and any BUY upgrade would have been supported by pre-existing evidence, not hindsight.",
            "failure": "ARGUS confuses AI narrative/headline EPS with durable organic owner economics."
          }
        ],
        "sha256": "ad80cf822da8cac01a70e8ff2b4696d20e67148b1b017d6857ce31f5ee781d16"
      }
    },
    "modelGovernanceLog": [
      {
        "from": "V10.17",
        "to": "V10.18",
        "date": "2026-09-01",
        "changeType": "VALIDATION ARCHITECTURE",
        "decisionImpact": "NONE — V10.17 decisions are preserved as locked baselines",
        "rationale": "Require falsifiable forward tests, error-cost accounting and holdout proof before claiming model improvement.",
        "promotionTest": "No investment rule changed in V10.18; future changes require development evidence plus non-degrading holdout results."
      },
      {
        "from": "V10.18",
        "to": "V10.19",
        "date": "2026-09-01",
        "changeType": "DEVELOPMENT REPLAY EVIDENCE",
        "decisionImpact": "NONE — no investment rule promoted",
        "rationale": "Reveal and score the first 20 information-time-locked historical development cases; identify failure patterns without changing rules on trigger cases.",
        "promotionTest": "All three proposed improvements remain PROPOSED until tested outside their triggering cases and later against sealed validation/holdout."
      },
      {
        "from": "V10.19",
        "to": "V10.20",
        "date": "2026-09-01",
        "changeType": "HISTORICAL CASE-SELECTION LOCK",
        "decisionImpact": "NONE — no engine rule changed",
        "rationale": "Lock all remaining historical cases and cutoffs before reconstructing snapshots, preventing outcome-driven case substitution.",
        "promotionTest": "Development proposals remain unpromoted; Validation and Holdout cases remain sealed."
      },
      {
        "from": "V10.21",
        "to": "V10.22",
        "date": "2026-09-01",
        "changeType": "HISTORICAL VALIDATION/HOLDOUT COMPLETION + INTEGRITY AUDIT",
        "decisionImpact": "NONE — current live investment decisions unchanged",
        "rationale": "Finish all 100 historical core tests, explicitly flag prior-artifact contamination, and fail closed on authorization.",
        "promotionTest": "No proposal promoted; all candidate rules remain shadow-only until clean forward evidence."
      },
      {
        "from": "V10.22",
        "to": "V10.23",
        "date": "2026-09-01",
        "changeType": "FORWARD PROOF EXPANSION",
        "decisionImpact": "26 new clean forward locks; 4 existing locks incorporated without double-counting; no production rule promoted.",
        "rationale": "Create a diversified clean forward cohort with frozen 6/12/24M tests and a separate shadow engine for unpromoted historical proposals.",
        "promotionTest": "Official authorization remains blocked until at least 30 clean forward outcomes resolve and pre-registered proof score is >=60%; target 100 locked decisions."
      },
      {
        "from": "V10.23",
        "to": "V10.24",
        "date": "2026-09-01",
        "changeType": "FORWARD COHORT + INDEPENDENCE + EVENT-DRIVEN PROTOCOL",
        "decisionImpact": "30 new clean forward baselines; no historical/shadow rule promoted",
        "rationale": "Increase sector breadth while preventing same-date/factor correlation from masquerading as independent evidence; formalize immutable event-driven updates.",
        "promotionTest": "No authorization until original clean-forward gate resolves; effective N is an additional integrity overlay."
      },
      {
        "from": "V10.24",
        "to": "V10.25",
        "date": "2026-09-01",
        "changeType": "DAY-0 LIVE MONITORING ACTIVATION",
        "decisionImpact": "NONE — 0 qualifying post-lock events; all 60 parent decisions preserved",
        "rationale": "Run the first live evidence queue under EDL-01 and fail closed on same-day items without verified post-lock timestamps.",
        "promotionTest": "No model rule promoted; no new independent observation counted."
      }
    ],
    "historicalDevelopmentReplay20": {
      "ledgerFile": "ARGUS_Blind_Historical_Ledger_V10_19.json",
      "summary": {
        "phase": "Development",
        "selectedBeforeReveal": 20,
        "preRevealHashesPreserved": true,
        "coreRevealed": 20,
        "officialAccuracyEligible": 0,
        "statusCounts": {
          "PASS": 13,
          "PARTIAL": 4,
          "FAIL": 3
        },
        "avgFundamentalScore": 88.8,
        "avgHardGateScore": 92.5,
        "coreScorePct": 89.9,
        "diagnosticWithPriceSignalPct": 85.8,
        "officialProofScore": null,
        "warning": "Development replay only. Price/benchmark component is a secondary diagnostic and is not fully reconciled; these cases cannot satisfy the 60% holdout promotion gate."
      },
      "failureReview": {
        "failurePatternCounts": {
          "TIMING": 2,
          "VALUATION": 3,
          "MACRO_REGIME": 2
        },
        "primaryFinding": "The dominant weakness is false-negative conservatism: ARGUS can over-penalize valuation or wait too long for re-proof when high-quality economics are accelerating or a depressed cycle is inflecting.",
        "secondaryFinding": "Hard-gate discipline performed well on genuine structural/fatal-unknown cases (e.g., Boeing, PayPal, Intel, IFF), so the evidence argues against weakening hard gates globally.",
        "selectionBiasWarning": "This first 20-case batch is curated across known archetypes and is therefore Development evidence, not a random or sealed holdout. The next 80 historical cases must be stratified/pre-registered from the existing universe before reveal.",
        "proposedImprovements": [
          {
            "id": "PI-01",
            "status": "PROPOSED — NOT PROMOTED",
            "pattern": "VALUATION false negatives",
            "rule": "For elite compounders, require reverse-valuation evidence of truly extreme expectations before NO ACTION solely because the multiple is premium; explicitly compare moat duration and reinvestment runway.",
            "triggerCases": [
              "TSLA",
              "CRM",
              "COST"
            ],
            "validationNeeded": "Test on non-triggering premium-quality cases before any engine rule changes."
          },
          {
            "id": "PI-02",
            "status": "PROPOSED — NOT PROMOTED",
            "pattern": "Cycle inflection underreaction",
            "rule": "In deeply depressed cyclicals with strong survival, supply discipline and replacement economics, allow a small starter allocation before full earnings normalization instead of binary zero capital.",
            "triggerCases": [
              "XOM"
            ],
            "validationNeeded": "Test on at least 10 non-triggering cyclical cases including failures/value traps."
          },
          {
            "id": "PI-03",
            "status": "PROPOSED — NOT PROMOTED",
            "pattern": "Post-shock re-entry delay",
            "rule": "After a thesis shock and major price reset, re-underwrite from the new price and normalized economics rather than anchoring to the pre-shock thesis break.",
            "triggerCases": [
              "NFLX"
            ],
            "validationNeeded": "Test on multiple post-crash recoveries and permanent impairments."
          }
        ]
      }
    },
    "historicalCaseSelectionLock80": {
      "file": "ARGUS_Historical80_CaseSelection_Lock_V10_20.json",
      "counts": {
        "priorDevelopmentReplays": 20,
        "newDevelopmentSelected": 40,
        "validationSelected": 20,
        "holdoutSelected": 20,
        "historicalProgramSelectedTotal": 100
      },
      "masterSelectionSha256": "a9d66863404ffd36056aa4319c4173ad62fe5faf6dcb771acac8c67d90a39b07",
      "selectionRule": "40 Development cases selected deterministically by SHA-256 rank from remaining Development universe after excluding tickers already used in Blind20; all 20 Validation and all 20 Holdout companies are included. Cutoffs assigned deterministically from a fixed trading-date pool with minimum-listing overrides before any outcome reconstruction."
    },
    "historicalFinalAudit": {
      "version": "V10.22",
      "completedAt": "2026-09-01T18:57:00+03:00",
      "historicalProgram": {
        "selected": 100,
        "coreReconstructed": 100,
        "development": {
          "n": 60,
          "pass": 42,
          "partial": 12,
          "fail": 6,
          "fundamentalDiagnosticPct": 86.7,
          "hardGateDiagnosticPct": 92.4
        },
        "validation": {
          "n": 20,
          "cases": 20,
          "statusCounts": {
            "PASS": 15,
            "PARTIAL": 4,
            "FAIL": 1
          },
          "avgFundamentalCorrectnessPct": 86.3,
          "avgHardGateCorrectnessPct": 94.5,
          "officialAccuracyEligible": 0
        },
        "historicalHoldout": {
          "n": 20,
          "cases": 20,
          "statusCounts": {
            "PASS": 14,
            "PARTIAL": 5,
            "FAIL": 1
          },
          "avgFundamentalCorrectnessPct": 86.7,
          "avgHardGateCorrectnessPct": 94.7,
          "officialAccuracyEligible": 0
        },
        "total": {
          "n": 100,
          "pass": 71,
          "partial": 21,
          "fail": 8,
          "fundamentalDiagnosticPct": 86.6,
          "hardGateDiagnosticPct": 93.3
        }
      },
      "integrityAudit": {
        "historicalHoldoutPristine": false,
        "finding": "Prior ARGUS project files created before this batch contain historical outcomes/frozen calls for overlapping companies and mechanisms. Therefore H061–H100 cannot be represented as pristine blind out-of-sample proof.",
        "treatment": "All 100 historical cases remain useful diagnostics/robustness evidence, but Validation/Holdout receive zero official authorization eligibility.",
        "oldGateStatus": "Any older artifact titled Authorization Gate PASSED is superseded for the current V10.22 proof standard and cannot authorize API/autonomous deployment.",
        "selectionLockPreserved": "a9d66863404ffd36056aa4319c4173ad62fe5faf6dcb771acac8c67d90a39b07",
        "validationDecisionLock": "56281d93e4fa42cee44f664209d7f2cad06bdd644f675e02c5344359ca1c03da",
        "holdoutDecisionLock": "eafee031a86355c481198c81f9241fa05b4cf35ed264ab29906b65b6e8751a96"
      },
      "marketAlphaAudit": {
        "status": "FAIL-CLOSED / NOT OFFICIALLY SCORED",
        "reason": "Exact benchmark total-return reconciliation for every historical case is not needed to adjudicate the official gate after the integrity failure; no unverified price return is backfilled.",
        "scoreContributionPct": 0,
        "policy": "Fundamental and hard-gate outcomes remain primary. Historical price/alpha may be completed later as a secondary diagnostic, but it cannot repair a contaminated holdout."
      },
      "forwardHoldout": {
        "status": "ACTIVE — CLEAN, UNRESOLVED",
        "lockedDecisions": 4,
        "tickers": [
          "INTU",
          "NVDA",
          "FIS",
          "CRM"
        ],
        "resolved": 0,
        "first6mDue": "2027-03-01",
        "minimumResolvedRequired": 30,
        "targetLockedDecisions": 100,
        "promotionGatePct": 60,
        "authorizationEligible": false,
        "reason": "Only 4 clean forward decisions are locked and none has reached a pre-registered outcome horizon."
      },
      "modelImprovementReview": [
        {
          "id": "PI-01",
          "name": "Premium compounder expectations rule",
          "status": "SHADOW TEST ONLY — NOT PRODUCTION",
          "developmentSupport": [
            "LLY",
            "TT",
            "ETN"
          ],
          "diagnosticValidationSupport": [
            "NVO",
            "ISRG",
            "HON"
          ],
          "guardrail": "No margin-of-safety waiver; require reverse expectations plus moat/reinvestment duration."
        },
        {
          "id": "PI-02",
          "name": "Cycle inflection starter rule",
          "status": "SHADOW TEST ONLY — NOT PRODUCTION",
          "developmentSupport": [
            "DHT",
            "OXY",
            "SLB"
          ],
          "diagnosticHoldoutSupport": [
            "FRO"
          ],
          "counterexample": [
            "UNP"
          ],
          "guardrail": "Starter only when survival, supply discipline and independent leading indicators all pass."
        },
        {
          "id": "PI-03",
          "name": "Post-shock re-underwrite / re-entry",
          "status": "SHADOW TEST ONLY — NOT PRODUCTION",
          "diagnosticValidationSupport": [
            "NFLX"
          ],
          "guardrail": "Re-underwrite from new price only after original failure mechanism objectively improves."
        },
        {
          "id": "PI-04",
          "name": "Acquisition-cohort ROIC",
          "status": "PROPOSED / SHADOW",
          "developmentSupport": [
            "TRPZ"
          ],
          "guardrail": "Separate organic growth, acquired growth, goodwill/debt and cohort ROIC before crediting serial acquisition."
        }
      ],
      "authorization": {
        "state": "BLOCKED",
        "officialProofScore": null,
        "historicalDiagnosticScoreEligible": false,
        "forwardProofResolved": 0,
        "nextUnlockCondition": "At least 30 clean forward holdout outcomes resolved and >=60% pre-registered proof score, with 100 locked decisions target and no integrity failure."
      },
      "testMatrix": [
        {
          "test": "Historical case selection pre-lock",
          "status": "PASS",
          "result": "100/100 case identities and cutoffs fixed under selection SHA."
        },
        {
          "test": "Information-time reconstruction",
          "status": "PASS WITH INTEGRITY CAVEAT",
          "result": "Core snapshots reconstructed to cutoff logic; prior project artifacts create model-level outcome contamination."
        },
        {
          "test": "Decision/thesis/kill-trigger locking",
          "status": "PASS DIAGNOSTIC",
          "result": "Validation and historical-holdout decisions hashed before current-turn reveal, but not pristine because prior ARGUS artifacts existed."
        },
        {
          "test": "Fundamental outcome scoring",
          "status": "COMPLETE",
          "result": "100/100 core cases scored; diagnostic average 86.6%."
        },
        {
          "test": "Hard-gate accuracy",
          "status": "COMPLETE",
          "result": "100/100 core cases scored; diagnostic average 93.3%."
        },
        {
          "test": "Error attribution / failure review",
          "status": "COMPLETE",
          "result": "71 PASS / 21 PARTIAL / 8 FAIL; recurring false-negative conservatism plus counterexamples retained."
        },
        {
          "test": "Model-change governance",
          "status": "PASS",
          "result": "No candidate rule promoted from triggering/contaminated evidence; PI-01..PI-04 remain shadow-only."
        },
        {
          "test": "Historical benchmark / alpha",
          "status": "FAIL-CLOSED / NOT SCORED",
          "result": "No unverified total-return series backfilled; 0 official contribution."
        },
        {
          "test": "Historical out-of-sample integrity",
          "status": "FAIL",
          "result": "Prior ARGUS files contain overlapping historical outcomes; historical holdout invalid for authorization proof."
        },
        {
          "test": "Calibration",
          "status": "NOT ELIGIBLE YET",
          "result": "Current historical decisions were not consistently locked with probability buckets; no retrospective probability fabrication."
        },
        {
          "test": "Clean forward holdout",
          "status": "ACTIVE / UNRESOLVED",
          "result": "4 locked decisions, 0 resolved; first 6M checkpoint 2027-03-01."
        },
        {
          "test": "60% authorization gate",
          "status": "BLOCKED",
          "result": "Official proof score is N/A until clean forward minimum sample resolves."
        }
      ]
    },
    "forwardCohort01": {
      "cohortId": "FC01",
      "lockedAt": "2026-09-01T19:24:36+03:00",
      "cases": 30,
      "newUniqueLocks": 26,
      "carriedExisting": 4,
      "masterCohortSha256": "4809893161a27af500d7c6e4c5a67b41a853614134f55083b50c9e726cdee080",
      "shadowSha256": "9697727bf855047003c60241a0b02dbf03f567836e410887d9d807dbaafb219a",
      "activeBuyOrStarter": [
        "TSM",
        "BRK.B",
        "CB",
        "PGR",
        "INTU"
      ],
      "resolved": 0
    },
    "forwardCohort02": {
      "status": "LOCKED CLEAN FORWARD",
      "cohortFile": "ARGUS_Forward_Cohort02_V10_24.json",
      "lockedAt": "2026-09-01T19:37:35+03:00",
      "newUniqueLocks": 30,
      "cleanForwardLockedTotal": 60,
      "resolved": 0,
      "masterCohortSha256": "f285f758696a926ffcd5ed363c697e90e09899f6da121abde1d1b98298de7274"
    },
    "correlationIndependenceEngine": {
      "status": "ACTIVE",
      "file": "ARGUS_Correlation_Independence_V10_24.json",
      "rawForwardLocks": 60,
      "effectiveObservationEstimate": 40.65,
      "masterSha256": "83789cf5e59b29b3f8bfc7e874153c291f6203c66e1b4980f53e72c7d6377891"
    },
    "eventDrivenLockProtocol": {
      "status": "ACTIVE",
      "file": "ARGUS_Event_Driven_Protocol_V10_24.json",
      "protocolSha256": "85d7c45c4f034c415a39d7b0bede040e61d036f093c684f396d3044c6a395722",
      "rule": "A new snapshot is created only when new material evidence arrives. The parent snapshot remains immutable. Price movement alone never qualifies."
    }
  },
  "cohorts": [
    {
      "version": "V10.23",
      "cohortId": "FC01",
      "lockedAt": "2026-09-01T19:24:36+03:00",
      "officialForward": true,
      "policy": {
        "targetLockedDecisions": 100,
        "minimumResolvedForGate": 30,
        "promotionGatePct": 60,
        "duplicatePolicy": "INTU, NVDA, FIS and CRM were already clean-locked on 2026-09-01. They are incorporated into FC01 for one coherent 30-name cohort but are not counted as new locks.",
        "cleanForwardLockedAfterCohort": 30,
        "newUniqueLocks": 26,
        "carriedExistingLocks": 4,
        "resolved": 0,
        "shadowPolicy": "PI-01..PI-04 are scored separately and cannot alter official actions or official proof outcomes."
      },
      "macroRegime": {
        "asOf": "2026-09-01",
        "state": "TIGHT / INFLATIONARY RISK",
        "summary": "Fed target 3.50–3.75%; inflation remains above target; long yields are elevated and oil is high. This raises the required margin of safety for long-duration/growth assets and leveraged equities.",
        "rule": "Regime changes sizing and required safety margin; it does not override company hard gates or create a BUY by itself."
      },
      "cases": [
        {
          "id": "FC01-001",
          "ticker": "IONQ",
          "company": "IonQ",
          "sector": "Quantum Computing",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 38.04,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T11:58:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/ionq/",
          "primaryEvidenceDate": "2026-08-06",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://investors.ionq.com/news/news-details/2026/IonQ-Announces-Second-Quarter-2026-Financial-Results/default.aspx",
          "keyEvidence": [
            "Q2 revenue $80.1M (+287% YoY)",
            "FY26 revenue guide raised to $280–290M",
            "RPO +297%; SkyWater integration increases execution complexity"
          ],
          "economicEngine": "Bookings/RPO conversion × system/cloud adoption − cash burn/dilution",
          "valuationContext": "~$15B market cap against a still-small revenue base; milestone valuation dominates current cash earnings",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "LOW–MEDIUM",
          "thesis": "Commercial momentum is real, but current equity value requires rapid multi-year conversion of backlog and acquisitions into durable owner economics.",
          "killTrigger": "Bookings/RPO fail to convert into recurring revenue; burn/dilution rises materially; technical/system milestones slip.",
          "benchmarks": [
            "SPY",
            "QTUM"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Commercial bookings/RPO, repeat customers and paid utilization grow faster than cash burn; technical roadmap remains on schedule.",
              "failure": "Commercial conversion stalls, milestone slips appear, or dilution/burn rises faster than revenue quality."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "At least one core platform demonstrates repeatable paid use and materially better revenue quality without destructive dilution.",
              "failure": "Equity value remains dependent on narrative/milestones while owner economics and repeat usage remain immaterial."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Commercial economics become measurable enough to support a valuation from recurring cash potential rather than pure option value.",
              "failure": "Runway/dilution or technology obsolescence destroys per-share option value before scale is reached."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "6833a2aa8ff8ce8461de673dc7446b998216c37bda36c2ee7ad13444adf702b8"
        },
        {
          "id": "FC01-002",
          "ticker": "RGTI",
          "company": "Rigetti Computing",
          "sector": "Quantum Computing",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 14.99,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:07:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/rgti/",
          "primaryEvidenceDate": "2026-08-11",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://investors.rigetti.com/news-releases/news-release-details/rigetti-computing-reports-second-quarter-2026-financial-results",
          "keyEvidence": [
            "Q2 revenue $5.1M",
            "Operating loss $28.1M; GAAP net loss $52.6M",
            "Cash and investments $541.3M provide runway but economics remain pre-scale"
          ],
          "economicEngine": "QPU milestones × system/cloud access × utilization − R&D burn",
          "valuationContext": "~$5B market cap versus ~$13M TTM revenue; valuation is almost entirely milestone/option value",
          "officialDecision": "PROVE IT",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "LOW",
          "thesis": "Cash runway is useful, but valuation is far ahead of current commercial economics; technical progress must become paid utilization without destructive dilution.",
          "killTrigger": "Roadmap slips, cash runway compresses faster than revenue grows, or commercial utilization remains immaterial.",
          "benchmarks": [
            "SPY",
            "QTUM"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Commercial bookings/RPO, repeat customers and paid utilization grow faster than cash burn; technical roadmap remains on schedule.",
              "failure": "Commercial conversion stalls, milestone slips appear, or dilution/burn rises faster than revenue quality."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "At least one core platform demonstrates repeatable paid use and materially better revenue quality without destructive dilution.",
              "failure": "Equity value remains dependent on narrative/milestones while owner economics and repeat usage remain immaterial."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Commercial economics become measurable enough to support a valuation from recurring cash potential rather than pure option value.",
              "failure": "Runway/dilution or technology obsolescence destroys per-share option value before scale is reached."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "47b159cf5141947b3913c0f435d02a495445dba665fcd0e2e462f6df113e1331"
        },
        {
          "id": "FC01-003",
          "ticker": "QBTS",
          "company": "D-Wave Quantum",
          "sector": "Quantum Computing",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 16.62,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:05:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/qbts/",
          "primaryEvidenceDate": "2026-08-06",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://ir.dwavesys.com/news/news-details/2026/D-Wave-Reports-Second-Quarter-2026-Results/default.aspx",
          "keyEvidence": [
            "Q2 revenue $3.1M; Q2 bookings $2.1M (+59%)",
            "H1 bookings $35.5M (+1120%)",
            "RPO $40.7M (+668%); cash/marketable securities ~$546M"
          ],
          "economicEngine": "Annealing systems/cloud usage × bookings conversion − burn/dilution",
          "valuationContext": "~$6.2B market cap versus ~$12M TTM revenue; bookings quality matters more than headline growth",
          "officialDecision": "PROVE IT",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "LOW–MEDIUM",
          "thesis": "The bookings/RPO inflection is encouraging, but the market already capitalizes a large future commercial ramp that reported revenue has not yet proven.",
          "killTrigger": "RPO/bookings do not convert to revenue and repeat use; cash burn/dilution accelerates; customer value cases fail to repeat.",
          "benchmarks": [
            "SPY",
            "QTUM"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Commercial bookings/RPO, repeat customers and paid utilization grow faster than cash burn; technical roadmap remains on schedule.",
              "failure": "Commercial conversion stalls, milestone slips appear, or dilution/burn rises faster than revenue quality."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "At least one core platform demonstrates repeatable paid use and materially better revenue quality without destructive dilution.",
              "failure": "Equity value remains dependent on narrative/milestones while owner economics and repeat usage remain immaterial."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Commercial economics become measurable enough to support a valuation from recurring cash potential rather than pure option value.",
              "failure": "Runway/dilution or technology obsolescence destroys per-share option value before scale is reached."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "aa4e4ddd2f2cdb251056544f9669a53d1b5cc4165c8f8f5f47ebf4dc6abf6862"
        },
        {
          "id": "FC01-004",
          "ticker": "QUBT",
          "company": "Quantum Computing Inc.",
          "sector": "Quantum Computing",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 7.97,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:04:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/qubt/",
          "primaryEvidenceDate": "2026-08-14",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://ir.quantumcomputinginc.com/news-events/press-releases/detail/109/quantum-computing-inc-reports-second-quarter-2026",
          "keyEvidence": [
            "Q2 revenue $5.6M versus $61k prior year",
            "NHanced acquisition materially changes comparability",
            "Cash/investments about $1.3B but operating economics remain unproven"
          ],
          "economicEngine": "Photonics/quantum product adoption + acquired revenue − integration/burn/dilution",
          "valuationContext": "~$1.8B market cap versus <$10M TTM revenue; acquisition-adjusted economics are required",
          "officialDecision": "PROVE IT",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "LOW",
          "thesis": "Revenue has inflected from a tiny base, but acquisition-led comparability and very high option value demand evidence of organic repeatable economics.",
          "killTrigger": "Acquired growth masks weak organic demand; acquisition-cohort returns fail; burn/dilution rises faster than commercial traction.",
          "benchmarks": [
            "SPY",
            "QTUM"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Commercial bookings/RPO, repeat customers and paid utilization grow faster than cash burn; technical roadmap remains on schedule.",
              "failure": "Commercial conversion stalls, milestone slips appear, or dilution/burn rises faster than revenue quality."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "At least one core platform demonstrates repeatable paid use and materially better revenue quality without destructive dilution.",
              "failure": "Equity value remains dependent on narrative/milestones while owner economics and repeat usage remain immaterial."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Commercial economics become measurable enough to support a valuation from recurring cash potential rather than pure option value.",
              "failure": "Runway/dilution or technology obsolescence destroys per-share option value before scale is reached."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "4e8eff6d6028d85592c2ba8789e76adf19228958b02c939193693e60719567ec"
        },
        {
          "id": "FC01-005",
          "ticker": "NVDA",
          "company": "NVIDIA",
          "sector": "AI & Semiconductors",
          "lockClass": "CARRIED CLEAN BASELINE — NOT DOUBLE-COUNTED",
          "lockedAt": "2026-09-01T13:30:00+03:00",
          "price": 220.78,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T13:30:00+03:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/nvda/",
          "primaryEvidenceDate": "2026-08-26",
          "primaryEvidenceTitle": "Q2 FY2027 results",
          "primarySourceUrl": "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2027",
          "keyEvidence": [
            "Locked V10.17 baseline carried forward without re-locking",
            "Q2 revenue $96.2B; Data Center $89.0B; gross margin 75%",
            "Q3 guide ~$108B; China Data Center compute excluded"
          ],
          "economicEngine": "AI customer ROI → capex → data-center demand × platform share/margin",
          "valuationContext": "Locked risk-adjusted model: fair-value ensemble near $249 but buy gate below locked price",
          "officialDecision": "WAIT",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "Exceptional business quality is already recognized; normalized AI customer ROI and cycle duration must justify the entry price.",
          "killTrigger": "Customer ROI/capex weakens, gross margin structurally compresses, custom silicon erodes share, or export/TAM impairment becomes permanent.",
          "benchmarks": [
            "SPY",
            "SOXX"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Demand, share/mix and gross-margin evidence remain consistent with the locked economic engine; no new structural export/technology break.",
              "failure": "Customer ROI/capex, share or margins deteriorate beyond cyclical noise, or a geopolitical/export shock becomes structural."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized owner earnings support the locked valuation stance after a full additional reporting cycle; reinvestment earns acceptable returns.",
              "failure": "Peak-cycle assumptions prove embedded in the lock and normalized FCF/earnings fall materially below the underwriting case."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Technology leadership and customer economics remain durable enough for positive per-share intrinsic-value compounding.",
              "failure": "Node/platform leadership erodes or capital intensity rises faster than economic returns, causing permanent IV impairment."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "2028ae0edf8fcb35e7bab54f721e8ea3a6f753757e94d76d8eb2d3d3ce8518ad"
        },
        {
          "id": "FC01-006",
          "ticker": "AMD",
          "company": "Advanced Micro Devices",
          "sector": "AI & Semiconductors",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 459.65,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:07:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/amd/",
          "primaryEvidenceDate": "2026-08-04",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://ir.amd.com/news-events/press-releases/detail/1260/amd-reports-second-quarter-2026-financial-results",
          "keyEvidence": [
            "Q2 revenue $11.536B (+50%)",
            "Data Center $6.718B (+107%)",
            "GAAP gross margin 54%; cash+ST investments $13.1B vs debt $3.2B"
          ],
          "economicEngine": "Data-center accelerator/CPU share gains × mix × gross margin",
          "valuationContext": "~$750B market cap; ~120x trailing earnings and ~42x forward earnings at the lock quote",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "Execution and data-center growth are excellent, but the valuation embeds sustained accelerator share gains and margin durability before MI-platform economics fully mature.",
          "killTrigger": "Data-center growth/share stalls, accelerator software/ecosystem fails to close the gap, or margins weaken while capex/R&D remain elevated.",
          "benchmarks": [
            "SPY",
            "SOXX"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Demand, share/mix and gross-margin evidence remain consistent with the locked economic engine; no new structural export/technology break.",
              "failure": "Customer ROI/capex, share or margins deteriorate beyond cyclical noise, or a geopolitical/export shock becomes structural."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized owner earnings support the locked valuation stance after a full additional reporting cycle; reinvestment earns acceptable returns.",
              "failure": "Peak-cycle assumptions prove embedded in the lock and normalized FCF/earnings fall materially below the underwriting case."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Technology leadership and customer economics remain durable enough for positive per-share intrinsic-value compounding.",
              "failure": "Node/platform leadership erodes or capital intensity rises faster than economic returns, causing permanent IV impairment."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "61c0ec7d1a57757462514ce27459819d1c1314a2dae02b17243e33a15a03db11"
        },
        {
          "id": "FC01-007",
          "ticker": "AVGO",
          "company": "Broadcom",
          "sector": "AI & Semiconductors",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 368.5,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:08:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/avgo/",
          "primaryEvidenceDate": "2026-06-04",
          "primaryEvidenceTitle": "Q2 FY2026 results",
          "primarySourceUrl": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-second-quarter-fiscal-year-2026-financial",
          "keyEvidence": [
            "Q2 AI semiconductor revenue $10.8B (+143%)",
            "Q3 AI semiconductor revenue expected around $16B (>200%)",
            "Next earnings are Sep 2, 2026 — one day after this lock"
          ],
          "economicEngine": "Custom AI silicon/connectivity + infrastructure software owner cash",
          "valuationContext": "~$1.75T market cap and premium multiple; imminent earnings creates material evidence event",
          "officialDecision": "WAIT FOR EARNINGS",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "AI and software economics are strong, but an earnings report within one day can materially reset the evidence set; no reason to front-run the locked test.",
          "killTrigger": "AI customer concentration/revenue decelerates sharply, VMware economics disappoint, leverage/capital allocation worsens, or custom silicon margins compress.",
          "benchmarks": [
            "SPY",
            "SOXX"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Demand, share/mix and gross-margin evidence remain consistent with the locked economic engine; no new structural export/technology break.",
              "failure": "Customer ROI/capex, share or margins deteriorate beyond cyclical noise, or a geopolitical/export shock becomes structural."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized owner earnings support the locked valuation stance after a full additional reporting cycle; reinvestment earns acceptable returns.",
              "failure": "Peak-cycle assumptions prove embedded in the lock and normalized FCF/earnings fall materially below the underwriting case."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Technology leadership and customer economics remain durable enough for positive per-share intrinsic-value compounding.",
              "failure": "Node/platform leadership erodes or capital intensity rises faster than economic returns, causing permanent IV impairment."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "37ede009bb73bceaec534c1e7c4cd70ecefdc3bb265d5fef3267488d483d8636"
        },
        {
          "id": "FC01-008",
          "ticker": "TSM",
          "company": "Taiwan Semiconductor Manufacturing",
          "sector": "AI & Semiconductors",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 415.85,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:12:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/tsm/",
          "primaryEvidenceDate": "2026-07-16",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://investor.tsmc.com/english/quarterly-results/2026/q2",
          "keyEvidence": [
            "Q2 revenue about US$40.2B (+33.7% YoY)",
            "Gross margin 67.7%; EPS +77.4%",
            "Lock quote: ~28.6x trailing / ~19.6x forward earnings"
          ],
          "economicEngine": "Wafer demand × leading-node mix × utilization × pricing",
          "valuationContext": "High-quality foundry economics at a less extreme multiple than many AI beneficiaries; geopolitical permanent-loss risk is non-diversifiable",
          "officialDecision": "BUY SMALL",
          "officialAction": "STARTER",
          "positionSizing": "1–2% max",
          "confidence": "MEDIUM",
          "thesis": "Node leadership, utilization and pricing power support owner earnings; a small position is justified, but Taiwan geopolitical risk caps size regardless of valuation.",
          "killTrigger": "Loss of node leadership/utilization, sustained margin erosion, customer concentration shock, or material Taiwan/China disruption risk rises beyond the sizing cap.",
          "benchmarks": [
            "SPY",
            "SOXX"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Demand, share/mix and gross-margin evidence remain consistent with the locked economic engine; no new structural export/technology break.",
              "failure": "Customer ROI/capex, share or margins deteriorate beyond cyclical noise, or a geopolitical/export shock becomes structural."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized owner earnings support the locked valuation stance after a full additional reporting cycle; reinvestment earns acceptable returns.",
              "failure": "Peak-cycle assumptions prove embedded in the lock and normalized FCF/earnings fall materially below the underwriting case."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Technology leadership and customer economics remain durable enough for positive per-share intrinsic-value compounding.",
              "failure": "Node/platform leadership erodes or capital intensity rises faster than economic returns, causing permanent IV impairment."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "0b01fee3f99d340daa553124e371859cbecc7712aea745dc78e7699fb83e1bb7"
        },
        {
          "id": "FC01-009",
          "ticker": "ASML",
          "company": "ASML Holding",
          "sector": "AI & Semiconductors",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 1668.5,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T11:52:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/asml/",
          "primaryEvidenceDate": "2026-07-15",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.asml.com/en/news/press-releases/2026/q2-2026-financial-results-dd3ac76a9d9d4db7a8fdd0a86c8a77bf",
          "keyEvidence": [
            "Q2 net sales €9.33B; gross margin 54%",
            "Q3 guide €11–12B and GM 55–57%",
            "Lock quote ~53x trailing / ~30x forward earnings"
          ],
          "economicEngine": "EUV/DUV system shipments + installed-base service annuity",
          "valuationContext": "Unique technology monopoly economics, but premium duration and China/export exposure require a wider safety margin",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM–HIGH",
          "thesis": "The moat is exceptional; the unresolved question is not business quality but how much moat duration is already capitalized at the current price.",
          "killTrigger": "EUV/High-NA adoption slows materially, export restrictions permanently reduce economics, customer capex cuts cause order cancellations, or service annuity weakens.",
          "benchmarks": [
            "SPY",
            "SOXX"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Demand, share/mix and gross-margin evidence remain consistent with the locked economic engine; no new structural export/technology break.",
              "failure": "Customer ROI/capex, share or margins deteriorate beyond cyclical noise, or a geopolitical/export shock becomes structural."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized owner earnings support the locked valuation stance after a full additional reporting cycle; reinvestment earns acceptable returns.",
              "failure": "Peak-cycle assumptions prove embedded in the lock and normalized FCF/earnings fall materially below the underwriting case."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Technology leadership and customer economics remain durable enough for positive per-share intrinsic-value compounding.",
              "failure": "Node/platform leadership erodes or capital intensity rises faster than economic returns, causing permanent IV impairment."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "58f96c9701452704185700fd1a97c2d5fd794ef4bd10cca96c77b2c24562200b"
        },
        {
          "id": "FC01-010",
          "ticker": "AMAT",
          "company": "Applied Materials",
          "sector": "AI & Semiconductors",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 445.82,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:06:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/amat/",
          "primaryEvidenceDate": "2026-08-13",
          "primaryEvidenceTitle": "Q3 FY2026 results",
          "primarySourceUrl": "https://ir.appliedmaterials.com/news-releases/news-release-details/applied-materials-announces-third-quarter-2026-results",
          "keyEvidence": [
            "Q3 revenue $9.12B (+25%)",
            "Gross margin 50.3%; operating margin 33.7%",
            "Lock quote roughly 40x trailing / 26x forward earnings"
          ],
          "economicEngine": "WFE demand × process-intensity/content × service",
          "valuationContext": "Strong process intensity and service economics, but valuation and wafer-fab cycle leave limited error tolerance",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "AI/process complexity supports secular content gains, but current valuation requires continued WFE strength through a cyclical industry.",
          "killTrigger": "WFE cycle rolls over, China/export mix declines faster than new demand grows, service growth weakens, or margin/ROIC compress.",
          "benchmarks": [
            "SPY",
            "SOXX"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Demand, share/mix and gross-margin evidence remain consistent with the locked economic engine; no new structural export/technology break.",
              "failure": "Customer ROI/capex, share or margins deteriorate beyond cyclical noise, or a geopolitical/export shock becomes structural."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized owner earnings support the locked valuation stance after a full additional reporting cycle; reinvestment earns acceptable returns.",
              "failure": "Peak-cycle assumptions prove embedded in the lock and normalized FCF/earnings fall materially below the underwriting case."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Technology leadership and customer economics remain durable enough for positive per-share intrinsic-value compounding.",
              "failure": "Node/platform leadership erodes or capital intensity rises faster than economic returns, causing permanent IV impairment."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "f52533ea777ccab68ae5d6bf2f35c7a47d1a5557276ed8d2d60daaf5516970e0"
        },
        {
          "id": "FC01-011",
          "ticker": "XOM",
          "company": "Exxon Mobil",
          "sector": "Energy",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 162.79,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:02:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/xom/",
          "primaryEvidenceDate": "2026-07-31",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://corporate.exxonmobil.com/news/news-releases/2026/0731_exxonmobil-announces-second-quarter-2026-results",
          "keyEvidence": [
            "Q2 GAAP earnings about $14.5B",
            "Cash flow from operations $23.6B",
            "Permian production above 1.8M oil-equivalent bpd"
          ],
          "economicEngine": "Production × realized commodity price − sustaining/growth capital",
          "valuationContext": "Current oil environment is strong; normalize mid-cycle cash rather than capitalize spot conditions",
          "officialDecision": "HOLD",
          "officialAction": "NO ADD",
          "positionSizing": "0% new",
          "confidence": "MEDIUM",
          "thesis": "Scale, low-cost resources and capital discipline are strong, but current oil prices make this a poor point to extrapolate peak cash flows into intrinsic value.",
          "killTrigger": "Mid-cycle breakeven rises, capex discipline breaks, structural production returns disappoint, or leverage/shareholder returns worsen through the cycle.",
          "benchmarks": [
            "SPY",
            "XLE"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Production/service execution and capital discipline remain intact even if commodity prices normalize; balance sheet stays resilient.",
              "failure": "Cash returns require current spot prices, capex discipline weakens, or operating execution deteriorates."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Mid-cycle FCF and per-share returns validate the locked HOLD/WATCH stance without relying on peak oil assumptions.",
              "failure": "Normalized FCF falls below replacement economics or capital is reinvested pro-cyclically at poor returns."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Assets compound value through a full commodity move with acceptable replacement/sustaining economics.",
              "failure": "Structural cost inflation, resource deterioration or capital misallocation destroys mid-cycle per-share value."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "b690874cf80270d1e1a836fc73ab65299a88105676b8a041c590897338f29433"
        },
        {
          "id": "FC01-012",
          "ticker": "CVX",
          "company": "Chevron",
          "sector": "Energy",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 208.64,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:03:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/cvx/",
          "primaryEvidenceDate": "2026-07-31",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.chevron.com/newsroom/2026/q3/chevron-reports-second-quarter-2026-results",
          "keyEvidence": [
            "Q2 earnings ~$12.1B; adjusted ~$12.0B",
            "Record U.S. production; worldwide production +20%",
            "Refinery utilization about 97%"
          ],
          "economicEngine": "Production × realized price + refining − capital/decline replacement",
          "valuationContext": "High-quality integrated energy economics, but spot commodity strength and recent production step-up should be normalized",
          "officialDecision": "HOLD",
          "officialAction": "NO ADD",
          "positionSizing": "0% new",
          "confidence": "MEDIUM",
          "thesis": "Execution is excellent, but current commodity conditions reduce margin of safety for a new position; owner returns must hold at lower mid-cycle prices.",
          "killTrigger": "Hess/integration returns disappoint, production growth requires excessive capex, mid-cycle FCF weakens, or balance sheet/capital returns deteriorate.",
          "benchmarks": [
            "SPY",
            "XLE"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Production/service execution and capital discipline remain intact even if commodity prices normalize; balance sheet stays resilient.",
              "failure": "Cash returns require current spot prices, capex discipline weakens, or operating execution deteriorates."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Mid-cycle FCF and per-share returns validate the locked HOLD/WATCH stance without relying on peak oil assumptions.",
              "failure": "Normalized FCF falls below replacement economics or capital is reinvested pro-cyclically at poor returns."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Assets compound value through a full commodity move with acceptable replacement/sustaining economics.",
              "failure": "Structural cost inflation, resource deterioration or capital misallocation destroys mid-cycle per-share value."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "961427df016a39ebd963d4ae28610a12279138ca5b31564407d18585aca24edf"
        },
        {
          "id": "FC01-013",
          "ticker": "COP",
          "company": "ConocoPhillips",
          "sector": "Energy",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 134.72,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:03:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/cop/",
          "primaryEvidenceDate": "2026-08-06",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.conocophillips.com/news-media/story/conocophillips-reports-second-quarter-2026-results/",
          "keyEvidence": [
            "Q2 CFO $7.2B; capex ~$3.0B",
            "Production about 2.248 MBOED",
            "Management targets ~$7B FCF inflection by 2029"
          ],
          "economicEngine": "Production × realized price − sustaining capital and integration spend",
          "valuationContext": "Attractive resource base, but current oil and future FCF target require cycle-normalized underwriting",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "The portfolio can compound at reasonable mid-cycle prices, but current macro/commodity strength does not yet provide a clear enough entry edge.",
          "killTrigger": "Integration/cost synergies miss, sustaining capital rises, inventory/resource quality disappoints, or mid-cycle FCF fails to improve.",
          "benchmarks": [
            "SPY",
            "XLE"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Production/service execution and capital discipline remain intact even if commodity prices normalize; balance sheet stays resilient.",
              "failure": "Cash returns require current spot prices, capex discipline weakens, or operating execution deteriorates."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Mid-cycle FCF and per-share returns validate the locked HOLD/WATCH stance without relying on peak oil assumptions.",
              "failure": "Normalized FCF falls below replacement economics or capital is reinvested pro-cyclically at poor returns."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Assets compound value through a full commodity move with acceptable replacement/sustaining economics.",
              "failure": "Structural cost inflation, resource deterioration or capital misallocation destroys mid-cycle per-share value."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "d02bbedc4a2e9ecc4da1e16b3ab8ddfe6ce4bd77f412d9c0c8a2949e633f495b"
        },
        {
          "id": "FC01-014",
          "ticker": "SLB",
          "company": "SLB",
          "sector": "Energy",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 58.07,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:05:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/slb/",
          "primaryEvidenceDate": "2026-07-17",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://investorcenter.slb.com/news-releases/news-release-details/slb-announces-second-quarter-2026-results",
          "keyEvidence": [
            "Q2 revenue $8.97B (+5% YoY)",
            "Adjusted EBITDA $1.90B (-7% YoY); FCF $716M",
            "Middle East revenue -13% amid conflict"
          ],
          "economicEngine": "International activity × pricing × service/digital mix",
          "valuationContext": "Service-cycle earnings remain sensitive to customer capex and geopolitical disruption; lock price is near the upper end of recent range",
          "officialDecision": "WAIT",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "Long-cycle international activity is constructive, but EBITDA softness and high commodity/geopolitical uncertainty do not offer a clean asymmetric entry.",
          "killTrigger": "International pricing weakens, customer capex is cut, FCF conversion deteriorates, or Middle East disruption becomes structural.",
          "benchmarks": [
            "SPY",
            "XLE"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Production/service execution and capital discipline remain intact even if commodity prices normalize; balance sheet stays resilient.",
              "failure": "Cash returns require current spot prices, capex discipline weakens, or operating execution deteriorates."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Mid-cycle FCF and per-share returns validate the locked HOLD/WATCH stance without relying on peak oil assumptions.",
              "failure": "Normalized FCF falls below replacement economics or capital is reinvested pro-cyclically at poor returns."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Assets compound value through a full commodity move with acceptable replacement/sustaining economics.",
              "failure": "Structural cost inflation, resource deterioration or capital misallocation destroys mid-cycle per-share value."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "f7c4d9c40f5dc436191f219c33af68aad948ed737b59881a71f413a6c51ef82c"
        },
        {
          "id": "FC01-015",
          "ticker": "INSW",
          "company": "International Seaways",
          "sector": "Shipping",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 99.74,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:09:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/insw/",
          "primaryEvidenceDate": "2026-08-06",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.intlseas.com/news-releases/news-release-details/international-seaways-reports-second-quarter-2026-results",
          "keyEvidence": [
            "Q2 record net income ~$295M",
            "Adjusted EBITDA ~$345M; record FCF ~$261M",
            "Large dividend/payout while tanker rates are exceptionally strong"
          ],
          "economicEngine": "Earning days × TCE − opex/capex/interest; NAV anchors downside/upside",
          "valuationContext": "Near 52-week high and record tanker cash flow; current earnings must be normalized against fleet supply and NAV",
          "officialDecision": "HOLD",
          "officialAction": "NO ADD",
          "positionSizing": "0% new",
          "confidence": "MEDIUM",
          "thesis": "The balance sheet and payout are attractive, but record TCE conditions are not a reason to pay peak-cycle multiples/NAV premiums.",
          "killTrigger": "Orderbook/fleet supply accelerates, TCE normalizes below replacement economics, NAV premium becomes excessive, or leverage/newbuild commitments rise.",
          "benchmarks": [
            "SPY",
            "BOAT"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "TCE, fleet supply/orderbook and NAV remain consistent with disciplined peak-cycle capital allocation; leverage stays controlled.",
              "failure": "Spot rates fall sharply while fleet supply/newbuild commitments rise or NAV weakens materially."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized TCE and NAV support the locked no-add stance; management returns capital rather than overbuilding into the peak.",
              "failure": "Peak earnings were capitalized into poor investments/newbuilds or NAV/normalized earnings deteriorate more than expected."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Company survives the rate cycle with strong per-share NAV and disciplined capital returns.",
              "failure": "Cycle downturn plus leverage/capex permanently impairs NAV per share."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "d73def446f7e6e51adc04a0f055719d5db730324505ba5f70e1a3f01a7140d7a"
        },
        {
          "id": "FC01-016",
          "ticker": "STNG",
          "company": "Scorpio Tankers",
          "sector": "Shipping",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 78.37,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:10:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/stng/",
          "primaryEvidenceDate": "2026-07-30",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.scorpiotankers.com/scorpio-tankers-inc-announces-financial-results-for-the-second-quarter-of-2026/",
          "keyEvidence": [
            "Q2 net income ~$387.5M; adjusted net income ~$243.7M",
            "Strong product-tanker cash generation and asset-sale gains",
            "Dividend $0.45/share"
          ],
          "economicEngine": "Product-tanker earning days × TCE − capital costs; NAV + normalized TCE",
          "valuationContext": "Headline P/E is very low because spot earnings are elevated; NAV and mid-cycle TCE matter more",
          "officialDecision": "HOLD",
          "officialAction": "NO ADD",
          "positionSizing": "0% new",
          "confidence": "MEDIUM",
          "thesis": "Capital returns are strong, but the investment edge at this point depends on whether product-tanker supply stays unusually constrained; do not capitalize spot earnings.",
          "killTrigger": "Fleet/orderbook supply worsens, spot TCE falls below replacement economics, asset values roll over materially, or capital allocation turns pro-cyclical.",
          "benchmarks": [
            "SPY",
            "BOAT"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "TCE, fleet supply/orderbook and NAV remain consistent with disciplined peak-cycle capital allocation; leverage stays controlled.",
              "failure": "Spot rates fall sharply while fleet supply/newbuild commitments rise or NAV weakens materially."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized TCE and NAV support the locked no-add stance; management returns capital rather than overbuilding into the peak.",
              "failure": "Peak earnings were capitalized into poor investments/newbuilds or NAV/normalized earnings deteriorate more than expected."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Company survives the rate cycle with strong per-share NAV and disciplined capital returns.",
              "failure": "Cycle downturn plus leverage/capex permanently impairs NAV per share."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "c929dbc2881e348e38dbce36c0543c7c2b706563e700c8a1ba8d3a5892b8e6e3"
        },
        {
          "id": "FC01-017",
          "ticker": "FRO",
          "company": "Frontline",
          "sector": "Shipping",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 44.18,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:11:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/fro/",
          "primaryEvidenceDate": "2026-08-28",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.frontlineplc.cy/frontline-ltd-reports-results-for-the-second-quarter-ended-june-30-2026/",
          "keyEvidence": [
            "Q2 record profit; adjusted net income about $580M",
            "VLCC TCE around $152.7k/day; Suezmax ~$111.5k/day",
            "Dividend $2.61/share"
          ],
          "economicEngine": "Tanker earning days × TCE − opex/interest/newbuild capital; NAV",
          "valuationContext": "Record TCE and low P/E are classic peak-cycle conditions; normalized TCE/NAV must drive action",
          "officialDecision": "HOLD",
          "officialAction": "NO ADD",
          "positionSizing": "0% new",
          "confidence": "MEDIUM",
          "thesis": "The current cycle is exceptional, but a record quarter is not evidence of permanent earnings power; preserve gains rather than chase peak spot rates.",
          "killTrigger": "VLCC/Suezmax supply rises, TCE mean reverts rapidly, NAV weakens, or leverage/newbuild commitments increase into the peak.",
          "benchmarks": [
            "SPY",
            "BOAT"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "TCE, fleet supply/orderbook and NAV remain consistent with disciplined peak-cycle capital allocation; leverage stays controlled.",
              "failure": "Spot rates fall sharply while fleet supply/newbuild commitments rise or NAV weakens materially."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized TCE and NAV support the locked no-add stance; management returns capital rather than overbuilding into the peak.",
              "failure": "Peak earnings were capitalized into poor investments/newbuilds or NAV/normalized earnings deteriorate more than expected."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Company survives the rate cycle with strong per-share NAV and disciplined capital returns.",
              "failure": "Cycle downturn plus leverage/capex permanently impairs NAV per share."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "d7951cbf36379d946f948a641afd50babf0873eea2448ebdca883b0684c6db94"
        },
        {
          "id": "FC01-018",
          "ticker": "JPM",
          "company": "JPMorgan Chase",
          "sector": "Banks",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 357.61,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:10:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/jpm/",
          "primaryEvidenceDate": "2026-07-14",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.jpmorganchase.com/ir/news/2026/jpmc-reports-second-quarter-2026-financial-results",
          "keyEvidence": [
            "Q2 net income ~$21.2B; ex-significant-items ~$16.9B",
            "ROTCE 29% reported / ~23% ex significant items",
            "CET1 ~14%; loans +10%, deposits +7%"
          ],
          "economicEngine": "Deposit franchise + NIM/fees − credit losses/capital intensity",
          "valuationContext": "Elite franchise priced near highs; normalize ROTCE and credit before adding",
          "officialDecision": "WATCH",
          "officialAction": "BUY LOWER",
          "positionSizing": "0% now",
          "confidence": "MEDIUM–HIGH",
          "thesis": "JPM remains a superior bank, but current price offers less protection against normalization in NII, credit and trading/advisory income.",
          "killTrigger": "Deposit beta/funding cost rises, credit costs normalize above assumptions, ROTCE falls structurally, or capital requirements materially reduce per-share compounding.",
          "benchmarks": [
            "SPY",
            "XLF"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "ROTCE/tangible-book compounding, deposits/funding and credit remain within the locked underwriting range.",
              "failure": "Credit costs, funding pressure or capital requirements deteriorate enough to break normalized ROTCE."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Per-share tangible book and normalized earnings compound with no hidden credit/capital-allocation failure.",
              "failure": "Reported earnings fail to translate to TBV/share because of credit, capital or poor deployment."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Franchise earns sustainable returns above cost of equity through a different rate/credit environment.",
              "failure": "Structural return-on-equity or franchise deterioration permanently lowers normalized value."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "5f3209a40ded0c861b8ff7bf772b383c1556e7db991e77ffe33ad32177540a1a"
        },
        {
          "id": "FC01-019",
          "ticker": "C",
          "company": "Citigroup",
          "sector": "Banks",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 133.17,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:08:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/c/",
          "primaryEvidenceDate": "2026-07-14",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.citigroup.com/citi/news/2026/citigroup-reports-second-quarter-2026-results",
          "keyEvidence": [
            "Q2 TBV/share about $100.89",
            "RoTCE ~13.0% vs 8.7% prior year",
            "Efficiency ratio ~57.4%; CET1 ~12.8%"
          ],
          "economicEngine": "Franchise revenue − transformation/credit costs → ROTCE × tangible book",
          "valuationContext": "Turnaround progress is visible, but lock price already exceeds TBV materially and durability is not fully proven",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "The thesis has improved, but the next dollar depends on sustaining higher ROTCE after transformation costs rather than merely rerating TBV.",
          "killTrigger": "RoTCE falls back, transformation expenses persist without efficiency gains, credit losses rise, or capital return fails to improve per-share TBV.",
          "benchmarks": [
            "SPY",
            "XLF"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "ROTCE/tangible-book compounding, deposits/funding and credit remain within the locked underwriting range.",
              "failure": "Credit costs, funding pressure or capital requirements deteriorate enough to break normalized ROTCE."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Per-share tangible book and normalized earnings compound with no hidden credit/capital-allocation failure.",
              "failure": "Reported earnings fail to translate to TBV/share because of credit, capital or poor deployment."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Franchise earns sustainable returns above cost of equity through a different rate/credit environment.",
              "failure": "Structural return-on-equity or franchise deterioration permanently lowers normalized value."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "8305f76a09ab25b939b805937c51351fc68af1c932f084bf4d557ae5c4f5eea7"
        },
        {
          "id": "FC01-020",
          "ticker": "BRK.B",
          "company": "Berkshire Hathaway",
          "sector": "Insurance",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 504.6,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:19:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/brk.b/",
          "primaryEvidenceDate": "2026-08-08",
          "primaryEvidenceTitle": "Q2 2026 report",
          "primarySourceUrl": "https://www.berkshirehathaway.com/reports.html",
          "keyEvidence": [
            "Large insurance/other cash and T-bill liquidity remains a major source of optionality",
            "H1 buybacks and acquisitions show capital deployment under the post-Buffett CEO transition",
            "Lock quote about 12.6x trailing earnings, though investment gains make P/E imperfect"
          ],
          "economicEngine": "Underwriting float + operating businesses + disciplined capital allocation",
          "valuationContext": "SOTP/owner-earnings case remains reasonable; succession/capital deployment is the key uncertainty",
          "officialDecision": "BUY SMALL",
          "officialAction": "STARTER",
          "positionSizing": "2–3%",
          "confidence": "MEDIUM–HIGH",
          "thesis": "Berkshire offers diversified owner earnings, insurance float and unusually large optional liquidity at a valuation that does not require heroic growth.",
          "killTrigger": "Underwriting discipline deteriorates, succession weakens capital allocation, large acquisitions destroy value, or per-share intrinsic value stalls despite deployment.",
          "benchmarks": [
            "SPY",
            "XLF"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Combined ratio/reserve development and investment income remain consistent with disciplined underwriting.",
              "failure": "Pricing falls below loss-cost trends, reserve development worsens or catastrophe exposure is persistently mispriced."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Book/TBV per share compounds at a rate that supports the locked action after normalization of catastrophe/investment noise.",
              "failure": "Headline earnings fail to become per-share book-value growth because underwriting quality deteriorates."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Underwriting moat and float economics remain durable across pricing and catastrophe cycles.",
              "failure": "Reserve, pricing or capital-allocation errors cause permanent book-value impairment."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "b92ab1ae8801e3d620249b257c5ec45e79d14722116339cbd3943b6618979af4"
        },
        {
          "id": "FC01-021",
          "ticker": "CB",
          "company": "Chubb",
          "sector": "Insurance",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 338.7,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:01:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/cb/",
          "primaryEvidenceDate": "2026-07-21",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://investors.chubb.com/news-and-events/news-releases/2026",
          "keyEvidence": [
            "Q2 core operating income ~$2.84B (+14.6%)",
            "P&C combined ratio 83.8%; ROTE ~21.2%",
            "Tangible book value/share +17.1%; record investment income"
          ],
          "economicEngine": "Premium growth × underwriting margin + investment income on float",
          "valuationContext": "High underwriting quality and book-value compounding at ~12x earnings offer a favorable quality/price combination",
          "officialDecision": "BUY",
          "officialAction": "BUY / ADD",
          "positionSizing": "3–5%",
          "confidence": "HIGH",
          "thesis": "Strong underwriting, reserve discipline, float income and tangible-book compounding create a clearer margin of safety than most quality names in the cohort.",
          "killTrigger": "Combined ratio/reserve development deteriorates structurally, pricing falls below loss-cost trend, catastrophe exposure is mispriced, or book-value compounding weakens.",
          "benchmarks": [
            "SPY",
            "KIE"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Combined ratio/reserve development and investment income remain consistent with disciplined underwriting.",
              "failure": "Pricing falls below loss-cost trends, reserve development worsens or catastrophe exposure is persistently mispriced."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Book/TBV per share compounds at a rate that supports the locked action after normalization of catastrophe/investment noise.",
              "failure": "Headline earnings fail to become per-share book-value growth because underwriting quality deteriorates."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Underwriting moat and float economics remain durable across pricing and catastrophe cycles.",
              "failure": "Reserve, pricing or capital-allocation errors cause permanent book-value impairment."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "d5500b9a8d894bcc074023a9389d494570bee18a1abfbd7fc50eecbd35bf0eab"
        },
        {
          "id": "FC01-022",
          "ticker": "PGR",
          "company": "Progressive",
          "sector": "Insurance",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 220.09,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:04:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/pgr/",
          "primaryEvidenceDate": "2026-08-14",
          "primaryEvidenceTitle": "July 2026 monthly results",
          "primarySourceUrl": "https://investors.progressive.com/financials/monthly-results/default.aspx",
          "keyEvidence": [
            "July premiums +5%; policies in force +7%",
            "Combined ratio ~86.8% vs 85.3% prior period",
            "Lock quote ~10.9x trailing / 13.2x forward earnings"
          ],
          "economicEngine": "Policies × premium per policy × underwriting margin + float income",
          "valuationContext": "Excellent pricing/telematics engine at a still-reasonable earnings multiple, with loss-cost trend as the main live variable",
          "officialDecision": "BUY",
          "officialAction": "BUY / ADD",
          "positionSizing": "2–4%",
          "confidence": "MEDIUM–HIGH",
          "thesis": "Progressive combines scale, data/pricing advantage and strong underwriting at a valuation that leaves room for normal loss-cost volatility.",
          "killTrigger": "Combined ratio deteriorates for multiple periods, policy growth is bought with inadequate pricing, reserve development worsens, or competitive advantage in segmentation erodes.",
          "benchmarks": [
            "SPY",
            "KIE"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Combined ratio/reserve development and investment income remain consistent with disciplined underwriting.",
              "failure": "Pricing falls below loss-cost trends, reserve development worsens or catastrophe exposure is persistently mispriced."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Book/TBV per share compounds at a rate that supports the locked action after normalization of catastrophe/investment noise.",
              "failure": "Headline earnings fail to become per-share book-value growth because underwriting quality deteriorates."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Underwriting moat and float economics remain durable across pricing and catastrophe cycles.",
              "failure": "Reserve, pricing or capital-allocation errors cause permanent book-value impairment."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "bc2dfb1a4509c0e3274a521c6419a19b8fcf36c0b5e64fbd5d98a491af880853"
        },
        {
          "id": "FC01-023",
          "ticker": "INTU",
          "company": "Intuit",
          "sector": "Software & Payments",
          "lockClass": "CARRIED CLEAN BASELINE — NOT DOUBLE-COUNTED",
          "lockedAt": "2026-09-01T13:30:00+03:00",
          "price": 359.3,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T13:30:00+03:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/intu/",
          "primaryEvidenceDate": "2026-08-25",
          "primaryEvidenceTitle": "FY2026/FY2027 results",
          "primarySourceUrl": "https://investors.intuit.com/news-events/press-releases/detail/1250/intuit-reports-strong-fourth-quarter-and-full-year-fiscal-2026-results",
          "keyEvidence": [
            "Locked V10.17 baseline carried forward without re-locking",
            "FY26 revenue $21.448B; OCF $8.838B",
            "FY27 revenue growth guide reset to 9–10%; buybacks reduced diluted share count"
          ],
          "economicEngine": "Workflow/data lock-in + attach monetization → owner earnings/share",
          "valuationContext": "Locked IV range $385–475; expected value ~$425",
          "officialDecision": "BUY",
          "officialAction": "BUY / ADD",
          "positionSizing": "3–6% while gates pass",
          "confidence": "MEDIUM–HIGH",
          "thesis": "Owner cash compounding remains durable despite a growth reset; the lock price provides enough protection if GBS and TurboTax moat remain intact.",
          "killTrigger": "Structural GBS slowdown, weaker owner cash/share, tax-policy/AI moat break, or value-destructive acquisition.",
          "benchmarks": [
            "SPY",
            "IGV"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Core organic demand and per-share cash economics stay aligned with the locked thesis; evidence quality remains high.",
              "failure": "Adjusted metrics diverge from owner cash/share or the company-specific hard gate in the kill trigger is hit."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized FCF/owner earnings per share support the locked valuation/action without relying on narrative or acquisitions alone.",
              "failure": "Per-share economics weaken structurally or capital allocation/dilution offsets reported growth."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Moat and per-share owner earnings compound positively while major AI/platform transitions are monetized rather than merely announced.",
              "failure": "Moat erosion, balance-sheet stress or capital allocation permanently impairs per-share value."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "4bd21ff126c3a6dd5aab3f25719f470ebde34dec0ffd675952e11f6b33201ed3"
        },
        {
          "id": "FC01-024",
          "ticker": "CRM",
          "company": "Salesforce",
          "sector": "Software & Payments",
          "lockClass": "CARRIED CLEAN BASELINE — NOT DOUBLE-COUNTED",
          "lockedAt": "2026-09-01T13:30:00+03:00",
          "price": 261.61,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T13:30:00+03:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/crm/",
          "primaryEvidenceDate": "2026-08-26",
          "primaryEvidenceTitle": "Q2 FY2027 results",
          "primarySourceUrl": "https://investor.salesforce.com/news/news-details/2026/Salesforce-Delivers-Record-Second-Quarter-Fiscal-2027-Results/default.aspx",
          "keyEvidence": [
            "Locked V10.17 baseline carried forward without re-locking",
            "cRPO $33.5B (+14%); revenue $11.345B (+11%)",
            "Informatica contribution and strategic-investment gains reduce headline comparability; debt rose with ASR"
          ],
          "economicEngine": "Paid organic AI usage → cRPO/ARPU → FCF/share",
          "valuationContext": "Locked live ensemble near ~$269, close to lock price",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "Recurring demand is solid, but organic AI monetization and per-share FCF must outrun acquisition contribution, SBC and higher leverage.",
          "killTrigger": "Organic cRPO weakens, AI seat compression exceeds usage monetization, debt/SBC/M&A prevent per-share compounding.",
          "benchmarks": [
            "SPY",
            "IGV"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Core organic demand and per-share cash economics stay aligned with the locked thesis; evidence quality remains high.",
              "failure": "Adjusted metrics diverge from owner cash/share or the company-specific hard gate in the kill trigger is hit."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized FCF/owner earnings per share support the locked valuation/action without relying on narrative or acquisitions alone.",
              "failure": "Per-share economics weaken structurally or capital allocation/dilution offsets reported growth."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Moat and per-share owner earnings compound positively while major AI/platform transitions are monetized rather than merely announced.",
              "failure": "Moat erosion, balance-sheet stress or capital allocation permanently impairs per-share value."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "3551943feef30d97c63d882cf35de993542e842358378dbb7f7290ef05166d6c"
        },
        {
          "id": "FC01-025",
          "ticker": "ORCL",
          "company": "Oracle",
          "sector": "Software & Payments",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 143.23,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T11:57:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/orcl/",
          "primaryEvidenceDate": "2026-06-16",
          "primaryEvidenceTitle": "FY2026 results",
          "primarySourceUrl": "https://investor.oracle.com/investor-news/news-details/2026/Oracle-Announces-Fiscal-2026-Fourth-Quarter-and-Full-Year-Financial-Results/default.aspx",
          "keyEvidence": [
            "FY26 revenue ~$67.4B (+17%); cloud ~$34B (+39%)",
            "IaaS ~$18.1B (+77%); RPO ~$638B",
            "OCF ~$32B but FCF deeply negative because cloud capex surged; next earnings Sep 4"
          ],
          "economicEngine": "Cloud backlog conversion × OCI margin − infrastructure capex/funding cost",
          "valuationContext": "Forward multiple looks moderate, but funding bridge and capex intensity dominate owner economics",
          "officialDecision": "WAIT FOR EARNINGS",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "OCI/backlog growth is extraordinary, but owner economics cannot be judged from revenue alone while capex keeps FCF deeply negative; wait for the imminent evidence refresh.",
          "killTrigger": "Backlog fails to convert, capex/financing stays structurally above owner cash generation, cloud margins disappoint, or leverage constrains flexibility.",
          "benchmarks": [
            "SPY",
            "IGV"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Core organic demand and per-share cash economics stay aligned with the locked thesis; evidence quality remains high.",
              "failure": "Adjusted metrics diverge from owner cash/share or the company-specific hard gate in the kill trigger is hit."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized FCF/owner earnings per share support the locked valuation/action without relying on narrative or acquisitions alone.",
              "failure": "Per-share economics weaken structurally or capital allocation/dilution offsets reported growth."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Moat and per-share owner earnings compound positively while major AI/platform transitions are monetized rather than merely announced.",
              "failure": "Moat erosion, balance-sheet stress or capital allocation permanently impairs per-share value."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "8053a0f34da98b3a396d66c81219b47aea29d0f8a4d7351177e72f5669011695"
        },
        {
          "id": "FC01-026",
          "ticker": "FIS",
          "company": "Fidelity National Information Services",
          "sector": "Software & Payments",
          "lockClass": "CARRIED CLEAN BASELINE — NOT DOUBLE-COUNTED",
          "lockedAt": "2026-09-01T13:30:00+03:00",
          "price": 40.77,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T13:30:00+03:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/fis/",
          "primaryEvidenceDate": "2026-08-04",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.investor.fisglobal.com/news-releases/news-release-details/fis-reports-second-quarter-2026-results",
          "keyEvidence": [
            "Locked V10.17 baseline carried forward without re-locking",
            "FY26 FCF guide raised to $2.15–2.25B",
            "Pro-forma revenue growth guide cut to 4.5–5.0%; leverage/capital allocation remains hard gate"
          ],
          "economicEngine": "Recurring bank-tech revenue + FCF → actual deleveraging → equity value",
          "valuationContext": "Locked IV $48–60, but cheapness is overridden by management/capital-allocation gate",
          "officialDecision": "PROVE IT",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "The stock is cheap only if FCF actually reaches equity through debt reduction and disciplined capital allocation.",
          "killTrigger": "Debt/net leverage fails to decline, transaction exclusions obscure cash, growth weakens further, or M&A resumes before balance-sheet repair.",
          "benchmarks": [
            "SPY",
            "IGV"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Core organic demand and per-share cash economics stay aligned with the locked thesis; evidence quality remains high.",
              "failure": "Adjusted metrics diverge from owner cash/share or the company-specific hard gate in the kill trigger is hit."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized FCF/owner earnings per share support the locked valuation/action without relying on narrative or acquisitions alone.",
              "failure": "Per-share economics weaken structurally or capital allocation/dilution offsets reported growth."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Moat and per-share owner earnings compound positively while major AI/platform transitions are monetized rather than merely announced.",
              "failure": "Moat erosion, balance-sheet stress or capital allocation permanently impairs per-share value."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "deed4548c67ef8325e299cb498089e7827814b2077cd70f5354421713e258c73"
        },
        {
          "id": "FC01-027",
          "ticker": "ETN",
          "company": "Eaton",
          "sector": "Industrials",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 390.23,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:00:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/etn/",
          "primaryEvidenceDate": "2026-07-31",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.eaton.com/us/en-us/company/news-insights/news-releases/2026/eaton-reports-record-second-quarter-2026-results.html",
          "keyEvidence": [
            "Q2 sales $8.5B (+21%); organic +14%",
            "Electrical Americas orders +41%; Global orders +33%",
            "Electrical backlog +43%; FCF $874M (+22%); lock quote ~41x trailing / 27x forward"
          ],
          "economicEngine": "Electrical installed base + orders/backlog + service content → owner earnings",
          "valuationContext": "Exceptional demand visibility, but premium valuation and acquisition mix leave little room for normalization",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM–HIGH",
          "thesis": "The business is excellent and backlog is strong; official rules still require more margin of safety at this valuation rather than crediting premium-compounder optionality.",
          "killTrigger": "Orders/backlog cancel, organic growth slows before capacity monetizes, margins/ROIC compress, or acquisition-driven growth earns poor returns.",
          "benchmarks": [
            "SPY",
            "XLI"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Orders/backlog convert into revenue and cash at acceptable margins; no material cancellation/capacity overbuild signal.",
              "failure": "Backlog/order growth decelerates sharply while margins or cash conversion weaken."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Owner earnings and ROIC validate the premium/valuation stance after backlog normalization.",
              "failure": "Growth proves acquisition/cycle-driven without sustainable ROIC or per-share cash compounding."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Installed-base/content moat compounds through a slower capex environment.",
              "failure": "Overcapacity, customer concentration or low-return acquisitions create permanent IV impairment."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "f7381689ed05a5d1194e4e9122af61cd17371f32f0dd6ac8c021c6f81d4c053e"
        },
        {
          "id": "FC01-028",
          "ticker": "VRT",
          "company": "Vertiv",
          "sector": "Industrials",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 253.42,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:05:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/vrt/",
          "primaryEvidenceDate": "2026-07-29",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://investors.vertiv.com/news-releases/news-release-details/vertiv-reports-strong-second-quarter-2026-results",
          "keyEvidence": [
            "Q2 sales ~$3.27B (+24%)",
            "Adjusted operating margin ~22.6% (+410bp)",
            "OCF ~$1.1B / FCF ~$925M; FY organic sales guide ~31%"
          ],
          "economicEngine": "Data-center capacity build × power/cooling content × margin",
          "valuationContext": "Operating inflection is real, but lock quote ~57x trailing / 32x forward earnings prices sustained AI infrastructure intensity",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "Cash conversion and margins have validated the business inflection; the remaining question is whether current price overcapitalizes a very strong but cyclical infrastructure build.",
          "killTrigger": "Backlog/orders slow sharply, hyperscaler capex ROI weakens, margins mean-revert, or customer concentration drives excess capacity.",
          "benchmarks": [
            "SPY",
            "XLI"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Orders/backlog convert into revenue and cash at acceptable margins; no material cancellation/capacity overbuild signal.",
              "failure": "Backlog/order growth decelerates sharply while margins or cash conversion weaken."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Owner earnings and ROIC validate the premium/valuation stance after backlog normalization.",
              "failure": "Growth proves acquisition/cycle-driven without sustainable ROIC or per-share cash compounding."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Installed-base/content moat compounds through a slower capex environment.",
              "failure": "Overcapacity, customer concentration or low-return acquisitions create permanent IV impairment."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "57ced345b6122541eb75b23ea534209af81cfd14bdc8bc063375a50cb2340918"
        },
        {
          "id": "FC01-029",
          "ticker": "LLY",
          "company": "Eli Lilly",
          "sector": "Healthcare & Biopharma",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 1164.99,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:09:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/lly/",
          "primaryEvidenceDate": "2026-08-06",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://investor.lilly.com/news-releases/news-release-details/lilly-reports-second-quarter-2026-financial-results",
          "keyEvidence": [
            "Q2 revenue ~$23B (+48%)",
            "Mounjaro ~$9.9B (+91%); Zepbound ~$4.9B (+44%)",
            "2026 revenue guide ~$85–87B; lock quote ~39x trailing / 28x forward earnings"
          ],
          "economicEngine": "Patient volume/access/capacity × net price + pipeline optionality",
          "valuationContext": "Outstanding GLP-1 growth and pipeline, but product concentration, pricing/access and premium duration remain material",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM–HIGH",
          "thesis": "The franchise is exceptional, but official rules do not waive margin of safety for premium compounders; capacity and pipeline must convert while pricing/access remain durable.",
          "killTrigger": "GLP-1 pricing/access deteriorates, competitive efficacy/safety closes the moat, supply/capacity economics disappoint, or pipeline concentration risk rises.",
          "benchmarks": [
            "SPY",
            "XLV"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Volume/access/capacity and pipeline evidence remain strong with no material safety/pricing impairment.",
              "failure": "Pricing/access, safety, competition or capacity materially weakens the GLP-1/pipeline economics."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Per-share earnings/cash growth remains consistent with durable product economics after pricing and competition normalize.",
              "failure": "Growth depends on unsustainable price/mix or pipeline expectations while cash economics disappoint."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Lifecycle/pipeline renewal diversifies product concentration and compounds normalized intrinsic value.",
              "failure": "Concentration, patent/pipeline or payer pressure causes permanent earnings-power impairment."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "0ef0c07fc4211c07973c2315461236bf56924aa0eed542ec0236b6fe661289d9"
        },
        {
          "id": "FC01-030",
          "ticker": "COST",
          "company": "Costco Wholesale",
          "sector": "Consumer Staples",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:24:36+03:00",
          "price": 946.76,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T12:07:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/cost/",
          "primaryEvidenceDate": "2026-05-28",
          "primaryEvidenceTitle": "Q3 FY2026 results",
          "primarySourceUrl": "https://investor.costco.com/news/news-details/2026/Costco-Wholesale-Corporation-Reports-Third-Quarter-and-Year-to-Date-Operating-Results-for-Fiscal-2026/default.aspx",
          "keyEvidence": [
            "Q3 net sales ~$69.15B (+11.6%)",
            "Adjusted comparable sales ~6.6%; digitally enabled comps +20.8%",
            "Lock quote ~47.5x trailing / 43x forward earnings"
          ],
          "economicEngine": "Membership/traffic × basket × renewal economics − low-margin merchandise costs",
          "valuationContext": "World-class membership moat, but valuation requires very long durability and leaves limited margin for normal retail execution noise",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "HIGH business / MEDIUM investment",
          "thesis": "The business is one of the highest-quality compounders in the cohort, but official rules require a better price or stronger reverse-expectations edge before adding capital.",
          "killTrigger": "Renewal/traffic or full-price sales weaken, gross margin/membership economics deteriorate, expansion returns fall, or valuation stays extreme while owner earnings slow.",
          "benchmarks": [
            "SPY",
            "XLP"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Renewal/traffic/comps and membership economics remain strong without margin quality deterioration.",
              "failure": "Traffic/renewal or gross-margin quality weakens enough to challenge the membership moat."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Owner earnings per share compound enough to justify the locked premium-quality stance.",
              "failure": "Business remains good but valuation was too demanding relative to normalized per-share growth."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Membership moat and expansion runway remain durable with positive per-share value compounding.",
              "failure": "Moat/expansion returns weaken or premium valuation combines with slower owner earnings to destroy expected returns."
            }
          ],
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "3348e765ec6cef25af724e4d772d7ea63380c10a2182f58598d1b1b29833ecdd"
        }
      ],
      "masterCohortSha256": "4809893161a27af500d7c6e4c5a67b41a853614134f55083b50c9e726cdee080"
    },
    {
      "version": "V10.25",
      "cohortId": "FC02",
      "lockedAt": "2026-09-01T19:37:35+03:00",
      "officialForward": true,
      "policy": {
        "targetLockedDecisions": 100,
        "minimumResolvedForGate": 30,
        "promotionGatePct": 60,
        "priorCleanLocks": 30,
        "newUniqueLocks": 30,
        "cleanForwardLockedAfterCohort": 60,
        "resolved": 0,
        "sameDayCohortWarning": "All FC02 locks are from one date/regime and therefore do not count as 30 fully independent experiments. Independence weights are stored separately.",
        "noForcedActionRule": "A lock is an observation, not a trade. NO ACTION is a valid pre-registered decision."
      },
      "macroRegime": {
        "asOf": "2026-09-01",
        "state": "TIGHT / INFLATIONARY / HIGH-YIELD RISK",
        "summary": "US and European long yields are elevated, oil is near $92 and markets are pricing renewed tightening risk. This increases the required margin of safety for duration, leverage and capex-heavy businesses.",
        "rule": "Macro can cap sizing or raise required safety margin; it cannot create or override a company hard gate."
      },
      "cases": [
        {
          "id": "FC02-001",
          "ticker": "LRCX",
          "company": "Lam Research",
          "sector": "AI & Semiconductors",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 290.44,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/lrcx/",
          "primaryEvidenceDate": "2026-07-29",
          "primaryEvidenceTitle": "June quarter / FY2026 results",
          "primarySourceUrl": "https://investor.lamresearch.com/",
          "keyEvidence": [
            "June-quarter revenue $6.72B; GAAP gross margin 51.7%",
            "September-quarter revenue guide $8.10B ±$0.40B",
            "Installed-base/service plus leading-edge WFE remain strong"
          ],
          "economicEngine": "WFE intensity × leading-edge fab spend + installed-base service",
          "valuationContext": "Exceptional economics, but forward multiple/duration still embed a strong AI/fab cycle.",
          "officialDecision": "WATCH",
          "officialAction": "BUY LOWER",
          "positionSizing": "0%",
          "confidence": "MEDIUM–HIGH",
          "thesis": "Lam is a high-quality semiconductor compounder, but current entry must survive a normalized WFE cycle rather than capitalize peak AI intensity.",
          "killTrigger": "WFE/order rollover, China/export structural loss, service weakening or normalized FCF materially below the locked valuation.",
          "benchmarks": [
            "SPY",
            "SOXX"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "AI/leading-edge WFE demand, service revenue and margins remain healthy without inventory/customer-financing deterioration.",
              "failure": "Orders/utilization roll over, China/export limits cause structural demand loss, or cash conversion weakens materially."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized FCF supports the locked valuation after cycle normalization and installed-base/service economics remain durable.",
              "failure": "Peak-cycle earnings were capitalized as permanent and normalized owner cash falls materially below the locked thesis."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Technology intensity and service annuity preserve per-share value through at least one semiconductor spending reset.",
              "failure": "Share loss, node transition failure or capital intensity destroys normalized returns."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "SEMICAP",
            "economicEngineCluster": "WFE",
            "macroFactors": [
              "AI_CAPEX",
              "SEMICONDUCTOR_CYCLE",
              "CHINA_EXPORT",
              "RATES_DURATION"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "62b2dd2fe275920f6b930846cac709a00e7ea2bd87c8d560db40e66b760d2f91"
        },
        {
          "id": "FC02-002",
          "ticker": "MU",
          "company": "Micron Technology",
          "sector": "AI & Semiconductors",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 954.3,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/mu/",
          "primaryEvidenceDate": "2026-06-24",
          "primaryEvidenceTitle": "Q3 FY2026 results",
          "primarySourceUrl": "https://investors.micron.com/",
          "keyEvidence": [
            "Q3 FY26 revenue $41.46B; operating cash flow $25.39B",
            "AI/HBM demand drove extraordinary memory pricing and mix",
            "Forward valuation looks low on peak earnings, so cycle normalization is critical"
          ],
          "economicEngine": "Memory bit demand × pricing/HBM mix − capex and cycle oversupply",
          "valuationContext": "Low forward multiple is not a margin of safety unless peak memory pricing is normalized.",
          "officialDecision": "WATCH",
          "officialAction": "STARTER",
          "positionSizing": "0.5–1.0%",
          "confidence": "MEDIUM",
          "thesis": "HBM demand and industry structure are materially better, but a small starter is the maximum justified before proving normalized cash across the next supply response.",
          "killTrigger": "Inventory/pricing inflects down sharply, capex recreates oversupply, or normalized FCF falls below the starter case.",
          "benchmarks": [
            "SPY",
            "SOXX"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "HBM/DRAM demand remains strong but pricing, inventory and capex show no evidence of a destructive oversupply turn.",
              "failure": "Pricing/inventory turns sharply before cash returns repair the balance sheet or peak earnings are over-capitalized."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Cycle-normalized FCF remains attractive after explicitly hair-cutting peak HBM pricing and adding replacement capex.",
              "failure": "Normalized earnings collapse enough to invalidate the locked valuation or capex creates the next oversupply cycle."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Memory industry structure remains more disciplined and per-share cash survives a full pricing cycle.",
              "failure": "The thesis depended on a one-cycle shortage and permanent-loss risk rises through leverage/capex."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "SEMICAP",
            "economicEngineCluster": "MEMORY",
            "macroFactors": [
              "AI_CAPEX",
              "SEMICONDUCTOR_CYCLE",
              "CHINA_EXPORT",
              "CAPEX_CYCLE"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "2e834a153d9c617e17045e11fd0d4ba49308fbfea3633f35bac46ee5a37d047c"
        },
        {
          "id": "FC02-003",
          "ticker": "PWR",
          "company": "Quanta Services",
          "sector": "Power & Grid",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 599.68,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:23:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/pwr/",
          "primaryEvidenceDate": "2026-07-30",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://investors.quantaservices.com/",
          "keyEvidence": [
            "Q2 revenue $9.56B; adjusted EBITDA ~$1.1B",
            "RPO $33.6B; backlog $53.4B",
            "2026 FCF guide raised to $2.0–2.5B"
          ],
          "economicEngine": "Backlog/RPO conversion × grid/data-center infrastructure margins − working capital",
          "valuationContext": "Backlog quality is exceptional, but the equity still prices a long infrastructure supercycle.",
          "officialDecision": "WATCH",
          "officialAction": "BUY LOWER",
          "positionSizing": "0%",
          "confidence": "MEDIUM–HIGH",
          "thesis": "Grid and data-center buildout create unusually strong visibility, but margin of safety must recognize same-factor exposure already present in ETN/VRT.",
          "killTrigger": "Backlog cancellations, FCF conversion miss, labor/material pressure or data-center/grid capex deceleration.",
          "benchmarks": [
            "SPY",
            "PAVE"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Backlog converts to revenue/FCF with healthy margins; cancellations and working-capital absorption remain controlled.",
              "failure": "Backlog proves low quality, margins compress, or acquisitions/capex absorb cash faster than earnings grow."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Owner FCF/share validates current backlog economics after normalizing AI/data-center enthusiasm.",
              "failure": "Reported growth fails to become per-share cash value or valuation required unrealistic duration."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Installed base/service and grid electrification compound through at least one capex-cycle slowdown.",
              "failure": "Competitive capacity or execution erodes returns and permanent capital loss risk rises."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "POWER_GRID",
            "economicEngineCluster": "GRID_BACKLOG",
            "macroFactors": [
              "AI_CAPEX",
              "POWER_DEMAND",
              "RATES_DURATION",
              "INFRA_CAPEX"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "02cd1415c6be59d248a0a39a929b85ce13ba24a78bd3acd83722ef5a32a06214"
        },
        {
          "id": "FC02-004",
          "ticker": "GEV",
          "company": "GE Vernova",
          "sector": "Power & Grid",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 898.53,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-08-31T16:00:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/gev/",
          "primaryEvidenceDate": "2026-07-22",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.gevernova.com/investors",
          "keyEvidence": [
            "Orders $24.2B +88% organic; backlog $176B",
            "Revenue $11.1B +22%; adjusted EBITDA margin 11.3%",
            "FCF $5.1B; guidance raised"
          ],
          "economicEngine": "Orders/backlog × execution + service margins",
          "valuationContext": "Business inflection is real, but a ~40x+ forward earnings valuation leaves little room for execution error.",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "Vernova has one of the strongest grid/power backlogs in the market, but ARGUS will not capitalize the current inflection as a permanent margin without a better entry.",
          "killTrigger": "Backlog quality deteriorates, wind/grid execution charges recur, service margins disappoint or valuation remains detached from normalized FCF.",
          "benchmarks": [
            "SPY",
            "PAVE"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Backlog converts to revenue/FCF with healthy margins; cancellations and working-capital absorption remain controlled.",
              "failure": "Backlog proves low quality, margins compress, or acquisitions/capex absorb cash faster than earnings grow."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Owner FCF/share validates current backlog economics after normalizing AI/data-center enthusiasm.",
              "failure": "Reported growth fails to become per-share cash value or valuation required unrealistic duration."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Installed base/service and grid electrification compound through at least one capex-cycle slowdown.",
              "failure": "Competitive capacity or execution erodes returns and permanent capital loss risk rises."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "POWER_GRID",
            "economicEngineCluster": "GRID_BACKLOG",
            "macroFactors": [
              "AI_CAPEX",
              "POWER_DEMAND",
              "RATES_DURATION",
              "INFRA_CAPEX"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "bf0bbfb29797baad9f5e2bf25922a2a7eb265c3aad9f1e8b4820cd2a99cbecec"
        },
        {
          "id": "FC02-005",
          "ticker": "SU.PA",
          "company": "Schneider Electric",
          "sector": "Power & Grid",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 294.6,
          "priceCurrency": "EUR",
          "priceTimestamp": "2026-09-01T13:00:00+02:00",
          "priceSourceUrl": "https://simplywall.st/stocks/fr/capital-goods/epa-su/schneider-electric-shares",
          "primaryEvidenceDate": "2026-07-30",
          "primaryEvidenceTitle": "H1/Q2 2026 results",
          "primarySourceUrl": "https://www.se.com/ww/en/about-us/investor-relations/",
          "keyEvidence": [
            "Q2 revenue +17% organic to ~€11.5B",
            "H1 adjusted EBITA €4.1B, margin 19.3%",
            "H1 FCF €1.6B; 2026 target upgraded"
          ],
          "economicEngine": "Energy-management installed base + automation/software/service",
          "valuationContext": "Elite compounder near the upper end of its range; valuation requires durable electrification and data-center growth.",
          "officialDecision": "WATCH",
          "officialAction": "BUY LOWER",
          "positionSizing": "0%",
          "confidence": "HIGH",
          "thesis": "Schneider has a deep electrification/automation moat, but current price offers less error tolerance than the business quality deserves.",
          "killTrigger": "Organic growth/margins normalize below expectations, data-center demand rolls over or incremental ROIC weakens.",
          "benchmarks": [
            "CAC40",
            "EXH1"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Backlog converts to revenue/FCF with healthy margins; cancellations and working-capital absorption remain controlled.",
              "failure": "Backlog proves low quality, margins compress, or acquisitions/capex absorb cash faster than earnings grow."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Owner FCF/share validates current backlog economics after normalizing AI/data-center enthusiasm.",
              "failure": "Reported growth fails to become per-share cash value or valuation required unrealistic duration."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Installed base/service and grid electrification compound through at least one capex-cycle slowdown.",
              "failure": "Competitive capacity or execution erodes returns and permanent capital loss risk rises."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "POWER_GRID",
            "economicEngineCluster": "GRID_AUTOMATION",
            "macroFactors": [
              "AI_CAPEX",
              "POWER_DEMAND",
              "EU_CYCLE",
              "RATES_DURATION"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "04a3efd440e07d843b7176d94d46cf50b46964d719f61b80ff1e75a02b77a711"
        },
        {
          "id": "FC02-006",
          "ticker": "IFF",
          "company": "International Flavors & Fragrances",
          "sector": "Specialty Ingredients",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 86.33,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-08-31T16:00:00-04:00",
          "priceSourceUrl": "https://www.financialcontent.com/quote/NY:IFF/historical",
          "primaryEvidenceDate": "2026-08-05",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://ir.iff.com/",
          "keyEvidence": [
            "FY26 continuing-ops sales guide $7.4–7.6B",
            "Adjusted EBITDA guide $1.53–1.60B",
            "Comparable CC sales growth guide 2–4%; portfolio repair continues"
          ],
          "economicEngine": "Formulation/customer lock-in + portfolio mix − acquisition/leverage burden",
          "valuationContext": "Repair is visible, but current price is close to recent highs and owner-cash/deleveraging proof is still required.",
          "officialDecision": "PROVE IT",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "IFF can become a quality recovery, but ARGUS requires clean FCF-to-debt reduction and organic margin improvement before new capital.",
          "killTrigger": "FCF fails to reduce leverage, divestiture adjustments obscure owner cash, or organic growth/margins stall.",
          "benchmarks": [
            "SPY",
            "IYM"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Organic growth, price/mix and EBITDA/FCF improve without acquisition accounting masking the core.",
              "failure": "Organic growth stalls, working capital/capex absorbs cash or acquisition integration weakens margins."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized FCF/share and acquisition-cohort ROIC support the locked action.",
              "failure": "Acquired growth fails to earn cost of capital or leverage/adjustments obscure owner economics."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Customer intimacy/formulation moat compounds per-share value across input-cost cycles.",
              "failure": "Portfolio complexity or acquisition discipline destroys per-share economics."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "SPECIALTY_INGREDIENTS",
            "economicEngineCluster": "INGREDIENTS_REPAIR",
            "macroFactors": [
              "CONSUMER_CYCLE",
              "INPUT_COSTS",
              "M&A_INTEGRATION",
              "RATES_CREDIT"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "4d4036304d52fe25d41c3a1f33c5f2123319437612ed5377b358048ea2aa5060"
        },
        {
          "id": "FC02-007",
          "ticker": "GIVN.SW",
          "company": "Givaudan",
          "sector": "Specialty Ingredients",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 3237,
          "priceCurrency": "CHF",
          "priceTimestamp": "2026-09-01T13:00:00+02:00",
          "priceSourceUrl": "https://www.givaudan.com/investors",
          "primaryEvidenceDate": "2026-07-23",
          "primaryEvidenceTitle": "H1 2026 results",
          "primarySourceUrl": "https://www.givaudan.com/investors",
          "keyEvidence": [
            "H1 sales CHF3.799B, +3.6% LFL",
            "Adjusted EBITDA CHF923M, 24.3% margin",
            "Adjusted FCF -3.1% of sales due investment/working capital"
          ],
          "economicEngine": "Customer intimacy + innovation + pricing power",
          "valuationContext": "Best-in-class moat, but premium valuation and temporarily weak FCF reduce current entry attractiveness.",
          "officialDecision": "WATCH",
          "officialAction": "BUY LOWER",
          "positionSizing": "0%",
          "confidence": "HIGH",
          "thesis": "Givaudan remains the quality benchmark, but a better price or normalized cash conversion is required before allocating.",
          "killTrigger": "LFL growth/pricing weakens, working-capital/capex drag persists or premium valuation assumes unrealistic moat duration.",
          "benchmarks": [
            "SMI",
            "EXH1"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Organic growth, price/mix and EBITDA/FCF improve without acquisition accounting masking the core.",
              "failure": "Organic growth stalls, working capital/capex absorbs cash or acquisition integration weakens margins."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized FCF/share and acquisition-cohort ROIC support the locked action.",
              "failure": "Acquired growth fails to earn cost of capital or leverage/adjustments obscure owner economics."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Customer intimacy/formulation moat compounds per-share value across input-cost cycles.",
              "failure": "Portfolio complexity or acquisition discipline destroys per-share economics."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "SPECIALTY_INGREDIENTS",
            "economicEngineCluster": "FLAVOR_FRAGRANCE",
            "macroFactors": [
              "CONSUMER_CYCLE",
              "INPUT_COSTS",
              "FX",
              "RATES_DURATION"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "a478f0d7d894bc5232ced504d89cbb425e0ba5c06b701ee61e11e91fff07a48f"
        },
        {
          "id": "FC02-008",
          "ticker": "TRPZ.TA",
          "company": "Turpaz Industries",
          "sector": "Specialty Ingredients",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 57.43,
          "priceCurrency": "ILS",
          "priceTimestamp": "2026-09-01T16:30:00+03:00",
          "priceSourceUrl": "https://market.tase.co.il/",
          "primaryEvidenceDate": "2026-08-20",
          "primaryEvidenceTitle": "Q2/H1 2026 results",
          "primarySourceUrl": "https://mayafiles.tase.co.il/",
          "keyEvidence": [
            "H1 revenue $173.9M +40.5%; organic +8.1%",
            "Q2 revenue $90.2M +42.3%; organic +7.3%",
            "H1 adjusted EBITDA $40.0M +41.6%; acquisition cadence remains high"
          ],
          "economicEngine": "Organic niche growth + acquisition platform economics",
          "valuationContext": "Growth is strong, but acquisition-cohort ROIC must be proven separately from headline growth.",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "Turpaz is a credible acquisitive compounder candidate; ARGUS will not convert headline M&A growth into intrinsic value until cohort returns and leverage are explicit.",
          "killTrigger": "Organic growth weakens, acquisition cohorts fail to earn cost of capital, integration/leverage rises or cash conversion deteriorates.",
          "benchmarks": [
            "TA-125",
            "IFF"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Organic growth, price/mix and EBITDA/FCF improve without acquisition accounting masking the core.",
              "failure": "Organic growth stalls, working capital/capex absorbs cash or acquisition integration weakens margins."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized FCF/share and acquisition-cohort ROIC support the locked action.",
              "failure": "Acquired growth fails to earn cost of capital or leverage/adjustments obscure owner economics."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Customer intimacy/formulation moat compounds per-share value across input-cost cycles.",
              "failure": "Portfolio complexity or acquisition discipline destroys per-share economics."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "SPECIALTY_INGREDIENTS",
            "economicEngineCluster": "ACQUISITIVE_INGREDIENTS",
            "macroFactors": [
              "M&A_INTEGRATION",
              "FX",
              "CONSUMER_CYCLE",
              "RATES_CREDIT"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "d9b3d855dad68e5a7a8246b939a59d062eb8b4e7f4ae9b2fa4d52fceb4f910c5"
        },
        {
          "id": "FC02-009",
          "ticker": "FISV",
          "company": "Fiserv",
          "sector": "Software & Payments",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 52.54,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/fisv/",
          "primaryEvidenceDate": "2026-07-29",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://investors.fiserv.com/",
          "keyEvidence": [
            "Q2 organic revenue -5%",
            "Adjusted EPS -26%",
            "2026 organic revenue outlook cut to -1% to 0%"
          ],
          "economicEngine": "Merchant/bank technology volumes + recurring revenue",
          "valuationContext": "Low multiple is not investable while the economic engine is contracting and guidance is falling.",
          "officialDecision": "AVOID",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM–HIGH",
          "thesis": "The cheap valuation is currently a warning, not an edge; Fiserv must prove organic stabilization and owner-cash integrity.",
          "killTrigger": "Further organic decline, client losses, adjusted metrics diverge from cash or management credibility deteriorates.",
          "benchmarks": [
            "SPY",
            "IPAY"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Organic transaction/revenue quality and transaction-margin dollars improve; retention and branded/merchant economics remain healthy.",
              "failure": "Low-quality volume, pricing pressure or adjusted metrics hide weak owner cash."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "FCF/share and organic growth support the locked valuation without acquisition/SBC distortion.",
              "failure": "Cheap multiple proves a value trap because durable growth or moat weakens."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Network/workflow position remains durable and per-share cash compounds.",
              "failure": "Disintermediation, share loss or capital allocation causes permanent impairment."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "PAYMENTS",
            "economicEngineCluster": "PAYMENTS_NETWORK",
            "macroFactors": [
              "CONSUMER_CYCLE",
              "SMB",
              "RATES_CREDIT",
              "TECH_DISRUPTION"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "ff789775f82e569fa4c6d8cc2071ca63a6368453712745a7eda589286d224407"
        },
        {
          "id": "FC02-010",
          "ticker": "PYPL",
          "company": "PayPal",
          "sector": "Software & Payments",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 52.83,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/pypl/",
          "primaryEvidenceDate": "2026-07-28",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://investor.pypl.com/",
          "keyEvidence": [
            "Q2 revenue growth ~5%",
            "Venmo/Braintree volume momentum and transaction-margin-dollar outlook improved",
            "Multi-year transformation continues; branded checkout moat still debated"
          ],
          "economicEngine": "Branded checkout/merchant TPV × take-rate/transaction margin",
          "valuationContext": "~10x earnings/FCF offers asymmetry if transaction-margin dollars and branded relevance stabilize.",
          "officialDecision": "WATCH",
          "officialAction": "STARTER",
          "positionSizing": "1–2%",
          "confidence": "MEDIUM",
          "thesis": "PayPal has enough valuation protection for a small starter, but only if transaction-margin dollars and branded checkout quality keep improving.",
          "killTrigger": "Branded checkout share erodes, transaction-margin dollars weaken, active engagement falls or buybacks fail to create per-share value.",
          "benchmarks": [
            "SPY",
            "IPAY"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Organic transaction/revenue quality and transaction-margin dollars improve; retention and branded/merchant economics remain healthy.",
              "failure": "Low-quality volume, pricing pressure or adjusted metrics hide weak owner cash."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "FCF/share and organic growth support the locked valuation without acquisition/SBC distortion.",
              "failure": "Cheap multiple proves a value trap because durable growth or moat weakens."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Network/workflow position remains durable and per-share cash compounds.",
              "failure": "Disintermediation, share loss or capital allocation causes permanent impairment."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "PAYMENTS",
            "economicEngineCluster": "PAYMENTS_NETWORK",
            "macroFactors": [
              "CONSUMER_CYCLE",
              "SMB",
              "RATES_CREDIT",
              "TECH_DISRUPTION"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "1846b5e0f14d3ea9ce4e9fa2fb54a6f30383836794f20dd9f6a3605c091b0bf6"
        },
        {
          "id": "FC02-011",
          "ticker": "MSFT",
          "company": "Microsoft",
          "sector": "Software & Payments",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 503.5,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/msft/",
          "primaryEvidenceDate": "2026-07-29",
          "primaryEvidenceTitle": "Q4/FY2026 results",
          "primarySourceUrl": "https://www.microsoft.com/en-us/Investor/",
          "keyEvidence": [
            "Q4 revenue $90B +18%; operating income $40.6B +18%",
            "Azure +43%; Microsoft Cloud revenue $59.3B +27%",
            "RPO $678B; capex remains very high and FCF conversion is the key AI test"
          ],
          "economicEngine": "Cloud/AI distribution + enterprise software annuity − AI capex",
          "valuationContext": "Exceptional quality, but current value depends on converting unprecedented AI infrastructure spending into durable owner cash.",
          "officialDecision": "WATCH",
          "officialAction": "BUY LOWER",
          "positionSizing": "0%",
          "confidence": "HIGH",
          "thesis": "Microsoft is among the strongest businesses in the cohort, but same-factor AI exposure and capex intensity justify waiting for more margin of safety.",
          "killTrigger": "AI capex remains structurally above monetization, Azure growth decelerates sharply, margins/FCF conversion weaken or regulatory remedies impair distribution.",
          "benchmarks": [
            "SPY",
            "IGV"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Cloud/AI demand and RPO monetize into revenue and FCF while capex efficiency shows no structural deterioration.",
              "failure": "AI capex outruns monetization, margins/cash conversion weaken or regulatory risk becomes structural."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Owner FCF/share supports the locked action after normalizing data-center capex and AI investment.",
              "failure": "Market capitalized AI duration that cash returns do not support."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Moat, distribution and reinvestment runway preserve high returns on incremental capital.",
              "failure": "Platform disruption/regulation or capex intensity permanently lowers owner returns."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "SOFTWARE_CLOUD",
            "economicEngineCluster": "CLOUD_AI",
            "macroFactors": [
              "AI_CAPEX",
              "ENTERPRISE_IT",
              "RATES_DURATION",
              "REGULATION"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "5c0f0dec13c4dc3e1c718a14638a2655b07084aef911f6deb992b08176853ba6"
        },
        {
          "id": "FC02-012",
          "ticker": "UBS",
          "company": "UBS Group",
          "sector": "Banks",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 55.73,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/ubs/",
          "primaryEvidenceDate": "2026-07-29",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.ubs.com/global/en/investor-relations.html",
          "keyEvidence": [
            "Q2 PBT $3.6B; net profit $2.8B",
            "Underlying RoCET1 16.4%; GWM net new assets $36B",
            "Swiss capital-rule uncertainty remains material despite integration progress"
          ],
          "economicEngine": "Wealth AUM/net new assets + banking spreads − capital requirements",
          "valuationContext": "High-quality wealth franchise and integration progress are offset by unresolved Swiss capital requirements.",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM–HIGH",
          "thesis": "UBS economics are improving, but regulatory capital is a direct equity-return variable and must be settled before aggressive sizing.",
          "killTrigger": "Capital requirement rises materially, integration costs persist, net new assets weaken or credit/funding quality deteriorates.",
          "benchmarks": [
            "SPY",
            "EUFN"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "ROTE/ROE, credit quality, capital and deposit/wealth flows remain healthy through the rate/credit regime.",
              "failure": "Credit costs, funding or capital regulation deteriorates faster than earnings can absorb."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "TBV/book value per share compounds after normalized credit costs and capital distributions.",
              "failure": "Headline profits fail to become per-share book-value growth or capital requirements reset returns."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Franchise earns above cost of equity through a normalized credit/rate cycle.",
              "failure": "Structural funding, regulation or credit errors impair tangible book value."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "BANKS",
            "economicEngineCluster": "WEALTH_BANK",
            "macroFactors": [
              "RATES_CREDIT",
              "REGULATION",
              "EU_CYCLE",
              "WEALTH_FLOWS"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "484080b1ac0979ea4e79569d2b6b16aaa14ddbf6547fca7ff2f4ae1666d7f50c"
        },
        {
          "id": "FC02-013",
          "ticker": "HSBC",
          "company": "HSBC Holdings",
          "sector": "Banks",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 160.6,
          "priceCurrency": "HKD",
          "priceTimestamp": "2026-09-01T16:00:00+08:00",
          "priceSourceUrl": "https://www.hsbc.com/investors",
          "primaryEvidenceDate": "2026-07-28",
          "primaryEvidenceTitle": "H1 2026 results",
          "primarySourceUrl": "https://www.hsbc.com/investors/results-and-announcements/all-reporting",
          "keyEvidence": [
            "H1 PBT $19.5B +23%; profit after tax $15.3B +23%",
            "Banking NII and fees improved",
            "Higher ECL/opex and Asia/China credit remain key swing factors"
          ],
          "economicEngine": "Deposit franchise + Asian credit/fees",
          "valuationContext": "Strong current earnings, but normalized China/Asia credit and rate sensitivity must be reflected before upgrading.",
          "officialDecision": "WATCH",
          "officialAction": "BUY LOWER",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "HSBC is profitable and well-capitalized, but ARGUS requires a wider margin of safety for China/Asia credit and geopolitical concentration.",
          "killTrigger": "ECL rises materially, deposit/funding economics weaken, China/HK asset quality deteriorates or capital distributions become unsustainable.",
          "benchmarks": [
            "HSI",
            "EUFN"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "ROTE/ROE, credit quality, capital and deposit/wealth flows remain healthy through the rate/credit regime.",
              "failure": "Credit costs, funding or capital regulation deteriorates faster than earnings can absorb."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "TBV/book value per share compounds after normalized credit costs and capital distributions.",
              "failure": "Headline profits fail to become per-share book-value growth or capital requirements reset returns."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Franchise earns above cost of equity through a normalized credit/rate cycle.",
              "failure": "Structural funding, regulation or credit errors impair tangible book value."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "BANKS",
            "economicEngineCluster": "ASIA_BANK",
            "macroFactors": [
              "RATES_CREDIT",
              "CHINA",
              "GEOPOLITICS",
              "REGULATION"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "0ff175ab4f6921e70a478142a8c2a2679e121ddb0bb3c1c4161d6b503ed373f1"
        },
        {
          "id": "FC02-014",
          "ticker": "LUMI.TA",
          "company": "Bank Leumi",
          "sector": "Banks",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 76.52,
          "priceCurrency": "ILS",
          "priceTimestamp": "2026-09-01T15:15:00+03:00",
          "priceSourceUrl": "https://www.leumi.co.il/en/Investor-Relations",
          "primaryEvidenceDate": "2026-08-13",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.leumi.co.il/en/Investor-Relations",
          "keyEvidence": [
            "Q2 net income NIS2.8B; ROE 16.3%",
            "Credit +9% YTD; NPL 0.45%",
            "CET1 11.65%; LCR 122%"
          ],
          "economicEngine": "Deposit franchise + credit growth × normalized losses",
          "valuationContext": "High ROE, low NPL and capital strength support a starter, with Israel geopolitical/tax/regulatory risk limiting size.",
          "officialDecision": "BUY",
          "officialAction": "STARTER",
          "positionSizing": "1–2%",
          "confidence": "MEDIUM–HIGH",
          "thesis": "Leumi combines attractive franchise returns and asset quality; a small position is justified if credit normalization remains controlled.",
          "killTrigger": "Credit losses/NPL rise sharply, capital falls toward constraints, funding deteriorates or geopolitical/regulatory stress causes structural book-value impairment.",
          "benchmarks": [
            "TA-35",
            "EUFN"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "ROTE/ROE, credit quality, capital and deposit/wealth flows remain healthy through the rate/credit regime.",
              "failure": "Credit costs, funding or capital regulation deteriorates faster than earnings can absorb."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "TBV/book value per share compounds after normalized credit costs and capital distributions.",
              "failure": "Headline profits fail to become per-share book-value growth or capital requirements reset returns."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Franchise earns above cost of equity through a normalized credit/rate cycle.",
              "failure": "Structural funding, regulation or credit errors impair tangible book value."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "BANKS",
            "economicEngineCluster": "ISRAEL_BANK",
            "macroFactors": [
              "RATES_CREDIT",
              "ISRAEL_GEOPOLITICS",
              "REGULATION",
              "HOUSING_CREDIT"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "2fa8104156541fe96042fd08ed93ba3a64d0e13853c989b6a5539d31c94238b0"
        },
        {
          "id": "FC02-015",
          "ticker": "MUV2",
          "company": "Munich Re",
          "sector": "Insurance",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 520.4,
          "priceCurrency": "EUR",
          "priceTimestamp": "2026-09-01T10:55:00+02:00",
          "priceSourceUrl": "https://www.munichre.com/en/company/investors.html",
          "primaryEvidenceDate": "2026-08-07",
          "primaryEvidenceTitle": "H1/Q2 2026 results",
          "primarySourceUrl": "https://www.munichre.com/en/company/investors/reports-and-presentations.html",
          "keyEvidence": [
            "H1 net result €3.925B; Q2 €2.211B",
            "P&C reinsurance combined ratio 68.9%; Solvency ~304%",
            "Renewal pricing softened ~5.5% risk-adjusted; cycle discipline now matters more"
          ],
          "economicEngine": "Risk pricing × underwriting margin + investment income",
          "valuationContext": "Excellent solvency and underwriting, but softer renewal pricing argues for a starter rather than full-size entry.",
          "officialDecision": "BUY",
          "officialAction": "STARTER",
          "positionSizing": "1–2%",
          "confidence": "HIGH",
          "thesis": "Munich Re has a high-quality underwriting/capital framework; current cycle softening caps position size but does not erase the quality/price case.",
          "killTrigger": "Risk-adjusted pricing falls below loss-cost trend, reserve/cat losses deteriorate, solvency weakens or management chases volume.",
          "benchmarks": [
            "DAX",
            "EXH1"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Combined ratio/technical margin, reserve development and solvency remain disciplined as pricing softens.",
              "failure": "Pricing falls below loss-cost trend, reserve deterioration appears or capital return weakens solvency."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Book/earnings per share compound at an attractive normalized rate after catastrophe/investment noise.",
              "failure": "Peak underwriting margins were over-capitalized or acquisitions dilute returns."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Underwriting/asset-management moat survives a full pricing cycle with strong capital discipline.",
              "failure": "Reserve/capital-allocation errors create permanent book-value impairment."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "INSURANCE",
            "economicEngineCluster": "REINSURANCE",
            "macroFactors": [
              "CAT_RISK",
              "RATES",
              "INSURANCE_PRICING",
              "EU_CYCLE"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "b1743429f40e89f13977fa7c1d3e9857b6a2078c1cbcabb0adb1a4b69f99fe00"
        },
        {
          "id": "FC02-016",
          "ticker": "ALV.DE",
          "company": "Allianz",
          "sector": "Insurance",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 449.2,
          "priceCurrency": "EUR",
          "priceTimestamp": "2026-09-01T19:38:00+02:00",
          "priceSourceUrl": "https://www.investing.com/equities/allianz-ag-historical-data?cid=23109",
          "primaryEvidenceDate": "2026-08-07",
          "primaryEvidenceTitle": "H1/Q2 2026 results",
          "primarySourceUrl": "https://www.allianz.com/en/investor_relations/results-reports.html",
          "keyEvidence": [
            "H1 operating profit €9.39B +8.6%",
            "Core net income €6.385B +15.5%; core RoE 20.7%",
            "Solvency II 225%; €2.5B buyback progressing"
          ],
          "economicEngine": "Underwriting + investment/asset-management economics",
          "valuationContext": "Strong ROE/solvency and capital return support a starter, but shares are near a 52-week high.",
          "officialDecision": "BUY",
          "officialAction": "STARTER",
          "positionSizing": "1–2%",
          "confidence": "HIGH",
          "thesis": "Allianz offers diversified high returns and strong capital; current valuation supports only a starter because re-rating has already occurred.",
          "killTrigger": "Combined ratio/asset-management flows deteriorate, solvency falls materially, large M&A destroys ROIC or capital returns weaken.",
          "benchmarks": [
            "DAX",
            "EXH1"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Combined ratio/technical margin, reserve development and solvency remain disciplined as pricing softens.",
              "failure": "Pricing falls below loss-cost trend, reserve deterioration appears or capital return weakens solvency."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Book/earnings per share compound at an attractive normalized rate after catastrophe/investment noise.",
              "failure": "Peak underwriting margins were over-capitalized or acquisitions dilute returns."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Underwriting/asset-management moat survives a full pricing cycle with strong capital discipline.",
              "failure": "Reserve/capital-allocation errors create permanent book-value impairment."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "INSURANCE",
            "economicEngineCluster": "MULTILINE_INSURANCE",
            "macroFactors": [
              "RATES",
              "INSURANCE_PRICING",
              "EU_CYCLE",
              "ASSET_FLOWS"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "42c96c7109b7b03d2725cdbdbcbc0b8de5d6a6562d0d1bdd1c7d9b30eb27a263"
        },
        {
          "id": "FC02-017",
          "ticker": "GOOGL",
          "company": "Alphabet",
          "sector": "Media & Internet",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 336.19,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/googl/",
          "primaryEvidenceDate": "2026-07-23",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://abc.xyz/investor/",
          "keyEvidence": [
            "Search/YouTube/Cloud remain high-return franchises",
            "AI capex is large and must translate into monetization and distribution defense",
            "Valuation is lower than several AI peers despite diversified owner cash"
          ],
          "economicEngine": "Traffic/engagement × monetization + cloud − AI capex",
          "valuationContext": "Quality and cash generation justify a starter if AI capex remains economically productive.",
          "officialDecision": "BUY",
          "officialAction": "STARTER",
          "positionSizing": "1–2%",
          "confidence": "HIGH",
          "thesis": "Alphabet offers a stronger quality/valuation balance than many AI-linked assets, while AI capex/regulation justify a measured entry.",
          "killTrigger": "Search monetization/share structurally weakens, AI capex outruns FCF, Cloud economics disappoint or regulatory remedies impair distribution.",
          "benchmarks": [
            "SPY",
            "XLC"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "User/advertiser engagement and AI monetization translate into operating cash while capex remains economically justified.",
              "failure": "AI capex grows faster than monetization, ad pricing/engagement weakens or regulation impairs targeting/distribution."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized FCF/share supports the locked valuation after capex and regulatory costs.",
              "failure": "Headline revenue masks declining incremental returns or capital allocation weakens per-share value."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Distribution/data moat and AI product adaptation preserve owner economics.",
              "failure": "Platform disruption/regulatory remedies structurally compress returns."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "MEDIA_INTERNET",
            "economicEngineCluster": "DIGITAL_ADS_CLOUD",
            "macroFactors": [
              "AI_CAPEX",
              "AD_CYCLE",
              "REGULATION",
              "RATES_DURATION"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "c31260b946a13b50d1b85b80a91fb80861a66fc8a6b3e10b7d80567709362b8c"
        },
        {
          "id": "FC02-018",
          "ticker": "META",
          "company": "Meta Platforms",
          "sector": "Media & Internet",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 578.46,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/meta/",
          "primaryEvidenceDate": "2026-07-29",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://investor.atmeta.com/",
          "keyEvidence": [
            "Q2 revenue $60.8B +28%",
            "Operating income $18.8B, -8%; operating margin 31%",
            "2026 capex guide $130–145B"
          ],
          "economicEngine": "Engagement × ad monetization − AI infrastructure/capex",
          "valuationContext": "Revenue remains exceptional but the AI-capex step-up creates a new owner-return proof burden.",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM–HIGH",
          "thesis": "Meta can justify current valuation only if AI capex restores/expands long-run monetization and does not permanently compress owner cash returns.",
          "killTrigger": "Capex stays elevated without monetization, operating margin structurally falls, engagement/ad pricing weakens or regulation impairs targeting/distribution.",
          "benchmarks": [
            "SPY",
            "XLC"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "User/advertiser engagement and AI monetization translate into operating cash while capex remains economically justified.",
              "failure": "AI capex grows faster than monetization, ad pricing/engagement weakens or regulation impairs targeting/distribution."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized FCF/share supports the locked valuation after capex and regulatory costs.",
              "failure": "Headline revenue masks declining incremental returns or capital allocation weakens per-share value."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Distribution/data moat and AI product adaptation preserve owner economics.",
              "failure": "Platform disruption/regulatory remedies structurally compress returns."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "MEDIA_INTERNET",
            "economicEngineCluster": "DIGITAL_ADS",
            "macroFactors": [
              "AI_CAPEX",
              "AD_CYCLE",
              "REGULATION",
              "RATES_DURATION"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "bae00714dfbf4c638142b87842593817532159d5eff3ed472d32c16b6604c8b1"
        },
        {
          "id": "FC02-019",
          "ticker": "NKE",
          "company": "NIKE",
          "sector": "Consumer",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 38.25,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/nke/",
          "primaryEvidenceDate": "2026-06-26",
          "primaryEvidenceTitle": "FY2026 / Q4 results",
          "primarySourceUrl": "https://investors.nike.com/",
          "keyEvidence": [
            "FY26 revenue $46.4B, flat reported / -2% CC",
            "Q4 Nike Direct -7% reported / -9% CC",
            "Q4 gross-margin jump largely reflected tariff-recovery accounting; underlying demand repair remains incomplete"
          ],
          "economicEngine": "Brand demand × distribution × full-price sell-through",
          "valuationContext": "Price reset is large, but business repair is not yet proven; this is a re-entry test, not a cheap-brand thesis.",
          "officialDecision": "PROVE IT",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "Nike may offer future re-entry value, but ARGUS requires organic demand/full-price recovery rather than treating the lower price as evidence.",
          "killTrigger": "Direct/wholesale sell-through weakens, promotions rise, brand heat declines or margin recovery fails outside accounting/tariff effects.",
          "benchmarks": [
            "SPY",
            "XLY"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Volume, price/mix and full-price/brand health stabilize or improve without promotion masking weakness.",
              "failure": "Volume/brand demand deteriorates, price elasticity worsens or margin recovery is accounting/tariff noise."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized FCF/share supports the action after commodity/promotional normalization.",
              "failure": "Mature growth or brand erosion means the locked valuation overstates compounding."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Brand/distribution moat retains pricing power and per-share cash compounds.",
              "failure": "Structural share loss or capital-allocation mistakes impair owner value."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "CONSUMER",
            "economicEngineCluster": "BRAND_APPAREL",
            "macroFactors": [
              "CONSUMER_CYCLE",
              "FX",
              "TARIFFS",
              "CHINA"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "3a11de9b7aa28a890de4fc1594201c6fb22f49a1142649afc4897ab858053749"
        },
        {
          "id": "FC02-020",
          "ticker": "PEP",
          "company": "PepsiCo",
          "sector": "Consumer",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 139.87,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/pep/",
          "primaryEvidenceDate": "2026-07-21",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.pepsico.com/en/investors/earnings",
          "keyEvidence": [
            "Q2 2026 results and 10-Q available; mature defensive cash profile",
            "Forward multiple ~16x and dividend yield >4% provide valuation support",
            "Volume/mix and input-cost normalization are the key owner-earnings variables"
          ],
          "economicEngine": "Volume × price/mix − commodity/logistics overhead",
          "valuationContext": "A mature defensive compounder at a less demanding valuation; small starter is justified if volume does not structurally deteriorate.",
          "officialDecision": "BUY",
          "officialAction": "STARTER",
          "positionSizing": "1–2%",
          "confidence": "MEDIUM",
          "thesis": "PepsiCo offers diversification away from AI/rates duration and a reasonable cash-yield anchor, but low growth limits sizing.",
          "killTrigger": "Volume/share loss becomes structural, pricing cannot offset costs, FCF/share stalls or leverage/capital allocation deteriorates.",
          "benchmarks": [
            "SPY",
            "XLP"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Volume, price/mix and full-price/brand health stabilize or improve without promotion masking weakness.",
              "failure": "Volume/brand demand deteriorates, price elasticity worsens or margin recovery is accounting/tariff noise."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized FCF/share supports the action after commodity/promotional normalization.",
              "failure": "Mature growth or brand erosion means the locked valuation overstates compounding."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Brand/distribution moat retains pricing power and per-share cash compounds.",
              "failure": "Structural share loss or capital-allocation mistakes impair owner value."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "CONSUMER",
            "economicEngineCluster": "STAPLES",
            "macroFactors": [
              "CONSUMER_CYCLE",
              "INPUT_COSTS",
              "FX",
              "RATES"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "fbe84def6115709a34a978379d09125528ee5f386a0737a8386a9c9d8bff121e"
        },
        {
          "id": "FC02-021",
          "ticker": "MELI",
          "company": "MercadoLibre",
          "sector": "Consumer",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 1936.69,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-08-31T16:00:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/meli/",
          "primaryEvidenceDate": "2026-08-05",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://investor.mercadolibre.com/",
          "keyEvidence": [
            "Q2 revenue/financial income $10.2B +50%",
            "Commerce GMV ~$22B; active buyers +26%",
            "Acquiring TPV +42% FX-neutral; op margin 6.7%"
          ],
          "economicEngine": "Commerce GMV + fintech TPV/credit network effects",
          "valuationContext": "Outstanding growth/flywheel, but credit/FX and current valuation require a measured entry rather than full-size capital.",
          "officialDecision": "BUY",
          "officialAction": "STARTER",
          "positionSizing": "1–2%",
          "confidence": "MEDIUM–HIGH",
          "thesis": "MercadoLibre has one of the strongest commerce-fintech flywheels; a starter is justified if credit-adjusted cash economics remain sound.",
          "killTrigger": "Credit losses/funding stress spike, commerce/TPV growth decelerates structurally, regulation worsens or FCF fails to scale with revenue.",
          "benchmarks": [
            "SPY",
            "EMQQ"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "GMV/TPV, users and credit quality grow while operating margin and funding remain controlled.",
              "failure": "Credit losses/funding stress rise faster than commerce/fintech contribution or regulation impairs economics."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Per-share FCF and credit-adjusted returns validate the locked action across FX noise.",
              "failure": "Growth remains high but owner economics fail because credit/capex absorbs returns."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Commerce-fintech flywheel compounds through a macro/FX cycle without permanent credit impairment.",
              "failure": "Country/credit/regulatory risks break the flywheel or dilute per-share value."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "CONSUMER",
            "economicEngineCluster": "LATAM_COMMERCE_FINTECH",
            "macroFactors": [
              "LATAM_MACRO",
              "FX",
              "CREDIT",
              "REGULATION"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "7028370137397f8a1b3bc3e76993788c52b742e7b51c10a2bee06fa30ad7a4a9"
        },
        {
          "id": "FC02-022",
          "ticker": "CAT",
          "company": "Caterpillar",
          "sector": "Industrials",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 781.95,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/cat/",
          "primaryEvidenceDate": "2026-07-30",
          "primaryEvidenceTitle": "Q2 2026 results / retail statistics",
          "primarySourceUrl": "https://investors.caterpillar.com/",
          "keyEvidence": [
            "Combined retail sales +25%",
            "Power generation +72%; Energy & Transportation +33%",
            "Forward multiple is high for a cyclical industrial; mid-cycle FCF matters"
          ],
          "economicEngine": "Equipment cycle + aftermarket + power generation demand",
          "valuationContext": "Strong power/data-center demand is visible, but valuation risks capitalizing peak-cycle earnings.",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "Caterpillar is benefiting from a powerful equipment/power cycle, but the current multiple requires more normalization than ARGUS accepts.",
          "killTrigger": "Orders/dealer inventory roll over, power-generation demand slows, price/cost reverses or mid-cycle FCF falls well below current expectations.",
          "benchmarks": [
            "SPY",
            "XLI"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Backlog/order quality and margins remain healthy; cycle normalization does not reveal peak earnings.",
              "failure": "Dealer/inventory/order reset causes a sharp owner-earnings decline or price/cost reverses."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Mid-cycle FCF supports the locked valuation after explicit cyclicality haircuts.",
              "failure": "Peak-cycle earnings were over-capitalized or capital intensity rises materially."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Installed base/service/precision advantages preserve returns across a cycle.",
              "failure": "Cycle or competitive changes cause permanent loss rather than temporary volatility."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "INDUSTRIAL",
            "economicEngineCluster": "HEAVY_EQUIPMENT",
            "macroFactors": [
              "INDUSTRIAL_CYCLE",
              "POWER_DEMAND",
              "COMMODITIES",
              "RATES"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "1376a4fa7da64982d560d100681a00aaec3357ee45db770999ef33eb13272a93"
        },
        {
          "id": "FC02-023",
          "ticker": "RTX",
          "company": "RTX",
          "sector": "Industrials & Defense",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 205.33,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/rtx/",
          "primaryEvidenceDate": "2026-07-21",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.rtx.com/investors",
          "keyEvidence": [
            "Q2 sales $24.7B +14%; organic +16%",
            "FCF $2.9B; backlog $289B +22% YoY",
            "2026 sales/EPS/FCF guidance raised"
          ],
          "economicEngine": "Installed-base aerospace aftermarket + defense backlog",
          "valuationContext": "Backlog/FCF visibility is strong, but premium multiple and execution/program risk limit current upside.",
          "officialDecision": "WATCH",
          "officialAction": "BUY LOWER",
          "positionSizing": "0%",
          "confidence": "MEDIUM–HIGH",
          "thesis": "RTX has durable aerospace/defense economics, but ARGUS wants a better price or stronger per-share FCF before entry.",
          "killTrigger": "Program charges/supply issues recur, backlog fails to convert to cash, commercial aftermarket slows or capital allocation weakens.",
          "benchmarks": [
            "SPY",
            "ITA"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Backlog converts with improving FCF and no material program-quality/reserve deterioration.",
              "failure": "Execution charges, supply-chain issues or fixed-price program losses overwhelm backlog quality."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Normalized FCF/share validates the locked valuation after pension/program noise.",
              "failure": "Backlog growth fails to become cash or capital allocation dilutes owner returns."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Aftermarket/defense installed base preserves durable cash returns.",
              "failure": "Program execution or geopolitical procurement changes cause structural impairment."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "INDUSTRIAL_DEFENSE",
            "economicEngineCluster": "AEROSPACE_DEFENSE",
            "macroFactors": [
              "DEFENSE_SPEND",
              "AEROSPACE_CYCLE",
              "SUPPLY_CHAIN",
              "RATES"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "adde77a25e216e79657d40174478c50b595dfd9b72b5af27ba467838fb62b377"
        },
        {
          "id": "FC02-024",
          "ticker": "BHP",
          "company": "BHP Group",
          "sector": "Materials & Mining",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 93.94,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/bhp/",
          "primaryEvidenceDate": "2026-08-18",
          "primaryEvidenceTitle": "FY2026 results",
          "primarySourceUrl": "https://www.bhp.com/investors",
          "keyEvidence": [
            "Underlying EBITDA ~US$33B",
            "Net debt below US$9B",
            "Copper now >50% of EBITDA; strong growth pipeline"
          ],
          "economicEngine": "Tier-1 commodity volume × price − unit cost/capex",
          "valuationContext": "Strong balance sheet and copper exposure justify a small starter using conservative commodity prices.",
          "officialDecision": "BUY",
          "officialAction": "STARTER",
          "positionSizing": "1–2%",
          "confidence": "MEDIUM–HIGH",
          "thesis": "BHP combines high-quality assets, balance-sheet resilience and copper exposure; sizing stays small because commodity prices are not a moat.",
          "killTrigger": "Commodity prices fall below conservative deck for sustained period, unit costs/capex overrun, M&A destroys NAV or leverage rises materially.",
          "benchmarks": [
            "SPY",
            "PICK"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Volume/unit cost and balance sheet remain resilient at conservative commodity prices.",
              "failure": "Commodity decline plus capex/M&A causes leverage or FCF stress beyond the locked bear case."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Mid-cycle FCF/NAV and per-share capital returns validate the starter through commodity normalization.",
              "failure": "The thesis depended on spot prices or growth capex earns below cost of capital."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Tier-1 assets and balance-sheet discipline compound across a commodity cycle.",
              "failure": "Cost inflation, resource quality or capital allocation causes permanent NAV impairment."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "MATERIALS_MINING",
            "economicEngineCluster": "MINING_NAV",
            "macroFactors": [
              "COMMODITIES",
              "CHINA",
              "FX",
              "CAPEX_CYCLE"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "3cd20a41ac11f8cf08e43994d79f6f3c72e3e8efa30a7dae016c7f133cdff5df"
        },
        {
          "id": "FC02-025",
          "ticker": "RIO",
          "company": "Rio Tinto",
          "sector": "Materials & Mining",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 75.17,
          "priceCurrency": "GBP",
          "priceTimestamp": "2026-09-01T16:00:00+01:00",
          "priceSourceUrl": "https://www.riotinto.com/invest/investors",
          "primaryEvidenceDate": "2026-07-29",
          "primaryEvidenceTitle": "H1 2026 results",
          "primarySourceUrl": "https://www.riotinto.com/invest/investors/results-and-presentations",
          "keyEvidence": [
            "H1 underlying EBITDA $14.826B +28%",
            "FCF $3.834B +75%; ROCE 17%",
            "Net debt $14.061B; copper/aluminum/lithium >50% EBITDA"
          ],
          "economicEngine": "Tier-1 ore/copper/aluminum volume × price − unit cost/capex",
          "valuationContext": "Asset quality and cash recovery support a starter, with higher debt/cycle exposure than BHP.",
          "officialDecision": "BUY",
          "officialAction": "STARTER",
          "positionSizing": "1–2%",
          "confidence": "MEDIUM",
          "thesis": "Rio has improving portfolio mix and cash flow, but commodity and project execution keep the position intentionally small.",
          "killTrigger": "Net debt rises, major projects overrun, China/commodity downside breaks FCF or capital allocation reduces per-share NAV.",
          "benchmarks": [
            "FTSE100",
            "PICK"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Volume/unit cost and balance sheet remain resilient at conservative commodity prices.",
              "failure": "Commodity decline plus capex/M&A causes leverage or FCF stress beyond the locked bear case."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Mid-cycle FCF/NAV and per-share capital returns validate the starter through commodity normalization.",
              "failure": "The thesis depended on spot prices or growth capex earns below cost of capital."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Tier-1 assets and balance-sheet discipline compound across a commodity cycle.",
              "failure": "Cost inflation, resource quality or capital allocation causes permanent NAV impairment."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "MATERIALS_MINING",
            "economicEngineCluster": "MINING_NAV",
            "macroFactors": [
              "COMMODITIES",
              "CHINA",
              "FX",
              "CAPEX_CYCLE"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "045e2784750e1e84f910f6f558895bc8c0eb63d32ff13dce3a775a177752ba62"
        },
        {
          "id": "FC02-026",
          "ticker": "PLD",
          "company": "Prologis",
          "sector": "Real Estate",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 138.89,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/pld/",
          "primaryEvidenceDate": "2026-07-21",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://ir.prologis.com/",
          "keyEvidence": [
            "67M sq ft of leases signed",
            "Occupancy 95.5%; cash same-store NOI +8.5%",
            "Core FFO guide raised to $6.22–6.30; debt/adj EBITDA 4.7x"
          ],
          "economicEngine": "Logistics rent growth/occupancy × capital recycling − financing costs",
          "valuationContext": "Operations are strong, but current high-rate regime compresses the equity spread over financing/FFO yield.",
          "officialDecision": "WATCH",
          "officialAction": "BUY LOWER",
          "positionSizing": "0%",
          "confidence": "MEDIUM–HIGH",
          "thesis": "Prologis remains a top-quality logistics platform, but ARGUS wants a wider FFO/NAV spread in the current rate regime.",
          "killTrigger": "Occupancy/rent growth weakens, refinancing cost rises faster than NOI, development spreads compress or leverage rises.",
          "benchmarks": [
            "SPY",
            "VNQ"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Occupancy, rent spreads/same-store NOI and leverage remain healthy despite higher rates.",
              "failure": "Funding/refinancing costs overwhelm NOI growth or occupancy/rent growth deteriorates structurally."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "AFFO/FFO per share and NAV economics validate the locked action after rate normalization.",
              "failure": "High rates or supply permanently compress returns and the equity risk premium is inadequate."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Location/network moat preserves rent growth and capital recycling through a property cycle.",
              "failure": "Leverage/supply causes permanent NAV or per-share FFO impairment."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "REAL_ESTATE",
            "economicEngineCluster": "LOGISTICS_REIT",
            "macroFactors": [
              "RATES_DURATION",
              "ECOMMERCE",
              "INDUSTRIAL_CYCLE",
              "CREDIT"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "5148e5a866bd5f88378f6de49e11686d9f0a9bc0ccc0da3c87e63b9b3846366d"
        },
        {
          "id": "FC02-027",
          "ticker": "VZ",
          "company": "Verizon",
          "sector": "Telecom",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 50.38,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/vz/",
          "primaryEvidenceDate": "2026-07-21",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.verizon.com/about/investors",
          "keyEvidence": [
            "Service revenue +2.8%; subscriber trends improved",
            "H1 FCF $10.2B +16%; Q2 FCF $6.4B +24.4%",
            "Net unsecured debt/adj EBITDA 2.5x; guidance raised"
          ],
          "economicEngine": "Service ARPU/subscribers − network capex/interest",
          "valuationContext": "Improving FCF and leverage support a small starter despite mature growth and competitive intensity.",
          "officialDecision": "BUY",
          "officialAction": "STARTER",
          "positionSizing": "1–2%",
          "confidence": "MEDIUM–HIGH",
          "thesis": "Verizon is a cash/deleveraging turnaround rather than a growth story; current economics justify a starter if FCF truly reaches equity.",
          "killTrigger": "Churn/price competition worsens, capex rises, debt reduction stalls or dividend consumes residual cash.",
          "benchmarks": [
            "SPY",
            "IYZ"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Service revenue, churn/adds and FCF improve while leverage trends down.",
              "failure": "Price competition, capex or interest burden prevents debt reduction and per-share FCF growth."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "FCF after capex supports debt reduction/dividend and the locked valuation.",
              "failure": "Headline EBITDA fails to become residual equity cash or network moat weakens."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Network economics remain durable and leverage falls without sacrificing competitive position.",
              "failure": "Structural price competition or technology shift destroys cash returns."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "REAL_ESTATE_TELECOM",
            "economicEngineCluster": "TELECOM_FCF",
            "macroFactors": [
              "RATES_CREDIT",
              "CONSUMER",
              "COMPETITION",
              "CAPEX"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "b195a16963a0bad105e673c8c7b45a080d962bef2444aeba0ce81889a274a151"
        },
        {
          "id": "FC02-028",
          "ticker": "NVO",
          "company": "Novo Nordisk",
          "sector": "Healthcare & Biopharma",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 45.29,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/nvo/",
          "primaryEvidenceDate": "2026-08-05",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.novonordisk.com/investors.html",
          "keyEvidence": [
            "Adjusted sales +7% CER",
            "GLP-1 volume growth remains strong",
            "Reported op profit affected by prior reversal and DKK6.3B impairment; competition/pipeline risk is now material"
          ],
          "economicEngine": "Patient volume/access/capacity + lifecycle expansion",
          "valuationContext": "Valuation has reset sharply; a small starter is justified only because current price already discounts meaningful competitive/pipeline risk.",
          "officialDecision": "WATCH",
          "officialAction": "STARTER",
          "positionSizing": "1%",
          "confidence": "MEDIUM",
          "thesis": "Novo remains a high-quality obesity/diabetes franchise, but competitive and pipeline uncertainty keep this a small re-underwritten starter.",
          "killTrigger": "US/access/share loss accelerates, pipeline/safety evidence deteriorates, pricing compresses or capacity investment fails to earn attractive returns.",
          "benchmarks": [
            "SPY",
            "XLV"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Volume/access/capacity and pipeline milestones support durable franchise economics without material safety/regulatory deterioration.",
              "failure": "Competitive/safety/pipeline evidence lowers normalized product value or pricing/access deteriorates structurally."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Product-level cash economics and rNPV support the locked action after capacity/launch normalization.",
              "failure": "Pipeline/market-share loss makes the locked valuation too optimistic."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Lifecycle expansion/pipeline replenishment preserves per-share value beyond the current lead asset.",
              "failure": "Concentration or competition causes permanent franchise impairment."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "HEALTHCARE",
            "economicEngineCluster": "GLP1",
            "macroFactors": [
              "HEALTHCARE_POLICY",
              "COMPETITION",
              "PIPELINE",
              "FX"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "b169016390416cbef75f0c30e085987b5458d04e2b6d1b1e87a7fc7ed4541f41"
        },
        {
          "id": "FC02-029",
          "ticker": "ISRG",
          "company": "Intuitive Surgical",
          "sector": "Medical Devices",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 376.87,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-08-31T16:00:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/isrg/",
          "primaryEvidenceDate": "2026-04-21",
          "primaryEvidenceTitle": "Q1 2026 results",
          "primarySourceUrl": "https://isrg.intuitive.com/",
          "keyEvidence": [
            "Q1 revenue $2.77B +23%",
            "Procedures +17%; da Vinci installed base +12%",
            "431 systems placed; Ion procedures +39%"
          ],
          "economicEngine": "Installed-base procedures × instruments/service annuity",
          "valuationContext": "High-quality recurring procedural economics at a more reasonable but still premium multiple justify a small starter.",
          "officialDecision": "BUY",
          "officialAction": "STARTER",
          "positionSizing": "1–2%",
          "confidence": "HIGH",
          "thesis": "Intuitive has a durable installed-base moat and procedure compounding; a starter balances quality against still-premium valuation.",
          "killTrigger": "Procedure growth/utilization slows structurally, placements are financing-driven, competitive robotic share rises sharply or safety/regulatory issues emerge.",
          "benchmarks": [
            "SPY",
            "IHI"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "Procedure growth, installed-base utilization and system placements remain healthy with stable economics.",
              "failure": "Procedure growth/utilization stalls or competitive/safety issues reduce installed-base economics."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Recurring instrument/service economics and FCF/share support the locked valuation.",
              "failure": "Premium valuation was not justified by durable incremental returns."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Installed-base/network effect compounds through hospital-capex cycles.",
              "failure": "Robotic competition or procedure economics structurally erode moat."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "HEALTHCARE",
            "economicEngineCluster": "ROBOTIC_SURGERY",
            "macroFactors": [
              "HOSPITAL_CAPEX",
              "REGULATION",
              "PROCEDURE_VOLUME",
              "RATES_DURATION"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "e4207128af87b6942f16fbaa7c9fdf5a90c42be75a5a3f2f0de2d01ffce3f007"
        },
        {
          "id": "FC02-030",
          "ticker": "NEE",
          "company": "NextEra Energy",
          "sector": "Utilities",
          "lockClass": "NEW CLEAN FORWARD LOCK",
          "lockedAt": "2026-09-01T19:37:35+03:00",
          "price": 82.6,
          "priceCurrency": "USD",
          "priceTimestamp": "2026-09-01T10:30:00-04:00",
          "priceSourceUrl": "https://stockanalysis.com/stocks/nee/",
          "primaryEvidenceDate": "2026-07-22",
          "primaryEvidenceTitle": "Q2 2026 results",
          "primarySourceUrl": "https://www.investor.nexteraenergy.com/",
          "keyEvidence": [
            "Q2 adjusted EPS ~$1.15, +9.5%",
            "2026 EPS guidance ~$3.92–4.02 maintained",
            "Large capital program/deal execution remains sensitive to high rates"
          ],
          "economicEngine": "Regulated rate base + renewables development − funding/equity needs",
          "valuationContext": "Quality utility growth is attractive, but high-rate financing and capital intensity reduce current margin of safety.",
          "officialDecision": "WATCH",
          "officialAction": "NO ACTION",
          "positionSizing": "0%",
          "confidence": "MEDIUM",
          "thesis": "NextEra has above-average utility growth, but current rate/capex regime makes financing discipline more important than headline EPS growth.",
          "killTrigger": "Funding costs/equity issuance rise, regulatory recovery weakens, major project/deal execution slips or per-share FCF/earnings dilute.",
          "benchmarks": [
            "SPY",
            "XLU"
          ],
          "tests": [
            {
              "horizon": "6M",
              "due": "2027-03-01",
              "success": "EPS/CF growth, financing and project execution remain on plan despite high rates; regulatory recovery stays intact.",
              "failure": "Refinancing/capex/regulatory stress raises equity needs or lowers allowed returns."
            },
            {
              "horizon": "12M",
              "due": "2027-09-01",
              "success": "Per-share cash/earnings growth supports the locked action after normalizing large project/M&A effects.",
              "failure": "Debt/equity issuance absorbs growth and per-share value fails to compound."
            },
            {
              "horizon": "24M",
              "due": "2028-09-01",
              "success": "Regulated/renewable asset base compounds through a full rate cycle without balance-sheet stress.",
              "failure": "Funding/regulatory changes create permanent per-share impairment."
            }
          ],
          "dependencyTags": {
            "dateCluster": "2026-09-01",
            "sectorCluster": "UTILITIES",
            "economicEngineCluster": "UTILITY_CAPEX",
            "macroFactors": [
              "RATES_DURATION",
              "POWER_DEMAND",
              "REGULATION",
              "CAPEX"
            ]
          },
          "resolved": false,
          "outcomes": [],
          "decisionSha256": "7704c2efea4094ed2e122db1ac6e2208f7f6a5ef54ad7c7fdeece96d804e0a92"
        }
      ],
      "masterCohortSha256": "f285f758696a926ffcd5ed363c697e90e09899f6da121abde1d1b98298de7274"
    }
  ],
  "independence": {
    "version": "V10.25",
    "asOf": "2026-09-01T19:37:35+03:00",
    "rawForwardLocks": 60,
    "effectiveObservationEstimate": 40.65,
    "methodology": {
      "pairwiseSimilarity": "0.20 same lock date + 0.25 same sector cluster + 0.30 same economic-engine cluster + 0.25 macro-factor Jaccard",
      "redundancyScore": "Average of the five highest pairwise similarities for each observation",
      "independenceWeight": "max(0.35, 1 - 0.65 × redundancyScore)",
      "scoringRule": "Forward accuracy is weighted by independenceWeight. Raw lock counts remain visible but cannot be described as independent observations.",
      "sameMacroShockRule": "A single macro shock affecting many names is one shared dependency, not many independent confirmations."
    },
    "gateOverlay": {
      "rawLockTarget": 100,
      "existingMinimumResolved": 30,
      "effectiveObservationGoal": 100,
      "rule": "The original authorization gate is not loosened. Reaching 100 raw locks is necessary but not sufficient to call the dataset 100 independent observations; weighted effective N is reported separately."
    },
    "sectorClusterCounts": {
      "QUANTUM": 4,
      "SEMICAP": 8,
      "ENERGY": 4,
      "SHIPPING": 3,
      "BANKS": 5,
      "INSURANCE": 5,
      "SOFTWARE": 3,
      "PAYMENTS": 3,
      "POWER_GRID": 5,
      "HEALTHCARE": 3,
      "CONSUMER": 4,
      "SPECIALTY_INGREDIENTS": 3,
      "SOFTWARE_CLOUD": 1,
      "MEDIA_INTERNET": 2,
      "INDUSTRIAL": 1,
      "INDUSTRIAL_DEFENSE": 1,
      "MATERIALS_MINING": 2,
      "REAL_ESTATE": 1,
      "REAL_ESTATE_TELECOM": 1,
      "UTILITIES": 1
    },
    "observations": [
      {
        "id": "FC01-001",
        "ticker": "IONQ",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "QUANTUM",
        "economicEngineCluster": "QUANTUM_OPTION",
        "macroFactors": [
          "RATES_DURATION",
          "TECH_MILESTONE",
          "GOVT_FUNDING"
        ],
        "top5AverageSimilarity": 0.625,
        "independenceWeight": 0.5938,
        "effectiveObservationContribution": 0.5938
      },
      {
        "id": "FC01-002",
        "ticker": "RGTI",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "QUANTUM",
        "economicEngineCluster": "QUANTUM_OPTION",
        "macroFactors": [
          "RATES_DURATION",
          "TECH_MILESTONE",
          "CASH_RUNWAY"
        ],
        "top5AverageSimilarity": 0.625,
        "independenceWeight": 0.5938,
        "effectiveObservationContribution": 0.5938
      },
      {
        "id": "FC01-003",
        "ticker": "QBTS",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "QUANTUM",
        "economicEngineCluster": "QUANTUM_OPTION",
        "macroFactors": [
          "RATES_DURATION",
          "TECH_MILESTONE",
          "COMMERCIAL_ADOPTION"
        ],
        "top5AverageSimilarity": 0.625,
        "independenceWeight": 0.5938,
        "effectiveObservationContribution": 0.5938
      },
      {
        "id": "FC01-004",
        "ticker": "QUBT",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "QUANTUM",
        "economicEngineCluster": "QUANTUM_OPTION",
        "macroFactors": [
          "RATES_DURATION",
          "TECH_MILESTONE",
          "M&A_INTEGRATION"
        ],
        "top5AverageSimilarity": 0.625,
        "independenceWeight": 0.5938,
        "effectiveObservationContribution": 0.5938
      },
      {
        "id": "FC01-005",
        "ticker": "NVDA",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SEMICAP",
        "economicEngineCluster": "AI_ACCELERATORS",
        "macroFactors": [
          "AI_CAPEX",
          "SEMICONDUCTOR_CYCLE",
          "CHINA_EXPORT",
          "RATES_DURATION"
        ],
        "top5AverageSimilarity": 0.71,
        "independenceWeight": 0.5385,
        "effectiveObservationContribution": 0.5385
      },
      {
        "id": "FC01-006",
        "ticker": "AMD",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SEMICAP",
        "economicEngineCluster": "AI_ACCELERATORS",
        "macroFactors": [
          "AI_CAPEX",
          "SEMICONDUCTOR_CYCLE",
          "RATES_DURATION"
        ],
        "top5AverageSimilarity": 0.685,
        "independenceWeight": 0.5548,
        "effectiveObservationContribution": 0.5548
      },
      {
        "id": "FC01-007",
        "ticker": "AVGO",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SEMICAP",
        "economicEngineCluster": "AI_CUSTOM_SILICON",
        "macroFactors": [
          "AI_CAPEX",
          "SEMICONDUCTOR_CYCLE",
          "RATES_DURATION"
        ],
        "top5AverageSimilarity": 0.625,
        "independenceWeight": 0.5938,
        "effectiveObservationContribution": 0.5938
      },
      {
        "id": "FC01-008",
        "ticker": "TSM",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SEMICAP",
        "economicEngineCluster": "FOUNDRY",
        "macroFactors": [
          "AI_CAPEX",
          "SEMICONDUCTOR_CYCLE",
          "TAIWAN_GEOPOLITICS"
        ],
        "top5AverageSimilarity": 0.57,
        "independenceWeight": 0.6295,
        "effectiveObservationContribution": 0.6295
      },
      {
        "id": "FC01-009",
        "ticker": "ASML",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SEMICAP",
        "economicEngineCluster": "WFE",
        "macroFactors": [
          "AI_CAPEX",
          "SEMICONDUCTOR_CYCLE",
          "CHINA_EXPORT"
        ],
        "top5AverageSimilarity": 0.7575,
        "independenceWeight": 0.5076,
        "effectiveObservationContribution": 0.5076
      },
      {
        "id": "FC01-010",
        "ticker": "AMAT",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SEMICAP",
        "economicEngineCluster": "WFE",
        "macroFactors": [
          "AI_CAPEX",
          "SEMICONDUCTOR_CYCLE",
          "CHINA_EXPORT"
        ],
        "top5AverageSimilarity": 0.7575,
        "independenceWeight": 0.5076,
        "effectiveObservationContribution": 0.5076
      },
      {
        "id": "FC01-011",
        "ticker": "XOM",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "ENERGY",
        "economicEngineCluster": "OIL_MAJOR",
        "macroFactors": [
          "OIL_PRICE",
          "GEOPOLITICS",
          "COMMODITIES"
        ],
        "top5AverageSimilarity": 0.5383,
        "independenceWeight": 0.6501,
        "effectiveObservationContribution": 0.6501
      },
      {
        "id": "FC01-012",
        "ticker": "CVX",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "ENERGY",
        "economicEngineCluster": "OIL_MAJOR",
        "macroFactors": [
          "OIL_PRICE",
          "GEOPOLITICS",
          "COMMODITIES"
        ],
        "top5AverageSimilarity": 0.5383,
        "independenceWeight": 0.6501,
        "effectiveObservationContribution": 0.6501
      },
      {
        "id": "FC01-013",
        "ticker": "COP",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "ENERGY",
        "economicEngineCluster": "E&P",
        "macroFactors": [
          "OIL_PRICE",
          "COMMODITIES"
        ],
        "top5AverageSimilarity": 0.4492,
        "independenceWeight": 0.708,
        "effectiveObservationContribution": 0.708
      },
      {
        "id": "FC01-014",
        "ticker": "SLB",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "ENERGY",
        "economicEngineCluster": "OFS",
        "macroFactors": [
          "OIL_PRICE",
          "CAPEX_CYCLE",
          "GEOPOLITICS"
        ],
        "top5AverageSimilarity": 0.4325,
        "independenceWeight": 0.7189,
        "effectiveObservationContribution": 0.7189
      },
      {
        "id": "FC01-015",
        "ticker": "INSW",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SHIPPING",
        "economicEngineCluster": "TANKER",
        "macroFactors": [
          "OIL_FLOWS",
          "GEOPOLITICS",
          "FLEET_SUPPLY"
        ],
        "top5AverageSimilarity": 0.525,
        "independenceWeight": 0.6587,
        "effectiveObservationContribution": 0.6587
      },
      {
        "id": "FC01-016",
        "ticker": "STNG",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SHIPPING",
        "economicEngineCluster": "TANKER",
        "macroFactors": [
          "PRODUCT_FLOWS",
          "GEOPOLITICS",
          "FLEET_SUPPLY"
        ],
        "top5AverageSimilarity": 0.5,
        "independenceWeight": 0.675,
        "effectiveObservationContribution": 0.675
      },
      {
        "id": "FC01-017",
        "ticker": "FRO",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SHIPPING",
        "economicEngineCluster": "TANKER",
        "macroFactors": [
          "OIL_FLOWS",
          "GEOPOLITICS",
          "FLEET_SUPPLY"
        ],
        "top5AverageSimilarity": 0.525,
        "independenceWeight": 0.6587,
        "effectiveObservationContribution": 0.6587
      },
      {
        "id": "FC01-018",
        "ticker": "JPM",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "BANKS",
        "economicEngineCluster": "US_BANK",
        "macroFactors": [
          "RATES_CREDIT",
          "US_CYCLE"
        ],
        "top5AverageSimilarity": 0.5358,
        "independenceWeight": 0.6517,
        "effectiveObservationContribution": 0.6517
      },
      {
        "id": "FC01-019",
        "ticker": "C",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "BANKS",
        "economicEngineCluster": "US_BANK",
        "macroFactors": [
          "RATES_CREDIT",
          "US_CYCLE",
          "REGULATION"
        ],
        "top5AverageSimilarity": 0.5633,
        "independenceWeight": 0.6338,
        "effectiveObservationContribution": 0.6338
      },
      {
        "id": "FC01-020",
        "ticker": "BRK.B",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "INSURANCE",
        "economicEngineCluster": "CONGLOMERATE",
        "macroFactors": [
          "RATES",
          "INSURANCE_PRICING",
          "US_CYCLE"
        ],
        "top5AverageSimilarity": 0.5025,
        "independenceWeight": 0.6734,
        "effectiveObservationContribution": 0.6734
      },
      {
        "id": "FC01-021",
        "ticker": "CB",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "INSURANCE",
        "economicEngineCluster": "P&C",
        "macroFactors": [
          "RATES",
          "INSURANCE_PRICING",
          "CAT_RISK"
        ],
        "top5AverageSimilarity": 0.5758,
        "independenceWeight": 0.6257,
        "effectiveObservationContribution": 0.6257
      },
      {
        "id": "FC01-022",
        "ticker": "PGR",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "INSURANCE",
        "economicEngineCluster": "P&C",
        "macroFactors": [
          "RATES",
          "INSURANCE_PRICING",
          "AUTO_LOSSES"
        ],
        "top5AverageSimilarity": 0.5583,
        "independenceWeight": 0.6371,
        "effectiveObservationContribution": 0.6371
      },
      {
        "id": "FC01-023",
        "ticker": "INTU",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SOFTWARE",
        "economicEngineCluster": "SMB_SOFTWARE",
        "macroFactors": [
          "SMB",
          "RATES_DURATION",
          "TAX_POLICY",
          "AI_DISRUPTION"
        ],
        "top5AverageSimilarity": 0.3417,
        "independenceWeight": 0.7779,
        "effectiveObservationContribution": 0.7779
      },
      {
        "id": "FC01-024",
        "ticker": "CRM",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SOFTWARE",
        "economicEngineCluster": "ENTERPRISE_SOFTWARE",
        "macroFactors": [
          "ENTERPRISE_IT",
          "RATES_DURATION",
          "AI_MONETIZATION"
        ],
        "top5AverageSimilarity": 0.3733,
        "independenceWeight": 0.7573,
        "effectiveObservationContribution": 0.7573
      },
      {
        "id": "FC01-025",
        "ticker": "ORCL",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SOFTWARE",
        "economicEngineCluster": "CLOUD_AI",
        "macroFactors": [
          "AI_CAPEX",
          "ENTERPRISE_IT",
          "RATES_DURATION"
        ],
        "top5AverageSimilarity": 0.4808,
        "independenceWeight": 0.6875,
        "effectiveObservationContribution": 0.6875
      },
      {
        "id": "FC01-026",
        "ticker": "FIS",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "PAYMENTS",
        "economicEngineCluster": "BANK_TECH",
        "macroFactors": [
          "RATES_CREDIT",
          "BANK_IT",
          "LEVERAGE"
        ],
        "top5AverageSimilarity": 0.3475,
        "independenceWeight": 0.7741,
        "effectiveObservationContribution": 0.7741
      },
      {
        "id": "FC01-027",
        "ticker": "ETN",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "POWER_GRID",
        "economicEngineCluster": "GRID_BACKLOG",
        "macroFactors": [
          "AI_CAPEX",
          "POWER_DEMAND",
          "RATES_DURATION"
        ],
        "top5AverageSimilarity": 0.7075,
        "independenceWeight": 0.5401,
        "effectiveObservationContribution": 0.5401
      },
      {
        "id": "FC01-028",
        "ticker": "VRT",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "POWER_GRID",
        "economicEngineCluster": "DATA_CENTER_POWER",
        "macroFactors": [
          "AI_CAPEX",
          "POWER_DEMAND",
          "RATES_DURATION"
        ],
        "top5AverageSimilarity": 0.5875,
        "independenceWeight": 0.6181,
        "effectiveObservationContribution": 0.6181
      },
      {
        "id": "FC01-029",
        "ticker": "LLY",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "HEALTHCARE",
        "economicEngineCluster": "GLP1",
        "macroFactors": [
          "HEALTHCARE_POLICY",
          "COMPETITION",
          "PIPELINE"
        ],
        "top5AverageSimilarity": 0.4058,
        "independenceWeight": 0.7362,
        "effectiveObservationContribution": 0.7362
      },
      {
        "id": "FC01-030",
        "ticker": "COST",
        "cohort": "FC01",
        "dateCluster": "2026-09-01",
        "sectorCluster": "CONSUMER",
        "economicEngineCluster": "STAPLES",
        "macroFactors": [
          "CONSUMER_CYCLE",
          "INPUT_COSTS"
        ],
        "top5AverageSimilarity": 0.495,
        "independenceWeight": 0.6783,
        "effectiveObservationContribution": 0.6783
      },
      {
        "id": "FC02-001",
        "ticker": "LRCX",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SEMICAP",
        "economicEngineCluster": "WFE",
        "macroFactors": [
          "AI_CAPEX",
          "SEMICONDUCTOR_CYCLE",
          "CHINA_EXPORT",
          "RATES_DURATION"
        ],
        "top5AverageSimilarity": 0.77,
        "independenceWeight": 0.4995,
        "effectiveObservationContribution": 0.4995
      },
      {
        "id": "FC02-002",
        "ticker": "MU",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SEMICAP",
        "economicEngineCluster": "MEMORY",
        "macroFactors": [
          "AI_CAPEX",
          "SEMICONDUCTOR_CYCLE",
          "CHINA_EXPORT",
          "CAPEX_CYCLE"
        ],
        "top5AverageSimilarity": 0.605,
        "independenceWeight": 0.6068,
        "effectiveObservationContribution": 0.6068
      },
      {
        "id": "FC02-003",
        "ticker": "PWR",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "POWER_GRID",
        "economicEngineCluster": "GRID_BACKLOG",
        "macroFactors": [
          "AI_CAPEX",
          "POWER_DEMAND",
          "RATES_DURATION",
          "INFRA_CAPEX"
        ],
        "top5AverageSimilarity": 0.695,
        "independenceWeight": 0.5482,
        "effectiveObservationContribution": 0.5482
      },
      {
        "id": "FC02-004",
        "ticker": "GEV",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "POWER_GRID",
        "economicEngineCluster": "GRID_BACKLOG",
        "macroFactors": [
          "AI_CAPEX",
          "POWER_DEMAND",
          "RATES_DURATION",
          "INFRA_CAPEX"
        ],
        "top5AverageSimilarity": 0.695,
        "independenceWeight": 0.5482,
        "effectiveObservationContribution": 0.5482
      },
      {
        "id": "FC02-005",
        "ticker": "SU.PA",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "POWER_GRID",
        "economicEngineCluster": "GRID_AUTOMATION",
        "macroFactors": [
          "AI_CAPEX",
          "POWER_DEMAND",
          "EU_CYCLE",
          "RATES_DURATION"
        ],
        "top5AverageSimilarity": 0.555,
        "independenceWeight": 0.6393,
        "effectiveObservationContribution": 0.6393
      },
      {
        "id": "FC02-006",
        "ticker": "IFF",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SPECIALTY_INGREDIENTS",
        "economicEngineCluster": "INGREDIENTS_REPAIR",
        "macroFactors": [
          "CONSUMER_CYCLE",
          "INPUT_COSTS",
          "M&A_INTEGRATION",
          "RATES_CREDIT"
        ],
        "top5AverageSimilarity": 0.405,
        "independenceWeight": 0.7368,
        "effectiveObservationContribution": 0.7368
      },
      {
        "id": "FC02-007",
        "ticker": "GIVN.SW",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SPECIALTY_INGREDIENTS",
        "economicEngineCluster": "FLAVOR_FRAGRANCE",
        "macroFactors": [
          "CONSUMER_CYCLE",
          "INPUT_COSTS",
          "FX",
          "RATES_DURATION"
        ],
        "top5AverageSimilarity": 0.405,
        "independenceWeight": 0.7368,
        "effectiveObservationContribution": 0.7368
      },
      {
        "id": "FC02-008",
        "ticker": "TRPZ.TA",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SPECIALTY_INGREDIENTS",
        "economicEngineCluster": "ACQUISITIVE_INGREDIENTS",
        "macroFactors": [
          "M&A_INTEGRATION",
          "FX",
          "CONSUMER_CYCLE",
          "RATES_CREDIT"
        ],
        "top5AverageSimilarity": 0.3967,
        "independenceWeight": 0.7422,
        "effectiveObservationContribution": 0.7422
      },
      {
        "id": "FC02-009",
        "ticker": "FISV",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "PAYMENTS",
        "economicEngineCluster": "PAYMENTS_NETWORK",
        "macroFactors": [
          "CONSUMER_CYCLE",
          "SMB",
          "RATES_CREDIT",
          "TECH_DISRUPTION"
        ],
        "top5AverageSimilarity": 0.4617,
        "independenceWeight": 0.6999,
        "effectiveObservationContribution": 0.6999
      },
      {
        "id": "FC02-010",
        "ticker": "PYPL",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "PAYMENTS",
        "economicEngineCluster": "PAYMENTS_NETWORK",
        "macroFactors": [
          "CONSUMER_CYCLE",
          "SMB",
          "RATES_CREDIT",
          "TECH_DISRUPTION"
        ],
        "top5AverageSimilarity": 0.4617,
        "independenceWeight": 0.6999,
        "effectiveObservationContribution": 0.6999
      },
      {
        "id": "FC02-011",
        "ticker": "MSFT",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "SOFTWARE_CLOUD",
        "economicEngineCluster": "CLOUD_AI",
        "macroFactors": [
          "AI_CAPEX",
          "ENTERPRISE_IT",
          "RATES_DURATION",
          "REGULATION"
        ],
        "top5AverageSimilarity": 0.3975,
        "independenceWeight": 0.7416,
        "effectiveObservationContribution": 0.7416
      },
      {
        "id": "FC02-012",
        "ticker": "UBS",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "BANKS",
        "economicEngineCluster": "WEALTH_BANK",
        "macroFactors": [
          "RATES_CREDIT",
          "REGULATION",
          "EU_CYCLE",
          "WEALTH_FLOWS"
        ],
        "top5AverageSimilarity": 0.4717,
        "independenceWeight": 0.6934,
        "effectiveObservationContribution": 0.6934
      },
      {
        "id": "FC02-013",
        "ticker": "HSBC",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "BANKS",
        "economicEngineCluster": "ASIA_BANK",
        "macroFactors": [
          "RATES_CREDIT",
          "CHINA",
          "GEOPOLITICS",
          "REGULATION"
        ],
        "top5AverageSimilarity": 0.4717,
        "independenceWeight": 0.6934,
        "effectiveObservationContribution": 0.6934
      },
      {
        "id": "FC02-014",
        "ticker": "LUMI.TA",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "BANKS",
        "economicEngineCluster": "ISRAEL_BANK",
        "macroFactors": [
          "RATES_CREDIT",
          "ISRAEL_GEOPOLITICS",
          "REGULATION",
          "HOUSING_CREDIT"
        ],
        "top5AverageSimilarity": 0.4717,
        "independenceWeight": 0.6934,
        "effectiveObservationContribution": 0.6934
      },
      {
        "id": "FC02-015",
        "ticker": "MUV2",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "INSURANCE",
        "economicEngineCluster": "REINSURANCE",
        "macroFactors": [
          "CAT_RISK",
          "RATES",
          "INSURANCE_PRICING",
          "EU_CYCLE"
        ],
        "top5AverageSimilarity": 0.5146,
        "independenceWeight": 0.6655,
        "effectiveObservationContribution": 0.6655
      },
      {
        "id": "FC02-016",
        "ticker": "ALV.DE",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "INSURANCE",
        "economicEngineCluster": "MULTILINE_INSURANCE",
        "macroFactors": [
          "RATES",
          "INSURANCE_PRICING",
          "EU_CYCLE",
          "ASSET_FLOWS"
        ],
        "top5AverageSimilarity": 0.4971,
        "independenceWeight": 0.6769,
        "effectiveObservationContribution": 0.6769
      },
      {
        "id": "FC02-017",
        "ticker": "GOOGL",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "MEDIA_INTERNET",
        "economicEngineCluster": "DIGITAL_ADS_CLOUD",
        "macroFactors": [
          "AI_CAPEX",
          "AD_CYCLE",
          "REGULATION",
          "RATES_DURATION"
        ],
        "top5AverageSimilarity": 0.39,
        "independenceWeight": 0.7465,
        "effectiveObservationContribution": 0.7465
      },
      {
        "id": "FC02-018",
        "ticker": "META",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "MEDIA_INTERNET",
        "economicEngineCluster": "DIGITAL_ADS",
        "macroFactors": [
          "AI_CAPEX",
          "AD_CYCLE",
          "REGULATION",
          "RATES_DURATION"
        ],
        "top5AverageSimilarity": 0.39,
        "independenceWeight": 0.7465,
        "effectiveObservationContribution": 0.7465
      },
      {
        "id": "FC02-019",
        "ticker": "NKE",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "CONSUMER",
        "economicEngineCluster": "BRAND_APPAREL",
        "macroFactors": [
          "CONSUMER_CYCLE",
          "FX",
          "TARIFFS",
          "CHINA"
        ],
        "top5AverageSimilarity": 0.4171,
        "independenceWeight": 0.7289,
        "effectiveObservationContribution": 0.7289
      },
      {
        "id": "FC02-020",
        "ticker": "PEP",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "CONSUMER",
        "economicEngineCluster": "STAPLES",
        "macroFactors": [
          "CONSUMER_CYCLE",
          "INPUT_COSTS",
          "FX",
          "RATES"
        ],
        "top5AverageSimilarity": 0.5055,
        "independenceWeight": 0.6714,
        "effectiveObservationContribution": 0.6714
      },
      {
        "id": "FC02-021",
        "ticker": "MELI",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "CONSUMER",
        "economicEngineCluster": "LATAM_COMMERCE_FINTECH",
        "macroFactors": [
          "LATAM_MACRO",
          "FX",
          "CREDIT",
          "REGULATION"
        ],
        "top5AverageSimilarity": 0.3798,
        "independenceWeight": 0.7532,
        "effectiveObservationContribution": 0.7532
      },
      {
        "id": "FC02-022",
        "ticker": "CAT",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "INDUSTRIAL",
        "economicEngineCluster": "HEAVY_EQUIPMENT",
        "macroFactors": [
          "INDUSTRIAL_CYCLE",
          "POWER_DEMAND",
          "COMMODITIES",
          "RATES"
        ],
        "top5AverageSimilarity": 0.2433,
        "independenceWeight": 0.8418,
        "effectiveObservationContribution": 0.8418
      },
      {
        "id": "FC02-023",
        "ticker": "RTX",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "INDUSTRIAL_DEFENSE",
        "economicEngineCluster": "AEROSPACE_DEFENSE",
        "macroFactors": [
          "DEFENSE_SPEND",
          "AEROSPACE_CYCLE",
          "SUPPLY_CHAIN",
          "RATES"
        ],
        "top5AverageSimilarity": 0.2393,
        "independenceWeight": 0.8445,
        "effectiveObservationContribution": 0.8445
      },
      {
        "id": "FC02-024",
        "ticker": "BHP",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "MATERIALS_MINING",
        "economicEngineCluster": "MINING_NAV",
        "macroFactors": [
          "COMMODITIES",
          "CHINA",
          "FX",
          "CAPEX_CYCLE"
        ],
        "top5AverageSimilarity": 0.4033,
        "independenceWeight": 0.7378,
        "effectiveObservationContribution": 0.7378
      },
      {
        "id": "FC02-025",
        "ticker": "RIO",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "MATERIALS_MINING",
        "economicEngineCluster": "MINING_NAV",
        "macroFactors": [
          "COMMODITIES",
          "CHINA",
          "FX",
          "CAPEX_CYCLE"
        ],
        "top5AverageSimilarity": 0.4033,
        "independenceWeight": 0.7378,
        "effectiveObservationContribution": 0.7378
      },
      {
        "id": "FC02-026",
        "ticker": "PLD",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "REAL_ESTATE",
        "economicEngineCluster": "LOGISTICS_REIT",
        "macroFactors": [
          "RATES_DURATION",
          "ECOMMERCE",
          "INDUSTRIAL_CYCLE",
          "CREDIT"
        ],
        "top5AverageSimilarity": 0.2417,
        "independenceWeight": 0.8429,
        "effectiveObservationContribution": 0.8429
      },
      {
        "id": "FC02-027",
        "ticker": "VZ",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "REAL_ESTATE_TELECOM",
        "economicEngineCluster": "TELECOM_FCF",
        "macroFactors": [
          "RATES_CREDIT",
          "CONSUMER",
          "COMPETITION",
          "CAPEX"
        ],
        "top5AverageSimilarity": 0.2421,
        "independenceWeight": 0.8426,
        "effectiveObservationContribution": 0.8426
      },
      {
        "id": "FC02-028",
        "ticker": "NVO",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "HEALTHCARE",
        "economicEngineCluster": "GLP1",
        "macroFactors": [
          "HEALTHCARE_POLICY",
          "COMPETITION",
          "PIPELINE",
          "FX"
        ],
        "top5AverageSimilarity": 0.4189,
        "independenceWeight": 0.7277,
        "effectiveObservationContribution": 0.7277
      },
      {
        "id": "FC02-029",
        "ticker": "ISRG",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "HEALTHCARE",
        "economicEngineCluster": "ROBOTIC_SURGERY",
        "macroFactors": [
          "HOSPITAL_CAPEX",
          "REGULATION",
          "PROCEDURE_VOLUME",
          "RATES_DURATION"
        ],
        "top5AverageSimilarity": 0.35,
        "independenceWeight": 0.7725,
        "effectiveObservationContribution": 0.7725
      },
      {
        "id": "FC02-030",
        "ticker": "NEE",
        "cohort": "FC02",
        "dateCluster": "2026-09-01",
        "sectorCluster": "UTILITIES",
        "economicEngineCluster": "UTILITY_CAPEX",
        "macroFactors": [
          "RATES_DURATION",
          "POWER_DEMAND",
          "REGULATION",
          "CAPEX"
        ],
        "top5AverageSimilarity": 0.29,
        "independenceWeight": 0.8115,
        "effectiveObservationContribution": 0.8115
      }
    ],
    "masterIndependenceSha256": "83789cf5e59b29b3f8bfc7e874153c291f6203c66e1b4980f53e72c7d6377891"
  },
  "historicalAudit": {
    "version": "V10.22",
    "completedAt": "2026-09-01T18:57:00+03:00",
    "historicalProgram": {
      "selected": 100,
      "coreReconstructed": 100,
      "development": {
        "n": 60,
        "pass": 42,
        "partial": 12,
        "fail": 6,
        "fundamentalDiagnosticPct": 86.7,
        "hardGateDiagnosticPct": 92.4
      },
      "validation": {
        "n": 20,
        "cases": 20,
        "statusCounts": {
          "PASS": 15,
          "PARTIAL": 4,
          "FAIL": 1
        },
        "avgFundamentalCorrectnessPct": 86.3,
        "avgHardGateCorrectnessPct": 94.5,
        "officialAccuracyEligible": 0
      },
      "historicalHoldout": {
        "n": 20,
        "cases": 20,
        "statusCounts": {
          "PASS": 14,
          "PARTIAL": 5,
          "FAIL": 1
        },
        "avgFundamentalCorrectnessPct": 86.7,
        "avgHardGateCorrectnessPct": 94.7,
        "officialAccuracyEligible": 0
      },
      "total": {
        "n": 100,
        "pass": 71,
        "partial": 21,
        "fail": 8,
        "fundamentalDiagnosticPct": 86.6,
        "hardGateDiagnosticPct": 93.3
      }
    },
    "integrityAudit": {
      "historicalHoldoutPristine": false,
      "finding": "Prior ARGUS project files created before this batch contain historical outcomes/frozen calls for overlapping companies and mechanisms. Therefore H061–H100 cannot be represented as pristine blind out-of-sample proof.",
      "treatment": "All 100 historical cases remain useful diagnostics/robustness evidence, but Validation/Holdout receive zero official authorization eligibility.",
      "oldGateStatus": "Any older artifact titled Authorization Gate PASSED is superseded for the current V10.22 proof standard and cannot authorize API/autonomous deployment.",
      "selectionLockPreserved": "a9d66863404ffd36056aa4319c4173ad62fe5faf6dcb771acac8c67d90a39b07",
      "validationDecisionLock": "56281d93e4fa42cee44f664209d7f2cad06bdd644f675e02c5344359ca1c03da",
      "holdoutDecisionLock": "eafee031a86355c481198c81f9241fa05b4cf35ed264ab29906b65b6e8751a96"
    },
    "marketAlphaAudit": {
      "status": "FAIL-CLOSED / NOT OFFICIALLY SCORED",
      "reason": "Exact benchmark total-return reconciliation for every historical case is not needed to adjudicate the official gate after the integrity failure; no unverified price return is backfilled.",
      "scoreContributionPct": 0,
      "policy": "Fundamental and hard-gate outcomes remain primary. Historical price/alpha may be completed later as a secondary diagnostic, but it cannot repair a contaminated holdout."
    },
    "forwardHoldout": {
      "status": "ACTIVE — CLEAN, UNRESOLVED",
      "lockedDecisions": 30,
      "tickers": [
        "FC01 diversified 30-name cohort"
      ],
      "resolved": 0,
      "first6mDue": "2027-03-01",
      "minimumResolvedRequired": 30,
      "targetLockedDecisions": 100,
      "promotionGatePct": 60,
      "authorizationEligible": false,
      "reason": "30 clean forward decisions are locked (26 new + 4 carried without double-counting) and none has reached a pre-registered outcome horizon."
    },
    "modelImprovementReview": [
      {
        "id": "PI-01",
        "name": "Premium compounder expectations rule",
        "status": "SHADOW TEST ONLY — NOT PRODUCTION",
        "developmentSupport": [
          "LLY",
          "TT",
          "ETN"
        ],
        "diagnosticValidationSupport": [
          "NVO",
          "ISRG",
          "HON"
        ],
        "guardrail": "No margin-of-safety waiver; require reverse expectations plus moat/reinvestment duration."
      },
      {
        "id": "PI-02",
        "name": "Cycle inflection starter rule",
        "status": "SHADOW TEST ONLY — NOT PRODUCTION",
        "developmentSupport": [
          "DHT",
          "OXY",
          "SLB"
        ],
        "diagnosticHoldoutSupport": [
          "FRO"
        ],
        "counterexample": [
          "UNP"
        ],
        "guardrail": "Starter only when survival, supply discipline and independent leading indicators all pass."
      },
      {
        "id": "PI-03",
        "name": "Post-shock re-underwrite / re-entry",
        "status": "SHADOW TEST ONLY — NOT PRODUCTION",
        "diagnosticValidationSupport": [
          "NFLX"
        ],
        "guardrail": "Re-underwrite from new price only after original failure mechanism objectively improves."
      },
      {
        "id": "PI-04",
        "name": "Acquisition-cohort ROIC",
        "status": "PROPOSED / SHADOW",
        "developmentSupport": [
          "TRPZ"
        ],
        "guardrail": "Separate organic growth, acquired growth, goodwill/debt and cohort ROIC before crediting serial acquisition."
      }
    ],
    "authorization": {
      "state": "BLOCKED",
      "officialProofScore": null,
      "historicalDiagnosticScoreEligible": false,
      "forwardProofResolved": 0,
      "nextUnlockCondition": "At least 30 clean forward outcomes resolved and >=60% pre-registered proof score, with 100 locked decisions target and no integrity failure."
    }
  },
  "shadowCohort": {
    "version": "V10.23",
    "cohortId": "FC01-SHADOW",
    "lockedAt": "2026-09-01T19:24:36+03:00",
    "status": "SHADOW ONLY — INELIGIBLE FOR OFFICIAL DECISION OR AUTHORIZATION",
    "rules": {
      "PI-01": "Premium compounder expectations / moat-duration test",
      "PI-02": "Cycle-inflection starter test",
      "PI-03": "Post-shock re-underwrite / re-entry test",
      "PI-04": "Acquisition-cohort ROIC test"
    },
    "cases": [
      {
        "id": "FC01-001",
        "ticker": "IONQ",
        "officialAction": "NO ACTION",
        "shadowAction": "NO ACTION",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-002",
        "ticker": "RGTI",
        "officialAction": "NO ACTION",
        "shadowAction": "NO ACTION",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-003",
        "ticker": "QBTS",
        "officialAction": "NO ACTION",
        "shadowAction": "NO ACTION",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-004",
        "ticker": "QUBT",
        "officialAction": "NO ACTION",
        "shadowAction": "SHADOW NO ACTION — ACQUISITION COHORT ROIC REQUIRED",
        "triggeredRules": [
          "PI-04"
        ],
        "whyDifferent": "PI-04 is stricter here: acquired revenue receives no valuation credit until organic growth and acquisition-cohort ROIC are separated.",
        "resolved": false
      },
      {
        "id": "FC01-005",
        "ticker": "NVDA",
        "officialAction": "NO ACTION",
        "shadowAction": "NO ACTION",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-006",
        "ticker": "AMD",
        "officialAction": "NO ACTION",
        "shadowAction": "NO ACTION",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-007",
        "ticker": "AVGO",
        "officialAction": "NO ACTION",
        "shadowAction": "NO ACTION",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-008",
        "ticker": "TSM",
        "officialAction": "STARTER",
        "shadowAction": "STARTER",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-009",
        "ticker": "ASML",
        "officialAction": "NO ACTION",
        "shadowAction": "SHADOW STARTER — 0.5–1.0%",
        "triggeredRules": [
          "PI-01"
        ],
        "whyDifferent": "PI-01 tests whether elite moat duration/reinvestment runway justifies a small starter despite a premium multiple. This is not a production recommendation.",
        "resolved": false
      },
      {
        "id": "FC01-010",
        "ticker": "AMAT",
        "officialAction": "NO ACTION",
        "shadowAction": "NO ACTION",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-011",
        "ticker": "XOM",
        "officialAction": "NO ADD",
        "shadowAction": "NO ADD",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-012",
        "ticker": "CVX",
        "officialAction": "NO ADD",
        "shadowAction": "NO ADD",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-013",
        "ticker": "COP",
        "officialAction": "NO ACTION",
        "shadowAction": "NO ACTION",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-014",
        "ticker": "SLB",
        "officialAction": "NO ACTION",
        "shadowAction": "NO ACTION",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-015",
        "ticker": "INSW",
        "officialAction": "NO ADD",
        "shadowAction": "NO ADD",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-016",
        "ticker": "STNG",
        "officialAction": "NO ADD",
        "shadowAction": "NO ADD",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-017",
        "ticker": "FRO",
        "officialAction": "NO ADD",
        "shadowAction": "NO ADD",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-018",
        "ticker": "JPM",
        "officialAction": "BUY LOWER",
        "shadowAction": "BUY LOWER",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-019",
        "ticker": "C",
        "officialAction": "NO ACTION",
        "shadowAction": "NO ACTION",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-020",
        "ticker": "BRK.B",
        "officialAction": "STARTER",
        "shadowAction": "STARTER",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-021",
        "ticker": "CB",
        "officialAction": "BUY / ADD",
        "shadowAction": "BUY / ADD",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-022",
        "ticker": "PGR",
        "officialAction": "BUY / ADD",
        "shadowAction": "BUY / ADD",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-023",
        "ticker": "INTU",
        "officialAction": "BUY / ADD",
        "shadowAction": "BUY / ADD",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-024",
        "ticker": "CRM",
        "officialAction": "NO ACTION",
        "shadowAction": "NO ACTION",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-025",
        "ticker": "ORCL",
        "officialAction": "NO ACTION",
        "shadowAction": "NO ACTION",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-026",
        "ticker": "FIS",
        "officialAction": "NO ACTION",
        "shadowAction": "NO ACTION",
        "triggeredRules": [],
        "whyDifferent": "No shadow rule changes the official action at lock.",
        "resolved": false
      },
      {
        "id": "FC01-027",
        "ticker": "ETN",
        "officialAction": "NO ACTION",
        "shadowAction": "SHADOW STARTER — 0.5–1.0%",
        "triggeredRules": [
          "PI-01",
          "PI-04"
        ],
        "whyDifferent": "PI-01 favors a tiny premium-compounder starter, while PI-04 requires acquisition-cohort ROIC to remain acceptable; official action stays NO ACTION.",
        "resolved": false
      },
      {
        "id": "FC01-028",
        "ticker": "VRT",
        "officialAction": "NO ACTION",
        "shadowAction": "SHADOW STARTER — 0.5–1.0%",
        "triggeredRules": [
          "PI-01"
        ],
        "whyDifferent": "PI-01 tests whether elite moat duration/reinvestment runway justifies a small starter despite a premium multiple. This is not a production recommendation.",
        "resolved": false
      },
      {
        "id": "FC01-029",
        "ticker": "LLY",
        "officialAction": "NO ACTION",
        "shadowAction": "SHADOW STARTER — 0.5–1.0%",
        "triggeredRules": [
          "PI-01"
        ],
        "whyDifferent": "PI-01 tests whether elite moat duration/reinvestment runway justifies a small starter despite a premium multiple. This is not a production recommendation.",
        "resolved": false
      },
      {
        "id": "FC01-030",
        "ticker": "COST",
        "officialAction": "NO ACTION",
        "shadowAction": "SHADOW STARTER — 0.5–1.0%",
        "triggeredRules": [
          "PI-01"
        ],
        "whyDifferent": "PI-01 tests whether elite moat duration/reinvestment runway justifies a small starter despite a premium multiple. This is not a production recommendation.",
        "resolved": false
      }
    ],
    "masterShadowSha256": "9697727bf855047003c60241a0b02dbf03f567836e410887d9d807dbaafb219a"
  }
});
