document.addEventListener('DOMContentLoaded', () => {

  // ─── 0A. Animated counters ─────────────────────────────────────────────────
  const counters = document.querySelectorAll('.stats-band__num[data-target]');
  if (counters.length > 0 && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1400;
        const step = 16;
        const steps = duration / step;
        let current = 0;
        const increment = target / steps;
        const timer = setInterval(() => {
          current = Math.min(current + increment, target);
          el.textContent = Math.round(current) + suffix;
          if (current >= target) clearInterval(timer);
        }, step);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  } else {
    counters.forEach(c => {
      c.textContent = c.dataset.target + (c.dataset.suffix || '');
    });
  }

  // ─── 0D. Typing effect ────────────────────────────────────────────────────
  const typingEl = document.getElementById('typing-text');
  if (typingEl) {
    const words = ['enfin fun', 'plus zen', 'simplifiée', 'bien organisée'];
    let wordIndex = 0;
    let charIndex = words[0].length;
    let isDeleting = false;
    let pause = false;

    function type() {
      const current = words[wordIndex];
      if (pause) { pause = false; setTimeout(type, 1400); return; }

      if (!isDeleting) {
        charIndex++;
        typingEl.textContent = current.substring(0, charIndex);
        if (charIndex === current.length) { isDeleting = true; pause = true; }
        setTimeout(type, 90);
      } else {
        charIndex--;
        typingEl.textContent = current.substring(0, charIndex);
        if (charIndex === 0) {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          pause = true;
        }
        setTimeout(type, 50);
      }
    }
    // Start after initial pause
    setTimeout(type, 2200);
  }


  // ─── 1. Header scroll effect ───────────────────────────────────────────────
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  // ─── 2. Mobile menu ────────────────────────────────────────────────────────
  const hamburger = document.querySelector('.header__hamburger');
  const nav = document.querySelector('.header__nav');

  const closeMenu = () => {
    if (!nav || !hamburger) return;
    nav.classList.remove('header__nav--open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      nav.classList.toggle('header__nav--open', !isOpen);
    });

    // Close on nav link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // ─── 3. FAQ accordion ──────────────────────────────────────────────────────
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-q');
    const panel = item.querySelector('.faq-a');
    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      // Close all other items
      faqItems.forEach(other => {
        if (other === item) return;
        const otherBtn = other.querySelector('.faq-q');
        const otherPanel = other.querySelector('.faq-a');
        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        if (otherPanel) otherPanel.hidden = true;
      });

      // Toggle clicked item
      btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
      panel.hidden = isOpen;
    });
  });

  // ─── 4. Pricing toggle ─────────────────────────────────────────────────────
  const btnMonthly = document.getElementById('toggle-monthly');
  const btnAnnual = document.getElementById('toggle-annual');

  const applyPricing = (mode) => {
    const isAnnual = mode === 'annual';

    // Update toggle button states
    if (btnMonthly) {
      btnMonthly.setAttribute('aria-pressed', isAnnual ? 'false' : 'true');
      btnMonthly.classList.toggle('pricing-toggle__btn--active', !isAnnual);
    }
    if (btnAnnual) {
      btnAnnual.setAttribute('aria-pressed', isAnnual ? 'true' : 'false');
      btnAnnual.classList.toggle('pricing-toggle__btn--active', isAnnual);
    }

    // Update data-monthly / data-annual text elements
    document.querySelectorAll('[data-monthly]').forEach(el => {
      el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
    });

    // Toggle save-line visibility
    document.querySelectorAll('.pricing-card__save-monthly').forEach(el => {
      el.hidden = isAnnual;
    });
    document.querySelectorAll('.pricing-card__save-annual').forEach(el => {
      el.hidden = !isAnnual;
    });
  };

  if (btnMonthly) btnMonthly.addEventListener('click', () => applyPricing('monthly'));
  if (btnAnnual)  btnAnnual.addEventListener('click',  () => applyPricing('annual'));

  // ─── 5. IntersectionObserver — scroll animations ───────────────────────────
  const animatedEls = document.querySelectorAll('.animate-on-scroll');
  if (animatedEls.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    animatedEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: just make everything visible
    animatedEls.forEach(el => el.classList.add('is-visible'));
  }

  // ─── 6. Smooth scroll with header offset ───────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;
      const offset = headerHeight + 16;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({ top, behavior: 'smooth' });

      // Close mobile menu if open
      closeMenu();
    });
  });

});
