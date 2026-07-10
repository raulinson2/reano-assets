/* ============================================================================
   REANO TRAVELS — SHELL v1 (Header + Footer definitivos, construidos desde cero)
   ----------------------------------------------------------------------------
   Contrato con la inyección HEADER del sitio:
     1. La inyección añade la clase `rt-shell-on` a <html> ANTES del primer paint
        y un CSS inline oculta los 3 headers/footers legacy (header.fixed,
        .rt-nav, nav.fixed, footer.rea-stuck, .rt-footer).
     2. Este script define window.__rtShell=1 al arrancar. Si en 4s no cargó
        (CDN caído), la inyección retira `rt-shell-on` y el sitio vuelve a los
        componentes legacy: NUNCA se queda sin header (fallback anti-caída).
     3. Los legacy NO se eliminan del DOM (sus scripts/observers siguen en paz);
        solo quedan ocultos por CSS. Cero guerras de MutationObserver.
   ============================================================================ */
(function () {
  'use strict';
  if (window.__rtShell) return;
  window.__rtShell = 1;

  var WA = 'https://wa.me/584247309699?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20paquetes%20de%20viaje';
  var LINKS = [
    ['Vuelos', '/estado-aerolineas'],
    ['Mundial 2026', '/mundial-2026'],
    ['Conciertos', '/conciertos'],
    ['Tienda', '/tienda'],
    ['Hoteles', '/hoteles'],
    ['Nosotros', '/nosotros'],
    ['Contacto', '/contacto']
  ];
  var LOGO_FALLBACK = 'https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/yummy-logo.png'; // reemplazado en runtime por el logo real

  /* ---------- THEME ---------- */
  function isDark() { return document.documentElement.classList.contains('dark'); }
  function applyTheme(dark) {
    var h = document.documentElement;
    h.classList.toggle('dark', dark);
    try { h.setAttribute('data-theme', dark ? 'dark' : 'light'); } catch (e) {}
    try { localStorage.setItem('rt-theme', dark ? 'dark' : 'light'); localStorage.setItem('reano-theme', dark ? 'dark' : 'light'); } catch (e) {}
    syncIcons();
  }
  function syncIcons() {
    var d = isDark();
    document.querySelectorAll('.rt2-sun').forEach(function (el) { el.style.display = d ? 'block' : 'none'; });
    document.querySelectorAll('.rt2-moon').forEach(function (el) { el.style.display = d ? 'none' : 'block'; });
  }

  /* ---------- CSS ---------- */
  var CSS = [
    ':root{--rt2-brand:#FF8C03;--rt2-brand2:#E67A00;--rt2-h:64px}',
    '#rt2-header{position:fixed;top:0;left:0;right:0;z-index:9990;height:var(--rt2-h);',
    '  background:rgba(10,10,12,.86);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);',
    '  border-bottom:1px solid rgba(255,255,255,.07);transition:background .25s ease}',
    'html:not(.dark) #rt2-header{background:rgba(252,249,245,.9);border-bottom-color:rgba(0,0,0,.07)}',
    '#rt2-header *{box-sizing:border-box;font-family:"Montserrat",system-ui,-apple-system,sans-serif}',
    '.rt2-in{max-width:1200px;height:100%;margin:0 auto;padding:0 22px;display:flex;align-items:center;gap:26px}',
    '.rt2-logo{display:flex;align-items:center;flex-shrink:0}',
    '.rt2-logo img{height:34px;width:auto;display:block}',
    '.rt2-links{display:flex;align-items:center;gap:24px;margin:0 auto}',
    '.rt2-links a{font-size:13.5px;font-weight:600;text-decoration:none;color:#e8ebef;letter-spacing:.01em;',
    '  padding:6px 2px;border-bottom:2px solid transparent;transition:color .18s,border-color .18s;white-space:nowrap}',
    'html:not(.dark) .rt2-links a{color:#2a2620}',
    '.rt2-links a:hover{color:var(--rt2-brand)}',
    '.rt2-links a.on{color:var(--rt2-brand);border-bottom-color:var(--rt2-brand)}',
    '.rt2-ctrl{display:flex;align-items:center;gap:16px;flex-shrink:0}',
    '.rt2-tbtn,.rt2-burger{background:transparent;border:0;cursor:pointer;padding:8px;border-radius:999px;',
    '  display:flex;align-items:center;justify-content:center;transition:background .18s}',
    '.rt2-tbtn:hover,.rt2-burger:hover{background:rgba(128,128,128,.15)}',
    '.rt2-tbtn svg,.rt2-burger svg{width:20px;height:20px;stroke:#e8ebef}',
    'html:not(.dark) .rt2-tbtn svg,html:not(.dark) .rt2-burger svg{stroke:#2a2620}',
    '.rt2-cart{position:relative;display:flex;padding:8px;border-radius:999px;transition:background .18s}',
    '.rt2-cart:hover{background:rgba(128,128,128,.15)}',
    '.rt2-cart svg{width:21px;height:21px;stroke:#e8ebef}',
    'html:not(.dark) .rt2-cart svg{stroke:#2a2620}',
    '.rt2-badge{position:absolute;top:0;right:0;min-width:16px;height:16px;border-radius:999px;background:var(--rt2-brand);',
    '  color:#fff;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;padding:0 4px}',
    '.rt2-badge.zero{display:none}',
    '.rt2-cta{background:linear-gradient(135deg,var(--rt2-brand),var(--rt2-brand2));color:#fff!important;font-size:12.5px;',
    '  font-weight:700;letter-spacing:.05em;text-transform:uppercase;text-decoration:none;padding:10px 20px;border-radius:999px;',
    '  white-space:nowrap;box-shadow:0 6px 16px -6px rgba(255,140,3,.55);transition:filter .18s,transform .18s}',
    '.rt2-cta:hover{filter:brightness(1.07);transform:translateY(-1px)}',
    '.rt2-burger{display:none}',
    '#rt2-mobile{display:none;position:fixed;top:var(--rt2-h);left:0;right:0;z-index:9989;padding:10px 18px 22px;',
    '  background:rgba(12,12,14,.97);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);',
    '  border-bottom:1px solid rgba(255,255,255,.08);animation:rt2drop .22s ease}',
    'html:not(.dark) #rt2-mobile{background:rgba(252,249,245,.98);border-bottom-color:rgba(0,0,0,.08)}',
    '@keyframes rt2drop{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}',
    '#rt2-mobile a{display:block;padding:13px 6px;font-size:15px;font-weight:600;color:#e8ebef;text-decoration:none;',
    '  border-bottom:1px solid rgba(128,128,128,.12)}',
    'html:not(.dark) #rt2-mobile a{color:#2a2620}',
    '#rt2-mobile a.on{color:var(--rt2-brand)}',
    '#rt2-mobile .rt2-cta{display:inline-block;margin-top:14px;border-bottom:0}',
    '@media(max-width:940px){.rt2-links{display:none}.rt2-burger{display:flex}.rt2-cta.rt2-desk{display:none}}',
    'body{padding-top:0}', /* los heros legacy ya reservan su espacio bajo el header fijo */
    /* ---------- FOOTER ---------- */
    '#rt2-footer{background:#0d0d10;border-top:1px solid rgba(255,140,3,.4);position:relative;z-index:5;',
    '  font-family:"Montserrat",system-ui,sans-serif}',
    '#rt2-footer *{box-sizing:border-box}',
    '.rt2f-in{max-width:1200px;margin:0 auto;padding:52px 24px 20px;display:grid;',
    '  grid-template-columns:1.4fr 1fr 1fr 1fr;gap:36px}',
    '@media(max-width:860px){.rt2f-in{grid-template-columns:1fr 1fr}}',
    '@media(max-width:520px){.rt2f-in{grid-template-columns:1fr}}',
    '.rt2f-brand img{height:40px;width:auto;margin-bottom:12px}',
    '.rt2f-brand p{color:#9aa1ab;font-size:13.5px;line-height:1.6;margin:0 0 16px}',
    '.rt2f-pills{display:flex;gap:10px;flex-wrap:wrap}',
    '.rt2f-pill{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:700;text-decoration:none;',
    '  padding:9px 16px;border-radius:999px;transition:filter .18s,border-color .18s}',
    '.rt2f-pill.solid{background:linear-gradient(135deg,var(--rt2-brand),var(--rt2-brand2));color:#fff}',
    '.rt2f-pill.line{border:1.5px solid rgba(255,140,3,.55);color:var(--rt2-brand)}',
    '.rt2f-pill:hover{filter:brightness(1.08)}',
    '.rt2f-h{font-size:11.5px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#8b929c;margin:4px 0 16px}',
    '.rt2f-col a{display:block;color:#c9ced6;font-size:14px;font-weight:500;text-decoration:none;margin:0 0 11px;transition:color .16s}',
    '.rt2f-col a:hover{color:var(--rt2-brand)}',
    '.rt2f-soc a{display:flex;align-items:center;gap:10px}',
    '.rt2f-soc svg{width:17px;height:17px;fill:#c9ced6;transition:fill .16s}',
    '.rt2f-soc a:hover svg{fill:var(--rt2-brand)}',
    '.rt2f-legal{border-top:1px solid rgba(255,255,255,.08);margin-top:8px;padding:16px 24px;text-align:center;',
    '  color:#7d838d;font-size:12px;letter-spacing:.02em}'
  ].join('\n');

  function injectCSS() {
    if (document.getElementById('rt2-css')) return;
    var st = document.createElement('style');
    st.id = 'rt2-css';
    st.textContent = CSS;
    (document.head || document.documentElement).appendChild(st);
  }

  /* ---------- ICONOS SVG ---------- */
  var I = {
    sun: '<svg class="rt2-sun" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg class="rt2-moon" viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1.6"/><circle cx="19" cy="21" r="1.6"/><path d="M2.5 3h2l2.4 12.3a2 2 0 0 0 2 1.7h9.7a2 2 0 0 0 2-1.6L22 7H6"/></svg>',
    burger: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    ig: '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.1 15.6 2 15.2 2 12s0-3.6.1-4.8C2.2 4 3.9 2.4 7.1 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.5a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0z"/></svg>',
    tt: '<svg viewBox="0 0 24 24"><path d="M19.3 7.3a4.8 4.8 0 0 1-3.4-1.4 4.8 4.8 0 0 1-1.4-3.4h-3.4v13.2a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.4a6.3 6.3 0 0 0-.9-.1 6.3 6.3 0 1 0 6.3 6.3V9.7a8.1 8.1 0 0 0 4.8 1.5z"/></svg>',
    wa: '<svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.15-1.7-.84-2-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.13-.17.19-.33.22-.62.07-.29-.15-1.23-.45-2.34-1.44-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.33.44-.5.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.15.19 2.02 3.08 4.9 4.32.68.29 1.22.47 1.63.6.69.22 1.31.19 1.8.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34zM12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.33A10 10 0 1 0 12 2z"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.5l4.4 5.9zm-1.1 18h1.7L6.6 3.9H4.7z"/></svg>'
  };

  /* ---------- LOGO (copiado del sitio; se refresca al cambiar tema) ---------- */
  function findLogoSrc() {
    var img = document.querySelector('header.fixed img, .rt-nav img, nav.fixed img');
    return (img && img.src) ? img.src : LOGO_FALLBACK;
  }
  function refreshLogos() {
    var src = findLogoSrc();
    document.querySelectorAll('.rt2-logo img, .rt2f-brand img').forEach(function (im) {
      if (im.src !== src) im.src = src;
    });
  }

  /* ---------- HEADER ---------- */
  function path() { return (location.pathname.replace(/\/+$/, '') || '/'); }
  function buildHeader() {
    if (document.getElementById('rt2-header')) return;
    var p = path();
    var links = LINKS.map(function (l) {
      var on = (p === l[1]) || (l[1] === '/tienda' && p.indexOf('/tienda') === 0) || (l[1] === '/estado-aerolineas' && p === '/vuelos');
      return '<a href="' + l[1] + '"' + (on ? ' class="on"' : '') + '>' + l[0] + '</a>';
    }).join('');
    var h = document.createElement('div');
    h.id = 'rt2-header';
    h.innerHTML =
      '<div class="rt2-in">' +
      '  <a class="rt2-logo" href="/" aria-label="Inicio"><img alt="Reaño Travels" src="' + findLogoSrc() + '"></a>' +
      '  <div class="rt2-links">' + links + '</div>' +
      '  <div class="rt2-ctrl">' +
      '    <button class="rt2-tbtn" id="rt2-theme" aria-label="Cambiar tema">' + I.sun + I.moon + '</button>' +
      '    <a class="rt2-cart" href="/cart" aria-label="Carrito">' + I.cart + '<span class="rt2-badge zero" id="rt2-badge">0</span></a>' +
      '    <a class="rt2-cta rt2-desk" href="' + WA + '" target="_blank" rel="noopener">Cotizar ahora</a>' +
      '    <button class="rt2-burger" id="rt2-burger" aria-label="Menú">' + I.burger + '</button>' +
      '  </div>' +
      '</div>';
    document.body.insertBefore(h, document.body.firstChild);

    var mob = document.createElement('div');
    mob.id = 'rt2-mobile';
    mob.innerHTML = LINKS.map(function (l) {
      var on = p === l[1];
      return '<a href="' + l[1] + '"' + (on ? ' class="on"' : '') + '>' + l[0] + '</a>';
    }).join('') + '<a class="rt2-cta" href="' + WA + '" target="_blank" rel="noopener">Cotizar ahora</a>';
    document.body.insertBefore(mob, h.nextSibling);

    document.getElementById('rt2-theme').addEventListener('click', function () {
      applyTheme(!isDark());
      setTimeout(refreshLogos, 150); /* el logo legacy puede cambiar de variante con el tema */
      setTimeout(refreshLogos, 600);
    });
    document.getElementById('rt2-burger').addEventListener('click', function () {
      mob.style.display = (mob.style.display === 'block') ? 'none' : 'block';
    });
    mob.addEventListener('click', function (e) { if (e.target.tagName === 'A') mob.style.display = 'none'; });
    syncIcons();
  }

  /* ---------- CART BADGE (lee el contador legacy oculto / API nativa) ---------- */
  function cartCount() {
    var n = 0;
    document.querySelectorAll('a[href="/cart"], a[href$="/cart"], .rt-cart-link').forEach(function (a) {
      if (a.closest && a.closest('#rt2-header')) return;
      var m = (a.textContent || '').match(/\d+/);
      if (m) n = Math.max(n, parseInt(m[0], 10));
    });
    return n;
  }
  function syncBadge() {
    var b = document.getElementById('rt2-badge');
    if (!b) return;
    var n = cartCount();
    b.textContent = String(n);
    b.classList.toggle('zero', n === 0);
  }

  /* ---------- FOOTER ---------- */
  function buildFooter() {
    if (document.getElementById('rt2-footer')) return;
    if (!document.body) return;
    var f = document.createElement('div');
    f.id = 'rt2-footer';
    f.innerHTML =
      '<div class="rt2f-in">' +
      '  <div class="rt2f-brand">' +
      '    <img alt="Reaño Travels" src="' + findLogoSrc() + '">' +
      '    <p>Experiencias globales de alto nivel, diseñadas a tu medida desde Venezuela.</p>' +
      '    <div class="rt2f-pills">' +
      '      <a class="rt2f-pill solid" href="mailto:reservas@reanotravel.com">✉ Email</a>' +
      '      <a class="rt2f-pill line" href="tel:+584247309699">☎ Llamar</a>' +
      '    </div>' +
      '  </div>' +
      '  <div class="rt2f-col"><div class="rt2f-h">Explorar</div>' +
      '    <a href="/">Inicio</a><a href="/estado-aerolineas">Vuelos</a><a href="/mundial-2026">Mundial 2026</a>' +
      '    <a href="/conciertos">Conciertos</a><a href="/tienda">Tienda</a><a href="/hoteles">Hoteles</a>' +
      '  </div>' +
      '  <div class="rt2f-col"><div class="rt2f-h">Empresa</div>' +
      '    <a href="/servicios">Servicios</a><a href="/nosotros">Nosotros</a><a href="/contacto">Contacto</a>' +
      '  </div>' +
      '  <div class="rt2f-col rt2f-soc"><div class="rt2f-h">Social</div>' +
      '    <a href="https://www.instagram.com/reanotravels" target="_blank" rel="noopener">' + I.ig + 'Instagram</a>' +
      '    <a href="https://www.tiktok.com/@reanotravels" target="_blank" rel="noopener">' + I.tt + 'TikTok</a>' +
      '    <a href="' + WA + '" target="_blank" rel="noopener">' + I.wa + 'WhatsApp</a>' +
      '    <a href="https://x.com/reanotravels" target="_blank" rel="noopener">' + I.x + 'X</a>' +
      '  </div>' +
      '</div>' +
      '<div class="rt2f-legal">© 2026 Reaño Travels &amp; Tours · RIF J-50849288-9 · MINTUR AGT-620-2025 · RTN 23451 · @reanotravels</div>';
    document.body.appendChild(f);
  }

  /* ---------- ARRANQUE ---------- */
  function boot() {
    injectCSS();
    buildHeader();
    buildFooter();
    refreshLogos();
    syncBadge();
  }
  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
  [400, 1200, 2600].forEach(function (d) { setTimeout(boot, d); });
  setInterval(function () { syncBadge(); refreshLogos(); }, 2500);
})();
