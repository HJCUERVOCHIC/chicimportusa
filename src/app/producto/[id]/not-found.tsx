// ============================================================
// ChicImportUSA — /producto/[id] → 404
// ============================================================

import Link from 'next/link';

export default function ProductoNotFound() {
  return (
    <main className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
        <svg
          aria-hidden="true"
          width={32}
          height={32}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          className="text-gray-400"
        >
          <circle cx={11} cy={11} r={8} />
          <path d="m21 21-4.3-4.3" />
          <path d="M8 11h6" />
        </svg>
      </div>
      <h1 className="text-xl font-bold text-gray-900">
        Producto no encontrado
      </h1>
      <p
        className="mt-2 text-sm text-gray-500 leading-relaxed"
        style={{ textWrap: 'pretty' } as React.CSSProperties}
      >
        Este producto ya no está disponible o el enlace es incorrecto.
        Revisa nuestro catálogo para ver los productos actuales.
      </p>
      <Link
        href="/catalogo"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
      >
        Ver catálogo
      </Link>
    </main>
  );
}
