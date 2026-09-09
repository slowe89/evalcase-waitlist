# EvalCase polish QA — defects reproduced and fixed

Compared the current source (`index.html`, `src/style.css`, `src/main.js`) and the Vite build (`dist/assets/index-*.css/js`) against `polish-qa/fixes-evalcase.md` and the live screenshots in `polish-qa/`. Live Vercel was not used.

## Reproduced from supplied source (confirmed)

| Finding | Evidence | Fix |
| --- | --- | --- |
| Cost-led H1 and jargon-heavy subhead | `index.html` hero copy; `evalcase-hero-desktop.png` | Outcome-led H1 / subhead / CTAs |
| `N tasks` placeholder | Pricing first row | Scoped deliverable, no invented count |
| Audience section after the interview | `#fit` followed the form | Moved after benefits, before pricing |
| Score rows waste horizontal space | Desktop scorecard PNG; fieldset/legend grid | Nested `.score-row`; 880px list; 44px Yes/No |
| Interview too wide / hard to skim | Full-width form + long prompts | 720px column; rewritten Qs; helper on Q2 |
| Mobile pricing horizontal overflow | `visual-notes.md`; `min-width: 36rem` table | Stacked offer blocks at ≤600px |
| Copper button contrast ~4.21:1 | Older `#c45c26` on `#fffdf8` | `#9a4318` / `#ffffff` |
| Low-contrast field borders | `#cfc4ad` on paper | `--control-border: #8a806f` |
| `[hidden]` overridden by `.priestley{display:grid}` | Source CSS | `[hidden]{display:none!important}` |
| Q2 error focused an unfocusable paragraph | `harnessError.focus?.()` | Focus first checkbox; `aria-describedby` |
| `Not sure` not exclusive | No exclusive handler | Exclusive with other Q2 answers |
| HTTP status treated as success; automatic second POST | `throwNativeSubmit` | Require JSON `success`; keep answers; retry |
| Honeypot stripped from AJAX body | `payload.delete("_honey")` | Honeypot stays on the path |
| `?submitted` treated as success | Query-string branch | Removed |
| Internal labels (`Demand test`, `Priestley`, `Client-side`) | Header, form, footer | `Early access` + honest prelaunch copy |

## Not reproduced on this source (still hardened)

- Permanent `.success{display:none}` rule: not present; hidden-attribute contract added anyway.
- Fraunces intermediate weights: 500 was requested; now load 600 only.

## Automated checks (headless Chrome vs `vite preview`)

- No document overflow at 320 / 360 / 390 / 768 / 1280 / 1440.
- Hero promise + primary CTA visible at 1280×800 and 390×844.
- Score: empty, one Yes, one No, all No (0/100), all Yes (100/100), 30/40/60/70/80/90 bands, change-after-complete.
- Q2 invalid focuses first checkbox; `Not sure` exclusive; pieces can coexist with “never assembled a pack”.
- Mocked FormSubmit: 200 + `success:"false"` keeps answers; network error keeps answers and does not inject a second form; confirmed `success:"true"` hides form and focuses `#form-success`.
- AJAX URL remains `https://formsubmit.co/ajax/thespencerlowe@gmail.com`. No live leads sent.

## Screenshots

- `hero-desktop.png` / `hero-mobile.png`
- `scorecard-desktop.png` / `scorecard-mobile.png`
- `form-desktop.png` / `form-mobile.png`
- `pricing-desktop.png` / `pricing-mobile.png`
