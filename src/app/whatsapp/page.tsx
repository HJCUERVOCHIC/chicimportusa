import { Metadata } from 'next'
import { Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Únete al WhatsApp | ChicImportUSA',
  description: 'Recibe las publicaciones de ChicImportUSA directamente por WhatsApp. Te avisamos cuando publiquemos productos disponibles.',
}

export default function WhatsAppPage() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text">
            Recibe las publicaciones de ChicImportUSA por WhatsApp
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted">
            Te avisamos cuando publiquemos productos disponibles.
            Recibirás fotos, referencias, precios y fecha de cierre.
          </p>

          <div className="mt-10">
            <Button isWhatsApp size="large" className="text-lg px-8 py-5">
              Unirme al WhatsApp
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-2">
            Solo publicaciones y actualizaciones importantes. Cero spam.
          </p>
        </div>
      </div>
    </section>
  )
}
