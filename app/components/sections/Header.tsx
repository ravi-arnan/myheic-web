import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import LangToggle from '../LangToggle'
import ThemeToggle from '../ThemeToggle'
import { DONATE_URL } from './constants'

export default function Header(): React.JSX.Element {
  const t = useTranslations('header')
  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--color-line)] bg-[color:var(--color-surface)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/myheic_logo.png"
            alt=""
            width={40}
            height={40}
            priority
            className="h-9 w-9"
          />
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
