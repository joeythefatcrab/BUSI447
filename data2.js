/* BUSI 447 study content, units 6-10. */
window.UNITS = window.UNITS || [];

window.UNITS.push({
  id: "u6",
  num: 6,
  title: "Real options II: timing, land and growth",
  blurb: "When to wait, why empty land is expensive, and options that come from other projects.",
  source: "Real Options deck · Arundel · PS2 Q1, Q2, Q5",
  lesson: [
    { h: "Investing is exercising a call", html: `
<p>An opportunity you can take now or later is a call option. The <b>underlying</b> is the PV of the project's cash flows, the <b>strike</b> is the investment cost, and the <b>expiration</b> is when the right lapses (a lease, a patent, competitors moving in).</p>
<p>More precisely, a positive-NPV project you can delay is an <b>in-the-money American call on a dividend-paying stock</b>. The "dividends" are the cash flows you miss while you wait. That sets up the trade-off:</p>
<ul>
<li><b>Waiting</b> keeps the value of volatility. You get to see how things turn out and invest only in good states.</li>
<li><b>Investing now</b> captures the cash flows the project would produce in the meantime.</li>
</ul>
<p>So <b>high volatility favors waiting</b> and <b>large missed cash flows favor investing now</b>. Without uncertainty, you'd just pick the date with the highest NPV today.</p>` },
    { h: "OPEK and the Europe expansion", html: `
<p><b>OPEK:</b> an oil field costs $1,800 and produces 10 barrels a year forever. Oil is $20 and moves ×1.25 or ×0.8 each year; cost of capital 10%, r<sub>f</sub> 5%. Today S = 10 × 20/0.10 = 2,000, so investing now earns NPV = 200. Next year S is 2,500 or 1,600. Waiting pays max(0, S − 1,800): 700 or 0. With q = (1.05 − 0.8)/(1.25 − 0.8) = 0.556, waiting is worth 0.556 × 700/1.05 = <b>370 &gt; 200, so wait</b>.</p>
<p><b>Europe (PS2 Q5):</b> invest 180 now (worth 197.92 including year-1 cash of 25, NPV +17.92) or wait. Treating the 25 as a dividend gives q = 0.552, and waiting is worth 0.552 × 70/1.05 = <b>36.81</b>, so wait. Part (c) is the key intuition: if the weak state were worth 185 instead of 100, the investment is profitable in <b>both</b> states. Waiting would protect against nothing and would cost the 25, so invest now. <b>Waiting only has value if there's a state where you'd decide not to invest.</b></p>` },
    { h: "Why parking lots are expensive", html: `
<p>Sheridan Titman asked why downtown parking lots sell for so much when they earn so little. Vacant land is a <b>call option on development</b>: the underlying is the value of a future building and the strike is the construction cost. The land's value comes from <b>uncertainty plus the ability to wait</b>, and from the choice of <i>what</i> to build.</p>
<p><b>Condo lot (lecture):</b> 6 units at $80k or 9 units at $90k each, price $100k, moving to $120k or $90k, $8k rent per unit, r<sub>f</sub> 12%. Build today: 6 units is best (120k). Next year: 9 units in the good state (270k), 6 in the bad (60k). Rent is a dividend: 100(1.12) = q(128) + (1 − q)(98), so q = 0.467. Land = [0.467(270) + 0.533(60)]/1.12 = <b>$141k</b> &gt; $120k. Wait.</p>
<p><b>PS2 Q2:</b> the same idea with σ = 20% and a two-step tree gives a lot worth $736k versus $600k for building now.</p>` },
    { h: "Follow-on investments: Mark I opens Mark II", html: `
<p>Some projects are worth taking mainly because they open doors. Mark I has NPV −46.45 at 20%. Launching it creates the right to launch Mark II in year 3 by investing 900, for cash flows worth 463 today (800 at year 3), with σ = 35%. That right is a call, priced with Black-Scholes:</p>
<div class="f">C = 463·N(−0.299) − 900e<sup>−0.3</sup>·N(−0.905) = 55.27 &nbsp;⇒&nbsp; −46.45 + 55.27 = <b>+8.82</b>: launch Mark I</div>
<p>Both projects have negative stand-alone NPVs, but launching Mark I is right because it buys the right, not the obligation, to launch Mark II. Use S = PV <i>today</i> (463, not 800) and discount K at the risk-free rate.</p>` },
    { h: "Expansion options and Arundel", html: `
<p><b>Expansion</b> pays max(0, x·V − cost) at the decision date. In the lecture (V = 1,000, +10% for $100), expansion pays only if V &gt; 1,000, and the option is worth 4.33. In PS2 Q1 (+30% for $30M on V = 50) it pays only if V more than doubles to 100, so the option is worth just $0.30M and doesn't rescue the −$4M project. <b>A deep out-of-the-money option is worth little.</b></p>
<p><b>Arundel (Case 2):</b> sequel rights are calls. You make the sequel only if the original succeeds. Across all films, the average sequel NPV is about −$1M, yet the rights are valuable because you exercise only the winners: E[max(0, X)] ≥ max(0, E[X]). For Disney's films, always producing gives $12.56M per film; producing only positive-NPV sequels gives $17.68M. Buying the whole slate <b>in advance</b> prevents adverse selection: film by film, the studio (which knows more) would keep the likely hits.</p>` }
  ],
  cards: [
    { q: "An investment opportunity you can delay is like which option?", a: "An American call on a dividend-paying stock. Underlying = PV of the project, strike = investment cost, dividends = cash flows missed while waiting." },
    { q: "Trade-off in the timing option", a: "Waiting keeps the value of volatility; investing now captures the interim cash flows. High σ favors waiting; large missed cash flows favor investing now." },
    { q: "When does the option to wait have no value?", a: "When the investment would be made in every state anyway (PS2 Q5c). Waiting then only loses the interim cash flows." },
    { q: "OPEK: invest now vs wait", a: "Invest now NPV = 2,000 − 1,800 = 200. Wait = 0.556 × 700/1.05 = 370. Wait." },
    { q: "Why are parking lots expensive?", a: "Vacant land is a call on future development (underlying = building value, strike = construction cost). Value comes from uncertainty, waiting, and the choice of what to build." },
    { q: "How do you treat rent in the condo-lot tree?", a: "As a dividend: S_0 × r* = q(S_u + D) + (1 − q)(S_d + D)." },
    { q: "What gives the condo lot its value beyond building today?", a: "Choosing when to build and what to build: 9 units in good states, 6 in bad ones. $141k vs $120k for building today." },
    { q: "Mark I / Mark II lesson", a: "A negative-NPV first stage can be worth taking for the option it creates. −46.45 + 55.27 = +8.82." },
    { q: "In Mark II's Black-Scholes, what are S and K?", a: "S = 463, the PV today of Mark II's cash flows (not 800 at t = 3). K = 900, discounted at the risk-free rate over 3 years." },
    { q: "Payoff of an option to expand by x% at a cost", a: "max(0, x·V − cost) at the decision date. You expand only if the added value exceeds the cost." },
    { q: "Why was PS2 Q1's expansion option worth only $0.30M?", a: "It's deep out of the money: V must double from 50 to 100 before 0.3V exceeds the $30M cost." },
    { q: "Why can sequel rights be valuable when the average sequel has negative NPV?", a: "You exercise only the winners. E[max(0, X)] ≥ max(0, E[X])." },
    { q: "Why did Arundel want to buy a whole slate of rights in advance?", a: "To avoid adverse selection. Once production starts, the studio knows more and would keep the likely hits and sell the duds." },
    { q: "Contract terms Arundel should insist on", a: "Broad definition of sequel (prequels, spin-offs), named exclusions before production, escrow/milestone payments, a clear exercise window, freedom to resell rights, and some studio profit share." }
  ],
  quiz: [
    { q: "Investing now has NPV 200. The option to wait a year is worth 370. What should the firm do, and what is the timing option worth?", c: ["Invest now; worth 200", "Wait; the flexibility adds 170 over investing now", "Wait; worth 570", "Indifferent"], a: 1, why: "Take the larger of 200 and 370. Flexibility is worth 370 − 200 = 170 more than committing now." },
    { q: "The underlying's volatility rises. What happens to the value of waiting to invest?", c: ["It rises", "It falls", "No change", "It depends on whether the project is in the money"], a: 0, why: "Like any option, the value of waiting rises with volatility: more chance of a great outcome, and the bad outcome is still avoided." },
    { q: "The cash flows a project would produce while you wait get much larger. What happens?", c: ["Waiting becomes more attractive", "Investing now becomes more attractive", "No change", "The option's strike falls"], a: 1, why: "Those are the 'dividends' you give up by waiting. Bigger dividends mean exercise early." },
    { q: "In PS2 Q5(c), the weak-demand value rises from 100 to 185 while the investment stays at 180. What should the firm do?", c: ["Wait, because the upside is still uncertain", "Invest now", "Never invest", "Wait two years"], a: 1, why: "The investment is in the money in both states, so waiting protects nothing and costs the year-1 cash flow." },
    { q: "Vacant downtown land is valuable mainly because…", c: ["parking generates large cash flows", "it's a call on future development whose value comes from uncertainty and the ability to wait", "land always appreciates at the risk-free rate", "zoning makes it riskless"], a: 1, why: "Titman's real-options view: underlying = future building value, strike = construction cost." },
    { q: "Mark II's cash flows are worth 800 at year 3 and 463 today. In Black-Scholes, S should be…", c: ["800", "463", "900", "800 discounted at the risk-free rate"], a: 1, why: "S is the current value of the underlying: the PV today at the project's own discount rate." },
    { q: "Across 99 films, the average hypothetical sequel has NPV of about −$1M. Sequel rights are…", c: ["worthless, since the average NPV is negative", "valuable, because you only make the sequels that turn out positive", "worth exactly −$1M per film", "valuable only if the studio produces them"], a: 1, why: "Options pay E[max(0, X)], which can be positive even when E[X] < 0." },
    { q: "Why would a studio's per-film offer of sequel rights, made after production starts, be a bad deal for Arundel?", c: ["Prices are higher later because of inflation", "Adverse selection: the studio knows more and sells rights mainly to weaker films", "Sequels can't be valued after production starts", "The options expire sooner"], a: 1, why: "Buying the whole slate in advance removes the studio's information advantage." }
  ]
});

