'use client'

import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] md:min-h-[90vh] flex items-end md:items-center">
      {/* Imagen de fondo con next/image */}
      <Image
        src="/img/hero-tenis.jpg"
        alt="Colección de tenis deportivos y casuales importados desde Estados Unidos"
        fill
        priority
        className="object-cover object-bottom"
        sizes="100vw"
        quality={90}
      />

      {/* Overlay sutil para legibilidad */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent md:bg-gradient-to-r md:from-black/60 md:via-black/30 md:to-transparent" 
        aria-hidden="true"
      />

      {/* Contenido */}
      <div className="relative z-10 w-full px-4 md:px-6 pb-12 md:pb-0">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl md:max-w-2xl text-center md:text-left">
            {/* H1 Principal */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight tracking-tight">
              Tenis deportivos y casuales importados desde Estados Unidos
            </h1>

            {/* Subtítulo */}
            <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-white/90 leading-relaxed">
              Publicaciones periódicas con referencias disponibles, gestionadas directamente por WhatsApp.
            </p>

            {/* Microtexto */}
            <p className="mt-3 md:mt-4 text-sm text-white/70">
              Productos seleccionados. Sin stock permanente. Proceso claro desde el inicio.
            </p>

            {/* CTA Principal - Botón WhatsApp */}
            <div className="mt-6 md:mt-8">
              <Link
                href="https://wa.me/573150619888"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-lg transition-colors text-base md:text-lg shadow-lg hover:shadow-xl"
              >
                <svg 
                  className="w-5 h-5 md:w-6 md:h-6" 
                  fill="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Unirme al WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll (solo desktop) */}
      <div className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg 
            className="w-6 h-6 text-white/60" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M19 14l-7 7m0 0l-7-7m7 7V3" 
            />
          </svg>
        </div>
      </div>
    </section>
  )
}
