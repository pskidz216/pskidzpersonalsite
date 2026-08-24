/* V1 chrome for inner pages: menu button left, centered lockup, navy left drawer.
   V1 is the chosen homepage direction (2026-08-23); this keeps every inner page seamless with it. */
(function(){
  var nav = document.querySelector('.nav .nav__in');
  if (!nav || document.getElementById('drawer')) return;

  var css = ''
  + '.nav__in{height:96px;position:relative}'
  + '@media(min-width:901px){'
  + '.brand--lockup{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);margin:0}'
  + '.brand--lockup img{height:64px}'
  + '}'
  + '@media(max-width:900px){.nav__in{height:72px}}'
  + '.nav__links{display:none}'
  + '.menu-btn{display:flex;align-items:center;gap:10px;background:none;border:0;cursor:pointer;'
  + 'font-family:var(--sans);font-size:13.5px;font-weight:500;letter-spacing:.08em;text-transform:uppercase;color:var(--harbor-deep);padding:8px 0}'
  + '.menu-btn__ico{display:inline-flex;flex-direction:column;gap:5px;width:22px}'
  + '.menu-btn__ico i{height:1.5px;background:var(--harbor-deep);display:block;transition:width .3s var(--ease-wd)}'
  + '.menu-btn__ico i:last-child{width:70%}'
  + '.menu-btn:hover .menu-btn__ico i{width:100%}'
  + '.drawer{position:fixed;inset:0;z-index:100;pointer-events:none;visibility:hidden}'
  + '.drawer.is-open{pointer-events:auto;visibility:visible}'
  + '.drawer__overlay{position:absolute;inset:0;background:rgba(16,22,28,.45);backdrop-filter:blur(6px);opacity:0;transition:opacity .5s var(--ease-wd);cursor:pointer}'
  + '.drawer.is-open .drawer__overlay{opacity:1}'
  + '.drawer__panel{position:absolute;top:0;left:0;bottom:0;width:min(460px,92vw);background:var(--night);color:var(--shell);'
  + 'display:flex;flex-direction:column;padding:26px 40px 36px;transform:translateX(-100%);transition:transform .6s var(--ease-wd);overflow-y:auto}'
  + '.drawer.is-open .drawer__panel{transform:translateX(0)}'
  + '.drawer__head{display:flex;justify-content:space-between;align-items:center;margin-bottom:44px}'
  + '.drawer__close{background:none;border:0;color:var(--haint);font-size:30px;font-weight:300;cursor:pointer;line-height:1;padding:4px}'
  + '.drawer__close:hover{color:var(--shell)}'
  + '.drawer__nav{flex:1}'
  + '.ditem{display:flex;justify-content:space-between;align-items:baseline;width:100%;text-align:left;background:none;border:0;cursor:pointer;'
  + 'font-family:var(--serif);font-weight:500;font-size:30px;color:var(--shell);padding:15px 0;border-bottom:1px solid rgba(195,216,212,.16);'
  + 'transition:padding-left .35s var(--ease-wd),color .25s}'
  + '.ditem span{font-family:var(--sans);font-weight:300;font-size:20px;color:var(--haint);transition:transform .35s var(--ease-wd);padding:6px 2px 6px 26px}'
  + '.ditem:hover{padding-left:12px;color:var(--haint)}'
  + '.dgroup.is-open .ditem{color:var(--coral)}'
  + '.dgroup.is-open .ditem span{transform:rotate(45deg)}'
  + '.dsub{display:grid;grid-template-columns:1fr 1fr;gap:6px 24px;max-height:0;overflow:hidden;transition:max-height .55s var(--ease-wd),padding .55s var(--ease-wd);padding:0}'
  + '.dgroup.is-open .dsub{max-height:340px;padding:18px 0 22px}'
  + '.dsub__col b{display:block;font-size:10.5px;font-weight:500;letter-spacing:.2em;text-transform:uppercase;color:var(--grey);margin-bottom:10px}'
  + '.dsub__col a{display:block;font-size:15px;font-weight:300;color:var(--haint);padding:5px 0;transition:color .2s,padding-left .25s var(--ease-wd)}'
  + '.dsub__col a:hover{color:var(--shell);padding-left:6px}'
  + '.dsub__all{color:var(--coral) !important;font-weight:400 !important}'
  + '.dmisc{display:flex;gap:22px;flex-wrap:wrap;padding:20px 0 4px;font-size:13.5px}'
  + '.dmisc a{color:var(--haint);letter-spacing:.06em;text-transform:uppercase;font-weight:400}'
  + '.dmisc a:hover{color:var(--shell)}'
  + '.drawer__foot{display:flex;align-items:center;gap:22px;padding-top:28px;flex-wrap:wrap}'
  + '@media(max-width:768px){.drawer__panel{padding:22px 24px 30px}.dsub{grid-template-columns:1fr}.dgroup.is-open .dsub{max-height:560px}}';
  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  /* nav: menu button first, lockup links home, text links removed */
  var links = nav.querySelector('.nav__links');
  if (links) links.remove();
  var lockup = nav.querySelector('.brand--lockup');
  if (lockup) { lockup.setAttribute('href', 'home-v1.html'); lockup.style.marginRight = 'auto'; }
  var openBtn = document.createElement('button');
  openBtn.className = 'menu-btn'; openBtn.id = 'menu-open';
  openBtn.setAttribute('aria-haspopup', 'dialog'); openBtn.setAttribute('aria-expanded', 'false');
  openBtn.innerHTML = '<span class="menu-btn__ico"><i></i><i></i></span>Menu';
  nav.insertBefore(openBtn, nav.firstChild);

  var estimate = document.getElementById('contact') ? '#contact' : 'contact.html';
  var drawer = document.createElement('div');
  drawer.className = 'drawer'; drawer.id = 'drawer'; drawer.setAttribute('aria-hidden', 'true');
  drawer.innerHTML = ''
  + '<div class="drawer__overlay" id="drawer-overlay"></div>'
  + '<aside class="drawer__panel" role="dialog" aria-label="Site menu">'
  + '<div class="drawer__head"><span class="brand__n" style="color:var(--shell);font-size:13px">Pristine Coastal Co<b style="color:var(--coral)">.</b></span>'
  + '<button class="drawer__close" id="menu-close" aria-label="Close menu">&times;</button></div>'
  + '<nav class="drawer__nav">'
  + '<div class="dgroup">'
  + '<a class="ditem has-sub" href="neighborhoods.html" aria-expanded="false">Neighborhoods<span role="button" aria-label="Show neighborhood list">+</span></a>'
  + '<div class="dsub">'
  + '<div class="dsub__col"><b>The Beaches</b>'
  + '<a href="neighborhood-jacksonville-beach.html">Jacksonville Beach</a><a href="neighborhood-neptune-beach.html">Neptune Beach</a><a href="neighborhood-atlantic-beach.html">Atlantic Beach</a><a href="neighborhood-ponte-vedra-beach.html">Ponte Vedra Beach</a>'
  + '</div>'
  + '<div class="dsub__col"><b>Jacksonville &amp; St. Johns</b>'
  + '<a href="neighborhood-ortega.html">Ortega</a><a href="neighborhood-avondale.html">Avondale</a><a href="neighborhood-san-marco.html">San Marco</a><a href="neighborhood-riverside.html">Riverside</a><a href="neighborhoods.html" class="dsub__all">All fourteen &rarr;</a>'
  + '</div></div></div>'
  + '<div class="dgroup">'
  + '<a class="ditem has-sub" href="services.html" aria-expanded="false">Services<span role="button" aria-label="Show services list">+</span></a>'
  + '<div class="dsub">'
  + '<div class="dsub__col"><b>Residential</b>'
  + '<a href="service-residential-painting.html">Residential Painting</a><a href="service-luxury-residential.html">Luxury Residential</a><a href="service-luxury-exterior.html">Luxury Exteriors</a>'
  + '</div>'
  + '<div class="dsub__col"><b>Restoration &amp; Commercial</b>'
  + '<a href="service-drywall.html">Drywall</a><a href="service-home-restoration.html">Home Restoration</a><a href="service-commercial-painting.html">Commercial &amp; HOA</a><a href="services.html" class="dsub__all">All ten &rarr;</a>'
  + '</div></div></div>'
  + '<a class="ditem" href="work.html">The work</a>'
  + '<a class="ditem" href="process.html">Process</a>'
  + '<a class="ditem" href="pricing.html">Pricing</a>'
  + '<a class="ditem" href="about.html">About</a>'
  + '<div class="dmisc"><a href="reviews.html">Reviews</a><a href="faq.html">FAQ</a><a href="' + estimate + '">Contact</a><a href="neighborhoods.html">Neighborhoods A&ndash;Z</a></div>'
  + '</nav>'
  + '<div class="drawer__foot">'
  + '<a class="btn" href="' + estimate + '">Get a Free Estimate</a>'
  + '<a class="nav__tel" style="color:var(--haint)" href="tel:9042350423">904.235.0423</a>'
  + '</div></aside>';
  document.body.appendChild(drawer);

  var setDrawer = function(open){
    drawer.classList.toggle('is-open', open);
    drawer.setAttribute('aria-hidden', String(!open));
    openBtn.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  openBtn.addEventListener('click', function(){ setDrawer(true); });
  document.getElementById('menu-close').addEventListener('click', function(){ setDrawer(false); });
  document.getElementById('drawer-overlay').addEventListener('click', function(){ setDrawer(false); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape') setDrawer(false); });
  drawer.querySelectorAll('.ditem.has-sub').forEach(function(b){
    b.addEventListener('click', function(e){
      var isLink = b.tagName === 'A' && b.getAttribute('href') && b.getAttribute('href') !== '#';
      if (isLink && e.target.tagName !== 'SPAN') return; /* label click: follow the link */
      if (isLink) e.preventDefault();
      var g = b.parentElement, open = !g.classList.contains('is-open');
      drawer.querySelectorAll('.dgroup').forEach(function(x){ x.classList.remove('is-open'); x.querySelector('.ditem').setAttribute('aria-expanded','false'); });
      g.classList.toggle('is-open', open);
      b.setAttribute('aria-expanded', String(open));
    });
  });
  /* in-page anchors close the drawer before jumping */
  drawer.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click', function(){ if (a.getAttribute('href').length > 1) setDrawer(false); });
  });
})();
