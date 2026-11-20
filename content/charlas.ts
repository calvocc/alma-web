/**
 * Índice de charlas. Para publicar una charla nueva:
 * 1. Agrega su entrada aquí.
 * 2. Crea `content/charlas/<slug>.mdx` con el texto.
 * 3. Opcional: la pintura en `public/charlas/<slug>.webp` y la historia de Instagram en `<slug>-historia.jpg`.
 *    La vista previa para compartir (`<slug>-og.jpg`) se genera con `npm run og`.
 * 4. Actualiza PROXIMA con la charla que viene y su Antes de Alma en `public/antes-de-alma/`.
 */
export type Bloque = 'jesus' | 'pecado' | 'dios' | 'otras' | 'inicio';

export type Charla = {
  slug: string;
  n: number;
  titulo: string;
  bloque: Bloque;
  /** La frase central: se ve en el índice y en la vista previa para compartir. */
  frase: string;
  resumen: string;
  textos: string;
  lectura: string;
  fecha?: string;
  /** Solo si la frase lleva cursiva con hilo (requiere calcular la unión con la primera letra). */
  fraseCorta?: string;
  fraseScript?: string;
  pintura?: string;
  pinturaAlt?: string;
  pinturaCita?: string;
  historia?: string;
};

export type Proxima = {
  n: number;
  titulo: string;
  textos: string;
  idea: string;
  antesDeAlma: string;
};

export const BLOQUES: { id: Bloque; nombre: string; etiqueta: string }[] = [
  { id: 'jesus', nombre: 'JESÚS', etiqueta: 'BLOQUE · JESÚS' },
  { id: 'pecado', nombre: 'PECADO', etiqueta: 'BLOQUE · PECADO' },
  { id: 'otras', nombre: 'OTRAS', etiqueta: 'CHARLA APARTE' },
  { id: 'dios', nombre: 'QUIÉN ES DIOS', etiqueta: 'BLOQUE · QUIÉN ES DIOS' },
  { id: 'inicio', nombre: 'INICIO', etiqueta: 'LOS PRIMEROS DOMINGOS' },
];

/** La charla que viene: su Antes de Alma es el único que se publica. */
export const PROXIMA: Proxima = {
  n: 15,
  titulo: 'Os conviene que me vaya',
  textos: 'Juan 14:15-27 · Juan 16:5-15',
  idea: 'La última cena. Jesús les dice a sus amigos que se va, y que eso es bueno para ellos. ¿Quién es el que viene cuando Él se vaya? ¿Y qué podría ser mejor que tenerlo al lado en persona?',
  antesDeAlma: '/antes-de-alma/charla-15.pdf',
};

