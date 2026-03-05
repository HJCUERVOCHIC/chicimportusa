'use client';

// ============================================================
// ChicImportUSA — Header · Simplificado
// Logo + búsqueda + WhatsApp. Sin nav links en el home.
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { WHATSAPP_URL, SOCIAL_LINKS } from '@/lib/constants';
import { EVENTS } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { IconInstagram, IconTikTok, IconWhatsApp, IconSearch, IconMenu, IconX } from '@/components/ui/Icons';

export default function Header() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [busqueda, setBusqueda]             = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (busqueda.trim()) {
      router.push(`/catalogo?buscar=${encodeURIComponent(busqueda.trim())}`);
      setBusqueda('');
      closeMobileMenu();
    }
  };

  return (
    <>
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:rounded-lg focus:shadow-lg"
      >
        Saltar al contenido principal
      </a>

      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-shadow duration-200 bg-white',
          scrolled && 'shadow-sm border-b border-gray-100'
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 sm:px-6"
          aria-label="Navegación principal"
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2 rounded-md"
            onClick={closeMobileMenu}
          >
            <Image
              src="/img/logo-header.png"
              alt="ChicImportUSA — Inicio"
              width={119}
              height={40}
              className="h-8 w-auto sm:h-9"
              priority
            />
          </Link>

          {/* Búsqueda — Desktop */}
          <form
            role="search"
            onSubmit={handleSearch}
            className="hidden sm:flex flex-1 max-w-sm relative"
          >
            <label htmlFor="header-search" className="sr-only">Buscar productos</label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <IconSearch size={15} />
            </span>
            <input
              id="header-search"
              type="search"
              name="q"
              autoComplete="off"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              placeholder="Buscar productos…"
              className="w-full bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 text-sm pl-8 pr-3 py-2 rounded-lg focus:outline-none focus:border-[#D90429] focus:ring-2 focus:ring-[#D90429]/10 transition-colors"
            />
          </form>

          {/* Spacer */}
          <div className="flex-1 sm:flex-none" />

          {/* Redes — Desktop */}
          <div className="hidden md:flex items-center gap-0.5">
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="p-2 text-gray-400 hover:text-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-md"
              onClick={() => EVENTS.socialClick('instagram')}
            >
              <IconInstagram size={17} />
            </a>
            <a
              href={SOCIAL_LINKS.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="p-2 text-gray-400 hover:text-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-md"
              onClick={() => EVENTS.socialClick('tiktok')}
            >
              <IconTikTok size={17} />
            </a>
            <div className="h-5 w-px bg-gray-200 mx-1" aria-hidden="true" />
          </div>

          {/* WhatsApp CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-lg px-3 py-2 text-sm font-bold font-body transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
            onClick={() => EVENTS.whatsappClick('header')}
          >
            <IconWhatsApp size={16} />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Hamburger — Mobile */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 -mr-1 text-gray-500 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <IconX size={20} /> : <IconMenu size={20} />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={closeMobileMenu} aria-hidden="true" />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl">

            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <Image src="/img/logo-header.png" alt="" width={95} height={32} className="h-7 w-auto" />
              <button
                type="button"
                aria-label="Cerrar menú"
                onClick={closeMobileMenu}
                className="p-2 text-gray-500 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-md"
              >
                <IconX size={20} />
              </button>
            </div>

            {/* Búsqueda mobile */}
            <div className="px-4 pt-4">
              <form role="search" onSubmit={handleSearch} className="relative">
                <label htmlFor="mobile-search" className="sr-only">Buscar productos</label>
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  <IconSearch size={15} />
                </span>
                <input
                  id="mobile-search"
                  type="search"
                  name="q"
                  autoComplete="off"
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  placeholder="Buscar productos…"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-sm pl-8 pr-3 py-2.5 rounded-lg focus:outline-none focus:border-[#D90429]"
                />
              </form>
            </div>

            <div className="px-4 py-4 space-y-1">
              <Link href="/catalogo" className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50" onClick={closeMobileMenu}>
                Catálogo completo
              </Link>
              <Link href="/como-funciona" className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-gray-700 hover:bg-gray-50" onClick={closeMobileMenu}>
                Cómo funciona
              </Link>
            </div>

            <div className="mx-4 h-px bg-gray-100" />

            <div className="px-4 py-4 flex items-center gap-2">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50" onClick={() => EVENTS.socialClick('instagram')}>
                <IconInstagram size={18} /><span>Instagram</span>
              </a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 hover:bg-gray-50" onClick={() => EVENTS.socialClick('tiktok')}>
                <IconTikTok size={18} /><span>TikTok</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
