/* BUSI 447 study content, units 1-5. Each unit: lesson sections, flashcards, practice questions.
   Quiz answers are the index of the correct choice. */
window.UNITS = window.UNITS || [];

window.UNITS.push({
  id: "u1",
  num: 1,
  title: "Cash flows and NPV",
  blurb: "What a firm is worth, how to build free cash flow, and how to discount it.",
  source: "Valuation I deck · PS1 Q1–Q2",
  lesson: [
    { h: "What owning a firm means", html: `
<p>Owning a firm means owning a claim on its <b>future cash flows</b>. A company can use cash in three ways: pay off debt, pay shareholders (dividends or buybacks), or reinvest in new projects. Valuation is the job of working out how much free cash a business will produce and when.</p>
<p>If the goal is to maximize shareholder value, the rule that follows is simple: <b>accept every project with NPV &gt; 0</b>. A positive NPV means the project adds value, so firm value after the project = value before + the project's NPV. Taking all of them leaves no money on the table.</p>
<div class="callout"><b>Reality check.</b> In Graham's (2022) CFO survey, very few CFOs say maximizing shareholder value is the firm's <i>only</i> goal. Employees, customers and the environment come up often. From a pure finance angle, stakeholders matter because they affect the cash flows.</div>` },
    { h: "Cash is not accounting profit", html: `
<p>Accountants match revenues with the expenses that produced them so that earnings are comparable over time. Finance asks a different question: <b>when did the cash actually move?</b> That's why we rebuild cash flow from the income statement.</p>
<div class="f">FCF = EBIT(1 − t) + Depreciation − ΔNWC − CAPX + after-tax salvage</div>
<ul>
<li><b>Start from NOPAT</b> = EBIT(1 − t), not net income. Interest is a financing cost. Its effect is already in the discount rate (or WACC), so subtracting it in the cash flow would count financing twice. Project FCF should come out the same however the project is financed.</li>
<li><b>Add back depreciation.</b> It's a non-cash expense. It matters only because it lowers taxes (the depreciation tax shield). A $10 increase in depreciation at t = 40% raises FCF by $4.</li>
<li><b>Subtract CAPX</b>, because the cash for equipment leaves when you buy it, not as it depreciates.</li>
<li><b>Subtract increases in net working capital.</b> NWC = inventory + receivables − payables. Inventory you've paid for but not sold, and sales you've booked but not collected, tie up cash. Payables are bills you haven't paid yet, so they free cash. Only <i>changes</i> in NWC are cash flows, and the balance usually comes back at the end of the project.</li>
<li><b>Tax the salvage gain</b>: after-tax salvage = P − t(P − book value). If you sell <i>below</i> book value, the loss creates a tax credit (PS1 Q1: sell for 50 with book value 180 gives 50 + 0.35 × 130 = 95.5).</li>
</ul>` },
    { h: "Only incremental cash flows count", html: `
<p>Ask one question about every item: <b>does this cash flow change because we take the project?</b></p>
<ul>
<li><b>Sunk costs are out.</b> Money already spent can't be recovered whatever you decide. The $10M demand study in PS1 Q1 was paid in January 2022, so it's irrelevant to the decision.</li>
<li><b>Opportunity costs are in.</b> If a farmer could rent out a tractor for $6k a year but uses it on the project, the project costs $6k a year.</li>
<li><b>Allocated overhead is out</b> unless total overhead actually rises. HQ assigning $500k of costs to a project doesn't change the firm's cash.</li>
<li><b>Use incremental, not total.</b> Replacing a tractor that costs $12k a year to run with one that costs $5k saves $7k a year.</li>
<li><b>Value the project, not the firm.</b> Discounting the whole firm's FCF including the project (the second executive in PS1 Q1) mixes in the existing business. Use with-project minus without-project.</li>
</ul>` },
    { h: "Discounting with a yield curve", html: `
<p>Risk-free rates differ by maturity. A cash flow in year 2 should be discounted at the 2-year zero yield, not the 1-year rate:</p>
<div class="f">NPV = Σ CF<sub>t</sub> / (1 + y<sub>t</sub>)<sup>t</sup></div>
<p><b>Example (Valuation I):</b> FCFs of −54,000, 14,267, 19,447 and 34,208, discounted at 4.17%, 4.28% and 4.30%, give NPV = 7,728. Accept.</p>
<p>If you're given <b>coupon bonds</b> rather than zero yields, back out the discount factors. In PS1 Q2: 10d<sub>1</sub> + 110d<sub>2</sub> = 104.743 and 20d<sub>1</sub> + 95d<sub>2</sub> = 100.790 give d<sub>1</sub> = 0.909 and d<sub>2</sub> = 0.870. The same project goes from NPV +0.30 under the zeros to −0.08 under this curve.</p>` },
    { h: "NPV vs IRR", html: `
<p>IRR is the discount rate that makes NPV = 0. With a flat curve, accept if IRR &gt; the cost of capital. With a non-flat curve, the <b>hurdle rate</b> is the single rate that reproduces the project's value at the yield curve. For CFs of −90, 40, 60 with zeros of 5% and 7%, V* = 90.50, the hurdle is 6.47%, and IRR = 6.84% clears it.</p>
<p><b>Why NPV wins:</b> it's measured in dollars, so it handles scale. It's additive, so firm value is the sum of NPVs. It has one answer. Projects Small (−10, +11) and Big (−1,000, +1,100) both have IRR = 10%, but Big creates 100 times more value. IRR can also have several solutions because it solves a polynomial. Use NPV to accept and rank; IRR is mainly for communication.</p>` }
  ],
  cards: [
    { q: "Why build FCF from NOPAT instead of net income?", a: "Net income subtracts interest, which is a financing cost. Financing is already in the discount rate, so subtracting interest too would double count it. FCF should not depend on how the project is financed." },
    { q: "Why add back depreciation?", a: "It's a non-cash expense. It only affects cash through taxes: it lowers taxable income, which saves t × Dep." },
    { q: "Is an increase in net working capital a cash inflow or outflow?", a: "An outflow. More inventory or receivables ties up cash. More payables frees cash. Only the change counts, and it's usually recovered at the end." },
    { q: "After-tax salvage value formula", a: "P − t(P − BV). You pay tax only on the gain over book value. A sale below book value gives a tax credit." },
    { q: "How do you treat a sunk cost?", a: "Ignore it. It was spent whatever you decide, so it isn't incremental (e.g., the $10M espresso demand study)." },
    { q: "How do you treat an opportunity cost?", a: "Include it. If an asset the project uses could otherwise earn $6k a year (the farmer's tractor), charge the project $6k a year." },
    { q: "Why use different discount rates for different years in a riskless project?", a: "Risk-free yields vary with maturity (the term structure). Each cash flow is discounted at the zero yield for its own date." },
    { q: "With a non-flat yield curve, what is the hurdle rate?", a: "The single rate r that makes Σ CF/(1+r)^t equal V*, the project's value at the yield curve. It lies between the curve's yields." },
    { q: "If NPV and IRR disagree, which do you trust and why?", a: "NPV. It's in dollars (handles scale), additive across projects, and unique. IRR ignores scale and can have multiple solutions." },
    { q: "You're given coupon bond prices instead of zero yields. What do you do?", a: "Write each bond price as Σ coupon × d_t and solve the equations for the discount factors d_1, d_2, … Then NPV = Σ CF_t × d_t." },
    { q: "Firm value after accepting a project equals…", a: "Firm value before the project + the project's NPV." },
    { q: "Why is discounting whole-firm FCF the wrong way to judge a new project?", a: "It mixes in the existing business. A project is judged on incremental cash flows: with-project minus without-project." }
  ],
  quiz: [
    { q: "A project requires $10,000 of extra inventory at the start, all recovered when the project ends in year 3. How does this enter FCF?", c: ["−10,000 in year 0 only", "−10,000 in year 0 and +10,000 in year 3", "−3,333 in each of years 1–3", "It doesn't enter FCF because inventory is on the balance sheet"], a: 1, why: "An increase in NWC uses cash when it happens and returns cash when the balance is released. Only changes in NWC are cash flows." },
    { q: "A machine bought for $100 is fully depreciated (book value 0) and sold for $20. The tax rate is 30%. What is the after-tax salvage value?", c: ["$20", "$14", "$6", "$26"], a: 1, why: "P − t(P − BV) = 20 − 0.30(20 − 0) = 14." },
    { q: "Depreciation on a project rises by $10 a year, with tax rate 40% and nothing else changed. What happens to FCF?", c: ["Falls by $10", "Falls by $6", "Rises by $4", "No change, because depreciation is non-cash"], a: 2, why: "NOPAT falls by 10 × (1 − 0.4) = 6, but you add back the full 10, so FCF rises by 0.4 × 10 = 4. That's the depreciation tax shield." },
    { q: "Which item should NOT be subtracted when computing a project's free cash flow?", c: ["Increase in receivables", "Capital expenditures", "Interest expense", "Taxes on operating income"], a: 2, why: "Interest is a financing flow. Its cost is in the discount rate, so it stays out of FCF." },
    { q: "Last year the firm paid consultants $2M for a feasibility study. The study recommends a new plant. How should the $2M enter the plant's NPV?", c: ["Subtract it at t = 0", "Spread it over the plant's life", "Ignore it", "Add it back as a tax shield"], a: 2, why: "It's a sunk cost: it was paid whatever the decision is, so it isn't incremental." },
    { q: "Project Small: −10 now, +11 in a year. Project Big: −1,000 now, +1,100 in a year. Discount rate 5%. Which statement is right?", c: ["They're equally good because their IRRs are equal", "Small is better because its IRR is higher", "Big is better because its NPV is higher", "You can't rank them without the hurdle rate"], a: 2, why: "Both IRRs are 10%, but NPV at 5% is 0.48 for Small and 47.6 for Big. NPV handles scale; IRR doesn't." },
    { q: "Zero yields are 5% (1-year) and 7% (2-year). For a riskless project's IRR comparison, the hurdle rate is…", c: ["5%", "7%", "A rate between 5% and 7% that depends on the timing of the cash flows", "The average of 5% and 7%, always 6%"], a: 2, why: "The hurdle is the single rate that reproduces the project's value at the curve. For −90, 40, 60 it's 6.47%, a weighted mix that depends on when the cash arrives." },
    { q: "A project will use a warehouse the firm owns. The warehouse could otherwise be leased out for $50k a year. What should the NPV analysis do?", c: ["Nothing, since the firm already owns it", "Subtract $50k a year of after-tax lease income given up", "Subtract the warehouse's original purchase price", "Add $50k a year because the firm saves on rent"], a: 1, why: "Lost lease income is an opportunity cost of the project, so it's an incremental (after-tax) cost." },
    { q: "An executive says: \"I discounted the net income the project adds, and it's very positive, so let's go.\" The main problem is that net income…", c: ["is too conservative", "subtracts interest and depreciation but ignores CAPX, working capital and salvage, so it isn't cash flow", "should be discounted at the risk-free rate", "ignores taxes"], a: 1, why: "This is the first caffeinated executive in PS1 Q1. Accounting income isn't free cash flow." }
  ]
});