window.UNITS.push({
  id: "u7",
  num: 7,
  title: "Capital structure: MM and taxes",
  blurb: "Why financing doesn't matter in perfect markets, and why taxes change that.",
  source: "Capital Structure, Taxes & Bankruptcy deck",
  widget: "mm",
  lesson: [
    { h: "The question", html: `
<p>Capital structure is the mix of securities a firm uses to finance its assets. The two key ratios are debt-to-capital (D/V) and debt-to-equity (D/E). Most investment is funded internally from retained profits, especially at large firms, but the choice of external financing (banks, bonds, IPOs and SEOs, private placements, VC) still matters a great deal.</p>
<p>To see what <i>should</i> matter, start from a world where nothing does, then add frictions one at a time.</p>` },
    { h: "Modigliani-Miller in perfect markets", html: `
<p>Assume no taxes, no transaction or bankruptcy costs, no conflicts between stockholders and bondholders, and perfect information.</p>
<div class="f"><b>MM Proposition 1:</b> V<sub>L</sub> = V<sub>U</sub> &nbsp;&nbsp; <b>MM Proposition 2:</b> r<sub>E</sub> = r<sub>A</sub> + (r<sub>A</sub> − r<sub>D</sub>)·D/E, &nbsp; WACC = r<sub>A</sub></div>
<p><b>Prop 1:</b> the size of the pie doesn't depend on how you slice it. The assets produce the same cash flows however they're financed.</p>
<p><b>Prop 2:</b> debt is <i>leverage</i>. Debtholders are paid first, so fewer equity dollars carry the same business risk. Equity's expected return rises with D/E, and so does its risk. The two effects offset and the WACC stays at r<sub>A</sub>. The same holds for betas: β<sub>E</sub> = β<sub>A</sub> + (β<sub>A</sub> − β<sub>D</sub>)D/E.</p>
<p><b>Coffee robot:</b> invest 800 for 1,400 or 900 (50/50); required return 15%, r<sub>f</sub> 5%. V = 1,150/1.15 = 1,000. All equity: r<sub>E</sub> = 15%. Borrow 500 at 5% (owe 525): equity gets 875 or 375 on 500, so r<sub>E</sub> = 25% = 15% + (15% − 5%)(500/500). WACC = ½(25%) + ½(5%) = 15%. Unchanged.</p>` },
    { h: "Adding corporate taxes", html: `
<p>Interest is tax-deductible; dividends aren't. So debt lets more of the same operating income reach investors.</p>
<p><b>Water Products:</b> EBIT $1M a year, t = 30%. With no debt, investors get 700k. With $2M of debt at 10%: interest 200k, taxes 240k, equity gets 560k, so investors in total get <b>760k</b>. The extra 60k = t × interest is the annual <b>tax shield</b>.</p>
<div class="f">PV(tax shield) = t·r<sub>D</sub>·D / r<sub>D</sub> = t·D &nbsp;⇒&nbsp; V<sub>L</sub> = V<sub>U</sub> + t·D</div>
<p>V<sub>U</sub> = 700k/12.5% = 5.6M, so V<sub>L</sub> = 5.6 + 0.6 = 6.2M and E = 4.2M. Shareholders who receive 2M in the buyback plus 4.2M in equity hold 6.2M &gt; 5.6M.</p>
<div class="f">r<sub>E</sub> = r<sub>A</sub> + (r<sub>A</sub> − r<sub>D</sub>)(1 − t)D/E &nbsp;&nbsp; WACC = (E/V)r<sub>E</sub> + (D/V)r<sub>D</sub>(1 − t) = r<sub>A</sub>(1 − t·D/V)</div>
<p>With taxes, the WACC <b>falls</b> as debt rises (12.5% → 11.29% for Water Products). Taken literally, MM with taxes says to finance almost entirely with debt. Unit 8 explains why firms don't.</p>` },
    { h: "\"Paying $1 to save 30 cents\"", html: `
<p>A common confusion: "Interest of $1 saves only $0.30 of tax, so debt makes the firm $0.70 worse off." The mistake is comparing paying $1 with paying nothing. The real comparison is paying investors $1 as <b>interest</b> (deductible) versus $1 as <b>dividends</b> (not deductible). Either way the money goes to the firm's investors. With debt, the government takes $0.30 less, so the total pie for investors grows. That's why the after-tax cost of debt is r<sub>D</sub>(1 − t).</p>` }
  ],
  cards: [
    { q: "MM perfect-market assumptions", a: "No taxes, no transaction or bankruptcy costs, no stockholder–bondholder agency costs, perfect information." },
    { q: "MM Proposition 1 (no taxes)", a: "V_L = V_U. Firm value doesn't depend on capital structure: the size of the pie doesn't depend on how it's sliced." },
    { q: "MM Proposition 2 (no taxes)", a: "r_E = r_A + (r_A − r_D)D/E. The cost of equity rises with leverage; WACC stays at r_A." },
    { q: "Why does leverage raise the required return on equity?", a: "Debt is paid first, so the same business risk lands on fewer equity dollars. Equity's returns become more volatile, so investors require more." },
    { q: "Levered beta formula (no taxes)", a: "β_E = β_A + (β_A − β_D)(D/E)." },
    { q: "MM Proposition 1 with corporate taxes", a: "V_L = V_U + t·D (for permanent debt). PV of the tax shield = t·r_D·D/r_D = t·D." },
    { q: "MM Proposition 2 with corporate taxes", a: "r_E = r_A + (r_A − r_D)(1 − t)D/E." },
    { q: "WACC with taxes", a: "WACC = (E/V)r_E + (D/V)r_D(1 − t) = r_A(1 − t·D/V). It falls as debt rises." },
    { q: "Annual interest tax shield", a: "t × interest = t × r_D × D. Water Products: 0.30 × 10% × $2M = $60k." },
    { q: "Where does the value of the tax shield come from?", a: "The government takes less. Interest is deductible and dividends aren't, so more operating cash reaches debt + equity holders." },
    { q: "Rebut: 'Paying $1 of interest to save $0.30 in tax is a loss.'", a: "The comparison isn't $1 vs $0. It's $1 to investors as interest (deductible) vs $1 as dividends (not). Debt shrinks the government's slice." },
    { q: "Coffee robot: r_E all-equity vs with 500 of debt", a: "15% all-equity; 25% with 500 debt at 5%. WACC stays 15% (no taxes)." }
  ],
  quiz: [
    { q: "No taxes. r_A = 10%, r_D = 5%, D/E = 1. What is r_E?", c: ["10%", "12.5%", "15%", "20%"], a: 2, why: "r_E = 10% + (10% − 5%) × 1 = 15%." },
    { q: "Same firm but with a 40% corporate tax rate. What is r_E?", c: ["15%", "13%", "11%", "12%"], a: 1, why: "r_E = 10% + (5%)(1 − 0.4)(1) = 13%." },
    { q: "r_A = 10%, t = 40%, D/V = 50%. What is the WACC?", c: ["10%", "8%", "6%", "9%"], a: 1, why: "WACC = r_A(1 − t·D/V) = 10%(1 − 0.2) = 8%." },
    { q: "An all-equity firm is worth 100. It issues 50 of permanent debt to buy back stock, with t = 30%. What is the firm worth?", c: ["100", "115", "130", "85"], a: 1, why: "V_L = V_U + tD = 100 + 0.3 × 50 = 115." },
    { q: "In perfect markets, a firm swaps equity for debt. Which statement is correct?", c: ["Firm value rises because debt is cheaper", "WACC falls", "The cost of equity rises but WACC and firm value are unchanged", "The cost of debt rises to equal the cost of equity"], a: 2, why: "MM: cheaper debt is exactly offset by riskier, more expensive equity." },
    { q: "Which relaxation of MM's assumptions makes debt valuable in the course's first extension?", c: ["Bankruptcy costs", "Corporate taxes", "Information asymmetry", "Transaction costs"], a: 1, why: "Interest deductibility creates the tax shield, V_L = V_U + tD." },
    { q: "Water Products: with $2M debt at 10% and t = 30%, total cash to investors rises from 700k to 760k because…", c: ["EBIT rises with leverage", "the government collects 60k less in taxes", "debtholders accept a lower return", "dividends are tax-deductible"], a: 1, why: "Interest of 200k shields 0.3 × 200k = 60k from tax." },
    { q: "Coffee robot: worth 1,000, financed with 500 of debt at 5% (owe 525). Payoffs are 1,400 or 900 (50/50). What is equity's expected return?", c: ["15%", "20%", "25%", "30%"], a: 2, why: "Equity gets 875 or 375 on 500: ½(75%) + ½(−25%) = 25%." }
  ]
});

