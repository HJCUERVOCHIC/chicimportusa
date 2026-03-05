import type { Metadata } from 'next';
import Link from 'next/link';
import { WHATSAPP_URL } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Cómo funciona | ChicImportUSA',
  description: 'Conoce el proceso de compra de ChicImportUSA. Productos originales importados desde Estados Unidos, gestionados por WhatsApp.',
};

const PASOS = [
  {
    num: '01',
    title: 'Explora el catálogo',
    desc: 'Navega por nuestra selección de productos disponibles. Solo publicamos artículos que podemos conseguir — tenis, ropa, perfumes y accesorios originales importados desde USA.',
  },
  {
    num: '02',
    title: 'Escríbenos por WhatsApp',
    desc: 'Cuando encuentres algo que te interese, envíanos la referencia del producto junto con tu talla, color y cualquier detalle importante. Respondemos todos los días.',
  },
  {
    num: '03',
    title: 'Confirmamos disponibilidad',
    desc: 'Te confirmamos si el producto está disponible, el precio final en pesos colombianos y el tiempo estimado de entrega desde USA hasta Colombia.',
  },
  {
    num: '04',
    title: 'Pago del 50% para separar',
    desc: 'Una vez confirmado el pedido, realizas el pago del 50% para separar el producto. Los datos de pago se comparten directamente por WhatsApp.',
  },
  {
    num: '05',
    title: 'Pago restante al llegar',
    desc: 'El 50% restante se cancela cuando el producto llegue a Colombia, antes del despacho final a tu ciudad.',
  },
];

const FAQS = [
  {
    q: '¿Los productos son originales?',
    a: 'Sí. Todos los productos que publicamos son originales importados directamente desde Estados Unidos. No trabajamos con réplicas ni imitaciones.',
  },
  {
    q: '¿Puedo pedir un producto que no está publicado?',
    a: 'No. Solo gestionamos pedidos de productos que estén en publicaciones activas. Si no ves lo que buscas, espera nuestra próxima publicación o escríbenos para conocer novedades.',
  },
  {
    q: '¿Cuánto demora la entrega?',
    a: 'Los tiempos varían según el producto y la logística de importación. Te damos un estimado al momento de confirmar tu pedido por WhatsApp.',
  },
  {
    q: '¿Se aceptan devoluciones?',
    a: 'Los productos son importados bajo pedido, por lo que no se aceptan devoluciones ni cambios una vez confirmado el pedido. El pago inicial no es reembolsable en caso de cancelación por parte del cliente.',
  },
  {
    q: '¿Hacen envíos a toda Colombia?',
    a: 'Sí, despachamos a todo el país. El costo y método de envío se coordinan directamente por WhatsApp.',
  },
  {
    q: '¿Cómo se realizan los pagos?',
    a: 'Todos los pagos se coordinan directamente por WhatsApp. No procesamos pagos en el sitio web ni publicamos datos de pago.',
  },
];

function IconWhatsApp() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ComoFuncionaPage() {
  return (
    <main>

      {/* ── Hero de sección ────────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white px-4 py-14 sm:px-6 text-center">
        <div className="mx-auto max-w-2xl">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D90429] font-body mb-3">
            Proceso de compra
          </p>
          <h1
            className="font-display uppercase text-[clamp(36px,6vw,64px)] text-gray-900 leading-none tracking-wide"
          >
            Cómo funciona
          </h1>
          <p className="mt-4 text-base text-gray-500 font-body leading-relaxed">
            Trabajamos por publicaciones activas. Si un producto está publicado, puedes pedirlo siguiendo estos pasos.
          </p>
        </div>
      </section>

      {/* ── Pasos ─────────────────────────────────────────── */}
      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-0">
            {PASOS.map((paso, index) => (
              <div key={paso.num} className="flex gap-6 relative">
                {/* Línea vertical conectora */}
                {index < PASOS.length - 1 && (
                  <div className="absolute left-5 top-10 bottom-0 w-px bg-gray-100" aria-hidden="true" />
                )}

                {/* Número */}
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#D90429] flex items-center justify-center z-10">
                  <span className="text-[11px] font-bold text-white font-body">{paso.num}</span>
                </div>

                {/* Contenido */}
                <div className="pb-10 flex-1">
                  <h2 className="text-base font-bold text-gray-900 font-body">{paso.title}</h2>
                  <p className="mt-1.5 text-sm text-gray-500 font-body leading-relaxed">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nota importante ───────────────────────────────── */}
      <section className="bg-gray-50 border-y border-gray-100 px-4 py-10 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-1 self-stretch rounded-full bg-[#D90429]" aria-hidden="true" />
            <div>
              <h2 className="text-sm font-bold text-gray-900 font-body mb-1">Importante</h2>
              <p className="text-sm text-gray-500 font-body leading-relaxed">
                Solo gestionamos pedidos de productos que estén publicados como activos. Si no ves un producto disponible, espera la próxima publicación o escríbenos para conocer novedades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────── */}
      <section className="bg-white px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <h2
            className="font-display uppercase text-[clamp(28px,4vw,40px)] text-gray-900 leading-none tracking-wide mb-10"
          >
            Preguntas frecuentes
          </h2>
          <div className="flex flex-col divide-y divide-gray-100">
            {FAQS.map((faq) => (
              <div key={faq.q} className="py-5">
                <h3 className="text-sm font-bold text-gray-900 font-body mb-1.5">{faq.q}</h3>
                <p className="text-sm text-gray-500 font-body leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="bg-[#111] px-4 py-16 sm:px-6 text-center">
        <div className="mx-auto max-w-xl">
          <h2
            className="font-display uppercase text-[clamp(28px,4vw,42px)] text-white leading-none tracking-wide mb-4"
          >
            ¿Listo para hacer tu pedido?
          </h2>
          <p className="text-sm text-gray-400 font-body mb-8">
            Explora el catálogo, elige tu producto y escríbenos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#D90429] hover:bg-[#b8031f] text-white text-sm font-bold font-body rounded-lg transition-colors"
            >
              Ver catálogo
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-bold font-body rounded-lg transition-colors"
            >
              <IconWhatsApp />
              Escribir por WhatsApp
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
