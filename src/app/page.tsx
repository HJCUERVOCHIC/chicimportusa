// ============================================================
// ChicImportUSA — Homepage = Catálogo completo
// Carga destacados en paralelo, solo cuando no hay filtros.
// v2: agrega HeroCarousel de categorías sobre el catálogo.
// ============================================================

import { Suspense } from 'react';
import type { Metadata } from 'next';
import { getProductos, getCategorias, getMarcas } from '@/lib/api-catalogo';
import { getHeroCategorias } from '@/lib/api';
import { SITE_CONFIG } from '@/lib/constants';
import CatalogClient from '@/components/catalogo/CatalogClient';
import HeroCarousel from '@/components/sections/HeroCarousel';
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

  // Solo traer destacados cuando no hay filtros activos
  const hayFiltros = categoriaActiva || marcaActiva || generoActivo || busquedaActiva;

  const [dataProductos, dataCategorias, dataMarcas, dataDestacados, heroCategorias] =
    await Promise.all([
      getProductos({
        categoria: categoriaActiva,
        marca:     marcaActiva,
        genero:    generoActivo as 'hombre' | 'mujer' | 'unisex' | undefined,
        buscar:    busquedaActiva,
        orden:     ordenActivo,
      }),
      getCategorias(generoActivo),
      getMarcas(categoriaActiva, generoActivo),
      hayFiltros ? Promise.resolve(null) : getProductos({ destacados: true, limite: 8 }),
      // El carousel se oculta solo si el admin no ha subido imágenes hero
      getHeroCategorias(),
    ]);

  return (
    <main id="contenido-principal">
      {/* Carousel hero — solo se renderiza si hay categorías con imagen */}
      {heroCategorias.length > 0 && !hayFiltros && (
        <HeroCarousel categorias={heroCategorias} />
      )}

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
          destacados={dataDestacados?.productos ?? []}
        />
      </Suspense>
    </main>
  );
}
