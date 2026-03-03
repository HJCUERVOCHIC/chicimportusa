import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo',
  description:
    'Explora los productos importados disponibles desde Estados Unidos. Tenis, perfumes, ropa y más.',
};

/**
 * Catálogo placeholder — se implementa en Etapa 2
 */
export default function CatalogoPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Catálogo
        </h1>
        <p className="mt-3 text-gray-500">
          Esta página se conectará a la API del catálogo en la&nbsp;Etapa&nbsp;2.
        </p>
        <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12">
          <p className="text-sm text-gray-400">
            Aquí irán los productos con filtros por categoría, búsqueda, y botón de
            WhatsApp por producto.
          </p>
        </div>
      </div>
    </div>
  );
}
