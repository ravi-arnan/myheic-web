import { useTranslations } from 'next-intl'

export default function PhoneMarquee(): React.JSX.Element {
  const t = useTranslations('phoneMarquee')
  const brands = t.raw('brands') as string[]
  const loop = [...brands, ...brands]

  return (
    <section className="border-t border-[color:var(--color-line)] bg-[color:var(--color-surface-soft)]">
      <div className="mx-auto max-w-6xl px-6 py-12 sm:py-14">
        <p className="mb-6 text-center text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-ink-soft)]">
          {t('label')}
        </p>
        <div
          className="relative overflow-hidden"
          style={{
            maskImage:
              'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <div
            className="myheic-marquee-track flex w-max items-center gap-12 whitespace-nowrap py-2"
            style={{ animation: 'myheic-marquee 38s linear infinite' }}
          >
            {loop.map((brand, idx) => (
              <div
                key={`${brand}-${idx}`}
                className="flex shrink-0 items-center gap-3 text-base font-semibold tracking-tight text-[color:var(--color-ink-muted)] sm:text-lg"
              >
                <PhoneGlyph />
                <span>{brand}</span>
                <span className="ml-2 h-1 w-1 rounded-full bg-[color:var(--color-line)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function PhoneGlyph(): React.JSX.Element {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="opacity-50"
    >
      <rect x="6" y="2" width="12" height="20" rx="3" />
      <line x1="11" y1="18" x2="13" y2="18" />
    </svg>
  )
}
