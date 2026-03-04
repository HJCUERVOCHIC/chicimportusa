// ============================================================
// ChicImportUSA — Analytics & Tracking (GA4)
// UNIFICADO: Etapa 1 (layout) + Etapa 2 (catálogo)
// Se implementa completo en Etapa 5; por ahora es el skeleton
// para que los componentes puedan llamar eventos desde ya.
// ============================================================

import { GA_MEASUREMENT_ID } from './constants';

// Extender Window para incluir gtag
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/**
 * Dispara un evento personalizado en GA4.
 * Si GA4 no está cargado aún, el evento se ignora silenciosamente.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  if (typeof window === 'undefined') return;
  if (!window.gtag) return;
  if (!GA_MEASUREMENT_ID) return;

  window.gtag('event', eventName, params);
}

/**
 * Eventos predefinidos para mantener consistencia en los nombres.
 * Usados por Header, Footer, WhatsAppFloat, CatalogClient, ProductCard.
 */
export const EVENTS = {
  // -----------------------------------------------------------
  // Etapa 1 — Layout (Header, Footer, WhatsAppFloat)
  // -----------------------------------------------------------

  /** Click en botón de WhatsApp — registrar desde dónde */
  whatsappClick: (ubicacion: string, producto?: string, precio?: number) =>
    trackEvent('whatsapp_click', {
      ubicacion,
      ...(producto && { producto_nombre: producto }),
      ...(precio && { producto_precio: precio }),
    }),

  /** Click en icono de red social */
  socialClick: (plataforma: 'instagram' | 'tiktok') =>
    trackEvent('social_click', { plataforma }),

  /** Click en categoría del homepage */
  categoriaClick: (categoria: string) =>
    trackEvent('categoria_click', { categoria_nombre: categoria }),

  /** Click en producto destacado del homepage */
  productoDestacadoClick: (nombre: string, precio: number) =>
    trackEvent('producto_destacado_click', {
      producto_nombre: nombre,
      producto_precio: precio,
    }),

  // -----------------------------------------------------------
  // Etapa 2 — Catálogo
  // -----------------------------------------------------------

  /** Aplicar filtro en el catálogo */
  catalogoFiltro: (tipo: string, valor: string) =>
    trackEvent('catalogo_filtro', { tipo_filtro: tipo, valor }),

  /** Búsqueda en el catálogo */
  catalogoBusqueda: (termino: string) =>
    trackEvent('catalogo_busqueda', { search_term: termino }),

  /** Vista de producto (futuro: modal/detalle) */
  productoVista: (id: string, nombre: string, precio: number) =>
    trackEvent('view_item', {
      item_id: id,
      producto_nombre: nombre,
      producto_precio: precio,
      currency: 'COP',
    }),
} as const;
