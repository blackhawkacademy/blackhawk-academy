/* ==========================================================================
   Black Hawk Academy — navigation
   Header scroll state · announcement strip · mobile menu · active section ·
   language switch · back-to-top with scroll progress
   ========================================================================== */
(function () {
  'use strict';

  var doc = document.documentElement;
  var cfg = window.BHA_CONFIG || {};
  var isAr = (doc.lang || 'ar').indexOf('ar') === 0;
  var header = document.querySelector('[data-header]');
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- header: solid once the page leaves the very top ---------- */
  if (header && 'IntersectionObserver' in window) {
    var sentinel = document.createElement('div');
    sentinel.setAttribute('aria-hidden', 'true');
    sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:48px;pointer-events:none;';
    document.body.prepend(sentinel);
    new IntersectionObserver(function (entries) {
      header.classList.toggle('is-scrolled', !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* ---------- announcement strip ---------- */
  var announce = document.querySelector('[data-announce]');
  var note = cfg.announcement;
  if (announce && note && note.enabled) {
    var storageKey = 'bha-announce-' + (note.id || 'default');
    var dismissed = false;
    try { dismissed = window.localStorage.getItem(storageKey) === '1'; } catch (e) { /* storage unavailable */ }
    var text = isAr ? note.textAr : note.textEn;
    if (!dismissed && text) {
      announce.querySelector('[data-announce-text]').textContent = text;
      var link = announce.querySelector('[data-announce-link]');
      var linkText = isAr ? note.linkTextAr : note.linkTextEn;
      if (note.href && linkText) {
        link.setAttribute('href', note.href);
        link.querySelector('[data-announce-link-text]').textContent = linkText;
      } else {
        link.remove();
      }
      announce.hidden = false;
      announce.querySelector('[data-announce-close]').addEventListener('click', function () {
        announce.hidden = true;
        try { window.localStorage.setItem(storageKey, '1'); } catch (e) { /* ignore */ }
      });
    }
  }

  /* ---------- mobile menu ---------- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');
  var outside = [document.getElementById('main'), document.querySelector('.site-footer'), document.querySelector('[data-to-top]')];

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? toggle.getAttribute('data-label-close') : toggle.getAttribute('data-label-open'));
    menu.classList.toggle('is-open', open);
    doc.classList.toggle('menu-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    outside.forEach(function (el) { if (el) el.inert = open; });
    if (open) {
      var first = menu.querySelector('a');
      window.setTimeout(function () { if (first) first.focus({ preventScroll: true }); }, 380);
    }
  }

  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) setMenu(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        setMenu(false);
        toggle.focus();
      }
    });
    var desktop = window.matchMedia('(min-width: 1141px)');
    var onDesktop = function (e) { if (e.matches) setMenu(false); };
    if (desktop.addEventListener) desktop.addEventListener('change', onDesktop);
  }

  /* ---------- active section highlighting ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__link, .mobile-menu__link'));
  if (navLinks.length && 'IntersectionObserver' in window) {
    var ids = [];
    navLinks.forEach(function (a) {
      var id = a.getAttribute('href');
      if (id && id.charAt(0) === '#' && ids.indexOf(id) === -1) ids.push(id);
    });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var id = '#' + entry.target.id;
        navLinks.forEach(function (a) {
          var on = a.getAttribute('href') === id;
          a.classList.toggle('is-active', on);
          if (on) a.setAttribute('aria-current', 'location');
          else a.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-42% 0px -52% 0px' });
    ids.forEach(function (id) {
      var section = document.querySelector(id);
      if (section) spy.observe(section);
    });
  }

  /* ---------- language switch keeps the current section ---------- */
  document.querySelectorAll('[data-lang-switch]').forEach(function (a) {
    a.addEventListener('click', function () {
      if (window.location.hash) a.setAttribute('href', a.getAttribute('href').split('#')[0] + window.location.hash);
    });
  });

  /* ---------- back to top + reading progress ---------- */
  var toTop = document.querySelector('[data-to-top]');
  if (toTop) {
    var ticking = false;
    var update = function () {
      ticking = false;
      var max = doc.scrollHeight - window.innerHeight;
      var progress = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      toTop.style.setProperty('--progress', progress.toFixed(4));
      toTop.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.9);
    };
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    });
  }
})();
