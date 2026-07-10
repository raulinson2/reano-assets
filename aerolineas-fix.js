/* Reano Travels - parche del tablero Estado de Aerolineas (10-jul-2026)
   Actualiza en runtime el tablero nativo de /estado-aerolineas:
   - Aerocaribe, Estelar (nac.) y Avior (nac.) salen de Suspendidas -> En contingencia, con rutas y horarios.
   - Nueva tarjeta Bluestar (Los Roques desde el 16/07, Charallave OMZ).
   - GOL, Air Europa y Laser (int.) actualizados; TAP pasa a Operan (regresa 13/07).
   - Popups (modal) con detalle enriquecido; fecha "Actualizado: 10 jul". */
(function(){
  if(window.__rtAeroFix) return; window.__rtAeroFix=1;
  function onBoard(){ var p=(location.pathname.replace(/\/+$/,'')||'/'); return p==='/estado-aerolineas'||p==='/vuelos'; }
  if(!onBoard()) return;

  var R = {
    'Aerocaribe':'Los Roques desde Aeropuerto Caracas (Charallave) · ida 8:00 am · retorno 5:00 pm',
    'Estelar (nac.)':'Domésticos vía Valencia (VLN) del 13 al 31/07: San Antonio, Pto. Ordaz y Porlamar',
    'Avior (nac.)':'Desde Barcelona (BLA): Barquisimeto y Margarita (lun·mié·vie, +dom 19/07) · Las Piedras–Margarita (mar·jue, 16/07) · El Vigía (mié, 22/07)',
    'Bluestar':'Los Roques desde Aeropuerto Caracas Óscar Machado Zuloaga · diario 8:00 am / retorno 4:00 pm · desde el 16/07',
    'GOL':'Caracas cancelado hasta el 31/08 · reprogramación sin penalidad, cambio de ruta o reembolso',
    'Air Europa':'Madrid ⇄ Valencia (UX071/072): 11–30 jul en días alternos · cancelados 10, 17, 24 y 31 jul · cambios gratis hasta el 31/10',
    'Laser Airlines (int.)':'Desde Barcelona (BLA): Madrid ya disponible · Sto. Domingo mié y dom · Bogotá mar·jue·sáb · exonerado el cobro por temporalidad (MIA/MAD)',
    'TAP Air Portugal':'Regresa el 13/07 vía Valencia (VLN)'
  };
  var OLD = {
    'Aerocaribe':'Vuelos cancelados',
    'Estelar (nac.)':'Suspendido · equipaje',
    'Avior (nac.)':'Rutas nacionales cancel',
    'GOL':'reanudación por confirmar',
    'Air Europa':'7, 9, 11 y 12',
    'Laser Airlines (int.)':'afectados 25/06',
    'TAP Air Portugal':'Vuelos cancelados'
  };
  var DET = {
    'Aerocaribe':["Plan de contingencia Ruta Los Roques desde el Aeropuerto Caracas (Charallave).","Ida 8:00 a.m. · Retorno desde Los Roques 5:00 p.m.","Preséntate 1 hora y 30 minutos antes del vuelo.","Horarios sujetos a modificaciones por la naturaleza de la reactivación; se notificará oportunamente.","Coordina por WhatsApp +58 416-623.74.84 · @aerocaribevzla · aerocaribe.aero"],
    'Estelar (nac.)':["Domésticos operan vía Valencia (VLN) del 13 al 31 de julio: San Antonio (SVZ), Puerto Ordaz (PZO) y Porlamar (PMV).","Madrid también opera vía Valencia (ver Internacionales).","Equipaje de los vuelos del 24/06: retíralo en Torre Estelar, Las Mercedes (Caracas), de 8:00 am a 5:00 pm.","Su división Estelar Latinoamérica sí opera (ver Internacionales)."],
    'Avior (nac.)':["Vuelos de contingencia desde Barcelona (BLA), ya en sistema para la venta.","Barcelona–Barquisimeto–Margarita (lun, mié y vie; +domingos desde el 19/07): BLA-BRM 7:00 am · BRM-MAR 9:00 am · MAR-BRM 11:00 am · BRM-BLA 12:40 pm.","Barcelona–Las Piedras–Margarita (mar y jue, desde el 16/07): BLA-LSP 7:00 am · LSP-MAR 9:00 am · MAR-LSP 11:00 am · LSP-BLA 1:00 pm.","Barcelona ⇄ El Vigía (miércoles, desde el 22/07): BLA-VIG 9:00 am · VIG-BLA 11:30 am.","Internacional también activo: Bogotá, Medellín y Curazao (ver Internacionales)."],
    'Bluestar':["Reanudación progresiva hacia Los Roques desde el jueves 16 de julio.","Salida desde el Aeropuerto Caracas Óscar Machado Zuloaga: un vuelo diario · 8:00 a.m. · retorno 4:00 p.m.","Chequeo 1 hora y 30 minutos antes de la salida.","Reserva por sistema KIU o canales oficiales de reservas.","Boletos de vuelos entre el 25/06 y el 31/07: reprogramación sin penalidad por WhatsApp.","El aeropuerto cuenta con estacionamiento."],
    'SASCA Airlines':["Caracas ⇄ Los Roques cancelado hasta nuevo aviso.","Tu boleto queda válido por 1 año.","Alternativas: Bluestar y Aerocaribe vuelan a Los Roques desde Charallave; Conviasa desde Maracay."],
    'Conviasa':["Vuelos nacionales desde Valencia con operación reforzada.","Desde Maracay (Los Tacariguas): Los Roques, Barcelona, Puerto Ayacucho, Las Piedras, Barquisimeto y Barinas.","Los Roques desde Maracay: lun–sáb 8:30 am y 1:20 pm · dom 9:55 am y 2:10 pm.","Maracay–Barcelona: lun 7:00 am · vie 4:20 pm — Pto. Ayacucho: lun 10:30 am — Las Piedras: lun 2:50 pm · vie 12:30 pm — Barquisimeto: vie 9:30 am — Barinas: sáb 10:00 am.","Porlamar opera con normalidad.","Internacional: México (Cancún y Santa Lucía) y La Habana, próximamente desde Valencia."],
    'GOL':["Vuelos con destino u origen Caracas cancelados hasta el 31 de agosto de 2026 (comunicado del 8/07).","Reprogramación de fecha sin penalidad ni diferencia tarifaria (sujeto a disponibilidad) para volar hasta 1 año después de la emisión.","Cambio de ruta sin cargos adicionales (sujeto a disponibilidad y diferencias tarifarias).","Reembolso de la tarifa y de los impuestos aplicables.","Agencias (GDS): waiver SKCHG DUE CLD G3-[vuelo]/[fecha] en endorsement + OSI y SSR · soporte CRC B2B.","Si tienes boleto GOL, te ayudamos a revisar tus opciones."],
    'Air Europa':["Madrid ⇄ Valencia (UX071/UX072): opera el 11, 12, 14, 16, 18, 19, 21, 23, 25, 26, 28 y 30 de julio.","CANCELADOS: 10, 17, 24 y 31 de julio (hacia/desde Caracas y Valencia), al no disponerse de las autorizaciones.","Si aceptas viajar por Valencia no necesitas gestión adicional; las conexiones se mantienen.","Boletos emitidos hasta el 25/06: cambio de fecha sin costo (misma cabina) para viajar hasta el 31/10/2026.","Cambio de ruta sin costo, misma cabina, hacia/desde Medellín, Bogotá, Panamá o Valencia.","Quien ya cambió a Medellín/Bogotá/Panamá y ahora prefiere Valencia: autorizado sin costo.","También puedes optar por un vale reembolsable o el reembolso.","Desde el 1/08: operativa en estudio; se informará cualquier novedad."],
    'Laser Airlines (int.)':["Madrid (MAD) vía Barcelona (BLA): disponible en sistema (KIU) para viajar del 1/07 al 31/08 · BLA→MAD 17:00 · check-in desde las 10:45 am · clases T/W/L (turista) y D (ejecutiva).","Santo Domingo (SDQ): miércoles y domingos · QL2968 BLA 10:00 → SDQ 11:50 · QL2969 SDQ 13:20 → BLA 14:50.","Bogotá (BOG): martes, jueves y sábados · QL2980 BLA 09:00 → BOG 10:00 · QL2981 BOG 11:30 → BLA 14:30.","NUEVO (9/07): exonerado el cobro por temporalidad en MIA y MAD — misma clase y viaje iniciando hasta el 31/07. Períodos: MIA 25/06–1/07 · SDQ 26/06–5/07 · BOG 26/06–8/07 · MAD 24/06–6/07.","Afectados que mantengan su fecha: revalidación sin costo y con prioridad en la salida.","Call center 0501-52737-00 · WhatsApp +58 412-266.26.37."],
    'TAP Air Portugal':["Retoma sus operaciones a Venezuela el 13 de julio a través de Valencia (VLN).","Boletos e itinerarios disponibles por los canales oficiales y tu agencia.","Te ayudamos a reservar o reacomodar tu vuelo TAP."]
  };

  function leafs(el){ var out=[]; (function w(e){ if(!e.children||e.children.length===0){ out.push(e); return; } for(var i=0;i<e.children.length;i++) w(e.children[i]); })(el); return out; }
  function cardByName(name){
    var found=null;
    document.querySelectorAll('.rt-card').forEach(function(c){
      if(found) return;
      var t=(c.textContent||'').trim();
      if(t.indexOf(name)===0) found=c;
    });
    return found;
  }
  function gridOf(groupWord){
    var res=null;
    document.querySelectorAll('.rt-cat').forEach(function(cat){
      if(res) return;
      var h=cat.querySelector('.rt-cat-h');
      if(h && (h.textContent||'').toLowerCase().indexOf(groupWord)!==-1){ res=cat.querySelector('.rt-grid'); }
    });
    return res;
  }
  function chipOf(card){
    if(!card) return null;
    var right=card.querySelector('.rt-right')||card;
    var pill=right.querySelector('.rt-pill'); if(pill) return pill;
    var els=right.querySelectorAll('*'), chip=null;
    for(var i=0;i<els.length;i++){ var t=(els[i].textContent||'').trim();
      if(t.length>2 && t.length<24 && /^(suspendid|cancelad|opera|contingencia|flex)/i.test(t)) chip=els[i]; }
    return chip;
  }
  function setNodeText(el, txt){
    var done=false;
    for(var i=0;i<el.childNodes.length;i++){ var n=el.childNodes[i];
      if(n.nodeType===3 && (n.nodeValue||'').trim().length>2){ n.nodeValue=txt; done=true; } }
    if(!done) el.textContent=txt;
  }
  function setSummary(card, oldSnip, txt){
    var done=false;
    leafs(card.querySelector('.rt-left')||card).forEach(function(l){
      if(done) return;
      if((l.textContent||'').indexOf(oldSnip)!==-1){ l.textContent=txt; done=true; }
    });
    return done;
  }
  function styleChip(chip, kind){
    if(!chip) return;
    var apply=function(el){ if(!el||!el.style) return;
      if(kind==='conti'){ el.style.background='rgba(240,140,0,.16)'; el.style.color='#f08c00'; el.style.borderColor='rgba(240,140,0,.4)'; }
      else { el.style.background='rgba(65,229,117,.14)'; el.style.color='#2fbf62'; el.style.borderColor='rgba(65,229,117,.4)'; } };
    setNodeText(chip, kind==='conti' ? 'Contingencia' : 'Opera');
    apply(chip);
  }
  function moveCard(name, destWord){
    var card=cardByName(name); if(!card) return;
    if(card.getAttribute('data-rtfx')==='moved') return;
    var dest=gridOf(destWord); if(!dest) return;
    if(OLD[name] && R[name]) setSummary(card, OLD[name], R[name]);
    styleChip(chipOf(card), destWord==='contingencia'?'conti':'opera');
    card.style.borderLeftColor = destWord==='contingencia' ? 'rgb(240,140,0)' : 'rgb(65,197,118)';
    dest.appendChild(card);
    card.setAttribute('data-rtfx','moved');
  }
  function ensureBluestar(){
    var clones=document.querySelectorAll('[data-rtfx="bluestar"]');
    for(var j=1;j<clones.length;j++){ clones[j].remove(); }
    if(clones.length) return;
    var sasca=cardByName('SASCA Airlines'); if(!sasca) return;
    var dest=gridOf('contingencia'); if(!dest) return;
    var c=sasca.cloneNode(true);
    c.setAttribute('data-rtfx','bluestar');
    var ls=leafs(c.querySelector('.rt-left')||c);
    for(var i=0;i<ls.length;i++){ var t=(ls[i].textContent||'').trim();
      if(t.indexOf('SASCA Airlines')===0){ ls[i].textContent='Bluestar'; }
      else if(t.indexOf('Caracas ⇄ Los Roques')!==-1 || t.indexOf('cancelado')!==-1){ ls[i].textContent=R['Bluestar']; } }
    var logo=c.querySelector('.rt-logo'); if(logo){ logo.innerHTML='B'; }
    styleChip(chipOf(c),'conti');
    c.style.borderLeftColor='rgb(240,140,0)';
    dest.insertBefore(c, dest.firstChild);
  }
  function updateSummaries(){
    ['GOL','Air Europa','Laser Airlines (int.)'].forEach(function(n){
      var card=cardByName(n); if(!card) return;
      if(card.getAttribute('data-rtfx-s')) return;
      if(setSummary(card, OLD[n], R[n])) card.setAttribute('data-rtfx-s','1');
    });
  }
  function fixCounts(){
    document.querySelectorAll('.rt-cat').forEach(function(cat){
      var h=cat.querySelector('.rt-cat-h'), g=cat.querySelector('.rt-grid'); if(!h||!g) return;
      var n=g.querySelectorAll('.rt-card').length;
      leafs(h).forEach(function(l){ if(/^\d+$/.test((l.textContent||'').trim())) l.textContent=String(n); });
      cat.style.display = n===0 ? 'none' : '';
    });
  }
  function fixDate(){
    var u=document.getElementById('rt-updated-txt');
    if(u && u.textContent!=='Actualizado: 10 jul') u.textContent='Actualizado: 10 jul';
  }

  var lastName='';
  document.addEventListener('click', function(e){
    var c=e.target && e.target.closest ? e.target.closest('.rt-card') : null;
    if(c){ var t=(c.textContent||'').trim(); lastName='';
      if(c.getAttribute('data-rtfx')==='bluestar'){ lastName='Bluestar'; }
      else { Object.keys(DET).forEach(function(k){ if(t.indexOf(k)===0) lastName=k; }); }
      setTimeout(fixModal, 90); setTimeout(fixModal, 300); }
  }, true);
  function fixModal(){
    if(!lastName || !DET[lastName]) return;
    var m=document.getElementById('rt-modal'); if(!m) return;
    if((m.style.display||getComputedStyle(m).display)==='none') return;
    var card=document.getElementById('rt-m-card'); if(!card) return;
    var head=card.querySelector('.rt-m-head');
    var CONTI={'Aerocaribe':1,'Estelar (nac.)':1,'Avior (nac.)':1,'Bluestar':1};
    if(head){
      var tEl=null, cEl=head.querySelector('.rt-pill'), hs=head.querySelectorAll('*');
      for(var i=0;i<hs.length;i++){ var t=(hs[i].textContent||'').trim();
        if(t==='SASCA Airlines') tEl=hs[i];
        if(!cEl && t.length>2 && t.length<24 && /^(suspendid|cancelad)/i.test(t)) cEl=hs[i]; }
      if(tEl && lastName==='Bluestar') setNodeText(tEl,'Bluestar');
      if(cEl){
        if(CONTI[lastName]) styleChip(cEl,'conti');
        else if(lastName==='TAP Air Portugal') styleChip(cEl,'opera');
      }
    }
    var route=card.querySelector('.rt-m-route');
    if(route && R[lastName]) route.textContent=R[lastName];
    var ul=card.querySelector('.rt-m-list');
    if(ul){ ul.innerHTML = DET[lastName].map(function(x){ return '<li>'+x+'</li>'; }).join(''); }
  }

  function apply(){
    if(!onBoard()) return;
    moveCard('Aerocaribe','contingencia');
    moveCard('Estelar (nac.)','contingencia');
    moveCard('Avior (nac.)','contingencia');
    moveCard('TAP Air Portugal','operan');
    ensureBluestar();
    updateSummaries();
    fixCounts();
    fixDate();
  }
  if(document.readyState!=='loading') apply(); else document.addEventListener('DOMContentLoaded', apply);
  setInterval(apply, 1500);
})();
