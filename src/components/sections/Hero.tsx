import { Button } from '@/components/ui'

export default function Hero() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          {/* H1 */}
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text">
            Moda original desde USA, por WhatsApp
          </h1>

          {/* Subtítulo */}
          <p className="mt-6 text-lg md:text-xl leading-relaxed text-muted">
            Publicamos productos disponibles de forma periódica.{' '}
            <strong className="text-text font-semibold">
              Solo se pueden pedir los productos anunciados en cada publicación.
            </strong>
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Button isWhatsApp size="large">
              Unirme al WhatsApp
            </Button>
            <Button variant="secondary" href="/como-funciona" size="large">
              Ver cómo funciona
            </Button>
          </div>

          {/* Nota visible */}
          <p className="mt-8 text-sm text-muted-2">
            No manejamos stock permanente. No buscamos productos personalizados.
          </p>
        </div>
      </div>
    </section>
  )
}
