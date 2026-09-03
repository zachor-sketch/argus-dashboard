// V10.25 is historical input. Never mutate it from prices or portfolio overlays.
export function deepFreeze(value) {
  Object.values(value).forEach(child => { if (child && typeof child === 'object') deepFreeze(child); });
  return Object.freeze(value);
}

export const BASELINE = deepFreeze({
  version: 'V10.25',
  INTU: { lock: 359.30, iv: [385, 475], expected: 425, score: 82, decision: 'BUY' },
  NVDA: { lock: 220.78, iv: [205, 290], expected: 249, score: 66, decision: 'WAIT' },
  FIS: { lock: 40.77, iv: [48, 60], expected: 54, score: 52, decision: 'PROVE IT' },
  CRM: { lock: 261.61, iv: [240, 300], expected: 269, score: 71, decision: 'WATCH' }
});

export const PORTFOLIO = deepFreeze({
  version: 'V10.34', total: 4000000, complete: false,
  holdings: { INTU: { shares: 5300, averageCost: 357.21283, target: [6, 8], hardMax: 12, decision: 'DO NOT ADD' } }
});

// Restored from the prior ARGUS conversation, 03 September 2026.
// These are research snapshots, not refreshed market facts or new recommendations.
export const COMPANIES = deepFreeze({
  INTU: {
    name: 'Intuit', mark: 'in', sector: 'Software', bucket: 'SMB / Financial Workflow Software', risk: 'software',
    thesis: 'Durable financial workflows and owner cash generation. Company conviction meets a binding portfolio limit.',
    essence: 'QuickBooks, TurboTax, Credit Karma, and Mailchimp connect financial, tax, and marketing workflows. The research thesis centers on recurring relationships and services built around those workflows.',
    moat: 'Historical financial data, banking and payroll integrations, the accounting ecosystem, brand, and switching costs. Moving a financial workflow can be more disruptive than replacing a single application.',
    buy: ['The locked thesis favors recurring financial workflows and durable owner earnings per share.', 'The supplied expected intrinsic value of about $425 is above the $359.30 locked reference price.', 'The prior ARGUS thesis requires QuickBooks and TurboTax economics to remain durable as the business compounds.'],
    risks: ['Slower growth could reduce the value of future cash flows.', 'Tax-policy changes and AI competition may weaken pricing power or existing customer workflows.', 'Mailchimp execution, stock-based compensation, and capital allocation require continued review.', 'Portfolio constraint: this known position is already above its supplied 12% hard maximum.'],
    bias: 'Cautiously positive company thesis; no additional portfolio allocation.',
    confidence: 'Medium–high in the prior research snapshot; not newly assessed.',
    drivers: ['QuickBooks / Global Business Solutions growth and customer retention', 'TurboTax durability and tax-policy changes', 'Owner earnings per share; repurchases net of stock-based compensation', 'Mailchimp performance and small-business financial health'],
    kill: 'Structural deterioration in core financial workflows or persistently weaker owner earnings per share would require a new, separately dated research decision.',
    gate: 'Company decision is BUY in the locked baseline. Portfolio concentration vetoes adding capital.',
    management: 'Review repurchases versus dilution and the return on capital allocated to adjacent products.'
  },
  NVDA: {
    name: 'NVIDIA', mark: 'N', sector: 'Semiconductors', bucket: 'AI Compute / Semis / Networking', risk: 'ai',
    thesis: 'Exceptional platform economics. Entry discipline depends on AI-cycle durability and customer returns.',
    essence: 'An accelerated-computing platform spanning GPUs, networking, systems, and CUDA software. The research focuses on the economics of useful compute rather than chip volume alone.',
    moat: 'The CUDA developer ecosystem, libraries, installed base, and integration across hardware, software, and networking support the prior platform-quality thesis.',
    buy: ['The prior research recognizes strong platform quality and an extensive software ecosystem.', 'Integrated systems and networking can deepen customer dependence on the platform.', 'Durable customer AI returns could extend the investment cycle beyond cautious assumptions.'],
    risks: ['The locked WAIT decision reflects uncertainty about normalized AI demand and customer return on investment.', 'Custom silicon and competing accelerators may change terminal economics.', 'Export restrictions, geopolitics, and concentrated infrastructure spending remain thesis risks.'],
    bias: 'Positive on business quality; WAIT on allocation.', confidence: 'Medium in the prior research snapshot; not newly assessed.',
    drivers: ['Customer AI return on investment and utilization', 'Hyperscaler capital expenditure and infrastructure demand', 'Gross margin durability and custom-silicon share', 'Export policy and the duration of the investment cycle'],
    kill: 'Weaker normalized customer returns or lasting erosion of platform economics would challenge the thesis. Conversely, stronger durable returns must be recorded as evidence against an overly cautious WAIT.',
    gate: 'WAIT remains locked. Require cycle and customer-ROI evidence before a separately dated company reassessment.',
    management: 'Review capital deployment, supply commitments, and per-share owner economics through a normalized cycle.'
  },
  FIS: {
    name: 'Fidelity National Information Services', shortName: 'Fidelity National', mark: 'F', sector: 'Financial technology', bucket: 'Banks / Insurance / Payments', risk: 'financial',
    thesis: 'Potential value is not enough. Free cash flow must become lower debt and higher value per share.',
    essence: 'Technology infrastructure for financial institutions, including core banking, processing, payments, and capital-markets operations.',
    moat: 'Embedded systems, integrations, security requirements, and the operational risk of switching vendors support customer stickiness. The thesis does not treat this as protection against poor capital allocation.',
    buy: ['Recurring financial infrastructure and switching friction underpin the prior research case.', 'The supplied intrinsic-value range of $48–60 exceeds the $40.77 locked price.', 'A credible conversion of cash flow into lower leverage could improve owner economics.'],
    risks: ['Leverage and capital-allocation history can turn apparent cheapness into a value trap.', 'Debt-funded acquisitions could interrupt balance-sheet repair.', 'Cash generation must translate into actual net-debt reduction and per-share value.'],
    bias: 'Conditional value opportunity; PROVE IT until the capital-allocation gate passes.', confidence: 'Conditional; the hard gate dominates valuation.',
    drivers: ['Free cash flow converted to net-debt reduction', 'Leverage trajectory and financing burden', 'Capital allocation and acquisition discipline', 'Sustainable owner value per share'],
    kill: 'Renewed debt-funded acquisitions before balance-sheet repair, or failure to reduce net debt despite cash generation, would fail the gate.',
    gate: 'Hard Capital Allocation Gate: free cash flow → lower net debt → lower leverage → higher value per share. The prior overlay target is 0% until this passes.',
    management: 'Capital allocation is the controlling variable; a low valuation cannot override it.'
  },
  CRM: {
    name: 'Salesforce', mark: 'S', sector: 'Software', bucket: 'Enterprise Software / SaaS', risk: 'software',
    thesis: 'Durable enterprise software. Organic AI monetization and per-share economics still need a stronger valuation edge.',
    essence: 'Enterprise customer-relationship software and connected data, service, sales, and automation workflows.',
    moat: 'Embedded business processes, customer data, integrations, and an enterprise partner ecosystem underpin the prior switching-cost thesis.',
    buy: ['Recurring enterprise workflows support the research case for durable cash generation.', 'AI monetization could improve the economics of the installed customer base.', 'Repurchases can support per-share value when they exceed dilution and are sensibly priced.'],
    risks: ['The $261.61 locked price sits close to the approximately $269 expected intrinsic value.', 'Acquisition-related growth must be separated from organic demand and AI monetization.', 'Stock-based compensation, debt, and non-operating gains can obscure owner economics.'],
    bias: 'WATCH: business progress requires a clearer valuation advantage.', confidence: 'Await organic growth and owner-economics evidence.',
    drivers: ['Organic AI monetization and customer adoption', 'Subscription growth separated from acquisitions', 'Free cash flow per share and stock-based compensation', 'Debt, acquisition integration, and repurchase discipline'],
    kill: 'A persistent gap between reported progress and organic cash generation per share would challenge the thesis.',
    gate: 'WATCH remains locked. Require stronger valuation protection and verified organic owner-economics evidence.',
    management: 'Separate operating improvements from acquisition effects, financial gains, and changes in share count.'
  }
});

