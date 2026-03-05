// ============================================================
// ChicImportUSA — /producto/[id] → 404 · Etapa 3 Dark Theme
// ============================================================

import Link from 'next/link';

export default function ProductoNotFound() {
  return (
    <main className="min-h-[70vh] bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-24 text-center">
      <span
        className="text-[120px] leading-none text-white/5 select-none mb-4"
        style={{ fontFamily: 'var(--font-bebas-neue, cursive)' }}
        aria-hidden="true"
      >
        404
      </span>
      <h1
        className="text-4xl text-white/60"
        style={{ fontFamily: 'var(--font-bebas-neue, cursive)', letterSpacing: '0.05em' }}
      >
        Producto no encontrado
      </h1>
      <p
        className="mt-3 max-w-sm text-sm text-white/30 leading-relaxed"
        style={{ textWrap: 'pretty' } as React.CSSProperties}
      >
        Este producto ya no está disponible o el enlace es incorrecto.
        Revisa nuestro catálogo para ver los productos actuales.
      </p>
      <Link
        href="/catalogo"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-[#D90429] hover:bg-[#b8031f] text-white text-sm font-bold tracking-widest uppercase transition-all duration-200 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D90429] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
      >
        Ver catálogo
      </Link>
    </main>
  );
}
