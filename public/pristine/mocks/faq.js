/* FAQ accordion: rows start closed, click toggles */
(function () {
  document.querySelectorAll('.faq__row').forEach(function (row) {
    var h = row.querySelector('h3'), a = row.querySelector('p');
    if (!a) return;
    var mark = h.querySelector('span:last-child');
    row.classList.add('is-closed');
    if (mark) mark.textContent = '+';
    h.style.cursor = 'pointer';
    h.setAttribute('role', 'button');
    h.setAttribute('tabindex', '0');
    var toggle = function () {
      var closed = row.classList.toggle('is-closed');
      if (mark) mark.innerHTML = closed ? '+' : '&minus;';
    };
    h.addEventListener('click', toggle);
    h.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
  });
})();
