'use client';

// ============================================================
// ChicImportUSA — CatalogClient · Nieve Activa
// Carrusel destacados (fondo #111) → Toolbar sticky → Grid
// ============================================================

import React, { useState, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { EVENTS } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { IconWhatsApp, IconSearch, IconX, IconChevronDown } from '@/components/ui/Icons';
import { WHATSAPP_URL, WHATSAPP_PHONE, SITE_CONFIG } from '@/lib/constants';
import ProductGrid from './ProductGrid';
import { ProductGridSkeleton } from '@/components/ui/Skeleton';
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
    if (genero) params.set('genero', genero);
    const res = await fetch(`${CLIENT_API}/marcas?${params.toString()}`);
    if (!res.ok) return [];
    const data: MarcasResponse = await res.json();
    return data.marcas;
  } catch { return []; }
}

// ── Card editorial del carrusel ──────────────────────────────
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
        className="block rounded-xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429]"
      >
        {/* Imagen */}
        <div className="relative bg-gray-100" style={{ width: '200px', height: '260px', overflow: 'hidden' }}>
          {producto.imagen
            ? <img src={producto.imagen} alt={producto.nombre} width={200} height={260}
                style={{ width: '200px', height: '260px', objectFit: 'cover', display: 'block',
                  transform: hovered ? 'scale(1.08)' : 'scale(1)', transition: 'transform 0.5s' }} />
            : <div style={{ width: '200px', height: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc' }}>
                <svg width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <rect width={18} height={18} x={3} y={3} rx={2}/><circle cx={9} cy={9} r={2}/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                </svg>
              </div>
          }
          {/* Degradado */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)' }} />
          {/* Badge */}
          <span style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', borderRadius: 20, padding: '2px 8px', fontSize: 9, fontWeight: 700, color: 'white', letterSpacing: '0.1em' }}>
            {producto.categoria.emoji} {producto.categoria.nombre}
          </span>
        </div>

        {/* Info debajo de la imagen */}
        <div className={cn(
          'bg-white px-3 py-3 border-x border-b rounded-b-xl transition-colors duration-200',
          hovered ? 'border-[#D90429]/30' : 'border-gray-100'
        )}>
          {producto.marca && (
            <span className="text-[9px] font-bold tracking-[0.15em] text-gray-400 font-body block">
              {producto.marca.toUpperCase()}
            </span>
          )}
          <h3 className={cn('text-xs font-semibold font-body line-clamp-2 leading-snug mt-0.5 transition-colors', hovered ? 'text-[#D90429]' : 'text-gray-900')}>
            {producto.nombre}
          </h3>
          <p className="text-sm font-bold text-gray-900 mt-1 font-body" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {producto.precio_formateado}
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#1DA851] text-white py-1.5 rounded-lg text-[10px] font-bold font-body transition-colors"
            onClick={(e) => { e.stopPropagation(); EVENTS.whatsappClick('destacado', producto.nombre, producto.precio); }}
          >
            <IconWhatsApp size={11} />
            PEDIR
          </a>
        </div>
      </Link>
    </article>
  );
}

