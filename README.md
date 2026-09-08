# EvalCase Factory

Priestley demand-test interest page for EvalCase Factory (outside SOLVD). Static Vite site: landing copy, client-side Eval Maturity Scorecard, and a waitlist form. No product backend, Stripe, or payments.

Capture: **thespencerlowe@gmail.com**

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

The first live submit sends FormSubmit an activation mail to that address. After you confirm it, later submissions arrive as email.

To point the same form at Formspree (or another endpoint) instead, copy `.env.example` to `.env` and set:

```bash
VITE_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

Then rebuild. Leave it unset to keep FormSubmit → thespencerlowe@gmail.com.

Hidden fields on submit: `source` (`evalcase-scorecard` or `evalcase-waitlist`), `score_total`, `score_vector` (Y/N), and `timestamp`.

## What’s on the page

- Exact demand-test copy (headline, bullets, soft ranges, who / who not, footer)
- 10-item Eval Maturity Scorecard (Yes = 10, No = 0, bands 0–100)
- Priestley form (required email + Q1–Q5 + budget band)

This is a waitlist / score follow-up page only. Packaging is unproven until budget distribution is visible.
