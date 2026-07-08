# Dashboard Producción DONNELY

Panel de monitoreo de producción, capacidad y capacidad ociosa para la operación textil de DONNELY (sedes Copiapó y Santiago). Lee las planillas de producción en vivo desde Google Sheets y las visualiza en un único dashboard web.

**Dashboard en vivo:** una vez publicado en GitHub Pages, estará disponible en:
`https://<tu-usuario>.github.io/<nombre-repo>/`

---

## Qué hace

El dashboard reproduce el flujo de producción de la empresa (pedido → origen → compra → confección → bordado → despacho) y agrega análisis de capacidad. Está organizado en pestañas:

| Pestaña | Contenido |
|---|---|
| ⚙️ Capacidad & Ociosidad | Utilización vs. capacidad demostrada, capacidad ociosa en unidades, tiempos muertos entre etapas, mapa de calor mensual |
| 📊 Comparativo 2025–2026 | Volumen, utilización y ociosidad año contra año, mes a mes |
| 🏠 Resumen | KPIs generales y clasificación por origen |
| P1 Ingreso | Todos los pedidos ingresados (planilla general) |
| 📦 Stock | Inventario de ambas bodegas |
| SC Compras | Seguimiento de compras y estados |
| P2 Fabricación | Corte, taller y confección |
| P3 Bordado | Producción de bordado |
| 🚚 Empaque & Despacho | Pedidos despachados, guías y partes de salida |
| 🚨 Alertas | Situaciones que requieren atención |
| 🔎 Trazabilidad | Recorrido de un pedido (NP) por todas las planillas |

Cada pestaña del flujo tiene un **selector Año + Mes** combinable e independiente.

---

## Estructura del repositorio

```
.
├── index.html              → El dashboard completo (autónomo). GitHub Pages lo sirve como página principal.
├── README.md               → Este archivo.
├── docs/
│   ├── MODELO_DATOS.md      → Cómo se conectan las planillas (llave NP + Código) y el mapeo de columnas.
│   ├── CONECTAR_SHEETS.md   → Cómo publicar tus Google Sheets como CSV y enlazarlos.
│   └── PUBLICAR_PAGES.md    → Cómo activar GitHub Pages para ver el dashboard online.
├── data/
│   └── urls_planillas.json  → Las URLs CSV de cada planilla, por mes. Editable.
└── .gitignore
```

---

## Puesta en marcha rápida

1. Sube todos los archivos de este repositorio a tu repo de GitHub.
2. Activa **GitHub Pages** apuntando a la rama `main` y carpeta raíz (ver `docs/PUBLICAR_PAGES.md`).
3. Abre la URL pública. El dashboard carga con datos de muestra.
4. Pulsa **🔗 Conectar mis planillas** y carga los datos en vivo desde tus Google Sheets (ver `docs/CONECTAR_SHEETS.md`).

---

## Fuente de datos

Los datos provienen de un libro de Google Sheets publicado como CSV, con una hoja por mes por planilla. El dashboard combina automáticamente todos los meses de cada planilla al cargar.

Las llaves que conectan todas las planillas son **NP** (número de pedido) y **Código** (artículo + talla). Ver `docs/MODELO_DATOS.md`.

---

## Notas

- El dashboard es un único archivo `index.html` sin dependencias de build. Solo usa PapaParse (cargado por CDN) para leer los CSV.
- Los datos se procesan en el navegador del usuario; no hay servidor ni base de datos.
- Al actualizar el Google Sheet, el dashboard mostrará los datos nuevos al recargar la página.
