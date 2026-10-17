/** Faint line-drawn branch used as a nature accent behind content. Decorative only. */
export function Foliage({ className = "" }: { className?: string }) {
  const leaves = [
    { x: 60, y: 300, r: -50 },
    { x: 95, y: 245, r: 20 },
    { x: 120, y: 190, r: -40 },
    { x: 150, y: 140, r: 30 },
    { x: 168, y: 92, r: -30 },
  ];
  return (
    <svg aria-hidden viewBox="0 0 260 380" fill="none" className={`pointer-events-none ${className}`}>
      <path d="M30 380 C 70 300, 120 200, 200 40" stroke="currentColor" strokeWidth="1.2" />
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}>
          <path d="M0 0 C 18 -26, 62 -26, 84 0 C 62 26, 18 26, 0 0 Z" stroke="currentColor" strokeWidth="1.2" />
          <path d="M4 0 H 78" stroke="currentColor" strokeWidth="0.8" />
        </g>
      ))}
    </svg>
  );
}