window.UNITS.push({
  id: "u2",
  num: 2,
  title: "Risk and the cost of capital",
  blurb: "Comparables, asset vs equity beta, CAPM, Fama-French and terminal value.",
  source: "Valuation I deck · Ocean Carriers · PS2 Q3",
  lesson: [
    { h: "Two ways to handle risk", html: `
<p>Most real projects are risky. There are two ways to value them, and they put the risk adjustment in different places:</p>
<ol>
<li><b>Risk-adjusted discount rate (RADR):</b> forecast <i>expected</i> cash flows (the probability-weighted average of upside, base and downside scenarios) and discount them at a higher rate. The adjustment is in the <b>denominator</b>.</li>
<li><b>Certainty equivalent (CE):</b> shrink the cash flows to their risk-free equivalents and discount at r<sub>f</sub>. The adjustment is in the <b>numerator</b> (Unit 3).</li>
</ol>
<p>The project's <b>cost of capital</b> is the expected return investors require on an investment with the <i>same risk as the project</i>. It's the project's risk that matters, not the firm's: a coffee truck outside McNair and a surgical-robotics startup promising the same cash flows deserve very different rates.</p>` },
    { h: "The comparison method", html: `
<p>Risk is hard to measure directly, so we borrow it from <b>publicly traded firms in the same line of business</b>. Their stock returns show how much compensation investors demand.</p>
<ol>
<li>Pick comparables in the same risk class (industry).</li>
<li>Get their equity betas (regressions, Bloomberg, Yahoo, Damodaran).</li>
<li><b>Unlever</b> them to remove the effect of each firm's debt.</li>
<li>Average the asset betas, <b>relever</b> to the project's target leverage if needed, and apply CAPM.</li>
</ol>
<p>CAPM: <span class="m">r = r<sub>f</sub> + β (E[r<sub>m</sub>] − r<sub>f</sub>)</span>. Investors are paid only for <b>systematic</b> risk, the part they can't diversify away.</p>` },
    { h: "Asset beta vs equity beta", html: `
<p>Two things drive an equity beta:</p>
<ul>
<li><b>Business risk</b> (asset beta): how cyclical the firm's free cash flows are.</li>
<li><b>Financial risk</b>: debt payments are fixed and senior. With more debt, the same swing in operating cash flow produces a bigger swing in what's left for shareholders.</li>
</ul>
<p>Unlevering strips out the financial risk. With no taxes (the lecture formula):</p>
<div class="f">β<sub>A</sub> = (E/V)·β<sub>E</sub> + (D/V)·β<sub>D</sub> &nbsp;&nbsp;⇔&nbsp;&nbsp; β<sub>E</sub> = β<sub>A</sub> + (β<sub>A</sub> − β<sub>D</sub>)·D/E</div>
<p>Use the <b>market</b> value of equity; book debt is acceptable. If debt is safe, β<sub>D</sub> ≈ 0 (debt-rating betas: BBB 0.10, BB 0.17, B 0.26). With corporate taxes (as in your Ocean Carriers model): <span class="m">β<sub>U</sub> = β<sub>L</sub> / [1 + (1 − t)D/E]</span>.</p>
<p><b>Example (TI's PC division):</b> Dell β<sub>E</sub> 0.87 with E/V = 0.654 gives β<sub>A</sub> 0.569. HPE: 1.24 × 0.555 = 0.688. Average 0.629, so r = 1.6% + 0.629 × 6.6% = 5.75%.</p>
<p><b>PS2 Q3 twist:</b> XYZ's project is unrelated to its own business, so it uses Azzon as the comparable. Unlever at Azzon's 60% debt (r<sub>A</sub> = 12.43%), relever at the project's 40% target, and the WACC comes out at 10.74%.</p>` },
    { h: "Fama-French and why CAPM still wins", html: `
<p>Fama-French 3 adds two factors: <b>SMB</b> (small minus big firms) and <b>HML</b> (high minus low book-to-market, i.e. value minus growth). Empirically small and value stocks earn more than CAPM predicts, which suggests those are priced, undiversifiable risks.</p>
<div class="f">E[R] = r<sub>f</sub> + β<sub>M</sub><sup>U</sup>·MRP + β<sub>SMB</sub>·(1.69%) + β<sub>HML</sub>·(3.36%)</div>
<p>Only the market beta gets unlevered. Most firms still use CAPM: one factor, easy to explain, betas are fairly stable, and it plugs straight into WACC. FF3 is a good sensitivity check.</p>` },
    { h: "Terminal value", html: `
<p>Projects and firms often outlive the forecast window. The terminal value (TV) captures everything after it:</p>
<div class="f">TV<sub>T</sub> = CF<sub>T</sub>(1 + g)/(r − g) &nbsp;&nbsp;or&nbsp;&nbsp; CF<sub>T</sub> × (MV/CF)<sub>comparables</sub></div>
<p>The TV is a value <i>at date T</i>, so discount it T periods. It's often most of the total value (366 of TI's 430), so small changes in g or r move the answer a lot. It requires g &lt; r.</p>` }
  ],
  cards: [
    { q: "Define a project's cost of capital.", a: "The expected return investors require on an investment with the same (systematic) risk as the project." },
    { q: "Asset beta vs equity beta", a: "Asset beta = business risk only. Equity beta = business risk + financial risk from leverage." },
    { q: "Why unlever comparables' betas?", a: "Comparables carry different amounts of debt. Unlevering removes financial risk so you can average pure business risk, then relever to the project's capital structure." },
    { q: "No-tax unlevering formula", a: "β_A = (E/V)β_E + (D/V)β_D. With safe debt (β_D = 0): β_A = β_E × E/V." },
    { q: "Relevering formula", a: "β_E = β_A + (β_A − β_D)(D/E). With taxes (Hamada): β_L = β_U[1 + (1 − t)D/E]." },
    { q: "Market or book value of equity when unlevering?", a: "Market value of equity. Book debt is acceptable if market debt isn't available." },
    { q: "What kind of risk does CAPM reward?", a: "Only systematic (market) risk, because diversifiable risk can be eliminated for free." },
    { q: "The three Fama-French factors", a: "Market excess return, SMB (small minus big), HML (high minus low book-to-market, i.e. value minus growth)." },
    { q: "Why do most firms still use CAPM?", a: "One factor, easy to explain and estimate, stable betas, and it plugs cleanly into WACC." },
    { q: "Growing-perpetuity terminal value", a: "TV_T = CF_T(1 + g)/(r − g), valued at date T, so discount it T periods." },
    { q: "Why are terminal value assumptions dangerous?", a: "The TV is often most of the total value, so small changes in g or r swing the answer a lot." },
    { q: "A firm is valuing a project unrelated to its main business. Whose risk sets the discount rate?", a: "The project's. Use comparables from the project's industry, not the firm's own WACC (PS2 Q3)." }
  ],
  quiz: [
    { q: "A comparable firm has equity beta 1.5, half debt and half equity by market value, and riskless debt. What is its asset beta?", c: ["1.5", "1.0", "0.75", "3.0"], a: 2, why: "β_A = (E/V)β_E = 0.5 × 1.5 = 0.75." },
    { q: "Average asset beta of the comparables is 0.8. Your project will have D/E = 0.5 with riskless debt and no taxes. What is its equity beta?", c: ["0.8", "1.2", "1.6", "0.53"], a: 1, why: "β_E = β_A + (β_A − β_D)(D/E) = 0.8 + 0.8 × 0.5 = 1.2." },
    { q: "Asset beta 0.75, r_f = 2%, market risk premium 6%. What is the all-equity cost of capital?", c: ["6.5%", "8.0%", "4.5%", "6.0%"], a: 0, why: "2% + 0.75 × 6% = 6.5%." },
    { q: "A firm takes on more debt but keeps the same assets. What happens to the betas?", c: ["Asset beta rises, equity beta unchanged", "Both rise", "Asset beta unchanged, equity beta rises", "Both fall"], a: 2, why: "Leverage doesn't change business risk. It concentrates that risk on fewer equity dollars." },
    { q: "Last-year FCF is 10, long-run growth 3%, discount rate 8%. What is the terminal value at that year?", c: ["125", "200", "206", "128.75"], a: 2, why: "TV = 10 × 1.03/(0.08 − 0.03) = 10.3/0.05 = 206." },
    { q: "A coffee truck and a surgical-robotics startup promise identical expected cash flows. Which is worth more today?", c: ["They're worth the same because the cash flows are identical", "The robotics startup, because growth is higher", "The coffee truck, because its cash flows carry less systematic risk and get a lower discount rate", "You can't tell without the risk-free rate"], a: 2, why: "Same expected CFs, different risk, so different costs of capital. The riskier project's CFs are worth less." },
    { q: "XYZ, a manufacturer, considers a project in an unrelated industry. Which discount rate is appropriate?", c: ["XYZ's own WACC", "The risk-free rate", "A WACC built from a comparable in the project's industry, relevered to the project's financing", "The average WACC of the S&P 500"], a: 2, why: "Discount rates follow the risk of the project, not the firm (PS2 Q3 uses Azzon)." },
    { q: "Which is NOT a reason firms favor CAPM over multi-factor models?", c: ["Only one parameter (beta) to estimate", "It's easy to explain to boards and managers", "It explains the cross-section of returns better than Fama-French", "It plugs directly into WACC"], a: 2, why: "Fama-French describes returns better empirically. Firms use CAPM for its simplicity, not its accuracy." }
  ]
});

