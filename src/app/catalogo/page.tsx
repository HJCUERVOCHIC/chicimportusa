// ============================================================
// ChicImportUSA — /catalogo → redirect a /
// La homepage ya es el catalogo completo.
// ============================================================

import { redirect } from 'next/navigation';

interface CatalogoPageProps {
  searchParams: Promise<Record<string, string>>;
}

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const params = await searchParams;
  const qs = new URLSearchParams(params).toString();
  redirect(qs ? `/?${qs}` : '/');
}
