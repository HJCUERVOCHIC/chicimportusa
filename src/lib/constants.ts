// ============================================================
// ChicImportUSA — Configuración Centralizada
// Todas las URLs, textos y config del sitio en un solo lugar.
// UNIFICADO: Etapa 1 (layout) + Etapa 2 (catálogo)
// ============================================================

// -----------------------------------------------------------
// Configuración del sitio
// -----------------------------------------------------------

export const SITE_CONFIG = {
  name: 'ChicImportUSA',
  description:
    'Productos importados desde Estados Unidos — Tenis, perfumes, ropa y más',
  url: 'https://www.chicimportusa.com',
  locale: 'es-CO',
  accentColor: '#D90429',
  themeColor: '#FFFFFF',
} as const;

// -----------------------------------------------------------
// URLs externas
// -----------------------------------------------------------

/** WhatsApp — Un solo link para compras y canal de publicaciones */
export const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ||
  'https://chat.whatsapp.com/KXwhlBpFKeh8521CBRvJp6';

/** API del catálogo (plataforma admin) — usado por server components */
export const CATALOG_API_URL =
  process.env.NEXT_PUBLIC_CATALOG_API_URL ||
  'https://admin.chicimportusa.com/api/catalogo';

/** Redes sociales */
export const SOCIAL_LINKS = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/chic_importusa/',
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://tiktok.com/@chicimportusa',
} as const;

/** URL del panel de administración */
export const ADMIN_URL = 'https://admin.chicimportusa.com/';

// Aliases para componentes que importan por nombre directo
export const INSTAGRAM_URL = SOCIAL_LINKS.instagram;
export const TIKTOK_URL = SOCIAL_LINKS.tiktok;

// -----------------------------------------------------------
// Navegación
// -----------------------------------------------------------

/** Links del header */
export const NAV_LINKS = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/como-funciona', label: 'Cómo funciona' },
] as const;

/** Links del footer */
export const FOOTER_LINKS = {
  navegacion: [
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/como-funciona', label: 'Cómo funciona' },
  ],
  legal: [
    { href: '/terminos-y-condiciones', label: 'Términos y Condiciones' },
    { href: '/politica-de-privacidad', label: 'Política de Privacidad' },
  ],
} as const;

// -----------------------------------------------------------
// Marca y colores
// -----------------------------------------------------------

export const BRAND = {
  accent: '#D90429',
  accentHover: '#B80323',
  whatsapp: '#25D366',
  whatsappHover: '#1DA851',
} as const;

// -----------------------------------------------------------
// Catálogo
// -----------------------------------------------------------

/** Dominio del CDN de imágenes (Supabase Storage) */
export const IMAGE_CDN_HOST = 'kwprtjcfoawvpjvtefwx.supabase.co';

/** Número de WhatsApp para mensajes directos (sin +) */
export const WHATSAPP_PHONE = '573150619888'; // ← Actualizar con el número real

// -----------------------------------------------------------
// Analytics (Etapa 5 — skeleton por ahora)
// -----------------------------------------------------------

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || '';
