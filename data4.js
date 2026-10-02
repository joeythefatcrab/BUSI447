/* Extra reading, figures and practice for units 6-10. */
window.EXTRA = window.EXTRA || {};
var fig = window.fig;

window.EXTRA.u6 = {
  intro: { h: "Start here: should you act now or wait?", html: `
<div class="bigidea"><b>Big idea.</b> If you can delay a decision, waiting lets you see how things turn out and invest only in the good scenario. But waiting has a price: the cash you'd have earned in the meantime. Timing problems are always that trade-off.</div>
<p>Buying a house is a good analogy. Wait a year and you learn more about prices and your job, but you pay rent in the meantime. If prices are very uncertain, waiting is worth a lot. If rent is very expensive, buying now looks better.</p>
<div class="tblwrap"><table class="mini"><tr><th>Push toward waiting</th><th>Push toward acting now</th></tr>
<tr><td>High uncertainty (σ)</td><td>Large cash flows you'd miss while waiting</td></tr>
<tr><td>A real chance you'd decide <i>not</i> to invest</td><td>Investment is profitable in every scenario</td></tr>
<tr><td>Long time until the right expires</td><td>Competitors may take the opportunity</td></tr></table></div>` },
  insert: [
    { after: 1, h: "Walkthrough: OPEK in pictures", html: `
${fig("u6_opek", "Waiting is worth 370; investing now is worth 200. Wait.")}
<ol class="steps">
<li><b>Value of the field if you produce</b>: 10 barrels × $20 a year forever, discounted at 10% = 2,000. Cost 1,800, so NPV now = 200.</li>
<li><b>Next year's possibilities</b>: oil at $25 → field worth 2,500; oil at $16 → 1,600.</li>
<li><b>If you wait</b>: invest only if it pays. Up: 2,500 − 1,800 = 700. Down: 1,600 < 1,800, so don't invest: 0.</li>
<li><b>Price the wait</b> with q = (1.05 − 0.8)/(1.25 − 0.8) = 0.556: 0.556 × 700/1.05 = 370.</li>
<li><b>Compare</b>: 370 > 200, so wait. Notice the real probabilities (4/9, 5/9) never enter.</li>
</ol>` },
    { after: 2, h: "Walkthrough: the condo lot", html: `
${fig("u6_condo", "Best choice at each node: 6 units today, 9 units if prices rise, 6 if they fall.")}
<p>The lot's value comes from two choices: <b>when</b> to build and <b>what</b> to build. Building today, 6 units is best (120k). Next year you'd pick 9 units if prices rise (270k) and 6 if they fall (60k). Rent works like a dividend in finding q: 100 × 1.12 = q(120 + 8) + (1 − q)(90 + 8), so q = 0.467. Waiting is worth 158k/1.12 = 141k, more than the 120k from building now.</p>` },
    { after: 3, h: "Mark I and Mark II on a timeline", html: `
${fig("u6_mark", "Mark I's own cash flows have NPV −46.45, but at year 3 it opens a valuable decision.")}` }
  ],
  append: {
    4: `${fig("u6_disney", "Why sequel rights are valuable: you keep the green bars and skip the red ones.")}`
  },
  confusions: [
    { q: "\"In Black-Scholes for Mark II, is S 800 or 463?\"", a: "463. S is the underlying's value today. 800 is its value at year 3; discounting it at the project's rate gives 463." },
    { q: "\"Where does the 'dividend' come from in a real option?\"", a: "Any cash you'd collect by investing now that you give up by waiting: OPEK's first-year oil, the condo rent, the 25 in PS2 Q5. When the question gives such a flow, put it in the q equation." },
    { q: "\"If waiting is valuable, should I always wait?\"", a: "No. Waiting only helps if there's a state where you'd choose not to invest. If you'd invest in every state (PS2 Q5c), waiting just loses the interim cash flow." },
    { q: "\"Why was the PS2 Q1 expansion option so small?\"", a: "The +30% for $30M only pays if 0.3V > 30, i.e. V > 100, while V starts at 50. Deep out-of-the-money options are worth little." }
  ],
  quiz: [
    { q: "A project worth 100 today will be worth 130 or 80 next year. Investment cost is 90 (now or next year). r* = 1.05, q = 0.5. What is the value of waiting?", c: ["10", "19.05", "40", "20"], a: 1, why: "Wait: up 130 − 90 = 40, down 0. 0.5 × 40/1.05 = 19.05." },
    { q: "Same project. Investing now is worth 100 − 90 = 10. Should the firm invest now or wait?", c: ["Invest now", "Wait", "Indifferent", "Never invest"], a: 1, why: "19.05 > 10, so wait." },
    { q: "Same project, but now the down value is 95 instead of 80. What should the firm do (ignoring interim cash flows)?", c: ["Wait, it's still uncertain", "It's in the money in both states, so waiting gives no protection; with any interim cash flow, invest now", "Never invest", "Abandon"], a: 1, why: "If the investment pays off in every state, the option to wait adds nothing beyond the time value of the cost." },
    { q: "A firm's project generates large cash flows each year. Delaying by a year would forgo one year's flows. All else equal, larger interim cash flows make…", c: ["waiting more attractive", "investing now more attractive", "no difference", "the option's volatility rise"], a: 1, why: "They're the dividends of the timing option. Bigger dividends favor early exercise." },
    { q: "Vacant land has a building opportunity worth 1,000 today and costing 1,100 to build. The land is still valuable because…", c: ["it's a call that may move into the money if building values rise", "land always appreciates", "the NPV is positive", "construction costs fall over time"], a: 0, why: "The option to build later has value even when building today would lose money." },
    { q: "Mark I's NPV is −46.45 and the option on Mark II is worth 55.27. What should the firm do?", c: ["Reject Mark I", "Launch Mark I (strategic NPV +8.82)", "Launch only Mark II", "Wait on both"], a: 1, why: "The follow-on option makes the package worth taking." },
    { q: "An option to expand pays max(0, 0.2V − 50). Expanding is worthwhile only if V exceeds…", c: ["50", "200", "250", "10"], a: 2, why: "0.2V > 50 ⇒ V > 250." }
  ]
};

