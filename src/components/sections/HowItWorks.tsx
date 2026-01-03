const steps = [
  {
    number: '01',
    title: 'Publicamos productos disponibles',
    description:
      'Compartimos por WhatsApp las referencias de tenis, ropa y accesorios disponibles con precios y fecha de cierre.',
  },
  {
    number: '02',
    title: 'Seleccionas dentro de la publicación',
    description: 'Eliges los productos que te interesan entre las opciones publicadas.',
  },
  {
    number: '03',
    title: 'Nos escribes por WhatsApp',
    description: 'Confirmamos contigo la información necesaria y resolvemos tus dudas.',
  },
  {
    number: '04',
    title: 'Te acompañamos hasta la entrega',
    description: 'Seguimos el proceso contigo hasta que recibas tu pedido en Colombia.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-16 md:py-24 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Título */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text tracking-tight text-center">
          ¿Cómo funciona ChicImportUSA?
        </h2>

        {/* Texto introductorio */}
        <p className="mt-5 md:mt-6 text-base md:text-lg text-muted text-center max-w-2xl mx-auto leading-relaxed">
          ChicImportUSA funciona a través de publicaciones periódicas de tenis, ropa casual, deportiva y accesorios disponibles. 
          Cada publicación incluye referencias específicas que pueden solicitarse durante un tiempo determinado.
        </p>

        {/* Grid de pasos */}
        <div className="mt-12 md:mt-16 grid gap-5 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="group relative p-6 md:p-7 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200"
            >
              {/* Número grande */}
              <span className="block text-4xl md:text-5xl font-bold text-gray-200 mb-4">
                {step.number}
              </span>

              {/* Título del paso */}
              <h3 className="text-lg font-semibold text-text leading-snug">
                {step.title}
              </h3>

              {/* Descripción */}
              <p className="mt-2 text-sm text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Microtexto final */}
        <p className="mt-10 md:mt-12 text-sm text-muted-2 text-center">
          Todo el proceso es claro desde el inicio y se gestiona directamente por WhatsApp.
        </p>
      </div>
    </section>
  )
}
