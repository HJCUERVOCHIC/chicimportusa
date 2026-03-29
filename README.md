# ChicImportUSA

Sitio web institucional para ChicImportUSA, un negocio de importación de moda desde Estados Unidos hacia Colombia. El sitio funciona como herramienta de construcción de marca y confianza, dirigiendo a los clientes hacia WhatsApp para gestionar pedidos.

🌐 **Producción:** [chicimportusa.com](https://chicimportusa.com)  
⚙️ **Admin CMS:** [admin.chicimportusa.com](https://admin.chicimportusa.com)

---

## 📋 Modelo de Negocio

ChicImportUSA opera mediante **publicaciones periódicas** de productos importados, no como e-commerce tradicional:

- **Sin stock permanente:** Los productos se ofrecen por tiempo limitado en cada publicación
- **Gestión por WhatsApp:** Todos los pedidos se procesan a través del grupo de WhatsApp
- **Pago en dos partes:** 50% para separar + 50% al llegar el producto a Colombia
- **Productos originales:** Tenis, ropa y accesorios importados desde USA

---

## 🛠 Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| **Next.js 16** | Framework React con App Router |
| **TypeScript** | Tipado estático |
| **TailwindCSS** | Estilos utilitarios |
| **Vercel** | Hosting y deploy |
| **GoDaddy** | Dominio y DNS |
| **Supabase Storage** | CDN de imágenes de productos y categorías |

---

## 📁 Estructura del Proyecto

```
chicimportusa/
├── src/
│   ├── app/                          # Páginas (App Router)
│   │   ├── page.tsx                  # Home = Catálogo completo
│   │   ├── layout.tsx                # Layout global
│   │   ├── globals.css               # Estilos globales
│   │   ├── api/
│   │   │   ├── catalogo/[...path]/   # Proxy CORS → admin API v1
│   │   │   └── revalidate/           # Endpoint de revalidación ISR
│   │   ├── producto/[id]/            # Detalle de producto
│   │   ├── como-funciona/            # Página informativa
│   │   ├── terminos-y-condiciones/   # Términos legales
│   │   └── politica-de-privacidad/   # Política de privacidad
│   ├── components/
│   │   ├── ui/                       # Componentes base (Button, Card, Badge, Skeleton)
│   │   ├── layout/                   # Header, Footer, WhatsAppFloat
│   │   ├── catalogo/                 # CatalogClient, ProductCard, ProductGrid, ProductDetail
│   │   ├── product/                  # ProductDetail (vista detalle)
│   │   └── sections/                 # HeroCarousel, GeneroNav, CategoryGrid, y otras secciones
│   ├── lib/
│   │   ├── constants.ts              # URLs, config centralizada
│   │   ├── api-catalogo.ts           # Helpers server-side → API v2
│   │   ├── api.ts                    # Helpers adicionales v2 (hero-categorias, etc.)
│   │   ├── analytics.ts              # Eventos GA4
│   │   └── utils.ts                  # Utilidades generales
│   └── types/
│       └── catalogo.ts               # Tipos TypeScript: Producto, ProductoV2, etc.
├── public/
│   └── img/                          # Assets estáticos (Hero_1.png, Hero_2.png, Hero_3.png, logos)
├── next.config.js
└── tailwind.config.ts
```

---

## 🎨 Sistema de Diseño — "Nieve Activa"

### Paleta de Colores

| Variable | Valor | Uso |
|----------|-------|-----|
| Fondo | `#FFFFFF` | Fondo principal |
| Header/Footer | `#111111` | Fondos oscuros |
| Accent | `#D90429` | Color de acento (rojo) |
| Accent hover | `#B80323` | Hover del acento |
| WhatsApp | `#25D366` | Botones WhatsApp |
| Oferta badge | `purple-600` | Badge oferta exclusiva |
| Descuento | `amber-400` | Fondo precio con descuento |

### Tipografía

- **Display:** Bebas Neue — títulos impactantes
- **Body:** Space Grotesk — cuerpo moderno y legible

---

## 🔌 API del Catálogo — v1 y v2

La API vive en `admin.chicimportusa.com`. Se consume directamente desde Server Components con ISR.

### Regla fundamental

> v1 permanece activa. v2 es aditiva — agrega campos sin romper interfaces existentes.

### Endpoints v2 utilizados

| Endpoint | Función |
|----------|---------|
| `GET /api/catalogo/v2/productos` | Lista con filtros: categoria, marca, genero, destacados, oferta_exclusiva |
| `GET /api/catalogo/v2/productos/:id` | Producto individual con campos v2 |
| `GET /api/catalogo/v2/categorias` | Categorías activas con conteo |
| `GET /api/catalogo/v2/marcas` | Marcas activas con conteo |
| `GET /api/catalogo/v2/generos` | Géneros con productos publicados (dinámico) |
| `GET /api/catalogo/v2/hero-categorias` | Categorías con imagen hero para grid |

### Campos nuevos en v2

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `oferta_exclusiva` | `boolean` | Producto en oferta exclusiva |
| `tiene_descuento` | `boolean` | Tiene precio rebajado activo |
| `precio_sin_descuento` | `number \| null` | Precio original antes del descuento |
| `genero` | incluye `ninos` y `ninas` | Géneros adicionales vs v1 |

> `destacado` y `oferta_exclusiva` son mutuamente excluyentes — garantizado desde el admin.

### Parámetros de filtro v2

| Parámetro | Descripción |
|-----------|-------------|
| `categoria` | Filtra por id de categoría |
| `marca` | Filtra por nombre de marca |
| `genero` | hombre, mujer, unisex, ninos, ninas |
| `destacados=true` | Solo productos destacados (con 's') |
| `oferta_exclusiva=true` | Solo productos en oferta exclusiva |
| `buscar` | Búsqueda por texto |
| `orden` | reciente, precio_asc, precio_desc |

### ISR — Revalidación

- Todos los endpoints: `revalidate: 300` (5 minutos)
- Revalidación manual: `GET /api/revalidate?secret=SECRET&path=/`

### Proxy CORS

El proxy en `src/app/api/catalogo/[...path]/route.ts` reenvía peticiones de client components al admin. Los server components llaman directamente a la API v2 sin pasar por el proxy.

---

## 📄 Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Home = Catálogo completo con hero, géneros, categorías y productos |
| `/producto/[id]` | Detalle de producto con badges v2 y precio tachado |
| `/como-funciona` | Página informativa del proceso |
| `/terminos-y-condiciones` | Términos y condiciones legales |
| `/politica-de-privacidad` | Política de privacidad |

---

## 🏠 Estructura del Home

El home muestra en orden:

1. **GeneroNav** — barra sticky con géneros dinámicos desde `/v2/generos`. Solo muestra géneros con productos publicados.
2. **HeroCarousel** — carousel estático con 3 imágenes locales (`Hero_1.png`, `Hero_2.png`, `Hero_3.png`). Botones: "Ofertas Especiales" (principal) y "Productos Destacados" (secundario). Solo visible sin filtros activos.
3. **CategoryGrid** — grid dinámico de categorías con imagen hero desde `/v2/hero-categorias`. Siempre visible. Se adapta al número de categorías disponibles.
4. **CatalogClient** — catálogo filtrable con sidebar (marcas, orden), búsqueda y grid de productos.

---

## 🧩 Componentes Clave

### GeneroNav
- Barra sticky en `top-[57px]`, fondo `#111`
- Géneros dinámicos desde la API — si no hay productos de un género, no aparece
- Al hacer clic en "Todo" limpia todos los filtros
- Al cambiar género preserva la categoría activa

### CategoryGrid
- Grid responsivo que se adapta al número de categorías (2-9+)
- Altura fija de 120px, imágenes con overlay y nombre
- Al hacer clic en una categoría preserva el género activo
- Imágenes servidas desde Supabase Storage CDN

### ProductCard
- Soporta `Producto` (v1) y `ProductoV2` — detecta automáticamente el tipo
- Badge morado "Oferta" para `oferta_exclusiva = true`
- Badge rojo "Destacado" para `destacado = true`
- Precio con fondo amber cuando `tiene_descuento = true`
- WhatsApp overlay en hover (fuera del Link para evitar `<a>` anidado)

### HeroCarousel
- 3 imágenes estáticas en `/public/img/`
- Auto-avance 5s, flechas, dots, swipe mobile
- Altura 50vh (min 260px, max 480px)
- Botón principal: Ofertas Especiales → `/?oferta_exclusiva=true`
- Botón secundario: Productos Destacados → `/?destacados=true`

---

## 🔗 Constantes Globales

Ubicación: `src/lib/constants.ts`

Todas las URLs sensibles leen desde variables de entorno con fallback hardcodeado:

```typescript
export const WHATSAPP_URL    = process.env.NEXT_PUBLIC_WHATSAPP_URL    || '...'
export const WHATSAPP_PHONE  = process.env.NEXT_PUBLIC_WHATSAPP_PHONE  || '573150619888'
export const CATALOG_API_URL = process.env.NEXT_PUBLIC_CATALOG_API_URL || '...'
export const CATALOG_API_URL_V2 = process.env.NEXT_PUBLIC_CATALOG_API_URL_V2 || '...'
export const SOCIAL_LINKS = {
  instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || 'https://www.instagram.com/chic_importusa/',
  tiktok:    process.env.NEXT_PUBLIC_TIKTOK_URL    || 'https://www.tiktok.com/@chic_importusa',
}
```

---

## 🌐 Variables de Entorno

### Requeridas en Vercel (Production)

```env
# Redes sociales y contacto
NEXT_PUBLIC_WHATSAPP_URL=https://chat.whatsapp.com/KXwhlBpFKeh8521CBRvJp6
NEXT_PUBLIC_WHATSAPP_PHONE=573150619888
NEXT_PUBLIC_INSTAGRAM_URL=https://www.instagram.com/chic_importusa/
NEXT_PUBLIC_TIKTOK_URL=https://www.tiktok.com/@chic_importusa

# API del catálogo
NEXT_PUBLIC_CATALOG_API_URL=https://admin.chicimportusa.com/api/catalogo
NEXT_PUBLIC_CATALOG_API_URL_V2=https://admin.chicimportusa.com/api/catalogo/v2

# Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-9QYJT0QJ5C
NEXT_PUBLIC_CLARITY_ID=vstgzyomj1

# Revalidación ISR
REVALIDATE_SECRET=...
```

### Para desarrollo local (.env.local)

Copiar las mismas variables. El fallback hardcodeado en `constants.ts` cubre el caso de que no exista el archivo.

---

## 🚀 Desarrollo Local

```bash
# Clonar repositorio
git clone https://github.com/HJCUERVOCHIC/chicimportusa.git
cd chicimportusa

# Instalar dependencias
npm install --legacy-peer-deps

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con los valores reales

# Servidor de desarrollo
npm run dev
```

### Comandos

```bash
npm run dev      # Desarrollo (localhost:3000)
npm run build    # Build de producción
npm run start    # Iniciar producción local
npm run lint     # Linting
```

---

## 🌐 Deploy

Deploy automático desde rama `main` via Vercel.

```bash
git add .
git commit -m "descripción del cambio"
git push
# Vercel despliega automáticamente
```

### Revalidar caché manualmente

```
GET https://www.chicimportusa.com/api/revalidate?secret=SECRET&path=/
```

---

## 📊 Analytics

| Herramienta | ID |
|-------------|-----|
| Google Analytics 4 | `G-9QYJT0QJ5C` |
| Microsoft Clarity | `vstgzyomj1` |

### Eventos principales

| Evento | Descripción |
|--------|-------------|
| `whatsapp_click` | Clic en cualquier botón WhatsApp — conversión principal |
| `catalogo_filtro` | Uso de filtros (género, categoría, marca, orden) |
| `social_click` | Clic en Instagram o TikTok |

---

## 🛡 SEO

- **Sitemap dinámico** en `app/sitemap.ts` — consume API directamente (no el proxy)
- **robots.txt** — permite todo excepto `/api/`
- **JSON-LD** tipo `OnlineStore` en `<head>` del layout
- **Open Graph** dinámico por producto en `/producto/[id]`
- **Google Search Console** verificada

---

## 🔄 Revalidación ISR

El endpoint `GET /api/revalidate` acepta:
- `?secret=SECRET` — requerido
- `?path=/` — revalida una ruta específica
- `?tag=nombre` — revalida un tag específico

Para revalidar todo el catálogo después de actualizar productos o imágenes en el admin:

```
https://www.chicimportusa.com/api/revalidate?secret=SECRET&path=/
```

---

## 📝 Lecciones Aprendidas

| Problema | Solución |
|----------|----------|
| `<a>` anidado en ProductCard | WhatsApp overlay fuera del `<Link>` de imagen |
| Géneros hardcodeados | Endpoint `/v2/generos` dinámico desde la API |
| Filtros género + categoría separados | `GeneroNav` y `CategoryGrid` preservan params mutuamente |
| `searchParams` no reactivo en client | `useEffect` sincroniza estado con cambios de URL |
| API v2 usa `destacados` (con s) | Parámetro correcto verificado directamente en el endpoint |
| Imágenes hero en categorías eran landscape | Grid con altura fija 120px en lugar de aspect ratio |
| `onError` en Server Component | Agregar `'use client'` al componente con handlers |
| Variables de entorno vs hardcoded | Usar env vars con fallback en `constants.ts` |
| Caché ISR no se actualiza | Usar endpoint `/api/revalidate` o esperar 5 min |

---

## 📅 Historial de Versiones

| Versión | Contenido |
|---------|-----------|
| **Etapa 1-6** | Setup inicial, catálogo v1, diseño, analytics, SEO |
| **Fase 0 — API v2** | Proxy v2, helpers tipados, `CATALOG_API_URL_V2` en constants |
| **Fase 1 — Features v2** | HeroCarousel estático, GeneroNav dinámico, CategoryGrid, badges oferta/destacado, precio tachado amber, ProductDetail v2, filtros combinables género+categoría, botones hero funcionales |

---

## 👥 Contacto

- **Héctor:** hjcuervo@chicimportusa.com
- **Social Media:** tatianag@chicimportusa.com
- **Instagram:** [@chic_importusa](https://www.instagram.com/chic_importusa/)
- **TikTok:** [@chic_importusa](https://www.tiktok.com/@chic_importusa)
- **WhatsApp:** [Grupo de publicaciones](https://chat.whatsapp.com/KXwhlBpFKeh8521CBRvJp6)
- **Sitio web:** [chicimportusa.com](https://chicimportusa.com)
