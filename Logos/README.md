# Mastexo Logo Kit — v1.0

Paleta oficial: Negro `#111111` + Púrpura `#7C3AED`

---

## Archivos incluidos

| Archivo | Uso | Fondo |
|---------|-----|-------|
| `logo-horizontal-dark.svg` | Navbar, headers | Oscuro (#111) |
| `logo-horizontal-white.svg` | Documentos, emails | Blanco |
| `logo-horizontal-purple.svg` | Banners, redes sociales | Púrpura |
| `logo-vertical-dark.svg` | Perfiles, presentaciones | Oscuro |
| `logo-vertical-white.svg` | Impresión, documentos | Blanco |
| `icon-purple.svg` | App icon, avatar | Púrpura (con rect) |
| `icon-transparent.svg` | Uso general flexible | Transparente |
| `icon-white.svg` | Sobre fondos oscuros | Transparente |
| `favicon.svg` | Browser favicon | Púrpura (32x32) |
| `wordmark-dark.svg` | Texto solo, fondos oscuros | Transparente |
| `wordmark-light.svg` | Texto solo, fondos claros | Transparente |

---

## Dónde va cada archivo en Next.js

```
public/
├── logo-horizontal-dark.svg     ← usar en <Navbar>
├── logo-horizontal-white.svg    ← emails, documentos
├── logo-horizontal-purple.svg   ← redes sociales
├── logo-vertical-dark.svg       ← perfil Instagram
├── logo-vertical-white.svg      ← impresión
├── icon-purple.svg              ← og:image, social avatar
├── icon-transparent.svg         ← uso general
├── icon-white.svg               ← sobre fondos oscuros
├── favicon.svg                  ← app/favicon.ico
├── wordmark-dark.svg            ← footer, footer oscuro
└── wordmark-light.svg           ← sobre fondos claros
```

---

## Uso en código Next.js

```tsx
import Image from 'next/image'

// Navbar (fondo oscuro)
<Image src="/logo-horizontal-dark.svg" alt="Mastexo Digital" width={220} height={48} />

// Footer
<Image src="/wordmark-dark.svg" alt="Mastexo" width={160} height={32} />

// Favicon en app/layout.tsx
export const metadata = {
  icons: { icon: '/favicon.svg' }
}
```

---

## Colores oficiales

| Token | Hex | Uso |
|-------|-----|-----|
| Purple Primary | `#7C3AED` | Color principal, ícono, X del wordmark |
| Purple Hover | `#5B21B6` | Hover de botones y links |
| Purple Light | `#A78BFA` | Variante gradient |
| Black | `#111111` | Fondo base del sitio |
| Surface | `#1A1A1A` | Cards y contenedores |
| Text Muted | `#555555` | Subtítulos DIGITAL |

---

## Fuente del wordmark

**Space Grotesk Bold 700** — Google Fonts
```
https://fonts.google.com/specimen/Space+Grotesk
```

---

## Reglas de uso

✅ Siempre usar sobre fondos #111111, #7C3AED o #FFFFFF
✅ Mantener el espacio de respiro mínimo (= altura de la X)
✅ Nunca escalar por debajo de 80px de ancho para horizontal
✅ Nunca escalar el favicon por debajo de 16px

❌ No cambiar los colores
❌ No distorsionar ni rotar
❌ No usar sobre fondos de colores no aprobados
❌ No cambiar la tipografía

---

*Mastexo Digital — Chile · LATAM · 2026*
