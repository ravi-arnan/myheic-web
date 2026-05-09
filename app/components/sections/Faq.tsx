import { useTranslations } from 'next-intl'
import Reveal from '../reactbits/Reveal'

interface FaqItem {
  q: string
  a: string
}

export default function Faq(): React.JSX.Element {
  const t = useTranslations('faq')
  const items = t.raw('items') as FaqItem[]
  return (
    <section
      id="faq"
      className="border-t border-[color:var(--color-line)] bg-[color:var(--color-surface-soft)]"
    >
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <Reveal>
          <div className="mb-10 text-center">
            <h2 className="text-balance text-3xl font-bold tracking-[-0.5px] text-[color:var(--color-ink)] sm:text-4xl">
              {t('title')}
            </h2>
          </div>
        </Reveal>
        <div className="space-y-3">
          {items.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.04}>
              <details className="group rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-5 shadow-[var(--shadow-whisper)] open:border-[color:var(--color-brand-subtle)]">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-[color:var(--color-ink)] sm:text-base">
                  <span>{item.q}</span>
                  <span className="text-[color:var(--color-ink-soft)] transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
