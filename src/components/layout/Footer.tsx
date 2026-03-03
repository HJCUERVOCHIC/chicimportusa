import Link from 'next/link';
import Image from 'next/image';
import { FOOTER_LINKS, SOCIAL_LINKS, WHATSAPP_URL, ADMIN_URL, SITE_CONFIG } from '@/lib/constants';
import { IconInstagram, IconTikTok, IconWhatsApp } from '@/components/ui/Icons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Columna 1: Logo y descripción */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950 rounded-md"
            >
              <Image
                src="/img/logo.png"
                alt=""
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-base font-bold text-white tracking-tight">
                ChicImportUSA
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              Productos importados desde Estados Unidos. Tenis, perfumes,
              ropa&nbsp;y&nbsp;más.
            </p>

            {/* Redes sociales */}
            <div className="mt-4 flex items-center gap-2">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de ChicImportUSA"
                className="p-2 text-gray-500 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-md"
              >
                <IconInstagram size={18} />
              </a>
              <a
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok de ChicImportUSA"
                className="p-2 text-gray-500 transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-md"
              >
                <IconTikTok size={18} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de ChicImportUSA"
                className="p-2 text-gray-500 transition-colors duration-150 hover:text-[#25D366] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-md"
              >
                <IconWhatsApp size={18} />
              </a>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Navegación
            </h2>
            <ul className="mt-3 space-y-2" role="list">
              {FOOTER_LINKS.navegacion.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Legal */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Legal
            </h2>
            <ul className="mt-3 space-y-2" role="list">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors duration-150 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: WhatsApp CTA */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Contáctanos
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              Escríbenos por WhatsApp para pedir un producto o preguntar por
              disponibilidad.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-all duration-150 hover:bg-[#1DA851] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
            >
              <IconWhatsApp size={16} />
              Escribir por WhatsApp
            </a>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="mt-10 border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-gray-600">
            &copy; {currentYear} {SITE_CONFIG.name}. Todos los derechos reservados.
          </p>
          <a
            href={ADMIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-700 transition-colors duration-150 hover:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] rounded-sm"
          >
            Admin
          </a>
        </div>
      </div>
    </footer>
  );
}
