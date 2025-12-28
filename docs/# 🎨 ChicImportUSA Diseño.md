# 🎨 ChicImportUSA — Especificación de Diseño Gráfico (UI)
## Guía visual y clases Tailwind para implementación exacta

Dominio: http://chicimportusa.com  
Stack objetivo: Next.js + TailwindCSS  
Estilo: Minimal · Moderno · Streetwear / Sneakers  
Objetivo visual: Confianza · Exclusividad · Claridad  

---

## 1. Principios visuales (no negociables)

El diseño debe transmitir:
- Confianza (limpio, ordenado, legible)
- Exclusividad (mucho espacio en blanco)
- Estética urbana / sneakers (sobria, moderna)
- Claridad (sin ruido visual)

Evitar estrictamente:
- Colores adicionales
- Gradientes
- Sombras fuertes
- Sliders o carruseles
- Animaciones llamativas
- Estilo “tienda barata”

---

## 2. Paleta de colores (tokens)

Base:
- --bg: #FFFFFF
- --text: #111111
- --muted: #4B5563
- --border: #E5E7EB
- --muted-2: #9CA3AF

Acento (único):
- --accent: #D90429
- --accent-hover: #B80322

Regla estricta:
Solo usar blanco, negros, grises y el rojo de acento.

---

## 3. Tipografía

Fuente:
- Inter (obligatoria)
- Implementar con next/font o Google Fonts

Fallback:
system-ui, -apple-system, Segoe UI, Roboto, sans-serif

Jerarquía tipográfica (Tailwind):
- H1 → text-4xl md:text-5xl font-semibold tracking-tight
- H2 → text-2xl md:text-3xl font-semibold tracking-tight
- H3 → text-xl font-semibold
- Body → text-base leading-relaxed
- Small → text-sm leading-relaxed

Colores:
- Títulos → --text
- Texto → --muted

---

## 4. Layout, grid y espaciado

Container estándar:
max-w-6xl mx-auto px-4 md:px-6

Section (espaciado vertical):
py-12 md:py-16

Reglas:
- Preferir aire vs saturación
- Desktop: 2–4 columnas según sección
- Mobile: siempre 1 columna
- Mobile-first

---

## 5. Botones

Botón primario (CTA):
inline-flex items-center justify-center
rounded-lg
bg-[color:var(--accent)]
px-5 py-3
font-semibold text-white
transition
hover:bg-[color:var(--accent-hover)]
focus:outline-none
focus:ring-2
focus:ring-[color:var(--accent)]
focus:ring-offset-2

Botón secundario:
inline-flex items-center justify-center
rounded-lg
border border-[color:var(--border)]
px-5 py-3
font-semibold text-[color:var(--text)]
transition
hover:bg-gray-50
focus:outline-none
focus:ring-2
focus:ring-[color:var(--border)]
focus:ring-offset-2

Botón ghost (opcional):
inline-flex items-center justify-center
rounded-lg
px-4 py-2
font-semibold text-[color:var(--text)]
transition
hover:bg-gray-50

---

## 6. Cards

Card base:
rounded-xl
border border-[color:var(--border)]
bg-white
p-5 md:p-6

Card soft (informativo):
rounded-xl
border border-[color:var(--border)]
bg-gray-50
p-5 md:p-6

---

## 7. Badges / etiquetas

inline-flex items-center
rounded-full
bg-gray-100
px-3 py-1
text-xs font-medium
text-[color:var(--muted)]

Regla:
No usar verde ni estados “Disponible”.

---

## 8. Product Card (vitrina)

Wrapper:
rounded-xl
border border-[color:var(--border)]
bg-white
overflow-hidden

Imagen:
- Usar next/image
- Proporción 1:1
- Clase: w-full aspect-square object-cover

Contenido:
p-4 space-y-2

Textos:
- Nombre → font-semibold text-[color:var(--text)]
- Marca → text-sm text-[color:var(--muted)]
- Precio referencia → text-sm font-medium text-[color:var(--text)]

---

## 9. Header / Navbar

Wrapper:
sticky top-0 z-50
border-b border-[color:var(--border)]
bg-white/90 backdrop-blur

Inner:
max-w-6xl mx-auto
px-4 md:px-6
h-16
flex items-center justify-between

---

## 10. Footer

Wrapper:
border-t border-[color:var(--border)]
bg-white

Inner:
max-w-6xl mx-auto
px-4 md:px-6
py-10
grid gap-8 md:grid-cols-2

Texto legal:
text-sm leading-relaxed text-[color:var(--muted)]

---

## 11. Imágenes

- Limpias, fondos claros
- Evitar collage saturado
- Optimizar con next/image
- Placeholders permitidos en MVP

---

## 12. Responsive

- Mobile-first
- CTAs grandes y visibles
- Tipografía legible
- Espaciado cómodo

---

## 13. Reglas de consistencia (obligatorias)

- Usar únicamente los tokens definidos
- Todos los CTAs usan el botón primario
- No crear nuevas variantes visuales
- No usar sombras fuertes
- Bordes suaves y radios grandes

---

## 14. Criterios de aceptación visual

- El sitio se percibe minimalista y profesional
- Estética streetwear/sneakers sobria
- Uso correcto del rojo como acento
- Inter aplicada correctamente
- Espaciado generoso
- Mobile limpio y usable
- Sin ruido visual

Fin del archivo.
