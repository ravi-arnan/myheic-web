import { useTranslations } from 'next-intl'
import Reveal from '../reactbits/Reveal'

export default function WhyThisExists(): React.JSX.Element {
  const t = useTranslations('whyThisExists')
  return (
    <section className="border-t border-[color:var(--color-line)] bg-[color:var(--color-surface-soft)]">
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <Reveal>
          <div className="text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[color:var(--color-brand)]">
              {t('eyebrow')}
            </p>
            <h2 className="text-balance text-2xl font-bold tracking-[-0.5px] text-[color:var(--color-ink)] sm:text-3xl md:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-6 text-balance text-base leading-relaxed text-[color:var(--color-ink-muted)] sm:text-lg">
              {t('body')}
            </p>
            <p className="mt-6 text-sm font-medium text-[color:var(--color-ink-soft)]">
              {t('attribution')}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
