// ============================================================
// ChicImportUSA — app/sitemap.ts · Etapa 6 SEO
// Genera sitemap.xml dinámico con páginas estáticas + productos.
// ============================================================

import type { MetadataRoute } from 'next';
import { CATALOG_API_URL } from '@/lib/constants';

interface ProductoSitemap {
  id: string | number;
  updated_at?: string;
}

const BASE_URL = 'https://www.chicimportusa.com';

async function getProductosParaSitemap(): Promise<ProductoSitemap[]> {
  try {
    const res = await fetch(`${CATALOG_API_URL}/productos?limite=1000`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) return [];

    const data = await res.json();

    // La API devuelve { productos: [...], total: N, ... }
    const productos: ProductoSitemap[] = Array.isArray(data?.productos)
      ? data.productos
      : [];

    return productos;
  } catch {
    console.warn('[sitemap] No se pudieron obtener productos de la API');
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const ahora = new Date();

  // ── Páginas estáticas ──────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: ahora,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/catalogo`,
      lastModified: ahora,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/como-funciona`,
      lastModified: ahora,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terminos-y-condiciones`,
      lastModified: ahora,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/politica-de-privacidad`,
      lastModified: ahora,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // ── Páginas dinámicas de productos ────────────────────────
  const productos = await getProductosParaSitemap();

  const productPages: MetadataRoute.Sitemap = productos.map((p) => ({
    url: `${BASE_URL}/producto/${p.id}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : ahora,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
