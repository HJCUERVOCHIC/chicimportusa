// ============================================================
// ChicImportUSA — app/sitemap.ts · Etapa 6 SEO
// Genera sitemap.xml dinámico con páginas estáticas + productos.
// ============================================================

import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

// Tipo mínimo del producto para el sitemap
interface ProductoSitemap {
  id: string | number;
  updated_at?: string;
}

async function getProductosParaSitemap(): Promise<ProductoSitemap[]> {
  try {
    // Usamos el proxy interno para evitar CORS y reutilizar la misma ruta que el catálogo
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ||
      process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : SITE_CONFIG.url;

    const res = await fetch(`${baseUrl}/api/catalogo/productos?limit=1000`, {
      next: { revalidate: 3600 }, // Revalidar cada hora
    });

    if (!res.ok) return [];

    const data = await res.json();

    // La API puede devolver { data: [...] } o directamente el array
    const productos: ProductoSitemap[] = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
        ? data.data
        : [];

    return productos;
  } catch {
    // Si la API falla en build time, el sitemap se genera sin productos
    // (es mejor que romper el build)
    console.warn('[sitemap] No se pudieron obtener productos:', 'API no disponible');
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;
  const ahora = new Date();

  // ── Páginas estáticas ──────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: ahora,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/catalogo`,
      lastModified: ahora,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/como-funciona`,
      lastModified: ahora,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terminos-y-condiciones`,
      lastModified: ahora,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/politica-de-privacidad`,
      lastModified: ahora,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  // ── Páginas dinámicas de productos ────────────────────────
  const productos = await getProductosParaSitemap();

  const productPages: MetadataRoute.Sitemap = productos.map((p) => ({
    url: `${baseUrl}/producto/${p.id}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : ahora,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...productPages];
}
