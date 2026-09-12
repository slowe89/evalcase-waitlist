const DEFAULT_FORM_ACTION = "https://formsubmit.co/thespencerlowe@gmail.com";
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || DEFAULT_FORM_ACTION;
const NOT_SURE = "Not sure";
const DEFAULT_SUBMIT_LABEL = "Join the waitlist";

const KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"];

const BANDS = [
  { max: 39, label: "Ad-hoc / contractor-only" },
  { max: 69, label: "Partial harness" },
  { max: 89, label: "Ship-risk remains" },
  { max: 100, label: "Strong (still refresh when tools move)" },
];

const form = document.getElementById("priestley-form");
const success = document.getElementById("form-success");
const formError = document.getElementById("form-error");
const harnessError = document.getElementById("harness-error");
const harnessFieldset = form.querySelector(".check-group");
const submitBtn = document.getElementById("submit-btn");
const sourceField = document.getElementById("meta-source");
const scoreTotalField = document.getElementById("meta-score-total");
const scoreVectorField = document.getElementById("meta-score-vector");
const timestampField = document.getElementById("meta-timestamp");
const scoreTotalEl = document.getElementById("score-total");
const scoreBandEl = document.getElementById("score-band");
const scoreProgressEl = document.getElementById("score-progress");
const scoreInvite = document.getElementById("score-invite");
const scoreInviteText = document.getElementById("score-invite-text");
const harnessBoxes = [...form.querySelectorAll('input[name="harness_pieces"]')];

form.action = FORM_ENDPOINT;

let submitting = false;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollToEl(el) {
  el.scrollIntoView({
    behavior: prefersReducedMotion() ? "auto" : "smooth",
    block: "center",
  });
}

function answers() {
  return KEYS.map((key) => {
    const checked = document.querySelector(`input[name="maturity-${key}"]:checked`);
    return checked ? checked.value : null;
  });
}

function bandFor(total) {
  return BANDS.find((band) => total <= band.max).label;
}

function syncScore() {
  const vector = answers();
  const answered = vector.filter((value) => value !== null);
  const yesCount = answered.filter((value) => value === "Y").length;
  const total = yesCount * 10;
  const complete = answered.length === KEYS.length;

  scoreProgressEl.textContent = `${answered.length} / 10 answered`;

  if (!answered.length) {
    scoreTotalEl.textContent = "—";
    scoreBandEl.textContent = "Answer to score";
    scoreInvite.hidden = true;
    scoreTotalField.value = "";
    scoreVectorField.value = "";
    return;
  }

  if (complete) {
    scoreTotalEl.textContent = `${total} / 100`;
    scoreBandEl.textContent = bandFor(total);
    scoreInvite.hidden = false;
    scoreInviteText.textContent = `Your Eval Maturity Score is ${total} / 100 — ${bandFor(total)}.`;
    scoreTotalField.value = String(total);
    scoreVectorField.value = vector.join("/");
    sourceField.value = "evalcase-scorecard";
    return;
  }

  scoreTotalEl.textContent = `${total}`;
  scoreBandEl.textContent = `Partial · ${answered.length} of 10 answered`;
  scoreInvite.hidden = true;
  scoreTotalField.value = String(total);
  scoreVectorField.value = vector.map((value) => value ?? "-").join("/");
}

function setSource(source) {
  if (!scoreInvite || scoreInvite.hidden) {
    sourceField.value = source;
  }
}

document.querySelectorAll("[data-source]").forEach((link) => {
  link.addEventListener("click", () => {
    setSource(link.dataset.source);
  });
});

document.getElementById("score-items").addEventListener("change", syncScore);

function harnessSelected() {
  return harnessBoxes.some((box) => box.checked);
}

function showHarnessError() {
  harnessError.hidden = false;
  harnessFieldset.setAttribute("aria-invalid", "true");
  harnessBoxes[0].focus();
}

function clearHarnessError() {
  if (!harnessSelected()) return;
  harnessError.hidden = true;
  harnessFieldset.removeAttribute("aria-invalid");
}

