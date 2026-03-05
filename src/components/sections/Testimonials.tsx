const TESTIMONIALS = [
  {
    name: 'María C.',
    initial: 'M',
    text: 'Excelente servicio, mis tenis llegaron perfectos y originales. Proceso super claro.',
    rating: 5,
  },
  {
    name: 'Andrés R.',
    initial: 'A',
    text: 'Ya he comprado 3 veces. Los precios son buenos y el proceso por WhatsApp es muy fácil.',
    rating: 5,
  },
  {
    name: 'Laura G.',
    initial: 'L',
    text: 'Me encantó mi bolso Coach. Llegó justo como en la foto. Totalmente recomendado.',
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg
          key={i}
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill="#F59E0B"
          aria-hidden="true"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-[#0f0f0f] py-16 sm:py-20 px-5 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="text-[11px] font-bold text-[#D90429] tracking-[0.2em] font-body uppercase">
            Clientes satisfechos
          </span>
          <h2 className="font-display text-[clamp(28px,4vw,42px)] text-white tracking-[0.02em] leading-none mt-2">
            EXPERIENCIAS <span className="text-[#D90429]">REALES</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TESTIMONIALS.map((t, idx) => (
            <div
              key={idx}
              className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-6 sm:p-7"
            >
              <Stars count={t.rating} />

              <p className="text-[15px] text-white/80 leading-[1.7] mt-4 mb-5 font-body italic">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#D90429] flex items-center justify-center text-sm font-bold text-white font-body">
                  {t.initial}
                </div>
                <span className="text-sm font-semibold text-white font-body">
                  {t.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
