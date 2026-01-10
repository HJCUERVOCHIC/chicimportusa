'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

const CATALOG_URL = 'https://chicimportusa.vercel.app/catalogo?embed=1'
const WHATSAPP_GROUP_URL = 'https://chat.whatsapp.com/KXwhlBpFKeh8521CBRvJp6'

export default function PublicacionesPreview() {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleIframeError = useCallback(() => {
    setIsLoading(false)
    setHasError(true)
  }, [])

  return (
    <section id="publicaciones-preview" className="py-16 md:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-12">
          <span className="inline-block px-4 py-1.5 bg-[#D90429]/10 text-[#D90429] text-sm font-semibold rounded-full mb-4">
            Publicaciones activas
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
            Explora nuestros productos
          </h2>
          <p className="mt-4 md:mt-6 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Descubre las publicaciones disponibles con productos importados desde Estados Unidos. Tenis, ropa y accesorios seleccionados.
          </p>
        </div>

        {/* Preview Container - Clickeable */}
        <Link 
          href="/publicaciones"
          className="group block relative w-full rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 bg-gray-100 border border-gray-200"
        >
          {/* Overlay con CTA - Siempre visible en mobile, hover en desktop */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-20 flex flex-col items-center justify-end pb-8 md:pb-12 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
            <div className="text-center px-4">
              <p className="text-white/90 text-sm md:text-base mb-4 max-w-md">
                Haz clic para ver todas las publicaciones disponibles
              </p>
              <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#D90429] hover:bg-[#B50321] text-white font-semibold rounded-full shadow-lg transition-all duration-300 transform group-hover:scale-105">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Ver publicaciones
              </span>
            </div>
          </div>

          {/* Indicador de clic en desktop */}
          <div className="hidden md:flex absolute top-4 right-4 z-20 items-center gap-2 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-sm text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Ver todo</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </div>

          {/* Loader */}
          {isLoading && !hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 border-4 border-gray-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-10 h-10 border-4 border-[#D90429] rounded-full border-t-transparent animate-spin"></div>
                </div>
                <p className="text-gray-500 text-sm animate-pulse">Cargando preview…</p>
              </div>
            </div>
          )}

          {/* Estado de error - Fallback visual */}
          {hasError && (
            <div className="relative h-[300px] md:h-[400px] bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center px-4">
                <div className="w-16 h-16 mx-auto mb-4 text-gray-400">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium mb-2">Vista previa no disponible</p>
                <p className="text-gray-500 text-sm">Haz clic para ver las publicaciones</p>
              </div>
            </div>
          )}

          {/* Iframe Preview - Con interacción deshabilitada */}
          {!hasError && (
            <div className="relative h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden">
              <iframe
                src={CATALOG_URL}
                title="Preview del catálogo ChicImportUSA"
                className={`w-full h-[600px] md:h-[800px] border-0 pointer-events-none scale-100 origin-top transition-opacity duration-500 ${
                  isLoading ? 'opacity-0' : 'opacity-100'
                }`}
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                tabIndex={-1}
                aria-hidden="true"
              />
              {/* Gradient fade en la parte inferior */}
              <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-100 to-transparent pointer-events-none" />
            </div>
          )}
        </Link>

        {/* Botones secundarios */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/publicaciones"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#D90429] hover:bg-[#B50321] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <svg 
              className="w-5 h-5" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Ver todas las publicaciones
          </Link>
          
          <a
            href={WHATSAPP_GROUP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <svg 
              className="w-5 h-5" 
              fill="currentColor" 
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Unirme al grupo de publicaciones
          </a>
        </div>
      </div>
    </section>
  )
}
