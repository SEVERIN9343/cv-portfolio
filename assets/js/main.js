const burger = document.querySelector(".burger");
const mobileNav = document.querySelector("[data-mobile-nav]");

burger?.addEventListener("click", () => {
  const open = burger.getAttribute("aria-expanded") === "true";
  burger.setAttribute("aria-expanded", String(!open));
  mobileNav?.classList.toggle("is-open", !open);
});

mobileNav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    burger?.setAttribute("aria-expanded", "false");
    mobileNav?.classList.remove("is-open");
  });
});

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const delay = entry.target.dataset.delay || 0;
    entry.target.style.transitionDelay = `${delay}ms`;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => observer.observe(item));

const slides = [...document.querySelectorAll("[data-project]")];
const nextBtn = document.querySelector("[data-next]");
const prevBtn = document.querySelector("[data-prev]");
const dotsWrap = document.querySelector("[data-dots]");
let current = 0;
let timer = null;

function renderDots() {
  if (!dotsWrap) return;
  dotsWrap.innerHTML = "";
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = index === current ? "is-active" : "";
    dot.setAttribute("aria-label", `Afficher le projet ${index + 1}`);
    dot.addEventListener("click", () => showSlide(index));
    dotsWrap.appendChild(dot);
  });
}

function showSlide(index) {
  if (!slides.length) return;
  current = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("is-active", i === current));
  renderDots();
  restartAuto();
}

function restartAuto() {
  clearInterval(timer);
  timer = setInterval(() => showSlide(current + 1), 6500);
}

nextBtn?.addEventListener("click", () => showSlide(current + 1));
prevBtn?.addEventListener("click", () => showSlide(current - 1));
renderDots();
restartAuto();

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
