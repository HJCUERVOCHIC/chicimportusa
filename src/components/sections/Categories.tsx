'use client';

// ============================================================
// ChicImportUSA — Categories · Chips rápidas · Nieve Activa
// ============================================================

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { CategoriaResumen } from '@/types/catalogo';

const FALLBACK_CATEGORIES = [
  { id: 'calzado',           nombre: 'Calzado',            emoji: '👟', cantidad: 0 },
  { id: 'bolso',             nombre: 'Bolsos',             emoji: '👜', cantidad: 0 },
  { id: 'perfume',           nombre: 'Perfumes',           emoji: '🌸', cantidad: 0 },
  { id: 'victorias-secret',  nombre: "Victoria's Secret",  emoji: '💕', cantidad: 0 },
  { id: 'vitamina',          nombre: 'Vitaminas',          emoji: '💊', cantidad: 0 },
  { id: 'accesorio',         nombre: 'Accesorios',         emoji: '⌚', cantidad: 0 },
];

interface CategoriesProps {
  categorias?: CategoriaResumen[];
}

export default function Categories({ categorias }: CategoriesProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const items = categorias && categorias.length > 0 ? categorias : FALLBACK_CATEGORIES;

  return (
    <section className="bg-gray-50 border-y border-gray-100 py-6 px-5 sm:px-6">
      <div className="max-w-[1200px] mx-auto">

        <div className="flex items-center gap-3">
          {/* Label */}
          <span className="flex-shrink-0 text-[11px] font-bold uppercase tracking-[0.18em] text-gray-400 font-body hidden sm:block">
            Categorías
          </span>

          <div className="hidden sm:block h-4 w-px bg-gray-200" aria-hidden="true" />

          {/* Chips — scroll horizontal en mobile */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-0.5"
            style={{ scrollbarWidth: 'none' }}
            role="list"
            aria-label="Filtrar por categoría"
          >
            {/* Ver todo */}
            <Link
              href="/catalogo"
              className="flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold font-body tracking-wide bg-[#111] text-white hover:bg-[#D90429] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
              role="listitem"
            >
              Todo →
            </Link>

            {items.map((cat, idx) => (
              <Link
                key={cat.id}
                href={`/catalogo?categoria=${cat.id}`}
                role="listitem"
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={cn(
                  'flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold font-body tracking-wide border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2',
                  hoveredIdx === idx
                    ? 'bg-[#D90429] border-[#D90429] text-white'
                    : 'bg-white border-gray-200 text-gray-700 hover:border-[#D90429]/50 hover:text-[#D90429]'
                )}
              >
                <span aria-hidden="true">{cat.emoji}</span>
                <span>{cat.nombre}</span>
                {cat.cantidad > 0 && (
                  <span className={cn(
                    'text-[10px] font-bold',
                    hoveredIdx === idx ? 'text-white/70' : 'text-gray-400'
                  )}>
                    {cat.cantidad}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
