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
  threshold: 0.14
});

revealItems.forEach((item) => {
  revealObserver.observe(item);
});

function createSlider(settings){
  const slides = document.querySelectorAll(settings.slideSelector);
  const prevBtn = document.querySelector(settings.prevSelector);
  const nextBtn = document.querySelector(settings.nextSelector);
  const dotsWrap = document.querySelector(settings.dotsSelector);

  if(!slides.length){
    return;
  }

  let current = 0;
  let interval = null;

  function buildDots(){
    if(!dotsWrap){
      return;
    }

    dotsWrap.innerHTML = '';

    slides.forEach((_, index) => {
      const dot = document.createElement('button');

      dot.type = 'button';
      dot.setAttribute('aria-label', `Voir le projet ${index + 1}`);

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
    let nextIndex = current + 1;

    if(nextIndex >= slides.length){
      nextIndex = 0;
    }

    showSlide(nextIndex);
  }

  function prev(){
    let prevIndex = current - 1;

    if(prevIndex < 0){
      prevIndex = slides.length - 1;
    }

    showSlide(prevIndex);
  }

  function startAuto(){
    interval = setInterval(next, settings.interval || 6000);
  }

  function restartAuto(){
    clearInterval(interval);
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

  buildDots();
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
  slideSelector: '[data-real-project]',
  prevSelector: '[data-prev-real]',
  nextSelector: '[data-next-real]',
  dotsSelector: '[data-real-dots]',
  interval: 6800
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
