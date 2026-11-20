/**
 * Índice de charlas. Para publicar una charla nueva:
 * 1. Agrega su entrada aquí (publicada: true).
 * 2. Crea `content/charlas/<slug>.mdx` con el texto.
 * 3. Pon la pintura en `public/charlas/<slug>.webp`, la vista previa en `<slug>-og.jpg`,
 *    la historia de Instagram en `<slug>-historia.jpg` y el PDF en `public/antes-de-alma/charla-<n>.pdf`.
 */
export type Bloque = 'jesus' | 'pecado' | 'dios' | 'otras' | 'inicio';

export type Charla = {
  slug: string;
  n: number;
  titulo: string;
  bloque: Bloque;
  frase: string;
  publicada: boolean;
  /** Solo para las publicadas */
  resumen?: string;
  textos?: string;
  lectura?: string;
  fecha?: string;
  fraseCorta?: string;
  fraseScript?: string;
  pintura?: string;
  pinturaAlt?: string;
  pinturaCita?: string;
  og?: string;
  historia?: string;
  antesDeAlma?: string;
  proxima?: { cita: string; texto: string };
};

export const BLOQUES: { id: Bloque; nombre: string; etiqueta: string }[] = [
  { id: 'jesus', nombre: 'JESÚS', etiqueta: 'BLOQUE · JESÚS' },
  { id: 'pecado', nombre: 'PECADO', etiqueta: 'BLOQUE · PECADO' },
  { id: 'otras', nombre: 'OTRAS', etiqueta: 'CHARLA APARTE' },
  { id: 'dios', nombre: 'QUIÉN ES DIOS', etiqueta: 'BLOQUE · QUIÉN ES DIOS' },
  { id: 'inicio', nombre: 'INICIO', etiqueta: 'LOS PRIMEROS DOMINGOS' },
];

export const CHARLAS: Charla[] = [
  {
    slug: 'en-el-nombre',
    n: 14,
    titulo: 'En el nombre',
    bloque: 'jesus',
    frase: 'El nombre no es una contraseña. Es conocer a la persona.',
    fraseCorta: 'El nombre no es una contraseña.',
    fraseScript: 'es conocer a la persona',
    publicada: true,
    resumen:
      'Si Jesús está vivo pero ya no está aquí, ¿cómo sigue actuando? Pedro, un cojo en la puerta del templo y una frase que casi todos hemos dicho sin pensar mucho en ella.',
    textos: 'Hechos 3 · 4 · 19',
    lectura: '5 min de lectura',
    pintura: '/charlas/en-el-nombre.webp',
    pinturaAlt: 'Pintura: una mano que toma de la mano a un hombre sentado en las gradas del templo, dibujado a lápiz, para levantarlo',
    pinturaCita: 'Hechos 3:7',
    og: '/charlas/en-el-nombre-og.jpg',
    historia: '/charlas/en-el-nombre-historia.jpg',
    antesDeAlma: '/antes-de-alma/charla-14.pdf',
    proxima: { cita: '“Os conviene que yo me vaya.”', texto: '¿Cómo puede ser mejor que Jesús se vaya? Lo conversamos en la mesa.' },
  },
  { slug: 'paz-y-salvo', n: 13, titulo: 'Paz y salvo', bloque: 'jesus', frase: 'El viernes fue el pago. El domingo, el paz y salvo.', publicada: false },
  { slug: 'consumado-es', n: 12, titulo: 'Consumado es', bloque: 'jesus', frase: 'La cruz no es el precio para empezar a amarte. Es la prueba de que ya te amaba.', publicada: false },
  { slug: 'quien-es-este', n: 11, titulo: '¿Quién es este?', bloque: 'jesus', frase: 'Si alguien te choca el carro, ¿quién puede perdonarlo?', publicada: false },
  { slug: 'la-otra-fogata', n: 10, titulo: 'La otra fogata', bloque: 'pecado', frase: 'Lo llevó de vuelta a la fogata. No para cobrarle. Para darle desayuno.', publicada: false },
  { slug: 'la-honda', n: 9, titulo: 'La honda', bloque: 'pecado', frase: 'Errar el tiro le pasa a todos. Hasta al mejor tirador.', publicada: false },
  { slug: 'lo-que-no-te-toca-cargar', n: 8, titulo: 'Lo que no te toca cargar', bloque: 'otras', frase: 'Soltar no es fingir que no pesa. Es admitir: esto no lo puedo cargar yo.', publicada: false },
  { slug: 'dios-santo', n: 7, titulo: 'Dios santo', bloque: 'dios', frase: 'Su santidad no te aleja. Viene hacia ti.', publicada: false },
  { slug: 'dios-trino', n: 6, titulo: 'Dios trino', bloque: 'dios', frase: 'Antes de que existiera el mundo, ya había amor.', publicada: false },
  { slug: 'dios-fiel', n: 5, titulo: 'Dios fiel', bloque: 'dios', frase: 'Nuevas cada mañana. No arrastran lo de ayer.', publicada: false },
  { slug: 'dios-padre-cercano', n: 4, titulo: 'Dios Padre cercano', bloque: 'dios', frase: 'Hay un padre que corre. Y no espera a que termines el discurso.', publicada: false },
  { slug: 'el-rio', n: 2, titulo: 'El río', bloque: 'inicio', frase: 'La aprobación llegó antes del primer milagro.', publicada: false },
  { slug: 'alma', n: 1, titulo: 'Alma', bloque: 'inicio', frase: 'Lo bueno no significa lo terminado.', publicada: false },
];

export const publicadas = () => CHARLAS.filter((c) => c.publicada);
export const charlaPorSlug = (slug: string) => CHARLAS.find((c) => c.slug === slug && c.publicada);
export const ultima = () => publicadas().sort((a, b) => b.n - a.n)[0];
