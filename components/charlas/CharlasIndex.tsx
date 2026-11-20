'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Bloque, Charla } from '@/content/charlas';
import { BLOQUES } from '@/content/charlas';
import { IconArrow } from '@/components/Icons';

export default function CharlasIndex({ charlas }: { charlas: Charla[] }) {
  const [filtro, setFiltro] = useState<'todas' | Bloque>('todas');
  const primera = [...charlas].sort((a, b) => b.n - a.n)[0];
  const [activa, setActiva] = useState(primera.slug);
  const act = charlas.find((c) => c.slug === activa) ?? primera;

  const grupos = BLOQUES.filter((b) => filtro === 'todas' || b.id === filtro)
    .map((b) => ({ ...b, items: charlas.filter((c) => c.bloque === b.id) }))
    .filter((g) => g.items.length);

  return (
    <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-end', gap: 18 }}>
        <h2 id="todas" className="lemon" style={{ margin: 0, fontWeight: 400, fontSize: 'clamp(22px, 2.4vw, 30px)' }}>TODAS LAS CHARLAS</h2>
        <div className="chips" role="group" aria-label="Filtrar por bloque">
          {[{ id: 'todas' as const, nombre: 'TODAS' }, ...BLOQUES].map((b) => (
            <button key={b.id} type="button" className="chip" aria-pressed={filtro === b.id} onClick={() => setFiltro(b.id)}>
              {b.nombre}
            </button>
          ))}
        </div>
      </div>

      <div className="split">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 34, minWidth: 0 }}>
          {grupos.map((g) => (
            <div key={g.id} style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="grupo-label">{g.etiqueta}</div>
              {g.items.map((c) => {
                const contenido = (
                  <>
                    <span className="row-num" aria-hidden="true">{c.n}</span>
                    <span style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
                      <span className="row-tit">{c.titulo.toUpperCase()}</span>
                      <svg className="row-under" viewBox="0 0 240 16" aria-hidden="true">
                        <path pathLength={1} d="M2 10 C 40 2 80 16 120 8 S 200 2 238 9" fill="none" stroke="#9A6E22" strokeWidth={2} strokeLinecap="round" />
                      </svg>
                      <span className="row-meta">
                        {c.slug === primera.slug ? `LA ÚLTIMA · ${c.textos.toUpperCase()}` : c.textos.toUpperCase()}
                      </span>
                    </span>
                    <span className="row-arrow" aria-hidden="true"><IconArrow /></span>
                  </>
                );
                const props = {
                  className: `row ${activa === c.slug ? 'row-on' : ''}`,
                  onMouseEnter: () => setActiva(c.slug),
                  onFocus: () => setActiva(c.slug),
                };
                return <Link key={c.slug} href={`/charlas/${c.slug}/`} {...props}>{contenido}</Link>;
              })}
            </div>
          ))}
        </div>

        <aside className="abierta" aria-live="polite">
          <span className="abierta-num" aria-hidden="true">{act.n}</span>
          <div className="abierta-body">
            <p className="kicker">CHARLA {act.n} · {BLOQUES.find((b) => b.id === act.bloque)?.nombre}</p>
            <p className="abierta-frase">{act.frase}</p>
            <p className="lemon" style={{ margin: 0, fontWeight: 700, fontSize: 14, letterSpacing: '.12em', color: 'var(--ocre)' }}>{act.titulo.toUpperCase()}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 6 }}>
              <Link className="btn btn-primary" href={`/charlas/${act.slug}/`}>LEER LA CHARLA</Link>
            </div>
          </div>
          {act.pintura && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="abierta-img" src={act.pintura} alt="" aria-hidden="true" />
          )}
        </aside>
      </div>
    </div>
  );
}
