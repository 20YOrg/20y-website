import type { Metadata } from 'next'
import { Cormorant_Garamond, Inter } from 'next/font/google'
import './app.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--cormorant',
  display: 'optional',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--inter',
  display: 'optional',
})

export const metadata: Metadata = {
  title: '2ØY Fund',
  description: 'A twenty-year horizon in digital asset investment.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  )
}
