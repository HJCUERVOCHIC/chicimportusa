import { Card, Button } from '@/components/ui'
import { testimonialsData } from '@/data/drops'

export default function Testimonials() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text">
            Compras reales, proceso real
          </h2>
          <p className="mt-4 text-muted leading-relaxed max-w-2xl mx-auto">
            Comunicación clara, productos verificados y acompañamiento hasta la entrega.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonialsData.map((testimonial) => (
            <Card key={testimonial.id} variant="soft">
              <p className="text-muted leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="font-semibold text-text">{testimonial.name}</p>
                <p className="text-sm text-muted-2">
                  {testimonial.location}
                  {testimonial.product && ` · ${testimonial.product}`}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button variant="secondary" href="/drops-publicados">
            Ver drops publicados
          </Button>
        </div>
      </div>
    </section>
  )
}
