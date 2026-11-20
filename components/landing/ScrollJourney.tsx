'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/** Momentos del video (segundos) donde se detiene cada escena. */
const T = [0.04, 1.7, 3.2, 4.6, 6.2, 7.8];

const VIDEO_ESCRITORIO = '/media/alma-camino.mp4';
const VIDEO_MOVIL = '/media/alma-camino-movil.mp4';
const POSTER = '/media/alma-camino-poster.webp';

type Beat = {
  titulo: React.ReactNode;
  l1: string;
  l2: string;
  x2: number;
  vbw: number;
  hilo: string;
  texto?: string;
};

/** Escenas 1–5. Cada hilo entra exactamente donde arranca el trazo de la primera letra. */
const BEATS: Beat[] = [
  {
    titulo: <>TODOS LLEGAMOS<br />A MEDIO DIBUJAR</>,
    l1: 'y nadie te lo', l2: 'va a reprochar', x2: 70, vbw: 711,
    hilo: 'M-150 200 C -100 170 -90 40 -30 22 C 10 10 46 20 44 46 C 42.5 56 39 66 37.5 74',
  },
  {
    titulo: <>NO SOMOS UN LUGAR.<br />SOMOS PERSONAS</>,
    l1: 'aprendiendo a vivir', l2: 'desde la Gracia', x2: 110, vbw: 910,
    hilo: 'M-160 40 C -120 80 -70 0 -10 6 C 40 12 82 46 63.5 66 C 58 71 50 74 43.5 75',
    texto: 'Sin escenario, sin espectáculo. Conversaciones de verdad sobre Dios y sobre la vida, entre amigos.',
  },
  {
    titulo: <>¿CÓMO ES UN DOMINGO<br />EN ALMA?</>,
    l1: 'como una tarde', l2: 'entre amigos', x2: 70, vbw: 702,
    hilo: 'M-170 150 C -120 160 -90 20 -20 14 C 30 10 74 30 72 58 C 71 70 64 79 52.5 75',
    texto: 'Compartimos algo de comer, leemos un texto y lo conversamos sin prisa. Nadie tiene que hablar si no quiere. Nos vemos los domingos, aunque a veces cambia el día según la casa.',
  },
  {
    titulo: <>NUNCA ESTAMOS<br />TERMINADOS</>,
    l1: 'el artista', l2: 'sigue pintando', x2: 70, vbw: 728,
    hilo: 'M-170 200 C -130 190 -100 120 -50 104 C -20 95 8 92 20 88 C 25 86.5 30 83.5 34 81.5',
    texto: 'El aliento que nos hizo almas sigue obrando en cada uno, sin prisa. Y Alma tampoco está terminada: apenas estamos empezando. Si llegas ahora, lo que viene lo construimos contigo.',
  },
  {
    titulo: <>¿QUIERES VENIR?</>,
    l1: 'te guardamos', l2: 'un puesto', x2: 230, vbw: 651,
    hilo: 'M-170 30 C -120 0 -95 70 -55 54 C -25 42 -5 31 16 28.5',
    texto: 'No tienes que tener todo resuelto ni saber qué decir. Llega como estés: hay algo de comer, buena conversación y una silla que lleva rato esperándote.',
  },
];

const clamp01 = (x: number) => Math.max(0, Math.min(1, x));

/** Avance del scroll → segundo del video: se detiene en cada escena y viaja entre ellas. */
function tiempoDelVideo(p: number) {
  const n = T.length - 1;
  const pos = p * n;
  const i = Math.min(n - 1, Math.floor(pos));
  let t = pos - i;
  t = t < 0.3 ? 0 : t > 0.7 ? 1 : (t - 0.3) / 0.4;
  t = t * t * (3 - 2 * t);
  return T[i] + (T[i + 1] - T[i]) * t;
}

