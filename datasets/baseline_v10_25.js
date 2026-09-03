import { deepFreeze } from "../lib/integrity.js";
export const BASELINE_V10_25 = deepFreeze({
  "version": "V10.25",
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
  "engine": {
    "INTU": {
      "economicEngine": "Recurring financial workflows across QuickBooks, TurboTax and Credit Karma; value rises when durable organic growth and owner earnings compound without moat erosion.",
      "factors": {
        "businessQuality": 92,
        "valuation": 88,
        "management": 80,
        "evidence": 94,
        "moat": 90,
        "lossProtection": 88,
        "portfolioFit": 80
      },
      "permanentLoss": "LOW–MEDIUM",
      "confidence": "MEDIUM–HIGH",
      "management": "Operational execution is strong, but Mailchimp remains a reminder that capital allocation is not automatically excellent. Buybacks help only when executed below intrinsic value.",
      "evidenceQuality": "LIVE VERIFIED from the Aug. 25 FY26/FY27 8-K: FY26 revenue $21.448B, operating cash flow $8.838B, capex $221M, SBC $2.056B, buybacks $5.5B and diluted share count down ~2%. FY27 reporting will include SBC in non-GAAP measures, improving comparability.",
      "baseRate": "High-quality workflow software with embedded customer data tends to sustain better economics than generic software, but premium franchises can still disappoint when purchased without valuation discipline.",
      "scenarios": [
        [
          "Bear",
          315,
          0.25,
          "FY27 slowdown deepens; TurboTax/AI/policy pressure reduces moat life"
        ],
        [
          "Base",
          425,
          0.55,
          "GBS 13–14%, margin expansion and strong per-share cash persist"
        ],
        [
          "Bull",
          505,
          0.2,
          "AI raises ARPU/productivity and durable cash compounding exceeds reset expectations"
        ]
      ],
      "disconfirm": [
        "QBO / Global Business Solutions shows structural rather than cyclical slowdown for 2 consecutive quarters.",
        "Owner Earnings deteriorate despite reported adjusted profit growth.",
        "IRS / AI changes materially reduce TurboTax pricing power or switching friction.",
        "Large acquisition or capital allocation decision materially reduces per-share intrinsic value."
      ],
      "gates": [
        [
          "Business quality",
          "PASS",
          "Recurring workflows + FY26 cash conversion remain strong"
        ],
        [
          "Valuation / margin of safety",
          "PASS",
          "Aug-31 $359.30 is below live ensemble / buy gate"
        ],
        [
          "Capital allocation",
          "PASS/WATCH",
          "$5.5B buybacks reduced diluted shares; Mailchimp remains a caution"
        ],
        [
          "Evidence integrity",
          "PASS",
          "Primary 8-K cash flow and segment data refreshed 2026-09-01"
        ],
        [
          "Permanent-loss risk",
          "PASS",
          "Liquidity/debt manageable; main risks are moat and valuation, not solvency"
        ]
      ],
      "sizing": "Engine band: 3–6% only while all hard gates remain open; larger sizing requires stronger capital-allocation evidence.",
      "portfolio": "Generally diversifying versus cyclicals, but still exposed to software multiples, US consumer/SMB activity and AI disruption.",
      "whyNow": "Live filings still support a BUY, but only with a smaller conviction premium because FY27 growth is 9–10% and the verified macro regime is tightening/inflationary.",
      "implied": {
        "summary": "At the current working price, the market does not require perfection, but it still assumes durable double-digit ecosystem growth and continued pricing power.",
        "assumptions": [
          "QuickBooks / Global Business Solutions remains a durable double-digit grower over the medium term.",
          "TurboTax retains enough pricing power and switching friction despite AI and tax-policy alternatives.",
          "Owner Earnings continue to grow per share and Mailchimp does not trigger another capital-allocation reset."
        ],
        "edge": "ARGUS edge exists only if durable cash compounding is better than the market implies while the moat survives AI/regulatory change."
      },
      "leading": [
        [
          "QBO / GBS organic growth",
          "POSITIVE",
          ">= guidance / double-digit",
          "< required normalized growth for 2 quarters"
        ],
        [
          "Owner Earnings / share",
          "POSITIVE",
          "grows faster than dilution",
          "cash conversion falls while adjusted profit rises"
        ],
        [
          "SMB health / credit",
          "WATCH",
          "stable employment and credit",
          "broad SMB stress / credit deterioration"
        ],
        [
          "IRS / tax-policy friction",
          "WATCH",
          "no structural pricing impairment",
          "free/AI alternatives reduce paid conversion materially"
        ]
      ],
      "dependencies": [
        "SMB health → QBO customer growth / payments volume → Owner Earnings → Base IV.",
        "IRS/AI competition → TurboTax conversion & pricing → margin / retention → moat score.",
        "Capital allocation → per-share FCF compounding → realized investor return, independent of reported revenue growth."
      ],
      "redTeam": {
        "case": "The franchise may be excellent but structurally over-earning from legacy workflow friction that AI and public tax infrastructure can erode faster than the model assumes.",
        "attacks": [
          "QuickBooks AI competitors compress differentiation and ARPU.",
          "TurboTax economics weaken structurally rather than cyclically.",
          "Management repeats a Mailchimp-scale allocation mistake."
        ],
        "penalty": 2,
        "verdict": "Red team does not currently break the thesis, but it caps conviction until AI and capital allocation remain clean."
      },
      "uncertainty": [
        [
          "Business",
          18,
          "Recurring workflows are well observed"
        ],
        [
          "Valuation",
          28,
          "Long-duration growth assumptions still matter"
        ],
        [
          "Data / evidence",
          14,
          "Cash conversion is relatively observable"
        ],
        [
          "Macro",
          30,
          "SMB / consumer sensitivity"
        ],
        [
          "Management",
          32,
          "Capital allocation is not flawless"
        ],
        [
          "Technology / regulation",
          38,
          "AI + IRS policy are real long-term variables"
        ]
      ],
      "uncertaintyPenalty": 2,
      "evidenceMeta": {
        "asOf": "2026-09-01",
        "maxAgeDays": 14,
        "strength": "HIGH — LIVE VERIFIED",
        "critical": "FY27 GBS growth, Owner Earnings/share, TurboTax pricing/policy, Mailchimp, yields"
      },
      "exit": {
        "current": "HOLD",
        "rule": "If already held: keep while economic engine and hard gates pass. A lower price alone is never a sell signal.",
        "hardSell": [
          "Structural moat break in QBO/TurboTax economics.",
          "Evidence integrity failure or permanent impairment to Owner Earnings.",
          "Balance-sheet / capital-allocation event that creates permanent value destruction."
        ],
        "reduce": [
          "Require at least 2 independent negative confirmations, with at least 1 tied to the economic engine.",
          "Example: structural growth slowdown + deteriorating Owner Earnings / pricing power."
        ],
        "trim": [
          "Price materially exceeds Bull-weighted value while thesis remains intact."
        ],
        "reentry": "If sold for thesis damage, require evidence that the damaged engine variable has actually recovered — not merely a cheaper share price."
      },
      "premortem": [
        "AI removes meaningful switching friction in accounting/tax workflows.",
        "Tax policy changes paid-filing economics faster than expected.",
        "A large acquisition destroys per-share value.",
        "SMB weakness exposes more cyclicality than normalized assumptions allow."
      ],
      "attribution": {
        "from": "V10.16",
        "to": "V10.17 LIVE",
        "decision": "BUY → BUY",
        "changes": [
          "Price updated to Aug-31 close $359.30.",
          "FY27 revenue growth reset to 9–10% lowers growth assumptions.",
          "FY26 OCF $8.838B and buyback-driven share reduction strengthen owner-cash evidence.",
          "Verified tightening/inflation regime adds a macro penalty.",
          "Live valuation ensemble centers near $425."
        ]
      },
      "learning": [
        {
          "date": "2026-09-01",
          "event": "V10.14 baseline",
          "result": "No outcome yet — architecture upgrade only.",
          "lesson": "Future errors must be attributed to engine variable, valuation, evidence, management, macro or timing.",
          "rule": "Do not rewrite the original thesis after the fact; preserve the decision snapshot."
        }
      ],
      "regime": {
        "state": "VERIFIED ADVERSE / TIGHTENING RISK",
        "penalty": 2,
        "asOf": "2026-09-01",
        "summary": "Fed target is 3.50%–3.75%; July CPI was 3.4% YoY and July PCE 3.7% (core 3.3%). On Sep. 1 the US 10Y rose near 4.79% and Brent near $92 amid Middle East tensions, increasing rate-hike expectations. Negative for software duration and SMB/credit sensitivity.",
        "sensitivities": [
          [
            "Rates / yields",
            "HIGH",
            "Higher discount rates + SMB/credit pressure"
          ],
          [
            "SMB cycle",
            "HIGH",
            "Directly affects QBO/payments ecosystem"
          ],
          [
            "Consumer credit",
            "MEDIUM",
            "Credit Karma monetization"
          ],
          [
            "Tax policy",
            "HIGH",
            "TurboTax economics / conversion"
          ]
        ]
      },
      "thesisClock": {
        "start": "2026-08-31",
        "deadline": "2027-08-31",
        "nextReview": "2026-11-30",
        "status": "ON CLOCK",
        "mustShowByNext": "QBO/GBS growth stays near required normalized rate; Owner Earnings/share remains healthy; no structural TurboTax pricing impairment.",
        "expiryRule": "If two scheduled checkpoints pass without the expected operating evidence, confidence falls and BUY is blocked until the thesis is rewritten with new evidence."
      },
      "balanceStress": {
        "resilience": 87,
        "summary": "FY26 OCF $8.84B versus $7.7B debt and $7.2B cash/investments; solvency is not the thesis risk.",
        "tests": [
          [
            "Revenue growth -5 pts vs guide",
            "Cash compounding slows",
            "IV compresses; no survival issue"
          ],
          [
            "Rates stay high",
            "SMB + multiple pressure",
            "Sizing cap, not hard solvency gate"
          ],
          [
            "Large acquisition",
            "Debt/capital allocation shock",
            "Immediately reopens hard gate"
          ]
        ]
      },
      "consensus": {
        "crowding": "MEDIUM",
        "edgeStrength": 70,
        "variant": "At $359.30, ARGUS sees strong FY26 owner cash economics at a reset growth valuation; the edge is cash durability plus disciplined buybacks, not a claim that FY27 growth reaccelerates immediately.",
        "consensusRisk": "The reset is visible. Edge disappears if FY27 GBS or owner cash falls below the new lower bar."
      },
      "catalysts": [
        [
          "QBO/GBS growth confirmation",
          0.7,
          "6–9 months",
          "Positive — protects Base/Bull IV"
        ],
        [
          "Owner Earnings/share acceleration",
          0.6,
          "6–12 months",
          "Positive — increases per-share compounding confidence"
        ],
        [
          "Tax/AI disruption signal",
          0.3,
          "6–12 months",
          "Negative — can cut moat and terminal assumptions"
        ]
      ],
      "unknowns": [
        [
          "Long-run AI effect on accounting/tax switching friction",
          "HIGH"
        ],
        [
          "Future IRS/free-file policy scope",
          "MEDIUM"
        ],
        [
          "Capital allocation behavior in next large M&A window",
          "MEDIUM"
        ]
      ],
      "modelRisk": {
        "score": 30,
        "summary": "Moderate. FY27 guidance reduces growth-duration risk, but moat life and normalization of FY26 cash flow remain important.",
        "sensitivities": [
          [
            "Normalized growth -2 pts",
            "Meaningful IV compression"
          ],
          [
            "Owner FCF normalization -15%",
            "Moves fair value toward lower end"
          ],
          [
            "Moat life shortened by AI/policy",
            "Largest terminal-value risk"
          ]
        ]
      },
      "calibration": {
        "confidenceBin": 75,
        "claim": "Medium-high confidence should resolve correctly roughly 70–80% of the time over comparable thesis checkpoints."
      },
      "dataLineage": {
        "score": 97,
        "asOf": "2026-09-01",
        "criticalCoverage": "VERY HIGH",
        "sources": [
          [
            "Intuit FY26/FY27 8-K (Aug 25)",
            "PRIMARY SEC/IR",
            "2026-08-25",
            "Revenue, segments, FY27 guide, cash flow, SBC, debt/buybacks",
            "DIRECT"
          ],
          [
            "Federal Reserve FOMC statement",
            "PRIMARY POLICY",
            "2026-07-29",
            "Fed target range / inflation stance",
            "DIRECT"
          ],
          [
            "BLS CPI July 2026",
            "PRIMARY MACRO",
            "2026-08-12",
            "Inflation regime",
            "DIRECT"
          ],
          [
            "BEA PCE July 2026",
            "PRIMARY MACRO",
            "2026-08-26",
            "PCE/core PCE regime",
            "DIRECT"
          ],
          [
            "Aug-31 market close",
            "SECONDARY MARKET",
            "2026-08-31",
            "Price $359.30",
            "DIRECT MARKET"
          ],
          [
            "ARGUS live valuation ensemble",
            "DERIVED",
            "2026-09-01",
            "Per-share intrinsic value",
            "DERIVED"
          ]
        ],
        "rule": "All critical operating inputs now trace to primary sources. Market price is secondary market data; valuation remains explicitly derived."
      },
      "valuationEnsemble": {
        "methods": [
          [
            "Normalized Owner FCF",
            435,
            0.4,
            "FY26 OCF less capex, normalized below headline cash conversion"
          ],
          [
            "FY27 earnings-power cross-check",
            410,
            0.3,
            "GAAP EPS guide with quality/software multiple"
          ],
          [
            "Reverse-expectations / moat-duration DCF",
            425,
            0.3,
            "Price-implied growth vs durable GBS/TurboTax economics"
          ]
        ],
        "note": "LIVE rebuild. Weighted value ~$425. The ensemble deliberately discounts FY26 headline FCF and FY27 growth reset."
      },
      "causalMap": [
        [
          "SMB health",
          "QBO customer growth / payments volume",
          "GBS organic growth",
          "Owner Earnings / share",
          "Base IV"
        ],
        [
          "AI / tax-policy alternatives",
          "Switching friction + paid conversion",
          "TurboTax ARPU / retention",
          "Margin + moat life",
          "Terminal IV"
        ],
        [
          "Capital allocation",
          "Cash retained vs M&A",
          "Share count / invested capital",
          "Per-share FCF",
          "Realized investor return"
        ]
      ],
      "forensic": {
        "score": 94,
        "checks": [
          [
            "Cash conversion vs earnings",
            "PASS",
            "FY26 OCF $8.838B vs net income $4.566B; capex only $221M, but normalization remains conservative"
          ],
          [
            "SBC / dilution",
            "PASS",
            "$2.056B SBC; $5.5B buybacks more than offset dilution, diluted shares fell ~2%"
          ],
          [
            "Non-GAAP policy",
            "PASS",
            "FY27 non-GAAP will include SBC, improving economic comparability"
          ],
          [
            "Goodwill / acquisitions",
            "WATCH",
            "Mailchimp FY27 guide -1% to 0%; acquisition discipline still monitored"
          ],
          [
            "Debt / liquidity",
            "PASS",
            "$7.2B cash/investments vs $7.7B debt; June notes addressed FY27 maturities"
          ]
        ],
        "rule": "No verified accounting hard fail. Future BUY requires owner cash per share, not adjusted EPS alone."
      },
      "factorExposure": {
        "factors": [
          [
            "US SMB / consumer",
            75
          ],
          [
            "Software duration / rates",
            55
          ],
          [
            "AI disruption",
            50
          ],
          [
            "US tax policy",
            55
          ],
          [
            "Consumer credit",
            35
          ]
        ]
      }
    },
    "NVDA": {
      "economicEngine": "Useful AI compute delivered through GPU + networking + CUDA; value rises if customer ROI sustains hyperscaler/frontier-lab capex while NVIDIA preserves platform share and margins.",
      "factors": {
        "businessQuality": 99,
        "valuation": 58,
        "management": 92,
        "evidence": 96,
        "moat": 99,
        "lossProtection": 68,
        "portfolioFit": 60
      },
      "permanentLoss": "MEDIUM",
      "confidence": "MEDIUM",
      "management": "Execution and product cadence are exceptional. The principal issue is not operating competence but dependence on a very large AI capex cycle and geopolitical/supply-chain constraints.",
      "evidenceQuality": "LIVE VERIFIED from Aug. 26 Q2 FY27 results: revenue $96.221B (+106% YoY), Data Center $89.0B (+117%), gross margin 75.0%, Q3 guide $108B ±2% with no China Data Center compute revenue assumed. H1 free cash flow was $69.895B.",
      "baseRate": "Semiconductor leaders can compound for long periods, yet periods of extreme capacity investment often produce later normalization. Platform lock-in improves the base rate but does not eliminate cycle risk.",
      "scenarios": [
        [
          "Bear",
          180,
          0.3,
          "AI capex normalizes, export/TAM shock or margin compression"
        ],
        [
          "Base",
          260,
          0.5,
          "Q3/Q4 scale continues but growth/margins normalize materially"
        ],
        [
          "Bull",
          350,
          0.2,
          "Customer ROI sustains capex and platform share/pricing remain exceptional"
        ]
      ],
      "disconfirm": [
        "Hyperscaler AI capex rolls over while customer AI monetization remains weak.",
        "Gross margin structurally falls below the level required by normalized IV.",
        "Custom silicon / AMD materially reduces share or pricing power in core workloads.",
        "Export controls or supply constraints cause a persistent TAM impairment."
      ],
      "gates": [
        [
          "Business quality",
          "PASS",
          "Q2 confirms exceptional full-stack economics"
        ],
        [
          "Valuation / margin of safety",
          "WATCH",
          "Live buy gate remains below Aug-31 $220.78 after model-risk adjustment"
        ],
        [
          "Management / execution",
          "PASS",
          "Product cadence and cash generation remain exceptional"
        ],
        [
          "Evidence integrity",
          "PASS",
          "Primary Q2 results refreshed; cycle duration remains derived"
        ],
        [
          "Permanent-loss risk",
          "WATCH",
          "Capex cycle + export/geopolitics + duration create asymmetric downside"
        ]
      ],
      "sizing": "Engine band: 1–3% at current valuation; increase only after either price offers wider protection or normalized earnings evidence improves.",
      "portfolio": "High correlation with AI capex, semiconductors and growth-duration exposure; position size must account for any existing AI/chip holdings.",
      "whyNow": "Q2 materially strengthened the business case, but not the entry case. The market price is above the risk-adjusted buy gate in a verified tightening regime.",
      "implied": {
        "summary": "The working market price implies that AI infrastructure demand stays very large and that NVIDIA preserves exceptional economics through the next platform cycles.",
        "assumptions": [
          "Hyperscaler/frontier-lab AI capex remains economically justified rather than a short-lived financing cycle.",
          "CUDA + networking + systems retain enough share and pricing power despite custom silicon.",
          "Margins normalize only modestly and export/supply constraints do not permanently shrink the addressable market."
        ],
        "edge": "The edge must come from better judgment on normalized AI customer ROI and platform durability — not simply extrapolating current growth."
      },
      "leading": [
        [
          "Hyperscaler AI capex",
          "POSITIVE",
          "plans/backlog remain high with ROI evidence",
          "capex rollover without monetization"
        ],
        [
          "Customer AI ROI",
          "WATCH",
          "inference/training economics improve",
          "AI revenue fails to justify infrastructure spend"
        ],
        [
          "Gross margin / mix",
          "POSITIVE",
          "mid-70s area / disciplined normalization",
          "structural compression beyond model"
        ],
        [
          "Custom silicon share",
          "WATCH",
          "NVIDIA keeps core workload dominance",
          "ASIC/AMD share gains in key workloads"
        ],
        [
          "Export / supply chain",
          "WATCH",
          "stable access and HBM/power supply",
          "persistent TAM or shipment impairment"
        ]
      ],
      "dependencies": [
        "AI customer ROI → hyperscaler/frontier capex → NVIDIA demand → utilization / pricing → normalized FCF.",
        "Custom silicon adoption → workload share → pricing power → gross margin → IV.",
        "Export controls + HBM/power constraints → deliverable TAM → revenue timing / permanence → valuation range."
      ],
      "redTeam": {
        "case": "The market may be capitalizing peak infrastructure economics as if they are durable while customers are still proving the return on an unprecedented AI buildout.",
        "attacks": [
          "AI capex becomes self-reinforcing financing rather than end-demand-backed investment.",
          "Custom accelerators capture the highest-volume inference workloads.",
          "Export/geopolitical constraints create permanent TAM loss."
        ],
        "penalty": 5,
        "verdict": "Red team is strong enough to keep valuation protection as a hard gate even with exceptional business quality."
      },
      "uncertainty": [
        [
          "Business",
          15,
          "Current franchise quality is exceptional"
        ],
        [
          "Valuation",
          48,
          "Normalized-cycle earnings are difficult"
        ],
        [
          "Data / evidence",
          22,
          "Reported demand is strong; normalization less observable"
        ],
        [
          "Macro / rates",
          36,
          "Long-duration multiple + capex financing"
        ],
        [
          "Management",
          12,
          "Execution uncertainty is low"
        ],
        [
          "Technology / geopolitics",
          52,
          "ASICs, export controls, Taiwan/supply chain"
        ]
      ],
      "uncertaintyPenalty": 4,
      "evidenceMeta": {
        "asOf": "2026-09-01",
        "maxAgeDays": 10,
        "strength": "HIGH — LIVE VERIFIED",
        "critical": "Q3 $108B guide, AI customer ROI, gross margin, export policy, custom silicon"
      },
      "exit": {
        "current": "HOLD/NO ADD",
        "rule": "If already held: do not add at current protection level; hold while business engine remains intact. Price volatility alone is not an exit signal.",
        "hardSell": [
          "Persistent platform-share loss plus pricing-power erosion.",
          "Permanent export/TAM impairment that invalidates normalized value.",
          "Evidence that customer AI economics cannot support the installed-capex cycle."
        ],
        "reduce": [
          "At least 2 independent confirmations, one tied to AI customer ROI / demand engine.",
          "Example: capex rollover + margin/share deterioration."
        ],
        "trim": [
          "Extreme valuation expansion without matching normalized FCF improvement."
        ],
        "reentry": "After reduction/sale, require either a materially wider margin of safety or restored evidence on AI ROI / platform share."
      },
      "premortem": [
        "AI infrastructure spending overshoots end-customer economics.",
        "Custom silicon takes more inference share than expected.",
        "A geopolitical/export shock creates permanent market impairment.",
        "Margins normalize much faster than revenue models anticipate."
      ],
      "attribution": {
        "from": "V10.16",
        "to": "V10.17 LIVE",
        "decision": "WAIT → WAIT",
        "changes": [
          "Price updated to Aug-31 close $220.78.",
          "Q2 revenue $96.2B, Data Center $89.0B and 75% margin strengthen business quality/evidence.",
          "Q3 $108B guide excludes China Data Center compute revenue, preserving export risk.",
          "H1 FCF ~$69.9B improves cash evidence.",
          "Verified high-yield/inflation regime and model-risk keep entry gate below market."
        ]
      },
      "learning": [
        {
          "date": "2026-09-01",
          "event": "V10.14 baseline",
          "result": "No outcome yet — architecture upgrade only.",
          "lesson": "Separate business excellence from investment attractiveness; do not let growth rates substitute for normalized-cycle valuation.",
          "rule": "A full BUY requires valuation protection even when business quality is near maximum."
        }
      ],
      "regime": {
        "state": "VERIFIED ADVERSE / TIGHTENING RISK",
        "penalty": 4,
        "asOf": "2026-09-01",
        "summary": "Fed is at 3.50%–3.75%, inflation remains above target, the 10Y is near 4.79% and oil near $92. Higher yields raise financing and duration risk for the unprecedented AI infrastructure cycle.",
        "sensitivities": [
          [
            "AI capex financing",
            "VERY HIGH",
            "Customer funding/ROI must support the cycle"
          ],
          [
            "Rates / yields",
            "HIGH",
            "Long-duration valuation + infrastructure financing"
          ],
          [
            "Export controls",
            "VERY HIGH",
            "Q3 guide assumes zero China Data Center compute revenue"
          ],
          [
            "Power / HBM supply",
            "HIGH",
            "Constrains deliverable revenue"
          ]
        ]
      },
      "thesisClock": {
        "start": "2026-08-31",
        "deadline": "2027-08-31",
        "nextReview": "2026-11-30",
        "status": "ON CLOCK",
        "mustShowByNext": "Customer ROI remains credible, hyperscaler/frontier capex does not roll over, and platform share/margins remain consistent with normalized IV.",
        "expiryRule": "If capex stays high but customer monetization evidence does not improve by repeated checkpoints, treat this as thesis slippage rather than extending the clock."
      },
      "balanceStress": {
        "resilience": 92,
        "summary": "Balance-sheet survival risk is very low; the stress is earnings normalization and strategic capital deployment, not solvency.",
        "tests": [
          [
            "AI capex -25% vs base",
            "Large earnings/IV hit",
            "Balance sheet remains strong"
          ],
          [
            "Gross margin -800 bps",
            "Material FCF compression",
            "Tests platform pricing power"
          ],
          [
            "Export TAM loss",
            "Persistent regional impairment",
            "Structural downside to normalized value"
          ]
        ]
      },
      "consensus": {
        "crowding": "HIGH",
        "edgeStrength": 48,
        "variant": "ARGUS accepts that Q2 is extraordinary; the variant question is whether normalized AI customer ROI supports the capex duration implied by the price.",
        "consensusRisk": "AI leadership is consensus. A correct bullish business view is not enough without a cheaper entry or stronger normalized-ROI evidence."
      },
      "catalysts": [
        [
          "Rubin/Blackwell execution",
          0.75,
          "3–9 months",
          "Positive if delivery + margin stay strong"
        ],
        [
          "Hyperscaler capex/ROI proof",
          0.6,
          "3–12 months",
          "Highest-value confirmation"
        ],
        [
          "Export-control shock",
          0.3,
          "Any time",
          "Negative, potentially structural"
        ],
        [
          "Custom ASIC share gain",
          0.4,
          "6–18 months",
          "Negative if core workloads shift materially"
        ]
      ],
      "unknowns": [
        [
          "Normalized AI infrastructure demand after current buildout",
          "VERY HIGH"
        ],
        [
          "Long-run inference split between merchant GPU and custom ASIC",
          "HIGH"
        ],
        [
          "Geopolitical/export-policy path",
          "VERY HIGH"
        ]
      ],
      "modelRisk": {
        "score": 55,
        "summary": "High. Q2 increases near-term cash evidence but does not resolve normalized-cycle duration, export/TAM or custom-silicon uncertainty.",
        "sensitivities": [
          [
            "Normalized FCF 15% below live run-rate",
            "Large equity-value effect"
          ],
          [
            "Gross margin -500 bps",
            "Large FCF effect"
          ],
          [
            "High-growth duration shorter by 2 years",
            "Very large DCF effect"
          ]
        ]
      },
      "calibration": {
        "confidenceBin": 60,
        "claim": "Medium confidence: the model should not behave as if current demand has a 90% probability of persistence."
      },
      "dataLineage": {
        "score": 98,
        "asOf": "2026-09-01",
        "criticalCoverage": "VERY HIGH",
        "sources": [
          [
            "NVIDIA Q2 FY27 results (Aug 26)",
            "PRIMARY IR",
            "2026-08-26",
            "Revenue, Data Center, margin, Q3 guide, FCF, SBC, buybacks",
            "DIRECT"
          ],
          [
            "Federal Reserve FOMC statement",
            "PRIMARY POLICY",
            "2026-07-29",
            "Fed rate regime",
            "DIRECT"
          ],
          [
            "Reuters global markets",
            "SECONDARY HIGH-QUALITY",
            "2026-09-01",
            "10Y yield, oil, tightening expectations",
            "CONTEXT"
          ],
          [
            "Aug-31 market close",
            "SECONDARY MARKET",
            "2026-08-31",
            "Price $220.78",
            "DIRECT MARKET"
          ],
          [
            "ARGUS normalized-cycle ensemble",
            "DERIVED",
            "2026-09-01",
            "Normalized FCF / duration valuation",
            "DERIVED"
          ]
        ],
        "rule": "Near-term demand/margins are reported facts; long-run AI ROI and cycle duration remain derived assumptions and receive no primary-source status."
      },
      "valuationEnsemble": {
        "methods": [
          [
            "Normalized FCF / DCF",
            245,
            0.45,
            "Uses H1 FCF but normalizes extraordinary growth"
          ],
          [
            "Cycle-adjusted FCF multiple",
            230,
            0.25,
            "Avoids capitalizing peak growth indefinitely"
          ],
          [
            "Reverse-expectations cross-check",
            275,
            0.3,
            "Tests duration/margin required at current price"
          ]
        ],
        "note": "LIVE rebuild. Weighted value ~$249, but the spread and high model risk force a materially lower buy gate than fair value."
      },
      "causalMap": [
        [
          "Customer AI ROI",
          "Hyperscaler/frontier capex",
          "Data Center demand",
          "Revenue + utilization",
          "Normalized FCF / IV"
        ],
        [
          "Custom ASIC adoption",
          "Workload share",
          "Pricing power / mix",
          "Gross margin",
          "IV"
        ],
        [
          "Export controls / supply",
          "Deliverable TAM",
          "Shipments / product mix",
          "Revenue durability",
          "Bear/Base weights"
        ]
      ],
      "forensic": {
        "score": 92,
        "checks": [
          [
            "Cash conversion",
            "PASS",
            "H1 FCF $69.895B; cash evidence is exceptionally strong"
          ],
          [
            "SBC treatment",
            "PASS",
            "From FY27 non-GAAP measures include SBC; H1 SBC $3.954B"
          ],
          [
            "Receivables / growth quality",
            "PASS/WATCH",
            "Rapid scale requires continued demand-quality checks"
          ],
          [
            "Strategic investments / securities",
            "WATCH",
            "Large equity-security purchases and strategic investments increase capital-allocation complexity"
          ],
          [
            "Customer concentration / financing",
            "WATCH",
            "Customer ROI and financing quality remain the economic quality test"
          ]
        ],
        "rule": "No accounting hard fail. Demand-quality deterioration plus customer-ROI weakness would block entry despite revenue growth."
      },
      "factorExposure": {
        "factors": [
          [
            "AI capex",
            100
          ],
          [
            "Semiconductor cycle",
            85
          ],
          [
            "US-China / Taiwan",
            80
          ],
          [
            "Rates / long duration",
            55
          ],
          [
            "Power / HBM supply",
            70
          ]
        ]
      }
    },
    "FIS": {
      "economicEngine": "Mission-critical bank processing and software contracts; value rises when recurring FCF is retained for owners through debt reduction and disciplined capital allocation.",
      "factors": {
        "businessQuality": 74,
        "valuation": 92,
        "management": 46,
        "evidence": 82,
        "moat": 75,
        "lossProtection": 46,
        "portfolioFit": 76
      },
      "permanentLoss": "MEDIUM–HIGH",
      "confidence": "MEDIUM",
      "management": "This is the central gate. Worldpay, leverage and prior capital allocation mean cheap valuation alone is insufficient. The engine requires proof that FCF goes to deleveraging rather than renewed empire building.",
      "evidenceQuality": "LIVE VERIFIED Q2: revenue $3.377B, FY26 FCF target raised to $2.15–2.25B, but pro-forma revenue growth guidance was cut to 4.5%–5.0%. June 30 balance sheet showed $4.226B short-term borrowings plus $16.948B current/noncurrent long-term debt and only $744M cash.",
      "baseRate": "Entrenched financial infrastructure often has high retention, but leveraged serial-acquirer structures can become value traps when capital allocation destroys the benefit of switching costs.",
      "scenarios": [
        [
          "Bear",
          32,
          0.25,
          "Growth slips, leverage stays high and integration/FCF conversion disappoints"
        ],
        [
          "Base",
          52,
          0.55,
          "FCF reaches guide and leverage moves toward 2.8x"
        ],
        [
          "Bull",
          64,
          0.2,
          "Integration succeeds, organic growth stabilizes and deleveraging earns rerating"
        ]
      ],
      "disconfirm": [
        "Net leverage fails to decline despite the stated FCF profile.",
        "Management resumes material M&A before balance-sheet targets are achieved.",
        "Organic growth remains below the level needed to support normalized IV.",
        "Operational/cyber/regulatory event damages core-bank customer trust."
      ],
      "gates": [
        [
          "Business quality",
          "PASS",
          "Mission-critical banking infrastructure remains durable"
        ],
        [
          "Valuation / margin of safety",
          "PASS",
          "Aug-31 $40.77 is below live ensemble"
        ],
        [
          "Capital allocation",
          "FAIL",
          "Debt/acquisition burden requires actual deleveraging proof"
        ],
        [
          "Evidence integrity",
          "WATCH",
          "FCF excludes Worldpay taxes and is not residual after mandatory debt service"
        ],
        [
          "Permanent-loss risk",
          "WATCH",
          "High leverage raises cost of execution mistakes and refinancing risk"
        ]
      ],
      "sizing": "Engine band: 0–2% / tracking position only until the capital-allocation hard gate changes from FAIL to PASS.",
      "portfolio": "Can diversify software/AI exposure, but adds financial-system and leverage sensitivity.",
      "whyNow": "Live data makes the stock cheaper but the gate stricter: FCF improved, yet debt/borrowings and downgraded pro-forma growth increase the burden of proof.",
      "implied": {
        "summary": "The working price implies skepticism: the market appears to discount execution, leverage and capital-allocation risk despite recurring infrastructure cash flows.",
        "assumptions": [
          "Core banking/processing retention remains durable.",
          "FCF is real and available for debt reduction rather than new empire-building.",
          "Organic growth stabilizes enough to prevent the cheap multiple from becoming a value trap."
        ],
        "edge": "ARGUS only has an edge if it can verify that cash is reaching owners through deleveraging; cheapness alone is not an edge."
      },
      "leading": [
        [
          "Net leverage",
          "WATCH",
          "declines toward stated target",
          "fails to fall despite FCF"
        ],
        [
          "FCF conversion",
          "WATCH",
          "reported cash converts cleanly",
          "pro-forma / transaction noise absorbs cash"
        ],
        [
          "Organic growth",
          "WATCH",
          "stabilizes near required normalized rate",
          "persistent sub-model growth"
        ],
        [
          "M&A discipline",
          "NEGATIVE",
          "no material deals before leverage target",
          "new M&A before balance-sheet repair"
        ],
        [
          "Bank IT budgets",
          "WATCH",
          "stable modernization spend",
          "broad cuts / project deferrals"
        ]
      ],
      "dependencies": [
        "FCF generation → debt reduction → interest burden / equity risk → per-share value.",
        "Organic growth + retention → recurring FCF durability → valuation rerating.",
        "Management discipline → destination of FCF → whether moat translates into shareholder returns."
      ],
      "redTeam": {
        "case": "FIS can remain optically cheap for years because the real problem is not the franchise but the conversion of franchise cash flows into per-share value.",
        "attacks": [
          "Management resumes acquisition behavior before deleveraging.",
          "Normalized organic growth is structurally lower than assumed.",
          "Transaction/pro-forma complexity masks weaker owner economics."
        ],
        "penalty": 6,
        "verdict": "Red team currently reinforces the capital-allocation FAIL gate; valuation cannot override it."
      },
      "uncertainty": [
        [
          "Business",
          30,
          "Installed base helps, but growth is less clean"
        ],
        [
          "Valuation",
          24,
          "Price is low relative to working IV"
        ],
        [
          "Data / evidence",
          42,
          "Pro-forma / transaction history complicates normalization"
        ],
        [
          "Macro / banking",
          34,
          "Bank budgets and credit cycle matter"
        ],
        [
          "Management",
          58,
          "Central uncertainty"
        ],
        [
          "Technology / regulation",
          32,
          "Payments/real-time rails/cyber risk"
        ]
      ],
      "uncertaintyPenalty": 5,
      "evidenceMeta": {
        "asOf": "2026-09-01",
        "maxAgeDays": 14,
        "strength": "HIGH — LIVE VERIFIED, COMPLEX",
        "critical": "net debt, FCF reconciliation, pro-forma organic growth, integration, M&A discipline"
      },
      "exit": {
        "current": "HOLD/NO ADD",
        "rule": "If already held: no averaging down while capital-allocation gate is FAIL. Hold only while cash generation and balance-sheet repair remain credible.",
        "hardSell": [
          "Management materially increases leverage or resumes value-destructive M&A.",
          "FCF proves materially weaker than normalized thesis.",
          "Core customer trust / operating integrity is structurally impaired."
        ],
        "reduce": [
          "2 independent negatives with one tied to FCF/deleveraging engine.",
          "Example: leverage stalls + organic growth weakens."
        ],
        "trim": [
          "Not valuation-driven today; trimming becomes relevant only after rerating without capital-allocation improvement."
        ],
        "reentry": "Upgrade only after reported cash flows demonstrate deleveraging and capital discipline — not on guidance alone."
      },
      "premortem": [
        "Leverage remains high because headline FCF is not truly available.",
        "Management repeats acquisition-led value destruction.",
        "Core growth stays too weak to support even a low multiple.",
        "Cyber/operational event damages trust in mission-critical systems."
      ],
      "attribution": {
        "from": "V10.16",
        "to": "V10.17 LIVE",
        "decision": "PROVE IT → PROVE IT",
        "changes": [
          "Price updated to Aug-31 close $40.77.",
          "FCF target raised to $2.15–2.25B.",
          "Pro-forma revenue growth guide reduced to 4.5–5.0%.",
          "June debt/borrowings exceed $21B versus $744M cash; balance stress worsened.",
          "Live valuation remains attractive, but capital-allocation/deleveraging gate stays FAIL."
        ]
      },
      "learning": [
        {
          "date": "2026-09-01",
          "event": "V10.14 baseline",
          "result": "No outcome yet — architecture upgrade only.",
          "lesson": "Value traps often come from the destination of cash, not the absence of cash.",
          "rule": "Never upgrade FIS on valuation alone; require reported deleveraging evidence."
        }
      ],
      "regime": {
        "state": "VERIFIED ADVERSE / TIGHTENING RISK",
        "penalty": 4,
        "asOf": "2026-09-01",
        "summary": "High yields and possible renewed Fed tightening are directly adverse to a levered equity story. The 10Y near 4.79% increases refinancing and equity-risk sensitivity.",
        "sensitivities": [
          [
            "Rates / refinancing",
            "VERY HIGH",
            "Large debt load makes duration costly"
          ],
          [
            "Credit / bank health",
            "HIGH",
            "Client budgets and transaction environment"
          ],
          [
            "Bank IT budgets",
            "HIGH",
            "Organic growth sensor"
          ],
          [
            "Payments regulation",
            "MEDIUM",
            "Legacy economics / modernization demand"
          ]
        ]
      },
      "thesisClock": {
        "start": "2026-08-31",
        "deadline": "2027-08-31",
        "nextReview": "2026-11-30",
        "status": "ON CLOCK",
        "mustShowByNext": "Reported FCF converts to net debt reduction; leverage trends toward target; no material M&A before balance-sheet repair.",
        "expiryRule": "Failure to show deleveraging at the next two evidence checkpoints automatically strengthens the capital-allocation FAIL gate; cheapness never resets the clock."
      },
      "balanceStress": {
        "resilience": 38,
        "summary": "June 30 cash $0.744B versus ~$21.17B short-term borrowings + long-term debt/current maturities. The thesis depends on cash generation and refinancing access.",
        "tests": [
          [
            "Refinancing +200 bps",
            "Material interest burden",
            "Reduces equity FCF"
          ],
          [
            "FCF conversion -25%",
            "Deleveraging stalls",
            "Hard-gate deterioration"
          ],
          [
            "Pro-forma growth -2 pts",
            "Lower EBITDA/FCF",
            "Leverage takes longer to repair"
          ]
        ]
      },
      "consensus": {
        "crowding": "LOW–MEDIUM",
        "edgeStrength": 60,
        "variant": "ARGUS sees value only if the raised FCF target visibly becomes debt reduction; the live edge is a deleveraging proof case, not a low-multiple case.",
        "consensusRisk": "A low price can be fully justified if pro-forma growth is weak and cash is absorbed by debt/integration."
      },
      "catalysts": [
        [
          "Net leverage declines",
          0.55,
          "3–12 months",
          "Positive — can unlock PROVE IT → BUY"
        ],
        [
          "No M&A before leverage target",
          0.65,
          "6–12 months",
          "Positive capital-discipline evidence"
        ],
        [
          "Organic growth stabilization",
          0.55,
          "6–12 months",
          "Supports normalized IV"
        ],
        [
          "New debt-funded transaction",
          0.2,
          "Any time",
          "Negative — likely hard-gate deterioration"
        ]
      ],
      "unknowns": [
        [
          "True normalized post-transaction FCF conversion",
          "HIGH"
        ],
        [
          "Management behavior after initial deleveraging",
          "VERY HIGH"
        ],
        [
          "Structural organic growth ceiling",
          "HIGH"
        ]
      ],
      "modelRisk": {
        "score": 45,
        "summary": "Moderate-high. FCF is observable, but the translation to equity value is fragile because debt service, transaction exclusions and integration matter.",
        "sensitivities": [
          [
            "FCF -20%",
            "Material IV reduction"
          ],
          [
            "Deleveraging delayed 2 years",
            "Large equity-risk penalty"
          ],
          [
            "Pro-forma growth -1.5 pts",
            "Value-trap probability rises sharply"
          ]
        ]
      },
      "calibration": {
        "confidenceBin": 55,
        "claim": "Medium confidence. Upgrade probability must be earned by reported deleveraging, not management guidance."
      },
      "dataLineage": {
        "score": 94,
        "asOf": "2026-09-01",
        "criticalCoverage": "VERY HIGH, TRANSACTION-COMPLEX",
        "sources": [
          [
            "FIS Q2 2026 results (Aug 4)",
            "PRIMARY IR",
            "2026-08-04",
            "Revenue, pro-forma guide, FCF, leverage policy, balance sheet",
            "DIRECT"
          ],
          [
            "FIS balance sheet / cash flow exhibits",
            "PRIMARY IR",
            "2026-06-30",
            "Cash, debt, goodwill, acquisitions, FCF reconciliation",
            "DIRECT"
          ],
          [
            "Federal Reserve FOMC statement",
            "PRIMARY POLICY",
            "2026-07-29",
            "Rate regime",
            "DIRECT"
          ],
          [
            "Reuters global markets",
            "SECONDARY HIGH-QUALITY",
            "2026-09-01",
            "10Y / tightening context",
            "CONTEXT"
          ],
          [
            "Aug-31 market close",
            "SECONDARY MARKET",
            "2026-08-31",
            "Price $40.77",
            "DIRECT MARKET"
          ],
          [
            "ARGUS post-transaction ensemble",
            "DERIVED",
            "2026-09-01",
            "Equity value after leverage/integration adjustment",
            "DERIVED"
          ]
        ],
        "rule": "Primary-source coverage is now high, but complexity remains intrinsic: adjusted/pro-forma metrics cannot substitute for debt and reported cash reconciliation."
      },
      "valuationEnsemble": {
        "methods": [
          [
            "Normalized equity FCF",
            54,
            0.4,
            "Uses $2.15–2.25B guide with debt-service caution"
          ],
          [
            "FCF-yield / multiple",
            50,
            0.3,
            "Low multiple but no credit for unproven rerating"
          ],
          [
            "Deleveraging-adjusted equity value",
            58,
            0.3,
            "Upside only if leverage moves toward ~2.8x"
          ]
        ],
        "note": "LIVE rebuild. Weighted value ~$54. Hard capital-allocation gate overrides cheapness."
      },
      "causalMap": [
        [
          "Reported FCF",
          "Cash available after transaction effects",
          "Net debt reduction",
          "Equity risk / interest burden",
          "Per-share IV"
        ],
        [
          "Organic growth",
          "Client retention + wallet share",
          "Recurring revenue",
          "Normalized FCF",
          "Base IV"
        ],
        [
          "Management discipline",
          "M&A / buyback choices",
          "Destination of cash",
          "Per-share value",
          "Realized return"
        ]
      ],
      "forensic": {
        "score": 60,
        "checks": [
          [
            "Reported FCF vs residual owner cash",
            "WATCH",
            "Company states FCF is not residual after mandatory debt service"
          ],
          [
            "Transaction exclusions",
            "WATCH",
            "2026 FCF guide excludes Worldpay cash transaction taxes"
          ],
          [
            "Debt movement",
            "WATCH",
            "Short-term borrowings $4.226B; current LT debt $1.516B; noncurrent debt $15.432B"
          ],
          [
            "Goodwill / acquisition load",
            "WATCH",
            "Goodwill rose to $25.026B from $17.762B after Total Issuing Solutions"
          ],
          [
            "Capital allocation",
            "HARD WATCH",
            "Acquisition-driven leverage requires proof before new capital"
          ],
          [
            "Pro-forma growth quality",
            "WATCH",
            "FY26 pro-forma revenue guide cut to 4.5%–5.0%"
          ]
        ],
        "rule": "Capital-allocation hard watch remains a block through the management gate. Upgrade requires reported debt reduction and clean FCF reconciliation, not guidance."
      },
      "factorExposure": {
        "factors": [
          [
            "Bank IT budgets",
            75
          ],
          [
            "Credit / bank health",
            60
          ],
          [
            "Rates / refinancing",
            70
          ],
          [
            "Payments disruption",
            50
          ],
          [
            "Execution / leverage",
            90
          ]
        ]
      }
    },
    "CRM": {
      "economicEngine": "Recurring enterprise workflows across sales, service, data and AI; value rises if Agentforce/Data 360 lift organic expansion and per-share FCF faster than dilution and acquisition dependence.",
      "factors": {
        "businessQuality": 88,
        "valuation": 64,
        "management": 76,
        "evidence": 90,
        "moat": 87,
        "lossProtection": 68,
        "portfolioFit": 72
      },
      "permanentLoss": "MEDIUM",
      "confidence": "MEDIUM",
      "management": "Margin and cash-flow discipline improved, but M&A and SBC remain economically relevant. The engine focuses on per-share value creation, not adjusted operating optics.",
      "evidenceQuality": "LIVE VERIFIED Q2 FY27: cRPO $33.5B (+14%), revenue $11.345B (+11%) and FCF $1.098B (+81% YoY). But Q3 revenue guide includes >4pts Informatica contribution, operating income was $2.331B vs $2.332B YoY, and $2.613B strategic-investment gains added $2.53 to non-GAAP EPS.",
      "baseRate": "Scaled enterprise software with deep workflow integrations usually enjoys durable retention, but mature seat-based models can derate when growth slows or a platform transition changes monetization.",
      "scenarios": [
        [
          "Bear",
          200,
          0.25,
          "Organic growth weakens; AI seat compression and leverage reduce per-share economics"
        ],
        [
          "Base",
          270,
          0.55,
          "cRPO ~14%, paid AI monetization and FCF/share remain durable"
        ],
        [
          "Bull",
          330,
          0.2,
          "Agentforce/Data 360 reaccelerate organic growth beyond acquisition contribution"
        ]
      ],
      "disconfirm": [
        "cRPO / organic growth weakens for 2 quarters despite AI product expansion.",
        "AI reduces paid seats faster than usage-based monetization replaces them.",
        "SBC and acquisitions prevent meaningful per-share FCF growth.",
        "Regulatory/data constraints materially slow enterprise AI deployment."
      ],
      "gates": [
        [
          "Business quality",
          "PASS",
          "cRPO +14% and recurring platform economics remain strong"
        ],
        [
          "Valuation / margin of safety",
          "WATCH",
          "Aug-31 $261.61 sits near live ensemble/fair zone"
        ],
        [
          "Capital allocation",
          "PASS/WATCH",
          "$25B ASR cut share count but noncurrent debt rose to $39.3B"
        ],
        [
          "Evidence integrity",
          "PASS/WATCH",
          "Operating metrics good; headline EPS quality distorted by investment gains"
        ],
        [
          "Permanent-loss risk",
          "PASS/WATCH",
          "No near-term solvency issue, but leverage and M&A reduce flexibility"
        ]
      ],
      "sizing": "Engine band: 1–3% while valuation remains mid-range; add only with lower price or clear organic AI reacceleration.",
      "portfolio": "Useful only if aggregate enterprise-software / long-duration exposure remains controlled.",
      "whyNow": "Q2 improved AI/recurring-demand evidence, but the stock rerated and the balance sheet became more levered. Organic-vs-acquired growth and per-share FCF now carry more weight than headline EPS.",
      "implied": {
        "summary": "The working market price assumes a solid mature software franchise with some AI monetization, but not a full return to high organic growth.",
        "assumptions": [
          "cRPO / organic growth remains resilient enough to support the current mid-range valuation.",
          "Agentforce/Data 360 adds usage and ARPU rather than merely offsetting seat compression.",
          "FCF growth per share survives SBC and acquisition activity."
        ],
        "edge": "The edge would come from proving organic AI monetization before the market, or buying after valuation offers wider asymmetry."
      },
      "leading": [
        [
          "cRPO / organic growth",
          "POSITIVE",
          ">= ~14% / stable acceleration",
          "2-quarter weakening despite AI rollout"
        ],
        [
          "Paid AI usage",
          "WATCH",
          "pilots convert to paid usage/ARPU",
          "pilot activity without revenue conversion"
        ],
        [
          "FCF per share",
          "POSITIVE",
          "grows after SBC/dilution",
          "adjusted margins rise but per-share value stalls"
        ],
        [
          "Enterprise IT spend",
          "WATCH",
          "budgets remain resilient",
          "large-project deferrals / budget cuts"
        ],
        [
          "AI regulation / data",
          "WATCH",
          "deployment friction manageable",
          "compliance materially slows use cases"
        ]
      ],
      "dependencies": [
        "Paid Agentforce/Data usage → organic cRPO / ARPU → FCF per share → valuation.",
        "AI automation → seat compression versus usage monetization → net revenue effect.",
        "SBC + M&A → share count / capital use → whether enterprise moat reaches owners."
      ],
      "redTeam": {
        "case": "AI may improve the product while weakening seat economics, and headline growth can look stronger than organic per-share economics because of Informatica and investment gains.",
        "attacks": [
          "AI agents reduce seats faster than usage revenue replaces them.",
          "Acquisition contribution masks weaker core growth.",
          "Debt-funded capital return and SBC dilute the quality of headline FCF/EPS."
        ],
        "penalty": 2,
        "verdict": "The opposing case is meaningful but does not break the franchise; it supports WATCH until organic paid-AI and per-share FCF are clearer."
      },
      "uncertainty": [
        [
          "Business",
          22,
          "Deep workflows support durability"
        ],
        [
          "Valuation",
          36,
          "Price is near mid-range IV"
        ],
        [
          "Data / evidence",
          28,
          "cRPO/FCF visible; AI mix less clear"
        ],
        [
          "Macro / IT spend",
          34,
          "Enterprise budgets matter"
        ],
        [
          "Management",
          28,
          "Improved discipline but M&A/SBC persist"
        ],
        [
          "Technology / regulation",
          40,
          "AI monetization model is still evolving"
        ]
      ],
      "uncertaintyPenalty": 1,
      "evidenceMeta": {
        "asOf": "2026-09-01",
        "maxAgeDays": 14,
        "strength": "HIGH — LIVE VERIFIED",
        "critical": "cRPO, organic ex-Informatica growth, paid AI usage, FCF/share, debt/ASR, investment gains"
      },
      "exit": {
        "current": "HOLD/NO ADD",
        "rule": "If already held: hold without adding while valuation is mid-range. Add only after wider margin of safety or clear organic AI reacceleration.",
        "hardSell": [
          "Structural deterioration in enterprise workflow moat.",
          "Per-share FCF fails while SBC/acquisitions consume economics.",
          "AI monetization structurally weakens the revenue model rather than extending it."
        ],
        "reduce": [
          "2 independent negatives, at least one tied to cRPO/organic monetization.",
          "Example: cRPO deterioration + per-share FCF stagnation."
        ],
        "trim": [
          "Valuation moves materially above Bull-weighted value without corresponding organic growth acceleration."
        ],
        "reentry": "Require either lower price or evidence that paid AI usage is producing durable organic expansion."
      },
      "premortem": [
        "AI agents cannibalize paid seats faster than usage revenue grows.",
        "Organic growth slows while acquisitions hide the decline.",
        "SBC prevents per-share compounding despite strong headline FCF.",
        "Regulation/data sovereignty delays enterprise AI deployment."
      ],
      "attribution": {
        "from": "V10.16",
        "to": "V10.17 LIVE",
        "decision": "WATCH → WATCH",
        "changes": [
          "Price updated to Aug-31 close $261.61.",
          "cRPO +14% and Q2 FCF +81% improve recurring-demand/cash evidence.",
          "Q3 growth includes >4pts Informatica contribution, weakening headline-organic comparability.",
          "$2.613B strategic-investment gain materially flattered EPS.",
          "Debt-funded ASR reduced share count but raised noncurrent debt to $39.3B; capital flexibility worsened."
        ]
      },
      "learning": [
        {
          "date": "2026-09-01",
          "event": "V10.14 baseline",
          "result": "No outcome yet — architecture upgrade only.",
          "lesson": "Measure AI through paid organic usage and per-share economics, not product announcements.",
          "rule": "Do not upgrade on AI narrative without cRPO / paid usage / per-share FCF confirmation."
        }
      ],
      "regime": {
        "state": "VERIFIED ADVERSE / TIGHTENING RISK",
        "penalty": 3,
        "asOf": "2026-09-01",
        "summary": "Higher yields and above-target inflation are adverse to long-duration software and enterprise IT budgets. The impact is more important now because Salesforce also increased debt materially for capital return.",
        "sensitivities": [
          [
            "Enterprise IT spend",
            "HIGH",
            "Large-deal / expansion demand"
          ],
          [
            "Rates / yields",
            "HIGH",
            "Long-duration valuation + debt burden"
          ],
          [
            "AI regulation / data",
            "HIGH",
            "Deployment friction"
          ],
          [
            "Labor/productivity cycle",
            "MEDIUM",
            "AI willingness-to-pay / seat economics"
          ]
        ]
      },
      "thesisClock": {
        "start": "2026-08-31",
        "deadline": "2027-08-31",
        "nextReview": "2026-11-30",
        "status": "ON CLOCK",
        "mustShowByNext": "Paid Agentforce/Data usage begins to appear in organic cRPO/ARPU and FCF/share, not only announcements or acquired growth.",
        "expiryRule": "If two checkpoints pass with product activity but no organic monetization evidence, reduce AI thesis value rather than extending the monetization timeline."
      },
      "balanceStress": {
        "resilience": 68,
        "summary": "Cash + marketable securities ~$11.4B, but noncurrent debt rose to $39.288B from $10.439B after debt-funded ASR. Strong FCF supports serviceability, yet flexibility is lower.",
        "tests": [
          [
            "Enterprise growth -4 pts",
            "FCF / multiple compression",
            "Debt remains serviceable but equity risk rises"
          ],
          [
            "Rates +150 bps",
            "Higher interest burden",
            "Reduces capital-return flexibility"
          ],
          [
            "SBC + M&A remain high",
            "Per-share compounding weakens",
            "Can offset headline FCF growth"
          ]
        ]
      },
      "consensus": {
        "crowding": "MEDIUM–HIGH",
        "edgeStrength": 52,
        "variant": "The live variant is not that Agentforce is growing; it is whether paid organic AI usage can outrun seat compression and acquisition contribution while FCF/share improves after the ASR.",
        "consensusRisk": "Post-earnings enthusiasm is higher. Current price leaves little reward for simply matching the raised headline guidance."
      },
      "catalysts": [
        [
          "Paid Agentforce usage conversion",
          0.5,
          "3–12 months",
          "Positive if visible in organic metrics"
        ],
        [
          "cRPO reacceleration",
          0.45,
          "3–12 months",
          "Positive — can unlock WATCH → BUY with valuation"
        ],
        [
          "SBC/share-count improvement",
          0.6,
          "6–18 months",
          "Positive per-share economics"
        ],
        [
          "Regulatory friction",
          0.3,
          "6–18 months",
          "Negative to deployment pace"
        ]
      ],
      "unknowns": [
        [
          "Net effect of AI agents on seats versus usage revenue",
          "VERY HIGH"
        ],
        [
          "How much AI growth will be organic versus acquired",
          "HIGH"
        ],
        [
          "Durability of FCF/share after SBC and M&A",
          "MEDIUM–HIGH"
        ]
      ],
      "modelRisk": {
        "score": 40,
        "summary": "Moderate-high. Organic-vs-acquired growth, AI monetization, strategic-investment volatility and post-ASR capital structure all affect per-share value.",
        "sensitivities": [
          [
            "Organic growth -2 pts",
            "Material IV effect"
          ],
          [
            "AI monetization delayed 2 years",
            "Bull case compresses materially"
          ],
          [
            "Debt remains near current level",
            "Raises equity discount / lowers flexibility"
          ]
        ]
      },
      "calibration": {
        "confidenceBin": 55,
        "claim": "Medium confidence. AI product adoption should not be scored as a successful prediction until paid organic economics appear."
      },
      "dataLineage": {
        "score": 97,
        "asOf": "2026-09-01",
        "criticalCoverage": "VERY HIGH",
        "sources": [
          [
            "Salesforce Q2 FY27 results (Aug 26)",
            "PRIMARY IR",
            "2026-08-26",
            "cRPO, revenue, guidance, FCF, SBC, investment gains, debt/ASR",
            "DIRECT"
          ],
          [
            "Salesforce balance sheet / cash flow",
            "PRIMARY IR",
            "2026-07-31",
            "Debt, cash, strategic investments, repurchases",
            "DIRECT"
          ],
          [
            "Federal Reserve FOMC statement",
            "PRIMARY POLICY",
            "2026-07-29",
            "Rate regime",
            "DIRECT"
          ],
          [
            "BEA PCE July 2026",
            "PRIMARY MACRO",
            "2026-08-26",
            "Inflation regime",
            "DIRECT"
          ],
          [
            "Aug-31 market close",
            "SECONDARY MARKET",
            "2026-08-31",
            "Price $261.61",
            "DIRECT MARKET"
          ],
          [
            "ARGUS per-share FCF ensemble",
            "DERIVED",
            "2026-09-01",
            "Intrinsic value / acquisition normalization",
            "DERIVED"
          ]
        ],
        "rule": "Headline EPS is not accepted without reconciliation to operating income, strategic-investment gains, SBC and share-count/debt changes."
      },
      "valuationEnsemble": {
        "methods": [
          [
            "Normalized FCF/share",
            270,
            0.4,
            "Recurring cash flow adjusted for capital structure"
          ],
          [
            "Organic-growth software multiple",
            255,
            0.3,
            "Separates Informatica contribution from core growth"
          ],
          [
            "Reverse-expectations / AI option value",
            280,
            0.3,
            "Tests how much AI reacceleration current price already discounts"
          ]
        ],
        "note": "LIVE rebuild. Weighted value ~$269, close to market; no meaningful margin of safety."
      },
      "causalMap": [
        [
          "Paid AI usage",
          "Usage / ARPU expansion",
          "Organic cRPO",
          "FCF/share",
          "Base/Bull IV"
        ],
        [
          "AI seat compression",
          "Seat count vs usage pricing",
          "Net organic revenue",
          "Margin / FCF",
          "IV"
        ],
        [
          "SBC + M&A",
          "Share count / cash deployment",
          "Per-share economics",
          "Owner FCF",
          "Realized return"
        ]
      ],
      "forensic": {
        "score": 75,
        "checks": [
          [
            "Operating income vs headline EPS",
            "WATCH",
            "Q2 operating income $2.331B vs $2.332B YoY despite much higher EPS"
          ],
          [
            "Strategic investment gains",
            "WATCH",
            "$2.613B Q2 gain added ~$2.53 to non-GAAP EPS; not recurring operating economics"
          ],
          [
            "SBC",
            "WATCH",
            "Q2 SBC ~$904M; per-share FCF remains preferred measure"
          ],
          [
            "Organic vs acquired growth",
            "WATCH",
            "Q3 revenue guide includes >4pts Informatica contribution"
          ],
          [
            "Debt-funded ASR",
            "WATCH",
            "Noncurrent debt $39.288B vs $10.439B at Jan. 31; 103M shares initially delivered"
          ],
          [
            "cRPO / recurring demand",
            "PASS",
            "$33.5B cRPO, +14% YoY / CC"
          ]
        ],
        "rule": "No accounting hard fail, but headline EPS is explicitly de-emphasized. Upgrade requires organic paid-AI and per-share FCF confirmation."
      },
      "factorExposure": {
        "factors": [
          [
            "Enterprise IT spend",
            75
          ],
          [
            "Software duration / rates",
            60
          ],
          [
            "AI monetization",
            85
          ],
          [
            "AI regulation / data",
            55
          ],
          [
            "SBC / M&A execution",
            65
          ]
        ]
      }
    }
  },
  "stocks": [
    {
      "ticker": "INTU",
      "company": "Intuit",
      "market": "$359.30",
      "iv": "$385–475",
      "decision": "BUY",
      "tag": "buytag",
      "why": "FY26 cash generation is strong and price remains below the live valuation ensemble; FY27 growth slows and the macro regime is adverse, but the margin-of-safety gate still passes.",
      "buy": "FY26 revenue reached $21.45B and operating cash flow $8.84B; QBO remained strong, buybacks reduced diluted shares, and the current price is below the live ensemble value.",
      "no": "FY27 revenue guidance slows to 9%–10%; TurboTax guide is only 2%–3%, Mailchimp is flat/down, and inflation/rates create a less favorable valuation regime.",
      "logic": "LIVE VERIFIED: the quality and valuation gates still pass, but the position is no longer a high-conviction macro-neutral buy. BUY/ADD only within the engine sizing band.",
      "forecast": {
        "date": "2026-09-01",
        "horizon": "6–12 חודשים",
        "bias": "חיובי זהיר",
        "biasClass": "bias-pos",
        "confidence": "בינוני–גבוה",
        "thesis": "FY26 confirms strong cash generation and QBO economics, but FY27 guidance resets total growth to 9%–10%. The thesis now requires GBS to hold 13%–14%, owner earnings per share to remain strong, and tax/AI disruption not to impair pricing power while rates stay restrictive.",
        "up": [
          "GBS delivers 13%–14% or better and QBO remains near 20% growth.",
          "Operating margin expands with FY27 GAAP operating income growth near 26%–27%.",
          "Buybacks continue to offset SBC and reduce diluted shares.",
          "Rates/inflation ease, improving SMB conditions and software valuation support."
        ],
        "down": [
          "GBS/QBO decelerates below the normalized rate required by the valuation.",
          "TurboTax 2%–3% growth proves structural and paid conversion weakens.",
          "Mailchimp remains flat while consuming capital/management attention.",
          "Higher yields and renewed inflation pressure compress the multiple and SMB demand."
        ],
        "watch": [
          [
            "GBS / QBO growth",
            "חיובי",
            "Core engine; FY27 GBS guide 13%–14%."
          ],
          [
            "Owner Earnings / share",
            "חיובי",
            "FY26 OCF $8.84B; per-share cash must remain durable."
          ],
          [
            "Fed / yields",
            "שלילי",
            "Tightening risk raises discount rate and pressures SMB."
          ],
          [
            "Tax policy / AI",
            "מעורב",
            "Potential structural effect on TurboTax pricing and workflow friction."
          ],
          [
            "Mailchimp",
            "שלילי קל",
            "FY27 guide is -1% to 0%; still a capital-allocation proof point."
          ]
        ],
        "success": "GBS/QBO growth and per-share cash generation hold while FY27 margin expansion is delivered.",
        "fail": "Structural slowdown in core workflows or evidence that tax/AI changes reduce durable pricing power.",
        "sources": [
          [
            "INTU FY26/FY27 8-K",
            "https://investors.intuit.com/sec-filings/all-sec-filings/content/0000896878-26-000029/fy26q4earningspressrelease.htm"
          ],
          [
            "Fed 29 Jul 2026",
            "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260729a.htm"
          ],
          [
            "BEA July 2026 PCE",
            "https://www.bea.gov/news/2026/personal-income-and-outlays-july-2026"
          ]
        ],
        "startPrice": 359.3,
        "version": "F2-LIVE"
      },
      "essence": "פלטפורמת תוכנה ופיננסים לצרכנים ולעסקים קטנים: QuickBooks מנהלת את הליבה הפיננסית של העסק, TurboTax מס, Credit Karma פיננסים אישיים ו-Mailchimp שיווק. מנוע הערך הוא הכנסה חוזרת + שירותים פיננסיים סביב workflow שהלקוח משתמש בו יום-יום.",
      "moat": "היסטוריית נתונים פיננסיים עמוקה, אינטגרציות עם בנקים/שכר/חשבונאות, רשת רואי חשבון ושותפים, מותג חזק במסים ועלויות מעבר גבוהות: החלפה של QuickBooks אינה רק החלפת תוכנה אלא העברת מערכת פיננסית שלמה."
    },
    {
      "ticker": "NVDA",
      "company": "NVIDIA",
      "market": "$220.78",
      "iv": "$205–290",
      "decision": "WAIT",
      "tag": "waittag",
      "why": "Q2 was exceptional ($96.2B revenue, 75% gross margin), but high cycle/model risk and a tightening macro regime keep the buy gate below market.",
      "buy": "Data Center reached $89.0B, Q3 revenue guide is $108B, margins remain near 74%–75%, and H1 free cash flow approached $70B.",
      "no": "The market still capitalizes a very long AI capex cycle; China compute is excluded from Q3 guidance, custom silicon/geopolitics remain material, and higher yields increase duration risk.",
      "logic": "LIVE VERIFIED: business quality strengthened, but the investment gate remains WAIT because normalized AI ROI and cycle duration are less certain than the headline growth rate.",
      "forecast": {
        "date": "2026-09-01",
        "horizon": "6–12 חודשים",
        "bias": "חיובי עסקית / WAIT במחיר",
        "biasClass": "bias-mix",
        "confidence": "בינוני",
        "thesis": "Q2 FY27 confirms extraordinary demand and margins, but ARGUS will not extrapolate 106% revenue growth. The key question is whether customer AI ROI sustains capex through the next platform cycles under tighter financial conditions.",
        "up": [
          "Q3 revenue lands near/above $108B while gross margin remains ~74%.",
          "Hyperscaler/frontier-lab capex remains backed by measurable AI monetization.",
          "Rubin/Blackwell execution sustains platform share and networking attach.",
          "China/export outcomes improve without creating compliance or geopolitical impairment."
        ],
        "down": [
          "AI capex financing tightens as yields rise and customer ROI lags.",
          "Custom ASICs/AMD take material inference share or pressure pricing.",
          "Export controls create permanent TAM loss; Q3 already assumes no China Data Center compute revenue.",
          "Gross margin falls structurally below normalized expectations."
        ],
        "watch": [
          [
            "Customer AI ROI",
            "קריטי",
            "Determines whether unprecedented capex is economically durable."
          ],
          [
            "Hyperscaler capex",
            "חיובי",
            "Primary demand sensor."
          ],
          [
            "Gross margin",
            "חיובי",
            "Q2 75%; Q3 guide 74% ±50 bps."
          ],
          [
            "US–China / Taiwan",
            "סיכון גבוה",
            "Can change deliverable TAM and supply."
          ],
          [
            "Treasury yields",
            "שלילי",
            "Higher discount rates and financing costs hit long-duration AI assets."
          ]
        ],
        "success": "Q3/Q4 demand remains tied to customer ROI, margins stay resilient and platform share holds.",
        "fail": "Capex rollover, structural margin/share loss, or persistent export/TAM impairment.",
        "sources": [
          [
            "NVDA Q2 FY27",
            "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2027"
          ],
          [
            "Reuters market regime 1 Sep 2026",
            "https://www.reuters.com/world/china/global-markets-global-markets-2026-09-01/"
          ],
          [
            "Fed 29 Jul 2026",
            "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260729a.htm"
          ]
        ],
        "startPrice": 220.78,
        "version": "F2-LIVE"
      },
      "essence": "פלטפורמת מחשוב מואץ ל-AI: GPUs, מערכות, networking ותוכנת CUDA. החברה לא מוכרת רק שבב; היא מוכרת stack מלא שמאפשר לאמן ולהריץ מודלי AI בקנה מידה גדול.",
      "moat": "CUDA ואקו-סיסטם המפתחים, ספריות וכלי תוכנה שנבנו במשך שנים; אינטגרציה בין GPU, networking ומערכות; בסיס התקנות עצום וקצב פיתוח גבוה. ללקוח חשוב total cost per useful computation, לא מחיר השבב בלבד — וזה מעלה את עלות ההחלפה."
    },
    {
      "ticker": "FIS",
      "company": "Fidelity National Information Services",
      "market": "$40.77",
      "iv": "$48–60",
      "decision": "PROVE IT",
      "tag": "waittag",
      "why": "FCF guidance rose to $2.15–2.25B, but pro-forma growth was cut to 4.5%–5.0% and leverage/capital allocation remain the hard gate.",
      "buy": "Recurring banking infrastructure, a low price versus normalized FCF, and management explicitly paused tuck-in M&A/buybacks to accelerate deleveraging.",
      "no": "Debt and borrowings surged after Total Issuing Solutions, goodwill rose sharply, pro-forma growth guidance was reduced, and FCF excludes Worldpay transaction taxes and is not residual cash after debt service.",
      "logic": "LIVE VERIFIED: cheapness is real, but the balance sheet now makes proof of deleveraging even more important. Remains PROVE IT until reported cash flow translates into net debt reduction.",
      "forecast": {
        "date": "2026-09-01",
        "horizon": "6–12 חודשים",
        "bias": "חיובי מותנה / PROVE IT",
        "biasClass": "bias-mix",
        "confidence": "בינוני",
        "thesis": "The valuation can work if $2.15–2.25B FCF is real, organic growth stabilizes and management drives gross leverage toward ~2.8x. The acquisition increased both earnings capacity and financial consequence of execution mistakes.",
        "up": [
          "FCF tracks toward $2.15–2.25B and visibly reduces net debt.",
          "Gross leverage moves toward the ~2.8x target before buybacks/M&A resume.",
          "Pro-forma organic revenue stabilizes at 4.5%–5.0% or better.",
          "Bank modernization/AI budgets remain resilient."
        ],
        "down": [
          "Reported FCF fails to reconcile with debt reduction.",
          "Pro-forma growth weakens below 4.5% or integration costs rise.",
          "Management resumes material M&A before leverage target.",
          "Higher refinancing costs increase the burden of ~$21B debt/borrowings."
        ],
        "watch": [
          [
            "Net debt / leverage",
            "קריטי",
            "Main gate; target gross leverage ~2.8x."
          ],
          [
            "FCF conversion",
            "מעורב",
            "Guidance raised, but measure excludes Worldpay taxes and mandatory debt service."
          ],
          [
            "Pro-forma growth",
            "שלילי קל",
            "FY26 guide cut to 4.5%–5.0%."
          ],
          [
            "Bank IT budgets",
            "חיובי",
            "Management cites modernization/AI demand."
          ],
          [
            "Rates / refinancing",
            "שלילי",
            "Higher yields increase equity sensitivity because leverage is high."
          ]
        ],
        "success": "FCF converts into measurable deleveraging with stable pro-forma organic growth.",
        "fail": "Debt stays elevated, cash conversion disappoints or management reopens acquisition risk before repair.",
        "sources": [
          [
            "FIS Q2 2026",
            "https://www.investor.fisglobal.com/news-releases/news-release-details/fis-reports-second-quarter-2026-results"
          ],
          [
            "Fed 29 Jul 2026",
            "https://www.federalreserve.gov/newsevents/pressreleases/monetary20260729a.htm"
          ],
          [
            "Reuters market regime 1 Sep 2026",
            "https://www.reuters.com/world/china/global-markets-global-markets-2026-09-01/"
          ]
        ],
        "startPrice": 40.77,
        "version": "F2-LIVE"
      },
      "essence": "תשתית טכנולוגית קריטית לבנקים ולשווקי הון: core banking, processing, payments ותוכנות תפעול. ההכנסות נשענות על חוזים ושימוש במערכות שהן חלק מהפעילות היומיומית של מוסדות פיננסיים.",
      "moat": "מערכות עמוקות בתוך הבנק, אינטגרציות רבות, דרישות רגולציה ואבטחה וסיכון תפעולי גבוה בהחלפת ספק. המעבר יכול להיות ארוך ויקר ולכן retention נוטה להיות גבוה. החפיר העסקי קיים — אבל אינו מבטל סיכון מהקצאת הון או מינוף."
    },
    {
      "ticker": "CRM",
      "company": "Salesforce",
      "market": "$261.61",
      "iv": "$240–300",
      "decision": "WATCH",
      "tag": "watchtag",
      "why": "cRPO grew 14% and FCF improved, but acquisition contribution, investment gains and debt-funded repurchases reduce the current edge.",
      "buy": "cRPO reached $33.5B (+14%), subscription/support grew 12%, Q2 FCF rose 81%, and the ASR materially reduced share count.",
      "no": "Q3 revenue growth includes >4pts from Informatica, Q2 operating income was essentially flat YoY, strategic-investment gains added $2.53 to non-GAAP EPS, and noncurrent debt rose to $39.3B.",
      "logic": "LIVE VERIFIED: the business/AI evidence improved, but the quality of headline EPS and capital structure became more important. WATCH / NO ADD at the current price.",
      "forecast": {
        "date": "2026-09-01",
        "horizon": "6–12 חודשים",
        "bias": "ניטרלי–חיובי / WATCH",
        "biasClass": "bias-mix",
        "confidence": "בינוני",
        "thesis": "Agentforce/Data 360 are beginning to show commercial signals, but ARGUS requires organic paid usage, cRPO and per-share FCF—not acquisition contribution or investment gains—to carry the thesis.",
        "up": [
          "cRPO stays ~14%+ while Informatica contribution is separated from organic growth.",
          "Paid Agentforce/Data usage converts into organic ARPU and subscription growth.",
          "FCF/share grows after SBC and final ASR settlement.",
          "Debt is managed down without another large capital-allocation surprise."
        ],
        "down": [
          "Organic revenue growth is materially below headline growth after acquisition contribution.",
          "AI agents cannibalize seats faster than usage revenue replaces them.",
          "Strategic-investment gains obscure flat operating earnings or reverse.",
          "Debt-funded capital return leaves less flexibility if enterprise demand slows."
        ],
        "watch": [
          [
            "cRPO",
            "חיובי",
            "$33.5B, +14% YoY."
          ],
          [
            "Organic vs acquired growth",
            "מעורב",
            "Q3 guidance includes >4pts Informatica contribution."
          ],
          [
            "FCF / share",
            "חיובי",
            "Q2 FCF +81%, but per-share durability is the test."
          ],
          [
            "Debt / ASR",
            "סיכון עולה",
            "Noncurrent debt $39.3B vs $10.4B at Jan. 31."
          ],
          [
            "Strategic investment gains",
            "שלילי לאיכות EPS",
            "$2.613B Q2 gain; +$2.53 to non-GAAP EPS."
          ]
        ],
        "success": "Organic cRPO/paid AI usage and per-share FCF accelerate without further balance-sheet deterioration.",
        "fail": "Organic growth stalls, AI monetization remains mostly narrative/acquired, or leverage/capital allocation weakens per-share economics.",
        "sources": [
          [
            "CRM Q2 FY27",
            "https://investor.salesforce.com/news/news-details/2026/Salesforce-Delivers-Record-Second-Quarter-Fiscal-2027-Results/default.aspx"
          ],
          [
            "Reuters market regime 1 Sep 2026",
            "https://www.reuters.com/world/china/global-markets-global-markets-2026-09-01/"
          ],
          [
            "BEA July 2026 PCE",
            "https://www.bea.gov/news/2026/personal-income-and-outlays-july-2026"
          ]
        ],
        "startPrice": 261.61,
        "version": "F2-LIVE"
      },
      "essence": "מערכת הפעלה ליחסי לקוחות בארגונים: Sales, Service, Marketing, Data ו-AI על אותה פלטפורמה. המנוע הוא subscription חוזר והרחבת מספר המודולים וה-workflows אצל אותו לקוח.",
      "moat": "בסיס לקוחות ארגוני גדול, התאמות ואינטגרציות עמוקות, AppExchange ואקו-סיסטם שותפים, נתוני לקוח ו-workflows שנבנו בתוך המערכת. ככל שיותר מחלקות ותהליכים יושבים על Salesforce, עלות והסיכון במעבר עולים."
    }
  ],
  "weights": {
    "businessQuality": 0.2,
    "valuation": 0.25,
    "management": 0.15,
    "evidence": 0.1,
    "moat": 0.1,
    "lossProtection": 0.15,
    "portfolioFit": 0.05
  },
  "reviews": {
    "price": {
      "label": "מחיר שוק",
      "last": "2026-09-01T13:00:00+03:00",
      "next": "2026-09-01T23:15:00+03:00"
    },
    "weekly": {
      "label": "בדיקה שבועית",
      "last": "2026-09-01T13:00:00+03:00",
      "next": "2026-09-07T09:00:00+03:00"
    },
    "forecast": {
      "label": "תחזית Drivers",
      "last": "2026-09-01T13:00:00+03:00",
      "next": "2026-09-30T18:00:00+03:00"
    },
    "full": {
      "label": "ניתוח מלא",
      "last": "2026-09-01T13:00:00+03:00",
      "next": "2026-11-30T18:00:00+03:00"
    }
  }
});
