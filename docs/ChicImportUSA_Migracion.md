# ChicImportUSA — Documento de Migración de Contexto

> **Propósito:** Este documento te entrega todo el contexto necesario para continuar trabajando en el proyecto ChicImportUSA desde una conversación nueva. Está pensado para pegarse al inicio del chat de la nueva cuenta de Claude.
>
> **Generado:** Mayo 2026 · **Versión:** Migración 1 · **Uso:** Interno / Confidencial

---

## 0. Cómo usar este documento

Hola Claude. Soy **Héctor**, propietario de ChicImportUSA. Estoy migrando este proyecto desde otra cuenta y este documento contiene todo el contexto que necesitas para continuar ayudándome sin que tengamos que reconstruir la historia desde cero.

**Antes de responder cualquier pedido técnico:**
1. Lee este documento completo.
2. Confirma que entendiste el estado actual (especialmente el bloqueante de Meta).
3. Respeta mis preferencias de trabajo descritas en la sección 9.

---

## 1. Resumen del negocio

**ChicImportUSA** es un negocio colombiano que importa productos originales desde Estados Unidos (sneakers, perfumes, ropa, vitaminas, accesorios) y los vende **exclusivamente a través de WhatsApp**. El sitio web no es una tienda transaccional: es una herramienta de confianza y conversión que dirige a los visitantes a chats 1:1 de WhatsApp y a un grupo de retención.

El modelo de negocio se basa en **publicaciones periódicas de productos (drops)**, no en inventario permanente.

| Campo | Valor |
|---|---|
| Sitio web | www.chicimportusa.com |
| Canal de ventas | WhatsApp (exclusivo) |
| Propietario | Héctor — hjcuervo@chicimportusa.com |
| Social Media | Tatiana Giraldo — tatianag@chicimportusa.com |
| Instagram | @chic_importusa |

---

## 2. Infraestructura técnica frontend

### 2.1 Stack y despliegue

| Componente | Valor |
|---|---|
| Framework | Next.js App Router + TypeScript |
| Estilos | TailwindCSS |
| Hosting | Vercel (branch `main` → producción) |
| Branch de trabajo | `redesign/main` → merge a `main` |
| Dominio | chicimportusa.com (DNS en GoDaddy → Vercel) |
| Catálogo API | `https://admin.chicimportusa.com/api/catalogo/productos` |
| Proxy interno frontend | `/api/catalogo/` |
| Shape de respuesta API | `data.productos` (NO `data.data`) |

### 2.2 Design System "Nieve Activa"

| Token | Valor |
|---|---|
| Font display | Bebas Neue |
| Font body | Space Grotesk |
| Fondo | Blanco / Negro |
| Accent color | `#D90429` |
| Header | `#111` (negro) |

### 2.3 Archivos clave

| Concepto | Ruta |
|---|---|
| WhatsApp config | `src/lib/constants.ts` (`WHATSAPP_PHONE`, `WHATSAPP_URL`) |
| Analytics helpers | `src/lib/analytics.ts` |
| Imágenes | `/public/img/` (NO `/public/images/`) |
| Sitemap | Llama directamente a `CATALOG_API_URL` (no al proxy interno) |

---

## 3. Analytics

| Plataforma | ID |
|---|---|
| Google Analytics 4 | `G-9QYJT0QJ5C` |
| Microsoft Clarity | `vstgzyomj1` |
| Evento de conversión principal | `whatsapp_click` |

---

## 4. Meta / Instagram / Facebook

### 4.1 IDs y credenciales

| Concepto | Valor |
|---|---|
| Facebook Page | ChicImport USA |
| Facebook Page ID | `10163854786774376` |
| Instagram handle | @chic_importusa |
| Instagram Business Account ID | `17841475600439677` |
| Meta Developer App | Chicimportusa |
| Meta App ID | `905568365691727` |
| Instagram Graph API | `v19.0` |

### 4.2 🚨 BLOQUEANTE CRÍTICO ACTIVO — Token de Instagram

La API de Instagram Graph está retornando **error 100 / subcode 33**. El User Access Token no tiene los permisos:

- `pages_read_engagement`
- `pages_show_list`

**Pasos para resolver (en orden):**

1. Ir al app `Chicimportusa` en Meta Developers (App ID: `905568365691727`).
2. Encontrar los dos permisos en estado *"Listo para la prueba"*.
3. Hacer clic en *"Agregar"* en ambos.
4. Regenerar el token con esos permisos activos.
5. Consultar: `graph.facebook.com/v19.0/10163854786774376?fields=instagram_business_account,access_token`
6. Obtener el Page Access Token y el Instagram Business Account ID correctos.
7. Actualizar los dos nodos de publicación en n8n.

### 4.3 ⏰ El token expira pronto

El token de Instagram de 60 días debe convertirse a **token de larga duración antes de mediados de mayo de 2026**. Si no se hace, la automatización dejará de funcionar sin aviso previo.

> **Nota a hoy (mayo 2026):** Esta fecha ya está encima. Confirmar con Héctor el estado real del token antes de cualquier acción.

