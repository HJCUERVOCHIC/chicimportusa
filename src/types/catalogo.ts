// ============================================================
// ChicImportUSA — Tipos del Catálogo v2
// ============================================================

export interface ProductoCategoria {
  id: string;
  nombre: string;
  emoji: string;
}

// Tipo base v1 — mantener para compatibilidad
export interface Producto {
  id: string;
  nombre: string;
  marca: string | null;
  categoria: ProductoCategoria;
  genero: 'hombre' | 'mujer' | 'unisex' | null;
  precio: number;
  precio_formateado: string;
  imagen: string | null;
  imagenes: string[];
  descripcion: string | null;
  destacado: boolean;
}

// Tipo v2 — extiende Producto con campos nuevos
export interface ProductoV2 extends Omit<Producto, 'genero'> {
  genero: 'hombre' | 'mujer' | 'unisex' | 'ninos' | 'ninas' | null;
  oferta_exclusiva: boolean;
  tiene_descuento: boolean;
  precio_sin_descuento: number | null;
}

export interface CategoriaResumen {
  id: string;
  nombre: string;
  emoji: string;
  cantidad: number;
}

// ProductosResponse ahora devuelve ProductoV2
export interface ProductosResponse {
  total: number;
  publicacion_activa: boolean;
  actualizado_en: string;
  categorias: CategoriaResumen[];
  productos: ProductoV2[];
}

// -----------------------------------------------------------
// Respuesta de GET /api/catalogo/v2/categorias
// -----------------------------------------------------------

export interface CategoriasResponse {
  categorias: CategoriaResumen[];
  total_productos: number;
}

// -----------------------------------------------------------
// Respuesta de GET /api/catalogo/v2/marcas
// -----------------------------------------------------------

export interface MarcaItem {
  id: string;
  nombre: string;
  icon: string;
  cantidad: number;
}

export interface MarcasResponse {
  marcas: MarcaItem[];
  total_productos: number;
}

// -----------------------------------------------------------
// Respuesta de error
// -----------------------------------------------------------

export interface ApiError {
  error: true;
  mensaje: string;
}

// -----------------------------------------------------------
// Parámetros de filtro — v2 incluye ninos/ninas
// -----------------------------------------------------------

export interface CatalogoFiltros {
  categoria?: string;
  marca?: string;
  genero?: 'hombre' | 'mujer' | 'unisex' | 'ninos' | 'ninas';
  buscar?: string;
  destacados?: boolean;
  limite?: number;
  orden?: 'reciente' | 'precio_asc' | 'precio_desc';
  precio_min?: number;
  precio_max?: number;
  oferta_exclusiva?: boolean;
}

// -----------------------------------------------------------
// Respuesta de GET /api/catalogo/v2/generos
// -----------------------------------------------------------

export interface GeneroItem {
  value: string;
  label: string;
  total_productos: number;
}

export interface GenerosResponse {
  generos: GeneroItem[];
}
