import { Metadata } from 'next'
import { Button, Badge, ProductCard } from '@/components/ui'
import { dropsData } from '@/data/drops'
import { FinalCTA } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Drops publicados | ChicImportUSA',
  description: 'Historial de drops publicados por ChicImportUSA. Este listado es referencial.',
}

export default function DropsPublicadosPage() {
  return (
    <>
      {/* Header de página */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text">
            Drops publicados
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted max-w-3xl">
            Este listado es referencial. Si el drop está cerrado, esos productos ya no están disponibles.
          </p>
          <div className="mt-6">
            <Button isWhatsApp>
              Unirme al WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Listado de drops */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6 space-y-12">
          {dropsData.drops.map((drop) => (
            <div key={drop.id} className="space-y-6">
              {/* Header del drop */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-4 border-b border-border">
                <div>
                  <h2 className="text-2xl font-semibold text-text">{drop.title}</h2>
                  <p className="text-sm text-muted mt-1">
                    Publicado: {new Date(drop.date).toLocaleDateString('es-CO', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                </div>
                <Badge className="self-start sm:self-auto">
                  {drop.status === 'closed' ? 'Cerrado' : 'Activo'}
                </Badge>
              </div>

              {/* Grid de productos */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {drop.products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <FinalCTA />
    </>
  )
}
