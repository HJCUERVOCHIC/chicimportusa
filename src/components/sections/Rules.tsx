const rules = [
  'Solo productos de cada publicación',
  'Publicaciones con cupos y fecha de cierre',
  'No búsquedas personalizadas',
  'No stock permanente',
]

export default function Rules() {
  return (
    <section className="py-16 md:py-24 bg-[#F7F7F7]">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Título alineado a la izquierda */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-text tracking-tight">
          Proceso claro y transparente
        </h2>

        {/* Texto introductorio */}
        <p className="mt-4 md:mt-5 text-base md:text-lg text-muted leading-relaxed max-w-2xl">
          Trabajamos con un modelo simple que nos permite ofrecer productos originales 
          a precios justos, manteniendo el control del proceso de principio a fin.
        </p>

        {/* Línea divisoria sutil */}
        <div className="mt-8 md:mt-10 border-t border-gray-200" />

        {/* Lista de reglas - vertical simple */}
        <ul className="mt-8 md:mt-10 space-y-4 md:space-y-5">
          {rules.map((rule, index) => (
            <li 
              key={index}
              className="flex items-start gap-4"
            >
              {/* Marcador sutil - línea vertical */}
              <span 
                className="flex-shrink-0 w-0.5 h-6 mt-0.5 bg-gray-300 rounded-full" 
                aria-hidden="true"
              />
              <span className="text-base md:text-lg text-text leading-relaxed">
                {rule}
              </span>
            </li>
          ))}
        </ul>

        {/* Microtexto final */}
        <p className="mt-10 md:mt-12 text-sm text-muted-2 leading-relaxed max-w-xl">
          Este modelo nos permite mantener precios justos, control del proceso y total transparencia.
        </p>
      </div>
    </section>
  )
}
