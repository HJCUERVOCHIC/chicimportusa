// ============================================================
// ChicImportUSA — /catalogo · Etapa 3 Dark Theme
// Server Component: carga datos en paralelo → pasa a CatalogClient
// ISR: revalidate 5 minutos
// ============================================================

import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getProductos, getCategorias, getMarcas } from '@/lib/api-catalogo';
import CatalogClient from '@/components/catalogo/CatalogClient';
import { FilterBarSkeleton, ProductGridSkeleton, SkeletonStyles } from '@/components/ui/Skeleton';

// ── SEO ───────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: 'Catálogo — Chic Import USA',
  description:
    'Explora nuestro catálogo de productos importados de USA: calzado Nike y Adidas, perfumería, ropa, vitaminas y accesorios. Precios en pesos colombianos con envío a toda Colombia.',
  openGraph: {
    title: 'Catálogo — Chic Import USA',
    description: 'Productos importados de USA: calzado, perfumería, ropa y más. Precios en COP.',
    type: 'website',
    url: 'https://chicimportusa.com/catalogo',
  },
  alternates: { canonical: 'https://chicimportusa.com/catalogo' },
};

// ── Page props ────────────────────────────────────────────────────────────────

interface CatalogoPageProps {
  searchParams: Promise<{
    categoria?: string;
    marca?: string;
    genero?: string;
    buscar?: string;
    orden?: string;
  }>;
}

// ── Server Component ──────────────────────────────────────────────────────────

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const params = await searchParams;

  const categoriaActiva = params?.categoria || undefined;
  const marcaActiva     = params?.marca     || undefined;
  const generoActivo    = params?.genero    || undefined;
  const busquedaActiva  = params?.buscar    || undefined;
  const ordenActivo     = (params?.orden as 'reciente' | 'precio_asc' | 'precio_desc') || undefined;

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
    <>
      <SkeletonStyles />
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#0a0a0a] px-4 md:px-8 pt-10 pb-6 max-w-7xl mx-auto space-y-6">
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
    </>
  );
}
