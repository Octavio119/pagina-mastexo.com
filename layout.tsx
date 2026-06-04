// ============================================
// MASTEXO — app/layout.tsx
// Configuración de fuentes Next.js
// ============================================

import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'

// Fuente para títulos
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
})

// Fuente para cuerpo
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mastexo Digital — Agencia Web LATAM',
  description: 'Sitios web, automatización, SEO y seguridad para pymes en Chile y LATAM. Primer cliente en 14 días.',
  keywords: 'agencia digital chile, automatización pymes, SEO LATAM, sitios web chile, marketing digital',
  authors: [{ name: 'Mastexo Digital' }],
  openGraph: {
    title: 'Mastexo Digital — Agencia Web LATAM',
    description: 'Sitios web, automatización, SEO y seguridad para pymes en Chile y LATAM.',
    url: 'https://mastexo.com',
    siteName: 'Mastexo Digital',
    locale: 'es_CL',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mastexo Digital — Agencia Web LATAM',
    description: 'Sitios web, automatización, SEO y seguridad para pymes en Chile y LATAM.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
