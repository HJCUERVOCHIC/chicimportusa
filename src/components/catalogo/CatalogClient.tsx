'use client';

import { useState, useCallback, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { EVENTS } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { IconWhatsApp } from '@/components/ui/Icons';
import { WHATSAPP_URL } from '@/lib/constants';
import ProductGrid from './ProductGrid';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import type {
  Producto,
  CategoriaResumen,
  MarcaItem,
  ProductosResponse,
  MarcasResponse,
} from '@/types/catalogo';

// -----------------------------------------------------------
// Client-side usa proxy local para evitar CORS
// El proxy en /api/catalogo/[...path] reenvía a admin.chicimportusa.com
// -----------------------------------------------------------

const CLIENT_API = '/api/catalogo';

// -----------------------------------------------------------
// Tipos de género para los tabs
// -----------------------------------------------------------

const GENERO_OPTIONS = [
  { value: '', label: 'Todos' },
  { value: 'hombre', label: 'Hombre' },
  { value: 'mujer', label: 'Mujer' },
] as const;

const ORDEN_OPTIONS = [
  { value: 'reciente', label: 'Más recientes' },
  { value: 'precio_asc', label: 'Menor precio' },
  { value: 'precio_desc', label: 'Mayor precio' },
] as const;

// -----------------------------------------------------------
// Props
// -----------------------------------------------------------

interface CatalogClientProps {
  initialProductos: Producto[];
  initialTotal: number;
  initialPublicacionActiva: boolean;
  initialCategorias: CategoriaResumen[];
  initialMarcas: MarcaItem[];
  totalProductos: number;
}

// -----------------------------------------------------------
// Fetch helpers (cliente → proxy local)
// -----------------------------------------------------------

async function fetchProductos(params: URLSearchParams): Promise<ProductosResponse> {
  try {
    const url = `${CLIENT_API}/productos?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) return { total: 0, publicacion_activa: false, actualizado_en: '', categorias: [], productos: [] };
    return res.json();
  } catch {
    console.error('[CatalogClient] Error fetching productos');
    return { total: 0, publicacion_activa: false, actualizado_en: '', categorias: [], productos: [] };
  }
}

async function fetchCategorias(genero?: string): Promise<CategoriaResumen[]> {
  try {
    const params = new URLSearchParams();
    if (genero) params.set('genero', genero);
    const url = `${CLIENT_API}/categorias?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return data.categorias;
  } catch {
    console.error('[CatalogClient] Error fetching categorias');
    return [];
  }
}

async function fetchMarcas(categoria?: string, genero?: string): Promise<MarcaItem[]> {
  try {
    const params = new URLSearchParams();
    if (categoria) params.set('categoria', categoria);
    if (genero) params.set('genero', genero);
    const url = `${CLIENT_API}/marcas?${params.toString()}`;
    const res = await fetch(url);
    if (!res.ok) return [];
    const data: MarcasResponse = await res.json();
    return data.marcas;
  } catch {
    console.error('[CatalogClient] Error fetching marcas');
    return [];
  }
}

// -----------------------------------------------------------
// Component
// -----------------------------------------------------------

export default function CatalogClient({
  initialProductos,
  initialTotal,
  initialPublicacionActiva,
  initialCategorias,
  initialMarcas,
  totalProductos,
}: CatalogClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [genero, setGenero] = useState(searchParams.get('genero') || '');
  const [categoria, setCategoria] = useState(searchParams.get('categoria') || '');
  const [marca, setMarca] = useState(searchParams.get('marca') || '');
  const [busqueda, setBusqueda] = useState(searchParams.get('buscar') || '');
  const [orden, setOrden] = useState(searchParams.get('orden') || 'reciente');

  const [productos, setProductos] = useState<Producto[]>(initialProductos);
  const [total, setTotal] = useState(initialTotal);
  const [publicacionActiva, setPublicacionActiva] = useState(initialPublicacionActiva);
  const [categorias, setCategorias] = useState<CategoriaResumen[]>(initialCategorias);
  const [marcas, setMarcas] = useState<MarcaItem[]>(initialMarcas);
  const [loading, setLoading] = useState(false);

  const [busquedaDebounced, setBusquedaDebounced] = useState(busqueda);

  useEffect(() => {
    const timer = setTimeout(() => setBusquedaDebounced(busqueda), 350);
    return () => clearTimeout(timer);
  }, [busqueda]);

  const updateURL = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value) newParams.set(key, value);
      });
      const queryString = newParams.toString();
      const newUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(newUrl, { scroll: false });
    },
    [pathname, router]
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (genero) params.set('genero', genero);
    if (categoria) params.set('categoria', categoria);
    if (marca) params.set('marca', marca);
    if (busquedaDebounced) params.set('buscar', busquedaDebounced);
    if (orden && orden !== 'reciente') params.set('orden', orden);

    updateURL({
      genero,
      categoria,
      marca,
      buscar: busquedaDebounced,
      orden: orden !== 'reciente' ? orden : '',
    });

    setLoading(true);
    fetchProductos(params).then((data) => {
      setProductos(data.productos);
      setTotal(data.total);
      setPublicacionActiva(data.publicacion_activa);
      if (data.categorias.length > 0 && !categoria) {
        setCategorias(data.categorias);
      }
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genero, categoria, marca, busquedaDebounced, orden]);

  useEffect(() => {
    fetchMarcas(categoria || undefined, genero || undefined).then(setMarcas);
  }, [categoria, genero]);

  const handleGenero = (value: string) => {
    setGenero(value);
    setCategoria('');
    setMarca('');
    EVENTS.catalogoFiltro('genero', value || 'todos');
  };

  const handleCategoria = (value: string) => {
    setCategoria(value === categoria ? '' : value);
    setMarca('');
    EVENTS.catalogoFiltro('categoria', value || 'todas');
  };

  const handleMarca = (value: string) => {
    setMarca(value);
    EVENTS.catalogoFiltro('marca', value || 'todas');
  };

  const handleOrden = (value: string) => {
    setOrden(value);
    EVENTS.catalogoFiltro('orden', value);
  };

  const handleLimpiar = () => {
    setGenero('');
    setCategoria('');
    setMarca('');
    setBusqueda('');
    setOrden('reciente');
  };

  const hayFiltrosActivos = genero || categoria || marca || busqueda;

  return (
    <div className="space-y-6">
      {/* BARRA DE BÚSQUEDA */}
      <div className="relative">
        <label htmlFor="busqueda-catalogo" className="sr-only">
          Buscar productos
        </label>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx={11} cy={11} r={8} />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          id="busqueda-catalogo"
          type="search"
          name="buscar"
          autoComplete="off"
          placeholder="Buscar por nombre o marca…"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={cn(
            'w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4',
            'text-sm text-gray-900 placeholder:text-gray-400',
            'transition-colors duration-150',
            'hover:border-gray-300',
            'focus:border-[#D90429] focus:outline-none focus:ring-2 focus:ring-[#D90429]/20'
          )}
        />
        {busqueda && (
          <button
            type="button"
            aria-label="Limpiar búsqueda"
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded"
            onClick={() => setBusqueda('')}
          >
            <svg aria-hidden="true" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* TABS DE GÉNERO */}
      <div className="flex items-center gap-2" role="tablist" aria-label="Filtrar por género">
        {GENERO_OPTIONS.map((option) => (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={genero === option.value}
            className={cn(
              'rounded-full px-4 py-2 text-sm font-medium transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2',
              genero === option.value
                ? 'bg-gray-900 text-white shadow-sm'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
            )}
            onClick={() => handleGenero(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* CHIPS DE CATEGORÍAS */}
      <div
        className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap"
        role="tablist"
        aria-label="Filtrar por categoría"
      >
        {categorias.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={categoria === cat.id}
            className={cn(
              'flex-shrink-0 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5',
              'text-sm font-medium transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2',
              categoria === cat.id
                ? 'bg-[#D90429] text-white shadow-sm'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            )}
            onClick={() => handleCategoria(cat.id)}
          >
            <span aria-hidden="true">{cat.emoji}</span>
            <span>{cat.nombre}</span>
            <span className={cn('ml-0.5 text-xs', categoria === cat.id ? 'text-white/80' : 'text-gray-400')}>
              {cat.cantidad}
            </span>
          </button>
        ))}
      </div>

      {/* FILTROS SECUNDARIOS: Marca + Orden */}
      <div className="flex flex-wrap items-center gap-3">
        {marcas.length > 0 && (
          <div className="relative">
            <label htmlFor="filtro-marca" className="sr-only">Filtrar por marca</label>
            <select
              id="filtro-marca"
              name="marca"
              value={marca}
              onChange={(e) => handleMarca(e.target.value)}
              className={cn(
                'appearance-none rounded-lg border border-gray-200 bg-white',
                'py-2 pl-3 pr-8 text-sm text-gray-700',
                'transition-colors duration-150',
                'hover:border-gray-300',
                'focus:border-[#D90429] focus:outline-none focus:ring-2 focus:ring-[#D90429]/20',
                marca && 'border-[#D90429] text-[#D90429] font-medium'
              )}
            >
              <option value="">Todas las marcas</option>
              {marcas.map((m) => (
                <option key={m.id} value={m.id}>{m.nombre} ({m.cantidad})</option>
              ))}
            </select>
            <svg aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        )}

        <div className="relative">
          <label htmlFor="filtro-orden" className="sr-only">Ordenar productos</label>
          <select
            id="filtro-orden"
            name="orden"
            value={orden}
            onChange={(e) => handleOrden(e.target.value)}
            className={cn(
              'appearance-none rounded-lg border border-gray-200 bg-white',
              'py-2 pl-3 pr-8 text-sm text-gray-700',
              'transition-colors duration-150',
              'hover:border-gray-300',
              'focus:border-[#D90429] focus:outline-none focus:ring-2 focus:ring-[#D90429]/20'
            )}
          >
            {ORDEN_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <svg aria-hidden="true" className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        {hayFiltrosActivos && (
          <button
            type="button"
            onClick={handleLimpiar}
            className="text-sm font-medium text-[#D90429] hover:text-[#B80323] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded"
          >
            Limpiar filtros
          </button>
        )}

        <p
          className="ml-auto text-sm text-gray-500"
          style={{ fontVariantNumeric: 'tabular-nums' }}
          aria-live="polite"
        >
          {loading ? (
            <span className="text-gray-400">Cargando…</span>
          ) : (
            <>
              <span className="font-semibold text-gray-700">{total}</span>
              {' '}
              {total === 1 ? 'producto' : 'productos'}
              {categoria && (
                <span>
                  {' en '}
                  <span className="font-medium text-gray-700">
                    {categorias.find((c) => c.id === categoria)?.nombre || categoria}
                  </span>
                </span>
              )}
            </>
          )}
        </p>
      </div>

      {/* GRID DE PRODUCTOS */}
      {loading ? (
        <ProductGridSkeleton count={8} />
      ) : (
        <ProductGrid
          productos={productos}
          sinPublicaciones={!publicacionActiva && total === 0 && !hayFiltrosActivos}
        />
      )}

      {/* CTA WHATSAPP */}
      {!loading && productos.length > 0 && (
        <div className="mt-8 rounded-2xl bg-gray-50 border border-gray-100 p-6 sm:p-8 text-center">
          <p className="text-base font-semibold text-gray-900">
            ¿Te interesa un producto?
          </p>
          <p className="mt-1 text-sm text-gray-500"
             style={{ textWrap: 'pretty' } as React.CSSProperties}>
            Escríbenos por WhatsApp para confirmar disponibilidad,
            tallas y precio&nbsp;final.
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'mt-4 inline-flex items-center gap-2 rounded-lg px-6 py-3',
              'bg-[#25D366] text-white text-sm font-semibold',
              'transition-all duration-150',
              'hover:bg-[#1DA851] active:scale-[0.98]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2'
            )}
            onClick={() => EVENTS.whatsappClick('catalogo_cta_final')}
          >
            <IconWhatsApp size={18} />
            Escribir por WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
