import { useTranslations } from 'next-intl'
import Reveal from '../reactbits/Reveal'

const KEYS = ['noLogin', 'free', 'offline', 'metadata', 'simple'] as const

export default function Features(): React.JSX.Element {
  const t = useTranslations('features')
  return (
    <section
      id="features"
      className="border-t border-[color:var(--color-line)] bg-[color:var(--color-surface-soft)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <Reveal>
          <div className="mb-12 text-center">
            <h2 className="text-balance text-3xl font-bold tracking-[-0.5px] text-[color:var(--color-ink)] sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-3 text-[color:var(--color-ink-muted)]">{t('subtitle')}</p>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {KEYS.map((key, idx) => (
            <Reveal key={key} delay={idx * 0.05}>
              <div className="h-full rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-6 shadow-[var(--shadow-whisper)]">
                <h3 className="text-lg font-semibold text-[color:var(--color-ink)]">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                  {t(`items.${key}.description`)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
