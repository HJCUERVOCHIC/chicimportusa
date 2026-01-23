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
    default: 'Productos importados desde Estados Unidos | Chic Import USA',
    template: '%s | Chic Import USA',
  },
  description: 'Descubre productos importados desde Estados Unidos: tenis, ropa, accesorios y vitaminas publicados por tiempo limitado. Compra confirmada por WhatsApp.',
  keywords: [
    'productos importados',
    'importaciones USA',
    'tenis importados',
    'ropa importada',
    'accesorios importados',
    'vitaminas importadas',
    'importaciones Colombia',
    'Chic Import USA',
  ],
  authors: [{ name: 'Chic Import USA' }],
  creator: 'Chic Import USA',
  publisher: 'Chic Import USA',
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
    siteName: 'Chic Import USA',
    title: 'Productos importados desde Estados Unidos | Chic Import USA',
    description: 'Tenis, ropa, accesorios y vitaminas publicados por tiempo limitado. Compra confirmada por WhatsApp.',
    images: [
      {
        url: 'https://chicimportusa.com/img/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Chic Import USA - Productos importados desde Estados Unidos',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Productos importados desde Estados Unidos | Chic Import USA',
    description: 'Tenis, ropa, accesorios y vitaminas publicados por tiempo limitado. Compra confirmada por WhatsApp.',
    images: ['https://chicimportusa.com/img/og-image.jpg'],
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
