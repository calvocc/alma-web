import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lockup from '@/components/Lockup';
import CharlasIndex from '@/components/charlas/CharlasIndex';
import { CHARLAS, PROXIMA, ultima } from '@/content/charlas';
import { IconDownload } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Charlas',
  description: 'Lo que hemos conversado en Alma, para volver cuando quieras: las charlas de cada domingo y el Antes de Alma de la que viene.',
  alternates: { canonical: '/charlas/' },
};

export default function CharlasPage() {
  const u = ultima();
  return (
    <>
      <Header active="charlas" />
      <main>
        <section className="hero-bruma" style={{ padding: 'clamp(48px, 7vw, 96px) var(--pad-x) clamp(32px, 4vw, 48px)' }}>
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <h1 className="h-display" style={{ fontSize: 'clamp(36px, 6vw, 80px)', lineHeight: 1.04 }}>LO QUE HEMOS<br />CONVERSADO</h1>
            <div style={{ paddingLeft: 'clamp(30px, 5vw, 80px)' }}>
              <Lockup
                label="para volver cuando quieras"
                ancho={755}
                alto={290}
                hilo="M-150 40 C -110 10 -70 70 -30 92 C -5 104 22 100 41 95"
                lineas={[{ texto: 'para volver', x: 40, y: 110 }, { texto: 'cuando quieras', x: 90, y: 230 }]}
              />
            </div>
            <p className="lead" style={{ maxWidth: 620 }}>Cada domingo conversamos un texto en una casa. Aquí queda lo esencial de cada charla para que vuelvas cuando lo necesites. Lo demás pasa en la mesa.</p>
          </div>
        </section>

        {u && (
          <section aria-labelledby="ultima" style={{ padding: '0 var(--pad-x)' }}>
            <div className="wrap banner">
              <div className="banner-glow" aria-hidden="true" />
              <div className="banner-text">
                <p className="kicker" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: '#D9C9A8', letterSpacing: '.18em' }}>
                  <span className="dot" aria-hidden="true" />LO ÚLTIMO QUE CONVERSAMOS · CHARLA {u.n}
                </p>
                <h2 id="ultima" className="lemon" style={{ margin: 0, fontWeight: 400, fontSize: 'clamp(34px, 4.8vw, 64px)', lineHeight: 1.02 }}>{u.titulo.toUpperCase()}</h2>
                {u.fraseScript && (
                  <div style={{ paddingLeft: 'clamp(24px, 4vw, 60px)', marginTop: -4 }}>
                    <Lockup label={u.fraseScript} ancho={1062} alto={160} color="#D9A84E" tamano="clamp(32px, 3.6vw, 52px)"
                      hilo="M-170 150 C -120 150 -90 88 -40 83 C -12 80 18 80 40 79.5"
                      lineas={[{ texto: u.fraseScript, x: 40, y: 110 }]} />
                  </div>
                )}
                <p style={{ margin: 0, maxWidth: 520, fontSize: 18, lineHeight: 1.65, color: '#CFCAC0' }}>{u.resumen}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
                  <Link className="btn btn-ocre" href={`/charlas/${u.slug}/`}>LEER LA CHARLA</Link>
                </div>
              </div>
              {u.pintura && (
                <figure className="banner-figure">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={u.pintura} alt={u.pinturaAlt ?? ''} />
                  {u.pinturaCita && <figcaption>{u.pinturaCita.toUpperCase()}</figcaption>}
                </figure>
              )}
            </div>
          </section>
        )}


        <section aria-labelledby="esta-semana" style={{ padding: 'clamp(20px, 3vw, 28px) var(--pad-x) 0' }}>
          <div className="wrap proxima">
            <div className="proxima-text">
              <p className="kicker" style={{ color: 'var(--ocre)', letterSpacing: '.18em' }}>ESTE DOMINGO · CHARLA {PROXIMA.n}</p>
              <h2 id="esta-semana" className="lemon" style={{ margin: 0, fontWeight: 400, fontSize: 'clamp(24px, 2.8vw, 36px)', lineHeight: 1.1 }}>{PROXIMA.titulo.toUpperCase()}</h2>
              <p style={{ margin: 0, maxWidth: 620, fontSize: 17, lineHeight: 1.6, color: 'var(--texto)' }}>{PROXIMA.idea}</p>
              <p className="kicker">PARA LEER ANTES: {PROXIMA.textos.toUpperCase()}</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'flex-start' }}>
              <a className="btn btn-ocre" href={PROXIMA.antesDeAlma} download><IconDownload size={18} /><span>ANTES DE ALMA</span></a>
              <span className="kicker" style={{ maxWidth: 240 }}>Léelo, piénsalo y llega con algo que aportar.</span>
            </div>
          </div>
        </section>

        <section aria-labelledby="todas" style={{ padding: 'clamp(48px, 6vw, 80px) var(--pad-x) clamp(56px, 7vw, 96px)' }}>
          <CharlasIndex charlas={CHARLAS} />
        </section>
      </main>
      <Footer />
    </>
  );
}
