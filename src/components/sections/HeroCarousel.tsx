'use client';

// ============================================================
// ChicImportUSA — HeroCarousel · Nieve Activa
// Carousel estático con 3 imágenes locales.
// Auto-avance 5s · Flechas · Dots · Swipe mobile.
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SLIDES = [
  { id: 1, src: '/img/Hero_1.png', alt: 'ChicImportUSA — Productos importados desde USA' },
  { id: 2, src: '/img/Hero_2.png', alt: 'ChicImportUSA — Destacados de la temporada' },
  { id: 3, src: '/img/Hero_3.png', alt: 'ChicImportUSA — Ofertas especiales' },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = SLIDES.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-[#111]"
      style={{ height: '50vh', minHeight: '260px', maxHeight: '480px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Carousel principal"
    >
      {/* Slides */}
      {SLIDES.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          aria-hidden={idx !== current}
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={idx === 0}
          />
          {/* Overlay degradado */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
      ))}

      {/* Botones — abajo izquierda, sobre todos los slides */}
      <div className="absolute bottom-8 left-5 sm:left-10 z-20 flex flex-wrap gap-3">
        {/* Ofertas Especiales — botón principal, más prominente */}
        <Link
          href="/?oferta_exclusiva=true"
          className="inline-flex items-center gap-2 bg-[#D90429] hover:bg-[#B80323] text-white px-5 py-2.5 rounded-lg text-sm font-bold font-body tracking-[0.04em] transition-colors duration-200 shadow-[0_4px_16px_rgba(217,4,41,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Ofertas Especiales
          <svg aria-hidden="true" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
        {/* Productos Destacados — botón secundario, más sutil */}
        <Link
          href="/?destacados=true"
          className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white border border-white/30 hover:border-white/50 px-5 py-2.5 rounded-lg text-sm font-bold font-body tracking-[0.04em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Productos Destacados
          <svg aria-hidden="true" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path d="m9 18 6-6-6-6" />
          </svg>
        </Link>
      </div>

      {/* Flechas */}
      <button
        onClick={prev}
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Slide anterior"
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Slide siguiente"
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
              idx === current
                ? 'w-5 h-1.5 bg-[#D90429]'
                : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Ir al slide ${idx + 1}`}
            aria-current={idx === current ? 'true' : undefined}
          />
        ))}
      </div>

      {/* Contador top-right */}
      <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
        <span className="text-[11px] font-body font-bold text-white/80 tabular-nums">
          {current + 1} / {total}
        </span>
      </div>
    </section>
  );
}