window.UNITS.push({
  id: "u3",
  num: 3,
  title: "Certainty equivalents",
  blurb: "Taking risk out of the cash flow instead of the discount rate.",
  source: "Valuation I deck · PS1 Q3–Q4",
  lesson: [
    { h: "What a certainty equivalent is", html: `
<p>A <b>certainty equivalent (CE)</b> is the guaranteed amount you'd accept instead of a risky cash flow. Take two job offers:</p>
<ul><li><b>A:</b> $200k base + a $25k bonus (60%) or $5k (40%). Expected pay = $217k.</li><li><b>B:</b> $217k guaranteed.</li></ul>
<p>Is B the certainty equivalent of A? Only for someone who is <b>risk-neutral</b>. A risk-averse person would accept <i>less</i> than $217k for sure instead of A, so A's CE is below its expected value. The gap is the risk premium in dollars.</p>` },
    { h: "Risk in the numerator", html: `
<p>RADR puts risk in the denominator. CE puts it in the numerator and then discounts at the risk-free rate, because the risk has already been taken out:</p>
<div class="f">PV = CE / (1 + r<sub>f</sub>)<sup>t</sup></div>
<p><b>Never</b> discount a CE at the risky rate. That charges for the risk twice and undervalues the project.</p>
<p>Use CE when risk is easier to price in the cash flows than in the rate: commodity- or FX-linked cash flows with traded forwards, or when there are no credible comparables for a discount rate.</p>` },
    { h: "The CAPM version", html: `
<p>CAPM says that after you subtract the risk premium from an asset's expected return, what's left is the risk-free rate. Apply the same logic to a dollar cash flow:</p>
<div class="f">CE = E[CF] − b·(E[r<sub>m</sub>] − r<sub>f</sub>), &nbsp;&nbsp; b = cov(CF, r<sub>m</sub>) / var(r<sub>m</sub>)</div>
<p><b>b is a cash-flow beta</b>, measured in dollars. It asks how many dollars the cash flow moves with the market. What sets the discount is <b>covariance with the market</b>, not total volatility:</p>
<ul>
<li>A cash flow that pays most in booms (positive covariance) gets a big haircut: it pays when you least need it.</li>
<li>A cash flow unrelated to the market has b = 0, so PV = E[CF]/(1 + r<sub>f</sub>) however volatile it is. That's PS1 Q3(b): the casinos' risk is diversifiable, so it isn't priced.</li>
<li>A cash flow that pays most in recessions has b &lt; 0. It acts as insurance, so CE &gt; E[CF].</li>
</ul>
<p><b>Apartments example:</b> E[V] = 26, cov = 1.725, var(r<sub>m</sub>) = 0.03523, so b = 48.96. Risk premium = 48.96 × (11.563% − 6%) = 2.72. PV = (26 − 2.72)/1.06 = 21.96 and NPV = +1.96.</p>
<p><b>PS1 Q4:</b> b = 809,083 and the premium is 77,874, so PV = 148,959 instead of the naive 221,065. The project pays most in the recovery state, when investors need cash least.</p>` },
    { h: "Forward prices are certainty equivalents", html: `
<p>A forward contract locks in today the price you'll trade at later. So the forward price is the <b>certainty-equivalent price</b>, not the expected future spot price. If the output of a project can be sold forward:</p>
<div class="f">CE<sub>t</sub> = F<sub>t</sub> × Q<sub>t</sub> − known costs</div>
<p><b>Copper mine:</b> 25,000 lb at t = 1 and 50,000 lb at t = 2, extraction $0.10/lb, F<sub>1</sub> = 0.65, F<sub>2</sub> = 0.60, r = 5% and 6%. CE<sub>1</sub> = 13,750 and CE<sub>2</sub> = 25,000, so PV = 13,750/1.05 + 25,000/1.06² = $35,345.</p>
<p>The same idea appears elsewhere: a firm that hedges with futures turns its cash flow into a known amount H, which is its own CE. For <b>political risk</b>, buy insurance (DFC, MIGA, private insurers), subtract the premium from each year's cash flows, then discount at the usual rate.</p>` }
  ],
  cards: [
    { q: "Define a certainty equivalent.", a: "The guaranteed cash flow an investor would accept in place of a risky one." },
    { q: "RADR vs CE: where does the risk adjustment go?", a: "RADR: in the denominator (higher discount rate). CE: in the numerator (smaller cash flow), discounted at r_f." },
    { q: "Why discount a CE at the risk-free rate?", a: "The risk has already been removed from the cash flow. Discounting at a risky rate would charge for it twice." },
    { q: "CAPM certainty-equivalent formula", a: "CE = E[CF] − b(E[r_m] − r_f), where b = cov(CF, r_m)/var(r_m)." },
    { q: "What is a cash-flow beta and what are its units?", a: "b = cov(CF, r_m)/var(r_m). It's in dollars: how many dollars the cash flow moves per unit of market return." },
    { q: "A cash flow is very volatile but independent of the market. What is its CE?", a: "Its expected value. b = 0, so there's no risk premium. Diversifiable risk isn't priced (PS1 Q3b)." },
    { q: "A cash flow pays most in recessions. Is its CE above or below its expected value?", a: "Above. Negative covariance means it works as insurance, so investors pay a premium for it." },
    { q: "Is a forward price the expected future spot price?", a: "No. It's the certainty-equivalent price, the price you can lock in today with no risk." },
    { q: "CE cash flow for a mine using forward prices", a: "CE_t = F_t × Q_t − extraction costs, discounted at the t-year risk-free rate." },
    { q: "When should you prefer the CE method?", a: "When forward prices exist (commodities, FX) or when there are no credible comparables to set a discount rate." },
    { q: "How do you handle political risk with the CE logic?", a: "Subtract the political-risk insurance premium from each year's cash flows, then discount at the usual rate." },
    { q: "Job offer A has expected pay $217k; B pays $217k for sure. Which does a risk-averse person prefer?", a: "B. A's CE is below $217k for a risk-averse person; B equals A's expected value." }
  ],
  quiz: [
    { q: "A casino's cash flow is 750k or 500k with equal probability, independent of the market. r_f = 6%. What is its value?", c: ["$625,000", "$589,623", "$566,038", "$500,000"], a: 1, why: "b = 0, so CE = E[CF] = 625k and PV = 625k/1.06 = 589,623." },
    { q: "A project's E[CF] = 100, its cash-flow beta b = 200, and E[r_m] − r_f = 5%. r_f = 5%. What is the PV?", c: ["95.24", "90.00", "85.71", "100.00"], a: 2, why: "CE = 100 − 200 × 0.05 = 90. PV = 90/1.05 = 85.71." },
    { q: "A mine will sell 10,000 lb of copper in one year. The forward price is $2.00/lb, extraction costs $0.50/lb, and r_f = 5%. What is the PV?", c: ["$14,286", "$15,000", "$19,048", "$13,636"], a: 0, why: "CE = 10,000 × (2.00 − 0.50) = 15,000. PV = 15,000/1.05 = 14,286." },
    { q: "Two projects have the same expected cash flow and the same total volatility. Project X pays most in booms; project Y pays most in recessions. Which is worth more?", c: ["X", "Y", "They're worth the same", "Can't tell without the discount rate"], a: 1, why: "Only covariance with the market is priced. Y works as insurance (b < 0), so its CE is higher." },
    { q: "An analyst computes a correct CE cash flow, then discounts it at the project's 12% cost of capital. The value will be…", c: ["correct", "too high", "too low, because risk is charged twice", "unaffected, since CE and RADR always agree"], a: 2, why: "The CE already removed risk. Discount at r_f." },
    { q: "Job offer A: $200k + bonus of $25k (60%) or $5k (40%). Job offer B: $217k guaranteed. For a risk-averse person…", c: ["B is A's certainty equivalent", "A's CE is above $217k", "A's CE is below $217k, so they prefer B", "They're indifferent"], a: 2, why: "Expected pay for A is $217k. Risk aversion means accepting less than the expected value for certainty." },
    { q: "In PS1 Q4, which states drive the project's value below E[CF]/(1 + r_f)?", c: ["The recovery state, because the CF is high when the market is high", "The depression state alone", "None; the gap comes only from the time value of money", "Only the recession state"], a: 0, why: "Covariance comes from paying 300k when the market is up 25%. The project delivers least when investors need cash most, so they demand a premium." }
  ]
});

