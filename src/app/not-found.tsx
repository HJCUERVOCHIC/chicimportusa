import { Metadata } from 'next'
import { Button } from '@/components/ui'

export const metadata: Metadata = {
  title: 'Página no encontrada',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl font-bold text-accent mb-4">404</p>
        <h1 className="text-2xl font-semibold text-text mb-4">
          Página no encontrada
        </h1>
        <p className="text-muted mb-8">
          La página que buscas no existe o ha sido movida.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button href="/" variant="primary">
            Volver al inicio
          </Button>
          <Button isWhatsApp variant="secondary">
            Contactar por WhatsApp
          </Button>
        </div>
      </div>
    </div>
  )
}
