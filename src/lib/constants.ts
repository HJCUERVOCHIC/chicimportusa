// ============================================================
// ChicImportUSA — Configuración Centralizada
// Todas las URLs, textos y config del sitio en un solo lugar.
// ============================================================

export const SITE_CONFIG = {
  name: 'ChicImportUSA',
  description:
    'Productos importados desde Estados Unidos — Tenis, perfumes, ropa y más',
  url: 'https://www.chicimportusa.com',
  locale: 'es-CO',
  accentColor: '#D90429',
  themeColor: '#FFFFFF',
} as const;

// WhatsApp — Un solo link para compras y canal de publicaciones
export const WHATSAPP_URL =
  process.env.NEXT_PUBLIC_WHATSAPP_URL ||
  'https://chat.whatsapp.com/KXwhlBpFKeh8521CBRvJp6';

// API del catálogo (plataforma admin)
export const CATALOG_API_URL =
  process.env.NEXT_PUBLIC_CATALOG_API_URL ||
  'https://admin.chicimportusa.com/api/catalogo';

// Redes sociales — Actualizar cuando se confirmen los handles
export const SOCIAL_LINKS = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://instagram.com/chicimportusa',
  tiktok: process.env.NEXT_PUBLIC_TIKTOK_URL || 'https://tiktok.com/@chicimportusa',
} as const;

// URLs internas
export const ADMIN_URL = 'https://admin.chicimportusa.com/';

// Navegación principal
export const NAV_LINKS = [
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/como-funciona', label: 'Cómo funciona' },
] as const;

// Links del footer
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

// Analytics IDs
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '';
export const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID || '';
