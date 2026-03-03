// ============================================================
// ChicImportUSA — Analytics & Tracking
// Funciones para rastrear eventos en GA4.
// Se implementa completo en Etapa 5, pero el skeleton va aquí
// para que los componentes puedan llamar trackEvent desde ya.
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
 *
 * @example
 * trackEvent('whatsapp_click', { ubicacion: 'header' });
 * trackEvent('catalogo_filtro', { tipo: 'categoria', valor: 'calzado' });
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
 */
export const EVENTS = {
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

  /** Aplicar filtro en el catálogo */
  catalogoFiltro: (tipo: string, valor: string) =>
    trackEvent('catalogo_filtro', { tipo_filtro: tipo, valor }),

  /** Click en producto destacado del homepage */
  productoDestacadoClick: (nombre: string, precio: number) =>
    trackEvent('producto_destacado_click', {
      producto_nombre: nombre,
      producto_precio: precio,
    }),
} as const;