window.EXTRA.u7 = {
  intro: { h: "Start here: does how you pay for something change its value?", html: `
<div class="bigidea"><b>Big idea.</b> Cutting a pizza into more slices doesn't make more pizza. Financing a firm with debt instead of equity just changes who gets which slice, so in a perfect world it can't change firm value. Taxes break that: the government takes a slice, and debt makes the government's slice smaller.</div>
<p>MM's two results, in plain words:</p>
<ul>
<li><b>Prop 1</b>: the size of the pie (firm value) doesn't depend on the slicing (debt vs equity).</li>
<li><b>Prop 2</b>: if you take a fixed slice for the lenders, the remaining slice is riskier, so shareholders demand a higher return. Debt looks "cheaper", but it makes equity more expensive by exactly enough to keep the overall cost (WACC) flat.</li>
</ul>
${fig("u7_robot", "The coffee robot: borrowing doesn't change the project, but it makes the equity holders' returns swing more.")}` },
  insert: [
    { after: 2, h: "Walkthrough: Water Products, every number", html: `
${fig("u7_split", "The same $1M of operating income, split three ways. Debt shrinks the government's slice.")}
<ol class="steps">
<li><b>Plan I (no debt)</b>: taxes = 30% × 1,000k = 300k. Shareholders get 700k.</li>
<li><b>Plan II ($2M debt at 10%)</b>: interest 200k is deductible, so taxable income = 800k, taxes = 240k, shareholders get 560k, lenders 200k. Total to investors: 760k.</li>
<li><b>Annual tax shield</b> = 760k − 700k = 60k = 30% × 200k.</li>
<li><b>Value it</b>: the shield is as safe as the interest, so discount at r<sub>D</sub>: 60k/0.10 = 600k = t × D.</li>
<li><b>Firm values</b>: V<sub>U</sub> = 700k/0.125 = 5.6M. V<sub>L</sub> = 5.6M + 0.6M = 6.2M. E = 6.2M − 2M = 4.2M.</li>
<li><b>Check the cost of equity</b>: 560k/4.2M = 13.33% = 12.5% + (12.5% − 10%)(1 − 0.3)(2/4.2). WACC = 11.29%, and 700k/0.1129 = 6.2M.</li>
</ol>` }
  ],
  confusions: [
    { q: "\"Debt is cheaper than equity, so more debt lowers WACC.\"", a: "Without taxes, no: each dollar of debt makes the remaining equity riskier and more expensive, and the two effects cancel. With taxes, yes: the after-tax cost of debt r_D(1 − t) gives a real saving, so WACC = r_A(1 − tD/V) falls." },
    { q: "\"If the cost of equity rises, doesn't the firm lose value?\"", a: "No. The higher r_E just compensates shareholders for higher risk. Their expected payoff rises too (25% vs 15% on the coffee robot)." },
    { q: "\"Why is PV(tax shield) just t × D?\"", a: "For permanent debt: the shield is t × r_D × D every year forever, and a perpetuity discounted at r_D is (t × r_D × D)/r_D = t × D. For temporary debt you'd discount each year's shield instead." },
    { q: "\"Where does (1 − t) go in WACC?\"", a: "Only on the debt term: WACC = (E/V)r_E + (D/V)r_D(1 − t). Interest is deductible; dividends aren't." }
  ],
  quiz: [
    { q: "No taxes. r_A = 12%, r_D = 6%, D/V = 40%. What is r_E?", c: ["12%", "16%", "18%", "14.4%"], a: 1, why: "D/E = 0.4/0.6 = 0.667. r_E = 12% + 6% × 0.667 = 16%." },
    { q: "Same firm, no taxes. What is its WACC?", c: ["12%", "10%", "16%", "9.6%"], a: 0, why: "0.6 × 16% + 0.4 × 6% = 12% = r_A, as MM says." },
    { q: "Firm worth 50M unlevered issues 10M of permanent debt (t = 25%) and uses it to buy back shares. What are V_L and E?", c: ["50 and 40", "52.5 and 42.5", "60 and 50", "52.5 and 52.5"], a: 1, why: "V_L = 50 + 0.25 × 10 = 52.5. E = 52.5 − 10 = 42.5." },
    { q: "EBIT 500, t = 40%, debt 1,000 at 8% (permanent). What is the annual interest tax shield?", c: ["32", "80", "200", "48"], a: 0, why: "0.40 × 0.08 × 1,000 = 32." },
    { q: "In MM without taxes, which statement is true as leverage increases?", c: ["β_E falls", "β_A rises", "β_E rises while β_A is unchanged", "Both betas are unchanged"], a: 2, why: "β_E = β_A + (β_A − β_D)D/E." },
    { q: "With corporate taxes, r_A = 10%, r_D = 6%, t = 30%, D/E = 1. What is r_E?", c: ["14%", "12.8%", "11.2%", "10%"], a: 1, why: "10% + 4% × 0.7 × 1 = 12.8%." },
    { q: "Same firm (D/V = 50%). What is the WACC?", c: ["10%", "8.5%", "9.4%", "8.0%"], a: 1, why: "r_A(1 − tD/V) = 10% × (1 − 0.15) = 8.5%. Check: 0.5 × 12.8% + 0.5 × 6% × 0.7 = 6.4% + 2.1% = 8.5%." },
    { q: "Taken literally, MM with corporate taxes implies firms should…", c: ["use no debt", "use almost all debt", "match their industry's leverage", "hold equal debt and equity"], a: 1, why: "V_L = V_U + tD keeps rising with D. Unit 8 adds the costs that stop this." }
  ]
};

