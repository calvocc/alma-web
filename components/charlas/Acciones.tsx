'use client';

import { useEffect, useState } from 'react';
import { supabase, visitanteId } from '@/lib/supabase';
import { IconFacebook, IconHeart, IconInstagram, IconLink, IconWhatsApp } from '@/components/Icons';

type Props = { slug: string; url: string; mensaje: string; historia?: string };

export default function Acciones({ slug, url, mensaje, historia }: Props) {
  const [liked, setLiked] = useState(false);
  const [copiado, setCopiado] = useState(false);

  // ¿Este navegador ya marcó la charla?
  useEffect(() => {
    const sb = supabase();
    const id = visitanteId();
    const local = (() => { try { return window.localStorage.getItem(`alma-hablo-${slug}`) === '1'; } catch { return false; } })();
    queueMicrotask(() => setLiked(local));
    if (!sb || !id) return;
    sb.rpc('me_hablo', { p_charla: slug, p_visitante: id }).then(({ data }) => {
      if (typeof data === 'boolean') setLiked(data);
    });
  }, [slug]);

  const toggle = async () => {
    const next = !liked;
    setLiked(next);
    try { window.localStorage.setItem(`alma-hablo-${slug}`, next ? '1' : '0'); } catch { /* sin almacenamiento */ }
    const sb = supabase();
    const id = visitanteId();
    if (!sb || !id) return;
    const { error } = next
      ? await sb.from('reacciones').insert({ charla: slug, visitante: id })
      : await sb.rpc('quitar_reaccion', { p_charla: slug, p_visitante: id });
    if (error && error.code !== '23505') setLiked(!next);
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
