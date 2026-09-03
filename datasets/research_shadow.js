import { deepFreeze } from "../lib/integrity.js";
export const RESEARCH_SHADOW = deepFreeze({
  "ai": {
    "version": "V10.33",
    "as_of": "2026-09-03T00:15:00Z",
    "framework": "AI Infrastructure Chain Event Review",
    "canonical_baseline": "ARGUS V10.25 remains frozen",
    "scope": {
      "companies": 8,
      "core_universe": 3,
      "external_candidates": 5,
      "three_pass_reviews": 8,
      "dalio_paths": 24,
      "ready": 0,
      "watch_capped": 2,
      "blocked_fail": 6
    },
    "price_refresh": {
      "checked_at_utc": "2026-09-03T08:07:07Z",
      "checked_at_israel": "2026-09-03T11:07:07+03:00",
      "market_state": "US PRE-MARKET / NO NEW TRADE SINCE PRIOR SNAPSHOT",
      "records_checked": 8,
      "new_trade_prices": 0,
      "decision_changes": 0,
      "log_artifact": "ARGUS_Daily_Price_Refresh_2026-09-03.json"
    },
    "regime_conclusion": {
      "label": "REAL DEMAND / HIGH EXPECTATIONS",
      "conclusion": "The cluster does not resemble a revenue-free dot-com cohort: all eight companies have current operating evidence of material AI-linked demand. That does not establish a margin of safety. Several securities still embed extreme owner-earnings, sales or execution expectations after large drawdowns.",
      "portfolio_rule": "A drawdown is an observation, not a valuation. No company advances to READY without a normalized per-share owner-earnings range, concentration stress, capital-intensity bridge and reverse-valuation hurdle.",
      "best_next_candidate": "Celestica merits the next full zero-based underwriting because its reported growth, improving margin and market multiple create the least extreme expectations burden in this eight-name snapshot. This is a research priority, not a recommendation."
    },
    "records": [
      {
        "scope": "CORE-100",
        "company": "Broadcom",
        "ticker": "AVGO",
        "chain_node": "Custom AI accelerators, networking and infrastructure software",
        "evidence_date": "2026-09-02",
        "pit_price": 367.24,
        "pit_timestamp": "2026-09-03 00:15 UTC",
        "trailing_pe_snapshot": 97.55,
        "t1_facts": "Fiscal Q3 revenue was $29.591bn, up 86% YoY. AI semiconductor revenue was $16.7bn, up 221% YoY and 54% QoQ. Semiconductor Solutions grew 127% and Infrastructure Software 29%. Cash from operations was $14.197bn; capex was $0.532bn; company-defined FCF was $13.665bn. Q4 guidance is $34.8bn revenue, $21.7bn AI semiconductor revenue and 66% non-GAAP operating margin.",
        "market_observation": "User-supplied snapshot: approximately +6% YTD and 25% below the June peak; the after-hours reaction was modest. This historical-return claim is retained as T3 context and is not used as a valuation input until reconciled to an independent total-return series.",
        "t1_url": "https://investors.broadcom.com/news-releases/news-release-details/broadcom-inc-announces-third-quarter-fiscal-year-2026-financial",
        "price_url": "https://www.nasdaq.com/market-activity/stocks/avgo",
        "pass_1_business": "A rare combination of custom silicon, networking and recurring infrastructure software is producing exceptional revenue, margin and cash flow. The economic asset is real; customer-level concentration and acquisition accounting remain central owner questions.",
        "pass_2_causal": "Hyperscaler accelerator and networking demand plus VMware retention drive revenue and mix; operating cash then services debt, funds dividends and creates per-share value only if customer economics and reinvestment remain durable.",
        "pass_3_red_team": "Stress custom-silicon insourcing, a large customer shifting design partners, Q4 guidance merely meeting an elevated whisper number, VMware attrition, $57.2bn long-term debt, SBC and a multiple reset from roughly 98x trailing GAAP earnings.",
        "contradiction": "The strongest operating print in the cluster coexists with a muted price response. That is evidence of a high expectations bar, not proof that the market is skeptical enough to make the stock cheap.",
        "dalio_1": "AI revenue reaches management's target while one hyperscaler diversifies suppliers, reducing future share and margin.",
        "dalio_2": "Revenue and FCF compound, but the market capitalizes them at a materially lower multiple as growth normalizes.",
        "dalio_3": "VMware cash generation meets plan while debt, integration choices and capital allocation absorb more of the owner benefit.",
        "demand_proof": "PASS",
        "owner_economics": "PASS",
        "balance_sheet": "WATCH",
        "concentration": "WATCH",
        "valuation": "WATCH",
        "regime": "REAL DEMAND / HIGH EXPECTATIONS",
        "status": "WATCH-CAPPED",
        "action": "WATCH — replace the Q2 snapshot with Q3 evidence; require customer concentration, debt/SBC-adjusted per-share FCF and reverse-valuation proof before promotion.",
        "next_evidence": "10-Q, Q4 customer concentration, VMware retention and debt/share-count bridge"
      },
      {
        "scope": "EXTERNAL-CANDIDATE",
        "company": "Celestica",
        "ticker": "CLS",
        "chain_node": "AI compute systems, networking platforms and manufacturing",
        "evidence_date": "2026-07-27",
        "pit_price": 277.77,
        "pit_timestamp": "2026-09-02 23:59 UTC",
        "trailing_pe_snapshot": 28.93,
        "t1_facts": "Q2 revenue was $4.70bn, up 62% YoY. GAAP operating margin was 9.8%, adjusted operating margin 8.2%, GAAP EPS $3.17 and adjusted EPS $2.54. Management raised 2026 revenue guidance to $20.5bn, adjusted EPS to $11.30 and FCF to $600m, and said 2027 revenue growth should exceed the expected 65% rate in 2026.",
        "market_observation": "User-supplied snapshot: approximately flat YTD and 38% below the peak. Retained as T3 context pending independent daily-price reconciliation.",
        "t1_url": "https://corporate.celestica.com/news-releases/news-release-details/celestica-announces-second-quarter-2026-financial-results",
        "price_url": "https://www.nasdaq.com/market-activity/stocks/cls",
        "pass_1_business": "Program qualification, supply-chain execution and platform engineering are translating AI infrastructure demand into exceptional growth. Margins are far below semiconductor economics, so volume growth must be tested against working capital, capex and customer bargaining power.",
        "pass_2_causal": "Hyperscaler programs and faster networking generations drive units and content; mix and execution lift margin; inventory, customer-funded components and capex determine how much accounting profit becomes per-share FCF.",
        "pass_3_red_team": "Stress customer and program concentration, a delayed platform ramp, components normalizing, customer liability disputes, margin compression, inventory reversals and the possibility that 2027 guidance represents peak visibility.",
        "contradiction": "GAAP EPS exceeded adjusted EPS and the company raised every major guide, yet the stock remains well below its peak. The lower headline multiple is attractive only if concentration-adjusted FCF scales with revenue.",
        "dalio_1": "AI systems demand grows as expected, but customers retain the economics through lower manufacturing prices.",
        "dalio_2": "2027 revenue accelerates while inventory and capacity absorb cash faster than margins improve.",
        "dalio_3": "Programs launch on time, but mix shifts toward lower-return assemblies and the earnings multiple contracts.",
        "demand_proof": "PASS",
        "owner_economics": "WATCH",
        "balance_sheet": "PASS",
        "concentration": "WATCH",
        "valuation": "WATCH",
        "regime": "REAL DEMAND / LOWER RELATIVE BURDEN",
        "status": "WATCH-CAPPED",
        "action": "PRIORITY RESEARCH — add to the next zero-based queue; reconcile customer concentration, program-level margin, inventory/capex and normalized FCF before any decision.",
        "next_evidence": "Q3 2026 filing, top-customer exposure, inventory and capex-to-revenue bridge"
      },
      {
        "scope": "EXTERNAL-CANDIDATE",
        "company": "Credo Technology",
        "ticker": "CRDO",
        "chain_node": "Active electrical cables, optical DSPs and high-speed connectivity",
        "evidence_date": "2026-09-01",
        "pit_price": 165.22,
        "pit_timestamp": "2026-09-03 00:15 UTC",
        "trailing_pe_snapshot": 90.78,
        "t1_facts": "Fiscal Q1 revenue was $479.0m, up 114.7% YoY and 9.6% QoQ. GAAP gross margin was 64.5%, GAAP net income $129.4m and cash plus short-term investments $764.3m. Non-GAAP net income was $236.3m after $88.0m of SBC and other adjustments. Q2 revenue guidance is $525m-$535m.",
        "market_observation": "User-supplied snapshot: approximately 30% decline over two trading days despite seven consecutive quarters of triple-digit growth. The seven-quarter streak is secondary context; the current quarter's 114.7% growth is T1-verified.",
        "t1_url": "https://investors.credosemi.com/news-events/news/news-details/2026/Credo-Technology-Group-Holding-Ltd-Reports-First-Quarter-of-Fiscal-Year-2027-Financial-Results/",
        "price_url": "https://www.nasdaq.com/market-activity/stocks/crdo",
        "pass_1_business": "Credo has scarce high-speed connectivity IP, exceptional gross margins and genuine AI scale. The owner bridge is weakened by SBC equal to roughly 18% of quarterly revenue and a diluted share count materially above the prior-year level.",
        "pass_2_causal": "Bandwidth growth raises AEC, DSP and retimer content; product mix drives gross margin; R&D, SBC, acquisitions and share count determine whether the revenue curve compounds per-share value.",
        "pass_3_red_team": "Stress cable growth deceleration, optical mix below expectations, customer concentration, competitive integration, 67%-69% non-GAAP gross-margin guidance, dilution and a valuation near 91x trailing earnings after the selloff.",
        "contradiction": "The company beat and guided above consensus, but gross-margin and product-mix concerns still mattered because the prior valuation demanded continuing upside surprises. The selloff reduces price, not necessarily expectations enough.",
        "dalio_1": "AI connectivity demand doubles while product mix shifts to lower incremental margin.",
        "dalio_2": "Revenue guidance is achieved but a major customer dual-sources, lowering the terminal growth assumption.",
        "dalio_3": "GAAP profit grows strongly while SBC and dilution prevent equivalent growth in owner value per share.",
        "demand_proof": "PASS",
        "owner_economics": "WATCH",
        "balance_sheet": "PASS",
        "concentration": "FAIL",
        "valuation": "FAIL",
        "regime": "REAL DEMAND / EXTREME EXPECTATIONS",
        "status": "BLOCKED - FAIL",
        "action": "WAIT — require customer concentration, SBC-adjusted per-share owner earnings and an entry valuation resilient to growth deceleration.",
        "next_evidence": "10-Q customer concentration, cash-flow statement and diluted-share roll-forward"
      },
      {
        "scope": "EXTERNAL-CANDIDATE",
        "company": "Arm Holdings",
        "ticker": "ARM",
        "chain_node": "CPU architecture, royalties and emerging data-center compute products",
        "evidence_date": "2026-07-29",
        "pit_price": 234.86,
        "pit_timestamp": "2026-09-03 00:15 UTC",
        "trailing_pe_snapshot": null,
        "t1_facts": "Fiscal Q1 revenue was a record $1.289bn, up 22% YoY; royalty revenue was $715m and licensing revenue $574m. GAAP net income was $270m and non-GAAP EPS $0.45. Data-center royalties more than doubled, and disclosed demand for the Arm AGI CPU exceeded $2bn across fiscal 2027 and 2028.",
        "market_observation": "User-supplied snapshot: approximately 49% below the peak. Retained as T3 context pending independent historical-price reconciliation.",
        "t1_url": "https://investors.arm.com/news-releases/news-release-details/arm-holdings-plc-reports-results-first-quarter-financial-year-1",
        "price_url": "https://www.nasdaq.com/market-activity/stocks/arm",
        "pass_1_business": "Arm owns a powerful architecture and royalty ecosystem with rising data-center relevance. Moving toward manufactured compute products can enlarge the opportunity but also changes the asset-light economics and partner relationships.",
        "pass_2_causal": "More Arm-based chips and higher royalty rates drive high-margin revenue; new AGI CPUs add product revenue but require capacity and execution; SoftBank control and share structure determine minority-owner outcomes.",
        "pass_3_red_team": "Stress smartphone weakness, royalty-rate resistance, RISC-V, customer architectural bargaining power, foundry capacity, product-channel conflict, SoftBank-related governance and an implied equity value near fifty times recent annual revenue.",
        "contradiction": "A 49% drawdown can coexist with an expectations burden that remains extraordinary relative to current revenue and earnings. The business may be excellent while the security remains unprotected.",
        "dalio_1": "Data-center royalties double again, but the market assigns a lower multiple as growth broadens from a small base.",
        "dalio_2": "The AGI CPU wins demand while manufacturing capacity and channel conflict reduce returns versus pure licensing.",
        "dalio_3": "Arm architecture gains share, but customers negotiate economics and RISC-V caps terminal royalty assumptions.",
        "demand_proof": "PASS",
        "owner_economics": "WATCH",
        "balance_sheet": "PASS",
        "concentration": "WATCH",
        "valuation": "FAIL",
        "regime": "REAL DEMAND / EXTREME EXPECTATIONS",
        "status": "BLOCKED - FAIL",
        "action": "WAIT FOR PRICE/PROOF — require a licensing-versus-product owner-earnings bridge, governance review and conservative reverse valuation.",
        "next_evidence": "Shareholder letter, AGI CPU economics, manufacturing commitments and SoftBank governance"
      },
      {
        "scope": "EXTERNAL-CANDIDATE",
        "company": "Coherent",
        "ticker": "COHR",
        "chain_node": "Optical transceivers, lasers and photonic components",
        "evidence_date": "2026-08-12",
        "pit_price": 268.64,
        "pit_timestamp": "2026-09-02 23:55 UTC",
        "trailing_pe_snapshot": 127.32,
        "t1_facts": "Fiscal Q4 revenue was $2.05bn, up 34% YoY and 42% on a pro-forma basis. GAAP gross margin was 38.5%, non-GAAP gross margin 40.2%, GAAP EPS $1.19 and non-GAAP EPS $1.74. Management cited exceptional AI-data-center demand and ongoing manufacturing-capacity expansion.",
        "market_observation": "User-supplied snapshot: approximately 39% below the peak. Retained as T3 context pending independent historical-price reconciliation.",
        "t1_url": "https://www.coherent.com/news/press-releases/fourth-quarter-and-fiscal-year-2026-results",
        "price_url": "https://www.nasdaq.com/market-activity/stocks/cohr",
        "pass_1_business": "Broad photonics IP and manufacturing scale are strategically important as data centers migrate from copper to optics. The acquisition-heavy balance sheet, capacity spending and GAAP/non-GAAP spread require a cleaner owner-earnings reconstruction.",
        "pass_2_causal": "Optical content per accelerator cluster drives revenue; yields, utilization and mix drive margin; capacity capex, interest, amortization and working capital determine cash available per diluted share.",
        "pass_3_red_team": "Stress 800G/1.6T pricing, customer qualification shifts, Chinese supply, capacity arriving after the peak, debt, acquisition accounting and a trailing GAAP multiple above 120x.",
        "contradiction": "Record growth and margin expansion coexist with a large drawdown because the market is discounting execution, financing and duration. That is healthy skepticism, but the remaining multiple still supplies little demonstrated protection.",
        "dalio_1": "Optical demand accelerates while industry capacity expands faster and compresses price.",
        "dalio_2": "New capacity fills, but yield and working-capital costs delay owner FCF.",
        "dalio_3": "The copper-to-optics thesis proves correct while the equity multiple normalizes before debt falls.",
        "demand_proof": "PASS",
        "owner_economics": "WATCH",
        "balance_sheet": "WATCH",
        "concentration": "WATCH",
        "valuation": "FAIL",
        "regime": "REAL DEMAND / HIGH EXPECTATIONS",
        "status": "BLOCKED - FAIL",
        "action": "WAIT — reconstruct GAAP owner earnings, net debt, capacity returns and customer concentration before treating the drawdown as value.",
        "next_evidence": "10-K cash flow, net debt, capacity commitments and top-customer exposure"
      },
      {
        "scope": "CORE-100",
        "company": "Marvell Technology",
        "ticker": "MRVL",
        "chain_node": "Custom silicon, electro-optics and data-center connectivity",
        "evidence_date": "2026-08-27",
        "pit_price": 206.48,
        "pit_timestamp": "2026-09-03 00:15 UTC",
        "trailing_pe_snapshot": 68.37,
        "t1_facts": "Fiscal Q2 revenue was $2.739bn, up 37% YoY; Data Center grew 46%. GAAP gross margin was 53.1%, GAAP EPS $0.33, non-GAAP EPS $0.94 and operating cash flow $605.5m. Q3 revenue guidance is $3.15bn ±5%; diluted weighted-average shares are expected to be 921m.",
        "market_observation": "User-supplied snapshot: approximately 36% below the peak. Retained as T3 context pending independent historical-price reconciliation.",
        "t1_url": "https://investor.marvell.com/news-events/press-releases/detail/1031/marvell-technology-inc-reports-second-quarter-of-fiscal-year-2027-financial-results",
        "price_url": "https://www.nasdaq.com/market-activity/stocks/mrvl",
        "pass_1_business": "Custom silicon and connectivity are exposed to durable AI complexity, but current GAAP earnings remain far below non-GAAP earnings and customer programs are concentrated.",
        "pass_2_causal": "Design wins and optical attach drive revenue; gross profit funds heavy R&D; acquisition amortization, SBC, preferred capital and share count determine per-share cash power.",
        "pass_3_red_team": "Stress a delayed custom ramp, Google or another hyperscaler reallocating designs, optical share loss, export restrictions, 921m diluted shares and a multiple around 68x trailing earnings.",
        "contradiction": "Raised multi-year guidance and robust bookings are credible, but a 36% drawdown does not reconcile the nearly threefold Q2 gap between GAAP and non-GAAP income.",
        "dalio_1": "AI infrastructure grows but customers internalize more design and compress Marvell economics.",
        "dalio_2": "Design wins remain intact while deployment timing slips after R&D and supply commitments are incurred.",
        "dalio_3": "Marvell grows exactly as forecast, but dilution and multiple compression overwhelm the fundamental success.",
        "demand_proof": "PASS",
        "owner_economics": "WATCH",
        "balance_sheet": "WATCH",
        "concentration": "FAIL",
        "valuation": "FAIL",
        "regime": "REAL DEMAND / HIGH EXPECTATIONS",
        "status": "BLOCKED - FAIL",
        "action": "WAIT — preserve the existing block until GAAP/SBC-adjusted owner earnings, customer-program concentration and dilution are reconciled.",
        "next_evidence": "Q3 ramp, October investor day, customer concentration and share-count bridge"
      },
      {
        "scope": "CORE-100",
        "company": "Vertiv",
        "ticker": "VRT",
        "chain_node": "Data-center power, thermal management and service",
        "evidence_date": "2026-07-29",
        "pit_price": 256.7,
        "pit_timestamp": "2026-09-02 23:45 UTC",
        "trailing_pe_snapshot": 58.08,
        "t1_facts": "Q2 sales were $3.274bn, up 24% including 18% organic growth. Adjusted operating margin was 22.6%, up 410bp. Operating cash flow was $1.100bn and adjusted FCF $925m. Management raised 2026 guidance to $14.0bn sales at the midpoint, 31% organic growth and adjusted EPS of $6.65-$6.75.",
        "market_observation": "User-supplied snapshot: approximately 33% below the peak. Retained as T3 context pending independent historical-price reconciliation.",
        "t1_url": "https://investors.vertiv.com/news/news-details/2026/Vertiv-Reports-Strong-Second-Quarter-2026-with-Diluted-EPS-Growth-of-53-Adjusted-Diluted-EPS-Growth-of-60-Raises-Full-Year-2026-Guidance-Across-All-Key-Metrics/default.aspx",
        "price_url": "https://www.nyse.com/quote/XNYS:VRT",
        "pass_1_business": "Power and thermal content, engineering integration and service relationships are benefiting from genuine AI scarcity. Exceptional price-cost and working-capital execution should not be extrapolated without a full-cycle test.",
        "pass_2_causal": "AI capacity and rack density drive orders and content; price-cost and productivity expand margin; capacity capex, working capital and service attach determine normalized FCF.",
        "pass_3_red_team": "Stress hyperscaler timing, permits and power, new cooling architectures, aggressive industry capacity, order cancellation, acquisitions and a valuation near 58x trailing earnings.",
        "contradiction": "The business is delivering both growth and cash, yet the security still fails the existing price and cycle gates. The drawdown is compatible with an excellent company whose scarcity multiple remains elevated.",
        "dalio_1": "AI deployments grow while alternative cooling architectures lower Vertiv content per rack.",
        "dalio_2": "Backlog converts, but capacity catches demand and price-cost benefits reverse.",
        "dalio_3": "Execution remains excellent while financing and permitting move customer projects beyond the valuation horizon.",
        "demand_proof": "PASS",
        "owner_economics": "PASS",
        "balance_sheet": "PASS",
        "concentration": "WATCH",
        "valuation": "FAIL",
        "regime": "REAL DEMAND / HIGH EXPECTATIONS",
        "status": "BLOCKED - FAIL",
        "action": "WAIT FOR PRICE — preserve the existing block; require normalized backlog conversion, full-cycle margins and service-moat evidence.",
        "next_evidence": "Q3 backlog conversion, order cancellations, capex and acquisition-adjusted FCF"
      },
      {
        "scope": "EXTERNAL-CANDIDATE",
        "company": "Nebius Group",
        "ticker": "NBIS",
        "chain_node": "AI cloud, GPU capacity and data-center development",
        "evidence_date": "2026-08-12",
        "pit_price": 204.09,
        "pit_timestamp": "2026-09-03 00:15 UTC",
        "trailing_pe_snapshot": null,
        "t1_facts": "Q2 revenue was $582.3m, up 454% YoY; adjusted EBITDA was $236.2m, but the GAAP operating loss was $175.9m and adjusted net loss $33.2m. Q2 SBC was $102.5m. At June 30 cash was $8.042bn, property and equipment $13.045bn, current debt $46.7m and non-current debt $8.499bn.",
        "market_observation": "User-supplied snapshot: approximately 32% below the peak. Retained as T3 context pending independent historical-price reconciliation.",
        "t1_url": "https://nebius.com/newsroom/nebius-reports-second-quarter-2026-financial-results",
        "price_url": "https://www.nasdaq.com/market-activity/stocks/nbis",
        "pass_1_business": "Demand, contract activity and adjusted EBITDA inflection are substantial, but Nebius is fundamentally a capital-financing and utilization underwriting rather than a simple revenue-growth story.",
        "pass_2_causal": "Financed GPU and power capacity creates contracted revenue; utilization and pricing create EBITDA; depreciation, interest, SBC, customer prepayments and replacement capex determine true owner returns.",
        "pass_3_red_team": "Stress customer concentration, circular vendor financing, GPU obsolescence, utilization, power delays, $8.5bn debt, large SBC, negative GAAP operating profit and refinancing before assets earn their cost of capital.",
        "contradiction": "Revenue rose 454% and adjusted EBITDA turned positive, while depreciation, SBC, interest and ongoing capacity commitments still produced an operating loss. Demand proof is not yet owner-return proof.",
        "dalio_1": "Every contracted GPU is deployed, but new hardware generations shorten useful lives and raise replacement capital.",
        "dalio_2": "Customers prepay and demand remains strong while capacity economics are competed down by hyperscalers and neocloud peers.",
        "dalio_3": "Revenue and adjusted EBITDA meet plan, but debt, depreciation, SBC and dilution consume the per-share outcome.",
        "demand_proof": "PASS",
        "owner_economics": "FAIL",
        "balance_sheet": "FAIL",
        "concentration": "FAIL",
        "valuation": "FAIL",
        "regime": "REAL DEMAND / CAPITAL-CYCLE RISK",
        "status": "BLOCKED - FAIL",
        "action": "WAIT — require a contract-by-contract ROIC, customer-prepayment waterfall, GPU replacement capex and fully diluted financing bridge.",
        "next_evidence": "Contract concentration, capex commitments, depreciation lives, prepayments and diluted capital structure"
      }
    ],
    "source_notes": {
      "t1": "Company releases and filings are authoritative for reported operating facts.",
      "market": "PIT prices and trailing P/E snapshots are market-feed observations at the stated timestamps.",
      "t3": "The user's YTD and peak-drawdown figures are retained as a market-observation hypothesis, explicitly excluded from valuation until independently reconciled.",
      "decision": "No security is upgraded solely because price is below a prior high or because revenue exceeded expectations."
    }
  },
  "layers": {
    "DALIO_TEST_V1026": {
      "INTU": {
        "diagnosis": "Core workflow cash compounding remains durable and the current valuation offers protection.",
        "policy": "A recession, rate shock or tax-policy intervention can change SMB demand, discount rates and the economics of paid tax preparation even if the operating diagnosis is correct.",
        "paths": [
          [
            "Policy offset",
            "The thesis is right on QBO durability, but a free/AI-enabled tax channel weakens TurboTax pricing and the blended multiple compresses."
          ],
          [
            "Timing / liquidity",
            "Intrinsic value compounds, but restrictive rates and an SMB credit shock keep the stock below the entry price beyond the thesis clock."
          ],
          [
            "Position construction",
            "The company performs, but correlated software/SMB exposure and excessive sizing create a portfolio loss during a duration sell-off."
          ]
        ],
        "survival": "Keep sizing inside 3–6%; require QBO/GBS, owner-cash/share and tax-policy checkpoints; no leverage; re-underwrite at each material policy event."
      },
      "NVDA": {
        "diagnosis": "AI compute demand and NVIDIA platform economics remain exceptionally strong.",
        "policy": "Export controls, power constraints, sovereign policy, customer financing and hyperscaler capital allocation can redirect who captures the value and when.",
        "paths": [
          [
            "Policy intervention",
            "AI demand is real, but tighter export controls permanently remove deliverable TAM and trigger supply-chain or customer concentration losses."
          ],
          [
            "Second-order response",
            "Customers achieve AI adoption yet respond by accelerating custom silicon, bargaining harder and shifting inference mix, compressing NVIDIA margins."
          ],
          [
            "Correct but too early",
            "The long-run platform wins, but capex pauses after overbuilding; the stock de-rates before normalized demand catches up."
          ]
        ],
        "survival": "Cap at 1–3% at current protection; treat export/TAM, customer ROI, hyperscaler capex and gross margin as separate hard sensors; do not finance the position with leverage."
      },
      "FIS": {
        "diagnosis": "Recurring infrastructure cash flow can support materially higher equity value if it reaches shareholders through deleveraging.",
        "policy": "Credit conditions, refinancing markets, bank regulation and management capital allocation determine whether reported FCF actually accrues to equity.",
        "paths": [
          [
            "Creditor capture",
            "FCF is real, but higher refinancing costs and debt service transfer most of the benefit to creditors instead of shareholders."
          ],
          [
            "Management response",
            "Operations stabilize, yet management resumes debt-funded M&A or buybacks before repair, recreating the balance-sheet risk."
          ],
          [
            "Macro transmission",
            "The banks remain dependent on FIS, but a bank IT/credit downturn slows growth and keeps the equity multiple depressed while leverage stays high."
          ]
        ],
        "survival": "No BUY promotion until debt falls in reported accounts and FCF reconciles to equity cash; zero new capital on valuation alone; immediate review after refinancing or M&A."
      },
      "CRM": {
        "diagnosis": "The installed workflow base, cRPO and cash generation remain durable while AI can expand usage.",
        "policy": "Enterprise budgets, antitrust/data rules, debt markets and customer responses to AI can alter seat economics and capital allocation even if adoption rises.",
        "paths": [
          [
            "Cannibalization",
            "AI adoption succeeds but replaces paid seats faster than usage revenue grows, so the technology thesis is right while owner economics weaken."
          ],
          [
            "Capital-allocation offset",
            "Organic cash flow improves, but acquisition debt, SBC and repurchases consume the per-share benefit."
          ],
          [
            "Market reaction",
            "cRPO holds, yet higher yields and acquisition-adjusted growth lead to a prolonged multiple reset below the purchase price."
          ]
        ],
        "survival": "Require organic paid AI usage, FCF/share after SBC and stable/falling debt; separate acquired growth and investment gains; size for software-duration correlation."
      }
    },
    "BRIDGEWATER_DEFAULT_V1026": {
      "status": "ACTIVE DEFAULT — SHADOW GOVERNANCE",
      "scope": "Every company, sector, macro event, valuation update and new recommendation",
      "rules": [
        "Start from cash flows, balance sheets and explicit cause→effect links; narrative alone is not evidence.",
        "Separate what will happen in the economy from what is already discounted in asset prices.",
        "Map the policy reaction function: rates, liquidity, fiscal support, regulation, guarantees, capital controls and industrial policy.",
        "For every central diagnosis, construct at least three paths where the diagnosis is right but the investment loses.",
        "Classify the relevant growth/inflation/liquidity/debt/geopolitical regime and test transitions, not only the current state.",
        "Trace who finances demand, who owns the liabilities, who absorbs losses and whether value reaches equity holders.",
        "Model second-order responses by governments, competitors, customers, creditors and other investors.",
        "Run timing, liquidity, leverage and position-survival tests before converting conviction into position size.",
        "Use historical analogues as priors, then state precisely what is structurally different in the current case.",
        "Record unknowns and disconfirming evidence; a source may lower confidence or block action but never create automatic conviction."
      ],
      "sources": [
        [
          "Official 50-year BDO archive",
          "https://www.bridgewater.com/50-years-of-the-bridgewater-daily-observations",
          "Primary index and selected original reports, 1978–2024"
        ],
        [
          "Long-term debt cycle / American empire (1986)",
          "https://www.bridgewater.com/_document/why-the-economy-is-unresponsive-to-stimulation-or-the-decline-of-the-american-empire?id=0000019a-35a1-db42-a3be-f5a1a3200000",
          "Debt, productivity and sustainable growth"
        ],
        [
          "Bubble or Boom? (2000)",
          "https://www.bridgewater.com/_document/bubble-or-boom?id=0000019a-35a7-da13-afbe-77e77bcb0000",
          "Cash-flow causality and what prices discount"
        ],
        [
          "What a Bubble Looks Like (2005)",
          "https://www.bridgewater.com/_document/what-a-bubble-looks-like?id=0000019a-35b7-da13-afbe-77f7873b0000",
          "Debt, inventory and extrapolation diagnostics"
        ],
        [
          "Not Just a Normal Recession (2008)",
          "https://www.bridgewater.com/_document/the-really-big-picture-not-just-a-normal-recession?id=0000019a-35be-db42-a3be-f5bf27140000",
          "Deleveraging and depression mechanics"
        ],
        [
          "We Agree! (2009)",
          "https://www.bridgewater.com/_document/we-agree?id=0000019a-35c1-db42-a3be-f5e1c45f0000",
          "Bank stress tests and policy-loss allocation"
        ],
        [
          "Gold Is a Currency (2010)",
          "https://www.bridgewater.com/_document/gold-is-a-currency?id=0000019a-35c5-da13-afbe-77c77afd0000",
          "Currency and strategic diversification"
        ],
        [
          "Monetary Policy 3 (2016)",
          "https://www.bridgewater.com/_document/what-monetary-policy-3-mp3-will-look-like?id=0000019a-35c7-db42-a3be-f5e7f4630000",
          "Coordinated monetary/fiscal response"
        ],
        [
          "Corrections vs Bear Markets (2018)",
          "https://www.bridgewater.com/_document/distinguishing-equity-market-corrections-from-bear-markets?id=0000019a-35cb-da13-afbe-77cbe4390000",
          "Different causes imply different outcomes"
        ],
        [
          "Demand Shock, Not Supply Shock (2021)",
          "https://www.bridgewater.com/its-mostly-a-demand-shock-not-a-supply-shock-and-its-everywhere",
          "Policy-created demand and persistent inflation"
        ],
        [
          "AI Bubble (2024)",
          "https://www.bridgewater.com/research-and-insights/is-an-ai-bubble-ahead-of-us-or-behind-us",
          "Technology truth versus financing/market bubble"
        ],
        [
          "Modern Mercantilism (2024)",
          "https://www.bridgewater.com/research-and-insights/were-all-mercantilists-now",
          "Policy, trade and geopolitical regime change"
        ],
        [
          "Principles for Navigating Big Debt Crises",
          "https://www.principles.com/big-debt-crises",
          "Public framework; full PDF offered by the author via registration"
        ]
      ]
    },
    "SOURCE_PROTOCOL_V1026": {
      "status": "ACTIVE DEFAULT — FAIL CLOSED",
      "hierarchy": [
        [
          "T1",
          "Primary filing / regulator / audited statement",
          "Can establish a material fact and change a gate after date/context verification."
        ],
        [
          "T2",
          "Official government / central bank / multilateral data",
          "Can establish macro, policy, trade, credit and industry facts."
        ],
        [
          "T3",
          "Direct industry / exchange / contract / scientific source",
          "Can establish sector mechanics when methodology and coverage are known."
        ],
        [
          "T4",
          "Professional research with transparent method",
          "Can support interpretation; material claims require T1–T3 confirmation."
        ],
        [
          "T5",
          "Quality media / attributed interview",
          "Can trigger review; cannot independently change valuation or recommendation."
        ],
        [
          "T6",
          "Social media / anonymous / promotional content",
          "Discovery only; zero decision authority until independently verified."
        ]
      ],
      "scoring": {
        "authority": 30,
        "recency": 20,
        "independence": 15,
        "methodTransparency": 15,
        "directRelevance": 15,
        "conflictPenalty": -15,
        "revisionRiskPenalty": -10
      },
      "gates": [
        "A material decision claim requires at least one T1/T2 source, or two independent T3 sources when no primary source exists.",
        "BUY, SELL, hard-gate change or >10% intrinsic-value change is blocked when the critical evidence score is below 70/100.",
        "T5/T6 information may create an event ticket but never alter the official decision before verification.",
        "Publication time, period covered, revision status, currency, units and source URL must be stored with every critical fact.",
        "Correlated repetition is one source, not many: copied articles, syndicated estimates and the same upstream dataset receive one independence count.",
        "Conflicting primary evidence forces REVIEW/UNKNOWN until reconciled; the engine may reduce confidence but cannot average contradictions away.",
        "A stale critical source blocks an upgrade. Freshness thresholds are company- and variable-specific, not one universal number."
      ],
      "globalSources": [
        [
          "Company filings / XBRL",
          "https://www.sec.gov/search-filings/edgar-application-programming-interfaces",
          "T1",
          "Real-time 10-K/10-Q/8-K/20-F/6-K and comparable facts"
        ],
        [
          "Federal Reserve / FRED",
          "https://fred.stlouisfed.org/",
          "T2",
          "Rates, credit, money, labor, inflation and financial conditions"
        ],
        [
          "New York Fed data",
          "https://www.newyorkfed.org/markets/data-hub",
          "T2",
          "Funding, repo, dealer data, household credit and market plumbing"
        ],
        [
          "OFR Financial Stress Index",
          "https://www.financialresearch.gov/financial-stress-index/",
          "T2",
          "Daily systemic stress across credit, funding, valuation and volatility"
        ],
        [
          "BIS Data Portal",
          "https://data.bis.org/",
          "T2",
          "Global credit, banking, debt service, FX and liquidity"
        ],
        [
          "IMF Data",
          "https://data.imf.org/",
          "T2",
          "Balance of payments, reserves, fiscal, trade and financial soundness"
        ],
        [
          "World Bank Data",
          "https://data.worldbank.org/",
          "T2",
          "Cross-country structural and development indicators"
        ],
        [
          "US Treasury TIC",
          "https://home.treasury.gov/data/treasury-international-capital-tic-system",
          "T2",
          "Cross-border holdings and capital flows"
        ],
        [
          "UN Comtrade",
          "https://comtradeplus.un.org/",
          "T2",
          "Product-level bilateral trade flows"
        ],
        [
          "WTO data",
          "https://data.wto.org/",
          "T2",
          "Trade, tariffs and policy restrictions"
        ],
        [
          "NY Fed GSCPI",
          "https://www.newyorkfed.org/research/policy/gscpi",
          "T2",
          "Global supply-chain pressure"
        ],
        [
          "CFTC Commitments of Traders",
          "https://www.cftc.gov/MarketReports/CommitmentsofTraders/index.htm",
          "T2",
          "Futures positioning; context only, not a valuation signal"
        ]
      ],
      "sectorRoutes": {
        "Software / Financial Technology": [
          [
            "SEC / company IR",
            "T1",
            "Filings, cRPO/ARR, SBC, debt and capital allocation"
          ],
          [
            "Federal Reserve / NY Fed",
            "T2",
            "SMB, credit, rates, payments and funding"
          ],
          [
            "Antitrust / tax regulators",
            "T1/T2",
            "Policy changes affecting workflows and pricing"
          ]
        ],
        "AI & Semiconductors": [
          [
            "SEC / company IR",
            "T1",
            "Revenue, margins, customer concentration and capex"
          ],
          [
            "US BIS export controls / CHIPS awards",
            "T2",
            "Deliverable TAM, subsidies and restrictions"
          ],
          [
            "Hyperscaler filings",
            "T1",
            "Customer capex, depreciation and AI monetization"
          ],
          [
            "EIA / grid operators",
            "T2/T3",
            "Power availability and data-center constraint"
          ]
        ],
        "Banks & Payments Infrastructure": [
          [
            "SEC / prudential regulator",
            "T1",
            "Capital, liquidity, deposits, credit and leverage"
          ],
          [
            "Fed stress tests / call reports",
            "T2",
            "Loss absorption and asset quality"
          ],
          [
            "OFR / BIS / IMF",
            "T2",
            "Funding and systemic transmission"
          ]
        ],
        "Energy": [
          [
            "EIA Open Data",
            "T2",
            "Production, inventories, demand, power and flows"
          ],
          [
            "IEA / OPEC",
            "T2/T3",
            "Global balances and forecasts"
          ],
          [
            "FERC / grid operators",
            "T2/T3",
            "Power, pipelines, interconnection and constraints"
          ],
          [
            "CFTC",
            "T2",
            "Positioning and crowding context"
          ]
        ],
        "Shipping": [
          [
            "Company filings / exchange notices",
            "T1",
            "Fleet, debt, charters and cash break-even"
          ],
          [
            "AIS / port authorities",
            "T3",
            "Utilization, congestion and route changes"
          ],
          [
            "Baltic Exchange / orderbook data",
            "T3",
            "Rates, vessel supply and cycle"
          ],
          [
            "UN Comtrade / customs",
            "T2",
            "Underlying cargo demand"
          ]
        ],
        "Quantum Computing": [
          [
            "Company filings / contracts",
            "T1",
            "Bookings, cash runway and customer proof"
          ],
          [
            "NIST / DOE / DARPA",
            "T2",
            "Benchmarks, grants and program milestones"
          ],
          [
            "Peer-reviewed papers",
            "T3",
            "Reproducible technical evidence"
          ],
          [
            "USPTO / EPO",
            "T2/T3",
            "Patent scope and competitive landscape"
          ]
        ],
        "Healthcare": [
          [
            "FDA / EMA",
            "T1/T2",
            "Approvals, safety and regulatory events"
          ],
          [
            "ClinicalTrials.gov",
            "T2",
            "Trial design, status and endpoints"
          ],
          [
            "Company filings",
            "T1",
            "Asset economics, cash runway and concentration"
          ],
          [
            "CMS / payers",
            "T2/T3",
            "Reimbursement and access"
          ]
        ]
      },
      "companyRoute": {
        "INTU": "Software / Financial Technology",
        "CRM": "Software / Financial Technology",
        "NVDA": "AI & Semiconductors",
        "FIS": "Banks & Payments Infrastructure"
      }
    },
    "CORPUS_REVIEW_V1026": {
      "status": "CORE THREE-PASS REVIEW COMPLETE",
      "asOf": "2026-09-02",
      "coverage": {
        "bridgewater": "11/11 official public selections",
        "global": "11 canonical T2 feeds mapped",
        "company": "T1 primary layer active"
      },
      "conclusions": [
        "Decompose demand by financing source, not headline growth.",
        "Forecast economy, intrinsic value, market reaction and portfolio result separately.",
        "Map debt ownership, loss allocation and policy response before acting.",
        "Reconcile earnings to working capital, capex and debt-funded expansion.",
        "Classify drawdowns by liquidity-to-earnings transmission, not price threshold alone.",
        "Separate technology progress from customer ROI, profit-pool durability and discounted expectations.",
        "Route tariffs, export controls, subsidies and industrial policy into company-specific cash-flow maps."
      ],
      "redTeam": [
        "Historical selections receive no accuracy credit.",
        "Historical facts are not current facts; refresh from T1/T2 sources.",
        "Macro aggregates cannot select company winners.",
        "Unknown policy response or loss allocation caps conviction and sizing."
      ],
      "artifacts": [
        "ARGUS_Canonical_Corpus_Manifest_V10_26.json",
        "ARGUS_Three_Pass_Review_Ledger_V10_26.json"
      ]
    },
    "BUFFETT_MUNGER_V1027": {
      "status": "ACTIVE SHADOW — OWNER TEST",
      "sources": [
        [
          "Berkshire Owner’s Manual",
          "https://www.berkshirehathaway.com/owners.html"
        ],
        [
          "Berkshire shareholder letters 1977–2024",
          "https://www.berkshirehathaway.com/letters/letters.html"
        ],
        [
          "1986 Owner Earnings",
          "https://www.berkshirehathaway.com/letters/1986.html"
        ],
        [
          "1987 Business Owner Lens",
          "https://www.berkshirehathaway.com/letters/1987.html"
        ],
        [
          "2007 Enduring Moat",
          "https://www.berkshirehathaway.com/letters/2007ltr.pdf"
        ],
        [
          "2011 Productive Assets",
          "https://www.berkshirehathaway.com/letters/2011ltr.pdf"
        ],
        [
          "2024 Mistakes and Correction",
          "https://www.berkshirehathaway.com/letters/2024ltr.pdf"
        ]
      ],
      "rules": [
        "Understand the economic engine well enough to estimate cash that owners can take out over the business life.",
        "Use Owner Earnings: reported profit + valid non-cash charges − maintenance capex − required working capital.",
        "Demand durable returns on incremental tangible capital, not growth purchased with ever more capital.",
        "Require an enduring moat that survives competition, technology and the departure of a superstar manager.",
        "Judge management by integrity, ability, incentives and per-share capital allocation—not charisma or guidance.",
        "Measure progress per share; dilution, SBC and overpriced issuance are real owner costs.",
        "Test every retained dollar: did it create at least one dollar of durable per-share value over a full period?",
        "Use debt sparingly; survival and a good night’s sleep outrank marginal expected return.",
        "Value is a range based on discounted owner cash, not a precise target; price must provide a margin of safety.",
        "Compare every action with the best understood alternative, including cash and doing nothing.",
        "Prefer productive assets with pricing power and low maintenance capital in inflationary conditions.",
        "State mistakes promptly and correct them; delay, narrative defense and thesis drift are governance failures."
      ]
    },
    "UNIVERSE_COVERAGE_V1033": {
      "status": "100-COMPANY FAIL-CLOSED CONTROL · P1 + ALL P2 COMPLETE",
      "asOf": "2026-09-03",
      "companies": 100,
      "sectors": 23,
      "deepReviews": 67,
      "eventReviews": 8,
      "ready": 0,
      "unvalidated": 33,
      "t1Located": 100,
      "artifacts": [
        "ARGUS_Global_Opportunity_Universe_V10_33_AI_Chain_Signal.xlsx",
        "ARGUS_AI_Chain_Signal_V10_33.json",
        "ARGUS_P1_Deep_Research_V10_29.json",
        "ARGUS_P2A_Deep_Research_V10_30.json",
        "ARGUS_P2B_Deep_Research_V10_31.json",
        "ARGUS_P2C_Deep_Research_V10_32.json"
      ],
      "controls": [
        "Every company has all 12 Buffett–Munger gates, a sector-specific evidence route and a critical-sensor list.",
        "All 17 P1 and all 50 P2 companies have a dated current T1 source, a T2 point-in-time route, three-pass review, contradiction log and three Dalio loss paths.",
        "The V10.33 AI-chain layer refreshes three Core-100 names and screens five external candidates without silently changing the 100-company universe.",
        "The event layer proves operating demand separately from security attractiveness; user drawdown claims remain T3 observations until independent price-series reconciliation.",
        "Only 33 P3 companies remain unvalidated. UNKNOWN prevents READY; any FAIL blocks a new BUY and four or more WATCH states cap conviction and sizing. Deep research cannot silently rewrite a frozen decision."
      ]
    },
    "AI_CHAIN_SIGNAL_V1033": {
      "status": "SHADOW EVENT REVIEW · FAIL-CLOSED",
      "asOf": "2026-09-03",
      "regime": "REAL DEMAND / HIGH EXPECTATIONS",
      "reviewed": 8,
      "coreRefreshed": 3,
      "externalCandidates": 5,
      "dalioPaths": 24,
      "ready": 0,
      "watchCapped": 2,
      "blocked": 6,
      "priceCheckedAt": "2026-09-03 11:07 Israel",
      "newTradeObservations": 0,
      "decisionChanges": 0,
      "prices": [
        [
          "AVGO",
          367.24,
          "2026-09-03 00:15 UTC"
        ],
        [
          "CLS",
          277.77,
          "2026-09-02 23:59 UTC"
        ],
        [
          "CRDO",
          165.22,
          "2026-09-03 00:15 UTC"
        ],
        [
          "ARM",
          234.86,
          "2026-09-03 00:15 UTC"
        ],
        [
          "COHR",
          268.64,
          "2026-09-02 23:55 UTC"
        ],
        [
          "MRVL",
          206.48,
          "2026-09-03 00:15 UTC"
        ],
        [
          "VRT",
          256.7,
          "2026-09-02 23:45 UTC"
        ],
        [
          "NBIS",
          204.09,
          "2026-09-03 00:15 UTC"
        ]
      ],
      "rows": [
        [
          "AVGO",
          "Broadcom",
          "CORE-100",
          "WATCH-CAPPED",
          "REAL DEMAND / HIGH EXPECTATIONS",
          "Refresh Q3 evidence; require concentration, debt/SBC-adjusted per-share FCF and reverse-valuation proof."
        ],
        [
          "CLS",
          "Celestica",
          "EXTERNAL-CANDIDATE",
          "WATCH-CAPPED",
          "REAL DEMAND / LOWER RELATIVE BURDEN",
          "Next zero-based research priority: reconcile customer concentration, program margin, inventory/capex and normalized FCF."
        ],
        [
          "CRDO",
          "Credo Technology",
          "EXTERNAL-CANDIDATE",
          "BLOCKED - FAIL",
          "REAL DEMAND / EXTREME EXPECTATIONS",
          "Require concentration, SBC-adjusted owner earnings and a valuation resilient to deceleration."
        ],
        [
          "ARM",
          "Arm Holdings",
          "EXTERNAL-CANDIDATE",
          "BLOCKED - FAIL",
          "REAL DEMAND / EXTREME EXPECTATIONS",
          "Require licensing-versus-product owner earnings, governance and conservative reverse valuation."
        ],
        [
          "COHR",
          "Coherent",
          "EXTERNAL-CANDIDATE",
          "BLOCKED - FAIL",
          "REAL DEMAND / HIGH EXPECTATIONS",
          "Reconstruct GAAP owner earnings, net debt, capacity returns and concentration."
        ],
        [
          "MRVL",
          "Marvell Technology",
          "CORE-100",
          "BLOCKED - FAIL",
          "REAL DEMAND / HIGH EXPECTATIONS",
          "Preserve block until GAAP/SBC-adjusted owner earnings, concentration and dilution reconcile."
        ],
        [
          "VRT",
          "Vertiv",
          "CORE-100",
          "BLOCKED - FAIL",
          "REAL DEMAND / HIGH EXPECTATIONS",
          "Preserve block; require price protection, normalized backlog conversion and full-cycle margins."
        ],
        [
          "NBIS",
          "Nebius Group",
          "EXTERNAL-CANDIDATE",
          "BLOCKED - FAIL",
          "REAL DEMAND / CAPITAL-CYCLE RISK",
          "Require contract ROIC, prepayment waterfall, GPU replacement capex and fully diluted financing bridge."
        ]
      ]
    },
    "P1_DEEP_RESEARCH_V1029": {
      "status": "17/17 COMPLETE · SHADOW FAIL-CLOSED",
      "asOf": "2026-09-02",
      "t1Fresh": 17,
      "dalioPaths": 51,
      "gateCells": 204,
      "blocked": 10,
      "watchCapped": 7,
      "unknownGates": 3,
      "rows": [
        [
          "IONQ",
          "IonQ",
          "BLOCKED - FAIL",
          "WAIT FOR PRICE",
          "Require organic/repeat revenue, verified customer ROI and a post-SkyWater cash bridge."
        ],
        [
          "QBTS",
          "D-Wave Quantum",
          "BLOCKED - FAIL",
          "RESEARCH",
          "Prove backlog conversion, cash collection and recurring enterprise economics."
        ],
        [
          "RGTI",
          "Rigetti Computing",
          "BLOCKED - FAIL",
          "NO ACTION",
          "Require externally reproduced milestones and repaired roadmap credibility."
        ],
        [
          "QUBT",
          "Quantum Computing Inc.",
          "BLOCKED - FAIL",
          "BLOCKED",
          "Reconstruct the post-acquisition business identity and segment economics."
        ],
        [
          "NVDA",
          "NVIDIA",
          "WATCH-CAPPED",
          "WAIT / SMALL ONLY",
          "Track customer AI ROI, capex financing and normalized full-cycle margin."
        ],
        [
          "IFF",
          "International Flavors & Fragrances",
          "WATCH-CAPPED",
          "HOLD / BUY LOWER",
          "Verify divestiture proceeds, continuing owner earnings and per-share allocation."
        ],
        [
          "GIVN.SW",
          "Givaudan",
          "WATCH-CAPPED",
          "WATCH",
          "Require valuation protection and Taste & Wellbeing normalization."
        ],
        [
          "SY1.DE",
          "Symrise",
          "WATCH-CAPPED",
          "WATCH",
          "Refresh cash flow/leverage and confirm repeat organic acceleration."
        ],
        [
          "TRPZ.TA",
          "Torpaz Industries",
          "BLOCKED - FAIL",
          "WAIT FOR PRICE",
          "Prove acquisition-cohort ROIC, leverage and earn-out cash requirements."
        ],
        [
          "FIS",
          "Fidelity National Information Services",
          "BLOCKED - FAIL",
          "PROVE IT",
          "No upgrade until cash generation becomes measurable net-debt reduction."
        ],
        [
          "CB",
          "Chubb",
          "WATCH-CAPPED",
          "MEETING CONTROL",
          "Verify reserves, catastrophe normalization and valuation protection."
        ],
        [
          "INTU",
          "Intuit",
          "WATCH-CAPPED",
          "BUY",
          "Keep frozen BUY only inside its sizing band; monitor AI/tax and per-share cash."
        ],
        [
          "CRM",
          "Salesforce",
          "WATCH-CAPPED",
          "DEEP WATCH",
          "Require organic paid-AI economics and per-share FCF after SBC/debt."
        ],
        [
          "DHT",
          "DHT Holdings",
          "BLOCKED - FAIL",
          "SITUATIONAL ONLY",
          "Update cycle-normalized TCE and NAV; do not extrapolate the dividend."
        ],
        [
          "STNG",
          "Scorpio Tankers",
          "BLOCKED - FAIL",
          "SITUATIONAL ONLY",
          "Reward deleveraging only with normalized NAV/TCE protection."
        ],
        [
          "INSW",
          "International Seaways",
          "BLOCKED - FAIL",
          "SITUATIONAL ONLY",
          "Require segment NAV/TCE and a full fleet replacement-capex test."
        ],
        [
          "FRO",
          "Frontline",
          "BLOCKED - FAIL",
          "SITUATIONAL ONLY",
          "Require governance-adjusted NAV, normalized TCE and fleet funding needs."
        ]
      ]
    },
    "P2A_DEEP_RESEARCH_V1030": {
      "status": "15/50 P2 COMPLETE · SHADOW FAIL-CLOSED",
      "asOf": "2026-09-02",
      "t1Fresh": 15,
      "dalioPaths": 45,
      "gateCells": 180,
      "blocked": 10,
      "watchCapped": 5,
      "unknownGates": 1,
      "capitalGates": 4,
      "rows": [
        [
          "AMD",
          "Advanced Micro Devices",
          "WATCH-CAPPED",
          "WATCH",
          "Require normalized customer AI ROI, durable accelerator share and FCF/share."
        ],
        [
          "TSM",
          "Taiwan Semiconductor Manufacturing",
          "WATCH-CAPPED",
          "WATCH",
          "Require Taiwan-tail price protection and overseas-fab return evidence."
        ],
        [
          "ASML",
          "ASML Holding",
          "BLOCKED - FAIL",
          "WAIT FOR PRICE",
          "Franchise evidence strengthened; entry price still fails."
        ],
        [
          "MU",
          "Micron Technology",
          "BLOCKED - FAIL",
          "WAIT",
          "Normalize HBM pricing, supply response, depreciation and capex."
        ],
        [
          "AVGO",
          "Broadcom",
          "WATCH-CAPPED",
          "WATCH",
          "Verify AI concentration, VMware retention, debt and per-share FCF."
        ],
        [
          "ETN",
          "Eaton",
          "BLOCKED - FAIL",
          "WAIT FOR PRICE",
          "Require valuation protection and backlog cash conversion."
        ],
        [
          "VRT",
          "Vertiv",
          "BLOCKED - FAIL",
          "WAIT FOR PRICE",
          "Require normalized cash, moat durability and price protection."
        ],
        [
          "GEV",
          "GE Vernova",
          "BLOCKED - FAIL",
          "WAIT FOR PRICE",
          "Prove firm-order quality, contract cash margins and stewardship."
        ],
        [
          "FISV",
          "Fiserv",
          "BLOCKED - FAIL",
          "WAIT / VALUE-TRAP RISK",
          "No upgrade until organic growth, margins and clean FCF recover together."
        ],
        [
          "MSFT",
          "Microsoft",
          "WATCH-CAPPED",
          "WATCH",
          "Require a transparent capex-to-owner-cash bridge."
        ],
        [
          "GOOGL",
          "Alphabet",
          "BLOCKED - FAIL",
          "WATCH",
          "Capital gate: reconcile FCF, issuance and compute returns per share."
        ],
        [
          "META",
          "Meta Platforms",
          "BLOCKED - FAIL",
          "WATCH",
          "Capital gate: convert AI capex into durable FCF per share."
        ],
        [
          "AMZN",
          "Amazon",
          "BLOCKED - FAIL",
          "WATCH",
          "Capital gate: restore TTM FCF excluding Anthropic revaluation."
        ],
        [
          "ORCL",
          "Oracle",
          "BLOCKED - FAIL",
          "WATCH — CAPITAL GATE",
          "Prove the RPO-to-FCF funding bridge and infrastructure return."
        ],
        [
          "BRK.B",
          "Berkshire Hathaway",
          "WATCH-CAPPED",
          "WATCH",
          "Require price protection and disciplined Abel-era deployment evidence."
        ]
      ]
    },
    "P2B_DEEP_RESEARCH_V1031": {
      "status": "30/50 P2 COMPLETE · SHADOW FAIL-CLOSED",
      "asOf": "2026-09-02",
      "t1Fresh": 15,
      "dalioPaths": 45,
      "gateCells": 180,
      "blocked": 8,
      "watchCapped": 7,
      "unknownGates": 0,
      "rows": [
        [
          "AMAT",
          "Applied Materials",
          "BLOCKED - FAIL",
          "WAIT FOR PRICE",
          "Normalize WFE/service owner earnings, export loss and EPIC returns."
        ],
        [
          "LRCX",
          "Lam Research",
          "BLOCKED - FAIL",
          "WAIT FOR PRICE",
          "Normalize the guided ramp, China exposure and trough owner earnings."
        ],
        [
          "PWR",
          "Quanta Services",
          "BLOCKED - FAIL",
          "WAIT FOR PRICE",
          "Prove backlog cash margins and acquisition-cohort returns."
        ],
        [
          "HUBB",
          "Hubbell",
          "WATCH-CAPPED",
          "WATCH",
          "Require NSI integration economics, debt path and margin recovery."
        ],
        [
          "SU.PA",
          "Schneider Electric",
          "WATCH-CAPPED",
          "WATCH",
          "Require normalized incremental returns and price protection."
        ],
        [
          "TT",
          "Trane Technologies",
          "BLOCKED - FAIL",
          "WAIT FOR PRICE",
          "Prove backlog conversion, Stellar returns and normalized mix."
        ],
        [
          "PYPL",
          "PayPal",
          "WATCH-CAPPED",
          "WATCH",
          "Prove branded durability, transaction-margin growth and clean FCF/share."
        ],
        [
          "JPM",
          "JPMorgan Chase",
          "WATCH-CAPPED",
          "WATCH",
          "Value on normalized ROTCE/tangible book after stripping gains."
        ],
        [
          "PGR",
          "Progressive",
          "BLOCKED - FAIL",
          "WAIT FOR PRICE",
          "Use reserve-adjusted, mid-cycle underwriting and float income."
        ],
        [
          "AAPL",
          "Apple",
          "BLOCKED - FAIL",
          "WAIT FOR PRICE",
          "Strip tariff refunds and prove durable Services/AI cash returns."
        ],
        [
          "LLY",
          "Eli Lilly",
          "BLOCKED - FAIL",
          "SEED / NONE",
          "Require net-price, concentration and acquisition/capacity returns."
        ],
        [
          "NVO",
          "Novo Nordisk",
          "WATCH-CAPPED",
          "SEED / NONE",
          "Prove share, net-price, pipeline and owner-earnings reacceleration."
        ],
        [
          "COST",
          "Costco Wholesale",
          "BLOCKED - FAIL",
          "SEED / NONE",
          "Wonderful business; current expectation burden fails margin of safety."
        ],
        [
          "LIN",
          "Linde",
          "WATCH-CAPPED",
          "SEED / NONE",
          "Require contracted project returns, clean FCF and price protection."
        ],
        [
          "RTX",
          "RTX",
          "WATCH-CAPPED",
          "SEED / NONE",
          "Close Pratt correction and prove backlog-to-owner-cash conversion."
        ]
      ]
    },
    "P2C_DEEP_RESEARCH_V1032": {
      "status": "50/50 P2 COMPLETE · SHADOW FAIL-CLOSED",
      "asOf": "2026-09-02",
      "t1Fresh": 20,
      "dalioPaths": 60,
      "gateCells": 240,
      "blocked": 5,
      "watchCapped": 15,
      "unknownGates": 0,
      "rows": [
        [
          "MRVL",
          "Marvell Technology",
          "BLOCKED - FAIL",
          "WAIT",
          "Reconcile GAAP/non-GAAP owner earnings, program concentration and dilution."
        ],
        [
          "NVT",
          "nVent Electric",
          "WATCH-CAPPED",
          "WATCH",
          "Require Maverick returns, pro-forma leverage and organic margin durability."
        ],
        [
          "CRDA.L",
          "Croda International",
          "WATCH-CAPPED",
          "WATCH",
          "Demand Pharma recovery, capacity utilization and clean FCF conversion."
        ],
        [
          "SXT",
          "Sensient Technologies",
          "BLOCKED - FAIL",
          "WAIT FOR PRICE",
          "Preserve quality; require normalized FCF and lower expectations."
        ],
        [
          "XOM",
          "Exxon Mobil",
          "WATCH-CAPPED",
          "WATCH",
          "Value only on mid-cycle integrated margins and sustaining capital."
        ],
        [
          "CVX",
          "Chevron",
          "WATCH-CAPPED",
          "WATCH",
          "Require post-Hess returns and conservative mid-cycle FCF/NAV."
        ],
        [
          "COP",
          "ConocoPhillips",
          "BLOCKED - FAIL",
          "WATCH",
          "Re-underwrite at $50–60 oil with full sustaining capital."
        ],
        [
          "OXY",
          "Occidental Petroleum",
          "WATCH-CAPPED",
          "WATCH",
          "Require sub-$10bn debt and owner earnings that survive $50–55 oil."
        ],
        [
          "SLB",
          "SLB",
          "BLOCKED - FAIL",
          "WATCH",
          "Block promotion until Kelvion return, leverage and normalized FCF are proven."
        ],
        [
          "BAC",
          "Bank of America",
          "WATCH-CAPPED",
          "WATCH",
          "Normalize NII, credit, securities marks and required CET1."
        ],
        [
          "C",
          "Citigroup",
          "WATCH-CAPPED",
          "WATCH",
          "Prove durable ROTCE, expense delivery and clean controls."
        ],
        [
          "GS",
          "Goldman Sachs",
          "WATCH-CAPPED",
          "WATCH",
          "Value on mid-cycle ROE/tangible book, not record trading."
        ],
        [
          "UBS",
          "UBS Group",
          "WATCH-CAPPED",
          "SEED / NONE",
          "Require Swiss capital end-state and legacy-risk runoff."
        ],
        [
          "MUV2",
          "Munich Re",
          "WATCH-CAPPED",
          "SEED / NONE",
          "Normalize catastrophe, reserve and investment results."
        ],
        [
          "CAT",
          "Caterpillar",
          "BLOCKED - FAIL",
          "SEED / NONE",
          "Underwrite trough dealer inventory, finance losses and mid-cycle margins."
        ],
        [
          "BHP",
          "BHP Group",
          "WATCH-CAPPED",
          "SEED / NONE",
          "Use long-run prices and full project/tailings capital."
        ],
        [
          "HSBC",
          "HSBC Holdings",
          "WATCH-CAPPED",
          "SEED / NONE",
          "Require Hang Seng returns and China/HK credit stress."
        ],
        [
          "ALV.DE",
          "Allianz",
          "WATCH-CAPPED",
          "SEED / NONE",
          "Normalize catastrophe, reserve, investment and asset-management earnings."
        ],
        [
          "NKE",
          "NIKE",
          "WATCH-CAPPED",
          "SEED / NONE",
          "Prove full-price revenue, China stabilization and clean gross margin."
        ],
        [
          "RIO",
          "Rio Tinto",
          "WATCH-CAPPED",
          "SEED / NONE",
          "Value at long-run prices after Simandou/lithium growth capital."
        ]
      ]
    }
  }
});
