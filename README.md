# Alma · sitio web

Sitio de Alma (estoesalma.co): la página de inicio con el recorrido en video y la sección de charlas.

Hecho con Next.js como **sitio estático**: `npm run build` genera la carpeta `out/`, que se publica en Cloudflare Pages.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # y completa los valores
npm run dev                  # http://localhost:3000
npm run build                # genera out/
```

## Publicar en Cloudflare Pages

1. En Cloudflare: Workers & Pages → Create → Pages → conectar este repositorio.
2. Framework preset: **Next.js (Static HTML Export)**.
3. Build command: `npm run build` · Build output directory: `out`.
4. Variables de entorno: las de `.env.example`.
5. En Custom domains, agrega `estoesalma.co`.

Cada push a `main` publica el sitio solo.

## Subir una charla nueva

1. Agrega su entrada en `content/charlas.ts` con `publicada: true` y sus datos.
2. Escribe el texto en `content/charlas/<slug>.mdx`. Puedes usar:
   - `<Versiculo cita="Hechos 3:6">…</Versiculo>`
   - `<Recuadro titulo="…">…</Recuadro>`
   - `<Pulso preguntas={['…', '…']} />`
3. Pon los archivos en `public/`:
   - `charlas/<slug>.webp`: la pintura.
   - `charlas/<slug>-og.jpg`: la vista previa para compartir, de 1200×630.
   - `charlas/<slug>-historia.jpg`: la historia de Instagram, de 1080×1920.
   - `antes-de-alma/charla-<n>.pdf`: el Antes de Alma de esa semana.

No se publican las notas para el facilitador ni el PDF completo del mensaje: solo el resumen.

## "Esto me habló"

Se guarda en **Cloudflare D1** de forma anónima. Cada navegador tiene un identificador al azar; no se guarda nombre, correo ni IP.

- La función `functions/api/reacciones.ts` recibe las marcas y es lo único que toca la base. Cloudflare Pages la publica sola junto al sitio.
- La tabla está en `migrations/0001_reacciones.sql`.
- La API nunca devuelve conteos. Para verlos, abre la consola de D1 en Cloudflare y corre:
  `SELECT charla, COUNT(*) AS personas FROM reacciones GROUP BY charla ORDER BY personas DESC;`

### Configurar D1 (una sola vez)

1. En Cloudflare: **Storage & Databases → D1 → Create database**, con el nombre `alma`.
2. En la consola de esa base, pega y ejecuta el contenido de `migrations/0001_reacciones.sql`.
3. En el proyecto de Pages: **Settings → Bindings → Add → D1 database**, con el nombre de la variable `DB` y la base `alma`. Luego vuelve a publicar.

Sin D1 conectado, el botón sigue funcionando y solo se recuerda en el dispositivo de la persona.

### Probar en local con la función y la base

```bash
npm run preview   # compila y levanta http://localhost:8788 con una D1 local
```

La primera vez, crea la tabla en la base local con `migrations/0001_reacciones.sql`.
