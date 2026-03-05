'use client';

// ============================================================
// ChicImportUSA — ProductCard · Catálogo
// Estilo idéntico a FeaturedProducts del Home
// ============================================================

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_PHONE, SITE_CONFIG } from '@/lib/constants';
import { EVENTS } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { IconWhatsApp } from '@/components/ui/Icons';
import type { Producto } from '@/types/catalogo';

interface ProductCardProps {
  producto: Producto;
  priority?: boolean;
}

export default function ProductCard({ producto, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const { id, nombre, marca, categoria, precio, precio_formateado, imagen, destacado } =
    producto;

  const productoUrl     = `/producto/${id}`;
  const whatsappMessage = `Hola! Me interesa este producto:\n${SITE_CONFIG.url}/producto/${id}`;
  const whatsappHref    = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'rounded-xl overflow-hidden bg-[#141414] cursor-pointer transition-[transform,border-color,box-shadow] duration-300',
        isHovered
          ? 'border border-[#D90429]/40 -translate-y-1'
          : 'border border-white/[0.06]'
      )}
    >
      {/* Imagen */}
      <Link
        href={productoUrl}
        className="block relative aspect-square overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-inset"
        aria-label={`Ver ${nombre}`}
      >
        {imagen ? (
          <Image
            src={imagen}
            alt={nombre}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={cn(
              'object-cover brightness-90 transition-transform duration-500',
              isHovered ? 'scale-110' : 'scale-100'
            )}
            priority={priority}
            loading={priority ? 'eager' : 'lazy'}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-[#1a1a1a] text-white/20">
            <svg
              aria-hidden="true"
              width={48}
              height={48}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <rect width={18} height={18} x={3} y={3} rx={2} />
              <circle cx={9} cy={9} r={2} />
              <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
            </svg>
          </div>
        )}

        {/* Badge categoría */}
        <span className="absolute top-2.5 left-2.5 bg-black/70 backdrop-blur-sm rounded px-2.5 py-1 text-[10px] font-bold text-white tracking-[0.08em] font-body">
          {categoria.emoji} {categoria.nombre}
        </span>

        {/* Badge destacado */}
        {destacado && (
          <span className="absolute top-2.5 right-2.5 bg-[#D90429] rounded px-2.5 py-1 text-[9px] font-bold text-white tracking-[0.1em] uppercase font-body">
            Destacado
          </span>
        )}

        {/* Botón WhatsApp — se desliza desde abajo al hover */}
        <div
          className={cn(
            'absolute bottom-0 left-0 right-0 p-2.5 transition-transform duration-300',
            isHovered ? 'translate-y-0' : 'translate-y-full'
          )}
        >
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 rounded-lg text-xs font-bold tracking-[0.05em] font-body shadow-[0_4px_16px_rgba(37,211,102,0.4)] hover:bg-[#1DA851] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
            onClick={(e) => {
              e.stopPropagation();
              EVENTS.whatsappClick('producto', nombre, precio);
            }}
            aria-label={`Pedir ${nombre} por WhatsApp`}
          >
            <IconWhatsApp size={14} />
            PEDIR POR WHATSAPP
          </a>
        </div>
      </Link>

      {/* Info */}
      <Link
        href={productoUrl}
        className="block p-3 sm:p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-inset rounded-b-xl"
      >
        {marca && (
          <span className="text-[9px] font-bold tracking-[0.15em] text-white/35 font-body">
            {marca.toUpperCase()}
          </span>
        )}
        <h3 className="text-sm font-semibold text-white mt-1 font-body line-clamp-2 hover:text-[#D90429] transition-colors">
          {nombre}
        </h3>
        <p
          className="text-lg font-bold text-white mt-2.5 font-body"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {precio_formateado}
        </p>
      </Link>
    </article>
  );
}
