/* Extra reading, figures and practice for units 1-5.
   intro: prepended section. insert: new sections placed after an existing section index.
   append: HTML added to the end of an existing section. confusions: a "common confusions" section.
   quiz: extra practice questions (appended, so saved progress keeps its ids). */
window.EXTRA = window.EXTRA || {};
var fig = window.fig = (k, cap) => `<figure class="figure" data-fig="${k}"><figcaption>${cap}</figcaption></figure>`;

window.EXTRA.u1 = {
  intro: { h: "Start here: the one idea behind this unit", html: `
<div class="bigidea"><b>Big idea.</b> A project is worth the cash it will put in your pocket, adjusted for <i>when</i> that cash arrives. Everything in this unit is about measuring the cash correctly and then shrinking future dollars back to today's dollars.</div>
<p>Think about buying a rental apartment. You don't care what the accountant calls "profit". You care how much cash lands in your account each year after paying for repairs, taxes and the mortgage-free cost of the place, and what that stream of cash is worth today compared with the price. That is NPV:</p>
<div class="f">NPV = (today's value of all future cash) − (cash you pay today)</div>
<p>Three questions run through the whole course: <b>how much cash</b> (this unit), <b>how risky</b> (Units 2–3), and <b>what flexibility or financing changes</b> (Units 4–10). If you're confused later, come back to this: every formula is either measuring cash, measuring risk, or adjusting value for options and financing.</p>
${fig("map", "How the ten units fit together. Units 1–3 value cash flows, 4–6 add flexibility, 7–10 ask whether financing changes value.")}` },
  insert: [
    { after: 1, h: "Walkthrough: one year of free cash flow", html: `
<p>Here is year 1 of the lecture's Example #1, one line at a time. Watch how we go down to NOPAT and then add back the things that aren't really cash.</p>
${fig("u1_waterfall", "Year 1: sales of 60,000 become free cash flow of 14,267. Red bars take cash away, green add it back, blue are subtotals.")}
<ol class="steps">
<li><b>Sales − costs − depreciation = EBIT.</b> 60,000 − 39,000 (65% of sales) − 16,667 (50,000 ÷ 3 years) = 4,333.</li>
<li><b>Tax EBIT, not net income.</b> 4,333 × 40% = 1,733 of tax, so NOPAT = 2,600. No interest line: how the project is financed doesn't belong here.</li>
<li><b>Add depreciation back.</b> We only subtracted it to get the tax right. No cash left the firm for it this year: +16,667.</li>
<li><b>Subtract the increase in working capital.</b> NWC must be 15% of sales = 9,000 at year 1, up from 4,000 at t = 0. The extra 5,000 is cash tied up in inventory and receivables.</li>
<li><b>FCF = 2,600 + 16,667 − 5,000 = 14,267.</b></li>
</ol>
<p>Year 3 adds two end-of-life items: the NWC balance of 9,450 comes back, and the equipment sells for 7,000. Its book value is 0, so the whole 7,000 is a gain and is taxed: 7,000 − 0.4 × 7,000 = 4,200. FCF<sub>3</sub> = 3,891.5 + 16,666.7 + 9,450 + 4,200 = 34,208.</p>
${fig("u1_nwc", "Working capital in one picture: inventory and receivables use cash, payables supply it.")}` }
  ],
  append: {
    3: `${fig("u1_timeline", "Example #1 on a timeline. Each cash flow is shrunk by its own year's yield, then everything is added up.")}
${fig("u1_yield", "Real Treasury curves from the lecture. Rates differ by maturity, and the shape changes over time, which is why each cash flow gets its own rate.")}`
  },
  confusions: [
    { q: "\"Depreciation is an expense. Why do we add it back?\"", a: "Because no cash leaves when you record it. The cash left when you bought the machine (that's the CAPX line). Depreciation matters only because it lowers taxable income, so it shows up once, through the tax line." },
    { q: "\"Interest is real cash. Why leave it out?\"", a: "It is real cash, but it's a payment to the people who financed the project, not a cost of running it. Its effect lives in the discount rate (or WACC). Subtracting it from cash flow and also discounting at a rate that reflects it would count it twice." },
    { q: "\"Do I subtract NWC or the change in NWC?\"", a: "Only the change. If NWC sits at 9,000 for two years, no new cash is tied up in the second year. And whatever balance is left at the end comes back as an inflow." },
    { q: "\"Higher IRR means a better project, right?\"", a: "Not when the projects differ in size or timing. A 50% return on $10 is worth less than a 20% return on $1,000. NPV measures dollars created; use it to choose." },
    { q: "\"Which rate do I use with a yield curve?\"", a: "A different one for each date: the 1-year yield for the year-1 cash, the 2-year yield (squared) for year 2, and so on. There's no single rate unless the curve is flat." }
  ],
  quiz: [
    { q: "Revenue 100, cash costs 60, depreciation 20, tax rate 25%, no change in NWC, no CAPX. What is FCF?", c: ["15", "20", "35", "40"], a: 2, why: "EBIT = 20, NOPAT = 15, + depreciation 20 = 35." },
    { q: "NWC is 10 at t = 0, 14 at t = 1 and 14 at t = 2, and is recovered at the end of year 2. What are the NWC cash flows at t = 0, 1, 2?", c: ["−10, −14, −14", "−10, −4, +14", "−10, −4, 0", "+10, +4, −14"], a: 1, why: "Increases are outflows: −10, then −4. At t = 2 there's no change in the requirement, and the 14 balance is released, so +14." },
    { q: "Equipment with book value 30 is sold for 50. Tax rate 30%. What is the after-tax salvage?", c: ["50", "35", "44", "41"], a: 2, why: "50 − 0.30(50 − 30) = 50 − 6 = 44. Only the 20 gain is taxed." },
    { q: "Equipment with book value 80 is sold for 50. Tax rate 30%. What is the after-tax salvage?", c: ["35", "50", "59", "80"], a: 2, why: "50 − 0.30(50 − 80) = 50 + 9 = 59. Selling below book value creates a deductible loss, which saves tax." },
    { q: "A 2-year zero-coupon yield is 5%. What is today's value of $1,000 received in 2 years?", c: ["$952.38", "$907.03", "$900.00", "$909.09"], a: 1, why: "1,000 / 1.05² = 907.03." },
    { q: "A new product line will steal sales from an existing one. In the NPV analysis, the lost profit on the existing line should be…", c: ["ignored, because it's a different product", "subtracted, because it's an incremental effect of the project", "added, because it's a tax shield", "counted only if the new line fails"], a: 1, why: "Ask what changes because of the project. Lost profits elsewhere in the firm are an incremental cost (an opportunity cost)." },
    { q: "Which change would raise a project's year-1 FCF, all else equal?", c: ["Customers pay more slowly (receivables rise)", "The firm pays its suppliers more slowly (payables rise)", "Inventory requirements rise", "Interest rates rise"], a: 1, why: "Higher payables mean less net working capital, which frees cash." },
    { q: "Bond A pays 105 at t = 1 and costs 100. What is the 1-year discount factor d₁?", c: ["1.05", "0.9524", "0.95", "1.00"], a: 1, why: "100 = 105 × d₁, so d₁ = 100/105 = 0.9524 (a 5% yield)." }
  ]
};

