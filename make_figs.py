"""Generates figs.js: every diagram and chart used in the lessons, as theme-aware inline SVG.
Colors come from CSS classes (styles.css), so figures follow the app's dark palette."""
import json
from math import exp, sqrt

F = {}
def esc(s): return str(s).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
def svg(key, w, h, body, label, maxw=None):
    st = f' style="max-width:{maxw}px"' if maxw else ""
    F[key] = (f'<svg class="fig" viewBox="0 0 {w} {h}"{st} role="img" aria-label="{esc(label)}">'
              '<defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">'
              '<path d="M0,0 L10,5 L0,10 z" style="fill:var(--muted)"/></marker></defs>' + body + '</svg>')
def t(x, y, s, cls="t", a="start", extra=""): return f'<text x="{x:.1f}" y="{y:.1f}" class="{cls}" text-anchor="{a}" {extra}>{esc(s)}</text>'
AH = ' marker-end="url(#ah)"'
def line(x1, y1, x2, y2, cls="ax", arrow=False): return f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" class="{cls}"' + (AH if arrow else "") + '/>'
def rect(x, y, w, h, cls="box", rx=6): return f'<rect x="{x:.1f}" y="{y:.1f}" width="{max(w,0):.1f}" height="{max(h,0):.1f}" rx="{rx}" class="{cls}"/>'
def box(x, y, w, h, lines, cls="box", tcls="t", first_bold=True):
    out = rect(x, y, w, h, cls)
    n = len(lines); lh = 15
    y0 = y + h / 2 - (n - 1) * lh / 2 + 4
    for i, s in enumerate(lines):
        out += t(x + w / 2, y0 + i * lh, s, ("tb" if (i == 0 and first_bold) else tcls), "middle")
    return out
def money(v): return f"{v:,.0f}"

# ---------------- course map ----------------
b = ""
cols = [("1 · VALUE THE CASH", ["Unit 1: cash flows, NPV", "Unit 2: discount rate (risk)", "Unit 3: certainty equivalents"], "u1"),
        ("2 · ADD FLEXIBILITY", ["Unit 4: option pricing", "Unit 5: abandonment", "Unit 6: timing, land, growth"], "u4"),
        ("3 · CHOOSE FINANCING", ["Unit 7: MM and taxes", "Unit 8: distress, trade-off", "Unit 9: debt–equity conflicts", "Unit 10: stakeholders, pecking order"], "u7")]
W = 640
b += box(170, 8, 300, 46, ["Value of a firm or project", "= what it adds for its owners"], "boxa")
for i, (h, items, _) in enumerate(cols):
    x = 12 + i * 210
    b += line(320, 54, x + 95, 84, "ax", True)
    b += t(x + 95, 100, h, "tb", "middle")
    for j, s in enumerate(items):
        b += box(x, 110 + j * 40, 190, 32, [s], "box", "t", False)
b += t(320, 290, "Question each part answers:", "t", "middle")
b += t(117, 310, "What is it worth?", "lbl", "middle") + t(327, 310, "What's it worth if we can adapt?", "lbl", "middle") + t(537, 310, "Does how we pay for it matter?", "lbl", "middle")
svg("map", W, 322, b, "Course map: value the cash flows, add flexibility, then choose financing")

# ---------------- Unit 1 ----------------
steps = [("Sales", 60000, "total"), ("− Costs", -39000, "d"), ("− Dep", -16667, "d"), ("EBIT", 4333, "total"), ("− Tax 40%", -1733, "d"),
         ("NOPAT", 2600, "total"), ("+ Dep", 16667, "u"), ("− ΔNWC", -5000, "d"), ("FCF", 14267, "total")]
W, H, top, bot = 640, 260, 20, 210
sc = (bot - top) / 60000
x0, bw, gap = 20, 54, 14
b = line(10, bot, W - 10, bot)
run = 0
for i, (lab, v, kind) in enumerate(steps):
    x = x0 + i * (bw + gap)
    if kind == "total":
        run = v; y1, y2 = bot - v * sc, bot; cls = "bara"
    else:
        start = run; run = run + v
        y1, y2 = bot - max(start, run) * sc, bot - min(start, run) * sc; cls = "barg" if v > 0 else "barb"
    b += rect(x, y1, bw, y2 - y1, cls, 2)
    b += t(x + bw / 2, y1 - 5, money(abs(v)), "num", "middle")
    b += t(x + bw / 2, bot + 16, lab, "t", "middle")
b += t(W - 12, bot + 36, "Year 1 of Example #1 (values in $)", "lbl", "end")
svg("u1_waterfall", W, H + 12, b, "Waterfall from sales of 60,000 down to free cash flow of 14,267 in year 1")

