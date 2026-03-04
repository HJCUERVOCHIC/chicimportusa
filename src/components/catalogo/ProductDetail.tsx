'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_PHONE, SITE_CONFIG } from '@/lib/constants';
import { EVENTS } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { IconWhatsApp } from '@/components/ui/Icons';
import type { Producto } from '@/types/catalogo';

interface ProductDetailProps {
  producto: Producto;
}

export default function ProductDetail({ producto }: ProductDetailProps) {
  const {
    id,
    nombre,
    marca,
    categoria,
    genero,
    precio,
    precio_formateado,
    imagen,
    imagenes,
    descripcion,
    destacado,
  } = producto;

  // Galería: usar imagenes[] si existe, sino solo la imagen principal
  const gallery =
    imagenes && imagenes.length > 0 ? imagenes : imagen ? [imagen] : [];
  const [activeImage, setActiveImage] = useState(0);

  // URL del producto para compartir en WhatsApp
  const productoUrl = `${SITE_CONFIG.url}/producto/${id}`;

  // Mensaje de WhatsApp con link del producto (WhatsApp genera preview con OG)
  const whatsappMessage = `Hola! Me interesa este producto:\n${productoUrl}`;
  const whatsappHref = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center gap-1.5 text-sm text-gray-500">
          <li>
            <Link
              href="/"
              className="hover:text-gray-700 transition-colors"
            >
              Inicio
            </Link>
          </li>
          <li aria-hidden="true">
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li>
            <Link
              href="/catalogo"
              className="hover:text-gray-700 transition-colors"
            >
              Catálogo
            </Link>
          </li>
          <li aria-hidden="true">
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li className="text-gray-900 font-medium truncate max-w-[200px]">
            {nombre}
          </li>
        </ol>
      </nav>

      {/* Grid principal */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* ============================================ */}
        {/* COLUMNA IZQUIERDA — Imágenes */}
        {/* ============================================ */}
        <div className="space-y-3">
          {/* Imagen principal */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50">
            {gallery.length > 0 ? (
              <Image
                src={gallery[activeImage]}
                alt={nombre}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-300">
                <svg
                  aria-hidden="true"
                  width={64}
                  height={64}
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

            {/* Badge destacado */}
            {destacado && (
              <span className="absolute right-3 top-3 inline-flex items-center rounded-full bg-[#D90429] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-sm">
                Destacado
              </span>
            )}
          </div>

          {/* Thumbnails (si hay más de 1 imagen) */}
          {gallery.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {gallery.map((img, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    'relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2',
                    idx === activeImage
                      ? 'border-[#D90429] shadow-sm'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                  aria-label={`Ver imagen ${idx + 1}`}
                >
                  <Image
                    src={img}
                    alt={`${nombre} - imagen ${idx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ============================================ */}
        {/* COLUMNA DERECHA — Info del producto */}
        {/* ============================================ */}
        <div className="flex flex-col">
          {/* Categoría + Género */}
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
              <span aria-hidden="true">{categoria.emoji}</span>
              {categoria.nombre}
            </span>
            {genero && (
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600 capitalize">
                {genero}
              </span>
            )}
          </div>

          {/* Marca */}
          {marca && (
            <span className="mt-3 text-xs font-semibold uppercase tracking-widest text-gray-400">
              {marca}
            </span>
          )}

          {/* Nombre */}
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {nombre}
          </h1>

          {/* Precio */}
          <p
            className="mt-4 text-3xl font-bold text-gray-900"
            style={{ fontVariantNumeric: 'tabular-nums' }}
          >
            {precio_formateado}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Precio referencia en pesos colombianos (COP)
          </p>

          {/* Descripción */}
          {descripcion && (
            <div className="mt-6 border-t border-gray-100 pt-6">
              <h2 className="text-sm font-semibold text-gray-900">
                Descripción
              </h2>
              <p
                className="mt-2 text-sm leading-relaxed text-gray-600"
                style={{ textWrap: 'pretty' } as React.CSSProperties}
              >
                {descripcion}
              </p>
            </div>
          )}

          {/* Spacer */}
          <div className="mt-auto" />

          {/* CTA WhatsApp */}
          <div className="mt-8 space-y-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4',
                'bg-[#25D366] text-white text-base font-semibold',
                'transition-all duration-150',
                'hover:bg-[#1DA851] active:scale-[0.98]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2'
              )}
              onClick={() =>
                EVENTS.whatsappClick('producto_detalle', nombre, precio)
              }
            >
              <IconWhatsApp size={20} />
              Pedir por WhatsApp
            </a>

            <p
              className="text-center text-xs text-gray-400 leading-relaxed"
              style={{ textWrap: 'pretty' } as React.CSSProperties}
            >
              Confirma disponibilidad, tallas y precio final directamente
              por WhatsApp.
            </p>
          </div>

          {/* Volver al catálogo */}
          <Link
            href="/catalogo"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded"
          >
            <svg
              width={16}
              height={16}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            Volver al catálogo
          </Link>
        </div>
      </div>
    </div>
  );
}