window.EXTRA.u2 = {
  intro: { h: "Start here: why the discount rate is about risk", html: `
<div class="bigidea"><b>Big idea.</b> The discount rate is the return investors could get elsewhere on something <i>equally risky</i>. Riskier cash flows get a higher rate, which makes them worth less today. But only one kind of risk counts.</div>
<p>Investors hold many stocks. Risk specific to one company (a CEO quits, a factory floods) averages out across a portfolio, so nobody is paid for bearing it. The risk that can't be diversified is the part that moves with the whole economy: when the market crashes, most things fall together. <b>Beta measures that market-wide sensitivity</b>, and CAPM turns it into a rate:</p>
<div class="f">r = r<sub>f</sub> + β × (market risk premium)</div>
<p>The practical problem: a new project has no stock price, so you can't measure its beta directly. You borrow the beta of public companies that do the same kind of business. That's the comparables method, and it's most of this unit.</p>` },
  insert: [
    { after: 2, h: "Walkthrough: the comparables method, start to finish", html: `
${fig("u2_pipeline", "The comparables pipeline with the lecture's Texas Instruments numbers.")}
<p>Why the unlever and relever steps? A comparable's equity beta mixes two things: how risky its <i>business</i> is and how much <i>debt</i> it carries. Debt magnifies swings for shareholders. Two identical businesses with different debt levels have different equity betas, so you strip out each comparable's debt, average the pure business risk, and then add back the debt <i>your</i> project will carry.</p>
${fig("u2_betabars", "Same business (asset beta 0.75), different leverage. The blue part never changes; leverage stacks the red part on top.")}
<p><b>PS2 Q3 step by step</b> (with taxes, so use MM with taxes):</p>
<ol class="steps">
<li><b>Comparable's cost of equity</b>: Azzon β<sub>E</sub> = 1.6, so r<sub>E</sub> = 6% + 1.6 × 8% = 18.8%.</li>
<li><b>Unlever</b>: Azzon has D/V = 60%, so D/E = 1.5. Solve 18.8% = r<sub>A</sub> + (r<sub>A</sub> − 6%)(1 − 0.34)(1.5), giving r<sub>A</sub> = 12.43%.</li>
<li><b>Relever at the project's 40% debt</b> (D/E = 0.667): r<sub>E</sub> = 12.43% + 6.43% × 0.66 × 0.667 = 15.26%.</li>
<li><b>WACC</b> = 0.6 × 15.26% + 0.4 × 6% × 0.66 = 10.74%.</li>
<li><b>Discount</b>: FCF = (160 − 96 − 15)(0.66) + 15 = 47.34 a year for 3 years, so NPV = −45 + 47.34 × 2.461 = +71.2.</li>
</ol>` }
  ],
  append: {
    4: `${fig("u2_tv", "In the TI example, the terminal value is 83% of total value. A small change in g or r moves the answer a lot.")}`
  },
  confusions: [
    { q: "\"Why not just use the firm's own WACC?\"", a: "Because the rate should match the project's risk. A safe utility shouldn't value a biotech venture at its utility WACC. If the project is in a different line of business, use comparables from that line (PS2 Q3)." },
    { q: "\"Is debt-to-equity the same as debt-to-value?\"", a: "No. D/V = D/(D + E); D/E = D/E. Dell: D = 45.78, E = 86.44, so D/E = 0.53 but D/V = 0.35. Unlevering uses E/V; relevering uses D/E." },
    { q: "\"Book or market values?\"", a: "Market value of equity, always: it's what investors are pricing. Book value of debt is acceptable when the market value isn't available." },
    { q: "\"Which unlevering formula do I use?\"", a: "Lecture: no taxes, β_A = (E/V)β_E (with safe debt). Ocean Carriers and PS2 Q3 had taxes, so they used β_U = β_L/[1 + (1 − t)D/E]. Use the tax version only when the question gives a tax rate and is about WACC with taxes." },
    { q: "\"Why does FF3 add factors if CAPM is what firms use?\"", a: "Small and value stocks earn more than CAPM predicts, so FF3 describes returns better. Firms still mostly use CAPM because it's simple and stable; FF3 is a good sensitivity check." }
  ],
  quiz: [
    { q: "A comparable has β_E = 1.2, D = 40, E = 60 (market values), riskless debt, no taxes. What is its asset beta?", c: ["1.20", "0.72", "0.80", "0.48"], a: 1, why: "β_A = (E/V)β_E = 0.6 × 1.2 = 0.72." },
    { q: "Two comparables have asset betas 0.9 and 1.1. Your project will have D/E = 1 with riskless debt and no taxes. What is its equity beta?", c: ["1.0", "1.5", "2.0", "0.5"], a: 2, why: "Average β_A = 1.0. β_E = 1.0 + 1.0 × 1 = 2.0." },
    { q: "r_f = 3%, MRP = 5%, β = 1.4. What does CAPM give?", c: ["7%", "10%", "8.4%", "11.2%"], a: 1, why: "3% + 1.4 × 5% = 10%." },
    { q: "A firm's equity beta is 1.5 and its debt is riskless. It pays off all its debt (same assets). Its new equity beta will be…", c: ["higher than 1.5", "1.5", "lower than 1.5, equal to its asset beta", "zero"], a: 2, why: "With no debt, equity beta = asset beta, which is below the levered equity beta." },
    { q: "Final-year FCF 20, growth 2% forever, discount rate 10%, final year = year 5. What is the TV's value today?", c: ["255", "158.3", "250", "204"], a: 1, why: "TV₅ = 20 × 1.02 / 0.08 = 255. Today: 255 / 1.1⁵ = 158.3." },
    { q: "Why do small and value stocks matter in Fama-French?", c: ["They're riskier on a total-volatility basis", "Empirically they earn more than CAPM predicts, suggesting undiversifiable risk", "They have higher betas by definition", "They pay higher dividends"], a: 1, why: "SMB and HML capture return patterns that the market factor misses." },
    { q: "Dell: E = 86.44, D = 45.78. What is Dell's D/E?", c: ["0.35", "0.53", "1.89", "0.65"], a: 1, why: "45.78 / 86.44 = 0.53. (D/V would be 0.35.)" },
    { q: "Which is the main reason to relever an average asset beta?", c: ["To remove taxes", "To match the leverage the project itself will carry", "To convert book values to market values", "To adjust for the risk-free rate"], a: 1, why: "The project's equity holders bear the risk of the project's own financing." }
  ]
};

