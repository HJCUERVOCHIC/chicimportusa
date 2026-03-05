'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { CategoriaResumen } from '@/types/catalogo';

// Fallback de categorías si la API no las devuelve
const FALLBACK_CATEGORIES = [
  { id: 'calzado', nombre: 'Calzado', emoji: '👟', cantidad: 0 },
  { id: 'bolso', nombre: 'Bolsos', emoji: '👜', cantidad: 0 },
  { id: 'perfume', nombre: 'Perfumes', emoji: '🌸', cantidad: 0 },
  { id: 'victorias-secret', nombre: "Victoria's Secret", emoji: '💕', cantidad: 0 },
  { id: 'vitamina', nombre: 'Vitaminas', emoji: '💊', cantidad: 0 },
  { id: 'accesorio', nombre: 'Accesorios', emoji: '⌚', cantidad: 0 },
];

interface CategoriesProps {
  categorias?: CategoriaResumen[];
}

export default function Categories({ categorias }: CategoriesProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  // Usar categorías de la API o fallback
  const items =
    categorias && categorias.length > 0 ? categorias : FALLBACK_CATEGORIES;

  return (
    <section className="bg-[#0f0f0f] py-16 sm:py-20 px-5 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <h2 className="font-display text-[clamp(32px,5vw,48px)] text-white tracking-[0.02em] leading-none text-center mb-10 sm:mb-12">
          LO QUE <span className="text-[#D90429]">IMPORTAMOS</span>
        </h2>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {items.map((cat, idx) => (
            <Link
              key={cat.id}
              href={`/catalogo?categoria=${cat.id}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={cn(
                'rounded-xl p-6 text-center transition-[transform,background-color,border-color] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0f0f]',
                hoveredIdx === idx
                  ? 'bg-[#1a1a1a] border-[#D90429]/30 -translate-y-1'
                  : 'bg-[#141414] border-white/[0.06]',
                'border'
              )}
            >
              <span
                className={cn(
                  'text-[32px] block mb-3 transition-transform duration-200',
                  hoveredIdx === idx ? 'scale-[1.2]' : 'scale-100'
                )}
              >
                {cat.emoji}
              </span>
              <h3 className="text-[13px] font-bold text-white font-body tracking-[0.03em]">
                {cat.nombre}
              </h3>
              {cat.cantidad > 0 && (
                <span className="text-[11px] text-white/35 font-body mt-1 block">
                  {cat.cantidad} productos
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
