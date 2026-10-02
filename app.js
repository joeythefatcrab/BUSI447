/* 447 Prep app. Plain JS, no build step. Progress is saved in this browser only (localStorage). */
(function () {
  "use strict";
  const UNITS = (window.UNITS || []).slice().sort((a, b) => a.num - b.num);
  const EXAM = new Date("2026-10-05T09:00:00-05:00");
  const KEY = "busi447prep.v1";
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // ---------- storage ----------
  function blank() { return { read: {}, boxes: {}, quiz: {}, mocks: [], last: null }; }
  let P = blank();
  try { const raw = localStorage.getItem(KEY); if (raw) P = Object.assign(blank(), JSON.parse(raw)); } catch (e) { /* storage unavailable */ }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(P)); } catch (e) { /* ignore */ } }

  const cardId = (u, i) => u.id + "-c" + i;
  const qId = (u, i) => u.id + "-q" + i;
  const box = (id) => P.boxes[id] || 0;

  function unitStats(u) {
    const read = P.read[u.id] ? 1 : 0;
    const cards = u.cards.map((_, i) => box(cardId(u, i)));
    const cardScore = cards.reduce((s, b) => s + b / 5, 0) / cards.length;
    const mastered = cards.filter((b) => b >= 4).length;
    const best = P.quiz[u.id] ? P.quiz[u.id].best : 0;
    const total = Math.round(100 * (0.2 * read + 0.4 * cardScore + 0.4 * best));
    return { read, cardScore, mastered, nCards: cards.length, best, total, tried: !!P.quiz[u.id] };
  }
  function overall() {
    let mastered = 0, n = 0, pct = 0;
    UNITS.forEach((u) => { const s = unitStats(u); mastered += s.mastered; n += s.nCards; pct += s.total; });
    return { mastered, n, pct: Math.round(pct / UNITS.length) };
  }
  function daysLeft() {
    const now = new Date();
    const d = Math.ceil((EXAM - now) / 86400000);
    return d;
  }
  function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

  // ---------- routing (plain hash tokens like "u3-cards") ----------
  const view = $("#view");
  const rail = $("#rail");
  let cleanup = null;
  function go(token) { if (location.hash.slice(1) === token) render(); else location.hash = token; }
  window.addEventListener("hashchange", render);

  function parse() {
    const t = location.hash.slice(1) || "home";
    const m = t.match(/^(u\d+)(?:-(learn|cards|quiz))?$/);
    if (m && UNITS.find((u) => u.id === m[1])) return { page: "unit", unit: m[1], tab: m[2] || "learn" };
    if (["home", "review", "mock", "formulas", "about"].includes(t)) return { page: t };
    return { page: "home" };
  }

  function render() {
    if (cleanup) { cleanup(); cleanup = null; }
    const r = parse();
    document.querySelectorAll("[data-nav]").forEach((b) => b.setAttribute("aria-current", b.dataset.go === r.page ? "page" : "false"));
    renderRail(r);
    $(".mobile-units").hidden = !(r.page === "home" || r.page === "unit");
    if (r.page === "unit") { P.last = r.unit + "-" + r.tab; save(); renderUnit(r.unit, r.tab); }
    else if (r.page === "review") renderReview();
    else if (r.page === "mock") renderMock();
    else if (r.page === "formulas") renderFormulas();
    else if (r.page === "about") renderAbout();
    else renderHome();
    window.scrollTo(0, 0);
    const h = view.querySelector("h1"); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); }
  }

  function renderRail(r) {
    rail.innerHTML = '<h4>Units</h4>' + UNITS.map((u) => {
      const s = unitStats(u);
      return `<button data-u="${u.id}" aria-current="${r.unit === u.id}"><span class="n">${String(u.num).padStart(2, "0")}</span><span>${esc(u.title)}</span><span class="pct">${s.total}%</span></button>`;
    }).join("");
    rail.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => go(b.dataset.u)));
    const d = daysLeft();
    $("#countdown").textContent = d > 1 ? `Midterm in ${d} days` : d === 1 ? "Midterm tomorrow" : d === 0 ? "Midterm today" : "Midterm done";
  }

  // ---------- home ----------
  function nextStep() {
    for (const u of UNITS) {
      const s = unitStats(u);
      if (!s.read) return { u, tab: "learn", label: `Read Unit ${u.num}: ${u.title}` };
      if (s.mastered < s.nCards * 0.6) return { u, tab: "cards", label: `Drill Unit ${u.num} flashcards` };
      if (s.best < 0.8) return { u, tab: "quiz", label: `Practice Unit ${u.num} questions` };
    }
    return null;
  }

  function renderHome() {
    const o = overall();
    const d = daysLeft();
    const mocks = P.mocks || [];
    const bestMock = mocks.length ? Math.max(...mocks.map((m) => m.pct)) : null;
    const nx = nextStep();
    const resume = P.last && P.last !== (nx && nx.u.id + "-" + nx.tab) ? P.last : null;
    view.innerHTML = `
      <section class="card hero">
        <div style="display:flex;flex-direction:column;gap:10px;min-width:0">
          <span class="eyebrow">BUSI 447 · Advanced Corporate Finance</span>
          <h1>${d > 0 ? `${d} day${d === 1 ? "" : "s"} to the midterm.` : "Midterm prep"}</h1>
          <p>Ten units, each with a short lesson, a flashcard deck and practice questions in the style of the exam. Work through them in order, then take a mock exam. Your progress is saved in this browser.</p>
          <div class="bar" aria-label="Overall progress ${o.pct}%"><i style="width:${o.pct}%"></i></div>
          <span class="muted" style="font-size:.85rem">Overall ${o.pct}% · each unit counts the lesson (20%), cards (40%) and best practice score (40%)</span>
        </div>
        <div class="stats">
          <div class="stat"><b>${o.mastered}/${o.n}</b><span>cards mastered</span></div>
          <div class="stat"><b>${UNITS.filter((u) => unitStats(u).total >= 80).length}/${UNITS.length}</b><span>units at 80%+</span></div>
          <div class="stat"><b>${bestMock === null ? "–" : bestMock + "%"}</b><span>best mock exam</span></div>
        </div>
      </section>
      ${nx ? `<section class="next"><div><span class="eyebrow">Up next</span><h3>${esc(nx.label)}</h3></div><div class="row">${resume ? `<button class="btn" data-go="${resume}">Resume where you left off</button>` : ""}<button class="btn primary" data-go="${nx.u.id}-${nx.tab}">Start</button></div></section>`
        : `<section class="next"><div><span class="eyebrow">All units done</span><h3>Take a mock exam or review weak cards.</h3></div><div class="row"><button class="btn" data-go="review">Review cards</button><button class="btn primary" data-go="mock">Mock exam</button></div></section>`}
      <section style="display:flex;flex-direction:column;gap:10px">
        <h2 style="font-size:1.3rem">Units</h2>
        <div class="units">${UNITS.map(unitTile).join("")}</div>
      </section>`;
    wireGo(view);
  }

  function unitTile(u) {
    const s = unitStats(u);
    const seg = (v) => `<span><i style="width:${Math.round(v * 100)}%"></i></span>`;
    return `<button class="unit" data-go="${u.id}">
      <div class="meta"><span>UNIT ${u.num}</span><span>${s.total}%</span></div>
      <h3>${esc(u.title)}</h3>
      <p>${esc(u.blurb)}</p>
      <div class="seg" aria-label="Lesson, cards, practice">${seg(s.read)}${seg(s.cardScore)}${seg(s.best)}</div>
      <div class="meta"><span>Learn · Cards · Practice</span><span>${s.mastered}/${s.nCards} cards</span></div>
    </button>`;
  }

  function wireGo(el) { el.querySelectorAll("[data-go]").forEach((b) => b.addEventListener("click", () => go(b.dataset.go))); }

  // ---------- unit ----------
  function renderUnit(id, tab) {
    const u = UNITS.find((x) => x.id === id);
    const s = unitStats(u);
    const idx = UNITS.indexOf(u);
    view.innerHTML = `
      <section class="uhead">
        <span class="eyebrow">Unit ${u.num} · ${esc(u.source)}</span>
        <h1>${esc(u.title)}</h1>
        <p class="muted">${esc(u.blurb)}</p>
      </section>
      <div class="tabs" role="tablist">
        <button role="tab" data-t="learn" aria-selected="${tab === "learn"}">Learn${s.read ? ' <span class="badge">✓</span>' : ""}</button>
        <button role="tab" data-t="cards" aria-selected="${tab === "cards"}">Flashcards <span class="badge">${s.mastered}/${s.nCards}</span></button>
        <button role="tab" data-t="quiz" aria-selected="${tab === "quiz"}">Practice <span class="badge">${s.tried ? Math.round(s.best * 100) + "%" : u.quiz.length + " Qs"}</span></button>
      </div>
      <div id="pane"></div>`;
    view.querySelectorAll(".tabs button").forEach((b) => b.addEventListener("click", () => go(u.id + "-" + b.dataset.t)));
    const pane = $("#pane");
    if (tab === "learn") renderLesson(u, pane, idx);
    else if (tab === "cards") renderDeck(pane, u.cards.map((c, i) => ({ ...c, id: cardId(u, i), unit: u })), { title: `Unit ${u.num} flashcards`, after: u.id + "-quiz", afterLabel: "Go to practice questions" });
    else renderQuiz(pane, u);
  }

  function renderLesson(u, pane, idx) {
    const nextU = UNITS[idx + 1];
    pane.innerHTML = `<article class="card lesson">
      ${u.lesson.map((sec, i) => `<section><h2><span class="k">${u.num}.${i + 1}</span>${esc(sec.h)}</h2>${sec.html}</section>`).join("")}
      ${u.widget ? `<section id="widget"></section>` : ""}
      <div class="lesson-foot">
        <span class="muted" style="font-family:var(--f-sans);font-size:.9rem">${P.read[u.id] ? "Marked as read." : "Finished? Mark it read, then test yourself."}</span>
        <div class="row">
          <button class="btn" id="markread">${P.read[u.id] ? "Mark as unread" : "Mark as read"}</button>
          <button class="btn primary" data-go="${u.id}-cards">Flashcards →</button>
        </div>
      </div>
    </article>
    ${nextU ? `<div class="row" style="justify-content:flex-end"><button class="btn ghost" data-go="${nextU.id}">Next unit: ${esc(nextU.title)} →</button></div>` : ""}`;
    pane.querySelectorAll(".lesson table.mini").forEach((t) => { const w = document.createElement("div"); w.className = "tblwrap"; t.parentNode.insertBefore(w, t); w.appendChild(t); });
    $("#markread").addEventListener("click", () => { if (P.read[u.id]) delete P.read[u.id]; else P.read[u.id] = Date.now(); save(); render(); });
    wireGo(pane);
    if (u.widget === "binomial") binomialWidget($("#widget"));
    if (u.widget === "mm") mmWidget($("#widget"));
  }

  // ---------- flashcards ----------
  function renderDeck(pane, cards, opt) {
    if (!cards.length) {
      pane.innerHTML = `<div class="card done"><h2>Nothing due</h2><p class="muted">Every card is at box 4 or higher. Study a unit's full deck from its Flashcards tab, or take a mock exam.</p><div class="row"><button class="btn primary" data-go="mock">Mock exam</button></div></div>`;
      wireGo(pane); return;
    }
    // weakest first, shuffled within each box
    const order = shuffle(cards).sort((a, b) => box(a.id) - box(b.id));
    const queue = order.slice();
    const requeued = new Set();
    let seen = 0, knew = 0, flipped = false, cur = null;
    const total = order.length;

    function grade(kind) {
      const b = box(cur.id);
      if (kind === "again") { P.boxes[cur.id] = 1; if (!requeued.has(cur.id)) { requeued.add(cur.id); queue.splice(Math.min(queue.length, 3), 0, cur); } }
      else if (kind === "hard") { P.boxes[cur.id] = Math.max(1, b); }
      else { P.boxes[cur.id] = Math.min(5, b + 1); knew++; }
      seen++; save(); step();
    }
    function step() {
      cur = queue.shift(); flipped = false;
      if (!cur) {
        pane.innerHTML = `<div class="card done"><span class="eyebrow">${esc(opt.title)}</span><h2>Deck finished</h2><p class="muted">You knew ${knew} of ${seen} reviews. Cards you missed come back first next time.</p>
          <div class="row"><button class="btn" id="again">Go again</button>${opt.after ? `<button class="btn primary" data-go="${opt.after}">${esc(opt.afterLabel)}</button>` : ""}</div></div>`;
        $("#again").addEventListener("click", () => renderDeck(pane, cards, opt)); wireGo(pane); renderRail(parse()); return;
      }
      const b = box(cur.id);
      const all = total + requeued.size;
      const done = seen;
      pane.innerHTML = `<div style="display:flex;flex-direction:column;gap:12px">
        <div class="deckbar"><span>${esc(opt.title)}${opt.mixed ? ` · Unit ${cur.unit.num}` : ""}</span><span>Card ${done + 1} of ${all}${requeued.size ? ` · includes ${requeued.size} repeat${requeued.size === 1 ? "" : "s"}` : ""}</span></div>
        <div class="bar"><i style="width:${Math.round(100 * done / all)}%"></i></div>
        <button class="flash" id="flash" aria-label="Flashcard. Press to flip.">
          <div class="flash-in">
            <div class="face front"><span class="eyebrow">Question · box <span class="dots">${[1, 2, 3, 4, 5].map((k) => `<i class="${k <= b ? "on" : ""}"></i>`).join("")}</span></span><div class="q">${esc(cur.q)}</div><div class="hint">Tap or press <span class="kbd">space</span> to flip</div></div>
            <div class="face back" aria-hidden="true"><span class="eyebrow">Answer</span><div class="a">${esc(cur.a)}</div><div class="hint">How well did you know it?</div></div>
          </div>
        </button>
        <div class="grade" id="grade" hidden>
          <button class="again" data-k="again">Didn't know<small><span class="kbd">1</span> back to box 1</small></button>
          <button class="hard" data-k="hard">Shaky<small><span class="kbd">2</span> stays</small></button>
          <button class="good" data-k="good">Knew it<small><span class="kbd">3</span> moves up</small></button>
        </div>
      </div>`;
      const flash = $("#flash");
      flash.addEventListener("click", flip);
      pane.querySelectorAll("#grade button").forEach((x) => x.addEventListener("click", () => grade(x.dataset.k)));
    }
    function flip() {
      const flash = $("#flash"); if (!flash) return;
      flipped = !flipped; flash.classList.toggle("flipped", flipped);
      flash.querySelector(".front").setAttribute("aria-hidden", flipped); flash.querySelector(".back").setAttribute("aria-hidden", !flipped);
      if (flipped) { const g = $("#grade"); g.hidden = false; const r = g.getBoundingClientRect(); if (r.bottom > window.innerHeight - 70) g.scrollIntoView({ block: "end", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); }
    }
    function onKey(e) {
      if (e.target.closest && e.target.closest("input,textarea")) return;
      if (!cur) return;
      if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
      else if (flipped && ["1", "2", "3"].includes(e.key)) grade(["again", "hard", "good"][+e.key - 1]);
    }
    document.addEventListener("keydown", onKey);
    cleanup = () => document.removeEventListener("keydown", onKey);
    step();
  }

  function renderReview() {
    const all = [];
    UNITS.forEach((u) => u.cards.forEach((c, i) => all.push({ ...c, id: cardId(u, i), unit: u })));
    const due = all.filter((c) => box(c.id) <= 3);
    const pick = shuffle(due).sort((a, b) => box(a.id) - box(b.id)).slice(0, 25);
    view.innerHTML = `<section class="uhead"><span class="eyebrow">Mixed review</span><h1>Review cards</h1><p class="muted">Up to 25 cards from all units, weakest first. ${due.length} card${due.length === 1 ? "" : "s"} below box 4.</p></section><div id="pane"></div>`;
    renderDeck($("#pane"), pick, { title: "Mixed review", mixed: true });
  }

  // ---------- practice questions ----------
  function prepQ(u, q, i) {
    const order = shuffle(q.c.map((t, k) => ({ t, k })));
    return { unit: u, id: qId(u, i), q: q.q, why: q.why, choices: order.map((o) => o.t), answer: order.findIndex((o) => o.k === q.a) };
  }

  function renderQuiz(pane, u) {
    const qs = shuffle(u.quiz.map((q, i) => prepQ(u, q, i)));
    let i = 0, right = 0, picked = null, checked = false;
    const missed = [];
    function show() {
      const q = qs[i];
      picked = null; checked = false;
      pane.innerHTML = `<div class="card" style="display:flex;flex-direction:column;gap:14px">
        <div class="qcount"><span>Question ${i + 1} of ${qs.length}</span><span>${right} correct so far</span></div>
        <div class="bar"><i style="width:${Math.round(100 * i / qs.length)}%"></i></div>
        <p class="qtext">${esc(q.q)}</p>
        <div class="choices">${q.choices.map((c, k) => `<button class="choice" data-k="${k}" aria-pressed="false"><span class="l">${"ABCDE"[k]}</span><span>${esc(c)}</span></button>`).join("")}</div>
        <div id="fb"></div>
        <div class="row" style="justify-content:flex-end"><button class="btn primary" id="act" disabled>Check</button></div>
      </div>`;
      pane.querySelectorAll(".choice").forEach((b) => b.addEventListener("click", () => {
        if (checked) return;
        picked = +b.dataset.k;
        pane.querySelectorAll(".choice").forEach((x) => x.setAttribute("aria-pressed", x === b));
        $("#act").disabled = false;
      }));
      $("#act").addEventListener("click", () => (checked ? next() : check()));
    }
    function check() {
      const q = qs[i]; checked = true;
      const ok = picked === q.answer;
      if (ok) right++; else missed.push({ q, picked });
      pane.querySelectorAll(".choice").forEach((b) => {
        const k = +b.dataset.k; b.disabled = true;
        if (k === q.answer) b.classList.add("right"); else if (k === picked) b.classList.add("wrong");
      });
      $("#fb").innerHTML = `<div class="explain ${ok ? "ok" : "no"}"><b>${ok ? "Correct." : "Not quite. The answer is " + "ABCDE"[q.answer] + "."}</b>${esc(q.why)}</div>`;
      $("#act").textContent = i + 1 < qs.length ? "Next question" : "See results";
      $("#act").focus();
    }
    function next() { i++; if (i < qs.length) show(); else finish(); }
    function finish() {
      const pct = right / qs.length;
      const prev = P.quiz[u.id];
      P.quiz[u.id] = { best: Math.max(prev ? prev.best : 0, pct), last: pct, tries: (prev ? prev.tries : 0) + 1 };
      save(); renderRail(parse());
      pane.innerHTML = `<div class="card result">
        <span class="eyebrow">Unit ${u.num} practice</span>
        <div class="score">${right}/${qs.length}</div>
        <p class="muted">${pct >= 0.8 ? "Strong. Move on, and come back with the mixed review." : "Reread the sections behind the questions you missed, drill the flashcards, then try again. The choices reshuffle each time."}</p>
        ${missed.length ? `<h3 style="font-size:1.1rem">Review what you missed</h3><div class="missed">${missed.map((m) => missedItem(m)).join("")}</div>` : ""}
        <div class="row"><button class="btn" id="retry">Try again</button><button class="btn" data-go="${u.id}-learn">Back to the lesson</button>${UNITS[UNITS.indexOf(u) + 1] ? `<button class="btn primary" data-go="${UNITS[UNITS.indexOf(u) + 1].id}">Next unit →</button>` : `<button class="btn primary" data-go="mock">Mock exam →</button>`}</div>
      </div>`;
      $("#retry").addEventListener("click", () => renderQuiz(pane, u));
      wireGo(pane);
    }
    show();
  }

  function missedItem(m) {
    const q = m.q;
    return `<div class="item"><span class="tag">Unit ${q.unit.num} · ${esc(q.unit.title)}</span><b>${esc(q.q)}</b>
      ${m.picked === null || m.picked === undefined ? `<span class="muted">Not answered.</span>` : `<span style="color:var(--bad)">You chose: ${esc(q.choices[m.picked])}</span>`}
      <span style="color:var(--good)">Answer: ${esc(q.choices[q.answer])}</span><span class="muted">${esc(q.why)}</span></div>`;
  }

  // ---------- mock exam ----------
  function renderMock() {
    const pool = [];
    UNITS.forEach((u) => u.quiz.forEach((q, i) => pool.push(prepQ(u, q, i))));
    view.innerHTML = `<section class="uhead"><span class="eyebrow">Exam simulation</span><h1>Mock exam</h1><p class="muted">Questions drawn at random from every unit. No feedback until you submit, like the real thing. The midterm is about 60 minutes with multiple choice and short answer, so this covers the multiple-choice half.</p></section>
      <div class="card" style="display:flex;flex-direction:column;gap:14px">
        <div class="fields" style="grid-template-columns:repeat(auto-fill,minmax(180px,1fr))">
          <label>Number of questions<input id="mn" type="number" min="5" max="${pool.length}" value="20"></label>
          <label>Time limit (minutes, 0 = none)<input id="mt" type="number" min="0" max="120" value="25"></label>
        </div>
        <div class="row"><button class="btn primary" id="start">Start mock exam</button></div>
        ${(P.mocks || []).length ? `<p class="note">Past attempts: ${P.mocks.slice(-5).map((m) => m.pct + "%").join(", ")}</p>` : ""}
      </div>`;
    $("#start").addEventListener("click", () => {
      const n = Math.max(5, Math.min(pool.length, +$("#mn").value || 20));
      const mins = Math.max(0, +$("#mt").value || 0);
      runMock(balancedPick(pool, n), mins);
    });
  }

  function balancedPick(pool, n) {
    // spread questions across units as evenly as possible
    const byU = UNITS.map((u) => shuffle(pool.filter((q) => q.unit === u)));
    const out = [];
    let k = 0;
    while (out.length < n && byU.some((l) => l.length)) { const l = byU[k % byU.length]; if (l.length) out.push(l.shift()); k++; }
    return shuffle(out);
  }

  function runMock(qs, mins) {
    const ans = new Array(qs.length).fill(null);
    let i = 0, timer = null, end = mins ? Date.now() + mins * 60000 : null;
    function tick() {
      const el = $("#tm"); if (!el || !end) return;
      const left = Math.max(0, end - Date.now());
      const m = Math.floor(left / 60000), s = Math.floor((left % 60000) / 1000);
      el.textContent = `${m}:${String(s).padStart(2, "0")} left`;
      el.classList.toggle("low", left < 120000);
      if (left <= 0) submit();
    }
    function show() {
      const q = qs[i];
      view.innerHTML = `<section class="uhead"><span class="eyebrow">Mock exam</span><h1>Question ${i + 1} of ${qs.length}</h1></section>
        <div class="card" style="display:flex;flex-direction:column;gap:14px">
          <div class="qcount"><span>${ans.filter((a) => a !== null).length} answered</span><span class="timer" id="tm">${end ? "" : "untimed"}</span></div>
          <div class="palette">${qs.map((_, k) => `<button data-j="${k}" class="${ans[k] !== null ? "answered" : ""} ${k === i ? "cur" : ""}" aria-label="Question ${k + 1}">${k + 1}</button>`).join("")}</div>
          <p class="qtext">${esc(q.q)}</p>
          <div class="choices">${q.choices.map((c, k) => `<button class="choice" data-k="${k}" aria-pressed="${ans[i] === k}"><span class="l">${"ABCDE"[k]}</span><span>${esc(c)}</span></button>`).join("")}</div>
          <div class="row" style="justify-content:space-between">
            <div class="row"><button class="btn" id="prev" ${i === 0 ? "disabled" : ""}>← Previous</button><button class="btn" id="nxt" ${i === qs.length - 1 ? "disabled" : ""}>Next →</button></div>
            <div class="row" id="subwrap"><button class="btn primary" id="sub">Submit exam</button></div>
          </div>
        </div>`;
      view.querySelectorAll(".choice").forEach((b) => b.addEventListener("click", () => {
        ans[i] = +b.dataset.k;
        if (i < qs.length - 1) { i++; show(); } else show();
      }));
      view.querySelectorAll(".palette button").forEach((b) => b.addEventListener("click", () => { i = +b.dataset.j; show(); }));
      $("#prev").addEventListener("click", () => { i--; show(); });
      $("#nxt").addEventListener("click", () => { i++; show(); });
      $("#sub").addEventListener("click", () => {
        const blank = ans.filter((a) => a === null).length;
        if (blank) {
          $("#subwrap").innerHTML = `<span class="warn">${blank} unanswered.</span><button class="btn" id="keep">Keep working</button><button class="btn primary" id="sure">Submit anyway</button>`;
          $("#keep").addEventListener("click", show); $("#sure").addEventListener("click", submit);
        } else submit();
      });
      tick();
    }
    function submit() {
      if (timer) clearInterval(timer); timer = null; cleanup = null;
      const right = qs.filter((q, k) => ans[k] === q.answer).length;
      const pct = Math.round(100 * right / qs.length);
      P.mocks = (P.mocks || []).concat([{ pct, n: qs.length, at: Date.now() }]); save();
      const rows = UNITS.map((u) => {
        const mine = qs.map((q, k) => ({ q, k })).filter((x) => x.q.unit === u);
        if (!mine.length) return "";
        const r = mine.filter((x) => ans[x.k] === x.q.answer).length;
        const p = r / mine.length;
        return `<div><span>${u.num}. ${esc(u.title)}</span><span class="timer">${r}/${mine.length}</span>${p < 1 ? `<button class="btn ghost" data-go="${u.id}">Study</button>` : `<span class="muted" style="font-size:.85rem">Solid</span>`}</div>`;
      }).join("");
      const missed = qs.map((q, k) => ({ q, picked: ans[k] })).filter((m) => m.picked !== m.q.answer);
      view.innerHTML = `<section class="uhead"><span class="eyebrow">Mock exam result</span><h1>${right} of ${qs.length} (${pct}%)</h1></section>
        <div class="card result">
          <h3 style="font-size:1.1rem">By unit</h3><div class="byunit">${rows}</div>
          ${missed.length ? `<h3 style="font-size:1.1rem">Review what you missed</h3><div class="missed">${missed.map(missedItem).join("")}</div>` : `<p>Perfect score.</p>`}
          <div class="row"><button class="btn" data-go="review">Review weak cards</button><button class="btn primary" data-go="mock">New mock exam</button></div>
        </div>`;
      wireGo(view); renderRail(parse()); window.scrollTo(0, 0);
    }
    if (end) { timer = setInterval(tick, 1000); cleanup = () => { clearInterval(timer); }; }
    show();
  }

  // ---------- widgets ----------
  function binomialWidget(el) {
    el.innerHTML = `<div class="widget"><h3>Try it: one-step binomial calculator</h3>
      <p class="note">Change the inputs and watch q, Δ and B move. The lecture example is loaded: 100 → 160 or 80, K = 105, r* = 1.10.</p>
      <div class="fields">
        <label>S₀<input id="bS" type="number" step="any" value="100"></label>
        <label>S up<input id="bU" type="number" step="any" value="160"></label>
        <label>S down<input id="bD" type="number" step="any" value="80"></label>
        <label>Strike K<input id="bK" type="number" step="any" value="105"></label>
        <label>r* (1 + r per step)<input id="bR" type="number" step="any" value="1.10"></label>
        <label>Option<select id="bT" style="font-family:var(--f-mono);padding:6px;border:1px solid var(--rule);border-radius:6px;background:var(--surface);color:var(--ink)"><option value="c">Call</option><option value="p">Put</option></select></label>
      </div>
      <div class="out" id="bOut"></div><p id="bMsg" class="note"></p></div>`;
    const f = () => {
      const S = +$("#bS").value, Su = +$("#bU").value, Sd = +$("#bD").value, K = +$("#bK").value, R = +$("#bR").value, call = $("#bT").value === "c";
      const pay = (x) => call ? Math.max(0, x - K) : Math.max(0, K - x);
      const Vu = pay(Su), Vd = pay(Sd);
      const u = Su / S, d = Sd / S;
      const q = (R - d) / (u - d);
      const D = (Vu - Vd) / (Su - Sd), B = (Vd - D * Sd) / R, V = (q * Vu + (1 - q) * Vd) / R;
      const ok = S > 0 && Su > Sd && R > 0;
      $("#bOut").innerHTML = ok ? [["q", q.toFixed(4)], ["Payoff up", Vu.toFixed(2)], ["Payoff down", Vd.toFixed(2)], ["Δ (shares)", D.toFixed(4)], ["B (bonds)", B.toFixed(2)], ["Value", V.toFixed(2)]].map(([a, b]) => `<div><b>${b}</b><span>${a}</span></div>`).join("") : "";
      $("#bMsg").innerHTML = !ok ? '<span class="warn">Need S₀ > 0 and S up > S down.</span>' : (q <= 0 || q >= 1) ? `<span class="warn">Arbitrage: r* must lie between d = ${d.toFixed(3)} and u = ${u.toFixed(3)}.</span>` : `B ${B < 0 ? "&lt; 0, so the replicating portfolio <b>borrows</b>" : "&gt; 0, so it <b>lends</b>"}. Check: ΔS₀ + B = ${(D * S + B).toFixed(2)}.`;
    };
    el.querySelectorAll("input,select").forEach((x) => x.addEventListener("input", f)); f();
  }

  function mmWidget(el) {
    el.innerHTML = `<div class="widget"><h3>Try it: leverage, cost of equity and WACC</h3>
      <p class="note">Slide the debt ratio. With no taxes, r<sub>E</sub> climbs but the WACC stays flat (MM). Add a tax rate and the WACC falls. Defaults are Water Products' numbers: r<sub>A</sub> = 12.5%, r<sub>D</sub> = 10%.</p>
      <div class="fields">
        <label><span>r<sub>A</sub> (%)</span><input id="mA" type="number" step="any" value="12.5"></label>
        <label><span>r<sub>D</sub> (%)</span><input id="mD" type="number" step="any" value="10"></label>
        <label>Tax rate (%)<input id="mT" type="number" step="any" value="0"></label>
      </div>
      <label class="note">Debt / value: <b id="mVl">30%</b><input id="mV" type="range" min="0" max="90" value="30"></label>
      <div class="out" id="mOut"></div>
      <svg id="mSvg" class="wide" viewBox="0 0 320 170" role="img" aria-label="Cost of equity and WACC against debt to value"></svg></div>`;
    const f = () => {
      const rA = +$("#mA").value / 100, rD = +$("#mD").value / 100, t = +$("#mT").value / 100, dv = +$("#mV").value / 100;
      $("#mVl").textContent = Math.round(dv * 100) + "%";
      const rE = (x) => rA + (rA - rD) * (1 - t) * (x / (1 - x));
      const W = (x) => (1 - x) * rE(x) + x * rD * (1 - t);
      $("#mOut").innerHTML = [["D/E", (dv / (1 - dv)).toFixed(2)], ["r_E", (100 * rE(dv)).toFixed(2) + "%"], ["WACC", (100 * W(dv)).toFixed(2) + "%"], ["After-tax r_D", (100 * rD * (1 - t)).toFixed(2) + "%"]].map(([a, b]) => `<div><b>${b}</b><span>${a}</span></div>`).join("");
      const xs = []; for (let k = 0; k <= 80; k += 2) xs.push(k / 100);
      const ymax = Math.max(0.3, rE(0.8) * 1.05), X = (x) => 40 + x / 0.8 * 260, Y = (y) => 150 - y / ymax * 135;
      const line = (fn) => xs.map((x) => `${X(x).toFixed(1)},${Y(fn(x)).toFixed(1)}`).join(" ");
      $("#mSvg").innerHTML = `<line class="ax" x1="40" y1="150" x2="305" y2="150"/><line class="ax" x1="40" y1="10" x2="40" y2="150"/>
        <polyline class="ln bad" points="${line(rE)}"/><polyline class="ln accent" points="${line(W)}"/><polyline class="ln muted dash" points="${line(() => rD * (1 - t))}"/>
        ${dv <= 0.8 ? `<line class="ln muted thin dash" x1="${X(dv)}" y1="10" x2="${X(dv)}" y2="150"/>` : ""}
        <text x="${X(0.8) - 20}" y="${Y(rE(0.8)) + 14}">r_E</text><text x="${X(0.8) - 32}" y="${Y(W(0.8)) - 6}">WACC</text><text x="${X(0.8) - 60}" y="${Y(rD * (1 - t)) + 14}">r_D(1−t)</text>
        <text x="270" y="164">D/V 80%</text><text x="34" y="164">0</text><text x="4" y="${Y(0.1) + 3}">10%</text><text x="4" y="${Y(0.2) + 3}">20%</text>`;
    };
    el.querySelectorAll("input").forEach((x) => x.addEventListener("input", f)); f();
  }

  // ---------- formulas ----------
  function renderFormulas() {
    const F = [
      ["Free cash flow", "FCF = EBIT(1 − t) + Dep − ΔNWC − CAPX + AT salvage<br>AT salvage = P − t(P − BV)<br>NWC = Inventory + AR − AP"],
      ["NPV and the yield curve", "NPV = Σ CF_t / (1 + y_t)^t<br>Hurdle r*: Σ CF_t/(1 + r*)^t = V* (value at the curve)<br>TV_T = CF_T(1 + g)/(r − g)"],
      ["CAPM and betas", "r = r_f + β(E[r_m] − r_f)<br>β_A = (E/V)β_E + (D/V)β_D<br>β_E = β_A + (β_A − β_D)(D/E)<br>With taxes: β_U = β_L / [1 + (1 − t)D/E]"],
      ["Fama-French 3", "r = r_f + β_M·MRP + β_SMB(1.69%) + β_HML(3.36%)<br>Unlever only β_M"],
      ["Certainty equivalent", "CE = E[CF] − b(E[r_m] − r_f)<br>b = cov(CF, r_m) / var(r_m)<br>PV = CE / (1 + r_f)^t · forwards: CE = F·Q − costs"],
      ["Binomial", "u = e^(σ√(T/N)), d = 1/u, r* = e^(rT/N)<br>q = (r* − d)/(u − d)<br>V₀ = [qV_u + (1 − q)V_d]/r*<br>Δ = (V_u − V_d)/(S_u − S_d), B = (V_d − ΔS_d)/r*"],
      ["Black-Scholes", "C = S·N(d₁) − K·e^(−rT)·N(d₂)<br>P = K·e^(−rT)·N(−d₂) − S·N(−d₁)<br>d₁ = [ln(S/K) + (r + σ²/2)T]/(σ√T), d₂ = d₁ − σ√T"],
      ["Real-option payoffs", "Abandon: max(V, salvage)<br>Expand: max(V, (1 + x)V − cost)<br>Invest/wait: max(0, V − I)<br>Option value = with − without"],
      ["MM, no taxes", "V_L = V_U<br>r_E = r_A + (r_A − r_D)(D/E)<br>WACC = r_A"],
      ["MM with taxes", "V_L = V_U + tD<br>r_E = r_A + (r_A − r_D)(1 − t)(D/E)<br>WACC = (E/V)r_E + (D/V)r_D(1 − t) = r_A(1 − tD/V)"],
      ["Trade-off", "V_L = V_U + PV(tax shield) − Pr(default|D) × Cost_bankruptcy"],
      ["Conflicts and Z-score", "Equity = max(0, V − D), Debt = min(V, D)<br>ΔE = NPV − ΔD<br>Z = 1.2X₁ + 1.4X₂ + 3.3X₃ + 0.6X₄ + 1.0X₅ (safe ≥ 2.99, distress ≤ 1.8)"]
    ];
    view.innerHTML = `<section class="uhead"><span class="eyebrow">Reference</span><h1>Formula sheet</h1><p class="muted">Everything you need to compute on the midterm, in one place.</p></section>
      <div class="fgrid">${F.map(([h, f]) => `<div class="card"><h3>${h}</h3><div class="f">${f}</div></div>`).join("")}</div>`;
  }

  function renderAbout() {
    view.innerHTML = `<section class="uhead"><span class="eyebrow">About</span><h1>How this works</h1></section>
      <div class="card lesson" style="font-size:1rem">
        <section><p>Built from the BUSI 447 lecture decks (Introduction through Debt–Equity Conflicts), Problem Sets 1–2, and the Ocean Carriers and Arundel cases. Problem-set answers are worked solutions, not an official key.</p>
        <p><b>Flashcards</b> use five boxes. "Knew it" moves a card up a box, "Didn't know" sends it back to box 1 and repeats it later in the session. A card in box 4 or 5 counts as mastered, and decks always show your weakest cards first.</p>
        <p><b>Progress</b> is saved in this browser only. Clearing site data or switching devices starts fresh.</p></section>
        <div class="lesson-foot"><span class="muted" style="font-family:var(--f-sans);font-size:.9rem" id="rmsg">Start over from scratch?</span><div class="row" id="rwrap"><button class="btn" id="reset">Reset all progress</button></div></div>
      </div>`;
    $("#reset").addEventListener("click", () => {
      $("#rwrap").innerHTML = `<button class="btn" id="no">Cancel</button><button class="btn primary" id="yes">Yes, erase my progress</button>`;
      $("#rmsg").textContent = "This erases lessons read, card boxes, scores and mock history.";
      $("#no").addEventListener("click", renderAbout);
      $("#yes").addEventListener("click", () => { P = blank(); save(); go("home"); });
    });
  }

  document.querySelectorAll("[data-nav], .brand").forEach((b) => b.addEventListener("click", () => go(b.dataset.go)));
  $("#mobile-units").addEventListener("change", (e) => { if (e.target.value) go(e.target.value); });
  $("#mobile-units").innerHTML = `<option value="">Jump to a unit…</option>` + UNITS.map((u) => `<option value="${u.id}">${u.num}. ${esc(u.title)}</option>`).join("");
  render();
})();
