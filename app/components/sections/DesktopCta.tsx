import { useTranslations } from 'next-intl'
import Reveal from '../reactbits/Reveal'
import {
  DOWNLOAD_LINUX_URL,
  DOWNLOAD_WINDOWS_URL,
  GITHUB_URL
} from './constants'
import { LinuxIcon, WindowsIcon } from './icons'

export default function DesktopCta(): React.JSX.Element {
  const t = useTranslations('desktopCta')
  return (
    <section
      id="desktop"
      className="border-t border-[color:var(--color-line)] bg-[color:var(--color-surface)]"
    >
      <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <Reveal>
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
        </Reveal>
      </div>
    </section>
  )
}
