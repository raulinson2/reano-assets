/* Reano Travels - UI fixes v3
   CSS estable (la inyeccion del sitio no puede deshacer CSS):
   header unificado, footer unificado y legible en claro/oscuro,
   fondo de tienda, pagina de producto, carrito ordenado. */
(function(){
  if(window.__rtUI3) return; window.__rtUI3=1;
  var WA='https://wa.me/584247309699?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20paquetes%20de%20viaje';
  var IMG='https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/losroques.jpg';

  var CSS = `
  /* ===== HEADER: margenes tipo max-width 1200 en el header legacy ===== */
  .rt-nav{padding-left:max(20px,calc((100% - 1200px)/2)) !important;padding-right:max(20px,calc((100% - 1200px)/2)) !important}
  /* declutter: quitar "Inicio" (el logo ya va a inicio) y "Servicios" */
  .rt-nav a[href="/"]:not(:has(img)):not(:has(svg)),
  header.fixed a[href="/"]:not(:has(img)):not(:has(svg)){display:none !important}
  .rt-nav a[href="/servicios"], header.fixed a[href="/servicios"]{display:none !important}
  /* CTA del header unificado al naranja de marca en TODAS las pestanas */
  .rt-nav-cta{background:linear-gradient(135deg,#FF8C03,#E67A00) !important;color:#fff !important;
    border:none !important;text-transform:uppercase;font-weight:700 !important;letter-spacing:.05em;
    font-size:12.5px !important;padding:10px 20px !important;border-radius:999px !important;
    box-shadow:0 6px 16px -6px rgba(255,140,3,.55)}
  .rt-nav-cta:hover{filter:brightness(1.07)}

  /* ===== FOOTER UNIFICADO (mismo look premium oscuro en todas las pestanas y ambos temas) ===== */
  .rt-footer, footer.rea-stuck{background:#0e0e10 !important;border-top:1px solid rgba(255,140,3,.4) !important}
  /* cada enlace de columna en su propia linea (arregla TiendaHoteles pegados) */
  .rt-footer a[href^="/"]:not(:has(img)):not(:has(svg)),
  footer.rea-stuck a[href^="/"]:not(:has(img)):not(:has(svg)){
    display:block !important;margin:0 0 10px !important;
    color:#c9ced6 !important;font-weight:500 !important;text-decoration:none}
  .rt-footer a[href^="/"]:hover, footer.rea-stuck a[href^="/"]:hover{color:#FF8C03 !important}
  .rt-foot-title{color:#8b929c !important}
  .rt-footer p, footer.rea-stuck p{color:#9aa1ab !important}
  .rt-footer .rt-soc-link, footer.rea-stuck .rt-soc-link,
  .rt-footer .rt-soc-link span, footer.rea-stuck .rt-soc-link span{color:#c9ced6 !important}
  .rt-footer .rt-soc-link:hover, footer.rea-stuck .rt-soc-link:hover{color:#FF8C03 !important}
  .rt-footer > div:last-child, footer.rea-stuck > div:last-child{color:#7d838d !important}

  /* ===== TIENDA: fondo fotografico sutil detras del showcase ===== */
  #rt-paquetes-showcase{position:relative}
  #rt-paquetes-showcase > *:not(#rt-tienda-bg){position:relative;z-index:1}
  html:not(.dark) #rt-tienda-bg{opacity:.20 !important}

  /* ===== PRODUCTO: breadcrumb legible en oscuro ===== */
  html.dark [class*="readcrumb"], html.dark [class*="readcrumb"] a,
  html.dark [class*="readcrumb"] span, html.dark [class*="readcrumb"] svg{color:#a6adb6 !important;fill:#a6adb6 !important}
  /* galeria: colapsar el alto reservado vacio y pulir la imagen */
  .product-gallery, .product-gallery-slides{height:auto !important;min-height:0 !important}
  .product-gallery-slides-item{position:relative !important}
  .product-gallery-slides-item-image{width:100% !important;height:auto !important;border-radius:16px;
    box-shadow:0 22px 44px -20px rgba(0,0,0,.45)}
  /* recortar el vacio bajo el bloque de compra */
  .product-detail{min-height:0 !important;padding-bottom:34px !important}
  .product-detail .content{min-height:0 !important}

  /* ===== CARRITO: layout en 2 columnas alineadas (items | resumen) ===== */
  /* fuera las tarjetas decorativas del addon que desordenaban la pagina */
  .rt-cart-hero, .rt-cart-extra, .rt-cart-card{display:none !important}
  div:has(> .cart-container){display:grid !important;grid-template-columns:minmax(0,1.55fr) minmax(360px,1fr);
    gap:30px;align-items:start;max-width:1180px;margin:0 auto !important;padding:26px 20px 70px;box-sizing:border-box}
  /* colocacion explicita: items a la izquierda, resumen a la derecha */
  div:has(> .cart-container) > *{grid-column:1;min-width:0}
  div:has(> .cart-container) > .cart-container{grid-column:1;grid-row:1}
  div:has(> .cart-container) > div:has(> .cart-summary){grid-column:2;grid-row:1 / span 8;width:100% !important}
  .cart-row{align-items:center;width:100% !important;max-width:100% !important;position:relative;box-sizing:border-box}
  .cart-row > *{min-width:0}
  /* el precio traia un min-width de 512px que desbordaba la tarjeta */
  .cart-row > .cart-row-price, .cart-row-price{min-width:0 !important;width:auto !important;
    flex:0 0 auto !important;margin-left:auto !important;text-align:right;white-space:nowrap}
  .cart-container{min-width:0;width:100% !important}
  .cart-summary{width:100% !important;box-sizing:border-box}
  .cart-container::before{content:"Tu carrito";display:block;font-family:'Montserrat',system-ui,sans-serif;
    font-size:26px;font-weight:800;letter-spacing:-.01em;margin:0 0 18px;color:#1a1610}
  html.dark .cart-container::before{color:#eef3f7}
  @media(max-width:900px){div:has(> .cart-container){display:block !important}
    .cart-container::before{font-size:22px}}

  /* ===== CARRITO: estado vacio premium ===== */
  body.rt-cart-empty .rt-cart-hero, body.rt-cart-empty .rt-cart-extra, body.rt-cart-empty .rt-cart-card{display:none !important}
  body.rt-cart-empty .empty-message{display:none !important}
  body.rt-cart-empty .cart-summary{display:none !important}
  body.rt-cart-empty div:has(> .cart-container){display:block !important}
  body.rt-cart-empty .cart-container::before{content:none}
  .rt-ce{max-width:600px;margin:10vh auto 13vh;text-align:center;padding:0 24px;font-family:'Montserrat',system-ui,-apple-system,sans-serif}
  .rt-ce-ico{font-size:56px;line-height:1;margin-bottom:12px}
  .rt-ce h2{font-size:27px;font-weight:800;letter-spacing:-.01em;margin:0 0 10px;color:#191512}
  html.dark .rt-ce h2{color:#eef3f7}
  .rt-ce p{font-size:15px;line-height:1.6;color:#6b645c;margin:0 auto 24px;max-width:440px}
  html.dark .rt-ce p{color:#9aa6b2}
  .rt-ce-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  .rt-ce-b1,.rt-ce-b2{font-weight:700;font-size:14px;padding:13px 24px;border-radius:999px;text-decoration:none;transition:filter .2s,border-color .2s,color .2s}
  .rt-ce-b1{background:linear-gradient(135deg,#FF8C03,#E67A00);color:#fff;box-shadow:0 8px 20px -8px rgba(255,140,3,.6)}
  .rt-ce-b1:hover{filter:brightness(1.05)}
  .rt-ce-b2{background:transparent;color:#191512;border:1px solid rgba(0,0,0,.16)}
  html.dark .rt-ce-b2{color:#eef3f7;border-color:rgba(255,255,255,.2)}
  .rt-ce-b2:hover{border-color:#FF8C03;color:#FF8C03}
  `;

  function injectCSS(){
    if(document.getElementById('rt-ui-css3'))return;
    var old=document.getElementById('rt-ui-css'); if(old) old.remove();
    var st=document.createElement('style');st.id='rt-ui-css3';st.textContent=CSS;
    (document.head||document.documentElement).appendChild(st);
  }

  function markTienda(){
    if((location.pathname.replace(/\/+$/,'')||'/')!=='/tienda')return;
    document.body.classList.add('rt-tienda');
    var host=document.getElementById('rt-paquetes-showcase');
    if(host && !document.getElementById('rt-tienda-bg')){
      var bg=document.createElement('div');bg.id='rt-tienda-bg';
      bg.setAttribute('style','position:absolute;inset:0;z-index:0;pointer-events:none;'
        +'background:url('+IMG+') center 30%/cover no-repeat;opacity:.15;'
        +'-webkit-mask-image:linear-gradient(to bottom,#000 55%,transparent 100%);'
        +'mask-image:linear-gradient(to bottom,#000 55%,transparent 100%)');
      host.insertBefore(bg,host.firstChild);
    }
  }

  function buildEmptyCart(){
    if(document.getElementById('rt-cart-empty-box'))return;
    var msg=document.querySelector('.empty-message');
    var box=document.createElement('div');box.id='rt-cart-empty-box';box.className='rt-ce';
    box.innerHTML='<div class="rt-ce-ico">🧳</div><h2>Tu carrito está vacío</h2>'
      +'<p>Aún no has agregado nada. Descubre nuestros paquetes y experiencias y arma tu próximo viaje con nosotros.</p>'
      +'<div class="rt-ce-btns"><a class="rt-ce-b1" href="/tienda">Ver paquetes</a><a class="rt-ce-b2" href="'+WA+'" target="_blank" rel="noopener">Hablar con un asesor</a></div>';
    if(msg&&msg.parentElement){ msg.parentElement.insertBefore(box, msg); }
    else { (document.querySelector("#sections")||document.body).appendChild(box); }
    if(msg){ msg.style.setProperty('display','none','important'); }
    [].slice.call(document.querySelectorAll('a,button')).forEach(function(b){
      if(b.closest('#rt-cart-empty-box')) return;
      if(/^\s*(seguir comprando|continue shopping|seguir viendo)\s*$/i.test((b.textContent||''))) b.style.setProperty('display','none','important');
    });
  }
  function markCart(){
    if((location.pathname.replace(/\/+$/,'')||'/')!=='/cart')return;
    var rows=document.querySelectorAll('.cart-row, .cart-item, [data-cart-row]');
    if(rows.length===0){ document.body.classList.add('rt-cart-empty'); buildEmptyCart(); }
    else {
      document.body.classList.remove('rt-cart-empty');
      var b=document.getElementById('rt-cart-empty-box'); if(b) b.remove();
    }
  }

  function run(){ injectCSS(); markTienda(); markCart(); }
  if(document.readyState!=='loading')run(); else document.addEventListener('DOMContentLoaded',run);
  [400,1200,2600,4200].forEach(function(d){ setTimeout(run,d); });
  window.addEventListener('popstate',function(){ setTimeout(run,120); });
})();