// ── Marquee automático ──────────────────────────────────────
function DestacadosCarousel({ productos }: { productos: Producto[] }) {
  const [paused, setPaused] = useState(false);
  // Duplicamos las cards para loop infinito sin saltos
  const items = [...productos, ...productos];
  const cardW  = 216; // 200px card + 16px gap
  const totalW = productos.length * cardW;

  return (
    <div
      className="overflow-hidden w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Productos destacados"
      role="region"
    >
      {/* Keyframe inyectado inline — no requiere globals.css */}
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-${totalW}px); }
        }
        .marquee-track {
          animation: marquee-scroll ${productos.length * 3}s linear infinite;
        }
        .marquee-track.paused {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className={`marquee-track flex gap-4${paused ? ' paused' : ''}`}
        style={{ width: (items.length * cardW) + 'px' }}
      >
        {items.map((p, i) => (
          <div key={`${p.id}-${i}`} role="listitem" aria-hidden={i >= productos.length}>
            <DestacadoCard producto={p} />
          </div>
        ))}
      </div>
    </div>
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
  const handleOrden = (v: string) => { setOrden(v); EVENTS.catalogoFiltro('orden', v); };
  const handleLimpiar   = () => { setGenero(''); setCategoria(''); setMarca(''); setBusqueda(''); setOrden('reciente'); };

  return (
    <div className="min-h-screen bg-white">

      {/* ── Barra publicacion activa ───────────────────────────── */}
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

      {/* ── DESTACADOS ────────────────────────────────────────── */}
      {mostrarDestacados && (
        <section className="bg-white border-t-4 border-[#D90429] pt-7 pb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-end justify-between mb-5">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D90429] font-body mb-1">
                Lo mas pedido
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

          {/* ── SIDEBAR ─────────────────────────────────────────── */}
          <aside className="hidden md:flex flex-col gap-5 w-52 flex-shrink-0 sticky top-[57px] self-start max-h-[calc(100vh-64px)] overflow-y-auto pb-6" style={{ scrollbarWidth: 'none' }}>

            {/* Busqueda */}
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
                <button type="button" onClick={() => setBusqueda('')} aria-label="Limpiar"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <IconX size={13} />
                </button>
              )}
            </div>

            {/* Genero */}
            <div>
              <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-2 font-body">Genero</p>
              <div className="flex flex-col gap-1">
                {GENERO_OPTIONS.map((opt) => (
                  <button key={opt.value} type="button" onClick={() => handleGenero(opt.value)}
                    className={cn(
                      'text-left px-3 py-2 rounded-lg text-sm font-body transition-all duration-150',
                      genero === opt.value
                        ? 'bg-[#111] text-white font-semibold'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}>
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Categorias */}
            {categorias.length > 0 && (
              <div>
                <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-gray-400 mb-2 font-body">Categoria</p>
                <div className="flex flex-col gap-1">
                  {categorias.map((cat) => (
                    <button key={cat.id} type="button" onClick={() => handleCategoria(cat.id)}
                      className={cn(
                        'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-body transition-all duration-150',
                        categoria === cat.id
                          ? 'bg-[#D90429] text-white font-semibold'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      )}>
                      <span className="flex items-center gap-2">
                        <span aria-hidden="true">{cat.emoji}</span>
                        {cat.nombre}
                      </span>
                      <span className={cn('text-[11px]', categoria === cat.id ? 'text-white/70' : 'text-gray-400')}>
                        {cat.cantidad}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

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

            {/* Barra superior mobile + conteo */}
            <div className="flex items-center justify-between mb-4 gap-3">
              {/* Filtros mobile — chips horizontales */}
              <div className="flex md:hidden items-center gap-2 overflow-x-auto flex-1" style={{ scrollbarWidth: 'none' }}>
                {GENERO_OPTIONS.filter(o => o.value).map((opt) => (
                  <button key={opt.value} type="button" onClick={() => handleGenero(genero === opt.value ? '' : opt.value)}
                    className={cn('flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold font-body border transition-all',
                      genero === opt.value ? 'bg-[#111] border-[#111] text-white' : 'bg-white border-gray-200 text-gray-600')}>
                    {opt.label}
                  </button>
                ))}
                {categorias.map((cat) => (
                  <button key={cat.id} type="button" onClick={() => handleCategoria(cat.id)}
                    className={cn('flex-shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold font-body border transition-all',
                      categoria === cat.id ? 'bg-[#D90429] border-[#D90429] text-white' : 'bg-white border-gray-200 text-gray-600')}>
                    <span>{cat.emoji}</span><span>{cat.nombre}</span>
                  </button>
                ))}
              </div>

              {/* Conteo */}
              <p className="text-xs font-body text-gray-400 flex-shrink-0 ml-auto" style={{ fontVariantNumeric: 'tabular-nums' }} aria-live="polite">
                {loading ? <span className="text-gray-300">Cargando...</span> : (
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
                <p className="text-base font-bold text-gray-900 font-body">Te interesa un producto?</p>
                <p className="mt-1 text-sm text-gray-500 font-body">
                  Escribenos por WhatsApp para confirmar disponibilidad, tallas y precio final.
                </p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 px-7 py-3 bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-bold font-body tracking-wide rounded-lg transition-all active:scale-[0.98] shadow-[0_4px_16px_rgba(37,211,102,0.3)]"
                  onClick={() => EVENTS.whatsappClick('catalogo_cta_final')}>
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
