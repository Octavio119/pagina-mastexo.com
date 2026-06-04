// ============================================
// MASTEXO — tailwind.config.ts
// Design system completo integrado en Tailwind
// ============================================

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // COLORES MASTEXO
      colors: {
        purple: {
          50:  '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#7C3AED', // PRIMARY
          600: '#6D28D9',
          700: '#5B21B6', // hover
          800: '#4C1D95',
          900: '#2E1065',
        },
        dark: {
          950: '#060608',
          900: '#111111', // fondo base
          800: '#1A1A1A', // cards
          700: '#222222',
          600: '#2A2A2A', // bordes
          500: '#333333',
          400: '#444444',
          300: '#666666',
          200: '#888888', // texto secondary
          100: '#AAAAAA',
        },
      },

      // TIPOGRAFÍA
      fontFamily: {
        heading: ['Space Grotesk', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
        sans:    ['Inter', 'sans-serif'],
      },

      // TAMAÑOS DE FUENTE
      fontSize: {
        'display-2xl': ['4.5rem',   { lineHeight: '1.1', fontWeight: '700' }],
        'display-xl':  ['3.75rem',  { lineHeight: '1.1', fontWeight: '700' }],
        'display-lg':  ['3rem',     { lineHeight: '1.15', fontWeight: '700' }],
        'display-md':  ['2.25rem',  { lineHeight: '1.2', fontWeight: '700' }],
        'display-sm':  ['1.875rem', { lineHeight: '1.25', fontWeight: '600' }],
      },

      // ESPACIADO EXTRA
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },

      // BORDER RADIUS
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
      },

      // SOMBRAS
      boxShadow: {
        'purple':    '0 4px 20px rgba(124,58,237,0.3)',
        'purple-lg': '0 8px 32px rgba(124,58,237,0.4)',
        'dark':      '0 4px 12px rgba(0,0,0,0.5)',
        'dark-lg':   '0 8px 24px rgba(0,0,0,0.6)',
      },

      // ANIMACIONES
      keyframes: {
        'fade-in-up': {
          '0%':   { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'pulse-purple': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(124,58,237,0.4)' },
          '50%':      { boxShadow: '0 0 0 8px rgba(124,58,237,0)' },
        },
      },
      animation: {
        'fade-in-up':    'fade-in-up 0.5s ease forwards',
        'fade-in':       'fade-in 0.4s ease forwards',
        'pulse-purple':  'pulse-purple 2s infinite',
      },

      // BACKGROUND GRADIENTES
      backgroundImage: {
        'purple-glow': 'radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)',
        'hero-grid':   'linear-gradient(rgba(124,58,237,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}

export default config
