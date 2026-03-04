import ProductCard from './ProductCard';
import type { Producto } from '@/types/catalogo';

interface ProductGridProps {
  productos: Producto[];
  /** true si no hay ninguna publicación activa */
  sinPublicaciones?: boolean;
}

/**
 * Grid responsive de productos.
 * 2 columnas mobile → 3 tablet → 4 desktop.
 * Si no hay productos, muestra un estado vacío.
 */
export default function ProductGrid({ productos, sinPublicaciones }: ProductGridProps) {
  // Estado vacío — sin publicaciones activas
  if (sinPublicaciones) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 px-6 py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          <svg
            aria-hidden="true"
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="text-gray-400"
          >
            <path d="M20.91 7.51A10 10 0 0 0 12 2a10 10 0 0 0-8.91 5.51" />
            <path d="M3.09 16.49A10 10 0 0 0 12 22a10 10 0 0 0 8.91-5.51" />
            <line x1={2} y1={12} x2={22} y2={12} />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-gray-900">
          No hay publicaciones activas
        </h3>
        <p className="mt-1.5 max-w-sm text-sm text-gray-500 leading-relaxed"
           style={{ textWrap: 'pretty' } as React.CSSProperties}>
          En este momento no hay productos publicados. Únete a nuestro
          canal de WhatsApp para recibir notificaciones cuando publiquemos
          nuevos productos.
        </p>
      </div>
    );
  }

  // Estado vacío — filtros sin resultados
  if (productos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/50 px-6 py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
          <svg
            aria-hidden="true"
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="text-gray-400"
          >
            <circle cx={11} cy={11} r={8} />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-gray-900">
          Sin resultados
        </h3>
        <p className="mt-1.5 max-w-sm text-sm text-gray-500 leading-relaxed"
           style={{ textWrap: 'pretty' } as React.CSSProperties}>
          No encontramos productos con los filtros seleccionados.
          Intenta ajustar tu búsqueda o limpiar los filtros.
        </p>
      </div>
    );
  }

  // Grid de productos
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
      {productos.map((producto) => (
        <ProductCard key={producto.id} producto={producto} />
      ))}
    </div>
  );
}
