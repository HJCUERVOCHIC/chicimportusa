// ============================================================
// ChicImportUSA — app/robots.ts · Etapa 6 SEO
// Genera robots.txt con bloqueo de API y referencia al sitemap.
// ============================================================

import type { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'], // Bloquear rutas de proxy internas
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
