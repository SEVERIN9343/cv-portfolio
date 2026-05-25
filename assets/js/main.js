/* =========================================================
   PORTFOLIO — JS PROPRE
========================================================= */

document.documentElement.classList.add('js-ready');

/* MENU MOBILE */
const burger = document.querySelector('.burger');
const mobileNav = document.querySelector('[data-mobile-nav]');
const topbar = document.querySelector('.topbar');

burger?.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') === 'true';

  burger.setAttribute('aria-expanded', String(!open));
  mobileNav?.classList.toggle('is-open', !open);
  document.body.classList.toggle('menu-open', !open);
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    burger?.setAttribute('aria-expanded', 'false');
    mobileNav?.classList.remove('is-open');
    document.body.classList.remove('menu-open');
  });
});

/* HEADER AU SCROLL */
function handleHeaderScroll(){
  topbar?.classList.toggle('is-scrolled', window.scrollY > 20);
}

handleHeaderScroll();
window.addEventListener('scroll', handleHeaderScroll);

/* AU CHARGEMENT : ON RESTE EN HAUT */
window.addEventListener('load', () => {
  if(window.location.hash){
    history.replaceState(null, '', window.location.pathname + window.location.search);
  }

  window.scrollTo({
    top:0,
    left:0,
    behavior:'auto'
  });
});

/* REVEAL UNIFORME AU SCROLL */
const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      const delay = entry.target.dataset.delay || 0;

      entry.target.style.transitionDelay = `${delay}ms`;
      entry.target.classList.add('is-visible');

      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold:0.12,
  rootMargin:'0px 0px -45px 0px'
});

revealItems.forEach((item, index) => {
  if(!item.dataset.delay && item.closest('.cards-grid, .expertise-list')){
    item.dataset.delay = String((index % 3) * 90);
  }

  revealObserver.observe(item);
});

/* SLIDER */
function createSlider(settings){
  const slides = document.querySelectorAll(settings.slideSelector);
  const prevBtn = document.querySelector(settings.prevSelector);
  const nextBtn = document.querySelector(settings.nextSelector);
  const dotsWrap = document.querySelector(settings.dotsSelector);

  if(!slides.length) return;

  let current = 0;
  let interval = null;
  let startX = 0;

  function buildDots(){
    if(!dotsWrap) return;

    dotsWrap.innerHTML = '';

    slides.forEach((_, index) => {
      const dot = document.createElement('button');

      dot.type = 'button';
      dot.setAttribute('aria-label', `Voir le projet ${index + 1}`);

      dot.addEventListener('click', () => {
        showSlide(index);
        restartAuto();
      });

      dotsWrap.appendChild(dot);
    });
  }

  function showSlide(index){
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });

    dotsWrap?.querySelectorAll('button').forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });

    current = index;
  }

  function next(){
    showSlide((current + 1) % slides.length);
  }

  function prev(){
    showSlide((current - 1 + slides.length) % slides.length);
  }

  function startAuto(){
    stopAuto();
    interval = setInterval(next, settings.interval || 6500);
  }

  function stopAuto(){
    if(interval) clearInterval(interval);
  }

  function restartAuto(){
    stopAuto();
    startAuto();
  }

  nextBtn?.addEventListener('click', () => {
    next();
    restartAuto();
  });

  prevBtn?.addEventListener('click', () => {
    prev();
    restartAuto();
  });

  slides.forEach((slide) => {
    slide.addEventListener('mouseenter', stopAuto);
    slide.addEventListener('mouseleave', startAuto);

    slide.addEventListener('touchstart', (event) => {
      startX = event.touches[0].clientX;
    }, { passive:true });

    slide.addEventListener('touchend', (event) => {
      const endX = event.changedTouches[0].clientX;
      const diff = startX - endX;

      if(Math.abs(diff) > 45){
        diff > 0 ? next() : prev();
        restartAuto();
      }
    });
  });

  buildDots();
  showSlide(0);
  startAuto();
}

/* INITIALISATION */
createSlider({
  slideSelector:'[data-web-project]',
  prevSelector:'[data-prev-web]',
  nextSelector:'[data-next-web]',
  dotsSelector:'[data-web-dots]',
  interval:6500
});

createSlider({
  slideSelector:'[data-real-project]',
  prevSelector:'[data-prev-real]',
  nextSelector:'[data-next-real]',
  dotsSelector:'[data-real-dots]',
  interval:6800
});

createSlider({
  slideSelector:'[data-seo-project]',
  prevSelector:'[data-prev-seo]',
  nextSelector:'[data-next-seo]',
  dotsSelector:'[data-seo-dots]',
  interval:7000
});

/* ANNÉE FOOTER */
const year = document.getElementById('year');

if(year){
  year.textContent = new Date().getFullYear();
}
