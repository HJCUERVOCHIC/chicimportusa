import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Space_Grotesk } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import AnalyticsScripts from '@/components/Analytics'

// -----------------------------------------------------------
// Fuentes — Etapa 3: Streetwear/Urban
// -----------------------------------------------------------

/** Display: Bebas Neue — títulos impactantes */
const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-display',
  display: 'swap',
  preload: true,
})

/** Body: Space Grotesk — cuerpo moderno y legible */
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
  preload: true,
})

const BASE_URL = 'https://chicimportusa.com'

export const viewport: Viewport = {
  themeColor: '#D90429',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'ChicImportUSA | Moda original desde USA',
    template: '%s | ChicImportUSA',
  },
  description: 'Publicaciones periódicas de tenis, ropa y accesorios importados desde Estados Unidos. Productos seleccionados de marcas reconocidas. Envíos a toda Colombia.',
  keywords: [
    'tenis importados',
    'ropa importada USA',
    'accesorios USA',
    'sneakers Colombia',
    'ropa deportiva',
    'ropa casual importada',
    'Nike',
    'Jordan',
    'New Balance',
    'moda streetwear',
    'importación Colombia',
  ],
  authors: [{ name: 'ChicImportUSA' }],
  creator: 'ChicImportUSA',
  publisher: 'ChicImportUSA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'ChicImportUSA | Tenis, ropa y accesorios desde USA',
    description: 'Publicaciones periódicas de tenis, ropa casual, deportiva y accesorios importados desde Estados Unidos. Gestión directa por WhatsApp.',
    url: BASE_URL,
    siteName: 'ChicImportUSA',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ChicImportUSA - Tenis, ropa y accesorios desde USA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChicImportUSA | Moda original desde USA',
    description: 'Publicaciones periódicas de tenis, ropa y accesorios importados desde Estados Unidos.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
}

// -----------------------------------------------------------
// Etapa 6 — JSON-LD: datos estructurados del negocio
// Tipo OnlineStore: negocio 100% virtual, sin dirección física.
// -----------------------------------------------------------
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'OnlineStore',
  name: 'ChicImportUSA',
  url: BASE_URL,
  description:
    "Importadora de moda y productos desde USA. Sneakers, bolsos, perfumes, Victoria's Secret, vitaminas y accesorios. Vendemos exclusivamente por WhatsApp con envío a toda Colombia.",
  areaServed: {
    '@type': 'Country',
    name: 'Colombia',
  },
  availableLanguage: {
    '@type': 'Language',
    name: 'Spanish',
    alternateName: 'es',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    url: 'https://wa.me/573150619888', // ← reemplaza con el número real desde constants.ts
    availableLanguage: 'Spanish',
  },
  sameAs: [
    'https://www.instagram.com/chic_importusa/',
    'https://www.tiktok.com/@chicimportusa',
  ],
  currenciesAccepted: 'COP',
  paymentAccepted: 'Transferencia bancaria, Nequi, Daviplata',
  priceRange: '$$',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${spaceGrotesk.variable}`}>
      <head>
        {/* ── Etapa 6: JSON-LD structured data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased bg-bg text-text">
        <Header />
        <main>{children}</main>
        <Footer />
        {/* ── Etapa 5: Analytics — GA4 + Microsoft Clarity ── */}
        <Suspense fallback={null}>
          <AnalyticsScripts />
        </Suspense>
      </body>
    </html>
  )
}
