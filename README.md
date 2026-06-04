# Mastexo Design System

Paleta oficial: Negro `#111111` + Púrpura `#7C3AED`
Fuentes: Space Grotesk (títulos) + Inter (cuerpo)

---

## Archivos incluidos

| Archivo | Dónde va en tu proyecto | Para qué sirve |
|---------|------------------------|----------------|
| `tokens.ts` | `src/lib/tokens.ts` | Todos los valores del design system en TypeScript |
| `globals.css` | `app/globals.css` | CSS global con variables, reset y componentes base |
| `layout.tsx` | `app/layout.tsx` | Configuración de fuentes Next.js + metadata SEO |
| `tailwind.config.ts` | raíz del proyecto | Tailwind con colores, fuentes y animaciones Mastexo |

---

## Setup en 4 pasos

### 1. Instalar dependencias
```bash
npx create-next-app@latest mastexo --typescript --tailwind --app
cd mastexo
```

### 2. Copiar los archivos
- Reemplaza `app/globals.css` con el `globals.css` de este paquete
- Reemplaza `app/layout.tsx` con el `layout.tsx` de este paquete
- Reemplaza `tailwind.config.ts` con el de este paquete
- Copia `tokens.ts` a `src/lib/tokens.ts`

### 3. Verificar fuentes
Las fuentes se cargan automáticamente desde Google Fonts via `next/font/google`.
No necesitas agregar ningún `<link>` en el HTML.

### 4. Usar en componentes
```tsx
// Usar colores con Tailwind
<h1 className="font-heading text-display-xl text-white">
  Tu pyme, <span className="text-purple-500">visible.</span>
</h1>

// Botón primary
<button className="bg-purple-500 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-all hover:shadow-purple">
  Diagnóstico gratis
</button>

// Card de servicio
<div className="bg-dark-800 border border-dark-600 hover:border-purple-500 rounded-xl p-6 transition-all">
  ...
</div>
```

---

## Variables CSS disponibles

```css
var(--purple-500)   /* #7C3AED — color principal */
var(--purple-700)   /* #5B21B6 — hover */
var(--dark-900)     /* #111111 — fondo base */
var(--dark-800)     /* #1A1A1A — cards */
var(--dark-600)     /* #2A2A2A — bordes */
var(--text-primary)   /* #FFFFFF */
var(--text-secondary) /* #888888 */
var(--font-heading)   /* Space Grotesk */
var(--font-body)      /* Inter */
```

---

## Clases Tailwind personalizadas

```
Colores:    purple-500, dark-800, dark-600...
Fuentes:    font-heading, font-body
Tamaños:    text-display-2xl, text-display-xl, text-display-lg...
Sombras:    shadow-purple, shadow-purple-lg
Animaciones: animate-fade-in-up, animate-pulse-purple
```

---

*Mastexo Digital — Chile · LATAM*
