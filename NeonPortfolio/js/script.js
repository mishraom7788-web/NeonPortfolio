// Shared interactions for all portfolio pages.
document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      });
    });
  }

  document.querySelectorAll("[data-year]").forEach((node) => {
    node.textContent = new Date().getFullYear();
  });

  // Update the contact page email in BOTH places before using the form.
  const contactEmail = "your.email@example.com"; // Replace with your real email.
  document.querySelectorAll("[data-email-link]").forEach((link) => {
    link.href = `mailto:${contactEmail}`;
    link.textContent = contactEmail;
  });

  const form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const feedback = document.getElementById("formFeedback");
      if (!form.reportValidity()) return;

      const formData = new FormData(form);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const subject = String(formData.get("subject") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!contactEmail || contactEmail === "your.email@example.com") {
        feedback.textContent = "First, replace the placeholder email in js/script.js with your real email address.";
        feedback.style.color = "#ff9b9b";
        return;
      }

      const body = `Name: ${name}\nReply email: ${email}\n\n${message}`;
      const mailto = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      feedback.textContent = "Opening your email app…";
      feedback.style.color = "var(--green)";
      window.location.href = mailto;
    });
  }
});
