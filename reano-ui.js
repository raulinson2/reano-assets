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
  /* TERCER header (nav fijo tailwind que traen las paginas internas): mismo declutter */
  nav.fixed a[href="/"]:not(:has(img)):not(:has(svg)),
  nav.fixed a[href$="reanotravel.com"]:not(:has(img)):not(:has(svg)),
  nav.fixed a[href$="reanotravel.com/"]:not(:has(img)):not(:has(svg)),
  nav.fixed a[href="/servicios"], nav.fixed a[href$="/servicios"], nav.fixed a[href$="/servicios/"]{display:none !important}
  /* que el CTA nunca se parta en dos lineas y que los controles respiren */
  nav.fixed .btn-primary{white-space:nowrap}
  nav.fixed .gap-3{gap:14px !important}
  nav.fixed .gap-6{gap:22px}
  .rt-nav a[href$="/servicios"], header.fixed a[href$="/servicios"]{display:none !important}
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

  /* ===== TIENDA: fondo fotografico infinito (fixed a toda la pagina) ===== */
  #rt-tienda-bg::after{content:"";position:absolute;inset:0;
    background:linear-gradient(180deg,rgba(12,12,14,.68),rgba(12,12,14,.84))}
  html:not(.dark) #rt-tienda-bg::after{background:linear-gradient(180deg,rgba(255,252,248,.78),rgba(255,252,248,.9))}
  body.rt-tienda #sections{position:relative;z-index:1}
  body.rt-tienda .page-section{background:transparent !important}
  body.rt-tienda footer{position:relative;z-index:1}

  /* ===== PRODUCTO: breadcrumb legible en oscuro ===== */
  html.dark [class*="readcrumb"], html.dark [class*="readcrumb"] a,
  html.dark [class*="readcrumb"] span, html.dark [class*="readcrumb"] svg{color:#a6adb6 !important;fill:#a6adb6 !important}
  /* galeria: colapsar el alto reservado vacio y pulir la imagen */
  .product-gallery, .product-gallery-slides{height:auto !important;min-height:0 !important}
  .product-gallery-slides-item{position:relative !important}
  .product-gallery-slides-item-image, .product-gallery-slides img{width:100% !important;height:auto !important;
    border-radius:16px;box-shadow:0 22px 44px -20px rgba(0,0,0,.45)}
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

  /* ===== PRODUCTO: fondo blur del propio articulo + tema ===== */
  body.rt-pp #sections, body.rt-pp .product-detail, body.rt-pp main{position:relative;z-index:2}
  #rt-pblur{position:fixed;inset:-48px;z-index:0;pointer-events:none;background-position:center;background-size:cover;
    filter:blur(46px) saturate(1.12);opacity:.38;transform:translateZ(0)}
  #rt-pblur-scrim{position:fixed;inset:0;z-index:1;pointer-events:none;
    background:linear-gradient(180deg,rgba(10,10,12,.6),rgba(10,10,12,.86))}
  html:not(.dark) #rt-pblur{opacity:.3}
  html:not(.dark) #rt-pblur-scrim{background:linear-gradient(180deg,rgba(252,249,245,.8),rgba(252,249,245,.93))}
  /* etiqueta "Seccion:" y variantes con contraste en ambos temas */
  body.rt-pp .product-detail label, body.rt-pp [class*="variant"] label{color:#6b645c !important}
  html.dark body.rt-pp .product-detail label, html.dark body.rt-pp [class*="variant"] label{color:#a6adb6 !important}

  /* ===== TIENDA: card destacada "Reserva con 50%" ===== */
  .rt-fifty{max-width:880px;margin:30px auto;padding:36px 30px;border-radius:22px;text-align:center;position:relative;z-index:2;
    background:linear-gradient(145deg,rgba(255,140,3,.12),rgba(255,140,3,.04));
    border:1px solid rgba(255,140,3,.35);box-shadow:0 24px 50px -30px rgba(255,140,3,.45);
    font-family:'Montserrat',system-ui,sans-serif}
  .rt-fifty-ico{font-size:34px;margin-bottom:8px}
  .rt-fifty h3{font-size:24px;font-weight:800;letter-spacing:-.01em;margin:0 0 8px;color:#1a1610}
  html.dark .rt-fifty h3{color:#eef3f7}
  .rt-fifty p{font-size:14.5px;color:#6b645c;margin:0 auto 20px;max-width:540px;line-height:1.6}
  html.dark .rt-fifty p{color:#9aa6b2}
  .rt-fifty-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
  .rt-fifty-pp{display:inline-flex;align-items:center;gap:8px;background:#ffc439;color:#111;font-weight:800;font-size:14px;
    padding:12px 22px;border-radius:999px;text-decoration:none}
  .rt-fifty-wa{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#25D366,#1ebe5a);color:#fff;
    font-weight:800;font-size:14px;padding:12px 22px;border-radius:999px;text-decoration:none}
  .rt-fifty-pp:hover,.rt-fifty-wa:hover{filter:brightness(1.06)}
  .rt-fifty-fine{margin-top:14px;font-size:12px;color:#8b929c}

  /* ===== CARRITO premium ===== */
  .cart-row{background:rgba(128,128,128,.05);border:1px solid rgba(128,128,128,.16);border-radius:16px;
    padding:14px !important;margin-bottom:12px}
  .cart-row img{border-radius:12px}
  .cart-summary{border:1px solid rgba(255,140,3,.3) !important;border-radius:18px !important;padding:22px !important}
  .cart-summary::before{content:"Resumen del pedido";display:block;font-family:'Montserrat',system-ui,sans-serif;
    font-weight:800;font-size:16px;margin-bottom:12px;color:#1a1610}
  html.dark .cart-summary::before{color:#eef3f7}

  /* ===== FORMULARIO DE PASAJERO (CRM-ready) ===== */
  .rt-pax{margin-top:22px;border:1px solid rgba(128,128,128,.2);border-radius:18px;overflow:hidden;
    background:rgba(128,128,128,.04);font-family:'Montserrat',system-ui,sans-serif}
  .rt-pax-head{width:100%;display:flex;align-items:center;justify-content:space-between;gap:10px;padding:16px 18px;
    background:transparent;border:0;cursor:pointer;font-family:inherit;font-weight:800;font-size:15px;color:#1a1610;text-align:left}
  html.dark .rt-pax-head{color:#eef3f7}
  .rt-pax-head small{font-weight:700;font-size:11px;color:#FF8C03;letter-spacing:.07em;text-transform:uppercase}
  .rt-pax-chev{transition:transform .2s;flex-shrink:0}
  .rt-pax.open .rt-pax-chev{transform:rotate(180deg)}
  .rt-pax-body{display:none;padding:4px 18px 20px}
  .rt-pax.open .rt-pax-body{display:block}
  .rt-pax-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
  @media(max-width:700px){.rt-pax-grid{grid-template-columns:1fr}}
  .rt-f{display:flex;flex-direction:column;gap:5px}
  .rt-f.full{grid-column:1 / -1}
  .rt-f label{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#6b645c}
  html.dark .rt-f label{color:#9aa6b2}
  .rt-f input,.rt-f select,.rt-f textarea{padding:11px 12px;border-radius:10px;border:1px solid rgba(128,128,128,.28);
    background:rgba(255,255,255,.8);color:#1a1610;font-size:14px;font-family:inherit;outline:none;transition:border-color .15s;width:100%;box-sizing:border-box}
  html.dark .rt-f input,html.dark .rt-f select,html.dark .rt-f textarea{background:rgba(255,255,255,.06);color:#eef3f7}
  .rt-f input:focus,.rt-f select:focus,.rt-f textarea:focus{border-color:#FF8C03}
  .rt-f.err input,.rt-f.err select{border-color:#e5484d !important}
  .rt-tel{display:grid;grid-template-columns:140px 1fr;gap:8px}
  .rt-radio{display:flex;gap:20px;align-items:center;padding-top:6px}
  .rt-radio label{display:flex;gap:7px;align-items:center;font-size:14px;text-transform:none;letter-spacing:0;font-weight:600}
  .rt-pax-submit{margin-top:16px;width:100%;padding:14px;border:0;border-radius:999px;cursor:pointer;font-family:inherit;
    font-weight:800;font-size:14px;letter-spacing:.04em;color:#fff;background:linear-gradient(135deg,#FF8C03,#E67A00);
    box-shadow:0 10px 24px -10px rgba(255,140,3,.6)}
  .rt-pax-submit:hover{filter:brightness(1.06)}
  .rt-pax-ok{display:none;margin-top:12px;padding:12px 14px;border-radius:12px;background:rgba(65,229,117,.12);
    border:1px solid rgba(65,229,117,.4);color:#2fbf62;font-weight:700;font-size:13.5px}
  .rt-pax-note{margin-top:10px;font-size:11.5px;color:#8b929c;text-align:center}

  /* Traslados: sello de respaldo Yummy (alianza aprobada 13/07) */
  #rt-yummy-tras{display:flex;align-items:center;gap:11px;margin:14px 0 4px;
    background:rgba(255,140,3,.08);border:1px solid rgba(255,140,3,.30);
    border-radius:12px;padding:10px 13px}
  .rt-ytr-logos{display:flex;gap:6px;flex-shrink:0}
  .rt-ytr-logos img{height:22px;width:auto;object-fit:contain;background:#fff;
    border-radius:6px;padding:2px 6px}
  .rt-ytr-t{font-size:12.5px;line-height:1.45;color:#cfd0d6;text-align:left}
  .rt-ytr-t b{color:#FF8C03}
  html[data-theme="light"] .rt-ytr-t{color:#4a4b52}
  `;

  function injectCSS(){
    if(document.getElementById('rt-ui-css3'))return;
    var old=document.getElementById('rt-ui-css'); if(old) old.remove();
    var st=document.createElement('style');st.id='rt-ui-css3';st.textContent=CSS;
    (document.head||document.documentElement).appendChild(st);
  }

  // Servicios: sello de respaldo Yummy en la tarjeta de Traslados
  // (alianza Yummy Corporate aprobada el 13/07 — da seguridad y respaldo al cliente)
  function trasladosYummy(){
    if(location.pathname.indexOf('/servicios')!==0) return;
    if(document.getElementById('rt-yummy-tras')) return;
    var card=null;
    document.querySelectorAll('article').forEach(function(a){
      if(card) return;
      if(a.querySelector('article')) return; // envoltorios fuera: solo tarjetas hoja
      var t=(a.innerText||'');
      if(/traslados/i.test(t) && /puerta a puerta|choferes/i.test(t)) card=a;
    });
    if(!card) return;
    var body=card.querySelector('.p-6')||card;
    var band=document.createElement('div');
    band.id='rt-yummy-tras';
    band.innerHTML=
      '<span class="rt-ytr-logos">'
      +'<img src="https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/yummy-logo.png" alt="Yummy Corporate" loading="lazy">'
      +'<img src="https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/yummy-rides-logo.png" alt="Yummy Rides" loading="lazy">'
      +'</span>'
      +'<span class="rt-ytr-t"><b>Alianza oficial Yummy</b> — conductores verificados, '
      +'monitoreo en tiempo real y respaldo corporativo en cada traslado.</span>';
    var cta=body.querySelector('a');
    if(cta) body.insertBefore(band, cta); else body.appendChild(band);
  }

  function markTienda(){
    if((location.pathname.replace(/\/+$/,'')||'/')!=='/tienda')return;
    document.body.classList.add('rt-tienda');
    if(!document.getElementById('rt-tienda-bg')){
      var bg=document.createElement('div');bg.id='rt-tienda-bg';
      bg.setAttribute('style','position:fixed;inset:0;z-index:0;pointer-events:none;'
        +'background:url('+IMG+') center/cover no-repeat');
      document.body.appendChild(bg);
    }
  }

  // Con el SHELL activo, los componentes legacy deben quedar ocultos SIEMPRE.
  // Un stylesheet del builder legacy los revive saltándose el CSS de la inyección,
  // así que se rematan con estilo inline !important (gana a cualquier cascada).
  function hideLegacyShell(){
    if(!document.documentElement.classList.contains('rt-shell-on')) return;
    if(!document.getElementById('rt2-header')) return; // el shell aún no montó: no ocultar nada
    ['.rt-nav','header.fixed','nav.fixed','footer.rea-stuck','.rt-footer','footer.w-full','footer.border-t'].forEach(function(sel){
      document.querySelectorAll(sel).forEach(function(el){
        if(el.style.getPropertyValue('display')!=='none') el.style.setProperty('display','none','important');
      });
    });
    // Red de seguridad: el único footer del sitio es el del shell (div#rt2-footer,
    // shadow DOM). Cualquier <footer> del documento con la data legal es un duplicado
    // embebido en el contenido de alguna página (variantes con clases distintas).
    document.querySelectorAll('footer').forEach(function(el){
      if(el.style.getPropertyValue('display')==='none') return;
      if(/RIF\s*J-?50849288|MINTUR|Reaño Travels/i.test(el.textContent||''))
        el.style.setProperty('display','none','important');
    });
  }

  // Nosotros: agregar Yummy Corporate y Yummy Rides a Certificaciones & Aliados
  function aliadosYummy(){
    if(location.pathname.indexOf('/nosotros')!==0) return;
    if(document.getElementById('rt-yummy-corp')) return;
    var grid=document.querySelector('.cert-grid'); if(!grid) return;
    var tpl=grid.querySelector('.cert'); if(!tpl) return;
    function leafs(el){ var out=[]; (function w(e){ if(!e.children||e.children.length===0){ out.push(e); return; } for(var i=0;i<e.children.length;i++) w(e.children[i]); })(el); return out; }
    function mk(id,src,title,sub){
      var c=tpl.cloneNode(true); c.id=id;
      var im=c.querySelector('img');
      if(im){ im.src=src; im.alt=title; im.removeAttribute('srcset'); im.style.objectFit='contain'; im.style.background='#fff'; im.style.borderRadius='10px'; im.style.padding='3px'; }
      var ls=leafs(c).filter(function(l){ return l.tagName!=='IMG' && (l.textContent||'').trim().length>0; });
      if(ls[0]) ls[0].textContent=title;
      if(ls[1]) ls[1].textContent=sub;
      for(var i=2;i<ls.length;i++){ ls[i].textContent=''; }
      return c;
    }
    grid.appendChild(mk('rt-yummy-corp','https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/yummy-logo.png','Yummy Corporate','Alianza de traslados corporativos'));
    grid.appendChild(mk('rt-yummy-rides','https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/yummy-rides-logo.png','Yummy Rides','Traslados para tus viajes'));
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

  // ===== PRODUCTO: fondo blur del propio articulo + galeria fallback + bloques muertos =====
  var PIMG = {
    'canaima': 'https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/canaima.jpg',
    'los-roques': 'https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/losroques.jpg',
    'margarita': 'https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/margarita.jpg'
  };
  function productPage(){
    if(!/^\/tienda\/p\//.test(location.pathname)) return;
    document.body.classList.add('rt-pp');
    var gi=document.querySelector('.product-gallery img');
    var src=(gi&&gi.src)?gi.src:'';
    if(!src){ for(var k in PIMG){ if(location.pathname.indexOf(k)!==-1){ src=PIMG[k]; break; } } }
    if(src && !document.getElementById('rt-pblur')){
      var b=document.createElement('div'); b.id='rt-pblur'; b.style.backgroundImage='url("'+src+'")'; document.body.appendChild(b);
      var s=document.createElement('div'); s.id='rt-pblur-scrim'; document.body.appendChild(s);
    }
    // paquetes de Venezuela sin foto de producto: colocar la foto del destino en la galeria
    if(!gi && src){
      var slides=document.querySelector('.product-gallery-slides');
      if(slides && !slides.querySelector('img')){
        var im=document.createElement('img'); im.src=src; im.alt=document.title;
        im.style.cssText='width:100%;height:auto;border-radius:16px;display:block;box-shadow:0 22px 44px -20px rgba(0,0,0,.45)';
        slides.appendChild(im);
      }
    }
    // limpiar el bloque vacio de otra tonalidad al final de la vista (codigo muerto)
    document.querySelectorAll('section, .page-section').forEach(function(sec){
      if(sec.querySelector('.product-detail, img, form, .rt-paq, input, iframe')) return;
      if((sec.textContent||'').trim()===''){ sec.style.setProperty('display','none','important'); }
    });
  }

  /* Puente /tienda -> /paquetes. Los paquetes se mudaron a su propia pagina el
     22-jul-2026 y en la tienda no quedaba ningun enlace visible hacia ellos:
     solo se llegaba por el menu. Esta franja cierra ese hueco. */
  function puentePaquetes(){
    if((location.pathname.replace(/\/+$/,'')||'/')!=='/tienda') return;
    if(document.getElementById('rt-puente-paq')) return;
    var host=document.querySelector('#sections'); if(!host) return;
    var s=document.createElement('section');
    s.id='rt-puente-paq';
    s.style.cssText='background:#0d0d10;padding:56px 22px;text-align:center;'+
      'font-family:Montserrat,system-ui,sans-serif';
    s.innerHTML=
      '<h2 style="color:#fff;font-size:30px;font-weight:900;letter-spacing:-.5px;margin:0 0 10px">'+
      '&#191;Buscas un viaje completo?</h2>'+
      '<p style="color:#9aa1ab;font-size:15.5px;line-height:1.6;max-width:520px;margin:0 auto 24px">'+
      'Europa, Colombia y todo Venezuela: vuelos, hotel, traslados y actividades, '+
      'armados a tu medida. Te lo cotizamos sin compromiso.</p>'+
      '<a href="/paquetes" style="display:inline-block;background:linear-gradient(135deg,#FF8C03,#E67A00);'+
      'color:#fff;font-size:13.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;'+
      'text-decoration:none;padding:15px 34px;border-radius:999px;'+
      'box-shadow:0 8px 22px -8px rgba(255,140,3,.6)">Ver paquetes</a>';
    host.appendChild(s);
  }

  // ===== TIENDA: seccion "Reserva con 50%" -> card destacada independiente =====
  function fiftyCard(){
    if((location.pathname.replace(/\/+$/,'')||'/')!=='/tienda') return;
    if(document.getElementById('rt-fifty')) return;
    var h=null; document.querySelectorAll('h1,h2,h3').forEach(function(x){ if(!h && /Reserva con 50/i.test(x.textContent||'')) h=x; });
    if(!h) return;
    var sec=h.closest('section')||h.closest('.page-section')||h.parentElement;
    var card=document.createElement('div'); card.id='rt-fifty'; card.className='rt-fifty';
    card.innerHTML='<div class="rt-fifty-ico">🛡️</div>'
      +'<h3>Reserva con 50% de inicial</h3>'
      +'<p>Asegura tu cupo hoy con la mitad del valor y paga el resto antes de viajar. Sin intereses y con acompañamiento total de tu asesor Reaño.</p>'
      +'<div class="rt-fifty-btns">'
      +'<a class="rt-fifty-pp" href="/cart">💳 Pago seguro vía PayPal</a>'
      +'<a class="rt-fifty-wa" target="_blank" rel="noopener" href="'+WA+'">💬 Cotizar por WhatsApp</a>'
      +'</div>'
      +'<div class="rt-fifty-fine">PayPal · Tarjeta · Zelle · Binance — coordina cuotas o abonos con tu asesor</div>';
    sec.parentElement.insertBefore(card, sec);
    sec.style.setProperty('display','none','important');
  }

  // ===== CARRITO: formulario de pasajero (obligatorio para emitir) — CRM =====
  // El lead viaja a un Formulario de Google ("Registro de leads de la web") cuyas
  // respuestas caen en una pestana del sheet "CRM Reano Travels — Contactos".
  //
  // Por que un Formulario y no Apps Script: el endpoint de Forms acepta envios
  // anonimos sin ninguna autorizacion OAuth. Un Apps Script exige que el dueno
  // apruebe una ventana de consentimiento de Google, imposible de automatizar.
  //
  // Es un POST "simple" (FormData + no-cors): sin preflight CORS, va directo.
  // Si algun dia se autoriza un Apps Script, basta definir window.RT_CRM_ENDPOINT
  // y este codigo lo usara ADEMAS del formulario.
  var RT_FORM = 'https://docs.google.com/forms/d/e/1FAIpQLSeDqlPGbV0JP_DECXgHWGylMjuNaKKYLgzWjaNVynDnXaDNmw/formResponse';
  var RT_F = {                       /* verificado campo a campo el 21-jul-2026 */
    nombre:   'entry.480636068',
    telefono: 'entry.1003615195',
    email:    'entry.1724292813',
    pais:     'entry.2014855189',
    ciudad:   'entry.1405811678',
    doc:      'entry.663150483',
    carrito:  'entry.44686000',
    subtotal: 'entry.473752615',
    json:     'entry.950446269'
  };

  function crmEnviar(payload){
    var p = payload.pasajero || {};
    try{
      var fd = new FormData();
      /* el formulario recoge el correo como campo propio y es obligatorio:
         si el cliente no dejo email, se manda un marcador para no perder el lead */
      fd.append('emailAddress', p.email || 'sin-email@reanotravel.com');
      fd.append(RT_F.nombre,   p.nombre || '');
      fd.append(RT_F.telefono, p.telefono || '');
      fd.append(RT_F.email,    p.email || '');
      fd.append(RT_F.pais,     p.pais || '');
      fd.append(RT_F.ciudad,   p.ciudad || '');
      fd.append(RT_F.doc,      ((p.tipoDocumento||'')+' '+(p.numeroDocumento||'')).trim());
      fd.append(RT_F.carrito,  (payload.carrito||[]).map(function(x){
        return (x.item||'')+(x.precio?' ('+x.precio+')':'');
      }).join(' | '));
      fd.append(RT_F.subtotal, payload.subtotal || '');
      fd.append(RT_F.json,     JSON.stringify(payload).slice(0, 4000));
      fetch(RT_FORM, {method:'POST', mode:'no-cors', body:fd}).catch(function(){});
    }catch(e){}

    /* endpoint propio opcional (Apps Script), si alguna vez se activa */
    if(window.RT_CRM_ENDPOINT){
      try{ fetch(window.RT_CRM_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)}).catch(function(){}); }catch(e){}
    }
  }
  function paxForm(){
    if((location.pathname.replace(/\/+$/,'')||'/')!=='/cart') return;
    if(document.body.classList.contains('rt-cart-empty')) return;
    if(document.getElementById('rt-pax')) return;
    var host=document.querySelector('.cart-container'); if(!host) return;
    function f(id,label,type,extra){ return '<div class="rt-f" id="rtf-'+id+'"><label for="rtp-'+id+'">'+label+'</label>'
      +'<input id="rtp-'+id+'" type="'+(type||'text')+'" '+(extra||'')+'></div>'; }
    var d=document.createElement('div'); d.id='rt-pax'; d.className='rt-pax open';
    d.innerHTML=
      '<button type="button" class="rt-pax-head" id="rt-pax-toggle">'
      +'<span>🧾 Datos del pasajero <small>· obligatorio para emitir</small></span>'
      +'<svg class="rt-pax-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg>'
      +'</button>'
      +'<div class="rt-pax-body"><div class="rt-pax-grid">'
      + f('nombre','Nombre y apellido completo','text','autocomplete="name"')
      + '<div class="rt-f" id="rtf-tel"><label for="rtp-tel">Teléfono</label><div class="rt-tel">'
      + '<select id="rtp-telcode"><option value="+58">🇻🇪 +58</option><option value="+57">🇨🇴 +57</option><option value="+1">🇺🇸 +1</option>'
      + '<option value="+34">🇪🇸 +34</option><option value="+351">🇵🇹 +351</option><option value="+39">🇮🇹 +39</option><option value="+56">🇨🇱 +56</option>'
      + '<option value="+51">🇵🇪 +51</option><option value="+54">🇦🇷 +54</option><option value="+507">🇵🇦 +507</option><option value="+52">🇲🇽 +52</option>'
      + '<option value="+55">🇧🇷 +55</option><option value="otro">Otro</option></select>'
      + '<input id="rtp-tel" type="tel" inputmode="tel" autocomplete="tel-national"></div></div>'
      + f('email','Correo electrónico','email','autocomplete="email"')
      + f('direccion','Dirección completa','text','autocomplete="street-address"')
      + f('cp','Código postal','text','inputmode="numeric" autocomplete="postal-code"')
      + f('pais','País','text','autocomplete="country-name"')
      + f('ciudad','Ciudad','text','autocomplete="address-level2"')
      + '<div class="rt-f" id="rtf-tipodoc"><label for="rtp-tipodoc">Tipo de documento</label>'
      + '<select id="rtp-tipodoc"><option value="">Selecciona…</option><option>Pasaporte</option><option>DNI</option>'
      + '<option>Cédula de Identidad</option><option>National ID</option></select></div>'
      + f('numdoc','Número de documento oficial','text','')
      + '<div class="rt-f" id="rtf-menores"><label>¿Viaja con menores?</label><div class="rt-radio">'
      + '<label><input type="radio" name="rtp-menores" value="Sí"> Sí</label>'
      + '<label><input type="radio" name="rtp-menores" value="No" checked> No</label></div></div>'
      + '<div class="rt-f full" id="rtf-notas"><label for="rtp-notas">Notas o datos resaltantes (opcional)</label>'
      + '<textarea id="rtp-notas" rows="3" placeholder="Alergias, asistencia especial, fechas preferidas…"></textarea></div>'
      + '</div>'
      + '<button type="button" class="rt-pax-submit" id="rt-pax-send">Guardar datos del pasajero</button>'
      + '<div class="rt-pax-ok" id="rt-pax-ok">✓ Datos guardados. Continúa con el pago — tu asesor ya los tendrá al emitir.</div>'
      + '<div class="rt-pax-note">Tus datos se usan solo para emitir tu paquete y se envían de forma segura.</div>'
      + '</div>';
    host.appendChild(d);
    document.getElementById('rt-pax-toggle').addEventListener('click',function(){ d.classList.toggle('open'); });
    document.getElementById('rt-pax-send').addEventListener('click',paxSubmit);
  }
  function paxSubmit(){
    var val=function(id){ var e=document.getElementById('rtp-'+id); return e?(e.value||'').trim():''; };
    var req=['nombre','tel','email','direccion','cp','pais','ciudad','tipodoc','numdoc'];
    var ok=true;
    req.forEach(function(id){
      var wrap=document.getElementById('rtf-'+(id==='tel'?'tel':id))||document.getElementById('rtf-'+id);
      var filled=val(id)!=='';
      if(wrap) wrap.classList.toggle('err', !filled);
      if(!filled) ok=false;
    });
    if(!ok) return;
    var menores='No'; document.querySelectorAll('input[name="rtp-menores"]').forEach(function(r){ if(r.checked) menores=r.value; });
    var items=[]; document.querySelectorAll('.cart-row').forEach(function(r){
      var price=(r.querySelector('.cart-row-price')||{}).textContent||'';
      items.push({item:(r.textContent||'').trim().slice(0,70), precio:price.trim()});
    });
    var subtotal=''; document.querySelectorAll('.cart-summary *').forEach(function(e){ var t=(e.textContent||'').trim(); if(/^US\$/.test(t)) subtotal=t; });
    var payload={
      fuente:'reanotravel.com/cart', fecha:new Date().toISOString(),
      pasajero:{
        nombre:val('nombre'), telefono:(document.getElementById('rtp-telcode')||{}).value+' '+val('tel'),
        email:val('email'), direccion:val('direccion'), codigoPostal:val('cp'),
        pais:val('pais'), ciudad:val('ciudad'),
        tipoDocumento:val('tipodoc'), numeroDocumento:val('numdoc'),
        viajaConMenores:menores, notas:val('notas')
      },
      carrito:items, subtotal:subtotal
    };
    try{ var q=JSON.parse(localStorage.getItem('rt-crm-queue')||'[]'); q.push(payload); localStorage.setItem('rt-crm-queue', JSON.stringify(q)); }catch(e){}
    crmEnviar(payload);
    var okBox=document.getElementById('rt-pax-ok'); if(okBox) okBox.style.display='block';
    var msg='🧾 *Datos del pasajero — Reaño Travels*%0A'
      +'Nombre: '+encodeURIComponent(payload.pasajero.nombre)+'%0A'
      +'Tel: '+encodeURIComponent(payload.pasajero.telefono)+'%0A'
      +'Email: '+encodeURIComponent(payload.pasajero.email)+'%0A'
      +'Doc: '+encodeURIComponent(payload.pasajero.tipoDocumento+' '+payload.pasajero.numeroDocumento)+'%0A'
      +'Menores: '+payload.pasajero.viajaConMenores+'%0A'
      +'Carrito: '+encodeURIComponent(items.map(function(i){return i.item.slice(0,30);}).join(' | '))+'%0A'
      +(payload.pasajero.notas?('Notas: '+encodeURIComponent(payload.pasajero.notas)):'');
    window.open('https://wa.me/584247309699?text='+msg,'_blank');
  }

  /* Portada de /paquetes. La pagina es un lienzo en blanco de Squarespace: sin
     esto el contenido arrancaba en y=34 y quedaba TAPADO por el header fijo
     (64 px), y ademas la pagina no tenia titulo propio: empezaba de golpe con
     "Paquetes Internacionales" sin presentacion. */
  function paquetesPortada(){
    if((location.pathname.replace(/\/+$/,'')||'/')!=='/paquetes') return;
    var host=document.querySelector('#sections'); if(!host) return;
    if(document.getElementById('rt-paq-portada')) return;
    /* La inyeccion FOOTER mete un .rt-herowrap con el logo como primer hijo de
       la primera seccion de cada pagina. En una portada propia como esta aterriza
       suelto arriba a la izquierda; ademas sobra, porque la portada ya lleva su
       propia marca. Se oculta SOLO aqui dentro. */
    if(!document.getElementById('rt-paq-portada-css')){
      var st=document.createElement('style');
      st.id='rt-paq-portada-css';
      st.textContent='#rt-paq-portada .rt-herowrap{display:none!important}';
      (document.head||document.documentElement).appendChild(st);
    }
    var s=document.createElement('section');
    s.id='rt-paq-portada';
    s.style.cssText='background:#0d0d10;padding:132px 22px 54px;text-align:center;'+
      'font-family:Montserrat,system-ui,sans-serif';
    s.innerHTML=
      '<span style="display:inline-block;border:1px solid rgba(255,140,3,.55);color:#FF8C03;'+
      'font-size:11.5px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;'+
      'padding:8px 20px;border-radius:999px;margin-bottom:22px">Cat&#225;logo Rea&#241;o</span>'+
      '<h1 style="color:#fff;font-size:clamp(40px,8vw,74px);font-weight:900;font-style:italic;'+
      'letter-spacing:-2px;line-height:1;margin:0 0 16px">PAQUETES</h1>'+
      '<p style="color:#9aa1ab;font-size:16px;line-height:1.6;max-width:560px;margin:0 auto">'+
      'Nacionales e internacionales, armados a tu medida: vuelos, hotel, traslados '+
      'y actividades. Te lo cotizamos sin compromiso.</p>';
    host.insertBefore(s, host.firstChild);
  }

  function run(){ injectCSS(); hideLegacyShell(); markTienda(); markCart(); aliadosYummy(); trasladosYummy(); puentePaquetes(); paquetesPortada(); productPage(); fiftyCard(); paxForm(); }
  if(document.readyState!=='loading')run(); else document.addEventListener('DOMContentLoaded',run);
  [400,1200,2600,4200].forEach(function(d){ setTimeout(run,d); });
  /* La rejilla que pinta la vitrina puede tardar mas de 4,2 s en conexiones
     lentas, y sin reintentos la tarjeta destacada no se insertaba nunca
     (bug de carrera que aparecia segun la velocidad de la conexion).
     Pero reintentar 20 veces a ciegas hacia trabajo inutil durante 14 s en
     TODAS las paginas. Ahora se observan las mutaciones del DOM y se para en
     cuanto el trabajo esta hecho: cero coste cuando no hay nada que hacer. */
  var rtListo = function(){
    var enTienda = (location.pathname.replace(/\/+$/,'')||'/') === '/tienda';
    if(!enTienda) return true;                       /* solo /tienda depende de la rejilla */
    return !!(document.getElementById('rt-puente-paq') && document.getElementById('rt-fifty'));
  };
  if(!rtListo() && window.MutationObserver){
    var rtPend = 0, rtTope;
    var rtObs = new MutationObserver(function(){
      /* CLAVE: sin este freno, run() se ejecutaria en cada mutacion del DOM
         (cientos por segundo mientras Squarespace hidrata) y seria mucho peor
         que el bucle que sustituye. Se agrupa en un solo pase cada 300 ms. */
      if(rtPend) return;
      rtPend = setTimeout(function(){
        rtPend = 0;
        run();
        if(rtListo()){ rtObs.disconnect(); clearTimeout(rtTope); }
      }, 300);
    });
    rtObs.observe(document.documentElement, {childList:true, subtree:true});
    rtTope = setTimeout(function(){ rtObs.disconnect(); }, 20000); /* tope duro */
  }
  window.addEventListener('popstate',function(){ setTimeout(run,120); });
})();
