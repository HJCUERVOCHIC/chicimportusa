const rules = [
  { type: 'yes', text: 'Solo productos publicados en cada drop' },
  { type: 'yes', text: 'Drops con cupos y fecha de cierre' },
  { type: 'no', text: 'No búsquedas personalizadas' },
  { type: 'no', text: 'No stock permanente' },
]

export default function Rules() {
  return (
    <section className="py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-text text-center">
          Reglas claras
        </h2>

        <div className="mt-10 max-w-2xl mx-auto">
          <div className="grid gap-4 md:grid-cols-2">
            {rules.map((rule, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-4 rounded-lg border border-border bg-white"
              >
                <span className="flex-shrink-0 text-lg">
                  {rule.type === 'yes' ? '✅' : '❌'}
                </span>
                <p className="text-muted leading-relaxed">{rule.text}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 text-center text-muted leading-relaxed">
            Este modelo nos permite mantener precios justos, control del proceso y total transparencia.
          </p>
        </div>
      </div>
    </section>
  )
}