export const RISK_BUCKETS = deepFreeze([
  { id: 'software', name: 'Software / SaaS / Financial Workflow', target: [15,20], max: 25, note: 'INTU + CRM · known INTU exposure only' },
  { id: 'ai', name: 'AI Compute / Semis / Networking', target: [15,25], max: 30, note: 'NVDA + AVGO + CLS + CRDO · shared AI-capex cycle' },
  { id: 'financial', name: 'Banks / Insurance / Payments', target: [10,15], max: 20, note: 'Includes the financial-infrastructure research bucket' },
  { id: 'energy', name: 'Energy', target: [10,15], max: 20 },
  { id: 'industrial', name: 'Industrials / Materials', target: [10,15], max: 20 },
  { id: 'quantum', name: 'Quantum', target: [3,7], max: 10 },
  { id: 'special', name: 'Special Situations', target: [5,10], max: 15 },
  { id: 'cash', name: 'Cash / T-Bills / Dry Powder', target: [10,20], max: null }
]);

export const RADAR = deepFreeze([
  { ticker:'AVGO', name:'Broadcom', status:'WATCH-CAPPED', tone:'caution', description:'Demand and owner economics passed in prior research. Expectations and concentration require a fresh underwriting review.', checks:[['Demand','PASS','green'],['Owner economics','PASS','green'],['Valuation','WATCH','amber']], next:'Verify the latest filing, customer concentration, software retention, and debt / share-count bridge.' },
  { ticker:'CLS', name:'Celestica', status:'PRIORITY RESEARCH', tone:'caution', description:'Infrastructure demand earns a closer look. Customer concentration and normalized cash conversion remain open questions.', checks:[['Demand','PASS','green'],['Owner economics','WATCH','amber'],['Valuation','WATCH','amber']], next:'Underwrite customer programs, margins, inventory, capital spending, and normalized free cash flow.' },
  { ticker:'CRDO', name:'Credo', status:'BLOCKED / WAIT', tone:'negative', description:'Growth is not the same as owner value. Concentration and valuation were binding gates in prior research.', checks:[['Demand','PASS','green'],['Owner economics','WATCH','amber'],['Valuation','FAIL','red']], next:'Reassess customer concentration and valuation; establish dilution-adjusted owner value per share.' }
]);

export function positionMetrics({ shares, price, total, target, hardMax }) {
  if (![shares,price,total,hardMax].every(Number.isFinite) || shares < 0 || price <= 0 || total <= 0 || hardMax < 0) return null;
  const value = shares * price;
  const weight = value / total * 100;
  const maxValue = total * hardMax / 100;
  return { value, weight, maxValue, addCapacity: Math.max(0,maxValue-value), excess: Math.max(0,value-maxValue), status: weight > hardMax ? 'red' : !target ? 'unknown' : weight > target[1] ? 'orange' : 'green' };
}

export function intuMetrics(basis='lock') {
  const holding = PORTFOLIO.holdings.INTU;
  return positionMetrics({ ...holding, price: basis === 'cost' ? holding.averageCost : BASELINE.INTU.lock, total: PORTFOLIO.total });
}
