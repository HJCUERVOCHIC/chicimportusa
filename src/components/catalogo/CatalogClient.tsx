'use client';

// ============================================================
// ChicImportUSA — CatalogClient · Etapa 3 Dark Theme
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
  Producto,
  CategoriaResumen,
  MarcaItem,
  ProductosResponse,
  MarcasResponse,
} from '@/types/catalogo';

// Client-side usa proxy local para evitar CORS
const CLIENT_API = '/api/catalogo';

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

interface CatalogClientProps {
  initialProductos: Producto[];
  initialTotal: number;
  initialPublicacionActiva: boolean;
  initialCategorias: CategoriaResumen[];
  initialMarcas: MarcaItem[];
  totalProductos: number;
}

// ── Fetch helpers ─────────────────────────────────────────────────────────────

async function fetchProductos(params: URLSearchParams): Promise<ProductosResponse> {
  try {
    const res = await fetch(`${CLIENT_API}/productos?${params.toString()}`);
    if (!res.ok) return { total: 0, publicacion_activa: false, actualizado_en: '', categorias: [], productos: [] };
    return res.json();
  } catch {
    return { total: 0, publicacion_activa: false, actualizado_en: '', categorias: [], productos: [] };
  }
}

async function fetchCategorias(genero?: string): Promise<CategoriaResumen[]> {
  try {
    const params = new URLSearchParams();
    if (genero) params.set('genero', genero);
    const res = await fetch(`${CLIENT_API}/categorias?${params.toString()}`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.categorias;
  } catch {
    return [];
  }
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
  } catch {
    return [];
  }
}

// ── Componente ────────────────────────────────────────────────────────────────

