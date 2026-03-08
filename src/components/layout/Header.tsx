'use client';

// ============================================================
// ChicImportUSA — Header · Minimalista
// Logo izq · Redes + WhatsApp der
// ============================================================

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { WHATSAPP_URL, SOCIAL_LINKS } from '@/lib/constants';
import { EVENTS } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { IconInstagram, IconTikTok, IconWhatsApp, IconMenu, IconX } from '@/components/ui/Icons';

export default function Header() {
  const [scrolled,        setScrolled]        = useState(false);
  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      <a href="#contenido-principal" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:rounded-lg focus:shadow-lg">
        Saltar al contenido
      </a>

      <header className={cn(
        'sticky top-0 z-50 w-full bg-[#111] transition-shadow duration-200',
        scrolled && 'shadow-sm border-b border-white/10'
      )}>
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-3"
          aria-label="Navegación principal"
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2 rounded-md">
            <Image
              src="/img/logo-header.png"
              alt="ChicImportUSA"
              width={119}
              height={40}
              className="h-8 w-auto sm:h-9"
              priority
            />
          </Link>

          {/* Derecha — Desktop */}
          <div className="hidden md:flex items-center gap-1">
            {/* Redes */}
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429]"
              onClick={() => EVENTS.socialClick('instagram')}>
              <IconInstagram size={18} />
            </a>
            <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
              className="p-2 text-gray-400 hover:text-white transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429]"
              onClick={() => EVENTS.socialClick('tiktok')}>
              <IconTikTok size={18} />
            </a>

            <div className="h-5 w-px bg-white/20 mx-2" aria-hidden="true" />

            {/* WhatsApp */}
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-lg px-4 py-2 text-sm font-bold font-body transition-colors active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
              onClick={() => EVENTS.whatsappClick('header')}>
              <IconWhatsApp size={16} />
              WhatsApp
            </a>
          </div>

          {/* Mobile — solo WhatsApp + hamburguesa */}
          <div className="flex md:hidden items-center gap-2">
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1DA851] text-white rounded-lg px-3 py-2 text-sm font-bold font-body transition-colors"
              onClick={() => EVENTS.whatsappClick('header')}>
              <IconWhatsApp size={15} />
              <span className="text-xs">WhatsApp</span>
            </a>
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-md"
            >
              {mobileMenuOpen ? <IconX size={20} /> : <IconMenu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
          <div className="fixed inset-y-0 right-0 w-64 bg-white shadow-xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <Image src="/img/logo-header.png" alt="" width={95} height={32} className="h-7 w-auto" />
              <button type="button" aria-label="Cerrar menú" onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-900 rounded-md">
                <IconX size={20} />
              </button>
            </div>

            <div className="px-4 py-4 space-y-1">
              <Link href="/como-funciona"
                className="flex items-center px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}>
                Cómo funciona
              </Link>
            </div>

            <div className="mx-4 h-px bg-gray-100" />

            <div className="px-4 py-4 flex items-center gap-2">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => EVENTS.socialClick('instagram')}>
                <IconInstagram size={18} /><span>Instagram</span>
              </a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg"
                onClick={() => EVENTS.socialClick('tiktok')}>
                <IconTikTok size={18} /><span>TikTok</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
