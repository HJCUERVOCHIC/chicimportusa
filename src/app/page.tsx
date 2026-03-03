import Link from 'next/link';
import { WHATSAPP_URL } from '@/lib/constants';
import { IconWhatsApp, IconChevronRight } from '@/components/ui/Icons';

/**
 * Homepage placeholder — Etapa 1
 *
 * Este es un placeholder temporal que demuestra que el layout,
 * header, footer y WhatsApp flotante funcionan correctamente.
 *
 * Se reemplaza completamente en la Etapa 3 con el homepage comercial
 * (hero, categorías, productos destacados, etc.).
 */
export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-[#D90429]">
          <span
            className="h-1.5 w-1.5 rounded-full bg-[#D90429] animate-pulse"
            aria-hidden="true"
          />
          Rediseño en progreso
        </span>

        {/* Título */}
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
            style={{ textWrap: 'balance' } as React.CSSProperties}>
          Productos importados desde Estados&nbsp;Unidos
        </h1>

        {/* Subtítulo */}
        <p className="mt-4 text-lg text-gray-600 leading-relaxed"
           style={{ textWrap: 'pretty' } as React.CSSProperties}>
          Tenis, perfumes, ropa y más. Precios publicados, proceso transparente.
          Todo se gestiona por&nbsp;WhatsApp.
        </p>

        {/* CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/catalogo"
            className="inline-flex items-center gap-2 rounded-lg bg-[#D90429] px-6 py-3 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#B80323] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2"
          >
            Ver catálogo
            <IconChevronRight size={16} />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-150 hover:bg-gray-50 hover:border-gray-300 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2"
          >
            <IconWhatsApp size={16} className="text-[#25D366]" />
            Escribir por WhatsApp
          </a>
        </div>

        {/* Nota de Etapa */}
        <div className="mt-16 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-6">
          <p className="text-sm font-medium text-gray-500">
            Etapa&nbsp;1 completada&nbsp;✓
          </p>
          <p className="mt-1 text-xs text-gray-400">
            Header, footer, navegación, redes sociales y WhatsApp flotante funcionando.
            El homepage comercial completo se implementa en la&nbsp;Etapa&nbsp;3.
          </p>
        </div>
      </div>
    </div>
  );
}