### 4.4 Notas de navegación Meta

- Ir directo a URLs específicas. **NO navegar por Business Suite** (carga portafolios equivocados).
- Selector correcto de portafolio: `business.facebook.com/` (raíz).
- Para conectar Instagram a una Facebook Page: Meta Business Suite → Cuentas de Instagram → **+ Agregar**.
- Las invitaciones de tester de Instagram **NO aparecen en la app móvil**. Aceptarlas en `instagram.com/accounts/manage_access/` bajo *"Invitaciones Para Evaluadores"*.
- Tatiana Giraldo **AÚN NO** ha sido añadida como administradora de la Facebook Page.

---

## 5. Automatización n8n — Instagram

| Concepto | Valor |
|---|---|
| Plataforma | n8n Cloud |
| URL | `hjcuervochic.app.n8n.cloud` |
| Workflow | Daily Instagram Product Post |
| Estado | **CREADO PERO NO ACTIVO** (bloqueado por permisos de Meta) |

### 5.1 Arquitectura del workflow

Ejecuta cada día a las **9:00 AM** los siguientes pasos:

1. Trigger diario a las 9:00 AM.
2. Fetch Products → `https://admin.chicimportusa.com/api/catalogo/productos`
3. Select Random Product (del catálogo).
4. Convert Image URL: **AVIF → JPEG** vía `images.weserv.nl` (Instagram Graph API no soporta AVIF).
5. Generar caption vía **HTTP Request directo a Gemini 2.5 Flash**.
6. Create Media Container + Publish (Instagram Graph API v19.0).

### 5.2 Endpoint Gemini

```
https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
```

> **IMPORTANTE:** El nodo integrado de Google Gemini PaLM en n8n está **deprecado**. Siempre usar un nodo HTTP Request directo al endpoint de Gemini.

---

## 6. Email corporativo

| Persona | Email |
|---|---|
| Proveedor | GoDaddy Professional Email |
| Héctor | hjcuervo@chicimportusa.com |
| Tatiana | tatianag@chicimportusa.com |

---

## 7. Reglas técnicas críticas (no olvidar)

- Instagram Graph API **NO soporta AVIF** — siempre convertir vía `images.weserv.nl` antes de publicar.
- El nodo Gemini PaLM en n8n está **deprecado** — usar `HTTP Request` directo.
- `revalidateTag` en Next.js 16 **requiere segundo argumento** `'max'`.
- El sitemap debe llamar `CATALOG_API_URL` **directamente** (no el proxy `/api/catalogo/`) para evitar fallos en build time.
- La forma de la respuesta de la API es `data.productos` (NO `data.data`).
- **Seguridad:** Héctor tiene el hábito de compartir API keys y tokens en texto plano. Cuando esto ocurra, indícale revocarlas inmediatamente.

---

## 8. Hoja de ruta pendiente

### Prioridad alta (bloqueante)

- [ ] Resolver el bloqueante de permisos Meta y activar el workflow de Instagram en n8n.
- [ ] Convertir el token de Instagram a token de larga duración (vencimiento: mediados de mayo 2026 — revisar estado actual).

### Prioridad media

- [ ] Añadir a Tatiana Giraldo como administradora de la Facebook Page.

### Diferido

- [ ] Creación de cuenta TikTok y automatización (diferido hasta que Instagram esté estable).

---

## 9. Preferencias de trabajo con Claude

Cuando me ayudes con tareas técnicas, por favor:

- **Entrega paquetes de archivos completos** listos para copiar (archivos zip cuando aplique), con instrucciones paso a paso y comandos Git exactos.
- Todos los archivos deben ser **self-contained**, sin necesidad de merges manuales.
- Trabajamos **iterativamente con screenshots** cuando hay errores de despliegue.
- **Confirma que cada etapa funciona** antes de avanzar — usa declaraciones de cierre explícitas al final de cada paso.
- Usa los **Vercel Web Interface Guidelines** como estándar de calidad para implementaciones de UI.
- Recuerda que el **caché del navegador produce falsos negativos** al verificar despliegues — siempre verificar en ventana de incógnito.

---

## 10. Glosario rápido

| Término | Significado |
|---|---|
| **Drop** | Publicación periódica de productos nuevos (el modelo de negocio no es inventario permanente). |
| **Catálogo API** | Endpoint de admin que sirve los productos disponibles para vender. |
| **redesign/main** | Branch activo de desarrollo; merge final va a `main`. |
| **Workflow** | Automatización en n8n (actualmente solo existe el de Instagram). |

---

## 11. Primer mensaje sugerido para arrancar la nueva conversación

> *"Hola Claude. Acabo de migrar este proyecto desde otra cuenta. Te paso un documento de contexto completo de ChicImportUSA. Por favor léelo entero, confírmame que entendiste el estado actual (especialmente el bloqueante de Meta y el vencimiento del token de Instagram) y luego dime con qué deberíamos empezar: ¿resolver el bloqueante de permisos, verificar el estado del token, o algo más urgente que detectes?"*

---

*ChicImportUSA — Documento de migración de cuenta · Confidencial*