window.EXTRA.u8 = {
  intro: { h: "Start here: debt has a cost too", html: `
<div class="bigidea"><b>Big idea.</b> Each dollar of debt saves taxes but raises the chance of financial trouble. Firm value rises while the tax saving from the next dollar of debt beats the extra expected trouble it brings, then falls. The best debt level is where the two balance.</div>
<p>The key word is <b>expected</b>. A firm with a 2% chance of a $5M bankruptcy expects to lose $0.1M. Push the probability to 20% and the expected loss is $1M. Meanwhile the tax savings flatten out as debt grows. The picture below uses the actual Nadir numbers from class.</p>
${fig("u8_nadir", "Nadir: the tax gain flattens, the expected distress cost keeps rising, and firm value peaks at $7M of debt.")}` },
  insert: [
    { after: 2, h: "Walkthrough: finding Nadir's optimum", html: `
<ol class="steps">
<li><b>Tax gain at each debt level</b> = (tax rate at that level) × D. At D = 7: 0.28 × 7 = 1.96.</li>
<li><b>Expected distress cost</b> = Pr(default) × 5. At D = 7: 0.175 × 5 = 0.875.</li>
<li><b>Firm value</b> = 12 + 1.96 − 0.875 = 13.085.</li>
<li><b>Check the next step</b>: at D = 8, tax gain is 0.26 × 8 = 2.08 (+0.12) and distress is 0.20 × 5 = 1.00 (+0.125). The extra cost beats the extra benefit, so stop at 7.</li>
</ol>` },
    { after: 3, h: "Reading a Z-score", html: `
${fig("u8_z", "Altman Z zones with the two firms from class.")}
<p><b>Chevron, step by step</b> ($M): X<sub>1</sub> = (53,234 − 33,600)/209,474 = 0.094; X<sub>2</sub> = 140,399/209,474 = 0.670; X<sub>3</sub> = 47,634/209,474 = 0.227; X<sub>4</sub> = 222,550/88,092 = 2.526; X<sub>5</sub> = 253,706/209,474 = 1.211. Z = 1.2(0.094) + 1.4(0.670) + 3.3(0.227) + 0.6(2.526) + 1.0(1.211) = <b>4.53</b>, safe.</p>` }
  ],
  confusions: [
    { q: "\"If direct bankruptcy costs are only 3–5%, why worry?\"", a: "Because the indirect costs (customers leaving, suppliers demanding cash, workers quitting) are much larger and start before any bankruptcy filing." },
    { q: "\"Expected cost or actual cost?\"", a: "Expected: Pr(default | D) × cost if it happens. That's why the probability column in Rice-A-Roni and Nadir matters as much as the cost." },
    { q: "\"Why does the tax benefit shrink at high debt?\"", a: "Deduction limits, not enough income to deduct against, and lower marginal tax rates (Nadir's rate falls 2 points per $1M)." },
    { q: "\"Does the trade-off theory explain what firms actually do?\"", a: "Partly. It predicts that profitable firms borrow more, but the most profitable firms often borrow least. That's why Unit 10 adds the pecking order and stakeholder costs." }
  ],
  quiz: [
    { q: "V_U = 200, t = 30%, bankruptcy cost 40. At D = 50, Pr(default) = 20%. What is V_L?", c: ["215", "207", "200", "223"], a: 1, why: "200 + 0.3 × 50 − 0.2 × 40 = 200 + 15 − 8 = 207." },
    { q: "V_U = 200, t = 30%, bankruptcy cost 40. At D = 30, Pr(default) = 5%; at D = 50, Pr(default) = 20%. Which debt level gives higher value?", c: ["D = 30", "D = 50", "They give the same value", "D = 0"], a: 2, why: "D = 30: 200 + 9 − 2 = 207. D = 50: 200 + 15 − 8 = 207. They tie: the extra 20 of debt adds exactly as much expected distress cost as tax benefit." },
    { q: "Moving from D = 4 to D = 5 adds 0.24 of tax benefit and 0.125 of expected distress cost. The firm should…", c: ["stop at 4", "move to 5 and check the next step", "cut debt to 0", "issue equity"], a: 1, why: "Marginal benefit > marginal cost, so add the debt." },
    { q: "Which firm likely has the highest costs of financial distress?", c: ["A utility with power plants", "A real-estate firm with buildings", "A software firm whose value is its people and code", "A railroad"], a: 2, why: "Intangible assets lose value fast in distress; hard assets can be sold or pledged." },
    { q: "BBB bonds have a 10-year cumulative default rate of 6.25% and a year-10 marginal rate of 0.32%. The cumulative rate means…", c: ["6.25% default in year 10", "6.25% default at some point within 10 years", "6.25% default every year", "the recovery rate is 6.25%"], a: 1, why: "Cumulative = by year 10; marginal = in year 10." },
    { q: "A firm's Z-score inputs: X1 0.1, X2 0.2, X3 0.1, X4 1.0, X5 1.0. What is Z and its zone?", c: ["2.33, grey", "3.10, safe", "1.75, distress", "2.99, safe"], a: 0, why: "1.2(0.1) + 1.4(0.2) + 3.3(0.1) + 0.6(1.0) + 1.0(1.0) = 0.12 + 0.28 + 0.33 + 0.60 + 1.00 = 2.33, in the grey zone (1.8 to 2.99)." },
    { q: "Glover argues that default costs measured at firms that defaulted understate the average firm's costs. Why?", c: ["Courts reduce costs", "Firms with low default costs choose high leverage, so defaulters are a selected sample", "Accounting rules hide costs", "Only small firms default"], a: 1, why: "Selection: who defaults isn't random." }
  ]
};
window.EXTRA.u9 = {
  intro: { h: "Start here: whose money is at risk?", html: `
<div class="bigidea"><b>Big idea.</b> When a firm has risky debt, shareholders and lenders want different things. Shareholders keep everything above the debt and lose at most their stake, so they act like option holders: they like risk and dislike putting in money that mostly rescues the lenders.</div>
<p>Picture a firm close to default. If a gamble pays off, shareholders keep the upside. If it fails, the lenders absorb most of the loss. That's "playing with the house's money", and it produces three predictable problems: <b>overhang</b> (skipping good projects), <b>asset substitution</b> (taking bad risky ones) and <b>reluctance to liquidate</b> (gambling on survival).</p>` },
  insert: [
    { after: 1, h: "The underwater house in a picture", html: `
${fig("u9_house", "Every dollar of value the remodel adds goes to the lender until the house is worth more than the mortgage.")}` },
    { after: 2, h: "Linn Energy in a picture", html: `
${fig("u9_linn", "Each outcome split between debt (grey, face 40) and equity (blue). Shale's big good state is where equity wins.")}
<p>Read the bars: in the bad states debt eats almost everything either way, so shareholders barely care how bad "bad" is. In the good states, shale gives equity 75 versus 60. Averaged, equity gets 37.5 from shale and 35 from safe, so they choose shale even though shale's total value is 5 lower. Lenders bear that loss if their debt is already in place.</p>` },
    { after: 3, h: "Liquidation as a decision tree", html: `
${fig("u9_liq", "Liquidating maximizes total value (480 vs 400), but equity votes to continue.")}` }
  ],
  confusions: [
    { q: "\"Overhang vs asset substitution: what's the difference?\"", a: "Overhang: shareholders REJECT a good project (positive NPV) because lenders get the gains. Asset substitution: shareholders ACCEPT a bad, risky project (zero or negative NPV) because they keep the upside and lenders take the downside." },
    { q: "\"Who actually pays for asset substitution?\"", a: "If the debt was issued before the risky choice (locked in), the lenders. If lenders see it coming, they charge a higher yield up front, and the shareholders pay." },
    { q: "\"Does this happen with any debt?\"", a: "Only with risky debt. If the debt is always repaid in full, shareholders bear all gains and losses and these conflicts disappear." },
    { q: "\"Is bankruptcy the same as liquidation?\"", a: "No. Bankruptcy is a legal status (can't pay debts). Chapter 7 ends in liquidation (sell the assets). Chapter 11 reorganizes the firm so it keeps operating." }
  ],
  quiz: [
    { q: "A firm worth 80 owes 100 (due next year). A project costs 10 (paid by equity) and adds 15 of value for sure. What happens to equity value?", c: ["+5", "−10", "+15", "0"], a: 1, why: "V goes 80 → 95, still below 100, so debt captures all of it (ΔD = +15). Equity paid 10: ΔE = NPV − ΔD = 5 − 15 = −10." },
    { q: "Same firm, but the project adds 35 instead of 15. Now equity's change in value is…", c: ["+5", "+15", "−10", "+25"], a: 0, why: "V goes 80 → 115. Debt rises from 80 to 100 (ΔD = 20); equity goes 0 → 15 after paying 10: ΔE = 25 − 20 = +5." },
    { q: "Debt face 50. Project A pays 60 or 60; project B pays 100 or 10 (50/50). Equity's expected payoff is…", c: ["A: 10, B: 25", "A: 10, B: 30", "A: 60, B: 55", "A: 0, B: 25"], a: 0, why: "A: max(0, 60 − 50) = 10 both states. B: ½(50) + ½(0) = 25." },
    { q: "In the previous question, firm value is 60 under A and 55 under B. Shareholders prefer…", c: ["A, because it's worth more", "B, because equity gets 25 vs 10", "indifferent", "neither"], a: 1, why: "Asset substitution: they pick the riskier, lower-value project." },
    { q: "Debt of 200 is due. Liquidation value now is 210. Continuing gives 300 or 60 (50/50). What does equity prefer?", c: ["Liquidate: 10 for sure", "Continue: expected 50", "Indifferent", "Liquidate: going concern is 180"], a: 1, why: "Continue: ½ × (300 − 200) + ½ × 0 = 50 > 10. (Total value is 180 < 210, so liquidating is efficient.)" },
    { q: "Equity in a levered firm is best described as…", c: ["a put on the firm's assets", "a call on the firm's assets with strike equal to the face value of debt", "a riskless bond", "a forward contract"], a: 1, why: "Equity = max(0, V − D)." },
    { q: "Wittry finds Canadian miners skip good projects mainly when they have…", c: ["bank loans", "public bonds", "land-reclamation liabilities that can't be renegotiated", "no debt"], a: 2, why: "Overhang is strongest when existing claims can't be re-contracted." }
  ]
};

