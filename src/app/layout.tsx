import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#D90429',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://chicimportusa.com'),
  title: {
    default: 'ChicImportUSA | Tenis importados desde Estados Unidos',
    template: '%s | ChicImportUSA',
  },
  description: 'Publicaciones periódicas de tenis deportivos y casuales importados desde Estados Unidos. Productos seleccionados, proceso claro y gestión directa por WhatsApp.',
  keywords: ['tenis importados', 'tenis USA', 'tenis deportivos', 'tenis casuales', 'importaciones Colombia', 'ChicImportUSA'],
  authors: [{ name: 'ChicImportUSA' }],
  creator: 'ChicImportUSA',
  publisher: 'ChicImportUSA',
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
    canonical: 'https://chicimportusa.com',
  },
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: 'https://chicimportusa.com',
    siteName: 'ChicImportUSA',
    title: 'ChicImportUSA | Tenis importados desde Estados Unidos',
    description: 'Publicaciones periódicas de tenis deportivos y casuales importados desde Estados Unidos. Productos seleccionados, proceso claro y gestión directa por WhatsApp.',
    images: [
      {
        url: 'https://chicimportusa.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ChicImportUSA - Tenis importados desde Estados Unidos',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChicImportUSA | Tenis importados desde Estados Unidos',
    description: 'Publicaciones periódicas de tenis deportivos y casuales importados desde Estados Unidos.',
    images: ['https://chicimportusa.com/og-image.jpg'],
    creator: '@chicimportusa',
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