W, H, mid = 660, 250, 120
b = line(30, mid, 640, mid)
cf = [-54000, 14267, 19447, 34208]; pv = [-54000, 13696, 17883, 30149]; ys = ["", "÷ 1.0417", "÷ 1.0428²", "÷ 1.0430³"]
sc = 95 / 54000
for i in range(4):
    x = 60 + i * 165
    hgt = abs(cf[i]) * sc
    if cf[i] < 0:
        b += f'<line x1="{x}" y1="{mid}" x2="{x}" y2="{mid+hgt:.1f}" class="ln bad" marker-end="url(#ah)"/>'
        b += t(x + 8, mid + hgt - 4, money(cf[i]), "num")
    else:
        b += f'<line x1="{x}" y1="{mid}" x2="{x}" y2="{mid-hgt:.1f}" class="ln good" marker-end="url(#ah)"/>'
        b += t(x + 8, mid - hgt + 10, "+" + money(cf[i]), "num")
        b += t(x + 8, mid + 18, ys[i], "t")
        b += t(x + 8, mid + 34, "= " + money(pv[i]) + " today", "lbl")
    b += t(x, mid - (4 if cf[i] < 0 else -50) + (0 if cf[i] < 0 else 0), "", "t")
    b += t(x - 4, H - 6, f"t = {i}", "tb", "middle")
b += t(640, 30, "NPV = 13,696 + 17,883 + 30,149 − 54,000 = 7,728", "tb", "end")
svg("u1_timeline", W, H, b, "Timeline: −54,000 at t0, then +14,267, +19,447, +34,208, each discounted at its own yield")

mats = ["3m", "6m", "1y", "2y", "3y", "5y", "7y", "10y", "20y", "30y"]
c25 = [4.35, 4.24, 4.17, 4.28, 4.30, 4.42, 4.52, 4.62, 4.91, 4.85]
c21 = [0.09, 0.09, 0.11, 0.14, 0.20, 0.43, 0.74, 1.04, 1.60, 1.81]
c07 = [5.07, 5.11, 5.00, 4.80, 4.71, 4.68, 4.68, 4.68, 4.87, 4.79]
W, H = 600, 230; L, R, T, B = 44, 500, 14, 196
X = lambda i: L + i * (R - L) / 9; Y = lambda v: B - v / 5.5 * (B - T)
b = line(L, B, R, B) + line(L, T, L, B)
for v in [0, 1, 2, 3, 4, 5]:
    b += line(L, Y(v), R, Y(v), "grid") + t(L - 6, Y(v) + 3, f"{v}%", "t", "end")
for i, m in enumerate(mats): b += t(X(i), B + 15, m, "t", "middle")
for data, cls, lab in [(c25, "accent", "Jan 2025"), (c07, "gold", "Jan 2007 (inverted)"), (c21, "muted", "Jan 2021 (steep)")]:
    b += f'<polyline class="ln {cls}" points="{" ".join(f"{X(i):.1f},{Y(v):.1f}" for i, v in enumerate(data))}"/>'
    b += "".join(f'<circle cx="{X(i):.1f}" cy="{Y(v):.1f}" r="2.5" class="dot {cls}"/>' for i, v in enumerate(data))
    if cls == "gold": b += t(X(0), Y(data[0]) - 8, lab, "lbl")
    else: b += t(R + 8, Y(data[-1]) + (8 if cls == "accent" else 3), lab, "lbl")
svg("u1_yield", W, H, b, "Treasury yield curves in 2025, 2007 and 2021: different maturities have different yields")

b = box(10, 20, 150, 50, ["Inventory ↑", "cash spent, not yet sold"], "boxb") + box(10, 90, 150, 50, ["Receivables ↑", "sold, not yet collected"], "boxb") + box(10, 160, 150, 50, ["Payables ↑", "bought, not yet paid"], "boxg")
b += line(160, 45, 260, 95, "ax", True) + line(160, 115, 260, 110, "ax", True) + line(160, 185, 260, 125, "ax", True)
b += box(262, 80, 150, 60, ["NWC = Inv + AR − AP", "the cash tied up"], "boxa")
b += line(412, 110, 470, 110, "ax", True)
b += box(472, 70, 160, 80, ["Cash flow = −ΔNWC", "NWC up → cash out", "NWC down → cash in", ""], "box")
svg("u1_nwc", 640, 220, b, "How inventory, receivables and payables combine into net working capital")

# ---------------- Unit 2 ----------------
W, H = 360, 430
items = [["Comparable equity betas", "Dell 0.87 · HPE 1.24"], ["1. Unlever: × E/V", "Dell 0.569 · HPE 0.688"], ["2. Average asset beta", "β_A = 0.629"],
         ["3. Relever to the project's D/E", "TI's division: no debt, keep 0.629"], ["4. CAPM", "1.6% + 0.629 × 6.6% = 5.75%"], ["5. Discount the FCFs", "NPV = 430.2 − 200 = 230.2"]]
