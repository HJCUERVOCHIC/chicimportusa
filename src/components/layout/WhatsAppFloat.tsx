'use client';

import { useState, useEffect } from 'react';
import { WHATSAPP_URL } from '@/lib/constants';
import { EVENTS } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { IconWhatsApp } from '@/components/ui/Icons';

/**
 * Botón flotante de WhatsApp.
 * Aparece después de un breve scroll para no distraer al entrar.
 * Posición: esquina inferior derecha.
 * Cumple:
 *   - aria-label para accesibilidad
 *   - focus-visible ring
 *   - Respeta prefers-reduced-motion
 *   - touch-action: manipulation (sin delay de double-tap)
 *   - z-50 para estar encima del contenido
 *   - env(safe-area-inset-bottom) para iPhones con notch
 */
export default function WhatsAppFloat() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > 200);
    }
    // Mostrar inmediatamente si ya scrolleó
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
      className={cn(
        'fixed z-50 flex items-center justify-center',
        'w-14 h-14 rounded-full',
        'bg-[#25D366] text-white shadow-lg',
        'transition-all duration-300',
        'hover:bg-[#1DA851] hover:shadow-xl hover:scale-105',
        'active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2',
        'motion-reduce:transition-none',
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
      style={{
        bottom: 'max(1.25rem, env(safe-area-inset-bottom, 1.25rem))',
        right: '1.25rem',
        touchAction: 'manipulation',
        WebkitTapHighlightColor: 'transparent',
      }}
      onClick={() => EVENTS.whatsappClick('flotante')}
    >
      <IconWhatsApp size={28} />
    </a>
  );
}
