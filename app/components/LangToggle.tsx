'use client'

import { useLocale } from 'next-intl'
import { useTransition } from 'react'
import { setLocale } from '../actions/locale'
import type { Locale } from '@/i18n/request'

export default function LangToggle(): React.JSX.Element {
  const current = useLocale()
  const [isPending, startTransition] = useTransition()

  const choose = (locale: Locale): void => {
    if (locale === current || isPending) return
    startTransition(() => {
      void setLocale(locale)
    })
  }

  const options: Locale[] = ['id', 'en']
  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-xl border border-[color:var(--color-line)] bg-white p-0.5"
    >
      {options.map((opt) => {
        const isActive = current === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => choose(opt)}
            disabled={isPending}
            aria-pressed={isActive}
            className={`rounded-[10px] px-2.5 py-1 text-xs font-medium uppercase tracking-wide transition-colors disabled:opacity-60 ${
              isActive
                ? 'bg-[color:var(--color-brand-subtle)] text-[color:var(--color-brand)]'
                : 'text-[color:var(--color-ink-muted)] hover:text-[color:var(--color-ink)]'
            }`}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
