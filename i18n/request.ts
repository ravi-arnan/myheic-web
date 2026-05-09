import { cookies } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

export const SUPPORTED_LOCALES = ['id', 'en'] as const
export type Locale = (typeof SUPPORTED_LOCALES)[number]
export const DEFAULT_LOCALE: Locale = 'id'
export const LOCALE_COOKIE = 'NEXT_LOCALE'

function isLocale(value: string | undefined): value is Locale {
  return value === 'id' || value === 'en'
}

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const stored = cookieStore.get(LOCALE_COOKIE)?.value
  const locale: Locale = isLocale(stored) ? stored : DEFAULT_LOCALE
  const messages = (await import(`../messages/${locale}.json`)).default
  return { locale, messages }
})
