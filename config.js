// ════════════════════════════════════════════════════════════════════
//  CONFIGURACIÓN — Donnely Torre de Control (Dashboard OPERATIVO)
// ════════════════════════════════════════════════════════════════════
//  Carga TODOS los meses disponibles. El filtro FILTRO_ESTADO="EN PROCESO"
//  se encarga de mostrar solo los pedidos que siguen abiertos, sin importar
//  de qué mes sean.
//
//  Para cada planilla, una URL por mes (cada una con su gid).
//  Todas terminan en  output=csv
// ════════════════════════════════════════════════════════════════════

var P1B="https://docs.google.com/spreadsheets/d/e/2PACX-1vSSjzVtfMXqHcM1NEAQTZynYT_uzna5StYRM5ri1c4xGE6A8iFud7cHS1QybN8SG75M1xIyU2DZt6wC/pub";
var SCB="https://docs.google.com/spreadsheets/d/e/2PACX-1vRZ3zoBwh7miw2xDIYylOUBgbmQdA1q-3kMOkBZcey6ZNifRg0UF0mt3zKJ8t1IMKQYXlw2sq7Ct9SQ/pub";
var P2B="https://docs.google.com/spreadsheets/d/e/2PACX-1vReMhfcP934WWDFAcyxkNvgG-E8yaXmT1L90TPHQE9fdpCvQihRrv91Cl1B8Bh21Q/pub";
var P3B="https://docs.google.com/spreadsheets/d/e/2PACX-1vRI8lwje2sWV_cX-8mg-ssDOv7HfyaJapKpuKOqEXILNMB9oGuamE2tSpLBN05EjHLSrcgQYp7D11MA/pub";
function u(b,g){return b+"?gid="+g+"&single=true&output=csv";}

var CONFIG = {

  // ── P1 PRODUCCIÓN — 16 meses (Mar 2025 → Jun 2026) ──
  P1: [
    u(P1B,"2135645606"),  // Mar 2025
    u(P1B,"943810346"),   // Abr 2025
    u(P1B,"1818784902"),  // May 2025
    u(P1B,"162072593"),   // Jun 2025
    u(P1B,"2092977677"),  // Jul 2025
    u(P1B,"965142141"),   // Ago 2025
    u(P1B,"161118466"),   // Sep 2025
    u(P1B,"703937459"),   // Oct 2025
    u(P1B,"1432972158"),  // Nov 2025
    u(P1B,"1269299252"),  // Dic 2025
    u(P1B,"1311507827"),  // Ene 2026
    u(P1B,"449951004"),   // Feb 2026
    u(P1B,"847726791"),   // Mar 2026
    u(P1B,"1200597389"),  // Abr 2026
    u(P1B,"862243628"),   // May 2026
    u(P1B,"1545944596"),  // Jun 2026
  ],

  // ── SC SEGUIMIENTO COMPRAS — 16 meses ──
  SC: [
    u(SCB,"696772871"),   // Mar 2025
    u(SCB,"1913655541"),  // Abr 2025
    u(SCB,"904637040"),   // May 2025
    u(SCB,"1050485182"),  // Jun 2025
    u(SCB,"2130182716"),  // Jul 2025
    u(SCB,"1313090913"),  // Ago 2025
    u(SCB,"1649854449"),  // Sep 2025
    u(SCB,"1744982201"),  // Oct 2025
    u(SCB,"81784121"),    // Nov 2025
    u(SCB,"1949564465"),  // Dic 2025
    u(SCB,"1908371142"),  // Ene 2026
    u(SCB,"1784943106"),  // Feb 2026
    u(SCB,"753086464"),   // Mar 2026
    u(SCB,"1385872443"),  // Abr 2026
    u(SCB,"524583955"),   // May 2026
    u(SCB,"1924013276"),  // Jun 2026
  ],

  // ── P3 BORDADO SANTIAGO — 14 meses (May 2025 → Jun 2026) ──
  P3: [
    u(P3B,"1984414815"),  // May 2025
    u(P3B,"1799363227"),  // Jun 2025
    u(P3B,"2101633271"),  // Jul 2025
    u(P3B,"1517573174"),  // Ago 2025
    u(P3B,"924981558"),   // Sep 2025
    u(P3B,"2054199753"),  // Oct 2025
    u(P3B,"1939583771"),  // Nov 2025
    u(P3B,"1695282164"),  // Dic 2025
    u(P3B,"586232479"),   // Ene 2026
    u(P3B,"227395811"),   // Feb 2026
    u(P3B,"64940342"),    // Mar 2026
    u(P3B,"1264364783"),  // Abr 2026
    u(P3B,"1496309998"),  // May 2026
    u(P3B,"1895433781"),  // Jun 2026
  ],

  // ── P2 FABRICACIÓN PROPIA — 14 meses (May 2025 → Jun 2026) ──
  P2: [
    u(P2B,"1016285393"),  // May 2025
    u(P2B,"189947452"),   // Jun 2025
    u(P2B,"1583471825"),  // Jul 2025
    u(P2B,"1002874873"),  // Ago 2025
    u(P2B,"885148032"),   // Sep 2025
    u(P2B,"1843354928"),  // Oct 2025
    u(P2B,"159651934"),   // Nov 2025
    u(P2B,"639973872"),   // Dic 2025
    u(P2B,"1151516776"),  // Ene 2026
    u(P2B,"1095279281"),  // Feb 2026
    u(P2B,"1987032383"),  // Mar 2026
    u(P2B,"20025080"),    // Abr 2026
    u(P2B,"1884886019"),  // May 2026
    u(P2B,"1948420260"),  // Jun 2026
  ],

  // Mostrar solo pedidos con este estado (deja "" para ver todos)
  FILTRO_ESTADO: "EN PROCESO",

  // Fecha de referencia. "auto" = hoy. O fija: "2026-06-22"
  FECHA_HOY: "auto"
};
