import Link from 'next/link'
import { useTranslations } from 'next-intl'
import Converter from './components/Converter'
import LangToggle from './components/LangToggle'
import ThemeToggle from './components/ThemeToggle'

const DOWNLOAD_WINDOWS_URL =
  'https://github.com/ravi-arnan/myheic/releases/latest/download/MyHeic-Setup.exe'
const DOWNLOAD_LINUX_URL =
  'https://github.com/ravi-arnan/myheic/releases/latest/download/MyHeic-Linux-x86_64.AppImage'
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
          <a
            href={DONATE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-3 py-1.5 text-xs font-semibold text-[color:var(--color-ink)] shadow-[var(--shadow-whisper)] transition-colors hover:border-[color:var(--color-ink-soft)] sm:inline-flex"
          >
            {t('donate')}
          </a>
          <ThemeToggle />
          <LangToggle />
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
          <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex-1">
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
            <div className="flex w-full shrink-0 flex-col gap-2.5 sm:max-w-sm lg:w-auto">
              <a
                href={DOWNLOAD_WINDOWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 whitespace-nowrap rounded-xl bg-[color:var(--color-brand)] px-4 py-3 text-sm font-semibold text-white shadow-[var(--shadow-cta)] transition-colors hover:bg-[color:var(--color-brand-dark)]"
              >
                <WindowsIcon />
                <span className="flex flex-1 flex-col items-start leading-tight">
                  <span>{t('downloadWindows')}</span>
                  <span className="text-[10px] font-medium uppercase tracking-wide text-white/70">
                    {t('downloadWindowsHint')}
                  </span>
                </span>
              </a>
              <a
                href={DOWNLOAD_LINUX_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 whitespace-nowrap rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-4 py-3 text-sm font-semibold text-[color:var(--color-ink)] transition-colors hover:border-[color:var(--color-brand)] hover:text-[color:var(--color-brand)]"
              >
                <LinuxIcon />
                <span className="flex flex-1 flex-col items-start leading-tight">
                  <span>{t('downloadLinux')}</span>
                  <span className="text-[10px] font-medium uppercase tracking-wide text-[color:var(--color-ink-soft)]">
                    {t('downloadLinuxHint')}
                  </span>
                </span>
              </a>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 text-center text-xs text-[color:var(--color-ink-soft)] transition-colors hover:text-[color:var(--color-ink-muted)] lg:text-right"
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

function WindowsIcon(): React.JSX.Element {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M3 5.5L10.5 4.5V11.5H3V5.5ZM3 12.5H10.5V19.5L3 18.5V12.5ZM11.5 4.4L21 3V11.5H11.5V4.4ZM11.5 12.5H21V21L11.5 19.6V12.5Z" />
    </svg>
  )
}

function LinuxIcon(): React.JSX.Element {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12.504.75c-1.21 0-2.41.345-3.297 1.207-.886.86-1.331 2.07-1.331 3.482 0 .516.06 1.028.176 1.529-.39.392-.772.886-1.077 1.45-.594 1.099-1 2.448-1 3.832 0 .9-.156 1.715-.395 2.491-.24.776-.563 1.514-.954 2.244-.39.731-.85 1.444-1.353 2.169a.75.75 0 0 0 .197 1.043c.732.5 1.59.97 2.553 1.299.964.328 2.04.499 3.21.499 1.171 0 2.247-.171 3.21-.5.964-.328 1.822-.798 2.554-1.298a.75.75 0 0 0 .197-1.043c-.504-.725-.964-1.438-1.354-2.17-.39-.729-.713-1.467-.953-2.243-.24-.776-.394-1.591-.394-2.491 0-1.384-.407-2.733-1-3.832-.306-.564-.688-1.058-1.078-1.45.116-.501.176-1.013.176-1.529 0-1.412-.445-2.621-1.331-3.482C14.913 1.095 13.713.75 12.504.75z M9.5 7.5a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm5 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM10 13c.5.5 1.2.8 2 .8s1.5-.3 2-.8" />
    </svg>
  )
}
