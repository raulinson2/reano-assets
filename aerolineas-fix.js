/* Reano Travels - parche del tablero Estado de Aerolineas (17-jul-2026)
   Actualiza en runtime el tablero nativo de /estado-aerolineas:
   - Aerocaribe, Estelar (nac.), Avior (nac.) y SASCA en Contingencia con rutas y horarios.
   - SASCA reanuda el 17/07: Los Roques diario desde Maracay (Tacarigua) + traslado gratis El Rosal.
   - Turpial: nuevas rutas El Vigia (VLN vie/dom · PMV lun/jue, hasta 28/09). Rutaca: 4h/5h en VLN.
   - Estelar reprograma jul/ago via VLN. Air Europa: cancelados 17/19/24/26/31 jul + 7/14 ago CCS.
   - Nueva tarjeta Bluestar (Los Roques desde el 16/07, Charallave OMZ).
   - NUEVO 17/07: Laser nacional desde el Aeropuerto Libertador de Maracay (Palo Negro), 17/07-31/08,
     Maracaibo/Barcelona/Porlamar/El Vigia desde $90. Venezolana nacional desde Maracay + Panama (18/07).
     Avior: nueva ruta Maracaibo-Curazao (16/07). Estelar: Valencia-Madrid, jueves 3/10/17 sep.
     American/oneworld: waiver ampliado (afectados hasta 16/08, reprogramar hasta 19/08, radio 300 mi).
   - Popups (modal) con detalle enriquecido; fecha "Actualizado: 17 jul". */