export default function CatalogClient({
  initialProductos,
  initialTotal,
  initialPublicacionActiva,
  initialCategorias,
  initialMarcas,
}: CatalogClientProps) {
  const router   = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [genero,   setGenero]   = useState(searchParams.get('genero')   || '');
  const [categoria, setCategoria] = useState(searchParams.get('categoria') || '');
  const [marca,    setMarca]    = useState(searchParams.get('marca')    || '');
  const [busqueda, setBusqueda] = useState(searchParams.get('buscar')   || '');
  const [orden,    setOrden]    = useState(searchParams.get('orden')    || 'reciente');

  const [productos,          setProductos]          = useState<Producto[]>(initialProductos);
  const [total,              setTotal]              = useState(initialTotal);
  const [publicacionActiva,  setPublicacionActiva]  = useState(initialPublicacionActiva);
  const [categorias,         setCategorias]         = useState<CategoriaResumen[]>(initialCategorias);
  const [marcas,             setMarcas]             = useState<MarcaItem[]>(initialMarcas);
  const [loading,            setLoading]            = useState(false);
  const [sortOpen,           setSortOpen]           = useState(false);

  const [busquedaDebounced, setBusquedaDebounced] = useState(busqueda);

  useEffect(() => {
    const t = setTimeout(() => setBusquedaDebounced(busqueda), 350);
    return () => clearTimeout(t);
  }, [busqueda]);

  const updateURL = useCallback(
    (params: Record<string, string>) => {
      const newParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => { if (value) newParams.set(key, value); });
      const qs = newParams.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router]
  );

  useEffect(() => {
    const params = new URLSearchParams();
    if (genero)           params.set('genero',   genero);
    if (categoria)        params.set('categoria', categoria);
    if (marca)            params.set('marca',     marca);
    if (busquedaDebounced) params.set('buscar',   busquedaDebounced);
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

  const handleGenero = (value: string) => {
    setGenero(value); setCategoria(''); setMarca('');
    EVENTS.catalogoFiltro('genero', value || 'todos');
  };
  const handleCategoria = (value: string) => {
    setCategoria(value === categoria ? '' : value); setMarca('');
    EVENTS.catalogoFiltro('categoria', value || 'todas');
  };
  const handleMarca = (value: string) => {
    setMarca(value);
    EVENTS.catalogoFiltro('marca', value || 'todas');
  };
  const handleOrden = (value: string) => {
    setOrden(value); setSortOpen(false);
    EVENTS.catalogoFiltro('orden', value);
  };
  const handleLimpiar = () => { setGenero(''); setCategoria(''); setMarca(''); setBusqueda(''); setOrden('reciente'); };

  const hayFiltrosActivos = genero || categoria || marca || busqueda;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header className="border-b border-white/5 px-4 md:px-8 pt-10 pb-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-[11px] tracking-[0.35em] uppercase text-[#D90429] mb-2">
            ChicImportUSA
          </p>
          <h1
            className="font-display text-[clamp(56px,8vw,96px)] text-white leading-none tracking-[0.02em]"
            
          >
            Catálogo
          </h1>
        </div>
      </header>

      {/* ── Toolbar ────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-20 bg-[#0f0f0f]/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex flex-col gap-3">

          {/* Búsqueda + Orden */}
          <div className="flex items-center gap-3">

            {/* Buscador */}
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
                <IconSearch size={16} />
              </span>
              <label htmlFor="busqueda-catalogo" className="sr-only">Buscar productos</label>
              <input
                id="busqueda-catalogo"
                type="search"
                name="buscar"
                autoComplete="off"
                placeholder="Buscar por nombre o marca…"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-white/8 text-white placeholder-white/25 text-sm pl-9 pr-9 py-2.5 outline-none focus:border-[#D90429]/60 transition-colors duration-200"
              />
              {busqueda && (
                <button
                  type="button"
                  aria-label="Limpiar búsqueda"
                  onClick={() => setBusqueda('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors focus-visible:outline-none"
                >
                  <IconX size={14} />
                </button>
              )}
            </div>

            {/* Ordenar */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-2.5 bg-[#1a1a1a] border border-white/8 text-white/50 hover:text-white text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D90429]"
                aria-expanded={sortOpen}
                aria-haspopup="listbox"
              >
                <IconChevronDown size={14} />
                <span className="hidden sm:inline">
                  {ORDEN_OPTIONS.find((o) => o.value === orden)?.label}
                </span>
              </button>
              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} aria-hidden="true" />
                  <div
                    className="absolute right-0 top-full mt-1 z-20 bg-[#1a1a1a] border border-white/10 min-w-[160px] shadow-2xl"
                    role="listbox"
                  >
                    {ORDEN_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => handleOrden(opt.value)}
                        role="option"
                        aria-selected={orden === opt.value}
                        className={cn(
                          'w-full text-left px-4 py-2.5 text-sm transition-colors duration-150',
                          orden === opt.value
                            ? 'text-[#D90429] bg-[#D90429]/8'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
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

          {/* Tabs género */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Filtrar por género">
            {GENERO_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                role="tab"
                aria-selected={genero === opt.value}
                onClick={() => handleGenero(opt.value)}
                className={cn(
                  'px-4 py-1.5 text-xs tracking-wider uppercase transition-all duration-200 border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D90429]',
                  genero === opt.value
                    ? 'bg-white text-black border-white'
                    : 'bg-transparent border-white/15 text-white/40 hover:border-white/40 hover:text-white/70'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Chips categorías */}
          {categorias.length > 0 && (
            <div
              className="flex items-center gap-2 overflow-x-auto pb-0.5"
              style={{ scrollbarWidth: 'none' }}
              role="tablist"
              aria-label="Filtrar por categoría"
            >
              {categorias.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={categoria === cat.id}
                  onClick={() => handleCategoria(cat.id)}
                  className={cn(
                    'flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs tracking-wide transition-all duration-200 border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#D90429]',
                    categoria === cat.id
                      ? 'bg-[#D90429] border-[#D90429] text-white'
                      : 'bg-transparent border-white/15 text-white/40 hover:border-white/40 hover:text-white/70'
                  )}
                >
                  <span aria-hidden="true">{cat.emoji}</span>
                  <span>{cat.nombre}</span>
                  <span className={cn('text-[10px]', categoria === cat.id ? 'text-white/70' : 'text-white/25')}>
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
                  name="marca"
                  value={marca}
                  onChange={(e) => handleMarca(e.target.value)}
                  className={cn(
                    'appearance-none bg-[#1a1a1a] border text-sm py-2 pl-3 pr-7 text-white/60',
                    'transition-colors duration-150 outline-none',
                    'hover:border-white/30 focus:border-[#D90429]/60',
                    marca ? 'border-[#D90429]/60 text-[#D90429]' : 'border-white/15'
                  )}
                >
                  <option value="">Todas las marcas</option>
                  {marcas.map((m) => (
                    <option key={m.id} value={m.id}>{m.nombre} ({m.cantidad})</option>
                  ))}
                </select>
                <IconChevronDown
                  size={12}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-white/30"
                />
              </div>
            )}

            {hayFiltrosActivos && (
              <button
                type="button"
                onClick={handleLimpiar}
                className="text-xs font-medium text-[#D90429] hover:text-[#ff1a3a] transition-colors focus-visible:outline-none"
              >
                Limpiar filtros
              </button>
            )}

            <p
              className="ml-auto text-[11px] tracking-[0.15em] uppercase text-white/25"
              style={{ fontVariantNumeric: 'tabular-nums' }}
              aria-live="polite"
            >
              {loading ? (
                <span className="text-white/15">Cargando…</span>
              ) : (
                <>
                  <span className="text-white/50">{total}</span>
                  {' '}{total === 1 ? 'producto' : 'productos'}
                  {categoria && (
                    <span>
                      {' · '}
                      <span className="text-white/40">
                        {categorias.find((c) => c.id === categoria)?.nombre || categoria}
                      </span>
                    </span>
                  )}
                </>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── Grid ───────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {loading ? (
          <ProductGridSkeleton count={8} />
        ) : (
          <ProductGrid
            productos={productos}
            sinPublicaciones={!publicacionActiva && total === 0 && !hayFiltrosActivos}
          />
        )}

        {/* ── CTA WhatsApp ──────────────────────────────────────────────── */}
        {!loading && productos.length > 0 && (
          <div className="mt-8 border border-white/8 bg-[#141414] p-6 sm:p-8 text-center">
            <p className="text-base font-semibold text-white">
              ¿Te interesa un producto?
            </p>
            <p
              className="mt-1 text-sm text-white/40"
              style={{ textWrap: 'pretty' } as React.CSSProperties}
            >
              Escríbenos por WhatsApp para confirmar disponibilidad,
              tallas y precio final.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 px-7 py-3 bg-[#D90429] hover:bg-[#b8031f] text-white text-sm font-semibold tracking-wider uppercase transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
              onClick={() => EVENTS.whatsappClick('catalogo_cta_final')}
            >
              <IconWhatsApp size={16} />
              Escribir por WhatsApp
            </a>
          </div>
        )}
      </main>
    </div>
  );
}
