import { Metadata } from 'next'
import { Card, Button } from '@/components/ui'
import { FinalCTA } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Cómo funciona | ChicImportUSA',
  description: 'Conoce cómo funcionan los drops de ChicImportUSA. Solo gestionamos pedidos de productos publicados en cada drop.',
}

const steps = [
  {
    number: '1',
    title: 'Drop publicado',
    description: 'Publicamos por WhatsApp los productos disponibles con fotos, referencias, precios y fecha de cierre del drop.',
  },
  {
    number: '2',
    title: 'Selección del producto',
    description: 'Revisas el drop y eliges lo que te interesa. Solo puedes pedir productos que estén en el drop vigente.',
  },
  {
    number: '3',
    title: 'Confirmación del pedido',
    description: 'Nos escribes por WhatsApp con tu selección. Coordinamos tallas, cantidades y forma de pago.',
  },
  {
    number: '4',
    title: 'Entrega en Colombia',
    description: 'Te mantenemos informado del proceso. Entregamos a nivel nacional con seguimiento completo.',
  },
]

const doList = [
  'Publicar drops con productos disponibles',
  'Confirmar pedidos por WhatsApp',
  'Acompañar todo el proceso de compra',
  'Transparencia total en cada paso',
]

const dontList = [
  'No buscamos productos personalizados',
  'No recibimos listas para conseguir referencias',
  'No manejamos stock permanente',
]

const faqs = [
  {
    question: '¿Puedo pedir algo que no esté en el drop?',
    answer: 'No. Solo gestionamos pedidos de productos publicados en cada drop.',
  },
  {
    question: '¿Cada cuánto hay drops?',
    answer: 'De forma periódica. Todos los drops se anuncian por WhatsApp.',
  },
  {
    question: '¿Los productos se agotan?',
    answer: 'Sí. Los drops tienen cupos limitados y fecha de cierre.',
  },
]

export default function ComoFuncionaPage() {
  return (
    <>
      {/* Header de página */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-text">
            Cómo comprar en ChicImportUSA
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted max-w-3xl">
            ChicImportUSA funciona por drops.{' '}
            <strong className="text-text font-semibold">
              Solo se gestionan pedidos de productos publicados en el drop vigente.
            </strong>
          </p>
        </div>
      </section>

      {/* Pasos detallados */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {steps.map((step) => (
              <Card key={step.number} variant="base">
                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white font-semibold">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-text">{step.title}</h3>
                    <p className="mt-2 text-muted leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button isWhatsApp>
              Unirme al WhatsApp
            </Button>
          </div>
        </div>
      </section>

      {/* Sí / No hacemos */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Sí hacemos */}
            <Card variant="base">
              <h3 className="text-xl font-semibold text-text mb-4">Sí hacemos</h3>
              <ul className="space-y-3">
                {doList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 text-accent">✓</span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* No hacemos */}
            <Card variant="soft">
              <h3 className="text-xl font-semibold text-text mb-4">No hacemos</h3>
              <ul className="space-y-3">
                {dontList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 text-muted-2">✗</span>
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text text-center mb-10">
            Preguntas frecuentes
          </h2>

          <div className="max-w-2xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} variant="base">
                <h3 className="font-semibold text-text">{faq.question}</h3>
                <p className="mt-2 text-muted leading-relaxed">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <FinalCTA />
    </>
  )
}
