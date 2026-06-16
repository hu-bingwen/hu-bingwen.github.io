/* ─── Image focal-point offset ───────────────────────────────────────
   Reads data-ox / data-oy from each gallery <img> and sets
   CSS variables --ox / --oy on the element, which drives object-position.
   Values are any valid CSS length or percentage, e.g. "30%" or "120px".
   Default is 50% / 50% (centred).
──────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.photo-wrap img[data-ox], .photo-wrap img[data-oy]').forEach(img => {
    if (img.dataset.ox) img.style.setProperty('--ox', img.dataset.ox);
    if (img.dataset.oy) img.style.setProperty('--oy', img.dataset.oy);
  });
});

/* ─── Theme toggle ───────────────────────────────────────────────────── */
(function () {
  const html = document.documentElement;
  const saved = localStorage.getItem('theme') || 'dark';
  html.setAttribute('data-theme', saved);

  function updateIcon(theme) {
    document.querySelectorAll('.theme-icon').forEach(el => {
      el.textContent = theme === 'dark' ? '☽' : '☀';
    });
  }
  updateIcon(saved);

  document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('theme-ready'); // ← add this
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

/* ─── Year in footer ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#yr').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
});

/* ─── Scroll fade-in ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const fadeEls = document.querySelectorAll('.fade-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }
});

/* ─── Nav hide/show on scroll ────────────────────────────────────────── */
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

/* ─── Video card click → open link ──────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.video-card').forEach(card => {
    card.addEventListener('click', () => {
      const url = card.dataset.videoUrl;
      if (url) window.open(url, '_blank', 'noopener,noreferrer');
    });
  });
});

/* ─── Lightbox ───────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const lightbox  = document.getElementById('lightbox');
  if (!lightbox) return;

  const lbImg     = document.getElementById('lbImg');
  const lbCaption = document.getElementById('lbCaption');
  const lbCounter = document.getElementById('lbCounter');
  const lbClose   = document.getElementById('lbClose');
  const lbPrev    = document.getElementById('lbPrev');
  const lbNext    = document.getElementById('lbNext');

  // Collect all viewable images in DOM order
  let images = []; // [{src, caption}]
  let current = 0;

  function buildIndex() {
    images = [];
    document.querySelectorAll('.photo-wrap.viewable').forEach(wrap => {
      const img = wrap.querySelector('img');
      if (img) {
        images.push({
          src: img.src,
          caption: wrap.dataset.caption || wrap.querySelector('.photo-caption')?.textContent || ''
        });
      }
    });
    lightbox.dataset.single = images.length <= 1 ? 'true' : 'false';
  }

  function show(index) {
    current = (index + images.length) % images.length;
    const item = images[current];

    lbImg.classList.add('switching');
    setTimeout(() => {
      lbImg.src = item.src;
      lbImg.alt = item.caption;
      lbCaption.textContent = item.caption;
      lbCounter.textContent = `${current + 1} / ${images.length}`;
      lbImg.classList.remove('switching');
    }, 200);
  }

  function open(index) {
    buildIndex();
    document.body.style.overflow = 'hidden';
    lightbox.classList.add('open');
    show(index);
  }

  function close() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    lbImg.src = '';
  }

  // Attach click to each viewable wrap
  document.querySelectorAll('.photo-wrap.viewable').forEach((wrap, i) => {
    wrap.addEventListener('click', () => open(i));
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', () => show(current - 1));
  lbNext.addEventListener('click', () => show(current + 1));

  // Click backdrop to close
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox || e.target.classList.contains('lb-img-wrap')) close();
  });

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   show(current - 1);
    if (e.key === 'ArrowRight')  show(current + 1);
  });

  // Touch swipe support
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) show(dx < 0 ? current + 1 : current - 1);
  });
});
