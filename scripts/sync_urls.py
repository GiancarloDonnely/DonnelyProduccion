#!/usr/bin/env python3
"""Detecta pestañas nuevas en las planillas de Google Sheets publicadas y
actualiza las URLs CSV del dashboard.

Lee cada libro publicado (pubhtml), compara sus pestañas con las que ya están en
data/urls_planillas.json y agrega las nuevas en:
  - data/urls_planillas.json
  - la constante URLS de index.html

Solo agrega pestañas cuyo nombre se reconoce como "<mes> <año>" (ej. "ENERO 2027",
"MAYO PRODUCCION 2025") en libros que pertenecen a una sola planilla. Todo lo demás
(MAESTRO, RESUMEN, meses sin año, libros compartidos por dos planillas) se reporta
para revisión manual y NO se agrega. Nunca modifica ni borra URLs existentes.

Uso:
  python scripts/sync_urls.py --check   # solo muestra qué cambiaría
  python scripts/sync_urls.py           # aplica los cambios
"""
import json
import re
import sys
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
JSON_PATH = ROOT / "data" / "urls_planillas.json"
HTML_PATH = ROOT / "index.html"
MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio",
         "agosto", "septiembre", "octubre", "noviembre", "diciembre"]
URL_TPL = "https://docs.google.com/spreadsheets/d/e/{pid}/pub?gid={gid}&single=true&output=csv"
URLS_LINE = re.compile(r"^const URLS = .*;$", re.M)


def read(path):
    with open(path, encoding="utf-8", newline="") as f:
        return f.read()


def write(path, text):
    with open(path, "w", encoding="utf-8", newline="") as f:
        f.write(text)


def fetch_tabs(pid):
    url = f"https://docs.google.com/spreadsheets/d/e/{pid}/pubhtml"
    html = urllib.request.urlopen(url, timeout=60).read().decode("utf-8")
    return re.findall(r'items\.push\(\{name: "([^"]*)".*?gid: "(\d+)"', html)


def month_key(tab_name):
    """'MAYO PRODUCCION 2025' -> 'mayo 2025'; None si no es mes + año."""
    name = tab_name.lower()
    year = re.search(r"\b(20\d\d)\b", name)
    month = next((m for m in MESES if re.search(rf"\b{m}\b", name)), None)
    return f"{month} {year.group(1)}" if month and year else None


def main():
    sys.stdout.reconfigure(encoding="utf-8")  # consola de Windows
    check = "--check" in sys.argv
    data = json.loads(read(JSON_PATH))

    # libro publicado -> {gid: (planilla, clave)} con lo ya conocido
    books = {}
    for planilla, meses in data.items():
        for key, url in meses.items():
            m = re.search(r"/d/e/([^/]+)/pub\?gid=(\d+)", url)
            books.setdefault(m.group(1), {})[m.group(2)] = (planilla, key)

    added, review = [], []
    for pid, known in books.items():
        planillas = sorted({p for p, _ in known.values()})
        try:
            tabs = fetch_tabs(pid)
        except Exception as e:  # noqa: BLE001 - reportar y seguir con los demás libros
            review.append(f"{planillas}: no se pudo leer el libro publicado ({e})")
            continue
        for name, gid in tabs:
            if gid in known:
                continue
            name = name.strip()
            key = month_key(name)
            if len(planillas) != 1:
                review.append(f"{planillas}: pestaña nueva '{name}' (gid {gid}) - libro compartido, asignar a mano")
            elif key is None:
                review.append(f"{planillas[0]}: pestaña nueva '{name}' (gid {gid}) - no es mes+año, no se agrega")
            elif key in data[planillas[0]]:
                review.append(f"{planillas[0]}: pestaña nueva '{name}' (gid {gid}) - la clave '{key}' ya existe, no se sobrescribe")
            else:
                data[planillas[0]][key] = URL_TPL.format(pid=pid, gid=gid)
                added.append(f"{planillas[0]}: + {key}  (pestaña '{name}', gid {gid})")

    print("AGREGAR:" if added else "Sin pestañas nuevas para agregar.")
    for line in added:
        print("  " + line)
    if review:
        print("\nREVISAR A MANO:")
        for line in review:
            print("  " + line)

    if check or not added:
        return
    write(JSON_PATH, json.dumps(data, indent=2, ensure_ascii=False))
    html = read(HTML_PATH)
    new_line = "const URLS = " + json.dumps(data, ensure_ascii=False) + ";"
    if not URLS_LINE.search(html):
        sys.exit("ERROR: no encontré la línea 'const URLS = ...;' en index.html")
    write(HTML_PATH, URLS_LINE.sub(lambda _: new_line, html, count=1))
    print(f"\nActualizados {JSON_PATH.name} e {HTML_PATH.name}.")


if __name__ == "__main__":
    main()
