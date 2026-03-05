'use client';

// ============================================================
// ChicImportUSA — WhatsAppFloat · Siempre visible · Nieve Activa
// ============================================================

import { WHATSAPP_URL } from '@/lib/constants';
import { EVENTS } from '@/lib/analytics';
import { IconWhatsApp } from '@/components/ui/Icons';

export default function WhatsAppFloat() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed z-50 flex items-center gap-2.5 bg-[#25D366] text-white pl-4 pr-5 h-14 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:bg-[#1DA851] hover:shadow-[0_6px_24px_rgba(37,211,102,0.55)] hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 motion-reduce:transition-none"
      style={{
        bottom: 'max(1.5rem, env(safe-area-inset-bottom, 1.5rem))',
        right: '1.25rem',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
      onClick={() => EVENTS.whatsappClick('flotante')}
    >
      <IconWhatsApp size={24} />
      <span className="text-sm font-bold tracking-wide font-body hidden sm:block">
        Pedir ahora
      </span>
    </a>
  );
}
