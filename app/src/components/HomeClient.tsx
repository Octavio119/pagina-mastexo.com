'use client'

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
} from 'react'
import Image from 'next/image'
import { Menu, X, ChevronLeft, ChevronRight, MessageCircle, Check, MessageSquare, Zap, TrendingUp, Users, Timer, Layers, Globe, CreditCard, BarChart2, Bot } from 'lucide-react'

function IgIcon({ size = 18, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

// ─────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────
const WA_BASE = 'https://wa.me/56929709420'
const WA_GENERIC = `${WA_BASE}?text=Hola%20Mastexo%2C%20quiero%20saber%20m%C3%A1s%20sobre%20sus%20servicios`
const WA_DIAG = `${WA_BASE}?text=Hola%2C%20acabo%20de%20solicitar%20un%20diagn%C3%B3stico%20en%20Mastexo.`
const IG = 'https://www.instagram.com/mastexo.digital'
const EMAIL = 'contactos@mastexo.com'

const FD = "var(--font-syne), 'Syne', sans-serif"
const FB = "var(--font-dm-sans), 'DM Sans', sans-serif"

// Design tokens — mirrors globals.css :root vars
const C = {
  bg:      '#06080F',
  surface: '#0D1117',
  elevated:'#141B24',
  border:  'rgba(255,255,255,.08)',
  bHover:  'rgba(108,99,255,.4)',
  accent:  '#6C63FF',          // primary purple — all CTAs
  aGlow:   'rgba(108,99,255,.25)',
  cyan:    '#00D4FF',           // highlights only (hero italic)
  text:    '#FFFFFF',
  muted:   'rgba(255,255,255,.55)',   // ~5:1 on dark bg
  subtle:  'rgba(255,255,255,.30)',
}

// ─────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────
const T = {
  es: {
    nav: { solutions: 'Soluciones', process: 'Proceso', results: 'Resultados', contact: 'Contacto', cta: 'Diagnóstico gratis' },
    hero: {
      badge: '+85 negocios ya confían en Mastexo · LATAM',
      h1a: 'Automatización digital,', h1b: 'restaurantes y negocios en Chile.',
      sub: 'Automatizamos reservas, WhatsApp, CRM y marketing para restaurantes, barberías y tiendas. Primeros clientes reales en 14 días. Sin conocimientos técnicos.',
      cta1: 'Solicitar diagnóstico gratis', cta2: 'Ver cómo funciona',
      s1n: '+85', s1l: 'Negocios activos', s2n: '14', s2l: 'Días al primer cliente', s3n: '3×', s3l: 'Más reservas promedio',
      cardName: 'Barbería Ali - Santiago', cardQuote: 'En dos semanas llegaban clientes por Instagram',
    },
    sel: {
      label: 'SERVICIOS', h2: '¿Qué solución necesitas?',
      sub: 'Selecciona el servicio y te mostramos exactamente cómo funciona para tu negocio.',
      detailTitle: 'Cómo funciona', detailCta: 'Solicitar diagnóstico gratis →',
      cta: 'Solicitar diagnóstico gratuito →', ctaNote: 'Sin costo · Sin compromiso · Respuesta hoy',
    },
    stats: { n1:'+85',l1:'Negocios activos', n2:'14',l2:'Días al primer cliente', n3:'3×',l3:'Más reservas promedio', n4:'98%',l4:'Tasa de satisfacción' },
    testi: { title: 'Lo que dicen nuestros clientes', rating: '5.0 en Google' },
    proc: {
      title: 'Simple, rápido, sin complicaciones',
      s1t:'Cuéntanos tu negocio', s1d:'Completa el diagnóstico gratuito en 2 min. Sin tecnicismos, solo cuéntanos qué necesitas mejorar.', s1cta:'Diagnóstico gratis',
      s2t:'Diseñamos la solución', s2d:'Creamos estrategia personalizada: web, redes, publicidad o todo junto.', s2chip:'En 48hs tienes propuesta',
      s3t:'Empiezas a recibir clientes', s3d:'En 14 días tienes prospectos reales listos para comprar.', s3chip:'Garantía 14 días',
      cta:'Empezar ahora · es gratis', ctaNote:'Sin tarjeta · Sin contratos · Cancela cuando quieras',
    },
    why: {
      title:'Todo lo que necesitas', accent:'para crecer',
      c1t:'Más clientes', c1d:'Atraemos personas que ya buscan lo que ofreces. No seguidores. Clientes reales.', c1chip:'hasta 3× más reservas',
      c2t:'Más tiempo', c2d:'Automatizamos publicaciones, anuncios y respuestas. Tú te enfocas en tu negocio.', c2chip:'8+ horas semanales libres',
      c3t:'Menos complicaciones', c3d:'No necesitas saber de marketing ni tecnología. Nosotros manejamos todo.', c3chip:'0 herramientas que aprender',
      megaTitle:'Esto es exactamente lo que necesitas para hacer crecer tu negocio.',
      megaCta:'Diagnóstico gratuito · Empieza hoy', megaChip:'85+ negocios ya confían en Mastexo · Sin costo · Sin compromiso',
    },
    form: {
      h2:'¿Listo para más clientes?', sub:'Completa el formulario y te contactamos hoy mismo.',
      ph_name:'Tu nombre', ph_biz:'Tu negocio', ph_type:'Servicio de interés', ph_contact:'WhatsApp o Email', ph_msg:'¿Qué quieres mejorar? (opcional)',
      submit:'Solicitar diagnóstico gratuito →', sending:'Enviando...', success:'✓ ¡Listo! Te contactamos hoy',
      note:'Sin costo · Sin compromiso · Respuesta hoy mismo', altTitle:'¿Prefieres hablar ahora?', waCta:'Abrir WhatsApp',
    },
    footer: {
      tagline:'Soluciones digitales para negocios que quieren crecer en internet sin complicaciones.',
      navTitle:'Navegación', home:'Inicio', solutions:'Soluciones', process:'Proceso',
      contactTitle:'Contacto', legalTitle:'Legal', privacy:'Política de Privacidad', terms:'Términos de Servicio',
      copy:'© 2026 Mastexo Digital. Todos los derechos reservados.', region:'Chile · LATAM',
    },
    bnav: { solutions:'Soluciones', process:'Proceso', results:'Resultados', cta:'WhatsApp →' },
    cats: [
      { icon:'🌐', name:'Página Web', desc:'Tu negocio visible en Google 24/7', benefits:['Diseño a medida en 7 días','Optimizada para SEO local','Sistema de reservas y contacto'] },
      { icon:'📊', name:'CRM', desc:'Nunca pierdas un prospecto', benefits:['Captura automática de leads','Seguimiento de clientes','Pipeline de ventas visual'] },
      { icon:'🤖', name:'Asistente Virtual', desc:'Atención 24/7 en WhatsApp', benefits:['Responde mensajes automáticamente','Califica prospectos sin esfuerzo','Sin costo de personal extra'] },
      { icon:'⚡', name:'Automatización', desc:'Tu negocio en piloto automático', benefits:['Recordatorios de citas automáticos','Secuencias de seguimiento','Reportes semanales automáticos'] },
      { icon:'📣', name:'Sistema de Anuncios', desc:'Más clientes desde Meta y Google', benefits:['Campañas geolocalizadas','Optimización continua de presupuesto','Reportes de resultados reales'] },
      { icon:'💼', name:'Sistema Completo', desc:'Todo incluido en un solo plan', benefits:['Web + CRM + Asistente virtual','Automatizaciones ilimitadas','Soporte prioritario 7 días'] },
    ],
    testiData: [
      { icon:'✂️', text:'En dos semanas ya tenía clientes nuevos llegando por Instagram. No tuve que hacer nada técnico.', biz:'Barbería Ali', city:'Santiago Centro' },
      { icon:'🍷', text:'Triplicamos las reservas en el primer mes. El equipo manejó todo.', biz:'Casa de Campo', city:'Mostazal' },
      { icon:'🚐', text:'Ahora recibo pedidos mientras duermo. Con Mastexo fue fácil.', biz:'Food Truck La Ruta', city:'Viña del Mar' },
      { icon:'☕', text:'El café lleno los viernes gracias a los anuncios que ellos manejan.', biz:'Café Central', city:'Las Condes' },
      { icon:'🍽️', text:'Mis mesas se llenan los fines de semana sin depender de plataformas.', biz:'Restaurante Don Pedro', city:'Ñuñoa' },
    ],
    toasts: [
      '✂️ Barbería en Santiago solicitó diagnóstico hace 5 min',
      '🍽️ Restaurante en Valparaíso se unió hace 12 min',
      '💅 Salón en Providencia solicitó diagnóstico hace 8 min',
      '☕ Cafetería en Las Condes se unió hace 3 min',
      '🛍️ Tienda en Temuco solicitó diagnóstico hace 15 min',
    ],
  },
  en: {
    nav: { solutions:'Solutions', process:'Process', results:'Results', contact:'Contact', cta:'Free diagnosis' },
    hero: {
      badge:'+85 businesses already trust Mastexo · LATAM',
      h1a:'Digital results,', h1b:'no complications.',
      sub:'We design websites and digital solutions that turn visitors into real customers. For restaurants, barbershops, salons and stores across LATAM.',
      cta1:'Request free diagnosis', cta2:'See how it works',
      s1n:'+85', s1l:'Active businesses', s2n:'14', s2l:'Days to first client', s3n:'3×', s3l:'Average booking increase',
      cardName:'Ali Barbershop - Santiago', cardQuote:'Clients started coming via Instagram in two weeks',
    },
    sel: {
      label:'SERVICES', h2:'What solution do you need?',
      sub:"Select the service and we'll show you exactly how it works for your business.",
      detailTitle:'How it works', detailCta:'Request free diagnosis →',
      cta:'Request free diagnosis →', ctaNote:'No cost · No commitment · Reply today',
    },
    stats: { n1:'+85',l1:'Active businesses', n2:'14',l2:'Days to first client', n3:'3×',l3:'Average booking increase', n4:'98%',l4:'Satisfaction rate' },
    testi: { title:'What our clients say', rating:'5.0 on Google' },
    proc: {
      title:'Simple, fast, no complications',
      s1t:'Tell us about your business', s1d:"Complete the free diagnosis in 2 min. No tech jargon, just tell us what you need to improve.", s1cta:'Free diagnosis',
      s2t:'We design the solution', s2d:'We create a personalized strategy: web, social, advertising or all together.', s2chip:'Proposal in 48hs',
      s3t:'You start getting clients', s3d:'In 14 days you have real prospects ready to buy.', s3chip:'14-day guarantee',
      cta:"Start now · it's free", ctaNote:'No card · No contracts · Cancel anytime',
    },
    why: {
      title:'Everything you need', accent:'to grow',
      c1t:'More clients', c1d:"We attract people already searching for what you offer. Not followers. Real customers.", c1chip:'up to 3× more bookings',
      c2t:'More time', c2d:'We automate posts, ads and responses. You focus on your business.', c2chip:'8+ free weekly hours',
      c3t:'Less complexity', c3d:"You don't need to know marketing or tech. We handle everything.", c3chip:'0 tools to learn',
      megaTitle:'This is exactly what you need to grow your business.',
      megaCta:'Free diagnosis · Start today', megaChip:'85+ businesses trust Mastexo · No cost · No commitment',
    },
    form: {
      h2:'Ready for more clients?', sub:"Fill out the form and we'll reach out today.",
      ph_name:'Your name', ph_biz:'Your business', ph_type:'Service of interest', ph_contact:'WhatsApp or Email', ph_msg:'What do you want to improve? (optional)',
      submit:'Request free diagnosis →', sending:'Sending...', success:"✓ Done! We'll contact you today",
      note:'No cost · No commitment · Reply today', altTitle:'Prefer to talk now?', waCta:'Open WhatsApp',
    },
    footer: {
      tagline:'Digital solutions for businesses that want to grow online without complications.',
      navTitle:'Navigation', home:'Home', solutions:'Solutions', process:'Process',
      contactTitle:'Contact', legalTitle:'Legal', privacy:'Privacy Policy', terms:'Terms of Service',
      copy:'© 2026 Mastexo Digital. All rights reserved.', region:'Chile · LATAM',
    },
    bnav: { solutions:'Solutions', process:'Process', results:'Results', cta:'WhatsApp →' },
    cats: [
      { icon:'🌐', name:'Website', desc:'Your business visible on Google 24/7', benefits:['Custom design in 7 days','SEO-optimized for local search','Booking and contact system'] },
      { icon:'📊', name:'CRM', desc:'Never lose a prospect again', benefits:['Automatic lead capture','Client follow-up tracking','Visual sales pipeline'] },
      { icon:'🤖', name:'Virtual Assistant', desc:'24/7 service on WhatsApp', benefits:['Auto-replies to messages','Qualifies leads effortlessly','No extra staffing costs'] },
      { icon:'⚡', name:'Automation', desc:'Your business on autopilot', benefits:['Automatic appointment reminders','Follow-up sequences','Weekly automatic reports'] },
      { icon:'📣', name:'Ad System', desc:'More clients from Meta and Google', benefits:['Geo-targeted campaigns','Continuous budget optimization','Real results reports'] },
      { icon:'💼', name:'Full System', desc:'Everything included in one plan', benefits:['Web + CRM + Virtual assistant','Unlimited automations','Priority support 7 days'] },
    ],
    testiData: [
      { icon:'✂️', text:"In two weeks new clients were already coming through Instagram. I didn't have to do anything technical.", biz:'Ali Barbershop', city:'Santiago Centro' },
      { icon:'🍷', text:'We tripled bookings in the first month. The team handled everything.', biz:'Casa de Campo', city:'Mostazal' },
      { icon:'🚐', text:'Now I receive orders while I sleep. With Mastexo it was easy.', biz:'Food Truck La Ruta', city:'Viña del Mar' },
      { icon:'☕', text:'The café is full on Fridays thanks to the ads they manage.', biz:'Café Central', city:'Las Condes' },
      { icon:'🍽️', text:'My tables fill up on weekends without depending on platforms.', biz:'Don Pedro Restaurant', city:'Ñuñoa' },
    ],
    toasts: [
      '✂️ Barbershop in Santiago requested diagnosis 5 min ago',
      '🍽️ Restaurant in Valparaíso joined 12 min ago',
      '💅 Salon in Providencia requested diagnosis 8 min ago',
      '☕ Café in Las Condes joined 3 min ago',
      '🛍️ Store in Temuco requested diagnosis 15 min ago',
    ],
  },
} as const

type Lang = 'es' | 'en'

// ─────────────────────────────────────────
// CONTEXT
// ─────────────────────────────────────────
const AppCtx = createContext<{ lang: Lang; toggle: () => void; scrollY: number }>({ lang: 'es', toggle: () => {}, scrollY: 0 })
const useLang    = () => useContext(AppCtx)
const useT       = () => { const { lang } = useLang(); return T[lang] }
const useScrollY = () => useContext(AppCtx).scrollY

// ─────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────
function useScrollListener() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const h = () => setY(window.scrollY)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return y
}

function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useCounter(target: number, inView: boolean, duration = 1600) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf: number
    const start = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 4)
      setCount(Math.floor(eased * target))
      if (p < 1) { raf = requestAnimationFrame(step) } else { setCount(target) }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])
  return count
}

