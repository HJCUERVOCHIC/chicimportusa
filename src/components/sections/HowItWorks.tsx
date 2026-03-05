import { WHATSAPP_PHONE } from '@/lib/constants';

const STEPS = [
  {
    num: '01',
    title: 'Elige tu producto',
    desc: 'Selecciona del catálogo o publicaciones activas.',
  },
  {
    num: '02',
    title: 'Escríbenos',
    desc: 'Envía la referencia con talla, color y detalles por WhatsApp.',
  },
  {
    num: '03',
    title: 'Confirmamos',
    desc: 'Precio final, disponibilidad y tiempos de entrega.',
  },
  {
    num: '04',
    title: 'Pago y despacho',
    desc: '50% para separar, 50% al llegar a Colombia.',
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[#0a0a0a] border-t border-white/[0.06] py-16 sm:py-20 px-5 sm:px-6">
      <div className="max-w-[1000px] mx-auto text-center">
        {/* Header */}
        <h2 className="font-display text-[clamp(32px,5vw,48px)] text-white tracking-[0.02em] leading-none mb-12 sm:mb-14">
          ¿CÓMO <span className="text-[#D90429]">FUNCIONA</span>?
        </h2>

        {/* Steps grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {STEPS.map((step) => (
            <div key={step.num} className="text-center">
              {/* Número grande */}
              <span className="font-display text-[56px] text-[#D90429] opacity-30 leading-none block">
                {step.num}
              </span>

              {/* Título */}
              <h3 className="text-[15px] font-bold text-white mt-2 mb-1.5 font-body">
                {step.title}
              </h3>

              {/* Descripción */}
              <p className="text-[13px] text-white/45 leading-relaxed font-body">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Nota */}
        <p className="text-xs text-white/25 mt-12 font-body">
          Los datos de pago se confirman directamente por WhatsApp.
          Solo gestionamos productos publicados como activos.
        </p>
      </div>
    </section>
  );
}
