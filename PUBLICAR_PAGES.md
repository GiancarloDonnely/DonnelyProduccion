# Publicar el dashboard en GitHub Pages

GitHub Pages sirve el dashboard como una página web pública, gratis, directamente desde tu repositorio.

---

## Pasos

1. Sube todos los archivos de este repositorio a tu repo de GitHub (la rama suele llamarse `main`).
2. En GitHub, entra a tu repositorio y ve a **Settings** (Configuración).
3. En el menú lateral, entra a **Pages**.
4. En **Source** (Origen), elige:
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Pulsa **Save**.
6. Espera 1–2 minutos. GitHub mostrará la URL pública, con esta forma:
   ```
   https://<tu-usuario>.github.io/<nombre-repo>/
   ```

Como el dashboard se llama `index.html` y está en la raíz, GitHub Pages lo servirá automáticamente como página principal.

---

## Verificar que funciona

Abre la URL pública. Deberías ver el dashboard con datos de muestra. Luego pulsa **🔗 Conectar mis planillas → Cargar datos en vivo** para traer tus datos reales.

---

## Actualizaciones

Cada vez que hagas *push* de un cambio a la rama `main`, GitHub Pages actualiza el sitio automáticamente en 1–2 minutos. No hay que republicar nada.

---

## Consideraciones

- **El dashboard es público:** cualquiera con la URL puede verlo. Los datos que se muestran son los de tus Google Sheets publicados (que también son públicos por estar publicados como CSV). Si necesitas restringir el acceso, GitHub Pages en repos privados requiere una cuenta de pago, o puedes usar otra plataforma de hosting con autenticación.
- **No se guarda nada en servidor:** todo el procesamiento ocurre en el navegador de quien abre la página. No hay base de datos ni backend que mantener.
- **CDN:** el dashboard usa PapaParse desde un CDN público para leer los CSV. Requiere conexión a internet para funcionar.