window.EXTRA.u3 = {
  intro: { h: "Start here: shrinking the cash instead of raising the rate", html: `
<div class="bigidea"><b>Big idea.</b> There are two ways to charge for risk. Unit 2 raised the discount rate. This unit lowers the cash flow to a "sure-thing" amount and discounts that at the risk-free rate. Same destination, different road.</div>
${fig("u3_routes", "Two routes to the same present value. Pick one route; never combine them.")}
<p>Why have a second route? Sometimes the market tells you the sure-thing amount directly. A copper mine can sell next year's copper today at the forward price, so the risky copper revenue <i>is</i> a certain amount. No beta, no comparables. And sometimes there are no comparables to estimate a rate from.</p>` },
  insert: [
    { after: 2, h: "Walkthrough: the CAPM certainty equivalent", html: `
${fig("u3_scatter", "The apartments' value rises and falls with the market. That co-movement is what investors charge for.")}
<p><b>PS1 Q3, casino A</b>: two states, 50/50. Market return 15% or 0%; casino cash 750k or 500k; r<sub>f</sub> = 6%.</p>
<ol class="steps">
<li><b>Market averages</b>: E[r<sub>m</sub>] = 7.5%. var(r<sub>m</sub>) = ½(7.5%)² + ½(−7.5%)² = 0.005625.</li>
<li><b>Cash averages</b>: E[CF] = 625k. Deviations: +125k and −125k.</li>
<li><b>Covariance</b> = ½(0.075)(125k) + ½(−0.075)(−125k) = 9,375.</li>
<li><b>Cash-flow beta</b> b = 9,375 / 0.005625 = 1,666,667.</li>
<li><b>Dollar risk premium</b> = b × (E[r<sub>m</sub>] − r<sub>f</sub>) = 1,666,667 × 1.5% = 25,000. So CE = 625k − 25k = 600k.</li>
<li><b>Discount at r<sub>f</sub></b>: 600k / 1.06 = <b>566,038</b>. Casino B gives 556,604, so choose A.</li>
</ol>
<p>In part (b) the casinos don't move with the market. The covariance is zero, so the risk premium is zero and A is worth 625k / 1.06 = 589,623. Same volatility, no market link, no discount.</p>` }
  ],
  confusions: [
    { q: "\"Isn't the CE just the expected value?\"", a: "Only if the cash flow has zero covariance with the market. If it pays more in good times, its CE is below its expected value; if it pays more in bad times, above." },
    { q: "\"A very volatile cash flow must get a big discount.\"", a: "Volatility alone doesn't matter. Covariance with the market does. The casinos in PS1 Q3(b) are risky but unrelated to the market, so they're discounted only at r_f." },
    { q: "\"Isn't the forward price the market's forecast of the future price?\"", a: "No. It's the price you can lock in with certainty today, so it already has the risk premium removed. That's exactly why it's the certainty-equivalent price." },
    { q: "\"Why are the units of b so strange?\"", a: "Because b relates a dollar cash flow to a percentage market return. b × (risk premium in %) gives a risk premium in dollars, which you subtract from expected dollars." }
  ],
  quiz: [
    { q: "States (50/50): market return 20% or 0%; cash flow 150 or 50. r_f = 5%. What is cov(CF, r_m)?", c: ["5", "10", "2.5", "50"], a: 0, why: "E[r_m] = 10%, E[CF] = 100. cov = ½(0.10)(50) + ½(−0.10)(−50) = 5." },
    { q: "Same setup: var(r_m) = 0.01. What is the cash-flow beta?", c: ["50", "500", "5", "0.5"], a: 1, why: "b = cov/var = 5/0.01 = 500." },
    { q: "Same setup: what is the CE and the PV?", c: ["CE 75, PV 71.43", "CE 100, PV 95.24", "CE 97.5, PV 92.86", "CE 50, PV 47.62"], a: 0, why: "Premium = 500 × (10% − 5%) = 25. CE = 100 − 25 = 75. PV = 75/1.05 = 71.43." },
    { q: "A project's cash flow is completely unrelated to the market. Its expected value is 220 in one year; r_f = 10%. Its value today is…", c: ["200", "less than 200 because it's risky", "more than 200", "can't tell without its volatility"], a: 0, why: "b = 0, so CE = E[CF] = 220 and PV = 220/1.1 = 200." },
    { q: "The 2-year copper forward price is $3.00/lb. A mine will produce 1,000 lb in 2 years at $1.00/lb. The 2-year rate is 10%. What is the PV?", c: ["$1,818", "$1,653", "$2,000", "$2,479"], a: 1, why: "CE = 1,000 × (3 − 1) = 2,000. PV = 2,000/1.1² = 1,652.89." },
    { q: "A firm hedges next year's revenue at a guaranteed $H with futures. Under no arbitrage, the certainty equivalent of that revenue is…", c: ["H", "E[revenue]", "H discounted at the risky rate", "zero, since hedging has no value"], a: 0, why: "A hedged cash flow is certain, so its CE is H." },
    { q: "A project operates in a country with political risk. Using the CE logic from class, the firm should…", c: ["raise the discount rate by a political-risk premium", "subtract the political-risk insurance premium from each year's cash flow and discount at the usual rate", "ignore the risk, since it's diversifiable", "discount at the risk-free rate"], a: 1, why: "Insurance (DFC, MIGA, private) turns the risk into a known cost." }
  ]
};

