/* Reano Travels - UI fixes v3
   CSS estable (la inyeccion del sitio no puede deshacer CSS):
   header unificado, footer unificado y legible en claro/oscuro,
   fondo de tienda, pagina de producto, carrito ordenado. */
(function(){
  if(window.__rtUI3) return; window.__rtUI3=1;
  /* HIGIENE DE DATOS (27-jul-2026): barre en TODA visita y en cualquier pagina
     los restos de 'rt-crm-queue', donde una version anterior dejaba guardados
     en el navegador del cliente su numero de documento, direccion y telefono.
     Va aqui —y no solo al enviar el formulario— porque quien ya lo tiene
     guardado puede no volver a pasar nunca por el carrito. Ver el comentario
     largo en la funcion de envio del formulario de pasajero. */
  try{ localStorage.removeItem('rt-crm-queue'); }catch(e){}
  var WA='https://wa.me/584247309699?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20paquetes%20de%20viaje';
  /* Bogota: es el destino de TODOS los paquetes de concierto que hoy se venden
     en la tienda (Karol G, Arirang, Arjona — los tres en el Movistar Arena).
     La portada ensena lo que de verdad se vende, no una foto de banco. */
  var IMG='https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/intl-bogota.jpg';

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

  /* ===== TIENDA: fondo fotografico en el hero =====
     Aqui habia un #rt-tienda-bg fijo a toda la pagina, y NUNCA se vio. /tienda
     es UNA sola seccion: el titular y la rejilla de productos comparten bloque,
     y la hoja de la tienda lo pinta con
        body.rtstore-on #sections{background:var(--bg)!important}
     —un ID, que gana por especificidad a cualquier regla de clase—. La foto se
     descargaba entera y quedaba enterrada debajo. Eso era el "tienda tampoco
     tiene ningun background": si lo tenia, pero tapado.
     Se retira ese fondo muerto (dos sistemas de fondo compitiendo, uno perdiendo
     en silencio) y la foto pasa DENTRO del hero, que es el unico sitio donde no
     compite con la lectura de los precios. */
  .rts-hero{position:relative;isolation:isolate;overflow:hidden}
  /* El :not() es obligatorio: sin el, esta regla le quitaria el position:absolute
     a la propia foto y al velo, y los dos caerian dentro del flujo del texto. */
  .rts-hero > *:not(.rt-tp-foto):not(.rt-tp-velo){position:relative;z-index:2}
  .rt-tp-foto{position:absolute;inset:0;z-index:0;background-position:center 42%;
    background-size:cover;transform:scale(1.06);
    animation:rtTpZoom 30s ease-in-out infinite alternate}
  /* El velo SIGUE AL TEMA. En claro el titular de la tienda es casi negro
     (rgb(25,23,20)) y el subtitulo gris (rgb(87,81,75)): un velo oscuro los
     dejaria ilegibles —exactamente el fallo que hubo que corregir en
     /conciertos—, asi que en claro aclara en vez de oscurecer. */
  .rt-tp-velo{position:absolute;inset:0;z-index:1;
    background:linear-gradient(180deg,rgba(12,12,14,.66),rgba(12,12,14,.88))}
  html:not(.dark) .rt-tp-velo{background:linear-gradient(180deg,rgba(255,252,248,.76),rgba(255,252,248,.93))}
  @keyframes rtTpZoom{to{transform:scale(1.16)}}
  @media(prefers-reduced-motion:reduce){.rt-tp-foto{animation:none;transform:scale(1.06)}}

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
  /* Naranja de marca, no verde WhatsApp: el canal ya se nombra en el texto. */
  .rt-fifty-wa{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,#FF8C03,#E67A00);color:#fff;
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

  /* ===== /nosotros: el logo del hero, centrado =====
     La inyeccion trae .rt-herowrap{text-align:left!important}, que en la
     portada de inicio es correcto (ahi todo el hero va alineado a la
     izquierda). En /nosotros el resto del hero SI esta centrado —el sello,
     el titular, el parrafo y los tres numeros caen todos en el eje— y solo
     el logo se quedaba pegado a la izquierda, descuadrado contra ellos.
     Se corrige nada mas en esta pagina; el inicio no se toca. */
  html.rt-nos .rt-herowrap{text-align:center!important}

  /* ===== INICIO: el logo del hero, que estaba OCULTO =====
     27-jul-2026. Raul: "en el home falta el logo mio, arriba de Descubre el mundo".
     Diagnostico: el elemento .rt-herowrap SI existe en el inicio, dentro del hero y
     justo antes de la pastilla, y sus dos imagenes (clara y oscura) CARGAN bien
     —naturalWidth 1763 y 640—. Lo que pasa es que llega con display:none. No hay
     regla en ninguna hoja accesible ni estilo en linea que lo explique, asi que se
     fuerza aqui en vez de perseguir su origen.
     Ademas se centra: la inyeccion trae .rt-herowrap{text-align:left!important} y en
     el inicio TODO el hero va centrado (pastilla, titular, parrafo y botones), asi
     que alineado a la izquierda quedaba descuadrado contra ellos. Mismo arreglo que
     ya se hizo para /nosotros ahi arriba. */
  body.rt-home .rt-herowrap{display:block!important;text-align:center!important;
    margin:0 auto 16px!important}
  body.rt-home .rt-herologo{height:64px!important;width:auto!important;
    max-width:230px!important;object-fit:contain!important;margin:0 auto!important}
  @media(max-width:640px){
    body.rt-home .rt-herologo{height:48px!important;max-width:180px!important}
  }

  /* ===== /contacto: tarjeta blanca sobre hero oscuro =====
     El hero de contacto es una foto con un velo oscuro encima, asi que la
     inyeccion pinta de blanco TODO su texto (h1,h2,p,li,a) y de melocoton
     los acentos. Correcto para lo que va sobre la foto.
     Pero "Habla con un asesor" no va sobre la foto: es una tarjeta .glass
     con fondo blanco al 85%. La regla general le llegaba igual y dejaba
     texto blanco sobre blanco —contraste 1.0, literalmente invisible— y
     los iconos en melocoton a 1.8. Aqui se devuelven los colores del tema
     dentro de la tarjeta, que es el unico sitio donde el fondo es claro. */
  .rt-cx-hero .glass p,
  .rt-cx-hero .glass li,
  .rt-cx-hero .glass span:not([class*="text-primary"]){color:var(--text-muted)!important}
  /* Los nombres de los asesores van en negrita y deben seguir siendo lo mas
     oscuro de la tarjeta. Se escribe span.font-bold (y no solo .font-bold)
     para empatar en peso con la regla de arriba: si no, el texto suave le
     ganaba por especificidad y los nombres salian grises. */
  .rt-cx-hero .glass h1,.rt-cx-hero .glass h2,.rt-cx-hero .glass h3,
  .rt-cx-hero .glass h4,.rt-cx-hero .glass b,.rt-cx-hero .glass strong,
  .rt-cx-hero .glass span.font-bold,
  .rt-cx-hero .glass .font-bold{color:var(--color-text)!important}
  .rt-cx-hero .glass [class*="text-card-title"]{color:var(--brand-primary)!important}
  .rt-cx-hero .glass [class*="text-primary"]{color:var(--brand-primary)!important}
  .rt-cx-hero .glass a:not(.btn){color:var(--color-text)!important}
  /* Los iconos de chat estaban en verde WhatsApp (#25D366): sobre blanco dan
     contraste 2.0 y ademas ya se decidio que el acento de la marca es el
     naranja, no el verde del canal. */
  .rt-cx-hero .glass .material-symbols-outlined{color:var(--brand-primary)!important}

  /* ===== BOTONES: naranja mas profundo para AA (24-jul) =====
     El blanco sobre el naranja de marca (#FF6B1A/#FF8C03) daba 2,85:1 — falla
     AA para el texto de 12-14 px de los botones. No hay ningun naranja "vivo"
     con el que el blanco llegue a 4,5: por luminancia, el naranja tiene que
     bajar. Este naranja empezo en #D2480A, que sobre el papel daba 4,50:1 —
     pero Lighthouse lo midio en 4,49 y lo reprobo: quedaba justo del lado malo
     del redondeo. Ahora es #C2410C (blanco = 5,2:1), que pasa con holgura, es
     el MISMO valor que usa contrastFix() para el texto naranja (un solo naranja
     profundo en todo el sitio en vez de dos casi iguales) y a ojo es
     indistinguible del anterior. Leccion: no elegir un color que empate justo
     con el umbral; el redondeo del auditor decide, y decide en contra.
     Sigue leyendose como naranja atardecer, no marron. Se aplica plano a TODOS los botones de
     marca (los propios y los nativos de la tienda) para que queden uniformes.
     Los botones amarillos de PayPal (#ffc439, texto oscuro) NO se tocan. */
  /* Prefijo html body: el .btn-primary del sitio lleva su propio !important y,
     segun la pagina, el orden de cascada de Squarespace lo hacia ganar sobre el
     mio (en /conciertos ganaba el mio, en la home no). Subir especificidad a
     (0,1,2) lo resuelve en TODAS las paginas, sin depender del orden. */
  html body .btn-primary,html body .rt-nav .btn-primary,html body header.fixed .btn-primary,html body nav.fixed .btn-primary,
  html body .sqs-add-to-cart-button,html body button.sqs-add-to-cart-button,html body [class*="add-to-cart-button"],
  html body .rt-nav-cta,html body .rt-ce-b1,html body .rt-fifty-wa,html body .rt-pax-submit{
    background:#C2410C !important;background-image:none !important;border-color:#C2410C !important}
  .rt-ce-b1,.rt-fifty-wa,.rt-pax-submit,.rt-nav-cta{box-shadow:0 8px 20px -8px rgba(194,65,12,.6) !important}

  /* ===== MICROINTERACCIONES: transiciones suaves + realce al pasar el raton =====
     Solo animan un cambio que YA ocurre al hover, asi que no hay coste cuando no
     se interactua. Cada elevacion se apaga con prefers-reduced-motion mas abajo. */
  /* OJO: NO transicionar background-color. Al cargar, mi regla profundiza el
     naranja pisando la del sitio, y con una transicion de color el boton
     "parpadea" de naranja vivo a profundo. El hover solo usa filter/transform. */
  .btn-primary,.rt-nav-cta,.rt-ce-b1,.rt-ce-b2,.rt-fifty-pp,.rt-fifty-wa,.rt-pax-submit,
  .sqs-add-to-cart-button,[class*="add-to-cart-button"],.rt-ce-ico{
    transition:transform .18s ease,box-shadow .18s ease,filter .18s ease}
  .btn-primary:hover,.rt-nav-cta:hover,.rt-ce-b1:hover,.rt-fifty-pp:hover,.rt-fifty-wa:hover,
  .rt-pax-submit:hover,.sqs-add-to-cart-button:hover{transform:translateY(-2px);filter:brightness(1.07)}
  .btn-primary:active,.rt-nav-cta:active,.sqs-add-to-cart-button:active{transform:translateY(0)}
  /* Tarjetas: elevacion sutil. Se anima solo transform+sombra (no tocan layout). */
  .rt-fifty,.rts-hero .rt-tp-foto,.cx-card{transition:transform .28s ease,box-shadow .28s ease}
  .rt-fifty:hover{transform:translateY(-4px);box-shadow:0 30px 60px -30px rgba(255,140,3,.55)}

  @media(prefers-reduced-motion:reduce){
    .btn-primary,.rt-nav-cta,.rt-ce-b1,.rt-fifty-wa,.rt-pax-submit,.rt-fifty,.cx-card,
    .sqs-add-to-cart-button,[class*="add-to-cart-button"]{transition:none !important}
    .btn-primary:hover,.rt-nav-cta:hover,.rt-fifty:hover,.rt-fifty-wa:hover,
    .sqs-add-to-cart-button:hover{transform:none !important;filter:none !important}
  }

  /* ===== Home: que la pildora del hero no se meta bajo el header fijo =====
     El hero es min-h-[80vh] con flex items-center: en pantallas de portatil
     (~768-900px de alto) el contenido centrado sube y su primer elemento (la
     pildora "DESCUBRE EL MUNDO") queda medio tapado por el header de 80px. Un
     padding-top empuja el bloque centrado lo justo para despejarlo; en pantallas
     altas apenas se nota. Acotado a la home (body.rt-home) para no tocar otros heros. */
  body.rt-home section[class*="min-h-"]{padding-top:72px;padding-bottom:28px}

  /* ===== Banner de cookies: el ultimo fallo de contraste del sitio =====
     Lighthouse (movil) deja el sitio en 96 de accesibilidad y el UNICO fallo son
     los dos botones del banner de consentimiento, que Squarespace pinta con el
     naranja de marca puro: "ACCEPT ALL" da 3,05:1 (blanco sobre #FF5E1A) y
     "DECLINE ALL" 2,17:1 (naranja sobre gris) — el minimo AA para texto de 12px
     es 4,5:1. contrastFix() y deepenButtons() lo saltan a proposito por ser UI
     nativa de consentimiento, asi que se corrige aqui y solo en color: no se toca
     el texto, ni el tamano, ni lo que hacen los botones.
     Se fija el par fondo+texto en ambos (no solo el texto) para que el contraste
     sea el mismo en claro y en oscuro, sin depender de como pinte Squarespace el
     banner en cada tema. Aceptar: #C2410C con blanco = 5,2:1. Rechazar: el naranja
     no alcanza 4,5:1 sobre gris claro ni oscureciendolo, asi que pasa a gris
     neutro oscuro = 12,3:1 — que ademas es lo convencional para un boton
     secundario, y deja la opcion de rechazar MAS legible que antes. */
  .gdpr-cookie-banner button.accept,
  .gdpr-cookie-banner .sqs-cookie-banner-v2-accept{
    background:#C2410C !important;background-image:none !important;
    border-color:#C2410C !important}
  .gdpr-cookie-banner button.accept,
  .gdpr-cookie-banner button.accept span{color:#fff !important}
  .gdpr-cookie-banner button.decline,
  .gdpr-cookie-banner .sqs-cookie-banner-v2-decline{
    background:#E8E8E8 !important;background-image:none !important;
    border-color:#9A9A9A !important}
  .gdpr-cookie-banner button.decline,
  .gdpr-cookie-banner button.decline span{color:#262626 !important}

  /* ===== PESTANAS del tablero (Nacionales / Internacionales / Traslados) =====
     27-jul-2026. BUG reportado por Raul: al cambiar de pestana quedaban DOS
     pintadas de naranja a la vez, en claro Y en oscuro. Causa: deepenButtons()
     estampaba el naranja profundo INLINE sobre la pestana que estaba activa al
     CARGAR la pagina; ese inline lleva !important y no se despega nunca, asi que
     al pulsar otra pestana la vieja seguia pareciendo activa. Ahora el color lo
     pone esta regla, que sigue a aria-selected y por tanto acompana al clic.
     deepenButtons() salta los [role="tab"] a proposito (ver alli). */
  .rt-tabs .rt-tab[aria-selected="true"]{background-color:#C2410C !important;color:#fff !important}
  .rt-tabs .rt-tab[aria-selected="false"]{background-color:transparent !important}

  /* ===== SELECTOR DE VARIANTE de la ficha de producto ("Seccion" / "Salida") =====
     27-jul-2026. Raul: "no cambia entre claro y oscuro". Cierto: el <select> es
     nativo de Squarespace y se quedaba con el blanco del sistema, asi que en tema
     oscuro salia una lista blanca sobre fondo negro. Se estilan el <select> Y sus
     <option> (en Chrome/Edge la lista desplegada SI hereda el color del option;
     en Safari/iOS la pinta el sistema y no hay forma de tocarla: aceptado).
     Todo va acotado a body.rt-pp para no tocar ningun otro desplegable del sitio. */
  body.rt-pp select.variant-select{
    width:100%;padding:12px 40px 12px 14px;border-radius:10px;font:inherit;
    border:1px solid rgba(128,128,128,.30);background-color:#fff;color:#191512;
    -webkit-appearance:none;appearance:none;
    background-image:url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat:no-repeat;background-position:right 12px center;background-size:18px}
  body.rt-pp select.variant-select option{background-color:#fff;color:#191512}
  /* el placeholder "Selecciona Seccion" iba a rgba(255,255,255,.62): ilegible */
  body.rt-pp select.variant-select.show-placeholder{color:#5d574f}
  html.dark body.rt-pp select.variant-select{
    background-color:#171f27;color:#eef3f7;border-color:rgba(255,255,255,.20)}
  html.dark body.rt-pp select.variant-select option{background-color:#171f27;color:#eef3f7}
  html.dark body.rt-pp select.variant-select.show-placeholder{color:#aab4bf}
  body.rt-pp select.variant-select:focus{border-color:#FF8C03;outline:none}

  /* ===== CALCULADORA DE SEGURO (/servicios) — clara, oscura y movil =====
     Sin anchos fijos: una sola columna en telefono y tres en escritorio via
     auto-fit, para que no haya que mantener dos maquetas. */
  #rt-seg{--sg-card:#fff;--sg-tx:#191512;--sg-mu:#6b645c;--sg-ln:rgba(0,0,0,.10);
    --sg-bg:#faf7f4;background:var(--sg-bg);color:var(--sg-tx);padding:64px 20px 72px}
  html.dark #rt-seg{--sg-card:#171f27;--sg-tx:#eef3f7;--sg-mu:#9aa6b2;
    --sg-ln:rgba(255,255,255,.12);--sg-bg:#0f151b}
  #rt-seg *{box-sizing:border-box}
  .rt-seg-in{max-width:1000px;margin:0 auto}
  .rt-seg-k{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.20em;
    color:#C2410C;margin-bottom:10px}
  html.dark .rt-seg-k{color:#FF8C03}
  #rt-seg h2{font-size:clamp(26px,4vw,42px);line-height:1.08;font-weight:900;margin:0 0 12px}
  .rt-seg-sub{color:var(--sg-mu);margin:0 0 28px;max-width:56ch;line-height:1.6}
  .rt-seg-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px}
  .rt-seg-f label{display:block;font-size:13px;font-weight:700;margin-bottom:6px}
  .rt-seg-f select,.rt-seg-f input,.rt-seg-edad{width:100%;padding:12px 14px;border-radius:10px;
    border:1px solid var(--sg-ln);background:var(--sg-card);color:var(--sg-tx);font:inherit}
  .rt-seg-f select option{background:var(--sg-card);color:var(--sg-tx)}
  .rt-seg-pax{margin-top:22px;background:var(--sg-card);border:1px solid var(--sg-ln);
    border-radius:14px;padding:18px}
  .rt-seg-paxh{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;gap:12px}
  #rt-seg-add{background:none;border:1px solid var(--sg-ln);color:var(--sg-tx);
    border-radius:999px;padding:8px 16px;font:inherit;font-weight:700;cursor:pointer}
  #rt-seg-add:hover{border-color:#FF8C03;color:#C2410C}
  html.dark #rt-seg-add:hover{color:#FF8C03}
  .rt-seg-row{display:flex;align-items:center;gap:10px;margin-bottom:8px}
  .rt-seg-row span{font-size:13px;color:var(--sg-mu);min-width:38px}
  .rt-seg-row .rt-seg-edad{max-width:120px}
  .rt-seg-del{background:none;border:none;color:var(--sg-mu);font-size:16px;cursor:pointer;
    padding:6px 10px;border-radius:8px;line-height:1}
  .rt-seg-del:hover{color:#e5484d;background:rgba(229,72,77,.10)}
  .rt-seg-pax small{display:block;margin-top:8px;color:var(--sg-mu);font-size:12.5px}
  .rt-seg-ad{margin-top:18px}
  .rt-seg-ad>b{display:block;margin-bottom:10px}
  #rt-seg-adl{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:8px}
  .rt-seg-chk{display:flex;align-items:center;gap:10px;background:var(--sg-card);
    border:1px solid var(--sg-ln);border-radius:10px;padding:11px 14px;cursor:pointer;font-size:14px}
  .rt-seg-chk span{flex:1}
  .rt-seg-chk b{color:#C2410C}
  html.dark .rt-seg-chk b{color:#FF8C03}
  .rt-seg-out{margin-top:26px}
  .rt-seg-hint,.rt-seg-est{color:var(--sg-mu);font-size:14px;line-height:1.6}
  .rt-seg-est{margin-top:16px;background:rgba(240,140,0,.10);border:1px solid rgba(240,140,0,.32);
    border-radius:10px;padding:12px 14px;color:var(--sg-tx)}
  .rt-seg-resh{font-size:15px;margin-bottom:14px;color:var(--sg-mu)}
  .rt-seg-resh b{color:var(--sg-tx)}
  .rt-seg-res{display:block}
  .rt-seg-card{background:var(--sg-card);border:1px solid var(--sg-ln);border-radius:14px;
    padding:18px;margin-bottom:12px}
  .rt-seg-cabec{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
  .rt-seg-cabec b{font-size:17px}
  .rt-seg-eu{font-size:11px;font-weight:800;letter-spacing:.08em;background:#C2410C;color:#fff;
    padding:4px 9px;border-radius:999px}
  .rt-seg-nota{color:var(--sg-mu);font-size:13.5px;margin:6px 0 10px;line-height:1.5}
  .rt-seg-det{margin:0 0 12px;padding-left:18px;color:var(--sg-mu);font-size:13.5px;line-height:1.7}
  .rt-seg-tot{display:flex;justify-content:space-between;align-items:baseline;
    border-top:1px solid var(--sg-ln);padding-top:12px;margin-bottom:12px}
  .rt-seg-tot b{font-size:24px;font-weight:900;color:var(--sg-tx)}
  .rt-seg-go{width:100%;background:#C2410C;color:#fff;border:none;border-radius:10px;
    padding:13px 18px;font:inherit;font-weight:800;cursor:pointer}
  .rt-seg-go:hover{filter:brightness(1.08)}
  @media(max-width:520px){
    #rt-seg{padding:44px 16px 52px}
    .rt-seg-paxh{flex-direction:column;align-items:stretch}
    #rt-seg-add{width:100%}
  }

  /* ===== Campos anadidos al buscador de hoteles ===== */
  #rt-hot-extra{--ht-c:#fff;--ht-t:#191512;--ht-m:#6b645c;--ht-l:rgba(0,0,0,.14);
    margin-top:12px;grid-column:1/-1}
  html.dark #rt-hot-extra{--ht-c:rgba(255,255,255,.06);--ht-t:#eef3f7;--ht-m:#9aa6b2;
    --ht-l:rgba(255,255,255,.18)}
  #rt-hot-extra *{box-sizing:border-box}
  .rt-hot-g{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px}
  .rt-hot-f label{display:block;font-size:12.5px;font-weight:700;color:var(--ht-t);margin-bottom:5px}
  .rt-hot-f label small{font-weight:500;color:var(--ht-m)}
  .rt-hot-f select{width:100%;padding:11px 12px;border-radius:10px;border:1px solid var(--ht-l);
    background:var(--ht-c);color:var(--ht-t);font:inherit}
  .rt-hot-f select option{background:#fff;color:#191512}
  html.dark .rt-hot-f select option{background:#171f27;color:#eef3f7}
  .rt-hot-ed:empty{display:none}
  .rt-hot-ed{margin-top:12px;border:1px dashed var(--ht-l);border-radius:12px;padding:12px}
  .rt-hot-edt{display:block;font-size:12.5px;color:var(--ht-m);margin-bottom:9px;line-height:1.5}
  .rt-hot-edt b{color:var(--ht-t)}
  .rt-hot-edg{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:9px}
  .rt-hot-edg label{display:block;font-size:12px;font-weight:700;color:var(--ht-t)}
  .rt-hot-e{width:100%;margin-top:4px;padding:10px 11px;border-radius:9px;
    border:1px solid var(--ht-l);background:var(--ht-c);color:var(--ht-t);font:inherit}
  .rt-hot-av{display:none;margin-top:10px;background:rgba(229,72,77,.12);
    border:1px solid rgba(229,72,77,.42);color:var(--ht-t);border-radius:10px;
    padding:10px 13px;font-size:13.5px}

  /* ===== Banda de Holafly (eSIM) ===== */
  #rt-hfly{--hf-c:#fff;--hf-t:#191512;--hf-m:#6b645c;--hf-l:rgba(0,0,0,.10);--hf-bg:#faf7f4;
    background:var(--hf-bg);color:var(--hf-t);padding:60px 20px}
  html.dark #rt-hfly{--hf-c:#171f27;--hf-t:#eef3f7;--hf-m:#9aa6b2;
    --hf-l:rgba(255,255,255,.12);--hf-bg:#0f151b}
  #rt-hfly *{box-sizing:border-box}
  .rt-hfly-in{max-width:1000px;margin:0 auto;display:grid;gap:26px;
    grid-template-columns:repeat(auto-fit,minmax(280px,1fr));align-items:center}
  .rt-hfly-k{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.20em;
    color:#C2410C;margin-bottom:10px}
  html.dark .rt-hfly-k{color:#FF8C03}
  #rt-hfly h2{font-size:clamp(24px,3.4vw,36px);line-height:1.1;font-weight:900;margin:0 0 12px}
  .rt-hfly-tx p{color:var(--hf-m);line-height:1.65;margin:0 0 14px;max-width:52ch}
  .rt-hfly-l{list-style:none;padding:0;margin:0;color:var(--hf-t);font-size:14.5px}
  .rt-hfly-l li{padding-left:24px;position:relative;margin-bottom:7px}
  .rt-hfly-l li:before{content:"✓";position:absolute;left:0;color:#2fbf62;font-weight:900}
  .rt-hfly-cta{background:var(--hf-c);border:1px solid var(--hf-l);border-radius:16px;
    padding:26px;text-align:center}
  .rt-hfly-off{display:flex;align-items:baseline;justify-content:center;gap:8px;margin-bottom:4px}
  .rt-hfly-off b{font-size:52px;font-weight:900;line-height:1;color:#C2410C}
  html.dark .rt-hfly-off b{color:#FF8C03}
  .rt-hfly-off span{font-size:15px;font-weight:700;color:var(--hf-m)}
  .rt-hfly-cod{margin:0 0 18px;font-size:14px;color:var(--hf-m)}
  .rt-hfly-cod b{color:var(--hf-t);letter-spacing:.06em}
  .rt-hfly-b{display:block;background:#C2410C;color:#fff;text-decoration:none;
    border-radius:10px;padding:14px 20px;font-weight:800;margin-bottom:10px}
  .rt-hfly-b:hover{filter:brightness(1.08)}
  .rt-hfly-cta small{color:var(--hf-m);font-size:12.5px;line-height:1.5;display:block}

  /* ===== MINI-CARRITO ("se agregó al carrito") =====
     27-jul-2026. Raul: "no se ve la imagen, no respeta claro ni oscuro y se ve cortada".
     Es el mini-carrito NATIVO de Squarespace (.commerce-mini-cart-*), no codigo nuestro.
     Medido en vivo, con el sitio en tema OSCURO, eran tres fallos distintos:
       1) SE CORTA: el dialogo nace en y=33 y la cabecera fija mide 80 px, asi que su
          primera linea queda debajo de la cabecera. Se baja para que la libre.
       2) NO RESPETA EL TEMA: fondo rgb(218,217,217) con texto negro, fijo, en ambos
          temas. En oscuro es un recuadro gris claro sobre negro. Y el icono de cerrar
          se pinta con background NEGRO -> invisible sobre fondo oscuro.
       3) IMAGEN: los productos sin foto propia (los paquetes nacionales) dejaban un
          hueco vacio que parece imagen rota. Se le pone al contenedor un fondo de
          marca, asi que sin foto se ve un mosaico naranja intencional, no un error. */
  .commerce-mini-cart-positioner--top-right .commerce-mini-cart-dialog{margin-top:58px !important}
  @media(max-width:640px){
    .commerce-mini-cart-positioner--top-right .commerce-mini-cart-dialog{margin-top:16px !important}
  }
  .commerce-mini-cart-dialog{background:#fff !important;color:#191512 !important;
    border:1px solid rgba(0,0,0,.10) !important;border-radius:14px !important;
    box-shadow:0 18px 50px rgba(20,15,10,.22) !important}
  .commerce-mini-cart-header-title,.commerce-mini-cart-item-details,
  .commerce-mini-cart-item-details *{color:#191512 !important}
  html.dark .commerce-mini-cart-dialog{background:#171f27 !important;color:#eef3f7 !important;
    border-color:rgba(255,255,255,.14) !important;
    box-shadow:0 20px 60px rgba(0,0,0,.62) !important}
  html.dark .commerce-mini-cart-header-title,
  html.dark .commerce-mini-cart-item-details,
  html.dark .commerce-mini-cart-item-details *{color:#eef3f7 !important}
  /* el aspa se dibuja con background-color: en oscuro iba negra sobre negro */
  html.dark .commerce-mini-cart-close-icon{background:#eef3f7 !important}
  /* producto sin foto: mosaico de marca en vez de hueco */
  .commerce-mini-cart-item-image-container{border-radius:8px !important;overflow:hidden !important;
    background:linear-gradient(135deg,#FF8C03,#C2410C) !important}
  .commerce-mini-cart-item-image-container img{border-radius:8px !important}
  .commerce-mini-cart-footer{border-top:1px solid rgba(0,0,0,.10) !important;padding-top:12px !important}
  html.dark .commerce-mini-cart-footer{border-top-color:rgba(255,255,255,.14) !important}

  /* ===== CARRITO: las filas =====
     27-jul-2026. Raul: "se ve desorganizado, no respeta margenes, no tiene imagenes y
     no se distingue si es agregar una persona o eliminar el ITEM".
     Las clases con hash (KGHc6QM2...) las regenera Squarespace en cada despliegue;
     aqui SOLO se usan las semanticas (.cart-row-*), que si son estables.

     1) TITULO CORTADO. Venia con white-space:nowrap + ellipsis, asi que "Canaima y el
        Salto Angel - desde Caracas" se leia "Canaima y el Salto ...". En un carrito,
        no poder leer QUE estas comprando es grave. Se deja en dos lineas.
     2) SIN IMAGEN. Los paquetes nacionales no tienen foto de producto y dejaban un
        recuadro gris vacio (.cart-row-no-img) con pinta de error. Mosaico de marca,
        igual que en el mini-carrito.
     3) CANTIDAD vs ELIMINAR. Los tres controles (menos, cantidad, mas) y el aspa de
        borrar tenian el mismo peso visual y estaban pegados, con el precio metido en
        medio. Ahora la cantidad es UNA pastilla con borde -se lee como un control- y
        el aspa se separa y se pone roja al pasar por encima: destructivo se ve
        destructivo. El texto del boton lo pone markCart(). */
  .cart-row{--ct-l:rgba(0,0,0,.12);--ct-m:#6b645c;
    gap:16px !important;padding:16px !important;align-items:center !important}
  html.dark .cart-row{--ct-l:rgba(255,255,255,.16);--ct-m:#9aa6b2}
  /* la columna del texto se quedaba en 176 px y el titulo se cortaba igual, ahora a
     dos lineas en vez de con puntos suspensivos. Se le da sitio de verdad: min-width:0
     es imprescindible para que un hijo flex PUEDA encogerse y repartir bien. */
  .cart-row-desc{min-width:0 !important;flex:1 1 46% !important}
  .cart-row-title{white-space:normal !important;text-overflow:clip !important;
    overflow:visible !important;display:-webkit-box !important;-webkit-line-clamp:3;
    -webkit-box-orient:vertical;line-height:1.35 !important}
  .cart-row-no-img{background:linear-gradient(135deg,#FF8C03,#C2410C) !important;
    border-radius:10px !important}
  .cart-row-no-img svg{opacity:.55 !important}
  .cart-row-img-wrapper{border-radius:10px !important;overflow:hidden !important;flex:0 0 auto}
  .cart-row-qty > div > div{border:1px solid var(--ct-l) !important;border-radius:999px !important;
    padding:2px !important;display:inline-flex !important;align-items:center !important}
  .cart-row-qty-dec,.cart-row-qty-inc{border-radius:999px !important}
  .cart-row-qty-dec:hover,.cart-row-qty-inc:hover{background:rgba(255,140,3,.16) !important}
  /* el margen izquierdo lo pisaba una regla de Squarespace mas especifica: el precio
     quedaba pegado al boton "+" y se leia "+US$ 1.250,00". Se sube la especificidad. */
  .cart-row .cart-row-price{margin:0 6px 0 18px !important;font-weight:700 !important}
  .cart-row-remove{border-radius:10px !important;opacity:.55;transition:opacity .15s,background .15s}
  .cart-row-remove:hover{opacity:1;background:rgba(229,72,77,.14) !important}
  .cart-row-remove:hover svg{color:#e5484d !important;fill:#e5484d !important}
  @media(max-width:600px){
    .cart-row{gap:12px !important;padding:14px !important}
    .cart-row-price{width:100% !important;margin:6px 0 0 !important}
  }
  /* ===== Guardar para después ===== */
  .rt-save{display:inline-block;margin-top:6px;background:none;border:none;padding:0;
    font:inherit;font-size:12.5px;font-weight:700;color:var(--ct-m);cursor:pointer;
    text-decoration:underline;text-underline-offset:3px}
  .rt-save:hover{color:#C2410C}
  html.dark .rt-save:hover{color:#FF8C03}
  #rt-guardados{--gd-c:#fff;--gd-t:#191512;--gd-m:#6b645c;--gd-l:rgba(0,0,0,.12);
    margin-top:26px;color:var(--gd-t)}
  html.dark #rt-guardados{--gd-c:#171f27;--gd-t:#eef3f7;--gd-m:#9aa6b2;--gd-l:rgba(255,255,255,.14)}
  #rt-guardados h3{font-size:17px;font-weight:800;margin:0 0 4px}
  #rt-guardados h3 small{font-weight:700;color:var(--gd-m);font-size:13px}
  .rt-gd-sub{color:var(--gd-m);font-size:13px;margin:0 0 12px;line-height:1.5}
  .rt-gd-row{display:flex;align-items:center;gap:14px;background:var(--gd-c);
    border:1px solid var(--gd-l);border-radius:12px;padding:12px;margin-bottom:9px}
  .rt-gd-row img,.rt-gd-ph{width:56px;height:56px;border-radius:9px;object-fit:cover;
    flex:0 0 auto;background:linear-gradient(135deg,#FF8C03,#C2410C)}
  .rt-gd-tx{flex:1;min-width:0}
  .rt-gd-tx b{display:block;font-size:14px;line-height:1.35}
  .rt-gd-tx span{font-size:13px;color:var(--gd-m)}
  .rt-gd-add{color:#C2410C;font-weight:800;font-size:13px;text-decoration:none;white-space:nowrap}
  html.dark .rt-gd-add{color:#FF8C03}
  .rt-gd-del{background:none;border:none;color:var(--gd-m);cursor:pointer;font-size:15px;
    padding:6px 8px;border-radius:8px;line-height:1}
  .rt-gd-del:hover{color:#e5484d;background:rgba(229,72,77,.12)}
  @media(max-width:520px){
    .rt-gd-row{flex-wrap:wrap}
    .rt-gd-add{width:100%;margin-top:4px}
  }

  /* ===== HERO del inicio: laminas que se cruzan =====
     Las capas nuevas van con la MISMA opacidad que la original (.6 en claro, .4 en
     oscuro) para que el titular siga leyendose igual de bien sobre cualquier foto.
     El velo (.hero-scrim) queda por encima porque se inserta despues en el DOM. */
  .rt-hero-img{position:absolute;inset:0;background-size:cover;background-position:center;
    opacity:0;transition:opacity .9s ease;pointer-events:none;z-index:0}
  html:not(.dark) .rt-hero-img{filter:opacity(.6)}
  html.dark .rt-hero-img{filter:opacity(.4)}
  body.rt-home .bg-cover{transition:opacity .9s ease}
  /* ===== /tienda: catalogo completo ===== */
  #rt-tcat{--tc-c:#fff;--tc-t:#191512;--tc-m:#6b645c;--tc-l:rgba(0,0,0,.10);--tc-bg:#faf7f4;
    background:var(--tc-bg);color:var(--tc-t);padding:64px 20px 76px}
  html.dark #rt-tcat{--tc-c:#171f27;--tc-t:#eef3f7;--tc-m:#9aa6b2;
    --tc-l:rgba(255,255,255,.12);--tc-bg:#0f151b}
  #rt-tcat *{box-sizing:border-box}
  .rt-tcat-in{max-width:1100px;margin:0 auto}
  .rt-tcat-k{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.20em;
    color:#C2410C;margin-bottom:10px}
  html.dark .rt-tcat-k{color:#FF8C03}
  #rt-tcat h2{font-size:clamp(25px,3.6vw,38px);line-height:1.1;font-weight:900;margin:0 0 12px}
  .rt-tcat-sub{color:var(--tc-m);margin:0 0 30px;max-width:58ch;line-height:1.6}
  .rt-tcat-g{display:grid;gap:14px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
  .rt-tcat-c{display:flex;flex-direction:column;background:var(--tc-c);
    border:1px solid var(--tc-l);border-radius:16px;padding:22px;text-decoration:none;
    color:inherit;transition:transform .18s ease,border-color .18s ease,box-shadow .18s ease}
  .rt-tcat-c:hover{transform:translateY(-3px);border-color:#FF8C03;
    box-shadow:0 16px 40px -18px rgba(20,15,10,.45)}
  .rt-tcat-i{font-size:30px;line-height:1;margin-bottom:12px}
  .rt-tcat-c b{font-size:18px;font-weight:800;margin-bottom:7px}
  .rt-tcat-c p{color:var(--tc-m);font-size:14px;line-height:1.55;margin:0 0 16px;flex:1}
  .rt-tcat-a{color:#C2410C;font-weight:800;font-size:14px}
  html.dark .rt-tcat-a{color:#FF8C03}
  @media(max-width:520px){ #rt-tcat{padding:44px 16px 54px} }

  /* ===== Bono de regalo ===== */
  #rt-gift{--gf-c:#fff;--gf-t:#191512;--gf-m:#6b645c;--gf-l:rgba(0,0,0,.12);--gf-bg:#fff}
  html.dark #rt-gift{--gf-c:#171f27;--gf-t:#eef3f7;--gf-m:#9aa6b2;
    --gf-l:rgba(255,255,255,.14);--gf-bg:#0b1015}
  #rt-gift{background:var(--gf-bg);color:var(--gf-t);padding:64px 20px 76px}
  #rt-gift *{box-sizing:border-box}
  .rt-gift-in{max-width:1000px;margin:0 auto;display:grid;gap:30px;
    grid-template-columns:repeat(auto-fit,minmax(290px,1fr));align-items:center}
  .rt-gift-k{display:inline-block;font-size:12px;font-weight:800;letter-spacing:.20em;
    color:#C2410C;margin-bottom:10px}
  html.dark .rt-gift-k{color:#FF8C03}
  #rt-gift h2{font-size:clamp(25px,3.6vw,38px);line-height:1.1;font-weight:900;margin:0 0 12px}
  .rt-gift-tx p{color:var(--gf-m);line-height:1.65;margin:0 0 14px}
  .rt-gift-tx p b{color:var(--gf-t)}
  .rt-gift-l{list-style:none;padding:0;margin:0;font-size:14.5px}
  .rt-gift-l li{padding-left:24px;position:relative;margin-bottom:7px;color:var(--gf-t)}
  .rt-gift-l li:before{content:"✓";position:absolute;left:0;color:#2fbf62;font-weight:900}
  .rt-gift-card{background:var(--gf-c);border:1px solid var(--gf-l);border-radius:16px;padding:24px}
  .rt-gift-lb{display:block;font-size:13px;font-weight:700;margin:14px 0 7px;color:var(--gf-t)}
  .rt-gift-lb:first-child{margin-top:0}
  .rt-gift-lb small{font-weight:500;color:var(--gf-m)}
  .rt-gift-m{display:grid;grid-template-columns:repeat(auto-fit,minmax(84px,1fr));gap:8px}
  .rt-gift-b{background:none;border:1px solid var(--gf-l);border-radius:10px;padding:11px 8px;
    font:inherit;font-weight:800;color:var(--gf-t);cursor:pointer;transition:all .15s}
  .rt-gift-b:hover{border-color:#FF8C03}
  .rt-gift-b.on{background:#C2410C;border-color:#C2410C;color:#fff}
  #rt-gift input,#rt-gift textarea{width:100%;padding:11px 13px;border-radius:10px;
    border:1px solid var(--gf-l);background:transparent;color:var(--gf-t);font:inherit}
  #rt-gift input:focus,#rt-gift textarea:focus{border-color:#FF8C03;outline:none}
  .rt-gift-av{display:none;margin:12px 0 0;background:rgba(229,72,77,.12);
    border:1px solid rgba(229,72,77,.42);border-radius:10px;padding:10px 13px;font-size:13.5px}
  .rt-gift-go{width:100%;margin-top:16px;background:#C2410C;color:#fff;border:none;
    border-radius:10px;padding:14px;font:inherit;font-weight:800;cursor:pointer}
  .rt-gift-go:hover{filter:brightness(1.08)}
  .rt-gift-card > small{display:block;margin-top:10px;color:var(--gf-m);font-size:12.5px;
    text-align:center}
  @media(max-width:520px){ #rt-gift{padding:44px 16px 54px} }

  /* ===== BOTONES DE WHATSAPP: contraste =====
     27-jul-2026, autorizado por Raul ("si tienes que mejorarlo, hazlo").
     Los botones de texto iban en BLANCO sobre el verde vivo #25D366: contraste
     1,98:1 cuando el minimo legible es 4,5:1. A pleno sol, en un telefono, ese
     boton -que es el que mas vende- practicamente no se lee.
     Se pasa al verde OSCURO de WhatsApp #075E54, que es un color oficial suyo (el
     de su cabecera), no un invento: sigue leyendose como WhatsApp y con blanco da
     7,7:1. Se conserva el verde vivo SOLO en el boton flotante, que es un icono
     -no texto- y ahi el brillo ayuda a encontrarlo; a ese se le pone el icono en
     BLANCO, porque venia en negro sobre verde y casi no se distinguia. */
  a[href*="wa.me"]:not(.rt-wa-float-btn):not(.rt-fab),
  a[href*="whatsapp.com"]:not(.rt-wa-float-btn):not(.rt-fab),
  .rt-wabtn,.rtp-cta{background-color:#075E54 !important;color:#fff !important}
  a[href*="wa.me"]:not(.rt-wa-float-btn):not(.rt-fab):hover,
  .rt-wabtn:hover,.rtp-cta:hover{background-color:#0A7A6C !important}
  .rt-wa-float-btn{color:#fff !important}
  .rt-wa-float-btn svg,.rt-wa-float-btn i{color:#fff !important;fill:#fff !important}
  /* en movil el flotante tapaba la pastilla de "Estado de las aerolineas" del
     inicio: se sube lo justo para dejarla ver, sin perder el pulgar */
  @media(max-width:640px){
    .rt-wa-float-btn,.rt-wa-float{bottom:86px !important}
  }

  .rt-hero-fade{opacity:0 !important}
  body.rt-home h1,body.rt-home .glass-orange,
  body.rt-home .relative.z-10 > p{transition:opacity .35s ease}
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

  /* ================= CALCULADORA DE SEGURO DE VIAJE (Simply Assistance) =========
     27-jul-2026. Fuente de los precios: Documentos\IA\ORION\seguros\TARIFARIO-SIMPLY.md
     (capturado del portal de agencia). NADA de esto es inventado y NO se toca sin
     actualizar tambien ese archivo: es la fuente unica.

     La regla que hace esto posible: NO hay recargo por edad. Hay tres familias de
     planes y la edad del viajero decide en cual cae (0-75 / 76-85 / 86-99). Por eso
     un grupo mixto se puede cotizar exacto: cada viajero en su familia, y se suma.

     Los precios YA incluyen el margen de Raul -> no se recarga nada encima.

     Por que el boton final va a WhatsApp y no al carrito: el precio es por DIA y por
     PERSONA, y la tienda de Squarespace solo sabe de precios fijos. Cotizar exacto
     aqui y cerrar por WhatsApp es lo que se puede hacer HOY sin acceso de admin.
     Cuando existan los productos por plan, este mismo calculo alimenta el carrito.

     Los tramos 76-85 y 86-99 se marcan como ESTIMADO a proposito: las fichas de
     mayores del portal dicen "Para Mayores aplicaran aumentos" y hasta que Simply
     lo aclare no se le promete a nadie un precio cerrado. */
  var SEG_ADIC = [
    {id:'mas', nom:'Mascota a bordo',                  usd:37.00},
    {id:'can', nom:'Gastos de cancelación (US$ 3.000)', usd:68.50},
    {id:'d2',  nom:'Deporte profesional · nivel 2',     usd:68.50},
    {id:'d3',  nom:'Deporte profesional · nivel 3',     usd:79.00},
    {id:'d4',  nom:'Deporte profesional · nivel 4',     usd:89.50}
  ];
  /* j = 0-75 · s = 76-85 · p = 86-99 · null = ese plan no existe para esa edad */
  var SEG_NIV = [
    {cob:'US$ 5.000',   eu:false, nota:'Sin cobertura de preexistencias',
     j:{n:'SIMPLY 5',        u:1.00}, s:{n:'SIMPLY 5 +75',   u:1.50}, p:{n:'SIMPLY 5 SENIOR PLUS', u:2.00}},
    {cob:'US$ 10.000',  eu:false, nota:'Preexistencias hasta US$ 200 (solo 0-75)', nac:true,
     j:{n:'SIMPLY 10 NAC',   u:2.00}, s:{n:'SIMPLY 10 NAC +75', u:3.00}, p:{n:'SIMPLY 10 NAC SENIOR PLUS', u:4.00}},
    {cob:'US$ 10.000',  eu:false, nota:'Preexistencias hasta US$ 200 (solo 0-75)',
     j:{n:'SIMPLY 10 INTL',  u:2.00}, s:{n:'SIMPLY 10 INTL +75', u:3.00}, p:{n:'SIMPLY 10 INTL SENIOR PLUS', u:4.00}},
    {cob:'US$ 43.000',  eu:false, nota:'La mejor relación cobertura/precio · sin preexistencias',
     j:{n:'SIMPLY 43',       u:2.00}, s:null, p:null},
    {cob:'US$ 15.000',  eu:false, nota:'Preexistencias hasta US$ 300 (solo 0-75)',
     j:{n:'SIMPLY 15',       u:2.60}, s:{n:'SIMPLY 15 +75', u:3.90}, p:{n:'SIMPLY 15 SENIOR PLUS', u:5.20}},
    {cob:'US$/€ 35.000', eu:true,  nota:'Válido para visado Schengen · preexistencias hasta US$ 3.000',
     j:{n:'SIMPLY 35SS',     u:3.00}, s:{n:'SIMPLY 35 SS SENIOR', u:4.50}, p:{n:'SIMPLY 35 SS SENIOR PLUS', u:6.00}},
    {cob:'US$ 55.000',  eu:false, nota:'Preexistencias hasta US$ 5.500',
     j:{n:'SIMPLY 55 SS',    u:3.70}, s:{n:'SIMPLY 55 SS SENIOR', u:5.55}, p:null},
    {cob:'US$ 75.000',  eu:false, nota:'Preexistencias hasta US$ 7.500',
     j:{n:'SIMPLY 75SS',     u:4.50}, s:null, p:null},
    {cob:'US$ 100.000', eu:false, nota:'Preexistencias hasta US$ 10.000',
     j:{n:'SIMPLY 100SS',    u:5.00}, s:null, p:null},
    {cob:'US$ 250.000', eu:false, nota:'Preexistencias hasta US$ 12.500',
     j:{n:'SIMPLY 250SS',    u:15.00}, s:null, p:null},
    {cob:'US$ 500.000', eu:false, nota:'Preexistencias hasta US$ 15.000',
     j:{n:'SIMPLY 500SS',    u:19.00}, s:null, p:null},
    {cob:'US$ 1.000.000', eu:false, nota:'Preexistencias hasta US$ 18.000',
     j:{n:'SIMPLY 1MSS',     u:22.00}, s:null, p:null}
  ];
  function segBanda(edad){ return edad<=75?'j' : (edad<=85?'s':'p'); }
  function segDias(a,b){
    if(!a||!b) return 0;
    var d=(new Date(b+'T00:00:00') - new Date(a+'T00:00:00'))/86400000;
    return d>=0 ? Math.floor(d)+1 : 0;   /* dia de salida y de regreso, ambos cubiertos */
  }
  function segMoney(n){ return 'US$ ' + n.toFixed(2).replace('.',','); }

  function seguroCalc(){
    if((location.pathname.replace(/\/+$/,'')||'/')!=='/servicios') return;
    if(document.getElementById('rt-seg')) return;
    var host=document.querySelector('#sections')||document.getElementById('page')||document.querySelector('main');
    if(!host) return;

    var wrap=document.createElement('section');
    wrap.id='rt-seg';
    wrap.innerHTML=
      '<div class="rt-seg-in">'
      + '<span class="rt-seg-k">ASISTENCIA MÉDICA EN VIAJE</span>'
      + '<h2>Calcula tu seguro en 30 segundos</h2>'
      + '<p class="rt-seg-sub">Precio exacto, sin esperar respuesta. Cobertura real desde el día '
      + 'que sales hasta el que regresas.</p>'
      + '<div class="rt-seg-grid">'
      +   '<div class="rt-seg-f"><label for="rt-seg-d">Destino</label>'
      +     '<select id="rt-seg-d"><option value="int">Internacional</option>'
      +     '<option value="eu">Europa (espacio Schengen)</option>'
      +     '<option value="nac">Dentro de Venezuela</option></select></div>'
      +   '<div class="rt-seg-f"><label for="rt-seg-i">Fecha de salida</label>'
      +     '<input type="date" id="rt-seg-i"></div>'
      +   '<div class="rt-seg-f"><label for="rt-seg-v">Fecha de regreso</label>'
      +     '<input type="date" id="rt-seg-v"></div>'
      + '</div>'
      + '<div class="rt-seg-pax"><div class="rt-seg-paxh"><b>Viajeros</b>'
      +   '<button type="button" id="rt-seg-add">+ Añadir viajero</button></div>'
      +   '<div id="rt-seg-list"></div>'
      +   '<small>La edad decide el plan que le corresponde a cada viajero. '
      +   'Se cubre de 0 a 99 años.</small></div>'
      + '<div class="rt-seg-ad"><b>¿Necesitas algo más?</b><div id="rt-seg-adl"></div></div>'
      + '<div id="rt-seg-out" class="rt-seg-out"></div>'
      + '</div>';
    host.appendChild(wrap);

    var list=wrap.querySelector('#rt-seg-list');
    function fila(edad){
      var d=document.createElement('div'); d.className='rt-seg-row';
      d.innerHTML='<span>Edad</span><input type="number" min="0" max="99" value="'+edad+'" class="rt-seg-edad">'
                 +'<button type="button" class="rt-seg-del" title="Quitar viajero">✕</button>';
      list.appendChild(d);
      d.querySelector('.rt-seg-edad').addEventListener('input', calc);
      d.querySelector('.rt-seg-del').addEventListener('click', function(){
        if(list.children.length>1){ d.remove(); calc(); }
      });
    }
    fila(30);
    wrap.querySelector('#rt-seg-add').addEventListener('click', function(){ fila(30); calc(); });

    var adl=wrap.querySelector('#rt-seg-adl');
    SEG_ADIC.forEach(function(a){
      var l=document.createElement('label'); l.className='rt-seg-chk';
      l.innerHTML='<input type="checkbox" value="'+a.id+'"> <span>'+a.nom+'</span>'
                 +'<b>'+segMoney(a.usd)+'</b>';
      adl.appendChild(l);
      l.querySelector('input').addEventListener('change', calc);
    });
    ['#rt-seg-d','#rt-seg-i','#rt-seg-v'].forEach(function(s){
      wrap.querySelector(s).addEventListener('change', calc);
    });

    function calc(){
      var out=wrap.querySelector('#rt-seg-out');
      var dest=wrap.querySelector('#rt-seg-d').value;
      var dias=segDias(wrap.querySelector('#rt-seg-i').value, wrap.querySelector('#rt-seg-v').value);
      var edades=[].slice.call(list.querySelectorAll('.rt-seg-edad'))
                   .map(function(i){ return parseInt(i.value,10); })
                   .filter(function(n){ return !isNaN(n) && n>=0 && n<=99; });
      if(!dias || !edades.length){
        out.innerHTML='<p class="rt-seg-hint">Elige las fechas y la edad de cada viajero '
                    + 'para ver el precio.</p>';
        return;
      }
      /* niveles validos para el destino elegido */
      var nivs=SEG_NIV.filter(function(n){
        if(dest==='eu')  return n.eu;              /* Schengen exige 30.000 EUR */
        if(dest==='nac') return !!n.nac || n.cob==='US$ 5.000';
        return !n.nac;                             /* internacional: todo menos el NAC */
      });
      var adics=[].slice.call(adl.querySelectorAll('input:checked')).map(function(i){
        return SEG_ADIC.filter(function(a){ return a.id===i.value; })[0];
      });
      var extra=adics.reduce(function(s,a){ return s+a.usd; },0);

      var html='<div class="rt-seg-res"><div class="rt-seg-resh">'
             + '<b>'+dias+' día'+(dias===1?'':'s')+'</b> · <b>'+edades.length+' viajero'
             + (edades.length===1?'':'s')+'</b></div>';
      var hayEst=false, alguno=false;

      nivs.forEach(function(n){
        var total=0, det=[], ok=true;
        edades.forEach(function(e){
          var b=segBanda(e), pl=n[b];
          if(!pl){ ok=false; return; }
          if(b!=='j') hayEst=true;
          total+=pl.u*dias;
          det.push(e+' años → '+pl.n+' ('+segMoney(pl.u)+'/día)');
        });
        if(!ok) return;
        alguno=true;
        total+=extra;
        html+='<div class="rt-seg-card">'
            + '<div class="rt-seg-cabec"><b>Cobertura '+n.cob+'</b>'
            + (n.eu?'<span class="rt-seg-eu">Schengen</span>':'')+'</div>'
            + '<p class="rt-seg-nota">'+n.nota+'</p>'
            + '<ul class="rt-seg-det"><li>'+det.join('</li><li>')+'</li>'
            + (extra?'<li>Adicionales: '+adics.map(function(a){return a.nom;}).join(', ')
                    +' — '+segMoney(extra)+'</li>':'')
            + '</ul>'
            + '<div class="rt-seg-tot"><span>Total</span><b>'+segMoney(total)+'</b></div>'
            + '<button type="button" class="rt-seg-go" data-t="'+segMoney(total)+'" '
            + 'data-p="'+det.join(' | ')+'" data-c="'+n.cob+'">Reservar este plan</button>'
            + '</div>';
      });

      if(!alguno){
        html+='<p class="rt-seg-hint">Para las edades que pusiste no hay plan de este '
            + 'destino con cobertura suficiente. Escríbenos y te lo resolvemos a mano.</p>';
      }
      if(hayEst){
        html+='<p class="rt-seg-est">⚠️ Hay viajeros de 76 años o más. Su tarifa es un '
            + '<b>estimado</b>: tu asesor te confirma el monto final antes de emitir.</p>';
      }
      html+='</div>';
      out.innerHTML=html;

      out.querySelectorAll('.rt-seg-go').forEach(function(b){
        b.addEventListener('click', function(){
          var msg='🩺 *Seguro de viaje — Reaño Travels*%0A'
                + 'Cobertura: '+encodeURIComponent(b.getAttribute('data-c'))+'%0A'
                + 'Días: '+dias+'%0A'
                + 'Viajeros: '+encodeURIComponent(b.getAttribute('data-p'))+'%0A'
                + (extra?'Adicionales: '+encodeURIComponent(adics.map(function(a){return a.nom;}).join(', '))+'%0A':'')
                + 'Total: '+encodeURIComponent(b.getAttribute('data-t'));
          window.open('https://wa.me/584247309699?text='+msg,'_blank');
        });
      });
    }
    calc();
  }

  /* ================= BUSCADOR DE HOTELES (/hoteles) =============================
     27-jul-2026. Raul: "en destino no sale un catalogo, solo me deja escribir; y no
     me deja poner habitaciones ni ninos/infantes con sus edades".
     Comprobado antes de tocar: el <form id="h-search"> NO tiene action NI onsubmit
     y su boton no tiene manejador -> **hoy no hace absolutamente nada** y cada
     solicitud de hotel se pierde. Por eso esto no es un retoque, es darle salida.

     Se AMPLIA el formulario que ya existe (no se reemplaza): asi conserva su
     maqueta y su estilo, y si Squarespace lo re-renderiza, run() vuelve a montarlo.
     Destino: <datalist> con los destinos que Reano mueve de verdad, PERO el campo
     sigue siendo de texto libre — un catalogo cerrado dejaria fuera al que busca un
     hotel concreto.
     Las edades de ninos e infantes son OBLIGATORIAS: sin ellas ningun hotel puede
     tarifar, y es justo el dato que faltaba.

     CORRECCION IMPORTANTE (misma sesion): primero di por hecho que el formulario "no
     hacia nada" porque no tiene action ni onsubmit. FALSO — el manejador esta puesto
     con addEventListener desde la inyeccion, y abre Booking.com. Un interceptor con
     stopPropagation habria MATADO la busqueda. Comprobar los atributos de un <form>
     NO prueba que no tenga manejadores: hay que buscar addEventListener en la fuente.
     Ahora se sustituye la URL de Booking por una COMPLETA (habitaciones + ninos +
     una edad por nino), en vez de la vieja que mandaba siempre no_rooms=1 y
     group_children=0 y por eso ensenaba un precio que cambiaba al llegar. */
  var HOT_DEST = ['Bogotá','Medellín','Cartagena','Madrid','Barcelona (España)','Roma',
    'París','Lisboa','Panamá','Miami','Orlando','Nueva York','Punta Cana','Santo Domingo',
    'Curazao','Aruba','Cancún','Ciudad de México','Buenos Aires','Lima','Santiago de Chile',
    'Isla de Margarita','Los Roques','Canaima','Mérida','Caracas'];

  function hotelesForm(){
    if((location.pathname.replace(/\/+$/,'')||'/')!=='/hoteles') return;
    var f=document.getElementById('h-search'); if(!f) return;
    if(f.getAttribute('data-rt-hot')) return;
    var pax=document.getElementById('h-pax'); if(!pax) return;
    f.setAttribute('data-rt-hot','1');

    /* 1 · catalogo de destinos, sin cerrar el texto libre */
    var dest=document.getElementById('h-dest');
    if(dest && !document.getElementById('rt-hot-dl')){
      var dl=document.createElement('datalist'); dl.id='rt-hot-dl';
      dl.innerHTML=HOT_DEST.map(function(d){ return '<option value="'+d+'">'; }).join('');
      document.body.appendChild(dl);
      dest.setAttribute('list','rt-hot-dl');
      dest.placeholder='Ciudad, país u hotel — elige o escribe el tuyo';
    }

    /* 2 · habitaciones, ninos e infantes (con edades) */
    var box=document.createElement('div');
    box.id='rt-hot-extra';
    box.innerHTML=
      '<div class="rt-hot-g">'
      + '<div class="rt-hot-f"><label for="rt-hot-hab">Habitaciones</label>'
      +   '<select id="rt-hot-hab"><option>1</option><option>2</option><option>3</option>'
      +   '<option>4</option><option>5</option></select></div>'
      + '<div class="rt-hot-f"><label for="rt-hot-nin">Niños <small>(2 a 11 años)</small></label>'
      +   '<select id="rt-hot-nin"><option>0</option><option>1</option><option>2</option>'
      +   '<option>3</option><option>4</option></select></div>'
      + '<div class="rt-hot-f"><label for="rt-hot-inf">Infantes <small>(0 a 23 meses)</small></label>'
      +   '<select id="rt-hot-inf"><option>0</option><option>1</option><option>2</option>'
      +   '<option>3</option></select></div>'
      + '</div>'
      + '<div id="rt-hot-edades" class="rt-hot-ed"></div>';
    pax.closest('div').parentNode.insertBefore(box, pax.closest('div').nextSibling);

    var edBox=box.querySelector('#rt-hot-edades');
    function pintarEdades(){
      var n=parseInt(box.querySelector('#rt-hot-nin').value,10);
      var i=parseInt(box.querySelector('#rt-hot-inf').value,10);
      if(!n && !i){ edBox.innerHTML=''; return; }
      var h='<span class="rt-hot-edt">Edad de cada uno <b>al viajar</b> — los hoteles '
           +'no pueden dar precio sin este dato</span><div class="rt-hot-edg">';
      for(var k=1;k<=n;k++) h+='<label>Niño '+k+'<input type="number" min="2" max="11" '
        +'placeholder="años" class="rt-hot-e" data-t="Niño '+k+'"></label>';
      for(var m=1;m<=i;m++) h+='<label>Infante '+m+'<input type="number" min="0" max="23" '
        +'placeholder="meses" class="rt-hot-e" data-t="Infante '+m+'" data-m="1"></label>';
      edBox.innerHTML=h+'</div>';
    }
    box.querySelector('#rt-hot-nin').addEventListener('change', pintarEdades);
    box.querySelector('#rt-hot-inf').addEventListener('change', pintarEdades);

    /* 3 · darle salida: el boton arma la solicitud completa y la manda por WhatsApp */
    f.addEventListener('submit', function(ev){
      ev.preventDefault(); ev.stopPropagation();
      var d=(dest&&dest.value||'').trim();
      var i1=(document.getElementById('h-in')||{}).value;
      var o1=(document.getElementById('h-out')||{}).value;
      var faltan=[];
      if(!d)  faltan.push('el destino');
      if(!i1) faltan.push('la fecha de entrada');
      if(!o1) faltan.push('la fecha de salida');
      var edades=[].slice.call(edBox.querySelectorAll('.rt-hot-e'));
      var sinEdad=edades.filter(function(e){ return e.value===''; });
      if(sinEdad.length) faltan.push('la edad de los menores');
      var av=document.getElementById('rt-hot-av');
      if(faltan.length){
        if(!av){ av=document.createElement('p'); av.id='rt-hot-av'; av.className='rt-hot-av';
                 box.appendChild(av); }
        av.textContent='Falta '+faltan.join(', ')+'.';
        av.style.display='block';
        (sinEdad[0]||dest).focus();
        return;
      }
      if(av) av.style.display='none';
      /* Se abre Booking IGUAL que antes — pero con TODO. El buscador original
         mandaba siempre no_rooms=1 y group_children=0, asi que una familia con
         ninos veia precios de una habitacion doble sin ellos: el precio real
         cambiaba al llegar. Booking si acepta habitaciones, ninos y una edad por
         nino (&age=N repetido), y eso es lo que se le pasa ahora. */
      var adultos=parseInt(pax.value,10);
      if(isNaN(adultos)) adultos=parseInt((pax.options[pax.selectedIndex].text||'2'),10)||2;
      var u='https://www.booking.com/searchresults.es.html?ss='+encodeURIComponent(d)
          + '&checkin='+i1+'&checkout='+o1
          + '&group_adults='+adultos
          + '&no_rooms='+box.querySelector('#rt-hot-hab').value;
      var edadesBk=edades.map(function(e){
        var v=parseInt(e.value,10);
        /* los infantes se piden en MESES y Booking los quiere en anos cumplidos */
        return e.getAttribute('data-m') ? Math.floor(v/12) : v;
      });
      u+='&group_children='+edadesBk.length;
      edadesBk.forEach(function(a){ u+='&age='+a; });
      if(window.BOOKING_AID) u+='&aid='+encodeURIComponent(window.BOOKING_AID);
      window.open(u,'_blank');
    }, true);
  }

  /* ================= HOLAFLY — eSIM (alianza Travel Partner) ====================
     27-jul-2026. Va como ENLACE DE AFILIADO, nunca como articulo del carrito: Raul
     cobra comision por su enlace (holafly.sjv.io) mas el codigo REANOTRAVELS. Si se
     vendiera dentro de la tienda, se perderia la comision — que es todo el negocio.
     Sin logotipo de Holafly: no tenemos el archivo oficial y la regla de marca es
     usar SIEMPRE isotipos oficiales. Se resuelve con tipografia y color propios.
     El 5% es el mismo que ya anuncia la pastilla del home: no se inventa otro numero. */
  var HOLAFLY_URL='https://holafly.sjv.io/qWzvnj';
  function holaflyBanda(){
    var p=(location.pathname.replace(/\/+$/,'')||'/');
    if(p!=='/servicios' && p!=='/vuelos') return;
    if(document.getElementById('rt-hfly')) return;
    var host=document.querySelector('#sections')||document.getElementById('page')||document.querySelector('main');
    if(!host) return;
    var s=document.createElement('section');
    s.id='rt-hfly';
    s.innerHTML=
      '<div class="rt-hfly-in">'
      + '<div class="rt-hfly-tx">'
      +   '<span class="rt-hfly-k">INTERNET EN EL EXTRANJERO</span>'
      +   '<h2>Llega conectado, sin pagar roaming</h2>'
      +   '<p>eSIM de <b>Holafly</b> con datos ilimitados en más de 200 destinos. '
      +   'Se activa antes de salir de casa: escaneas un código y aterrizas con internet, '
      +   'sin buscar una tienda ni cambiar tu chip.</p>'
      +   '<ul class="rt-hfly-l"><li>Conservas tu número de WhatsApp</li>'
      +   '<li>Activación inmediata, sin envío</li>'
      +   '<li>Soporte en español 24/7</li></ul>'
      + '</div>'
      + '<div class="rt-hfly-cta">'
      +   '<div class="rt-hfly-off"><b>5%</b><span>de descuento</span></div>'
      +   '<p class="rt-hfly-cod">Con el código <b>REANOTRAVELS</b></p>'
      +   '<a class="rt-hfly-b" href="'+HOLAFLY_URL+'" target="_blank" rel="noopener">'
      +   'Ver planes y precios</a>'
      +   '<small>Te lleva a Holafly, aliado oficial de Reaño Travels.</small>'
      + '</div></div>';
    host.appendChild(s);
  }

  /* ================= HERO DEL INICIO: rotacion de mensaje e imagen ===============
     27-jul-2026. Raul: "siento que es muy estatica, me gustaria que ese banner de
     bienvenida vaya cambiando al igual que la imagen, algo mas dinamico".

     Como esta montado el hero (medido en vivo): <section> con dos capas — una de fondo
     (div .bg-cover con background-image + un velo .hero-scrim encima) y otra de
     contenido con el logo, la pastilla, el h1, el parrafo y los botones.

     Decisiones:
     · La lamina 1 es la que YA existe: su texto se LEE del DOM en vez de reescribirlo,
       asi que si Raul cambia el titular desde Squarespace, la rotacion lo respeta.
     · Solo se rota pastilla, titular y parrafo. Los botones NO cambian: son genericos
       ("Cotizar mi viaje" / "Ver servicios") y moverlos bajo el dedo del que va a
       pulsar es una forma segura de perder un clic.
     · Cero precios en las laminas. Un precio en el hero envejece sin que nadie lo mire
       — es exactamente lo que acaba de pasar con la fecha de Maiquetia.
     · Se respeta prefers-reduced-motion: si el sistema pide menos animacion, se queda
       la lamina 1 fija.
     · Se pausa con la pestana en segundo plano y al pasar el raton por encima (si
       alguien esta leyendo, no se le cambia el texto debajo).
     Imagenes: las del propio repo, ya usadas en otras partes del sitio. */
  var HERO_CDN='https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/';
  var HERO_SLIDES=[
    null,   /* marcador: la lamina que ya trae la pagina */
    {k:'VIVE A TUS ARTISTAS EN VIVO', t:'Conciertos con todo resuelto',
     p:'Vuelo, hotel, traslados y entrada. Karol G y BTS en Bogotá, con salidas desde Caracas y el Táchira.',
     img:HERO_CDN+'intl-bogota.jpg'},
    {k:'PAQUETES NACIONALES', t:'Descubre Venezuela',
     p:'Los Roques, Canaima y la Isla de Margarita con vuelo, hospedaje y traslados incluidos.',
     img:HERO_CDN+'losroques.jpg'},
    {k:'EUROPA Y COLOMBIA', t:'Tu viaje internacional, a tu medida',
     p:'Vuelos, hotel, traslados y actividades, armados contigo. Te lo cotizamos sin compromiso.',
     img:HERO_CDN+'intl-colosseum.jpg'}
  ];
  function heroRotador(){
    if(!document.body.classList.contains('rt-home')) return;
    if(document.getElementById('rt-hero-rot')) return;
    if(window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    var pill=null;
    document.querySelectorAll('span').forEach(function(e){
      if(!pill && !e.children.length && /descubre el mundo/i.test(e.textContent||'')) pill=e;
    });
    if(!pill) return;
    var cont=pill.parentElement, sec=cont && cont.parentElement;
    var h1=cont && cont.querySelector('h1'), p=cont && cont.querySelector('p');
    if(!sec || !h1 || !p) return;
    var capa=sec.children[0]; if(!capa) return;
    var base=capa.querySelector('.bg-cover'); if(!base) return;

    /* lamina 1 = lo que ya hay en la pagina */
    HERO_SLIDES[0]={k:(pill.textContent||'').trim(), t:h1.innerHTML, p:p.innerHTML,
                    img:null, base:true};

    var marca=document.createElement('span');
    marca.id='rt-hero-rot'; marca.style.display='none'; sec.appendChild(marca);

    /* una capa por cada imagen nueva, encima de la original y bajo el velo */
    var capas=[];
    HERO_SLIDES.forEach(function(s,i){
      if(!s || !s.img) { capas[i]=null; return; }
      var d=document.createElement('div');
      d.className='rt-hero-img';
      d.style.backgroundImage='url("'+s.img+'")';
      base.parentNode.insertBefore(d, base.nextSibling);
      capas[i]=d;
    });

    var idx=0, pausa=false;
    /* Solo se desvanecen los TRES elementos que cambian. Antes se desvanecia el
       contenedor entero y con el se iban el logo y los botones: el hero parpadeaba
       completo en cada vuelta y, pillado a media transicion, parecia roto. Ademas
       hacer desaparecer un boton 380 ms mientras alguien va a pulsarlo es la forma
       mas tonta de perder una venta. */
    var cambian=[pill,h1,p];
    function pinta(n){
      var s=HERO_SLIDES[n]; if(!s) return;
      cambian.forEach(function(e){ e.classList.add('rt-hero-fade'); });
      setTimeout(function(){
        pill.textContent=s.k; h1.innerHTML=s.t; p.innerHTML=s.p;
        cambian.forEach(function(e){ e.classList.remove('rt-hero-fade'); });
      }, 380);
      capas.forEach(function(c){ if(c) c.style.opacity='0'; });
      if(capas[n]) capas[n].style.opacity='1';
      base.style.opacity = s.base ? '' : '0';
    }
    /* Dos correcciones tras probarlo en vivo (no rotaba nunca):
       1) Se comprobaba document.hidden y se SALTABA el turno. Basta con que el
          navegador crea que la pestana no esta al frente para que no avance jamas.
          Los navegadores ya ralentizan solos los temporizadores en segundo plano;
          esa comprobacion sobraba y solo rompia.
       2) La pausa al pasar el raton estaba en la SECCION entera, que ocupa el 80% de
          la pantalla. En un escritorio el puntero cae ahi casi siempre, asi que el
          hero se quedaba congelado en la primera lamina. Ahora la pausa es solo sobre
          el bloque de texto: si estas leyendo, no se te cambia debajo; si el raton
          esta de paso por la foto, sigue rotando. */
    function avanza(){
      if(pausa) return;
      idx=(idx+1)%HERO_SLIDES.length;
      pinta(idx);
    }
    cont.addEventListener('mouseenter', function(){ pausa=true; });
    cont.addEventListener('mouseleave', function(){ pausa=false; });
    setInterval(avanza, 6500);
  }

  /* ================= /tienda: catalogo completo de servicios ====================
     27-jul-2026. Raul: "la tienda la veo demasiado vacia, solo es como un apartado mas
     de conciertos, no le estamos sacando provecho".
     Tiene razon: la vitrina solo pinta los 3 paquetes de concierto, cuando Reano vende
     seguros, eSIM, hoteles, paquetes nacionales e internacionales y traslados.

     No se crean productos nuevos (eso es panel de Squarespace y no se puede desde aqui).
     Lo que se hace es convertir /tienda en el INDICE de todo lo que se puede contratar,
     y que cada tarjeta lleve a donde ya funciona. Nada de esto es invento: los seis
     destinos existen y estan probados.

     El eSIM sale del sitio a proposito (enlace de afiliado, ver holaflyBanda). */
  var TIENDA_CAT=[
    {i:'🩺', t:'Seguro de viaje', d:'23 planes desde US$ 1 por día. Calcula el tuyo con las fechas y las edades reales de tu grupo.', a:'Calcular mi seguro', h:'/servicios'},
    {i:'🏨', t:'Hoteles', d:'Busca y compara alojamiento en todo el mundo con tus fechas, habitaciones y las edades de los niños.', a:'Buscar hoteles', h:'/hoteles'},
    {i:'🌎', t:'Paquetes de viaje', d:'Los Roques, Canaima y Margarita con vuelo y hospedaje · Europa y Colombia a tu medida.', a:'Ver paquetes', h:'/paquetes'},
    {i:'🎫', t:'Conciertos', d:'Entrada, vuelo, hotel y traslados coordinados por nosotros. Salidas desde Caracas y el Táchira.', a:'Ver conciertos', h:'/conciertos'},
    {i:'📶', t:'eSIM Holafly', d:'Datos en más de 200 destinos, activada antes de salir de casa. 5% con el código REANOTRAVELS.', a:'Ver planes', h:HOLAFLY_URL, fuera:true},
    {i:'✈️', t:'Boletos aéreos', d:'Nacionales e internacionales, con el estado real de cada aerolínea y acompañamiento antes y después.', a:'Cotizar mi vuelo', h:'/vuelos'}
  ];
  function tiendaCatalogo(){
    if((location.pathname.replace(/\/+$/,'')||'/')!=='/tienda') return;
    if(document.getElementById('rt-tcat')) return;
    var host=document.querySelector('#sections')||document.getElementById('page')||document.querySelector('main');
    if(!host) return;
    var s=document.createElement('section');
    s.id='rt-tcat';
    s.innerHTML='<div class="rt-tcat-in">'
      + '<span class="rt-tcat-k">CATÁLOGO COMPLETO</span>'
      + '<h2>Todo lo que puedes contratar con nosotros</h2>'
      + '<p class="rt-tcat-sub">Además de los paquetes de concierto de arriba, esto es lo '
      + 'que resolvemos — cada uno con su propio buscador o cotizador.</p>'
      + '<div class="rt-tcat-g">'
      + TIENDA_CAT.map(function(c){
          return '<a class="rt-tcat-c" href="'+c.h+'"'
            + (c.fuera?' target="_blank" rel="noopener"':'')+'>'
            + '<span class="rt-tcat-i">'+c.i+'</span>'
            + '<b>'+c.t+'</b><p>'+c.d+'</p>'
            + '<span class="rt-tcat-a">'+c.a+' →</span></a>';
        }).join('')
      + '</div></div>';
    host.appendChild(s);
  }

  /* ================= BONO DE REGALO (gift card) =================================
     27-jul-2026. Raul: "la gift card me gusta", de 50 a 1.000 dolares.

     Por que cierra por WhatsApp y no por el carrito: un bono necesita un PRODUCTO en
     Squarespace (o las tarjetas de regalo nativas), y crear productos es panel de
     admin, que sigue bloqueado para ORION. Esto entrega hoy la parte que si se puede:
     que el cliente elija monto, escriba la dedicatoria y le llegue a Raul el pedido
     completo. El dia que exista el producto, este mismo formulario alimenta el carrito.

     El monto libre se acota entre 50 y 1.000 -el rango que fijo Raul- y se valida:
     un bono de 5 dolares o de 5.000 son dos problemas distintos y ninguno es una venta. */
  var GIFT_MONTOS=[50,100,250,500,1000];
  function giftCard(){
    if((location.pathname.replace(/\/+$/,'')||'/')!=='/tienda') return;
    if(document.getElementById('rt-gift')) return;
    var host=document.querySelector('#sections')||document.getElementById('page')||document.querySelector('main');
    if(!host) return;
    var s=document.createElement('section');
    s.id='rt-gift';
    s.innerHTML='<div class="rt-gift-in">'
      + '<div class="rt-gift-tx">'
      +   '<span class="rt-gift-k">BONO DE REGALO</span>'
      +   '<h2>Regala un viaje, no otra cosa</h2>'
      +   '<p>Elige el monto y nosotros preparamos el bono con la dedicatoria que quieras. '
      +   'Se puede usar en cualquier cosa que vendamos: vuelos, hoteles, paquetes, '
      +   'conciertos o seguros. <b>Sin fecha de caducidad y sin comisiones.</b></p>'
      +   '<ul class="rt-gift-l"><li>Lo recibes por correo o por WhatsApp, listo para enviar</li>'
      +   '<li>Si el viaje cuesta más, se paga la diferencia y ya</li>'
      +   '<li>Lo puede usar otra persona: el bono va a nombre de quien tú digas</li></ul>'
      + '</div>'
      + '<div class="rt-gift-card">'
      +   '<label class="rt-gift-lb">¿De cuánto?</label>'
      +   '<div class="rt-gift-m">'
      /* OJO: aqui habia un '+' de mas al partir la linea. Quedaba
         'rt-gift-b' + +(i===1?' on':'') y ese segundo '+' es un MAS UNARIO: convierte
         el texto en numero, asi que la clase salia "rt-gift-b0" y "rt-gift-bNaN".
         Los botones existian y se veian, pero sin clase: ni estilo ni manejador de
         clic. Se veia bien en la captura y estaba roto por dentro. */
      +     GIFT_MONTOS.map(function(m,i){
              return '<button type="button" class="rt-gift-b'+(i===1?' on':'')
                   + '" data-m="'+m+'">US$ '+m+'</button>'; }).join('')
      +   '</div>'
      +   '<label class="rt-gift-lb" for="rt-gift-otro">U otro monto (US$ 50 a 1.000)</label>'
      +   '<input type="number" id="rt-gift-otro" min="50" max="1000" step="10" placeholder="Ej. 300">'
      +   '<label class="rt-gift-lb" for="rt-gift-para">¿Para quién es?</label>'
      +   '<input type="text" id="rt-gift-para" placeholder="Nombre de quien lo recibe">'
      +   '<label class="rt-gift-lb" for="rt-gift-msg">Dedicatoria <small>(opcional)</small></label>'
      +   '<textarea id="rt-gift-msg" rows="2" placeholder="Feliz cumpleaños, ¡nos vemos en la playa!"></textarea>'
      +   '<p class="rt-gift-av" id="rt-gift-av"></p>'
      +   '<button type="button" class="rt-gift-go" id="rt-gift-go">Pedir mi bono</button>'
      +   '<small>Te lo confirmamos por WhatsApp y coordinamos el pago.</small>'
      + '</div></div>';
    host.appendChild(s);

    var sel=100;
    s.querySelectorAll('.rt-gift-b').forEach(function(b){
      b.addEventListener('click', function(){
        s.querySelectorAll('.rt-gift-b').forEach(function(x){ x.classList.remove('on'); });
        b.classList.add('on');
        sel=parseInt(b.getAttribute('data-m'),10);
        s.querySelector('#rt-gift-otro').value='';
      });
    });
    s.querySelector('#rt-gift-otro').addEventListener('input', function(){
      if(this.value) s.querySelectorAll('.rt-gift-b').forEach(function(x){ x.classList.remove('on'); });
    });
    s.querySelector('#rt-gift-go').addEventListener('click', function(){
      var av=s.querySelector('#rt-gift-av');
      var otro=parseInt(s.querySelector('#rt-gift-otro').value,10);
      var monto=isNaN(otro)?sel:otro;
      if(isNaN(monto) || monto<50 || monto>1000){
        av.textContent='El bono va de US$ 50 a US$ 1.000. Revisa el monto.';
        av.style.display='block'; return;
      }
      var para=(s.querySelector('#rt-gift-para').value||'').trim();
      if(!para){ av.textContent='Dinos para quién es, para ponerle el nombre al bono.';
                 av.style.display='block'; s.querySelector('#rt-gift-para').focus(); return; }
      av.style.display='none';
      var msg=(s.querySelector('#rt-gift-msg').value||'').trim();
      window.open('https://wa.me/584247309699?text='
        + '🎁 *Bono de regalo — Reaño Travels*%0A'
        + 'Monto: US$ '+monto+'%0A'
        + 'Para: '+encodeURIComponent(para)+'%0A'
        + (msg?('Dedicatoria: '+encodeURIComponent(msg)):''), '_blank');
    });
  }

  function markTienda(){
    if((location.pathname.replace(/\/+$/,'')||'/')!=='/tienda')return;
    document.body.classList.add('rt-tienda');
    /* El hero lo dibuja la hoja de la tienda, no esta inyeccion: en la primera
       pasada puede no existir todavia. No pasa nada —el observador vuelve a
       llamar a run() mientras Squarespace hidrata—, asi que basta con salir. */
    var hero=document.querySelector('.rts-hero');
    if(!hero || hero.querySelector('.rt-tp-foto')) return;
    var foto=document.createElement('div');
    foto.className='rt-tp-foto';
    foto.setAttribute('aria-hidden','true');
    foto.style.backgroundImage='url('+IMG+')';
    var velo=document.createElement('div');
    velo.className='rt-tp-velo';
    velo.setAttribute('aria-hidden','true');
    /* Se insertan al principio y en este orden para que queden foto -> velo ->
       contenido, que es como los apila el z-index de arriba. */
    hero.insertBefore(velo, hero.firstChild);
    hero.insertBefore(foto, hero.firstChild);
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
      cartFilas(); guardados();
    }
  }

  /* Dos arreglos del carrito que el CSS no puede hacer solo (27-jul-2026):
     1) Los botones no tienen texto: son un menos, un mas y un aspa, iguales de peso.
        Raul: "no se distingue si es agregar una persona o eliminar el ITEM". Se les
        pone title y aria-label, asi que al pasar el raton se lee que hace cada uno
        (y un lector de pantalla tambien).
     2) Los paquetes nacionales no tienen foto de producto y el carrito dejaba un
        recuadro gris. Pero SI tenemos la foto del destino: PIMG ya la usa la ficha de
        producto. Se reutiliza aqui, asi que el cliente ve Canaima en vez de un hueco.
        Si el producto no esta en PIMG queda el mosaico naranja del CSS, que al menos
        parece intencional. */
  /* Lista de "guardados para despues". Vive en /cart, debajo del carrito.
     "Volver a añadir" lleva a la ficha del producto en vez de meterlo al carrito
     por codigo: el carrito de Squarespace exige elegir la variante (la ciudad de
     salida, la seccion) y meterlo a ciegas podria añadir la que no era. Es un clic
     mas, pero nunca compra lo que no pediste. */
  function guardados(){
    if((location.pathname.replace(/\/+$/,'')||'/')!=='/cart') return;
    var L=[];
    try{ L=JSON.parse(localStorage.getItem('rt-guardados')||'[]'); }catch(e){ L=[]; }
    var box=document.getElementById('rt-guardados');
    if(!L.length){ if(box) box.remove(); return; }
    if(!box){
      box=document.createElement('section'); box.id='rt-guardados';
      var host=document.querySelector('.cart-container')||document.querySelector('main');
      if(!host) return;
      host.appendChild(box);
    }
    box.innerHTML='<h3>Guardados para después <small>'+L.length+'</small></h3>'
      + '<p class="rt-gd-sub">No se pierden aunque cierres la página. Cuando quieras, '
      + 'los vuelves a añadir.</p>'
      + L.map(function(it,i){
          return '<div class="rt-gd-row">'
            + (it.i?'<img src="'+it.i+'" alt="" loading="lazy">':'<span class="rt-gd-ph"></span>')
            + '<div class="rt-gd-tx"><b>'+it.t.replace(/</g,'&lt;')+'</b>'
            + (it.p?('<span>'+it.p.replace(/</g,'&lt;')+'</span>'):'')+'</div>'
            + (it.h?('<a class="rt-gd-add" href="'+it.h+'">Volver a añadir</a>'):'')
            + '<button type="button" class="rt-gd-del" data-i="'+i+'" '
            + 'title="Quitar de guardados">✕</button></div>';
        }).join('');
    box.querySelectorAll('.rt-gd-del').forEach(function(b){
      b.addEventListener('click', function(){
        try{
          var A=JSON.parse(localStorage.getItem('rt-guardados')||'[]');
          A.splice(parseInt(b.getAttribute('data-i'),10),1);
          localStorage.setItem('rt-guardados', JSON.stringify(A));
        }catch(e){}
        guardados();
      });
    });
  }

  function cartFilas(){
    document.querySelectorAll('.cart-row').forEach(function(row){
      if(row.getAttribute('data-rt-cart')) return;
      row.setAttribute('data-rt-cart','1');
      var poner=function(sel,txt){
        var el=row.querySelector(sel); if(!el) return;
        el.setAttribute('title',txt); el.setAttribute('aria-label',txt);
      };
      poner('.cart-row-remove','Eliminar este paquete del carrito');
      poner('.cart-row-qty-dec','Quitar una persona');
      poner('.cart-row-qty-inc','Añadir una persona');
      /* GUARDAR PARA DESPUES. El orden importa y no es negociable: primero se
         escribe en la lista y se COMPRUEBA que quedo escrito; solo entonces se
         pulsa el boton de quitar del carrito. Al reves, si el guardado falla el
         cliente pierde lo que tenia. Es la unica funcion de todo el encargo que
         puede QUITARLE algo a alguien, y por eso se hizo la ultima.
         Solo se guarda titulo, precio, enlace e imagen: nada personal. */
      if(!row.querySelector('.rt-save')){
        var sv=document.createElement('button');
        sv.type='button'; sv.className='rt-save'; sv.textContent='Guardar para después';
        sv.addEventListener('click', function(){
          var a=row.querySelector('.cart-row-title');
          /* cualquier <img> de la fila, no solo la del envoltorio: probando en vivo
             la foto no se capturaba y el guardado salia sin imagen */
          var im=row.querySelector('img');
          var it={t:(a&&a.textContent||'').trim(),
                  h:(a&&a.getAttribute('href'))||'',
                  p:(row.querySelector('.cart-row-price')||{}).textContent||'',
                  i:(im&&im.src)||''};
          if(!it.t){ return; }
          var ok=false;
          try{
            var L=JSON.parse(localStorage.getItem('rt-guardados')||'[]');
            if(!L.some(function(x){ return x.t===it.t; })) L.push(it);
            localStorage.setItem('rt-guardados', JSON.stringify(L));
            /* comprobacion real: releer y confirmar que esta */
            ok=(JSON.parse(localStorage.getItem('rt-guardados')||'[]')||[])
                 .some(function(x){ return x.t===it.t; });
          }catch(e){ ok=false; }
          if(!ok){ sv.textContent='No se pudo guardar — no se quitó nada'; return; }
          var rm=row.querySelector('.cart-row-remove');
          if(rm) rm.click(); else sv.textContent='Guardado (quítalo tú del carrito)';
          setTimeout(guardados, 600);
        });
        (row.querySelector('.cart-row-desc')||row).appendChild(sv);
      }
      var hueco=row.querySelector('.cart-row-no-img');
      if(hueco && !hueco.querySelector('img')){
        var a=row.querySelector('.cart-row-title');
        var href=(a && a.getAttribute('href')) || '';
        for(var k in PIMG){
          if(href.indexOf(k)===-1) continue;
          var im=document.createElement('img');
          im.src=PIMG[k]; im.alt=''; im.loading='lazy';
          im.style.cssText='width:100%;height:100%;object-fit:cover;display:block';
          hueco.innerHTML=''; hueco.appendChild(im);
          break;
        }
      }
    });
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

  /* ===== /conciertos: realce de afiches, SIN romper el tema =====
     23-jul-2026, 2a version. La 1a forzaba la cartelera a oscuro siempre para
     que la noche del hero no se cortara. Error: en modo CLARO quedaba una
     franja negra debajo de una cabecera crema y la pagina se veia partida y
     rota. El sitio ya tiene su interruptor claro/oscuro y esta seccion debe
     OBEDECERLO, no imponerse.
     Aqui queda solo lo que sirve en los dos modos (el realce del afiche, que
     son fotos de escenario nocturno y a 190px no se distinguia al artista) y
     lo nocturno se aplica unicamente cuando el sitio YA esta en oscuro. */
  function conciertosNoche(){
    if(location.pathname.indexOf('/conciertos')!==0) return;
    var card=document.querySelector('.cx-card');
    if(!card) return;                        /* la cartelera aun no se pinta */
    var band=card.closest('section') || card.parentElement;
    if(!band || band.classList.contains('rt-noche')) return;

    if(!document.getElementById('rt-noche-css')){
      var s=document.createElement('style'); s.id='rt-noche-css';
      s.textContent=
       /* NEUTRO: vale igual en claro y en oscuro. Se levantan los JPG desde
          CSS en vez de reeditarlos: si manana cambian la foto sigue sirviendo.
          El :not(.cx-date) es obligatorio: dentro de .cx-poster hay DOS hijos
          <div> — la foto y la burbuja de fecha. Sin el filtro, la burbuja
          (fondo casi negro traslucido) se aclaraba un 18% y perdia contraste
          contra su propio texto blanco. Solo la foto debe realzarse. */
        '.rt-noche .cx-poster>div:not(.cx-date){filter:brightness(1.18) contrast(1.04) saturate(1.1)}'
       +'.rt-noche .cx-card:hover .cx-poster>div:not(.cx-date){filter:brightness(1.3) contrast(1.06) saturate(1.15)}'
       /* Mismo defecto heredado del bloque de la pagina: su regla de zoom al
          pasar el raton (.cx-card:hover .cx-poster>div{scale(1.08)}) tampoco
          excluia la fecha, y la burbuja crecia y se descuadraba de su esquina.
          Aqui se le devuelve la quietud (4 clases ganan a 3 clases + 1 tipo). */
       +'.rt-noche .cx-card:hover .cx-date{transform:none}'
       /* ===== Y LA RAIZ DEL PROBLEMA, medida el 23-jul en vivo =====
          El mismo `.cx-poster>div` de la pagina trae `inset:0`, y como la
          burbuja de fecha tambien es un <div> hijo, ganaba a su propio
          `top:14px;right:14px` — (0,1,1) le gana a (0,1,0) — y se estiraba a
          los 363x190 px del afiche COMPLETO. Resultado: su fondo negro al 72%
          era en realidad un velo sobre cada foto, y por eso "no se distinguia
          al artista" (el brightness de arriba se habia puesto para compensar
          un sintoma cuya causa era esta). Devuelta a su esquina: 63x60 px. */
       +'.rt-noche .cx-poster>.cx-date{inset:auto!important;top:14px!important;'
         +'right:14px!important}'
       /* SOLO EN OSCURO: aqui si conviene continuar la noche del hero, porque
          la cabecera y el resto de la pagina ya estan oscuros. */
       +'html.dark .rt-noche{--color-surface:#17161a;--color-bg:#0f0f12;'
       +'--color-border:rgba(255,255,255,.10);--cshadow:rgba(0,0,0,.55)}'
       +'html.dark .rt-noche .cx-poster::after{background:linear-gradient(to top,#17161a,rgba(23,22,26,0) 78%)}'
       +'html.dark .rt-noche .cx-card:hover{border-color:rgba(255,107,26,.55)}';
      (document.head||document.documentElement).appendChild(s);
    }
    band.classList.add('rt-noche');
  }

  /* ===== /conciertos: que el HERO obedezca al tema =====
     23-jul-2026. Sintoma que reportaba Raul: en modo CLARO la pagina se veia
     partida — cabecera crema, banda negra de 726 px, y otra vez pagina crema.
     Causa medida en vivo: la inyeccion FOOTER trae un bloque (rt-cx-css, 1.076
     chars) con
         .cx-hero{background: <3 degradados>, #131313 !important}
     SIN condicion de tema, y un ::before de estrellitas blancas. En claro eso
     dejaba el subtitulo gris (#4a4a4a) sobre casi negro: contraste 2,1:1
     (AA exige 4,5) y los dos .cx-blob difuminados apoyados en una banda que
     nunca aclaraba, que es lo que se veia "sucio".
     Se corrige DESDE AQUI y no cortando la inyeccion de 155.920 chars: basta
     ganar en especificidad. Aquel selector es (0,1,0); este es (0,2,1), asi
     que gana aunque el otro lleve !important y vaya despues.
     En OSCURO no se toca nada: la noche del hero ahi es correcta. */
  function conciertosHero(){
    if(location.pathname.indexOf('/conciertos')!==0) return;
    if(document.getElementById('rt-cxhero-css')) return;
    if(!document.querySelector('header.cx-hero')) return;   /* aun no se pinta */
    var s=document.createElement('style'); s.id='rt-cxhero-css';
    s.textContent=
      /* La base es la MISMA variable que pinta el resto de la pagina, no un
         color copiado: si manana cambia la paleta, el hero la sigue solo y no
         vuelve a aparecer un corte. Los mismos 3 degradados de marca, con el
         alfa bajado porque sobre crema rinden mucho mas que sobre negro. */
      'html:not(.dark) header.cx-hero{background:'
       +'radial-gradient(60% 48% at 12% 18%, rgba(255,107,26,.17), transparent 60%),'
       +'radial-gradient(55% 45% at 88% 78%, rgba(124,58,237,.13), transparent 62%),'
       +'radial-gradient(40% 35% at 70% 12%, rgba(255,138,61,.10), transparent 60%),'
       +'var(--color-bg,#FBF7F1) !important}'
      /* Las estrellitas son blancas: en claro no se ven y solo dejan un velo
         lechoso. Se apagan con !important porque compiten con una animacion
         (una animacion gana a una declaracion normal, pero no a !important). */
     +'html:not(.dark) header.cx-hero::before{background:none!important;'
       +'animation:none!important;opacity:0!important}'
      /* Efecto secundario de aclarar la banda, medido y corregido aqui mismo:
         el naranja de marca (#FF6B1A) lucia sobre negro (6,5:1) pero sobre
         crema se cae a 2,7:1 — ilegible. Solo el texto naranja que NO lleva
         fondo propio (titular, pildora y boton fantasma); los botones y chips
         naranjas siguen igual, que ahi el blanco va sobre naranja y esta bien.
         #C2410C es el mismo naranja mas profundo: 4,85:1 sobre el crema y
         4,54:1 sobre la pildora traslucida, o sea aprobado incluso para el
         texto pequeno de 12 px. En OSCURO no cambia nada. */
     +'html:not(.dark) header.cx-hero h1,'
     +'html:not(.dark) header.cx-hero h1 span,'
     +'html:not(.dark) header.cx-hero .text-primary{color:#C2410C!important}'
     +'html:not(.dark) header.cx-hero a[href="#lineup"]{color:#C2410C!important;'
       +'border-color:#C2410C!important}';
    (document.head||document.documentElement).appendChild(s);
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
    /* 27-jul-2026 — PRIVACIDAD: aqui se guardaba el payload COMPLETO (numero de
       documento, direccion, telefono, email, si viaja con menores) en el
       localStorage del NAVEGADOR DEL CLIENTE, bajo 'rt-crm-queue', y no se
       borraba nunca. Nadie leia esa cola —era escritura muerta—, asi que no
       servia de respaldo: solo dejaba la cedula del cliente a la vista de
       quien usara despues esa computadora (cibercafe, PC familiar, oficina).
       Se elimina la escritura y ademas se BORRA lo que haya quedado guardado
       de visitas anteriores. El lead sigue viajando al CRM por crmEnviar(). */
    try{ localStorage.removeItem('rt-crm-queue'); }catch(e){}
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
    /* /paquetes NO tiene #sections: su contenedor es main#page. Buscar solo
       #sections hacia que esta funcion saliera en silencio y la portada no
       se pintara nunca —el motivo real de que la pagina arrancara pelada—.
       Se usa la misma cadena de respaldo que ya usa paquetes-showcase.js. */
    var host=document.querySelector('#sections')||document.getElementById('page')||
             document.querySelector('main');
    if(!host) return;
    if(document.getElementById('rt-paq-portada')) return;
    /* La inyeccion FOOTER mete un .rt-herowrap con el logo como primer hijo de
       la primera seccion de cada pagina. En una portada propia como esta aterriza
       suelto arriba a la izquierda; ademas sobra, porque la portada ya lleva su
       propia marca. Se oculta SOLO aqui dentro. */
    var CDN='https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@main/';
    /* Las cuatro fotos son las de los propios paquetes, no fotos de banco:
       la portada ensena lo que de verdad se vende mas abajo. */
    var FOTOS=[
      {f:'losroques.jpg',      t:'Los Roques'},
      {f:'canaima.jpg',        t:'Canaima'},
      {f:'intl-colosseum.jpg', t:'Roma'},
      {f:'margarita.jpg',      t:'Margarita'}
    ];
    if(!document.getElementById('rt-paq-portada-css')){
      var st=document.createElement('style');
      st.id='rt-paq-portada-css';
      st.textContent=
        '#rt-paq-portada .rt-herowrap{display:none!important}'
       +'#rt-paq-portada{position:relative;isolation:isolate;overflow:hidden;'
         +'background:#0d0d10;padding:126px 22px 64px;text-align:center;'
         +'font-family:Montserrat,system-ui,sans-serif}'
       /* Mosaico de fondo: cuatro fotos en fila, cada una con su deriva lenta.
          Van detras de un velo oscuro para que el titular siempre se lea. */
       +'#rt-paq-portada .rt-pp-mosaico{position:absolute;inset:0;z-index:0;display:flex}'
       +'#rt-paq-portada .rt-pp-foto{flex:1;background-size:cover;background-position:center;'
         +'opacity:0;transform:scale(1.12);'
         +'animation:rtPpEntra 1.1s cubic-bezier(.22,.61,.36,1) forwards,'
         +'rtPpDeriva 26s ease-in-out infinite alternate 1.1s}'
       +'#rt-paq-portada .rt-pp-foto:nth-child(2){animation-delay:.12s,1.22s}'
       +'#rt-paq-portada .rt-pp-foto:nth-child(3){animation-delay:.24s,1.34s}'
       +'#rt-paq-portada .rt-pp-foto:nth-child(4){animation-delay:.36s,1.46s}'
       +'#rt-paq-portada .rt-pp-velo{position:absolute;inset:0;z-index:1;'
         +'background:linear-gradient(180deg,rgba(13,13,16,.72) 0%,rgba(13,13,16,.80) 45%,rgba(13,13,16,.96) 100%)}'
       +'#rt-paq-portada .rt-pp-txt{position:relative;z-index:2}'
       /* Entrada escalonada del texto. Sin JS: la animacion arranca sola. */
       +'#rt-paq-portada .rt-pp-txt>*{opacity:0;animation:rtPpSube .7s cubic-bezier(.22,.61,.36,1) forwards}'
       +'#rt-paq-portada .rt-pp-sello{animation-delay:.15s}'
       +'#rt-paq-portada h1{animation-delay:.28s}'
       +'#rt-paq-portada .rt-pp-sub{animation-delay:.40s}'
       +'#rt-paq-portada .rt-pp-tags{animation-delay:.52s}'
       +'#rt-paq-portada .rt-pp-sello{display:inline-block;border:1px solid rgba(255,140,3,.55);'
         +'color:#FF8C03;font-size:11.5px;font-weight:800;letter-spacing:.2em;'
         +'text-transform:uppercase;padding:8px 20px;border-radius:999px;margin-bottom:22px}'
       +'#rt-paq-portada h1{color:#fff;font-size:clamp(40px,8vw,74px);font-weight:900;'
         +'font-style:italic;letter-spacing:-2px;line-height:1;margin:0 0 16px;'
         +'text-shadow:0 6px 26px rgba(0,0,0,.55)}'
       +'#rt-paq-portada .rt-pp-sub{color:#d6d2ce;font-size:16px;line-height:1.6;'
         +'max-width:580px;margin:0 auto}'
       +'#rt-paq-portada .rt-pp-tags{display:flex;flex-wrap:wrap;gap:9px;'
         +'justify-content:center;margin:26px 0 0}'
       +'#rt-paq-portada .rt-pp-tags span{background:rgba(255,255,255,.08);'
         +'border:1px solid rgba(255,255,255,.16);color:#efeae6;font-size:12px;'
         +'font-weight:700;letter-spacing:.06em;padding:7px 14px;border-radius:999px;'
         +'backdrop-filter:blur(4px)}'
       +'@keyframes rtPpEntra{to{opacity:1;transform:scale(1.02)}}'
       +'@keyframes rtPpDeriva{to{transform:scale(1.12) translateY(-10px)}}'
       +'@keyframes rtPpSube{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}'
       /* En movil el mosaico de 4 columnas deja tiras de 90px donde no se
          reconoce nada: se queda solo la primera foto, a pantalla completa. */
       +'@media(max-width:640px){#rt-paq-portada{padding:112px 18px 48px}'
         +'#rt-paq-portada .rt-pp-foto:nth-child(n+2){display:none}}'
       /* Quien pidio menos movimiento en su sistema no ve ninguno: el
          contenido aparece ya colocado, sin deriva ni desvanecidos. */
       +'@media(prefers-reduced-motion:reduce){'
         +'#rt-paq-portada .rt-pp-foto,#rt-paq-portada .rt-pp-txt>*{'
         +'animation:none!important;opacity:1!important;transform:none!important}}';
      (document.head||document.documentElement).appendChild(st);
    }
    var s=document.createElement('section');
    s.id='rt-paq-portada';
    s.innerHTML=
      '<div class="rt-pp-mosaico" aria-hidden="true">'+
        FOTOS.map(function(o){
          return '<div class="rt-pp-foto" style="background-image:url('+CDN+o.f+')"></div>';
        }).join('')+
      '</div>'+
      '<div class="rt-pp-velo" aria-hidden="true"></div>'+
      '<div class="rt-pp-txt">'+
        '<span class="rt-pp-sello">Cat&#225;logo Rea&#241;o</span>'+
        '<h1>PAQUETES</h1>'+
        '<p class="rt-pp-sub">Nacionales e internacionales, armados a tu medida: vuelos, '+
        'hotel, traslados y actividades. Te lo cotizamos sin compromiso.</p>'+
        '<div class="rt-pp-tags">'+
          FOTOS.map(function(o){ return '<span>'+o.t+'</span>'; }).join('')+
          '<span>y m&#225;s</span>'+
        '</div>'+
      '</div>';
    host.insertBefore(s, host.firstChild);
  }

  /* ===== Contraste: el naranja de marca en TEXTO se cae en modo claro =====
     24-jul-2026. Auditados en vivo los 4 modos: en OSCURO el naranja de marca
     (#FF5E1A / #FF8C03 / #F08C00) sobre fondo oscuro rinde de sobra, pero en
     CLARO ese mismo naranja como TEXTO (titulos de seccion, subtitulos, kickers
     y precios del showcase, pildoras de estado) cae a 2,2-3,1:1 sobre crema o
     blanco — por debajo del 4,5 de AA, y varios ni siquiera pasan el 3,0 de
     texto grande. Es el "error entre claro y oscuro" que se reportaba.
     Ya se corrigio asi el hero de /conciertos el 23-jul (a #C2410C, 4,85:1) y
     Raul lo acepto; aqui se generaliza el MISMO criterio a todo el sitio.

     Por que JS y no CSS: el mismo naranja sale de muchas fuentes distintas
     (.text-section-title, .font-section-title, h3.font-bold, .rt-paq-kicker,
     .rt-opt-r, .hl, .rt-pill...) y no todas las cabeceras naranjas comparten
     clase (en la home los titulos de seccion son casi negros y NO deben tocarse).
     No se puede seleccionar "texto naranja sobre fondo claro" por CSS. La pasada
     mira el color COMPUTADO: si es de la familia naranja de marca, no tiene fondo
     propio (boton/chip) y su fondo efectivo es claro, lo profundiza. Se limpia y
     reevalua en cada pasada, asi que el interruptor de tema (que no recarga) lo
     revierte solo: en oscuro se quitan los colores y vuelve el naranja vivo. */
  var RT_DEEP='#C2410C';
  function rtIsBrandOrange(c){
    var r=c[0],g=c[1],b=c[2];
    /* naranja claro de marca: R alto, G medio, B casi nulo. Excluye el #C2410C
       ya profundizado (R=194<210), el rojo de error (B=77>75) y el amarillo
       PayPal (G=196>155), para no reprocesarlos ni pisarlos. */
    return r>=210 && g>=70 && g<=155 && b<=75 && (r-b)>150;
  }
  function rtBgLum(el){
    var n=el;
    while(n && n!==document.documentElement){
      var bg=(getComputedStyle(n).backgroundColor.match(/[\d.]+/g)||[]).map(Number);
      if(bg.length>=3 && (bg.length<4 || bg[3]>0.55)){
        var a=[bg[0],bg[1],bg[2]].map(function(v){v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);});
        return .2126*a[0]+.7152*a[1]+.0722*a[2];
      }
      n=n.parentElement;
    }
    return 1; /* sin fondo opaco: el cuerpo del sitio es claro en modo claro */
  }
  /* ¿El texto esta pintado ENCIMA de una foto/velo? (un hero). rtBgLum no lo ve
     porque la foto es una capa HERMANA (no un ancestro): camina hasta el crema
     del body y cree que el fondo es claro. Sin este guardado, el naranja de un
     titular de hero sobre foto oscura se profundizaba y perdia contraste.
     Clave: distinguir "texto SOBRE una foto" (hero -> no tocar) de "texto en el
     cuerpo de una tarjeta que CONTIENE una foto en otra zona" (showcase -> si
     tocar). Se resuelve por geometria: solo cuenta la capa posicionada, detras
     del texto, cuyo rectangulo CONTIENE al del texto. En un hero la foto full
     bleed lo contiene; en una tarjeta la foto va arriba y no lo contiene. */
  function rtOverDarkLayer(el){
    var er=el.getBoundingClientRect(); var n=el;
    for(var d=0; d<6 && n && n!==document.body; d++){
      var par=n.parentElement; if(!par) break; var kids=par.children;
      for(var i=0;i<kids.length;i++){ var k=kids[i]; if(k===n) break; /* solo hermanos previos = detras */
        var kc=getComputedStyle(k); if(kc.position!=='absolute' && kc.position!=='fixed') continue;
        var kr=k.getBoundingClientRect();
        if(kr.left<=er.left+2 && kr.right>=er.right-2 && kr.top<=er.top+2 && kr.bottom>=er.bottom-2){
          if(kc.backgroundImage!=='none') return true;
          if(k.tagName==='IMG') return true;
          /* la foto puede ser un background-image CSS o un <img> real (asi la
             pinta, p.ej., el hero de /estado-aerolineas): ambos cuentan. */
          if([].some.call(k.querySelectorAll('img,[style*="background-image"],*'),function(x){
            if(x.tagName!=='IMG' && getComputedStyle(x).backgroundImage==='none') return false;
            var xr=x.getBoundingClientRect(); return xr.left<=er.left+2&&xr.right>=er.right-2&&xr.top<=er.top+2&&xr.bottom>=er.bottom-2;
          })) return true;
        }
      }
      n=par;
    }
    return false;
  }
  function contrastFix(){
    /* Se limpia SIEMPRE primero: hace la funcion idempotente y hace que un
       cambio de tema en caliente revierta el efecto sin tocar nada mas. */
    document.querySelectorAll('[data-rtcfix]').forEach(function(el){
      el.style.removeProperty('color'); el.removeAttribute('data-rtcfix');
    });
    if(document.documentElement.classList.contains('dark')) return; /* solo en claro */
    document.querySelectorAll('h1,h2,h3,h4,h5,p,a,span,li,b,strong').forEach(function(el){
      /* solo hojas con texto directo: no recolorear un contenedor entero */
      if(el.children.length){ var ht=false; for(var i=0;i<el.childNodes.length;i++){ if(el.childNodes[i].nodeType===3 && el.childNodes[i].textContent.trim().length>1){ht=true;break;} } if(!ht) return; }
      var cs=getComputedStyle(el);
      /* invisible (nav nativo oculto por el shell, footer duplicado, etc.): fuera */
      if(cs.display==='none' || cs.visibility==='hidden' || parseFloat(cs.opacity)<0.1) return;
      var r=el.getBoundingClientRect(); if(r.width<4 || r.height<4) return;
      /* el banner de cookies es UI de consentimiento nativa de Squarespace: no la tocamos */
      if(el.closest('[id*="cookie" i],[class*="cookie" i],[id*="consent" i],[class*="consent" i]')) return;
      var col=(cs.color.match(/[\d.]+/g)||[]).map(Number);
      if(col.length<3 || !rtIsBrandOrange(col)) return;
      if(col[3]!==undefined && col[3]<0.5) return;
      /* fondo propio (color solido o gradiente/imagen) = boton o chip: ahi el
         blanco va sobre naranja y esta bien; no se toca. */
      var own=(cs.backgroundColor.match(/[\d.]+/g)||[]).map(Number);
      if(own.length>=3 && (own.length<4 || own[3]>0.55)) return;
      if(/gradient|url\(/.test(cs.backgroundImage)) return;
      if(rtBgLum(el) < 0.4) return; /* sobre fondo oscuro solido el naranja vivo va bien */
      if(rtOverDarkLayer(el)) return; /* sobre foto/velo de un hero: el naranja vivo va bien */
      el.style.setProperty('color', RT_DEEP, 'important');
      el.setAttribute('data-rtcfix','1');
    });
  }

  /* ===== BOTONES: profundizar cualquiera blanco-sobre-naranja-vivo =====
     24-jul (2a ola). El CSS deepenaba por CLASE, pero hay muchas (rt-tab, rt-fab,
     otab, cx-tag, mus-tab, <a> sueltos de las tarjetas de concierto...) y ademas
     el .btn-primary del sitio pelea la cascada. Esta pasada mira el COLOR: si un
     elemento tiene fondo NARANJA VIVO de marca con texto claro encima, le pone el
     naranja profundo #C2410C por estilo inline (gana a cualquier hoja). El doble
     filtro (fondo naranja vivo + texto claro) hace imposible tocar algo que no sea
     un boton blanco-sobre-naranja. Idempotente: #C2410C ya no es "vivo" (R=194<235),
     no se reprocesa. Vale para ambos temas: blanco sobre naranja falla en los dos. */
  function rtBrightOrangeBg(c){ var r=c[0],g=c[1],b=c[2]; return r>=235 && g>=88 && g<=165 && b<=72 && (r-b)>150; }
  function deepenButtons(){
    var sel='a,button,input[type="submit"],[role="button"],[class*="btn"],[class*="tab"],[class*="cta"],[class*="fab"],[class*="tag"],[class*="pill"],[class*="opt"]';
    document.querySelectorAll(sel).forEach(function(el){
      /* el banner de cookies es UI de consentimiento nativa de Squarespace: fuera */
      if(el.closest('[id*="cookie" i],[class*="cookie" i],[id*="consent" i],[class*="consent" i]')) return;
      /* 27-jul: las PESTANAS quedan fuera de la pintada inline. Su estado activo
         cambia con el clic, pero el inline no se despega -> quedaban dos pestanas
         naranjas a la vez. Se profundizan por CSS via aria-selected (ver la regla
         .rt-tabs .rt-tab[aria-selected] en el bloque CSS de arriba). */
      if(el.getAttribute('role')==='tab') return;
      var cs=getComputedStyle(el);
      var bg=(cs.backgroundColor.match(/[\d.]+/g)||[]).map(Number);
      if(bg.length<3 || (bg.length>=4 && bg[3]<0.6)) return;          /* sin fondo solido */
      if(!rtBrightOrangeBg(bg)) return;                               /* solo naranja vivo */
      var fg=(cs.color.match(/[\d.]+/g)||[]).map(Number);
      if(fg.length<3 || fg[0]<190 || fg[1]<190 || fg[2]<190) return; /* solo texto claro */
      var r=el.getBoundingClientRect(); if(r.width<8 || r.height<6) return;
      el.style.setProperty('background-color','#C2410C','important');
      if(/gradient/.test(cs.backgroundImage)) el.style.setProperty('background-image','none','important');
    });
  }

  /* ===== Animaciones de ENTRADA (fade-up al aparecer) — FAIL-SAFE =====
     24-jul. Las tarjetas entran con un desvanecido hacia arriba al asomar en
     pantalla. FAIL-SAFE en 3 capas para no repetir el desastre historico de
     "contenido oculto que no revela": (1) la clase que oculta (rt-rv) la pone
     ESTE JS, no el CSS -> si el .js no carga, nada se oculta; (2) un tope duro a
     los 2,5 s revela TODO pase lo que pase; (3) se respeta prefers-reduced-motion.
     Idempotente: cada pasada de run() engancha las tarjetas NUEVAS (showcase que
     hidrata tarde), sin re-ocultar las ya reveladas. */
  function revealOnScroll(){
    if(window.matchMedia && matchMedia('(prefers-reduced-motion:reduce)').matches) return;
    if(!('IntersectionObserver' in window)) return;
    if(!document.getElementById('rt-rv-css')){
      var st=document.createElement('style'); st.id='rt-rv-css';
      st.textContent='.rt-rv{opacity:0;transform:translateY(22px);'
        +'transition:opacity .6s cubic-bezier(.22,.61,.36,1),transform .6s cubic-bezier(.22,.61,.36,1);will-change:opacity,transform}'
        +'.rt-rv.rt-in{opacity:1;transform:none}';
      (document.head||document.documentElement).appendChild(st);
    }
    if(!window.__rtRvObs){
      window.__rtRvObs=new IntersectionObserver(function(entries){
        entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('rt-in'); window.__rtRvObs.unobserve(e.target); } });
      },{threshold:0.08, rootMargin:'0px 0px -40px 0px'});
      /* tope duro global: a los 2,5 s todo lo que quede oculto se revela */
      setTimeout(function(){ document.querySelectorAll('.rt-rv:not(.rt-in)').forEach(function(el){ el.classList.add('rt-in'); }); }, 2500);
    }
    /* NO se incluye .rt-card (tablero de aerolineas): aerolineas-fix.js clona y
       mueve esas tarjetas, y ocultarlas se enredaria con ese script. El resto son
       rejillas de tarjetas estables. */
    document.querySelectorAll('.cx-card,.rt-fifty,.rt-paq-card,.cert,.product-list-item').forEach(function(el){
      if(el.classList.contains('rt-rv')) return;
      el.classList.add('rt-rv'); window.__rtRvObs.observe(el);
    });
  }

  /* ===== /conciertos: sincronizar precio de Karol G + quitar "todo incluido" =====
     24-jul. El PRODUCTO de la tienda ya cobra $899 (Táchira/San Cristóbal) y
     $1.199 (Caracas) desde el 22-jul, pero la TARJETA de /conciertos se quedó
     mostrando los viejos $799/$999 -> el cliente veía un precio y pagaba otro.
     El toggle San Cristóbal/Caracas NO regenera el precio (spans estáticos,
     verificado en vivo), así que basta reescribirlos una vez; el reintento de
     run() los reafirma si la tarjeta se pinta tarde. Solo se tocan los importes
     EXACTOS de Karol G ($799/$999), que son únicos en la página (BTS y Morat
     tienen otros), y acotado a su propia tarjeta por si acaso.
     El badge "Todo incluido" incumple la regla de marca (el paquete es
     vuelos+hotel+traslados+entradas, SIN comidas) -> "Paquete completo". */
  function conciertosFix(){
    if(location.pathname.indexOf('/conciertos')!==0) return;
    var kh=null;
    document.querySelectorAll('h1,h2,h3,h4,h5').forEach(function(h){ if(!kh && /Karol\s*G/i.test(h.textContent)) kh=h; });
    if(kh){
      var card=kh;
      for(var i=0;i<8 && card.parentElement;i++){ card=card.parentElement;
        if(/CRIST|CARACAS/i.test(card.textContent) && /\$799|\$899/.test(card.textContent)) break; }
      card.querySelectorAll('.text-price-display').forEach(function(s){
        var t=(s.textContent||'').trim();
        if(t==='$799') s.textContent='$899';
        else if(t==='$999') s.textContent='$1,199';
      });
    }
    document.querySelectorAll('.cx-tag').forEach(function(t){
      if(/todo\s*incluido/i.test(t.textContent||'')) t.textContent='✈️ Paquete completo';
    });
  }

  function markHome(){ if((location.pathname.replace(/\/+$/,'')||'/')==='/') document.body.classList.add('rt-home'); }

  function run(){ injectCSS(); markHome(); hideLegacyShell(); markTienda(); markCart(); aliadosYummy(); trasladosYummy(); conciertosHero(); conciertosNoche(); conciertosFix(); puentePaquetes(); paquetesPortada(); productPage(); fiftyCard(); paxForm(); seguroCalc(); hotelesForm(); holaflyBanda(); heroRotador(); tiendaCatalogo(); giftCard(); contrastFix(); deepenButtons(); revealOnScroll(); }
  if(document.readyState!=='loading')run(); else document.addEventListener('DOMContentLoaded',run);
  [400,1200,2600,4200].forEach(function(d){ setTimeout(run,d); });
  /* La rejilla que pinta la vitrina puede tardar mas de 4,2 s en conexiones
     lentas, y sin reintentos la tarjeta destacada no se insertaba nunca
     (bug de carrera que aparecia segun la velocidad de la conexion).
     Pero reintentar 20 veces a ciegas hacia trabajo inutil durante 14 s en
     TODAS las paginas. Ahora se observan las mutaciones del DOM y se para en
     cuanto el trabajo esta hecho: cero coste cuando no hay nada que hacer. */
  var rtListo = function(){
    var ruta = location.pathname.replace(/\/+$/,'')||'/';
    /* La cartelera de /conciertos la pinta el bloque de codigo de la pagina,
       asi que la franja nocturna solo se puede aplicar cuando ya existe. */
    if(ruta.indexOf('/conciertos')===0) return !!document.querySelector('.rt-noche');
    /* /paquetes: el showcase (paquetes-showcase.js) se inyecta tarde; hay que
       mantener vivo el observador para que contrastFix() recoloree su naranja
       cuando aparezca. Listo cuando el kicker del showcase ya existe. */
    if(ruta === '/paquetes') return !!document.querySelector('.rt-paq-kicker');
    if(ruta !== '/tienda') return true;              /* el resto no depende de la rejilla */
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
  /* El interruptor de tema (reano-shell) cambia html.dark / data-theme SIN
     recargar. Se observa ese cambio para revertir/reaplicar el contraste al
     vuelo. Solo mira atributos de <html> (no el subarbol), asi que los propios
     cambios de color en linea de contrastFix no lo re-disparan: sin bucle. */
  if(window.MutationObserver){
    new MutationObserver(function(){ contrastFix(); })
      .observe(document.documentElement,{attributes:true,attributeFilter:['class','data-theme']});
  }
})();
