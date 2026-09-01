# catalogo-meta.csv — la fuente de verdad del catálogo de Meta

**Este archivo NO es un respaldo. Es el catálogo.**

El catálogo `Reano Travels - Tienda web` (id `923524280819177`) de Facebook/Meta
**no se edita a mano**. Se alimenta de un feed programado que hace **reemplazo
completo, todos los días a las 14:51 (hora de Caracas)**, leyendo:

    https://raw.githubusercontent.com/raulinson2/reano-assets/main/catalogo-meta.csv

O sea: **lo que esté en `main` a las 14:51 es lo que Meta tendrá.** Es un
*replace*, no un *update*: lo que borres del CSV desaparece del catálogo al día
siguiente, y lo que edites a mano en el panel de Meta se pierde en el próximo
volcado. Si hay que cambiar algo, se cambia **aquí** y se hace push.

Última verificación del volcado: 14 detectados, 14 persistidos, 0 inválidos.
Hoy el archivo tiene **16 productos**.

---

## ⚠️ PENDIENTE — EDC Colombia: el feed y la tienda se mueven JUNTOS

El feed dice hoy **1199.00 USD** para `edc-colombia-paquete-concierto`.
**El precio correcto es 1349** (lleva el abono de los dos días, que subió +150
desde el 1 de septiembre de 2026).

**NO cambies solo uno de los dos.** La tienda de Squarespace todavía cobra 1199,
y si el feed anuncia 1349 mientras la página de destino cobra 1199, Meta detecta
**discrepancia de precio** y puede rechazar el artículo del catálogo.

Los dos movimientos van **en el mismo momento**:

| Dónde | Salida | Ahora | Debe quedar |
|---|---|---|---|
| Tienda Squarespace | San Cristóbal | 1199 | **1349** |
| Tienda Squarespace | Caracas | 1449 | **1599** |
| Este CSV (`price`) | — (el mínimo) | `1199.00 USD` | `1349.00 USD` |

Nota: la cartelera de `/conciertos` (`reano-conciertos.js`) **ya está en los
precios nuevos** — el archivo contiene `1.349` y `1.599`, y no contiene `1.449`
por ningún lado. Es decir, hoy la cartelera y la tienda ya no dicen lo mismo.
Los que faltan por mover son **la tienda y este CSV**.

---

## ⚠️ Ryan Castro y Morat NO entran al feed

No es un olvido, y no hace falta volver a revisarlo:

- **Ryan Castro** — la foto que teníamos **no es él** (artista blanco con barba y
  gorra clara; Ryan Castro es afrocolombiano y lleva rastas). La copia previa al
  reescalado con IA es la misma imagen, así que entró mal de origen. Además su
  show **agotó El Campín**.
- **Morat** — la única foto es de aficionado, tomada hacia la pantalla LED del
  recinto: se ve la rejilla de píxeles y solo sale el bajista.

Ninguno de los dos entra al catálogo **hasta tener una foto buena**. Los dos
siguen en su panel de marca en la cartelera, sin imagen.

---

## Cómo se añade un producto

Diez columnas, en este orden y sin cambiarlo:

    id,title,description,availability,condition,price,link,image_link,brand,product_type

- **`id`** — kebab-case ASCII, sin tildes ni ñ. Es la llave con la que Meta
  identifica el artículo: **una vez publicado no se cambia**, porque cambiarlo
  borra el producto y crea otro nuevo (y se pierden sus estadísticas).
- **`price`** — `NNN.NN USD`. Va el **mínimo real** entre las ciudades de salida:
  es lo que Meta muestra como «desde» y lo que el cliente ve en la página.
  Si el mínimo del feed no coincide con lo que cobra la página de destino,
  Meta marca discrepancia.
- **`link`** — la ficha de la tienda si existe
  (`https://www.reanotravel.com/tienda/p/<slug>`); si el producto no tiene ficha
  propia, `https://www.reanotravel.com/conciertos`.
- **`image_link`** — si la foto vive en este repo, va por jsDelivr **clavada al
  SHA del commit**, nunca `@main`: jsDelivr cachea las ramas y sirve la imagen
  vieja durante horas después de reemplazarla.

      https://cdn.jsdelivr.net/gh/raulinson2/reano-assets@<sha>/img/conciertos/v2/<archivo>.jpg

- **`description`** — gancho, qué incluye y el precio por persona.
  **Cero número de WhatsApp** (puede atenderlo otro asesor). Nunca «todo
  incluido» si no incluye comidas. No se mencionan proveedores internos.
  No se inventan vuelos, hoteles ni inclusiones que no estén confirmadas.
- **`brand`** — `Reano Travels & Tours` (sin ñ: así está en las 16 filas).
- **`product_type`** — `Paquetes`.

### Formato del archivo

**UTF-8 con BOM**, finales de línea **LF**, una línea en blanco final. Las tildes
y la ñ tienen que sobrevivir: `Beéle`, `Medellín`, `Reaño`, `Táchira`. Si el
archivo se abre y se guarda con una herramienta que cambie a CRLF o que quite el
BOM, se revisa antes de hacer push.

Las 14 filas originales sólo llevan comillas en `description`; las dos últimas
(Beéle y Ritvales) llevan **los diez campos entrecomillados**. Las dos formas son
CSV válido y Meta las lee igual, pero conviene saberlo antes de asustarse.

### Comprobación antes de hacer push

```powershell
$r = Import-Csv 'C:\Users\rauli\reano-assets-work\catalogo-meta.csv' -Encoding UTF8
$r.Count                                   # nº de productos
$r[0].psobject.Properties.Name.Count       # tiene que dar 10
$r | Group-Object id | Where-Object Count -gt 1   # no debe devolver nada
```

Y que cada `image_link` responda **200** con su tamaño real:

```bash
curl -sSI "<image_link>" | grep -Ei '^(HTTP|content-length)'
```

Después del push, el raw de GitHub puede tardar un rato en refrescarse por
caché. **Si sirve el número de filas viejo, todavía no está**: no se da por
bueno hasta verlo.
