'use client'

import Link from 'next/link'

const WHATSAPP_URL = 'https://wa.me/573150619888'

const pasos = [
  {
    numero: 1,
    titulo: 'Elige tu producto',
    texto: 'Selecciona el producto publicado en el catálogo o en nuestras publicaciones activas.',
    link: null,
    nota: null,
  },
  {
    numero: 2,
    titulo: 'Escríbenos por WhatsApp',
    texto: 'Envíanos el enlace o referencia del producto junto con tus datos: talla, color y cualquier detalle importante.',
    link: WHATSAPP_URL,
    nota: null,
  },
  {
    numero: 3,
    titulo: 'Confirmación',
    texto: 'Te confirmamos disponibilidad, precio final y tiempos estimados de entrega.',
    link: null,
    nota: null,
  },
  {
    numero: 4,
    titulo: 'Pago del 50% para separar',
    texto: 'Una vez confirmado el pedido, realizas el pago del 50% para separar el producto.',
    link: null,
    nota: 'Los datos de pago se confirman directamente por WhatsApp.',
  },
  {
    numero: 5,
    titulo: 'Pago restante al llegar',
    texto: 'El 50% restante se paga cuando el producto llegue a Colombia, antes del despacho final.',
    link: null,
    nota: null,
  },
]

export default function ProcesoCompra() {
  const scrollToPublicaciones = () => {
    const section = document.getElementById('publicaciones-preview')
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.href = '/publicaciones'
    }
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900">
            Proceso de compra
          </h2>
          <p className="mt-4 text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Trabajamos por publicaciones activas. Si un producto está publicado, puedes pedirlo siguiendo estos pasos.
          </p>
        </div>

        {/* Timeline - Mobile: Vertical / Desktop: Horizontal */}
        
        {/* Mobile Timeline (vertical) */}
        <div className="md:hidden space-y-0">
          {pasos.map((paso, index) => (
            <div key={paso.numero} className="relative pl-12">
              {/* Línea vertical */}
              {index < pasos.length - 1 && (
                <div className="absolute left-[18px] top-10 w-0.5 h-[calc(100%-8px)] bg-gray-200" />
              )}
              
              {/* Badge número */}
              <div className="absolute left-0 top-0 w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold">
                {paso.numero}
              </div>
              
              {/* Contenido */}
              <div className="pb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {paso.titulo}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {paso.texto}
                </p>
                {paso.link && (
                  <a
                    href={paso.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-[#25D366] hover:text-[#20BD5A] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Abrir WhatsApp
                  </a>
                )}
                {paso.nota && (
                  <p className="mt-2 text-xs text-gray-500 italic">
                    {paso.nota}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Desktop Timeline (horizontal grid) */}
        <div className="hidden md:grid md:grid-cols-5 gap-6 lg:gap-8">
          {pasos.map((paso, index) => (
            <div key={paso.numero} className="relative">
              {/* Línea horizontal conectora */}
              {index < pasos.length - 1 && (
                <div className="absolute top-[18px] left-[calc(50%+18px)] w-[calc(100%-18px)] h-0.5 bg-gray-200" />
              )}
              
              {/* Badge número */}
              <div className="relative z-10 mx-auto w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold mb-4">
                {paso.numero}
              </div>
              
              {/* Contenido */}
              <div className="text-center">
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">
                  {paso.titulo}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {paso.texto}
                </p>
                {paso.link && (
                  <a
                    href={paso.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm font-medium text-[#25D366] hover:text-[#20BD5A] transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    Abrir WhatsApp
                  </a>
                )}
                {paso.nota && (
                  <p className="mt-2 text-xs text-gray-500 italic">
                    {paso.nota}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Nota importante */}
        <div className="mt-12 md:mt-16 bg-white border border-gray-200 rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-base font-semibold text-gray-900 mb-2">
                Importante
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                Solo gestionamos pedidos de productos que estén publicados como activos. Si no ves un producto disponible, espera la próxima publicación o escríbenos para conocer novedades.
              </p>
            </div>
          </div>
        </div>

        {/* CTAs de cierre */}
        <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={scrollToPublicaciones}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#D90429] hover:bg-[#B50321] text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Ver publicaciones activas
          </button>
          
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 font-semibold rounded-lg transition-colors"
          >
            <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