window.UNITS.push({
  id: "u4",
  num: 4,
  title: "Option pricing",
  blurb: "Calls, puts, replication, risk-neutral pricing and Black-Scholes.",
  source: "Foundations of Option Pricing deck",
  widget: "binomial",
  lesson: [
    { h: "Calls and puts", html: `
<p>An option gives its owner the <b>right but not the obligation</b> to trade an asset at a fixed strike price K on or before a date.</p>
<ul>
<li><b>Call</b>: the right to <i>buy</i>. Payoff at expiration = max(0, S<sub>T</sub> − K).</li>
<li><b>Put</b>: the right to <i>sell</i>. Payoff = max(0, K − S<sub>T</sub>).</li>
<li><b>European</b> options can be exercised only at expiration; <b>American</b> options at any time. Without dividends or other payouts, an American call is never exercised early, so it's worth the same as a European one.</li>
</ul>
<div class="svgrow">
<svg viewBox="0 0 200 120" role="img" aria-label="Call payoff: flat at zero until K, then rising"><line class="ax" x1="20" y1="100" x2="190" y2="100"/><line class="ax" x1="20" y1="10" x2="20" y2="100"/><polyline class="ln good" points="20,100 100,100 185,20"/><text x="96" y="114">K</text><text x="170" y="114">S_T</text><text x="120" y="40">max(0, S−K)</text></svg>
<svg viewBox="0 0 200 120" role="img" aria-label="Put payoff: falling to zero at K, then flat"><line class="ax" x1="20" y1="100" x2="190" y2="100"/><line class="ax" x1="20" y1="10" x2="20" y2="100"/><polyline class="ln bad" points="20,20 100,100 185,100"/><text x="96" y="114">K</text><text x="170" y="114">S_T</text><text x="30" y="40">max(0, K−S)</text></svg>
</div>
<p>Options matter in corporate finance for three reasons: firms use them to <b>hedge</b> rate, currency and commodity risk; firms <b>issue</b> option-like securities (employee stock options, warrants, convertible and callable bonds); and many investment decisions <b>are</b> options (real options, Units 5–6).</p>
<p><b>Everyday example:</b> paying $1,000 more at closing to lock a 30-year rate of 6% while you wait to close buys an option. The premium is $1,000 and the strike is 6%. It pays off if market rates rise above 6%, so it's like a call on interest rates.</p>` },
    { h: "Pricing by replication", html: `
<p>We can't observe an option's "correct" price because its payoff depends on future prices. But we can build a portfolio of the <b>stock plus risk-free borrowing or lending</b> that pays exactly what the option pays. With no arbitrage, the option must cost the same as that portfolio.</p>
<p><b>Example:</b> S = 100 goes to 160 or 80; K = 105; r = 10%. The call pays 55 or 0. Buy Δ shares and lend B:</p>
<div class="f">160Δ + 1.10B = 55 &nbsp;&nbsp; 80Δ + 1.10B = 0 &nbsp;⇒&nbsp; Δ = 0.6875, B = −50 &nbsp;⇒&nbsp; C = 100(0.6875) − 50 = 18.75</div>
<p>Buying 0.6875 shares and <b>borrowing</b> $50 copies the call exactly. A call is a levered position in the stock, which is why B is negative.</p>
<div class="f">Δ = (C<sub>u</sub> − C<sub>d</sub>)/(S<sub>u</sub> − S<sub>d</sub>) &nbsp;&nbsp; B = (C<sub>d</sub> − Δ·S<sub>d</sub>)/r*</div>` },
    { h: "Risk-neutral probabilities", html: `
<p>Rearranging the replication gives a shortcut:</p>
<div class="f">q = (r* − d)/(u − d) &nbsp;&nbsp;&nbsp; C<sub>0</sub> = [qC<sub>u</sub> + (1 − q)C<sub>d</sub>] / r*</div>
<p><b>q is a pricing weight, not a real probability.</b> The true probability p of an up move never appears. That's convenient, because p would require estimating the stock's expected return and risk premium. Replication already accounts for risk. In the example, q = (1.1 − 0.8)/(1.6 − 0.8) = 0.375 and C = 0.375 × 55/1.1 = 18.75, the same answer.</p>
<p><b>No-arbitrage condition:</b> d &lt; r* &lt; u. If the riskless return beat the stock's up move, you'd short the stock and lend for free money.</p>` },
    { h: "Building trees from volatility", html: `
<p>To use a real stock's volatility σ over N steps of length dt = T/N:</p>
<div class="f">u = e<sup>σ√dt</sup> &nbsp;&nbsp; d = 1/u &nbsp;&nbsp; r* = e<sup>r·dt</sup></div>
<p><b>Example:</b> S = K = 40, T = 0.5, σ = 31.557%, r = 3.96%. One step: u = 1.25, d = 0.80, r* = 1.02, q = 0.489, C = 0.489 × 10/1.02 = 4.79. Two steps (dt = 0.25) gives 3.52. More steps converge to Black-Scholes.</p>` },
    { h: "Black-Scholes", html: `
<div class="f">C = S·N(d<sub>1</sub>) − K e<sup>−rT</sup> N(d<sub>2</sub>) &nbsp;&nbsp; P = K e<sup>−rT</sup> N(−d<sub>2</sub>) − S·N(−d<sub>1</sub>)<br>d<sub>1</sub> = [ln(S/K) + (r + σ²/2)T]/(σ√T), &nbsp; d<sub>2</sub> = d<sub>1</sub> − σ√T</div>
<p>Inputs: S, K, T, r, σ. How each one moves a call's value:</p>
<ul>
<li><b>S up</b> or <b>K down</b>: the call is deeper in the money.</li>
<li><b>σ up</b>: more upside, and the downside is still capped at zero. <b>Volatility always helps the option holder.</b> This one idea drives real options and asset substitution later.</li>
<li><b>T up</b>: more time for good outcomes (and K is paid later).</li>
</ul>
<p><b>Example:</b> S = K = 50, T = 0.25, σ = 30%, r = 5% gives C = 3.29 and P = 2.67. Check with put-call parity: C − P = S − Ke<sup>−rT</sup> = 0.62.</p>` }
  ],
  cards: [
    { q: "Call vs put", a: "Call: right to buy at K; payoff max(0, S − K). Put: right to sell at K; payoff max(0, K − S)." },
    { q: "European vs American option", a: "European: exercise only at expiration. American: exercise any time up to expiration, so it's worth at least as much." },
    { q: "Without dividends, is an American call ever exercised early?", a: "No. It's worth more alive, so its value equals the European call's." },
    { q: "What is a replicating portfolio?", a: "Δ shares plus B in risk-free bonds chosen so the payoff matches the option in every state. With no arbitrage, option price = portfolio cost." },
    { q: "Formula for Δ in a one-step tree", a: "Δ = (C_u − C_d)/(S_u − S_d)." },
    { q: "For a call's replicating portfolio, is B positive or negative? What does it mean?", a: "Negative: you borrow. A call is a levered long position in the stock." },
    { q: "Risk-neutral probability q", a: "q = (r* − d)/(u − d). It's a pricing weight, not a real probability." },
    { q: "Why doesn't the true probability of an up move affect the option price?", a: "Replication prices the option off the stock and bonds directly. The stock price already reflects investors' risk preferences and expectations." },
    { q: "No-arbitrage condition for a binomial tree", a: "d < r* < u. Otherwise the stock or the bond dominates and there's free money." },
    { q: "u, d and r* from volatility over N steps", a: "u = e^(σ√(T/N)), d = 1/u, r* = e^(rT/N)." },
    { q: "Effect of higher volatility on an option's value", a: "It rises. There's more upside and the downside is still capped at zero." },
    { q: "Black-Scholes inputs", a: "S (underlying price), K (strike), T (time), r (risk-free rate), σ (volatility)." },
    { q: "What happens to a binomial price as N grows?", a: "It converges to the Black-Scholes price." },
    { q: "Mortgage rate lock: premium, strike and option type", a: "Premium = $1,000 paid at closing, strike = 6%. It pays off if rates rise above 6%, like a call on interest rates." }
  ],
  quiz: [
    { q: "S = 50 moves to 60 or 40. K = 50, r* = 1.00 (zero rate). What is the call worth?", c: ["10", "5", "0", "2.5"], a: 1, why: "q = (1 − 0.8)/(1.2 − 0.8) = 0.5. C = 0.5 × 10 + 0.5 × 0 = 5." },
    { q: "Same tree (50 → 60 or 40, K = 50, r* = 1). What is the replicating portfolio?", c: ["Buy 1 share, borrow 45", "Buy 0.5 shares, borrow 20", "Buy 0.5 shares, lend 20", "Buy 0.25 shares, borrow 7.5"], a: 1, why: "Δ = (10 − 0)/(60 − 40) = 0.5. B = (0 − 0.5 × 40)/1 = −20 (borrow). Cost = 25 − 20 = 5." },
    { q: "Same tree, now a put with K = 50. What is it worth?", c: ["5", "10", "0", "2.5"], a: 0, why: "The put pays 0 (up) or 10 (down). With q = 0.5: 0.5 × 10 = 5." },
    { q: "A tree has u = 1.25, d = 0.80 and a one-period riskless return r* = 1.30. What follows?", c: ["q = 1.11, which is fine", "There's an arbitrage: borrow nothing, short the stock and lend", "Calls are worth zero", "Puts are worth more than calls"], a: 1, why: "r* > u violates d < r* < u. The bond beats the stock in every state, so you short the stock and lend." },
    { q: "Which input does NOT affect the binomial price of an option?", c: ["The current stock price", "The risk-free rate", "The real probability of an up move", "The size of the up and down moves"], a: 2, why: "q depends on u, d and r*, not on the true probability p." },
    { q: "Holding everything else fixed, an increase in the underlying's volatility will…", c: ["raise the call and lower the put", "raise both the call and the put", "lower both", "have no effect on European options"], a: 1, why: "Both options gain from more upside while their downside stays capped at zero." },
    { q: "A homebuyer pays $1,000 to lock a 6% rate. If market rates rise to 7% before closing, the lock…", c: ["expires worthless", "pays off, because the buyer can borrow at 6%", "costs another $1,000", "converts into a put"], a: 1, why: "It's an option with strike 6%. It's in the money when rates rise above the strike." },
    { q: "In the 100 → 160/80, K = 105, r = 10% example, the call is worth 18.75. Suppose the real probability of the up move were 90% instead of 50%. The call is worth…", c: ["more than 18.75", "less than 18.75", "18.75", "it depends on investors' risk aversion"], a: 2, why: "Replication doesn't use p. Given the same S, u, d and r, the price is 18.75." }
  ]
});

