# Guía de Integración — API Catálogo v2
**Proyecto:** chicimportusa.com  
**Admin API base:** `https://admin.chicimportusa.com/api/catalogo`  
**Fecha:** 27 de marzo de 2026  
**Versión del documento:** 1.0

---

## Índice

1. [Contexto y estrategia de migración](#1-contexto-y-estrategia-de-migración)
2. [Resumen de endpoints disponibles](#2-resumen-de-endpoints-disponibles)
3. [Diferencias entre v1 y v2](#3-diferencias-entre-v1-y-v2)
4. [Referencia de endpoints v2](#4-referencia-de-endpoints-v2)
5. [Hero de categorías — manejo de imágenes](#5-hero-de-categorías--manejo-de-imágenes)
6. [Ejemplos de implementación](#6-ejemplos-de-implementación)
7. [Checklist de migración](#7-checklist-de-migración)

---

## 1. Contexto y estrategia de migración

### ¿Por qué existe v2?

La versión 2 de la API es una versión **aditiva** sobre v1. No rompe ninguna interfaz existente — agrega campos nuevos y soporta filtros adicionales que el sitio público necesita para mostrar descuentos, ofertas exclusivas y el carousel de categorías con imagen.

### Regla fundamental: v1 sigue activa

> ⚠️ **No modificar ni deprecar v1 durante la integración.**  
> v1 debe permanecer funcional en todo momento. Cualquier funcionalidad existente que consuma v1 debe seguir operando sin cambios hasta que la migración a v2 esté completamente verificada en producción.

### Estrategia recomendada

```
Fase 1 → Implementar features nuevos usando v2 exclusivamente
Fase 2 → Validar en producción que v2 responde correctamente
Fase 3 → Migrar gradualmente los consumos de v1 a v2
Fase 4 → Deprecar v1 (decisión futura, requiere confirmación explícita)
```

---

## 2. Resumen de endpoints disponibles

Todos los endpoints son **públicos** (sin autenticación), tienen **CORS habilitado** y son `force-dynamic` (sin caché en el servidor admin). El caché ISR de 5 minutos (`s-maxage=300`) se configura en el lado de `chicimportusa.com`.

| Endpoint | v1 | v2 | Descripción |
|---|---|---|---|
| `/api/catalogo/productos` | ✅ Activo | ✅ Activo | Listado con filtros |
| `/api/catalogo/productos/:id` | ✅ Activo | ✅ Activo | Producto individual |
| `/api/catalogo/categorias` | ✅ Activo | ✅ Activo | Categorías activas |
| `/api/catalogo/marcas` | ✅ Activo | ✅ Activo | Marcas activas |
| `/api/catalogo/hero-categorias` | ✅ Activo | ✅ Activo | **Categorías con imagen hero para carousel** |

### URLs completas por versión

```
# v1
https://admin.chicimportusa.com/api/catalogo/v1/productos
https://admin.chicimportusa.com/api/catalogo/v1/productos/:id
https://admin.chicimportusa.com/api/catalogo/v1/categorias
https://admin.chicimportusa.com/api/catalogo/v1/marcas
https://admin.chicimportusa.com/api/catalogo/v1/hero-categorias

# v2
https://admin.chicimportusa.com/api/catalogo/v2/productos
https://admin.chicimportusa.com/api/catalogo/v2/productos/:id
https://admin.chicimportusa.com/api/catalogo/v2/categorias
https://admin.chicimportusa.com/api/catalogo/v2/marcas
https://admin.chicimportusa.com/api/catalogo/v2/hero-categorias
```

### Filtro dual activo en todos los endpoints

Todos los endpoints aplican automáticamente este filtro en la base de datos — el sitio público solo recibe productos en listas publicadas y con estado publicado:

```sql
listas_oferta.estado = 'publicada'
AND productos.estado = 'publicado'
```

No es necesario aplicar ningún filtro adicional en el frontend para ocultar productos no disponibles.

---

## 3. Diferencias entre v1 y v2

### Campos nuevos en v2

#### En `/productos` y `/productos/:id`

| Campo | Tipo | Descripción |
|---|---|---|
| `oferta_exclusiva` | `boolean` | `true` si el producto es una oferta exclusiva |
| `tiene_descuento` | `boolean` | `true` si el producto tiene precio con descuento activo |
| `precio_sin_descuento` | `number \| null` | Precio original en COP antes del descuento. `null` si no tiene descuento |

> **Exclusión mutua:** `destacado` y `oferta_exclusiva` nunca son `true` al mismo tiempo. Si `destacado = true`, entonces `oferta_exclusiva = false`, y viceversa. Esta lógica está garantizada desde el admin.

#### Badges visuales sugeridos según campos

```
destacado = true        → Badge ⭐ color amber   (producto destacado)
oferta_exclusiva = true → Badge 🏷️ color purple  (oferta exclusiva)
tiene_descuento = true  → Mostrar precio tachado + precio con descuento
```

### Parámetros de filtro nuevos en v2

#### En `/productos`

| Parámetro | Valores | Descripción |
|---|---|---|
| `genero` | `hombre`, `mujer`, `unisex`, `ninos`, `ninas` | Filtra por género |
| `oferta_exclusiva` | `true` | Devuelve solo productos con oferta exclusiva |
| `destacado` | `true` | Devuelve solo productos destacados |

> **Nota v1 vs v2 en géneros:** v1 solo soporta `hombre`, `mujer`, `unisex`. Los géneros `ninos` y `ninas` solo están disponibles en v2.

#### Parámetros compartidos con v1

```
categoria     → Filtra por nombre de categoría
marca         → Filtra por nombre de marca
precio_min    → Precio mínimo en COP
precio_max    → Precio máximo en COP
destacado     → true/false
```

---

## 4. Referencia de endpoints v2

### `GET /api/catalogo/v2/productos`

Devuelve el listado de productos publicados con todos los campos de v2.

**Ejemplo de respuesta:**

```json
{
  "productos": [
    {
      "id": "uuid-del-producto",
      "nombre": "Nombre del producto",
      "descripcion": "Descripción",
      "precio_cop": 150000,
      "precio_sin_descuento": 180000,
      "tiene_descuento": true,
      "categoria": "Ropa",
      "marca": "Marca X",
      "genero": "mujer",
      "destacado": false,
      "oferta_exclusiva": true,
      "imagen": "https://url-imagen-principal.jpg",
      "imagenes": ["https://url-1.jpg", "https://url-2.jpg"]
    }
  ]
}
```

**Ejemplos de uso con filtros:**

```js
// Todos los productos
fetch('https://admin.chicimportusa.com/api/catalogo/v2/productos')

// Solo ofertas exclusivas
fetch('https://admin.chicimportusa.com/api/catalogo/v2/productos?oferta_exclusiva=true')

// Productos para niñas (solo disponible en v2)
fetch('https://admin.chicimportusa.com/api/catalogo/v2/productos?genero=ninas')

// Productos destacados de una categoría
fetch('https://admin.chicimportusa.com/api/catalogo/v2/productos?destacado=true&categoria=Ropa')
```

---

### `GET /api/catalogo/v2/productos/:id`

Devuelve un producto individual. Misma estructura que el listado pero para un solo producto.

```js
fetch('https://admin.chicimportusa.com/api/catalogo/v2/productos/uuid-del-producto')
```

---

### `GET /api/catalogo/v2/categorias`

Devuelve todas las categorías activas con conteo de productos publicados.

```json
{
  "categorias": [
    {
      "id": "uuid",
      "nombre": "Ropa",
      "total_productos": 24
    }
  ]
}
```

---

### `GET /api/catalogo/v2/marcas`

Devuelve todas las marcas activas con conteo de productos publicados.

```json
{
  "marcas": [
    {
      "id": "uuid",
      "nombre": "Marca X",
      "total_productos": 8
    }
  ]
}
```

---

### `GET /api/catalogo/v2/hero-categorias`

Este es el endpoint más importante para el sitio público. Ver sección completa abajo.

---

## 5. Hero de categorías — manejo de imágenes

### ¿Qué es hero-categorias?

Es un endpoint dedicado exclusivamente al **carousel principal del sitio**. Devuelve solo las categorías que tienen una imagen hero asignada, listas para renderizar directamente.

### ¿De dónde vienen las imágenes?

Las imágenes hero son gestionadas desde el admin en la sección de **Categorías**. El flujo desde el admin es:

```
Admin → Categorías → Editar categoría → Upload imagen hero
→ Se almacena en Supabase Storage: productos-imagenes/categorias/[nombre].ext
→ La URL pública queda guardada en categories.hero_image_url
→ El endpoint hero-categorias solo devuelve categorías con hero_image_url != null
```

### Respuesta del endpoint

```js
fetch('https://admin.chicimportusa.com/api/catalogo/v2/hero-categorias')
```

```json
{
  "categorias": [
    {
      "id": "uuid",
      "nombre": "Ropa Mujer",
      "hero_image_url": "https://[proyecto].supabase.co/storage/v1/object/public/productos-imagenes/categorias/ropa-mujer.jpg",
      "total_productos": 18
    },
    {
      "id": "uuid-2",
      "nombre": "Accesorios",
      "hero_image_url": "https://[proyecto].supabase.co/storage/v1/object/public/productos-imagenes/categorias/accesorios.jpg",
      "total_productos": 12
    }
  ]
}
```

> ⚠️ **Importante:** Si una categoría no tiene imagen hero asignada, **no aparece en este endpoint**. Solo se listan las categorías con imagen. Esto es intencional: el carousel solo muestra lo que el admin ha configurado visualmente.

### Implementación del carousel

```jsx
// Ejemplo en Next.js con ISR
export async function getStaticProps() {
  const res = await fetch(
    'https://admin.chicimportusa.com/api/catalogo/v2/hero-categorias'
  )
  const data = await res.json()

  return {
    props: { categorias: data.categorias || [] },
    revalidate: 300 // ISR: revalida cada 5 minutos
  }
}

// Componente carousel
export default function HeroCarousel({ categorias }) {
  if (!categorias.length) return null

  return (
    <div className="carousel">
      {categorias.map((cat) => (
        <div key={cat.id} className="slide">
          <img
            src={cat.hero_image_url}
            alt={cat.nombre}
            // Las imágenes vienen de Supabase Storage (CDN público)
            // No requieren autenticación ni headers especiales
          />
          <div className="overlay">
            <h2>{cat.nombre}</h2>
            <p>{cat.total_productos} productos</p>
            <a href={`/catalogo?categoria=${cat.nombre}`}>
              Ver colección
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}
```

### Consideraciones sobre las imágenes

- Las URLs son **públicas y permanentes** — vienen del CDN de Supabase Storage
- El formato de las imágenes es variable (jpg, png, webp) según lo que el admin haya subido
- El tamaño recomendado para hero es **landscape o cuadrado** — coordinar con quien gestiona el admin para subir imágenes con dimensiones apropiadas para el carousel (sugerido: mínimo 1200×600px para landscape o 800×800px para cuadrado)
- Si el admin elimina la imagen de una categoría, la URL deja de ser válida — siempre usar `onError` en el `<img>` para manejar imágenes rotas

```jsx
<img
  src={cat.hero_image_url}
  alt={cat.nombre}
  onError={(e) => { e.target.style.display = 'none' }}
/>
```

---

## 6. Ejemplos de implementación

### Fetcher genérico con ISR (Next.js)

```js
// lib/api.js — utilidad compartida para consumir la API del admin

const API_BASE = 'https://admin.chicimportusa.com/api/catalogo'

async function fetchCatalogo(path, version = 'v2') {
  const url = `${API_BASE}/${version}/${path}`
  const res = await fetch(url, {
    next: { revalidate: 300 } // ISR: caché de 5 minutos
  })

  if (!res.ok) {
    throw new Error(`Error al consultar API: ${url} → ${res.status}`)
  }

  return res.json()
}

// Exports para uso en páginas
export const getProductos = (params = '', version = 'v2') =>
  fetchCatalogo(`productos${params ? `?${params}` : ''}`, version)

export const getProducto = (id, version = 'v2') =>
  fetchCatalogo(`productos/${id}`, version)

export const getCategorias = (version = 'v2') =>
  fetchCatalogo('categorias', version)

export const getMarcas = (version = 'v2') =>
  fetchCatalogo('marcas', version)

export const getHeroCategorias = (version = 'v2') =>
  fetchCatalogo('hero-categorias', version)
```

### Consumo en una página de catálogo

```js
// app/catalogo/page.js
import { getProductos } from '@/lib/api'

export const revalidate = 300

export default async function CatalogoPage({ searchParams }) {
  const params = new URLSearchParams()

  if (searchParams.categoria) params.set('categoria', searchParams.categoria)
  if (searchParams.marca) params.set('marca', searchParams.marca)
  if (searchParams.genero) params.set('genero', searchParams.genero)

  // Usa v2 por defecto para acceder a campos de descuento y oferta
  const data = await getProductos(params.toString())
  const productos = data.productos || []

  return (
    <div>
      {productos.map((p) => (
        <ProductCard key={p.id} producto={p} />
      ))}
    </div>
  )
}
```

### Card de producto con campos de v2

```jsx
// components/ProductCard.jsx
export function ProductCard({ producto }) {
  const {
    nombre,
    precio_cop,
    precio_sin_descuento,
    tiene_descuento,
    destacado,
    oferta_exclusiva,
    imagen
  } = producto

  return (
    <div className="product-card">
      {/* Badges */}
      {destacado && (
        <span className="badge badge-amber">⭐ Destacado</span>
      )}
      {oferta_exclusiva && (
        <span className="badge badge-purple">🏷️ Oferta Exclusiva</span>
      )}

      <img src={imagen} alt={nombre} />
      <h3>{nombre}</h3>

      {/* Precio con descuento */}
      {tiene_descuento && precio_sin_descuento ? (
        <div className="precio">
          <span className="precio-original tachado">
            {formatCOP(precio_sin_descuento)}
          </span>
          <span className="precio-actual">{formatCOP(precio_cop)}</span>
        </div>
      ) : (
        <span className="precio-actual">{formatCOP(precio_cop)}</span>
      )}
    </div>
  )
}

function formatCOP(valor) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(valor)
}
```

---

## 7. Checklist de migración

Usar esta lista para validar cada feature antes de marcar v2 como estable.

### Implementación inicial (features nuevos en v2)

- [ ] Carousel de home consume `/v2/hero-categorias` y renderiza imágenes correctamente
- [ ] Imagen hero muestra el nombre de la categoría y enlaza al catálogo filtrado
- [ ] Se maneja el caso de `hero_image_url` roto con `onError`
- [ ] Badges de `destacado` y `oferta_exclusiva` se muestran correctamente en cards
- [ ] Precio tachado se muestra cuando `tiene_descuento = true` y `precio_sin_descuento != null`
- [ ] Filtro por `genero=ninos` y `genero=ninas` funciona en la página de catálogo
- [ ] Filtro por `oferta_exclusiva=true` funciona en sección de ofertas

### Validación en producción

- [ ] Los endpoints v1 existentes siguen respondiendo sin cambios
- [ ] El ISR (`revalidate: 300`) está configurado en todas las páginas que consumen la API
- [ ] No hay errores 404 o 500 en los endpoints v2 en producción
- [ ] Las imágenes hero cargan correctamente desde Supabase Storage

### Antes de deprecar v1 (fase futura)

- [ ] Todos los consumos de v1 han sido migrados a v2
- [ ] Se confirma con el equipo admin que no hay integraciones externas usando v1 (n8n, etc.)
- [ ] Prueba de regresión completa en el sitio público
- [ ] Confirmación explícita del equipo para proceder con la deprecación

---

*Documento generado para el proyecto Chic Import USA — chicimportusa.com*  
*API admin mantenida en admin.chicimportusa.com*
