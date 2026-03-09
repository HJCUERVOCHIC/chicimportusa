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

export const Analytics = {
  // Llamado automáticamente en cada navegación (SPA)
  pageView: (url: string) => {
    gtag('config', GA_ID, { page_path: url })
  },

  // Usuario toca "Ver en WhatsApp" — KPI principal
  whatsappClick: (productId: string, productName: string) => {
    gtag('event', 'whatsapp_click', {
      event_category: 'engagement',
      product_id: productId,
      product_name: productName,
    })
  },

  // Usuario aplica un filtro en el catálogo
  filterApplied: (filterType: string, filterValue: string) => {
    gtag('event', 'filter_applied', {
      event_category: 'catalog',
      filter_type: filterType,   // 'genero' | 'categoria' | 'marca'
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