window.EXTRA.u10 = {
  intro: { h: "Start here: why don't rich firms borrow more?", html: `
<div class="bigidea"><b>Big idea.</b> If debt saves taxes, the most profitable firms should borrow the most. Many don't. Two reasons: debt scares off the customers, suppliers and workers a firm depends on, and managers know more than investors, which makes raising outside money (especially equity) costly.</div>
${fig("u10_stake", "A levered firm's stakeholders worry about liquidation and price that risk into their dealings with it.")}` },
  insert: [
    { after: 2, h: "The pecking order in a picture", html: `
${fig("u10_ladder", "Firms use the cheapest, least information-sensitive money first and climb only as far as they need.")}
<p><b>Why does issuing equity send the price down?</b> Managers know whether their stock is cheap or expensive. They're most eager to sell shares when the stock is overpriced. Investors know this, so an equity issue reads as "management thinks we're overvalued", and the price drops. Internal cash avoids the problem entirely; safe debt barely depends on that private information.</p>
<div class="tblwrap"><table class="mini"><tr><th></th><th>Static trade-off</th><th>Pecking order</th></tr>
<tr><td>Profitable firms</td><td>Borrow more (more to shield)</td><td>Borrow less (enough internal cash)</td></tr>
<tr><td>Target debt ratio?</td><td>Yes, where MB = MC</td><td>No, debt is whatever was needed</td></tr>
<tr><td>Role of taxes</td><td>Central</td><td>Minor</td></tr>
<tr><td>Equity issues</td><td>To rebalance toward target</td><td>Last resort, rare</td></tr></table></div>` }
  ],
  confusions: [
    { q: "\"Is the pecking order saying debt is good?\"", a: "It's saying debt is less costly to issue than equity because it's less sensitive to managers' private information. Internal funds are best of all." },
    { q: "\"Do stakeholder costs only matter in bankruptcy?\"", a: "No. Customers, suppliers and workers respond to the risk of distress before it happens: they demand guarantees, cash up front or a wage premium." },
    { q: "\"Can leverage ever help with stakeholders?\"", a: "Yes. Matsa (2010): committing cash to debt payments lets a firm credibly drive a harder bargain with unions." },
    { q: "\"Which theory is right?\"", a: "Neither alone. Trade-off explains why tangible, stable firms carry debt; pecking order explains why profitable firms use internal cash and why equity issues are rare. Real capital structures reflect both." }
  ],
  quiz: [
    { q: "A firm has $100M of retained cash and needs $60M for a project. Under the pecking order, it should…", c: ["issue $60M of equity", "issue $60M of safe debt", "use internal funds", "issue convertibles"], a: 2, why: "Internal funds come first." },
    { q: "The same firm needs $150M. Under the pecking order, after using its $100M of cash, it raises the rest with…", c: ["equity", "safe debt", "convertibles", "it shouldn't invest"], a: 1, why: "Next rung: safe debt." },
    { q: "Which firm should be most cautious about high leverage because of stakeholders?", c: ["A gold miner selling to commodity markets", "A software firm whose customers rely on years of updates and support", "A firm whose suppliers sell standardized goods", "A holding company"], a: 1, why: "Customers who need future service care whether the firm survives." },
    { q: "Graham et al. (2023) find workers' earnings in a bankruptcy year fall by about…", c: ["1%", "10%", "50%", "90%"], a: 1, why: "About 10% in the bankruptcy year, and about 67% cumulatively (PV) over 7 years." },
    { q: "Why might a firm with plenty of borrowing capacity keep zero debt, under the pecking order?", c: ["It's maximizing tax shields", "It has enough internal cash, so it never needs outside money", "Its stock is undervalued", "Debt is illegal for it"], a: 1, why: "Profitable firms don't need to climb the ladder." },
    { q: "Which prediction differs between trade-off and pecking-order theories?", c: ["Firms use debt", "Profitable firms borrow more vs less", "Bankruptcy is costly", "Interest is deductible"], a: 1, why: "Trade-off: more (more to shield). Pecking order: less (enough internal cash)." },
    { q: "Chrysler's 1979 rescue shows that protecting non-financial stakeholders can…", c: ["only help shareholders", "raise the firm's value for creditors too", "hurt creditors", "eliminate tax shields"], a: 1, why: "Keeping workers, suppliers and dealers preserved going-concern value, so creditors recovered more than in a fire sale." }
  ]
};

