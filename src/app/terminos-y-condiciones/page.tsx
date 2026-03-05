import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Términos y Condiciones | ChicImportUSA',
  description: 'Términos y condiciones de uso del sitio web y proceso de compra de ChicImportUSA.',
};

const SECCIONES = [
  {
    num: '1',
    title: 'Identidad del comercio',
    content: 'Chic Import USA es una marca dedicada a la comercialización de productos importados desde Estados Unidos, incluyendo tenis, ropa y accesorios originales, ofrecidos mediante publicaciones activas y gestionados directamente a través de WhatsApp.',
  },
  {
    num: '2',
    title: 'Alcance del sitio web',
    content: 'El sitio web de Chic Import USA tiene carácter informativo y comercial. Su finalidad es mostrar productos publicados, explicar el proceso de compra y facilitar el contacto con el cliente. Este sitio no procesa pagos en línea ni funciona como tienda electrónica tradicional.',
  },
  {
    num: '3',
    title: 'Disponibilidad de productos',
    content: 'Los productos ofrecidos corresponden únicamente a publicaciones activas. No se reciben solicitudes de productos que no estén publicados. La disponibilidad se confirma al momento del contacto por WhatsApp.',
  },
  {
    num: '4',
    title: 'Proceso de compra',
    list: [
      'Selección del producto publicado.',
      'Contacto por WhatsApp.',
      'Confirmación de disponibilidad, precio y tiempos.',
      'Pago inicial del 50% para separar el producto.',
      'Pago del 50% restante cuando el producto llegue a Colombia, antes del despacho final.',
    ],
    footer: 'Los datos de pago se confirman exclusivamente por WhatsApp.',
  },
  {
    num: '5',
    title: 'Pagos',
    content: 'Chic Import USA no solicita ni publica información de pago en el sitio web. Todos los pagos se coordinan y validan directamente por WhatsApp.',
  },
  {
    num: '6',
    title: 'Tiempos de entrega',
    content: 'Los productos son importados desde Estados Unidos. Los tiempos de entrega son estimados y pueden variar por factores logísticos, aduaneros o externos.',
  },
  {
    num: '7',
    title: 'Cambios, devoluciones y cancelaciones',
    list: [
      'No se aceptan devoluciones ni cambios una vez confirmado el pedido.',
      'El pago inicial no es reembolsable en caso de cancelación por parte del cliente.',
      'En caso de imposibilidad de cumplimiento por parte de Chic Import USA, se evaluará el reembolso correspondiente.',
    ],
    prefix: 'Debido a que los productos son importados bajo pedido:',
  },
  {
    num: '8',
    title: 'Responsabilidad',
    content: 'Chic Import USA se compromete a comercializar productos originales y a mantener comunicación clara durante el proceso. No se hace responsable por retrasos ocasionados por terceros ni por el uso indebido del producto.',
  },
  {
    num: '9',
    title: 'Propiedad intelectual',
    content: 'Todo el contenido del sitio web es propiedad de Chic Import USA o se utiliza con fines comerciales legítimos. Está prohibida su reproducción sin autorización.',
  },
  {
    num: '10',
    title: 'Protección de datos',
    content: 'La información personal suministrada se utiliza únicamente para la gestión de pedidos y atención al cliente, conforme a la Política de Privacidad.',
  },
  {
    num: '11',
    title: 'Modificaciones',
    content: 'Chic Import USA se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entran en vigencia desde su publicación en el sitio web.',
  },
  {
    num: '12',
    title: 'Contacto',
    content: 'Para cualquier consulta relacionada con estos Términos y Condiciones, puedes comunicarte a través del canal oficial de WhatsApp de Chic Import USA.',
  },
];

export default function TerminosYCondicionesPage() {
  return (
    <main className="bg-white min-h-screen">

      {/* ── Encabezado ────────────────────────────────────── */}
      <section className="border-b border-gray-100 px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D90429] font-body mb-3">
            Legal
          </p>
          <h1
            className="font-display uppercase text-[clamp(36px,6vw,56px)] text-gray-900 leading-none tracking-wide"
          >
            Términos y Condiciones
          </h1>
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm text-gray-500 font-body">ChicImportUSA</span>
            <span className="text-gray-200">·</span>
            <span className="text-sm text-gray-400 font-body">Última actualización: 10/01/2026</span>
          </div>
        </div>
      </section>

      {/* ── Contenido ─────────────────────────────────────── */}
      <section className="px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm text-gray-600 font-body leading-relaxed mb-10 pb-10 border-b border-gray-100">
            Bienvenido(a) a Chic Import USA. Al acceder y utilizar este sitio web, así como al realizar una compra a través de nuestros canales oficiales, aceptas los presentes Términos y Condiciones. Te recomendamos leerlos detenidamente antes de realizar cualquier pedido.
          </p>

          <div className="flex flex-col divide-y divide-gray-100">
            {SECCIONES.map((sec) => (
              <div key={sec.num} className="py-7">
                <h2 className="text-sm font-bold text-gray-900 font-body mb-3">
                  <span className="text-[#D90429] mr-2">{sec.num}.</span>
                  {sec.title}
                </h2>
                {'prefix' in sec && sec.prefix && (
                  <p className="text-sm text-gray-500 font-body leading-relaxed mb-2">{sec.prefix}</p>
                )}
                {'list' in sec && sec.list && (
                  <ul className="space-y-1.5 mb-2">
                    {sec.list.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-gray-500 font-body leading-relaxed">
                        <span className="text-[#D90429] flex-shrink-0 mt-0.5">—</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {'content' in sec && sec.content && (
                  <p className="text-sm text-gray-500 font-body leading-relaxed">{sec.content}</p>
                )}
                {'footer' in sec && sec.footer && (
                  <p className="text-sm text-gray-500 font-body leading-relaxed mt-2">{sec.footer}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer legal ──────────────────────────────────── */}
      <section className="border-t border-gray-100 bg-gray-50 px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400 font-body">
            © {new Date().getFullYear()} ChicImportUSA. Todos los derechos reservados.
          </p>
          <Link
            href="/politica-de-privacidad"
            className="text-xs text-gray-400 hover:text-gray-700 font-body transition-colors"
          >
            Política de Privacidad →
          </Link>
        </div>
      </section>

    </main>
  );
}
