'use client';

// ============================================================
// ChicImportUSA — CatalogClient · Nieve Activa
// Barra de categorías top (2 filas) → Destacados → Sidebar + Grid
// ============================================================

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { EVENTS } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { IconWhatsApp, IconSearch, IconX } from '@/components/ui/Icons';
import { WHATSAPP_URL, WHATSAPP_PHONE, SITE_CONFIG } from '@/lib/constants';
import ProductGrid from './ProductGrid';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
import type {
  ProductoV2, MarcaItem, ProductosResponse, MarcasResponse, GeneroItem,
} from '@/types/catalogo';

const CLIENT_API = '/api/catalogo/v2';

const ORDEN_OPTIONS = [
  { value: 'reciente',   label: 'Más recientes' },
  { value: 'precio_asc', label: 'Menor precio'  },
  { value: 'precio_desc',label: 'Mayor precio'  },
];

interface CatalogClientProps {
  initialProductos: ProductoV2[];
  initialTotal: number;
  initialPublicacionActiva: boolean;
  initialMarcas: MarcaItem[];
  initialGeneros: GeneroItem[];
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
    if (genero)    params.set('genero', genero);
    const res = await fetch(`${CLIENT_API}/marcas?${params.toString()}`);
    if (!res.ok) return [];
    const data: MarcasResponse = await res.json();
    return data.marcas;
  } catch { return []; }
}

