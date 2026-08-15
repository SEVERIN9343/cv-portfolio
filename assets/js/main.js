/* =========================================================
   PORTFOLIO OGAH SÉVÉRIN
   SEO • WORDPRESS • PERFORMANCE
========================================================= */

document.documentElement.classList.add('js-ready');


/* =========================================================
   ELEMENTS
========================================================= */

const header = document.querySelector('[data-header]');
const burger = document.querySelector('[data-burger]');
const mobileNav = document.querySelector('[data-mobile-nav]');


/* =========================================================
   HEADER AU SCROLL
========================================================= */

function updateHeader(){

  if(!header) return;

  header.classList.toggle(
    'is-scrolled',
    window.scrollY > 24
  );

}

updateHeader();

window.addEventListener(
  'scroll',
  updateHeader,
  { passive:true }
);


/* =========================================================
   MENU MOBILE
========================================================= */

function closeMobileMenu(){

  if(!burger || !mobileNav) return;

  burger.setAttribute(
    'aria-expanded',
    'false'
  );

  burger.setAttribute(
    'aria-label',
    'Ouvrir le menu'
  );

  mobileNav.classList.remove(
    'is-open'
  );

  document.body.classList.remove(
    'menu-open'
  );

}


function openMobileMenu(){

  if(!burger || !mobileNav) return;

  burger.setAttribute(
    'aria-expanded',
    'true'
  );

  burger.setAttribute(
    'aria-label',
    'Fermer le menu'
  );

  mobileNav.classList.add(
    'is-open'
  );

  document.body.classList.add(
    'menu-open'
  );

}


burger?.addEventListener(
  'click',
  () => {

    const isOpen =
      burger.getAttribute('aria-expanded') === 'true';

    isOpen
      ? closeMobileMenu()
      : openMobileMenu();

  }
);


mobileNav
  ?.querySelectorAll('a')
  .forEach((link) => {

    link.addEventListener(
      'click',
      closeMobileMenu
    );

  });


window.addEventListener(
  'resize',
  () => {

    if(window.innerWidth >= 980){
      closeMobileMenu();
    }

  }
);


/* =========================================================
   REVEAL AU SCROLL
========================================================= */

const revealItems =
  document.querySelectorAll('.reveal');


const prefersReducedMotion =
  window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;


if(prefersReducedMotion){

  revealItems.forEach((item) => {
    item.classList.add('is-visible');
  });

}else{

  const revealObserver =
    new IntersectionObserver(

      (entries, observer) => {

        entries.forEach((entry) => {

          if(!entry.isIntersecting){
            return;
          }

          const delay =
            Number(
              entry.target.dataset.delay || 0
            );

          entry.target.style.transitionDelay =
            `${delay}ms`;

          entry.target.classList.add(
            'is-visible'
          );

          observer.unobserve(
            entry.target
          );

        });

      },

      {
        threshold:0.14,
        rootMargin:'0px 0px -35px 0px'
      }

    );


  revealItems.forEach((item) => {
    revealObserver.observe(item);
  });

}


/* =========================================================
   COMPTEURS SEO
========================================================= */

const counters =
  document.querySelectorAll('[data-counter]');


function animateCounter(element){

  const target =
    Number(
      element.dataset.counter
    );

  if(
    !Number.isFinite(target) ||
    element.dataset.animated === 'true'
  ){
    return;
  }


  element.dataset.animated = 'true';


  const duration = 1100;

  const startTime =
    performance.now();


  function update(currentTime){

    const elapsed =
      currentTime - startTime;

    const progress =
      Math.min(
        elapsed / duration,
        1
      );


    const eased =
      1 - Math.pow(
        1 - progress,
        3
      );


    const currentValue =
      Math.round(
        target * eased
      );


    element.textContent =
      currentValue;


    if(progress < 1){

      requestAnimationFrame(
        update
      );

    }else{

      element.textContent =
        target;

    }

  }


  requestAnimationFrame(
    update
  );

}


if(
  counters.length &&
  !prefersReducedMotion
){

  const counterObserver =
    new IntersectionObserver(

      (entries, observer) => {

        entries.forEach((entry) => {

          if(!entry.isIntersecting){
            return;
          }

          animateCounter(
            entry.target
          );

          observer.unobserve(
            entry.target
          );

        });

      },

      {
        threshold:0.65
      }

    );


  counters.forEach((counter) => {

    counter.textContent = '0';

    counterObserver.observe(
      counter
    );

  });

}


/* =========================================================
   FERMETURE MENU AVEC ECHAP
========================================================= */

document.addEventListener(
  'keydown',
  (event) => {

    if(event.key === 'Escape'){
      closeMobileMenu();
    }

  }
);


/* =========================================================
   ANNEE FOOTER
========================================================= */

const year =
  document.getElementById('year');


if(year){

  year.textContent =
    new Date().getFullYear();

}