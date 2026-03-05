'use client';

// ============================================================
// ChicImportUSA — ProductDetail · Nieve Activa
// ============================================================

import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_PHONE, SITE_CONFIG } from '@/lib/constants';
import { EVENTS } from '@/lib/analytics';
import { IconWhatsApp } from '@/components/ui/Icons';
import type { Producto } from '@/types/catalogo';

interface ProductDetailProps {
  producto: Producto;
}

export default function ProductDetail({ producto }: ProductDetailProps) {
  const whatsappMessage = `Hola! Me interesa este producto:\n${producto.nombre}\n${SITE_CONFIG.url}/producto/${producto.id}`;
  const whatsappHref    = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(whatsappMessage)}`;

  const shareUrl = `${SITE_CONFIG.url}/producto/${producto.id}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: producto.nombre, url: shareUrl });
      } catch {/* cancelled */}
    } else {
      await navigator.clipboard.writeText(shareUrl);
    }
    EVENTS.whatsappClick('producto_share', producto.nombre);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <nav className="flex items-center gap-2 text-xs text-gray-500 font-body" aria-label="Ruta de navegación">
            <Link href="/" className="hover:text-gray-900 transition-colors focus-visible:outline-none">Inicio</Link>
            <span aria-hidden="true">›</span>
            <Link href="/catalogo" className="hover:text-gray-900 transition-colors focus-visible:outline-none">Catálogo</Link>
            <span aria-hidden="true">›</span>
            <span className="text-gray-400 truncate max-w-[180px]" aria-current="page">{producto.nombre}</span>
          </nav>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

          {/* Imagen */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
            {producto.imagen ? (
              <Image
                src={producto.imagen}
                alt={producto.nombre}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-200">
                <svg aria-hidden="true" width={64} height={64} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <rect width={18} height={18} x={3} y={3} rx={2} />
                  <circle cx={9} cy={9} r={2} />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                </svg>
              </div>
            )}

            {producto.destacado && (
              <span className="absolute top-4 left-4 bg-[#D90429] text-white text-xs font-bold font-body px-3 py-1.5 rounded-full">
                Destacado
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">

            {/* Categoría */}
            <Link
              href={`/catalogo?categoria=${producto.categoria.id}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-[0.12em] uppercase text-gray-400 font-body mb-3 hover:text-[#D90429] transition-colors focus-visible:outline-none w-fit"
            >
              <span aria-hidden="true">{producto.categoria.emoji}</span>
              {producto.categoria.nombre}
            </Link>

            {/* Marca */}
            {producto.marca && (
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400 font-body mb-1">
                {producto.marca}
              </p>
            )}

            {/* Nombre */}
            <h1 className="font-display text-[clamp(28px,4vw,42px)] text-gray-900 leading-tight tracking-[0.01em] mb-4">
              {producto.nombre.toUpperCase()}
            </h1>

            {/* Precio */}
            <p
              className="text-4xl font-black text-gray-900 font-body mb-6"
              style={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {producto.precio_formateado}
            </p>

            {/* Descripción */}
            {producto.descripcion && (
              <p className="text-sm text-gray-600 leading-relaxed font-body mb-6 max-w-md">
                {producto.descripcion}
              </p>
            )}

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-3 mb-7">
              {[
                { icon: '✓', text: 'Producto original' },
                { icon: '🚚', text: 'Envío a Colombia' },
                { icon: '💬', text: 'Pago por WhatsApp' },
              ].map((item) => (
                <div key={item.text} className="bg-gray-50 rounded-xl p-3 text-center">
                  <p className="text-lg mb-1" aria-hidden="true">{item.icon}</p>
                  <p className="text-[10px] font-semibold text-gray-600 font-body leading-tight">{item.text}</p>
                </div>
              ))}
            </div>

            {/* CTA principal */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full bg-[#25D366] hover:bg-[#1DA851] text-white py-4 rounded-xl text-sm font-bold font-body tracking-[0.05em] transition-all duration-200 active:scale-[0.98] shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.4)] mb-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
              onClick={() => EVENTS.whatsappClick('producto_detalle', producto.nombre, producto.precio)}
            >
              <IconWhatsApp size={18} />
              PEDIR ESTE PRODUCTO
            </a>

            {/* Botones secundarios */}
            <div className="flex gap-3">
              <Link
                href="/catalogo"
                className="flex-1 flex items-center justify-center py-3.5 border-2 border-gray-200 text-gray-700 text-sm font-semibold font-body rounded-xl hover:border-gray-400 hover:text-gray-900 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              >
                ← Ver catálogo
              </Link>
              <button
                type="button"
                onClick={handleShare}
                aria-label="Compartir producto"
                className="flex items-center justify-center w-14 rounded-xl border-2 border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-900 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2"
              >
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                  <polyline points="16 6 12 2 8 6" />
                  <line x1="12" y1="2" x2="12" y2="15" />
                </svg>
              </button>
            </div>

            {/* Nota proceso */}
            <p className="text-xs text-gray-400 mt-5 font-body leading-relaxed">
              Al escribir por WhatsApp confirmaremos disponibilidad, talla y precio final.
              50% de pago para separar el producto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
