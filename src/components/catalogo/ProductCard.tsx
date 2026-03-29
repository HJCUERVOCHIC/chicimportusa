'use client';

// ============================================================
// ChicImportUSA — ProductCard · Nieve Activa
// Soporta Producto (v1) y ProductoV2 con badges y precio tachado.
// ============================================================

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_PHONE, SITE_CONFIG } from '@/lib/constants';
import { EVENTS } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { IconWhatsApp } from '@/components/ui/Icons';
import type { Producto, ProductoV2 } from '@/types/catalogo';

function isProductoV2(p: Producto | ProductoV2): p is ProductoV2 {
  return 'oferta_exclusiva' in p;
}

interface ProductCardProps {
  producto: Producto | ProductoV2;
}

export default function ProductCard({ producto }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  const productoUrl     = `/producto/${producto.id}`;
  const whatsappMessage = `Hola! Me interesa este producto:\n${SITE_CONFIG.url}/producto/${producto.id}`;
  const whatsappHref    = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

  const esV2            = isProductoV2(producto);
  const ofertaExclusiva = esV2 && producto.oferta_exclusiva;
  const tieneDescuento  = esV2 && producto.tiene_descuento && producto.precio_sin_descuento !== null;

  const badgeDerecha = ofertaExclusiva
    ? { label: 'Oferta', className: 'bg-purple-600' }
    : producto.destacado
    ? { label: 'Destacado', className: 'bg-[#D90429]' }
    : null;

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'rounded-xl overflow-hidden bg-white cursor-pointer transition-[transform,border-color,box-shadow] duration-300',
        hovered
          ? 'border border-[#D90429]/40 -translate-y-1 shadow-lg'
          : 'border border-gray-100 shadow-sm'
      )}
    >
      {/* Contenedor imagen — posición relativa para badges y overlay */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">

        {/* Imagen clickeable */}
        <Link
          href={productoUrl}
          className="block absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-inset"
        >
          {producto.imagen ? (
            <Image
              src={producto.imagen}
              alt={producto.nombre}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className={cn(
                'object-cover transition-transform duration-500',
                hovered ? 'scale-110' : 'scale-100'
              )}
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-200">
              <svg aria-hidden="true" width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                <rect width={18} height={18} x={3} y={3} rx={2} />
                <circle cx={9} cy={9} r={2} />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
          )}
        </Link>

        {/* Badge categoría — esquina izquierda */}
        <span className="absolute top-2.5 left-2.5 z-10 bg-black/60 backdrop-blur-sm rounded px-2.5 py-1 text-[10px] font-bold text-white tracking-[0.08em] font-body pointer-events-none">
          {producto.categoria.emoji} {producto.categoria.nombre}
        </span>

        {/* Badge destacado / oferta exclusiva — esquina derecha */}
        {badgeDerecha && (
          <span className={cn(
            'absolute top-2.5 right-2.5 z-10 rounded px-2.5 py-1 text-[9px] font-bold text-white tracking-[0.1em] uppercase font-body pointer-events-none',
            badgeDerecha.className
          )}>
            {badgeDerecha.label}
          </span>
        )}

        {/* WhatsApp overlay — fuera del Link para evitar <a> anidado */}
        <div className={cn(
          'absolute bottom-0 left-0 right-0 z-10 p-2.5 transition-transform duration-300',
          hovered ? 'translate-y-0' : 'translate-y-full'
        )}>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-lg text-xs font-bold tracking-[0.05em] font-body shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:bg-[#1DA851] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
            onClick={(e) => {
              e.stopPropagation();
              EVENTS.whatsappClick('producto_card', producto.nombre, producto.precio);
            }}
          >
            <IconWhatsApp size={14} />
            PEDIR POR WHATSAPP
          </a>
        </div>
      </div>

      {/* Info */}
      <Link
        href={productoUrl}
        className="block p-3 sm:p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-inset rounded-b-xl"
      >
        {producto.marca && (
          <span className="text-[9px] font-bold tracking-[0.15em] text-gray-400 font-body">
            {producto.marca.toUpperCase()}
          </span>
        )}
        <h3 className="text-sm font-semibold text-gray-900 mt-1 font-body line-clamp-2 hover:text-[#D90429] transition-colors">
          {producto.nombre}
        </h3>

        {/* Precio con o sin descuento */}
        {tieneDescuento && esV2 ? (
          <div className="flex items-center gap-2 mt-2.5 flex-wrap">
            <span
              className="inline-block bg-amber-400 text-amber-900 font-black font-body px-2 py-0.5 rounded text-base"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {producto.precio_formateado}
            </span>
            <p className="text-sm text-gray-400 font-body line-through" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                minimumFractionDigits: 0,
              }).format(producto.precio_sin_descuento!)}
            </p>
          </div>
        ) : (
          <p className="text-lg font-bold text-gray-900 mt-2.5 font-body" style={{ fontVariantNumeric: 'tabular-nums' }}>
            {producto.precio_formateado}
          </p>
        )}
      </Link>
    </article>
  );
}
