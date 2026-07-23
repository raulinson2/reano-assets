/* Reano Travels - Subapartado "Paquetes Internacionales" en /tienda (17-jul-2026)
   Inserta una seccion con 3 tarjetas (Euro Maxima, Euro Clasica, Bogota) sobre el
   showcase nacional. Cada tarjeta: foto + "Desde $X" + Cotizar por WhatsApp + Ver
   detalles (modal con itinerario, incluye / no incluye -SIN comidas- y como reservar).
   Patron: CDN + 1 linea de inyeccion. Idempotente, tema claro/oscuro, responsive. */
(function(){
  if(window.__rtIntl) return; window.__rtIntl=1;
  var CDN='https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/';
  var WA='https://wa.me/584247309699?text=';
  /* 22-jul-2026: los paquetes se mudaron de /tienda a su propia pagina /paquetes.
     /tienda queda solo para lo que se compra con carrito; asi no hay contenido
     duplicado entre las dos paginas y cada una tiene un proposito claro. */
  function onTienda(){ var p=(location.pathname.replace(/\/+$/,'')||'/'); return p==='/paquetes'; }

  var PKG=[
    { id:'euro-maxima', tag:'PAQUETE 01', name:'Euro Máxima', sub:'España · Grecia · Turquía',
      nights:'10 noches', img:CDN+'intl-acropolis.jpg', desde:'2.610',
      ruta:'Barcelona 2n · Atenas 3n · Estambul 3n · Madrid 2n',
      hl:['⚽ Camp Nou y Santiago Bernabéu','🏛️ La Acrópolis de Atenas','🕌 Santa Sofía y el Gran Bazar'],
      cities:[
        ['Barcelona','2 noches','El Camp Nou, la Sagrada Familia y el arte de Gaudí.'],
        ['Atenas','3 noches','La Acrópolis y la cuna de la historia occidental.'],
        ['Estambul','3 noches','Santa Sofía, el Gran Bazar y dos continentes en uno.'],
        ['Madrid','2 noches','El Santiago Bernabéu y el corazón español.']
      ],
      inc:['Vuelo internacional ida y vuelta','Hospedaje 10 noches en base doble','Vuelos y tren internos','Traslado en Venezuela (Yummy Rides)','TODAS las actividades: ambos estadios + Acrópolis + Santa Sofía + Gaudí','Seguro internacional + eSIM Holafly','Guía de viaje Reaño + asistencia'] },

    { id:'euro-clasica', tag:'PAQUETE 02', name:'Euro Clásica', sub:'España · Francia · Italia',
      nights:'10 noches', img:CDN+'intl-colosseum.jpg', desde:'2.690',
      ruta:'Barcelona 2n · París 3n · Roma 3n · Madrid 2n',
      hl:['⚽ Camp Nou y Santiago Bernabéu','🗼 Torre Eiffel y el Louvre','🏛️ El Coliseo y el Vaticano'],
      cities:[
        ['Barcelona','2 noches','El Camp Nou y la magia modernista de Gaudí.'],
        ['París','3 noches','La Torre Eiffel, el Louvre y la ciudad del amor.'],
        ['Roma','3 noches','El Coliseo, el Vaticano y la Fontana di Trevi.'],
        ['Madrid','2 noches','El Santiago Bernabéu y las mejores tapas.']
      ],
      inc:['Vuelo internacional ida y vuelta','Hospedaje 10 noches en base doble','Vuelos y tren internos','Traslado en Venezuela (Yummy Rides)','TODAS las actividades: ambos estadios + Louvre + Torre Eiffel + Coliseo + Vaticano','Seguro internacional + eSIM Holafly','Guía de viaje Reaño + asistencia'] },

    { id:'bogota', tag:'PAQUETE 03', name:'Bogotá Shopping & Magia', sub:'Compras, sabor y aventura',
      nights:'4 noches', img:CDN+'intl-bogota.jpg', desde:'640',
      ruta:'Compras · Zipaquirá · Monserrate · Salitre Mágico · Usaquén',
      hl:['🛍️ Día de compras + guía Reaño','⛪ Catedral de Sal de Zipaquirá','🎢 Monserrate y Salitre Mágico'],
      cities:[
        ['Día 1','Llegada','Traslado y primer shopping en Andino / Zona T.'],
        ['Día 2','Compras','Outlets y maquillaje (Blush Bar, Cromantic) con la guía Reaño.'],
        ['Día 3','Zipaquirá','Tour de día completo a la Catedral de Sal.'],
        ['Día 4','Bogotá mágica','Monserrate, Salitre Mágico y Usaquén.'],
        ['Día 5','Salida','Compras finales y traslado al aeropuerto.']
      ],
      inc:['Vuelo ida y vuelta','Hotel 4 noches en base doble','Traslados en Bogotá (Uber)','Entradas: Catedral de Sal + Salitre Mágico + Monserrate','Tour a Zipaquirá','Guía de compras y actividades Reaño','Seguro internacional + eSIM Holafly'] }
  ];
  var NINC=['Comidas','Guía o traductor (opcional)','Gastos personales'];

  function waLink(p){ return WA+encodeURIComponent('Hola Reaño! Quiero cotizar el paquete '+p.name+' ('+p.sub+'). ¿Me pueden dar más info?'); }

  function css(){
    if(document.getElementById('rt-intl-css')) return;
    var s=document.createElement('style'); s.id='rt-intl-css';
    s.textContent=
    '#rt-intl{--o:#F7941E;--o2:#FF7A00;--r:#E85D9A;--r2:#D6336C;--ink:#2b2730;--soft:#8a8390;--card:#fff;--line:#ececf1;--bg:transparent;'
    +'max-width:1200px;margin:34px auto 10px;padding:0 20px;font-family:Montserrat,system-ui,sans-serif;box-sizing:border-box;}'
    +'html.dark #rt-intl{--ink:#f3eef5;--soft:#a79fae;--card:#1b1a1f;--line:#33313a;}'
    +'#rt-intl *{box-sizing:border-box;}'
    +'#rt-intl .ih{text-align:center;margin-bottom:22px;}'
    +'#rt-intl .ih .k{font-size:12px;font-weight:800;letter-spacing:4px;color:var(--r2);text-transform:uppercase;}'
    +'#rt-intl .ih h2{font-size:34px;font-weight:800;color:var(--ink);margin:6px 0 4px;letter-spacing:-.5px;}'
    +'#rt-intl .ih p{font-size:14.5px;color:var(--soft);font-weight:500;}'
    +'#rt-intl .grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;}'
    +'@media(max-width:900px){#rt-intl .grid{grid-template-columns:1fr;max-width:460px;margin:0 auto;}}'
    +'#rt-intl .c{background:var(--card);border:1px solid var(--line);border-radius:18px;overflow:hidden;display:flex;flex-direction:column;box-shadow:0 10px 30px rgba(122,46,82,.08);transition:transform .2s,box-shadow .2s;}'
    +'#rt-intl .c:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(122,46,82,.16);}'
    +'#rt-intl .ph{position:relative;height:180px;}'
    +'#rt-intl .ph img{width:100%;height:100%;object-fit:cover;display:block;}'
    +'#rt-intl .ph .sc{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05),rgba(20,10,20,.66));}'
    +'#rt-intl .ph .ov{position:absolute;left:15px;bottom:11px;color:#fff;}'
    +'#rt-intl .ph .ov .t{font-size:10px;font-weight:800;letter-spacing:2px;opacity:.95;}'
    +'#rt-intl .ph .ov .n{font-size:21px;font-weight:800;line-height:1.05;}'
    +'#rt-intl .ph .ov .s{font-size:12px;font-weight:600;opacity:.95;}'
    +'#rt-intl .ph .bg{position:absolute;right:12px;top:12px;background:linear-gradient(135deg,#FF8A1E,#E85D9A);color:#fff;border-radius:11px;padding:6px 11px;text-align:center;box-shadow:0 6px 16px rgba(232,93,154,.4);}'
    +'#rt-intl .ph .bg em{display:block;font-size:8px;font-weight:800;letter-spacing:1.5px;font-style:normal;opacity:.95;}'
    +'#rt-intl .ph .bg b{display:block;font-size:20px;font-weight:800;line-height:1;}'
    +'#rt-intl .ph .bg i{font-size:7.5px;font-style:normal;opacity:.95;}'
    +'#rt-intl .cb{padding:14px 16px 16px;display:flex;flex-direction:column;flex:1;}'
    +'#rt-intl .rt{font-size:11.5px;font-weight:700;color:var(--r2);background:rgba(232,93,154,.09);border-radius:20px;padding:6px 10px;text-align:center;margin-bottom:11px;}'
    +'#rt-intl .hl{list-style:none;padding:0;margin:0 0 14px;}'
    +'#rt-intl .hl li{font-size:13px;color:var(--ink);padding:4px 0;border-bottom:1px dashed var(--line);}'
    +'#rt-intl .btns{margin-top:auto;display:flex;gap:8px;}'
    +'#rt-intl .wa{flex:1;background:linear-gradient(135deg,#25D366,#128C7E);color:#fff;font-size:13px;font-weight:800;border-radius:30px;padding:11px;text-align:center;text-decoration:none;border:none;cursor:pointer;}'
    +'#rt-intl .det{background:transparent;border:1.5px solid var(--o);color:var(--o2);font-size:13px;font-weight:800;border-radius:30px;padding:11px 15px;cursor:pointer;white-space:nowrap;}'
    +'#rt-intl .note{text-align:center;font-size:12px;color:var(--soft);margin-top:16px;}'
    +'#rt-intl .note b{color:var(--o2);}'
    // modal
    +'#rt-intl-modal{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:18px;background:rgba(20,10,20,.62);backdrop-filter:blur(3px);font-family:Montserrat,system-ui,sans-serif;}'
    +'#rt-intl-modal.on{display:flex;}'
    +'#rt-intl-modal .mc{background:var(--mc,#fff);color:var(--mi,#2b2730);width:100%;max-width:640px;max-height:88vh;overflow-y:auto;border-radius:20px;position:relative;box-shadow:0 30px 80px rgba(0,0,0,.4);}'
    +'html.dark #rt-intl-modal .mc{--mc:#1b1a1f;--mi:#f3eef5;}'
    +'#rt-intl-modal .mh{position:relative;height:150px;}'
    +'#rt-intl-modal .mh img{width:100%;height:100%;object-fit:cover;}'
    +'#rt-intl-modal .mh .sc{position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.1),rgba(20,10,20,.7));}'
    +'#rt-intl-modal .mh .tt{position:absolute;left:20px;bottom:14px;color:#fff;}'
    +'#rt-intl-modal .mh .tt .n{font-size:24px;font-weight:800;line-height:1.05;}'
    +'#rt-intl-modal .mh .tt .s{font-size:13px;font-weight:600;opacity:.95;}'
    +'#rt-intl-modal .mh .bg{position:absolute;right:16px;top:14px;background:linear-gradient(135deg,#FF8A1E,#E85D9A);color:#fff;border-radius:12px;padding:7px 13px;text-align:center;}'
    +'#rt-intl-modal .mh .bg em{display:block;font-size:8px;font-weight:800;letter-spacing:1.5px;font-style:normal;}'
    +'#rt-intl-modal .mh .bg b{display:block;font-size:22px;font-weight:800;line-height:1;}'
    +'#rt-intl-modal .mh .bg i{font-size:7.5px;font-style:normal;}'
    +'#rt-intl-modal .x{position:absolute;right:12px;top:12px;width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.92);border:none;font-size:20px;cursor:pointer;color:#333;line-height:1;}'
    +'#rt-intl-modal .mb{padding:18px 22px 22px;}'
    +'#rt-intl-modal .mb .rt{font-size:12.5px;font-weight:800;color:var(--r2);text-align:center;background:rgba(232,93,154,.1);border-radius:22px;padding:8px;margin-bottom:16px;}'
    +'#rt-intl-modal h4{font-size:14px;font-weight:800;color:var(--o2);margin:16px 0 8px;}'
    +'#rt-intl-modal .city{display:flex;gap:10px;padding:8px 0;border-bottom:1px solid var(--line,#eee);}'
    +'html.dark #rt-intl-modal .city{border-color:#33313a;}'
    +'#rt-intl-modal .city .cn{min-width:92px;font-weight:800;font-size:13px;}'
    +'#rt-intl-modal .city .cn small{display:block;font-weight:600;color:var(--soft,#8a8390);font-size:10.5px;}'
    +'#rt-intl-modal .city .cd{font-size:12.5px;line-height:1.4;flex:1;}'
    +'#rt-intl-modal ul.inc{list-style:none;padding:0;margin:0;}'
    +'#rt-intl-modal ul.inc li{font-size:12.5px;padding:4px 0 4px 22px;position:relative;line-height:1.4;}'
    +'#rt-intl-modal ul.inc li:before{content:"✓";position:absolute;left:0;color:#2fbf62;font-weight:800;}'
    +'#rt-intl-modal ul.ninc li:before{content:"✕";color:#d6336c;}'
    +'#rt-intl-modal .pay{background:linear-gradient(120deg,rgba(247,148,30,.1),rgba(232,93,154,.1));border-radius:14px;padding:12px 15px;margin-top:16px;font-size:12.5px;line-height:1.5;}'
    +'#rt-intl-modal .pay b{color:var(--r2);}'
    +'#rt-intl-modal .mwa{display:block;margin-top:16px;background:linear-gradient(135deg,#25D366,#128C7E);color:#fff;font-size:15px;font-weight:800;border-radius:30px;padding:13px;text-align:center;text-decoration:none;}';
    document.head.appendChild(s);
  }

  function esc(t){ return (t+'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }

  function buildSection(){
    var sec=document.createElement('section'); sec.id='rt-intl';
    var h='<div class="ih"><div class="k">✈️ Reaño Travels</div><h2>Paquetes Internacionales</h2>'
      +'<p>Europa &amp; Colombia · a tu medida · precio por persona en base doble</p></div><div class="grid">';
    PKG.forEach(function(p){
      h+='<div class="c"><div class="ph"><img src="'+p.img+'" alt="'+esc(p.name)+'"><div class="sc"></div>'
        +'<div class="ov"><div class="t">'+p.tag+' · '+p.nights.toUpperCase()+'</div><div class="n">'+esc(p.name)+'</div><div class="s">'+esc(p.sub)+'</div></div>'
        +'<div class="bg"><em>DESDE</em><b>$'+p.desde+'</b><i>por persona</i></div></div>'
        +'<div class="cb"><div class="rt">'+esc(p.ruta)+'</div><ul class="hl">';
      p.hl.forEach(function(x){ h+='<li>'+x+'</li>'; });
      h+='</ul><div class="btns"><a class="wa" href="'+waLink(p)+'" target="_blank" rel="noopener">Cotizar por WhatsApp</a>'
        +'<button class="det" data-pkg="'+p.id+'">Ver detalles</button></div></div></div>';
    });
    h+='</div><div class="note">Reserva con <b>50% inicial + cuotas</b>, contrato por WhatsApp · salidas a la medida · <b>Reaño reserva todo</b> (las comidas no se incluyen).</div>';
    sec.innerHTML=h;
    sec.addEventListener('click',function(e){
      var b=e.target.closest && e.target.closest('.det'); if(b) openModal(b.getAttribute('data-pkg'));
    });
    return sec;
  }

  function openModal(id){
    var p=null; PKG.forEach(function(x){ if(x.id===id) p=x; }); if(!p) return;
    var m=document.getElementById('rt-intl-modal');
    if(!m){ m=document.createElement('div'); m.id='rt-intl-modal'; document.body.appendChild(m);
      m.addEventListener('click',function(e){ if(e.target===m||e.target.classList.contains('x')) m.classList.remove('on'); }); }
    var isBog=(p.id==='bogota');
    var h='<div class="mc"><button class="x" aria-label="Cerrar">×</button><div class="mh"><img src="'+p.img+'"><div class="sc"></div>'
      +'<div class="tt"><div class="n">'+esc(p.name)+'</div><div class="s">'+esc(p.sub)+' · '+p.nights+'</div></div>'
      +'<div class="bg"><em>DESDE</em><b>$'+p.desde+'</b><i>por persona</i></div></div><div class="mb">'
      +'<div class="rt">'+esc(p.ruta)+'</div>'
      +'<h4>'+(isBog?'Itinerario día a día':'Tu recorrido')+'</h4>';
    p.cities.forEach(function(c){ h+='<div class="city"><div class="cn">'+esc(c[0])+'<small>'+esc(c[1])+'</small></div><div class="cd">'+esc(c[2])+'</div></div>'; });
    h+='<h4>Qué incluye</h4><ul class="inc">'; p.inc.forEach(function(x){ h+='<li>'+esc(x)+'</li>'; });
    h+='</ul><h4>No incluye</h4><ul class="inc ninc">'; NINC.forEach(function(x){ h+='<li>'+esc(x)+'</li>'; });
    h+='</ul><div class="pay"><b>Cómo reservar:</b> aparta con el <b>50% inicial</b> y el resto en cuotas cómodas; cerramos el contrato por WhatsApp (sin PayPal). Precio por persona en <b>base doble</b>, salidas a la medida. El valor final se confirma al cotizar según tus fechas.</div>'
      +'<a class="mwa" href="'+waLink(p)+'" target="_blank" rel="noopener">💬 Cotizar '+esc(p.name)+' por WhatsApp</a></div></div>';
    m.innerHTML=h; m.classList.add('on');
  }

  function scrollToIntl(){
    var s=document.getElementById('rt-intl'); if(!s) return false;
    // El sitio tiene scroll-behavior:smooth global que anula un scroll programatico -> forzar auto y restaurar.
    var de=document.documentElement, prev=de.style.scrollBehavior;
    de.style.scrollBehavior='auto';
    window.scrollTo(0, s.getBoundingClientRect().top+window.scrollY-70);
    de.style.scrollBehavior=prev;
    return true;
  }
  function tryScroll(n){ if(scrollToIntl()) return; if(n>0) setTimeout(function(){ tryScroll(n-1); }, 300); }
  // Al llegar por el hash: reafirma el scroll varias veces hasta que la seccion quede arriba
  // (Squarespace reacomoda el layout al cargar y pierde un scroll unico).
  function hashScroll(){
    if(!(onTienda() && location.hash==='#paquetes-internacionales')) return;
    var n=0;
    (function go(){ n++;
      var s=document.getElementById('rt-intl');
      if(s){ var top=s.getBoundingClientRect().top;
        if(Math.abs(top-70)>45) scrollToIntl(false);
        if(n<9) setTimeout(go, 450);
      } else if(n<25){ setTimeout(go, 300); }
    })();
  }

  var HERO_INTL='https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/intl-acropolis.jpg';
  // Mata cualquier enlace "Internacional" que una version vieja (cacheada) haya metido en el header.
  function killNavLink(){
    var sh=document.getElementById('rt2-header');
    var root=sh && sh.shadowRoot; if(!root) return;
    root.querySelectorAll('a[data-rtintl]').forEach(function(a){ a.remove(); });
  }
  // En el HOME, clona la tarjeta ancha de "Servicios Destacados" para "Paquetes Internacionales"
  // que lleva a /tienda#paquetes-internacionales. Idempotente. NO toca el header.
  function homeCard(){
    if((location.pathname.replace(/\/+$/,'')||'/')!=='/') return;
    var src=null;
    // Acotado: solo las tarjetas col-span-12 dentro de #sections, no todos los divs
    // del documento (esto corria en cada mutacion y disparaba el jank del home).
    var scope=document.getElementById('sections')||document;
    scope.querySelectorAll('[class*="col-span-12"]').forEach(function(el){
      if(!src && /Experiencias y Eventos/.test(el.textContent) && el.textContent.length<420) src=el;
    });
    if(!src) return;
    var grid=src.parentElement; if(!grid) return;
    if(grid.querySelector('[data-rtintlcard]')) return;
    var c=src.cloneNode(true);
    c.setAttribute('data-rtintlcard','1');
    var title=null; c.querySelectorAll('h1,h2,h3').forEach(function(x){ if(/Experiencias y Eventos/.test(x.textContent)) title=x; });
    if(title) title.textContent='Paquetes Internacionales';
    var desc=null; c.querySelectorAll('p').forEach(function(x){ if(/Especialistas en paquetes/.test(x.textContent)) desc=x; });
    if(desc) desc.textContent='Europa y Colombia a tu medida: vuelos, hotel, traslados y todas las actividades. Nosotros lo armamos todo, tú disfrutas.';
    c.querySelectorAll('*').forEach(function(el){ if(el.children.length===0){ var t=(el.textContent||'').trim();
      if(t==='Eventos') el.textContent='Europa'; else if(t==='Paquetes') el.textContent='Colombia'; } });
    var big=c.querySelector('.glass-orange .material-symbols-outlined'); if(big) big.textContent='public';
    var cta=null; c.querySelectorAll('a').forEach(function(a){ if(/Ver Paquetes/i.test(a.textContent)) cta=a; });
    if(cta){ cta.setAttribute('href','/paquetes');
      var ci=cta.querySelector('.material-symbols-outlined'); if(ci) ci.textContent='arrow_forward'; }
    var bg=c.querySelector('[class*="bg-cover"]');
    if(bg){ var st=(bg.getAttribute('style')||'').replace(/background-image\s*:\s*url\([^)]*\)\s*;?/i,'');
      bg.setAttribute('style', "background-image:url('"+HERO_INTL+"');"+st); }
    grid.appendChild(c);
  }

  function mount(){
    killNavLink();
    homeCard();
    if(!onTienda()){ var old=document.getElementById('rt-intl'); if(old) old.remove(); return; }
    if(document.getElementById('rt-intl')) return;
    css();
    var sec=buildSection();
    var anchor=document.getElementById('rt-paquetes-showcase');
    if(anchor && anchor.parentNode){ anchor.parentNode.insertBefore(sec, anchor); return; }
    var host=document.querySelector('#sections')||document.querySelector('main')||document.querySelector('article')||document.body;
    if(host.id==='sections'||host.tagName==='MAIN'||host.tagName==='ARTICLE'){ host.insertBefore(sec, host.firstChild); }
    else host.appendChild(sec);
  }

  if(document.readyState!=='loading') mount(); else document.addEventListener('DOMContentLoaded', mount);

  // ¿Ya no queda nada por montar? En home: la tarjeta clonada existe. En /paquetes:
  // la seccion #rt-intl existe. En cualquier otra ruta: nada que hacer.
  function settled(){
    var p=(location.pathname.replace(/\/+$/,'')||'/');
    if(p==='/') return !!document.querySelector('[data-rtintlcard]');
    if(onTienda()) return !!document.getElementById('rt-intl');
    return true;
  }
  // Observer con debounce (un solo pase por rafaga) que se DESCONECTA al terminar.
  // Antes disparaba mount() en cada mutacion durante la hidratacion de Squarespace
  // -> escaneaba el home sin parar: era la causa principal del jank/lentitud.
  var moPend=0, moStop;
  var mo=new MutationObserver(function(){
    if(moPend) return;
    moPend=setTimeout(function(){
      moPend=0; mount();
      if(settled()){ mo.disconnect(); clearTimeout(moStop); }
    }, 300);
  });
  if(!settled()){
    mo.observe(document.documentElement,{childList:true,subtree:true});
    moStop=setTimeout(function(){ mo.disconnect(); }, 20000); // tope duro de seguridad
  }
  window.addEventListener('popstate', function(){ setTimeout(function(){ mount(); hashScroll(); }, 80); });
  window.addEventListener('hashchange', hashScroll);
  setTimeout(function(){ mount(); hashScroll(); }, 600);
  setTimeout(function(){ mount(); hashScroll(); }, 1600);
  setTimeout(function(){ killNavLink(); homeCard(); }, 3000);
})();
