import { useTranslations } from 'next-intl'
import Reveal from '../reactbits/Reveal'
import { DownloadGlyph, DropIcon, SparkIcon } from './icons'

interface Step {
  title: string
  description: string
}

const STEP_ICONS = [DropIcon, SparkIcon, DownloadGlyph]

export default function HowItWorks(): React.JSX.Element {
  const t = useTranslations('howItWorks')
  const steps = t.raw('steps') as Step[]
  return (
    <section className="border-t border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <Reveal>
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-brand)]">
              {t('eyebrow')}
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-[-0.5px] text-[color:var(--color-ink)] sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-3 text-balance text-[color:var(--color-ink-muted)]">
              {t('subtitle')}
            </p>
          </div>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, idx) => {
            const Icon = STEP_ICONS[idx] ?? DropIcon
            return (
              <Reveal key={idx} delay={idx * 0.1}>
                <div className="relative h-full rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-6 shadow-[var(--shadow-whisper)] sm:p-7">
                  <div className="mb-5 flex items-center justify-between">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-[color:var(--color-brand-subtle)] text-[color:var(--color-brand)]">
                      <Icon />
                    </div>
                    <span className="text-xs font-semibold tabular-nums text-[color:var(--color-ink-soft)]">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-[color:var(--color-ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                    {step.description}
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
