import { CheckCircle } from 'lucide-react'

const rules = [
  'Solo gestionamos productos de la publicación vigente',
  'No buscamos referencias personalizadas ni por encargo',
  'No manejamos stock permanente',
  'Acompañamos todo el proceso hasta la entrega',
  'Precios y tiempos claros desde el inicio',
  'Comunicación directa y transparente por WhatsApp',
]

export default function Rules() {
  return (
    <section className="py-16 md:py-24 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Contenedor centrado */}
        <div className="max-w-3xl mx-auto">
          {/* Título */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text tracking-tight text-center">
            Proceso claro y transparente
          </h2>

          {/* Subtítulo */}
          <p className="mt-4 md:mt-5 text-base md:text-lg text-muted text-center leading-relaxed">
            Queremos que sepas exactamente cómo trabajamos antes de hacer tu primer pedido.
          </p>

          {/* Lista de reglas */}
          <ul className="mt-10 md:mt-12 space-y-4">
            {rules.map((rule, index) => (
              <li
                key={index}
                className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100"
              >
                <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-base text-text leading-relaxed">{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
