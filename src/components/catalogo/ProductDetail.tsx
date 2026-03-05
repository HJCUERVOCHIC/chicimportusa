'use client';

// ============================================================
// ChicImportUSA — ProductDetail · Etapa 3 Dark Theme
// ============================================================

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

function ShareButton({ productoUrl, nombre }: { productoUrl: string; nombre: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    if (navigator.share) {
      try { await navigator.share({ title: nombre, url: productoUrl }); return; } catch {}
    }
    await navigator.clipboard.writeText(productoUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-1.5 text-xs text-white/30 hover:text-white/60 transition-colors duration-200 focus-visible:outline-none"
    >
      <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {copied ? '¡Enlace copiado!' : 'Compartir'}
    </button>
  );
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

  const gallery =
    imagenes && imagenes.length > 0 ? imagenes : imagen ? [imagen] : [];
  const [activeImage, setActiveImage] = useState(0);
  const [imgError, setImgError]       = useState(false);

  const productoUrl     = `${SITE_CONFIG.url}/producto/${id}`;
  const whatsappMessage = `Hola! Me interesa este producto:\n${productoUrl}`;
  const whatsappHref    = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

  const activeSrc = !imgError && gallery[activeImage] ? gallery[activeImage] : null;

  return (
    <div className="min-h-screen bg-[#0a0a0a]">

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="max-w-6xl mx-auto px-4 md:px-8 pt-6 pb-4">
        <ol className="flex items-center gap-1.5 text-sm text-white/30">
          <li>
            <Link href="/" className="hover:text-white/60 transition-colors">Inicio</Link>
          </li>
          <li aria-hidden="true">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li>
            <Link href="/catalogo" className="hover:text-white/60 transition-colors">Catálogo</Link>
          </li>
          <li aria-hidden="true">
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="m9 18 6-6-6-6" />
            </svg>
          </li>
          <li className="text-white/60 font-medium truncate max-w-[200px]">{nombre}</li>
        </ol>
      </nav>

      {/* Grid principal */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid gap-8 md:grid-cols-2 md:gap-16">

          {/* Columna izquierda — Imágenes */}
          <div className="space-y-3">
            {/* Imagen principal */}
            <div className="relative aspect-square overflow-hidden bg-[#1a1a1a]">
              {activeSrc ? (
                <Image
                  src={activeSrc}
                  alt={nombre}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <svg
                    aria-hidden="true"
                    width={64}
                    height={64}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className="text-white/10"
                  >
                    <rect width={18} height={18} x={3} y={3} rx={2} />
                    <circle cx={9} cy={9} r={2} />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
              )}
              {destacado && (
                <span className="absolute right-3 top-3 inline-flex items-center bg-[#D90429] px-3 py-1 text-xs font-bold uppercase tracking-wider text-white">
                  Destacado
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => { setActiveImage(idx); setImgError(false); }}
                    className={cn(
                      'relative h-16 w-16 flex-shrink-0 overflow-hidden border-2 transition-all duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]',
                      idx === activeImage
                        ? 'border-[#D90429]'
                        : 'border-transparent opacity-40 hover:opacity-80'
                    )}
                    aria-label={`Ver imagen ${idx + 1}`}
                    aria-pressed={idx === activeImage}
                  >
                    <Image src={img} alt={`${nombre} - imagen ${idx + 1}`} fill sizes="64px" className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Columna derecha — Info */}
          <div className="flex flex-col gap-5 md:pt-2">

            {/* Categoría + Género */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 bg-[#1a1a1a] border border-white/8 px-2.5 py-1 text-xs text-white/50">
                <span aria-hidden="true">{categoria.emoji}</span>
                {categoria.nombre}
              </span>
              {genero && (
                <span className="inline-flex items-center bg-[#1a1a1a] border border-white/8 px-2.5 py-1 text-xs text-white/50 capitalize">
                  {genero}
                </span>
              )}
            </div>

            {/* Marca */}
            {marca && (
              <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#D90429]/70">
                {marca}
              </span>
            )}

            {/* Nombre */}
            <h1
              className="text-4xl md:text-5xl text-white leading-none"
              style={{ fontFamily: 'var(--font-bebas-neue, cursive)', letterSpacing: '0.02em' }}
            >
              {nombre}
            </h1>

            {/* Precio */}
            <div className="border-t border-b border-white/5 py-4">
              <p
                className="text-3xl font-bold text-white"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {precio_formateado}
              </p>
              <p className="mt-1 text-[11px] text-white/25">
                Precio referencia en pesos colombianos (COP)
              </p>
            </div>

            {/* Descripción */}
            {descripcion && (
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/30 mb-2">
                  Descripción
                </h2>
                <p
                  className="text-sm leading-relaxed text-white/50"
                  style={{ textWrap: 'pretty' } as React.CSSProperties}
                >
                  {descripcion}
                </p>
              </div>
            )}

            <div className="mt-auto" />

            {/* CTA WhatsApp */}
            <div className="space-y-3 mt-4">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2.5 py-4 bg-[#D90429] hover:bg-[#b8031f] text-white text-base font-bold tracking-widest uppercase transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
                onClick={() => EVENTS.whatsappClick('producto_detalle', nombre, precio)}
              >
                <IconWhatsApp size={20} />
                Pedir por WhatsApp
              </a>
              <p
                className="text-center text-xs text-white/25 leading-relaxed"
                style={{ textWrap: 'pretty' } as React.CSSProperties}
              >
                Confirma disponibilidad, tallas y precio final directamente por WhatsApp.
              </p>
            </div>

            {/* Trust signals */}
            <div className="flex flex-col gap-1.5 border-t border-white/5 pt-4">
              {['✦  Productos originales importados de USA', '✦  Pedidos via WhatsApp — rápido y seguro', '✦  Envíos a todo Colombia'].map((line) => (
                <p key={line} className="text-[11px] text-white/20 tracking-wide">{line}</p>
              ))}
            </div>

            {/* Share + Volver */}
            <div className="flex items-center justify-between pt-1">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-1.5 text-sm text-white/30 hover:text-white/60 transition-colors"
              >
                <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Volver al catálogo
              </Link>
              <ShareButton productoUrl={productoUrl} nombre={nombre} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
