interface LogoProps {
  size?: number
  variant?: 'a' | 'b' | 'c'
  className?: string
}

/**
 * Three logo direction sketches for MyHeic. Each renders as a self-contained
 * SVG mark — color, gradient, and typography are inline so the same component
 * works at 16px favicon size and at 1024px export size.
 */
export default function Logo({
  size = 48,
  variant = 'a',
  className
}: LogoProps): React.JSX.Element {
  if (variant === 'b') return <LensM size={size} className={className} />
  if (variant === 'c') return <StackM size={size} className={className} />
  return <ShutterM size={size} className={className} />
}

/* -------------------------------------------------------------------------- */
/* A — ShutterM                                                                */
/* Custom geometric M with a soft photo aperture circle in the V dip.         */
/* -------------------------------------------------------------------------- */
function ShutterM({
  size,
  className
}: {
  size: number
  className?: string
}): React.JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MyHeic"
    >
      <defs>
        <linearGradient id="myheic-a-bg" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0" stopColor="#7c3aed" />
          <stop offset="1" stopColor="#4c1d95" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="14" fill="url(#myheic-a-bg)" />
      <path
        d="M14 50 L14 14 L23 14 L32 30 L41 14 L50 14 L50 50 L42 50 L42 26 L34 38 L30 38 L22 26 L22 50 Z"
        fill="#ffffff"
      />
      <circle cx="32" cy="44" r="3" fill="#ffffff" fillOpacity="0.65" />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/* B — LensM                                                                   */
/* Bold M whose V notch is shaped like a camera lens; outer ring suggests     */
/* an aperture. Reads as "photo + M" at a glance.                              */
/* -------------------------------------------------------------------------- */
function LensM({
  size,
  className
}: {
  size: number
  className?: string
}): React.JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MyHeic"
    >
      <defs>
        <linearGradient id="myheic-b-bg" x1="0" y1="0" x2="64" y2="64">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#5b21b6" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#myheic-b-bg)" />
      {/* Outer aperture ring */}
      <circle
        cx="32"
        cy="32"
        r="22"
        fill="none"
        stroke="#ffffff"
        strokeOpacity="0.18"
        strokeWidth="1.5"
      />
      {/* Two M legs */}
      <path
        d="M14 48 L14 16 L22 16 L22 48 Z M42 48 L42 16 L50 16 L50 48 Z"
        fill="#ffffff"
      />
      {/* V notch */}
      <path d="M22 16 L32 36 L42 16 L36 16 L32 24 L28 16 Z" fill="#ffffff" />
      {/* Lens dot */}
      <circle cx="32" cy="42" r="4" fill="#ffffff" />
      <circle cx="32" cy="42" r="2" fill="url(#myheic-b-bg)" />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/* C — StackM                                                                  */
/* Two offset rounded squares (HEIC → JPG transformation). The top tile       */
/* carries the M; bottom tile is a soft echo. Conveys "format swap".          */
/* -------------------------------------------------------------------------- */
function StackM({
  size,
  className
}: {
  size: number
  className?: string
}): React.JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MyHeic"
    >
      <defs>
        <linearGradient id="myheic-c-top" x1="0" y1="0" x2="56" y2="56">
          <stop offset="0" stopColor="#7132f5" />
          <stop offset="1" stopColor="#4c1d95" />
        </linearGradient>
      </defs>
      {/* Bottom tile (echo) */}
      <rect
        x="14"
        y="14"
        width="44"
        height="44"
        rx="10"
        fill="#7132f5"
        fillOpacity="0.22"
      />
      {/* Top tile */}
      <rect x="6" y="6" width="44" height="44" rx="10" fill="url(#myheic-c-top)" />
      {/* Custom M */}
      <path
        d="M13 40 L13 16 L19 16 L25 26 L31 16 L37 16 L37 40 L31 40 L31 24 L27 30 L23 30 L19 24 L19 40 Z"
        fill="#ffffff"
      />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */
/* Wordmark — "myheic" tightly tracked. Currently a single style; pairs       */
/* with any of the three marks above.                                          */
/* -------------------------------------------------------------------------- */
export function Wordmark({
  className
}: {
  className?: string
}): React.JSX.Element {
  return (
    <span
      className={`text-[1.1rem] font-bold leading-none tracking-[-0.04em] ${className ?? ''}`}
    >
      myheic
      <span className="text-[color:var(--color-brand)]">.</span>
    </span>
  )
}
