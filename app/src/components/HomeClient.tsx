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
import { Menu, X, ChevronLeft, ChevronRight, MessageCircle, Check, MessageSquare, Zap, TrendingUp, Users, Timer, Layers } from 'lucide-react'

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
      h1a: 'Resultados digitales,', h1b: 'no complicaciones.',
      sub: 'Diseñamos páginas web y soluciones digitales que convierten visitantes en clientes reales. Para restaurantes, barberías, salones y tiendas en LATAM.',
      cta1: 'Solicitar diagnóstico gratis', cta2: 'Ver cómo funciona',
      s1n: '+85', s1l: 'Negocios activos', s2n: '14', s2l: 'Días al primer cliente', s3n: '3×', s3l: 'Más reservas promedio',
      cardName: 'Barbería Ali - Santiago', cardQuote: 'En dos semanas llegaban clientes por Instagram',
    },
    sel: {
      label: 'SOLUCIONES', h2: '¿Cuál es tu tipo de negocio?',
      sub: 'Selecciona tu categoría y te mostramos exactamente cómo podemos ayudarte.',
      detailTitle: 'Así ayudamos a', detailCta: 'Solicitar diagnóstico gratis →',
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
      ph_name:'Tu nombre', ph_biz:'Tu negocio', ph_type:'Tipo de negocio', ph_contact:'WhatsApp o Email', ph_msg:'¿Qué quieres mejorar? (opcional)',
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
      { icon:'🍽️', name:'Restaurantes', desc:'Más reservas sin depender de apps', benefits:['Página con reservas online','Anuncios geolocalizados','Menú digital actualizable'] },
      { icon:'✂️', name:'Barberías', desc:'Citas incluso fuera del horario', benefits:['Agenda online 24/7','Recordatorios automáticos','Perfil en Google Maps'] },
      { icon:'💅', name:'Salones', desc:'Llena tu agenda automáticamente', benefits:['Booking integrado','Galería de trabajos','Captación en Instagram'] },
      { icon:'🛍️', name:'Tiendas', desc:'Vende más mientras duermes', benefits:['Tienda online','Catálogo digital','Anuncios en Meta'] },
      { icon:'☕', name:'Cafeterías', desc:'Pedidos anticipados sin esfuerzo', benefits:['Carta digital QR','Pre-pedidos WhatsApp','Fidelización de clientes'] },
      { icon:'🚐', name:'Food Trucks', desc:'Clientes que te encuentran siempre', benefits:['Ubicación en tiempo real','Anuncios locales','Redes sociales activas'] },
      { icon:'🛒', name:'Carritos', desc:'Presencia digital desde hoy', benefits:['Perfil profesional online','WhatsApp Business','Primeros clientes digitales'] },
      { icon:'🏢', name:'Otro', desc:'Solución personalizada para ti', benefits:['Diagnóstico personalizado','Estrategia a medida','Soporte dedicado'] },
    ],
    testiData: [
      { icon:'✂️', text:'En dos semanas ya tenía clientes nuevos llegando por Instagram. No tuve que hacer nada técnico.', biz:'Barbería Ali', city:'Santiago Centro' },
      { icon:'🍷', text:'Triplicamos las reservas en el primer mes. El equipo manejó todo.', biz:'Casona Monetta', city:'Mostazal' },
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
      label:'SOLUTIONS', h2:'What type of business are you?',
      sub:"Select your category and we'll show you exactly how we can help.",
      detailTitle:'How we help', detailCta:'Request free diagnosis →',
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
      ph_name:'Your name', ph_biz:'Your business', ph_type:'Business type', ph_contact:'WhatsApp or Email', ph_msg:'What do you want to improve? (optional)',
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
      { icon:'🍽️', name:'Restaurants', desc:'More bookings without app dependency', benefits:['Online reservation page','Geo-targeted ads','Updatable digital menu'] },
      { icon:'✂️', name:'Barbershops', desc:'Appointments even after hours', benefits:['24/7 online scheduling','Automatic reminders','Google Maps profile'] },
      { icon:'💅', name:'Salons', desc:'Fill your schedule automatically', benefits:['Integrated booking','Work gallery','Instagram lead capture'] },
      { icon:'🛍️', name:'Stores', desc:'Sell more while you sleep', benefits:['Online store','Digital catalog','Meta ads'] },
      { icon:'☕', name:'Cafés', desc:'Pre-orders without effort', benefits:['QR digital menu','WhatsApp pre-orders','Customer loyalty'] },
      { icon:'🚐', name:'Food Trucks', desc:'Clients always find you', benefits:['Real-time location','Local ads','Active social media'] },
      { icon:'🛒', name:'Carts', desc:'Digital presence from today', benefits:['Professional online profile','WhatsApp Business','First digital clients'] },
      { icon:'🏢', name:'Other', desc:'Personalized solution for you', benefits:['Personalized diagnosis','Custom strategy','Dedicated support'] },
    ],
    testiData: [
      { icon:'✂️', text:"In two weeks new clients were already coming through Instagram. I didn't have to do anything technical.", biz:'Ali Barbershop', city:'Santiago Centro' },
      { icon:'🍷', text:'We tripled bookings in the first month. The team handled everything.', biz:'Casona Monetta', city:'Mostazal' },
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
  @keyframes gridPulse { 0%,100%{opacity:.04} 50%{opacity:.07} }

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

  .mx-card-hover {
    transition: transform .3s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s;
  }
  .mx-card-hover:hover {
    transform: translateY(-6px);
    border-color: rgba(108,99,255,.3) !important;
    box-shadow: 0 24px 60px rgba(0,0,0,.5), 0 0 40px rgba(108,99,255,.08);
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

  /* Prevent iOS auto-zoom on input focus */
  @media(max-width:768px){
    input, select, textarea { font-size: 16px !important; }
  }

  @media(prefers-reduced-motion:reduce){
    .mx-fade-up,.mx-fade-in,.mx-float,.mx-pulse,.mx-slide-in{animation:none!important;opacity:1!important;transform:none!important}
  }
`

// ─────────────────────────────────────────
// NAVBAR
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
      {/* Floating pill navbar — premium SaaS style */}
      <div className="fixed top-4 left-0 right-0 z-[100] flex justify-center px-4 pointer-events-none">
        <nav
          className="pointer-events-auto w-full max-w-5xl transition-all duration-500"
          style={{
            height: 52,
            background: scrolled ? 'rgba(7,8,12,.88)' : 'rgba(7,8,12,.55)',
            backdropFilter: 'blur(24px) saturate(1.6)',
            WebkitBackdropFilter: 'blur(24px) saturate(1.6)',
            border: scrolled ? '1px solid rgba(255,255,255,.1)' : '1px solid rgba(255,255,255,.07)',
            borderRadius: 9999,
            boxShadow: scrolled ? '0 8px 40px rgba(0,0,0,.5)' : '0 4px 20px rgba(0,0,0,.3)',
          }}>
          <div className="h-full flex items-center px-4 gap-3">
            <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} className="flex items-center gap-2 cursor-pointer bg-transparent border-none min-w-0 flex-shrink-0">
              <Image src="/logo1.jpg" alt="Mastexo" width={26} height={26} className="rounded-full object-cover opacity-90"/>
              <span style={{ fontFamily:FD, fontWeight:700, fontSize:16, color:'#f1f5f9', letterSpacing:'-.01em', whiteSpace:'nowrap' }}>Mastexo</span>
            </button>

            <div className="flex-1"/>

            <div className="hidden md:flex items-center gap-5">
              {links.map(l => (
                <button key={l.id} onClick={() => scrollTo(l.id)}
                  className="cursor-pointer bg-transparent border-none transition-colors duration-200 whitespace-nowrap"
                  style={{ fontFamily:FB, fontSize:13, fontWeight:500, color:'rgba(241,245,249,.55)', letterSpacing:'.01em' }}
                  onMouseEnter={e => (e.currentTarget.style.color='rgba(241,245,249,.95)')}
                  onMouseLeave={e => (e.currentTarget.style.color='rgba(241,245,249,.55)')}>
                  {l.label}
                </button>
              ))}
            </div>

            <div style={{ width:1, height:16, background:'rgba(255,255,255,.1)', flexShrink:0 }} className="hidden md:block"/>

            <button onClick={toggle} aria-label={`Cambiar idioma a ${lang === 'es' ? 'inglés' : 'español'}`}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-full cursor-pointer transition-all duration-200 flex-shrink-0"
              style={{ fontFamily:FB, fontSize:11, fontWeight:600, letterSpacing:'.06em', border:'1px solid rgba(255,255,255,.1)', background:'transparent' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(108,99,255,.3)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(255,255,255,.1)' }}>
              {(['es','en'] as Lang[]).map((l,i) => (
                <React.Fragment key={l}>
                  {i > 0 && <span style={{ color:'rgba(255,255,255,.18)', margin:'0 1px' }}>|</span>}
                  <span style={{ color: lang===l ? '#6C63FF' : 'rgba(255,255,255,.35)', fontWeight: lang===l ? 700 : 400 }}>{l.toUpperCase()}</span>
                </React.Fragment>
              ))}
            </button>

            <button onClick={() => scrollTo('contacto')}
              className="hidden md:block mx-btn-primary px-4 py-2 cursor-pointer flex-shrink-0"
              style={{ fontFamily:FD, fontSize:12, fontWeight:700, letterSpacing:'.01em' }}>
              {t.nav.cta}
            </button>

            <button type="button" onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              className="md:hidden cursor-pointer bg-transparent border-none flex-shrink-0 min-w-[44px] min-h-[44px] flex items-center justify-center"
              style={{ color:'#f1f5f9' }}>
              {open ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <div className="fixed inset-0 z-[99] md:hidden flex flex-col items-center justify-center gap-10"
          style={{ background:'rgba(7,8,12,.97)', backdropFilter:'blur(32px)' }}>
          <button onClick={() => setOpen(false)} aria-label="Cerrar menú" className="absolute top-5 right-5 cursor-pointer bg-transparent border-none" style={{ color:'rgba(241,245,249,.7)' }}>
            <X size={26}/>
          </button>
          {links.map(l => (
            <button key={l.id} onClick={() => { scrollTo(l.id); setOpen(false) }}
              className="cursor-pointer bg-transparent border-none transition-colors duration-200"
              style={{ fontFamily:FD, fontWeight:700, fontSize:32, color:'rgba(241,245,249,.85)', letterSpacing:'-.02em' }}
              onMouseEnter={e => (e.currentTarget.style.color='#6C63FF')}
              onMouseLeave={e => (e.currentTarget.style.color='rgba(241,245,249,.85)')}>
              {l.label}
            </button>
          ))}
          <button onClick={() => { scrollTo('contacto'); setOpen(false) }}
            className="mx-btn-primary px-10 py-4 cursor-pointer mt-2"
            style={{ fontFamily:FD, fontWeight:700, fontSize:16 }}>
            {t.nav.cta}
          </button>
        </div>
      )}
    </>
  )
}

// ─────────────────────────────────────────
// HERO
// ─────────────────────────────────────────
function HeroSection() {
  const t = useT()

  const orbs = [
    { top:'-15%', left:'-10%', size:700, color:'radial-gradient(circle,rgba(108,99,255,.14) 0%,transparent 65%)' },
    { top:'30%',  left:'60%',  size:600, color:'radial-gradient(circle,rgba(108,99,255,.09) 0%,transparent 65%)' },
    { top:'70%',  left:'20%',  size:400, color:'radial-gradient(circle,rgba(0,212,255,.06) 0%,transparent 60%)' },
  ]

  const dots = Array.from({ length: 18 }, (_, i) => ({
    x: (i * 41 + 13) % 96, y: (i * 57 + 9) % 88,
    size: 1 + (i % 2) * 0.5,
    color: i%3===0 ? '#6C63FF' : i%3===1 ? '#a78bfa' : '#00D4FF',
    delay: i * 0.28,
    dur: 4 + (i % 4),
  }))

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background:'#06080F' }}>
      {/* Grid */}
      <div className="absolute inset-0 mx-grid-bg pointer-events-none"/>

      {/* Orbs */}
      {orbs.map((o, i) => (
        <div key={i} className="absolute pointer-events-none" style={{
          top:o.top, left:o.left, width:o.size, height:o.size,
          background:o.color, filter:'blur(80px)', transform:'translateZ(0)',
        }}/>
      ))}

      {/* Particles */}
      {dots.map((d, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none mx-float"
          style={{ left:`${d.x}%`, top:`${d.y}%`, width:d.size, height:d.size, background:d.color, opacity:.4,
            animationDelay:`${d.delay}s`, animationDuration:`${d.dur}s` }}/>
      ))}

      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-8 pt-28 pb-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mx-glass rounded-full px-4 py-2 mb-10 mx-fade-up"
          style={{ animationDelay:'.05s', opacity:0, borderColor:'rgba(108,99,255,.2)' }}>
          <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:'#6C63FF', boxShadow:'0 0 6px rgba(108,99,255,.7)' }}/>
          <span style={{ fontFamily:FB, fontSize:12, color:'rgba(241,245,249,.6)', letterSpacing:'.03em' }}>{t.hero.badge}</span>
        </div>

        {/* H1 */}
        <h1 className="mx-fade-up" style={{
          fontFamily:FD, fontWeight:800, lineHeight:1.04, letterSpacing:'-.04em',
          fontSize:'clamp(48px,9vw,96px)', color:C.text,
          marginBottom:28, animationDelay:'.15s', opacity:0,
        }}>
          {t.hero.h1a}<br/>
          <span className="mx-gradient-text">{t.hero.h1b}</span>
        </h1>

        {/* Sub */}
        <p className="mx-fade-up" style={{
          fontFamily:FB, fontSize:17, color:C.muted,
          maxWidth:520, margin:'0 auto 40px', lineHeight:1.75,
          animationDelay:'.25s', opacity:0,
        }}>
          {t.hero.sub}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mx-fade-up" style={{ animationDelay:'.35s', opacity:0 }}>
          <button onClick={() => scrollTo('contacto')}
            className="mx-btn-primary px-8 py-4 cursor-pointer w-full sm:w-auto"
            style={{ fontFamily:FD, fontWeight:700, fontSize:15, letterSpacing:'.01em' }}>
            {t.hero.cta1} →
          </button>
          <button onClick={() => scrollTo('proceso')}
            className="mx-btn-ghost px-8 py-4 cursor-pointer w-full sm:w-auto"
            style={{ fontFamily:FD, fontWeight:600, fontSize:15 }}>
            {t.hero.cta2}
          </button>
        </div>

        {/* Proof strip */}
        <div className="flex items-center justify-center gap-10 mt-16 mx-fade-up flex-wrap" style={{ animationDelay:'.45s', opacity:0 }}>
          {[{n:t.hero.s1n,l:t.hero.s1l},{n:t.hero.s2n,l:t.hero.s2l},{n:t.hero.s3n,l:t.hero.s3l}].map((s,i) => (
            <div key={i} className="flex items-center gap-10">
              {i > 0 && <div style={{ width:1, height:28, background:'rgba(255,255,255,.1)' }}/>}
              <div className="text-center">
                <div className="mx-gradient-text" style={{ fontFamily:FD, fontWeight:800, fontSize:26, lineHeight:1 }}>{s.n}</div>
                <div style={{ fontFamily:FB, fontSize:12, color:C.subtle, marginTop:4, letterSpacing:'.02em' }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating review card */}
      <div className="absolute hidden lg:block mx-float" style={{ right:40, top:'50%', transform:'translateY(-50%)', width:220, zIndex:20, animationDelay:'1.2s' }}>
        <div className="mx-glass-strong mx-gradient-border rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
              style={{ background:'rgba(108,99,255,.1)', border:'1px solid rgba(108,99,255,.15)' }}>✂️</div>
            <div>
              <div style={{ fontFamily:FB, fontWeight:600, fontSize:12, color:C.text }}>{t.hero.cardName}</div>
              <div style={{ fontSize:11, color:'#f59e0b', letterSpacing:'.05em' }}>★★★★★</div>
            </div>
          </div>
          <p style={{ fontFamily:FB, fontSize:12, color:C.muted, lineHeight:1.55 }}>&ldquo;{t.hero.cardQuote}&rdquo;</p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 mx-fade-in" style={{ animationDelay:'1.5s', opacity:0 }}>
        <div style={{ width:1, height:40, background:'linear-gradient(to bottom, rgba(108,99,255,.5), transparent)' }}/>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// BUSINESS SELECTOR
// ─────────────────────────────────────────
function BusinessSelector() {
  const t = useT()
  const { ref, inView } = useInView()
  const [active, setActive] = useState<number | null>(null)

  const waForCat = (name: string) =>
    `${WA_BASE}?text=Hola%20Mastexo%2C%20tengo%20un%20negocio%20de%20tipo%20${encodeURIComponent(name)}%20y%20quiero%20un%20diagn%C3%B3stico%20gratuito.`

  return (
    <section id="soluciones" ref={ref} className="py-32 px-5 md:px-8" style={{ background:C.bg, borderTop:`1px solid ${C.border}` }}>
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p style={{ fontFamily:FB, fontWeight:600, fontSize:11, letterSpacing:'.18em', color:'#6C63FF', textTransform:'uppercase', marginBottom:14 }}>{t.sel.label}</p>
          <h2 style={{ fontFamily:FD, fontWeight:700, fontSize:'clamp(28px,5vw,48px)', color:C.text, marginBottom:16, letterSpacing:'-.03em' }}>{t.sel.h2}</h2>
          <p style={{ fontFamily:FB, fontSize:16, color:C.muted, maxWidth:460, margin:'0 auto', lineHeight:1.7 }}>{t.sel.sub}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {t.cats.map((cat, i) => (
            <button key={i} onClick={() => setActive(active===i ? null : i)}
              className="rounded-2xl p-5 text-left cursor-pointer transition-all duration-250 mx-card-hover"
              style={{
                background: active===i ? 'rgba(108,99,255,.08)' : C.surface,
                border: active===i ? '1px solid rgba(108,99,255,.3)' : `1px solid ${C.border}`,
                boxShadow: active===i ? '0 0 0 4px rgba(108,99,255,.06)' : 'none',
              }}>
              <div style={{ fontSize:28, marginBottom:10 }}>{cat.icon}</div>
              <div style={{ fontFamily:FB, fontWeight:600, fontSize:14, color:C.text, marginBottom:4 }}>{cat.name}</div>
              <div style={{ fontFamily:FB, fontSize:12, color:C.subtle, lineHeight:1.5 }}>{cat.desc}</div>
            </button>
          ))}
        </div>

        {active !== null && (
          <div className="rounded-2xl p-8 mb-8 mx-slide-in mx-gradient-border" style={{ background:'rgba(255,255,255,.02)' }}>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="flex-1">
                <h3 style={{ fontFamily:FD, fontWeight:700, fontSize:20, color:C.text, marginBottom:16, letterSpacing:'-.02em' }}>
                  {t.sel.detailTitle} <span className="mx-gradient-text">{t.cats[active].name}</span>
                </h3>
                <ul className="space-y-3">
                  {t.cats[active].benefits.map((b,i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                        style={{ background:'rgba(108,99,255,.1)', border:'1px solid rgba(108,99,255,.2)' }}>
                        <Check size={11} color="#6C63FF"/>
                      </div>
                      <span style={{ fontFamily:FB, fontSize:14, color:'rgba(241,245,249,.8)' }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href={waForCat(t.cats[active].name)} target="_blank" rel="noopener noreferrer"
                className="mx-btn-primary inline-block px-6 py-3 cursor-pointer flex-shrink-0"
                style={{ fontFamily:FD, fontWeight:700, fontSize:14 }}>
                {t.sel.detailCta}
              </a>
            </div>
          </div>
        )}

        <div className="text-center">
          <button onClick={() => scrollTo('contacto')}
            className="mx-btn-primary px-10 py-4 cursor-pointer mb-4"
            style={{ fontFamily:FD, fontWeight:700, fontSize:15 }}>
            {t.sel.cta}
          </button>
          <p style={{ fontFamily:FB, fontSize:12, color:C.subtle, marginTop:10 }}>{t.sel.ctaNote}</p>
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
    <div className="text-center transition-all duration-700 px-4"
      style={{
        opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(28px)', transitionDelay:`${delay}s`,
        borderRight:!last?`1px solid ${C.border}`:'none'
      }}>
      <div className="mx-gradient-text" style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(40px,6vw,64px)', lineHeight:1 }}>
        {prefix}{count}{suffix}
      </div>
      <div style={{ fontFamily:FB, fontSize:13, color:C.subtle, marginTop:8, letterSpacing:'.02em' }}>{label}</div>
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
    <section id="resultados" ref={ref} className="py-24 px-5 md:px-8" style={{ background:'#0a0b10', borderTop:`1px solid ${C.border}` }}>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} inView={inView} delay={i*0.12} last={i===stats.length-1}/>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────
function TestimonialsSection() {
  const t = useT()
  const [cur, setCur] = useState(0)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const items = t.testiData

  const next = useCallback(() => setCur(c => (c+1) % items.length), [items.length])
  const prev = useCallback(() => setCur(c => (c-1+items.length) % items.length), [items.length])

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(next, 4000)
  }, [next])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  return (
    <section className="py-32 px-5 md:px-8" style={{ background:C.bg, borderTop:`1px solid ${C.border}` }}>
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16">
          <h2 style={{ fontFamily:FD, fontWeight:700, fontSize:'clamp(24px,4vw,40px)', color:C.text, letterSpacing:'-.03em' }}>{t.testi.title}</h2>
          <div className="flex items-center gap-2 flex-shrink-0 px-4 py-2 rounded-full" style={{ border:`1px solid ${C.border}` }}>
            <span style={{ color:'#f59e0b', fontSize:13 }}>★★★★★</span>
            <span style={{ fontFamily:FB, fontSize:12, color:C.subtle }}>{t.testi.rating}</span>
          </div>
        </div>

        <div className="relative overflow-hidden"
          onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current) }}
          onMouseLeave={startTimer}>
          <div className="flex transition-transform duration-600 ease-out" style={{ transform:`translateX(-${cur*100}%)`, transitionTimingFunction:'cubic-bezier(.16,1,.3,1)' }}>
            {items.map((item, i) => (
              <div key={i} className="w-full flex-shrink-0 px-1">
                <div className="mx-glass mx-gradient-border rounded-2xl p-8 md:p-10">
                  <div style={{ fontFamily:'Georgia,serif', fontSize:56, lineHeight:.75, marginBottom:20, background:'linear-gradient(135deg,#6C63FF,#a78bfa)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>&ldquo;</div>
                  <p style={{ fontFamily:FB, fontSize:17, color:'rgba(241,245,249,.85)', lineHeight:1.75, marginBottom:28 }}>{item.text}</p>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
                      style={{ background:'rgba(108,99,255,.07)', border:'1px solid rgba(108,99,255,.12)' }}>{item.icon}</div>
                    <div>
                      <div style={{ fontFamily:FB, fontWeight:600, fontSize:14, color:C.text }}>{item.biz}</div>
                      <div style={{ fontFamily:FB, fontSize:12, color:C.subtle }}>{item.city}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-5 mt-10">
          <button type="button" onClick={prev} aria-label="Anterior"
            className="w-11 h-11 mx-glass rounded-full flex items-center justify-center cursor-pointer mx-btn-ghost transition-all duration-200"
            style={{ color:C.muted }}>
            <ChevronLeft size={18}/>
          </button>
          <div className="flex gap-1 items-center" role="tablist" aria-label="Testimonios">
            {items.map((item, i) => (
              <button key={i} role="tab" aria-selected={cur===i} aria-label={`Ver testimonio de ${item.biz}`}
                onClick={() => setCur(i)}
                className="cursor-pointer flex items-center justify-center transition-all duration-300"
                style={{ minWidth:44, minHeight:44, background:'transparent', border:'none', padding:'0 4px' }}>
                <span className="rounded-full block transition-all duration-300"
                  style={{ width:cur===i?20:6, height:6, background:cur===i?'#6C63FF':'rgba(255,255,255,.2)' }}/>
              </button>
            ))}
          </div>
          <button type="button" onClick={next} aria-label="Siguiente"
            className="w-11 h-11 mx-glass rounded-full flex items-center justify-center cursor-pointer mx-btn-ghost transition-all duration-200"
            style={{ color:C.muted }}>
            <ChevronRight size={18}/>
          </button>
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
    <section id="proceso" ref={ref} className="py-32 px-5 md:px-8" style={{ background:'#0a0b10', borderTop:`1px solid ${C.border}` }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-center mb-16" style={{ fontFamily:FD, fontWeight:700, fontSize:'clamp(26px,5vw,44px)', color:C.text, letterSpacing:'-.03em' }}>
          {t.proc.title}
        </h2>

        <div className="flex flex-col gap-4">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl p-7 transition-all duration-700 relative overflow-hidden mx-card-hover"
              style={{
                background:C.surface, border:`1px solid ${C.border}`,
                opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(24px)', transitionDelay:`${i*.18}s`,
              }}>
              <div className="absolute right-5 top-0 select-none pointer-events-none"
                style={{ fontFamily:FD, fontWeight:800, fontSize:88, color:'rgba(255,255,255,.025)', lineHeight:1, letterSpacing:'-.04em' }}>{s.num}</div>
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background:`${s.color}12`, border:`1px solid ${s.color}25` }}>
                  <s.Icon size={18} color={s.color}/>
                </div>
                <div className="flex-1">
                  <h3 style={{ fontFamily:FD, fontWeight:700, fontSize:19, color:C.text, marginBottom:8, letterSpacing:'-.02em' }}>{s.title}</h3>
                  <p style={{ fontFamily:FB, fontSize:14, color:C.muted, lineHeight:1.65 }}>{s.desc}</p>
                  {s.chip && (
                    <span className="inline-block mt-4 px-3 py-1.5 rounded-full text-xs"
                      style={{ background:`${s.color}12`, color:s.color, fontFamily:FB, fontWeight:600, border:`1px solid ${s.color}25`, letterSpacing:'.02em' }}>
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
    <section className="py-32 px-5 md:px-8" style={{ background:C.bg, borderTop:`1px solid ${C.border}` }}>
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
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background:`${c.color}0F`, border:`1px solid ${c.color}20` }}>
                <c.Icon size={20} color={c.color}/>
              </div>
              <h3 style={{ fontFamily:FD, fontWeight:700, fontSize:19, color:C.text, marginBottom:10, letterSpacing:'-.02em' }}>{c.title}</h3>
              <p style={{ fontFamily:FB, fontSize:14, color:C.muted, lineHeight:1.68, marginBottom:16 }}>{c.desc}</p>
              <span className="inline-block px-3 py-1.5 rounded-full text-xs"
                style={{ background:`${c.color}10`, color:c.color, fontFamily:FB, fontWeight:600, border:`1px solid ${c.color}20`, letterSpacing:'.02em' }}>
                {c.chip}
              </span>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-10 md:p-14 text-center relative overflow-hidden"
          style={{ background:'rgba(255,255,255,.02)', border:`1px solid ${C.border}` }}>
          <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse 60% 80% at 50% 50%,rgba(139,92,246,.06) 0%,transparent 70%)' }}/>
          <h3 className="relative z-10" style={{ fontFamily:FD, fontWeight:700, fontSize:'clamp(18px,3vw,28px)', color:C.text, marginBottom:28, letterSpacing:'-.02em' }}>
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
    <section id="contacto" className="py-32 px-5 md:px-8" style={{ background:'#0a0b10', borderTop:`1px solid ${C.border}` }}>
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
    (e.currentTarget as HTMLElement).style.color = out ? 'rgba(241,245,249,.35)' : 'rgba(241,245,249,.8)'
  }

  return (
    <footer style={{ background:C.bg, borderTop:`1px solid ${C.border}`, paddingTop:72, paddingBottom:36 }}>
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
          <p style={{ fontFamily:FB, fontSize:12, color:'rgba(241,245,249,.2)' }}>{t.footer.copy}</p>
          <p style={{ fontFamily:FB, fontSize:12, color:'rgba(241,245,249,.2)' }}>{t.footer.region}</p>
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
      <div className="flex items-center gap-4 px-5 py-2.5 rounded-full"
        style={{ background:'rgba(7,8,12,.92)', backdropFilter:'blur(28px)', border:'1px solid rgba(255,255,255,.08)', boxShadow:'0 8px 40px rgba(0,0,0,.5)' }}>
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
              style={{ fontFamily:FB, fontSize:12, color:'rgba(241,245,249,.45)', letterSpacing:'.02em' }}
              onMouseEnter={e => (e.currentTarget.style.color=C.text)}
              onMouseLeave={e => (e.currentTarget.style.color='rgba(241,245,249,.45)')}>
              {link.l}
            </button>
          ))}
        </div>
        <a href={WA_GENERIC} target="_blank" rel="noopener noreferrer"
          className="mx-btn-primary rounded-full px-4 py-1.5 cursor-pointer"
          style={{ fontFamily:FD, fontWeight:700, fontSize:12 }}>
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
  return (
    <a href={WA_GENERIC} target="_blank" rel="noopener noreferrer" aria-label="Abrir WhatsApp" className="fixed z-40" style={{ bottom:96, right:24 }}>
      <div className="relative w-13 h-13">
        <div className="absolute inset-0 rounded-full mx-pulse" style={{ background:'#25D366', opacity:.3 }}/>
        <div className="absolute inset-0 rounded-full mx-pulse" style={{ background:'#25D366', opacity:.18, animationDelay:'.7s' }}/>
        <div className="relative w-13 h-13 rounded-full flex items-center justify-center transition-all duration-200"
          style={{ width:52, height:52, background:'linear-gradient(135deg,#25D366,#128C7E)', boxShadow:'0 4px 24px rgba(37,211,102,.35)', zIndex:1 }}
          onMouseEnter={e => (e.currentTarget.style.transform='scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform='')}>
          <MessageCircle size={26} color="#fff" fill="#fff"/>
        </div>
      </div>
    </a>
  )
}

// ─────────────────────────────────────────
// SOCIAL PROOF TOAST
// ─────────────────────────────────────────
function SocialProofToast() {
  const t = useT()
  const [visible, setVisible] = useState(false)
  const [idx, setIdx] = useState(t.toasts.length - 1)

  useEffect(() => {
    const show = () => {
      setIdx(i => (i + 1) % t.toasts.length)
      setVisible(true)
      setTimeout(() => setVisible(false), 4200)
    }
    const init = setTimeout(show, 6000)
    const interval = setInterval(show, 17000)
    return () => { clearTimeout(init); clearInterval(interval) }
  }, [t.toasts.length])

  return (
    <div className="fixed z-40 pointer-events-none transition-all duration-500"
      style={{ bottom:108, left:16, maxWidth:272, opacity:visible?1:0, transform:visible?'translateX(0)':'translateX(-20px)' }}>
      <div className="mx-glass-strong rounded-xl px-4 py-3" style={{ background:'rgba(7,8,12,.92)' }}>
        <p style={{ fontFamily:FB, fontSize:12, color:'rgba(241,245,249,.75)', lineHeight:1.45 }}>{t.toasts[idx]}</p>
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
      <div style={{ height:'100%', width:`${pct}%`, background:'linear-gradient(90deg,#6C63FF,#a78bfa)', transition:'width .1s linear' }}/>
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
        <BusinessSelector/>
        <StatsSection/>
        <TestimonialsSection/>
        <ProcessSection/>
        <WhySection/>
        <CTASection/>
      </main>
      <Footer/>
      <BottomNav/>
      <WhatsAppFAB/>
      <SocialProofToast/>
    </AppCtx.Provider>
  )
}