b = ""
for i, it in enumerate(items):
    y = 8 + i * 70
    b += box(20, y, 320, 52, it, "boxa" if i in (2, 4) else "box")
    if i < len(items) - 1: b += line(180, y + 52, 180, y + 68, "ax", True)
svg("u2_pipeline", W, H, b, "Comparables method: unlever each beta, average, relever, CAPM, discount", 380)

W, H = 560, 270; L, B, T = 60, 220, 50
des = [0, 0.5, 1, 2]; bA = 0.75
sc = (B - T) / 2.4
b = line(L, B, W - 20, B) + line(L, T, L, B)
for v in [0, 0.5, 1, 1.5, 2]: b += line(L, B - v * sc, W - 20, B - v * sc, "grid") + t(L - 6, B - v * sc + 3, f"{v:.1f}", "t", "end")
for i, de in enumerate(des):
    x = L + 30 + i * 120
    be = bA + bA * de
    b += rect(x, B - bA * sc, 60, bA * sc, "bara", 2)
    if de: b += rect(x, B - be * sc, 60, (be - bA) * sc, "barb", 2)
    b += t(x + 30, B - be * sc - 6, f"β_E = {be:.3g}", "num", "middle") + t(x + 30, B + 16, f"D/E = {de}", "t", "middle")
b += rect(L + 10, 6, 12, 10, "bara", 2) + t(L + 28, 15, "business risk (β_A = 0.75)", "lbl") + rect(L + 210, 6, 12, 10, "barb", 2) + t(L + 228, 15, "added by leverage", "lbl")
svg("u2_betabars", W, H, b, "Same asset beta 0.75: equity beta rises to 1.125, 1.5 and 2.25 as D/E goes to 0.5, 1 and 2")

W, H = 600, 110
tot = 430.0; a = 72.3; tv = 357.7; L, R = 20, 580
s = (R - L) / tot
b = rect(L, 30, a * s, 34, "barg", 3) + rect(L + a * s, 30, tv * s, 34, "bara", 3)
b += t(L + a * s / 2, 52, "72", "tb", "middle") + t(L + a * s + tv * s / 2, 52, "Terminal value: 358 (83%)", "tbi", "middle")
b += t(L, 22, "PV of years 1–10 FCF", "lbl") + t(R, 22, "PV of everything after year 10", "lbl", "end")
b += t(L, 90, "TI's PC division: total value of future cash flows ≈ 430 ($M)", "t")
svg("u2_tv", W, H, b, "Texas Instruments example: 83 percent of value comes from the terminal value")

# ---------------- Unit 3 ----------------
W, H = 620, 210
b = t(10, 20, "Route A · risk-adjusted discount rate", "tb")
b += box(10, 30, 150, 50, ["E[CF]", "expected cash flow"]) + line(160, 55, 230, 55, "ax", True)
b += box(232, 30, 200, 50, ["÷ (1 + r_risky)", "risk in the denominator"], "boxb") + line(432, 55, 500, 55, "ax", True)
b += box(502, 30, 108, 50, ["PV"], "boxa")
b += t(10, 120, "Route B · certainty equivalent", "tb")
b += box(10, 130, 150, 50, ["E[CF]", "expected cash flow"]) + line(160, 155, 190, 155, "ax", True)
b += box(192, 130, 150, 50, ["− $ risk premium", "= CE (risk in numerator)"], "boxb") + line(342, 155, 368, 155, "ax", True)
b += box(370, 130, 120, 50, ["÷ (1 + r_f)", "risk-free"], "boxg") + line(490, 155, 500, 155, "ax", True)
b += box(502, 130, 108, 50, ["same PV"], "boxa")
b += t(310, 204, "Do one or the other. Doing both charges for risk twice.", "lbl", "middle")
svg("u3_routes", W, H, b, "Two routes to the same present value: risky discount rate, or certainty equivalent at the risk-free rate")

