import type { Metadata, Viewport } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'MyHeic — Konversi HEIC ke JPG, gratis & offline',
  description:
    'Aplikasi desktop ringan untuk mengubah file HEIC dari HP Samsung & iPhone menjadi JPG. Gratis selamanya, jalan offline, tanpa batas konversi.',
  metadataBase: new URL('https://myheic.app'),
  openGraph: {
    title: 'MyHeic — Konversi HEIC ke JPG',
    description: 'Gratis, offline, tanpa batas konversi. Dibuat untuk Indonesia.',
    type: 'website',
    locale: 'id_ID'
  }
}

export const viewport: Viewport = {
  themeColor: '#0f172a'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>): React.JSX.Element {
  return (
    <html lang="id" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full bg-slate-950 text-slate-100">{children}</body>
    </html>
  )
}
