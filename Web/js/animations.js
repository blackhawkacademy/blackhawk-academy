/* ==========================================================================
   Black Hawk Academy — animation orchestration
   Scroll reveals (IntersectionObserver) · stat counters · crest parallax ·
   golden embers in the hero. All of it is skipped under reduced motion.
   ========================================================================== */
(function () {
  'use strict';

  var doc = document.documentElement;
  var isAr = (doc.lang || 'ar').indexOf('ar') === 0;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasIO = 'IntersectionObserver' in window;

  /* ---------- reveal on scroll ---------- */
  document.querySelectorAll('[data-reveal-group]').forEach(function (group) {
    var i = 0;
    Array.prototype.forEach.call(group.children, function (child) {
      if (child.hasAttribute('data-reveal')) child.style.setProperty('--i', i++);
    });
  });

  var revealEls = document.querySelectorAll('[data-reveal]');
  if (reduceMotion || !hasIO) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { revealer.observe(el); });
  }

  /* ---------- counters ---------- */
  var numberFormat = new Intl.NumberFormat(isAr ? 'ar-EG' : 'en-US', { useGrouping: false });
  var counters = document.querySelectorAll('[data-count]');
  if (!reduceMotion && hasIO && counters.length) {
    var counterIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        counterIO.unobserve(entry.target);
        var el = entry.target;
        var target = Number(el.getAttribute('data-count')) || 0;
        var start = performance.now();
        var duration = 1500 + target * 12;
        var tick = function (now) {
          var t = Math.min(1, (now - start) / duration);
          var eased = 1 - Math.pow(1 - t, 4);
          el.textContent = numberFormat.format(Math.round(target * eased));
          if (t < 1) window.requestAnimationFrame(tick);
        };
        window.requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) {
      el.textContent = numberFormat.format(0);
      counterIO.observe(el);
    });
  }

  if (reduceMotion) return;

  /* ---------- crest parallax (desktop pointers only) ---------- */
  var crest = document.querySelector('[data-crest]');
  var hero = crest ? crest.closest('.hero') : null;
  if (crest && hero && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    var target = { x: 0, y: 0 };
    var curr = { x: 0, y: 0 };
    var raf = 0;
    var step = function () {
      curr.x += (target.x - curr.x) * 0.07;
      curr.y += (target.y - curr.y) * 0.07;
      crest.style.setProperty('--tx', curr.x.toFixed(4));
      crest.style.setProperty('--ty', curr.y.toFixed(4));
      raf = Math.abs(target.x - curr.x) > 0.0005 || Math.abs(target.y - curr.y) > 0.0005
        ? window.requestAnimationFrame(step)
        : 0;
    };
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
      if (!raf) raf = window.requestAnimationFrame(step);
    });
    hero.addEventListener('pointerleave', function () {
      target.x = 0;
      target.y = 0;
      if (!raf) raf = window.requestAnimationFrame(step);
    });
  }

  /* ---------- golden embers ---------- */
  var canvas = document.querySelector('[data-embers]');
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  var width = 0;
  var height = 0;
  var particles = [];
  var running = false;
  var visible = true;
  var rafId = 0;
  var last = 0;

  function spawn(initial) {
    return {
      x: Math.random() * width,
      y: initial ? Math.random() * height : height + 8,
      r: Math.random() * 1.35 + 0.35,
      vy: Math.random() * 0.28 + 0.07,
      vx: (Math.random() - 0.5) * 0.1,
      a: Math.random() * 0.55 + 0.15,
      phase: Math.random() * Math.PI * 2,
      speed: Math.random() * 0.02 + 0.006,
      halo: Math.random() < 0.22
    };
  }

  function resize() {
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    var count = Math.round(Math.min(64, Math.max(18, width / 26)));
    while (particles.length < count) particles.push(spawn(true));
    particles.length = count;
  }

  function frame(now) {
    var dt = last ? Math.min(48, now - last) / 16.67 : 1;
    last = now;
    ctx.clearRect(0, 0, width, height);
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.y -= p.vy * dt;
      p.phase += p.speed * dt;
      p.x += (p.vx + Math.sin(p.phase) * 0.12) * dt;
      if (p.y < -10 || p.x < -10 || p.x > width + 10) { particles[i] = spawn(false); continue; }
      var fade = Math.min(1, p.y / (height * 0.4)) * Math.min(1, (height - p.y) / 60 + 0.2);
      var alpha = p.a * (0.55 + 0.45 * Math.sin(p.phase * 3)) * fade;
      if (alpha <= 0.01) continue;
      if (p.halo) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(231,203,134,' + (alpha * 0.12).toFixed(3) + ')';
        ctx.fill();
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(240,214,150,' + alpha.toFixed(3) + ')';
      ctx.fill();
    }
    rafId = window.requestAnimationFrame(frame);
  }

  function start() {
    if (running || !visible || document.hidden) return;
    running = true;
    last = 0;
    rafId = window.requestAnimationFrame(frame);
  }
  function stop() {
    running = false;
    window.cancelAnimationFrame(rafId);
  }

  resize();
  if ('ResizeObserver' in window) {
    var resizeTimer = 0;
    new ResizeObserver(function () {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(resize, 120);
    }).observe(canvas);
  }
  if (hasIO) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) start(); else stop();
    }).observe(canvas);
  }
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) stop(); else start();
  });
  start();
})();
