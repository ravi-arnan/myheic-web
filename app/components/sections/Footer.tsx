import { useTranslations } from 'next-intl'
import { DONATE_URL, GITHUB_URL } from './constants'

export default function Footer(): React.JSX.Element {
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