function syncHarnessExclusive(changed) {
  if (changed.value === NOT_SURE && changed.checked) {
    harnessBoxes.forEach((box) => {
      if (box !== changed) box.checked = false;
    });
  } else if (changed.value !== NOT_SURE && changed.checked) {
    harnessBoxes.forEach((box) => {
      if (box.value === NOT_SURE) box.checked = false;
    });
  }
  clearHarnessError();
}

harnessBoxes.forEach((box) => {
  box.addEventListener("change", () => syncHarnessExclusive(box));
});

function ajaxUrl(endpoint) {
  return endpoint.includes("formsubmit.co/")
    ? endpoint.replace("formsubmit.co/", "formsubmit.co/ajax/")
    : endpoint;
}

function isConfirmedSuccess(response, body) {
  if (!response.ok) return false;
  if (!body || typeof body !== "object") return false;
  return body.success === true || body.success === "true";
}

async function parseBody(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function showFormError(message) {
  formError.hidden = false;
  formError.textContent = message;
}

function setSending(isSending) {
  submitting = isSending;
  submitBtn.disabled = isSending;
  submitBtn.textContent = isSending ? "Sending…" : DEFAULT_SUBMIT_LABEL;
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  formError.hidden = true;

  if (submitting) return;

  if (!harnessSelected()) {
    showHarnessError();
    return;
  }

  clearHarnessError();
  timestampField.value = new Date().toISOString();
  if (!scoreVectorField.value) {
    scoreVectorField.value = answers()
      .map((value) => value ?? "-")
      .join("/");
  }
  if (!sourceField.value) {
    sourceField.value = "evalcase-waitlist";
  }

  setSending(true);

  try {
    const response = await fetch(ajaxUrl(FORM_ENDPOINT), {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(form),
    });
    const body = await parseBody(response);

    if (!isConfirmedSuccess(response, body)) {
      showFormError("We couldn’t send that just now. Your answers are still here — try again.");
      setSending(false);
      formError.focus?.();
      scrollToEl(formError);
      return;
    }

    form.hidden = true;
    success.hidden = false;
    success.focus();
    scrollToEl(success);
  } catch {
    showFormError("We couldn’t send that just now. Your answers are still here — try again.");
    setSending(false);
    scrollToEl(formError);
  }
});

syncScore();

const emailFirstForm = document.getElementById("email-first-form");
const emailFirstSuccess = document.getElementById("email-first-success");
const emailFirstError = document.getElementById("email-first-error");
const emailFirstSubmit = document.getElementById("email-first-submit");
const EMAIL_FIRST_SUBMIT_LABEL = "Send me the scorecard";

emailFirstForm.action = FORM_ENDPOINT;

let emailFirstSubmitting = false;

function showEmailFirstError(message) {
  emailFirstError.hidden = false;
  emailFirstError.textContent = message;
}

function setEmailFirstSending(isSending) {
  emailFirstSubmitting = isSending;
  emailFirstSubmit.disabled = isSending;
  emailFirstSubmit.textContent = isSending ? "Sending…" : EMAIL_FIRST_SUBMIT_LABEL;
}

emailFirstForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  emailFirstError.hidden = true;

  if (emailFirstSubmitting) return;

  setEmailFirstSending(true);

  try {
    const response = await fetch(ajaxUrl(FORM_ENDPOINT), {
      method: "POST",
      headers: { Accept: "application/json" },
      body: new FormData(emailFirstForm),
    });
    const body = await parseBody(response);

    if (!isConfirmedSuccess(response, body)) {
      showEmailFirstError("We couldn’t send that just now. Your email is still here — try again.");
      setEmailFirstSending(false);
      emailFirstError.focus?.();
      return;
    }

    emailFirstForm.hidden = true;
    emailFirstSuccess.hidden = false;
    emailFirstSuccess.focus();
  } catch {
    showEmailFirstError("We couldn’t send that just now. Your email is still here — try again.");
    setEmailFirstSending(false);
  }
});
