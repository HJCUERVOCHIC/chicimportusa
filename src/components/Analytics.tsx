'use client'

// ─────────────────────────────────────────────
//  ChicImportUSA — Analytics Scripts
//  GA4 + Microsoft Clarity
//  Etapa 5
// ─────────────────────────────────────────────
//  Uso en layout.tsx:
//
//  import { Suspense } from 'react'
//  import AnalyticsScripts from '@/components/Analytics'
//
//  <Suspense fallback={null}>
//    <AnalyticsScripts />
//  </Suspense>
// ─────────────────────────────────────────────

import Script from 'next/script'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { Analytics } from '@/lib/analytics'

const GA_ID      = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID
const isProd     = process.env.NODE_ENV === 'production'

// Registra cada cambio de ruta como page_view en GA4
function NavigationTracker() {
  const pathname     = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    const url = pathname + (searchParams.toString() ? `?${searchParams}` : '')
    Analytics.pageView(url)
  }, [pathname, searchParams])

  return null
}

export default function AnalyticsScripts() {
  // No cargar en desarrollo — evita contaminar los datos
  if (!isProd) return null

  return (
    <>
      {/* ── Google Analytics 4 ── */}
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
                send_page_view: false
              });
            `}
          </Script>
        </>
      )}

      {/* ── Microsoft Clarity ── */}
      {CLARITY_ID && (
        <Script id="clarity-init" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}

      {/* Tracker de navegación SPA — requiere Suspense en layout.tsx */}
      <NavigationTracker />
    </>
  )
}
