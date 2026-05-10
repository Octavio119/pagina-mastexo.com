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
import { Menu, X, ChevronLeft, ChevronRight, MessageCircle, Check } from 'lucide-react'

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

// ─────────────────────────────────────────
// TRANSLATIONS
// ─────────────────────────────────────────
const T = {
  es: {
    nav: { solutions: 'Soluciones', process: 'Proceso', results: 'Resultados', contact: 'Contacto', cta: 'Diagnóstico gratis' },
    hero: {
      badge: '🏆 +85 negocios ya confían en Mastexo · LATAM',
      h1a: 'Resultados digitales,', h1b: 'no complicaciones.',
      sub: 'Diseñamos páginas web y soluciones digitales que convierten visitantes en clientes reales. Para restaurantes, barberías, salones y tiendas en LATAM.',
      cta1: 'Solicitar diagnóstico gratis →', cta2: 'Ver cómo funciona →',
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
      cta:'Empezar ahora → es gratis →', ctaNote:'Sin tarjeta · Sin contratos · Cancela cuando quieras',
    },
    why: {
      title:'Todo lo que necesitas', accent:'para crecer',
      c1t:'Más clientes', c1d:'Atraemos personas que ya buscan lo que ofreces. No seguidores. Clientes reales.', c1chip:'hasta 3× más reservas',
      c2t:'Más tiempo', c2d:'Automatizamos publicaciones, anuncios y respuestas. Tú te enfocas en tu negocio.', c2chip:'8+ horas semanales libres',
      c3t:'Menos complicaciones', c3d:'No necesitas saber de marketing ni tecnología. Nosotros manejamos todo.', c3chip:'0 herramientas que aprender',
      megaTitle:'Esto es exactamente lo que necesitas para hacer crecer tu negocio.',
      megaCta:'Diagnóstico gratuito → Empieza hoy →', megaChip:'85+ negocios ya confían en Mastexo · Sin costo · Sin compromiso',
    },
    form: {
      h2:'¿Listo para más clientes?', sub:'Completa el formulario y te contactamos hoy mismo.',
      ph_name:'Tu nombre', ph_biz:'Tu negocio', ph_type:'Tipo de negocio', ph_contact:'WhatsApp o Email', ph_msg:'¿Qué quieres mejorar? (opcional)',
      submit:'Solicitar diagnóstico gratuito →', sending:'Enviando...', success:'✓ ¡Listo! Te contactamos hoy',
      note:'Sin costo · Sin compromiso · Respuesta hoy mismo', altTitle:'¿Prefieres hablar ahora?', waCta:'💬 Abrir WhatsApp',
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
      badge:'🏆 +85 businesses already trust Mastexo · LATAM',
      h1a:'Digital results,', h1b:'no complications.',
      sub:'We design websites and digital solutions that turn visitors into real customers. For restaurants, barbershops, salons and stores across LATAM.',
      cta1:'Request free diagnosis →', cta2:'See how it works →',
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
      cta:"Start now → it's free →", ctaNote:'No card · No contracts · Cancel anytime',
    },
    why: {
      title:'Everything you need', accent:'to grow',
      c1t:'More clients', c1d:"We attract people already searching for what you offer. Not followers. Real customers.", c1chip:'up to 3× more bookings',
      c2t:'More time', c2d:'We automate posts, ads and responses. You focus on your business.', c2chip:'8+ free weekly hours',
      c3t:'Less complexity', c3d:"You don't need to know marketing or tech. We handle everything.", c3chip:'0 tools to learn',
      megaTitle:'This is exactly what you need to grow your business.',
      megaCta:'Free diagnosis → Start today →', megaChip:'85+ businesses trust Mastexo · No cost · No commitment',
    },
    form: {
      h2:'Ready for more clients?', sub:"Fill out the form and we'll reach out today.",
      ph_name:'Your name', ph_biz:'Your business', ph_type:'Business type', ph_contact:'WhatsApp or Email', ph_msg:'What do you want to improve? (optional)',
      submit:'Request free diagnosis →', sending:'Sending...', success:"✓ Done! We'll contact you today",
      note:'No cost · No commitment · Reply today', altTitle:'Prefer to talk now?', waCta:'💬 Open WhatsApp',
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
const LangCtx = createContext<{ lang: Lang; toggle: () => void }>({ lang: 'es', toggle: () => {} })
const useLang = () => useContext(LangCtx)
const useT = () => { const { lang } = useLang(); return T[lang] }

// ─────────────────────────────────────────
// HOOKS
// ─────────────────────────────────────────
function useInView(threshold = 0.15) {
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

function useCounter(target: number, inView: boolean, duration = 1500) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!inView) return
    let raf: number
    const start = performance.now()
    const step = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(eased * target))
      if (p < 1) { raf = requestAnimationFrame(step) } else { setCount(target) }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [inView, target, duration])
  return count
}

