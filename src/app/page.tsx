// ============================================================
// ChicImportUSA — Homepage (Etapa 3 · Streetwear/Urban)
// Server Component con ISR para productos destacados
// ============================================================

import type { Metadata } from 'next';
import { getProductos } from '@/lib/api-catalogo';
import { SITE_CONFIG } from '@/lib/constants';
import Hero from '@/components/sections/Hero';
import FeaturedProducts from '@/components/sections/FeaturedProducts';
import Categories from '@/components/sections/Categories';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';
import FinalCTA from '@/components/sections/FinalCTA';

// -----------------------------------------------------------
// Metadata SEO
// -----------------------------------------------------------

export const metadata: Metadata = {
  title: 'ChicImportUSA — Productos importados desde Estados Unidos',
  description:
    'Tenis, ropa y accesorios originales importados desde USA. Publicaciones periódicas gestionadas por WhatsApp. Envío a toda Colombia.',
  openGraph: {
    title: 'ChicImportUSA — Productos importados desde USA',
    description:
      'Tenis, ropa y accesorios originales. Publicaciones periódicas con productos seleccionados.',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: `${SITE_CONFIG.url}/img/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'ChicImportUSA - Productos importados desde USA',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ChicImportUSA — Productos importados desde USA',
    description:
      'Tenis, ropa y accesorios originales importados. Publicaciones gestionadas por WhatsApp.',
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
};

// -----------------------------------------------------------
// ISR — revalidar cada 5 minutos
// -----------------------------------------------------------

export const revalidate = 300;

// -----------------------------------------------------------
// Page
// -----------------------------------------------------------

export default async function HomePage() {
  // Obtener productos destacados desde la API
  const productosData = await getProductos({ destacados: true, limite: 8 });

  return (
    <>
      <Hero
        totalProductos={productosData.total}
        publicacionActiva={productosData.publicacion_activa}
      />
      <FeaturedProducts productos={productosData.productos} />
      <Categories categorias={productosData.categorias} />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
