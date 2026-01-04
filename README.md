# ChicImportUSA

Sitio web institucional para ChicImportUSA, un negocio de importación de moda desde Estados Unidos hacia Colombia.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38B2AC?style=flat-square&logo=tailwind-css)
![Sanity](https://img.shields.io/badge/Sanity-CMS-F03E2F?style=flat-square&logo=sanity)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=flat-square&logo=vercel)

---

## 🎯 Objetivo del Sitio

Este sitio **NO es un e-commerce tradicional**. Su propósito es:

- Construir confianza y marca
- Explicar el modelo de "publicaciones" periódicas
- Mostrar las categorías de productos disponibles
- Dirigir usuarios a WhatsApp (único canal de pedidos)

> **Modelo de negocio:** Publicaciones periódicas de productos importados, gestionadas exclusivamente por WhatsApp. Sin stock permanente, sin búsquedas personalizadas.

---

## 🛍️ Categorías de Productos

| Categoría | Descripción |
|-----------|-------------|
| **Deportivos** | Tenis para running, basketball, training |
| **Casuales** | Tenis lifestyle y uso diario |
| **Ediciones** | Colaboraciones y lanzamientos especiales |
| **Ropa Deportiva** | Sportswear y activewear |
| **Ropa Casual** | Streetwear y prendas de uso diario |
| **Accesorios** | Complementos de moda |

---

## 🛠 Stack Tecnológico

| Tecnología | Uso |
|------------|-----|
| **Next.js 14** | Framework (App Router) |
| **TypeScript** | Tipado estricto |
| **TailwindCSS** | Estilos |
| **Sanity** | CMS Headless |
| **Vercel** | Hosting y Deploy |

---

## 📁 Estructura del Proyecto

```
chicimportusa/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Layout principal con metadata
│   │   ├── page.tsx            # Homepage
│   │   ├── globals.css         # Estilos globales con Tailwind
│   │   ├── sitemap.ts          # Sitemap dinámico
│   │   ├── robots.ts           # Robots.txt
│   │   ├── manifest.ts         # PWA manifest
│   │   ├── not-found.tsx       # Página 404 personalizada
│   │   ├── error.tsx           # Página de error personalizada
│   │   ├── publicaciones/
│   │   │   └── page.tsx        # Catálogo embebido
│   │   ├── noticias/
│   │   │   ├── page.tsx        # Lista de noticias/posts
│   │   │   └── [slug]/
│   │   │       └── page.tsx    # Detalle de noticia
│   │   └── api/
│   │       └── revalidate/
│   │           └── route.ts    # Webhook para revalidación
│   ├── components/
│   │   ├── ui/                 # Componentes base (Button, Card, Badge)
│   │   ├── layout/             # Header, Footer
│   │   └── sections/           # Hero, HowItWorks, Categories, Rules, FinalCTA
│   ├── lib/
│   │   ├── sanity.ts           # Cliente Sanity
│   │   └── queries.ts          # Queries GROQ
│   └── types/
│       └── sanity.ts           # Tipos TypeScript
├── public/
│   └── img/                    # Assets estáticos (imágenes)
├── sanity/
│   └── schemas/                # Schemas de Sanity
├── next.config.js              # Configuración Next.js
├── tailwind.config.ts          # Configuración Tailwind
└── .npmrc                      # legacy-peer-deps=true
```

---

## 🚀 Desarrollo

### Prerrequisitos

- Node.js 18+
- npm

### Instalación

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/chicimportusa.git
cd chicimportusa

# Instalar dependencias (importante: usar --legacy-peer-deps)
npm install --legacy-peer-deps

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales
```

### Comandos

```bash
# Servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar producción local
npm start

# Linting
npm run lint
```

---

## 🔐 Variables de Entorno

Crear archivo `.env.local` con:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=xxxxx

# Revalidación
SANITY_REVALIDATE_SECRET=xxxxx

# Site URL
NEXT_PUBLIC_SITE_URL=https://chicimportusa.com
```

---

## 🎨 Sistema de Diseño

### Paleta de Colores

| Variable | Valor | Uso |
|----------|-------|-----|
| `bg` | #FFFFFF | Fondo principal |
| `text` | #111111 | Texto principal |
| `muted` | #4B5563 | Texto secundario |
| `accent` | #D90429 | Color de acción/CTA |

### Tipografía

- **Fuente:** Inter (Google Fonts)
- **Enfoque:** Mobile-first
- **Espaciado:** Generoso para legibilidad

### Componentes UI

- `Button` - Con variantes: primary, secondary, outline, isWhatsApp
- `Card` - Tarjetas con efecto hover premium
- `Badge` - Etiquetas de estado

---

## 📋 Secciones del Home

| Sección | Descripción |
|---------|-------------|
| **Hero** | Imagen de fondo + H1 + CTA WhatsApp |
| **Cómo Funciona** | 4 pasos del proceso |
| **Categorías** | Grid de 6 categorías de productos |
| **Reglas** | Lo que SÍ y NO hacemos |
| **CTA Final** | Llamado a unirse por WhatsApp |

---

## ⚙️ Funcionalidades

### CMS (Sanity)
- Banners dinámicos para Hero
- Testimonios de clientes
- Posts/Noticias con Portable Text

### SEO
- Metadata dinámica con Open Graph
- Twitter Cards
- Sitemap.xml dinámico
- Robots.txt configurado

### Performance
- ISR (Incremental Static Regeneration)
- Imágenes optimizadas (AVIF/WebP)
- Cache tags para revalidación granular
- Lazy loading de componentes

### Seguridad
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy
- Permissions-Policy

### PWA
- Manifest.json
- Iconos configurados
- Theme color

### UX
- Botón flotante de WhatsApp
- Skeleton loaders
- Páginas de error personalizadas (404, 500)
- Diseño responsive mobile-first

---

## 🔄 Sistema de Revalidación

El sitio usa **webhook-based revalidation**:

1. Se actualiza contenido en Sanity
2. Sanity envía POST a `/api/revalidate`
3. El endpoint valida el secret
4. Revalida páginas usando cache tags

### Endpoints

```bash
# Webhook automático (POST)
POST https://chicimportusa.com/api/revalidate?secret=TU_SECRET

# Revalidación manual (GET)
GET https://chicimportusa.com/api/revalidate?secret=TU_SECRET&tag=posts
GET https://chicimportusa.com/api/revalidate?secret=TU_SECRET&path=/noticias
```

---

## 🚀 Deployment

| Configuración | Valor |
|---------------|-------|
| **Hosting** | Vercel |
| **Dominio** | chicimportusa.com |
| **Build** | `npm run build` |
| **Install** | `npm install --legacy-peer-deps` |

### Deploy automático

Cada push a `main` dispara un deploy automático en Vercel.

---

## 📝 Notas Importantes

1. **Siempre usar `--legacy-peer-deps`** al instalar dependencias (conflictos Sanity + Next.js 14)

2. **Terminología localizada** para Colombia:
   - Usar "publicaciones" (no "drops")
   - Usar "tenis" (no "sneakers")

3. **Modelo de negocio**: Todo se dirige a WhatsApp, no hay carrito ni checkout

4. **Imágenes**: Almacenadas en `/public/img/` (no `/public/images/`)

5. **WhatsApp del negocio**: https://wa.me/573150619888

---

## 🔗 Links

| Recurso | URL |
|---------|-----|
| **Sitio Web** | https://chicimportusa.com |
| **WhatsApp** | https://wa.me/573150619888 |
| **Catálogo** | https://chicimportusa.vercel.app/catalogo |
| **Sanity Studio** | https://chicimportusa.sanity.studio |

---

## 📄 Licencia

Privado - ChicImportUSA © 2024
