// Replace this with the endpoint created at https://formspree.io/
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORMSPREE_ID";
const menu = document.getElementById("menu");
const nav = document.getElementById("nav");
menu.addEventListener("click", () => nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));
document.getElementById("year").textContent = new Date().getFullYear();
const form = document.getElementById("applicationForm");
const status = document.getElementById("status");
form.addEventListener("submit", async e => {
  e.preventDefault();
  status.className = "status";
  if (FORMSPREE_ENDPOINT.includes("YOUR_FORMSPREE_ID")) {
    status.classList.add("error");
    status.textContent = "Form not connected yet. The site owner must add a Formspree endpoint in script.js before applications can be received.";
    return;
  }
  const button = form.querySelector("button[type=submit]");
  const old = button.innerHTML;
  button.disabled = true; button.textContent = "Submitting...";
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {method:"POST", body:new FormData(form), headers:{"Accept":"application/json"}});
    if (response.ok) {
      form.reset(); status.classList.add("success"); status.textContent = "Thank you! Your application has been submitted.";
    } else {
      status.classList.add("error"); status.textContent = "Submission failed. Please check your details and try again.";
    }
  } catch (_) {
    status.classList.add("error"); status.textContent = "Unable to submit right now. Please check your internet connection and try again.";
  } finally { button.disabled = false; button.innerHTML = old; }
});
