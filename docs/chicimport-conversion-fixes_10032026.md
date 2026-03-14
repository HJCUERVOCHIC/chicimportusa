# ChicImportUSA — Fixes de Conversión
> Auditoría realizada el 10 de marzo de 2026 — rama `redesign/main` ya mergeada a `main`

---

## Contexto

El sitio está en producción en `www.chicimportusa.com`. La auditoría se hizo navegando el sitio en vivo e inspeccionando el DOM y los links de WhatsApp generados. Se identificaron 4 problemas que afectan directamente la conversión catálogo → WhatsApp.

---

## Fix 1 — 🔴 URGENTE: Botones "Pedir" en tarjetas del catálogo no incluyen el nombre del producto

### Problema
Cuando un usuario hace clic en el botón "Pedir" directamente desde una tarjeta del catálogo (sin entrar a la página de producto), el mensaje que llega a WhatsApp es:

```
Hola! Me interesa este producto:
https://www.chicimportusa.com/producto/ac2cf2d0-...
```

El nombre del producto **no está incluido** — solo llega la URL con el UUID.

### Impacto
- Operacionalmente, quien atiende el chat debe abrir el enlace para saber qué producto quiere el cliente.
- Con volumen de chats simultáneos, esto genera fricción y demoras innecesarias.

### Solución esperada
El mensaje debería incluir el nombre del producto:

```
Hola! Me interesa este producto:
Nike Air Max 90
https://www.chicimportusa.com/producto/ac2cf2d0-...
```

### Archivo a modificar
Componente de tarjeta de producto en el catálogo — probablemente en:
`src/components/ProductCard.tsx` o similar.

Buscar la construcción del link `wa.me` y agregar el nombre del producto al texto pre-cargado.

---

## Fix 2 — 🟡 MEDIO: Nombre del producto llega truncado en el mensaje de la página de detalle

### Problema
Desde la página de producto (`/producto/[id]`), el mensaje sí incluye el nombre, pero llega truncado:

```
Hola! Me interesa este producto:
Run Star Hike Platform..        ← truncado con ".."
https://www.chicimportusa.com/producto/45ee3510-...
```

### Causa probable
El nombre se está tomando del texto renderizado en el DOM (que tiene `line-clamp` o `text-overflow: ellipsis`) en lugar de tomarse directamente del objeto de datos del producto.

### Solución esperada
Construir el mensaje usando el valor crudo del nombre desde los datos del producto (props/state), no desde el `innerText` del elemento visual.

### Archivo a modificar
Componente de página de producto:
`src/app/producto/[id]/page.tsx` o el componente cliente que construye el link de WhatsApp.

---

## Fix 3 — 🟡 MEDIO: No hay sección Hero para visitantes nuevos

### Problema
La homepage (`/`) arranca directamente en el catálogo — no hay ninguna sección de bienvenida, propuesta de valor ni contexto para visitantes que llegan por primera vez desde Google, Instagram o un link compartido.

Para clientes recurrentes del grupo de WhatsApp esto no es problema. Para un visitante nuevo, la ausencia de contexto puede reducir la confianza y la tasa de conversión.

### Observación técnica
El componente Hero existe en el código (fue construido en Etapa 3) pero no está siendo renderizado en la homepage en producción. Puede ser que haya sido removido durante alguna iteración del rediseño.

### Solución esperada
Agregar un bloque de bienvenida breve **antes del catálogo** que incluya:
- Propuesta de valor en una línea ("Tenis, perfumes y más, importados desde EE.UU. a Colombia")
- Un CTA principal hacia WhatsApp o hacia el catálogo
- Opcionalmente: 2-3 trust signals (envío a Colombia, producto original, pago por WhatsApp)

No necesita ser el Hero completo original — puede ser un bloque más compacto.

### Archivo a modificar
`src/app/page.tsx` — agregar sección antes del componente del catálogo.

---

## Fix 4 — 🟡 MEDIO: No hay botón flotante (FAB) de WhatsApp durante el scroll

### Problema
Mientras el usuario navega el catálogo haciendo scroll, el único acceso a WhatsApp es el botón del navbar (arriba a la derecha, relativamente pequeño). No hay un botón flotante persistente.

En mobile especialmente, esto significa que el usuario tiene que scrollear hacia arriba para encontrar el punto de contacto si quiere escribir sin haber hecho clic en "Pedir" en un producto específico.

### Solución esperada
Agregar un botón flotante fijo (FAB) en la esquina inferior derecha con el ícono de WhatsApp, visible en todas las páginas, con el mensaje genérico:

```
Hola! Me interesa conocer más sobre sus productos.
```

### Consideraciones de implementación
- Debe ser visible en mobile y desktop
- No debe tapar el contenido importante (respetar z-index y posición)
- En la página de producto, puede ocultarse ya que el botón "PEDIR ESTE PRODUCTO" cumple esa función
- Archivo sugerido: componente global en `src/components/WhatsAppFAB.tsx`, importado en `src/app/layout.tsx`

---

## Resumen de prioridades

| # | Fix | Impacto | Dificultad estimada |
|---|-----|---------|---------------------|
| 1 | Nombre en mensaje de tarjetas | 🔴 Alto | 🟢 Bajo — 1 línea de código |
| 2 | Nombre truncado en detalle | 🟡 Medio | 🟢 Bajo — cambiar fuente del dato |
| 3 | Hero para visitantes nuevos | 🟡 Medio | 🟡 Medio — agregar componente |
| 4 | Botón flotante WhatsApp | 🟡 Medio | 🟢 Bajo — componente nuevo simple |

---

## Orden de implementación recomendado

1. Fix 1 + Fix 2 primero — son cambios de código mínimos con impacto operativo inmediato
2. Fix 4 — componente nuevo simple, independiente del resto
3. Fix 3 — requiere decisión de diseño antes de implementar

---

*Proyecto: ChicImport Growth — Fase B (Optimización de conversión)*
*Stack: Next.js App Router, TypeScript, TailwindCSS*
*Repositorio: rama `main` (producción)*
