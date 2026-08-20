/* WD data-reveal entrance system, IntersectionObserver only (calm pages) */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.18 });
  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    if (reduce) { el.classList.add('is-in'); } else { io.observe(el); }
  });
})();
