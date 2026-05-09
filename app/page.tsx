import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Converter from './components/Converter'
import LangToggle from './components/LangToggle'
import ThemeToggle from './components/ThemeToggle'

const DOWNLOAD_URL =
  'https://github.com/ravi-arnan/myheic/releases/latest/download/MyHeic-Setup.exe'
const DONATE_URL = 'https://saweria.co/raviarnan'
const GITHUB_URL = 'https://github.com/ravi-arnan/myheic'

export default function Home(): React.JSX.Element {
  return (
    <div className="flex min-h-screen flex-col bg-[color:var(--color-surface)]">
      <Header />
      <Hero />
      <Features />
      <DesktopCta />
      <Faq />
      <Footer />
    </div>
  )
}

function Header(): React.JSX.Element {
  const t = useTranslations('header')
  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--color-line)] bg-[color:var(--color-surface)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-[color:var(--color-brand)] text-base font-bold text-white">
            M
          </div>
          <span className="text-lg font-bold tracking-tight text-[color:var(--color-ink)]">
            MyHeic
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-[color:var(--color-ink-muted)] sm:flex">
          <a
            href="#desktop"
            className="transition-colors hover:text-[color:var(--color-ink)]"
          >
            {t('desktopApp')}
          </a>
          <a href="#faq" className="transition-colors hover:text-[color:var(--color-ink)]">
            {t('faq')}
          </a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LangToggle />
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[color:var(--color-ink)] shadow-[var(--shadow-whisper)] transition-colors hover:border-[color:var(--color-ink-soft)] sm:inline-flex"
          >
            {t('donate')}
          </a>
        </div>
      </div>
    </header>
  )
}

function Hero(): React.JSX.Element {
  const t = useTranslations('hero')
  return (
    <section className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-50"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(113,50,245,0.08) 0%, transparent 70%)'
        }}
      />
      <div className="mx-auto flex max-w-5xl flex-col items-center px-6 pt-12 pb-16 text-center sm:pt-16 sm:pb-20">
        <span className="mb-4 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-3 py-1 text-xs font-medium text-[color:var(--color-ink-muted)] shadow-[var(--shadow-whisper)]">
          {t('eyebrow')}
        </span>
        <h1 className="max-w-3xl text-balance text-3xl font-bold leading-[1.17] tracking-[-0.5px] text-[color:var(--color-ink)] sm:text-4xl md:text-5xl md:tracking-[-1px]">
          {t('titleMain')}{' '}
          <span className="whitespace-nowrap text-[color:var(--color-brand)]">
            {t('titleAccent')}
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

function Features(): React.JSX.Element {
  const t = useTranslations('features')
  const keys = ['noLogin', 'free', 'offline', 'metadata', 'simple'] as const
  return (
    <section
      id="features"
      className="border-t border-[color:var(--color-line)] bg-[color:var(--color-surface-soft)]"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-[-0.5px] text-[color:var(--color-ink)] sm:text-4xl">
            {t('title')}
          </h2>
          <p className="mt-3 text-[color:var(--color-ink-muted)]">{t('subtitle')}</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {keys.map((key) => (
            <div
              key={key}
              className="rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-6 shadow-[var(--shadow-whisper)]"
            >
              <h3 className="text-lg font-semibold text-[color:var(--color-ink)]">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-ink-muted)]">
                {t(`items.${key}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function DesktopCta(): React.JSX.Element {
  const t = useTranslations('desktopCta')
  return (
    <section
      id="desktop"
      className="border-t border-[color:var(--color-line)] bg-[color:var(--color-surface)]"
    >
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <div className="rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-surface-soft)] p-6 sm:p-10">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[color:var(--color-brand-subtle)] px-3 py-1 text-xs font-medium text-[color:var(--color-brand)]">
                {t('badge')}
              </div>
              <h3 className="text-2xl font-bold tracking-[-0.5px] text-[color:var(--color-ink)] sm:text-3xl">
                {t('title')}
              </h3>
              <p className="mt-2 text-sm text-[color:var(--color-ink-muted)] sm:text-base">
                {t('description')}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:items-end">
              <a
                href={DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl bg-[color:var(--color-brand)] px-4 py-3 text-sm font-semibold text-white shadow-[var(--shadow-cta)] transition-colors hover:bg-[color:var(--color-brand-dark)]"
              >
                <DownloadIcon />
                {t('downloadCta')}
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[color:var(--color-ink-soft)] transition-colors hover:text-[color:var(--color-ink-muted)]"
              >
                {t('githubCta')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface FaqItem {
  q: string
  a: string
}

function Faq(): React.JSX.Element {
  const t = useTranslations('faq')
  const items = t.raw('items') as FaqItem[]
  return (
    <section
      id="faq"
      className="border-t border-[color:var(--color-line)] bg-[color:var(--color-surface-soft)]"
    >
      <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-[-0.5px] text-[color:var(--color-ink)] sm:text-4xl">
            {t('title')}
          </h2>
        </div>
        <div className="space-y-3">
          {items.map((item, idx) => (
            <details
              key={idx}
              className="group rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-5 shadow-[var(--shadow-whisper)] open:border-[color:var(--color-brand-subtle)]"
            >
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
          ))}
        </div>
      </div>
    </section>
  )
}

function Footer(): React.JSX.Element {
  const t = useTranslations('footer')
  return (
    <footer className="mt-auto border-t border-[color:var(--color-line)] bg-[color:var(--color-surface)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-[color:var(--color-ink-soft)] sm:flex-row">
        <div>{t('copyright', { year: new Date().getFullYear() })}</div>
        <div className="flex items-center gap-5">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[color:var(--color-ink)]"
          >
            {t('github')}
          </a>
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-[color:var(--color-ink)]"
          >
            {t('donate')}
          </a>
        </div>
      </div>
    </footer>
  )
}

function DownloadIcon(): React.JSX.Element {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}
