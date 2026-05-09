import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Sans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages, getTranslations } from 'next-intl/server'
import './globals.css'

const plex = IBM_Plex_Sans({
  variable: '--font-plex',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export async function generateMetadata(): Promise<Metadata> {
  const [t, locale] = await Promise.all([getTranslations('metadata'), getLocale()])
  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://myheic.vercel.app'),
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'id_ID'
    }
  }
}

export const viewport: Viewport = {
  themeColor: '#ffffff'
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>): Promise<React.JSX.Element> {
  const locale = await getLocale()
  const messages = await getMessages()
  return (
    <html lang={locale} className={`${plex.variable} h-full antialiased`}>
      <body className="min-h-full bg-white text-[color:var(--color-ink)]">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  )
}
