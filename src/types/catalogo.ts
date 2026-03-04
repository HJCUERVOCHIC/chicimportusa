// ============================================================
// ChicImportUSA — Tipos del Catálogo
// Reflejan la estructura REAL de la API en producción:
// https://admin.chicimportusa.com/api/catalogo/*
// ============================================================

// -----------------------------------------------------------
// Respuesta de GET /api/catalogo/productos
// -----------------------------------------------------------

export interface ProductoCategoria {
  id: string;
  nombre: string;
  emoji: string;
}

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

export interface CategoriaResumen {
  id: string;
  nombre: string;
  emoji: string;
  cantidad: number;
}

export interface ProductosResponse {
  total: number;
  publicacion_activa: boolean;
  actualizado_en: string;
  categorias: CategoriaResumen[];
  productos: Producto[];
}

// -----------------------------------------------------------
// Respuesta de GET /api/catalogo/categorias
// -----------------------------------------------------------

export interface CategoriasResponse {
  categorias: CategoriaResumen[];
  total_productos: number;
}

// -----------------------------------------------------------
// Respuesta de GET /api/catalogo/marcas
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
// Parámetros de filtro
// -----------------------------------------------------------

export interface CatalogoFiltros {
  categoria?: string;
  marca?: string;
  genero?: 'hombre' | 'mujer' | 'unisex';
  buscar?: string;
  destacados?: boolean;
  limite?: number;
  orden?: 'reciente' | 'precio_asc' | 'precio_desc';
  precio_min?: number;
  precio_max?: number;
}
