import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui'

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Imagen de fondo */}
      <Image
        src="/img/hero-tenis.jpg"
        alt="Tenis importados desde Estados Unidos"
        fill
        priority
        className="object-cover object-bottom"
        sizes="100vw"
        quality={85}
      />

      {/* Overlay sutil */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />

      {/* Contenido */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
        {/* H1 Principal */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          Tenis importados desde Estados Unidos
        </h1>

        {/* Subtítulo */}
        <p className="mt-4 md:mt-6 text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Ropa, accesorios y vitaminas disponibles según publicación.
        </p>

        {/* Microtexto */}
        <p className="mt-3 md:mt-4 text-sm text-white/70">
          Productos seleccionados. Sin stock permanente. Proceso claro desde el inicio.
        </p>

        {/* CTA */}
        <div className="mt-8 md:mt-10">
          <Button isWhatsApp size="large">
            Unirme al WhatsApp
          </Button>
          
          {/* Aviso legal */}
          <p className="mt-3 text-xs text-white/60 max-w-md mx-auto">
            Al continuar a WhatsApp, aceptas nuestros{' '}
            <Link 
              href="/terminos-y-condiciones" 
              className="underline hover:text-white/80 transition-colors"
            >
              Términos y Condiciones
            </Link>
            {' '}y{' '}
            <Link 
              href="/politica-de-privacidad" 
              className="underline hover:text-white/80 transition-colors"
            >
              Política de Privacidad
            </Link>.
          </p>
        </div>
      </div>
    </section>
  )
}