// ── Componente principal ─────────────────────────────────────
export default function CatalogClient({
  initialProductos, initialTotal, initialPublicacionActiva,
  initialMarcas, initialGeneros,
}: CatalogClientProps) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

  const [genero,    setGenero]    = useState(searchParams.get('genero')    || '');
  const [categoria, setCategoria] = useState(searchParams.get('categoria') || '');
  const [marca,     setMarca]     = useState(searchParams.get('marca')     || '');
  const [busqueda,  setBusqueda]  = useState(searchParams.get('buscar')    || '');
  const [orden,     setOrden]     = useState(searchParams.get('orden')     || 'reciente');
  const [ofertaExclusiva, setOfertaExclusiva] = useState(searchParams.get('oferta_exclusiva') === 'true');
  const [destacado,       setDestacado]       = useState(searchParams.get('destacados') === 'true');

  const [productos,         setProductos]         = useState<ProductoV2[]>(initialProductos);
  const [generoOptions,     setGeneroOptions]     = useState<GeneroItem[]>(initialGeneros);
  const [total,             setTotal]             = useState(initialTotal);
  const [publicacionActiva, setPublicacionActiva] = useState(initialPublicacionActiva);
  const [marcas,            setMarcas]            = useState<MarcaItem[]>(initialMarcas);
  const [loading,           setLoading]           = useState(false);
  const [busquedaDebounced, setBusquedaDebounced] = useState(busqueda);
  const [drawerOpen,        setDrawerOpen]        = useState(false);

  // Sincronizar estado con cambios de URL (ej: GeneroNav cambia ?genero=)
  useEffect(() => {
    const g = searchParams.get('genero')    || '';
    const c = searchParams.get('categoria') || '';
    const m = searchParams.get('marca')     || '';
    const b = searchParams.get('buscar')    || '';
    setGenero(g);
    setCategoria(c);
    setMarca(m);
    setBusqueda(b);
    setOfertaExclusiva(searchParams.get('oferta_exclusiva') === 'true');
    setDestacado(searchParams.get('destacados') === 'true');
  }, [searchParams]);

  const hayFiltrosActivos = genero || categoria || marca || busqueda || ofertaExclusiva || destacado;

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
    if (ofertaExclusiva) params.set('oferta_exclusiva', 'true');
    if (destacado)       params.set('destacados', 'true');

    updateURL({ genero, categoria, marca, buscar: busquedaDebounced, orden: orden !== 'reciente' ? orden : '', oferta_exclusiva: ofertaExclusiva ? 'true' : '', destacados: destacado ? 'true' : '' });
    setLoading(true);
    fetchProductos(params).then((data) => {
      setProductos(data.productos);
      setTotal(data.total);
      setPublicacionActiva(data.publicacion_activa);
      setLoading(false);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genero, categoria, marca, busquedaDebounced, orden, ofertaExclusiva, destacado]);

  useEffect(() => {
    fetchMarcas(categoria || undefined, genero || undefined).then(setMarcas);
  }, [categoria, genero]);

  const handleGenero    = (v: string) => { setGenero(v); setCategoria(''); setMarca(''); EVENTS.catalogoFiltro('genero', v || 'todos'); };
  const handleCategoria = (v: string) => { setCategoria(v === categoria ? '' : v); setMarca(''); EVENTS.catalogoFiltro('categoria', v || 'todas'); };
  const handleMarca     = (v: string) => { setMarca(v); EVENTS.catalogoFiltro('marca', v || 'todas'); };
  const handleOrden     = (v: string) => { setOrden(v); EVENTS.catalogoFiltro('orden', v); };
  const handleLimpiar   = () => { setGenero(''); setCategoria(''); setMarca(''); setBusqueda(''); setOrden('reciente'); setOfertaExclusiva(false); setDestacado(false); };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Nav de categorías (sticky bajo el header) ─────────── */}

      {/* ── DESTACADOS ────────────────────────────────────────── */}

      {/* ── Layout: Sidebar + Grid ─────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="flex gap-8 items-start">

          {/* ── SIDEBAR (búsqueda, marcas, orden) ───────────────── */}
          <aside
            className="hidden md:flex flex-col gap-5 w-48 flex-shrink-0 sticky top-[107px] self-start max-h-[calc(100vh-114px)] overflow-y-auto pb-6"
            style={{ scrollbarWidth: 'none' }}
          >
            {/* Búsqueda */}
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <IconSearch size={14} />
              </span>
              <label htmlFor="busqueda-sidebar" className="sr-only">Buscar productos</label>
              <input
                id="busqueda-sidebar"
                type="search"
                autoComplete="off"
                placeholder="Buscar..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm pl-8 pr-8 py-2 rounded-lg outline-none focus:border-[#D90429] focus:ring-2 focus:ring-[#D90429]/10 transition-colors"
              />
              {busqueda && (
                <button type="button" onClick={() => setBusqueda('')} aria-label="Limpiar búsqueda"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <IconX size={13} />
                </button>
              )}
            </div>

            {/* Marcas */}
            {marcas.length > 0 && (
              <div>
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-2 font-body">Marca</p>
                <div className="flex flex-col gap-1 max-h-52 overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin' }}>
                  {marcas.map((m) => (
                    <button key={m.id} type="button" onClick={() => handleMarca(marca === m.id ? '' : m.id)}
                      className={cn(
                        'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-body transition-all duration-150',
                        marca === m.id
                          ? 'bg-[#D90429] text-white font-semibold'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )}>
                      <span className="truncate">{m.nombre}</span>
                      <span className={cn('text-[11px] ml-2 flex-shrink-0', marca === m.id ? 'text-white/70' : 'text-gray-400')}>
                        {m.cantidad}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Orden */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-2 font-body">Ordenar</p>
              <div className="flex flex-col gap-1">
                {ORDEN_OPTIONS.map((opt) => (
                  <button key={opt.value} type="button" onClick={() => handleOrden(opt.value)}
                    className={cn(
                      'text-left px-3 py-2 rounded-lg text-sm font-body transition-all duration-150',
                      orden === opt.value
                        ? 'text-[#D90429] font-semibold bg-[#D90429]/5'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Limpiar */}
            {hayFiltrosActivos && (
              <button type="button" onClick={handleLimpiar}
                className="text-xs font-bold font-body text-[#D90429] hover:text-[#b8031f] transition-colors text-left px-3">
                ✕ Limpiar filtros
              </button>
            )}
          </aside>

          {/* ── GRID ───────────────────────────────────────────── */}
          <div className="flex-1 min-w-0">

            {/* Barra superior mobile: búsqueda + botón filtros */}
            <div className="flex items-center gap-2 mb-4">
              {/* Búsqueda mobile */}
              <div className="flex md:hidden relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <IconSearch size={14} />
                </span>
                <input
                  type="search"
                  autoComplete="off"
                  placeholder="Buscar..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm pl-8 pr-3 py-2 rounded-lg outline-none focus:border-[#D90429] transition-colors"
                />
              </div>

              {/* Botón filtros mobile */}
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className={cn(
                  'md:hidden flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-bold font-body transition-all flex-shrink-0',
                  (marca || orden !== 'reciente')
                    ? 'bg-[#D90429] border-[#D90429] text-white'
                    : 'bg-white border-gray-200 text-gray-700'
                )}
              >
                <svg width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                  <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
                </svg>
                Filtros
                {(marca || orden !== 'reciente') && (
                  <span className="bg-white/30 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                    {[marca, orden !== 'reciente'].filter(Boolean).length}
                  </span>
                )}
              </button>

              {/* Conteo desktop */}
              <p
                className="hidden md:block text-xs font-body text-gray-400 flex-shrink-0 ml-auto"
                style={{ fontVariantNumeric: 'tabular-nums' }}
                aria-live="polite"
              >
                {loading ? <span className="text-gray-300">Cargando...</span> : (
                  <><span className="font-semibold text-gray-700">{total}</span>{' '}{total === 1 ? 'producto' : 'productos'}</>
                )}
              </p>
            </div>

            {/* Conteo mobile */}
            <p
              className="md:hidden text-xs font-body text-gray-400 mb-3"
              style={{ fontVariantNumeric: 'tabular-nums' }}
              aria-live="polite"
            >
              {loading ? <span className="text-gray-300">Cargando...</span> : (
                <><span className="font-semibold text-gray-700">{total}</span>{' '}{total === 1 ? 'producto' : 'productos'}</>
              )}
            </p>

            {loading ? <ProductGridSkeleton count={12} /> : (
              <ProductGrid
                productos={productos}
                sinPublicaciones={!publicacionActiva && total === 0 && !hayFiltrosActivos}
              />
            )}

            {!loading && productos.length > 0 && (
              <div className="mt-10 rounded-2xl bg-gray-50 border border-gray-100 p-6 sm:p-8 text-center">
                <p className="text-base font-bold text-gray-900 font-body">¿Te interesa un producto?</p>
                <p className="mt-1 text-sm text-gray-500 font-body">
                  Escríbenos por WhatsApp para confirmar disponibilidad, tallas y precio final.
                </p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 px-7 py-3 bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-bold font-body tracking-wide rounded-lg transition-all active:scale-[0.98] shadow-[0_4px_16px_rgba(37,211,102,0.3)]"
                  onClick={() => EVENTS.whatsappClick('catalogo_cta_final')}
                >
                  <IconWhatsApp size={16} />
                  Escribir por WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── DRAWER DE FILTROS MOBILE ──────────────────────────── */}
      {drawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawerOpen(false)} aria-hidden="true" />
          <div className="relative bg-white rounded-t-2xl px-5 pt-5 pb-8 shadow-xl max-h-[80vh] overflow-y-auto">

            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-bold text-gray-900 font-body">Filtros</h2>
              <button type="button" onClick={() => setDrawerOpen(false)} aria-label="Cerrar filtros" className="text-gray-400 hover:text-gray-700">
                <IconX size={18} />
              </button>
            </div>

            {marcas.length > 0 && (
              <div className="mb-6">
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-3 font-body">Marca</p>
                <div className="flex flex-wrap gap-2">
                  {marcas.map((m) => (
                    <button key={m.id} type="button" onClick={() => handleMarca(marca === m.id ? '' : m.id)}
                      className={cn('px-3 py-1.5 rounded-full text-xs font-semibold font-body border transition-all',
                        marca === m.id ? 'bg-[#D90429] border-[#D90429] text-white' : 'bg-white border-gray-200 text-gray-600')}>
                      {m.nombre} <span className="opacity-60">{m.cantidad}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-6">
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-3 font-body">Ordenar</p>
              <div className="flex flex-col gap-1">
                {ORDEN_OPTIONS.map((opt) => (
                  <button key={opt.value} type="button" onClick={() => handleOrden(opt.value)}
                    className={cn('text-left px-3 py-2.5 rounded-lg text-sm font-body transition-all',
                      orden === opt.value ? 'text-[#D90429] font-semibold bg-[#D90429]/5' : 'text-gray-600')}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              {hayFiltrosActivos && (
                <button type="button" onClick={() => { handleLimpiar(); setDrawerOpen(false); }}
                  className="flex-1 py-3 border-2 border-gray-200 text-gray-700 text-sm font-bold font-body rounded-xl">
                  Limpiar
                </button>
              )}
              <button type="button" onClick={() => setDrawerOpen(false)}
                className="flex-1 py-3 bg-[#111] text-white text-sm font-bold font-body rounded-xl">
                Ver {total} {total === 1 ? 'producto' : 'productos'}
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
