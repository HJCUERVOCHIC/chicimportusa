import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Chic Import USA',
  description: 'Política de privacidad de Chic Import USA. Información sobre recopilación, uso y protección de datos personales.',
}

export default function PoliticaDePrivacidadPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-10 md:p-12">
          {/* Encabezado */}
          <header className="mb-10 pb-8 border-b border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Política de Privacidad
            </h1>
            <p className="text-lg text-gray-600">Chic Import USA</p>
            <p className="mt-4 text-sm text-gray-500">
              Última actualización: 10/01/2026
            </p>
          </header>

          {/* Contenido */}
          <div className="prose prose-gray max-w-none space-y-8">
            <p className="text-gray-700 leading-relaxed">
              En Chic Import USA respetamos y protegemos la privacidad de nuestros clientes. Esta política describe cómo recopilamos, usamos y protegemos la información personal.
            </p>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">1. Información recopilada</h2>
              <p className="text-gray-700 leading-relaxed">
                Podemos recopilar información como:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                <li>Nombre</li>
                <li>Número de contacto (WhatsApp)</li>
                <li>Información del pedido (producto, talla, color)</li>
                <li>Comprobantes de pago enviados voluntariamente</li>
                <li>Comunicaciones realizadas por WhatsApp</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                No recopilamos información financiera directamente desde el sitio web.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">2. Uso de la información</h2>
              <p className="text-gray-700 leading-relaxed">
                La información personal se utiliza únicamente para:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                <li>Gestionar pedidos</li>
                <li>Confirmar pagos y entregas</li>
                <li>Brindar atención al cliente</li>
                <li>Comunicación relacionada con compras</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">3. Protección de la información</h2>
              <p className="text-gray-700 leading-relaxed">
                Implementamos medidas razonables para proteger la información personal y limitar su acceso únicamente a fines operativos del negocio.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">4. Compartición de datos</h2>
              <p className="text-gray-700 leading-relaxed">
                Chic Import USA no vende ni comparte información personal con terceros, salvo cuando sea necesario para cumplir procesos logísticos o requerimientos legales.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">5. Derechos del usuario</h2>
              <p className="text-gray-700 leading-relaxed">
                El usuario puede solicitar acceso, corrección o eliminación de sus datos personales cuando sea legalmente posible, contactándonos por WhatsApp.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">6. Uso de cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                El sitio puede utilizar cookies técnicas básicas para mejorar la experiencia de navegación. No se utilizan cookies con fines publicitarios avanzados.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">7. Cambios en la política</h2>
              <p className="text-gray-700 leading-relaxed">
                Esta política puede ser modificada en cualquier momento. Las actualizaciones entran en vigencia desde su publicación en el sitio web.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">8. Contacto</h2>
              <p className="text-gray-700 leading-relaxed">
                Para consultas relacionadas con esta Política de Privacidad, puedes comunicarte a través del canal oficial de WhatsApp de Chic Import USA.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  )
}
