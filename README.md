# 447 Prep

A small study app for BUSI 447 (Advanced Corporate Finance, Rice) midterm prep.

- **10 units**, each with a concept-first lesson, a flashcard deck and practice questions
- **124 flashcards** with a five-box spaced-repetition system (weakest cards first)
- **76 practice questions** with explanations; choices reshuffle on every attempt
- **Mock exam** mode: questions spread across all units, optional timer, results by unit
- **Formula sheet**, plus two interactive widgets (one-step binomial calculator, MM leverage explorer)

Plain HTML, CSS and JavaScript with no build step. Progress is saved in the browser's localStorage.

## Run it

Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

To host it on GitHub Pages: repo **Settings → Pages → Deploy from a branch → main / (root)**.

## Editing content

All course content lives in `data1.js` (units 1–5) and `data2.js` (units 6–10). Each unit has `lesson` sections, `cards` (`q`/`a`) and `quiz` items (`q`, choices `c`, correct index `a`, explanation `why`).

Problem-set answers are worked solutions, not an official key.
