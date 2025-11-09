const menu = document.querySelector('.menu');
const navLinks = document.querySelector('#main-menu');

// Toggle menu
menu?.addEventListener('click', () => {
  const isExpanded = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', `${!isExpanded}`);
});

// Close menu when clicking a link (mobile)
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    menu?.setAttribute('aria-expanded', 'false');
  });
});

// Close menu when clicking outside (mobile)
document.addEventListener('click', (e) => {
  const isExpanded = menu?.getAttribute('aria-expanded') === 'true';
  if (isExpanded && !menu?.contains(e.target) && !navLinks?.contains(e.target)) {
    menu?.setAttribute('aria-expanded', 'false');
  }
});