function useRevealChildren(staggerMs = 100) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const children = Array.from(el.children) as HTMLElement[]
    children.forEach(child => child.classList.add('reveal'))
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      children.forEach((child, i) => {
        child.style.transitionDelay = `${i * staggerMs}ms`
        child.classList.add('revealed')
      })
      obs.disconnect()
    }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [staggerMs])
  return ref
}

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

// ─────────────────────────────────────────
// GLOBAL CSS
// ─────────────────────────────────────────
const STYLES = `
  @keyframes fadeUp    { from{opacity:0;transform:translateY(32px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
  @keyframes float     { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-14px)} }
  @keyframes pulseRing { 0%{transform:scale(1);opacity:.5} 100%{transform:scale(1.75);opacity:0} }
  @keyframes slideIn   { from{opacity:0;transform:translateX(20px)} to{opacity:1;transform:translateX(0)} }
  @keyframes shimmer   { 0%{background-position:200% center} 100%{background-position:-200% center} }
  @keyframes gridPulse     { 0%,100%{opacity:.04} 50%{opacity:.07} }
  @keyframes gridMove      { from{background-position:0 0} to{background-position:60px 60px} }
  @keyframes heroCardFloat { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
  @keyframes slideInLeft   { from{opacity:0;transform:translateX(-24px)} to{opacity:1;transform:translateX(0)} }
  @keyframes slideOutLeft  { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(-24px)} }
  @keyframes pulseDot      { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.45;transform:scale(.75)} }

  .mx-fade-up  { animation: fadeUp .8s cubic-bezier(.16,1,.3,1) forwards; }
  .mx-fade-in  { animation: fadeIn .6s ease forwards; }
  .mx-float    { animation: float 5s ease-in-out infinite; }
  .mx-pulse    { animation: pulseRing 2s ease-out infinite; }
  .mx-slide-in { animation: slideIn .45s cubic-bezier(.16,1,.3,1); }

  .mx-glass {
    background: rgba(255,255,255,.03);
    backdrop-filter: blur(24px) saturate(1.4);
    -webkit-backdrop-filter: blur(24px) saturate(1.4);
    border: 1px solid rgba(255,255,255,.07);
  }
  .mx-glass-strong {
    background: rgba(255,255,255,.05);
    backdrop-filter: blur(32px) saturate(1.6);
    -webkit-backdrop-filter: blur(32px) saturate(1.6);
    border: 1px solid rgba(255,255,255,.1);
  }

  /* Gradient text — accent hero highlight */
  .mx-gradient-text {
    background: linear-gradient(135deg, #6C63FF 0%, #a78bfa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  /* Hero italic — cyan only */
  .mx-cyan-text {
    background: linear-gradient(135deg, #00D4FF 0%, #6C63FF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .mx-gradient-border {
    position: relative;
  }
  .mx-gradient-border::before {
    content:'';
    position:absolute;
    inset:0;
    border-radius:inherit;
    padding:1px;
    background:linear-gradient(135deg,rgba(108,99,255,.4),rgba(167,139,250,.2));
    -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0);
    -webkit-mask-composite:xor;mask-composite:exclude;
    pointer-events:none;
  }

  /* mx-btn-primary — alias to globals .btn-primary for inline use */
  .mx-btn-primary {
    display:inline-flex; align-items:center; justify-content:center;
    background: #6C63FF;
    color:#fff; font-weight:700; border-radius:9999px; border:none;
    box-shadow: 0 4px 24px rgba(108,99,255,.35);
    transition: background .2s ease, transform .2s ease, box-shadow .2s ease;
    cursor:pointer; text-decoration:none;
  }
  .mx-btn-primary:hover {
    background: #5B52E5;
    transform: translateY(-2px);
    box-shadow: 0 8px 32px rgba(108,99,255,.5);
  }
  .mx-btn-primary:active { transform:translateY(0) scale(.97); }

  .mx-btn-ghost {
    background: transparent;
    border: 1px solid rgba(255,255,255,.14);
    color: rgba(255,255,255,.75);
    border-radius: 9999px;
    transition: border-color .2s, background .2s, color .2s;
    cursor:pointer;
  }
  .mx-btn-ghost:hover {
    border-color: rgba(108,99,255,.5);
    background: rgba(108,99,255,.07);
    color: #fff;
  }

  .mx-grid-bg {
    background-image: linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px), linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);
    background-size: 64px 64px;
    animation: gridPulse 6s ease-in-out infinite;
  }

  .mx-hero-grid {
    background-image: linear-gradient(rgba(108,99,255,.04) 1px,transparent 1px), linear-gradient(90deg,rgba(108,99,255,.04) 1px,transparent 1px);
    background-size: 60px 60px;
    animation: gridMove 30s linear infinite;
  }
  .mx-hero-card-float { animation: heroCardFloat 3s ease-in-out infinite; }

  .mx-card-hover {
    transition: transform .3s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s;
  }
  .mx-card-hover:hover {
    transform: translateY(-6px);
    border-color: rgba(108,99,255,.3) !important;
    box-shadow: 0 24px 60px rgba(0,0,0,.5), 0 0 40px rgba(108,99,255,.08);
  }

  .mx-process-card {
    border-top:    1px solid rgba(255,255,255,.06);
    border-right:  1px solid rgba(255,255,255,.06);
    border-bottom: 1px solid rgba(255,255,255,.06);
    border-left:   3px solid #6C63FF;
  }
  .mx-process-card:hover {
    border-top-color:    rgba(108,99,255,.3);
    border-right-color:  rgba(108,99,255,.3);
    border-bottom-color: rgba(108,99,255,.3);
    box-shadow: 0 8px 40px rgba(108,99,255,.08);
  }

  /* Focus rings — visible for keyboard nav */
  :focus-visible {
    outline: 2px solid rgba(108,99,255,.8);
    outline-offset: 3px;
    border-radius: 6px;
  }
  button:focus-visible, a:focus-visible {
    outline: 2px solid rgba(108,99,255,.8);
    outline-offset: 3px;
  }
  /* Visually hidden labels for a11y */
  .sr-only {
    position:absolute; width:1px; height:1px; padding:0; margin:-1px;
    overflow:hidden; clip:rect(0,0,0,0); white-space:nowrap; border:0;
  }

  /* Scroll offset for fixed navbar */
  section[id] { scroll-margin-top: 72px; }

  /* Prevent iOS auto-zoom on input focus */
  @media(max-width:768px){
    input, select, textarea { font-size: 16px !important; }
  }

  /* Global scroll-reveal system */
  .reveal {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity .7s ease, transform .7s cubic-bezier(.16,1,.3,1);
    will-change: transform, opacity;
  }
  .revealed {
    opacity: 1;
    transform: translateY(0);
    will-change: auto;
  }

  /* Hero accent word — shimmer every 4s */
  @keyframes textShimmer {
    0%   { background-position: 0% center }
    100% { background-position: 200% center }
  }
  .mx-text-shimmer {
    background: linear-gradient(90deg, #6C63FF 0%, #9B93FF 30%, #c4b5fd 50%, #9B93FF 70%, #6C63FF 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: textShimmer 4s linear infinite;
  }

  /* Navbar entry */
  @keyframes fadeDown { from{opacity:0;transform:translateY(-12px)} to{opacity:1;transform:translateY(0)} }

  @media(prefers-reduced-motion:reduce){
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
    .reveal { opacity: 1 !important; transform: none !important; }
  }
`

// ─────────────────────────────────────────
// SHARED UI COMPONENTS
// ─────────────────────────────────────────
function SectionDivider() {
  return (
    <div style={{ height:1, background:'linear-gradient(90deg,transparent,rgba(108,99,255,.3),transparent)' }}/>
  )
}

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{
      fontFamily:FB, fontWeight:600, fontSize:11, letterSpacing:'.12em',
      color:'#6C63FF', textTransform:'uppercase', marginBottom:14,
      borderLeft:'2px solid #6C63FF', paddingLeft:8,
    }}>{text}</p>
  )
}

