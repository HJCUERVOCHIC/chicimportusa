# Chic Import USA

Plataforma PWA de e-commerce para gestión de catálogos de productos importados desde Estados Unidos, con cálculos complejos de precios USD→COP.

---

## Descripción General

**Chic Import USA** es un ecosistema de dos componentes:

| Componente | Tecnología | Función |
|------------|------------|---------|
| **Plataforma Admin** | Next.js + Supabase | Gestión de productos, pedidos, clientes y reportes |
| **Sitio Web Público** | Sanity CMS | Landing page, noticias y catálogo embebido |

Los pedidos se gestionan exclusivamente a través del **grupo de WhatsApp**, no desde la plataforma.

---

## Stack Tecnológico

### Plataforma Admin
| Capa | Tecnología |
|------|------------|
| Frontend | Next.js App Router |
| Backend/DB | Supabase (PostgreSQL + Auth + Storage) |
| Estilos | Tailwind CSS |
| Hosting | Vercel |
| Reportes | ExcelJS |
| Tipografías | Poppins (UI), Playfair Display (precios) |

### Sitio Web Público
| Capa | Tecnología |
|------|------------|
| CMS | Sanity |
| Contenido | Noticias, páginas estáticas |
| Catálogo | Embebido desde plataforma admin (`/catalogo?embed=1`) |

---

## Módulos de la Plataforma Admin

### Productos
- CRUD completo con imágenes y categorías
- Cálculo automático de precios (USD→COP)
- Estados: borrador, publicado, agotado

### Listas de Oferta
- Agrupación de productos por publicación periódica
- Estados: borrador, publicada, cerrada

### Clientes
- Gestión de clientes y datos de contacto
- Historial de pedidos por cliente

### Pedidos
- Procesamiento de órdenes con estados y seguimiento
- Flujo: pendiente → confirmado → pagado → enviado → entregado

### Controles Financieros
- TRM (Tasa Representativa del Mercado)
- Márgenes de ganancia
- Impuestos
- Estructuras de descuento

### Reportes
Exportación a Excel (ExcelJS):
- Órdenes
- Portafolio
- Ventas (por período de confirmación)
- Ingresos (por fecha de pago)

---

## Lógica de Negocio

### Motor de Precios (`pricingEngine.js`)

Motor unificado para consistencia entre frontend y triggers de base de datos:

```
Precio USD → TRM → Impuestos → Margen → Precio Final COP
```

### Separación de Datos Financieros

| Tipo | Basado en |
|------|-----------|
| **Ventas** | Período de confirmación del pedido |
| **Ingresos** | Fecha real de pago |

### Formato Monetario
- Pesos colombianos completos: `$1.250.000`
- Sin abreviaciones: ~~`$1.25M`~~

---

## Catálogo Público (`/catalogo`)

### Modos de Visualización

| Modo | URL | Uso |
|------|-----|-----|
| **Normal** | `/catalogo` | Acceso directo (standalone) |
| **Embed** | `/catalogo?embed=1` | Integrado en sitio web vía iframe |

### Modo Normal
- Header sticky con logo (fondo blanco, borde sutil)
- Bloque editorial con copy informativo
- Panel contenedor con grid de productos
- Footer con branding

### Modo Embed (Puro)
- **Solo renderiza el grid de cards**
- Sin header, footer, copy ni paneles adicionales
- Padding mínimo (`px-4 py-4`)
- Fondo transparente
- Empty state mínimo: "Sin publicaciones activas."
- Ideal para incrustar vía iframe en sitio web externo

### Características de las Cards
- Solo visualización (sin navegación a detalle individual)
- Sin botón de WhatsApp (pedidos solo vía grupo)
- Información: imagen, categoría, título, marca, precio

### Copy Editorial (modo normal)

```
H1: Catálogo

Aquí encuentras las publicaciones activas de productos importados desde Estados Unidos.
Trabajamos por publicaciones periódicas y gestionamos los pedidos directamente por WhatsApp.

Microcopy: Solo gestionamos productos que estén publicados.
```

---

## Integración Sitio Web + Plataforma

### Arquitectura

```
┌─────────────────────────────────────────────────────┐
│           chicimportusa.com (Sanity)                │
│  ┌───────────────────────────────────────────────┐  │
│  │  Landing Page / Noticias / Contenido          │  │
│  └───────────────────────────────────────────────┘  │
│  ┌───────────────────────────────────────────────┐  │
│  │  <iframe src="/catalogo?embed=1" />           │  │
│  │  ┌─────────────────────────────────────────┐  │  │
│  │  │  Grid de Cards (desde Vercel/Supabase)  │  │  │
│  │  └─────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Configuración CORS en Sanity

Para que el sitio web consuma datos de Sanity:

| Origin | Allow Credentials |
|--------|-------------------|
| `https://chicimportusa.com` | No |
| `https://www.chicimportusa.com` | No |
| `http://localhost:3000` | No |

Configurar en: [manage.sanity.io](https://manage.sanity.io) → Proyecto → **Settings** → **API** → **CORS Origins**

---

## Seguridad

- **Row Level Security (RLS)** en todas las tablas de Supabase
- Vistas convertidas de `SECURITY DEFINER` a `SECURITY INVOKER`
- Autenticación por roles (admin/cliente)
- Triggers para cálculos automáticos y consistencia de datos

---

## Variables de Entorno

### Plataforma Admin (Vercel)
```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

### Sitio Web (si aplica)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=
```

---

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build de producción
npm run build
```

---

## Despliegue

- **Plataforma Admin**: Vercel (deploy automático desde repositorio)
- **Sitio Web**: Sanity hosted o Vercel (separado)

---

## URLs de Producción

| Componente | URL |
|------------|-----|
| Sitio Web Público | https://chicimportusa.com |
| Catálogo Standalone | https://[vercel-url]/catalogo |
| Catálogo Embed | https://[vercel-url]/catalogo?embed=1 |
| Sanity Studio | https://[proyecto].sanity.studio |

---

## Notas Importantes

1. **Pedidos vía WhatsApp**: Los clientes deben estar en el grupo de WhatsApp para realizar pedidos. La plataforma es solo catálogo informativo.

2. **Publicaciones periódicas**: Los productos se agrupan en "listas de oferta" que se publican periódicamente.

3. **Consistencia de cálculos**: Usar siempre `pricingEngine.js` para cualquier cálculo de precios.

4. **Modo embed**: Para integrar el catálogo en el sitio web, usar `/catalogo?embed=1`.

5. **Cards sin interacción**: Las cards del catálogo son solo visualización, no tienen navegación a detalle ni botones de acción.

---

## Últimas Actualizaciones

- ✅ Ajuste visual del catálogo (diseño editorial premium)
- ✅ Implementación de modo embed puro (solo cards)
- ✅ Tipografía Poppins alineada con sitio web
- ✅ Eliminación de botón WhatsApp en cards
- ✅ Eliminación de navegación a vista individual de productos
- ✅ Configuración CORS para dominio chicimportusa.com
- ✅ Seguridad: Vistas convertidas a SECURITY INVOKER
- ✅ Integración Sanity CMS para sitio web público

---

## Contacto

**Chic Import USA**  
Productos Premium Importados desde Estados Unidos