W, H = 560, 270; L, R, T, B = 60, 520, 30, 220
X = lambda r: L + (r + 0.25) / 0.6 * (R - L); Y = lambda v: B - v / 40 * (B - T)
b = line(L, B, R, B) + line(L, T, L, B)
for v in [0, 10, 20, 30, 40]: b += line(L, Y(v), R, Y(v), "grid") + t(L - 6, Y(v) + 3, f"${v}M", "t", "end")
for r in [-0.2, -0.1, 0, 0.1, 0.2, 0.3]: b += t(X(r), B + 15, f"{r*100:.0f}%", "t", "middle")
b += t((L + R) / 2, B + 32, "Market return", "lbl", "middle")
pts = [(-0.20, 10, "Depression 1/16"), (-0.05, 18, "Recession 7/16"), (0.30, 35, "Recovery 1/2")]
b += f'<polyline class="ln accent dash" points="{X(-0.22):.1f},{Y(8.3):.1f} {X(0.32):.1f},{Y(36.7):.1f}"/>'
for r, v, lab in pts:
    b += f'<circle cx="{X(r):.1f}" cy="{Y(v):.1f}" r="6" class="dot accent"/>' + t(X(r) + 10, Y(v) + 4 if r < 0.25 else Y(v) + 18, f"{lab}: ${v}M", "lbl", "start" if r < 0.25 else "end")
b += line(L, Y(26), R, Y(26), "ln muted thin dash") + t(R, Y(26) - 5, "E[V] = 26", "lbl", "end")
b += t(L, 12, "Value is high when the market is high → positive covariance → a discount", "tb")
svg("u3_scatter", W, H, b, "Apartment values rise with the market return, so their cash flow has positive market risk")

# ---------------- Unit 4 ----------------
def tree1(key, S0, Su, Sd, Vu, Vd, V0, q, title, label, extra=""):
    W, H = 520, 210
    b = box(20, 80, 150, 54, [f"S = {S0}", f"Value = {V0}"], "boxa")
    b += line(170, 100, 330, 45, "ax", True) + line(170, 115, 330, 165, "ax", True)
    b += t(240, 62, f"q = {q}", "lbl", "middle") + t(240, 158, f"1 − q = {1-float(q):.3g}", "lbl", "middle")
    b += box(332, 18, 170, 54, [f"S_u = {Su}", f"payoff {Vu}"], "boxg") + box(332, 138, 170, 54, [f"S_d = {Sd}", f"payoff {Vd}"], "boxb")
    b += t(20, 20, title, "tb") + extra
    svg(key, W, H, b, label)
tree1("u4_tree1", 100, 160, 80, "55", "0", "18.75", "0.375", "Call, K = 105, r = 10%", "One-step tree: stock 100 goes to 160 or 80; call pays 55 or 0; worth 18.75 today",
      t(20, 205, "C₀ = (0.375 × 55 + 0.625 × 0) / 1.10 = 18.75", "lbl"))

W, H = 620, 300
u = exp(0.31557 * 0.5); d = 1 / u; R = exp(0.0396 * 0.25); q = (R - d) / (u - d)
S = {(0, 0): 40, (1, 1): 40 * u, (1, 0): 40 * d, (2, 2): 40 * u * u, (2, 1): 40.0, (2, 0): 40 * d * d}
C = {(2, 2): max(0, S[(2, 2)] - 40), (2, 1): 0, (2, 0): 0}
C[(1, 1)] = (q * C[(2, 2)] + (1 - q) * C[(2, 1)]) / R; C[(1, 0)] = 0; C[(0, 0)] = q * C[(1, 1)] / R
pos = {(0, 0): (20, 125), (1, 1): (230, 50), (1, 0): (230, 200), (2, 2): (440, 10), (2, 1): (440, 125), (2, 0): (440, 240)}
b = ""
for (n, j), (x, y) in pos.items():
    if n < 2:
        for jj in (j + 1, j):
            x2, y2 = pos[(n + 1, jj)]
            b += line(x + 150, y + 25, x2, y2 + 25, "ax", True)
for (n, j), (x, y) in pos.items():
    cls = "boxa" if n == 0 else ("boxg" if C[(n, j)] > 0 else "box")
    b += box(x, y, 150, 50, [f"S = {S[(n,j)]:.2f}", f"C = {C[(n,j)]:.2f}"], cls)
b += t(20, 292, f"u = 1.1709, d = 0.8540, r* = 1.00995, q = {q:.4f}. Work right to left.", "lbl")
svg("u4_tree2", W, H, b, "Two-step tree for a call with S = K = 40: final payoffs 14.84, 0, 0 roll back to 3.52")

W, H = 560, 240; L, R, T, B = 50, 530, 20, 170
X = lambda s: L + (s - 60) / 120 * (R - L); Y = lambda v: B - (v + 25) / 85 * (B - T)
b = line(L, Y(0), R, Y(0)) + line(L, T, L, 200)
b += f'<polyline class="ln good" points="{X(60):.1f},{Y(0):.1f} {X(105):.1f},{Y(0):.1f} {X(165):.1f},{Y(60):.1f}"/>'
b += f'<polyline class="ln bad dash" points="{X(60):.1f},{Y(-18.75):.1f} {X(105):.1f},{Y(-18.75):.1f} {X(165):.1f},{Y(41.25):.1f}"/>'
b += t(X(150), Y(52), "payoff", "lbl") + t(X(158), Y(27), "profit", "lbl")
b += line(X(105), Y(0) - 4, X(105), Y(0) + 4) + t(X(105), Y(0) + 16, "K = 105", "t", "middle")
b += f'<circle cx="{X(123.75):.1f}" cy="{Y(0):.1f}" r="4" class="dot gold"/>' + t(X(123.75) + 6, Y(0) - 8, "break-even 123.75", "lbl")
b += t(L + 4, Y(-18.75) + 14, "max loss = premium 18.75", "lbl") + t(R, Y(0) + 16, "S_T", "t", "end")
svg("u4_payprofit", W, H, b, "Call payoff versus profit: profit is payoff minus the 18.75 premium, break-even at 123.75")

