import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased bg-bg text-text">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
