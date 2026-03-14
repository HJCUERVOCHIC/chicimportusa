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
| **Next.js 14** | Framework React con App Router |
| **TypeScript** | Tipado estático |
| **TailwindCSS** | Estilos utilitarios |
| **Sanity CMS** | Gestión de contenido dinámico |
| **Vercel** | Hosting y deploy |
| **GoDaddy** | Dominio y DNS |

---

## 📁 Estructura del Proyecto

```
chicimportusa/
├── src/
│   ├── app/                          # Páginas (App Router)
│   │   ├── page.tsx                  # Home
│   │   ├── layout.tsx                # Layout global
│   │   ├── globals.css               # Estilos globales
│   │   ├── publicaciones/            # Página de publicaciones
│   │   ├── terminos-y-condiciones/   # Términos legales
│   │   └── politica-de-privacidad/   # Política de privacidad
│   ├── components/
│   │   ├── ui/                       # Componentes base (Button, Card, Badge)
│   │   ├── layout/                   # Header, Footer
│   │   └── sections/                 # Secciones de página
│   ├── lib/
│   │   ├── sanity.ts                 # Cliente Sanity
│   │   └── queries.ts                # Queries GROQ
│   ├── sanity/
│   │   └── lib/
│   │       └── fetchers.ts           # Funciones de fetch
│   └── types/
│       └── index.ts                  # Tipos TypeScript y constantes globales
├── public/
│   └── img/                          # Assets estáticos
├── sanity/
│   └── schemas/                      # Schemas de Sanity CMS
├── next.config.js
├── tailwind.config.ts
└── .npmrc                            # legacy-peer-deps=true
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

| Variable | Valor | Uso |
|----------|-------|-----|
| `bg` | `#FFFFFF` | Fondo principal |
| `text` | `#111111` | Texto principal |
| `muted` | `#4B5563` | Texto secundario |
| `muted-2` | `#9CA3AF` | Texto terciario |
| `border` | `#E5E7EB` | Bordes |
| `accent` | `#D90429` | Color de acento (rojo) |
| `accent-hover` | `#B80322` | Hover del acento |

### Tipografía

- **Fuente:** Inter (Google Fonts)
- **Enfoque:** Mobile-first, responsive

---

## 📄 Páginas

| Ruta | Descripción |
|------|-------------|
| `/` | Homepage con todas las secciones |
| `/publicaciones` | Catálogo embebido de publicaciones activas |
| `/terminos-y-condiciones` | Términos y condiciones legales |
| `/politica-de-privacidad` | Política de privacidad |

---

## 🧩 Secciones del Homepage

El homepage está compuesto por las siguientes secciones (en orden):

1. **BannerCarousel** - Banners dinámicos desde Sanity (si hay)
2. **Hero** - Imagen principal con CTA a WhatsApp
3. **HowItWorks** - Cómo funciona el proceso
4. **Rules** - Reglas del negocio
5. **Categories** - Categorías de productos (6 categorías)
6. **PublicacionesPreview** - Preview del catálogo con enlace a `/publicaciones`
7. **ProcesoCompra** - 5 pasos del proceso de compra
8. **Testimonials** - Testimonios de clientes
9. **LatestNews** - Últimas noticias desde Sanity (si hay)
10. **FinalCTA** - CTA final para unirse al grupo de WhatsApp

---

## 📦 Categorías de Productos

1. Tenis deportivos
2. Tenis casuales
3. Ediciones especiales
4. Ropa deportiva
5. Ropa casual
6. Accesorios

---

## 🔗 Constantes Globales

Ubicación: `src/types/index.ts`

```typescript
// Enlace centralizado de WhatsApp (grupo de publicaciones)
export const WHATSAPP_LINK = 'https://chat.whatsapp.com/KXwhlBpFKeh8521CBRvJp6'
export const WHATSAPP_CTA_TEXT = 'Unirme al WhatsApp'
```

> **Importante:** Todos los componentes usan `WHATSAPP_LINK` para mantener consistencia. Si cambia el grupo, solo se actualiza este archivo.

---

## 🗄 Sanity CMS

### Contenido Dinámico

| Schema | Descripción |
|--------|-------------|
| `banner` | Banners promocionales del carrusel |
| `testimonial` | Testimonios de clientes |
| `post` | Noticias y actualizaciones |

