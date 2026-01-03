import { Metadata } from 'next'
import { Card, Button } from '@/components/ui'
import { FinalCTA } from '@/components/sections'

export const metadata: Metadata = {
  title: 'Cómo funciona | ChicImportUSA',
  description: 'Conoce cómo funcionan las publicaciones de ChicImportUSA. Solo gestionamos pedidos de productos publicados en cada publicación.',
}

const steps = [
  {
    number: '1',
    title: 'Publicación disponible',
    description: 'Publicamos por WhatsApp los productos disponibles: tenis, ropa y accesorios con fotos, referencias, precios y fecha de cierre.',
  },
  {
    number: '2',
    title: 'Selección del producto',
    description: 'Revisas la publicación y eliges lo que te interesa. Solo puedes pedir productos de la publicación vigente.',
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
  'Publicar tenis, ropa y accesorios disponibles periódicamente',
  'Confirmar pedidos por WhatsApp',
  'Acompañar todo el proceso de compra',
  'Transparencia total en cada paso',
]

const dontList = [
  'No buscamos productos personalizados ni por encargo',
  'No recibimos listas para conseguir referencias',
  'No manejamos stock permanente',
]

const faqs = [
  {
    question: '¿Puedo pedir algo que no esté en la publicación?',
    answer: 'No. Solo gestionamos pedidos de productos disponibles en cada publicación.',
  },
  {
    question: '¿Cada cuánto hay publicaciones?',
    answer: 'De forma periódica. Todas las publicaciones se anuncian por WhatsApp.',
  },
  {
    question: '¿Los productos se agotan?',
    answer: 'Sí. Las publicaciones tienen cupos limitados y fecha de cierre.',
  },
  {
    question: '¿Qué tipo de productos publican?',
    answer: 'Tenis deportivos y casuales, ropa casual y deportiva, y accesorios de marca importados desde Estados Unidos.',
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
            ChicImportUSA funciona por publicaciones periódicas.{' '}
            <strong className="text-text font-semibold">
              Solo se gestionan pedidos de productos disponibles en la publicación vigente.
            </strong>{' '}
            No buscamos referencias por encargo.
          </p>
        </div>
      </section>

      {/* Pasos */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
            Proceso paso a paso
          </h2>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <Card key={step.number} className="p-6">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent text-white text-lg font-semibold">
                  {step.number}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-text">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Lo que hacemos / No hacemos */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Lo que hacemos */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
                Lo que hacemos
              </h2>
              <ul className="mt-6 space-y-3">
                {doList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                    </span>
                    <span className="text-base text-muted leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Lo que NO hacemos */}
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
                Lo que NO hacemos
              </h2>
              <ul className="mt-6 space-y-3">
                {dontList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-red-100 flex items-center justify-center">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                    </span>
                    <span className="text-base text-muted leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
            Preguntas frecuentes
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="text-base font-semibold text-text">
                  {faq.question}
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {faq.answer}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
            ¿Tienes más preguntas?
          </h2>
          <p className="mt-4 text-lg text-muted">
            Escríbenos directamente por WhatsApp y te respondemos.
          </p>
          <div className="mt-8">
            <Button isWhatsApp size="large">
              Escribir por WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <FinalCTA />
    </>
  )
}
