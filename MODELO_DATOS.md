# Modelo de datos — Cómo se conectan las planillas

Todas las planillas se enlazan entre sí mediante dos llaves: **NP** y **Código**. Entender esto es clave para que la trazabilidad y las alertas funcionen correctamente.

---

## Las dos llaves

- **NP (número de pedido):** identifica el pedido completo. Un mismo NP agrupa todas las líneas de ese pedido.
- **Código (artículo + talla):** identifica cada línea individual dentro del pedido (por ejemplo, un mismo pedido puede tener el mismo producto en tallas S, M y L, cada una con su código).

La combinación **NP + Código** identifica de forma única una línea de producción a lo largo de todo el flujo.

---

## El nombre del NP cambia según la planilla

El NP es el mismo número en todas las planillas, pero la columna se llama distinto en cada una:

| Planilla | Nombre de la columna del NP |
|---|---|
| P1 General | `NP` |
| SC (Seguimiento de Compras) | `NOTA DE VENTA` |
| P2 (Fabricación Propia) | `N° Pedido` |
| P3 (Bordado) | `NOTA DE PEDIDO` |
| Inventario (Movimientos) | `NP PEDIDO` |

El dashboard reconoce automáticamente estos nombres y los trata como el mismo NP.

---

## Recorrido del dato según el origen del pedido

El flujo que recorre cada pedido depende de su procedencia:

- **Proveedor Nacional:** P1 → SC (compra) → P3 (bordado) → Inventario (salida)
- **Importación:** P1 → P3 (producción) → Inventario. No pasa por SC ni P2.
- **Fabricación Propia:** P1 → SC (insumos) → P2 (corte/confección) → P3 (bordado) → Inventario

---

## Relaciones entre planillas

P1 es la tabla maestra. Todas las demás se relacionan con ella por NP + Código, en relación 1:N (un pedido tiene varias líneas):

- **P1 ↔ SC** por NP + Código — líneas de compra
- **P1 ↔ P2** por NP + Código — solo líneas de Fabricación Propia
- **P1 ↔ P3** por NP + Código — líneas que llevan bordado
- **P1 ↔ Inventario** por NP + Código — movimientos de entrada/salida
- **P2 ↔ P3** por NP + Código — una prenda confeccionada continúa a bordado

---

## Reglas para que el cruce funcione

1. **El NP debe ser un número limpio** en todas las planillas (sin texto como "STOCK CMP" ni valores concatenados). Las filas con NP no numérico quedan fuera de la trazabilidad.
2. **El Código debe ser idéntico carácter por carácter** entre planillas (por ejemplo `80-SRRG-26-DN-H-XXL`), ya que distingue talla y variante.
3. **Los nombres de columna deben mantenerse estables** entre los meses de 2025 y 2026 dentro de cada planilla. Si cambia el nombre de una columna, hay que actualizar el mapeo (ver abajo).

---

## Mapeo de columnas (para carga en vivo)

El dashboard busca las columnas por nombre de forma flexible (ignora mayúsculas y espacios extra). Estos son los campos que lee de cada planilla. Si tu Sheets usa otros nombres, edita la función de mapeo en `index.html` (buscar `mapP2`, `mapP3`, o los bloques `parseAll`).

### P1 General
`NP` · `CODIGO` · `CLIENTE` · `CATEGORIA` (o `PRODUCTO`) · `PROCEDENCIA` · `CANT SOLICITADA` · `CANT ENTREGADA` · `F. INGRESO` · `F. SALIDA EST.` · `F. DESPACHO REAL` · `ESTADO`

### SC (Seguimiento de Compras)
`NOTA DE VENTA` · `CODIGO` · `CLIENTE` · `DETALLE` · `CANTIDAD` · `OC` · `PROVEEDOR` · `ESTADO`

### P2 (Fabricación Propia)
`N° Pedido` · `CODIGO` · `Item` · `Cant. Pedida` · `F. entrada corte` · `F. salida corte` · `F. entrada taller` · `F. salida taller real` · `Día corte` · `Día confección` · `Días atraso` · `Estado`

### P3 (Bordado)
`NOTA DE PEDIDO` · `CODIGO` · `CLIENTE` · `PRODUCTO` · `CANTIDAD SOLICITADA` · `PROCEDENCIA` · `ENTRADA EST.` · `SALIDA EST.` · `DÍAS BORDADO` · `TALLER` (interno/externo) · `ACTIVIDAD` · `PARTE DE SALIDA`

> La columna **TALLER** es opcional. Cuando existe (por ejemplo en P3 Copiapó), el dashboard muestra en la pestaña P3 un selector Interno/Externo y un panel que compara cuánto bordado se hizo en taller propio vs. subcontratado. Si una hoja no tiene esta columna, el selector simplemente no aparece para esa sede. Puedes agregar la columna a un Sheet existente sin regenerar su URL CSV: el dashboard la detectará al recargar.

### Inventario
`CÓD. ARTÍCULO` · `DESCRIPCIÓN` · `CATEGORÍA` · `STOCK ACTUAL` · `ENTRADAS ACUM.` · `SALIDAS ACUM.` · `ESTADO STOCK` — y en la hoja MOVIMIENTOS: `FECHA` · `TIPO` · `NP PEDIDO` · `CÓD.` · `GUÍA`

---

## Cómo se calcula la capacidad

La **capacidad demostrada** de cada etapa es tu mejor mes histórico: la mayor cantidad de unidades que realmente lograste procesar en un mes. Ese máximo se toma como el 100%.

- **Utilización %** = producción real del mes ÷ capacidad demostrada.
- **Capacidad ociosa** = capacidad demostrada − producción real (unidades que pudiste producir y no produjiste).
- **Tiempos muertos** = días que una prenda espera parada entre una etapa y la siguiente (calculado con las fechas de entrada/salida de P2 y P3). No depende de ningún supuesto externo.

Cuando en el futuro se definan topes formales de producción (prendas/día por recurso), se reemplaza la capacidad demostrada por la capacidad instalada real y las métricas pasan de estimadas a exactas.
