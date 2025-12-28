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
  description: 'Publicaciones periódicas de moda original desde USA. Tenis, ropa y accesorios de marcas reconocidas. Envíos a toda Colombia.',
  keywords: ['moda USA', 'tenis originales', 'sneakers Colombia', 'ropa importada', 'Nike', 'Jordan', 'New Balance', 'importación ropa', 'moda streetwear'],
  authors: [{ name: 'ChicImportUSA' }],
  creator: 'ChicImportUSA',
  publisher: 'ChicImportUSA',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'ChicImportUSA | Moda original desde USA',
    description: 'Publicaciones periódicas de moda original desde USA. Tenis, ropa y accesorios por WhatsApp.',
    url: BASE_URL,
    siteName: 'ChicImportUSA',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ChicImportUSA - Moda original desde USA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChicImportUSA | Moda original desde USA',
    description: 'Publicaciones periódicas de moda original desde USA por WhatsApp.',
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
  verification: {
    // Agregar cuando tengas los códigos de verificación
    // google: 'tu-codigo-google',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-sans antialiased bg-bg text-text">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
