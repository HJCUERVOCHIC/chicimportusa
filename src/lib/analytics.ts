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

// Constantes de nombres de eventos — usadas en CatalogClient, ProductCard, etc.
export const EVENTS = {
  WHATSAPP_CLICK: 'whatsapp_click',
  FILTER_APPLIED: 'filter_applied',
  PRODUCT_VIEW:   'view_item',
  HERO_CTA_CLICK: 'hero_cta_click',
  PAGE_VIEW:      'page_view',
} as const

// Helpers tipados para disparar eventos desde cualquier componente
export const Analytics = {
  // Llamado automáticamente en cada navegación (SPA)
  pageView: (url: string) => {
    gtag('config', GA_ID, { page_path: url })
  },

  // Usuario toca "Ver en WhatsApp" — KPI principal
  whatsappClick: (productId: string, productName: string) => {
    gtag('event', EVENTS.WHATSAPP_CLICK, {
      event_category: 'engagement',
      product_id: productId,
      product_name: productName,
    })
  },

  // Usuario aplica un filtro en el catálogo
  filterApplied: (filterType: string, filterValue: string) => {
    gtag('event', EVENTS.FILTER_APPLIED, {
      event_category: 'catalog',
      filter_type: filterType,   // 'genero' | 'categoria' | 'marca'
      filter_value: filterValue,
    })
  },

  // Usuario llega a la página de detalle de un producto
  productView: (productId: string, productName: string, category: string) => {
    gtag('event', EVENTS.PRODUCT_VIEW, {
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
    gtag('event', EVENTS.HERO_CTA_CLICK, {
      event_category: 'engagement',
    })
  },
}
