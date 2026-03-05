'use client';

// ============================================================
// ChicImportUSA — HomeClient
// La homepage ES el catálogo. Productos visibles de entrada.
// ============================================================

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_PHONE, WHATSAPP_URL, SITE_CONFIG } from '@/lib/constants';
import { EVENTS } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { IconWhatsApp } from '@/components/ui/Icons';
import type { Producto, CategoriaResumen } from '@/types/catalogo';

interface HomeClientProps {
  productos: Producto[];
  categorias: CategoriaResumen[];
  total: number;
  publicacionActiva: boolean;
}

export default function HomeClient({
  productos,
  categorias,
  total,
  publicacionActiva,
}: HomeClientProps) {
  const [categoriaActiva, setCategoriaActiva] = useState('');
  const [productosFiltrados, setProductosFiltrados] = useState<Producto[]>(productos);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    if (!categoriaActiva) {
      setProductosFiltrados(productos);
    } else {
      setProductosFiltrados(
        productos.filter((p) => p.categoria.id === categoriaActiva)
      );
    }
  }, [categoriaActiva, productos]);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Barra de estado publicación ─────────────────────── */}
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

      {/* ── Chips de categorías ──────────────────────────────── */}
      <div className="sticky top-[57px] z-10 bg-white border-b border-gray-100 px-4 sm:px-6 py-3">
        <div
          className="flex items-center gap-2 overflow-x-auto"
          style={{ scrollbarWidth: 'none' }}
          role="tablist"
          aria-label="Filtrar por categoría"
        >
          {/* Chip "Todos" */}
          <button
            type="button"
            role="tab"
            aria-selected={categoriaActiva === ''}
            onClick={() => setCategoriaActiva('')}
            className={cn(
              'flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-bold font-body tracking-wide border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2',
              categoriaActiva === ''
                ? 'bg-[#111] border-[#111] text-white'
                : 'bg-white border-gray-200 text-gray-600 hover:border-gray-400'
            )}
          >
            Todos
          </button>

          {categorias.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={categoriaActiva === cat.id}
              onClick={() => setCategoriaActiva(cat.id === categoriaActiva ? '' : cat.id)}
              className={cn(
                'flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold font-body tracking-wide border transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2',
                categoriaActiva === cat.id
                  ? 'bg-[#D90429] border-[#D90429] text-white'
                  : 'bg-white border-gray-200 text-gray-600 hover:border-[#D90429]/50 hover:text-[#D90429]'
              )}
            >
              <span aria-hidden="true">{cat.emoji}</span>
              <span>{cat.nombre}</span>
              {cat.cantidad > 0 && (
                <span className={cn(
                  'text-[10px] font-bold',
                  categoriaActiva === cat.id ? 'text-white/70' : 'text-gray-400'
                )}>
                  {cat.cantidad}
                </span>
              )}
            </button>
          ))}

          {/* Ver catálogo completo */}
          <Link
            href="/catalogo"
            className="flex-shrink-0 inline-flex items-center gap-1 px-4 py-1.5 rounded-full text-xs font-bold font-body tracking-wide border border-dashed border-gray-300 text-gray-500 hover:border-[#D90429] hover:text-[#D90429] transition-all duration-200 ml-1"
          >
            Ver todo →
          </Link>
        </div>
      </div>

      {/* ── Grid de productos ────────────────────────────────── */}
      <main
        id="contenido-principal"
        className="max-w-7xl mx-auto px-4 sm:px-6 py-6"
      >
        {productosFiltrados.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-5xl mb-4" aria-hidden="true">
              {publicacionActiva ? '🔍' : '📦'}
            </p>
            <h2 className="font-display text-2xl text-gray-900 tracking-wide mb-2">
              {publicacionActiva
                ? 'SIN PRODUCTOS EN ESTA CATEGORÍA'
                : 'SIN PUBLICACIÓN ACTIVA'}
            </h2>
            <p className="text-sm text-gray-500 font-body max-w-xs mx-auto mt-2">
              {publicacionActiva
                ? 'Prueba con otra categoría.'
                : 'Pronto habrá nuevos productos. Únete al WhatsApp para recibir el aviso.'}
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-lg text-sm font-bold font-body hover:bg-[#1DA851] transition-colors"
            >
              <IconWhatsApp size={16} />
              Unirme al WhatsApp
            </a>
          </div>
        ) : (
          <>
            {/* Conteo */}
            <p className="text-xs text-gray-400 font-body mb-4" style={{ fontVariantNumeric: 'tabular-nums' }}>
              <span className="font-semibold text-gray-700">{productosFiltrados.length}</span>{' '}
              {productosFiltrados.length === 1 ? 'producto' : 'productos'}
              {categoriaActiva && categorias.find(c => c.id === categoriaActiva) && (
                <> · <span className="text-gray-600">
                  {categorias.find(c => c.id === categoriaActiva)?.nombre}
                </span></>
              )}
            </p>

            <div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
              role="list"
            >
              {productosFiltrados.map((producto) => {
                const isHovered = hoveredId === producto.id;
                const productoUrl = `/producto/${producto.id}`;
                const whatsappMessage = `Hola! Me interesa este producto:\n${SITE_CONFIG.url}/producto/${producto.id}`;
                const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

                return (
                  <article
                    key={producto.id}
                    role="listitem"
                    onMouseEnter={() => setHoveredId(producto.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className={cn(
                      'rounded-xl overflow-hidden bg-white cursor-pointer transition-[transform,border-color,box-shadow] duration-300',
                      isHovered
                        ? 'border border-[#D90429]/40 -translate-y-1 shadow-lg'
                        : 'border border-gray-100 shadow-sm'
                    )}
                  >
                    {/* Imagen */}
                    <Link
                      href={productoUrl}
                      className="block relative overflow-hidden bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-inset"
                      style={{ aspectRatio: '1 / 1' }}
                    >
                      {producto.imagen ? (
                        <Image
                          src={producto.imagen}
                          alt={producto.nombre}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                          className={cn(
                            'object-cover transition-transform duration-500',
                            isHovered ? 'scale-110' : 'scale-100'
                          )}
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-gray-200">
                          <svg aria-hidden="true" width={40} height={40} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                            <rect width={18} height={18} x={3} y={3} rx={2} />
                            <circle cx={9} cy={9} r={2} />
                            <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                          </svg>
                        </div>
                      )}

                      {/* Badge categoría */}
                      <span className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm rounded px-2 py-0.5 text-[9px] font-bold text-white tracking-wide font-body">
                        {producto.categoria.emoji} {producto.categoria.nombre}
                      </span>

                      {/* WhatsApp overlay en hover */}
                      <div className={cn(
                        'absolute bottom-0 left-0 right-0 p-2 transition-transform duration-300',
                        isHovered ? 'translate-y-0' : 'translate-y-full'
                      )}>
                        <a
                          href={whatsappHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1.5 bg-[#25D366] text-white py-2.5 rounded-lg text-[11px] font-bold tracking-wide font-body shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:bg-[#1DA851] transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            EVENTS.whatsappClick('producto_home', producto.nombre, producto.precio);
                          }}
                        >
                          <IconWhatsApp size={13} />
                          PEDIR
                        </a>
                      </div>
                    </Link>

                    {/* Info — compacta */}
                    <Link
                      href={productoUrl}
                      className="block px-3 py-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-inset rounded-b-xl"
                    >
                      {producto.marca && (
                        <span className="text-[9px] font-bold tracking-[0.15em] text-gray-400 font-body block">
                          {producto.marca.toUpperCase()}
                        </span>
                      )}
                      <h3 className={cn(
                        'text-xs font-semibold mt-0.5 font-body line-clamp-2 transition-colors',
                        isHovered ? 'text-[#D90429]' : 'text-gray-900'
                      )}>
                        {producto.nombre}
                      </h3>
                      <p
                        className="text-sm font-bold text-gray-900 mt-1.5 font-body"
                        style={{ fontVariantNumeric: 'tabular-nums' }}
                      >
                        {producto.precio_formateado}
                      </p>
                    </Link>
                  </article>
                );
              })}
            </div>

            {/* CTA ver más */}
            <div className="mt-10 text-center">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 border-2 border-[#111] text-[#111] px-8 py-3 rounded-lg text-sm font-bold font-body hover:bg-[#111] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
              >
                Ver catálogo completo →
              </Link>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
