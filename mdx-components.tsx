import type { MDXComponents } from 'mdx/types';

/** Cita bíblica con su referencia. */
export function Versiculo({ cita, children }: { cita: string; children: React.ReactNode }) {
  return (
    <blockquote className="versiculo">
      <p>“{children}”</p>
      <cite>{cita.toUpperCase()}</cite>
    </blockquote>
  );
}

/** Recuadro destacado dentro del texto. */
export function Recuadro({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <aside className="recuadro">
      <p className="recuadro-titulo">{titulo.toUpperCase()}</p>
      {children}
    </aside>
  );
}

/** Las preguntas de Pulso para la semana. */
export function Pulso({ preguntas }: { preguntas: string[] }) {
  return (
    <section className="pulso" aria-labelledby="pulso">
      <h2 id="pulso">PARA LLEVARTE ESTA SEMANA</h2>
      {preguntas.map((q, i) => (
        <div key={i} style={{ display: 'contents' }}>
          {i > 0 && <hr />}
          <p>{q}</p>
        </div>
      ))}
    </section>
  );
}

const components: MDXComponents = { Versiculo, Recuadro, Pulso };

export function useMDXComponents(): MDXComponents {
  return components;
}
