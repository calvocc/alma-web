type Linea = { texto: string; x: number; y: number };

type Props = {
  label: string;
  lineas: Linea[];
  hilo: string;
  ancho: number;
  alto: number;
  color?: string;
  className?: string;
  tamano?: string;
};

/** Frase en cursiva con el hilo que entra en el trazo de la primera letra. */
export default function Lockup({ label, lineas, hilo, ancho, alto, color = '#9A6E22', className = 'lockup', tamano }: Props) {
  return (
    <svg
      className={className}
      role="img"
      aria-label={label}
      viewBox={`0 0 ${ancho} ${alto}`}
      style={{ width: `calc(var(--f) * ${ancho} / 84)`, ...(tamano ? ({ '--f': tamano } as React.CSSProperties) : {}) }}
    >
      <path className="hilo-anim" pathLength={1} d={hilo} fill="none" stroke={color} strokeWidth={5.4} strokeLinecap="round" />
      <text style={{ fontFamily: 'var(--script)' }} fontSize={84} fill={color}>
        {lineas.map((l) => (
          <tspan key={l.texto} x={l.x} y={l.y}>{l.texto}</tspan>
        ))}
      </text>
    </svg>
  );
}
