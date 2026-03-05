'use client';

// ============================================================
// ChicImportUSA — Hero · Nieve Activa
// Compacto ~40vh · Fondo blanco · Split layout
// ============================================================

import Image from 'next/image';
import Link from 'next/link';
import { WHATSAPP_URL } from '@/lib/constants';
import { EVENTS } from '@/lib/analytics';
import { IconWhatsApp } from '@/components/ui/Icons';

interface HeroProps {
  totalProductos: number;
  publicacionActiva: boolean;
}

export default function Hero({ totalProductos, publicacionActiva }: HeroProps) {
  return (
    <section className="relative bg-white overflow-hidden" style={{ minHeight: '42vh' }}>

      {/* Layout split */}
      <div className="max-w-[1200px] mx-auto px-5 sm:px-6 flex items-center gap-8 lg:gap-16" style={{ minHeight: '42vh' }}>

        {/* Columna izquierda — texto */}
        <div className="relative z-10 flex-1 py-10 lg:py-12">

          {/* Badge publicación activa */}
          {publicacionActiva ? (
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1.5 mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75 motion-reduce:animate-none" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-[11px] font-bold text-green-700 tracking-[0.15em] font-body uppercase">
                Publicación activa — {totalProductos} productos
              </span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 mb-5">
              <span className="text-[11px] font-semibold text-gray-500 tracking-[0.12em] font-body uppercase">
                ChicImportUSA · Importados USA
              </span>
            </div>
          )}

          {/* Headline */}
          <h1 className="font-display leading-[0.95] tracking-[0.02em] mb-4"
              style={{ fontSize: 'clamp(44px, 7vw, 88px)' }}>
            <span className="text-[#111] block">PRODUCTOS</span>
            <span className="text-[#111]/20 block" style={{ WebkitTextStroke: '2px #111' }}>
              ORIGINALES
            </span>
            <span className="text-[#D90429] block">DESDE USA</span>
          </h1>

          {/* Subtítulo */}
          <p className="text-sm text-gray-500 max-w-[340px] leading-relaxed mb-7 font-body">
            Tenis, ropa y accesorios importados. Publicaciones semanales
            gestionadas por WhatsApp.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1DA851] text-white px-6 py-3.5 rounded-lg text-sm font-bold tracking-[0.04em] font-body transition-colors duration-200 active:scale-[0.98] shadow-[0_4px_16px_rgba(37,211,102,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
              onClick={() => EVENTS.whatsappClick('hero', 'homepage')}
            >
              <IconWhatsApp size={17} />
              UNIRME AL WHATSAPP
            </a>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 text-[#111] border-2 border-[#111] px-6 py-3.5 rounded-lg text-sm font-bold font-body hover:bg-[#111] hover:text-white transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111] focus-visible:ring-offset-2"
            >
              VER CATÁLOGO
              <svg aria-hidden="true" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Link>
          </div>

          {/* Trust signals */}
          <p className="text-[11px] text-gray-400 mt-5 font-body tracking-wide">
            Productos originales · Envíos a toda Colombia · Pago seguro
          </p>
        </div>

        {/* Columna derecha — imagen (solo desktop) */}
        <div className="hidden lg:block flex-shrink-0 relative" style={{ width: '42%', height: '42vh' }}>
          {/* Fondo decorativo */}
          <div className="absolute inset-4 rounded-2xl bg-gray-100" />
          <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <Image
              src="/img/hero-tenis.jpg"
              alt="Productos importados desde USA"
              fill
              priority
              sizes="42vw"
              className="object-cover object-center rounded-2xl"
            />
            {/* Overlay sutil */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-l from-transparent to-white/30" />
          </div>

          {/* Floating badge */}
          <div className="absolute -left-5 top-1/2 -translate-y-1/2 bg-[#D90429] text-white px-4 py-3 rounded-xl shadow-lg z-10">
            <p className="text-[10px] font-body font-semibold tracking-wider uppercase opacity-80">Nuevos</p>
            <p className="font-display text-2xl leading-none tracking-wide">DROPS</p>
            <p className="text-[10px] font-body font-semibold tracking-wider uppercase opacity-80">Cada semana</p>
          </div>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-100" />
    </section>
  );
}
