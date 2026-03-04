'use client';

import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_PHONE, SITE_CONFIG } from '@/lib/constants';
import { EVENTS } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { IconWhatsApp } from '@/components/ui/Icons';
import type { Producto } from '@/types/catalogo';

interface ProductCardProps {
  producto: Producto;
}

/**
 * Tarjeta de producto para el catálogo.
 *
 * - Click en la imagen/nombre → /producto/[id] (detalle)
 * - Click en WhatsApp → chat directo con link del producto
 *   (WhatsApp genera preview con imagen gracias a OG tags)
 */
export default function ProductCard({ producto }: ProductCardProps) {
  const { id, nombre, marca, categoria, precio, precio_formateado, imagen } =
    producto;

  // URL de la página de detalle
  const productoUrl = `/producto/${id}`;

  // WhatsApp con link del producto (genera preview con imagen)
  const whatsappMessage = `Hola! Me interesa este producto:\n${SITE_CONFIG.url}/producto/${id}`;
  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-shadow duration-200 hover:shadow-md hover:border-gray-200">
      {/* Imagen del producto — click lleva al detalle */}
      <Link href={productoUrl} className="relative aspect-square overflow-hidden bg-gray-50">
        {imagen ? (
          <Image
            src={imagen}
            alt={nombre}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-300">
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

        {/* Badge de categoría */}
        <span className="absolute left-2 top-2 inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-sm px-2 py-0.5 text-[11px] font-medium text-gray-700 shadow-sm">
          <span aria-hidden="true">{categoria.emoji}</span>
          <span className="hidden sm:inline">{categoria.nombre}</span>
        </span>

        {/* Badge destacado */}
        {producto.destacado && (
          <span className="absolute right-2 top-2 inline-flex items-center rounded-full bg-[#D90429] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm">
            Destacado
          </span>
        )}
      </Link>

      {/* Info del producto */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Marca */}
        {marca && (
          <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400">
            {marca}
          </span>
        )}

        {/* Nombre — click lleva al detalle */}
        <Link href={productoUrl}>
          <h3 className="mt-0.5 text-sm font-medium leading-snug text-gray-900 line-clamp-2 hover:text-[#D90429] transition-colors">
            {nombre}
          </h3>
        </Link>

        {/* Género (si aplica) */}
        {producto.genero && (
          <span className="mt-1 text-[11px] text-gray-400 capitalize">
            {producto.genero}
          </span>
        )}

        {/* Precio */}
        <p
          className="mt-auto pt-2 text-lg font-bold text-gray-900"
          style={{ fontVariantNumeric: 'tabular-nums' }}
        >
          {precio_formateado}
        </p>

        {/* CTA WhatsApp — chat directo con link del producto */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'mt-2 flex items-center justify-center gap-2 rounded-lg px-3 py-2.5',
            'bg-[#25D366] text-white text-sm font-semibold',
            'transition-all duration-150',
            'hover:bg-[#1DA851] active:scale-[0.98]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2'
          )}
          onClick={() => EVENTS.whatsappClick('producto', nombre, precio)}
        >
          <IconWhatsApp size={16} />
          <span>Pedir por WhatsApp</span>
        </a>
      </div>
    </article>
  );
}
