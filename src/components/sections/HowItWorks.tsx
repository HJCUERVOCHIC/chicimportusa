// ============================================================
// ChicImportUSA — HowItWorks · Simplificado · Nieve Activa
// ============================================================

const STEPS = [
  { num: '01', title: 'Elige',      desc: 'Selecciona del catálogo o publicaciones activas.' },
  { num: '02', title: 'Escríbenos', desc: 'Envía la referencia con talla y detalles por WhatsApp.' },
  { num: '03', title: 'Confirmamos', desc: 'Precio final, disponibilidad y tiempo de entrega.' },
  { num: '04', title: 'Despachamos', desc: '50% para separar, 50% al llegar a Colombia.' },
];

export default function HowItWorks() {
  return (
    <section className="bg-gray-50 border-t border-gray-100 py-14 sm:py-16 px-5 sm:px-6">
      <div className="max-w-[1000px] mx-auto">

        <div className="flex items-center gap-4 mb-10">
          <h2 className="font-display text-[clamp(24px,3.5vw,36px)] text-[#111] tracking-[0.02em] leading-none">
            ¿CÓMO <span className="text-[#D90429]">FUNCIONA</span>?
          </h2>
          <div className="flex-1 h-px bg-gray-200" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STEPS.map((step, idx) => (
            <div key={step.num} className="relative">
              {/* Conector línea — solo desktop, no en el último */}
              {idx < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-4 left-full w-full h-px bg-gray-200 z-0" style={{ width: 'calc(100% - 2rem)', left: '2.5rem' }} aria-hidden="true" />
              )}

              <div className="relative z-10">
                {/* Número */}
                <div className="w-9 h-9 rounded-full bg-[#D90429] flex items-center justify-center mb-3">
                  <span className="text-xs font-bold text-white font-body">{step.num}</span>
                </div>

                {/* Título */}
                <h3 className="text-sm font-bold text-gray-900 mb-1.5 font-body">
                  {step.title}
                </h3>

                {/* Descripción */}
                <p className="text-[13px] text-gray-500 leading-relaxed font-body">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-gray-400 mt-10 font-body">
          Los datos de pago se confirman directamente por WhatsApp.
          Solo gestionamos productos publicados como activos.
        </p>
      </div>
    </section>
  );
}
