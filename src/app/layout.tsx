import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { SITE_CONFIG } from '@/lib/constants';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: `${SITE_CONFIG.name} — Productos importados desde Estados Unidos`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    'productos importados',
    'tenis originales USA',
    'perfumes importados',
    'Nike Colombia',
    'Adidas Colombia',
    'Victoria Secret Colombia',
    'comprar desde Estados Unidos',
    'importaciones USA Colombia',
  ],
  icons: {
    icon: [
      { url: '/img/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/img/favicon-192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/img/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — Productos importados desde Estados Unidos`,
    description: SITE_CONFIG.description,
    images: [
      {
        url: '/img/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'ChicImportUSA — Productos importados desde Estados Unidos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
    images: ['/img/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: SITE_CONFIG.themeColor,
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO" className={inter.variable}>
      <head>
        <link
          rel="preconnect"
          href="https://kwprtjcfoawvpjvtefwx.supabase.co"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.sanity.io"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-white font-sans antialiased text-gray-900">
        <Header />

        <main id="contenido-principal" className="flex-1">
          {children}
        </main>

        <Footer />

        <WhatsAppFloat />
      </body>
    </html>
  );
}
