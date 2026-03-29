'use client';

// ============================================================
// ChicImportUSA — GeneroNav · Nieve Activa
// Barra de géneros sticky entre el header y el hero.
// Usa query params para filtrar — compatible con CatalogClient.
// ============================================================

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { GeneroItem } from '@/types/catalogo';

interface GeneroNavProps {
  generos: GeneroItem[];
}

const TODO_OPTION: GeneroItem = { value: '', label: 'Todo', total_productos: 0 };

export default function GeneroNav({ generos }: GeneroNavProps) {
  const searchParams = useSearchParams();
  const router       = useRouter();
  const pathname     = usePathname();
  const generoActivo = searchParams.get('genero') || '';

  const handleClick = (value: string) => {
    if (!value) {
      // "Todo" — limpiar todos los filtros
      router.push(pathname, { scroll: false });
      return;
    }
    const params = new URLSearchParams(searchParams.toString());
    params.set('genero', value);
    // Preservar categoría, resetear marca y búsqueda
    params.delete('marca');
    params.delete('buscar');
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const options = [TODO_OPTION, ...generos];

  return (
    <div className="sticky top-[57px] z-40 bg-[#111] border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-center gap-0.5 py-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleClick(opt.value)}
              className={cn(
                'flex-shrink-0 px-5 py-1.5 text-[13px] font-bold font-body tracking-[0.15em] uppercase transition-all duration-200 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429]',
                generoActivo === opt.value
                  ? 'text-white bg-white/15'
                  : 'text-gray-400 hover:text-white'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
