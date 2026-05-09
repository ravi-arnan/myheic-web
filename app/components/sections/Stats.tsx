import { useTranslations } from 'next-intl'
import CountUp from '../reactbits/CountUp'
import Reveal from '../reactbits/Reveal'

interface StatItem {
  value: string
  suffix: string
  label: string
}

export default function Stats(): React.JSX.Element {
  const t = useTranslations('stats')
  const items = t.raw('items') as StatItem[]
  return (
    <section className="border-t border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <Reveal>
          <p className="mb-10 text-center text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-ink-soft)]">
            {t('eyebrow')}
          </p>
        </Reveal>
        <div className="grid gap-10 sm:grid-cols-3">
          {items.map((item, idx) => {
            const numericValue = Number(item.value)
            return (
              <Reveal key={idx} delay={idx * 0.08}>
                <div className="text-center">
                  <div className="text-5xl font-bold tracking-[-1px] text-[color:var(--color-ink)] sm:text-6xl md:text-7xl">
                    {Number.isFinite(numericValue) && numericValue > 0 ? (
                      <CountUp to={numericValue} duration={1.4} />
                    ) : (
                      <span>{item.value}</span>
                    )}
                    <span className="text-[color:var(--color-brand)]">{item.suffix}</span>
                  </div>
                  <p className="mt-3 text-sm text-[color:var(--color-ink-muted)] sm:text-base">
                    {item.label}
                  </p>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