# ---------------- Unit 5 ----------------
def mini_tree(x0, title, top_lines, root, up, down, down_cls="boxb"):
    b = t(x0, 16, title, "tb")
    b += box(x0, 70, 110, 50, root, "boxa") + line(x0 + 110, 85, x0 + 160, 50, "ax", True) + line(x0 + 110, 105, x0 + 160, 140, "ax", True)
    b += box(x0 + 162, 26, 120, 46, up, "boxg") + box(x0 + 162, 120, 120, 46, down, down_cls)
    return b
b = mini_tree(10, "Without the option", None, ["PV 2.000", "NPV −0.10"], ["$3.2M", "p = 60%"], ["$1.25M", "p = 40%"])
b += mini_tree(320, "With the option to sell planes", None, ["PV 2.247", "NPV +0.147"], ["$3.2M", "keep flying"], ["$1.75M", "sell the planes"], "boxg")
b += t(310, 195, "Option value = 2.247 − 2.000 = 0.247 ($M)", "tb", "middle")
svg("u5_aj", 620, 205, b, "Air Jordan with and without the abandonment option")

W, H = 520, 220; L, R, T, B = 50, 500, 20, 180
X = lambda v: L + v / 4 * (R - L); Y = lambda v: B - v / 4 * (B - T)
b = line(L, B, R, B) + line(L, T, L, B)
b += f'<polyline class="ln muted dash" points="{X(0):.1f},{Y(0):.1f} {X(4):.1f},{Y(4):.1f}"/>'
b += f'<polyline class="ln good" points="{X(0):.1f},{Y(1.75):.1f} {X(1.75):.1f},{Y(1.75):.1f} {X(4):.1f},{Y(4):.1f}"/>'
b += t(X(0.1), Y(1.75) - 8, "floor: sell for 1.75", "lbl") + t(X(3.2), Y(3.0), "keep: V", "lbl")
b += t(X(2.75), Y(2.75) + 22, "without the option: V", "lbl") + t(R, B + 16, "Project value next year ($M)", "t", "end")
b += f'<circle cx="{X(1.25):.1f}" cy="{Y(1.75):.1f}" r="4" class="dot gold"/>' + t(X(1.25) - 4, Y(1.75) + 34, "bad state: 1.25 → 1.75", "lbl", "middle")
svg("u5_floor", W, H, b, "An abandonment option puts a floor under project value at the salvage price")

cfs = [1.95, 2.6, 0.65, 1.3, 0.65, 1.3, -0.65, -0.65, -1.3, -1.95]
W, H = 560, 230; L, R, T, B, Z = 40, 540, 20, 200, 120
sc = 32
b = line(L, Z, R, Z) + line(L, T, L, B)
for i, v in enumerate(cfs):
    x = L + 10 + i * 48
    b += rect(x, Z - v * sc if v > 0 else Z, 32, abs(v) * sc, "barg" if v > 0 else "barb", 2)
    b += t(x + 16, (Z - v * sc - 5) if v > 0 else (Z + abs(v) * sc + 13), f"{v:+.2f}", "num", "middle")
    b += t(x + 16, Z + (13 if v > 0 else -5), f"{i+1}", "t", "middle")
xa = L + 10 + 6 * 48 - 8
b += line(xa, T, xa, B, "ln gold dash") + t(xa + 4, T + 10, "abandon after year 6", "lbl")
b += t(L, 214, "After-tax cash flow by year ($M). Every flow after year 6 is negative.", "lbl")
svg("u5_ps2q4", W, H, b, "PS2 Q4 after-tax cash flows by year, with the abandonment point after year 6")