// ─────────────────────────────────────────
// NAVBAR — floating glass pill
// ─────────────────────────────────────────
function Navbar() {
  const t = useT(); const { lang, toggle } = useLang()
  const scrollY = useScrollY()
  const [open, setOpen] = useState(false)
  const scrolled = scrollY > 40

  const links = [
    { label: t.nav.solutions, id: 'soluciones' },
    { label: t.nav.process,   id: 'proceso' },
    { label: t.nav.results,   id: 'resultados' },
    { label: t.nav.contact,   id: 'contacto' },
  ]

  return (
    <>
      {/* Floating pill wrapper */}
      <div className="fixed top-5 left-0 right-0 z-[100] px-4 pointer-events-none"
        style={{ animation: 'fadeDown .5s ease both' }}>
        <div className="max-w-5xl mx-auto pointer-events-auto">
          <nav style={{
            display: 'flex', alignItems: 'center', gap: 0,
            borderRadius: 9999,
            background: scrolled ? 'rgba(6,8,15,0.92)' : 'rgba(6,8,15,0.65)',
            backdropFilter: 'blur(32px) saturate(1.8)',
            WebkitBackdropFilter: 'blur(32px) saturate(1.8)',
            border: `1px solid ${scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.07)'}`,
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(108,99,255,0.06)'
              : '0 4px 24px rgba(0,0,0,0.3)',
            padding: '0 6px 0 18px',
            height: 52,
            transition: 'background .3s ease, border-color .3s ease, box-shadow .3s ease',
          }}>
            {/* Logo */}
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 cursor-pointer bg-transparent border-none flex-shrink-0"
              style={{ marginRight: 32 }}>
              <Image src="/logo1.jpg" alt="Mastexo" width={26} height={26} className="rounded-full object-cover"/>
              <span style={{ fontFamily: FD, fontWeight: 700, fontSize: 17, color: '#fff', letterSpacing: '-.01em' }}>Mastexo</span>
            </button>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1 flex-1">
              {links.map(l => (
                <button key={l.id} onClick={() => scrollTo(l.id)}
                  className="cursor-pointer bg-transparent border-none whitespace-nowrap rounded-full px-3 py-1.5"
                  style={{ fontFamily: FB, fontSize: 13.5, fontWeight: 500, color: 'rgba(255,255,255,.5)', transition: 'color .2s ease, background .2s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,.9)'; e.currentTarget.style.background = 'rgba(255,255,255,.06)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,.5)'; e.currentTarget.style.background = 'transparent' }}>
                  {l.label}
                </button>
              ))}
            </div>

            {/* Language toggle */}
            <div className="hidden md:flex items-center rounded-full px-1.5 py-1 gap-0.5 flex-shrink-0 mx-3"
              style={{ background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.07)' }}>
              {(['es', 'en'] as Lang[]).map(l => (
                <button key={l} onClick={toggle}
                  aria-label={`Cambiar idioma a ${l === 'es' ? 'español' : 'inglés'}`}
                  className="rounded-full px-2.5 py-1 cursor-pointer transition-all duration-200"
                  style={{
                    background: lang === l ? 'rgba(108,99,255,.85)' : 'transparent',
                    color: lang === l ? '#fff' : 'rgba(255,255,255,.4)',
                    fontFamily: FB, fontSize: 11, fontWeight: lang === l ? 700 : 400,
                    letterSpacing: '.05em', border: 'none',
                  }}>
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            {/* CTA pill */}
            <button onClick={() => scrollTo('contacto')}
              className="hidden md:flex items-center cursor-pointer flex-shrink-0"
              style={{
                fontFamily: FD, fontSize: 13, fontWeight: 700, letterSpacing: '.01em',
                background: '#6C63FF', color: '#fff', border: 'none',
                borderRadius: 9999, padding: '10px 22px',
                boxShadow: '0 0 18px rgba(108,99,255,.4)',
                transition: 'background .2s ease, transform .2s ease, box-shadow .2s ease',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#5B52E5'; e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 4px 24px rgba(108,99,255,.65)' }}
              onMouseLeave={e => { e.currentTarget.style.background = '#6C63FF'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 0 18px rgba(108,99,255,.4)' }}>
              {t.nav.cta}
            </button>

            {/* Mobile hamburger */}
            <button type="button" onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className="md:hidden cursor-pointer bg-transparent border-none flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
              style={{ color: '#fff' }}>
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile fullscreen menu */}
      {open && (
        <div className="fixed inset-0 z-[99] md:hidden flex flex-col items-center justify-center gap-10"
          style={{ background: 'rgba(6,8,15,.97)', backdropFilter: 'blur(32px)' }}>
          <button onClick={() => setOpen(false)} aria-label="Cerrar menú"
            className="absolute top-5 right-5 cursor-pointer bg-transparent border-none"
            style={{ color: 'rgba(255,255,255,.7)' }}>
            <X size={26} />
          </button>
          {links.map(l => (
            <button key={l.id} onClick={() => { scrollTo(l.id); setOpen(false) }}
              className="cursor-pointer bg-transparent border-none transition-colors duration-200"
              style={{ fontFamily: FD, fontWeight: 700, fontSize: 32, color: 'rgba(255,255,255,.85)', letterSpacing: '-.02em' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#6C63FF')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,.85)')}>
              {l.label}
            </button>
          ))}
          <button onClick={() => { scrollTo('contacto'); setOpen(false) }}
            className="mx-btn-primary px-10 py-4 cursor-pointer mt-2"
            style={{ fontFamily: FD, fontWeight: 700, fontSize: 16 }}>
            {t.nav.cta}
          </button>
        </div>
      )}
    </>
  )
}

// ─────────────────────────────────────────
// DASHBOARD MOCKUP — hero right column
// ─────────────────────────────────────────
function DashboardMockup() {
  const sparkData = [12, 18, 14, 26, 21, 33, 28, 40, 36, 52, 46, 62]
  const maxVal = Math.max(...sparkData)
  const pts = sparkData.map((v, i) =>
    `${(i / (sparkData.length - 1)) * 100},${100 - (v / maxVal) * 92}`
  ).join(' ')
  const areaPts = `0,100 ${pts} 100,100`

  return (
    <div style={{ position: 'relative', paddingTop: 24, paddingBottom: 24, paddingLeft: 28 }}>
      {/* Glow behind card */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 55% 50%, rgba(108,99,255,.1) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(32px)' }}/>

      {/* Main dashboard card */}
      <div style={{
        position: 'relative',
        background: 'rgba(13,17,23,0.96)',
        backdropFilter: 'blur(32px)',
        WebkitBackdropFilter: 'blur(32px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 20,
        overflow: 'hidden',
        boxShadow: '0 32px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(108,99,255,0.07)',
        animation: 'float 7s ease-in-out infinite',
      }}>
        {/* Header */}
        <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '13px 18px', display: 'flex', alignItems: 'center', gap: 9 }}>
          <div style={{ width: 28, height: 28, background: 'rgba(108,99,255,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Layers size={13} color="#6C63FF" />
          </div>
          <span style={{ fontFamily: FD, fontWeight: 600, fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>Mastexo Dashboard</span>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontFamily: FB, fontSize: 10.5, background: 'rgba(16,185,129,0.1)', color: '#10b981', padding: '3px 10px', borderRadius: 100, border: '1px solid rgba(16,185,129,0.2)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10b981', animation: 'pulseDot 1.8s ease-in-out infinite', display: 'inline-block' }}/>
              En vivo
            </span>
          </div>
        </div>

        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          {[
            { label: 'Clientes activos', value: '2,847', delta: '+32%', color: '#6C63FF' },
            { label: 'Reservas hoy', value: '48', delta: '+8 hoy', color: '#00D4FF' },
            { label: 'Conversión', value: '68%', delta: '+12%', color: '#10b981' },
          ].map((k, i) => (
            <div key={k.label} style={{ padding: '15px 14px', borderRight: i < 2 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
              <div style={{ fontFamily: FB, fontSize: 9, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 7 }}>{k.label}</div>
              <div style={{ fontFamily: FD, fontSize: 21, fontWeight: 800, color: '#fff', lineHeight: 1 }}>{k.value}</div>
              <div style={{ fontFamily: FB, fontSize: 11, color: k.color, marginTop: 5 }}>↑ {k.delta}</div>
            </div>
          ))}
        </div>

        {/* Sparkline */}
        <div style={{ padding: '15px 18px 12px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '.07em' }}>Reservas · últimas 12 semanas</span>
            <span style={{ fontFamily: FD, fontSize: 12, fontWeight: 700, color: '#10b981' }}>↑ 3.2×</span>
          </div>
          <div style={{ height: 48 }}>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="dsbGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#6C63FF" stopOpacity=".28"/>
                  <stop offset="100%" stopColor="#6C63FF" stopOpacity="0"/>
                </linearGradient>
              </defs>
              <polygon points={areaPts} fill="url(#dsbGrad)"/>
              <polyline points={pts} fill="none" stroke="#6C63FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              {/* Last point dot */}
              <circle cx="100" cy={100 - (sparkData[sparkData.length - 1] / maxVal) * 92} r="3" fill="#6C63FF"/>
            </svg>
          </div>
        </div>

        {/* Activity feed */}
        <div style={{ padding: '13px 18px' }}>
          <div style={{ fontFamily: FB, fontSize: 9.5, color: 'rgba(255,255,255,0.28)', textTransform: 'uppercase', letterSpacing: '.08em', marginBottom: 10 }}>Actividad reciente</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {[
              { dot: '#10b981', text: 'Nueva reserva — Barbería Ali', time: '2m' },
              { dot: '#6C63FF', text: 'Lead WhatsApp — Café Central', time: '8m' },
              { dot: '#00D4FF', text: 'IA procesó 12 contactos nuevos', time: '15m' },
            ].map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: a.dot, flexShrink: 0, boxShadow: `0 0 6px ${a.dot}88` }}/>
                <span style={{ fontFamily: FB, fontSize: 11.5, color: 'rgba(255,255,255,0.55)', flex: 1 }}>{a.text}</span>
                <span style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,0.2)', flexShrink: 0 }}>{a.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI bar */}
        <div style={{ background: 'rgba(108,99,255,0.05)', borderTop: '1px solid rgba(108,99,255,0.1)', padding: '10px 18px', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Bot size={13} color="#6C63FF" />
          <span style={{ fontFamily: FB, fontSize: 11, color: 'rgba(255,255,255,0.38)', flex: 1 }}>IA activa · procesando 3 campañas automáticas</span>
          <div style={{ display: 'flex', gap: 4 }}>
            {['CRM', 'WA', 'Ads'].map(tag => (
              <span key={tag} style={{ fontFamily: FB, fontSize: 9, fontWeight: 700, color: '#6C63FF', background: 'rgba(108,99,255,0.12)', padding: '2px 7px', borderRadius: 100, letterSpacing: '.04em' }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating: new lead badge (top-right) */}
      <div style={{
        position: 'absolute', top: 8, right: -12,
        background: 'rgba(10,14,20,0.97)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(16,185,129,0.28)',
        borderRadius: 14, padding: '10px 14px',
        display: 'flex', alignItems: 'center', gap: 10,
        boxShadow: '0 8px 28px rgba(0,0,0,0.45), 0 0 0 1px rgba(16,185,129,0.06)',
        animation: 'float 5s ease-in-out .6s infinite',
      }}>
        <div style={{ width: 30, height: 30, background: 'rgba(16,185,129,0.12)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <TrendingUp size={14} color="#10b981" />
        </div>
        <div>
          <div style={{ fontFamily: FD, fontSize: 12, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>Nuevo cliente</div>
          <div style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>Barbería Ali · hace 2 min</div>
        </div>
      </div>

      {/* Floating: 14 días badge (bottom-left) */}
      <div style={{
        position: 'absolute', bottom: 8, left: 0,
        background: 'rgba(10,14,20,0.97)',
        backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(0,212,255,0.2)',
        borderRadius: 14, padding: '12px 18px',
        boxShadow: '0 8px 28px rgba(0,0,0,0.4)',
        animation: 'float 8s ease-in-out 1.2s infinite',
      }}>
        <div style={{ fontFamily: FB, fontSize: 9.5, color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 3 }}>Respuesta media</div>
        <div style={{ fontFamily: FD, fontSize: 22, fontWeight: 800, color: '#00D4FF', lineHeight: 1 }}>14 días</div>
        <div style={{ fontFamily: FB, fontSize: 10, color: 'rgba(255,255,255,0.3)', marginTop: 3 }}>al primer cliente</div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// HERO — two-column enterprise layout
// ─────────────────────────────────────────
function HeroSection() {
  const t = useT()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: C.bg }}>

      {/* Background gradient orbs */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: [
          'radial-gradient(ellipse 65% 55% at 15% 55%, rgba(108,99,255,.08) 0%, transparent 60%)',
          'radial-gradient(ellipse 50% 45% at 85% 20%, rgba(0,212,255,.05) 0%, transparent 60%)',
          'radial-gradient(ellipse 40% 40% at 60% 80%, rgba(108,99,255,.04) 0%, transparent 60%)',
        ].join(', '),
      }}/>

      {/* Subtle animated grid */}
      <div className="absolute inset-0 mx-hero-grid pointer-events-none" style={{ opacity: .45 }}/>

      {/* Spotlight radial behind content */}
      <div className="absolute pointer-events-none" style={{ top: '10%', left: '-10%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(108,99,255,.07) 0%, transparent 65%)', filter: 'blur(60px)', transform: 'translateZ(0)' }}/>
      <div className="absolute pointer-events-none" style={{ bottom: '5%', right: '-5%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(0,212,255,.05) 0%, transparent 65%)', filter: 'blur(60px)', transform: 'translateZ(0)' }}/>

      {/* Two-column layout */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-8" style={{ paddingTop: 100, paddingBottom: 80 }}>
        <div className="grid lg:grid-cols-[1fr_1fr] gap-12 xl:gap-20 items-center">

          {/* ── LEFT: headline + CTAs ── */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2.5 mb-10 mx-fade-up"
              style={{
                animationDelay: '.05s', opacity: 0,
                background: 'rgba(108,99,255,.07)',
                border: '1px solid rgba(108,99,255,.22)',
                borderRadius: 9999, padding: '6px 14px 6px 10px',
              }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#10b981', boxShadow: '0 0 8px rgba(16,185,129,.75)', animation: 'pulseDot 1.8s ease-in-out infinite', display: 'inline-block', flexShrink: 0 }}/>
              <span style={{ fontFamily: FB, fontSize: 12.5, color: 'rgba(241,245,249,.65)', letterSpacing: '.02em' }}>{t.hero.badge}</span>
            </div>

            {/* H1 */}
            <h1 style={{
              fontFamily: FD, fontWeight: 800,
              lineHeight: .93, letterSpacing: '-.04em',
              fontSize: 'clamp(44px,5.8vw,84px)',
              color: C.text, marginBottom: 28,
            }}>
              {/* "Automatización" */}
              <span className="mx-fade-up" style={{ display: 'block', animationDelay: '.1s', opacity: 0 }}>
                Automatización{' '}
                <span style={{
                  background: 'linear-gradient(135deg, #7C3AED 0%, #4F46E5 45%, #00D4FF 100%)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>digital,</span>
              </span>
              {/* "restaurantes y negocios" */}
              <span className="mx-fade-up" style={{ display: 'block', animationDelay: '.18s', opacity: 0 }}>
                restaurantes
              </span>
              {/* "en Chile." — slightly muted */}
              <span className="mx-fade-up" style={{ display: 'block', animationDelay: '.26s', opacity: 0, color: 'rgba(255,255,255,.45)' }}>
                y negocios en Chile.
              </span>
            </h1>

            {/* Sub */}
            <p className="mx-fade-up" style={{
              fontFamily: FB, fontSize: 17.5, color: 'rgba(255,255,255,.48)',
              maxWidth: 540, marginBottom: 40, lineHeight: 1.72,
              animationDelay: '.36s', opacity: 0,
            }}>
              {t.hero.sub}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 mx-fade-up" style={{ animationDelay: '.46s', opacity: 0 }}>
              <button onClick={() => scrollTo('contacto')} className="cursor-pointer"
                style={{
                  fontFamily: FD, fontWeight: 700, fontSize: 15, letterSpacing: '.01em',
                  padding: '14px 32px',
                  background: '#6C63FF', color: '#fff', border: 'none', borderRadius: 14,
                  boxShadow: '0 4px 28px rgba(108,99,255,.45)',
                  transition: 'background .2s ease, transform .2s ease, box-shadow .2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#5B52E5'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 36px rgba(108,99,255,.65)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#6C63FF'; e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = '0 4px 28px rgba(108,99,255,.45)' }}>
                {t.hero.cta1} →
              </button>
              <button onClick={() => scrollTo('proceso')} className="cursor-pointer"
                style={{
                  fontFamily: FD, fontWeight: 600, fontSize: 15,
                  padding: '14px 32px',
                  background: 'rgba(255,255,255,.04)', color: 'rgba(255,255,255,.78)',
                  border: '1px solid rgba(255,255,255,.1)', borderRadius: 14,
                  backdropFilter: 'blur(12px)', transition: 'all .2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.08)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.04)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)' }}>
                {t.hero.cta2}
              </button>
            </div>

            {/* Social proof glass pills */}
            <div className="flex flex-wrap items-center gap-3 mx-fade-up" style={{ marginTop: 32, animationDelay: '.56s', opacity: 0 }}>
              {[
                { n: t.hero.s1n, l: t.hero.s1l, color: '#6C63FF', bg: 'rgba(108,99,255,.1)', border: 'rgba(108,99,255,.2)' },
                { n: t.hero.s2n, l: t.hero.s2l, color: '#00D4FF', bg: 'rgba(0,212,255,.07)', border: 'rgba(0,212,255,.18)' },
                { n: t.hero.s3n, l: t.hero.s3l, color: '#10b981', bg: 'rgba(16,185,129,.08)', border: 'rgba(16,185,129,.2)' },
              ].map((s, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: s.bg, border: `1px solid ${s.border}`,
                  borderRadius: 12, padding: '10px 16px',
                  backdropFilter: 'blur(12px)',
                }}>
                  <span style={{ fontFamily: FD, fontWeight: 800, fontSize: 20, color: s.color, lineHeight: 1 }}>{s.n}</span>
                  <span style={{ fontFamily: FB, fontSize: 12, color: 'rgba(255,255,255,.42)', lineHeight: 1.3, maxWidth: 75 }}>{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: dashboard mockup (desktop only) ── */}
          <div className="hidden lg:block mx-fade-up" style={{ animationDelay: '.28s', opacity: 0 }}>
            <DashboardMockup />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 mx-fade-in" style={{ animationDelay: '1.4s', opacity: 0 }}>
        <div style={{ width: 1, height: 36, background: 'linear-gradient(to bottom, rgba(108,99,255,.5), transparent)' }}/>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// BENTO SERVICES — mini UI previews
// ─────────────────────────────────────────
function PreviewCRM() {
  const cols = [{ l:'Nuevos', v:4, c:'#6C63FF' }, { l:'Activos', v:7, c:'#00D4FF' }, { l:'Cerrados', v:3, c:'#10b981' }]
  return (
    <div style={{ padding:'10px 0 4px' }}>
      <div style={{ display:'flex', gap:5, marginBottom:8 }}>
        {cols.map(c => (
          <div key={c.l} style={{ flex:1, background:'rgba(255,255,255,.04)', borderRadius:7, padding:'6px 4px', textAlign:'center' }}>
            <div style={{ fontSize:8, color:'rgba(255,255,255,.3)', marginBottom:3, textTransform:'uppercase', letterSpacing:'.06em' }}>{c.l}</div>
            <div style={{ fontSize:16, fontWeight:700, color:c.c }}>{c.v}</div>
          </div>
        ))}
      </div>
      {['María G.','Carlos R.','Ana M.'].map((n,i) => (
        <div key={n} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'4px 0', borderBottom:'1px solid rgba(255,255,255,.04)', fontSize:10 }}>
          <span style={{ color:'rgba(255,255,255,.5)' }}>{n}</span>
          <span style={{ color:['#6C63FF','#00D4FF','#10b981'][i], fontSize:9, background:'rgba(108,99,255,.08)', padding:'2px 6px', borderRadius:4 }}>{['Lead','Activo','Ganado'][i]}</span>
        </div>
      ))}
    </div>
  )
}

function PreviewPOS() {
  return (
    <div style={{ padding:'10px 0 4px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:9, color:'rgba(255,255,255,.3)', textTransform:'uppercase', letterSpacing:'.06em' }}>
        <span>Mesa 4 · Orden #142</span><span style={{ color:'#10b981' }}>● Activa</span>
      </div>
      {[['Pasta x2','$18.000'],['Pizza x1','$12.000'],['Bebidas x3','$6.000']].map(([n,p]) => (
        <div key={n} style={{ display:'flex', justifyContent:'space-between', padding:'3px 0', borderBottom:'1px solid rgba(255,255,255,.04)', fontSize:10 }}>
          <span style={{ color:'rgba(255,255,255,.5)' }}>{n}</span>
          <span style={{ color:'rgba(255,255,255,.7)' }}>{p}</span>
        </div>
      ))}
      <div style={{ display:'flex', justifyContent:'space-between', marginTop:6, fontSize:11, fontWeight:700 }}>
        <span style={{ color:'rgba(255,255,255,.4)' }}>Total</span>
        <span style={{ color:'#00D4FF' }}>$36.000</span>
      </div>
    </div>
  )
}

function PreviewWebsite() {
  return (
    <div style={{ padding:'8px 0 4px' }}>
      <div style={{ background:'rgba(255,255,255,.04)', borderRadius:8, overflow:'hidden' }}>
        <div style={{ background:'rgba(255,255,255,.06)', padding:'5px 8px', display:'flex', alignItems:'center', gap:4 }}>
          <div style={{ width:5, height:5, borderRadius:'50%', background:'#ef4444' }}/>
          <div style={{ width:5, height:5, borderRadius:'50%', background:'#f59e0b' }}/>
          <div style={{ width:5, height:5, borderRadius:'50%', background:'#10b981' }}/>
          <div style={{ flex:1, background:'rgba(255,255,255,.08)', borderRadius:3, height:8, marginLeft:6 }}/>
        </div>
        <div style={{ padding:'10px 10px 8px' }}>
          <div style={{ height:8, background:'linear-gradient(90deg,#6C63FF,#00D4FF)', borderRadius:4, width:'60%', marginBottom:6 }}/>
          <div style={{ height:5, background:'rgba(255,255,255,.1)', borderRadius:3, width:'80%', marginBottom:4 }}/>
          <div style={{ height:5, background:'rgba(255,255,255,.07)', borderRadius:3, width:'55%', marginBottom:8 }}/>
          <div style={{ height:20, background:'rgba(108,99,255,.25)', borderRadius:5, width:60, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <div style={{ fontSize:7, color:'#6C63FF', fontWeight:700 }}>CTA →</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PreviewChatbot() {
  const msgs = [
    { from:'bot', text:'Hola! ¿En qué te ayudo?' },
    { from:'user', text:'Quiero reservar mesa' },
    { from:'bot', text:'✓ Reserva para las 8pm' },
  ]
  return (
    <div style={{ padding:'8px 0 4px', display:'flex', flexDirection:'column', gap:5 }}>
      {msgs.map((m,i) => (
        <div key={i} style={{
          alignSelf: m.from==='user' ? 'flex-end' : 'flex-start',
          background: m.from==='user' ? 'rgba(108,99,255,.25)' : 'rgba(255,255,255,.07)',
          borderRadius: m.from==='user' ? '8px 8px 2px 8px' : '8px 8px 8px 2px',
          padding:'5px 9px', fontSize:10, color:'rgba(255,255,255,.75)', maxWidth:'82%',
        }}>{m.text}</div>
      ))}
    </div>
  )
}

function PreviewWhatsApp() {
  return (
    <div style={{ padding:'8px 0 4px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, fontSize:9, color:'rgba(255,255,255,.3)', textTransform:'uppercase', letterSpacing:'.06em' }}>
        <span>Broadcast activo</span><span style={{ color:'#25D366' }}>● Live</span>
      </div>
      {[['Enviados','247','rgba(255,255,255,.5)'],['Abiertos','189','#00D4FF'],['Respuestas','43','#10b981']].map(([l,v,c]) => (
        <div key={l} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'3px 0', borderBottom:'1px solid rgba(255,255,255,.04)', fontSize:10 }}>
          <span style={{ color:'rgba(255,255,255,.4)' }}>{l}</span>
          <span style={{ color:c, fontWeight:700 }}>{v}</span>
        </div>
      ))}
    </div>
  )
}

function PreviewDashboard() {
  const bars = [40, 65, 45, 80, 55, 90, 70]
  return (
    <div style={{ padding:'10px 0 4px' }}>
      <div style={{ display:'flex', gap:4, marginBottom:8 }}>
        <div style={{ flex:1, background:'rgba(108,99,255,.1)', borderRadius:7, padding:'6px 8px' }}>
          <div style={{ fontSize:8, color:'rgba(255,255,255,.3)', marginBottom:2 }}>Ventas hoy</div>
          <div style={{ fontSize:14, fontWeight:700, color:'#6C63FF' }}>$148k</div>
        </div>
        <div style={{ flex:1, background:'rgba(0,212,255,.08)', borderRadius:7, padding:'6px 8px' }}>
          <div style={{ fontSize:8, color:'rgba(255,255,255,.3)', marginBottom:2 }}>Visitas</div>
          <div style={{ fontSize:14, fontWeight:700, color:'#00D4FF' }}>2.4k</div>
        </div>
      </div>
      <div style={{ display:'flex', alignItems:'flex-end', gap:3, height:28 }}>
        {bars.map((h,i) => (
          <div key={i} style={{ flex:1, height:`${h}%`, background:`linear-gradient(to top, #6C63FF, #00D4FF)`, borderRadius:'3px 3px 0 0', opacity:0.6+(i/bars.length)*0.4 }}/>
        ))}
      </div>
    </div>
  )
}

function PreviewMarketing() {
  const steps = ['Trigger','Email','SMS','Cerrar']
  return (
    <div style={{ padding:'10px 0 4px' }}>
      <div style={{ display:'flex', alignItems:'center', gap:0 }}>
        {steps.map((s,i) => (
          <React.Fragment key={s}>
            <div style={{ flex:1, background:'rgba(108,99,255,.12)', borderRadius:6, padding:'5px 3px', textAlign:'center' }}>
              <div style={{ fontSize:8, color:'rgba(255,255,255,.4)', textAlign:'center' }}>{s}</div>
            </div>
            {i < steps.length-1 && (
              <div style={{ width:10, textAlign:'center', fontSize:9, color:'rgba(108,99,255,.6)', flexShrink:0 }}>→</div>
            )}
          </React.Fragment>
        ))}
      </div>
      <div style={{ marginTop:8, display:'flex', flexDirection:'column', gap:3 }}>
        {[['Tasa apertura','68%','#00D4FF'],['Conversión','24%','#10b981']].map(([l,v,c]) => (
          <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:10 }}>
            <span style={{ color:'rgba(255,255,255,.4)' }}>{l}</span>
            <span style={{ color:c, fontWeight:700 }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function PreviewAnalytics() {
  const points = [20,35,28,50,42,65,58,80,72,88]
  const w = 120, h = 40
  const max = 100, min = 0
  const pts = points.map((v,i) => `${(i/(points.length-1))*w},${h - ((v-min)/(max-min))*h}`).join(' ')
  return (
    <div style={{ padding:'8px 0 4px' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:9 }}>
        <span style={{ color:'rgba(255,255,255,.35)', textTransform:'uppercase', letterSpacing:'.06em' }}>Crecimiento</span>
        <span style={{ color:'#10b981', fontWeight:700 }}>↑ +34%</span>
      </div>
      <svg viewBox={`0 0 ${w} ${h}`} style={{ width:'100%', height:36 }}>
        <defs>
          <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.3"/>
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polygon points={`0,${h} ${pts} ${w},${h}`} fill="url(#ag)"/>
        <polyline points={pts} fill="none" stroke="#00D4FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  )
}

// ─────────────────────────────────────────
// BENTO SERVICE CARD
// ─────────────────────────────────────────
type BentoService = {
  id: string
  name: string
  tagline: string
  Icon: React.ElementType
  iconColor: string
  preview: React.ReactNode
  gridStyle?: React.CSSProperties
}

function BentoCard({ svc, inView, delay }: { svc: BentoService; inView: boolean; delay: number }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        ...svc.gridStyle,
        position: 'relative',
        borderRadius: 16,
        padding: 1,
        background: hov
          ? `linear-gradient(135deg, ${svc.iconColor}55, rgba(0,212,255,.3))`
          : 'linear-gradient(135deg, rgba(255,255,255,.06), rgba(255,255,255,.02))',
        transition: 'all .3s ease',
        cursor: 'pointer',
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: `${delay}s`,
        boxShadow: hov ? `0 8px 40px ${svc.iconColor}22, 0 0 0 1px ${svc.iconColor}22` : 'none',
      }}
    >
      <div style={{
        background: hov ? C.elevated : C.surface,
        borderRadius: 15,
        padding: '20px 20px 16px',
        height: '100%',
        transition: 'background .3s ease',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:4 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 8, flexShrink: 0,
            background: `${svc.iconColor}18`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'all .3s ease',
            boxShadow: hov ? `0 0 12px ${svc.iconColor}44` : 'none',
          }}>
            <svc.Icon size={15} color={svc.iconColor}/>
          </div>
          <div>
            <div style={{ fontFamily:FB, fontWeight:600, fontSize:13, color:C.text, lineHeight:1.2 }}>{svc.name}</div>
            <div style={{ fontFamily:FB, fontSize:11, color:C.subtle }}>{svc.tagline}</div>
          </div>
        </div>
        <div style={{ flex:1, overflow:'hidden' }}>{svc.preview}</div>
        {hov && (
          <div style={{
            position:'absolute', inset:0, borderRadius:15, pointerEvents:'none',
            background:`radial-gradient(circle at 50% 0%, ${svc.iconColor}08, transparent 70%)`,
          }}/>
        )}
      </div>
    </div>
  )
}

function CenterBentoCard({ inView }: { inView: boolean }) {
  const features = ['Flujos automáticos sin código','IA que aprende de tus datos','Integración en 48 horas','Soporte continuo incluido']
  return (
    <div style={{
      gridColumn:'2 / 4', gridRow:'1 / 3',
      position:'relative', borderRadius:20, padding:1,
      background:'linear-gradient(135deg,rgba(108,99,255,.5),rgba(0,212,255,.3),rgba(108,99,255,.2))',
      opacity: inView ? 1 : 0,
      transform: inView ? 'translateY(0)' : 'translateY(20px)',
      transition:'all .7s cubic-bezier(.16,1,.3,1)',
      transitionDelay:'.1s',
      boxShadow:'0 0 60px rgba(108,99,255,.15), 0 0 120px rgba(0,212,255,.06)',
    }}>
      <div style={{
        background:'linear-gradient(145deg,#0d1520,#09111a)',
        borderRadius:19, height:'100%', padding:'36px 32px',
        display:'flex', flexDirection:'column', justifyContent:'space-between',
        overflow:'hidden', position:'relative',
      }}>
        {/* floating orbs */}
        <div style={{ position:'absolute', top:-40, right:-40, width:160, height:160, borderRadius:'50%', background:'radial-gradient(circle,rgba(108,99,255,.15),transparent 70%)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-30, left:-30, width:120, height:120, borderRadius:'50%', background:'radial-gradient(circle,rgba(0,212,255,.1),transparent 70%)', pointerEvents:'none' }}/>

        {/* badge */}
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:20 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6, background:'rgba(108,99,255,.15)', border:'1px solid rgba(108,99,255,.3)', borderRadius:20, padding:'5px 12px' }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'#6C63FF', boxShadow:'0 0 8px #6C63FF' }}/>
            <span style={{ fontFamily:FB, fontSize:11, fontWeight:600, color:'rgba(108,99,255,.9)', letterSpacing:'.06em', textTransform:'uppercase' }}>AI Powered</span>
          </div>
        </div>

        {/* headline */}
        <div style={{ flex:1, display:'flex', flexDirection:'column', justifyContent:'center' }}>
          <h3 style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(24px,2.5vw,36px)', color:'#fff', lineHeight:1.15, letterSpacing:'-.03em', marginBottom:12 }}>
            Automatización<br/>
            <span style={{ background:'linear-gradient(90deg,#6C63FF,#00D4FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              Inteligente
            </span>
          </h3>
          <p style={{ fontFamily:FB, fontSize:14, color:'rgba(255,255,255,.5)', lineHeight:1.65, maxWidth:280, marginBottom:24 }}>
            Un ecosistema conectado donde cada herramienta potencia las demás. Tu negocio funcionando solo.
          </p>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {features.map((f,i) => (
              <div key={i} style={{ display:'flex', alignItems:'center', gap:10 }}>
                <div style={{ width:18, height:18, borderRadius:5, background:'rgba(108,99,255,.15)', border:'1px solid rgba(108,99,255,.25)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Check size={10} color="#6C63FF"/>
                </div>
                <span style={{ fontFamily:FB, fontSize:13, color:'rgba(255,255,255,.65)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* mini ecosystem dots */}
        <div style={{ marginTop:24, display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          {['CRM','Web','POS','Chat','WA'].map((t,i) => (
            <div key={t} style={{ textAlign:'center' }}>
              <div style={{ width:28, height:28, borderRadius:8, background:`rgba(${[108,0,16,99,37][i]},${[99,212,185,255,211][i]},${[255,255,83,100,102][i]},.12)`, margin:'0 auto 4px', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <div style={{ width:6, height:6, borderRadius:'50%', background:`rgba(${[108,0,16,99,37][i]},${[99,212,185,255,211][i]},${[255,255,83,100,102][i]},.8)` }}/>
              </div>
              <div style={{ fontSize:8, color:'rgba(255,255,255,.3)', fontFamily:FB }}>{t}</div>
            </div>
          ))}
          <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(108,99,255,.3),rgba(0,212,255,.3))', margin:'0 8px', marginBottom:14 }}/>
          <div style={{ textAlign:'center' }}>
            <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,rgba(108,99,255,.3),rgba(0,212,255,.2))', border:'1px solid rgba(108,99,255,.4)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 4px', boxShadow:'0 0 16px rgba(108,99,255,.3)' }}>
              <Zap size={16} color="#6C63FF"/>
            </div>
            <div style={{ fontSize:8, color:'rgba(108,99,255,.8)', fontFamily:FB, fontWeight:600 }}>Core</div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// BUSINESS SELECTOR → BENTO SERVICES
// ─────────────────────────────────────────
function BusinessSelector() {
  const { ref, inView } = useInView()

  const services: BentoService[] = [
    { id:'crm',       name:'CRM',                tagline:'Pipeline de clientes',   Icon:Users,       iconColor:'#6C63FF', preview:<PreviewCRM/>,       gridStyle:{ gridColumn:'1', gridRow:'1' } },
    { id:'pos',       name:'POS Restaurant',     tagline:'Punto de venta digital', Icon:CreditCard,  iconColor:'#f59e0b', preview:<PreviewPOS/>,       gridStyle:{ gridColumn:'1', gridRow:'2' } },
    { id:'websites',  name:'Websites',           tagline:'Presencia profesional',  Icon:Globe,       iconColor:'#00D4FF', preview:<PreviewWebsite/>,   gridStyle:{ gridColumn:'4', gridRow:'1' } },
    { id:'chatbots',  name:'AI Chatbots',        tagline:'Atención autónoma 24/7', Icon:Bot,         iconColor:'#a78bfa', preview:<PreviewChatbot/>,   gridStyle:{ gridColumn:'4', gridRow:'2' } },
    { id:'whatsapp',  name:'WhatsApp Auto',      tagline:'Mensajería inteligente', Icon:MessageCircle,iconColor:'#25D366',preview:<PreviewWhatsApp/>,  gridStyle:{ gridColumn:'1', gridRow:'3' } },
    { id:'dash',      name:'Dashboards',         tagline:'Métricas en tiempo real',Icon:BarChart2,   iconColor:'#00D4FF', preview:<PreviewDashboard/>, gridStyle:{ gridColumn:'2', gridRow:'3' } },
    { id:'marketing', name:'Marketing Auto',     tagline:'Campañas automáticas',   Icon:Zap,         iconColor:'#f472b6', preview:<PreviewMarketing/>, gridStyle:{ gridColumn:'3', gridRow:'3' } },
    { id:'analytics', name:'Analytics',          tagline:'Inteligencia de datos',  Icon:TrendingUp,  iconColor:'#10b981', preview:<PreviewAnalytics/>, gridStyle:{ gridColumn:'4', gridRow:'3' } },
  ]

  const delays = [0, 0.15, 0.05, 0.2, 0.25, 0.3, 0.35, 0.4]

  return (
    <section id="soluciones" ref={ref} className="py-32 px-5 md:px-8" style={{ background:C.bg }}>
      <div style={{ maxWidth:1080, margin:'0 auto' }}>

        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${inView?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}>
          <div className="flex justify-center"><SectionLabel text="Ecosistema de Servicios"/></div>
          <h2 style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(32px,4vw,52px)', color:C.text, marginBottom:16, letterSpacing:'-.03em' }}>
            Todo lo que necesita<br/>
            <span style={{ background:'linear-gradient(90deg,#6C63FF,#00D4FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              tu negocio digital
            </span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:16, color:C.muted, maxWidth:460, margin:'0 auto', lineHeight:1.7 }}>
            Soluciones integradas que trabajan juntas. Un ecosistema completo para escalar.
          </p>
        </div>

        {/* Bento Grid — desktop */}
        <div className="hidden md:grid" style={{ gridTemplateColumns:'repeat(4,1fr)', gridTemplateRows:'repeat(3,auto)', gap:12 }}>
          {services.map((svc,i) => <BentoCard key={svc.id} svc={svc} inView={inView} delay={delays[i]}/>)}
          <CenterBentoCard inView={inView}/>
        </div>

        {/* Mobile grid — 2 cols, no bento */}
        <div className="grid md:hidden grid-cols-2 gap-3">
          {services.map((svc,i) => (
            <BentoCard key={svc.id} svc={{ ...svc, gridStyle:undefined }} inView={inView} delay={delays[i]}/>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button onClick={() => scrollTo('contacto')}
            className="mx-btn-primary px-10 py-4 cursor-pointer mb-4"
            style={{ fontFamily:FD, fontWeight:700, fontSize:15 }}>
            Solicitar diagnóstico gratuito
          </button>
          <p style={{ fontFamily:FB, fontSize:12, color:C.subtle, marginTop:10 }}>Sin costo · Sin compromiso · Respuesta hoy</p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// STATS
// ─────────────────────────────────────────
function StatCard({ prefix, target, suffix, label, inView, delay, last }:
  { prefix:string; target:number; suffix:string; label:string; inView:boolean; delay:number; last:boolean }) {
  const count = useCounter(target, inView)
  return (
    <div className="text-center transition-all duration-700 py-2 px-6"
      style={{
        opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(28px)', transitionDelay:`${delay}s`,
        borderRight:!last?'1px solid rgba(255,255,255,.06)':'none',
      }}>
      <div style={{
        fontFamily:FD, fontWeight:800, fontSize:'clamp(48px,6vw,80px)', lineHeight:1,
        background:'linear-gradient(135deg,#fff 30%,#6C63FF 100%)',
        WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
      }}>
        {prefix}{count}{suffix}
      </div>
      <div style={{ fontFamily:FB, fontSize:13, color:'rgba(255,255,255,.4)', marginTop:10, letterSpacing:'.05em', textTransform:'uppercase' }}>{label}</div>
    </div>
  )
}

function StatsSection() {
  const t = useT()
  const { ref, inView } = useInView()

  const stats = [
    { prefix:'+', target:85, suffix:'',  label:t.stats.l1 },
    { prefix:'',  target:14, suffix:'',  label:t.stats.l2 },
    { prefix:'',  target:3,  suffix:'×', label:t.stats.l3 },
    { prefix:'',  target:98, suffix:'%', label:t.stats.l4 },
  ]

  return (
    <section id="resultados" ref={ref} className="px-5 md:px-8"
      style={{ background:C.surface, paddingTop:80, paddingBottom:80 }}>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} inView={inView} delay={i*0.12} last={i===stats.length-1}/>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// CASE STUDIES — visual data components
// ─────────────────────────────────────────

function CaseChartBookings() {
  const before = [12,14,11,13,10,15,12]
  const after  = [14,22,31,42,38,52,61]
  const W=220, H=72, max=70
  const line = (pts: number[]) => pts.map((v,i)=>`${(i/(pts.length-1))*W},${H-((v/max)*H)}`).join(' ')
  return (
    <div style={{ position:'relative' }}>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6, fontSize:9, color:'rgba(255,255,255,.3)', textTransform:'uppercase', letterSpacing:'.08em' }}>
        <span>Reservas mensuales</span>
        <span style={{ color:'#10b981', fontWeight:700 }}>↑ +214%</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:'100%', height:60, overflow:'visible' }}>
        <defs>
          <linearGradient id="cg1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6C63FF" stopOpacity=".4"/>
            <stop offset="100%" stopColor="#6C63FF" stopOpacity="0"/>
          </linearGradient>
          <linearGradient id="cg2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#10b981" stopOpacity=".35"/>
            <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polygon points={`0,${H} ${line(before)} ${W},${H}`} fill="url(#cg1)"/>
        <polyline points={line(before)} fill="none" stroke="#6C63FF" strokeWidth="1.5" strokeDasharray="3 2" opacity=".6"/>
        <polygon points={`0,${H} ${line(after)} ${W},${H}`} fill="url(#cg2)"/>
        <polyline points={line(after)} fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx={W} cy={H-((after[after.length-1]/max)*H)} r="3.5" fill="#10b981" opacity=".9"/>
      </svg>
      <div style={{ display:'flex', gap:12, marginTop:4 }}>
        <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:9, color:'rgba(255,255,255,.4)' }}>
          <div style={{ width:12, height:1.5, background:'#6C63FF', opacity:.6, borderRadius:1 }}/>Antes
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:9, color:'rgba(255,255,255,.6)' }}>
          <div style={{ width:12, height:1.5, background:'#10b981', borderRadius:1 }}/>Con Mastexo
        </div>
      </div>
    </div>
  )
}

function CaseBookingFeed() {
  const entries = [
    { time:'09:14', name:'Diego M.',  service:'Corte + Barba', src:'Instagram' },
    { time:'11:02', name:'Carlos R.', service:'Fade clásico',  src:'WhatsApp'  },
    { time:'14:37', name:'Lucas P.',  service:'Corte completo',src:'Google'    },
    { time:'18:55', name:'Andrés V.', service:'Barba diseño',  src:'Instagram' },
  ]
  const srcColor: Record<string,string> = { Instagram:'#e879f9', WhatsApp:'#25D366', Google:'#4285F4' }
  return (
    <div>
      <div style={{ fontSize:9, color:'rgba(255,255,255,.3)', textTransform:'uppercase', letterSpacing:'.08em', marginBottom:8 }}>Reservas hoy</div>
      {entries.map((e,i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'5px 0', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
          <span style={{ fontSize:9, color:'rgba(255,255,255,.25)', width:28, flexShrink:0 }}>{e.time}</span>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, color:'rgba(255,255,255,.7)', fontWeight:500 }}>{e.name}</div>
            <div style={{ fontSize:9, color:'rgba(255,255,255,.3)' }}>{e.service}</div>
          </div>
          <span style={{ fontSize:8, padding:'2px 6px', borderRadius:4, background:`${srcColor[e.src]}18`, color:srcColor[e.src], fontWeight:600 }}>{e.src}</span>
        </div>
      ))}
    </div>
  )
}

function CaseReservationChart() {
  const days = ['L','M','X','J','V','S','D']
  const vals = [4,6,5,8,12,15,10]
  const max = 16
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, fontSize:9, color:'rgba(255,255,255,.3)', textTransform:'uppercase', letterSpacing:'.08em' }}>
        <span>Reservas por día</span>
        <span style={{ color:'#00D4FF', fontWeight:700 }}>3× promedio</span>
      </div>
      <div style={{ display:'flex', alignItems:'flex-end', gap:5, height:48 }}>
        {vals.map((v,i) => (
          <div key={i} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:3 }}>
            <div style={{ width:'100%', height:`${(v/max)*44}px`, background:`linear-gradient(to top,${i>=4?'#00D4FF':'rgba(0,212,255,.3)'},${i>=4?'rgba(0,212,255,.4)':'rgba(0,212,255,.1)'})`, borderRadius:'3px 3px 0 0', transition:'height .3s ease' }}/>
            <span style={{ fontSize:8, color:'rgba(255,255,255,.25)' }}>{days[i]}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop:8, display:'flex', gap:12 }}>
        {[['Cubiertos','48 semana','#00D4FF'],['Ocupación','87%','#10b981']].map(([l,v,c]) => (
          <div key={l} style={{ flex:1, background:'rgba(255,255,255,.03)', borderRadius:7, padding:'6px 8px' }}>
            <div style={{ fontSize:8, color:'rgba(255,255,255,.3)', marginBottom:2 }}>{l}</div>
            <div style={{ fontSize:13, fontWeight:700, color:c }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CaseOrderFlow() {
  const orders = [
    { time:'02:14', item:'2× Tacos + Agua',    total:'$4.800', status:'paid'    },
    { time:'08:33', item:'Combo completo x3',  total:'$14.400',status:'paid'    },
    { time:'13:01', item:'Tortas + bebidas',   total:'$8.200', status:'paid'    },
    { time:'21:48', item:'Menú especial x2',   total:'$11.000',status:'pending' },
  ]
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, fontSize:9, color:'rgba(255,255,255,.3)', textTransform:'uppercase', letterSpacing:'.08em' }}>
        <span>Pedidos automáticos</span>
        <span style={{ color:'#f59e0b', fontWeight:700 }}>24/7 activo</span>
      </div>
      {orders.map((o,i) => (
        <div key={i} style={{ display:'flex', alignItems:'center', gap:8, padding:'5px 0', borderBottom:'1px solid rgba(255,255,255,.04)' }}>
          <div style={{ width:7, height:7, borderRadius:'50%', background:i===0?'rgba(255,255,255,.15)':i===3?'#f59e0b':'#10b981', flexShrink:0 }}/>
          <span style={{ fontSize:9, color:'rgba(255,255,255,.25)', width:28, flexShrink:0 }}>{o.time}</span>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:10, color:'rgba(255,255,255,.65)' }}>{o.item}</div>
          </div>
          <span style={{ fontSize:10, color: o.status==='paid'?'#10b981':'#f59e0b', fontWeight:600 }}>{o.total}</span>
        </div>
      ))}
      <div style={{ marginTop:8, padding:'6px 10px', background:'rgba(245,158,11,.08)', borderRadius:8, border:'1px solid rgba(245,158,11,.2)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
        <span style={{ fontSize:10, color:'rgba(255,255,255,.5)' }}>Ingresos esta semana</span>
        <span style={{ fontSize:13, fontWeight:700, color:'#f59e0b' }}>$284.600</span>
      </div>
    </div>
  )
}

function CaseCafeMetrics() {
  const W=200, H=56
  const pts = [8,14,12,20,18,28,24,35,30,42].map((v,i)=>`${(i/9)*W},${H-((v/44)*H)}`).join(' ')
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, fontSize:9, color:'rgba(255,255,255,.3)', textTransform:'uppercase', letterSpacing:'.08em' }}>
        <span>Alcance de anuncios</span>
        <span style={{ color:'#a78bfa', fontWeight:700 }}>↑ 4.2×</span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width:'100%', height:50, overflow:'visible' }}>
        <defs>
          <linearGradient id="cg3" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity=".35"/>
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polygon points={`0,${H} ${pts} ${W},${H}`} fill="url(#cg3)"/>
        <polyline points={pts} fill="none" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <div style={{ display:'flex', gap:8, marginTop:4 }}>
        {[['Viernes lleno','semana 3','#a78bfa'],['ROAS','3.8×','#10b981'],['Costo/cliente','$480','#00D4FF']].map(([l,v,c]) => (
          <div key={l} style={{ flex:1, background:'rgba(255,255,255,.03)', borderRadius:6, padding:'5px 6px' }}>
            <div style={{ fontSize:8, color:'rgba(255,255,255,.3)', marginBottom:1 }}>{l}</div>
            <div style={{ fontSize:11, fontWeight:700, color:c }}>{v}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// CASE STUDY CARD
// ─────────────────────────────────────────
type CaseStudy = {
  biz: string
  city: string
  category: string
  quote: string
  stat: string
  statLabel: string
  accentColor: string
  tags: string[]
  visual: React.ReactNode
  extra: React.ReactNode
}

function CaseCard({ cs, inView, delay, featured=false }: { cs:CaseStudy; inView:boolean; delay:number; featured?:boolean }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        position:'relative', borderRadius:20, padding:1,
        background: hov
          ? `linear-gradient(135deg,${cs.accentColor}55,rgba(0,212,255,.2),rgba(255,255,255,.06))`
          : `linear-gradient(135deg,rgba(255,255,255,.06),rgba(255,255,255,.02))`,
        opacity: inView?1:0,
        transform: inView ? (hov?'translateY(-4px)':'translateY(0)') : 'translateY(24px)',
        transition:'all .5s cubic-bezier(.16,1,.3,1)',
        transitionDelay:`${delay}s`,
        boxShadow: hov ? `0 16px 48px ${cs.accentColor}18, 0 0 0 1px ${cs.accentColor}15` : 'none',
        cursor:'default',
      }}
    >
      <div style={{
        background: hov ? C.elevated : C.surface,
        borderRadius:19, overflow:'hidden', transition:'background .3s',
        display:'flex', flexDirection: featured ? 'row' : 'column',
      }}>
        {/* Left / top: info */}
        <div style={{ flex:1, padding: featured?'36px 32px':'28px 28px 24px', display:'flex', flexDirection:'column', justifyContent:'space-between' }}>
          <div>
            {/* header */}
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
              <div>
                <div style={{ fontFamily:FB, fontWeight:700, fontSize: featured?16:14, color:C.text, marginBottom:2 }}>{cs.biz}</div>
                <div style={{ fontFamily:FB, fontSize:11, color:C.subtle }}>{cs.city} · {cs.category}</div>
              </div>
              <div style={{ padding:'4px 10px', borderRadius:20, background:`${cs.accentColor}15`, border:`1px solid ${cs.accentColor}30` }}>
                <span style={{ fontFamily:FB, fontSize:10, fontWeight:600, color:cs.accentColor, letterSpacing:'.04em' }}>Case Study</span>
              </div>
            </div>

            {/* big stat */}
            <div style={{ marginBottom:16 }}>
              <div style={{ fontFamily:FD, fontWeight:800, fontSize: featured?'clamp(40px,5vw,64px)':'clamp(32px,4vw,48px)', lineHeight:1, letterSpacing:'-.04em',
                background:`linear-gradient(90deg,${cs.accentColor},#fff)`,
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
              }}>{cs.stat}</div>
              <div style={{ fontFamily:FB, fontSize:12, color:C.muted, marginTop:4 }}>{cs.statLabel}</div>
            </div>

            {/* quote */}
            <p style={{ fontFamily:FB, fontSize: featured?14:13, color:'rgba(241,245,249,.65)', lineHeight:1.7, marginBottom:20, fontStyle:'italic' }}>
              &ldquo;{cs.quote}&rdquo;
            </p>
          </div>

          {/* tags */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
            {cs.tags.map(tag => (
              <span key={tag} style={{ fontFamily:FB, fontSize:10, fontWeight:500, padding:'3px 8px', borderRadius:6,
                background:'rgba(255,255,255,.04)', color:'rgba(255,255,255,.45)', border:'1px solid rgba(255,255,255,.07)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right / bottom: visual */}
        <div style={{
          width: featured?'45%':undefined,
          flexShrink: featured?0:undefined,
          borderLeft: featured?'1px solid rgba(255,255,255,.05)':undefined,
          borderTop: !featured?'1px solid rgba(255,255,255,.05)':undefined,
          background: 'rgba(0,0,0,.25)',
          padding: featured?'32px 28px':'20px 24px',
          display:'flex', flexDirection:'column', gap:16,
          position:'relative', overflow:'hidden',
        }}>
          <div style={{ position:'absolute', top:-40, right:-40, width:140, height:140, borderRadius:'50%',
            background:`radial-gradient(circle,${cs.accentColor}10,transparent 70%)`, pointerEvents:'none' }}/>
          {cs.visual}
          {cs.extra}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// TESTIMONIALS → CASE STUDIES
// ─────────────────────────────────────────
function TestimonialsSection() {
  const { ref, inView } = useInView()

  const cases: CaseStudy[] = [
    {
      biz:'Barbería Ali',    city:'Santiago Centro', category:'Barbería',
      quote:'En dos semanas llegaban clientes nuevos por Instagram sin que yo tuviera que hacer nada. El sistema trabaja solo.',
      stat:'+214%',         statLabel:'aumento en reservas (60 días)',
      accentColor:'#6C63FF',
      tags:['CRM','Instagram Ads','Reservas Automáticas','WhatsApp'],
      visual:<CaseChartBookings/>,
      extra:<CaseBookingFeed/>,
    },
    {
      biz:'Casa de Campo',  city:'Mostazal', category:'Restaurante',
      quote:'Triplicamos las reservas el primer mes. El equipo manejó todo y nosotros solo cocinamos.',
      stat:'3×',            statLabel:'reservas en el primer mes',
      accentColor:'#00D4FF',
      tags:['Reservas','Web Premium','WhatsApp Bot','Google Maps'],
      visual:<CaseReservationChart/>,
      extra:null,
    },
    {
      biz:'Food Truck La Ruta', city:'Viña del Mar', category:'Food Truck',
      quote:'Ahora recibo pedidos a las 2am mientras duermo. Con Mastexo fue fácil y barato.',
      stat:'24/7',          statLabel:'pedidos automáticos sin intervención',
      accentColor:'#f59e0b',
      tags:['POS Digital','Chatbot IA','WhatsApp','Pedidos Auto'],
      visual:<CaseOrderFlow/>,
      extra:null,
    },
    {
      biz:'Café Central',   city:'Las Condes', category:'Cafetería',
      quote:'Los viernes el café está lleno gracias a los anuncios que ellos manejan. El ROI es increíble.',
      stat:'4.2×',          statLabel:'retorno sobre inversión en anuncios',
      accentColor:'#a78bfa',
      tags:['Meta Ads','Google Ads','Reportes IA','Segmentación'],
      visual:<CaseCafeMetrics/>,
      extra:null,
    },
  ]

  return (
    <section className="py-32 px-5 md:px-8 relative overflow-hidden" style={{ background:C.bg }} ref={ref}>
      <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse 70% 40% at 50% 60%,rgba(108,99,255,.03),transparent 70%)' }}/>

      <div style={{ maxWidth:1080, margin:'0 auto', position:'relative', zIndex:1 }}>

        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}>
          <div className="flex justify-center"><SectionLabel text="Resultados reales"/></div>
          <h2 style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(32px,4vw,52px)', color:C.text, marginBottom:16, letterSpacing:'-.03em' }}>
            Software real,{' '}
            <span style={{ background:'linear-gradient(90deg,#6C63FF,#00D4FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
              resultados reales
            </span>
          </h2>
          <p style={{ fontFamily:FB, fontSize:16, color:C.muted, maxWidth:420, margin:'0 auto', lineHeight:1.7 }}>
            Cada número es un negocio real que creció con Mastexo.
          </p>
        </div>

        {/* Featured card — full width */}
        <div className="mb-4">
          <CaseCard cs={cases[0]} inView={inView} delay={0} featured/>
        </div>

        {/* 3 cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.slice(1).map((cs,i) => (
            <CaseCard key={cs.biz} cs={cs} inView={inView} delay={0.1 + i*0.08}/>
          ))}
        </div>

        {/* Bottom proof bar */}
        <div className={`mt-14 flex flex-wrap justify-center gap-10 md:gap-16 transition-all duration-700 ${inView?'opacity-100':'opacity-0'}`}
          style={{ transitionDelay:'.45s' }}>
          {[['85+','Negocios activos'],['14 días','Primer cliente'],['98%','Satisfacción'],['3×','Promedio de crecimiento']].map(([n,l]) => (
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(26px,3vw,38px)', letterSpacing:'-.03em',
                background:'linear-gradient(135deg,#fff 30%,#6C63FF)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>{n}</div>
              <div style={{ fontFamily:FB, fontSize:11, color:C.subtle, marginTop:4, textTransform:'uppercase', letterSpacing:'.08em' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// PROCESS
// ─────────────────────────────────────────
function ProcessSection() {
  const t = useT()
  const { ref, inView } = useInView()

  const steps: { num:string; Icon: React.ElementType; title:string; desc:string; cta:string|null; ctaFn:(() => void)|null; chip:{text:string}|null; color:string }[] = [
    { num:'01', Icon:MessageSquare, title:t.proc.s1t, desc:t.proc.s1d, cta:t.proc.s1cta, ctaFn:() => scrollTo('contacto'), chip:null, color:'#6C63FF' },
    { num:'02', Icon:Zap,           title:t.proc.s2t, desc:t.proc.s2d, cta:null, ctaFn:null, chip:{ text:t.proc.s2chip }, color:'#a78bfa' },
    { num:'03', Icon:TrendingUp,    title:t.proc.s3t, desc:t.proc.s3d, cta:null, ctaFn:null, chip:{ text:t.proc.s3chip }, color:'#818cf8' },
  ]

  return (
    <section id="proceso" ref={ref} className="py-32 px-5 md:px-8" style={{ background:'#0a0b10' }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-center mb-16" style={{ fontFamily:FD, fontWeight:700, fontSize:'clamp(26px,5vw,44px)', color:C.text, letterSpacing:'-.03em' }}>
          {t.proc.title}
        </h2>

        <div className="flex flex-col gap-4 md:gap-0">
          {steps.map((s, i) => (
            <React.Fragment key={i}>
              {i > 0 && (
                <div className="hidden md:flex h-8 items-stretch" style={{ paddingLeft: 22 }}>
                  <div style={{ borderLeft:'2px dashed rgba(108,99,255,.2)', width:0, height:'100%' }}/>
                </div>
              )}
              <div className="rounded-2xl p-7 relative overflow-hidden mx-process-card"
                style={{
                  background:C.surface,
                  opacity:inView?1:0, transform:inView?'translateX(0)':'translateX(-40px)',
                  transition:`opacity .7s ${i*.15}s, transform .7s cubic-bezier(.16,1,.3,1) ${i*.15}s, border-color .3s 0s, box-shadow .3s 0s`,
                }}>
                <div className="absolute right-5 top-0 select-none pointer-events-none"
                  style={{ fontFamily:FD, fontWeight:800, fontSize:96, color:'rgba(108,99,255,.06)', lineHeight:1, letterSpacing:'-.04em' }}>{s.num}</div>
                <div className="flex items-start gap-4 relative z-10">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background:`${s.color}15`, border:`1px solid ${s.color}30` }}>
                    <s.Icon size={18} color={s.color}/>
                  </div>
                  <div className="flex-1">
                    <h3 style={{ fontFamily:FD, fontWeight:700, fontSize:19, color:C.text, marginBottom:8, letterSpacing:'-.02em' }}>{s.title}</h3>
                    <p style={{ fontFamily:FB, fontSize:14, color:C.muted, lineHeight:1.65 }}>{s.desc}</p>
                    {s.chip && (
                      <span className="inline-block mt-4 px-4 py-1.5 text-xs"
                        style={{ background:'rgba(108,99,255,.12)', color:'#9B93FF', fontFamily:FB, fontWeight:600, border:'1px solid rgba(108,99,255,.25)', letterSpacing:'.02em', borderRadius:50 }}>
                        {s.chip.text}
                      </span>
                    )}
                    {s.cta && s.ctaFn && (
                      <button onClick={s.ctaFn}
                        className="mt-4 mx-btn-primary px-5 py-2.5 text-sm cursor-pointer"
                        style={{ fontFamily:FD, fontWeight:700, fontSize:13 }}>
                        {s.cta}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>

        <div className="text-center mt-14">
          <a href={WA_DIAG} target="_blank" rel="noopener noreferrer"
            className="mx-btn-primary inline-block px-10 py-4 cursor-pointer mb-4"
            style={{ fontFamily:FD, fontWeight:700, fontSize:15 }}>
            {t.proc.cta}
          </a>
          <p style={{ fontFamily:FB, fontSize:12, color:C.subtle, marginTop:10 }}>{t.proc.ctaNote}</p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// WHY
// ─────────────────────────────────────────
function WhySection() {
  const t = useT()
  const { ref, inView } = useInView()

  const cards: { Icon: React.ElementType; title:string; desc:string; chip:string; color:string }[] = [
    { Icon:Users,  title:t.why.c1t, desc:t.why.c1d, chip:t.why.c1chip, color:'#6C63FF' },
    { Icon:Timer,  title:t.why.c2t, desc:t.why.c2d, chip:t.why.c2chip, color:'#a78bfa' },
    { Icon:Layers, title:t.why.c3t, desc:t.why.c3d, chip:t.why.c3chip, color:'#818cf8' },
  ]

  return (
    <section className="py-32 px-5 md:px-8" style={{ background:C.bg }}>
      <div className="max-w-5xl mx-auto" ref={ref}>
        <h2 className="text-center mb-16" style={{ fontFamily:FD, fontWeight:700, fontSize:'clamp(26px,5vw,48px)', color:C.text, letterSpacing:'-.03em' }}>
          {t.why.title}{' '}<span className="mx-gradient-text">{t.why.accent}</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {cards.map((c, i) => (
            <div key={i} className="rounded-2xl p-8 transition-all duration-700 cursor-default mx-card-hover"
              style={{
                background:C.surface, border:`1px solid ${C.border}`,
                opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(28px)', transitionDelay:`${i*.12}s`
              }}>
              <div className="flex items-center justify-center mb-6"
                style={{ width:56, height:56, borderRadius:16, background:'linear-gradient(135deg,rgba(108,99,255,.12),rgba(108,99,255,.05))', border:'1px solid rgba(108,99,255,.15)' }}>
                <c.Icon size={24} color={c.color}/>
              </div>
              <h3 style={{ fontFamily:FD, fontWeight:700, fontSize:20, color:C.text, marginBottom:10, letterSpacing:'-.02em' }}>{c.title}</h3>
              <p style={{ fontFamily:FB, fontSize:14, color:C.muted, lineHeight:1.68, marginBottom:16 }}>{c.desc}</p>
              <span className="inline-block px-4 py-1.5 text-xs"
                style={{ background:'rgba(108,99,255,.12)', color:'#9B93FF', fontFamily:FB, fontWeight:600, border:'1px solid rgba(108,99,255,.25)', letterSpacing:'.02em', borderRadius:50 }}>
                {c.chip}
              </span>
            </div>
          ))}
        </div>

        <div className="p-10 md:p-14 text-center relative overflow-hidden"
          style={{
            background:'linear-gradient(135deg,rgba(108,99,255,.15) 0%,rgba(0,212,255,.05) 100%)',
            border:'1px solid rgba(108,99,255,.2)',
            borderRadius:24,
            boxShadow:'0 0 80px rgba(108,99,255,.1)',
          }}>
          <h3 style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(24px,3vw,40px)', color:C.text, marginBottom:28, letterSpacing:'-.02em' }}>
            {t.why.megaTitle}
          </h3>
          <button onClick={() => scrollTo('contacto')}
            className="mx-btn-primary px-12 py-4 cursor-pointer mb-5 relative z-10"
            style={{ fontFamily:FD, fontWeight:700, fontSize:15 }}>
            {t.why.megaCta}
          </button>
          <p className="relative z-10" style={{ fontFamily:FB, fontSize:12, color:C.subtle }}>{t.why.megaChip}</p>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// FINAL CTA — cinematic SaaS enterprise
// ─────────────────────────────────────────
function FinalCTASection() {
  const { ref, inView } = useInView()
  const [btnHov, setBtnHov] = useState(false)

  const particles = Array.from({ length: 28 }, (_, i) => ({
    x: `${(i * 37 + 11) % 97}%`,
    y: `${(i * 53 + 7) % 91}%`,
    size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
    delay: `${(i * 0.37) % 4}s`,
    dur: `${3 + (i % 4)}s`,
  }))

  const floats = [
    { label:'Reservas hoy',     val:'+18',   sub:'↑ 214% vs. antes',         color:'#6C63FF', x:'left-[2%]',  y:'top-[22%]',  delay:'0s',   dur:'5s'  },
    { label:'Clientes activos', val:'142',   sub:'atendidos por IA',          color:'#10b981', x:'right-[3%]', y:'top-[18%]',  delay:'1.5s', dur:'6s'  },
    { label:'WhatsApp Auto',    val:'247',   sub:'mensajes enviados hoy',     color:'#25D366', x:'left-[1%]',  y:'bottom-[22%]',delay:'2.4s',dur:'4.5s'},
    { label:'Ingresos semana',  val:'$284k', sub:'en plataforma Mastexo',     color:'#f59e0b', x:'right-[2%]', y:'bottom-[20%]',delay:'0.9s',dur:'5.5s'},
  ]

  return (
    <section ref={ref} style={{ background:'#04060C', position:'relative', overflow:'hidden', padding:'140px 20px 160px' }}>
      <style>{`
        @keyframes mx-float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
        @keyframes mx-orb{0%,100%{transform:scale(1) translate(0,0);opacity:.35}50%{transform:scale(1.12) translate(8px,-8px);opacity:.55}}
        @keyframes mx-particle{0%,100%{transform:translateY(0);opacity:.25}50%{transform:translateY(-8px);opacity:.6}}
        @keyframes mx-grad-shift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
        @keyframes mx-border-spin{from{--angle:0deg}to{--angle:360deg}}
        @keyframes mx-ping-dot{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.6);opacity:0}}
      `}</style>

      {/* subtle dot grid */}
      <div style={{ position:'absolute', inset:0, pointerEvents:'none', zIndex:0,
        backgroundImage:'radial-gradient(rgba(108,99,255,.12) 1px, transparent 1px)',
        backgroundSize:'36px 36px', opacity:.6,
      }}/>

      {/* glow orbs */}
      <div style={{ position:'absolute', top:'10%', left:'20%', width:480, height:480, borderRadius:'50%', filter:'blur(100px)',
        background:'radial-gradient(circle,rgba(108,99,255,.22),transparent 70%)',
        animation:'mx-orb 9s ease-in-out infinite', pointerEvents:'none', zIndex:0 }}/>
      <div style={{ position:'absolute', bottom:'5%', right:'18%', width:400, height:400, borderRadius:'50%', filter:'blur(90px)',
        background:'radial-gradient(circle,rgba(0,212,255,.15),transparent 70%)',
        animation:'mx-orb 11s ease-in-out infinite', animationDelay:'3s', pointerEvents:'none', zIndex:0 }}/>
      <div style={{ position:'absolute', top:'45%', left:'50%', transform:'translate(-50%,-50%)', width:600, height:300, borderRadius:'50%', filter:'blur(120px)',
        background:'radial-gradient(circle,rgba(167,139,250,.08),transparent 70%)',
        pointerEvents:'none', zIndex:0 }}/>

      {/* particles */}
      {particles.map((p,i) => (
        <div key={i} style={{ position:'absolute', left:p.x, top:p.y, width:p.size, height:p.size, borderRadius:'50%',
          background:`rgba(${i%3===0?'108,99,255':i%3===1?'0,212,255':'167,139,250'},.5)`,
          animation:`mx-particle ${p.dur} ease-in-out infinite`, animationDelay:p.delay,
          pointerEvents:'none', zIndex:1 }}/>
      ))}

      {/* floating cards */}
      {floats.map((f,i) => (
        <div key={i} className={`absolute hidden lg:block ${f.x} ${f.y}`}
          style={{ zIndex:2, animation:`mx-float ${f.dur} ease-in-out infinite`, animationDelay:f.delay,
            opacity: inView?1:0, transition:'opacity .8s ease', transitionDelay:`${0.2+i*0.15}s` }}>
          <div style={{ background:'rgba(13,17,28,.85)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
            border:`1px solid ${f.color}25`, borderRadius:14, padding:'12px 16px', minWidth:160,
            boxShadow:`0 8px 32px rgba(0,0,0,.4), 0 0 0 1px ${f.color}15, inset 0 1px 0 rgba(255,255,255,.05)` }}>
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6 }}>
              <div style={{ width:6, height:6, borderRadius:'50%', background:f.color, animation:'mx-ping-dot 2s ease-in-out infinite', animationDelay:f.delay }}/>
              <span style={{ fontFamily:FB, fontSize:10, color:'rgba(255,255,255,.4)', textTransform:'uppercase', letterSpacing:'.07em' }}>{f.label}</span>
            </div>
            <div style={{ fontFamily:FD, fontWeight:800, fontSize:22, color:'#fff', letterSpacing:'-.03em', lineHeight:1 }}>{f.val}</div>
            <div style={{ fontFamily:FB, fontSize:10, color:'rgba(255,255,255,.35)', marginTop:3 }}>{f.sub}</div>
          </div>
        </div>
      ))}

      {/* center content */}
      <div style={{ position:'relative', zIndex:10, maxWidth:680, margin:'0 auto', textAlign:'center' }}>

        {/* badge */}
        <div className={`flex justify-center mb-8 transition-all duration-700 ${inView?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`}>
          <div style={{ display:'inline-flex', alignItems:'center', gap:8,
            background:'rgba(108,99,255,.1)', border:'1px solid rgba(108,99,255,.25)',
            borderRadius:99, padding:'7px 16px' }}>
            <div style={{ width:6, height:6, borderRadius:'50%', background:'#6C63FF', boxShadow:'0 0 10px #6C63FF', animation:'mx-ping-dot 2s ease-in-out infinite' }}/>
            <span style={{ fontFamily:FB, fontSize:11, fontWeight:600, color:'rgba(108,99,255,.9)', letterSpacing:'.08em', textTransform:'uppercase' }}>
              Mastexo Platform · AI-Powered
            </span>
          </div>
        </div>

        {/* headline */}
        <h2 className={`transition-all duration-700 ${inView?'opacity-100 translate-y-0':'opacity-0 translate-y-8'}`}
          style={{ transitionDelay:'.1s', fontFamily:FD, fontWeight:800, fontSize:'clamp(32px,5vw,62px)', lineHeight:1.1, letterSpacing:'-.04em', color:'#fff', marginBottom:20 }}>
          Tu negocio merece operar<br/>
          <span style={{
            background:'linear-gradient(90deg,#6C63FF,#a78bfa,#00D4FF,#6C63FF)',
            backgroundSize:'300% 100%',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
            animation:'mx-grad-shift 5s ease infinite',
          }}>
            como una empresa moderna.
          </span>
        </h2>

        {/* subheadline */}
        <p className={`transition-all duration-700 ${inView?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`}
          style={{ transitionDelay:'.2s', fontFamily:FB, fontSize:'clamp(15px,2vw,18px)', color:'rgba(255,255,255,.5)', lineHeight:1.75, marginBottom:48, maxWidth:520, margin:'0 auto 48px' }}>
          Mastexo automatiza, organiza y optimiza tu negocio para conseguir más clientes con menos trabajo manual.
        </p>

        {/* CTA button */}
        <div className={`transition-all duration-700 ${inView?'opacity-100 translate-y-0':'opacity-0 translate-y-6'}`}
          style={{ transitionDelay:'.3s', display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>

          <button
            onClick={() => scrollTo('contacto')}
            onMouseEnter={() => setBtnHov(true)}
            onMouseLeave={() => setBtnHov(false)}
            style={{
              position:'relative', display:'inline-flex', alignItems:'center', gap:12,
              padding:'18px 40px', borderRadius:14, cursor:'pointer',
              background: btnHov
                ? 'linear-gradient(135deg,rgba(108,99,255,.25),rgba(0,212,255,.15))'
                : 'rgba(255,255,255,.06)',
              backdropFilter:'blur(24px)', WebkitBackdropFilter:'blur(24px)',
              border:`1px solid ${btnHov?'rgba(108,99,255,.6)':'rgba(255,255,255,.12)'}`,
              boxShadow: btnHov
                ? '0 0 40px rgba(108,99,255,.35), 0 0 80px rgba(108,99,255,.15), inset 0 1px 0 rgba(255,255,255,.1)'
                : 'inset 0 1px 0 rgba(255,255,255,.06)',
              transform: btnHov ? 'translateY(-3px) scale(1.02)' : 'translateY(0) scale(1)',
              transition:'all .3s cubic-bezier(.16,1,.3,1)',
              fontFamily:FD, fontWeight:700, fontSize:16, color:'#fff', letterSpacing:'-.01em',
            }}>
            {/* inner shimmer */}
            <span style={{ position:'absolute', inset:0, borderRadius:14, overflow:'hidden', pointerEvents:'none' }}>
              <span style={{
                position:'absolute', top:0, left: btnHov?'110%':'-60%', width:'50%', height:'100%',
                background:'linear-gradient(90deg,transparent,rgba(255,255,255,.08),transparent)',
                transform:'skewX(-20deg)', transition:'left .6s ease',
              }}/>
            </span>
            Solicitar diagnóstico gratuito
            <span style={{ opacity:.7, fontSize:18 }}>→</span>
          </button>

          <p style={{ fontFamily:FB, fontSize:12, color:'rgba(255,255,255,.25)', letterSpacing:'.04em' }}>
            Sin costo · Sin compromiso · Respuesta hoy
          </p>
        </div>

        {/* trust strip */}
        <div className={`flex flex-wrap items-center justify-center gap-6 mt-14 transition-all duration-700 ${inView?'opacity-100':'opacity-0'}`}
          style={{ transitionDelay:'.45s' }}>
          {[
            ['85+','negocios activos'],
            ['14 días','primer cliente'],
            ['LATAM','Chile · México · Arg.'],
          ].map(([n,l]) => (
            <div key={l} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:2 }}>
              <span style={{ fontFamily:FD, fontWeight:800, fontSize:20, color:'rgba(255,255,255,.8)', letterSpacing:'-.02em' }}>{n}</span>
              <span style={{ fontFamily:FB, fontSize:10, color:'rgba(255,255,255,.3)', textTransform:'uppercase', letterSpacing:'.08em' }}>{l}</span>
            </div>
          ))}
          <div style={{ width:1, height:28, background:'rgba(255,255,255,.08)' }} className="hidden sm:block"/>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <div style={{ width:8, height:8, borderRadius:'50%', background:'#10b981', boxShadow:'0 0 8px #10b981' }}/>
            <span style={{ fontFamily:FB, fontSize:11, color:'rgba(255,255,255,.4)' }}>Plataforma operando · 24/7</span>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// CONTACT
// ─────────────────────────────────────────
function CTASection() {
  const t = useT()
  const [form, setForm] = useState({ name:'', business:'', type:'', contact:'', message:'' })
  const [status, setStatus] = useState<'idle'|'loading'|'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = `Hola Mastexo, me llamo ${form.name}, tengo ${form.business} de tipo ${form.type} y quiero mejorar: ${form.message||'sin mensaje adicional'}. Mi contacto: ${form.contact}`
    window.open(`${WA_BASE}?text=${encodeURIComponent(msg)}`, '_blank')
    setStatus('loading')
    setTimeout(() => {
      setStatus('success')
      setTimeout(() => setStatus('idle'), 5000)
    }, 400)
  }

  const iBase: React.CSSProperties = {
    width:'100%', borderRadius:12, padding:'13px 16px',
    fontFamily:FB, fontSize:14, color:C.text,
    background:'rgba(255,255,255,.04)',
    border:'1px solid rgba(255,255,255,.09)',
    outline:'none', transition:'border-color .2s, background .2s',
  }
  const onF = (e: React.FocusEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    e.target.style.borderColor='rgba(108,99,255,.4)'; e.target.style.background='rgba(108,99,255,.04)'
  }
  const onB = (e: React.FocusEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => {
    e.target.style.borderColor='rgba(255,255,255,.09)'; e.target.style.background='rgba(255,255,255,.04)'
  }

  return (
    <section id="contacto" className="py-32 px-5 md:px-8" style={{ background:'#0a0b10' }}>
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h2 style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(28px,6vw,52px)', color:C.text, marginBottom:14, letterSpacing:'-.04em' }}>{t.form.h2}</h2>
          <p style={{ fontFamily:FB, fontSize:16, color:C.muted, lineHeight:1.6 }}>{t.form.sub}</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl p-8 mx-gradient-border" style={{ background:'rgba(255,255,255,.02)' }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <div>
              <label htmlFor="mx-name" className="sr-only">{t.form.ph_name}</label>
              <input id="mx-name" required autoComplete="name" style={iBase}
                placeholder={t.form.ph_name} value={form.name}
                onChange={e => setForm(f => ({...f, name:e.target.value}))} onFocus={onF} onBlur={onB}/>
            </div>
            <div>
              <label htmlFor="mx-biz" className="sr-only">{t.form.ph_biz}</label>
              <input id="mx-biz" required style={iBase}
                placeholder={t.form.ph_biz} value={form.business}
                onChange={e => setForm(f => ({...f, business:e.target.value}))} onFocus={onF} onBlur={onB}/>
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="mx-type" className="sr-only">{t.form.ph_type}</label>
            <select id="mx-type" required style={{ ...iBase, color:form.type?C.text:'rgba(241,245,249,.3)' }} value={form.type}
              onChange={e => setForm(f => ({...f, type:e.target.value}))} onFocus={onF} onBlur={onB}>
              <option value="" style={{ background:'#0a0b10' }}>{t.form.ph_type}</option>
              {t.cats.map(c => <option key={c.name} value={c.name} style={{ background:'#0a0b10' }}>{c.name}</option>)}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="mx-contact" className="sr-only">{t.form.ph_contact}</label>
            <input id="mx-contact" required inputMode="tel" autoComplete="tel" style={iBase}
              placeholder={t.form.ph_contact} value={form.contact}
              onChange={e => setForm(f => ({...f, contact:e.target.value}))} onFocus={onF} onBlur={onB}/>
          </div>
          <div className="mb-6">
            <label htmlFor="mx-msg" className="sr-only">{t.form.ph_msg}</label>
            <textarea id="mx-msg" style={{ ...iBase, resize:'vertical', minHeight:96 } as React.CSSProperties}
              placeholder={t.form.ph_msg} value={form.message}
              onChange={e => setForm(f => ({...f, message:e.target.value}))} onFocus={onF} onBlur={onB}/>
          </div>
          <button type="submit" disabled={status!=='idle'}
            className="w-full py-4 cursor-pointer transition-all duration-200 rounded-xl"
            style={{
              background: status==='success' ? 'rgba(34,197,94,.15)' : 'linear-gradient(135deg,#6C63FF,#a78bfa)',
              color: status==='success' ? '#86efac' : '#fff',
              fontFamily:FD, fontWeight:700, fontSize:15,
              border: status==='success' ? '1px solid rgba(34,197,94,.3)' : 'none',
              opacity: status==='loading' ? .7 : 1,
              boxShadow: status==='success' ? 'none' : '0 0 40px rgba(108,99,255,.2)',
            }}>
            {status==='loading' ? t.form.sending : status==='success' ? t.form.success : t.form.submit}
          </button>
          <p className="text-center mt-5" style={{ fontFamily:FB, fontSize:12, color:C.subtle }}>{t.form.note}</p>
        </form>

        <div className="text-center mt-12">
          <p style={{ fontFamily:FB, fontSize:14, color:C.muted, marginBottom:16 }}>{t.form.altTitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a href={WA_GENERIC} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-full px-6 py-3 cursor-pointer transition-all duration-200"
              style={{ background:'rgba(37,211,102,.12)', color:'#4ade80', fontFamily:FD, fontWeight:700, fontSize:14, border:'1px solid rgba(37,211,102,.2)' }}
              onMouseEnter={e => { e.currentTarget.style.background='rgba(37,211,102,.18)'; e.currentTarget.style.transform='scale(1.02)' }}
              onMouseLeave={e => { e.currentTarget.style.background='rgba(37,211,102,.12)'; e.currentTarget.style.transform='' }}>
              <MessageCircle size={16} fill="currentColor"/>
              {t.form.waCta}
            </a>
            <a href={`mailto:${EMAIL}`}
              style={{ fontFamily:FB, fontSize:14, color:C.subtle, textDecoration:'none', transition:'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color=C.text)}
              onMouseLeave={e => (e.currentTarget.style.color=C.subtle)}>
              {EMAIL}
            </a>
            <a href="mailto:farahfo4715@gmail.com"
              style={{ fontFamily:FB, fontSize:14, color:C.subtle, textDecoration:'none', transition:'color .2s' }}
              onMouseEnter={e => (e.currentTarget.style.color=C.text)}
              onMouseLeave={e => (e.currentTarget.style.color=C.subtle)}>
              farahfo4715@gmail.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────
function Footer() {
  const t = useT()
  const lh = (e: React.MouseEvent<HTMLElement>, out = false) => {
    (e.currentTarget as HTMLElement).style.color = out ? 'rgba(241,245,249,.35)' : '#6C63FF'
  }

  return (
    <footer style={{ background:C.bg, borderTop:'1px solid rgba(255,255,255,.06)', paddingTop:72, paddingBottom:36 }}>
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-14">
          <div>
            <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} className="flex items-center gap-2.5 mb-5 cursor-pointer bg-transparent border-none">
              <Image src="/logo1.jpg" alt="Mastexo" width={36} height={36} className="rounded-full object-cover opacity-90"/>
              <span style={{ fontFamily:FD, fontWeight:700, fontSize:18, color:C.text }}>Mastexo</span>
            </button>
            <p style={{ fontFamily:FB, fontSize:13, color:'rgba(241,245,249,.35)', lineHeight:1.7, marginBottom:20 }}>{t.footer.tagline}</p>
            <div className="flex gap-2.5">
              <a href={IG} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                className="w-9 h-9 mx-glass rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
                style={{ color:'rgba(241,245,249,.5)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(108,99,255,.4)'; e.currentTarget.style.color='#a78bfa' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=''; e.currentTarget.style.color='rgba(241,245,249,.5)' }}>
                <IgIcon size={16} color="currentColor"/>
              </a>
              <a href={WA_GENERIC} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                className="w-9 h-9 mx-glass rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
                style={{ color:'rgba(241,245,249,.5)' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(108,99,255,.4)'; e.currentTarget.style.color='#a78bfa' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor=''; e.currentTarget.style.color='rgba(241,245,249,.5)' }}>
                <MessageCircle size={16}/>
              </a>
            </div>
          </div>

          <div>
            <h4 style={{ fontFamily:FB, fontWeight:600, fontSize:11, color:'rgba(241,245,249,.4)', marginBottom:16, letterSpacing:'.12em', textTransform:'uppercase' }}>{t.footer.navTitle}</h4>
            <ul className="space-y-3">
              {[
                { label:t.footer.home,      action:() => window.scrollTo({ top:0, behavior:'smooth' }) },
                { label:t.footer.solutions, action:() => scrollTo('soluciones') },
                { label:t.footer.process,   action:() => scrollTo('proceso') },
              ].map((item, i) => (
                <li key={i}>
                  <button onClick={item.action} className="cursor-pointer bg-transparent border-none p-0 transition-colors duration-200"
                    style={{ fontFamily:FB, fontSize:13, color:'rgba(241,245,249,.35)' }}
                    onMouseEnter={lh} onMouseLeave={e => lh(e, true)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily:FB, fontWeight:600, fontSize:11, color:'rgba(241,245,249,.4)', marginBottom:16, letterSpacing:'.12em', textTransform:'uppercase' }}>{t.footer.contactTitle}</h4>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${EMAIL}`} style={{ fontFamily:FB, fontSize:13, color:'rgba(241,245,249,.35)', textDecoration:'none', display:'block', transition:'color .2s' }}
                  onMouseEnter={lh} onMouseLeave={e => lh(e, true)}>{EMAIL}</a>
                <a href="mailto:farahfo4715@gmail.com" style={{ fontFamily:FB, fontSize:13, color:'rgba(241,245,249,.35)', textDecoration:'none', display:'block', transition:'color .2s', marginTop:4 }}
                  onMouseEnter={lh} onMouseLeave={e => lh(e, true)}>farahfo4715@gmail.com</a>
              </li>
              <li>
                <a href={WA_GENERIC} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily:FB, fontSize:13, color:'rgba(241,245,249,.35)', textDecoration:'none', display:'block', transition:'color .2s' }}
                  onMouseEnter={lh} onMouseLeave={e => lh(e, true)}>+56 9 2970 9420</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontFamily:FB, fontWeight:600, fontSize:11, color:'rgba(241,245,249,.4)', marginBottom:16, letterSpacing:'.12em', textTransform:'uppercase' }}>{t.footer.legalTitle}</h4>
            <ul className="space-y-3">
              {[
                { label:t.footer.privacy, href:'/privacidad' },
                { label:t.footer.terms,   href:'/terminos' },
              ].map((item, i) => (
                <li key={i}>
                  <a href={item.href} style={{ fontFamily:FB, fontSize:13, color:'rgba(241,245,249,.35)', textDecoration:'none', display:'block', transition:'color .2s' }}
                    onMouseEnter={lh} onMouseLeave={e => lh(e, true)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div style={{ borderTop:`1px solid ${C.border}`, paddingTop:24 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p style={{ fontFamily:FB, fontSize:12, color:'rgba(241,245,249,.25)' }}>{t.footer.copy}</p>
          <p style={{ fontFamily:FB, fontSize:12, color:'rgba(241,245,249,.25)' }}>{t.footer.region}</p>
        </div>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────
// BOTTOM NAV
// ─────────────────────────────────────────
function BottomNav() {
  const t = useT()
  const scrollY = useScrollY()
  const visible = scrollY > 240

  return (
    <div className="fixed bottom-6 left-1/2 z-50 transition-all duration-400"
      style={{ transform:'translateX(-50%)', opacity:visible?1:0, pointerEvents:visible?'auto':'none', transitionTimingFunction:'cubic-bezier(.16,1,.3,1)' }}>
      <div className="flex items-center gap-4"
        style={{ background:'rgba(6,8,15,.95)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,.08)', borderRadius:50, boxShadow:'0 8px 40px rgba(0,0,0,.5)', padding:'8px 8px 8px 20px' }}>
        <span className="mx-gradient-text" style={{ fontFamily:FD, fontWeight:800, fontSize:18 }}>M</span>
        <div style={{ width:1, height:16, background:'rgba(255,255,255,.1)' }}/>
        <div className="hidden sm:flex items-center gap-5">
          {[
            { l:t.bnav.solutions, id:'soluciones' },
            { l:t.bnav.process,   id:'proceso' },
            { l:t.bnav.results,   id:'resultados' },
          ].map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)}
              className="cursor-pointer bg-transparent border-none transition-colors duration-200"
              style={{ fontFamily:FB, fontSize:13, color:'rgba(255,255,255,.5)', letterSpacing:'.02em' }}
              onMouseEnter={e => (e.currentTarget.style.color='#fff')}
              onMouseLeave={e => (e.currentTarget.style.color='rgba(255,255,255,.5)')}>
              {link.l}
            </button>
          ))}
        </div>
        <a href={WA_GENERIC} target="_blank" rel="noopener noreferrer"
          className="btn-whatsapp cursor-pointer"
          style={{ fontFamily:FD, fontWeight:700, fontSize:12, borderRadius:50, padding:'8px 16px' }}>
          {t.bnav.cta}
        </a>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// WHATSAPP FAB
// ─────────────────────────────────────────
function WhatsAppFAB() {
  const [showTip, setShowTip] = useState(false)
  return (
    <div className="fixed z-40 flex items-center gap-3" style={{ bottom:96, right:24 }}>
      <div style={{
        opacity:showTip?1:0, transform:showTip?'translateX(0)':'translateX(8px)',
        transition:'opacity .2s ease, transform .2s ease', pointerEvents:'none',
        background:'rgba(13,17,23,.95)', border:'1px solid rgba(255,255,255,.1)',
        borderRadius:8, padding:'6px 12px', whiteSpace:'nowrap',
      }}>
        <span style={{ fontFamily:FB, fontSize:12, color:'rgba(241,245,249,.85)' }}>Chatea con nosotros</span>
      </div>
      <a href={WA_GENERIC} target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp"
        onMouseEnter={() => setShowTip(true)} onMouseLeave={() => setShowTip(false)}>
        <div className="relative" style={{ width:52, height:52 }}>
          <div className="absolute inset-0 rounded-full mx-pulse" style={{ background:'#25D366', opacity:.25 }}/>
          <div className="absolute inset-0 rounded-full mx-pulse" style={{ background:'#25D366', opacity:.15, animationDelay:'.7s' }}/>
          <div className="absolute inset-0 rounded-full flex items-center justify-center"
            style={{ background:'#25D366', boxShadow:'0 4px 20px rgba(37,211,102,.4)', zIndex:1, transition:'transform .2s ease, box-shadow .2s ease' }}
            onMouseEnter={e => { e.currentTarget.style.transform='scale(1.08)'; e.currentTarget.style.boxShadow='0 6px 28px rgba(37,211,102,.6)' }}
            onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 4px 20px rgba(37,211,102,.4)' }}>
            <MessageCircle size={24} color="#fff" fill="#fff"/>
          </div>
        </div>
      </a>
    </div>
  )
}

// ─────────────────────────────────────────
// SOCIAL PROOF TOAST
// ─────────────────────────────────────────
function SocialProofToast() {
  const t = useT()
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const [idx, setIdx] = useState(t.toasts.length - 1)

  useEffect(() => {
    const show = () => {
      setIdx(i => (i + 1) % t.toasts.length)
      setLeaving(false)
      setVisible(true)
      setTimeout(() => {
        setLeaving(true)
        setTimeout(() => { setVisible(false); setLeaving(false) }, 350)
      }, 4000)
    }
    const init = setTimeout(show, 6000)
    const interval = setInterval(show, 17000)
    return () => { clearTimeout(init); clearInterval(interval) }
  }, [t.toasts.length])

  if (!visible) return null

  const toast = t.toasts[idx]
  const sp = toast.indexOf(' ')
  const icon = sp > -1 ? toast.slice(0, sp) : '🔔'
  const text = sp > -1 ? toast.slice(sp + 1) : toast

  return (
    <div className="fixed z-40 pointer-events-none" style={{ bottom:108, left:16, maxWidth:300, animation: leaving ? 'slideOutLeft .35s ease forwards' : 'slideInLeft .4s ease forwards' }}>
      <div style={{
        background:'rgba(13,17,23,.95)',
        backdropFilter:'blur(20px)',
        WebkitBackdropFilter:'blur(20px)',
        border:'1px solid rgba(108,99,255,.25)',
        borderRadius:14,
        boxShadow:'0 8px 32px rgba(0,0,0,.5)',
        padding:'12px 14px',
        display:'flex', alignItems:'center', gap:12,
      }}>
        <div style={{
          width:36, height:36, borderRadius:'50%',
          background:'rgba(108,99,255,.15)',
          border:'1px solid rgba(108,99,255,.2)',
          display:'flex', alignItems:'center', justifyContent:'center',
          fontSize:16, flexShrink:0,
        }}>{icon}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <p style={{ fontFamily:FB, fontSize:12, color:'rgba(241,245,249,.8)', lineHeight:1.4, margin:0 }}>{text}</p>
          <div style={{ display:'flex', alignItems:'center', gap:5, marginTop:5 }}>
            <span style={{ width:6, height:6, borderRadius:'50%', background:'#25D366', boxShadow:'0 0 8px #25D366', animation:'pulseDot 1.8s ease-in-out infinite', display:'inline-block', flexShrink:0 }}/>
            <span style={{ fontFamily:FB, fontSize:10, color:'rgba(241,245,249,.4)', letterSpacing:'.02em' }}>En vivo</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────
// SCROLL PROGRESS
// ─────────────────────────────────────────
function ScrollProgress() {
  const scrollY = useScrollY()
  const [total, setTotal] = useState(1)

  useEffect(() => {
    const update = () => setTotal(document.documentElement.scrollHeight - window.innerHeight)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const pct = total > 0 ? Math.min((scrollY / total) * 100, 100) : 0

  return (
    <div className="fixed top-0 left-0 right-0 z-[200] pointer-events-none" style={{ height:2 }}>
      <div style={{
        height:'100%', width:`${pct}%`,
        background:'linear-gradient(90deg,#6C63FF 0%,#00D4FF 50%,#6C63FF 100%)',
        backgroundSize:'200% 100%',
        animation:'shimmer 3s linear infinite',
        transition:'width .1s linear',
      }}/>
    </div>
  )
}

// ─────────────────────────────────────────
// ROOT
// ─────────────────────────────────────────
export default function HomeClient() {
  const [lang, setLang] = useState<Lang>('es')
  const scrollY = useScrollListener()

  useEffect(() => {
    try {
      const stored = localStorage.getItem('mx-lang') as Lang | null
      if (stored === 'en' || stored === 'es') { setLang(stored); return }
      if (navigator.language?.startsWith('en')) setLang('en')
    } catch {}
  }, [])

  const toggle = useCallback(() => {
    setLang(l => {
      const next: Lang = l === 'es' ? 'en' : 'es'
      try { localStorage.setItem('mx-lang', next) } catch {}
      return next
    })
  }, [])

  return (
    <AppCtx.Provider value={{ lang, toggle, scrollY }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }}/>
      {/* Skip to main content — keyboard accessibility */}
      <a href="#main-content" className="sr-only"
        onFocus={e => { const el = e.currentTarget as HTMLElement; el.style.position='fixed'; el.style.top='12px'; el.style.left='12px'; el.style.zIndex='999'; el.style.clip='auto'; el.style.width='auto'; el.style.height='auto'; el.style.overflow='visible'; el.style.whiteSpace='normal' }}
        onBlur={e => { const el = e.currentTarget as HTMLElement; el.style.position=''; el.style.top=''; el.style.left=''; el.style.zIndex=''; el.style.clip=''; el.style.width=''; el.style.height=''; el.style.overflow=''; el.style.whiteSpace='' }}
        style={{ padding:'8px 16px', background:'#6C63FF', color:'#fff', fontFamily:FB, fontWeight:700, fontSize:13, borderRadius:8, textDecoration:'none' }}>
        Saltar al contenido principal
      </a>
      <ScrollProgress/>
      <Navbar/>
      <main id="main-content">
        <HeroSection/>
        <SectionDivider/>
        <BusinessSelector/>
        <SectionDivider/>
        <StatsSection/>
        <SectionDivider/>
        <TestimonialsSection/>
        <SectionDivider/>
        <ProcessSection/>
        <SectionDivider/>
        <WhySection/>
        <FinalCTASection/>
        <CTASection/>
      </main>
      <Footer/>
      <BottomNav/>
      <WhatsAppFAB/>
      <SocialProofToast/>
    </AppCtx.Provider>
  )
}
