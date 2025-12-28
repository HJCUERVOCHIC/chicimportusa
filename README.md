# ChicImportUSA

Sitio web oficial de ChicImportUSA - Drops de moda original desde USA por WhatsApp.

## 🎯 Objetivo

Este sitio **NO es un e-commerce tradicional**. Su objetivo es:
- Construir confianza y marca
- Explicar el modelo de drops
- Mostrar referencias de productos publicados
- Llevar usuarios a WhatsApp (único canal de pedidos)

## 🛠 Stack Tecnológico

- **Framework:** Next.js 14 (App Router)
- **Estilos:** TailwindCSS
- **TypeScript:** Tipado estricto
- **Hosting:** Vercel
- **Dominio:** chicimportusa.com

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router (páginas)
│   ├── page.tsx           # Home
│   ├── como-funciona/     # Cómo funciona
│   ├── drops-publicados/  # Drops publicados
│   └── whatsapp/          # Landing WhatsApp
├── components/
│   ├── ui/                # Componentes base (Button, Card, Badge)
│   ├── layout/            # Header, Footer
│   └── sections/          # Secciones reutilizables
├── data/                  # Datos mock (drops, testimonios)
├── lib/                   # Utilidades
└── types/                 # Tipos TypeScript
```

## 🚀 Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Build de producción
npm run build

# Iniciar producción
npm start
```

## 🎨 Sistema de Diseño

### Paleta de Colores
- **bg:** #FFFFFF
- **text:** #111111
- **muted:** #4B5563
- **accent:** #D90429

### Tipografía
- **Fuente:** Inter
- Mobile-first
- Espaciado generoso

## 📋 Reglas de Negocio

- ✅ Solo productos publicados en cada drop
- ✅ Drops con cupos y fecha de cierre
- ❌ No búsquedas personalizadas
- ❌ No stock permanente

## 🔗 Links Importantes

- **WhatsApp (CTA global):** https://wa.me/573150619888
- **Dominio:** https://chicimportusa.com

## 📄 Licencia

Privado - ChicImportUSA