# ---------------- Unit 6 ----------------
b = box(10, 70, 140, 56, ["Oil field today", "S = 2,000, K = 1,800"], "boxa")
b += line(150, 88, 250, 45, "ax", True) + line(150, 108, 250, 150, "ax", True) + t(190, 55, "q = 0.556", "lbl", "middle")
b += box(252, 18, 170, 54, ["S = 2,500", "invest: 2,500 − 1,800 = 700"], "boxg") + box(252, 126, 170, 54, ["S = 1,600", "don't invest: 0"], "boxb")
b += box(450, 18, 160, 54, ["Wait", "0.556 × 700 / 1.05 = 370"], "boxa") + box(450, 126, 160, 54, ["Invest now", "2,000 − 1,800 = 200"], "box")
b += t(530, 200, "370 > 200 → wait", "tb", "middle")
svg("u6_opek", 620, 210, b, "OPEK: waiting is worth 370 versus 200 for investing now")

b = box(10, 76, 160, 64, ["Today, P = $100k", "6 units: 120k ✓", "9 units: 90k"], "boxa", "t")
b += line(170, 95, 260, 50, "ax", True) + line(170, 120, 260, 165, "ax", True) + t(210, 62, "q = 0.467", "lbl", "middle")
b += box(262, 14, 170, 64, ["Up, P = $120k", "6 units: 240k", "9 units: 270k ✓"], "boxg", "t") + box(262, 136, 170, 64, ["Down, P = $90k", "6 units: 60k ✓", "9 units: 0"], "boxb", "t")
b += box(446, 70, 170, 76, ["Land today", "(0.467·270 + 0.533·60)/1.12", "= $141k", "vs $120k to build now"], "boxa", "t")
svg("u6_condo", 620, 214, b, "Condo lot tree: build 9 units in the good state, 6 in the bad state; land worth 141k")

W, H = 660, 200
b = line(30, 110, 640, 110)
vals = [-450, 60, 59, 195, 310, 125]
for i, v in enumerate(vals):
    x = 50 + i * 105
    b += line(x, 104, x, 116) + t(x, 132, f"t = {i}", "t", "middle") + t(x, 150, f"{v:+d}", "num", "middle")
b += t(50, 172, "Mark I alone: NPV at 20% = −46.45", "lbl")
x3 = 50 + 3 * 105
b += f'<polygon points="{x3},{40} {x3+22},{62} {x3},{84} {x3-22},{62}" class="boxa"/>' + t(x3, 66, "?", "tb", "middle")
b += line(x3, 84, x3, 104, "ax")
b += box(x3 + 30, 28, 255, 62, ["Decide on Mark II at t = 3", "pay 900 for CFs worth 800 (463 today)", "σ = 35% → call worth 55.27"], "box", "t")
b += t(640, 190, "−46.45 + 55.27 = +8.82 → launch Mark I", "tb", "end")
svg("u6_mark", W, H, b, "Mark I cash flows with the Mark II decision at year 3")

npv = sorted([80.2, 46.2, 33.8, 29.2, 5.1, -7.0, -10.7, -18.6, -8.8, -8.4, -2.8], reverse=True)
W, H, Z = 600, 240, 150; L = 40; sc = 1.4
b = line(L, Z, 590, Z) + line(L, 10, L, 190)
for i, v in enumerate(npv):
    x = L + 10 + i * 49
    cls = "barg" if v > 0 else "barb faded"
    b += rect(x, Z - v * sc if v > 0 else Z, 34, abs(v) * sc, cls, 2)
    b += t(x + 17, (Z - v * sc - 5) if v > 0 else (Z + abs(v) * sc + 12), f"{v:g}", "num", "middle")
b += t(L + 10, 208, "Disney's 11 hypothetical sequels, NPV in $M (Exhibit 7).", "lbl")
b += t(L + 10, 224, "Make all: 138.2/11 = 12.56 per film. Make only the green ones: 194.5/11 = 17.68.", "lbl")
svg("u6_disney", W, H, b, "Disney sequel NPVs: five positive, six negative; the option lets you skip the negative ones")

# ---------------- Unit 7 ----------------
W, H = 600, 170; L, R = 110, 580; s = (R - L) / 1000
def stack(y, parts, lab):
    out = t(L - 8, y + 22, lab, "tb", "end"); x = L
    for v, cls, name in parts:
        out += rect(x, y, v * s, 34, cls, 2) + t(x + v * s / 2, y + 22, f"{name} {v}", "tbi" if cls != "barm" else "t", "middle"); x += v * s
    return out
b = t(L, 16, "EBIT = $1,000k a year, t = 30%", "lbl")
b += stack(28, [(700, "bara", "Equity"), (300, "barm", "Gov't")], "Plan I · no debt")
b += stack(84, [(560, "bara", "Equity"), (200, "barg", "Debt"), (240, "barm", "Gov't")], "Plan II · $2M debt")
b += t(L, 150, "Investors get 700k vs 760k. The extra 60k is the tax shield: 0.30 × 200k of interest.", "lbl")
svg("u7_split", W, H, b, "Water Products: with debt, the government's slice shrinks from 300 to 240 and investors get 760 instead of 700")

