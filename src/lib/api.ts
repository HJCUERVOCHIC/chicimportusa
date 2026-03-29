// ============================================================
// ChicImportUSA — Helpers de la API del catálogo
// Centraliza todos los fetch al admin. Server components only.
//
// REGLA: v1 no se toca. Los helpers v2 son aditivos.
// Los server components usan estas funciones directamente
// (con ISR). Los client components usan el proxy /api/catalogo/
// ============================================================

import { CATALOG_API_URL, CATALOG_API_URL_V2 } from '@/lib/constants';

// -----------------------------------------------------------
// Tipos compartidos v1 + v2
// -----------------------------------------------------------

export interface ProductoV1 {
  id: string;
  nombre: string;
  descripcion: string;
  precio_cop: number;
  categoria: string;
  marca: string;
  genero: 'hombre' | 'mujer' | 'unisex';
  destacado: boolean;
  imagen: string;
  imagenes: string[];
}

export interface ProductoV2 extends Omit<ProductoV1, 'genero'> {
  genero: 'hombre' | 'mujer' | 'unisex' | 'ninos' | 'ninas';
  oferta_exclusiva: boolean;
  tiene_descuento: boolean;
  precio_sin_descuento: number | null;
}

export interface Categoria {
  id: string;
  nombre: string;
  total_productos: number;
}

export interface HeroCategoria {
  id: string;
  nombre: string;
  imagenHero: string;
  total_productos?: number;
}

export interface Marca {
  id: string;
  nombre: string;
  total_productos: number;
}

// -----------------------------------------------------------
// Parámetros de filtro
// -----------------------------------------------------------

export interface FiltrosProductosV1 {
  categoria?: string;
  marca?: string;
  precio_min?: number;
  precio_max?: number;
  destacado?: boolean;
  genero?: 'hombre' | 'mujer' | 'unisex';
}

export interface FiltrosProductosV2 extends Omit<FiltrosProductosV1, 'genero'> {
  genero?: 'hombre' | 'mujer' | 'unisex' | 'ninos' | 'ninas';
  oferta_exclusiva?: boolean;
}

// -----------------------------------------------------------
// Fetcher base (interno — no exportar)
// -----------------------------------------------------------

const ISR_REVALIDATE = 300; // 5 minutos

async function fetchAPI<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    next: { revalidate: ISR_REVALIDATE },
    headers: { Accept: 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`[API] Error ${res.status} → ${url}`);
  }

  return res.json() as Promise<T>;
}

function buildParams(filtros: Record<string, unknown>): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(filtros)) {
    if (value !== undefined && value !== null && value !== '') {
      params.set(key, String(value));
    }
  }
  const str = params.toString();
  return str ? `?${str}` : '';
}

// -----------------------------------------------------------
// Helpers v1 — NO MODIFICAR
// -----------------------------------------------------------

/** Listado de productos v1 con filtros opcionales */
export async function getProductos(filtros: FiltrosProductosV1 = {}) {
  const qs = buildParams(filtros as Record<string, unknown>);
  const data = await fetchAPI<{ productos: ProductoV1[] }>(
    `${CATALOG_API_URL}/v1/productos${qs}`
  );
  return data.productos ?? [];
}

/** Producto individual v1 por ID */
export async function getProducto(id: string) {
  const data = await fetchAPI<{ producto: ProductoV1 }>(
    `${CATALOG_API_URL}/v1/productos/${id}`
  );
  return data.producto ?? null;
}

/** Categorías activas v1 */
export async function getCategorias() {
  const data = await fetchAPI<{ categorias: Categoria[] }>(
    `${CATALOG_API_URL}/v1/categorias`
  );
  return data.categorias ?? [];
}

/** Marcas activas v1 */
export async function getMarcas() {
  const data = await fetchAPI<{ marcas: Marca[] }>(
    `${CATALOG_API_URL}/v1/marcas`
  );
  return data.marcas ?? [];
}

// -----------------------------------------------------------
// Helpers v2 — Features nuevos
// -----------------------------------------------------------

/** Listado de productos v2 — incluye oferta_exclusiva, tiene_descuento, precio_sin_descuento */
export async function getProductosV2(filtros: FiltrosProductosV2 = {}) {
  const qs = buildParams(filtros as Record<string, unknown>);
  const data = await fetchAPI<{ productos: ProductoV2[] }>(
    `${CATALOG_API_URL_V2}/productos${qs}`
  );
  return data.productos ?? [];
}

/** Producto individual v2 por ID */
export async function getProductoV2(id: string) {
  const data = await fetchAPI<{ producto: ProductoV2 }>(
    `${CATALOG_API_URL_V2}/productos/${id}`
  );
  return data.producto ?? null;
}

/** Categorías activas v2 con conteo */
export async function getCategoriasV2() {
  const data = await fetchAPI<{ categorias: Categoria[] }>(
    `${CATALOG_API_URL_V2}/categorias`
  );
  return data.categorias ?? [];
}

/** Marcas activas v2 con conteo */
export async function getMarcasV2() {
  const data = await fetchAPI<{ marcas: Marca[] }>(
    `${CATALOG_API_URL_V2}/marcas`
  );
  return data.marcas ?? [];
}

/**
 * Categorías con imagen hero para el carousel principal del home.
 * Solo devuelve categorías con hero_image_url != null.
 * Gestionar imágenes desde el admin → Categorías → Editar → Upload hero.
 */
export async function getHeroCategorias() {
  const data = await fetchAPI<{ categorias: HeroCategoria[] }>(
    `${CATALOG_API_URL_V2}/hero-categorias`
  );
  return data.categorias ?? [];
}
