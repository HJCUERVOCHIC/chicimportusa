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
  const [sortOpen,          setSortOpen]          = useState(false);
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
  const handleOrden     = (v: string) => { setOrden(v); setSortOpen(false); EVENTS.catalogoFiltro('orden', v); };
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

      {/* ── DESTACADOS — fondo oscuro + carrusel ──────────────── */}
      {mostrarDestacados && (
        <section className="bg-white border-t-4 border-[#D90429] pt-7 pb-8">
          {/* Header con padding */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-end justify-between mb-5">
            <div>
              <p className="text-[10px] font-bold tracking-[0.3em] uppercase text-[#D90429] font-body mb-1">
                Lo mas pedido
              </p>
              <h2 className="font-display text-[clamp(32px,4.5vw,48px)] text-[#111] tracking-[0.02em] leading-none">
                DESTACADOS <span className="text-[#D90429]">🔥</span>
              </h2>
            </div>
            <span className="text-[11px] text-gray-400 font-body hidden sm:block">
              Desliza →
            </span>
          </div>

          {/* Carrusel */}
          <div className="px-4 sm:px-6 min-w-0 overflow-hidden">
            <DestacadosCarousel productos={destacados} />
          </div>
        </section>
      )}

      {/* ── Toolbar sticky ────────────────────────────────────── */}
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
                <button type="button" aria-label="Limpiar busqueda" onClick={() => setBusqueda('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                  <IconX size={14} />
                </button>
              )}
            </div>

            <div className="relative flex-shrink-0">
              <button onClick={() => setSortOpen((v) => !v)}
                className="flex items-center gap-1.5 px-3 py-2.5 bg-gray-50 border border-gray-200 text-gray-600 hover:text-gray-900 text-sm rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429]"
                aria-expanded={sortOpen}>
                <IconChevronDown size={14} />
                <span className="hidden sm:inline font-body">{ORDEN_OPTIONS.find((o) => o.value === orden)?.label}</span>
              </button>
              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} aria-hidden="true" />
                  <div className="absolute right-0 top-full mt-1 z-20 bg-white border border-gray-100 rounded-xl min-w-[160px] shadow-lg">
                    {ORDEN_OPTIONS.map((opt) => (
                      <button key={opt.value} onClick={() => handleOrden(opt.value)}
                        className={cn('w-full text-left px-4 py-2.5 text-sm font-body transition-colors first:rounded-t-xl last:rounded-b-xl',
                          orden === opt.value ? 'text-[#D90429] bg-[#D90429]/5 font-semibold' : 'text-gray-600 hover:bg-gray-50')}>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Tabs genero */}
          <div className="flex items-center gap-2" role="tablist">
            {GENERO_OPTIONS.map((opt) => (
              <button key={opt.value} type="button" role="tab" aria-selected={genero === opt.value}
                onClick={() => handleGenero(opt.value)}
                className={cn('px-4 py-1.5 rounded-full text-xs font-semibold font-body tracking-wide border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2',
                  genero === opt.value ? 'bg-[#111] border-[#111] text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400')}>
                {opt.label}
              </button>
            ))}
          </div>

          {/* Chips categorias */}
          {categorias.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-0.5" style={{ scrollbarWidth: 'none' }} role="tablist">
              {categorias.map((cat) => (
                <button key={cat.id} type="button" role="tab" aria-selected={categoria === cat.id}
                  onClick={() => handleCategoria(cat.id)}
                  className={cn('flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold font-body tracking-wide border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2',
                    categoria === cat.id ? 'bg-[#D90429] border-[#D90429] text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-[#D90429]/50 hover:text-[#D90429]')}>
                  <span aria-hidden="true">{cat.emoji}</span>
                  <span>{cat.nombre}</span>
                  <span className={cn('text-[10px]', categoria === cat.id ? 'text-white/70' : 'text-gray-400')}>{cat.cantidad}</span>
                </button>
              ))}
            </div>
          )}

          {/* Marca + conteo + limpiar */}
          <div className="flex flex-wrap items-center gap-3">
            {marcas.length > 0 && (
              <div className="relative">
                <label htmlFor="filtro-marca" className="sr-only">Filtrar por marca</label>
                <select id="filtro-marca" value={marca} onChange={(e) => handleMarca(e.target.value)}
                  className={cn('appearance-none bg-gray-50 border text-sm py-2 pl-3 pr-7 rounded-lg font-body text-gray-700 outline-none transition-colors hover:border-gray-300 focus:border-[#D90429]',
                    marca ? 'border-[#D90429] text-[#D90429] font-semibold' : 'border-gray-200')}>
                  <option value="">Todas las marcas</option>
                  {marcas.map((m) => <option key={m.id} value={m.id}>{m.nombre} ({m.cantidad})</option>)}
                </select>
                <IconChevronDown size={12} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            )}

            {hayFiltrosActivos && (
              <button type="button" onClick={handleLimpiar}
                className="text-xs font-semibold font-body text-[#D90429] hover:text-[#b8031f] transition-colors">
                Limpiar filtros
              </button>
            )}

            <p className="ml-auto text-xs font-body text-gray-400" style={{ fontVariantNumeric: 'tabular-nums' }} aria-live="polite">
              {loading ? <span className="text-gray-300">Cargando...</span> : (
                <><span className="font-semibold text-gray-700">{total}</span>{' '}{total === 1 ? 'producto' : 'productos'}</>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* ── Grid catalogo ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
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
              className="mt-5 inline-flex items-center gap-2 px-7 py-3 bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-bold font-body tracking-wide rounded-lg transition-all active:scale-[0.98] shadow-[0_4px_16px_rgba(37,211,102,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
              onClick={() => EVENTS.whatsappClick('catalogo_cta_final')}>
              <IconWhatsApp size={16} />
              Escribir por WhatsApp
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
