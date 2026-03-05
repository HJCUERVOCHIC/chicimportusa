'use client';

// ============================================================
// ChicImportUSA — FinalCTA · Nieve Activa
// ============================================================

import Link from 'next/link';
import { WHATSAPP_URL } from '@/lib/constants';
import { EVENTS } from '@/lib/analytics';
import { IconWhatsApp } from '@/components/ui/Icons';

export default function FinalCTA() {
  return (
    <section className="bg-[#D90429] py-16 sm:py-20 px-5 sm:px-6 text-center">
      <div className="max-w-[500px] mx-auto">
        <h2 className="font-display text-[clamp(36px,6vw,56px)] text-white leading-none mb-4">
          ¿LISTO PARA
          <br />
          TU PRÓXIMO PEDIDO?
        </h2>

        <p className="text-sm text-white/80 mb-8 font-body leading-relaxed">
          Únete al grupo para recibir publicaciones con productos nuevos
          cada semana.
        </p>

        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 bg-white text-[#111] px-9 py-4 rounded-lg text-sm font-bold font-body tracking-[0.03em] hover:bg-white/90 active:scale-[0.98] transition-colors duration-200 shadow-[0_4px_24px_rgba(0,0,0,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#D90429]"
          onClick={() => EVENTS.whatsappClick('cta_final', 'homepage')}
        >
          <IconWhatsApp size={18} />
          UNIRME AL WHATSAPP
        </a>

        <p className="text-[11px] text-white/40 mt-5 font-body">
          Al continuar, aceptas nuestros{' '}
          <Link href="/terminos-y-condiciones" className="underline underline-offset-2 hover:text-white/60">
            Términos y Condiciones
          </Link>{' '}
          y{' '}
          <Link href="/politica-de-privacidad" className="underline underline-offset-2 hover:text-white/60">
            Política de Privacidad
          </Link>.
        </p>
      </div>
    </section>
  );
}
