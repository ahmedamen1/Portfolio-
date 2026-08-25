/* =========================================================
   Ahmed Amin — Portfolio
   Shared behaviour for every page. Vanilla JS, no libraries.
   ========================================================= */
(function () {
  "use strict";

  var $  = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Theme ---------- */
  var root = document.documentElement;

  function readTheme() {
    // Light is the default look. Dark is opt-in via the toggle, and is
    // remembered once chosen.
    try {
      var t = localStorage.getItem('amin-theme');
      if (t === 'dark' || t === 'light') return t;
    } catch (e) { /* private mode */ }
    return 'light';
  }

  function applyTheme(t) {
    root.setAttribute('data-theme', t);
    $$('.js-theme').forEach(function (b) {
      b.textContent = t === 'dark' ? '☀' : '☾';
      b.setAttribute('aria-label', t === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    });
  }

  applyTheme(readTheme());

  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.js-theme');
    if (!btn) return;
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('amin-theme', next); } catch (err) { /* ignore */ }
  });

  /* ---------- Nav: shadow on scroll + progress bar ---------- */
  var nav = $('.nav');
  var bar = $('#progress');
  var toTop = $('#toTop');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (nav) nav.classList.toggle('scrolled', y > 8);
    if (toTop) toTop.classList.toggle('show', y > 500);
    if (bar) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toTop) {
    toTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ---------- Mobile menu ---------- */
  var burger = $('.burger');
  var menu = $('.mobilemenu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    $$('a', menu).forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var items = $$('.reveal, .reveal-l, .reveal-r');

  /* Cards inside a grid stagger automatically, so a row of three
     arrives one after another instead of all at once. */
  $$('.grid').forEach(function (grid) {
    var kids = $$('.reveal, .reveal-l, .reveal-r', grid);
    kids.forEach(function (el, i) {
      if (!el.hasAttribute('data-delay')) {
        el.setAttribute('data-delay', (i * 0.07).toFixed(2));
      }
    });
  });

  if (!('IntersectionObserver' in window) || reduced) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var d = parseFloat(el.getAttribute('data-delay') || 0);
        setTimeout(function () { el.classList.add('in'); }, d * 1000);
        io.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Count-up numbers ---------- */
  var nums = $$('[data-count]');
  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var prefix = el.getAttribute('data-prefix') || '';
    var dec = (el.getAttribute('data-dec') | 0);
    if (reduced) { el.textContent = prefix + target.toFixed(dec) + suffix; return; }
    var start = null, dur = 1400;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + (target * eased).toFixed(dec) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var io2 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        countUp(en.target);
        io2.unobserve(en.target);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { io2.observe(el); });
  } else {
    nums.forEach(countUp);
  }

  /* ---------- Typing line (hero) ---------- */
  var typed = $('#typed');
  if (typed) {
    var lines = JSON.parse(typed.getAttribute('data-lines') || '[]');
    if (reduced) {
      typed.textContent = lines[0] || '';
    } else if (lines.length) {
      var li = 0, ci = 0, deleting = false;
      (function tick() {
        var full = lines[li];
        ci += deleting ? -1 : 1;
        typed.textContent = full.slice(0, ci);
        var wait = deleting ? 34 : 62;
        if (!deleting && ci === full.length) { deleting = true; wait = 1900; }
        else if (deleting && ci === 0) { deleting = false; li = (li + 1) % lines.length; wait = 320; }
        setTimeout(tick, wait);
      })();
    }
  }

  /* ---------- Project filter ---------- */
  var chips = $$('.chip[data-filter]');
  if (chips.length) {
    chips.forEach(function (c) {
      c.addEventListener('click', function () {
        if (c.classList.contains('on')) return;
        chips.forEach(function (x) {
          x.classList.remove('on');
          x.setAttribute('aria-pressed', 'false');
        });
        c.classList.add('on');
        c.setAttribute('aria-pressed', 'true');

        var f = c.getAttribute('data-filter');
        var cards = $$('[data-kind]');

        if (reduced) {
          cards.forEach(function (card) {
            card.style.display =
              (f === 'all' || card.getAttribute('data-kind') === f) ? '' : 'none';
          });
          return;
        }

        /* Fade the whole set out, swap, then stagger the matches back in. */
        cards.forEach(function (card) { card.classList.add('filtering'); });

        setTimeout(function () {
          var shown = 0;
          cards.forEach(function (card) {
            var show = (f === 'all' || card.getAttribute('data-kind') === f);
            card.style.display = show ? '' : 'none';
            card.classList.remove('in');
            if (show) {
              var delay = shown * 60;
              shown++;
              setTimeout(function () {
                card.classList.remove('filtering');
                card.classList.add('in');
              }, delay);
            }
          });
        }, 200);
      });
    });
  }

  /* ---------- Active nav link by section ---------- */
  var sections = $$('main section[id]');
  var navLinks = $$('.navlinks a[href*="#"]');
  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    var io3 = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var id = en.target.id;
        navLinks.forEach(function (a) {
          a.classList.toggle('active', (a.getAttribute('href') || '').indexOf('#' + id) > -1);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { io3.observe(s); });
  }

  /* ---------- Year in footer ---------- */
  $$('.js-year').forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
