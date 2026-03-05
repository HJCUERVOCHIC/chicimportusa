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
  Producto, CategoriaResumen, MarcaItem, ProductosResponse, MarcasResponse,
} from '@/types/catalogo';

const CLIENT_API = '/api/catalogo';

const GENERO_OPTIONS = [
  { value: '',       label: 'Todo'   },
  { value: 'hombre', label: 'Hombre' },
  { value: 'mujer',  label: 'Mujer'  },
] as const;

const ORDEN_OPTIONS = [
  { value: 'reciente',    label: 'Más recientes' },
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
  destacados: Producto[];
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

// ── Card del carrusel de destacados ─────────────────────────
function DestacadoCard({ producto }: { producto: Producto }) {
  const [hovered, setHovered] = useState(false);
  const productoUrl     = `/producto/${producto.id}`;
  const whatsappMessage = `Hola! Me interesa este producto:\n${SITE_CONFIG.url}/producto/${producto.id}`;
  const whatsappHref    = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex-shrink-0"
      style={{ width: '200px' }}
    >
      <Link
        href={productoUrl}
        className="block relative overflow-hidden bg-gray-50"
        style={{ width: '200px', height: '260px' }}
        tabIndex={-1}
        aria-hidden="true"
      >
        <img
          src={producto.imagen || '/img/placeholder-product.jpg'}
          alt={producto.nombre}
          loading="eager"
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
        />

      </Link>
      <div className="pt-2.5">
        <Link href={productoUrl} className="block group">
          <p className="text-[10px] font-bold text-[#D90429] tracking-[0.15em] uppercase font-body truncate">
            {producto.categoria?.nombre ?? ''}
          </p>
          <p className="text-[13px] font-semibold text-gray-900 font-body leading-snug mt-0.5 truncate group-hover:text-[#D90429] transition-colors">
            {producto.nombre}
          </p>
        </Link>
        <div className="flex items-center justify-between mt-2 gap-2">
          <p className="text-sm font-bold text-gray-900 font-body">
            {producto.precio_formateado ?? `$${producto.precio?.toLocaleString('es-CO')}`}
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Consultar ${producto.nombre} por WhatsApp`}
            onClick={() => EVENTS.whatsappClick('destacado', producto.nombre)}
            className="flex items-center gap-1 text-[10px] font-bold text-white bg-[#25D366] hover:bg-[#1DA851] px-2 py-1 rounded transition-colors flex-shrink-0"
          >
            <IconWhatsApp size={11} />
            <span className="hidden sm:inline">Pedir</span>
          </a>
        </div>
      </div>
    </article>
  );
}

function DestacadosCarousel({ productos }: { productos: Producto[] }) {
  const doubled  = [...productos, ...productos];
  const duration = `${productos.length * 1.5}s`;
  return (
    <div className="relative overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)' }}>
      <style>{`
        @keyframes marquee-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .marquee-track { animation: marquee-scroll ${duration} linear infinite; }
        .marquee-track:hover { animation-play-state: paused; }
      `}</style>
      <div className="marquee-track flex gap-5">
        {doubled.map((p, i) => <DestacadoCard key={`${p.id}-${i}`} producto={p} />)}
      </div>
    </div>
  );
}

// ── Barra de navegación de categorías (2 filas, sticky) ─────
function CategoryNav({
  categorias, genero, categoria, onGenero, onCategoria,
}: {
  categorias: CategoriaResumen[];
  genero: string;
  categoria: string;
  onGenero: (v: string) => void;
  onCategoria: (v: string) => void;
}) {
  return (
    <nav
      className="sticky top-[57px] z-20 bg-white border-b border-gray-100 shadow-[0_1px_0_0_#f3f4f6]"
      aria-label="Filtrar por categoría"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Fila 1 — Género */}
        <div className="flex items-center justify-center gap-0.5 pt-2.5 pb-1">
          {GENERO_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onGenero(opt.value)}
              className={cn(
                'px-5 py-1.5 text-[11px] font-bold font-body tracking-[0.15em] uppercase transition-all rounded-full',
                genero === opt.value
                  ? 'text-white bg-[#111]'
                  : 'text-gray-400 hover:text-gray-900'
              )}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Fila 2 — Categorías dinámicas */}
        {categorias.length > 0 && (
          <div className="flex items-center justify-center gap-0.5 pb-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => onCategoria('')}
              className={cn(
                'px-4 py-1.5 text-[11px] font-bold font-body tracking-[0.12em] uppercase transition-all rounded-full',
                categoria === ''
                  ? 'text-[#D90429] bg-[#D90429]/8'
                  : 'text-gray-400 hover:text-gray-900'
              )}
            >
              Todos
            </button>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => onCategoria(cat.id)}
                className={cn(
                  'inline-flex items-center gap-1.5 px-4 py-1.5 text-[11px] font-bold font-body tracking-[0.12em] uppercase transition-all rounded-full',
                  categoria === cat.id
                    ? 'text-[#D90429] bg-[#D90429]/8'
                    : 'text-gray-400 hover:text-gray-900'
                )}
              >
                <span aria-hidden="true">{cat.emoji}</span>
                {cat.nombre}
                <span className={cn(
                  'text-[10px] font-normal normal-case tracking-normal',
                  categoria === cat.id ? 'text-[#D90429]/60' : 'text-gray-300'
                )}>
                  {cat.cantidad}
                </span>
              </button>
            ))}
          </div>
        )}

      </div>
    </nav>
  );
}

// ── Componente principal ─────────────────────────────────────
export default function CatalogClient({
  initialProductos, initialTotal, initialPublicacionActiva,
  initialCategorias, initialMarcas, destacados,
}: CatalogClientProps) {
  const router       = useRouter();
  const pathname     = usePathname();
  const searchParams = useSearchParams();

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
  const [busquedaDebounced, setBusquedaDebounced] = useState(busqueda);

  const hayFiltrosActivos = genero || categoria || marca || busqueda;
  const mostrarDestacados = !hayFiltrosActivos && destacados.length > 0;

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
  const handleOrden     = (v: string) => { setOrden(v); EVENTS.catalogoFiltro('orden', v); };
  const handleLimpiar   = () => { setGenero(''); setCategoria(''); setMarca(''); setBusqueda(''); setOrden('reciente'); };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Barra publicación activa ───────────────────────────── */}
      {publicacionActiva && (
        <div className="bg-green-50 border-b border-green-100 px-4 py-2.5 text-center">
          <span className="inline-flex items-center gap-2 text-[11px] font-bold text-green-700 tracking-[0.15em] uppercase font-body">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            Publicación activa — {total} productos disponibles
          </span>
        </div>
      )}

      {/* ── Nav de categorías (sticky bajo el header) ─────────── */}
      <CategoryNav
        categorias={categorias}
        genero={genero}
        categoria={categoria}
        onGenero={handleGenero}
        onCategoria={handleCategoria}
      />

      {/* ── DESTACADOS ────────────────────────────────────────── */}
      {mostrarDestacados && (
        <section className="bg-white border-b border-gray-100 pt-7 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-end justify-between mb-5">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D90429] font-body mb-1">
                Lo más pedido
              </p>
              <h2 className="font-display text-[clamp(32px,4.5vw,48px)] text-[#111] tracking-[0.02em] leading-none">
                DESTACADOS <span className="text-[#D90429]">🔥</span>
              </h2>
            </div>
            <span className="text-[11px] text-gray-400 font-body hidden sm:block">Desliza →</span>
          </div>
          <div className="px-4 sm:px-6 min-w-0 overflow-hidden">
            <DestacadosCarousel productos={destacados} />
          </div>
        </section>
      )}

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

            {/* Barra superior: búsqueda mobile + conteo */}
            <div className="flex items-center justify-between mb-4 gap-3">
              {/* Búsqueda mobile */}
              <div className="flex md:hidden relative flex-1 max-w-xs">
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

              {/* Conteo */}
              <p
                className="text-xs font-body text-gray-400 flex-shrink-0 ml-auto"
                style={{ fontVariantNumeric: 'tabular-nums' }}
                aria-live="polite"
              >
                {loading ? (
                  <span className="text-gray-300">Cargando...</span>
                ) : (
                  <><span className="font-semibold text-gray-700">{total}</span>{' '}{total === 1 ? 'producto' : 'productos'}</>
                )}
              </p>
            </div>

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
    </div>
  );
}
