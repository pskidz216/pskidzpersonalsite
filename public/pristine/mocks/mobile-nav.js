/* injected mobile menu for pages using the standard top nav */
(function () {
  var css = document.createElement('style');
  css.textContent = [
    '.mnav-btn{display:none;background:none;border:0;cursor:pointer;padding:8px;margin-left:auto}',
    '.mnav-btn i{display:block;width:22px;height:1.5px;background:var(--harbor-deep);margin:5px 0}',
    '@media(max-width:1024px){.mnav-btn{display:block}.nav__in>.btn{margin-left:0}}',
    '.mnav{position:fixed;inset:0;z-index:100;background:var(--night);color:var(--shell);padding:22px 24px 40px;',
    'display:flex;flex-direction:column;transform:translateY(-102%);transition:transform .55s cubic-bezier(.76,0,.24,1);overflow-y:auto}',
    '.mnav.is-open{transform:none}',
    '.mnav__head{display:flex;justify-content:space-between;align-items:center;margin-bottom:34px}',
    '.mnav__brand{font-size:12px;font-weight:300;letter-spacing:.24em;text-transform:uppercase;color:var(--shell)}',
    '.mnav__brand b{color:var(--coral);font-weight:500}',
    '.mnav__close{background:none;border:0;color:var(--haint);font-size:30px;font-weight:300;cursor:pointer;line-height:1}',
    '.mnav a.mitem{font-family:var(--serif);font-weight:500;font-size:28px;color:var(--shell);padding:13px 0;border-bottom:1px solid rgba(195,216,212,.16);display:block}',
    '.mnav__foot{margin-top:auto;padding-top:30px;display:flex;flex-direction:column;gap:16px}',
    '.mnav__foot .tel{color:var(--haint);font-size:15px}'
  ].join('');
  document.head.appendChild(css);

  var btn = document.createElement('button');
  btn.className = 'mnav-btn'; btn.setAttribute('aria-label','Open menu'); btn.setAttribute('aria-expanded','false');
  btn.innerHTML = '<i></i><i></i>';
  var navIn = document.querySelector('.nav__in');
  navIn.insertBefore(btn, navIn.querySelector('.btn'));

  var panel = document.createElement('div');
  panel.className = 'mnav'; panel.setAttribute('aria-hidden','true');
  panel.innerHTML =
    '<div class="mnav__head"><span class="mnav__brand">Pristine Coastal Co<b>.</b></span>' +
    '<button class="mnav__close" aria-label="Close menu">&times;</button></div>' +
    '<nav><a class="mitem" href="#">Neighborhoods</a><a class="mitem" href="#">Services</a>' +
    '<a class="mitem" href="#">The work</a><a class="mitem" href="#">Process</a>' +
    '<a class="mitem" href="#">Pricing</a><a class="mitem" href="#">About</a></nav>' +
    '<div class="mnav__foot"><a class="btn" href="#">Get an Estimate</a>' +
    '<a class="tel" href="tel:9042350423">904.235.0423</a></div>';
  document.body.appendChild(panel);

  var set = function (open) {
    panel.classList.toggle('is-open', open);
    panel.setAttribute('aria-hidden', String(!open));
    btn.setAttribute('aria-expanded', String(open));
    document.documentElement.style.overflow = open ? 'hidden' : '';
  };
  btn.addEventListener('click', function(){ set(true); });
  panel.querySelector('.mnav__close').addEventListener('click', function(){ set(false); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') set(false); });
})();
