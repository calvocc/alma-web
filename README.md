# Alma · sitio web

Sitio de Alma (estoesalma.co): la página de inicio con el recorrido en video y la sección de charlas.

Hecho con Next.js como **sitio estático**: `npm run build` genera la carpeta `out/`, que se publica como un **Worker de Cloudflare** junto con la pequeña API de "Esto me habló". Toda la configuración está en `wrangler.jsonc`.

## Desarrollo

```bash
npm install
cp .env.example .env.local   # y completa los valores
npm run dev                  # http://localhost:3000
npm run build                # genera out/
```

## Publicar en Cloudflare

El proyecto ya está creado como Worker (`alma-web`) y conectado a este repositorio. Su configuración de build:

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Variables de entorno: `NODE_VERSION=22` y las de `.env.example`.

Cada push a `main` publica el sitio solo. Para el dominio: en el Worker, **Settings → Domains & Routes → Add → Custom domain**, con `estoesalma.co`.

## Subir una charla nueva

1. Agrega su entrada en `content/charlas.ts` y actualiza `PROXIMA` con la charla que viene.
2. Escribe el texto en `content/charlas/<slug>.mdx`. Puedes usar:
   - `<Versiculo cita="Hechos 3:6">…</Versiculo>`
   - `<Recuadro titulo="…">…</Recuadro>`
   - `<Pulso preguntas={['…', '…']} />`
3. Pon los archivos en `public/`:
   - `charlas/<slug>.webp`: la pintura.
   - `charlas/<slug>-historia.jpg`: la historia de Instagram, de 1080×1920.
   - `antes-de-alma/charla-<n>.pdf`: el Antes de Alma de la charla que viene (solo se publica ese).
4. Genera la vista previa para compartir con `npm run og`.

No se publican las notas para el facilitador ni el PDF completo del mensaje: solo el resumen.

## "Esto me habló"

Se guarda en **Cloudflare D1** de forma anónima. Cada navegador tiene un identificador al azar; no se guarda nombre, correo ni IP.

- `worker/index.ts` atiende `/api/reacciones` y es lo único que toca la base; todo lo demás lo sirve desde `out/`.
- La tabla está en `migrations/0001_reacciones.sql`.
- La API nunca devuelve conteos. Para verlos, abre la consola de D1 en Cloudflare y corre:
  `SELECT charla, COUNT(*) AS personas FROM reacciones GROUP BY charla ORDER BY personas DESC;`

### La base D1

La base `alma` ya está creada y conectada en `wrangler.jsonc` (variable `DB`). Si alguna vez hay que crearla de nuevo, ejecuta en su consola el contenido de `migrations/0001_reacciones.sql` y actualiza `database_id`.

Sin D1 conectado, el botón sigue funcionando y solo se recuerda en el dispositivo de la persona.

### Probar en local con la función y la base

```bash
npm run db:local  # la primera vez: crea la tabla en la base local
npm run preview   # compila y levanta http://localhost:8787 con el Worker y una D1 local
```

