/* ============================================================================
   REANO TRAVELS — SHELL v2 (Header + Footer definitivos, desde cero)
   ----------------------------------------------------------------------------
   Arquitectura:
   - Todo el markup y CSS viven dentro de SHADOW DOM (attachShadow). Los scripts
     legacy del sitio tienen un MutationObserver que inyecta menús/carritos en
     cualquier header que encuentre: el shadow root les es invisible e
     inmodificable. Si inyectan nodos en el host (light DOM), no se renderizan.
   - Tema: el host lleva data-th="dark|light"; el CSS interno reacciona con
     :host([data-th=...]). El toggle escribe html.dark + localStorage
     (rt-theme y reano-theme) para mantener el resto del sitio sincronizado.
   - Logos oficiales autohospedados (variante clara y oscura).
   - Contrato con la inyección HEADER (fallback anti-caída):
       * la inyección pone html.rt-shell-on antes del primer paint y oculta los
         componentes legacy por CSS;
       * si este script no define window.__rtShell en 4s, la inyección retira
         la clase y el sitio vuelve a los componentes legacy. Nunca sin header.
   ============================================================================ */
(function () {
  'use strict';
  if (window.__rtShell) return;
  window.__rtShell = 1;

  var WA = 'https://wa.me/584247309699?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20paquetes%20de%20viaje';
  var LOGO_DARK = 'https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/logo-reano-blanco.png';   /* letras blancas (fondo oscuro) */
  var LOGO_LIGHT = 'https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/logo-reano-original.png'; /* letras oscuras (fondo claro) */
  var LINKS = [
    ['Vuelos', '/estado-aerolineas'],
    ['Paquetes', '/paquetes'],
    ['Conciertos', '/conciertos'],
    ['Tienda', '/tienda'],
    ['Hoteles', '/hoteles'],
    ['Nosotros', '/nosotros'],
    ['Contacto', '/contacto']
  ];

  /* ---------- TEMA ---------- */
  function isDark() { return document.documentElement.classList.contains('dark'); }
  function applyTheme(dark) {
    var h = document.documentElement;
    h.classList.toggle('dark', dark);
    try { h.setAttribute('data-theme', dark ? 'dark' : 'light'); } catch (e) {}
    try {
      localStorage.setItem('rt-theme', dark ? 'dark' : 'light');
      localStorage.setItem('reano-theme', dark ? 'dark' : 'light');
    } catch (e) {}
    syncTheme();
  }
  function syncTheme() {
    var th = isDark() ? 'dark' : 'light';
    ['rt2-header', 'rt2-footer'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el && el.getAttribute('data-th') !== th) el.setAttribute('data-th', th);
    });
  }

  /* ---------- ICONOS ---------- */
  var I = {
    sun: '<svg class="i-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
    moon: '<svg class="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>',
    cart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1.6"/><circle cx="19" cy="21" r="1.6"/><path d="M2.5 3h2l2.4 12.3a2 2 0 0 0 2 1.7h9.7a2 2 0 0 0 2-1.6L22 7H6"/></svg>',
    burger: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    ig: '<svg viewBox="0 0 24 24"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.9-.1c-3.3-.1-4.8-1.7-4.9-4.9C2.1 15.6 2 15.2 2 12s0-3.6.1-4.8C2.2 4 3.9 2.4 7.1 2.3 8.4 2.2 8.8 2.2 12 2.2zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-10.5a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0z"/></svg>',
    tt: '<svg viewBox="0 0 24 24"><path d="M19.3 7.3a4.8 4.8 0 0 1-3.4-1.4 4.8 4.8 0 0 1-1.4-3.4h-3.4v13.2a2.9 2.9 0 1 1-2.9-2.9c.3 0 .6 0 .9.1V9.4a6.3 6.3 0 0 0-.9-.1 6.3 6.3 0 1 0 6.3 6.3V9.7a8.1 8.1 0 0 0 4.8 1.5z"/></svg>',
    wa: '<svg viewBox="0 0 24 24"><path d="M17.5 14.4c-.3-.15-1.7-.84-2-.94-.26-.1-.45-.15-.64.15-.19.29-.74.94-.9 1.13-.17.19-.33.22-.62.07-.29-.15-1.23-.45-2.34-1.44-.87-.77-1.45-1.72-1.62-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.33.44-.5.15-.17.19-.29.29-.48.1-.19.05-.36-.02-.5-.07-.15-.64-1.55-.88-2.12-.23-.56-.47-.48-.64-.49l-.55-.01c-.19 0-.5.07-.76.36-.26.29-1 .98-1 2.38s1.02 2.76 1.17 2.95c.15.19 2.02 3.08 4.9 4.32.68.29 1.22.47 1.63.6.69.22 1.31.19 1.8.11.55-.08 1.7-.69 1.94-1.36.24-.67.24-1.24.17-1.36-.07-.12-.26-.19-.55-.34zM12 2a10 10 0 0 0-8.6 15.06L2 22l5.06-1.33A10 10 0 1 0 12 2z"/></svg>',
    x: '<svg viewBox="0 0 24 24"><path d="M18.9 2H22l-6.8 7.8L23.3 22h-6.3l-4.9-6.4L6.4 22H3.3l7.3-8.3L1 2h6.5l4.4 5.9zm-1.1 18h1.7L6.6 3.9H4.7z"/></svg>'
  };

  function path() { return (location.pathname.replace(/\/+$/, '') || '/'); }

  /* Un solo criterio de "activo", compartido por desktop y movil, con alias y
     subrutas. Antes desktop solo contemplaba el prefijo /tienda y el movil solo
     coincidencia exacta, asi que /vuelos, las subrutas (/conciertos/...) y la
     ficha de producto no resaltaban igual: el header "cambiaba" segun la seccion. */
  function activeFor(p, href) {
    if (href === '/estado-aerolineas') return p === '/estado-aerolineas' || p === '/vuelos';
    if (href === '/') return p === '/';
    return p === href || p.indexOf(href + '/') === 0;
  }
  var _lastActivePath = null;
  function refreshActive() {
    var host = document.getElementById('rt2-header');
    if (!host || !host.shadowRoot) return;
    var p = path();
    if (p === _lastActivePath) return;            // solo recalcula si cambio la ruta
    _lastActivePath = p;
    host.shadowRoot.querySelectorAll('.links a, .mob a').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href && href.charAt(0) === '/') a.classList.toggle('on', activeFor(p, href));
    });
  }

  /* ---------- HEADER (Shadow DOM) ---------- */
  var HEADER_CSS = [
    '*{box-sizing:border-box;font-family:"Montserrat",system-ui,-apple-system,sans-serif;margin:0;padding:0}',
    ':host{all:initial;display:block!important;position:fixed!important;top:0;left:0;right:0;z-index:9990;height:64px}',
    '.bar{height:64px;background:rgba(10,10,12,.88);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);',
    '  border-bottom:1px solid rgba(255,255,255,.07)}',
    ':host([data-th=light]) .bar{background:rgba(252,249,245,.92);border-bottom-color:rgba(0,0,0,.08)}',
    '.in{max-width:1200px;height:100%;margin:0 auto;padding:0 22px;display:flex;align-items:center;gap:24px}',
    '.logo{display:flex;align-items:center;flex-shrink:0;text-decoration:none}',
    '.logo img{height:34px;width:auto;display:block}',
    '.logo .lt{display:none}',
    ':host([data-th=light]) .logo .ld{display:none}',
    ':host([data-th=light]) .logo .lt{display:block}',
    '.links{display:flex;align-items:center;gap:23px;margin:0 auto}',
    '.links a{font-size:13.5px;font-weight:600;text-decoration:none;color:#e8ebef;letter-spacing:.01em;',
    '  padding:6px 1px;border-bottom:2px solid transparent;transition:color .18s,border-color .18s;white-space:nowrap}',
    ':host([data-th=light]) .links a{color:#2a2620}',
    '.links a:hover{color:#FF8C03}',
    '.links a.on{color:#FF8C03;border-bottom-color:#FF8C03}',
    '.ctrl{display:flex;align-items:center;gap:14px;flex-shrink:0}',
    'button{background:transparent;border:0;cursor:pointer;padding:8px;border-radius:999px;display:flex;',
    '  align-items:center;justify-content:center;color:#e8ebef;transition:background .18s}',
    ':host([data-th=light]) button{color:#2a2620}',
    'button:hover{background:rgba(128,128,128,.15)}',
    'button svg{width:20px;height:20px}',
    '.i-moon{display:none}',
    ':host([data-th=light]) .i-sun{display:none}',
    ':host([data-th=light]) .i-moon{display:block}',
    '.cart{position:relative;display:flex;padding:8px;border-radius:999px;color:#e8ebef;transition:background .18s}',
    ':host([data-th=light]) .cart{color:#2a2620}',
    '.cart:hover{background:rgba(128,128,128,.15)}',
    '.cart svg{width:21px;height:21px}',
    '.badge{position:absolute;top:0;right:0;min-width:16px;height:16px;border-radius:999px;background:#FF8C03;color:#fff;',
    '  font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;padding:0 4px}',
    '.badge.zero{display:none}',
    '.cta{background:linear-gradient(135deg,#FF8C03,#E67A00);color:#fff;font-size:12.5px;font-weight:700;',
    '  letter-spacing:.05em;text-transform:uppercase;text-decoration:none;padding:10px 20px;border-radius:999px;',
    '  white-space:nowrap;box-shadow:0 6px 16px -6px rgba(255,140,3,.55);transition:filter .18s,transform .18s}',
    '.cta:hover{filter:brightness(1.07);transform:translateY(-1px)}',
    '.burger{display:none}',
    '.mob{display:none;position:fixed;top:64px;left:0;right:0;padding:10px 18px 22px;',
    '  background:rgba(12,12,14,.97);-webkit-backdrop-filter:blur(16px);backdrop-filter:blur(16px);',
    '  border-bottom:1px solid rgba(255,255,255,.08);animation:drop .22s ease}',
    ':host([data-th=light]) .mob{background:rgba(252,249,245,.98);border-bottom-color:rgba(0,0,0,.08)}',
    '@keyframes drop{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:none}}',
    '.mob.open{display:block}',
    '.mob a{display:block;padding:13px 6px;font-size:15px;font-weight:600;color:#e8ebef;text-decoration:none;',
    '  border-bottom:1px solid rgba(128,128,128,.14)}',
    ':host([data-th=light]) .mob a{color:#2a2620}',
    '.mob a.on{color:#FF8C03}',
    '.mob .cta{display:inline-block;margin-top:14px;border-bottom:0}',
    '@media(max-width:940px){.links{display:none}.burger{display:flex}.cta.desk{display:none}.ctrl{margin-left:auto}}'
  ].join('\n');

  function buildHeader() {
    if (document.getElementById('rt2-header')) return;
    if (!document.body) return;
    var p = path();
    var host = document.createElement('div');
    host.id = 'rt2-header';
    host.setAttribute('data-th', isDark() ? 'dark' : 'light');
    var sr = host.attachShadow({ mode: 'open' });
    var links = LINKS.map(function (l) {
      var on = activeFor(p, l[1]);
      return '<a href="' + l[1] + '"' + (on ? ' class="on"' : '') + '>' + l[0] + '</a>';
    }).join('');
    sr.innerHTML =
      '<style>' + HEADER_CSS + '</style>' +
      '<div class="bar"><div class="in">' +
      '  <a class="logo" href="/" aria-label="Inicio">' +
      '    <img class="ld" alt="Reaño Travels" src="' + LOGO_DARK + '">' +
      '    <img class="lt" alt="Reaño Travels" src="' + LOGO_LIGHT + '">' +
      '  </a>' +
      '  <div class="links">' + links + '</div>' +
      '  <div class="ctrl">' +
      '    <button id="th" aria-label="Cambiar tema">' + I.sun + I.moon + '</button>' +
      '    <a class="cart" href="/cart" aria-label="Carrito">' + I.cart + '<span class="badge zero" id="badge">0</span></a>' +
      '    <a class="cta desk" href="' + WA + '" target="_blank" rel="noopener">Cotizar ahora</a>' +
      '    <button class="burger" id="bg" aria-label="Menú">' + I.burger + '</button>' +
      '  </div>' +
      '</div></div>' +
      '<div class="mob" id="mob">' + LINKS.map(function (l) {
        return '<a href="' + l[1] + '"' + (activeFor(p, l[1]) ? ' class="on"' : '') + '>' + l[0] + '</a>';
      }).join('') + '<a class="cta" href="' + WA + '" target="_blank" rel="noopener">Cotizar ahora</a></div>';
    document.body.insertBefore(host, document.body.firstChild);

    sr.getElementById('th').addEventListener('click', function () { applyTheme(!isDark()); });
    var mob = sr.getElementById('mob');
    sr.getElementById('bg').addEventListener('click', function () { mob.classList.toggle('open'); });
    mob.addEventListener('click', function (e) { if (e.target.tagName === 'A') mob.classList.remove('open'); });
  }

  /* ---------- BADGE del carrito (lee el contador nativo oculto) ---------- */
  function cartCount() {
    var n = 0;
    document.querySelectorAll('a[href="/cart"], a[href$="/cart"], .rt-cart-link').forEach(function (a) {
      if (a.id === 'rt2-header' || (a.closest && a.closest('#rt2-header, #rt2-footer'))) return;
      var m = (a.textContent || '').match(/\d+/);
      if (m) n = Math.max(n, parseInt(m[0], 10));
    });
    return n;
  }
  function syncBadge() {
    var host = document.getElementById('rt2-header');
    if (!host || !host.shadowRoot) return;
    var b = host.shadowRoot.getElementById('badge');
    if (!b) return;
    var n = cartCount();
    b.textContent = String(n);
    b.classList.toggle('zero', n === 0);
  }

  /* ---------- FOOTER (Shadow DOM, premium oscuro en ambos temas) ---------- */
  var FOOTER_CSS = [
    '*{box-sizing:border-box;font-family:"Montserrat",system-ui,sans-serif;margin:0;padding:0}',
    ':host{all:initial;display:block!important;position:relative;z-index:6;background:#0d0d10;',
    '  border-top:1px solid rgba(255,140,3,.4)}',
    '.in{max-width:1200px;margin:0 auto;padding:52px 24px 20px;display:grid;',
    '  grid-template-columns:1.4fr 1fr 1fr 1fr;gap:36px}',
    '@media(max-width:860px){.in{grid-template-columns:1fr 1fr}}',
    '@media(max-width:520px){.in{grid-template-columns:1fr}}',
    '.brand img{height:38px;width:auto;margin-bottom:14px;display:block}',
    '.brand p{color:#9aa1ab;font-size:13.5px;line-height:1.6;margin:0 0 16px}',
    '.pills{display:flex;gap:10px;flex-wrap:wrap}',
    '.pill{display:inline-flex;align-items:center;gap:6px;font-size:12.5px;font-weight:700;text-decoration:none;',
    '  padding:9px 16px;border-radius:999px;transition:filter .18s}',
    '.pill.solid{background:linear-gradient(135deg,#FF8C03,#E67A00);color:#fff}',
    '.pill.line{border:1.5px solid rgba(255,140,3,.55);color:#FF8C03}',
    '.pill:hover{filter:brightness(1.08)}',
    '.h{font-size:11.5px;font-weight:800;letter-spacing:.18em;text-transform:uppercase;color:#8b929c;margin:4px 0 16px}',
    '.col a{display:block;color:#c9ced6;font-size:14px;font-weight:500;text-decoration:none;margin:0 0 11px;transition:color .16s}',
    '.col a:hover{color:#FF8C03}',
    '.soc a{display:flex;align-items:center;gap:10px}',
    '.soc svg{width:17px;height:17px;fill:#c9ced6;transition:fill .16s;flex-shrink:0}',
    '.soc a:hover svg{fill:#FF8C03}',
    '.legal{border-top:1px solid rgba(255,255,255,.08);margin-top:8px;padding:16px 24px;text-align:center;',
    '  color:#7d838d;font-size:12px;letter-spacing:.02em}'
  ].join('\n');

  function buildFooter() {
    if (document.getElementById('rt2-footer')) return;
    if (!document.body) return;
    var host = document.createElement('div');
    host.id = 'rt2-footer';
    host.setAttribute('data-th', isDark() ? 'dark' : 'light');
    var sr = host.attachShadow({ mode: 'open' });
    sr.innerHTML =
      '<style>' + FOOTER_CSS + '</style>' +
      '<div class="in">' +
      '  <div class="brand">' +
      '    <img alt="Reaño Travels" src="' + LOGO_DARK + '">' +
      '    <p>Experiencias globales de alto nivel, diseñadas a tu medida desde Venezuela.</p>' +
      '    <div class="pills">' +
      '      <a class="pill solid" href="mailto:reservas@reanotravel.com">✉ Email</a>' +
      '      <a class="pill line" href="tel:+584247309699">☎ Llamar</a>' +
      '    </div>' +
      '  </div>' +
      '  <div class="col"><div class="h">Explorar</div>' +
      '    <a href="/">Inicio</a><a href="/estado-aerolineas">Vuelos</a><a href="/paquetes">Paquetes</a>' +
      '    <a href="/conciertos">Conciertos</a><a href="/tienda">Tienda</a><a href="/hoteles">Hoteles</a>' +
      '  </div>' +
      '  <div class="col"><div class="h">Empresa</div>' +
      '    <a href="/servicios">Servicios</a><a href="/nosotros">Nosotros</a><a href="/contacto">Contacto</a>' +
      '  </div>' +
      '  <div class="col soc"><div class="h">Social</div>' +
      '    <a href="https://www.instagram.com/reanotravels" target="_blank" rel="noopener">' + I.ig + 'Instagram</a>' +
      '    <a href="https://www.tiktok.com/@reanotravels" target="_blank" rel="noopener">' + I.tt + 'TikTok</a>' +
      '    <a href="' + WA + '" target="_blank" rel="noopener">' + I.wa + 'WhatsApp</a>' +
      '    <a href="https://x.com/reanotravels" target="_blank" rel="noopener">' + I.x + 'X</a>' +
      '  </div>' +
      '</div>' +
      '<div class="legal">© 2026 Reaño Travels &amp; Tours · RIF J-50849288-9 · MINTUR AGT-620-2025 · RTN 23451 · @reanotravels</div>';
    document.body.appendChild(host);
  }

  /* ---------- ARRANQUE ---------- */
  function boot() {
    buildHeader();
    buildFooter();
    syncTheme();
    syncBadge();
  }
  if (document.readyState !== 'loading') boot();
  else document.addEventListener('DOMContentLoaded', boot);
  [400, 1200, 2600].forEach(function (d) { setTimeout(boot, d); });
  // recalcula el resaltado activo en navegacion AJAX de Squarespace (el header
  // persiste y no se reconstruye) y en back/forward; early-out si la ruta no cambio.
  window.addEventListener('popstate', refreshActive);
  setInterval(function () { syncBadge(); syncTheme(); refreshActive(); }, 2000);
})();
