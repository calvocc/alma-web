/**
 * Worker de Alma: sirve el sitio estático (carpeta `out`) y la API de "Esto me habló" con D1.
 *
 *   GET    /api/reacciones?charla=<slug>&visitante=<uuid>  → { liked: boolean }
 *   POST   /api/reacciones  { charla, visitante }          → guarda la marca
 *   DELETE /api/reacciones  { charla, visitante }          → la quita
 *
 * Nunca devuelve la lista ni los conteos: eso solo se ve desde el panel de Cloudflare.
 */
import { CHARLAS } from '../content/charlas';

interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

const SLUGS = new Set(CHARLAS.map((c) => c.slug));
const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

function valido(charla: unknown, visitante: unknown): { charla: string; visitante: string } | null {
  if (typeof charla !== 'string' || typeof visitante !== 'string') return null;
  if (!SLUGS.has(charla) || !UUID.test(visitante)) return null;
  return { charla, visitante: visitante.toLowerCase() }
}

async function leerCuerpo(request: Request) {
  try {
    return (await request.json()) as { charla?: unknown; visitante?: unknown }
  } catch {
    return {}
  }
}

async function leer(request: Request, env: Env) {
  const url = new URL(request.url);
  const v = valido(url.searchParams.get('charla'), url.searchParams.get('visitante'));
  if (!v) return json({ error: 'datos inválidos' }, 400);
  const fila = await env.DB.prepare('SELECT 1 FROM reacciones WHERE charla = ?1 AND visitante = ?2')
    .bind(v.charla, v.visitante)
    .first();
  return json({ liked: Boolean(fila) });
}

async function marcar(request: Request, env: Env) {
  const b = await leerCuerpo(request);
  const v = valido(b.charla, b.visitante);
  if (!v) return json({ error: 'datos inválidos' }, 400);
  await env.DB.prepare('INSERT OR IGNORE INTO reacciones (charla, visitante) VALUES (?1, ?2)')
    .bind(v.charla, v.visitante)
    .run();
  return json({ liked: true });
}

async function desmarcar(request: Request, env: Env) {
  const b = await leerCuerpo(request);
  const v = valido(b.charla, b.visitante);
  if (!v) return json({ error: 'datos inválidos' }, 400);
  await env.DB.prepare('DELETE FROM reacciones WHERE charla = ?1 AND visitante = ?2')
    .bind(v.charla, v.visitante)
    .run();
  return json({ liked: false });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/reacciones') {
      try {
        if (request.method === 'GET') return await leer(request, env);
        if (request.method === 'POST') return await marcar(request, env);
        if (request.method === 'DELETE') return await desmarcar(request, env);
        return json({ error: 'método no permitido' }, 405);
      } catch {
        return json({ error: 'no se pudo guardar' }, 500);
      }
    }
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
