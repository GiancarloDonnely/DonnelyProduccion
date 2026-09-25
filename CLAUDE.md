# CLAUDE.md — Dashboard Producción DONNELY

Contexto persistente para trabajar en este repositorio. Léelo junto con [README.md](README.md) y los archivos en `docs/`.

## Qué es esto

Dashboard web de tareas operativas de DONNELY (textil, sedes Copiapó y Santiago). No tiene backend ni build: es un único `index.html` autónomo que carga datos en vivo desde varias planillas de Google Sheets, las cruza en el navegador (con PapaParse) y las visualiza. Se publica gratis vía **GitHub Pages** directo desde este repo.

Flujo de datos: **Google Sheets → publicado como CSV → `data/urls_planillas.json` → `index.html` los descarga y cruza en el navegador → GitHub Pages sirve la página**. No hay base de datos ni servidor intermedio; "en vivo" significa que al recargar la página se vuelve a leer el CSV público de cada Sheet.

Las planillas se cruzan por dos llaves: **NP** (número de pedido) y **Código** (artículo + talla), aunque la columna del NP se llama distinto en cada planilla (ver [docs/MODELO_DATOS.md](docs/MODELO_DATOS.md) para el mapeo completo — es la referencia obligatoria antes de tocar cualquier lógica de cruce de datos).

## Estructura

```
index.html               → todo el dashboard (HTML+CSS+JS inline, sin dependencias de build)
data/urls_planillas.json → URLs CSV publicadas de cada planilla, por mes/sede
docs/MODELO_DATOS.md     → cómo se cruzan las planillas (NP + Código)
docs/CONECTAR_SHEETS.md  → cómo publicar un Sheet como CSV y obtener su URL
docs/PUBLICAR_PAGES.md   → cómo activar GitHub Pages
```

## Convenciones de UI del dashboard

- **Los nombres de producto (y en general el contenido de las celdas de tabla) nunca deben cortarse ni mostrarse con "..."**. Si el contenido es más ancho que la columna, la tabla debe crecer y desplazarse horizontalmente (scroll), no truncar el texto. Todas las tablas usan el contenedor `.tblwrap{overflow-x:auto}`, así que basta con no aplicar `max-width` + `overflow:hidden` + `text-overflow:ellipsis` a los `td`. Si se agrega una tabla o columna nueva, mantener este mismo criterio.

## Pestaña KPI (solo 2026)

Calcula en vivo 6 KPI de gestión contra sus metas (semáforo): entrega vs fecha comprometida (≤0 d), solicitud de compra (≤1 d), pedidos en proceso (≤10%), atrasados (≤5%), talleres externos (≤2 d) y finalizados (≥90%). Código: bloque "KPI DE GESTIÓN" de `index.html` (`kpiCompute`, `renderKPI`). Detalles a respetar al tocarlo:
- Las fechas de P1 (y otras) vienen con formatos **mezclados mes/día y día/mes** en la misma columna; `toDate` asume día/mes. Los lectores de P1/P2/P3 guardan además la fecha en crudo (`rIng`, `rFse`, `rFdr`, `rFsc`, `rFst`, `rFste`, `rSal`, `rSalr`) y los KPI la resuelven con `kpiCands`/`kpiBest` (mes de la hoja + orden lógico + distribución observada). No reemplazar por `toDate`.
- Los KPI 3 y 6 excluyen el mes en curso. El año está fijo en `KPI_YEAR`.

## Trabajar con GitHub en este repo

**Estado actual:** conectado a `https://github.com/GiancarloDonnely/DonnelyProduccion`, rama `main` (tracking configurado). Identidad de git configurada localmente en este repo (`user.name`/`user.email`), no globalmente. Sigue sin estar instalado `gh` (GitHub CLI) en este equipo.

Antes de asumir el estado del repo en una sesión nueva, confírmalo con `git status` / `git remote -v` — no lo des por hecho de memoria.

**Flujo normal de cambios una vez conectado:**
- Cambios de contenido/lógica del dashboard → editar `index.html` directamente (es un solo archivo, sin transpilación).
- Pestañas/meses nuevos en las planillas → correr `python scripts/sync_urls.py --check` (muestra qué cambiaría) y luego `python scripts/sync_urls.py` (aplica). Lee las páginas públicas `pubhtml` de cada libro y actualiza `data/urls_planillas.json` **y** la constante `URLS` de `index.html`. Solo agrega pestañas tipo "<mes> <año>"; MAESTRO/RESUMEN y casos ambiguos los reporta para revisión manual. Requiere que el libro esté publicado como "Documento completo".
- Planilla completamente nueva → agregar su primera URL CSV a mano en `data/urls_planillas.json` (y en `URLS` de `index.html`); el script se encarga de las pestañas siguientes.
- Cambios al mapeo de columnas → actualizar tanto el código (`mapP2`, `mapP3`, bloques `parseAll` en `index.html`) como `docs/MODELO_DATOS.md` para que no queden desincronizados.
- Probar abriendo `index.html` en el navegador (o con `?demo` para modo muestra sin red) antes de commitear.
- Commits pequeños y descriptivos; no usar `git push --force` sobre `main` salvo que el usuario lo pida explícitamente.
- GitHub Pages se actualiza solo al hacer push a `main` — no hace falta ningún paso de build/deploy adicional.

**Precauciones:**
- Las URLs en `urls_planillas.json` son links de publicación CSV de Google Sheets (de solo lectura, sin credenciales), así que no son secretos, pero igual conviene no exponer más URLs de las necesarias en commits/PRs públicos si el repo es público.
- No romper el reconocimiento flexible de nombres de columna (ignora mayúsculas/espacios) al tocar el parseo.
- Este repo no tiene GitHub CLI (`gh`) instalado en este equipo ni usuario/email de git configurado globalmente — si el usuario pide crear PRs, issues, etc. desde la terminal, puede hacer falta instalar `gh` primero (`gh auth login`) o usar la web de GitHub.
