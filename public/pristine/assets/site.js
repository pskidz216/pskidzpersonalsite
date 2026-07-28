(function () {
  'use strict';
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduced) document.documentElement.classList.add('js-anim');

  var hdr = document.querySelector('[data-hdr]');
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  /* ── Dropdown menus ──────────────────────────────────────────────
     Click always works, which matters because hover does not exist on a
     phone. On a real mouse we also open on hover, with a short intent
     delay so brushing past the nav does not fire the panel. */
  var items = [].slice.call(document.querySelectorAll('[data-dd]'));

  function close(item) {
    var btn = item.querySelector('.navlink');
    var panel = item.querySelector('.dd');
    btn.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
  }
  function closeAll(except) {
    items.forEach(function (i) { if (i !== except) close(i); });
    syncHeader();
  }
  function open(item) {
    closeAll(item);
    item.querySelector('.navlink').setAttribute('aria-expanded', 'true');
    item.querySelector('.dd').hidden = false;
    syncHeader();
  }
  function anyOpen() {
    return items.some(function (i) {
      return i.querySelector('.navlink').getAttribute('aria-expanded') === 'true';
    });
  }
  /* A transparent header over photography cannot host an opaque panel,
     so opening a dropdown forces the solid state. */
  function syncHeader() {
    if (!hdr) return;
    hdr.classList.toggle('is-open', anyOpen());
  }

  items.forEach(function (item) {
    var btn = item.querySelector('.navlink');
    var timer;

    btn.addEventListener('click', function (e) {
      e.preventDefault();
      if (btn.getAttribute('aria-expanded') === 'true') { close(item); syncHeader(); }
      else open(item);
    });

    item.addEventListener('mouseenter', function () {
      if (!finePointer.matches) return;
      clearTimeout(timer);
      timer = setTimeout(function () { open(item); }, 120);
    });
    item.addEventListener('mouseleave', function () {
      if (!finePointer.matches) return;
      clearTimeout(timer);
      timer = setTimeout(function () { close(item); syncHeader(); }, 180);
    });

    /* Keyboard: leaving the panel entirely closes it. */
    item.addEventListener('focusout', function (e) {
      if (!item.contains(e.relatedTarget)) { close(item); syncHeader(); }
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      var openItem = items.filter(function (i) {
        return i.querySelector('.navlink').getAttribute('aria-expanded') === 'true';
      })[0];
      if (openItem) { openItem.querySelector('.navlink').focus(); }
      closeAll();
      setMenu(false);
    }
  });
  document.addEventListener('click', function (e) {
    if (!e.target.closest('[data-dd]')) closeAll();
  });

  /* ── Mobile menu ─────────────────────────────────────────────── */
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('.menu');
  function setMenu(open) {
    if (!burger || !menu) return;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
    if (hdr) hdr.classList.toggle('is-open', open);
  }
  if (burger && menu) {
    burger.addEventListener('click', function () {
      setMenu(burger.getAttribute('aria-expanded') !== 'true');
    });
    menu.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') setMenu(false);
    });
  }

  /* ── Hero sequence. Desktop only, never on a phone. ──────────── */
  var scroll = document.querySelector('[data-hero]');
  var frames = [].slice.call(document.querySelectorAll('.hero__frame'));
  var beats = [].slice.call(document.querySelectorAll('.beat'));
  var heroSection = document.querySelector('.hero');
  var isPush = heroSection && heroSection.classList.contains('hero--push');
  var copy = document.querySelector('[data-parallax]');

  function sequenceOn() { return !reduced && window.innerWidth > 900 && scroll; }

  /* Concept C. Each frame keeps growing while it is on screen and the next
     one arrives already large and settles back, so the two movements chain
     into one push forward instead of reading as a crossfade between stills. */
  function pushTransform(i, lp) {
    if (i === 0) return 'scale(' + (1 + lp * 0.34).toFixed(4) + ')';
    if (i === 1) return 'scale(' + (1.32 - lp * 0.22).toFixed(4) + ')';
    return 'scale(' + (1.26 - lp * 0.26).toFixed(4) + ')';
  }

  function paintHero() {
    if (!scroll) return;
    if (!sequenceOn()) {
      frames.forEach(function (f, i) {
        f.style.opacity = i === 0 ? 1 : 0;
        f.querySelector('img').style.transform = '';
      });
      return;
    }
    var box = scroll.getBoundingClientRect();
    var span = scroll.offsetHeight - window.innerHeight;
    var p = span > 0 ? Math.min(Math.max(-box.top / span, 0), 1) : 0;
    var n = frames.length;
    frames.forEach(function (f, i) {
      var s = i / n, e = (i + 1) / n, fade = 0.14 / n, o;
      if (p < s - fade) o = 0;
      else if (p < s + fade) o = (p - (s - fade)) / (2 * fade);
      else if (p < e - fade) o = 1;
      else if (p < e + fade) o = 1 - (p - (e - fade)) / (2 * fade);
      else o = 0;
      if (i === 0 && p < s + fade) o = 1;
      if (i === n - 1 && p > e - fade) o = 1;
      f.style.opacity = Math.min(Math.max(o, 0), 1);

      var lp = Math.min(Math.max((p - s) / (e - s), 0), 1);
      var img = f.querySelector('img');
      if (isPush) img.style.transform = pushTransform(i, lp);
      else if (i === 0) img.style.transform = 'scale(' + (1 + lp * 0.08).toFixed(4) + ')';
      else if (i === 1) img.style.transform = 'scale(1.06) translate3d(0,' + (lp * -4.2).toFixed(3) + '%,0)';
      else img.style.transform = 'scale(' + (1.12 - lp * 0.12).toFixed(4) + ')';
    });

    /* Parallax: the copy rises more slowly than the image pushes, and steps
       back once the finish macro takes over so the photograph can carry it. */
    if (isPush && copy) {
      copy.style.transform = 'translate3d(0,' + (p * -70).toFixed(1) + 'px,0)';
      copy.style.opacity = p > 0.72 ? Math.max(0, 1 - (p - 0.72) / 0.2).toFixed(3) : 1;
    }

    var active = Math.min(Math.floor(p * n), n - 1);
    beats.forEach(function (b, i) { b.classList.toggle('is-on', i === active); });
  }

  function paintHeader() {
    if (!hdr) return;
    var trigger = scroll ? scroll.offsetHeight * 0.7 : 40;
    hdr.classList.toggle('is-solid', window.pageYOffset > trigger);
  }

  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { paintHero(); paintHeader(); ticking = false; });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();

  /* ── Pricing calculator ──────────────────────────────────────── */
  var calc = document.querySelector('[data-calc]');
  if (calc) {
    var range = calc.querySelector('[data-range]');
    var sqOut = calc.querySelector('[data-sqft]');
    var out = calc.querySelector('[data-out]');
    var note = calc.querySelector('[data-note]');
    var state = { type: 'interior', tier: 'premium' };
    /* PLACEHOLDER dollars per square foot. Replaced before anything ships. */
    var RATE = {
      interior: { standard: [1.9, 2.7], premium: [2.9, 4.1], fine: [4.4, 6.2] },
      exterior: { standard: [2.4, 3.4], premium: [3.6, 5.0], fine: [5.3, 7.4] }
    };
    var NOTE = {
      interior: 'Walls, trim and ceilings, two coats over a prepped surface.',
      exterior: 'Full wash, prime and two coats. Oceanfront homes need the marine-grade system, which adds to the figure.'
    };
    var money = function (n) {
      return '$' + (Math.round(n / 100) * 100).toLocaleString('en-US');
    };
    var run = function () {
      var s = parseInt(range.value, 10);
      var lo = parseInt(range.min, 10), hi = parseInt(range.max, 10);
      var r = RATE[state.type][state.tier];
      if (sqOut) sqOut.textContent = s.toLocaleString('en-US') + ' sq ft';
      out.textContent = money(s * r[0]) + ' to ' + money(s * r[1]);
      if (note) note.textContent = NOTE[state.type];
      range.style.setProperty('--fill', ((s - lo) / (hi - lo) * 100).toFixed(2) + '%');
    };
    calc.querySelectorAll('.seg button').forEach(function (b) {
      b.addEventListener('click', function () {
        var key = b.hasAttribute('data-type') ? 'type' : 'tier';
        b.parentNode.querySelectorAll('button').forEach(function (o) {
          o.setAttribute('aria-pressed', String(o === b));
        });
        state[key] = b.getAttribute('data-' + key);
        run();
      });
    });
    range.addEventListener('input', run);
    run();
  }

  /* ── Reveal on enter ─────────────────────────────────────────── */
  if (!reduced && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.05 });
    document.querySelectorAll('.rise').forEach(function (el) { io.observe(el); });
    /* Failsafe: anything already on screen shows even if the observer
       never fires. Nothing below the fold is touched. */
    setTimeout(function () {
      document.querySelectorAll('.rise:not(.is-in)').forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('is-in');
      });
    }, 1000);
  } else {
    document.querySelectorAll('.rise').forEach(function (el) { el.classList.add('is-in'); });
  }
})();