(function(){
  if(window.__rtAeroFix) return; window.__rtAeroFix=1;
  function onBoard(){ var p=(location.pathname.replace(/\/+$/,'')||'/'); return p==='/estado-aerolineas'||p==='/vuelos'; }
  if(!onBoard()) return;

  var R = {
    'Aerocaribe':'Los Roques desde Aeropuerto Caracas (Charallave) · ida 8:00 am · retorno 5:00 pm',
    'Estelar (nac.)':'Vía Valencia (VLN): reprogramación progresiva de los vuelos de julio y agosto (comunicado 13/07)',
    'Avior (nac.)':'Desde Barcelona (BLA): Barquisimeto y Margarita (lun·mié·vie, +dom 19/07) · Las Piedras–Margarita (mar·jue, 16/07) · El Vigía (mié, 22/07)',
    'Bluestar':'Los Roques desde Aeropuerto Caracas Óscar Machado Zuloaga · diario 8:00 am / retorno 4:00 pm · desde el 16/07',
    'SASCA Airlines':'Reanuda el 17/07: Los Roques DIARIO desde Maracay (Tacarigua) · traslado terrestre gratis desde El Rosal (Caracas)',
    'Turpial Airlines':'Nacionales vía Valencia · NUEVO El Vigía: desde Valencia (vie·dom, 19/07–28/09) y desde Porlamar (lun·jue, 16/07–28/09)',
    'Rutaca Airlines':'Nacionales vía Valencia · preséntate 4 h antes (nac.) y 5 h (int.) en VLN · afectados 24/06: cambio gratis hasta el 30/07',
    'GOL':'Caracas cancelado hasta el 31/08 · reprogramación sin penalidad, cambio de ruta o reembolso',
    'Air Europa':'Madrid ⇄ Valencia (UX071/072) en días alternos · CANCELADOS 17, 19, 24, 26 y 31 jul · Caracas: 7 y 14 ago · cambios gratis hasta el 31/10',
    'Laser Airlines (int.)':'Desde Barcelona (BLA): Madrid ya disponible · Sto. Domingo mié y dom · Bogotá mar·jue·sáb · exonerado el cobro por temporalidad (MIA/MAD)',
    'TAP Air Portugal':'Regresa el 13/07 vía Valencia (VLN)',
    'Laser Airlines (nac.)':'Nacionales desde el Aeropuerto Libertador de Maracay (Palo Negro), 17/07–31/08 · Maracaibo, Barcelona, Porlamar y El Vigía · desde $90 ida y vuelta',
    'American Airlines':'Caracas suspendido · waiver ampliado: afectados hasta el 16/08, reprogramar hasta el 19/08 · cambios de origen/destino (radio 300 mi) sin cargo · aplica a oneworld',
    'Avior Airlines':'Barcelona ⇄ Bogotá y Medellín · NUEVO Maracaibo ⇄ Curazao desde el 16/07',
    'Venezolana':'Nacionales desde Maracay (Palo Negro) desde el 20/07 · Internacional Panamá desde el 18/07'
  };
  var OLD = {
    'Aerocaribe':'Vuelos cancelados',
    'Estelar (nac.)':'Suspendido · equipaje',
    'Avior (nac.)':'Rutas nacionales cancel',
    'SASCA Airlines':'cancelado hasta nuevo aviso',
    'Turpial Airlines':'vuelo especial El Vigía',
    'Rutaca Airlines':'Boa Vista',
    'GOL':'reanudación por confirmar',
    'Air Europa':'7, 9, 11 y 12',
    'Laser Airlines (int.)':'afectados 25/06',
    'TAP Air Portugal':'Vuelos cancelados',
    'Laser Airlines (nac.)':'En reactivación',
    'American Airlines':'gestionar antes del 11/07',
    'Avior Airlines':'Barcelona ⇄ Bogotá y Medellín'
  };
  var DET = {
    'Aerocaribe':["Plan de contingencia Ruta Los Roques desde el Aeropuerto Caracas (Charallave).","Ida 8:00 a.m. · Retorno desde Los Roques 5:00 p.m.","Preséntate 1 hora y 30 minutos antes del vuelo.","Horarios sujetos a modificaciones por la naturaleza de la reactivación; se notificará oportunamente.","Coordina por WhatsApp +58 416-623.74.84 · @aerocaribevzla · aerocaribe.aero"],
    'Estelar (nac.)':["Comunicado 13/07: reprogramando de manera progresiva ÚNICAMENTE los vuelos de julio y agosto por la ruta de Valencia (VLN).","Domésticos vía Valencia: San Antonio (SVZ), Puerto Ordaz (PZO) y Porlamar (PMV).","SEPTIEMBRE: 3 vuelos por semana Madrid ⇄ Valencia (Aeropuerto Alterno Arturo Michelena), los miércoles, jueves y viernes · MAD → VLN 14:40 → 19:00 · VLN → MAD 21:00 → 11:25(+1). Vuelos especiales los jueves 3, 10 y 17 de septiembre.","Equipaje de los vuelos del 24/06: retíralo en Torre Estelar, Las Mercedes (Caracas), de 8:00 am a 5:00 pm.","Su división Estelar Latinoamérica sí opera (ver Internacionales)."],
    'Avior (nac.)':["Vuelos de contingencia desde Barcelona (BLA), ya en sistema para la venta.","Barcelona–Barquisimeto–Margarita (lun, mié y vie; +domingos desde el 19/07): BLA-BRM 7:00 am · BRM-MAR 9:00 am · MAR-BRM 11:00 am · BRM-BLA 12:40 pm.","Barcelona–Las Piedras–Margarita (mar y jue, desde el 16/07): BLA-LSP 7:00 am · LSP-MAR 9:00 am · MAR-LSP 11:00 am · LSP-BLA 1:00 pm.","Barcelona ⇄ El Vigía (miércoles, desde el 22/07): BLA-VIG 9:00 am · VIG-BLA 11:30 am.","Internacional también activo: Bogotá, Medellín y Curazao — NUEVO Maracaibo ⇄ Curazao desde el 16/07 (ver Internacionales)."],
    'Bluestar':["Reanudación progresiva hacia Los Roques desde el jueves 16 de julio.","Salida desde el Aeropuerto Caracas Óscar Machado Zuloaga: un vuelo diario · 8:00 a.m. · retorno 4:00 p.m.","Chequeo 1 hora y 30 minutos antes de la salida.","Reserva por sistema KIU o canales oficiales de reservas.","Boletos de vuelos entre el 25/06 y el 31/07: reprogramación sin penalidad por WhatsApp.","El aeropuerto cuenta con estacionamiento."],
    'SASCA Airlines':["Comunicado 13/07: reanuda operaciones DIARIAS hacia Los Roques desde el viernes 17 de julio.","Ruta de contingencia desde el Aeropuerto Nacional de Aragua «Tacarigua», en Maracay.","Traslado terrestre GRATUITO (ida y vuelta) desde El Rosal, Caracas, hasta el aeropuerto de Maracay.","Reprogramaciones: su equipo está contactando progresivamente a pasajeros y agencias aliadas.","Boletos de vuelos cancelados: válidos por 1 año.","Atención: +58 412-339.17.05 · @sascaair — también te gestionamos la reserva."],
    'Turpial Airlines':["Vuelos nacionales operan vía Valencia (VLN).","NUEVA RUTA Valencia ⇄ El Vigía, del 19 de julio al 28 de septiembre — viernes: VLN→VIG 10:00–11:00 am · VIG→VLN 12:00–1:00 pm; domingos: VLN→VIG 1:30–2:30 pm · VIG→VLN 3:30–4:30 pm.","NUEVA RUTA Porlamar ⇄ El Vigía, del 16 de julio al 28 de septiembre — lunes: PMV→VIG 11:00 am–12:30 pm · VIG→PMV 1:30–3:00 pm; jueves: PMV→VIG 12:00–1:30 pm · VIG→PMV 2:30–4:00 pm.","Reconéctate con los Andes venezolanos — te reservamos tu asiento."],
    'Rutaca Airlines':["Preséntate con mínimo 4 horas (nacionales) y 5 horas (internacionales) de anticipación en Valencia (VLN).","Afectados por la contingencia del 24/06 — cambio de itinerario: boleto válido 1 año · un (1) cambio de fecha gratis si la reemisión y el viaje se completan antes del 30/07 · después solo pagas la diferencia de tarifa.","Nota de Crédito (EMD): validez de 1 año, canjeable por cualquier ruta RUTACA · no reembolsable.","Solicitudes asociadas a la contingencia: enviar antes del 30 de julio · callcenter@flyrutaca.com.","Vuelos totalmente abiertos y disponibles para nuevas compras."],
    'Conviasa':["Vuelos nacionales desde Valencia con operación reforzada.","Desde Maracay (Los Tacariguas): Los Roques, Barcelona, Puerto Ayacucho, Las Piedras, Barquisimeto y Barinas.","Los Roques desde Maracay: lun–sáb 8:30 am y 1:20 pm · dom 9:55 am y 2:10 pm.","Maracay–Barcelona: lun 7:00 am · vie 4:20 pm — Pto. Ayacucho: lun 10:30 am — Las Piedras: lun 2:50 pm · vie 12:30 pm — Barquisimeto: vie 9:30 am — Barinas: sáb 10:00 am.","Porlamar opera con normalidad.","Internacional: México (Cancún y Santa Lucía) y La Habana, próximamente desde Valencia."],
    'GOL':["Vuelos con destino u origen Caracas cancelados hasta el 31 de agosto de 2026 (comunicado del 8/07).","Reprogramación de fecha sin penalidad ni diferencia tarifaria (sujeto a disponibilidad) para volar hasta 1 año después de la emisión.","Cambio de ruta sin cargos adicionales (sujeto a disponibilidad y diferencias tarifarias).","Reembolso de la tarifa y de los impuestos aplicables.","Agencias (GDS): waiver SKCHG DUE CLD G3-[vuelo]/[fecha] en endorsement + OSI y SSR · soporte CRC B2B.","Si tienes boleto GOL, te ayudamos a revisar tus opciones."],
    'Air Europa':["Comunicado 13/07 — CANCELADOS Madrid ⇄ Valencia (UX071/UX072): 17, 19, 24, 26 y 31 de julio.","CANCELADOS Madrid ⇄ Caracas (UX071/UX072): 7 y 14 de agosto.","El resto de las fechas de julio opera en días alternos vía Valencia; las conexiones se mantienen.","Boletos emitidos hasta el 25/06: cambio de fecha sin costo (misma cabina) para viajar hasta el 31/10/2026.","Cambio de ruta sin costo, misma cabina, hacia/desde Medellín (MDE), Bogotá (BOG), Panamá (PTY) o Valencia (VLN).","También puedes optar por un vale reembolsable o el reembolso.","Te gestionamos el cambio o la protección de tu boleto Air Europa."],
    'Laser Airlines (int.)':["Madrid (MAD) vía Barcelona (BLA): disponible en sistema (KIU) para viajar del 1/07 al 31/08 · BLA→MAD 17:00 · check-in desde las 10:45 am · clases T/W/L (turista) y D (ejecutiva).","Santo Domingo (SDQ): miércoles y domingos · QL2968 BLA 10:00 → SDQ 11:50 · QL2969 SDQ 13:20 → BLA 14:50.","Bogotá (BOG): martes, jueves y sábados · QL2980 BLA 09:00 → BOG 10:00 · QL2981 BOG 11:30 → BLA 14:30.","NUEVO (9/07): exonerado el cobro por temporalidad en MIA y MAD — misma clase y viaje iniciando hasta el 31/07. Períodos: MIA 25/06–1/07 · SDQ 26/06–5/07 · BOG 26/06–8/07 · MAD 24/06–6/07.","Afectados que mantengan su fecha: revalidación sin costo y con prioridad en la salida.","Call center 0501-52737-00 · WhatsApp +58 412-266.26.37."],
    'TAP Air Portugal':["Retoma sus operaciones a Venezuela el 13 de julio a través de Valencia (VLN).","Boletos e itinerarios disponibles por los canales oficiales y tu agencia.","Te ayudamos a reservar o reacomodar tu vuelo TAP."],
    'Laser Airlines (nac.)':["Protocolo de contingencia: vuelos nacionales desde y hacia el Aeropuerto Libertador de Maracay (Palo Negro, Edo. Aragua), del 17/07 al 31/08.","Barcelona (BLA): QL970 MYC 07:00 → BLA 08:00 · QL971 BLA 09:00 → MYC 10:00 · QL974 MYC 15:30 → BLA 16:30 · QL975 BLA 17:30 → MYC 18:30 (las frecuencias QL972/QL973 están suspendidas temporalmente).","Porlamar (PMV): QL907 PMV 07:30 → MYC 08:40 · QL904 MYC 14:30 → PMV 15:40 · QL905 PMV 16:40 → MYC 17:50 · QL906 MYC 18:50 → PMV 20:00.","Maracaibo (MAR): QL942 MYC 11:00 → MAR 12:10 · QL943 MAR 13:10 → MYC 14:20.  El Vigía (VIG): QL920 MYC 10:00 → VIG 11:10 · QL921 VIG 12:10 → MYC 13:20.","Tarifas desde $90 ida y vuelta · clases turista H/M/Y y ejecutiva C (aplican solo a boletos nuevos).","Protocolo en el Aeropuerto Libertador (Palo Negro): el check-in se hace dentro de la Base Aérea El Libertador · llega 2 horas antes · estacionamiento para pernocta con vigilancia privada. A quienes llegan se les recibe en el estacionamiento del Auditorio de la base y se les traslada en autobuses climatizados a la zona de check-in.","Call center 0501-52737-00 · WhatsApp +58 412-266.26.37 — o te gestionamos la reserva."],
    'American Airlines':["Travel Notice — Actualización 6 (13/07): política especial de excepción por el sismo de Caracas (CCS).","Boletos emitidos hasta el 23/06 · viajes afectados del 25/06 al 16/08 · nuevas fechas de viaje hasta el 19/08.","Cambios de origen/destino permitidos dentro de un radio de 300 millas; cambios de ciudad de conexión y co-terminal permitidos.","Sin cargo por el cambio; sin reembolso, salvo vuelo cancelado o demorado (vía GDS/ARC/BSP).","Aplica también a los socios Joint Business de oneworld: Iberia, British Airways, Finnair, Japan Airlines y Qantas (vuelos propios y en código compartido).","Agencias: autogestión en SalesLink (waiver Travel Notice) · endoso TNADVE/24JUN26A.","Te ayudamos a revisar y reacomodar tu boleto American / oneworld."],
    'Avior Airlines':["Internacionales desde Barcelona (BLA): Bogotá y Medellín (ver también las rutas nacionales de Avior).","NUEVA RUTA Maracaibo ⇄ Curazao, desde el 16 de julio.","Barcelona ⇄ Curazao y Margarita ⇄ Curazao también activas desde el 16/07 (martes y jueves).","Te gestionamos tu vuelo Avior."],
    'Venezolana':["Nuevo itinerario nacional de contingencia desde el Aeropuerto Libertador (SVBL · Palo Negro, Maracay, Edo. Aragua), vigente desde el 20/07/2026.","Maracaibo → Maracay (MAR-MYC): 1101 06:00–07:00 (L·M·V) · 1101 07:00–08:00 (J) · 1101 08:00–09:00 (D) · 1103 15:15–16:00 (V).","Maracay → Maracaibo (MYC-MAR): 1104 17:00–18:00 (L) · 1102 09:00–10:00 (M) · 1102 13:30–14:15 (V) · 1104 18:00–19:00 (J·V·D).","Maracay ⇄ Porlamar: MYC-PMV 1131 09:00–09:45 (L·V) · 1131 09:45–10:30 (J·D)  ||  PMV-MYC 1132 10:45–11:30 (L·V) · 1132 16:15–17:00 (J·D).","INTERNACIONAL Panamá, desde el 18/07 (martes y sábado): Maracaibo ⇄ Panamá (vuelos 412/413) · Barquisimeto ⇄ Panamá (vuelos 422/423).","Atención al pasajero: WhatsApp +58 414-611.25.67 · Central 0212-819.06.00 · asesorcomercial@venezolana.aero · venezolana.aero — o te la gestionamos nosotros."]
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
  // Reemplaza el primer leaf (en cualquier tarjeta) que contenga oldSnip. Idempotente:
  // tras el reemplazo el snippet ya no existe. Necesario para tarjetas con nombre repetido
  // (hay dos "Venezolana": nacional e internacional, en pestañas distintas).
  function replaceAnywhere(oldSnip, txt){
    var done=false;
    document.querySelectorAll('.rt-card').forEach(function(c){
      if(done) return;
      leafs(c.querySelector('.rt-left')||c).forEach(function(l){
        if(done) return;
        if((l.textContent||'').indexOf(oldSnip)!==-1){ l.textContent=txt; done=true; }
      });
    });
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
      else if(t===R['SASCA Airlines'] || t.indexOf('Caracas ⇄ Los Roques')!==-1 || t.indexOf('cancelado')!==-1 || t.indexOf('Reanuda el 17/07')===0){ ls[i].textContent=R['Bluestar']; } }
    var logo=c.querySelector('.rt-logo'); if(logo){ logo.innerHTML='B'; }
    styleChip(chipOf(c),'conti');
    c.style.borderLeftColor='rgb(240,140,0)';
    dest.insertBefore(c, dest.firstChild);
  }
  function updateSummaries(){
    ['GOL','Air Europa','Laser Airlines (int.)','Turpial Airlines','Rutaca Airlines','Laser Airlines (nac.)','American Airlines','Avior Airlines'].forEach(function(n){
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
    if(u && u.textContent!=='Actualizado: 20 jul') u.textContent='Actualizado: 20 jul';
  }
  function patchVenezolana(){
    replaceAnywhere('Desde Barquisimeto (6/07): Maracaibo (lun-mar-jue-vie-dom) y Porlamar (lun-jue-dom) · con horarios',
      'Nacionales desde el Aeropuerto Libertador de Maracay (Palo Negro) desde el 20/07: Maracaibo y Porlamar (desde $90) · también desde Barquisimeto');
    replaceAnywhere('Barquisimeto ⇄ Panamá · mar y vie desde el 6/07 · vuelos 422/423',
      'Panamá desde el 18/07 (mar y sáb): Maracaibo ⇄ Panamá (412/413) y Barquisimeto ⇄ Panamá (422/423)');
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
    var CONTI={'Aerocaribe':1,'Estelar (nac.)':1,'Avior (nac.)':1,'Bluestar':1,'SASCA Airlines':1};
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
    moveCard('SASCA Airlines','contingencia');
    moveCard('TAP Air Portugal','operan');
    ensureBluestar();
    updateSummaries();
    patchVenezolana();
    fixCounts();
    fixDate();
  }
  if(document.readyState!=='loading') apply(); else document.addEventListener('DOMContentLoaded', apply);
  setInterval(apply, 1500);
})();
