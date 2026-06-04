// ============================================
// MASTEXO DESIGN SYSTEM — tokens.ts
// Paleta oficial: Negro #111111 + Púrpura #7C3AED
// ============================================

export const colors = {
  // Púrpura — color principal de marca
  purple: {
    50:  '#F5F3FF',
    100: '#EDE9FE',
    200: '#DDD6FE',
    300: '#C4B5FD',
    400: '#A78BFA',
    500: '#7C3AED', // ← PRIMARY principal
    600: '#6D28D9',
    700: '#5B21B6', // ← hover de botones
    800: '#4C1D95',
    900: '#2E1065',
  },

  // Negros y grises — base del sitio
  dark: {
    950: '#060608', // fondo más oscuro
    900: '#111111', // fondo principal ← BASE
    800: '#1A1A1A', // surface / cards
    700: '#222222', // cards hover
    600: '#2A2A2A', // bordes
    500: '#333333', // bordes énfasis
    400: '#444444', // texto muy muted
    300: '#666666', // texto muted
    200: '#888888', // texto secundario
    100: '#AAAAAA', // texto terciario
  },

  // Blancos — textos
  white: {
    pure:      '#FFFFFF', // títulos principales
    soft:      '#F5F5F5', // texto cuerpo
    muted:     '#CCCCCC', // texto secondary
  },

  // Semánticos
  success: '#22C55E',
  warning: '#F59E0B',
  error:   '#EF4444',
  info:    '#3B82F6',
}

export const fonts = {
  heading: "'Space Grotesk', sans-serif",
  body:    "'Inter', sans-serif",
  mono:    "'Fira Code', monospace",
}

export const fontSizes = {
  xs:   '0.75rem',   // 12px — captions
  sm:   '0.875rem',  // 14px — small text
  base: '1rem',      // 16px — body
  lg:   '1.125rem',  // 18px
  xl:   '1.25rem',   // 20px — subtítulos
  '2xl':'1.5rem',    // 24px
  '3xl':'1.875rem',  // 30px
  '4xl':'2.25rem',   // 36px
  '5xl':'3rem',      // 48px — headings grandes
  '6xl':'3.75rem',   // 60px — hero
  '7xl':'4.5rem',    // 72px — hero XL
}

export const fontWeights = {
  regular:   400,
  medium:    500,
  semibold:  600,
  bold:      700,
}

export const spacing = {
  0:   '0',
  1:   '0.25rem',  // 4px
  2:   '0.5rem',   // 8px
  3:   '0.75rem',  // 12px
  4:   '1rem',     // 16px
  5:   '1.25rem',  // 20px
  6:   '1.5rem',   // 24px
  8:   '2rem',     // 32px
  10:  '2.5rem',   // 40px
  12:  '3rem',     // 48px
  16:  '4rem',     // 64px
  20:  '5rem',     // 80px
  24:  '6rem',     // 96px
  32:  '8rem',     // 128px
}

export const borderRadius = {
  sm:   '4px',
  md:   '8px',
  lg:   '12px',
  xl:   '16px',
  '2xl':'24px',
  full: '9999px',
}

export const shadows = {
  sm:     '0 1px 2px rgba(0,0,0,0.4)',
  md:     '0 4px 12px rgba(0,0,0,0.5)',
  lg:     '0 8px 24px rgba(0,0,0,0.6)',
  purple: '0 4px 20px rgba(124,58,237,0.3)',
  purpleLg: '0 8px 32px rgba(124,58,237,0.4)',
}

export const breakpoints = {
  sm:  '640px',
  md:  '768px',
  lg:  '1024px',
  xl:  '1280px',
  '2xl':'1536px',
}
