# Etapa 6 — SEO Final: ChicImportUSA

## Contexto del proyecto

Estoy trabajando en el rediseño del sitio **ChicImportUSA** (`chicimportusa.com`), una tienda de importación de productos desde USA que vende exclusivamente por WhatsApp. El sitio está construido en **Next.js 16 (App Router), TypeScript, TailwindCSS** y desplegado en **Vercel desde la rama `main`**.

**Design system — "Nieve Activa":**
- Fondo blanco, acento `#D90429`
- Fuentes: Bebas Neue (`font-display`) + Space Grotesk (`font-body`)
- Header negro (`#111`)

**Estructura de rutas:**
- `/` — Homepage
- `/catalogo` — Catálogo de productos con filtros
- `/producto/[id]` — Detalle de producto
- `/como-funciona` — Página de soporte
- `/terminos-y-condiciones` — Página de soporte
- `/politica-de-privacidad` — Página de soporte

**API del catálogo:** consumida desde `admin.chicimportusa.com` a través de un proxy en `/api/catalogo/`. Los productos tienen: id, nombre, precio, categoría, género, imágenes (almacenadas en Supabase).

**WhatsApp URLs** centralizadas en `src/lib/constants.ts`.

---

## Estado actual — Etapas completadas

- **Etapa 1–4:** Baseline, catálogo, homepage Dark Streetwear/Urban, páginas de soporte
- **Etapa 5:** GA4 + Microsoft Clarity funcionando en producción. Eventos activos: `whatsapp_click` (KPI principal), `page_view`, `social_click`, `filter_applied`, `view_item`
- El `layout.tsx` ya tiene metadata global, Open Graph global y viewport configurados

---

## Etapa 6 — Lo que falta implementar

### 1. `sitemap.xml` dinámico
- Archivo `app/sitemap.ts` que genere el XML automáticamente
- Debe incluir páginas estáticas: `/`, `/catalogo`, `/como-funciona`, `/terminos-y-condiciones`, `/politica-de-privacidad`
- Debe incluir páginas dinámicas: `/producto/[id]` para cada producto del catálogo (consumiendo la API)
- Prioridades y frecuencias de actualización apropiadas por tipo de página

### 2. `robots.txt`
- Archivo `app/robots.ts`
- Permitir indexación de todo el sitio público
- Bloquear rutas de API (`/api/`)
- Incluir referencia al sitemap

### 3. Open Graph dinámico por producto
- Cada página `/producto/[id]` necesita su propio `generateMetadata()` con:
  - Title: nombre del producto
  - Description: descripción + precio
  - OG image: imagen real del producto desde Supabase
  - OG type: `product`
- Objetivo: cuando se comparte un producto en WhatsApp, debe aparecer la foto y nombre del producto específico, no el OG genérico del sitio

### 4. JSON-LD — Datos estructurados
- En el `layout.tsx` raíz para identificar el negocio ante Google
- Tipo: `Store` u `OnlineStore`
- El negocio es **100% virtual** — no tiene dirección física, opera solo por WhatsApp
- Incluir: nombre, URL, descripción, redes sociales (Instagram, TikTok), contacto WhatsApp

---

## Lo que necesito

Genera el paquete completo de archivos listos para copiar al repositorio:

1. `app/sitemap.ts`
2. `app/robots.ts`
3. `app/producto/[id]/page.tsx` — con `generateMetadata()` dinámico (el archivo ya existe, solo agregar el SEO)
4. `app/layout.tsx` — con JSON-LD agregado (el archivo ya existe, solo agregar el script)

Entrega los archivos completos, con instrucciones claras de qué reemplaza qué, y los comandos Git para hacer el commit.
