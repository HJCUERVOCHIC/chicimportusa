import { Button } from '@/components/ui'

export default function FinalCTA() {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
          ¿Quieres recibir el próximo drop?
        </h2>

        <div className="mt-8">
          <Button isWhatsApp size="large">
            Unirme al WhatsApp
          </Button>
        </div>

        <p className="mt-6 text-sm text-muted-2">
          Solo drops y actualizaciones importantes. Cero spam.
        </p>
      </div>
    </section>
  )
}