window.EXTRA.u4 = {
  intro: { h: "Start here: what an option really is", html: `
<div class="bigidea"><b>Big idea.</b> An option lets you take the good outcome and walk away from the bad one. Because you keep the upside and cap the downside, an option is always worth something, and it's worth <i>more</i> when the future is more uncertain.</div>
<p>Think of a concert ticket you can resell. If the band becomes huge, you profit. If not, the most you lose is what you paid. That lopsided payoff is the core of every option in this course, including real options (projects) and equity in a levered firm (Unit 9).</p>
${fig("u4_payprofit", "A call's payoff (solid) and profit after the 18.75 premium (dashed). Losses stop at the premium; gains keep going.")}
<p>The hard part is the price. We don't know the probability that the stock goes up, and we don't know how much extra return investors want for risk. The trick in this unit avoids both: build the option's payoff out of stock and bonds, whose prices we do know.</p>` },
  insert: [
    { after: 1, h: "Walkthrough: reading a binomial tree", html: `
${fig("u4_tree1", "The lecture's one-step tree. The call pays 55 in the up state and 0 in the down state.")}
<p>Here's the logic in plain words. The call pays 55 if the stock goes from 100 to 160 and nothing if it goes to 80. The stock's two prices are 80 apart, and the call's two payoffs are 55 apart. So holding 55/80 = 0.6875 shares makes your portfolio swing by exactly the right amount. That's <b>Δ</b>.</p>
<p>But 0.6875 shares are worth 55 in the down state, where the call pays 0. To cancel that, borrow 50 today (you'll owe 55 next year). Now the portfolio pays 110 − 55 = 55 up and 55 − 55 = 0 down: exactly the call. It costs 68.75 − 50 = <b>18.75</b>, so that's what the call must cost.</p>
<p><b>Two steps</b> work the same way, just right to left: find the payoffs at the end, use q to price each node one step back, repeat.</p>
${fig("u4_tree2", "The two-step example (S = K = 40). Final payoffs 14.84, 0, 0 roll back to 7.23 and 0, then to 3.52 today.")}` }
  ],
  confusions: [
    { q: "\"Is q the probability the stock goes up?\"", a: "No. It's a pricing weight that makes the stock earn the risk-free rate on average. The true probability could be 90% and the option's price wouldn't change, because the stock's price already reflects investors' beliefs and risk preferences." },
    { q: "\"Why is B negative?\"", a: "Negative B means borrowing. A call is like owning part of a share with borrowed money: levered upside. A put's replicating portfolio is short the stock and lends (B > 0)." },
    { q: "\"Is r* the annual rate?\"", a: "It's the growth of $1 over one step: r* = e^(r·T/N). For a 6-month, 2-step tree with r = 3.96%, each step is 3 months, so r* = e^(0.0099) = 1.00995. If the exam gives r* or 1 + r directly, use that." },
    { q: "\"Why does volatility raise the option's value if it's 'risk'?\"", a: "The option holder keeps big gains but can't lose more than the premium. Wider swings make the good tail bigger without making the bad tail worse." },
    { q: "\"When would anyone exercise an American call early?\"", a: "Without dividends or other payouts, never: the call is worth more alive than its exercise value. With payouts (dividends, or a project's cash flows in real options), early exercise can make sense." }
  ],
  quiz: [
    { q: "S = 80 → 100 or 60. K = 80, r* = 1.0. What is the call's Δ?", c: ["0.25", "0.5", "0.75", "1.0"], a: 1, why: "Payoffs 20 and 0. Δ = 20/(100 − 60) = 0.5." },
    { q: "Same tree. What is the call worth?", c: ["10", "20", "5", "15"], a: 0, why: "q = (1 − 0.75)/(1.25 − 0.75) = 0.5. C = 0.5 × 20 = 10. (Or: 0.5 × 80 − 30 = 10, since B = (0 − 0.5 × 60)/1 = −30.)" },
    { q: "u = 1.2, d = 0.9, r* = 1.05. What is q?", c: ["0.5", "0.667", "0.333", "0.75"], a: 0, why: "q = (1.05 − 0.9)/(1.2 − 0.9) = 0.15/0.30 = 0.5." },
    { q: "S = 50, u = 1.2, d = 0.9, r* = 1.05, K = 55. What is the call worth?", c: ["2.38", "5.00", "2.50", "0"], a: 0, why: "S_u = 60 → payoff 5; S_d = 45 → 0. C = 0.5 × 5/1.05 = 2.38." },
    { q: "σ = 20% per year, a 1-year option, one step. What is u?", c: ["1.20", "e^0.2 ≈ 1.2214", "0.8187", "1.02"], a: 1, why: "u = e^(σ√T) = e^0.2." },
    { q: "Black-Scholes call with S = K: as σ rises, the call value…", c: ["falls", "rises", "stays the same", "rises only if r > 0"], a: 1, why: "Options gain from volatility." },
    { q: "A call's replicating portfolio is 0.6 shares and B = −40. The stock is 100. What is the call worth?", c: ["60", "20", "100", "40"], a: 1, why: "C = ΔS + B = 60 − 40 = 20." },
    { q: "You buy a call for 5 with strike 50. At expiration the stock is 53. Your payoff and profit are…", c: ["3 and −2", "3 and 3", "0 and −5", "8 and 3"], a: 0, why: "Payoff max(0, 53 − 50) = 3; profit = 3 − 5 = −2." }
  ]
};

