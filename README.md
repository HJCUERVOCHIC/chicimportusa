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
