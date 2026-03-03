import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { SITE_CONFIG } from '@/lib/constants';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';
import './globals.css';

// ============================================================
// Fuente — Inter optimizada con Next.js font
// Variable CSS: --font-inter
// ============================================================
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// ============================================================
// Metadata global del sitio
// ============================================================
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
  openGraph: {
    type: 'website',
    locale: SITE_CONFIG.locale,
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: `${SITE_CONFIG.name} — Productos importados desde Estados Unidos`,
    description: SITE_CONFIG.description,
    // TODO: agregar imagen OG cuando esté disponible
    // images: [{ url: '/img/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.name,
    description: SITE_CONFIG.description,
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
  // No usamos maximum-scale=1 ni user-scalable=no (anti-patrón de accesibilidad)
};

// ============================================================
// Layout raíz
// ============================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es-CO" className={inter.variable}>
      <head>
        {/* Preconnect a Supabase Storage para imágenes del catálogo */}
        <link
          rel="preconnect"
          href="https://kwprtjcfoawvpjvtefwx.supabase.co"
          crossOrigin="anonymous"
        />
        {/* Preconnect a Sanity CDN si se sigue usando para algo */}
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

        {/* 
          GA4 y Clarity se agregan en Etapa 5.
          Los scripts irán aquí usando next/script con strategy="afterInteractive".
        */}
      </body>
    </html>
  );
}
