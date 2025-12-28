'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-semibold text-text mb-4">
          ¡Ups! Algo salió mal
        </h1>
        <p className="text-muted mb-8">
          Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={reset} variant="primary">
            Intentar de nuevo
          </Button>
          <Button href="/" variant="secondary">
            Volver al inicio
          </Button>
        </div>
      </div>
    </div>
  )
}
