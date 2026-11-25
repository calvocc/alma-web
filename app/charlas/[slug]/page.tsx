import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Lockup from '@/components/Lockup';
import Acciones from '@/components/charlas/Acciones';
import { BLOQUES, CHARLAS, PROXIMA, charlaPorSlug, ogDe, ultima } from '@/content/charlas';
import { SITE, absoluteUrl, whatsappLink } from '@/lib/site';

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CHARLAS.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const c = charlaPorSlug(slug);
  if (!c) return {};
  const titulo = `${c.titulo} · Charla ${c.n}`;
  return {
    title: titulo,
    description: c.resumen,
    alternates: { canonical: `/charlas/${c.slug}/` },
    openGraph: {
      type: 'article',
      title: `${titulo} · Alma`,
      description: c.frase,
      url: `/charlas/${c.slug}/`,
      images: [{ url: ogDe(c.slug), width: 1200, height: 630, alt: c.frase }],
    },
  };
}

export default async function CharlaPage({ params }: Params) {
  const { slug } = await params;
  const c = charlaPorSlug(slug);
  if (!c) notFound();

  const { default: Contenido } = await import(`@/content/charlas/${slug}.mdx`);
  const url = absoluteUrl(`/charlas/${c.slug}/`);
  const bloque = BLOQUES.find((b) => b.id === c.bloque)?.nombre ?? '';
  const anterior = CHARLAS.filter((x) => x.n < c.n).sort((a, b) => b.n - a.n)[0];
  const siguiente = CHARLAS.filter((x) => x.n > c.n).sort((a, b) => a.n - b.n)[0];
  const esLaUltima = ultima().slug === c.slug;
  const mensaje = c.fraseCorta && c.fraseScript ? `«${c.fraseCorta.replace(/\.$/, '')}: ${c.fraseScript}.» Charla ${c.n} de Alma ·` : `«${c.frase}» Charla ${c.n} de Alma ·`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: c.titulo,
    description: c.resumen,
    image: absoluteUrl(ogDe(c.slug)),
    inLanguage: 'es-CO',
    publisher: { '@type': 'Organization', name: 'Alma', url: SITE.url },
    mainEntityOfPage: url,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header active="charlas" />
      <main>
        <article>
          <section className="charla-hero hero-bruma">
            {c.pintura && (
                <figure className="charla-hero-figure">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={c.pintura} alt={c.pinturaAlt ?? ''} />
                  {c.pinturaCita && <figcaption>{c.pinturaCita.toUpperCase()}</figcaption>}
                </figure>
              )}
            <div className="wrap charla-hero-inner">
              <div className="charla-hero-text">
                <nav aria-label="Ruta" className="kicker">
                  <Link href="/charlas/" style={{ color: 'var(--gris)', textDecoration: 'none' }}>CHARLAS</Link> <span aria-hidden="true">/</span> BLOQUE: {bloque} <span aria-hidden="true">/</span> CHARLA {c.n}
                </nav>
                <h1 className="charla-title">{c.titulo.toUpperCase()}</h1>
                {c.fraseScript && (
                  <div style={{ marginTop: -6, paddingLeft: 'clamp(40px, 6vw, 90px)' }}>
                    <Lockup label={c.fraseScript} ancho={1062} alto={160}
                      hilo="M-170 150 C -120 150 -90 88 -40 83 C -12 80 18 80 40 79.5"
                      lineas={[{ texto: c.fraseScript, x: 40, y: 110 }]} />
                  </div>
                )}
                {!c.fraseScript && (
                  <p className="frase-hero">{c.frase}</p>
                )}
                <p className="lead" style={{ maxWidth: 640, fontSize: 'clamp(18px, 1.5vw, 21px)' }}>{c.resumen}</p>
                <div className="metas kicker">
                  {c.textos && <span>{c.textos.toUpperCase()}</span>}
                  {c.lectura && <span>{c.lectura.toUpperCase()}</span>}
                  {c.fecha && <span>{c.fecha.toUpperCase()}</span>}
                </div>
                <div style={{ marginTop: 8 }}>
                  <Acciones slug={c.slug} url={url} mensaje={mensaje} historia={c.historia} />
                </div>
              </div>
            </div>
          </section>

          <div className="charla-body">
            <div className="wrap charla-cols">
              <div className="prosa">
                <Contenido />
                <div style={{ marginTop: 28, paddingTop: 28, borderTop: '1px solid rgba(27,26,25,.15)', display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <p className="lemon" style={{ fontSize: 13, letterSpacing: '.14em', color: 'var(--carbon)' }}>¿TE SIRVIÓ? COMPÁRTELA CON ALGUIEN</p>
                  <Acciones slug={c.slug} url={url} mensaje={mensaje} historia={c.historia} />
                </div>
              </div>

              <aside className="lateral">
                {esLaUltima ? (PROXIMA && (
                  <div className="card-line">
                    <p className="kicker">EL PRÓXIMO DOMINGO · CHARLA {PROXIMA.n}</p>
                    <p className="lemon" style={{ margin: 0, fontSize: 20, lineHeight: 1.25 }}>{PROXIMA.titulo.toUpperCase()}</p>
                    <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: '#3A3835' }}>{PROXIMA.idea}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      <a className="btn btn-primary" href={whatsappLink()}>QUIERO IR</a>
                      <Link className="btn btn-ghost" href="/charlas/#esta-semana">ANTES DE ALMA</Link>
                    </div>
                  </div>
                )) : siguiente ? (
                  <Link className="card-line card-link" href={`/charlas/${siguiente.slug}/`}>
                    <p className="kicker">LA SIGUIENTE · CHARLA {siguiente.n}</p>
                    <p className="lemon" style={{ margin: 0, fontSize: 20, lineHeight: 1.25 }}>{siguiente.titulo.toUpperCase()}</p>
                    <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: '#3A3835' }}>{siguiente.resumen}</p>
                    <span className="kicker" style={{ color: 'var(--ocre)' }}>LEER →</span>
                  </Link>
                ) : null}
                <div className="card-dark">
                  <p className="kicker" style={{ color: '#CFCAC0' }}>ESTO SE CONVERSÓ UN DOMINGO EN UNA CASA</p>
                  <p className="lemon" style={{ margin: 0, fontSize: 20, lineHeight: 1.3 }}>La próxima vez, ven a conversarlo con nosotros.</p>
                  <a className="btn btn-ocre" href={whatsappLink()} style={{ alignSelf: 'flex-start' }}>QUIERO IR</a>
                </div>
              </aside>
            </div>
          </div>

          <nav aria-label="Otras charlas" style={{ padding: '0 var(--pad-x) clamp(56px, 7vw, 96px)' }}>
            <div className="wrap nav-charlas">
              {anterior && (
                <Link href={`/charlas/${anterior.slug}/`}>
                  <span className="kicker">← CHARLA {anterior.n}</span>
                  <span className="lemon" style={{ fontSize: 20 }}>{anterior.titulo.toUpperCase()}</span>
                </Link>
              )}
              <Link href="/charlas/" style={{ textAlign: 'right' }}>
                <span className="kicker">TODAS LAS CHARLAS →</span>
                <span className="lemon" style={{ fontSize: 20 }}>VOLVER AL LISTADO</span>
              </Link>
            </div>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
