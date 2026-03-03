# API del Catálogo — Guía de Integración para chicimportusa.com

## Contexto

La plataforma de administración de Chic Import USA (`admin.chicimportusa.com`) expone una **API REST pública de solo lectura** que devuelve los productos publicados del catálogo. Esta API está diseñada para ser consumida desde el sitio web público `chicimportusa.com`, reemplazando el sistema actual de iframe embebido.

La API ya está desplegada y funcionando en producción.

---

## Base URL

```
https://admin.chicimportusa.com/api/catalogo
```

---

## Endpoints Disponibles

### 1. GET /api/catalogo/productos

Devuelve los productos publicados en las listas activas del catálogo.

**URL completa:** `https://admin.chicimportusa.com/api/catalogo/productos`

#### Filtros (query params — todos opcionales, combinables entre sí)

| Parámetro | Tipo | Valores | Descripción |
|-----------|------|---------|-------------|
| `categoria` | string | Slug de categoría (ej: `calzado`, `perfumeria`, `ropa`) | Filtra productos por categoría |
| `marca` | string | Slug de marca (ej: `nike`, `adidas`, `victoria_secret`) | Filtra productos por marca |
| `genero` | string | `hombre`, `mujer`, `unisex` | Filtra por género del producto |
| `buscar` | string | Texto libre | Busca en título y marca (case-insensitive) |
| `destacados` | string | `true` | Devuelve solo productos marcados como destacados |
| `limite` | number | Entero positivo (ej: `8`, `12`, `20`) | Limita la cantidad de resultados |
| `orden` | string | `reciente` (default), `precio_asc`, `precio_desc` | Ordena los resultados |
| `precio_min` | number | Entero en COP (ej: `100000`) | Precio mínimo |
| `precio_max` | number | Entero en COP (ej: `500000`) | Precio máximo |

#### Ejemplos de requests

```bash
# Todos los productos
GET /api/catalogo/productos

# Calzado de mujer ordenado por precio
GET /api/catalogo/productos?categoria=calzado&genero=mujer&orden=precio_asc

# 8 productos destacados para el homepage
GET /api/catalogo/productos?destacados=true&limite=8

# Buscar "Nike" en un rango de precio
GET /api/catalogo/productos?buscar=nike&precio_min=200000&precio_max=600000

# Perfumería para hombre, los más recientes
GET /api/catalogo/productos?categoria=perfumeria&genero=hombre&orden=reciente

# Solo ropa, máximo 12 resultados
GET /api/catalogo/productos?categoria=ropa&limite=12
```

#### Respuesta exitosa (200)

```json
{
  "total": 48,
  "publicacion_activa": true,
  "actualizado_en": "2026-02-28T20:15:00.000Z",
  "categorias": [
    { "id": "calzado", "nombre": "Calzado", "emoji": "👟", "cantidad": 25 },
    { "id": "perfumeria", "nombre": "Perfumería", "emoji": "🫧", "cantidad": 15 },
    { "id": "ropa", "nombre": "Ropa", "emoji": "👕", "cantidad": 8 }
  ],
  "productos": [
    {
      "id": "uuid-del-producto",
      "nombre": "Nike Court Vision Mid",
      "marca": "Nike",
      "categoria": {
        "id": "calzado",
        "nombre": "Calzado",
        "emoji": "👟"
      },
      "genero": "hombre",
      "precio": 472420,
      "precio_formateado": "$ 472.420",
      "imagen": "https://kwprtjcfoawvpjvtefwx.supabase.co/storage/v1/object/public/productos-imagenes/productos/imagen.avif",
      "imagenes": [
        "https://kwprtjcfoawvpjvtefwx.supabase.co/.../imagen1.avif",
        "https://kwprtjcfoawvpjvtefwx.supabase.co/.../imagen2.avif"
      ],
      "descripcion": "Zapatilla de caña media para uso casual",
      "destacado": true
    }
  ]
}
```

#### Campos de cada producto

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `id` | string (UUID) | Identificador único del producto |
| `nombre` | string | Nombre del producto |
| `marca` | string \| null | Nombre de la marca (ya formateado, ej: "Nike" no "nike") |
| `categoria` | object | `{ id, nombre, emoji }` — categoría con nombre legible y emoji |
| `genero` | string \| null | `"hombre"`, `"mujer"`, `"unisex"`, o `null` si no aplica |
| `precio` | number | Precio en COP como entero (sin formato) — usar para cálculos y ordenamiento |
| `precio_formateado` | string | Precio ya formateado para mostrar (ej: `"$ 472.420"`) |
| `imagen` | string \| null | URL de la primera imagen (para cards/thumbnails) |
| `imagenes` | string[] | Array con todas las URLs de imágenes del producto |
| `descripcion` | string \| null | Descripción del producto (puede ser null) |
| `destacado` | boolean | `true` si el producto está marcado como destacado |

