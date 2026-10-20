// AEEE ExCom website interactions, scroll animations, and AJAX form submission.
const FORMSPREE_ENDPOINT = "https://formspree.io/f/myekapvb";
const form = document.getElementById("applicationForm");
const status = document.getElementById("formStatus");
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// Reveal elements as they enter the viewport.
document.body.classList.add("js-motion");
const revealTargets = [
  [".hero-topline", "left"], [".hero-copy", "left"], [".hero-visual", "right"],
  [".hero-bottomline", "up"], [".form-intro", "left"], [".application-form", "right"],
  [".footer-brand", "up"], [".footer-message", "up"], [".back-top", "up"], [".footer-bottom", "up"]
];
revealTargets.forEach(([selector, direction]) => {
  document.querySelectorAll(selector).forEach((element) => { element.dataset.reveal = direction; });
});
const formFields = document.querySelectorAll(".application-form > label, .application-form > input, .application-form > textarea, .application-form > .two-columns, .application-form > .consent, .application-form > .submit-button");
formFields.forEach((element, index) => {
  element.dataset.reveal = "up";
  element.style.setProperty("--reveal-delay", `${Math.min(index * 45, 270)}ms`);
});
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
  document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll("[data-reveal]").forEach((element) => element.classList.add("is-visible"));
}

// Submit in the background and show success only after Formspree confirms receipt.
if (form) {
  form.action = FORMSPREE_ENDPOINT;
  form.method = "POST";
  const submitButton = form.querySelector('button[type="submit"], input[type="submit"]');
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    if (status) {
      status.textContent = "Sending your application…";
      status.classList.remove("error", "success");
      status.setAttribute("role", "status");
    }
    if (submitButton) { submitButton.disabled = true; submitButton.setAttribute("aria-busy", "true"); }
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });
      let result = {};
      try { result = await response.json(); } catch (_) { /* non-JSON error response */ }
      if (!response.ok || result.errors) {
        const detail = result.errors?.map((item) => item.message).join(", ");
        throw new Error(detail || "Submission was not accepted.");
      }
      form.reset();
      if (status) {
        status.textContent = "Thank you! Your application has been submitted successfully.";
        status.classList.add("success");
        status.classList.remove("error");
        status.setAttribute("role", "status");
        status.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    } catch (error) {
      console.error("AEEE application submission failed:", error);
      if (status) {
        status.textContent = "We couldn't submit your application. Please check your connection and try again.";
        status.classList.add("error");
        status.classList.remove("success");
        status.setAttribute("role", "alert");
      }
    } finally {
      if (submitButton) { submitButton.disabled = false; submitButton.removeAttribute("aria-busy"); }
    }
  });
}