function useScrollY() {
  const [y, setY] = useState(0)
  useEffect(() => {
    const h = () => setY(window.scrollY)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return y
}

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

// ─────────────────────────────────────────
// GLOBAL CSS
// ─────────────────────────────────────────
const STYLES = `
  @keyframes fadeInUp  { from{opacity:0;transform:translateY(28px)} to{opacity:1;transform:translateY(0)} }
  @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
  @keyframes pulseRing { 0%{transform:scale(1);opacity:.6} 100%{transform:scale(1.7);opacity:0} }
  @keyframes slideIn   { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }

  .mx-anim-in    { animation: fadeInUp .7s ease-out forwards; }
  .mx-float      { animation: float 4s ease-in-out infinite; }
  .mx-pulse      { animation: pulseRing 1.8s ease-out infinite; }
  .mx-slide-in   { animation: slideIn .4s ease-out; }

  .mx-glass {
    background: rgba(255,255,255,.04);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255,255,255,.08);
    box-shadow: inset 0 1px 1px rgba(255,255,255,.08), 0 24px 48px rgba(0,0,0,.3);
    position: relative; overflow: hidden;
  }
  .mx-glass::before {
    content:''; position:absolute; inset:0; border-radius:inherit; padding:1px;
    background: linear-gradient(135deg,rgba(255,255,255,.2) 0%,rgba(255,255,255,.04) 40%,transparent 60%,rgba(0,229,255,.12) 100%);
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor; mask-composite: exclude; pointer-events:none;
  }
  .mx-glass-light {
    background: rgba(255,255,255,.92);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(10,37,64,.08);
    box-shadow: 0 8px 40px rgba(10,37,64,.1);
  }
  @media(prefers-reduced-motion:reduce){
    .mx-anim-in,.mx-float,.mx-pulse,.mx-slide-in{animation:none!important}
  }
`

// ─────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────
function Navbar() {
  const t = useT(); const { lang, toggle } = useLang()
  const scrollY = useScrollY()
  const [open, setOpen] = useState(false)
  const scrolled = scrollY > 60

  const links = [
    { label: t.nav.solutions, id: 'soluciones' },
    { label: t.nav.process,   id: 'proceso' },
    { label: t.nav.results,   id: 'resultados' },
    { label: t.nav.contact,   id: 'contacto' },
  ]

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        style={{ height:68, background: scrolled ? 'rgba(5,17,31,.88)' : 'transparent', backdropFilter: scrolled ? 'blur(16px)' : 'none' }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-full flex items-center gap-3">
          {/* Logo */}
          <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} className="flex items-center gap-2 cursor-pointer bg-transparent border-none">
            <Image src="/logo1.jpg" alt="Mastexo" width={32} height={32} className="rounded-full object-cover"/>
            <span style={{ fontFamily:FD, fontWeight:700, fontSize:20, color:'#fff' }}>Mastexo</span>
          </button>
          <div className="flex-1"/>
          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)} className="cursor-pointer bg-transparent border-none transition-colors duration-200"
                style={{ fontFamily:FB, fontSize:14, fontWeight:500, color:'rgba(255,255,255,.7)' }}
                onMouseEnter={e => (e.currentTarget.style.color='#fff')}
                onMouseLeave={e => (e.currentTarget.style.color='rgba(255,255,255,.7)')}>
                {l.label}
              </button>
            ))}
          </div>
          {/* Lang toggle */}
          <button onClick={toggle} className="mx-glass rounded-full px-3 py-1 flex items-center gap-1 cursor-pointer text-xs ml-2" style={{ fontFamily:FB }}>
            {(['es','en'] as Lang[]).map((l,i) => (
              <React.Fragment key={l}>
                {i > 0 && <span style={{ color:'rgba(255,255,255,.25)', margin:'0 1px' }}>|</span>}
                <span style={{ color: lang===l ? '#00E5FF' : 'rgba(255,255,255,.4)', fontWeight: lang===l ? 700 : 400 }}>{l.toUpperCase()}</span>
              </React.Fragment>
            ))}
          </button>
          {/* Desktop CTA */}
          <button onClick={() => scrollTo('contacto')} className="hidden md:block rounded-full px-5 py-2.5 cursor-pointer transition-all duration-200 ml-2"
            style={{ background:'#00E5FF', color:'#0A2540', fontFamily:FD, fontWeight:700, fontSize:14 }}
            onMouseEnter={e => { e.currentTarget.style.filter='brightness(1.1)'; e.currentTarget.style.transform='scale(1.02)' }}
            onMouseLeave={e => { e.currentTarget.style.filter=''; e.currentTarget.style.transform='' }}>
            {t.nav.cta}
          </button>
          {/* Hamburger */}
          <button onClick={() => setOpen(o => !o)} className="md:hidden ml-2 cursor-pointer bg-transparent border-none" style={{ color:'#fff' }}>
            {open ? <X size={24}/> : <Menu size={24}/>}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-[99] md:hidden flex flex-col items-center justify-center gap-8"
          style={{ background:'rgba(5,17,31,.98)', backdropFilter:'blur(24px)' }}>
          <button onClick={() => setOpen(false)} className="absolute top-5 right-5 cursor-pointer bg-transparent border-none" style={{ color:'#fff' }}>
            <X size={28}/>
          </button>
          {links.map(l => (
            <button key={l.id} onClick={() => { scrollTo(l.id); setOpen(false) }} className="cursor-pointer bg-transparent border-none"
              style={{ fontFamily:FD, fontWeight:700, fontSize:28, color:'#fff' }}>
              {l.label}
            </button>
          ))}
          <button onClick={() => { scrollTo('contacto'); setOpen(false) }} className="rounded-full px-8 py-4 cursor-pointer mt-4"
            style={{ background:'#00E5FF', color:'#0A2540', fontFamily:FD, fontWeight:700, fontSize:16 }}>
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

  const particles = Array.from({ length: 14 }, (_, i) => ({
    x: (i * 37 + 11) % 97, y: (i * 53 + 7) % 90,
    size: 2 + (i % 3),
    color: i%3===0 ? '#00E5FF' : i%3===1 ? '#7B61FF' : '#00C48C',
    delay: i * 0.35,
    dur: 3 + (i % 4),
  }))

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" style={{ background:'#05111F' }}>
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none" style={{ background:'radial-gradient(ellipse 80% 60% at 50% 40%,#0A2540 0%,#05111F 100%)' }}/>
      {/* Glow orb */}
      <div className="absolute pointer-events-none" style={{ width:600,height:600,top:'-10%',right:'-10%',background:'radial-gradient(circle,rgba(0,229,255,.15) 0%,rgba(123,97,255,.08) 50%,transparent 70%)',filter:'blur(60px)',borderRadius:'50%' }}/>
      {/* Particles */}
      {particles.map((p,i) => (
        <div key={i} className="absolute rounded-full pointer-events-none mx-float"
          style={{ left:`${p.x}%`,top:`${p.y}%`,width:p.size,height:p.size,background:p.color,opacity:.55,animationDelay:`${p.delay}s`,animationDuration:`${p.dur}s` }}/>
      ))}

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center mx-glass rounded-full px-4 py-2 mb-8 mx-anim-in"
          style={{ animationDelay:'.1s',opacity:0,border:'1px solid rgba(0,229,255,.2)' }}>
          <span style={{ fontFamily:FB, fontSize:12, color:'#00E5FF' }}>{t.hero.badge}</span>
        </div>

        {/* H1 */}
        <h1 className="mx-anim-in" style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(46px,8vw,88px)', lineHeight:1.05, letterSpacing:'-.03em', color:'#fff', marginBottom:24, animationDelay:'.2s', opacity:0 }}>
          {t.hero.h1a}<br/><span style={{ color:'#00E5FF' }}>{t.hero.h1b}</span>
        </h1>

        {/* Sub */}
        <p className="mx-anim-in" style={{ fontFamily:FB, fontSize:18, color:'rgba(255,255,255,.65)', maxWidth:540, margin:'0 auto 32px', lineHeight:1.7, animationDelay:'.3s', opacity:0 }}>
          {t.hero.sub}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mx-anim-in" style={{ animationDelay:'.4s', opacity:0 }}>
          <button onClick={() => scrollTo('contacto')} className="rounded-full px-8 py-4 cursor-pointer transition-all duration-200 w-full sm:w-auto"
            style={{ background:'#00E5FF', color:'#0A2540', fontFamily:FD, fontWeight:700, fontSize:16, boxShadow:'0 0 32px rgba(0,229,255,.35)' }}
            onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)'; e.currentTarget.style.boxShadow='0 0 48px rgba(0,229,255,.5)' }}
            onMouseLeave={e => { e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 0 32px rgba(0,229,255,.35)' }}
            onMouseDown={e => { e.currentTarget.style.transform='scale(.97)' }}>
            {t.hero.cta1}
          </button>
          <button onClick={() => scrollTo('proceso')} className="mx-glass rounded-full px-8 py-4 cursor-pointer transition-all duration-200 w-full sm:w-auto"
            style={{ color:'#fff', fontFamily:FD, fontWeight:700, fontSize:16 }}
            onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(0,229,255,.5)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor='')}>
            {t.hero.cta2}
          </button>
        </div>

        {/* Proof strip */}
        <div className="flex items-center justify-center gap-6 mt-12 mx-anim-in flex-wrap" style={{ animationDelay:'.5s', opacity:0 }}>
          {[{n:t.hero.s1n,l:t.hero.s1l},{n:t.hero.s2n,l:t.hero.s2l},{n:t.hero.s3n,l:t.hero.s3l}].map((s,i) => (
            <div key={i} className="flex items-center gap-6">
              {i > 0 && <div style={{ width:1, height:32, background:'rgba(255,255,255,.15)' }}/>}
              <div className="text-center">
                <div style={{ fontFamily:FD, fontWeight:700, fontSize:22, color:'#fff' }}>{s.n}</div>
                <div style={{ fontFamily:FB, fontSize:12, color:'rgba(255,255,255,.5)' }}>{s.l}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating card - desktop */}
      <div className="absolute hidden lg:block mx-float" style={{ right:32, top:'50%', transform:'translateY(-50%)', width:224, zIndex:20, animationDelay:'1s' }}>
        <div className="mx-glass rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background:'rgba(0,229,255,.15)' }}>✂️</div>
            <div>
              <div style={{ fontFamily:FB, fontWeight:600, fontSize:13, color:'#fff' }}>{t.hero.cardName}</div>
              <div style={{ fontSize:12, color:'#F59E0B' }}>★★★★★</div>
            </div>
          </div>
          <p style={{ fontFamily:FB, fontSize:13, color:'rgba(255,255,255,.8)', lineHeight:1.5 }}>&ldquo;{t.hero.cardQuote}&rdquo;</p>
        </div>
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
    <section id="soluciones" ref={ref} className="py-24 px-4 md:px-6" style={{ background:'#F7FBFF' }}>
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-12 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <p style={{ fontFamily:FD, fontWeight:800, fontSize:11, letterSpacing:3, color:'#00E5FF', textTransform:'uppercase', marginBottom:12 }}>{t.sel.label}</p>
          <h2 style={{ fontFamily:FD, fontWeight:700, fontSize:'clamp(28px,5vw,42px)', color:'#0A2540', marginBottom:16 }}>{t.sel.h2}</h2>
          <p style={{ fontFamily:FB, fontSize:17, color:'#2D4A63', maxWidth:480, margin:'0 auto' }}>{t.sel.sub}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {t.cats.map((cat, i) => (
            <button key={i} onClick={() => setActive(active===i ? null : i)}
              className="rounded-2xl p-6 text-left cursor-pointer transition-all duration-200"
              style={{ background: active===i ? '#E8FFF9' : '#fff', border: active===i ? '2px solid #00E5FF' : '2px solid #E8F0F8', boxShadow: active===i ? '0 0 0 4px rgba(0,229,255,.15)' : 'none', transform: active===i ? 'scale(1.02)' : '' }}
              onMouseEnter={e => { if (active!==i) { e.currentTarget.style.borderColor='#00E5FF'; e.currentTarget.style.boxShadow='0 8px 24px rgba(0,229,255,.12)'; e.currentTarget.style.transform='translateY(-4px)' } }}
              onMouseLeave={e => { if (active!==i) { e.currentTarget.style.borderColor='#E8F0F8'; e.currentTarget.style.boxShadow='none'; e.currentTarget.style.transform='' } }}>
              <div style={{ fontSize:36, marginBottom:8 }}>{cat.icon}</div>
              <div style={{ fontFamily:FB, fontWeight:600, fontSize:15, color:'#0A2540', marginBottom:4 }}>{cat.name}</div>
              <div style={{ fontFamily:FB, fontSize:12, color:'#6B8BA4' }}>{cat.desc}</div>
            </button>
          ))}
        </div>

        {/* Detail panel */}
        {active !== null && (
          <div className="rounded-2xl p-8 mb-8 mx-slide-in" style={{ background:'#0A2540' }}>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <div className="flex-1">
                <h3 style={{ fontFamily:FD, fontWeight:700, fontSize:22, color:'#fff', marginBottom:16 }}>
                  {t.sel.detailTitle} {t.cats[active].name}
                </h3>
                <ul className="space-y-3">
                  {t.cats[active].benefits.map((b,i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background:'rgba(0,229,255,.2)' }}>
                        <Check size={12} color="#00E5FF"/>
                      </div>
                      <span style={{ fontFamily:FB, fontSize:15, color:'rgba(255,255,255,.85)' }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <a href={waForCat(t.cats[active].name)} target="_blank" rel="noopener noreferrer"
                className="inline-block rounded-full px-6 py-3 cursor-pointer transition-all duration-200 flex-shrink-0"
                style={{ background:'#00E5FF', color:'#0A2540', fontFamily:FD, fontWeight:700, fontSize:15 }}
                onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)' }}
                onMouseLeave={e => { e.currentTarget.style.transform='' }}>
                {t.sel.detailCta}
              </a>
            </div>
          </div>
        )}

        <div className="text-center">
          <button onClick={() => scrollTo('contacto')} className="rounded-full px-8 py-4 cursor-pointer transition-all duration-200 mb-3"
            style={{ background:'#00E5FF', color:'#0A2540', fontFamily:FD, fontWeight:700, fontSize:16, boxShadow:'0 0 32px rgba(0,229,255,.25)' }}
            onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)' }}
            onMouseLeave={e => { e.currentTarget.style.transform='' }}>
            {t.sel.cta}
          </button>
          <p style={{ fontFamily:FB, fontSize:12, color:'#9BB0C4', marginTop:8 }}>{t.sel.ctaNote}</p>
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
    <div className="text-center transition-all duration-700"
      style={{ opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(24px)', transitionDelay:`${delay}s`, borderRight:!last?'1px solid rgba(255,255,255,.1)':'none' }}>
      <div style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(36px,5vw,56px)', color:'#00E5FF', lineHeight:1 }}>
        {prefix}{inView ? count : target}{suffix}
      </div>
      <div style={{ fontFamily:FB, fontSize:14, color:'rgba(255,255,255,.6)', marginTop:8 }}>{label}</div>
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
    <section id="resultados" ref={ref} className="py-20 px-4 md:px-6" style={{ background:'linear-gradient(135deg,#05111F 0%,#0A2540 100%)' }}>
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <StatCard key={i} {...s} inView={inView} delay={i*0.15} last={i===stats.length-1}/>
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
    timerRef.current = setInterval(next, 3500)
  }, [next])

  useEffect(() => {
    startTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [startTimer])

  return (
    <section className="py-24 px-4 md:px-6" style={{ background:'#fff' }}>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
          <h2 style={{ fontFamily:FD, fontWeight:700, fontSize:'clamp(24px,4vw,38px)', color:'#0A2540' }}>{t.testi.title}</h2>
          <div className="flex items-center gap-2 flex-shrink-0">
            <span style={{ color:'#F59E0B', fontSize:16 }}>★★★★★</span>
            <span style={{ fontFamily:FB, fontSize:14, color:'#6B8BA4' }}>{t.testi.rating}</span>
          </div>
        </div>

        <div className="relative overflow-hidden"
          onMouseEnter={() => { if (timerRef.current) clearInterval(timerRef.current) }}
          onMouseLeave={startTimer}>
          <div className="flex transition-transform duration-500 ease-in-out" style={{ transform:`translateX(-${cur*100}%)` }}>
            {items.map((item, i) => (
              <div key={i} className="w-full flex-shrink-0">
                <div className="rounded-2xl p-8 mx-1" style={{ background:'#fff', border:'1px solid #E8F0F8', boxShadow:'0 4px 24px rgba(10,37,64,.06)' }}>
                  <div style={{ fontFamily:'Georgia,serif', fontSize:48, color:'#00E5FF', lineHeight:.8, marginBottom:16 }}>&ldquo;</div>
                  <p style={{ fontFamily:FB, fontSize:16, color:'#0A2540', lineHeight:1.7, marginBottom:24 }}>{item.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl" style={{ background:'rgba(0,229,255,.08)' }}>{item.icon}</div>
                    <div>
                      <div style={{ fontFamily:FB, fontWeight:600, fontSize:15, color:'#0A2540' }}>{item.biz}</div>
                      <div style={{ fontFamily:FB, fontSize:12, color:'#6B8BA4' }}>{item.city}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={prev} className="w-12 h-12 mx-glass rounded-full flex items-center justify-center cursor-pointer transition-all duration-200" style={{ color:'#fff' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(0,229,255,.5)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor='')}>
            <ChevronLeft size={20}/>
          </button>
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button key={i} onClick={() => setCur(i)} className="rounded-full transition-all duration-200 cursor-pointer"
                style={{ width:cur===i?24:8, height:8, background:cur===i?'#00E5FF':'#E8F0F8' }}/>
            ))}
          </div>
          <button onClick={next} className="w-12 h-12 mx-glass rounded-full flex items-center justify-center cursor-pointer transition-all duration-200" style={{ color:'#fff' }}
            onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(0,229,255,.5)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor='')}>
            <ChevronRight size={20}/>
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

  const steps = [
    { num:'01', icon:'💬', title:t.proc.s1t, desc:t.proc.s1d, cta:t.proc.s1cta, ctaFn:() => scrollTo('contacto'), chip:null },
    { num:'02', icon:'⚡', title:t.proc.s2t, desc:t.proc.s2d, cta:null, ctaFn:null, chip:{ text:t.proc.s2chip, color:'#00E5FF' } },
    { num:'03', icon:'🚀', title:t.proc.s3t, desc:t.proc.s3d, cta:null, ctaFn:null, chip:{ text:t.proc.s3chip, color:'#00C48C' } },
  ]

  return (
    <section id="proceso" ref={ref} className="py-24 px-4 md:px-6" style={{ background:'#F7FBFF' }}>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center mb-16" style={{ fontFamily:FD, fontWeight:700, fontSize:'clamp(26px,5vw,42px)', color:'#0A2540' }}>
          {t.proc.title}
        </h2>
        <div className="flex flex-col gap-6">
          {steps.map((s, i) => (
            <div key={i} className="rounded-2xl p-6 transition-all duration-700 relative overflow-hidden"
              style={{ background:'#fff', borderLeft:'3px solid #00E5FF', boxShadow:'0 4px 24px rgba(10,37,64,.06)', opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(24px)', transitionDelay:`${i*.2}s` }}>
              <div className="absolute right-6 top-2 select-none pointer-events-none" style={{ fontFamily:FD, fontWeight:800, fontSize:80, color:'rgba(10,37,64,.04)', lineHeight:1 }}>{s.num}</div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0" style={{ background:'rgba(0,229,255,.1)' }}>{s.icon}</div>
                <div className="flex-1">
                  <h3 style={{ fontFamily:FD, fontWeight:700, fontSize:20, color:'#0A2540', marginBottom:8 }}>{s.title}</h3>
                  <p style={{ fontFamily:FB, fontSize:15, color:'#2D4A63', lineHeight:1.6 }}>{s.desc}</p>
                  {s.chip && (
                    <span className="inline-block mt-3 px-3 py-1 rounded-full text-xs"
                      style={{ background:`${s.chip.color}1A`, color:s.chip.color, fontFamily:FB, fontWeight:500 }}>
                      {s.chip.text}
                    </span>
                  )}
                  {s.cta && s.ctaFn && (
                    <button onClick={s.ctaFn} className="mt-3 px-4 py-2 rounded-full text-sm cursor-pointer transition-all duration-200"
                      style={{ background:'#00E5FF', color:'#0A2540', fontFamily:FD, fontWeight:700 }}>
                      {s.cta}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href={WA_DIAG} target="_blank" rel="noopener noreferrer"
            className="inline-block rounded-full px-8 py-4 cursor-pointer transition-all duration-200 mb-3"
            style={{ background:'#00E5FF', color:'#0A2540', fontFamily:FD, fontWeight:700, fontSize:16, boxShadow:'0 0 32px rgba(0,229,255,.25)' }}
            onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)' }}
            onMouseLeave={e => { e.currentTarget.style.transform='' }}>
            {t.proc.cta}
          </a>
          <p style={{ fontFamily:FB, fontSize:12, color:'#9BB0C4', marginTop:8 }}>{t.proc.ctaNote}</p>
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

  const cards = [
    { icon:'🎯', title:t.why.c1t, desc:t.why.c1d, chip:t.why.c1chip, cc:'#00C48C' },
    { icon:'⏱️', title:t.why.c2t, desc:t.why.c2d, chip:t.why.c2chip, cc:'#00E5FF' },
    { icon:'✨', title:t.why.c3t, desc:t.why.c3d, chip:t.why.c3chip, cc:'#7B61FF' },
  ]

  return (
    <section className="py-24 px-4 md:px-6" style={{ background:'linear-gradient(135deg,#05111F 0%,#0A2540 100%)' }}>
      <div className="max-w-5xl mx-auto" ref={ref}>
        <h2 className="text-center mb-16" style={{ fontFamily:FD, fontWeight:700, fontSize:'clamp(26px,5vw,42px)', color:'#fff' }}>
          {t.why.title}{' '}<span style={{ color:'#00E5FF' }}>{t.why.accent}</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {cards.map((c, i) => (
            <div key={i} className="mx-glass rounded-2xl p-8 transition-all duration-700 cursor-default"
              style={{ opacity:inView?1:0, transform:inView?'translateY(0)':'translateY(24px)', transitionDelay:`${i*.15}s` }}
              onMouseEnter={e => (e.currentTarget.style.transform='translateY(-6px)')}
              onMouseLeave={e => (e.currentTarget.style.transform=inView?'translateY(0)':'translateY(24px)')}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-4" style={{ background:`${c.cc}22` }}>{c.icon}</div>
              <h3 style={{ fontFamily:FD, fontWeight:700, fontSize:20, color:'#fff', marginBottom:8 }}>{c.title}</h3>
              <p style={{ fontFamily:FB, fontSize:14, color:'rgba(255,255,255,.65)', lineHeight:1.6, marginBottom:16 }}>{c.desc}</p>
              <span className="inline-block px-3 py-1 rounded-full text-xs" style={{ background:`${c.cc}22`, color:c.cc, fontFamily:FB, fontWeight:500 }}>{c.chip}</span>
            </div>
          ))}
        </div>
        <div className="mx-glass rounded-2xl p-10 text-center">
          <h3 style={{ fontFamily:FD, fontWeight:700, fontSize:'clamp(18px,3vw,28px)', color:'#fff', marginBottom:24 }}>{t.why.megaTitle}</h3>
          <button onClick={() => scrollTo('contacto')} className="rounded-full px-10 py-4 cursor-pointer transition-all duration-200 mb-4"
            style={{ background:'#00E5FF', color:'#0A2540', fontFamily:FD, fontWeight:700, fontSize:16, boxShadow:'0 0 32px rgba(0,229,255,.3)' }}
            onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)' }}
            onMouseLeave={e => { e.currentTarget.style.transform='' }}>
            {t.why.megaCta}
          </button>
          <p style={{ fontFamily:FB, fontSize:12, color:'rgba(255,255,255,.4)' }}>{t.why.megaChip}</p>
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
    e.preventDefault(); setStatus('loading')
    const msg = `Hola Mastexo, me llamo ${form.name}, tengo ${form.business} de tipo ${form.type} y quiero mejorar: ${form.message||'sin mensaje adicional'}. Mi contacto: ${form.contact}`
    setTimeout(() => {
      window.open(`${WA_BASE}?text=${encodeURIComponent(msg)}`, '_blank')
      setStatus('success')
      setTimeout(() => setStatus('idle'), 5000)
    }, 500)
  }

  const iStyle: React.CSSProperties = { width:'100%', border:'1.5px solid #E8F0F8', borderRadius:12, padding:'14px 16px', fontFamily:FB, fontSize:15, color:'#0A2540', background:'#fff', outline:'none', transition:'border-color .2s' }
  const onF = (e: React.FocusEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => (e.target.style.borderColor='#00E5FF')
  const onB = (e: React.FocusEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) => (e.target.style.borderColor='#E8F0F8')

  return (
    <section id="contacto" className="py-24 px-4 md:px-6" style={{ background:'#F7FBFF' }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 style={{ fontFamily:FD, fontWeight:800, fontSize:'clamp(28px,6vw,48px)', color:'#0A2540', marginBottom:12 }}>{t.form.h2}</h2>
          <p style={{ fontFamily:FB, fontSize:16, color:'#2D4A63' }}>{t.form.sub}</p>
        </div>
        <form onSubmit={handleSubmit} className="mx-glass-light rounded-2xl p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <input required style={iStyle} placeholder={t.form.ph_name} value={form.name}
              onChange={e => setForm(f => ({...f, name:e.target.value}))} onFocus={onF} onBlur={onB}/>
            <input required style={iStyle} placeholder={t.form.ph_biz} value={form.business}
              onChange={e => setForm(f => ({...f, business:e.target.value}))} onFocus={onF} onBlur={onB}/>
          </div>
          <div className="mb-4">
            <select required style={{ ...iStyle, color:form.type?'#0A2540':'#9BB0C4' }} value={form.type}
              onChange={e => setForm(f => ({...f, type:e.target.value}))} onFocus={onF} onBlur={onB}>
              <option value="">{t.form.ph_type}</option>
              {t.cats.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
          </div>
          <div className="mb-4">
            <input required style={iStyle} placeholder={t.form.ph_contact} value={form.contact}
              onChange={e => setForm(f => ({...f, contact:e.target.value}))} onFocus={onF} onBlur={onB}/>
          </div>
          <div className="mb-6">
            <textarea style={{ ...iStyle, resize:'vertical', minHeight:100 } as React.CSSProperties}
              placeholder={t.form.ph_msg} value={form.message}
              onChange={e => setForm(f => ({...f, message:e.target.value}))} onFocus={onF} onBlur={onB}/>
          </div>
          <button type="submit" disabled={status!=='idle'} className="w-full rounded-xl py-4 cursor-pointer transition-all duration-200"
            style={{ background:status==='success'?'#00C48C':'#00E5FF', color:'#0A2540', fontFamily:FD, fontWeight:700, fontSize:16, opacity:status==='loading'?.75:1 }}>
            {status==='loading' ? t.form.sending : status==='success' ? t.form.success : t.form.submit}
          </button>
          <p className="text-center mt-4" style={{ fontFamily:FB, fontSize:12, color:'#9BB0C4' }}>{t.form.note}</p>
        </form>
        <div className="text-center mt-10">
          <p style={{ fontFamily:FB, fontSize:15, color:'#2D4A63', marginBottom:16 }}>{t.form.altTitle}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={WA_GENERIC} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 cursor-pointer transition-all duration-200"
              style={{ background:'#25D366', color:'#fff', fontFamily:FD, fontWeight:700, fontSize:15 }}
              onMouseEnter={e => { e.currentTarget.style.transform='scale(1.03)' }}
              onMouseLeave={e => { e.currentTarget.style.transform='' }}>
              {t.form.waCta}
            </a>
            <a href={`mailto:${EMAIL}`} style={{ fontFamily:FB, fontSize:15, color:'#0A2540', textDecoration:'none' }}
              onMouseEnter={e => (e.currentTarget.style.color='#00E5FF')}
              onMouseLeave={e => (e.currentTarget.style.color='#0A2540')}>
              📧 {EMAIL}
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
    (e.currentTarget as HTMLElement).style.color = out ? 'rgba(255,255,255,.5)' : '#fff'
  }

  return (
    <footer style={{ background:'#05111F', paddingTop:64, paddingBottom:32 }}>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <button onClick={() => window.scrollTo({ top:0, behavior:'smooth' })} className="flex items-center gap-2 mb-4 cursor-pointer bg-transparent border-none">
              <Image src="/logo1.jpg" alt="Mastexo" width={40} height={40} className="rounded-full object-cover"/>
              <span style={{ fontFamily:FD, fontWeight:700, fontSize:20, color:'#fff' }}>Mastexo</span>
            </button>
            <p style={{ fontFamily:FB, fontSize:14, color:'rgba(255,255,255,.5)', lineHeight:1.6, marginBottom:20 }}>{t.footer.tagline}</p>
            <div className="flex gap-3">
              <a href={IG} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 mx-glass rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
                onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(0,229,255,.5)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor='')}>
                <IgIcon size={18} color="#fff"/>
              </a>
              <a href={WA_GENERIC} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 mx-glass rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
                onMouseEnter={e => (e.currentTarget.style.borderColor='rgba(0,229,255,.5)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor='')}>
                <MessageCircle size={18} color="#fff"/>
              </a>
            </div>
          </div>
          {/* Nav */}
          <div>
            <h4 style={{ fontFamily:FD, fontWeight:700, fontSize:13, color:'#fff', marginBottom:16, letterSpacing:1, textTransform:'uppercase' }}>{t.footer.navTitle}</h4>
            <ul className="space-y-3">
              {[
                { label:t.footer.home,      action:() => window.scrollTo({ top:0, behavior:'smooth' }) },
                { label:t.footer.solutions, action:() => scrollTo('soluciones') },
                { label:t.footer.process,   action:() => scrollTo('proceso') },
              ].map((item, i) => (
                <li key={i}>
                  <button onClick={item.action} className="cursor-pointer bg-transparent border-none p-0 transition-colors duration-200"
                    style={{ fontFamily:FB, fontSize:14, color:'rgba(255,255,255,.5)' }}
                    onMouseEnter={lh} onMouseLeave={e => lh(e, true)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 style={{ fontFamily:FD, fontWeight:700, fontSize:13, color:'#fff', marginBottom:16, letterSpacing:1, textTransform:'uppercase' }}>{t.footer.contactTitle}</h4>
            <ul className="space-y-3">
              <li>
                <a href={`mailto:${EMAIL}`} style={{ fontFamily:FB, fontSize:14, color:'rgba(255,255,255,.5)', textDecoration:'none', display:'block' }}
                  onMouseEnter={lh} onMouseLeave={e => lh(e, true)}>📧 {EMAIL}</a>
              </li>
              <li>
                <a href={WA_GENERIC} target="_blank" rel="noopener noreferrer"
                  style={{ fontFamily:FB, fontSize:14, color:'rgba(255,255,255,.5)', textDecoration:'none', display:'block' }}
                  onMouseEnter={lh} onMouseLeave={e => lh(e, true)}>📱 +56 9 2970 9420</a>
              </li>
            </ul>
          </div>
          {/* Legal */}
          <div>
            <h4 style={{ fontFamily:FD, fontWeight:700, fontSize:13, color:'#fff', marginBottom:16, letterSpacing:1, textTransform:'uppercase' }}>{t.footer.legalTitle}</h4>
            <ul className="space-y-3">
              {[
                { label:t.footer.privacy, href:'/privacidad' },
                { label:t.footer.terms,   href:'/terminos' },
              ].map((item, i) => (
                <li key={i}>
                  <a href={item.href} style={{ fontFamily:FB, fontSize:14, color:'rgba(255,255,255,.5)', textDecoration:'none', display:'block' }}
                    onMouseEnter={lh} onMouseLeave={e => lh(e, true)}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ borderTop:'1px solid rgba(255,255,255,.08)', paddingTop:24 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <p style={{ fontFamily:FB, fontSize:13, color:'rgba(255,255,255,.35)' }}>{t.footer.copy}</p>
          <p style={{ fontFamily:FB, fontSize:13, color:'rgba(255,255,255,.35)' }}>{t.footer.region}</p>
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
  const visible = scrollY > 200

  return (
    <div className="fixed bottom-6 left-1/2 z-50 transition-all duration-300"
      style={{ transform:'translateX(-50%)', opacity:visible?1:0, pointerEvents:visible?'auto':'none' }}>
      <div className="flex items-center gap-3 px-5 py-3 rounded-full"
        style={{ background:'rgba(5,17,31,.88)', backdropFilter:'blur(24px)', border:'1px solid rgba(255,255,255,.1)', boxShadow:'0 8px 32px rgba(0,0,0,.4)' }}>
        <span style={{ fontFamily:FD, fontWeight:700, fontSize:20, color:'#00E5FF' }}>M</span>
        <div style={{ width:1, height:20, background:'rgba(255,255,255,.15)' }}/>
        <div className="hidden sm:flex items-center gap-4">
          {[
            { l:t.bnav.solutions, id:'soluciones' },
            { l:t.bnav.process,   id:'proceso' },
            { l:t.bnav.results,   id:'resultados' },
          ].map(link => (
            <button key={link.id} onClick={() => scrollTo(link.id)} className="cursor-pointer bg-transparent border-none transition-colors duration-200"
              style={{ fontFamily:FB, fontSize:13, color:'rgba(255,255,255,.6)' }}
              onMouseEnter={e => (e.currentTarget.style.color='#fff')}
              onMouseLeave={e => (e.currentTarget.style.color='rgba(255,255,255,.6)')}>
              {link.l}
            </button>
          ))}
        </div>
        <a href={WA_GENERIC} target="_blank" rel="noopener noreferrer"
          className="rounded-full px-4 py-1.5 cursor-pointer transition-all duration-200"
          style={{ background:'#00E5FF', color:'#0A2540', fontFamily:FD, fontWeight:700, fontSize:13 }}
          onMouseEnter={e => { e.currentTarget.style.transform='scale(1.05)' }}
          onMouseLeave={e => { e.currentTarget.style.transform='' }}>
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
    <a href={WA_GENERIC} target="_blank" rel="noopener noreferrer" className="fixed z-40" style={{ bottom:100, right:24 }}>
      <div className="relative w-14 h-14">
        <div className="absolute inset-0 rounded-full mx-pulse" style={{ background:'#25D366', opacity:.4 }}/>
        <div className="absolute inset-0 rounded-full mx-pulse" style={{ background:'#25D366', opacity:.25, animationDelay:'.6s' }}/>
        <div className="relative w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200"
          style={{ background:'#25D366', boxShadow:'0 4px 20px rgba(37,211,102,.4)', zIndex:1 }}
          onMouseEnter={e => (e.currentTarget.style.transform='scale(1.1)')}
          onMouseLeave={e => (e.currentTarget.style.transform='')}>
          <MessageCircle size={28} color="#fff" fill="#fff"/>
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
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const show = () => {
      setIdx(i => (i + 1) % t.toasts.length)
      setVisible(true)
      setTimeout(() => setVisible(false), 4000)
    }
    const init = setTimeout(show, 6000)
    const interval = setInterval(show, 16000)
    return () => { clearTimeout(init); clearInterval(interval) }
  }, [t.toasts.length])

  return (
    <div className="fixed z-40 pointer-events-none transition-all duration-500"
      style={{ bottom:112, left:16, maxWidth:280, opacity:visible?1:0, transform:visible?'translateX(0)':'translateX(-24px)' }}>
      <div className="mx-glass rounded-2xl px-4 py-3" style={{ background:'rgba(5,17,31,.92)' }}>
        <p style={{ fontFamily:FB, fontSize:13, color:'rgba(255,255,255,.85)', lineHeight:1.4 }}>{t.toasts[idx]}</p>
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
      <div style={{ height:'100%', width:`${pct}%`, background:'#00E5FF', transition:'width .1s linear' }}/>
    </div>
  )
}

// ─────────────────────────────────────────
// ROOT EXPORT
// ─────────────────────────────────────────
export default function HomeClient() {
  const [lang, setLang] = useState<Lang>('es')

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
    <LangCtx.Provider value={{ lang, toggle }}>
      <style dangerouslySetInnerHTML={{ __html: STYLES }}/>
      <ScrollProgress/>
      <Navbar/>
      <main>
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
    </LangCtx.Provider>
  )
}