### Configuración

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxxxx
SANITY_REVALIDATE_SECRET=xxxxx
```

### Revalidación

- ISR con `revalidate = 900` (15 minutos)
- Webhook para actualizaciones instantáneas desde Sanity

---

## 🚀 Desarrollo Local

### Prerrequisitos

- Node.js 18+
- npm

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/HJCUERVOCHIC/chicimportusa.git
cd chicimportusa

# Instalar dependencias (importante: usar --legacy-peer-deps)
npm install --legacy-peer-deps

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con credenciales

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

El proyecto está desplegado en **Vercel** con:

- Deploy automático desde rama `main`
- Dominio personalizado: `chicimportusa.com`
- Variables de entorno configuradas en Vercel Dashboard

### Proceso de Deploy

```bash
git add .
git commit -m "descripción del cambio"
git push origin main
# Vercel despliega automáticamente
```

---

## 📱 Integración WhatsApp

### Grupo de Publicaciones

Todos los CTAs de WhatsApp dirigen al grupo de publicaciones:

```
https://chat.whatsapp.com/KXwhlBpFKeh8521CBRvJp6
```

### Componentes que usan WhatsApp

- `Button` (con prop `isWhatsApp`)
- `Hero`
- `FinalCTA`
- `Footer`
- `PublicacionesPreview`
- `PublicacionesEmbed`
- `ProcesoCompra`

---

## 📑 Páginas Legales

### Términos y Condiciones (`/terminos-y-condiciones`)

Incluye:
- Identidad del comercio
- Alcance del sitio web
- Disponibilidad de productos
- Proceso de compra
- Pagos
- Tiempos de entrega
- Cambios, devoluciones y cancelaciones
- Responsabilidad
- Propiedad intelectual
- Protección de datos

### Política de Privacidad (`/politica-de-privacidad`)

Incluye:
- Información recopilada
- Uso de la información
- Protección de la información
- Compartición de datos
- Derechos del usuario
- Uso de cookies

---

## 🔄 Catálogo de Publicaciones

El catálogo se embebe desde una aplicación separada:

```
https://chicimportusa.vercel.app/catalogo?embed=1
```

### Componentes

- **PublicacionesPreview:** Preview en homepage (iframe no interactivo)
- **PublicacionesEmbed:** Vista completa en `/publicaciones` (iframe interactivo)

---

## 📝 Notas Importantes

1. **Imágenes:** Ubicadas en `/public/img/` (no `/public/images/`)
2. **Dependencias:** Usar `npm install --legacy-peer-deps`
3. **Caché:** Limpiar caché del navegador después de deploys para ver cambios
4. **Mobile-first:** Todos los componentes están optimizados para móvil primero

---

## 🛡 Variables de Entorno

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=
SANITY_REVALIDATE_SECRET=

# Site URL
NEXT_PUBLIC_SITE_URL=https://chicimportusa.com
```

---

## 👥 Contacto

