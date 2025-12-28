import { Card, Button } from '@/components/ui'

const steps = [
  {
    number: '1',
    title: 'Publicamos productos por WhatsApp',
    description: 'Anunciamos productos disponibles con fotos, referencias y precios.',
  },
  {
    number: '2',
    title: 'Eliges de la publicación',
    description: 'Solo puedes pedir lo que está en esa publicación específica.',
  },
  {
    number: '3',
    title: 'Confirmas tu pedido por WhatsApp',
    description: 'Coordinamos tallas, cantidades y detalles de entrega.',
  },
  {
    number: '4',
    title: 'Entregamos en Colombia',
    description: 'Seguimiento completo hasta que recibas tu pedido.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text text-center">
          Cómo funciona
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <Card key={step.number} variant="base">
              <div className="flex items-center gap-3 mb-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white text-sm font-semibold">
                  {step.number}
                </span>
                <h3 className="font-semibold text-text">{step.title}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button isWhatsApp>
            Quiero recibir la próxima publicación
          </Button>
        </div>
      </div>
    </section>
  )
}
