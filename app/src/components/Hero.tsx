'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MessageCircle, TrendingUp, Users, ShoppingCart } from 'lucide-react'
import { PixelTrail } from '@/components/ui/pixel-trail'

/* ─── B) Social proof rotativo ─── */
const SOCIAL_PROOFS = [
  { text: 'Restaurante en Providencia solicitó diagnóstico', time: 'hace 3 min' },
  { text: 'Barbería en Viña del Mar se unió', time: 'hace 12 min' },
  { text: 'Tienda en CDMX activó automatización', time: 'hace 18 min' },
  { text: 'Café en Miraflores contrató SEO', time: 'hace 25 min' },
]

const WA_DIAG =
  'https://wa.me/56929709420?text=Hola%2C%20quiero%20mi%20diagn%C3%B3stico%20gratuito%20con%20Mastexo.'

/* ─── Counter animation ─── */
function useCountUp(ref: React.RefObject<HTMLSpanElement | null>, target: string) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const prefix = target.startsWith('+') ? '+' : ''
    const suffix = target.endsWith('%') ? '%' : target.endsWith('x') ? 'x' : ''
    const num = parseInt(target.replace(/[^0-9]/g, ''), 10)
    let start = 0
    const duration = 1800
    const step = 16
    const increment = num / (duration / step)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const timer = setInterval(() => {
          start += increment
          if (start >= num) {
            el.textContent = `${prefix}${num}${suffix}`
            clearInterval(timer)
          } else {
            el.textContent = `${prefix}${Math.floor(start)}${suffix}`
          }
        }, step)
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ref, target])
}

