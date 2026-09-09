# EvalCase Factory

Demand-test waitlist for EvalCase Factory (outside SOLVD). Static Vite site: landing copy, client-side Eval Maturity Scorecard, and a waitlist form. No product backend, Stripe, or payments.

Capture: **thespencerlowe@gmail.com** via FormSubmit.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`).

```bash
npm run build
npm run preview
```

`build` writes a static `dist/` you can host anywhere. `preview` serves that build locally.

## Form

The form’s default action is FormSubmit.co:

`https://formsubmit.co/thespencerlowe@gmail.com`

AJAX success requires both HTTP success and a JSON body with `success: true` / `"true"`. Failures keep the answers and show an inline retry. The honeypot (`_honey`) stays on the submission path. A `?submitted` query string is not treated as proof of delivery.

The first live submit sends FormSubmit an activation mail to that address. After you confirm it, later submissions arrive as email.

To point the same form at Formspree (or another endpoint) instead, copy `.env.example` to `.env` and set:

```bash
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

Then rebuild. Leave it unset to keep FormSubmit → thespencerlowe@gmail.com.

Hidden fields on submit: `source` (`evalcase-scorecard` or `evalcase-waitlist`), `score_total`, `score_vector` (Y/N), and `timestamp`.

## What’s on the page

- Outcome-led hero, pack benefits, audience, and soft early-pricing ranges
- 10-item Eval Maturity Scorecard (Yes = 10, No = 0, bands 0–100; partial answers stay partial)
- Waitlist interview (required email + Q1–Q5 + budget band; four optional fields)

This is a waitlist / score follow-up page only. Ranges are estimates; no payment is taken here.

## Preview

Polish QA shots:

- [docs/polish-qa/hero-desktop.png](docs/polish-qa/hero-desktop.png)
- [docs/polish-qa/scorecard-desktop.png](docs/polish-qa/scorecard-desktop.png)
- [docs/polish-qa/form-desktop.png](docs/polish-qa/form-desktop.png)
- [docs/polish-qa/pricing-mobile.png](docs/polish-qa/pricing-mobile.png)