window.UNITS.push({
  id: "u8",
  num: 8,
  title: "Trade-off theory and financial distress",
  blurb: "Why firms don't borrow to the hilt, and how to predict distress.",
  source: "Capital Structure deck · Rice-A-Roni · Nadir",
  lesson: [
    { h: "Why not 100% debt?", html: `
<p>If debt adds t·D of value, why don't firms borrow as much as possible? The <b>static trade-off theory</b>: each extra dollar of debt brings a tax benefit but raises the <b>expected cost of financial distress</b>. The firm picks the debt level where total value is highest, which is where marginal benefit equals marginal cost.</p>
<div class="f">V<sub>L</sub> = V<sub>U</sub> + PV(interest tax shield) − PV(expected financial distress costs)</div>
<p>Tax benefits also <b>shrink</b> at high debt: deduction limits, losses that leave no income to shield, and lower marginal tax rates.</p>
<svg class="wide" viewBox="0 0 320 170" role="img" aria-label="Firm value versus debt. The dashed line V_U plus tD rises steadily; actual value rises, peaks at D star, then falls as distress costs grow."><line class="ax" x1="30" y1="150" x2="310" y2="150"/><line class="ax" x1="30" y1="10" x2="30" y2="150"/><polyline class="ln muted dash" points="30,115 295,25"/><line class="ln muted thin" x1="30" y1="115" x2="305" y2="115"/><polyline class="ln accent" points="30,115 80,95 130,82 170,78 210,82 250,95 295,118"/><line class="ln accent thin dash" x1="170" y1="78" x2="170" y2="150"/><text x="250" y="22">V_U + tD</text><text x="270" y="110">V_U</text><text x="160" y="164">D*</text><text x="280" y="164">Debt</text><text x="36" y="20">Firm value</text></svg>` },
    { h: "Expected cost of distress", html: `
<div class="f">E[distress cost | D] = Pr(default | D) × cost of bankruptcy</div>
<p>What matters is the <i>expected</i> cost: both the probability of default at a given debt level and how costly default would be. If bankruptcy were costless (assets passed cleanly from stockholders to bondholders), it wouldn't affect capital structure.</p>
<ul>
<li><b>Direct costs</b> (lawyers, wasted effort, fire-sale prices on assets) are small: about 3–5% of an already reduced firm value.</li>
<li><b>Indirect costs</b> are much larger: customers leave (nobody wanted to rent from Hertz in bankruptcy), suppliers demand cash up front, and employees lose motivation or demand higher pay.</li>
</ul>
<p><b>Glover's point:</b> the costs observed in firms that actually default <i>understate</i> what the average firm would lose. Firms don't default at random. Firms with low default costs choose high leverage, so defaulters are a selected sample.</p>` },
    { h: "Finding the optimum", html: `
<p><b>Rice-A-Roni:</b> V<sub>U</sub> = 100, t = 20%, bankruptcy cost 20. D = 20 with Pr = 10%: 100 + 4 − 2 = <b>102</b>. D = 40 with Pr = 35%: 100 + 8 − 7 = 101. The optimum is D = 20.</p>
<p><b>Nadir:</b> V = 12, bankruptcy cost 5, the tax rate falls 2 points per $1M of debt, and Pr(default) rises 2.5 points. Value peaks at D = 7: 12 + 0.28 × 7 − 0.175 × 5 = <b>13.085</b>. Going from 7 to 8 adds 0.12 of tax benefit but 0.125 of expected distress, so stop at 7.</p>` },
    { h: "Predicting distress", html: `
<p><b>Bond ratings</b> predict default for public firms. <i>Marginal</i> default = probability of default at year X; <i>cumulative</i> = probability of default up to and including year X. Ten-year cumulative default: BBB 6.25%, CCC about 60%.</p>
<p>For unrated firms, <b>Altman's Z-score</b>:</p>
<div class="f">Z = 1.2·(WC/TA) + 1.4·(RE/TA) + 3.3·(EBIT/TA) + 0.6·(MVE/TL) + 1.0·(Sales/TA)</div>
<p>Z ≥ 2.99 is safe, 1.8–2.99 grey, ≤ 1.8 distress. Chevron scores 4.53; Golden Minerals 0.49. It was built for <b>tangible manufacturing firms</b>, so it fits tech and service firms with intangible assets poorly, and it penalizes leverage heavily.</p>` },
    { h: "What the theory predicts, and where it fails", html: `
<p>Predictions: <b>more profitable firms</b> should borrow more (more income to shield), and firms with <b>fewer hard assets</b> should borrow less (higher distress costs).</p>
<p>Problems: distress costs are often indirect and hard to measure; the <b>most profitable firms borrow least</b> and many firms have <b>zero debt</b>; and the theory ignores the cost of issuing securities. Units 9 and 10 fill these gaps.</p>` }
  ],
  cards: [
    { q: "Static trade-off theory", a: "Firms balance the tax benefits of debt against the expected costs of financial distress, choosing the debt level that maximizes total value." },
    { q: "Firm value under the trade-off theory", a: "V_L = V_U + PV(interest tax shield) − PV(expected distress costs)." },
    { q: "Expected cost of distress", a: "Pr(default | D) × cost of bankruptcy. Both pieces matter." },
    { q: "Direct vs indirect bankruptcy costs", a: "Direct: lawyers, fire-sale prices, wasted effort; about 3–5% of value. Indirect: lost customers (Hertz), suppliers demanding cash, worker flight; much larger." },
    { q: "Why do tax benefits of debt shrink at high debt levels?", a: "Deduction limits, insufficient income to shield (losses), and lower marginal tax rates." },
    { q: "Rice-A-Roni's optimal debt", a: "D = 20: V = 100 + 0.2(20) − 0.10(20) = 102, vs 101 at D = 40." },
    { q: "Marginal rule for the optimal debt level", a: "Add debt while the extra tax benefit exceeds the extra expected distress cost (Nadir stops at 7: +0.12 vs +0.125)." },
    { q: "Marginal vs cumulative default probability", a: "Marginal: probability of default in year X. Cumulative: probability of default by year X." },
    { q: "Altman Z-score zones", a: "Z ≥ 2.99 safe; 1.8 < Z < 2.99 grey; Z ≤ 1.8 distress." },
    { q: "Limitations of the Z-score", a: "Built for tangible manufacturers; fits tech and service firms poorly; heavily penalizes leverage." },
    { q: "Glover's insight on default costs", a: "Costs observed among defaulting firms understate the average firm's cost, because firms with low default costs select into high leverage." },
    { q: "Two predictions and two failures of trade-off theory", a: "Predicts: profitable firms and hard-asset firms borrow more. Fails: most profitable firms borrow least; many firms have zero debt; ignores issuance costs." }
  ],
  quiz: [
    { q: "V_U = 100, t = 20%, bankruptcy cost = 20. Debt of 20 has Pr(default) 10%; debt of 40 has 35%. Which debt level maximizes value?", c: ["0", "20", "40", "They're all equal"], a: 1, why: "0 → 100; 20 → 100 + 4 − 2 = 102; 40 → 100 + 8 − 7 = 101." },
    { q: "Going from $7M to $8M of debt adds $0.12M of tax benefit and $0.125M of expected distress cost. What should the firm do?", c: ["Add the debt", "Stop at $7M", "Cut debt to zero", "Add debt until the tax rate reaches zero"], a: 1, why: "Marginal cost exceeds marginal benefit, so value peaks at $7M." },
    { q: "Which is an indirect cost of financial distress?", c: ["Bankruptcy lawyers' fees", "Customers avoiding the firm's products", "Court filing fees", "Selling assets at auction"], a: 1, why: "Lost customers (like Hertz renters) are business disruption, the larger, indirect cost." },
    { q: "A firm's Altman Z-score is 1.5. It is in the…", c: ["safe zone", "grey zone", "distress zone", "Z-scores below 2 are undefined"], a: 2, why: "Z ≤ 1.8 is the distress zone." },
    { q: "For which firm is the Altman Z-score least appropriate?", c: ["A steel manufacturer", "An auto-parts maker", "A software company with mostly intangible assets", "A paper mill"], a: 2, why: "Z was built for tangible manufacturers; intangible-heavy firms are a poor fit." },
    { q: "Under the static trade-off theory, highly profitable firms should…", c: ["borrow less, since they don't need money", "borrow more, since they have more income to shield", "issue equity", "hold more cash"], a: 1, why: "That's the prediction. Empirically the opposite often holds, which is a problem for the theory." },
    { q: "Why do default costs measured among firms that actually defaulted understate the average firm's cost?", c: ["Accounting rules hide the costs", "Selection: firms with low default costs choose high leverage and are the ones that default", "Courts reduce costs over time", "They don't; they overstate it"], a: 1, why: "Glover's argument: default isn't random, so the sample is selected." }
  ]
});

