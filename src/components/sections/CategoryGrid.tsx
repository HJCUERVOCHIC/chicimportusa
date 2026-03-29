'use client';

// ============================================================
// ChicImportUSA — CategoryGrid · Nieve Activa
// Grid dinámico de categorías con imagen hero.
// Preserva query params existentes (genero, buscar, etc.)
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
    // Resetear marca y búsqueda al cambiar categoría, pero preservar género
    params.delete('marca');
    params.delete('buscar');
    return `/?${params.toString()}`;
  };

  return (
    <section className="py-8 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className={`grid gap-3 sm:gap-4 ${getGridCols(categorias.length)}`}>
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
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
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
  if (count === 3) return 'grid-cols-2 sm:grid-cols-3';
  if (count === 4) return 'grid-cols-2 sm:grid-cols-4';
  if (count === 5) return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5';
  if (count === 6) return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6';
  return 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4';
}