export const CHARLAS: Charla[] = [
  {
    slug: 'en-el-nombre',
    n: 14,
    titulo: 'En el nombre',
    bloque: 'jesus',
    frase: 'El nombre no es una contraseña. Es conocer a la persona.',
    fraseCorta: 'El nombre no es una contraseña.',
    fraseScript: 'es conocer a la persona',
    resumen:
      'Si Jesús está vivo pero ya no está aquí, ¿cómo sigue actuando? Pedro, un cojo en la puerta del templo y una frase que casi todos hemos dicho sin pensar mucho en ella.',
    textos: 'Hechos 3 · 4 · 19',
    lectura: '5 min de lectura',
    pintura: '/charlas/en-el-nombre.webp',
    pinturaAlt: 'Pintura: una mano que toma de la mano a un hombre sentado en las gradas del templo, dibujado a lápiz, para levantarlo',
    pinturaCita: 'Hechos 3:7',
    historia: '/charlas/en-el-nombre-historia.jpg',
  },
  {
    slug: 'paz-y-salvo',
    n: 13,
    titulo: 'Paz y salvo',
    bloque: 'jesus',
    frase: 'El viernes fue el pago. El domingo, el paz y salvo.',
    resumen: 'La cruz fue el pago; la resurrección, el paz y salvo. Una tumba vacía, una muerte que llegó a cobrar sin encontrar deuda, y cómo sabemos que de verdad pasó.',
    textos: 'Mateo 28 · 1 Corintios 15',
    lectura: '5 min de lectura',
  },
  {
    slug: 'consumado-es',
    n: 12,
    titulo: 'Consumado es',
    bloque: 'jesus',
    frase: 'La cruz no es el precio para empezar a amarte. Es la prueba de que ya te amaba.',
    resumen: 'Si Jesús podía perdonar con una sola frase, ¿por qué tuvo que ir a la cruz? Tres razones que se juntan en una palabra: tetélestai.',
    textos: 'Juan 19 · Romanos 3 · Marcos 15',
    lectura: '5 min de lectura',
  },
  {
    slug: 'quien-es-este',
    n: 11,
    titulo: '¿Quién es este?',
    bloque: 'jesus',
    frase: 'Si alguien te choca el carro, ¿quién puede perdonarlo?',
    resumen: 'Cuatro amigos rompen un techo para llevar a uno que no puede caminar, y Jesús le dice algo que solo Dios tiene derecho a decir.',
    textos: 'Marcos 2 · Mateo 16',
    lectura: '5 min de lectura',
  },
  {
    slug: 'la-otra-fogata',
    n: 10,
    titulo: 'La otra fogata',
    bloque: 'pecado',
    frase: 'Lo llevó de vuelta a la fogata. No para cobrarle. Para darle desayuno.',
    resumen: '¿Quién repara la relación que el pecado rompe, y cómo? ¿Dios me está cobrando lo que me pasa? Y una fogata en la playa donde Jesús espera a Pedro.',
    textos: '2 Samuel 12 · Isaías 53 · Juan 21',
    lectura: '6 min de lectura',
  },
  {
    slug: 'errar-el-blanco',
    n: 9,
    titulo: 'Errar el blanco',
    bloque: 'pecado',
    frase: 'Errar el tiro le pasa a todos. Hasta al mejor tirador.',
    resumen: 'Antes de ser una palabra religiosa, pecar era fallar el tiro. El mejor tirador de Israel y el tiro más importante de su vida.',
    textos: '2 Samuel 11–12 · Salmo 51',
    lectura: '5 min de lectura',
  },
  {
    slug: 'lo-que-no-te-toca-cargar',
    n: 8,
    titulo: 'Lo que no te toca cargar',
    bloque: 'otras',
    frase: 'Soltar no es fingir que no pesa. Es admitir: esto no lo puedo cargar yo.',
    resumen: 'Sobre la ansiedad, sin maquillaje: soltar es humildad y no debilidad, no estás solo en esto, y es Dios mismo quien repara lo que está roto.',
    textos: '1 Pedro 5:6-11',
    lectura: '3 min de lectura',
  },
  {
    slug: 'dios-santo',
    n: 7,
    titulo: 'Dios santo',
    bloque: 'dios',
    frase: 'Su santidad no te aleja. Viene hacia ti.',
    resumen: '¿Cómo puede Dios ser apartado y cercano a la vez? Un profeta que dice “soy muerto” y un carbón del altar que vuela hacia él.',
    textos: 'Isaías 6 · 1 Pedro 1',
    lectura: '5 min de lectura',
  },
  {
    slug: 'dios-trino',
    n: 6,
    titulo: 'Dios trino',
    bloque: 'dios',
    frase: 'Antes de que existiera el mundo, ya había amor.',
    resumen: 'Un solo Dios que es relación desde antes del tiempo. Y nos hizo a esa imagen: no fuimos diseñados para sostenernos solos.',
    textos: 'Mateo 3 · Juan 1 · Juan 10',
    lectura: '4 min de lectura',
  },
  {
    slug: 'dios-fiel',
    n: 5,
    titulo: 'Dios fiel',
    bloque: 'dios',
    frase: 'Nuevas cada mañana. No arrastran lo de ayer.',
    resumen: 'Un texto escrito en medio de la ruina dice que sus misericordias son nuevas cada mañana. Su fidelidad no sube ni baja según cómo te fue esta semana.',
    textos: 'Lamentaciones 3 · 2 Timoteo 2 · Juan 17',
    lectura: '3 min de lectura',
  },
  {
    slug: 'dios-padre-cercano',
    n: 4,
    titulo: 'Dios Padre cercano',
    bloque: 'dios',
    frase: 'Hay un padre que corre. Y no espera a que termines el discurso.',
    resumen: 'La mayoría imagina a Dios en la puerta, de brazos cruzados, esperando el discurso completo. Jesús contó la historia de un padre que sale corriendo.',
    textos: 'Lucas 15 · Mateo 1 · Romanos 8',
    lectura: '4 min de lectura',
  },
  {
    slug: 'entre-los-arboles',
    n: 3,
    titulo: 'Entre los árboles',
    bloque: 'inicio',
    frase: 'Ya no te escondas. Ya te encontraron.',
    resumen: 'La crisis de identidad no es una crisis de valor: es de memoria. El escondite entre los árboles, las hojas de higuera y el Dios que sale a buscarnos.',
    textos: 'Génesis 1 · Génesis 3 · 2 Corintios 5',
    lectura: '5 min de lectura',
  },
  {
    slug: 'el-parecido-de-familia',
    n: 2,
    titulo: 'El parecido de familia',
    bloque: 'inicio',
    frase: 'La aprobación llegó antes del primer milagro.',
    resumen: 'Antes de cualquier milagro, una voz dijo “este es mi Hijo amado”. Ser hijo de Dios no se gana: se nota en cómo tratas a la gente.',
    textos: 'Mateo 3 · Mateo 5',
    lectura: '4 min de lectura',
  },
  {
    slug: 'alma',
    n: 1,
    titulo: 'Alma',
    bloque: 'inicio',
    frase: 'Lo bueno no significa lo terminado.',
    resumen: 'Por qué esto se llama Alma: polvo sostenido por el aliento de Dios, y un Dios que se detiene a mirar lo que hizo, no para dudar sino para deleitarse.',
    textos: 'Génesis 1 · Génesis 2',
    lectura: '4 min de lectura',
  },
];

export const ogDe = (slug: string) => `/charlas/${slug}-og.jpg`;
export const charlaPorSlug = (slug: string) => CHARLAS.find((c) => c.slug === slug);
export const ultima = () => [...CHARLAS].sort((a, b) => b.n - a.n)[0];
