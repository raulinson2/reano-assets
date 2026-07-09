/* Reano Travels - UI fixes v2 (SIN header propio; solo CSS estable + carrito) */
(function(){
  if(window.__rtUI2) return; window.__rtUI2=1;
  var WA='https://wa.me/584247309699?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20paquetes%20de%20viaje';

  var CSS = `
  /* ===== HEADER: márgenes (el header nativo full-width recibe márgenes tipo max-width 1200) ===== */
  .rt-nav{padding-left:max(20px,calc((100% - 1200px)/2)) !important;padding-right:max(20px,calc((100% - 1200px)/2)) !important}
  /* declutter (solo CSS, la inyección no lo deshace): quitar "Inicio" (el logo ya va a inicio) y "Servicios" */
  .rt-nav a[href="/"]:not(:has(img)):not(:has(svg)),
  header.fixed a[href="/"]:not(:has(img)):not(:has(svg)){display:none !important}
  .rt-nav a[href="/servicios"], header.fixed a[href="/servicios"]{display:none !important}

  /* ===== FOOTER: enlaces de columna en bloque (arregla TiendaHoteles / VuelosMundial pegados) ===== */
  .rt-footer a.rt-fblock{display:block !important;margin:0 0 9px !important}

  /* ===== TIENDA: fondo sutil detrás del showcase ===== */
  body.rt-tienda #sections{position:relative}
  #rt-tienda-bg{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
  #rt-tienda-bg::before{content:"";position:absolute;inset:0;
    background:url('https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/losroques.jpg') center 22%/cover no-repeat;
    opacity:.16;filter:saturate(1.05)}
  #rt-tienda-bg::after{content:"";position:absolute;inset:0;
    background:radial-gradient(1200px 520px at 50% 4%,rgba(255,140,3,.14),transparent 62%)}
  html:not(.dark) #rt-tienda-bg::before{opacity:.22}
  body.rt-tienda #sections > *{position:relative;z-index:1}

  /* ===== CARRITO: estado vacío premium ===== */
  body.rt-cart-empty .rt-cart-hero, body.rt-cart-empty .rt-cart-extra, body.rt-cart-empty .rt-cart-card{display:none !important}
  body.rt-cart-empty .empty-message{display:none !important}
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
    if(document.getElementById('rt-ui-css'))return;
    var st=document.createElement('style');st.id='rt-ui-css';st.textContent=CSS;
    (document.head||document.documentElement).appendChild(st);
  }

  function fixFooter(){
    var links=document.querySelectorAll('.rt-footer a');
    for(var i=0;i<links.length;i++){var a=links[i];
      if(a.querySelector('svg,img')) continue;
      if(a.classList.contains('rt-fblock')) continue;
      var t=(a.textContent||'').trim();
      if(!t || t.length>26) continue;
      a.classList.add('rt-fblock');
    }
  }

  function markTienda(){
    if((location.pathname.replace(/\/+$/,'')||'/')!=='/tienda')return;
    document.body.classList.add('rt-tienda');
    var host=document.querySelector('#sections');
    if(host && !document.getElementById('rt-tienda-bg')){
      var bg=document.createElement('div');bg.id='rt-tienda-bg';host.insertBefore(bg,host.firstChild);
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
    var emptyMsg=/no tienes nada|carrito.*vac|your cart is empty/i.test(document.body.innerText);
    if(rows.length===0 || emptyMsg){ document.body.classList.add('rt-cart-empty'); buildEmptyCart(); }
    else { document.body.classList.remove('rt-cart-empty'); }
  }

  function run(){ injectCSS(); fixFooter(); markTienda(); markCart(); }
  if(document.readyState!=='loading')run(); else document.addEventListener('DOMContentLoaded',run);
  [400,1200,2600].forEach(function(d){ setTimeout(run,d); });
  window.addEventListener('popstate',function(){ setTimeout(run,120); });
})();