- **WhatsApp:** [Grupo de publicaciones](https://chat.whatsapp.com/KXwhlBpFKeh8521CBRvJp6)
- **Sitio web:** [chicimportusa.com](https://chicimportusa.com)

---

## 📅 Última Actualización

**Enero 2026**

- ✅ Sección "Proceso de compra" implementada
- ✅ Páginas legales (Términos y Política de Privacidad)
- ✅ Centralización de enlace WhatsApp al grupo de publicaciones
- ✅ Footer actualizado con enlaces legales



## API del Catálogo

La API vive en `admin.chicimportusa.com`. Se consume desde el servidor mediante un **proxy CORS** en `src/app/api/catalogo/[...path]/route.ts` para evitar exposición del origen.

### Endpoints utilizados

| Endpoint | Función |
|----------|---------|
| `GET /api/catalogo/productos` | Lista de productos con filtros opcionales |
| `GET /api/catalogo/productos/:id` | Producto individual |
| `GET /api/catalogo/categorias` | Listado de categorías |
| `GET /api/catalogo/marcas` | Listado de marcas |

### Respuesta de productos

```ts
// ProductosResponse
{
  total: number
  publicacion_activa: boolean
  actualizado_en: string
  categorias: string[]
  productos: Producto[]
}
```

### ISR — Revalidación

- Catálogo y producto: `revalidate: 300` (5 minutos)
- Sitemap: `revalidate: 3600` (1 hora)

---

## Analytics (Etapa 5)

### Variables de entorno (Vercel — solo Production)

```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=XXXXXXXXXX
```

### Eventos implementados

| Evento | Descripción | KPI |
|--------|-------------|-----|
| `whatsapp_click` | Clic en cualquier botón de WhatsApp | ⭐ Conversión principal |
| `page_view` | Vista de página (NavigationTracker) | |
| `view_item` | Vista de detalle de producto | |
| `filter_applied` | Uso de filtros en catálogo | |
| `hero_cta_click` | Clic en CTA del hero | |

### Implementación

`Analytics.tsx` es un Client Component con `NavigationTracker` que usa `usePathname` + `useSearchParams`. Requiere `<Suspense>` en `layout.tsx` para que el build de Vercel no falle.

```tsx
// layout.tsx
<Suspense fallback={null}>
  <AnalyticsScripts />
</Suspense>
```

---

## SEO (Etapa 6)

### sitemap.xml dinámico

Generado en `app/sitemap.ts`. Consume la API directamente para incluir todos los productos.

| Página | Prioridad | Frecuencia |
|--------|-----------|------------|
| `/` | 1.0 | weekly |
| `/catalogo` | 0.9 | daily |
| `/como-funciona` | 0.5 | monthly |
| `/terminos-y-condiciones` | 0.3 | yearly |
| `/politica-de-privacidad` | 0.3 | yearly |
| `/producto/[id]` (×N) | 0.8 | weekly |

### robots.txt

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://www.chicimportusa.com/sitemap.xml
```

### JSON-LD — Datos estructurados

Tipo `OnlineStore` en `<head>` del `layout.tsx`. Incluye nombre, URL, descripción, área de servicio (Colombia), contacto WhatsApp, y redes sociales (`sameAs`).

### Open Graph dinámico por producto

Cada `/producto/[id]` genera su propio `generateMetadata()` con imagen real del producto desde Supabase, nombre y precio. Permite previews correctos al compartir por WhatsApp.

### Google Search Console

- Propiedad verificada con etiqueta HTML via `metadata.verification.google`
- Sitemap enviado y en estado **Correcto**

---

## Patrones y decisiones técnicas

### Marquee carousel (FeaturedProducts)

```ts
// Ancho explícito para evitar resets de animación
const totalW = productos.length * cardW
// @keyframes definido en globals.css (no inline) para estabilidad en mobile
// Sin maskImage — deshabilita GPU acceleration en mobile
// Sin <a> dentro de <Link> — causa hydration failure en React
```

### CategoryNav sticky

Dos filas: géneros en la primera, categorías en la segunda. Scroll horizontal con `overflow-x: auto` y `scrollbar-hidden`. En mobile se colapsa en un bottom sheet (`FilterDrawer`).

### Proxy de API

```ts
// src/app/api/catalogo/[...path]/route.ts
// Reescribe todas las peticiones a admin.chicimportusa.com
// Soluciona CORS en componentes cliente y durante SSR
```

### WhatsApp URLs

Centralizadas en `src/lib/constants.ts` — nunca hardcodeadas en componentes.

---

## Variables de entorno

```env
# API del catálogo
CATALOG_API_URL=https://admin.chicimportusa.com/api/catalogo

# Analytics (solo en Production en Vercel)
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_CLARITY_PROJECT_ID=XXXXXXXXXX
```

---

## Lecciones aprendidas

| Problema | Solución |
|----------|----------|
| Bebas Neue sin lowercase | Siempre agregar clase `uppercase` |
| `useSearchParams` rompe build | Envolver `NavigationTracker` en `<Suspense>` |
| Sitemap sin productos (fetch circular) | Llamar directamente a la API externa, no al proxy interno |
| `revalidateTag` en Next.js 16 | Requiere segundo argumento `'max'` |
| Propiedades duplicadas en arrays TS | Causan fallas silenciosas en build de Vercel |
| `lucide-react` no disponible | Reemplazar con SVGs inline |
| Cache del browser enmascara deploys | Siempre probar en incógnito |
| `verification.google` en metadata | Solo el código, no el `<meta>` completo |

---

## Historial de etapas

| Etapa | Contenido |
|-------|-----------|
| **1** | Baseline — setup inicial del proyecto |
| **2** | Catálogo con API nativa + proxy CORS + página `/producto/[id]` + Open Graph para WhatsApp |
| **3** | Homepage Dark Streetwear/Urban (Hero, FeaturedProducts, Categories, HowItWorks, Testimonials, FinalCTA) |
| **4** | Páginas de soporte + CategoryNav sticky con pills + FilterDrawer mobile (bottom sheet) + fixes del carousel |
| **5** | GA4 + Microsoft Clarity — `whatsapp_click` como KPI principal de conversión |
| **6** | `sitemap.xml` dinámico + `robots.txt` + JSON-LD `OnlineStore` + Google Search Console verificada |


# ChicImportUSA — Fixes de Conversión
> Todos los archivos son reemplazos completos. Copiar sobre los originales.

## Archivos incluidos

| Archivo destino | Cambio |
|---|---|
| `src/components/WhatsAppFAB.tsx` | ✅ NUEVO — FAB flotante verde, se oculta en /producto/* |
| `src/components/HeroSection.tsx` | ✅ NUEVO — Sección bienvenida para visitantes nuevos |
| `src/components/ProductCard.tsx` | Fix 1 — Nombre del producto en mensaje WhatsApp de tarjetas |
| `src/app/page.tsx` | Fix 3 — HeroSection antes del catálogo |
| `src/app/layout.tsx` | Fix 4 — WhatsAppFAB en todas las páginas |
| `public/img/herotenis.jpg` | Imagen de fondo del Hero |

## Comandos Git

```bash
# Copia los archivos sobre tu proyecto, luego:
git add .
git commit -m "fix: conversión — nombre en WA (Fix1), Hero homepage (Fix3), FAB WhatsApp (Fix4)"
git push origin main
```

## Fix 2 (ya resuelto)
ProductDetail.tsx ya tenía el nombre correcto desde el objeto del producto.
No requiere cambios.