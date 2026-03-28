'use client';

// ============================================================
// ChicImportUSA — HeroCarousel · Nieve Activa
// Consume /v2/hero-categorias desde Supabase Storage.
// Auto-avance 5s · Flechas · Dots · Gesture swipe mobile.
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { HeroCategoria } from '@/lib/api';

interface HeroCarouselProps {
  categorias: HeroCategoria[];
}

export default function HeroCarousel({ categorias }: HeroCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = categorias.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-avance — se pausa al hover
  useEffect(() => {
    if (total <= 1 || paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [total, paused, next]);

  // Swipe en mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) delta > 0 ? next() : prev();
    touchStartX.current = null;
  };

  if (!categorias || total === 0) return null;

  const cat = categorias[current];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#111]"
      style={{ aspectRatio: '21/9', minHeight: '240px', maxHeight: '520px' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-label="Carousel de categorías"
    >
      {/* Slides — todas en DOM, solo la activa visible */}
      {categorias.map((item, idx) => (
        <div
          key={item.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          aria-hidden={idx !== current}
        >
          {/* Imagen hero */}
          <Image
            src={item.hero_image_url}
            alt={item.nombre}
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={idx === 0}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />

          {/* Overlay degradado */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

          {/* Contenido */}
          <div className="absolute inset-0 flex items-end sm:items-center">
            <div className="max-w-[1200px] mx-auto px-5 sm:px-8 w-full pb-14 sm:pb-0">
              <div className="max-w-lg">
                {/* Eyebrow */}
                <p className="text-[10px] font-body font-bold tracking-[0.25em] uppercase text-white/60 mb-2">
                  Categoría
                </p>

                {/* Nombre categoría */}
                <h2
                  className="font-display text-white leading-[0.92] tracking-[0.02em] mb-3"
                  style={{ fontSize: 'clamp(36px, 6vw, 72px)' }}
                >
                  {item.nombre.toUpperCase()}
                </h2>

                {/* Conteo */}
                <p className="text-sm font-body text-white/70 mb-5">
                  {item.total_productos}{' '}
                  {item.total_productos === 1 ? 'producto disponible' : 'productos disponibles'}
                </p>

                {/* CTA */}
                <Link
                  href={`/catalogo?categoria=${encodeURIComponent(item.nombre)}`}
                  className="inline-flex items-center gap-2 bg-[#D90429] hover:bg-[#B80323] text-white px-6 py-3 rounded-lg text-sm font-bold font-body tracking-[0.04em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
                >
                  VER COLECCIÓN
                  <svg aria-hidden="true" width={13} height={13} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Flechas — solo si hay más de 1 */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Categoría anterior"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Categoría siguiente"
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      {/* Dots */}
      {total > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5">
          {categorias.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                idx === current
                  ? 'w-5 h-1.5 bg-[#D90429]'
                  : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Ir a ${categorias[idx].nombre}`}
              aria-current={idx === current ? 'true' : undefined}
            />
          ))}
        </div>
      )}

      {/* Contador top-right */}
      {total > 1 && (
        <div className="absolute top-4 right-4 z-20 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
          <span className="text-[11px] font-body font-bold text-white/80 tabular-nums">
            {current + 1} / {total}
          </span>
        </div>
      )}
    </section>
  );
}