export default function ScrollJourney() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const target = useRef(0);
  const pending = useRef(false);
  const [p, setP] = useState(0);
  const [vh, setVh] = useState<number | null>(null);
  const [src, setSrc] = useState<string | null>(null);

  const aplicarTiempo = useCallback(() => {
    const v = videoRef.current;
    if (!v || v.readyState < 1) return;
    if (v.seeking) { pending.current = true; return; }
    const max = Number.isFinite(v.duration) ? v.duration - 0.05 : 7.8;
    const t = Math.max(0, Math.min(max, target.current));
    if (Math.abs(v.currentTime - t) > 0.02) {
      try { v.currentTime = t; } catch { /* algunos navegadores lo rechazan antes de cargar */ }
    }
  }, []);

  useEffect(() => {
    let raf = 0;
    const medir = () => {
      raf = 0;
      const alto = window.innerHeight;
      const ancho = window.innerWidth;
      setVh(alto);
      setSrc((s) => s ?? (ancho < 760 ? VIDEO_MOVIL : VIDEO_ESCRITORIO));
      const track = trackRef.current;
      let nuevo = 0;
      if (track) {
        const r = track.getBoundingClientRect();
        const total = r.height - alto;
        nuevo = total > 0 ? clamp01(-r.top / total) : 0;
      }
      target.current = tiempoDelVideo(nuevo);
      aplicarTiempo();
      setP(nuevo);
    };
    const pedir = () => { if (!raf) raf = requestAnimationFrame(medir); };
    medir();
    window.addEventListener('scroll', pedir, { passive: true });
    window.addEventListener('resize', pedir);
    return () => {
      window.removeEventListener('scroll', pedir);
      window.removeEventListener('resize', pedir);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [aplicarTiempo]);

  // Al cargar el video: lo "despertamos" (necesario en iPhone) y lo llevamos al punto actual.
  const onLoadedMetadata = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    const pr = v.play();
    if (pr && typeof pr.then === 'function') pr.then(() => { v.pause(); aplicarTiempo(); }).catch(aplicarTiempo);
    else { v.pause(); aplicarTiempo(); }
  };
  const onSeeked = () => { if (pending.current) { pending.current = false; aplicarTiempo(); } };

  const n = T.length - 1;
  const pos = p * n;
  const alto = vh ?? 900;
  const beat = (k: number) => {
    const d = Math.abs(pos - k);
    const o = clamp01((0.36 - d) / 0.12);
    return { opacity: o, transform: `translateY(${((pos - k) * -40).toFixed(1)}px)`, visibility: (o > 0.01 ? 'visible' : 'hidden') as 'visible' | 'hidden' };
  };
  const escritura = (k: number) => {
    const u = pos >= k ? 1 : clamp01((pos - (k - 0.36)) / 0.3);
    return { d: 1 - clamp01(u / 0.45), w1: clamp01((u - 0.38) / 0.36), w2: clamp01((u - 0.68) / 0.32) };
  };
  const hintO = clamp01(1 - (p - 0.05) * 14);

  return (
    <div className="journey" ref={trackRef} style={{ height: vh ? alto * 7 : '700vh' }}>
      <div className="journey-stage" style={{ height: vh ?? '100vh' }}>
        <div className="vbox" aria-hidden="true">
          <video
            ref={videoRef}
            src={src ?? undefined}
            poster={POSTER}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            onLoadedMetadata={onLoadedMetadata}
            onSeeked={onSeeked}
          />
          <div className="vfade" />
        </div>

        {/* Escena 0: el lema */}
        <div className="beat" style={beat(0)}>
          <div className="beat-inner" style={{ gap: 22 }}>
            <svg className="lockup-hero" role="img" aria-label="Ese aliento que no se detiene es lo que nos hace Alma" viewBox="0 0 900 420" style={{ width: '100%', maxWidth: 680, height: 'auto', overflow: 'visible' }}>
              <defs>
                <clipPath id="hero-wipe"><rect className="wipe" x="0" y="80" width="900" height="250" /></clipPath>
              </defs>
              <g className="w1">
                <text style={{ fontFamily: 'var(--lemon)' }} fontWeight={400} fontSize={56} fill="#1B1A19">
                  <tspan x="26" y="70">ESE ALIENTO</tspan>
                  <tspan x="26" y="134">QUE NO SE DETIENE</tspan>
                </text>
              </g>
              <path className="hilo" pathLength={1} d="M-90 470 C -20 440 -34 320 -14 258 C 0 218 20 199 40 197.5" fill="none" stroke="#9A6E22" strokeWidth={5.5} strokeLinecap="round" />
              <g clipPath="url(#hero-wipe)">
                <text x="40" y="228" style={{ fontFamily: 'var(--script)' }} fontSize={84} fill="#9A6E22">es lo que nos hace</text>
              </g>
              <g className="w2">
                <text x="26" y="396" style={{ fontFamily: 'var(--lemon)' }} fontWeight={700} fontSize={200} letterSpacing={4} fill="#1B1A19">ALMA</text>
              </g>
            </svg>
            <p className="lead rise-late" style={{ maxWidth: 500 }}>Espiritualidad con amigos en Madrid, Mosquera y Funza.</p>
          </div>
        </div>

        {/* Escenas 1–5 */}
        {BEATS.map((b, i) => {
          const k = i + 1;
          const e = escritura(k);
          return (
            <div className="beat" key={k} style={beat(k)}>
              <div className="beat-inner">
                <h2>{b.titulo}</h2>
                <svg className="hs" role="img" aria-label={`${b.l1} ${b.l2}`} viewBox={`0 0 ${b.vbw} 318`} style={{ width: `calc(var(--f) * ${b.vbw} / 84)` }}>
                  <defs>
                    <clipPath id={`hs${k}a`}><rect className="tw" style={{ transform: `scaleX(${e.w1})` }} x={-20} y={-40} width={b.vbw + 40} height={270} /></clipPath>
                    <clipPath id={`hs${k}b`}><rect className="tw" style={{ transform: `scaleX(${e.w2})` }} x={-20} y={150} width={b.vbw + 40} height={230} /></clipPath>
                  </defs>
                  <path className="th" pathLength={1} style={{ strokeDashoffset: e.d }} d={b.hilo} fill="none" stroke="#9A6E22" strokeWidth={5.4} strokeLinecap="round" />
                  <g clipPath={`url(#hs${k}a)`}><text x={40} y={110} style={{ fontFamily: 'var(--script)' }} fontSize={84} fill="#9A6E22">{b.l1}</text></g>
                  <g clipPath={`url(#hs${k}b)`}><text x={b.x2} y={238} style={{ fontFamily: 'var(--script)' }} fontSize={84} fill="#9A6E22">{b.l2}</text></g>
                </svg>
                {b.texto && <p className="lead">{b.texto}</p>}
              </div>
            </div>
          );
        })}

        <div className="hint" aria-hidden="true" style={{ opacity: hintO, visibility: p < 0.13 ? 'visible' : 'hidden' }}>
          <span className="mouse"><span className="wheel" /></span>
          <span>DESLIZA PARA AVANZAR</span>
          <span className="arrow">↓</span>
        </div>
        <div className="progress" aria-hidden="true" style={{ width: `${(p * 100).toFixed(2)}%` }} />
      </div>
    </div>
  );
}
