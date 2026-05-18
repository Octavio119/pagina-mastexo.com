# Mastexo · assets de logo

## Archivos

| Archivo | Uso | Dimensiones |
|---|---|---|
| `mastexo-logo-horizontal.svg` | Logo principal sobre fondo **oscuro** | 200×48 |
| `mastexo-logo-horizontal-dark.svg` | Logo sobre fondo **claro** | 200×48 |
| `mastexo-logo-mono.svg` | Monochrome para facturas / docs B/N | 200×48 |
| `mastexo-icon.svg` | Solo ícono — app icon, redes sociales | 48×48 |
| `favicon.svg` | Favicon vectorial | scalable |
| `LogoMastexo.jsx` | Componente React | — |

## Uso en HTML

```html
<!-- como <img> -->
<img src="/assets/mastexo-logo-horizontal.svg" alt="Mastexo" width="200" height="48">

<!-- favicon -->
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
```

## Uso en React

```jsx
import { LogoMastexo } from './LogoMastexo';

<LogoMastexo />                       // horizontal · oscuro (default)
<LogoMastexo theme="light" />         // horizontal · claro
<LogoMastexo variant="icon" />        // solo ícono 48×48
<LogoMastexo variant="mono" />        // monochrome
<LogoMastexo width={300} />           // tamaño custom
```

## Paleta

- Púrpura       `#7C3AED`
- Púrpura claro `#A855F7`
- Oscuro        `#0D0A1A`
- Gradiente     `linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)`

## Notas

- El wordmark "Mastexo" usa stack `Helvetica Neue, Helvetica, Arial, sans-serif`.
  Estos tipos están presentes en macOS, iOS, Windows y la mayoría de Linux —
  no requiere descargar fuentes. Si necesitás 100% pixel-idéntico en sistemas
  sin Helvetica/Arial, convertí el `<text>` a paths con Figma/Inkscape (Object → Path).
- El ícono está construido con polilíneas (sin curvas Bézier) — renderiza idéntico
  en cualquier visor SVG.