window.EXTRA.u5 = {
  intro: { h: "Start here: flexibility is an option", html: `
<div class="bigidea"><b>Big idea.</b> Regular NPV pretends you'll ride a project all the way down if things go badly. Real managers don't: they sell, shrink, or stop. That ability to cut off the bad branch is an option, and options always add value.</div>
<p>Take Air Jordan. Without flexibility, you're stuck with whatever happens. With the right to sell the planes for $1.75M, the bad outcome can't fall below $1.75M. That floor is exactly a put option: the right to sell at a fixed price.</p>
${fig("u5_floor", "The abandonment option puts a floor under the project's value at the salvage price of 1.75.")}` },
  insert: [
    { after: 2, h: "Walkthrough: Air Jordan in pictures", html: `
${fig("u5_aj", "The only thing that changes is the bad branch: 1.25 becomes 1.75.")}
<ol class="steps">
<li><b>Value without the option.</b> Expected value next year 0.6 × 3.2 + 0.4 × 1.25 = 2.42. Discount at the comparable's 21%: 2.0. Minus 2.1 cost = −0.1. Reject.</li>
<li><b>Payoffs with the option.</b> Up: keep flying, 3.2. Down: sell planes, 1.75.</li>
<li><b>Copy those payoffs</b> with the comparable security (200 → 320 or 125) and 8% bonds. The payoffs differ by 1.45M; the security's prices differ by 195. So hold 1.45M/195 = 7,435.9 units. In the down state those units are worth 929,487, so you need bonds paying 1.75M − 929,487 = 820,513 next year, which cost 759,734 today.</li>
<li><b>Price</b> = 200 × 7,435.9 + 759,734 = 2.247M. Option value = 2.247 − 2.0 = 0.247M. NPV with the option = +0.147M. Accept.</li>
</ol>` },
    { after: 4, h: "Walkthrough: when the cash flows are known (PS2 Q4)", html: `
${fig("u5_ps2q4", "With certain cash flows, the option is just a stopping rule: quit once everything ahead is negative.")}
<p>No tree is needed when nothing is uncertain. After-tax cash flow is (revenue − expenses) × 0.65. Years 1–6 are positive; years 7–10 are all negative. Running the full 10 years gives NPV = −0.52; stopping after year 6 gives NPV = +1.77. The right to abandon is worth 2.28 and turns a bad project into a good one.</p>` }
  ],
  confusions: [
    { q: "\"Option value or NPV with the option?\"", a: "Option value = value with flexibility − value without (2.247 − 2.0 = 0.247). NPV with the option = value with flexibility − investment (2.247 − 2.1 = 0.147). Read the question carefully." },
    { q: "\"Why can't I just use the decision tree at 21%?\"", a: "The option removes the bad outcome, so the flexible project is less risky than the comparable. 21% overstates its risk and gives 2.165 instead of 2.247. Replication or q gets the risk right automatically (implied rate ≈ 16.6%)." },
    { q: "\"Abandonment is a put? I thought real options were calls.\"", a: "It depends on the right. The right to sell (abandon for salvage) is a put. The right to buy into something (invest, expand, launch Mark II) is a call." },
    { q: "\"Where do u and d come from in real options?\"", a: "Either from a traded comparable's tree (Air Jordan: 320/200 = 1.6 and 125/200 = 0.625) or from the project's volatility: u = e^(σ√dt). Both gave the same numbers here." }
  ],
  quiz: [
    { q: "A project is worth 100 or 40 next year (50/50). You can sell the assets for 60 at that point. What are the payoffs with the abandonment option?", c: ["100 and 40", "100 and 60", "60 and 60", "40 and 60"], a: 1, why: "Keep the project when it's worth 100; sell for 60 when it's worth only 40." },
    { q: "Same project: u = 1.25, d = 0.5 relative to today's value of 80, r* = 1.05. What is q?", c: ["0.733", "0.5", "0.6", "0.4"], a: 0, why: "q = (1.05 − 0.5)/(1.25 − 0.5) = 0.55/0.75 = 0.733." },
    { q: "Using q = 0.733 and r* = 1.05, what is the project worth with the option (payoffs 100 and 60)?", c: ["80.0", "85.0", "90.0", "95.2"], a: 1, why: "(0.733 × 100 + 0.267 × 60)/1.05 = (73.3 + 16.0)/1.05 = 85.0." },
    { q: "The project without the option is worth 80 today (it's the underlying). With the option it's worth 85. The abandonment option is worth…", c: ["5", "85", "−5", "can't tell without the investment"], a: 0, why: "With − without = 85 − 80 = 5." },
    { q: "Which real option is most like a call?", c: ["Abandoning for salvage", "Shutting down temporarily", "Delaying an investment until next year", "Selling assets if demand is low"], a: 2, why: "Delaying keeps the right to buy into the project later by paying the investment cost: a call." },
    { q: "Known after-tax cash flows: +5, +4, −1, +3, −2, −3. Abandonment is free at any time. When is it optimal to stop (ignore discounting)?", c: ["After year 2", "After year 4", "After year 3", "Never"], a: 1, why: "After year 2, the rest (−1, +3, −2, −3) sums to −3, but stopping after year 4 avoids only −2 and −3 while keeping +3. After year 4, everything left is negative, so stop then." },
    { q: "A mine's payoff is copied by going long 1,000 lb of forwards and buying bonds that pay 500 next year (r_f = 0). The mine is worth…", c: ["500", "500 plus the forward price × 1,000", "1,000", "0"], a: 0, why: "Entering a forward costs nothing, so the portfolio costs only the bonds: 500." }
  ]
};
