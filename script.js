const header = document.querySelector('[data-header]');
const hero = document.querySelector('.hero');
const year = document.querySelector('[data-year]');
year.textContent = new Date().getFullYear();

const updateHeader = () => {
  const heroBottom = hero.getBoundingClientRect().bottom;
  header.classList.toggle('scrolled', heroBottom <= header.offsetHeight);
};
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });
window.addEventListener('resize', updateHeader, { passive: true });

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (reducedMotion || !('IntersectionObserver' in window)) {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
} else {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
}
