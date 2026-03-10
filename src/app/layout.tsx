// ============================================================
// ChicImportUSA — app/layout.tsx · Etapa 6 SEO
// Agrega JSON-LD tipo Store para identificar el negocio ante Google.
// ============================================================
// INSTRUCCIÓN: Este archivo REEMPLAZA tu app/layout.tsx existente.
// Solo se agregan: el bloque JSON-LD y los imports necesarios.
// Todo lo demás (Analytics, fuentes, metadata global) se conserva igual.
// ============================================================

import type { Metadata, Viewport } from 'next';
import { Bebas_Neue, Space_Grotesk } from 'next/font/google';
import { Suspense } from 'react';
import Analytics from '@/components/Analytics';
import { SITE_CONFIG, WHATSAPP_URL } from '@/lib/constants';
import './globals.css';

// ── Fuentes ──────────────────────────────────────────────────
const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

// ── Metadata global ──────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'Chic Import USA — Moda y productos USA en Colombia',
    template: '%s | Chic Import USA',
  },
  description:
    'Importamos sneakers, bolsos, perfumes, Victoria\'s Secret, vitaminas y accesorios directamente desde USA. Compra 100% por WhatsApp con envío a toda Colombia.',
  keywords: [
    'importadora USA Colombia',
    'sneakers importados',
    'Victoria\'s Secret Colombia',
    'perfumes importados',
    'bolsos USA',
    'vitaminas USA',
    'accesorios importados',
    'comprar por WhatsApp',
  ],
  authors: [{ name: SITE_CONFIG.name }],
  creator: SITE_CONFIG.name,
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: 'Chic Import USA — Moda y productos USA en Colombia',
    description:
      'Sneakers, bolsos, perfumes, Victoria\'s Secret y más, importados directamente desde USA. Compra por WhatsApp, envío a toda Colombia.',
    images: [
      {
        url: '/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'Chic Import USA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chic Import USA — Moda y productos USA en Colombia',
    description:
      'Importamos sneakers, bolsos, perfumes y más desde USA. Compra por WhatsApp.',
    images: ['/og-default.jpg'],
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
    canonical: SITE_CONFIG.url,
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#D90429',
};

// ── JSON-LD — Datos estructurados del negocio ─────────────────
// Tipo OnlineStore: negocio 100% virtual, sin dirección física.
// Google usa esto para entender el negocio y mostrarlo en resultados.
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'OnlineStore',
  name: SITE_CONFIG.name,
  url: SITE_CONFIG.url,
  description:
    'Importadora de moda y productos desde USA. Sneakers, bolsos, perfumes, Victoria\'s Secret, vitaminas y accesorios. Vendemos exclusivamente por WhatsApp con envío a toda Colombia.',
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
    url: WHATSAPP_URL,
    availableLanguage: 'Spanish',
  },
  sameAs: [
    'https://www.instagram.com/chicimportusa',
    'https://www.tiktok.com/@chicimportusa',
  ],
  currenciesAccepted: 'COP',
  paymentAccepted: 'Transferencia bancaria, Nequi, Daviplata',
  priceRange: '$$',
};

// ── Root Layout ───────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${bebasNeue.variable} ${spaceGrotesk.variable}`}
    >
      <head>
        {/* ── JSON-LD structured data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-white text-gray-900 antialiased">
        {/* Analytics: GA4 + Microsoft Clarity (Etapa 5) */}
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>

        {children}
      </body>
    </html>
  );
}
