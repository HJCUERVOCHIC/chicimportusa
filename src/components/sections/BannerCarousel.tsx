'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { getImageUrl } from '@/sanity/lib/image'
import type { Banner } from '@/types/sanity'

interface BannerCarouselProps {
  banners: Banner[]
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }, [banners.length])

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  // Auto-advance cada 5 segundos
  useEffect(() => {
    if (banners.length <= 1) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [banners.length, nextSlide])

  if (!banners || banners.length === 0) {
    return null
  }

  const currentBanner = banners[currentIndex]
  const desktopUrl = getImageUrl(currentBanner.imageDesktop, 1200, 600)
  const mobileUrl = currentBanner.imageMobile 
    ? getImageUrl(currentBanner.imageMobile, 800, 600) 
    : getImageUrl(currentBanner.imageDesktop, 800, 600)

  return (
    <section className="relative w-full overflow-hidden bg-gray-100">
      {/* Banner actual */}
      <div className="relative aspect-[2/1] md:aspect-[3/1] w-full">
        {/* Imagen Desktop */}
        {desktopUrl && (
          <Image
            src={desktopUrl}
            alt={currentBanner.title}
            fill
            className="object-cover hidden md:block"
            priority={currentIndex === 0}
          />
        )}
        
        {/* Imagen Mobile */}
        {mobileUrl && (
          <Image
            src={mobileUrl}
            alt={currentBanner.title}
            fill
            className="object-cover md:hidden"
            priority={currentIndex === 0}
          />
        )}

        {/* Overlay con contenido */}
        <div className="absolute inset-0 bg-black/30 flex items-center">
          <div className="max-w-6xl mx-auto px-4 md:px-6 w-full">
            <div className="max-w-xl text-white">
              <h2 className="text-2xl md:text-4xl font-semibold tracking-tight">
                {currentBanner.title}
              </h2>
              {currentBanner.subtitle && (
                <p className="mt-3 text-lg md:text-xl opacity-90">
                  {currentBanner.subtitle}
                </p>
              )}
              {currentBanner.ctaText && currentBanner.ctaUrl && (
                <div className="mt-6">
                  <Button
                    href={currentBanner.ctaUrl}
                    className="bg-white text-text hover:bg-gray-100"
                  >
                    {currentBanner.ctaText}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Controles (solo si hay más de 1 banner) */}
      {banners.length > 1 && (
        <>
          {/* Flechas */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition"
            aria-label="Banner anterior"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition"
            aria-label="Banner siguiente"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicadores */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition ${
                  index === currentIndex ? 'bg-white' : 'bg-white/50'
                }`}
                aria-label={`Ir al banner ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
