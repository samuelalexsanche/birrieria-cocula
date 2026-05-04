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
