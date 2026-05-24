const burger = document.querySelector('.burger');
const mobileNav = document.querySelector('[data-mobile-nav]');

burger?.addEventListener('click', () => {
  const open = burger.getAttribute('aria-expanded') === 'true';

  burger.setAttribute('aria-expanded', String(!open));
  mobileNav?.classList.toggle('is-open', !open);
});

mobileNav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    burger?.setAttribute('aria-expanded', 'false');
    mobileNav?.classList.remove('is-open');
  });
});

const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if(entry.isIntersecting){
      const delay = entry.target.dataset.delay || 0;

      entry.target.style.transitionDelay = `${delay}ms`;
      entry.target.classList.add('is-visible');

      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.14
});

reveals.forEach((el) => observer.observe(el));

function createSlider(config){
  const slides = document.querySelectorAll(config.slideSelector);
  const prevBtn = document.querySelector(config.prevSelector);
  const nextBtn = document.querySelector(config.nextSelector);
  const dotsWrap = document.querySelector(config.dotsSelector);

  if(!slides.length){
    return;
  }

  let current = 0;
  let timer = null;

  function renderDots(){
    if(!dotsWrap){
      return;
    }

    dotsWrap.innerHTML = '';

    slides.forEach((_, index) => {
      const dot = document.createElement('button');

      if(index === current){
        dot.classList.add('is-active');
      }

      dot.addEventListener('click', () => {
        showSlide(index);
        restartAuto();
      });

      dotsWrap.appendChild(dot);
    });
  }

  function showSlide(index){
    slides.forEach((slide) => {
      slide.classList.remove('is-active');
    });

    slides[index].classList.add('is-active');

    if(dotsWrap){
      dotsWrap.querySelectorAll('button').forEach((dot) => {
        dot.classList.remove('is-active');
      });

      dotsWrap.querySelectorAll('button')[index]?.classList.add('is-active');
    }

    current = index;
  }

  function next(){
    let index = current + 1;

    if(index >= slides.length){
      index = 0;
    }

    showSlide(index);
  }

  function prev(){
    let index = current - 1;

    if(index < 0){
      index = slides.length - 1;
    }

    showSlide(index);
  }

  function startAuto(){
    timer = setInterval(next, config.interval || 6000);
  }

  function restartAuto(){
    clearInterval(timer);
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

  renderDots();
  showSlide(0);
  startAuto();
}

createSlider({
  slideSelector: '[data-web-project]',
  prevSelector: '[data-prev-web]',
  nextSelector: '[data-next-web]',
  dotsSelector: '[data-web-dots]',
  interval: 6500
});

createSlider({
  slideSelector: '[data-seo-project]',
  prevSelector: '[data-prev-seo]',
  nextSelector: '[data-next-seo]',
  dotsSelector: '[data-seo-dots]',
  interval: 7000
});

const year = document.getElementById('year');

if(year){
  year.textContent = new Date().getFullYear();
}
