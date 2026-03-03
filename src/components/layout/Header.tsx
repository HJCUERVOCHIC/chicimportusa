'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAV_LINKS, WHATSAPP_URL, SOCIAL_LINKS } from '@/lib/constants';
import { EVENTS } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { IconInstagram, IconTikTok, IconWhatsApp, IconMenu, IconX } from '@/components/ui/Icons';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 10);
    }
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <>
      <a
        href="#contenido-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-gray-900 focus:rounded-lg focus:shadow-lg focus-visible:ring-2 focus-visible:ring-[#D90429]"
      >
        Saltar al contenido principal
      </a>

      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-shadow duration-200',
          'bg-white/95 backdrop-blur-sm',
          scrolled && 'shadow-sm border-b border-gray-100'
        )}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8"
          aria-label="Navegación principal"
        >
          {/* Logo oficial — ya incluye "CHIC IMPORT USA" en la imagen */}
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
              className="h-8 w-auto sm:h-10"
              priority
            />
          </Link>

          {/* Nav links — Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-600 transition-colors duration-150 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2 rounded-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right section: Social + WhatsApp + Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Redes sociales — Desktop */}
            <div className="hidden sm:flex items-center gap-1">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de ChicImportUSA"
                className="p-2 text-gray-500 transition-colors duration-150 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-md"
                onClick={() => EVENTS.socialClick('instagram')}
              >
                <IconInstagram size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de ChicImportUSA"
                className="p-2 text-gray-500 transition-colors duration-150 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-md"
                onClick={() => EVENTS.socialClick('tiktok')}
              >
                <IconTikTok size={18} />
              </a>
            </div>

            <div className="hidden sm:block h-5 w-px bg-gray-200" aria-hidden="true" />

            {/* Botón WhatsApp — SIEMPRE visible */}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold',
                'bg-[#D90429] text-white',
                'transition-all duration-150',
                'hover:bg-[#B80323] active:scale-[0.98]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2'
              )}
              onClick={() => EVENTS.whatsappClick('header')}
            >
              <IconWhatsApp size={16} className="text-white" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>

            {/* Hamburger — Mobile */}
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              className={cn(
                'md:hidden p-2 -mr-2 text-gray-600',
                'transition-colors duration-150 hover:text-gray-900',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-md'
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <IconX /> : <IconMenu />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />
          <div
            id="mobile-menu"
            className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-xl"
            style={{ overscrollBehavior: 'contain' }}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <Image
                src="/img/logo-header.png"
                alt=""
                width={95}
                height={32}
                className="h-7 w-auto"
              />
              <button
                type="button"
                aria-label="Cerrar menú"
                className="p-2 -mr-2 text-gray-500 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-md"
                onClick={closeMobileMenu}
              >
                <IconX size={20} />
              </button>
            </div>

            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-gray-700 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429]"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mx-4 h-px bg-gray-100" aria-hidden="true" />

            <div className="px-4 py-4">
              <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-400">
                Síguenos
              </p>
              <div className="flex items-center gap-2">
                <a
                  href={SOCIAL_LINKS.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram de ChicImportUSA"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429]"
                  onClick={() => EVENTS.socialClick('instagram')}
                >
                  <IconInstagram size={18} />
                  <span>Instagram</span>
                </a>
                <a
                  href={SOCIAL_LINKS.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok de ChicImportUSA"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors duration-150 hover:bg-gray-50 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429]"
                  onClick={() => EVENTS.socialClick('tiktok')}
                >
                  <IconTikTok size={18} />
                  <span>TikTok</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
