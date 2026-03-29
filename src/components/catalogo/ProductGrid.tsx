// ============================================================
// ChicImportUSA — ProductGrid · Nieve Activa
// ============================================================

import ProductCard from './ProductCard';
import type { ProductoV2 } from '@/types/catalogo';

interface ProductGridProps {
  productos: ProductoV2[];
  sinPublicaciones?: boolean;
}

export default function ProductGrid({ productos, sinPublicaciones }: ProductGridProps) {

  if (sinPublicaciones) {
    return (
      <div className="py-20 text-center">
        <p className="text-5xl mb-4" aria-hidden="true">📦</p>
        <h3 className="font-display text-2xl text-gray-900 tracking-wide mb-2">
          SIN PUBLICACIÓN ACTIVA
        </h3>
        <p className="text-sm text-gray-500 font-body max-w-xs mx-auto">
          Pronto habrá nuevos productos. Únete al WhatsApp para recibir el aviso.
        </p>
      </div>
    );
  }

  if (!productos || productos.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-5xl mb-4" aria-hidden="true">🔍</p>
        <h3 className="font-display text-2xl text-gray-900 tracking-wide mb-2">
          SIN RESULTADOS
        </h3>
        <p className="text-sm text-gray-500 font-body">
          Prueba con otros filtros o busca otro término.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
      role="list"
      aria-label="Productos del catálogo"
    >
      {productos.map((producto) => (
        <div key={producto.id} role="listitem">
          <ProductCard producto={producto} />
        </div>
      ))}
    </div>
  );
}