window.COURSE_MAP = {
  title: "Course map",
  html: `
<div class="bigidea"><b>The whole course in one sentence:</b> a firm or project is worth the present value of the cash it produces, plus the value of the choices it lets managers make later, adjusted for how financing changes the cash that reaches investors.</div>
${fig("map", "Three parts, ten units.")}
<h2>Part 1 · What is it worth? (Units 1–3)</h2>
<p>Measure the cash correctly (free cash flow: operating cash, minus investment in equipment and working capital). Then account for time and risk: discount at a rate that matches the project's market risk (CAPM with comparables), or turn risky cash into a certainty equivalent and discount at the risk-free rate.</p>
<h2>Part 2 · What if we can adapt? (Units 4–6)</h2>
<p>Standard NPV assumes you commit to every outcome. Real managers can abandon, wait, expand or launch follow-ons. Those rights are options. You price them with the same tools as stock options: build a tree, find the payoffs where you'd use the right, and discount with risk-neutral weights. Options are never worth less than zero, and uncertainty makes them more valuable.</p>
<h2>Part 3 · Does financing matter? (Units 7–10)</h2>
<p>In a perfect world, no (MM). With taxes, debt adds value through the interest tax shield. But debt also brings expected distress costs, conflicts between shareholders and lenders, worried stakeholders and information problems. The best capital structure balances these.</p>
<h2>How to use this app</h2>
<ol class="steps"><li>Read each unit's lesson, starting with its "Start here" section.</li><li>Drill the flashcards until most are in box 4 or 5.</li><li>Do the practice set and read every explanation, even for questions you got right.</li><li>When all units are done, take mock exams and review what you missed.</li></ol>`
};
