/* =============================================
   CJ's Pickleball — Main JS
   ============================================= */

(function () {
  'use strict';

  /* ---- Remove no-js fallback class so reveal animations engage ---- */
  document.body.classList.remove('no-js');

  /* ---- Logo image fallback ---- */
  var logoImg = document.getElementById('logoImg');
  var logoText = document.getElementById('logo-text');
  if (logoImg && logoText) {
    logoImg.addEventListener('error', function () {
      logoImg.classList.add('logo-img--hidden');
      logoText.classList.add('logo-text--fallback');
    });
  }

  /* ---- Mobile Navigation ---- */
  var toggle = document.getElementById('navToggle');
  var menu   = document.getElementById('navMenu');

  if (toggle && menu) {
    function setMenuOpen(isOpen) {
      menu.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function () {
      setMenuOpen(!menu.classList.contains('open'));
    });

    // Close menu when a nav link is clicked
    menu.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenuOpen(false);
      });
    });

    // Close menu on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) {
        setMenuOpen(false);
        toggle.focus();
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
    el.className = 'copy-buffer';
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

  // Printing never fires scroll/intersection — force everything visible.
  // (A print stylesheet covers the same case; this keeps the DOM state
  // consistent if the user cancels the dialog and keeps browsing.)
  window.addEventListener('beforeprint', function () {
    reveals.forEach(function (el) { el.classList.add('reveal--visible'); });
  });

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
        setActiveNav(section.id);
        window.setTimeout(function () {
          scrollToSection(section, 'auto');
          setActiveNav(section.id);
        }, 80);
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

  /* ---- Active nav highlight (driven by unified scroll handler below) ----
     Section tops are cached so the per-frame scroll handler never forces a
     layout (reading offsetTop after style writes was flagged by Lighthouse).
     Recomputed on resize and when a FAQ <details> opens/closes. */
  var sectionTops = [];
  function cacheSectionTops() {
    sectionTops = [];
    sections.forEach(function (section) {
      sectionTops.push({ id: section.id, top: section.offsetTop });
    });
  }
  cacheSectionTops();
  window.addEventListener('load', cacheSectionTops);
  window.addEventListener('resize', cacheSectionTops, { passive: true });
  document.querySelectorAll('details').forEach(function (d) {
    d.addEventListener('toggle', cacheSectionTops);
  });

  function updateActiveNavFromScroll() {
    if (!sectionTops.length || !navLinks.length) return;
    var marker = window.pageYOffset + Math.min(window.innerHeight * 0.35, 220);
    var currentSection = null;
    sectionTops.forEach(function (section) {
      if (section.top <= marker) {
        currentSection = section;
      }
    });
    if (currentSection) {
      setActiveNav(currentSection.id);
    } else {
      navLinks.forEach(function (link) {
        link.classList.remove('nav-link--active');
      });
    }
  }

  /* ---- Scroll Progress Bar ---- */
  var progressEl = document.getElementById('scrollProgress');
  function updateProgress() {
    if (!progressEl) return;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
    progressEl.style.width = pct + '%';
  }

  /* ---- Back to Top (visibility state) ---- */
  var backToTopBtn = document.getElementById('backToTop');
  function updateBackToTop() {
    if (!backToTopBtn) return;
    backToTopBtn.classList.toggle('back-to-top--visible', window.scrollY > 400);
  }

  /* ---- Single rAF-throttled scroll handler ----
     One listener drives active nav, scroll progress, and back-to-top
     visibility to minimize per-scroll work. */
  var scrollTicking = false;
  function onScrollFrame() {
    scrollTicking = false;
    updateActiveNavFromScroll();
    updateProgress();
    updateBackToTop();
  }
  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    window.requestAnimationFrame(onScrollFrame);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  window.addEventListener('hashchange', function () {
    syncHashSection(true, 'auto');
    onScroll();
  });
  syncHashSection(true, 'auto');
  onScrollFrame();

  /* ---- Stats Counter ----
     Markup ships with the final value so the page is fully usable with
     JS disabled. With JS, we reset to "0<suffix>" and animate up on enter. */
  var statEls = document.querySelectorAll('.stat-number[data-target]');
  if (statEls.length && 'IntersectionObserver' in window && !reducedMotion) {
    function formatStat(el, value) {
      var suffix = el.getAttribute('data-suffix') || '';
      if (el.getAttribute('data-format') === 'k') {
        return (Math.round(value / 100) / 10) + 'K' + suffix;
      }
      return Math.round(value).toLocaleString() + suffix;
    }
    statEls.forEach(function (el) {
      el.textContent = formatStat(el, 0);
    });
    var statObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        statObserver.unobserve(entry.target);
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        var duration = 1500;
        var startTime = null;
        function step(ts) {
          if (!startTime) startTime = ts;
          var p = Math.min((ts - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = formatStat(el, eased * target);
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }, { threshold: 0.5 });
    statEls.forEach(function (el) { statObserver.observe(el); });
  }

  /* ---- Back to Top click (visibility handled in unified scroll handler) ---- */
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Marquee partner logos (progressive enhancement) ----
     Each .marquee-item ships with the brand name as text. If a matching
     logo exists at its data-logo path, we preload it and — only on success —
     swap the text for the image. A missing/broken file leaves the text
     untouched (no broken-image icon). Adding a file to images/partners/
     activates that brand with no code change. */
  document.querySelectorAll('.marquee-item[data-logo]').forEach(function (item) {
    var src = item.getAttribute('data-logo');
    if (!src) return;
    var probe = new Image();
    probe.onload = function () {
      // Render the logo as a single-color silhouette via CSS mask so every
      // brand adopts the strip's muted tone — a cohesive logo wall rather than
      // a clash of brand colors. Box is sized to the logo's aspect ratio.
      var ratio = probe.naturalHeight ? (probe.naturalWidth / probe.naturalHeight) : 3;
      var h = 26;
      var w = Math.min(Math.round(h * ratio), 150);
      var logo = document.createElement('span');
      logo.className = 'marquee-logo';
      logo.setAttribute('role', 'img');
      logo.setAttribute('aria-label', item.textContent.trim());
      logo.style.width = w + 'px';
      logo.style.height = h + 'px';
      var url = "url('" + src + "')";
      logo.style.webkitMaskImage = url;
      logo.style.maskImage = url;
      while (item.firstChild) item.removeChild(item.firstChild);
      item.appendChild(logo);
      item.classList.add('marquee-item--logo');
    };
    probe.src = src;
  });

}());
