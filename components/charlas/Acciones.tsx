'use client';

import { useEffect, useState } from 'react';
import { visitanteId } from '@/lib/visitante';
import { IconFacebook, IconHeart, IconInstagram, IconLink, IconWhatsApp } from '@/components/Icons';

type Props = { slug: string; url: string; mensaje: string; historia?: string };

export default function Acciones({ slug, url, mensaje, historia }: Props) {
  const [liked, setLiked] = useState(false);
  const [copiado, setCopiado] = useState(false);

  // ¿Este navegador ya marcó la charla? Primero lo que recuerda el dispositivo, luego lo confirma el servidor.
  useEffect(() => {
    const local = (() => { try { return window.localStorage.getItem(`alma-hablo-${slug}`) === '1'; } catch { return false; } })();
    queueMicrotask(() => setLiked(local));
    const id = visitanteId();
    if (!id) return;
    const ctrl = new AbortController();
    fetch(`/api/reacciones?charla=${encodeURIComponent(slug)}&visitante=${id}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { liked?: boolean } | null) => { if (d && typeof d.liked === 'boolean') setLiked(d.liked); })
      .catch(() => { /* sin servidor (por ejemplo en desarrollo): queda lo local */ });
    // Los dos grupos de botones (arriba y al final) se mantienen sincronizados.
    const sync = (e: Event) => { const d = (e as CustomEvent<{ slug: string; liked: boolean }>).detail; if (d.slug === slug) setLiked(d.liked); };
    window.addEventListener('alma-hablo', sync);
    return () => { ctrl.abort(); window.removeEventListener('alma-hablo', sync); };
  }, [slug]);

  const toggle = async () => {
    const next = !liked;
    setLiked(next);
    try { window.localStorage.setItem(`alma-hablo-${slug}`, next ? '1' : '0'); } catch { /* sin almacenamiento */ }
    window.dispatchEvent(new CustomEvent('alma-hablo', { detail: { slug, liked: next } }));
    const id = visitanteId();
    if (!id) return;
    try {
      await fetch('/api/reacciones', {
        method: next ? 'POST' : 'DELETE',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ charla: slug, visitante: id }),
      });
    } catch { /* si falla la red, queda guardado en el dispositivo */ }
  };

  const copiar = async () => {
    try { await navigator.clipboard.writeText(url); } catch { /* sin portapapeles */ }
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2200);
  };

  const wa = `https://wa.me/?text=${encodeURIComponent(`${mensaje} ${url}`)}`;
  const fb = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <div className="acciones">
      <button type="button" className={`btn ${liked ? 'btn-liked' : 'btn-ghost'}`} onClick={toggle} aria-pressed={liked}>
        <IconHeart filled={liked} />
        <span>{liked ? 'TE HABLÓ' : 'ESTO ME HABLÓ'}</span>
      </button>
      <span className="sep" aria-hidden="true" />
      <a className="btn btn-ghost btn-icon" href={wa} target="_blank" rel="noopener" aria-label="Compartir por WhatsApp"><IconWhatsApp /></a>
      <a className="btn btn-ghost btn-icon" href={fb} target="_blank" rel="noopener" aria-label="Compartir en Facebook"><IconFacebook /></a>
      {historia && (
        <a className="btn btn-ghost btn-icon" href={historia} download aria-label="Descargar imagen para historia de Instagram"><IconInstagram size={19} /></a>
      )}
      <button type="button" className="btn btn-ghost btn-icon" onClick={copiar} aria-label="Copiar enlace"><IconLink /></button>
      {copiado && <span className="copiado" role="status">ENLACE COPIADO</span>}
    </div>
  );
}
