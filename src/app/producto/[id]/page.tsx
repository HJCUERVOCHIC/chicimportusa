// ============================================================
// ChicImportUSA — /producto/[id] · Etapa 3 Dark Theme
// Server Component con Open Graph para WhatsApp previews.
// ============================================================

import { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductoById } from '@/lib/api-catalogo';
import ProductDetail from '@/components/catalogo/ProductDetail';
import { Skeleton, SkeletonStyles } from '@/components/ui/Skeleton';
import { SITE_CONFIG } from '@/lib/constants';

interface ProductoPageProps {
  params: Promise<{ id: string }>;
}

// ── Metadata dinámica (Open Graph → WhatsApp preview) ─────────────────────────

export async function generateMetadata({ params }: ProductoPageProps): Promise<Metadata> {
  const { id } = await params;
  const producto = await getProductoById(id);

  if (!producto) {
    return { title: 'Producto no encontrado — Chic Import USA' };
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
      ...(producto.imagen && {
        images: [{ url: producto.imagen, width: 600, height: 600, alt: producto.nombre }],
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${producto.nombre} — ${producto.precio_formateado}`,
      description,
      ...(producto.imagen && { images: [producto.imagen] }),
    },
    alternates: { canonical: `${SITE_CONFIG.url}/producto/${id}` },
  };
}

// ── Server Component ──────────────────────────────────────────────────────────

export default async function ProductoPage({ params }: ProductoPageProps) {
  const { id } = await params;
  const producto = await getProductoById(id);

  if (!producto) {
    notFound();
  }

  return (
    <>
      <SkeletonStyles />
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#0a0a0a] px-4 md:px-8 py-16 max-w-6xl mx-auto">
            <div className="grid gap-8 md:grid-cols-2">
              <Skeleton className="aspect-square w-full" />
              <div className="space-y-4 pt-2">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-2/3" />
                <Skeleton className="h-8 w-32 mt-2" />
                <Skeleton className="h-4 w-full mt-4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-14 w-full mt-6" />
              </div>
            </div>
          </div>
        }
      >
        <ProductDetail producto={producto} />
      </Suspense>
    </>
  );
}
