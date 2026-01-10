import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Chic Import USA',
  description: 'Términos y condiciones de uso del sitio web y proceso de compra de Chic Import USA. Información sobre pedidos, pagos, entregas y políticas.',
}

export default function TerminosYCondicionesPage() {
  return (
    <main className="bg-gray-50 min-h-screen">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-10 md:p-12">
          {/* Encabezado */}
          <header className="mb-10 pb-8 border-b border-gray-200">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Términos y Condiciones
            </h1>
            <p className="text-lg text-gray-600">Chic Import USA</p>
            <p className="mt-4 text-sm text-gray-500">
              Última actualización: 10/01/2026
            </p>
          </header>

          {/* Contenido */}
          <div className="prose prose-gray max-w-none space-y-8">
            <p className="text-gray-700 leading-relaxed">
              Bienvenido(a) a Chic Import USA. Al acceder y utilizar este sitio web, así como al realizar una compra a través de nuestros canales oficiales, aceptas los presentes Términos y Condiciones. Te recomendamos leerlos detenidamente antes de realizar cualquier pedido.
            </p>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">1. Identidad del comercio</h2>
              <p className="text-gray-700 leading-relaxed">
                Chic Import USA es una marca dedicada a la comercialización de productos importados desde Estados Unidos, incluyendo tenis, ropa y accesorios originales, ofrecidos mediante publicaciones activas y gestionados directamente a través de WhatsApp.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">2. Alcance del sitio web</h2>
              <p className="text-gray-700 leading-relaxed">
                El sitio web de Chic Import USA tiene carácter informativo y comercial. Su finalidad es mostrar productos publicados, explicar el proceso de compra y facilitar el contacto con el cliente. Este sitio no procesa pagos en línea ni funciona como tienda electrónica tradicional.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">3. Disponibilidad de productos</h2>
              <p className="text-gray-700 leading-relaxed">
                Los productos ofrecidos corresponden únicamente a publicaciones activas. No se reciben solicitudes de productos que no estén publicados. La disponibilidad se confirma al momento del contacto por WhatsApp.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">4. Proceso de compra</h2>
              <p className="text-gray-700 leading-relaxed">
                El proceso de compra se realiza de la siguiente manera:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                <li>Selección del producto publicado.</li>
                <li>Contacto por WhatsApp.</li>
                <li>Confirmación de disponibilidad, precio y tiempos.</li>
                <li>Pago inicial del 50% para separar el producto.</li>
                <li>Pago del 50% restante cuando el producto llegue a Colombia, antes del despacho final.</li>
              </ul>
              <p className="text-gray-700 leading-relaxed">
                Los datos de pago se confirman exclusivamente por WhatsApp.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">5. Pagos</h2>
              <p className="text-gray-700 leading-relaxed">
                Chic Import USA no solicita ni publica información de pago en el sitio web. Todos los pagos se coordinan y validan directamente por WhatsApp.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">6. Tiempos de entrega</h2>
              <p className="text-gray-700 leading-relaxed">
                Los productos son importados desde Estados Unidos. Los tiempos de entrega son estimados y pueden variar por factores logísticos, aduaneros o externos.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">7. Cambios, devoluciones y cancelaciones</h2>
              <p className="text-gray-700 leading-relaxed">
                Debido a que los productos son importados bajo pedido:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-2">
                <li>No se aceptan devoluciones ni cambios una vez confirmado el pedido.</li>
                <li>El pago inicial no es reembolsable en caso de cancelación por parte del cliente.</li>
                <li>En caso de imposibilidad de cumplimiento por parte de Chic Import USA, se evaluará el reembolso correspondiente.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">8. Responsabilidad</h2>
              <p className="text-gray-700 leading-relaxed">
                Chic Import USA se compromete a comercializar productos originales y a mantener comunicación clara durante el proceso. No se hace responsable por retrasos ocasionados por terceros ni por el uso indebido del producto.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">9. Propiedad intelectual</h2>
              <p className="text-gray-700 leading-relaxed">
                Todo el contenido del sitio web es propiedad de Chic Import USA o se utiliza con fines comerciales legítimos. Está prohibida su reproducción sin autorización.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">10. Protección de datos</h2>
              <p className="text-gray-700 leading-relaxed">
                La información personal suministrada se utiliza únicamente para la gestión de pedidos y atención al cliente, conforme a la Política de Privacidad.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">11. Modificaciones</h2>
              <p className="text-gray-700 leading-relaxed">
                Chic Import USA se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entran en vigencia desde su publicación en el sitio web.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900">12. Contacto</h2>
              <p className="text-gray-700 leading-relaxed">
                Para cualquier consulta relacionada con estos Términos y Condiciones, puedes comunicarte a través del canal oficial de WhatsApp de Chic Import USA.
              </p>
            </section>
          </div>
        </div>
      </article>
    </main>
  )
}