window.UNITS.push({
  id: "u9",
  num: 9,
  title: "Debt–equity conflicts",
  blurb: "Debt overhang, asset substitution and reluctance to liquidate.",
  source: "Conflicts deck · house · Linn Energy",
  lesson: [
    { h: "Equity is a call on the firm", html: `
<p>With debt of face value D in place, equity holders get what's left after debt is paid, and limited liability caps their loss at zero:</p>
<div class="f">Equity = max(0, V − D) &nbsp;&nbsp; Debt = min(V, D)</div>
<p>So <b>equity is a call option on the firm's assets with strike equal to the face value of the debt</b>. That one idea explains all three conflicts: shareholders maximize the value of their call, not the value of the whole firm. When debt is risky, those two goals can point in different directions.</p>
<div class="svgrow">
<svg viewBox="0 0 200 120" role="img" aria-label="Debt payoff rises with firm value up to D, then flat"><line class="ax" x1="20" y1="100" x2="190" y2="100"/><line class="ax" x1="20" y1="10" x2="20" y2="100"/><polyline class="ln accent" points="20,100 100,40 185,40"/><text x="96" y="114">D</text><text x="176" y="114">V</text><text x="115" y="32">Debt: min(V, D)</text></svg>
<svg viewBox="0 0 200 120" role="img" aria-label="Equity payoff zero until V equals D, then rising"><line class="ax" x1="20" y1="100" x2="190" y2="100"/><line class="ax" x1="20" y1="10" x2="20" y2="100"/><polyline class="ln good" points="20,100 100,100 185,20"/><text x="96" y="114">D</text><text x="176" y="114">V</text><text x="30" y="40">Equity: max(0, V − D)</text></svg>
</div>
<p>The general accounting rule for any decision: <b>ΔE = NPV − ΔD</b>. Shareholders gain the project's NPV minus whatever part of it flows to the debtholders.</p>` },
    { h: "Debt overhang", html: `
<p><b>Shareholders pass up positive-NPV projects because existing debtholders would capture most of the gain.</b></p>
<p><b>Example:</b> a house worth $300k has a $350k mortgage. A $10k kitchen remodel adds $50k of value, so NPV = +40k. After the remodel, the house is worth 350k, so the debt's value rises from 300k to 350k (ΔD = +50k). The owner's equity is still zero. ΔE = 40 − 50 = <b>−10k</b>: the owner pays 10k and gets nothing back, so the remodel doesn't happen.</p>
<p><b>In practice (Wittry):</b> overhang is strongest when existing claims are hard to renegotiate. Canadian miners with land-reclamation liabilities, which can't be re-contracted, pass up good mines; ordinary debt can usually be renegotiated around.</p>` },
    { h: "Asset substitution (risk shifting)", html: `
<p>Because equity is a call, <b>more risk raises equity's value even if it lowers firm value</b>. Debt therefore tempts shareholders to swap safe assets for risky ones.</p>
<p><b>Linn Energy</b> invests $70 in one of two projects:</p>
<table class="mini"><tr><th></th><th>Bad</th><th>Good</th><th>E[V]</th><th>Equity if face = 40</th></tr>
<tr><td>Safe</td><td>50</td><td>100</td><td>75</td><td>½(10) + ½(60) = 35</td></tr>
<tr><td>Shale</td><td>25</td><td>115</td><td>70</td><td>½(0) + ½(75) = 37.5</td></tr></table>
<p>All-equity, Linn picks Safe (NPV 5 vs 0). With debt of face 40, shareholders pick <b>Shale</b>, which destroys 5 of value but raises their payoff from 35 to 37.5. Debt under Shale is worth only ½(25) + ½(40) = 32.5.</p>
<ul>
<li>If the debt is <b>already in place</b> (locked in), the loss falls on bondholders: D drops from 40 to 32.5.</li>
<li>If lenders are <b>rational and lend after seeing the incentive</b>, they pay only 32.5 for a face of 40 (a 23.1% yield). Shareholders then put in 37.5 and get 37.5 back: their gain is 0 instead of 5. <b>Shareholders bear the cost</b> of their own temptation.</li>
<li>Asset substitution needs <b>risky</b> debt. If debt is always repaid, shareholders can't shift losses to it.</li>
</ul>
<p>Real cases: Linn Energy's shale bet during the 2014–16 oil crash; FedEx founder Fred Smith taking the company's last $5,000 to Las Vegas blackjack in 1973.</p>` },
    { h: "Reluctance to liquidate", html: `
<p>Shareholders may keep a firm running that should be shut down, like holding an out-of-the-money option instead of letting it go.</p>
<p><b>Example:</b> $450 of debt is due in a year. The firm can be liquidated now for $480. If it continues, it'll be worth $600 or $200 (50/50), so the going-concern value is 400 &lt; 480, and liquidating maximizes firm value.</p>
<ul>
<li><b>Debtholders:</b> liquidate and get 450; continue and get ½(450) + ½(200) = 325. They <b>liquidate</b>.</li>
<li><b>Shareholders:</b> liquidate and get 30; continue and get ½(150) + ½(0) = 75. They <b>continue</b>.</li>
</ul>
<p><b>Chapter 7</b> liquidates the firm and pays creditors from asset sales. <b>Chapter 11</b> reorganizes it, with creditors voting on restructured debt. When the residual claimant controls the process, Chapter 11 is more likely, even when the assets would be worth more liquidated (coal examples: Arch Coal 2015, Blackjewel).</p>` }
  ],
  cards: [
    { q: "Why is equity like a call option?", a: "Equity = max(0, V − D): a call on the firm's assets with strike equal to the face value of debt. Limited liability caps losses at zero." },
    { q: "Who gains from a positive-NPV project? (the overhang rule)", a: "ΔE = NPV − ΔD. Shareholders get the NPV minus whatever accrues to debtholders." },
    { q: "Debt overhang", a: "Shareholders pass up positive-NPV projects because existing debtholders would capture most of the benefit." },
    { q: "House worth 300, mortgage 350, $10k remodel adds $50k. Who gains?", a: "NPV = +40 but ΔD = +50, so ΔE = −10. The owner pays 10k and gets nothing, so the remodel doesn't happen." },
    { q: "When is debt overhang most severe? (Wittry)", a: "When existing claims can't be renegotiated, like mining land-reclamation liabilities. Ordinary debt can usually be re-contracted." },
    { q: "Asset substitution", a: "Shareholders of a levered firm shift to riskier projects, even negative-NPV ones, because higher volatility raises the value of their call at debtholders' expense." },
    { q: "Linn: which project with debt of face 40 and why?", a: "Shale. Equity gets 37.5 vs 35 under Safe, even though Shale destroys 5 of total value." },
    { q: "Who bears the cost of asset substitution?", a: "If debt is locked in: bondholders (D falls 40 → 32.5). If lenders price the incentive in advance: shareholders (their gain falls from 5 to 0)." },
    { q: "Can asset substitution happen with safe debt?", a: "No. If debt is always repaid, shareholders can't shift losses to bondholders, so there's no incentive." },
    { q: "Reluctance to liquidate", a: "Shareholders keep a firm going that should be liquidated because continuing gives their out-of-the-money call a chance; liquidation locks in a small payoff." },
    { q: "Liquidation example: who wants what?", a: "Liquidation 480 vs going concern 400. Debt prefers liquidation (450 vs 325); equity prefers continuing (75 vs 30)." },
    { q: "Chapter 7 vs Chapter 11", a: "Chapter 7: liquidation, creditors paid from asset sales. Chapter 11: reorganization, creditors vote on restructured debt." }
  ],
  quiz: [
    { q: "A house is worth 300 with a 350 mortgage. A 10 remodel adds 50 of value. What is the change in the owner's wealth if they pay for it?", c: ["+40", "+50", "−10", "0"], a: 2, why: "The house rises to 350, all of which goes to the lender. The owner paid 10 and has zero equity before and after." },
    { q: "Debt overhang is a problem because shareholders…", c: ["take too many risky projects", "pass up positive-NPV projects whose gains go mostly to debtholders", "refuse to liquidate", "issue too much equity"], a: 1, why: "That's the definition of overhang." },
    { q: "Linn: Safe pays 50/100, Shale pays 25/115 (50/50), cost 70. With debt of face 40, shareholders choose…", c: ["Safe, because it has higher NPV", "Shale, because it gives equity 37.5 vs 35", "Either; they're indifferent", "Neither"], a: 1, why: "Equity's payoff is max(0, V − 40). Shale's higher risk raises it even though E[V] is lower." },
    { q: "If lenders anticipate Linn's choice of Shale before lending, who bears the 5 of lost value?", c: ["The lenders", "The shareholders", "The government", "No one, since value isn't lost"], a: 1, why: "Lenders pay only 32.5 for face 40, so shareholders fund 37.5 and get 37.5 back. They lose the 5 they could have made with Safe." },
    { q: "Asset substitution requires…", c: ["debt that is risky", "safe debt", "no debt", "corporate taxes"], a: 0, why: "Only risky debt absorbs part of the downside, which is what makes risk-taking attractive to equity." },
    { q: "Debt of 450 is due next year. Liquidating now yields 480; continuing yields 600 or 200 (50/50). What do shareholders want?", c: ["Liquidate, because 480 > 400", "Continue, because their expected payoff is 75 vs 30", "Liquidate, because debt is paid in full", "They're indifferent"], a: 1, why: "Equity gets 30 from liquidating and ½ × 150 = 75 from continuing. They gamble even though it destroys value." },
    { q: "The volatility of a levered firm's assets rises with no change in expected value. Then…", c: ["equity and debt both gain", "equity gains and debt loses", "debt gains and equity loses", "neither changes"], a: 1, why: "Equity is a call (it gains from volatility); debt is like riskless debt minus a put (it loses)." }
  ]
});

