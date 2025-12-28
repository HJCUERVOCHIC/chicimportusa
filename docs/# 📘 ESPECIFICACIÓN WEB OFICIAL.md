# 📘 ESPECIFICACIÓN WEB OFICIAL  
## ChicImportUSA — Sitio Web (Modelo Drops por WhatsApp)

**Dominio:** http://chicimportusa.com  
**Canal de ventas:** WhatsApp  
**Link oficial WhatsApp (CTA global):** https://wa.me/573150619888  

---

## 1. OBJETIVO DEL SITIO

El sitio web de ChicImportUSA **NO es un e-commerce tradicional**.

Su objetivo es:
- Construir **confianza y marca**
- Explicar claramente el **modelo de drops**
- Mostrar **referencias de productos publicados**
- Llevar a los usuarios a **WhatsApp**, único canal de pedidos

---

## 2. MODELO DE NEGOCIO (REGLAS NO NEGOCIABLES)

- ChicImportUSA funciona exclusivamente por **drops periódicos**
- **Solo se pueden pedir productos publicados en cada drop**
- **No hay stock permanente**
- **No se buscan productos personalizados**
- **No se reciben solicitudes para “conseguir” referencias**
- Todos los pedidos se **gestionan por WhatsApp**

Estas reglas deben aparecer **claramente en el sitio**.

---

## 3. STACK TECNOLÓGICO REQUERIDO

- Framework: **Next.js**
- Estilos: **TailwindCSS**
- Hosting: **Vercel**
- Dominio conectado: `chicimportusa.com`
- Mobile-first
- Performance optimizado (Lighthouse alto)

---

## 4. ESTRUCTURA DE RUTAS

- `/` → Home  
- `/como-funciona`  
- `/drops-publicados`  
- `/whatsapp` (opcional, landing corta)  

---

## 5. CTA GLOBAL (OBLIGATORIO)

En todas las páginas y secciones usar exactamente este enlace:

**https://wa.me/573150619888**

Texto del botón principal:
> **Unirme al WhatsApp**

---

## 6. WIREFRAME GLOBAL

### Header (sticky)
- Logo ChicImportUSA (click → Home)
- Menú: Inicio | Cómo funciona | Drops publicados | Unirme al WhatsApp
- Botón destacado: **Unirme al WhatsApp**

### Footer
- Texto: “Drops periódicos de moda original desde USA”
- CTA WhatsApp
- Links legales: Privacidad · Términos
- Nota legal:
  > ChicImportUSA gestiona pedidos exclusivamente sobre productos publicados en cada drop.  
  No manejamos stock permanente ni búsqueda de productos por encargo.

---

## 7. COPY + WIREFRAME POR PÁGINA

---

### 7.1 HOME (`/`)

#### HERO
**H1:**  
Drops de moda original desde USA, por WhatsApp

**Subtítulo:**  
Publicamos productos disponibles en drops periódicos.  
**Solo se pueden pedir los productos anunciados en cada drop.**

**CTAs:**
- Unirme al WhatsApp  
- Ver cómo funciona

**Nota visible:**  
No manejamos stock permanente. No buscamos productos personalizados.

---

#### CÓMO FUNCIONA (4 PASOS)
1. Publicamos un drop por WhatsApp  
2. Eliges dentro del drop  
3. Confirmas tu pedido por WhatsApp  
4. Entregamos en Colombia  

CTA: **Quiero recibir el próximo drop**

---

#### REGLAS CLARAS
- ✅ Solo productos publicados en cada drop  
- ✅ Drops con cupos y fecha de cierre  
- ❌ No búsquedas personalizadas  
- ❌ No stock permanente  

Texto:
> Este modelo nos permite mantener precios justos, control del proceso y total transparencia.

---

#### QUÉ SUELE SALIR EN LOS DROPS
- Tenis y calzado original  
- Ropa seleccionada  
- Accesorios  
- Marcas reconocidas  

Nota:
> La disponibilidad depende de cada drop.

---

#### PRUEBA SOCIAL
**Título:** Compras reales, proceso real

Texto:
> Comunicación clara, productos verificados y acompañamiento hasta la entrega.

(Soportar cards de testimonios)

CTA: **Ver drops publicados**

---

#### CTA FINAL
**Título:** ¿Quieres recibir el próximo drop?

Botón: **Unirme al WhatsApp**

Microtexto:
> Solo drops y actualizaciones importantes. Cero spam.

---

### 7.2 CÓMO FUNCIONA (`/como-funciona`)

**H1:** Cómo comprar en ChicImportUSA

**Intro:**
ChicImportUSA funciona por drops.  
**Solo se gestionan pedidos de productos publicados en el drop vigente.**

---

#### PASOS DETALLADOS
1. Drop publicado (WhatsApp)
2. Selección del producto
3. Confirmación del pedido
4. Entrega en Colombia

CTA intermedio: **Unirme al WhatsApp**

---

#### SÍ / NO

**Sí hacemos**
- Publicar drops
- Confirmar por WhatsApp
- Acompañar el proceso
- Transparencia total

**No hacemos**
- No buscamos productos personalizados
- No recibimos listas para conseguir referencias
- No manejamos stock permanente

---

#### FAQ
- ¿Puedo pedir algo que no esté en el drop?  
  → No. Solo productos publicados.
- ¿Cada cuánto hay drops?  
  → De forma periódica. Se anuncian por WhatsApp.
- ¿Los productos se agotan?  
  → Sí. Los drops tienen cupos.

CTA final: **Quiero recibir los drops**

---

### 7.3 DROPS PUBLICADOS (`/drops-publicados`)

**H1:** Drops publicados

**Intro:**
> Este listado es referencial.  
Si el drop está cerrado, esos productos ya no están disponibles.

CTA superior: **Unirme al WhatsApp**

---

#### LISTADO DE DROPS
Mostrar cards por drop:
- Nombre del drop
- Fecha
- Estado: **Cerrado**
- Grid de productos

Cada producto:
- Imagen
- Nombre
- Marca
- Precio de referencia
- Etiqueta: **Drop cerrado**

Botón por producto:
> Recibir próximos drops → WhatsApp

⚠️ Nunca usar “Comprar”

---

### 7.4 WHATSAPP (`/whatsapp`) (opcional)

**H1:** Recibe los drops de ChicImportUSA por WhatsApp

Texto:
> Te avisamos cuando publiquemos productos disponibles.  
Recibirás fotos, referencias, precios y fecha de cierre.

Botón grande:
**Unirme al WhatsApp**

---

## 8. MODELO DE DATOS (MVP MOCK)

Implementar drops con data mock (JSON):

```json
{
  "drops": [
    {
      "id": "drop-2025-01",
      "title": "Drop Enero 2025",
      "date": "2025-01-15",
      "status": "closed",
      "products": [
        {
          "id": "prod-1",
          "name": "Nike Air Force 1",
          "brand": "Nike",
          "category": "Tenis",
          "image": "/img/af1.jpg",
          "price_ref": "$XXX.XXX",
          "status": "closed"
        }
      ]
    }
  ]
}
