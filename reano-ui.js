/* Reano Travels - UI unificada (header consistente + footer + carrito + fondo tienda) v1 */
(function(){
  if(window.__rtUI) return; window.__rtUI=1;

  var LOGO_L='https://images.squarespace-cdn.com/content/v1/6a343e736c91f8368b93927a/20171e5f-12b9-4cf2-a722-3a5caac2d54f/LOGO+REA%C3%91O+ORIGINAL.png';
  var LOGO_D='https://i.ibb.co/4nXHm9QG/LOGO-REA-O-LETRAS-BLANCAS.png';
  var WA='https://wa.me/584247309699?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20paquetes%20de%20viaje';
  var MENU=[
    {t:'Vuelos',h:'/estado-aerolineas'},
    {t:'Hoteles',h:'/hoteles'},
    {t:'Tienda',h:'/tienda'},
    {t:'Conciertos',h:'/conciertos'},
    {t:'Mundial 2026',h:'/mundial-2026'},
    {t:'Nosotros',h:'/nosotros'},
    {t:'Contacto',h:'/contacto'}
  ];

  var CSS = `
  /* hide legacy headers */
  .rt-nav, .rt-herowrap, header.fixed:not(#rt-uni-header){display:none !important}
  /* unified header */
  #rt-uni-header{position:fixed;top:0;left:0;right:0;z-index:9000;
    background:rgba(255,255,255,.85);backdrop-filter:saturate(180%) blur(14px);-webkit-backdrop-filter:saturate(180%) blur(14px);
    border-bottom:1px solid rgba(0,0,0,.07);font-family:'Montserrat',system-ui,-apple-system,sans-serif;
    transition:background .3s,border-color .3s}
  html.dark #rt-uni-header{background:rgba(13,18,23,.8);border-bottom-color:rgba(255,255,255,.09)}
  #rt-uni-header *{box-sizing:border-box}
  .rt-uni-inner{max-width:1200px;margin:0 auto;height:66px;padding:0 24px;display:flex;align-items:center;justify-content:space-between;gap:18px}
  .rt-uni-logo{display:flex;align-items:center;flex:none;text-decoration:none}
  .rt-uni-logo img{height:36px;width:auto;display:block}
  .rt-uni-logo-d{display:none}
  html.dark .rt-uni-logo-l{display:none}
  html.dark .rt-uni-logo-d{display:block}
  .rt-uni-menu{display:flex;align-items:center;gap:2px;flex:1;justify-content:center;min-width:0}
  .rt-uni-link{font-size:14px;font-weight:600;color:#3d372f;text-decoration:none;padding:8px 13px;border-radius:9px;white-space:nowrap;transition:color .18s,background .18s}
  html.dark .rt-uni-link{color:#c9d2da}
  .rt-uni-link:hover{color:#FF8C03;background:rgba(255,140,3,.09)}
  .rt-uni-link.rt-uni-active{color:#FF8C03;background:rgba(255,140,3,.10)}
  .rt-uni-actions{display:flex;align-items:center;gap:12px;flex:none}
  .rt-uni-tg{background:none;border:0;cursor:pointer;padding:6px;display:inline-flex;align-items:center;justify-content:center;color:#25201b;border-radius:999px;transition:background .2s}
  html.dark .rt-uni-tg{color:#eef3f7}
  .rt-uni-tg:hover{background:rgba(0,0,0,.05)}
  html.dark .rt-uni-tg:hover{background:rgba(255,255,255,.08)}
  .rt-uni-tg svg{width:21px;height:21px;display:block}
  .rt-uni-tg .rt-uni-sun{display:none}
  html.dark .rt-uni-tg .rt-uni-sun{display:block}
  html.dark .rt-uni-tg .rt-uni-moon{display:none}
  .rt-uni-cart{position:relative;display:inline-flex;color:#25201b;text-decoration:none}
  html.dark .rt-uni-cart{color:#eef3f7}
  .rt-uni-cart svg{width:22px;height:22px;display:block}
  .rt-uni-cart-n{position:absolute;top:-7px;right:-8px;background:#FF8C03;color:#fff;font-size:10px;font-weight:800;min-width:16px;height:16px;line-height:16px;text-align:center;border-radius:999px;padding:0 3px}
  .rt-uni-cta{background:linear-gradient(135deg,#25D366,#1ebe5a);color:#fff;font-weight:700;font-size:13px;text-decoration:none;padding:9px 17px;border-radius:999px;white-space:nowrap;box-shadow:0 6px 16px -9px rgba(37,211,102,.7);transition:filter .2s,transform .15s}
  .rt-uni-cta:hover{filter:brightness(1.05)}
  .rt-uni-cta:active{transform:scale(.97)}
  .rt-uni-burger{display:none;background:none;border:0;cursor:pointer;flex-direction:column;gap:5px;padding:6px}
  .rt-uni-burger span{width:22px;height:2px;background:#25201b;border-radius:2px;transition:.25s}
  html.dark .rt-uni-burger span{background:#eef3f7}
  #rt-uni-header.open .rt-uni-burger span:nth-child(1){transform:translateY(7px) rotate(45deg)}
  #rt-uni-header.open .rt-uni-burger span:nth-child(2){opacity:0}
  #rt-uni-header.open .rt-uni-burger span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
  .rt-uni-mobile{display:none;flex-direction:column;padding:6px 24px 18px;background:rgba(255,255,255,.97);border-bottom:1px solid rgba(0,0,0,.07)}
  html.dark .rt-uni-mobile{background:rgba(13,18,23,.98);border-bottom-color:rgba(255,255,255,.09)}
  #rt-uni-header.open .rt-uni-mobile{display:flex}
  .rt-uni-mobile a{padding:12px 4px;font-weight:600;font-size:15px;color:#3d372f;text-decoration:none;border-bottom:1px solid rgba(0,0,0,.06)}
  html.dark .rt-uni-mobile a{color:#c9d2da;border-bottom-color:rgba(255,255,255,.07)}
  .rt-uni-mobile a.rt-uni-cta-m{margin-top:12px;text-align:center;background:linear-gradient(135deg,#25D366,#1ebe5a);color:#fff;border:0;border-radius:999px;padding:13px}
  @media(max-width:1000px){
    .rt-uni-menu{display:none}
    .rt-uni-burger{display:flex}
    .rt-uni-cta{display:none}
    .rt-uni-inner{height:60px}
  }

  /* ===== FOOTER: enlaces de columnas en bloque (arregla TiendaHoteles / Vuelos-Mundial) ===== */
  .rt-footer a.rt-uni-fblock{display:block !important;margin:0 0 9px !important}

  /* ===== TIENDA: fondo con imagen sutil detrás del showcase ===== */
  body.rt-tienda #sections{position:relative}
  #rt-tienda-bg{position:absolute;inset:0;z-index:0;pointer-events:none;overflow:hidden}
  #rt-tienda-bg::before{content:"";position:absolute;inset:0;
    background:url('https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/losroques.jpg') center 22%/cover no-repeat fixed;
    opacity:.17;filter:saturate(1.05)}
  #rt-tienda-bg::after{content:"";position:absolute;inset:0;
    background:linear-gradient(180deg,rgba(0,0,0,.0),transparent 55%,rgba(0,0,0,.0)),radial-gradient(1200px 520px at 50% 4%,rgba(255,140,3,.15),transparent 62%)}
  html:not(.dark) #rt-tienda-bg::before{opacity:.24}
  body.rt-tienda #sections > *{position:relative;z-index:1}

  /* ===== CARRITO: ocultar bloques de pago cuando está vacío + centrar vacío ===== */
  body.rt-cart-empty .rt-cart-hero, body.rt-cart-empty .rt-cart-extra, body.rt-cart-empty .rt-cart-card{display:none !important}
  `;

  function injectCSS(){
    if(document.getElementById('rt-ui-css'))return;
    var st=document.createElement('style');st.id='rt-ui-css';st.textContent=CSS;
    (document.head||document.documentElement).appendChild(st);
  }

  var SUN='<svg class="rt-uni-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  var MOON='<svg class="rt-uni-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>';
  var CART='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6"/></svg>';

  function toggleTheme(){
    var h=document.documentElement, dark=!h.classList.contains('dark');
    h.classList.toggle('dark',dark);
    h.setAttribute('data-theme',dark?'dark':'light');
    try{localStorage.setItem('rt-theme',dark?'dark':'light');localStorage.setItem('reano-theme',dark?'dark':'light');}catch(e){}
  }

  function menuHTML(){
    var cur=(location.pathname.replace(/\/+$/,'')||'/');
    return MENU.map(function(m){var a=(cur===m.h.replace(/\/+$/,''))?' rt-uni-active':'';return '<a class="rt-uni-link'+a+'" href="'+m.h+'">'+m.t+'</a>';}).join('');
  }
  function guardMenu(){
    var h=document.getElementById('rt-uni-header'); if(!h)return;
    var menu=h.querySelector('.rt-uni-menu'); if(!menu)return;
    if(!menu.querySelector('.rt-uni-link')){ menu.innerHTML=menuHTML(); }
  }
  function hideOld(){
    ['.rt-nav','.rt-herowrap','header.fixed'].forEach(function(sel){
      var els=document.querySelectorAll(sel);
      for(var i=0;i<els.length;i++){ if(els[i].id!=='rt-uni-header') els[i].style.setProperty('display','none','important'); }
    });
  }
  function buildHeader(){
    if(document.getElementById('rt-uni-header'))return;
    var links=menuHTML();
    var mlinks=MENU.map(function(m){return '<a href="'+m.h+'">'+m.t+'</a>';}).join('');
    var h=document.createElement('header');
    h.id='rt-uni-header';
    h.innerHTML=''
      +'<div class="rt-uni-inner">'
      +'<a class="rt-uni-logo" href="/"><img class="rt-uni-logo-l" src="'+LOGO_L+'" alt="Reaño Travels & Tours"><img class="rt-uni-logo-d" src="'+LOGO_D+'" alt="Reaño Travels & Tours"></a>'
      +'<div class="rt-uni-menu" role="navigation">'+links+'</div>'
      +'<div class="rt-uni-actions">'
      +'<button class="rt-uni-tg" aria-label="Cambiar tema">'+SUN+MOON+'</button>'
      +'<a class="rt-uni-cart" href="/cart" aria-label="Carrito">'+CART+'<span class="rt-uni-cart-n" style="display:none"></span></a>'
      +'<a class="rt-uni-cta" href="'+WA+'" target="_blank" rel="noopener">Cotizar</a>'
      +'<button class="rt-uni-burger" aria-label="Menú"><span></span><span></span><span></span></button>'
      +'</div></div>'
      +'<div class="rt-uni-mobile">'+mlinks+'<a class="rt-uni-cta-m" href="'+WA+'" target="_blank" rel="noopener">Cotizar Ahora</a></div>';
    document.body.insertBefore(h, document.body.firstChild);
    h.querySelector('.rt-uni-tg').addEventListener('click',toggleTheme);
    h.querySelector('.rt-uni-burger').addEventListener('click',function(){h.classList.toggle('open');});
    [].slice.call(h.querySelectorAll('.rt-uni-mobile a')).forEach(function(a){a.addEventListener('click',function(){h.classList.remove('open');});});
    updateCart(h);
  }
  function updateCart(h){
    h=h||document.getElementById('rt-uni-header'); if(!h)return;
    var q=document.querySelector('.sqs-cart-quantity');
    var n=q?parseInt((q.textContent||'0').trim(),10):0;
    var el=h.querySelector('.rt-uni-cart-n');
    if(el){ if(n>0){el.textContent=n;el.style.display='';}else{el.style.display='none';} }
  }

  function fixFooter(){
    var links=document.querySelectorAll('.rt-footer a');
    for(var i=0;i<links.length;i++){var a=links[i];
      if(a.querySelector('svg,img')) continue;              // saltar iconos/social/botones
      if(a.classList.contains('rt-uni-fblock')) continue;
      var t=(a.textContent||'').trim();
      if(!t || t.length>26) continue;                        // solo enlaces cortos de columna
      a.classList.add('rt-uni-fblock');
    }
  }

  function markTienda(){
    var p=(location.pathname.replace(/\/+$/,'')||'/');
    if(p==='/tienda'){
      document.body.classList.add('rt-tienda');
      var host=document.querySelector('#sections');
      if(host && !document.getElementById('rt-tienda-bg')){
        var bg=document.createElement('div');bg.id='rt-tienda-bg';host.insertBefore(bg,host.firstChild);
      }
    }
  }
  function markCart(){
    var p=(location.pathname.replace(/\/+$/,'')||'/');
    if(p==='/cart'){
      // vacío si no hay filas de items
      var rows=document.querySelectorAll('.cart-row, .cart-item, [data-cart-row]');
      var emptyMsg=/no tienes nada|carrito.*vac|your cart is empty/i.test(document.body.innerText);
      if(rows.length===0 || emptyMsg){ document.body.classList.add('rt-cart-empty'); }
      else { document.body.classList.remove('rt-cart-empty'); }
    }
  }

  function run(){ injectCSS(); buildHeader(); guardMenu(); hideOld(); fixFooter(); markTienda(); markCart(); updateCart(); }
  if(document.readyState!=='loading')run(); else document.addEventListener('DOMContentLoaded',run);
  var mo=new MutationObserver(function(){ run(); });
  try{mo.observe(document.documentElement,{childList:true,subtree:true});}catch(e){}
  window.addEventListener('popstate',function(){setTimeout(run,80);});
})();
