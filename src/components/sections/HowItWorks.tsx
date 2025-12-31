const steps = [
  {
    number: 1,
    title: 'Publicamos tenis disponibles',
    description: 'Mostramos las referencias que están disponibles en cada publicación.',
  },
  {
    number: 2,
    title: 'Seleccionas dentro de la publicación',
    description: 'Eliges los tenis que te interesan entre las opciones publicadas.',
  },
  {
    number: 3,
    title: 'Nos escribes por WhatsApp',
    description: 'Confirmamos contigo la información necesaria y resolvemos tus dudas.',
  },
  {
    number: 4,
    title: 'Te acompañamos hasta la entrega',
    description: 'Seguimos el proceso contigo hasta que recibas tus tenis en Colombia.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Título */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-text tracking-tight text-center">
          ¿Cómo funciona ChicImportUSA?
        </h2>

        {/* Texto introductorio */}
        <p className="mt-4 md:mt-6 text-base md:text-lg text-muted text-center max-w-3xl mx-auto leading-relaxed">
          ChicImportUSA funciona a través de publicaciones periódicas de tenis deportivos y casuales disponibles. 
          Cada publicación incluye referencias específicas que pueden solicitarse durante un tiempo determinado.
        </p>

        {/* Grid de pasos */}
        <div className="mt-10 md:mt-14 grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative p-5 md:p-6 bg-gray-50 rounded-xl border border-border"
            >
              {/* Número */}
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-white text-sm font-semibold mb-4">
                {step.number}
              </span>

              {/* Título del paso */}
              <h3 className="text-lg font-semibold text-text">
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
        <p className="mt-8 md:mt-10 text-sm text-muted-2 text-center">
          Todo el proceso es claro desde el inicio y se gestiona directamente por WhatsApp.
        </p>
      </div>
    </section>
  )
}
