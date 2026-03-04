// ============================================================
// ChicImportUSA — /catalogo
// Server Component: carga datos en paralelo y pasa a CatalogClient
// ISR: revalidate cada 5 minutos (300s)
// ============================================================

import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getProductos, getCategorias, getMarcas } from '@/lib/api-catalogo';
import CatalogClient from '@/components/catalogo/CatalogClient';
import { FilterBarSkeleton, ProductGridSkeleton } from '@/components/ui/Skeleton';

// -----------------------------------------------------------
// SEO Metadata
// -----------------------------------------------------------

export const metadata: Metadata = {
  title: 'Catálogo — Chic Import USA',
  description:
    'Explora nuestro catálogo de productos importados de USA: calzado Nike y Adidas, perfumería, ropa, vitaminas y accesorios. Precios en pesos colombianos con envío a toda Colombia.',
  openGraph: {
    title: 'Catálogo — Chic Import USA',
    description:
      'Productos importados de USA: calzado, perfumería, ropa y más. Precios en COP.',
    type: 'website',
    url: 'https://chicimportusa.com/catalogo',
  },
  alternates: {
    canonical: 'https://chicimportusa.com/catalogo',
  },
};

// -----------------------------------------------------------
// Page props (Next.js 15 — searchParams is a Promise)
// -----------------------------------------------------------

interface CatalogoPageProps {
  searchParams: Promise<{
    categoria?: string;
    marca?: string;
    genero?: string;
    buscar?: string;
    orden?: string;
  }>;
}

// -----------------------------------------------------------
// Server Component
// -----------------------------------------------------------

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const params = await searchParams;

  const categoriaActiva = params?.categoria || undefined;
  const marcaActiva = params?.marca || undefined;
  const generoActivo = params?.genero || undefined;
  const busquedaActiva = params?.buscar || undefined;
  const ordenActivo = (params?.orden as 'reciente' | 'precio_asc' | 'precio_desc') || undefined;

  // -------------------------------------------------------
  // Carga paralela de datos (per spec recommendation)
  // Promise.all para minimizar tiempo de carga
  // -------------------------------------------------------

  const [dataProductos, dataCategorias, dataMarcas] = await Promise.all([
    getProductos({
      categoria: categoriaActiva,
      marca: marcaActiva,
      genero: generoActivo as 'hombre' | 'mujer' | 'unisex' | undefined,
      buscar: busquedaActiva,
      orden: ordenActivo,
    }),
    getCategorias(generoActivo),
    getMarcas(categoriaActiva, generoActivo),
  ]);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Encabezado de la página */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Catálogo
        </h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base"
           style={{ textWrap: 'pretty' } as React.CSSProperties}>
          Productos importados de Estados Unidos. Escríbenos por WhatsApp
          para confirmar disponibilidad y&nbsp;precio&nbsp;final.
        </p>
      </div>

      {/* Catálogo con filtros interactivos */}
      <Suspense
        fallback={
          <div className="space-y-6">
            <FilterBarSkeleton />
            <ProductGridSkeleton count={8} />
          </div>
        }
      >
        <CatalogClient
          initialProductos={dataProductos.productos}
          initialTotal={dataProductos.total}
          initialPublicacionActiva={dataProductos.publicacion_activa}
          initialCategorias={dataCategorias.categorias}
          initialMarcas={dataMarcas.marcas}
          totalProductos={dataCategorias.total_productos}
        />
      </Suspense>
    </main>
  );
}
