// ============================================================
// ChicImportUSA — Cliente API del Catálogo v2
// Funciones tipadas para consumir la API de admin.chicimportusa.com
// Diseñado para Server Components con ISR (revalidate: 300)
// ============================================================

import { CATALOG_API_URL_V2 } from './constants';
import type {
  ProductoV2,
  ProductosResponse,
  CategoriasResponse,
  MarcasResponse,
  GenerosResponse,
  CatalogoFiltros,
} from '@/types/catalogo';

/** Tiempo de revalidación para ISR — 5 minutos */
const REVALIDATE_SECONDS = 300;

/** Respuesta vacía por defecto (fallback seguro) */
const EMPTY_PRODUCTOS: ProductosResponse = {
  total: 0,
  publicacion_activa: false,
  actualizado_en: new Date().toISOString(),
  categorias: [],
  productos: [],
};

const EMPTY_CATEGORIAS: CategoriasResponse = {
  categorias: [],
  total_productos: 0,
};

const EMPTY_MARCAS: MarcasResponse = {
  marcas: [],
  total_productos: 0,
};

// -----------------------------------------------------------
// GET /api/catalogo/v2/productos
// -----------------------------------------------------------

export async function getProductos(
  filtros: CatalogoFiltros = {}
): Promise<ProductosResponse> {
  try {
    const params = new URLSearchParams();

    if (filtros.categoria)  params.set('categoria',  filtros.categoria);
    if (filtros.marca)      params.set('marca',      filtros.marca);
    if (filtros.genero)     params.set('genero',     filtros.genero);
    if (filtros.buscar)     params.set('buscar',     filtros.buscar);
    if (filtros.destacados)       params.set('destacados',       'true');
    if (filtros.oferta_exclusiva) params.set('oferta_exclusiva', 'true');
    if (filtros.limite)           params.set('limite',           filtros.limite.toString());
    if (filtros.orden)      params.set('orden',      filtros.orden);
    if (filtros.precio_min) params.set('precio_min', filtros.precio_min.toString());
    if (filtros.precio_max) params.set('precio_max', filtros.precio_max.toString());

    const queryString = params.toString();
    const url = `${CATALOG_API_URL_V2}/productos${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(`[API Catálogo v2] Error ${res.status}: ${res.statusText}`);
      return EMPTY_PRODUCTOS;
    }

    return await res.json();
  } catch (error) {
    console.error('[API Catálogo v2] Error de red al obtener productos:', error);
    return EMPTY_PRODUCTOS;
  }
}

// -----------------------------------------------------------
// GET /api/catalogo/v2/productos/:id
// -----------------------------------------------------------

export async function getProductoById(
  id: string
): Promise<ProductoV2 | null> {
  try {
    const url = `${CATALOG_API_URL_V2}/productos/${id}`;

    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(`[API Catálogo v2] Producto ${id}: error ${res.status}`);
      return null;
    }

    const data = await res.json();

    if (data.producto) return data.producto;
    if (data.id)       return data;

    return null;
  } catch (error) {
    console.error(`[API Catálogo v2] Error de red al obtener producto ${id}:`, error);
    return null;
  }
}

// -----------------------------------------------------------
// GET /api/catalogo/v2/categorias
// -----------------------------------------------------------

export async function getCategorias(
  genero?: string
): Promise<CategoriasResponse> {
  try {
    const params = new URLSearchParams();
    if (genero) params.set('genero', genero);

    const queryString = params.toString();
    const url = `${CATALOG_API_URL_V2}/categorias${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(`[API Catálogo v2] Error ${res.status} en categorías`);
      return EMPTY_CATEGORIAS;
    }

    return await res.json();
  } catch (error) {
    console.error('[API Catálogo v2] Error de red al obtener categorías:', error);
    return EMPTY_CATEGORIAS;
  }
}

// -----------------------------------------------------------
// GET /api/catalogo/v2/marcas
// -----------------------------------------------------------

export async function getMarcas(
  categoria?: string,
  genero?: string
): Promise<MarcasResponse> {
  try {
    const params = new URLSearchParams();
    if (categoria) params.set('categoria', categoria);
    if (genero)    params.set('genero',    genero);

    const queryString = params.toString();
    const url = `${CATALOG_API_URL_V2}/marcas${queryString ? `?${queryString}` : ''}`;

    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(`[API Catálogo v2] Error ${res.status} en marcas`);
      return EMPTY_MARCAS;
    }

    return await res.json();
  } catch (error) {
    console.error('[API Catálogo v2] Error de red al obtener marcas:', error);
    return EMPTY_MARCAS;
  }
}

// -----------------------------------------------------------
// GET /api/catalogo/v2/generos
// -----------------------------------------------------------

export async function getGeneros(): Promise<GenerosResponse> {
  try {
    const url = `${CATALOG_API_URL_V2}/generos`;

    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
    });

    if (!res.ok) {
      console.error(`[API Catálogo v2] Error ${res.status} en géneros`);
      return { generos: [] };
    }

    return await res.json();
  } catch (error) {
    console.error('[API Catálogo v2] Error de red al obtener géneros:', error);
    return { generos: [] };
  }
}
