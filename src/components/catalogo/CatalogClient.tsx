'use client';

// ============================================================
// ChicImportUSA — CatalogClient · Nieve Activa
// Es la homepage completa: barra estado + filtros + grid
// ============================================================

import { useState, useCallback, useEffect, useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { EVENTS } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { IconWhatsApp, IconSearch, IconX, IconChevronDown } from '@/components/ui/Icons';
import { WHATSAPP_URL } from '@/lib/constants';
import ProductGrid from './ProductGrid';
import { ProductGridSkeleton, FilterBarSkeleton } from '@/components/ui/Skeleton';
import type {
  Producto, CategoriaResumen, MarcaItem, ProductosResponse, MarcasResponse,
} from '@/types/catalogo';

const CLIENT_API = '/api/catalogo';

const GENERO_OPTIONS = [
  { value: '',       label: 'Todos'  },
  { value: 'hombre', label: 'Hombre' },
  { value: 'mujer',  label: 'Mujer'  },
] as const;

const ORDEN_OPTIONS = [
  { value: 'reciente',    label: 'Mas recientes' },
  { value: 'precio_asc',  label: 'Menor precio'  },
  { value: 'precio_desc', label: 'Mayor precio'  },
] as const;

interface CatalogClientProps {
  initialProductos: Producto[];
  initialTotal: number;
  initialPublicacionActiva: boolean;
  initialCategorias: CategoriaResumen[];
  initialMarcas: MarcaItem[];
  totalProductos: number;
}

async function fetchProductos(params: URLSearchParams): Promise<ProductosResponse> {
  try {
    const res = await fetch(`${CLIENT_API}/productos?${params.toString()}`);
    if (!res.ok) return { total: 0, publicacion_activa: false, actualizado_en: '', categorias: [], productos: [] };
    return res.json();
  } catch { return { total: 0, publicacion_activa: false, actualizado_en: '', categorias: [], productos: [] }; }
}

async function fetchMarcas(categoria?: string, genero?: string): Promise<MarcaItem[]> {
  try {
    const params = new URLSearchParams();
    if (categoria) params.set('categoria', categoria);
    if (genero) params.set('genero', genero);
    const res = await fetch(`${CLIENT_API}/marcas?${params.toString()}`);
    if (!res.ok) return [];
    const data: MarcasResponse = await res.json();
    return data.marcas;
  } catch { return []; }
}

export default function CatalogClient({
  initialProductos, initialTotal, initialPublicacionActiva,
  initialCategorias, initialMarcas,
}: CatalogClientProps) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [genero,    setGenero]    = useState(searchParams.get('genero')    || '');
  const [categoria, setCategoria] = useState(searchParams.get('categoria') || '');
  const [marca,     setMarca]     = useState(searchParams.get('marca')     || '');
  const [busqueda,  setBusqueda]  = useState(searchParams.get('buscar')    || '');
  const [orden,     setOrden]     = useState(searchParams.get('orden')     || 'reciente');

  const [productos,         setProductos]         = useState<Producto[]>(initialProductos);
  const [total,             setTotal]             = useState(initialTotal);
  const [publicacionActiva, setPublicacionActiva] = useState(initialPublicacionActiva);
  const [categorias,        setCategorias]        = useState<CategoriaResumen[]>(initialCategorias);
  const [marcas,            setMarcas]            = useState<MarcaItem[]>(initialMarcas);
  const [loading,           setLoading]           = useState(false);
  const [sortOpen,          setSortOpen]          = useState(false);
  const [busquedaDebounced, setBusquedaDebounced] = useState(busqueda);

  useEffect(() => {
    const t = setTimeout(() => setBusquedaDebounced(busqueda), 350);
    return () => clearTimeout(t);
  }, [busqueda]);

  const updateURL = useCallback((params: Record<string, string>) => {
    const newParams = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if (v) newParams.set(k, v); });
    const qs = newParams.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [pathname, router]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (genero)            params.set('genero',    genero);
    if (categoria)         params.set('categoria', categoria);
    if (marca)             params.set('marca',     marca);
    if (busquedaDebounced) params.set('buscar',    busquedaDebounced);
    if (orden && orden !== 'reciente') params.set('orden', orden);

    updateURL({ genero, categoria, marca, buscar: busquedaDebounced, orden: orden !== 'reciente' ? orden : '' });
    setLoading(true);
    fetchProductos(params).then((data) => {
      setProductos(data.productos);
      setTotal(data.total);
      setPublicacionActiva(data.publicacion_activa);
      if (data.categorias.length > 0 && !categoria) setCategorias(data.categorias);
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genero, categoria, marca, busquedaDebounced, orden]);

  useEffect(() => {
    fetchMarcas(categoria || undefined, genero || undefined).then(setMarcas);
  }, [categoria, genero]);

  const handleGenero    = (v: string) => { setGenero(v); setCategoria(''); setMarca(''); EVENTS.catalogoFiltro('genero', v || 'todos'); };
  const handleCategoria = (v: string) => { setCategoria(v === categoria ? '' : v); setMarca(''); EVENTS.catalogoFiltro('categoria', v || 'todas'); };
  const handleMarca     = (v: string) => { setMarca(v); EVENTS.catalogoFiltro('marca', v || 'todas'); };
  const handleOrden     = (v: string) => { setOrden(v); setSortOpen(false); EVENTS.catalogoFiltro('orden', v); };
  const handleLimpiar   = () => { setGenero(''); setCategoria(''); setMarca(''); setBusqueda(''); setOrden('reciente'); };

  const hayFiltrosActivos = genero || categoria || marca || busqueda;

  return (
    <div className="min-h-screen bg-white">

      {/* Barra de publicacion activa */}
      {publicacionActiva && (
        <div className="bg-green-50 border-b border-green-100 px-4 py-2.5 text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold text-green-700 tracking-[0.15em] uppercase font-body">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Publicacion activa — {total} productos disponibles
          </span>
        </div>
      )}

      {/* Toolbar sticky */}
      <div className="sticky top-[57px] z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-col gap-3">

          {/* Busqueda + Orden */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <IconSearch size={16} />
              </span>
              <label htmlFor="busqueda-catalogo" className="sr-only">Buscar productos</label>
              <input
                id="busqueda-catalogo"
                type="search"
                name="buscar"
                autoComplete="off"
                placeholder="Buscar por nombre o marca..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm pl-9 pr-9 py-2.5 rounded-lg outline-none focus:border-[#D90429] focus:ring-2 focus:ring-[#D90429]/10 transition-colors duration-200"
              />
              {busqueda && (
                <button
                  type="button"
                  aria-label="Limpiar busqueda"
                  onClick={() => setBusqueda('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <IconX size={14} />
                </button>
              )}
            </div>

            {/* Ordenar */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-900 text-sm rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429]"
                aria-expanded={sortOpen}
                aria-haspopup="listbox"
              >
                <IconChevronDown size={14} />
                <span className="hidden sm:inline font-body">
                  {ORDEN_OPTIONS.find((o) => o.value === orden)?.label}
                </span>
              </button>
              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} aria-hidden="true" />
                  <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-100 rounded-xl min-w-[160px] shadow-lg" role="listbox">
                    {ORDEN_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleOrden(opt.value)}
                        role="option"
                        aria-selected={orden === opt.value}
                        className={cn(
                          'w-full text-left px-4 py-2.5 text-sm font-body transition-colors first:rounded-t-xl last:rounded-b-xl',
                          orden === opt.value
                            ? 'text-[#D90429] bg-[#D90429]/5 font-semibold'
                            : 'text-gray-600 hover:bg-gray-50'
                        )}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Tabs genero */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Filtrar por genero">
            {GENERO_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="tab"
                aria-selected={genero === opt.value}
                onClick={() => handleGenero(opt.value)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-xs font-semibold font-body tracking-wide border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2',
                  genero === opt.value
                    ? 'bg-[#111] border-[#111] text-white'
                    : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Chips categorias */}
          {categorias.length > 0 && (
            <div
              className="flex items-center gap-2 overflow-x-auto pb-0.5"
              style={{ scrollbarWidth: 'none' }}
              role="tablist"
              aria-label="Filtrar por categoria"
            >
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={categoria === cat.id}
                  onClick={() => handleCategoria(cat.id)}
                  className={cn(
                    'flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold font-body tracking-wide border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2',
                    categoria === cat.id
                      ? 'bg-[#D90429] border-[#D90429] text-white'
                      : 'bg-white border-gray-200 text-gray-600 hover:border-[#D90429]/50 hover:text-[#D90429]'
                  )}
                >
                  <span aria-hidden="true">{cat.emoji}</span>
                  <span>{cat.nombre}</span>
                  <span className={cn('text-[10px]', categoria === cat.id ? 'text-white/70' : 'text-gray-400')}>
                    {cat.cantidad}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Marca + conteo + limpiar */}
          <div className="flex flex-wrap items-center gap-3">
            {marcas.length > 0 && (
              <div className="relative">
                <label htmlFor="filtro-marca" className="sr-only">Filtrar por marca</label>
                <select
                  id="filtro-marca"
                  value={marca}
                  onChange={(e) => handleMarca(e.target.value)}
                  className={cn(
                    'appearance-none bg-gray-50 border text-sm py-2 pl-3 pr-7 rounded-lg font-body text-gray-700 outline-none transition-colors hover:border-gray-300 focus:border-[#D90429] focus:ring-2 focus:ring-[#D90429]/10',
                    marca ? 'border-[#D90429] text-[#D90429] font-semibold' : 'border-gray-200'
                  )}
                >
                  <option value="">Todas las marcas</option>
                  {marcas.map((m) => (
                    <option key={m.id} value={m.id}>{m.nombre} ({m.cantidad})</option>
                  ))}
                </select>
                <IconChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            )}

            {hayFiltrosActivos && (
              <button
                type="button"
                onClick={handleLimpiar}
                className="text-xs font-semibold font-body text-[#D90429] hover:text-[#b8031f] transition-colors"
              >
                Limpiar filtros
              </button>
            )}

            <p
              className="ml-auto text-xs font-body text-gray-400"
              style={{ fontVariantNumeric: 'tabular-nums' }}
              aria-live="polite"
            >
              {loading ? (
                <span className="text-gray-300">Cargando...</span>
              ) : (
                <>
                  <span className="font-semibold text-gray-700">{total}</span>
                  {' '}{total === 1 ? 'producto' : 'productos'}
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {loading ? (
          <ProductGridSkeleton count={12} />
        ) : (
          <ProductGrid
            productos={productos}
            sinPublicaciones={!publicacionActiva && total === 0 && !hayFiltrosActivos}
          />
        )}

        {/* CTA WhatsApp al final */}
        {!loading && productos.length > 0 && (
          <div className="mt-10 rounded-2xl bg-gray-50 border border-gray-100 p-6 sm:p-8 text-center">
            <p className="text-base font-bold text-gray-900 font-body">
              Te interesa un producto?
            </p>
            <p className="mt-1 text-sm text-gray-500 font-body">
              Escribenos por WhatsApp para confirmar disponibilidad, tallas y precio final.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-7 py-3 bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-bold font-body tracking-wide rounded-lg transition-all active:scale-[0.98] shadow-[0_4px_16px_rgba(37,211,102,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
              onClick={() => EVENTS.whatsappClick('catalogo_cta_final')}
            >
              <IconWhatsApp size={16} />
              Escribir por WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
