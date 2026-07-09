/* Reano Travels - Actualizacion aerolineas 9-jul-2026 (auto-inject en /estado-aerolineas) v1 */
(function(){
  if(window.__rtAuLoaded)return; window.__rtAuLoaded=1;

  var CSS = `
  .rt-au{--brand:#FF8C03;--card:#ffffff;--text:#191512;--muted:#6b645c;--line:rgba(0,0,0,.10);--soft:rgba(0,0,0,.03);
    --op:#16a34a;--ca:#dc2626;--rp:#d97706;--rt:#2563eb;--na:#0891b2;
    max-width:1120px;margin:0 auto 8px !important;padding:8px 20px 4px;
    font-family:'Montserrat',system-ui,-apple-system,sans-serif;color:var(--text);box-sizing:border-box}
  html.dark .rt-au{--card:#171f27;--text:#eef3f7;--muted:#9aa6b2;--line:rgba(255,255,255,.12);--soft:rgba(255,255,255,.03)}
  .rt-au *{box-sizing:border-box}
  .rt-au-head{display:flex;flex-wrap:wrap;align-items:center;gap:12px;margin:0 0 6px}
  .rt-au-kick{display:inline-flex;align-items:center;gap:7px;background:linear-gradient(135deg,var(--brand),#E67A00);color:#fff;
    font-size:12px;font-weight:800;letter-spacing:.04em;padding:6px 14px;border-radius:999px}
  .rt-au-head h2{font-size:clamp(19px,2.4vw,26px);font-weight:900;margin:0;letter-spacing:-.01em}
  .rt-au-sub{font-size:13.5px;line-height:1.55;color:var(--muted);margin:0 0 16px;max-width:760px}
  .rt-au-sub b{color:var(--text)}
  .rt-au-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:14px}
  @media(max-width:760px){.rt-au-grid{grid-template-columns:1fr}}
  .rt-au-card{background:var(--card);border:1px solid var(--line);
    border-radius:14px;padding:15px 16px;box-shadow:0 6px 20px -14px rgba(20,15,10,.5);
    opacity:0;transform:translateY(14px);transition:transform .5s cubic-bezier(.16,1,.3,1),opacity .5s ease,box-shadow .3s}
  .rt-au-card.in{opacity:1;transform:none}
  .rt-au-card:hover{box-shadow:0 12px 28px -14px rgba(20,15,10,.6)}
  .rt-au-c-op{--ac:var(--op)}.rt-au-c-ca{--ac:var(--ca)}.rt-au-c-rp{--ac:var(--rp)}.rt-au-c-rt{--ac:var(--rt)}.rt-au-c-na{--ac:var(--na)}
  .rt-au-top{display:flex;align-items:flex-start;justify-content:space-between;gap:10px;margin-bottom:8px}
  .rt-au-name{font-size:16px;font-weight:800;letter-spacing:-.01em;margin:0}
  .rt-au-name::before{content:"";display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--ac,var(--brand));margin-right:9px;vertical-align:middle;transform:translateY(-1px)}
  .rt-au-pill{flex:none;font-size:10.5px;font-weight:800;letter-spacing:.03em;text-transform:uppercase;
    color:#fff;background:var(--ac,var(--brand));padding:4px 9px;border-radius:999px;white-space:nowrap}
  .rt-au-chips{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:9px}
  .rt-au-chip{display:inline-flex;align-items:center;gap:5px;font-size:11px;font-weight:700;color:var(--muted);
    background:var(--soft);border:1px solid var(--line);padding:3px 9px;border-radius:8px}
  .rt-au-sum{font-size:13px;line-height:1.5;color:var(--muted);margin:0 0 10px}
  .rt-au-more{display:inline-flex;align-items:center;gap:6px;background:transparent;border:1px solid var(--line);
    color:var(--text);font-family:inherit;font-weight:700;font-size:12px;padding:7px 12px;border-radius:9px;cursor:pointer;transition:border-color .2s,color .2s}
  .rt-au-more:hover{border-color:var(--ac,var(--brand));color:var(--ac,var(--brand))}
  .rt-au-more svg{width:13px;height:13px;transition:transform .3s}
  .rt-au-more.open svg{transform:rotate(180deg)}
  .rt-au-det{display:grid;grid-template-rows:0fr;transition:grid-template-rows .45s cubic-bezier(.16,1,.3,1)}
  .rt-au-det.open{grid-template-rows:1fr}
  .rt-au-det-in{overflow:hidden;min-height:0}
  .rt-au-det-pad{padding-top:12px;margin-top:12px;border-top:1px dashed var(--line)}
  .rt-au-det h5{font-size:11.5px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;color:var(--ac,var(--brand));margin:10px 0 4px}
  .rt-au-det h5:first-child{margin-top:0}
  .rt-au-det p{font-size:12.5px;line-height:1.55;color:var(--muted);margin:0 0 4px}
  .rt-au-det p.mut{font-style:italic;opacity:.85}
  .rt-au-det a{color:var(--brand);font-weight:700;text-decoration:none}
  .rt-au-foot{font-size:12px;color:var(--muted);margin:16px 0 4px;text-align:center}
  .rt-au-foot b{color:var(--text)}
  `;

  var A=[
    {n:"Plus Ultra", s:"Operando", c:"op", ch:["✈️ Valencia (VLN)","Hasta 26-jul"],
     sum:"Opera hacia/desde España vía Valencia (VLN). Madrid y Tenerife Norte.",
     d:`<h5>Madrid &harr; Valencia</h5><p>Lun/Mar/Jue: MAD 13:00 &rarr; VLN 16:30 &middot; VLN 19:00 &rarr; MAD 09:55 (+1)<br>Sáb: MAD 13:00 &rarr; VLN 16:30 &middot; Dom: VLN 19:00 &rarr; MAD 09:55 (+1)</p>
        <h5>Tenerife Norte &harr; Valencia</h5><p>Sáb: VLN 20:30 &rarr; TNF 08:50 (+1) &middot; Dom: TNF 12:20 &rarr; VLN 14:55</p>
        <p class="mut">Horarios en hora local. Esperando info de reapertura de Caracas. Tarifas en GDS y plusultra.com.</p>`},

    {n:"Air Europa", s:"Operando", c:"op", ch:["✈️ Valencia (VLN)","9–31 jul"],
     sum:"Opera Madrid vía Valencia (VLN) del 9 al 31-jul (excepto 10-jul, con CCS cancelado ese día).",
     d:`<h5>Frecuencias</h5><p><b>UX071 MAD&rarr;VLN:</b> 09, 11, 12, 14, 16, 17, 18, 19, 21, 24, 25, 26 y 31 jul.<br><b>UX072 VLN&rarr;MAD:</b> 09, 11, 12, 14, 16, 17, 18, 19, 20, 22, 24, 25, 26 y 31 jul.<br>10-jul: vuelos MAD-CCS / CCS-MAD cancelados.</p>
        <h5>Cortesías (billete emitido hasta 25-jun)</h5><p>Cambio de fecha sin coste hasta el 31-oct · cambio de ruta a/desde Medellín, Bogotá, Panamá o Valencia sin coste · vale reembolsable · reembolso por GDS. <b>Waiver 3INVE25JUN</b> (Amadeus ATC). Mismas cortesías para agosto.</p>`},

    {n:"TAP Air Portugal", s:"Regresa 13-jul", c:"rt", ch:["✈️ Valencia (VLN)","Desde 13-jul"],
     sum:"Retoma sus operaciones a Venezuela el 13-jul a través de Valencia (VLN).",
     d:`<p>TAP Air Portugal regresa a Venezuela el <b>13 de julio</b> operando por el aeropuerto de Valencia (VLN). Consulta disponibilidad y tarifas con nosotros.</p>`},

    {n:"Laser Airlines", s:"Operando", c:"op", ch:["✈️ Barcelona (BLA)","1-jul → 31-ago"],
     sum:"Ruta alternativa Madrid vía Barcelona (BLA, Anzoátegui), ya disponible en sistema.",
     d:`<h5>Ruta Madrid vía Barcelona</h5><p>Disponible en KIU para nuevos boletos con viaje entre el 01-jul y el 31-ago-2026.</p>
        <h5>Clases habilitadas (solo boletos nuevos)</h5><p>Turista: <b>T · W · L</b> &middot; Ejecutiva: <b>D</b>. Reservas fuera de estas clases pueden ser anuladas.</p>
        <p class="mut">Contacto: WhatsApp +58 412-266.26.37 · 0501 LASER 00.</p>`},

    {n:"GOL Linhas Aéreas", s:"Cancelado", c:"ca", ch:["⛔ Caracas (CCS)","Hasta 31-ago"],
     sum:"Vuelos con origen/destino Caracas cancelados hasta el 31-ago-2026 (por el sismo del 24-jun).",
     d:`<h5>Opciones para pasajeros</h5><p>Reprogramación de fecha sin penalidad ni diferencia tarifaria (hasta 1 año desde la emisión, sujeto a disponibilidad) · cambio de ruta · reembolso.</p>
        <h5>Para agencias (GDS)</h5><p><b>Waiver:</b> SKCHG DUE CLD G3-[nº vuelo cancelado]/[fecha]. Obligatorio en endorsement + OSI/SSR. Soporte CRC B2B por voz y chat.</p>`},

    {n:"Blue Star", s:"Reprogramación", c:"rp", ch:["🔄 Sin penalidad","25-jun → 31-jul"],
     sum:"Pasajeros que volaban entre el 25-jun y el 31-jul pueden reprogramar sin penalidad.",
     d:`<p>Reprogramación sin penalidad, con vigencia de hasta <b>1 año</b> desde la fecha original del viaje, siempre que la nueva fecha corresponda a la misma temporada tarifaria.</p>
        <p class="mut">Gestión por el Dpto. de Reservas: Elilay Mujica +58 412-1641785 · Greidys Morales +58 412-7586893.</p>`},

    {n:"Aerocaribe", s:"Los Roques", c:"na", ch:["🛩️ Charallave","Los Roques"],
     sum:"Plan de contingencia a Los Roques operando desde el Aeropuerto de Caracas en Charallave.",
     d:`<h5>Itinerario temporal</h5><p><b>Ida:</b> CCS (Charallave) &rarr; Los Roques (LRV) 08:00 a.m.<br><b>Retorno:</b> LRV &rarr; CCS 05:00 p.m.</p>
        <h5>Chequeo</h5><p>Presentarse en Charallave con <b>1:30 h</b> de anticipación. Horarios sujetos a cambios.</p>
        <p class="mut">Coordina: WhatsApp +58 416-623.74.84 · @aerocaribevzla</p>`}
  ];

  function chev(){return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m6 9 6 6 6-6"/></svg>';}

  function build(){
    var wrap=document.createElement('div');
    wrap.id='rt-au-board';wrap.className='rt-au';
    var cards=A.map(function(a,i){
      var chips=a.ch.map(function(c){return '<span class="rt-au-chip">'+c+'</span>';}).join('');
      return '<article class="rt-au-card rt-au-c-'+a.c+'">'
        +'<div class="rt-au-top"><h3 class="rt-au-name">'+a.n+'</h3><span class="rt-au-pill">'+a.s+'</span></div>'
        +'<div class="rt-au-chips">'+chips+'</div>'
        +'<p class="rt-au-sum">'+a.sum+'</p>'
        +'<button class="rt-au-more" data-i="'+i+'">Detalle / para agencias '+chev()+'</button>'
        +'<div class="rt-au-det" id="rt-au-det-'+i+'"><div class="rt-au-det-in"><div class="rt-au-det-pad">'+a.d+'</div></div></div>'
        +'</article>';
    }).join('');
    wrap.innerHTML=''
      +'<div class="rt-au-head"><span class="rt-au-kick">🔔 Actualización · 9 jul 2026</span><h2>Novedades de vuelos internacionales</h2></div>'
      +'<p class="rt-au-sub">Tras el sismo del 24-jun, el aeropuerto de <b>Maiquetía (Caracas)</b> sigue en evaluación. Varias aerolíneas operan por <b>Valencia (VLN)</b> y <b>Barcelona (BLA)</b>. Aquí lo más reciente, verificado. El detalle de aerolíneas nacionales y traslados está más abajo.</p>'
      +'<div class="rt-au-grid">'+cards+'</div>'
      +'<p class="rt-au-foot">¿Dudas con tu vuelo? <b>Escríbenos por WhatsApp</b> y te ayudamos a llegar, sin adivinar.</p>';
    return wrap;
  }

  function wire(root){
    var cards=[].slice.call(root.querySelectorAll('.rt-au-card'));
    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var i=cards.indexOf(e.target);setTimeout(function(){e.target.classList.add('in');},i*70);io.unobserve(e.target);}});},{threshold:.12});
      cards.forEach(function(c){io.observe(c);});
    } else { cards.forEach(function(c){c.classList.add('in');}); }
    setTimeout(function(){cards.forEach(function(c){c.classList.add('in');});},1600);
    root.querySelectorAll('.rt-au-more').forEach(function(btn){
      btn.addEventListener('click',function(){var g=root.querySelector('#rt-au-det-'+btn.getAttribute('data-i'));var o=btn.classList.toggle('open');if(g)g.classList.toggle('open',o);});
    });
  }

  function onPage(){var p=location.pathname.replace(/\/+$/,'');return p==='/estado-aerolineas'||p==='/vuelos';}

  function bumpDate(){
    var upd=document.querySelector('.rt-updated');
    if(upd && /8\s*jul/i.test(upd.textContent)) upd.textContent=upd.textContent.replace(/8\s*jul/i,'9 jul');
  }
  function inject(){
    if(!onPage())return;
    bumpDate();
    if(!document.getElementById('rt-au-css')){var st=document.createElement('style');st.id='rt-au-css';st.textContent=CSS;(document.head||document.documentElement).appendChild(st);}
    if(document.getElementById('rt-au-board'))return;
    var anchor=document.querySelector('.rt-wrap')||document.querySelector('.rt-legend');
    if(!anchor){var host=document.querySelector('#sections');if(!host)return; host.appendChild(build()); wire(document.getElementById('rt-au-board')); return;}
    var board=build();
    anchor.parentNode.insertBefore(board, anchor);
    wire(board);
    bumpDate();
  }

  if(document.readyState!=='loading')inject();else document.addEventListener('DOMContentLoaded',inject);
  var mo=new MutationObserver(function(){inject();});
  try{mo.observe(document.documentElement,{childList:true,subtree:true});}catch(e){}
  window.addEventListener('popstate',function(){setTimeout(inject,80);});
})();
