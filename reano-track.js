/* ============================================================================
   REANO TRAVELS — reano-track.js  (eventos de e-commerce para el Meta Pixel)
   ----------------------------------------------------------------------------
   Cubre:  AddToCart  ·  InitiateCheckout
   NO cubre Purchase: ese va en el campo "Order Confirmation Page" del Code
   Injection. Squarespace inyecta ese campo en su propia pagina de confirmacion,
   que no corre en este dominio — este script no la alcanza.

   Reglas de diseno:
   - Listeners PASIVOS en fase de captura. Nunca se llama preventDefault():
     el carrito nativo de Squarespace se comporta igual con o sin este archivo.
     Si algo falla aqui, la tienda sigue vendiendo.
   - Deduplicacion: todo evento lleva eventID de window.rtEventId(nombre), el
     mismo helper que ya usa el PageView de la inyeccion HEADER. Sin eso, el
     pixel y CAPI cuentan la misma conversion dos veces.
   - Cero dependencias, cero fetch, no modifica el DOM.

   Selectores VERIFICADOS EN VIVO (21-jul-2026). No cambiar sin re-verificar:
     /tienda (lista)    .product-list-item[data-product-id]
                          > .product-list-item-title / .product-list-item-price
     /tienda/p/ (ficha) h1.product-title / .product-price
     /cart              .cart-row > .cart-row-title / [class*="row-price"]
                        subtotal: .cart-subtotal-price
                        boton de pago: a[href*="goto-checkout"]
                        (su clase es un hash inestable de Squarespace
                         — hay que enganchar por el href, no por la clase)

   Tres trampas ya pagadas, no repetirlas:
     1. En la lista el titulo NO esta en <h1> (ahi dice "Tienda") ni en
        .product-title. Es .product-list-item-title.
     2. El precio en la lista NO es .product-price (devuelve null en los 10).
        Es .product-list-item-price.
     3. Formato es-VE "US$ 1.250,00": punto = miles, coma = decimales.
        Sin normalizar sale 1,25 en vez de 1250.
   ============================================================================ */
(function () {
  'use strict';
  if (window.__rtTrack) return;
  window.__rtTrack = 1;

  var CUR = 'USD';

  /* ---------- utilidades ---------- */
  function eid(name) {
    try {
      if (typeof window.rtEventId === 'function') return window.rtEventId(name);
    } catch (e) {}
    return name + '.' + Date.now() + '.' + Math.random().toString(36).slice(2, 10);
  }

  /* "US$ 1.250,00" -> 1250 · "$1,250.00" -> 1250 · "desde US$ 695,00" -> 695 */
  function money(s) {
    if (s == null) return 0;
    var m = String(s).replace(/[^\d.,]/g, '');
    if (!m) return 0;
    var c = m.lastIndexOf(','), d = m.lastIndexOf('.');
    if (c > -1 && c > d) m = m.replace(/\./g, '').replace(',', '.');   /* coma decimal */
    else if (d > -1 && d > c) m = m.replace(/,/g, '');                 /* punto decimal */
    else m = m.replace(/[.,]/g, '');                                   /* sin decimales */
    var n = parseFloat(m);
    return isFinite(n) ? Math.round(n * 100) / 100 : 0;
  }

  function txt(root, sel) {
    if (!root) return '';
    var e = root.querySelector(sel);
    return e ? (e.textContent || '').trim() : '';
  }

  function send(name, params) {
    var id = eid(name);
    try {
      if (typeof fbq === 'function') fbq('track', name, params, { eventID: id });
    } catch (e) {}
    try {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: 'rt_' + name,
        event_id: id,
        value: params.value,
        currency: params.currency,
        content_name: params.content_name
      });
    } catch (e) {}
    return id;
  }

  /* ---------- lectura del producto pulsado ---------- */
  function readProduct(btn) {
    var card = (btn && btn.closest) ? btn.closest('.product-list-item') : null;
    if (card) {                                    /* lista /tienda */
      return {
        id: card.getAttribute('data-product-id') || '',
        name: txt(card, '.product-list-item-title'),
        value: money(txt(card, '.product-list-item-price'))
      };
    }
    /* ficha /tienda/p/... */
    return {
      id: location.pathname.split('/').pop() || '',
      name: txt(document, 'h1.product-title') || txt(document, '.product-title'),
      value: money(txt(document, '.product-price'))
    };
  }

  /* ---------- AddToCart ---------- */
  function onAdd(btn) {
    var p = readProduct(btn);
    if (!p.name) return;                           /* sin nombre no se envia */
    var key = p.id || p.name;
    send('AddToCart', {
      content_type: 'product',
      content_ids: [key],
      content_name: p.name,
      value: p.value,
      currency: CUR,
      contents: [{ id: key, quantity: 1, item_price: p.value }]
    });
  }

  /* ---------- InitiateCheckout ---------- */
  function onCheckout() {
    var rows = document.querySelectorAll('.cart-row');
    var names = [], contents = [], i, r, nm, pr, total;
    for (i = 0; i < rows.length; i++) {
      r = rows[i];
      nm = txt(r, '.cart-row-title');
      if (!nm) continue;
      pr = money(txt(r, '[class*="row-price"]'));
      names.push(nm);
      contents.push({ id: nm, quantity: 1, item_price: pr });
    }
    total = money(txt(document, '.cart-subtotal-price'));
    if (!total) {
      total = 0;
      for (i = 0; i < contents.length; i++) total += contents[i].item_price;
    }
    /* si no se leyo nada, callarse: mejor ningun evento que uno en cero */
    if (!contents.length && !total) return;
    send('InitiateCheckout', {
      content_type: 'product',
      content_ids: names.slice(),
      content_name: names.join(' + ') || 'Carrito',
      num_items: contents.length || 1,
      value: total,
      currency: CUR,
      contents: contents
    });
  }

  /* ---------- enganche: un solo listener pasivo en captura ---------- */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    try {
      if (t.closest('.sqs-add-to-cart-button')) {
        onAdd(t.closest('.sqs-add-to-cart-button'));
        return;
      }
      if (t.closest('a[href*="goto-checkout"]')) { onCheckout(); return; }
    } catch (err) {}
  }, true);

  /* Red de seguridad: si el cliente llega al checkout por otra via (enlace
     directo, boton nuevo de Squarespace). onCheckout() se calla solo si no
     encuentra carrito, asi que no puede inventar un evento en cero. */
  if (/goto-checkout/.test(location.pathname)) onCheckout();
})();