W, H = 560, 230; L, B, Z = 60, 200, 120; sc = 1.1
b = line(L, Z, 540, Z) + line(L, 10, L, 210)
bars = [("All equity", "good", 40), ("All equity", "bad", -10), ("500 debt", "good", 75), ("500 debt", "bad", -25)]
for i, (grp, st, v) in enumerate(bars):
    x = L + 30 + i * 115
    b += rect(x, Z - v * sc if v > 0 else Z, 60, abs(v) * sc, "barg" if v > 0 else "barb", 2)
    b += t(x + 30, (Z - v * sc - 6) if v > 0 else (Z + abs(v) * sc + 14), f"{v:+d}%", "num", "middle")
    b += t(x + 30, Z + (16 if v > 0 else -6), f"{st} state", "t", "middle")
b += t(L + 90, 222, "All equity: E[r] = 15%", "lbl", "middle") + t(L + 320, 222, "With 500 of debt: E[r] = 25%, wider swings", "lbl", "middle")
svg("u7_robot", W, H, b, "Coffee robot equity returns: +40 or −10 percent all-equity, +75 or −25 percent with debt")

# ---------------- Unit 8 ----------------
taxr = [0.40, 0.40, 0.38, 0.36, 0.34, 0.32, 0.30, 0.28, 0.26, 0.24, 0.22, 0.20, 0.18]
gain = [taxr[D] * D for D in range(13)]; dist = [0.025 * D * 5 for D in range(13)]; net = [g - c for g, c in zip(gain, dist)]
W, H = 580, 270; L, R, T, B = 50, 450, 20, 220
X = lambda D: L + D / 12 * (R - L); Y = lambda v: B - v / 2.4 * (B - T)
b = line(L, B, R, B) + line(L, T, L, B)
for v in [0, 0.5, 1, 1.5, 2]: b += line(L, Y(v), R, Y(v), "grid") + t(L - 6, Y(v) + 3, f"{v:g}", "t", "end")
for D in range(0, 13, 2): b += t(X(D), B + 15, str(D), "t", "middle")
b += t((L + R) / 2, B + 32, "Debt ($M)", "lbl", "middle")
for data, cls, lab in [(gain, "good", "tax gain"), (dist, "bad", "exp. distress"), (net, "accent", "net gain")]:
    b += f'<polyline class="ln {cls}" points="{" ".join(f"{X(D):.1f},{Y(v):.1f}" for D, v in enumerate(data))}"/>'
    b += t(R + 8, Y(data[-1]) + 3, lab, "lbl")
b += f'<circle cx="{X(7):.1f}" cy="{Y(net[7]):.1f}" r="5" class="dot gold"/>' + t(X(7), Y(net[7]) - 10, "peak D = 7 → V = 13.085", "tb", "middle")
svg("u8_nadir", W, H, b, "Nadir: tax gain flattens, expected distress cost rises, and net value peaks at 7 million of debt")

W, H = 600, 120; L, R = 20, 580
Xz = lambda z: L + z / 5 * (R - L)
b = rect(Xz(0), 40, Xz(1.8) - Xz(0), 34, "barb faded", 0) + rect(Xz(1.8), 40, Xz(2.99) - Xz(1.8), 34, "barm", 0) + rect(Xz(2.99), 40, Xz(5) - Xz(2.99), 34, "barg faded", 0)
b += t((Xz(0) + Xz(1.8)) / 2, 62, "distress", "tb", "middle") + t((Xz(1.8) + Xz(2.99)) / 2, 62, "grey", "tb", "middle") + t((Xz(2.99) + Xz(5)) / 2, 62, "safe", "tb", "middle")
b += t(Xz(1.8), 90, "1.8", "t", "middle") + t(Xz(2.99), 90, "2.99", "t", "middle")
for z, lab in [(0.49, "Golden Minerals 0.49"), (4.53, "Chevron 4.53")]:
    b += line(Xz(z), 30, Xz(z), 80, "ln gold") + t(Xz(z), 24, lab, "lbl", "middle")
b += t(L, 112, "Altman Z = 1.2·WC/TA + 1.4·RE/TA + 3.3·EBIT/TA + 0.6·MVE/TL + 1.0·Sales/TA", "lbl")
svg("u8_z", W, H, b, "Altman Z-score zones with Chevron in the safe zone and Golden Minerals in distress")