#### Campos del response raíz

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `total` | number | Cantidad total de productos devueltos |
| `publicacion_activa` | boolean | `true` si hay al menos un producto publicado |
| `actualizado_en` | string (ISO) | Timestamp de la consulta |
| `categorias` | array | Resumen de categorías con conteo (solo de los productos devueltos) |
| `productos` | array | Lista de productos |

#### Respuesta sin productos (200)

```json
{
  "total": 0,
  "publicacion_activa": false,
  "actualizado_en": "2026-02-28T20:15:00.000Z",
  "categorias": [],
  "productos": []
}
```

---

### 2. GET /api/catalogo/categorias

Endpoint ligero que devuelve solo las categorías que tienen productos publicados, con conteo.

**URL completa:** `https://admin.chicimportusa.com/api/catalogo/categorias`

#### Filtros opcionales

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `genero` | string | Filtra el conteo por género (`hombre`, `mujer`, `unisex`) |

#### Ejemplos

```bash
# Todas las categorías
GET /api/catalogo/categorias

# Categorías que tienen productos para mujer
GET /api/catalogo/categorias?genero=mujer
```

#### Respuesta (200)

```json
{
  "categorias": [
    { "id": "calzado", "nombre": "Calzado", "emoji": "👟", "cantidad": 48 },
    { "id": "perfumeria", "nombre": "Perfumería", "emoji": "🫧", "cantidad": 39 },
    { "id": "ropa", "nombre": "Ropa", "emoji": "👕", "cantidad": 15 },
    { "id": "belleza", "nombre": "Belleza", "emoji": "💄", "cantidad": 11 },
    { "id": "vitaminas", "nombre": "Vitaminas y Suplementos", "emoji": "💊", "cantidad": 12 },
    { "id": "accesorios", "nombre": "Accesorios", "emoji": "👜", "cantidad": 3 }
  ],
  "total_productos": 128
}
```

Nota: Las categorías vienen ordenadas por cantidad (mayor a menor). Solo aparecen categorías que tienen al menos 1 producto publicado.

---

### 3. GET /api/catalogo/marcas

Devuelve las marcas que tienen productos publicados, con conteo. Se puede filtrar por categoría y género para implementar filtros en cascada.

**URL completa:** `https://admin.chicimportusa.com/api/catalogo/marcas`

#### Filtros opcionales

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `categoria` | string | Solo marcas que tienen productos en esa categoría |
| `genero` | string | Filtra conteo por género (`hombre`, `mujer`, `unisex`) |

#### Ejemplos

```bash
# Todas las marcas
GET /api/catalogo/marcas

# Marcas que tienen calzado
GET /api/catalogo/marcas?categoria=calzado

# Marcas con perfumería para mujer
GET /api/catalogo/marcas?categoria=perfumeria&genero=mujer
```

#### Respuesta (200)

```json
{
  "marcas": [
    { "id": "nike", "nombre": "Nike", "icon": "", "cantidad": 15 },
    { "id": "adidas", "nombre": "Adidas", "icon": "", "cantidad": 12 },
    { "id": "victoria_secret", "nombre": "Victoria's Secret", "icon": "", "cantidad": 8 }
  ],
  "total_productos": 35
}
```

Nota: Las marcas vienen ordenadas por cantidad (mayor a menor). Solo aparecen marcas que tienen al menos 1 producto publicado.

---

## Respuesta de Error (500)

Todos los endpoints devuelven errores en formato JSON, nunca HTML:

```json
{
  "error": true,
  "mensaje": "Error al consultar productos"
}
```

---

## CORS

La API acepta requests desde los siguientes orígenes:

- `https://www.chicimportusa.com` ✓
- `https://chicimportusa.com` ✓
- `http://localhost:3000` ✓ (desarrollo local)

Cualquier otro origen será rechazado por CORS en el navegador.

---

## Caché

Los endpoints devuelven el siguiente header:

```
Cache-Control: public, s-maxage=300, stale-while-revalidate=600
```

Esto significa:
- **5 minutos** de caché en CDN (Vercel edge)
- **10 minutos adicionales** sirviendo contenido stale mientras revalida en background

Si el sitio web usa Next.js con ISR, puede aprovechar esto configurando `revalidate: 300` en sus fetch calls.

---

## Ejemplo de Consumo con Next.js (App Router)

### Fetch desde un Server Component

```javascript
// Ejemplo: page.js o cualquier Server Component
async function getProductos(filtros = {}) {
  const params = new URLSearchParams()
  
  if (filtros.categoria) params.set('categoria', filtros.categoria)
  if (filtros.genero) params.set('genero', filtros.genero)
  if (filtros.marca) params.set('marca', filtros.marca)
  if (filtros.buscar) params.set('buscar', filtros.buscar)
  if (filtros.destacados) params.set('destacados', 'true')
  if (filtros.limite) params.set('limite', filtros.limite.toString())
  if (filtros.orden) params.set('orden', filtros.orden)
  
  const url = `https://admin.chicimportusa.com/api/catalogo/productos?${params.toString()}`
  
  const res = await fetch(url, {
    next: { revalidate: 300 } // Revalidar cada 5 minutos
  })
  
  if (!res.ok) return { total: 0, publicacion_activa: false, categorias: [], productos: [] }
  
  return res.json()
}

