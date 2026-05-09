'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ComponentProps } from 'react'

export default function ThemeProvider({
  children,
  ...rest
}: ComponentProps<typeof NextThemesProvider>): React.JSX.Element {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...rest}
    >
      {children}
    </NextThemesProvider>
  )
}