# ---------------- Unit 9 ----------------
W, H = 600, 250; L, B = 60, 200; sc = 1.4
b = line(L, B, 580, B)
groups = [("Safe, bad", 50), ("Safe, good", 100), ("Shale, bad", 25), ("Shale, good", 115)]
for i, (lab, V) in enumerate(groups):
    x = L + 20 + i * 125
    D = min(V, 40); E = max(0, V - 40)
    b += rect(x, B - D * sc, 70, D * sc, "barm", 2)
    if E: b += rect(x, B - V * sc, 70, E * sc, "bara", 2)
    b += t(x + 35, B - D * sc / 2 + 4, f"D {D}", "t", "middle")
    if E: b += t(x + 35, B - D * sc - E * sc / 2 + 4, f"E {E}", "tbi", "middle")
    b += t(x + 35, B + 16, lab, "t", "middle")
b += t(L, 236, "Equity's average: Safe ½(10) + ½(60) = 35 · Shale ½(0) + ½(75) = 37.5 → equity picks Shale", "lbl")
svg("u9_linn", W, H, b, "Linn Energy payoffs split between debt with face 40 and equity: shale gives equity more")

W, H = 600, 200; L, B = 60, 160; sc = 0.38
b = line(L, B, 580, B)
for i, (lab, D, E) in enumerate([("Before: house 300", 300, 0), ("After remodel: 350", 350, 0)]):
    x = L + 40 + i * 230
    b += rect(x, B - D * sc, 110, D * sc, "barm", 2) + t(x + 55, B - D * sc / 2 + 4, f"Lender {D}", "t", "middle")
    b += t(x + 55, B - D * sc - 8, "Owner's equity: 0", "lbl", "middle") + t(x + 55, B + 16, lab, "t", "middle")
b += line(L + 160, 90, L + 260, 80, "ax", True) + t(L + 210, 74, "+50 goes to the bank", "lbl", "middle")
b += t(L, 192, "Owner pays 10, gains nothing: ΔE = NPV − ΔD = 40 − 50 = −10", "tb")
svg("u9_house", W, H, b, "Debt overhang: the remodel raises the house to 350, all captured by the lender")

b = box(10, 80, 130, 50, ["Debt 450 due", "decide now"], "boxa")
b += line(140, 95, 220, 40, "ax", True) + line(140, 115, 220, 150, "ax", True)
b += box(222, 14, 170, 56, ["Liquidate: 480", "D 450 · E 30"], "box") + box(222, 124, 170, 56, ["Continue", "E[V] = 400 < 480"], "boxb")
b += line(392, 140, 440, 112, "ax", True) + line(392, 165, 440, 190, "ax", True)
b += box(442, 86, 160, 46, ["600 (½)", "D 450 · E 150"], "boxg") + box(442, 168, 160, 46, ["200 (½)", "D 200 · E 0"], "boxb")
b += t(10, 228, "Debt: 450 vs 325 → liquidate. Equity: 30 vs 75 → continue.", "tb")
svg("u9_liq", 620, 236, b, "Reluctance to liquidate: debt prefers liquidation, equity prefers to continue")

# ---------------- Unit 10 ----------------
steps = ["Internal funds", "Safe debt", "Risky debt", "Convertibles", "New equity"]
W, H = 600, 230
b = ""
for i, s in enumerate(steps):
    x = 20 + i * 112; y = 170 - i * 34
    b += rect(x, y, 104, 200 - y, "boxa" if i == 0 else ("boxb" if i == 4 else "box"), 4) + t(x + 52, y + 20, s, "tb", "middle")
b += line(30, 20, 560, 20, "ln gold", True) + t(30, 14, "more sensitive to what managers know → bigger price discount → used later", "lbl")
b += t(20, 220, "Firms climb only as far as they must.", "lbl")
svg("u10_ladder", W, H, b, "Pecking order: internal funds first, then safe debt, risky debt, convertibles and equity last")

W, H = 620, 270
b = box(230, 105, 160, 56, ["Highly levered firm", "higher chance of liquidation"], "boxa")
spokes = [(10, 10, ["Customers", "want service, parts, warranty"]), (430, 10, ["Suppliers", "made firm-specific investments"]),
          (10, 200, ["Workers", "earnings fall ~10% in bankruptcy"]), (430, 200, ["Unions (Matsa)", "debt = tougher bargaining"])]
for x, y, ls in spokes:
    b += box(x, y, 180, 54, ls, "box", "t")
    cx, cy = x + 90, y + 27
    b += line(cx + (60 if cx < 300 else -60), cy + (25 if cy < 130 else -25), 310 + (-60 if cx < 300 else 60), 133 + (-26 if cy < 130 else 26), "ax", True)
b += t(310, 262, "They respond with higher wages, tougher terms or less business, which lowers firm value.", "lbl", "middle")
svg("u10_stake", W, H, b, "Stakeholders around a highly levered firm and what each fears")

open("figs.js", "w").write("/* Generated by make_figs.py */\nwindow.FIGS = " + json.dumps(F, ensure_ascii=False) + ";\n")
print(len(F), "figures")