window.UNITS.push({
  id: "u10",
  num: 10,
  title: "Stakeholders and the pecking order",
  blurb: "Why so many firms use little debt, and how information shapes financing.",
  source: "Conflicts & Corporate Strategy deck",
  lesson: [
    { h: "The low-leverage puzzle", html: `
<p>Big US firms can borrow cheaply, and direct bankruptcy costs are small. Yet <b>Graham (2000)</b> finds the typical firm could double its tax benefits before the marginal benefit starts falling, and <b>Strebulaev and Zhang (2013)</b> find about <b>10% of public firms have zero debt</b>, leaving tax benefits worth about 7% of firm value unused. And the most profitable firms, which have the most to gain from tax shields, borrow least.</p>
<p>Two explanations: leverage hurts <b>other stakeholders</b>, which feeds back into firm value; and <b>information asymmetry</b> makes some kinds of financing costly (the pecking order).</p>` },
    { h: "Customers, suppliers and workers", html: `
<p>Leverage raises the chance of liquidation. Debtholders take control in bankruptcy and tend to liquidate; liquidation hurts customers, suppliers and workers (CSW), who lose relationships and jobs. So CSW are wary of highly levered firms. They demand <b>higher wages</b>, <b>better terms</b> or <b>guarantees</b>.</p>
<ul>
<li><b>Graham et al. (2023):</b> workers' earnings fall about 10% in the bankruptcy year (about 13% in the first full year after), and about 67% cumulatively in PV terms over 7 years. <b>Hanka (1998):</b> highly levered firms lay off more workers.</li>
<li><b>Myopia:</b> distressed firms trade future reputation for cash now. This matters most when products need future service or have hard-to-see quality, when suppliers make firm-specific investments, and when workers build firm-specific skills.</li>
<li><b>Chrysler (1979):</b> liquidation would have meant 360,000 direct job losses, damaged suppliers and lost defense contracts. Debtholders did better with a surviving Chrysler than with a fire sale. Protecting other stakeholders can raise the value of a distressed firm for creditors too. The cost of distress was large: a $300 rebate on about 1.5M cars cost $431M, against equity worth $768M.</li>
<li><b>Matsa (2010):</b> leverage can <i>help</i> in bargaining. With cash committed to debt, the firm can credibly drive a harder bargain with unions.</li>
</ul>` },
    { h: "The pecking order", html: `
<p>Managers know more about the firm than outside investors. That information gap affects how each security is priced:</p>
<ul>
<li><b>Issuing equity</b> signals that managers think the stock is overvalued (why else sell it now?), so the price drops. Equity is the costliest source.</li>
<li><b>Debt</b> is less sensitive to private information, but still has agency issues.</li>
<li><b>Internal funds</b> have no information problem at all.</li>
</ul>
<div class="f">Internal funds → safe debt → risky debt → convertibles → equity</div>
<p>The pecking order explains why 70–80% of investment is financed with retained earnings, why profitable firms keep debt low (they don't need outside money), and why equity issues are rare. Its weakness: it implies no target D/E ratio and gives taxes almost no role.</p>
<p><b>Pecking order vs trade-off:</b> each explains some facts and misses others. Real capital structures reflect both.</p>` }
  ],
  cards: [
    { q: "Evidence that firms are under-levered", a: "Graham (2000): the typical firm could double its tax benefits. Strebulaev–Zhang (2013): ~10% of public firms have zero debt, leaving ~7% of firm value in unused tax shields." },
    { q: "How does leverage affect customers, suppliers and workers?", a: "It raises liquidation risk, which costs them relationships and jobs. They respond by demanding higher wages, better terms or guarantees." },
    { q: "Graham et al. (2023) on workers", a: "Earnings fall ~10% in the bankruptcy year (~13% the first full year after) and ~67% cumulatively in PV terms over 7 years." },
    { q: "Hanka (1998)", a: "Highly levered firms are more likely to lay off employees." },
    { q: "Which firms should be most cautious about leverage because of stakeholders?", a: "Firms whose products need future service or have hard-to-observe quality, whose suppliers make firm-specific investments, or whose workers build firm-specific skills." },
    { q: "Chrysler 1979 lesson", a: "Protecting employees, suppliers and dealers kept going-concern value high, so creditors did better than in a liquidation fire sale." },
    { q: "Matsa (2010)", a: "Leverage strengthens a firm's hand against unions: cash committed to debt lets it drive a harder bargain." },
    { q: "Pecking order ranking", a: "Internal funds → safe debt → risky debt → convertible bonds → equity." },
    { q: "Why does the stock price fall when a firm issues equity?", a: "Managers know more. Issuing equity signals they think the stock is overvalued." },
    { q: "Three facts the pecking order explains", a: "Most investment (70–80%) is internally financed; profitable firms keep debt low; equity issues are rare." },
    { q: "Weaknesses of the pecking order", a: "No well-defined target D/E, and taxes play almost no role." },
    { q: "Fact explained by the pecking order but not the static trade-off", a: "The most profitable firms borrow least." }
  ],
  quiz: [
    { q: "According to the pecking order, which financing source does a firm prefer most after internal funds?", c: ["Equity", "Convertible bonds", "Safe debt", "Risky debt"], a: 2, why: "Internal funds → safe debt → risky debt → convertibles → equity." },
    { q: "A firm announces a large equity issue. Under the pecking order, the stock price most likely…", c: ["rises, because the firm has growth plans", "falls, because investors infer managers think the stock is overvalued", "is unaffected in efficient markets", "rises, because leverage falls"], a: 1, why: "Information asymmetry: issuing equity signals overvaluation." },
    { q: "Which fact does the pecking order explain better than the static trade-off?", c: ["Firms in high tax brackets borrow more", "The most profitable firms borrow the least", "Firms with tangible assets borrow more", "Firms have a target debt ratio"], a: 1, why: "Profitable firms have enough internal cash, so they don't need to borrow." },
    { q: "Matsa (2010) finds that high leverage…", c: ["weakens a firm in union negotiations", "strengthens a firm's bargaining position with unions", "has no effect on wages", "forces firms to raise wages"], a: 1, why: "Committing cash to debt lets the firm credibly drive a harder bargain." },
    { q: "Which firm should be most cautious about high leverage because of stakeholder costs?", c: ["A commodity producer selling to spot markets", "A maker of durable goods that need years of service and spare parts", "A holding company with only financial assets", "A firm with fully diversified suppliers"], a: 1, why: "Customers of long-lived products care whether the firm will survive to service them." },
    { q: "In the 1979 Chrysler episode, why might debtholders have preferred a rescue to liquidation?", c: ["Liquidation was illegal", "Fire-sale prices and lost going-concern value (workers, suppliers, dealers, contracts) meant they'd recover more if Chrysler survived", "The government guaranteed all debt", "Debtholders own the equity"], a: 1, why: "Protecting other stakeholders preserved firm value, which helped creditors too." },
    { q: "About what share of public firms have zero debt (Strebulaev and Zhang)?", c: ["1%", "10%", "40%", "70%"], a: 1, why: "About 10%, leaving roughly 7% of firm value in unused tax shields." }
  ]
});