function StatItem({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  useCountUp(ref, value)
  return (
    <div className="flex flex-col items-center gap-1">
      <span
        ref={ref}
        className="font-[family-name:var(--font-space-grotesk)] text-2xl sm:text-3xl font-bold text-[#7C3AED]"
      >
        {value}
      </span>
      <span className="text-xs text-[#888888] text-center leading-tight">{label}</span>
    </div>
  )
}

/* ─── Dashboard Mockup ─── */
function DashboardMockup() {
  const metrics = [
    { icon: Users, label: 'Clientes nuevos', value: '+12', sub: 'esta semana', pct: 78 },
    { icon: TrendingUp, label: 'ROI campaña', value: '4.2×', sub: 'vs. mes anterior', pct: 84 },
    { icon: ShoppingCart, label: 'Reservas', value: '+147', sub: 'este mes', pct: 62 },
  ]

  return (
    <div
      className="relative rounded-2xl overflow-hidden border border-[#2A2A2A] bg-[#1A1A1A] shadow-[0_0_60px_rgba(124,58,237,0.15)]"
      aria-hidden
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#2A2A2A] bg-[#111111]">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7C3AED] animate-pulse" />
          <span className="text-xs font-semibold text-white font-[family-name:var(--font-space-grotesk)]">
            Dashboard Mastexo
          </span>
        </div>
        <span className="text-[10px] text-[#888888] bg-[#1A1A1A] border border-[#2A2A2A] px-2 py-0.5 rounded-full">
          En vivo
        </span>
      </div>

      {/* Metrics */}
      <div className="p-5 flex flex-col gap-4">
        {metrics.map(({ icon: Icon, label, value, sub, pct }) => (
          <div key={label} className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[rgba(124,58,237,0.12)] flex items-center justify-center">
                  <Icon size={14} className="text-[#7C3AED]" />
                </div>
                <div>
                  <p className="text-xs text-[#888888]">{label}</p>
                  <p className="text-xs text-[#555555]">{sub}</p>
                </div>
              </div>
              <span className="font-[family-name:var(--font-space-grotesk)] text-base font-bold text-white">
                {value}
              </span>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 bg-[#2A2A2A] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#7C3AED] rounded-full"
                style={{ width: `${pct}%`, transition: 'width 1.2s ease' }}
              />
            </div>
          </div>
        ))}

        {/* Mini separator */}
        <div className="h-px bg-[#2A2A2A] my-1" />

        {/* Bottom row */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#555555]">Actualizado hace 2 min</span>
          <span className="text-[11px] text-[#7C3AED] font-medium cursor-pointer hover:text-[#A78BFA]">
            Ver reporte →
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── B) Social proof rotativo ─── */
function SocialProofPopup() {
  const [visible, setVisible] = useState(false)
  const [index, setIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => {
    const run = (idx: number, show: boolean, delay: number) => {
      timerRef.current = setTimeout(() => {
        if (show) {
          setIndex(idx)
          setVisible(true)
          run(idx, false, 4000) // hide after 4s
        } else {
          setVisible(false)
          run((idx + 1) % SOCIAL_PROOFS.length, true, 4000) // next after 4s gap
        }
      }, delay)
    }
    run(0, true, 3000) // first popup after 3s
    return () => clearTimeout(timerRef.current)
  }, [])

  if (!visible) return null
  const proof = SOCIAL_PROOFS[index]

  return (
    <div
      className="fixed bottom-20 left-4 sm:bottom-8 sm:left-6 z-40 flex items-center gap-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-4 py-3 shadow-xl max-w-[300px]"
      style={{ animation: 'slideUp 0.4s ease forwards' }}
      aria-live="polite"
    >
      <span className="text-base flex-shrink-0">🟢</span>
      <div>
        <p className="text-xs font-medium text-white leading-tight">{proof.text}</p>
        <p className="text-[10px] text-[#888888] mt-0.5">{proof.time}</p>
      </div>
    </div>
  )
}

const STATS = [
  { value: '+85', label: 'negocios en LATAM' },
  { value: '14', label: 'días al primer cliente' },
  { value: '3x', label: 'reservas promedio' },
  { value: '98%', label: 'satisfacción' },
]

export default function Hero() {
  return (
    <>
      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes badgePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>

      <section
        id="inicio"
        className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#111111] pt-16"
      >
        {/* Grid background */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(124,58,237,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124,58,237,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Radial glow */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(124,58,237,0.18) 0%, transparent 70%)',
          }}
        />

        {/* Pixel trail interactivo */}
        <PixelTrail
          pixelSize={60}
          fadeDuration={800}
          delay={0}
          pixelClassName="rounded-full"
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 pb-10 sm:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left column */}
            <div className="flex flex-col gap-7">
              {/* Badge animado */}
              <div className="inline-flex items-center gap-2 self-start bg-[rgba(124,58,237,0.12)] border border-[rgba(124,58,237,0.3)] rounded-full px-4 py-1.5">
                <span
                  className="w-2 h-2 rounded-full bg-[#7C3AED] flex-shrink-0"
                  style={{ animation: 'badgePulse 2s ease-in-out infinite' }}
                  aria-hidden
                />
                <span className="text-[13px] font-medium text-[#A78BFA] whitespace-nowrap">
                  +85 negocios ya confían en Mastexo · LATAM
                </span>
              </div>

              {/* Headline 3 líneas */}
              <h1 className="font-[family-name:var(--font-space-grotesk)] text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.06] tracking-tight text-white">
                Mientras lees esto,
                <br />
                tu competencia
                <br />
                <span
                  style={{
                    background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  ya vende online.
                </span>
              </h1>

              {/* Subtítulo */}
              <p className="text-lg text-[#888888] leading-relaxed max-w-lg">
                Sitios web, automatización, SEO y seguridad para pymes en Chile y LATAM.
                Sin tecnicismos. Con resultados.
              </p>

              {/* CTAs */}
              <div className="flex flex-col gap-3 items-start">
                <div className="flex flex-col sm:flex-row gap-3 items-start">
                  <a
                    href={WA_DIAG}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary text-base px-7 py-3.5 shadow-[0_0_40px_rgba(124,58,237,0.35)]"
                  >
                    <MessageCircle size={18} />
                    Quiero más clientes
                    <ArrowRight size={16} />
                  </a>
                  <a href="#resultados" className="btn-outline text-base px-7 py-3.5">
                    Ver casos reales
                  </a>
                </div>
                {/* C) Trigger escasez */}
                <p
                  className="text-xs font-medium text-amber-400"
                  style={{ animation: 'badgePulse 2.5s ease-in-out infinite' }}
                >
                  ⚡ Solo quedan 3 diagnósticos gratuitos esta semana
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4 pt-2 border-t border-[#2A2A2A]">
                {STATS.map((s) => (
                  <StatItem key={s.label} {...s} />
                ))}
              </div>
            </div>

            {/* Right column — Dashboard mockup */}
            <div className="hidden lg:block">
              <DashboardMockup />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-28 pointer-events-none"
          style={{ background: 'linear-gradient(to top, #111111, transparent)' }}
        />
      </section>

      {/* B) Social proof rotativo */}
      <SocialProofPopup />
    </>
  )
}
