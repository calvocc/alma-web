import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ScrollJourney from '@/components/landing/ScrollJourney';
import Lockup from '@/components/Lockup';
import { SITE, whatsappLink } from '@/lib/site';

const PREGUNTAS = [
  {
    q: '¿Tengo que ser cristiano, católico o de alguna iglesia?',
    a: 'No. Nosotros tampoco nos ponemos etiquetas ni pertenecemos a ninguna denominación. Somos personas que queremos acercarnos a Dios sin religión y sin protocolo. Hablamos de Jesús y leemos la Biblia, no para cumplir reglas, sino para descubrir su Gracia. Llega como estés, con tus preguntas y tus dudas.',
  },
  {
    q: '¿Cuánto cuesta?',
    a: 'Nada. Nadie te va a pedir plata, ni en la reunión ni después. Aquí la generosidad nace sola: casas abiertas, comida compartida, tiempo para el otro. Si un día te nace dar algo, que sea porque quieres, no porque te toca.',
  },
  {
    q: '¿Qué día es?',
    a: 'Normalmente los domingos. A veces cambia según la casa o el lugar donde nos reunamos; escríbenos y te contamos.',
  },
  {
    q: '¿Dónde es?',
    a: 'En casas o lugares que rotan entre Madrid, Mosquera y Funza. Por respeto a quienes abren su casa, la dirección la compartimos por mensaje.',
  },
  { q: '¿Y si no conozco a nadie?', a: 'Todos llegamos así alguna vez. Escríbenos antes y alguien te espera en la puerta.' },
  { q: '¿Tengo que hablar o contar algo?', a: 'No. Nadie tiene que contar lo que no quiera. Puedes solo escuchar el tiempo que necesites.' },
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Alma',
  alternateName: 'Esto es Alma',
  url: SITE.url,
  logo: `${SITE.url}/icon.png`,
  description:
    'Iglesia en casas en Funza, Madrid y Mosquera (Cundinamarca). Personas que se reúnen los domingos para acercarse a Dios, sin religión y sin protocolo.',
  slogan: 'Ese aliento que no se detiene es lo que nos hace alma',
  areaServed: ['Funza', 'Madrid', 'Mosquera'].map((name) => ({
    '@type': 'City',
    name,
    containedInPlace: { '@type': 'AdministrativeArea', name: 'Cundinamarca, Colombia' },
  })),
  sameAs: [SITE.instagram, SITE.tiktok],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header active="inicio" />
      <main>
        <ScrollJourney />

        <section id="iglesia" className="section">
          <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <h1 className="titulo-con-script" style={{ maxWidth: 900 }}>
              ¿BUSCAS UNA IGLESIA EN FUNZA, MADRID O MOSQUERA?
              <span style={{ display: 'block', marginTop: 'clamp(28px, 4vw, 48px)', paddingLeft: 'clamp(24px, 4vw, 60px)' }}>
                <Lockup label="la iglesia es la gente" ancho={660} alto={300} tamano="clamp(40px, 5.4vw, 70px)"
                  hilo="M-150 120 C -110 40 -40 -30 20 -40 C 45 -44 64 -25 62 -8 C 61.5 0 60.5 5 59.3 10"
                  lineas={[{ texto: 'la iglesia es', x: 40, y: 110 }, { texto: 'la gente', x: 260, y: 230 }]} />
              </span>
            </h1>
            <p className="lead" style={{ maxWidth: 680 }}>
              Alma no es una iglesia tradicional ni pertenece a ninguna denominación. Somos personas que nos reunimos los
              domingos en casas para acercarnos a Dios, sin religión y sin protocolo: compartimos algo de comer, leemos la
              Biblia y conversamos sobre la vida, entre amigos.
            </p>
            <div className="ciudades">
              <div className="ciudad">
                <h3>MADRID</h3>
                <p>Muchos de los que hacemos parte de Alma vivimos en Madrid, y buena parte de las reuniones de los domingos se hacen en casas de aquí.</p>
              </div>
              <div className="ciudad">
                <h3>MOSQUERA</h3>
                <p>Desde Mosquera también llegan amigos cada semana. Si vives aquí, estás a unos minutos de una mesa donde te guardamos un puesto.</p>
              </div>
              <div className="ciudad">
                <h3>FUNZA</h3>
                <p>En Funza también abrimos casas. Si buscas un lugar para hablar de Dios sin formalidades, cerca de tu casa, escríbenos.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="preguntas" className="section" style={{ paddingBottom: 'clamp(80px, 11vw, 150px)' }}>
          <div className="wrap faq">
            <div style={{ flex: '1 1 320px', minWidth: 0 }}>
              <h2 className="titulo-con-script">
                PREGUNTAS QUE CASI NADIE HACE
                <span style={{ display: 'block', marginTop: 'clamp(16px, 2vw, 28px)', paddingLeft: 'clamp(24px, 4vw, 60px)' }}>
                  <Lockup label="pero todos tenemos" ancho={463} alto={300} tamano="clamp(40px, 5.4vw, 70px)"
                    hilo="M-150 150 C -120 60 -60 10 0 18 C 25 22 38 40 38.5 55 C 38.6 62 38 68 37.3 72.7"
                    lineas={[{ texto: 'pero todos', x: 40, y: 110 }, { texto: 'tenemos', x: 120, y: 230 }]} />
                </span>
              </h2>
            </div>
            <div className="faq-list">
              {PREGUNTAS.map(({ q, a }) => (
                <details key={q}>
                  <summary>
                    {q}
                    <span className="plus" aria-hidden="true">+</span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="wrap" style={{ marginTop: 'clamp(56px, 7vw, 96px)', display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <a className="btn btn-primary" href={whatsappLink()}>QUIERO IR</a>
            <a className="btn btn-ghost" href={SITE.instagram}>VER INSTAGRAM</a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
