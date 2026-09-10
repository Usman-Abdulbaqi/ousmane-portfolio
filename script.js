document.getElementById('year').textContent = new Date().getFullYear();

// single orchestrated hero reveal on load
requestAnimationFrame(() => {
  document.documentElement.classList.add('revealed');
});

/* ==========================================================
   Theme toggle (dark / light)
   ========================================================== */
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeColorMeta = document.getElementById('themeColorMeta');

function applyThemeColorMeta(theme) {
  if (themeColorMeta) {
    themeColorMeta.setAttribute('content', theme === 'light' ? '#F5F8F5' : '#0B0F0D');
  }
}

// theme was already set pre-paint by the inline script in <head>; sync the meta tag
applyThemeColorMeta(root.getAttribute('data-theme') || 'dark');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    const next = current === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    applyThemeColorMeta(next);
  });
}

/* ==========================================================
   Mobile nav (class-based only — no inline styles left behind,
   so links never get stuck hidden/visible across breakpoints)
   ========================================================== */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

function closeNav() {
  navLinks.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.textContent = '☰';
}

function openNav() {
  navLinks.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.textContent = '✕';
}

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.contains('open');
    isOpen ? closeNav() : openNav();
  });

  // close after a link is picked, so the menu never lingers open over the content
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // close if the menu is open and the viewport grows back to desktop size
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeNav();
  });

  // close on outside click
  document.addEventListener('click', (e) => {
    if (!navLinks.classList.contains('open')) return;
    if (navLinks.contains(e.target) || navToggle.contains(e.target)) return;
    closeNav();
  });
}

/* ==========================================================
   Scroll to top
   ========================================================== */
const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
  const toggleScrollBtn = () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 560);
  };
  toggleScrollBtn();
  window.addEventListener('scroll', toggleScrollBtn, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
