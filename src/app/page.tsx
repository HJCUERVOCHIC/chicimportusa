// ============================================================
// ChicImportUSA — Homepage = Catalogo completo
// La home es directamente el catalogo con todos sus filtros.
// ============================================================

import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getProductos, getCategorias, getMarcas } from '@/lib/api-catalogo';
import { SITE_CONFIG } from '@/lib/constants';
import CatalogClient from '@/components/catalogo/CatalogClient';
import { FilterBarSkeleton, ProductGridSkeleton } from '@/components/ui/Skeleton';

export const metadata: Metadata = {
  title: 'ChicImportUSA — Productos importados desde Estados Unidos',
  description:
    'Tenis, ropa, perfumes y accesorios originales importados desde USA. Publicaciones periodicas gestionadas por WhatsApp. Envio a toda Colombia.',
  openGraph: {
    title: 'ChicImportUSA — Productos importados desde USA',
    description: 'Tenis, ropa y accesorios originales. Publicaciones periodicas con productos seleccionados.',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    locale: 'es_CO',
    type: 'website',
    images: [{ url: `${SITE_CONFIG.url}/img/og-image.jpg`, width: 1200, height: 630, alt: 'ChicImportUSA' }],
  },
  alternates: { canonical: SITE_CONFIG.url },
};

export const revalidate = 300;

interface HomePageProps {
  searchParams: Promise<{
    categoria?: string;
    marca?: string;
    genero?: string;
    buscar?: string;
    orden?: string;
  }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const params = await searchParams;

  const categoriaActiva = params?.categoria || undefined;
  const marcaActiva     = params?.marca     || undefined;
  const generoActivo    = params?.genero    || undefined;
  const busquedaActiva  = params?.buscar    || undefined;
  const ordenActivo     = (params?.orden as 'reciente' | 'precio_asc' | 'precio_desc') || undefined;

  const [dataProductos, dataCategorias, dataMarcas] = await Promise.all([
    getProductos({
      categoria: categoriaActiva,
      marca:     marcaActiva,
      genero:    generoActivo as 'hombre' | 'mujer' | 'unisex' | undefined,
      buscar:    busquedaActiva,
      orden:     ordenActivo,
    }),
    getCategorias(generoActivo),
    getMarcas(categoriaActiva, generoActivo),
  ]);

  return (
    <main id="contenido-principal">
      <Suspense
        fallback={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
            <FilterBarSkeleton />
            <ProductGridSkeleton count={12} />
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
