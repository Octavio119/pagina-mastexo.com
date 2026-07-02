'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowRight, Check, Zap, Target, Headphones } from 'lucide-react'

/* ═══════════════════════ DATA ═══════════════════════ */

const STATS = [
  { value: 3, suffix: '+', label: 'Proyectos lanzados' },
  { value: 57, suffix: '+', label: 'Visitas generadas' },
  { value: 48, suffix: 'h', label: 'Tiempo de entrega promedio' },
]

const PROJECTS = [
  {
    id: 'mastexo-pos',
    badge: 'SISTEMA POS · Desarrollo completo',
    title: 'Mastexo POS',
    description:
      'Sistema de punto de venta inteligente para restaurantes. Dashboard en tiempo real, gestión de pedidos, reservas, inventario y analytics. Construido desde cero con tecnología moderna.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'IA'],
    metrics: [
      '$1.287.400 ventas/día gestionadas',
      '8 pedidos simultáneos',
      '4 reservas en tiempo real',
    ],
    image: '/portfolio/mastexopos.png.png',
    imageAlt: 'Dashboard de Mastexo POS mostrando ventas del día, pedidos y reservas en tiempo real',
    domain: 'mastexopos.com',
    ctaHref: 'https://www.mastexopos.com/',
    ctaLabel: 'Ver sistema',
    secondaryHref: 'https://www.mastexopos.com/',
    secondaryLabel: 'Ver demo',
  },
  {
    id: 'intimidad-consciente',
    badge: 'LANDING PAGE · Producto digital',
    title: 'Intimidad Consciente',
    description:
      'Landing page de alto impacto para ebook de bienestar de pareja. Diseño elegante, copywriting persuasivo y estructura optimizada para conversión.',
    stack: ['Diseño web', 'Copywriting', 'Conversión'],
    metrics: [
      '57 visitas en lanzamiento',
      'Entregado en 48h',
      'Diseño a medida',
    ],
    image: '/portfolio/intimidadconsciente.png.png',
    imageAlt: 'Hero de la landing page Intimidad Consciente, fondo negro con titular en rojo y blanco',
    domain: 'intimidadconsciente.es',
    ctaHref: 'https://intimidadconsciente.es/',
    ctaLabel: 'Ver sitio',
    secondaryHref: null,
    secondaryLabel: null,
  },
]

const WHY_US = [
  { icon: Zap, title: 'Entrega en 48-72h', desc: 'No semanas. No meses.' },
  { icon: Target, title: 'Orientado a resultados', desc: 'Cada decisión busca convertir visitantes en clientes.' },
  { icon: Headphones, title: 'Soporte real', desc: 'Hablas con quien construyó tu sitio, no con un bot.' },
]

const CHAT_USER_MSG = '¿Tienen ibuprofeno 400mg?'
const CHAT_BOT_MSG = '¡Hola! Sí tenemos ibuprofeno 400mg ✓ ¿Lo necesitas con o sin receta?'

/* ═══════════════════════ HOOKS ═══════════════════════ */

function useCountUp(target: number, run: boolean, duration = 1400) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!run) return
    const start = performance.now()
    let raf = 0

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(animate)
      else setDisplay(target)
    }

    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [target, run, duration])

  return display
}

