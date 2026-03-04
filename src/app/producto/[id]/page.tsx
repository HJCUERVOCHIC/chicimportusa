// ============================================================
// ChicImportUSA — /producto/[id]
// Server Component con Open Graph para WhatsApp previews.
// Cuando alguien comparte el link en WhatsApp, se genera
// automáticamente una tarjeta con imagen, nombre y precio.
// ============================================================

import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductoById } from '@/lib/api-catalogo';
import ProductDetail from '@/components/catalogo/ProductDetail';
import { Skeleton } from '@/components/ui/Skeleton';
import { SITE_CONFIG } from '@/lib/constants';

// -----------------------------------------------------------
// Tipos
// -----------------------------------------------------------

interface ProductoPageProps {
  params: Promise<{ id: string }>;
}

// -----------------------------------------------------------
// Metadata dinámica para SEO + Open Graph (WhatsApp preview)
// -----------------------------------------------------------

export async function generateMetadata({
  params,
}: ProductoPageProps): Promise<Metadata> {
  const { id } = await params;
  const producto = await getProductoById(id);

  if (!producto) {
    return {
      title: 'Producto no encontrado — Chic Import USA',
    };
  }

  const title = `${producto.nombre} — ${producto.precio_formateado} | Chic Import USA`;
  const description = producto.descripcion
    ? producto.descripcion.slice(0, 160)
    : `${producto.nombre}${producto.marca ? ` de ${producto.marca}` : ''} — ${producto.precio_formateado}. Producto importado de USA con envío a toda Colombia.`;

  return {
    title,
    description,
    openGraph: {
      title: `${producto.nombre} — ${producto.precio_formateado}`,
      description,
      type: 'website',
      url: `${SITE_CONFIG.url}/producto/${id}`,
      siteName: SITE_CONFIG.name,
      locale: 'es_CO',
      // La imagen del producto — esto es lo que WhatsApp muestra
      ...(producto.imagen && {
        images: [
          {
            url: producto.imagen,
            width: 600,
            height: 600,
            alt: producto.nombre,
          },
        ],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${producto.nombre} — ${producto.precio_formateado}`,
      description,
      ...(producto.imagen && {
        images: [producto.imagen],
      }),
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/producto/${id}`,
    },
  };
}

// -----------------------------------------------------------
// Server Component
// -----------------------------------------------------------

export default async function ProductoPage({ params }: ProductoPageProps) {
  const { id } = await params;
  const producto = await getProductoById(id);

  if (!producto) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <Suspense
        fallback={
          <div className="grid gap-8 md:grid-cols-2">
            <Skeleton className="aspect-square w-full rounded-2xl" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-20" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-12 w-full rounded-lg" />
            </div>
          </div>
        }
      >
        <ProductDetail producto={producto} />
      </Suspense>
    </main>
  );
}
