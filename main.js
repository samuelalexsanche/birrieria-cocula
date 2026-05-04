// Menu tabs
const tabs = document.querySelectorAll('.menu__tabs button');
const panels = document.querySelectorAll('.menu__panel');
tabs.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabs.forEach(b => b.classList.toggle('is-active', b === btn));
    panels.forEach(p => p.classList.toggle('is-active', p.dataset.panel === target));
  });
});

// Mobile nav
const burger = document.querySelector('.nav__burger');
const links = document.querySelector('.nav__links');
burger?.addEventListener('click', () => {
  const open = links.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', open);
});
links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  links.classList.remove('is-open');
  burger?.setAttribute('aria-expanded', 'false');
}));

// Reveal on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.section__head, .mucho__text, .mucho__img, .barra__type, .barra__gallery img, .historia__text, .historia__media img, .dish, .card, .galeria__track img').forEach(el => {
  el.classList.add('reveal');
  io.observe(el);
});

// Galería - Carrusel automático y botones
const galeriaTrack = document.querySelector('.galeria__track');
const galeríaPrevBtn = document.querySelector('.galeria__nav--prev');
const galeriaNextBtn = document.querySelector('.galeria__nav--next');

let autoplayInterval;
const SCROLL_AMOUNT = 380; // Ancho de imagen
const AUTOPLAY_DELAY = 4000; // 4 segundos

function scrollGaleria(direction) {
  const scrollAmount = direction === 'next' ? SCROLL_AMOUNT : -SCROLL_AMOUNT;
  galeriaTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  resetAutoplay();
}

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    galeriaTrack.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
  }, AUTOPLAY_DELAY);
}

function resetAutoplay() {
  clearInterval(autoplayInterval);
  startAutoplay();
}

galeriaNextBtn?.addEventListener('click', () => scrollGaleria('next'));
galeríaPrevBtn?.addEventListener('click', () => scrollGaleria('prev'));

// Pausar autoplay cuando el usuario interactúa
galeriaTrack?.addEventListener('mouseenter', () => clearInterval(autoplayInterval));
galeriaTrack?.addEventListener('mouseleave', startAutoplay);
galeriaTrack?.addEventListener('touchstart', () => clearInterval(autoplayInterval));
galeriaTrack?.addEventListener('touchend', resetAutoplay);

// Iniciar autoplay
startAutoplay();
