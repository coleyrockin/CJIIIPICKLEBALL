/* =============================================
   CJ's Pickleball — Main JS
   ============================================= */

(function () {
  'use strict';

  /* ---- Logo image fallback ---- */
  var logoImg = document.getElementById('logoImg');
  var logoText = document.getElementById('logo-text');
  if (logoImg && logoText) {
    logoImg.addEventListener('error', function () {
      logoImg.style.display = 'none';
      logoText.style.display = 'flex';
    });
  }

  /* ---- Mobile Navigation ---- */
  var toggle = document.getElementById('navToggle');
  var menu   = document.getElementById('navMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when a nav link is clicked
    menu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- Coupon Code Copy ---- */
  var toast = document.getElementById('toast');
  var toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove('show');
    }, 2200);
  }

  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var code = btn.getAttribute('data-target');
      if (!code) return;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(function () {
          markCopied(btn);
        }).catch(function () {
          fallbackCopy(code, btn);
        });
      } else {
        fallbackCopy(code, btn);
      }
    });
  });

  function fallbackCopy(text, btn) {
    var el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.cssText = 'position:absolute;left:-9999px;top:-9999px;';
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      markCopied(btn);
    } catch (err) {
      showToast('Please copy: ' + text);
    }
    document.body.removeChild(el);
  }

  function markCopied(btn) {
    var original = btn.textContent;
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    showToast('Code copied to clipboard.');
    setTimeout(function () {
      btn.textContent = original;
      btn.classList.remove('copied');
    }, 2000);
  }

  /* ---- Footer year ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Scroll Reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    reveals.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Fallback: show everything if no IntersectionObserver
    reveals.forEach(function (el) { el.classList.add('reveal--visible'); });
  }

  function getSectionFromHash(hash) {
    if (!hash || hash === '#') return null;
    var id = hash.charAt(0) === '#' ? hash.slice(1) : hash;
    try {
      id = decodeURIComponent(id);
    } catch (err) {
      return null;
    }
    var section = document.getElementById(id);
    return section && section.matches('section[id]') ? section : null;
  }

  function revealSection(section) {
    section.classList.add('reveal--visible');
    section.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('reveal--visible');
    });
  }

  function setActiveNav(id) {
    navLinks.forEach(function (link) {
      link.classList.toggle('nav-link--active', link.getAttribute('href') === '#' + id);
    });
  }

  function scrollToSection(section, behavior) {
    var scrollMarginTop = parseFloat(window.getComputedStyle(section).scrollMarginTop) || 0;
    var targetTop = section.getBoundingClientRect().top + window.pageYOffset - scrollMarginTop;
    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: behavior || 'smooth'
    });
  }

  function syncHashSection(shouldScroll, behavior) {
    var section = getSectionFromHash(window.location.hash);
    if (!section) return;
    revealSection(section);
    setActiveNav(section.id);
    if (shouldScroll) {
      window.requestAnimationFrame(function () {
        scrollToSection(section, behavior || 'auto');
      });
    }
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var section = getSectionFromHash(link.getAttribute('href'));
      if (!section) return;
      event.preventDefault();
      if (window.history && window.history.pushState) {
        window.history.pushState(null, '', '#' + section.id);
      } else {
        window.location.hash = section.id;
      }
      revealSection(section);
      setActiveNav(section.id);
      scrollToSection(section, reducedMotion ? 'auto' : 'smooth');
    });
  });

  /* ---- Smooth-scroll active nav highlight ---- */
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          setActiveNav(entry.target.id);
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  }
  window.addEventListener('hashchange', function () {
    syncHashSection(true, 'auto');
  });
  syncHashSection(true, 'auto');

  /* ---- Scroll Progress Bar ---- */
  var progressEl = document.getElementById('scrollProgress');
  function updateProgress() {
    if (!progressEl) return;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    progressEl.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress, { passive: true });

  /* ---- Hero Floating Decorations (WAAPI) ---- */
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.hero-deco').forEach(function (el, i) {
      var rotate = window.getComputedStyle(el).getPropertyValue('--deco-rotate').trim() || '0deg';
      el.animate(
        [
          { transform: 'translateY(0px) rotate(' + rotate + ')' },
          { transform: 'translateY(-18px) rotate(' + rotate + ')' }
        ],
        { duration: 3200 + i * 400, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out', delay: i * 600 }
      );
    });
  }

  /* ---- Stats Counter ---- */
  var statEls = document.querySelectorAll('.stat-number[data-target]');
  if (statEls.length && 'IntersectionObserver' in window) {
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        statObserver.unobserve(entry.target);
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        var suffix = el.getAttribute('data-suffix') || '';
        if (reducedMotion) { el.textContent = target.toLocaleString() + suffix; return; }
        var duration = 1500;
        var startTime = null;
        function step(ts) {
          if (!startTime) startTime = ts;
          var p = Math.min((ts - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target).toLocaleString() + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    statEls.forEach(function (el) { statObserver.observe(el); });
  }

  /* ---- Back to Top ---- */
  var backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('back-to-top--visible');
      } else {
        backToTopBtn.classList.remove('back-to-top--visible');
      }
    }, { passive: true });
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

}());
