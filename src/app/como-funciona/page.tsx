import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cómo funciona',
  description:
    'Conoce el proceso de compra de productos importados desde Estados Unidos con ChicImportUSA.',
};

/**
 * Cómo funciona placeholder — se implementa en Etapa 4
 */
export default function ComoFuncionaPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Cómo funciona
        </h1>
        <p className="mt-3 text-gray-500">
          Esta página se rediseña en la&nbsp;Etapa&nbsp;4.
        </p>
        <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12">
          <p className="text-sm text-gray-400">
            Aquí irá la explicación simplificada del proceso de compra, FAQ en
            accordion, y CTA de WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}
