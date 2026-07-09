# Conectar tus Google Sheets al dashboard

El dashboard lee las planillas en vivo desde Google Sheets publicados como CSV. Aquí está cómo publicarlos y enlazarlos.

---

## 1. Publicar cada hoja como CSV

Por cada hoja mensual de cada planilla:

1. Abre el Google Sheet.
2. Menú **Archivo → Compartir → Publicar en la Web**.
3. En el desplegable, elige la **hoja específica** (el mes) en lugar de "Todo el documento".
4. En el formato, elige **Valores separados por comas (.csv)**.
5. Pulsa **Publicar** y copia la URL que aparece.

La URL tiene esta forma:
```
https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?gid=XXXXXXXX&single=true&output=csv
```

Cada mes tiene un `gid` distinto (es el identificador de la hoja). Por eso hay una URL por mes por planilla.

> **Importante:** el dashboard espera los encabezados de columna como en las planillas originales (la fila de títulos). Detecta automáticamente en qué fila empiezan los encabezados buscando columnas como `NP`, `CODIGO`, `CLIENTE`, etc., así que no importa si hay filas de título arriba.

---

## 2. Registrar las URLs

Las URLs ya vienen pre-cargadas dentro del dashboard (en el archivo `data/urls_planillas.json` y embebidas en `index.html`). Si agregas un mes nuevo o cambias una hoja:

**Opción A — desde el dashboard (rápido):**
Pulsa el botón **🔗 Conectar mis planillas** y revisa/pega las URLs en el formulario.

**Opción B — editando el archivo (permanente):**
Edita `data/urls_planillas.json`. La estructura es:

```json
{
  "P1 General": {
    "marzo 2025": "https://docs.google.com/.../pub?gid=...&output=csv",
    "abril 2025": "https://docs.google.com/.../pub?gid=...&output=csv"
  },
  "SC": { "...": "..." },
  "P2 Copiapo": { "...": "..." },
  "Recepciones": { "...": "..." },
  "P3 Santiago": { "...": "..." },
  "P3 Copiapo": { "...": "..." }
}
```

> La sección **"Recepciones"** corresponde a P2 Santiago (la primera hoja se llama Recepciones y luego siguen los meses).

---

## 3. Cargar los datos en vivo

1. Abre el dashboard.
2. Pulsa **🔗 Conectar mis planillas**.
3. Pulsa **Cargar datos en vivo**.

El dashboard descargará todos los CSV, combinará los meses y recalculará capacidad, alertas y trazabilidad. El indicador de fuente de datos pasará de 🟡 *Datos de muestra* a 🟢 *Datos en vivo*.

---

## 4. Si algo sale vacío

Si al cargar en vivo una pestaña sale vacía o con números raros, casi siempre es porque un nombre de columna en tu Sheets es distinto al esperado. Solución:

1. Abre la planilla afectada y anota el nombre exacto de la columna que falla.
2. Abre `index.html` y busca el mapeo de esa planilla (`mapP2`, `mapP3`, o los bloques dentro de `loadLive`).
3. Agrega el nombre de tu columna a la lista de nombres posibles de ese campo.

Consulta `MODELO_DATOS.md` para ver qué campos espera cada planilla.

---

## Automatizar la actualización (opcional)

Como cada hoja publicada se actualiza sola cuando editas el Sheet, no necesitas hacer nada más: al recargar el dashboard verás los datos nuevos. Solo tendrás que volver aquí cuando **agregues un mes nuevo** (para registrar su URL).

## ¿Y si agrego una columna nueva a una planilla?

**No necesitas regenerar ni cambiar la URL CSV.** Google actualiza la hoja publicada automáticamente, incluyendo columnas nuevas. Al recargar el dashboard ya estará disponible el dato.

Lo único necesario es que el dashboard **sepa leer** esa columna. Si es una columna que el dashboard ya conoce (ver `MODELO_DATOS.md`), funcionará sola. Si es completamente nueva y quieres que se muestre o analice, hay que agregarla al mapeo en `index.html`. Por ejemplo, la columna `TALLER` (interno/externo) de P3 ya está soportada: al detectarla, la pestaña P3 muestra automáticamente el selector Interno/Externo y el análisis de subcontratación.
