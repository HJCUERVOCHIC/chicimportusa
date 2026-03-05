'use client';

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
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#0a0a0a]">
      {/* Imagen de fondo */}
      <Image
        src="/img/hero-tenis.jpg"
        alt="Productos importados desde USA"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-40"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Red glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#D90429]/10 blur-[80px]" />

      {/* Gradient from bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 sm:px-6 py-16 text-center">
        {/* Badge publicación activa */}
        {publicacionActiva && (
          <div className="inline-flex items-center gap-2 border border-[#D90429]/30 rounded px-4 py-1.5 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]" />
            </span>
            <span className="text-[11px] font-bold text-[#D90429] tracking-[0.2em] font-body">
              PUBLICACIÓN ACTIVA — {totalProductos} PRODUCTOS
            </span>
          </div>
        )}

        {/* Título */}
        <h1 className="font-display text-[clamp(48px,10vw,110px)] leading-[0.95] tracking-[0.02em] mb-6">
          <span className="text-white block">PRODUCTOS</span>
          <span
            className="block"
            style={{
              WebkitTextStroke: '2px white',
              color: 'transparent',
            }}
          >
            ORIGINALES
          </span>
          <span className="text-[#D90429] block">DESDE USA</span>
        </h1>

        {/* Subtítulo */}
        <p className="text-[15px] sm:text-base text-white/50 max-w-[420px] mx-auto leading-relaxed mb-9 font-body">
          Tenis, ropa y accesorios importados. Publicaciones semanales
          gestionadas por WhatsApp.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1DA851] text-white px-8 py-4 rounded-lg text-sm font-bold tracking-[0.05em] font-body transition-colors duration-200 active:scale-[0.98] shadow-[0_4px_20px_rgba(37,211,102,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            onClick={() => EVENTS.whatsappClick('hero', 'homepage')}
          >
            <IconWhatsApp size={18} />
            UNIRME AL WHATSAPP
          </a>
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 text-white border border-white/20 px-7 py-4 rounded-lg text-sm font-semibold font-body hover:bg-white/5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
          >
            VER CATÁLOGO
            <svg
              aria-hidden="true"
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </Link>
        </div>

        {/* Microtexto */}
        <p className="text-[11px] text-white/30 mt-6 font-body tracking-wider">
          Productos seleccionados · Sin stock permanente · Proceso claro
        </p>
      </div>
    </section>
  );
}