window.UNITS.push({
  id: "u5",
  num: 5,
  title: "Real options I: flexibility and abandonment",
  blurb: "Why NPV misses flexibility, and how to value the right to walk away.",
  source: "Real Options deck · Air Jordan · PS2 Q4, Q6",
  lesson: [
    { h: "What NPV misses", html: `
<p>Standard NPV treats a project as a commitment: you take every outcome, good and bad. Real managers <b>respond to news</b>. They delay, expand, shrink, or walk away when conditions change. Real options put that flexibility into the valuation.</p>
<p>Types of real options:</p>
<ul>
<li><b>Abandonment</b>: sell off assets if the market turns down.</li>
<li><b>Timing</b>: wait to invest until uncertainty clears (Unit 6).</li>
<li><b>Follow-on investment</b>: a test phase opens a next stage (Unit 6).</li>
<li><b>Altering operations</b>: expand, contract or temporarily shut down.</li>
<li><b>Multiple interacting options</b>: value depends on how they combine.</li>
</ul>
<p>Two rules always hold. <b>Option value is never negative</b>, because the worst you can do with a right is not use it. And <b>standard NPV understates</b> projects that have flexibility.</p>` },
    { h: "A first example: Sammy's Souvenirs", html: `
<p>A factory costs $14B. It will earn $20B or $4B (50/50). Cost of capital 10%. Committing today: NPV = −14 + 12/1.1 = −3.09, so don't build. But if you can <b>wait a year</b> and see which state you're in, you build only in the good state: NPV = 0.5 × (−14 + 20/1.1) = 0.5 × 4.18 = <b>+1.90</b>. The flexibility turns a −3.09 project into a +1.90 opportunity.</p>
<p>That calculation is a <i>decision tree</i> discounted at the cost of capital. It's easy, but it usually <b>misprices</b> the option, as the next example shows.</p>` },
    { h: "Abandonment: Air Jordan", html: `
<p>Air Jordan, a start-up airline, costs $2.1M. In a year the firm is worth $3.2M (60%) or $1.25M. A traded comparable goes from $200 to $320 or $125, so its required return is (0.6 × 320 + 0.4 × 125)/200 − 1 = 21%. NPV = −2.1 + 2.42/1.21 = <b>−0.1M</b>.</p>
<p>Now add the right to sell the planes for <b>$1.75M</b> if demand is low. The down-state payoff becomes max(1.25, 1.75) = 1.75. An abandonment option is a <b>put</b> on the project with a strike equal to the salvage value.</p>
<p>Value it by replication, using the comparable and 8% bonds:</p>
<div class="f">Δ = (3.2M − 1.75M)/(320 − 125) = 7,435.9 &nbsp;&nbsp; B = (1.75M − 125Δ)/1.08 = 759,734<br>V = 200Δ + B = <b>$2.247M</b> &nbsp;⇒ option = 2.247 − 2.0 = $0.247M; NPV = 2.247 − 2.1 = <b>+$0.147M</b></div>
<p>Risk-neutral pricing gives the same answer: u ≈ 1.6, d ≈ 0.625 (from σ = 47%), r* ≈ 1.08, q = 0.467, V = [0.467(3.2) + 0.533(1.75)]/1.08 = 2.247.</p>` },
    { h: "Why the 21% rate is wrong once there's an option", html: `
<p>The comparable's 21% reflects the risk of bearing every outcome. The option <b>cuts off the downside</b>, so the flexible project has less systematic risk. Its risk is the comparable's beta scaled by Δ·S/P:</p>
<div class="f">E[R] = 8% + 13% × 0.7436 × (2/2.247) ≈ <b>16.6%</b>, not 21%</div>
<p>Discounting the flexible cash flows (2.62 expected) at 21% gives 2.165, which <b>understates</b> the value. That's the general flaw of decision trees at the WACC: flexibility changes the risk, so the old discount rate no longer applies. Option pricing handles this automatically.</p>` },
    { h: "Two problem-set variations", html: `
<p><b>Known cash flows (PS2 Q4).</b> With no uncertainty there's no tree, just a stopping rule: <b>keep operating while the PV of the remaining cash flows is positive</b>. After-tax flows are positive through year 6 and negative after, so abandon after year 6. NPV goes from −0.52 (run all 10 years) to +1.77.</p>
<p><b>Replicating with forwards (PS2 Q6).</b> A mine extracts at $0.80/lb, so at a $0.50 price it shuts down (payoff 0) and at $0.90 it earns 0.10 × 175,000 = 17,500. Copy that with copper forwards (struck at 0.60) plus bonds: n = 43,750 lb long and B = 4,166.67. <b>Forwards cost nothing to enter</b>, so the mine is worth just the bonds: $4,166.67. Without the option, its CE value would be −33,333.</p>` },
    { h: "The cookbook", html: `
<ol>
<li>Estimate the base-case PV with no flexibility: identify the underlying asset, its expected cash flows and discount rate, and subtract the investment.</li>
<li>Identify the flexibility: where does it add value, and what are the payoffs at the decision date?</li>
<li>Build u, d and q from σ and r<sub>f</sub> (or replicate with a traded comparable).</li>
<li>Value the flexible payoffs with q and r<sub>f</sub>. Option value = value with flexibility − value without.</li>
</ol>` }
  ],
  cards: [
    { q: "Why does standard NPV understate projects with flexibility?", a: "It assumes you commit to every outcome. Flexibility lets managers cut off bad states and keep good ones, which adds value." },
    { q: "Five types of real options", a: "Abandonment, timing (delay), follow-on investment, altering operations (expand/contract/shut down), and multiple interacting options." },
    { q: "Can a real option have negative value?", a: "No. The worst you can do with a right is not use it, so option value ≥ 0." },
    { q: "An abandonment option is most like which financial option?", a: "A put on the project, with strike equal to the salvage value." },
    { q: "How do you compute the value of a real option?", a: "Value of the project with the option − value without it (the standard NPV value)." },
    { q: "Why can't you discount the flexible project's cash flows at the comparable's rate?", a: "The option removes downside risk, so the flexible project has less systematic risk than the comparable. The comparable's rate overstates risk and undervalues the project." },
    { q: "Air Jordan's discount rate with the abandonment option", a: "About 16.6%: 8% + 13% × Δ(0.7436) × S/P (2/2.247), vs 21% without the option." },
    { q: "Decision trees at the cost of capital vs risk-neutral pricing", a: "Decision trees are simple but usually undervalue options because the cost of capital overstates the risk left after flexibility. Risk-neutral pricing fixes this." },
    { q: "Sammy's factory: NPV committed vs with the option to wait", a: "Committed: −3.09. With the option to wait: +1.90, because you build only in the good state." },
    { q: "Stopping rule when cash flows are known (PS2 Q4)", a: "Keep operating while the PV of all remaining cash flows is positive; abandon at the point after which it turns negative." },
    { q: "Why is a tracking portfolio of forwards + bonds worth only the bonds?", a: "Forward contracts cost nothing to enter, so the only position with a price today is the bond holding." },
    { q: "Real-options cookbook in four steps", a: "1) Base-case PV and NPV. 2) Identify the flexibility and terminal payoffs. 3) Build q from u, d, σ, r_f. 4) Value with q and r_f; option = with − without." }
  ],
  quiz: [
    { q: "A factory costs 14, pays 20 or 4 (50/50) in a year, cost of capital 10%. If you can wait a year to decide, what is the opportunity worth today?", c: ["−3.09", "0", "+1.90", "+4.18"], a: 2, why: "Build only in the good state: 0.5 × (−14 + 20/1.1) = 0.5 × 4.18 = 1.90." },
    { q: "Air Jordan is worth $2.247M with the abandonment option and $2.0M without it. The investment is $2.1M. What's the value of the abandonment option?", c: ["$0.147M", "$0.247M", "−$0.1M", "$2.247M"], a: 1, why: "Option value = with − without = 2.247 − 2.0 = 0.247. (NPV with the option is 0.147.)" },
    { q: "An option to sell a project's assets for a fixed amount if things go badly is most like…", c: ["a call on the project", "a put on the project", "a forward contract", "a riskless bond"], a: 1, why: "It's the right to sell at a strike (the salvage value), which is a put." },
    { q: "An analyst values Air Jordan's flexible payoffs (3.2 or 1.75) by discounting their expected value at the comparable's 21%. The result will be…", c: ["exactly right", "too high", "too low", "too high or too low, depending on the risk-free rate"], a: 2, why: "The option lowers the project's risk, so 21% is too high a rate (the correct one is about 16.6%). 2.62/1.21 = 2.165 < 2.247." },
    { q: "A project's after-tax cash flows are known: +2, +3, +1, −1, −1, −2. It can be abandoned at any time for free. When should it stop?", c: ["Never, since total cash flow is positive", "After year 3", "After year 1", "After year 6"], a: 1, why: "After year 3 every remaining cash flow is negative, so the PV of continuing is negative." },
    { q: "A mine's payoff (with the option to shut down) is copied by a long forward position plus $4,166.67 of bonds. What is the mine worth?", c: ["$4,166.67", "$4,166.67 plus the value of the forwards", "$17,500/1.05", "Zero, because forwards are a hedge"], a: 0, why: "Forwards cost nothing to enter, so the tracking portfolio costs only the bonds." },
    { q: "Which statement about real options is FALSE?", c: ["They can be priced with the same tools as financial options", "Their value is always at least zero", "They raise the risk of a project, so you should discount at a higher rate", "Standard NPV tends to understate projects that contain them"], a: 2, why: "Options like abandonment cut the downside, which lowers risk. The appropriate discount rate falls, not rises." }
  ]
});
