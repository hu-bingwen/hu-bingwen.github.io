/* ─── Theme toggle ───────────────────────
   Persists preference in localStorage.
   Icons: ☽ = dark mode is active, ☀ = light mode is active
──────────────────────────────────────── */
(function () {
  const html = document.documentElement;
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);

  function updateIcon(theme) {
    document.querySelectorAll('.theme-icon').forEach(el => {
      el.textContent = theme === 'dark' ? '☽' : '☀';
    });
  }

  // Set icon immediately (before DOMContentLoaded) to avoid flash
  updateIcon(saved);

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;

    updateIcon(html.getAttribute('data-theme'));

    btn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateIcon(next);
    });
  });
})();

/* ─── Year in footer ─────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#yr').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});

/* ─── Scroll fade-in ─────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }
});

/* ─── Nav hide/show on scroll ─────────── */
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  nav.style.transition = 'transform .4s cubic-bezier(.25,.46,.45,.94), background .35s, border-color .35s';

  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    nav.style.transform = (y > 80 && y > lastY) ? 'translateY(-100%)' : 'translateY(0)';
    lastY = y;
  }, { passive: true });
});

/* ─── Video card click → open link ──────
   Clicking any .video-card opens its data-video-url in a new tab.
──────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.videoUrl;
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
});
