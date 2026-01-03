import { Button } from '@/components/ui'

export default function FinalCTA() {
  return (
    <section className="py-16 md:py-24 bg-text">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        {/* Título */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white tracking-tight">
          ¿Listo para recibir las próximas publicaciones?
        </h2>

        {/* Subtítulo */}
        <p className="mt-4 md:mt-5 text-base md:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed">
          Únete a nuestro canal de WhatsApp y recibe notificaciones cuando publiquemos nuevos tenis, ropa y accesorios disponibles.
        </p>

        {/* CTA */}
        <div className="mt-8">
          <Button isWhatsApp size="large">
            Unirme al WhatsApp
          </Button>
        </div>

        {/* Microtexto */}
        <p className="mt-6 text-sm text-white/60">
          Solo publicaciones y actualizaciones importantes. Cero spam.
        </p>
      </div>
    </section>
  )
}
