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
    showToast('✅ Code copied to clipboard!');
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

  /* ---- Smooth-scroll active nav highlight ---- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          navLinks.forEach(function (link) {
            link.classList.remove('nav-link--active');
            if (link.getAttribute('href') === '#' + entry.target.id) {
              link.classList.add('nav-link--active');
            }
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(function (s) { observer.observe(s); });
  }
}());
