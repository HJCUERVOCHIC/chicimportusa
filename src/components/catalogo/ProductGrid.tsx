// ============================================================
// ChicImportUSA — ProductGrid · Catálogo
// Grid idéntico al de FeaturedProducts del Home
// ============================================================

import ProductCard from './ProductCard';
import type { Producto } from '@/types/catalogo';

interface ProductGridProps {
  productos: Producto[];
  sinPublicaciones?: boolean;
}

export default function ProductGrid({ productos, sinPublicaciones }: ProductGridProps) {

  // Sin publicaciones activas
  if (sinPublicaciones) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-white/8 bg-[#141414] px-6 py-20 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#1a1a1a] border border-white/8">
          <svg
            aria-hidden="true"
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="text-white/20"
          >
            <path d="M20.91 7.51A10 10 0 0 0 12 2a10 10 0 0 0-8.91 5.51" />
            <path d="M3.09 16.49A10 10 0 0 0 12 22a10 10 0 0 0 8.91-5.51" />
            <line x1={2} y1={12} x2={22} y2={12} />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white/60 tracking-wide font-body">
          Sin publicaciones activas
        </h3>
        <p
          className="mt-2 max-w-sm text-sm text-white/30 leading-relaxed font-body"
          style={{ textWrap: 'pretty' } as React.CSSProperties}
        >
          Únete a nuestro canal de WhatsApp para recibir notificaciones
          cuando publiquemos nuevos productos.
        </p>
      </div>
    );
  }

  // Sin resultados por filtros
  if (productos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-white/8 bg-[#141414] px-6 py-20 text-center">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#1a1a1a] border border-white/8">
          <svg
            aria-hidden="true"
            width={28}
            height={28}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="text-white/20"
          >
            <circle cx={11} cy={11} r={8} />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </div>
        <h3 className="text-lg font-bold text-white/60 tracking-wide font-body">
          Sin resultados
        </h3>
        <p className="mt-2 max-w-sm text-sm text-white/30 leading-relaxed font-body">
          No encontramos productos con los filtros seleccionados.
          Intenta ajustar tu búsqueda o limpiar los filtros.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
      {productos.map((producto, index) => (
        <ProductCard key={producto.id} producto={producto} priority={index < 4} />
      ))}
    </div>
  );
}
