import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Política de Privacidad | ChicImportUSA',
  description: 'Política de privacidad de ChicImportUSA. Información sobre recopilación, uso y protección de datos personales.',
};

const SECCIONES = [
  {
    num: '1',
    title: 'Información recopilada',
    intro: 'Podemos recopilar información como:',
    list: [
      'Nombre',
      'Número de contacto (WhatsApp)',
      'Información del pedido (producto, talla, color)',
      'Comprobantes de pago enviados voluntariamente',
      'Comunicaciones realizadas por WhatsApp',
    ],
    footer: 'No recopilamos información financiera directamente desde el sitio web.',
  },
  {
    num: '2',
    title: 'Uso de la información',
    intro: 'La información personal se utiliza únicamente para:',
    list: [
      'Gestionar pedidos',
      'Confirmar pagos y entregas',
      'Brindar atención al cliente',
      'Comunicación relacionada con compras',
    ],
  },
  {
    num: '3',
    title: 'Protección de la información',
    content: 'Implementamos medidas razonables para proteger la información personal y limitar su acceso únicamente a fines operativos del negocio.',
  },
  {
    num: '4',
    title: 'Compartición de datos',
    content: 'Chic Import USA no vende ni comparte información personal con terceros, salvo cuando sea necesario para cumplir procesos logísticos o requerimientos legales.',
  },
  {
    num: '5',
    title: 'Derechos del usuario',
    content: 'El usuario puede solicitar acceso, corrección o eliminación de sus datos personales cuando sea legalmente posible, contactándonos por WhatsApp.',
  },
  {
    num: '6',
    title: 'Uso de cookies',
    content: 'El sitio puede utilizar cookies técnicas básicas para mejorar la experiencia de navegación. No se utilizan cookies con fines publicitarios avanzados.',
  },
  {
    num: '7',
    title: 'Cambios en la política',
    content: 'Esta política puede ser modificada en cualquier momento. Las actualizaciones entran en vigencia desde su publicación en el sitio web.',
  },
  {
    num: '8',
    title: 'Contacto',
    content: 'Para consultas relacionadas con esta Política de Privacidad, puedes comunicarte a través del canal oficial de WhatsApp de Chic Import USA.',
  },
];

export default function PoliticaDePrivacidadPage() {
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
            Política de Privacidad
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
            En Chic Import USA respetamos y protegemos la privacidad de nuestros clientes. Esta política describe cómo recopilamos, usamos y protegemos la información personal.
          </p>

          <div className="flex flex-col divide-y divide-gray-100">
            {SECCIONES.map((sec) => (
              <div key={sec.num} className="py-7">
                <h2 className="text-sm font-bold text-gray-900 font-body mb-3">
                  <span className="text-[#D90429] mr-2">{sec.num}.</span>
                  {sec.title}
                </h2>
                {'intro' in sec && sec.intro && (
                  <p className="text-sm text-gray-500 font-body leading-relaxed mb-2">{sec.intro}</p>
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
            href="/terminos-y-condiciones"
            className="text-xs text-gray-400 hover:text-gray-700 font-body transition-colors"
          >
            Términos y Condiciones →
          </Link>
        </div>
      </section>

    </main>
  );
}
