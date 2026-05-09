'use client'

import { useTheme } from 'next-themes'
import { useTranslations } from 'next-intl'
import dynamic from 'next/dynamic'
import Converter from '../Converter'
import BlurText from '../reactbits/BlurText'
import GradientText from '../reactbits/GradientText'
import Magnet from '../reactbits/Magnet'

const Aurora = dynamic(() => import('../reactbits/Aurora'), {
  ssr: false,
  loading: () => null
})

// Soft pastel lavender/lilac for light-mode surface so the Aurora reads as
// atmospheric tint, not as a saturated overlay. Deep brand purples for dark
// mode where the underlying surface absorbs them.
const AURORA_LIGHT = ['#e9d5ff', '#fbcfe8', '#c4b5fd']
const AURORA_DARK = ['#7132f5', '#a78bfa', '#5b1ecf']

export default function Hero(): React.JSX.Element {
  const t = useTranslations('hero')
  const { resolvedTheme } = useTheme()
  const colors = resolvedTheme === 'dark' ? AURORA_DARK : AURORA_LIGHT
  return (
    <section className="relative isolate overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[640px] opacity-60 dark:opacity-65">
        <Aurora colorStops={colors} amplitude={1.0} blend={0.55} speed={0.5} />
      </div>
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-80px)] max-w-5xl flex-col items-center justify-center px-6 py-12 text-center sm:py-16">
        <Magnet magnetStrength={6} padding={60}>
          <span className="mb-4 inline-flex rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-3 py-1 text-xs font-medium text-[color:var(--color-ink-muted)] shadow-[var(--shadow-whisper)]">
            {t('eyebrow')}
          </span>
        </Magnet>
        <h1 className="max-w-3xl text-balance text-3xl font-bold leading-[1.1] tracking-[-0.5px] text-[color:var(--color-ink)] sm:text-4xl md:text-5xl md:tracking-[-1px]">
          <span className="block">
            <BlurText
              text={t('titleMain')}
              animateBy="words"
              delay={60}
              duration={0.55}
            />
          </span>
          <span className="mt-1 block">
            <GradientText
              colors={['#7132f5', '#a78bfa', '#5b1ecf', '#7132f5']}
              animationSpeed={6}
              className="whitespace-nowrap"
            >
              {t('titleAccent')}
            </GradientText>
          </span>
        </h1>
        <p className="mt-4 max-w-xl text-balance text-base text-[color:var(--color-ink-muted)] sm:text-lg">
          {t('subtitle')}
        </p>

        <div className="mt-8 w-full">
          <Converter />
        </div>
      </div>
    </section>
  )
}
