'use client';

// ============================================================
// ChicImportUSA — CategoryGrid · Nieve Activa
// Mobile: scroll horizontal compacto
// Desktop: grid adaptativo según número de categorías
// ============================================================

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { HeroCategoria } from '@/lib/api';

interface CategoryGridProps {
  categorias: HeroCategoria[];
}

export default function CategoryGrid({ categorias }: CategoryGridProps) {
  const searchParams = useSearchParams();

  if (!categorias || categorias.length === 0) return null;

  const buildHref = (categoriaId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('categoria', categoriaId);
    params.delete('marca');
    params.delete('buscar');
    return `/?${params.toString()}`;
  };

  return (
    <section className="bg-white py-4 sm:py-8">

      {/* ── Mobile: scroll horizontal ─────────────────────── */}
      <div className="sm:hidden px-4">
        <div
          className="flex gap-3 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none' }}
        >
          {categorias.map((cat) => (
            <Link
              key={cat.id}
              href={buildHref(cat.id)}
              className="group relative flex-shrink-0 overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429]"
              style={{ width: '110px', height: '110px' }}
            >
              <Image
                src={cat.imagenHero}
                alt={cat.nombre}
                fill
                sizes="110px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-2">
                <h3 className="font-display text-white leading-none tracking-[0.04em] text-[13px]">
                  {cat.nombre.toUpperCase()}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Desktop: grid adaptativo ──────────────────────── */}
      <div className="hidden sm:block max-w-7xl mx-auto px-6">
        <div className={`grid gap-4 ${getGridCols(categorias.length)}`}>
          {categorias.map((cat) => (
            <Link
              key={cat.id}
              href={buildHref(cat.id)}
              className="group relative overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2"
              style={{ height: '120px' }}
            >
              <Image
                src={cat.imagenHero}
                alt={cat.nombre}
                fill
                sizes="(max-width: 1024px) 33vw, 20vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-300 group-hover:from-black/80" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <h3
                  className="font-display text-white leading-none tracking-[0.04em]"
                  style={{ fontSize: 'clamp(18px, 2.5vw, 26px)' }}
                >
                  {cat.nombre.toUpperCase()}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </section>
  );
}

function getGridCols(count: number): string {
  if (count <= 2) return 'grid-cols-2';
  if (count === 3) return 'grid-cols-3';
  if (count === 4) return 'grid-cols-4';
  if (count === 5) return 'grid-cols-3 lg:grid-cols-5';
  if (count === 6) return 'grid-cols-3 lg:grid-cols-6';
  return 'grid-cols-3 lg:grid-cols-4';
}
