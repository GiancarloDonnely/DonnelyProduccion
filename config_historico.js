// ════════════════════════════════════════════════════════════════════
//  CONFIGURACIÓN HISTÓRICA — Donnely Dashboard de Capacidad
//  Todos los meses de 2025 y 2026 de las 4 planillas.
// ════════════════════════════════════════════════════════════════════
var P1_BASE="https://docs.google.com/spreadsheets/d/e/2PACX-1vSSjzVtfMXqHcM1NEAQTZynYT_uzna5StYRM5ri1c4xGE6A8iFud7cHS1QybN8SG75M1xIyU2DZt6wC/pub";
var SC_BASE="https://docs.google.com/spreadsheets/d/e/2PACX-1vRZ3zoBwh7miw2xDIYylOUBgbmQdA1q-3kMOkBZcey6ZNifRg0UF0mt3zKJ8t1IMKQYXlw2sq7Ct9SQ/pub";
var P2_BASE="https://docs.google.com/spreadsheets/d/e/2PACX-1vReMhfcP934WWDFAcyxkNvgG-E8yaXmT1L90TPHQE9fdpCvQihRrv91Cl1B8Bh21Q/pub";
var P3_BASE="https://docs.google.com/spreadsheets/d/e/2PACX-1vRI8lwje2sWV_cX-8mg-ssDOv7HfyaJapKpuKOqEXILNMB9oGuamE2tSpLBN05EjHLSrcgQYp7D11MA/pub";
function U(base,gid){return base+"?gid="+gid+"&single=true&output=csv";}

var MESES_HIST = [
  // mes(YYYY-MM), label, P1 gid, SC gid, P2 gid, P3 gid  (null si no existe)
  ["2025-03","Mar 2025","2135645606","696772871", null,        null],
  ["2025-04","Abr 2025","943810346", "1913655541",null,        null],
  ["2025-05","May 2025","1818784902","904637040", "1016285393","1984414815"],
  ["2025-06","Jun 2025","162072593", "1050485182","189947452", "1799363227"],
  ["2025-07","Jul 2025","2092977677","2130182716","1583471825","2101633271"],
  ["2025-08","Ago 2025","965142141", "1313090913","1002874873","1517573174"],
  ["2025-09","Sep 2025","161118466", "1649854449","885148032", "924981558"],
  ["2025-10","Oct 2025","703937459", "1744982201","1843354928","2054199753"],
  ["2025-11","Nov 2025","1432972158","81784121",  "159651934", "1939583771"],
  ["2025-12","Dic 2025","1269299252","1949564465","639973872", "1695282164"],
  ["2026-01","Ene 2026","1311507827","1908371142","1151516776","586232479"],
  ["2026-02","Feb 2026","449951004", "1784943106","1095279281","227395811"],
  ["2026-03","Mar 2026","847726791", "753086464", "1987032383","64940342"],
  ["2026-04","Abr 2026","1200597389","1385872443","20025080",  "1264364783"],
  ["2026-05","May 2026","862243628", "524583955", "1884886019","1496309998"]
];

// Construir lista de fuentes por mes
var FUENTES = MESES_HIST.map(function(m){
  return {
    mes: m[0], label: m[1],
    P1: m[2]?U(P1_BASE,m[2]):null,
    SC: m[3]?U(SC_BASE,m[3]):null,
    P2: m[4]?U(P2_BASE,m[4]):null,
    P3: m[5]?U(P3_BASE,m[5]):null
  };
});