async function getCategorias() {
  const res = await fetch('https://admin.chicimportusa.com/api/catalogo/categorias', {
    next: { revalidate: 300 }
  })
  if (!res.ok) return { categorias: [], total_productos: 0 }
  return res.json()
}

async function getMarcas(categoria = null) {
  const url = categoria 
    ? `https://admin.chicimportusa.com/api/catalogo/marcas?categoria=${categoria}`
    : 'https://admin.chicimportusa.com/api/catalogo/marcas'
    
  const res = await fetch(url, {
    next: { revalidate: 300 }
  })
  if (!res.ok) return { marcas: [], total_productos: 0 }
  return res.json()
}
```

### Ejemplo: Homepage con productos destacados

```jsx
export default async function HomePage() {
  const { productos } = await getProductos({ destacados: true, limite: 8 })
  
  return (
    <section>
      <h2>Productos Destacados</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {productos.map(producto => (
          <div key={producto.id}>
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>{producto.marca}</p>
            <p>{producto.precio_formateado}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
```

### Ejemplo: Catálogo con filtros en cascada

```jsx
// Este patrón permite:
// 1. Cargar categorías → usuario selecciona una
// 2. Cargar marcas de esa categoría → usuario selecciona una
// 3. Cargar productos con ambos filtros

// Server Component para carga inicial
export default async function CatalogoPage({ searchParams }) {
  const params = await searchParams
  const categoriaActiva = params?.categoria || null
  const marcaActiva = params?.marca || null
  const generoActivo = params?.genero || null
  
  // Cargar todo en paralelo
  const [dataCategorias, dataMarcas, dataProductos] = await Promise.all([
    getCategorias(),
    getMarcas(categoriaActiva),
    getProductos({
      categoria: categoriaActiva,
      marca: marcaActiva,
      genero: generoActivo,
      orden: params?.orden || 'reciente'
    })
  ])
  
  return (
    <div>
      {/* Filtro de género: tabs prominentes */}
      {/* Filtro de categorías: chips o sidebar */}
      {/* Filtro de marcas: dropdown que se actualiza según categoría */}
      {/* Grid de productos */}
    </div>
  )
}
```

---

## Flujo de Filtros Recomendado para UX

```
┌─────────────────────────────────────┐
│  [Hombre]  [Mujer]  [Todos]        │  ← Tabs de género (nivel superior)
├─────────────────────────────────────┤
│  👟 Calzado (48)  │ 🫧 Perfumería  │  ← Chips de categorías
│  👕 Ropa (15)     │ 💄 Belleza     │     (con conteo dinámico)
├─────────────────────────────────────┤
│  Marca: [Nike ▾]  Orden: [Precio ▾]│  ← Filtros secundarios
├─────────────────────────────────────┤
│                                     │
│  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │ Prod │  │ Prod │  │ Prod │     │  ← Grid de productos
│  │  1   │  │  2   │  │  3   │     │
│  └──────┘  └──────┘  └──────┘     │
│                                     │
└─────────────────────────────────────┘
```

**Cascada de filtros:**
1. Usuario selecciona género → se recargan categorías con `GET /categorias?genero=mujer`
2. Usuario selecciona categoría → se recargan marcas con `GET /marcas?categoria=calzado&genero=mujer`
3. Usuario selecciona marca → se cargan productos con `GET /productos?categoria=calzado&genero=mujer&marca=nike`

Cada paso actualiza los conteos para que el usuario vea cuántos productos hay disponibles en cada combinación.

---

## Datos Importantes

- **Precios:** El campo `precio` es numérico (para cálculos/ordenamiento). El campo `precio_formateado` ya viene en formato colombiano listo para mostrar (`$ 472.420`).
- **Imágenes:** Todas las URLs son públicas de Supabase Storage. `imagen` es la primera del array (para thumbnails). `imagenes` tiene todas.
- **Género null:** Muchos productos no tienen género asignado (vitaminas, tecnología, etc). Cuando se filtra por género, estos productos NO aparecen. El filtro "Todos" debe omitir el parámetro `genero` del request.
- **Sin productos:** Cuando `publicacion_activa` es `false` y `total` es `0`, no hay ninguna lista publicada. El sitio web debería mostrar un estado vacío apropiado.
- **Categorías en /productos:** El array `categorias` en la respuesta de productos refleja SOLO las categorías de los productos devueltos (respetando los filtros aplicados), no todas las categorías del sistema.