function useTypewriter(text: string, start: boolean, speed = 28) {
  const [display, setDisplay] = useState('')

  useEffect(() => {
    if (!start) { setDisplay(''); return }
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplay(text.slice(0, i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, start, speed])

  return display
}

/* ═══════════════════════ COMPONENTS ═══════════════════════ */

function StatCounter({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const display = useCountUp(value, inView)

  return (
    <div ref={ref} className="text-center">
      <p className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl font-bold text-white">
        {display}{suffix}
      </p>
      <p className="mt-2 text-xs sm:text-sm text-[#888888] uppercase tracking-wide">{label}</p>
    </div>
  )
}

function MetricPill({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-1.5 bg-[#0F0F0F] border border-[#2A2A2A] rounded-full px-3.5 py-2 text-xs sm:text-sm text-white">
      <Check size={14} className="text-[#7C3AED] flex-shrink-0" />
      {children}
    </div>
  )
}

function BrowserMockup({ domain, image, imageAlt }: { domain: string; image: string; imageAlt: string }) {
  return (
    <div className="group/mockup rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5),0_0_0_1px_rgba(124,58,237,0.2)] transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(124,58,237,0.5),0_0_50px_rgba(124,58,237,0.4)]">
      {/* Barra superior del browser */}
      <div className="h-8 bg-[#1e1e1e] flex items-center pl-3 pr-3">
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="w-2/5 bg-[#2a2a2a] rounded px-3 py-1">
            <span className="block text-center text-[11px] text-[#888888] truncate">{domain}</span>
          </div>
        </div>
      </div>

      {/* Contenido (imagen) */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover transition-transform duration-500 group-hover/mockup:scale-105"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: (typeof PROJECTS)[number] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex flex-col transition-all duration-300 hover:shadow-[0_0_50px_-15px_rgba(124,58,237,0.4)]"
    >
      {/* Bloque 1: mockup */}
      <div className="mb-6 rounded-xl bg-[#0d0d0d] p-4">
        {project.id === 'mastexo-pos' ? (
          <>
            <div className="rounded-xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] bg-[#f5f5f0]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/portfolio/mastexopos.png.png" alt={project.imageAlt} className="w-full object-cover" />
            </div>
            <a
              href="https://www.mastexopos.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center text-sm text-[#7C3AED] pt-2"
            >
              Visitar sitio →
            </a>
          </>
        ) : (
          <BrowserMockup domain={project.domain} image={project.image} imageAlt={project.imageAlt} />
        )}
      </div>

      {/* Bloque 2: contenido */}
      <div className="rounded-xl bg-[#1a1a1a] p-8 flex flex-col gap-4">
        <span className="brand-badge self-start">{project.badge}</span>
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold text-white">
          {project.title}
        </h3>
        <p className="text-[#888888] leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="text-[11px] font-medium text-[#7C3AED] bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.25)] px-2.5 py-1 rounded-full"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.metrics.map((m) => (
            <MetricPill key={m}>{m}</MetricPill>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 mt-2">
          <a
            href={project.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors duration-200"
          >
            {project.ctaLabel} <ArrowRight size={16} />
          </a>
          {project.secondaryHref && project.secondaryLabel && (
            <a
              href={project.secondaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-transparent border border-[#2A2A2A] hover:border-[#7C3AED] text-white font-medium text-sm px-6 py-3 rounded-full transition-colors duration-200"
            >
              {project.secondaryLabel}
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function ChatbotCard() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [showBot, setShowBot] = useState(false)

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => setShowBot(true), 900)
    return () => clearTimeout(t)
  }, [inView])

  const botText = useTypewriter(CHAT_BOT_MSG, showBot)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="rounded-2xl p-12 sm:p-16 text-center overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_60px_-15px_rgba(124,58,237,0.5)]"
      style={{ background: 'linear-gradient(135deg, #1A1330 0%, #3B1F6B 55%, #7C3AED 130%)' }}
    >
      <span className="brand-badge mb-5 inline-flex">AUTOMATIZACIÓN · Demo en vivo 🤖</span>
      <h3 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-white mb-4">
        Chatbot IA para tu negocio
      </h3>
      <p className="text-[#D9CCFB] max-w-xl mx-auto mb-10 leading-relaxed">
        ¿Cómo sería tener un asistente que responde a tus clientes 24/7, conoce tus productos y nunca se cansa? Pruébalo ahora mismo — gratis.
      </p>

      <div className="max-w-lg mx-auto flex flex-col gap-4 mb-10 text-left">
        <div
          className={`self-end bg-[#7C3AED] text-white text-base px-5 py-3 rounded-2xl rounded-br-sm transition-opacity duration-500 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {CHAT_USER_MSG}
        </div>
        <div className="self-start bg-[#111111] border border-[#2A2A2A] text-white text-base px-5 py-3 rounded-2xl rounded-bl-sm min-h-[3.25rem]">
          {botText}
          {showBot && botText.length < CHAT_BOT_MSG.length && <span className="animate-pulse">▍</span>}
        </div>
      </div>

      <Link
        href="/demo/chatbot"
        className="inline-flex items-center justify-center gap-2 bg-white text-[#7C3AED] font-[family-name:var(--font-space-grotesk)] font-bold text-lg px-10 py-5 rounded-full hover:bg-white/90 transition-colors duration-200"
      >
        Probar chatbot en vivo <ArrowRight size={20} />
      </Link>
      <p className="mt-4 text-xs text-[#D9CCFB]">Sin registro · Sin tarjeta · 100% gratis</p>
    </motion.div>
  )
}

/* ═══════════════════════ PAGE ═══════════════════════ */

export default function ResultadosClient() {
  return (
    <>
      <Navbar />

      <main className="bg-[#111111] min-h-screen">

        {/* ── HERO ── */}
        <section className="pt-40 pb-20 px-4 sm:px-6 max-w-6xl mx-auto text-center">
          <h1 className="section-heading">
            Nuestro trabajo
            <br />
            <span className="gradient-text">habla por nosotros</span>
          </h1>
          <p className="mt-6 text-[#888888] text-lg max-w-2xl mx-auto">
            Diseñamos, construimos y lanzamos proyectos digitales que generan resultados reales. Esto es lo que hemos creado.
          </p>

          <div className="mt-14 grid grid-cols-3 gap-4 max-w-xl mx-auto">
            {STATS.map((s) => (
              <StatCounter key={s.label} {...s} />
            ))}
          </div>
        </section>

        {/* ── PROYECTOS ── */}
        <section className="px-4 sm:px-6 max-w-6xl mx-auto pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
          <ChatbotCard />
        </section>

        {/* ── POR QUÉ ELEGIRNOS ── */}
        <section className="px-4 sm:px-6 max-w-6xl mx-auto py-24">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {WHY_US.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                className="text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.3)] flex items-center justify-center mb-5">
                  <Icon size={28} className="text-[#7C3AED]" />
                </div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white mb-2">
                  {title}
                </h3>
                <p className="text-[#888888] text-sm">{desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section
          className="py-24 px-4 sm:px-6 text-center"
          style={{ background: 'linear-gradient(180deg, #111111 0%, #2A1A4A 55%, #7C3AED 150%)' }}
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Tu negocio podría ser el próximo?
            </h2>
            <p className="text-white/80 text-lg mb-9">
              Cuéntanos qué necesitas y te mostramos cómo podemos ayudarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contacto"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#7C3AED] font-[family-name:var(--font-space-grotesk)] font-bold text-base px-8 py-4 rounded-full hover:bg-white/90 transition-colors duration-200"
              >
                Quiero un proyecto así <ArrowRight size={18} />
              </Link>
              <Link
                href="/#servicios"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/40 hover:border-white text-white font-semibold text-base px-8 py-4 rounded-full transition-colors duration-200"
              >
                Ver todos los servicios
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
