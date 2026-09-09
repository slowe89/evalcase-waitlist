# EvalCase — polish fixes for Grok Build

**Grade: BORDERLINE**

The paper/copper theme and serif headings already have an identity. The hero and interview still read like an internal offer brief, and the desktop scorecard wastes horizontal space. It does not meet every pass criterion yet.

Evidence: [supplied HTML](src/evalcase.html), [desktop hero](evalcase-hero-desktop.png), [desktop scorecard](evalcase-scorecard-desktop.png), and older [form screenshot](../../proof/evalcase/form.png). [Live target](https://evalcase-waitlist.vercel.app) could not be reached in this environment. The HTML references `/assets/index-D1qYUH17.css` and `/assets/index-Dy12h_J3.js`, which are not included. Older CSS/JS in `/tmp/evalcase-deploy-files.json` corroborate component patterns, but must be compared with the actual build before treating their behavior as current. Mobile and submission behavior were not exercised.

## Top 5 quality problems

1. **The hero leads with somebody else's costs instead of the buyer's outcome.** `.hero h1` devotes three large desktop lines to an unsourced `$60–$120/hr` assertion. `.subhead` then stacks “DFY,” “golden claims,” “eval eng” and “YAML archaeology.” The screenshot has roughly 136px between the buttons and benefit cards, making the opening feel sparse despite its dense copy.
2. **The form is too wide and difficult to skim.** `.priestley`, `label[for=q1]`, `label[for=q4]` and `label[for=q5]` combine long prompts with full-container textareas. Q2's nine options form a long undifferentiated list. The older form screenshot demonstrates the reading burden; the supplied HTML preserves those prompts and controls.
3. **The scorecard makes a small interaction occupy a very wide row.** In the current supplied desktop scorecard PNG, `.items li` places Yes/No under the question at the far left, leaving most of each 1080px row empty. Choices appear about 38px tall. The large `—` readout and “Client-side” scoring math emphasize mechanics before purpose.
4. **Trust copy looks unfinished at a four-figure price point.** `#ranges tbody tr:first-child` literally promises “N tasks”; the footer says “packaging unproven until we see budget distribution.” `#fit` is buried after the entire interview. The badge, pricing label and interview label repeatedly expose internal process.
5. **Contrast and state behavior need a focused asset check.** Older CSS uses `#fffdf8` on `#c45c26` for 15.2px buttons, about 4.21:1, and low-contrast field borders. It also sets `.priestley{display:grid}` without a global hidden override; older JS sets `form.hidden=true`, relies on HTTP status alone, and falls back to a second POST. These are evidenced risks in the older assets, not verified failures of the supplied live build.

## Ordered Build fix list

### P0 — trust and conversion correctness

1. **Replace the cost headline and offer placeholders.** Apply the hero and pricing rewrites below. Preserve the Starter, Domain and Refresh offers and their exact ranges: **$4,997–$9,997**, **$12,000–$25,000**, **$1,497–$3,997/mo**. Replace `N tasks` with an agreed-scope description; do not invent a task count or evidence for the hourly claim. Retain the 10–15 business-day concept only as a question/hypothesis, never a delivery guarantee.
2. **Verify and repair the loaded assets' contrast and hidden states.** Apply the EvalCase tokens and capture-state contract in [the rollup](astra-rollup.md). Primary/selected copper becomes `#9a4318` with white text; form boundaries become `#8a806f`. Scope light text and a visible focus ring to the dark scorecard. Check the built CSS for `[hidden]{display:none!important}` so the form actually disappears on confirmed success. Check `#form-error`, success focus, response validation, honeypot preservation and duplicate-send handling against the actual JS. Do not edit only an old hash file; change the source and rebuild assets.
3. **Make required Q2 actionable.** Keep the nine `harness_pieces` values and multi-select semantics. Associate `#harness-error` with its fieldset using `aria-describedby`; focus its first checkbox on invalid submission, rather than calling `.focus()` on an unfocusable paragraph. Clear the error on a valid change. Make `Not sure` exclusive with other answers. Do **not** automatically make “We have never assembled a pack” exclusive with individual pieces: a team can own pieces without having assembled them together.

### P1 — layout and reading quality

4. **Tighten the opening.** `.hero` padding becomes 64px top / 32px bottom desktop, 40px / 24px mobile. `.bullets` top padding becomes 24px. Set H1 to the shared fluid scale and `max-width:22ch`; `.subhead` to 18px/1.55 and `max-width:60ch`. Keep the single-column hero. `.cta-row` uses 12px gaps and 48px minimum buttons; below 600px both buttons stack at full width. Preserve both `data-source` values and fragment targets.
5. **Give the existing deliverables and audience a clear place.** Add `What’s in a pack` above `.bullet-grid`; make its card headings H3s at 20px. Reduce shadows to the rollup values. Move `#fit` after benefits and before `#ranges`, with `Who it’s for` / `Who it’s not for` in a two-column desktop, one-column mobile layout. Keep EvalCase's serif headings and paper background.
6. **Make score rows use their space.** Constrain `#score-items` to 880px and keep it aligned with the scorecard heading. Each row has 16px padding, a numbered legend in 16px body type, and 44px Yes/No labels. Use a nested wrapper for a reliable desktop question/answer layout; do not rely on the existing fieldset/legend grid behaving like normal divs. At ≤600px stack question above equal-width Yes/No choices. Keep all ten item meanings, `maturity-q1` through `maturity-q10`, Yes=10/No=0 and existing bands. Describe partial results as partial; add `/100` to the completed readout. Keep the final result and next CTA together.
7. **Refine the interview without shortening the research.** Put `#waitlist` intro and `.priestley` in a shared 720px column. Keep required email, all five questions, the four existing budget options, and all four optional controls. Use 24px field gaps, 8px label/control gaps, 96px minimum textareas with vertical resizing, sentence-case required markers and 16px input text. Keep Q2 one column with 44px label targets. Add `Optional context` to `.optional-block`; use two columns for short optional fields only at ≥800px, one on mobile. Do not add a sixth required question or require the scorecard before joining.
8. **Make pricing readable on phones.** Add `Early pricing` H2; apply the rollup's stacked mobile offer layout instead of depending on the older 36rem minimum-width table. Keep each amount, monthly unit and deliverable together. Add `scroll-margin-top:80px` to anchor targets if the built CSS lacks it.

### P2 — finishing pass

9. Use Fraunces 600 for headings and IBM Plex Sans 400/500/600 for body and controls; avoid requesting intermediate weights not loaded. Reduce the background paper-line texture if it competes with fine borders. Update title, description and OG copy to the revised plain-language promise; retain the existing favicon if it loads.
10. Keep the existing skip link and reduced-motion CSS; ensure programmatic success/error scrolling also respects reduced motion. Add a visible no-JS note explaining that scoring needs JavaScript while the native waitlist form remains available. The required Q2 group still needs a useful fallback explanation.

## Copy rewrites — before → after

| Location | Before | After |
| --- | --- | --- |
| Hero eyebrow | `DFY MCP / tool-use eval packs` | `Evaluation packs for tool-using agents` |
| H1 | `Labs are paying $60–$120/hr to hand-build MCP eval environments.` | `Test your agents with evaluation packs you can rerun.` |
| Subhead | `EvalCase Factory delivers versioned task packs + sandbox hooks + golden claims you can rerun — so your eval eng time goes to judgment, not YAML archaeology.` | `Get versioned tasks, sandbox setup notes, expected outcomes and scoring rubrics for your MCP tools. Spend less time assembling tests and more time understanding failures.` |
| Hero CTAs | `Get your Eval Maturity Score (free)` / `Join the waitlist for a Starter pack` | `Check your eval setup — free` / `Join the waitlist` |
| Starter deliverable | `N tasks + sandbox notes + judge rubric + golden claims` | `A scoped set of versioned tasks, sandbox notes, expected outcomes and a scoring rubric. Task count agreed before work starts.` |
| Score intro | `Client-side · 10 items · Yes = 10 · No = 0` and current lede | `10 yes/no questions · No email needed to see your score` / `Check which parts of your evaluation setup are in place. Each Yes adds 10 points. A higher score means more of the checklist is covered; it is a self-assessment.` |
| Form eyebrow / H2 | `Priestley interview` / `EvalCase Factory waitlist / score follow-up` | `Join the waitlist` / `Tell us about your eval setup` |
| Q1 | `What breaks (or burns calendar) when you try to measure whether agents can actually use your tools / MCP servers today?` | `What breaks or takes too much time when you test agents against your tools or MCP servers?` |
| Q2 | `Which pieces of an eval harness do you already have — or have you never assembled them end-to-end?` | `Which parts of an evaluation setup do you already have?` Add helper: `Select all that apply. You can have individual pieces without a complete pack.` |
| Q4 | `If you are paying contractors or eval eng hours for MCP / tool-use environments, what does that cost you per month — or what would a wrong “agent-ready” claim cost you?` | `What does this testing cost you each month in staff time or contractor fees? What would a missed agent failure cost?` |
| Q5 | `If we handed you a versioned starter pack (tasks + sandbox notes + golden claims + rubric) in 10–15 business days, what would “worth it” look like for you?` | `If a starter pack could be ready in 10–15 business days, what result would make it worth paying for?` |
| Who for | `Eval / applied research leads; startups building tool-use agents; vendors who need customer-facing harnesses.` | `Evaluation leads and operators of tool-using agents; MCP vendors that need repeatable tests for customers.` |
| Who not | `Not “add llms.txt / MCP-ify my marketing site.” Not a $99/mo eval SaaS seat.` | `Teams looking for a website integration or a self-serve evaluation dashboard.` |
| Footer | `Demand test — packaging unproven until we see budget distribution. Capture: thespencerlowe@gmail.com.` | `We're testing interest before committing to these packs. Spencer may reply from thespencerlowe@gmail.com about your answers. Joining doesn't commit you to buy.` |

Keep Q3 and the existing restricted-use privacy promise; apply the shared early-pricing note, `Early access` badge and `Join the waitlist` submit label. Preserve HTML question numbering and underlying field names when changing labels.

## Acceptance checks for Build QA

- [ ] Compare the actual source/built CSS and JS to the conditional findings above; record which defects were reproduced. Assets load without errors.
- [ ] At 1280×800 and 390×844 the revised promise and primary CTA are visible; benefit spacing is deliberate and the single-column hero has no artificial empty panel.
- [ ] Body, primary button, selected Yes/No text, fields and dark-scorecard focus rings meet the rollup contrast targets.
- [ ] At 320/360/390/768/1280/1440px and 200% zoom, pricing, legends, budget labels and optional fields remain readable without document overflow.
- [ ] Ten score questions retain their meanings and keys; all No=0, all Yes=100; partial answers are marked partial; changing an answer updates visible and hidden values.
- [ ] Email + Q1–Q5 + budget remain required. Invalid Q2 focuses a checkbox and announces its error. `Not sure` is exclusive; partial-setup answers remain possible.
- [ ] The five questions, four budget options and four optional controls survive capture. Direct waitlist signup does not require completing the scorecard.
- [ ] Mock success actually hides the form and reveals/focuses confirmation; mock failure retains answers and exposes retry. No false success from HTTP status alone or a query string; no automatic second POST.
- [ ] Form action/AJAX recipient remains thespencerlowe@gmail.com via FormSubmit; metadata and honeypot are retained. Do not send synthetic leads.
- [ ] `N tasks`, public Priestley references and internal demand-test prose are gone; soft pricing and honest prelaunch status remain. Capture desktop/mobile proof as specified in the rollup.
