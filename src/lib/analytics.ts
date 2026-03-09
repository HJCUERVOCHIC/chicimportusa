// ─────────────────────────────────────────────
//  ChicImportUSA — Analytics helpers (GA4)
//  Etapa 5
// ─────────────────────────────────────────────

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
    dataLayer: unknown[]
  }
}

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

function gtag(...args: unknown[]) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag(...args)
  }
}

export const EVENTS = {
  // ── Nombres de evento (strings) ──
  WHATSAPP_CLICK: 'whatsapp_click' as const,
  FILTER_APPLIED: 'filter_applied' as const,
  PRODUCT_VIEW:   'view_item'      as const,
  HERO_CTA_CLICK: 'hero_cta_click' as const,
  PAGE_VIEW:      'page_view'      as const,

  // ── Métodos para disparar eventos ──

  // Usuario toca "Ver en WhatsApp" — KPI principal
  whatsappClick: (productId: string, productName?: string, precio?: number | string) => {
    gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      product_id: productId,
      product_name: productName ?? productId,
      ...(precio !== undefined && { value: precio }),
    })
  },

  // Usuario toca un enlace de red social (Instagram, TikTok, etc.)
  socialClick: (platform: string) => {
    gtag('event', 'social_click', {
      event_category: 'engagement',
      platform,
    })
  },

  // Usuario aplica filtros en el catálogo (género, categoría, marca, orden)
  catalogoFiltro: (filterType: string, filterValue: string) => {
    gtag('event', 'filter_applied', {
      event_category: 'catalog',
      filter_type: filterType,
      filter_value: filterValue,
    })
  },

  // Alias de catalogoFiltro para compatibilidad
  filterApplied: (filterType: string, filterValue: string) => {
    gtag('event', 'filter_applied', {
      event_category: 'catalog',
      filter_type: filterType,
      filter_value: filterValue,
    })
  },

  // Usuario llega a la página de detalle de un producto
  productView: (productId: string, productName: string, category: string) => {
    gtag('event', 'view_item', {
      currency: 'USD',
      items: [{
        item_id: productId,
        item_name: productName,
        item_category: category,
      }],
    })
  },

  // Usuario toca el CTA principal del Hero
  heroCTAClick: () => {
    gtag('event', 'hero_cta_click', {
      event_category: 'engagement',
    })
  },
}

// Analytics — alias para uso en Analytics.tsx (NavigationTracker)
export const Analytics = {
  pageView: (url: string) => {
    gtag('config', GA_ID, { page_path: url })
  },
  whatsappClick: EVENTS.whatsappClick,
  filterApplied: EVENTS.filterApplied,
  productView:   EVENTS.productView,
  heroCTAClick:  EVENTS.heroCTAClick,
  socialClick:   EVENTS.socialClick,
}
