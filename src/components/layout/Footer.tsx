// ============================================================
// ChicImportUSA — Footer Expandido
// Contiene toda la info secundaria: cómo funciona, redes, legal
// ============================================================

import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_LINKS, SOCIAL_LINKS, WHATSAPP_URL, ADMIN_URL, SITE_CONFIG } from '@/lib/constants';
import { IconInstagram, IconTikTok, IconWhatsApp } from '@/components/ui/Icons';

const COMO_FUNCIONA = [
  { num: '01', title: 'Elige',       desc: 'Selecciona un producto del catálogo.' },
  { num: '02', title: 'Escríbenos', desc: 'Envía la referencia por WhatsApp con talla y color.' },
  { num: '03', title: 'Confirmamos', desc: 'Precio final, disponibilidad y tiempo de entrega.' },
  { num: '04', title: 'Despachamos', desc: '50% para separar, 50% al llegar a Colombia.' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#111] text-gray-400" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">

        {/* Como funciona */}
        <div className="mb-12 pb-12 border-b border-gray-800">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-500 mb-8 font-body">
            Como funciona
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            {COMO_FUNCIONA.map((step) => (
              <div key={step.num}>
                <div className="w-7 h-7 rounded-full bg-[#D90429] flex items-center justify-center mb-3">
                  <span className="text-[10px] font-bold text-white font-body">{step.num}</span>
                </div>
                <h3 className="text-sm font-bold text-white mb-1 font-body">{step.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed font-body">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Grid principal */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-md">
              <Image src="/img/logo-footer.png" alt="ChicImportUSA" width={143} height={48} className="h-10 w-auto" />
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-gray-500">
              Productos importados desde Estados Unidos. Tenis, perfumes, ropa y mas.
            </p>
            <div className="mt-4 flex items-center gap-1">
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="p-2 text-gray-600 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-md">
                <IconInstagram size={18} />
              </a>
              <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok"
                className="p-2 text-gray-600 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-md">
                <IconTikTok size={18} />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="p-2 text-gray-600 hover:text-[#25D366] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-md">
                <IconWhatsApp size={18} />
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Navegacion</h2>
            <ul className="mt-3 space-y-2" role="list">
              {FOOTER_LINKS.navegacion.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Legal</h2>
            <ul className="mt-3 space-y-2" role="list">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">Contactanos</h2>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              Escribenos para pedir un producto o preguntar por disponibilidad.
            </p>
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1DA851] active:scale-[0.98] transition-all">
              <IconWhatsApp size={16} />
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">&copy; {currentYear} {SITE_CONFIG.name}. Todos los derechos reservados.</p>
          <a href={ADMIN_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-gray-700 hover:text-gray-500 transition-colors">Admin</a>
        </div>
      </div>
    </footer>
  );
}
