'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ArrowRight, MessageCircle } from 'lucide-react'

/* ═══════════════════════ DATA ═══════════════════════ */

const WA = 'https://wa.me/56929709420?text=Vi%20los%20resultados%20de%20clientes%20de%20Mastexo%20y%20quiero%20un%20diagn%C3%B3stico%20gratis.'

const CLIENTS = [
  {
    id: 'barberia',
    emoji: '✂️',
    name: 'Barbería Ali',
    location: 'Santiago',
    metrics: [
      { label: 'Clientes nuevos',  value: '847',   change: '+214%', suffix: ''  },
      { label: 'Reservas este mes', value: '312',   change: '+180%', suffix: ''  },
      { label: 'Tasa conversión',  value: '68',    change: '+45%',  suffix: '%' },
      { label: 'ROI campaña',      value: '3.2',   change: '',      suffix: '×' },
    ],
    chartData: [22, 28, 35, 41, 52, 63, 74, 85, 95, 106, 114, 118],
    activity: [
      { event: 'Nueva reserva — corte + barba',     time: 'hace 2 min' },
      { event: 'Lead WhatsApp — precio corte',       time: 'hace 8 min' },
      { event: 'Reseña Google ★★★★★',              time: 'hace 15 min' },
      { event: 'Reserva confirmada — decoloración',  time: 'hace 23 min' },
      { event: 'Nueva reserva — corte clásico',      time: 'hace 31 min' },
    ],
    testimonial: {
      quote: 'Antes luchaba para llenar la agenda. Ahora tengo lista de espera. En 60 días triplicamos las reservas y seguimos creciendo sin parar.',
      name: 'Ali Hassan',
      role: 'Dueño, Barbería Ali',
      initials: 'AH',
    },
  },
  {
    id: 'campo',
    emoji: '🍽️',
    name: 'Casa de Campo',
    location: 'Mostazal',
    metrics: [
      { label: 'Clientes nuevos',  value: '1240',  change: '+300%', suffix: ''  },
      { label: 'Reservas este mes', value: '486',   change: '+280%', suffix: ''  },
      { label: 'Tasa conversión',  value: '72',    change: '+60%',  suffix: '%' },
      { label: 'ROI campaña',      value: '4.1',   change: '',      suffix: '×' },
    ],
    chartData: [30, 42, 58, 72, 95, 118, 145, 168, 190, 220, 245, 263],
    activity: [
      { event: 'Reserva grupo 12 personas',          time: 'hace 1 min' },
      { event: 'Consulta disponibilidad fin semana', time: 'hace 6 min' },
      { event: 'Reseña Google ★★★★★',              time: 'hace 11 min' },
      { event: 'Pago reserva recibido',              time: 'hace 19 min' },
      { event: 'Nueva reserva — almuerzo familiar',  time: 'hace 28 min' },
    ],
    testimonial: {
      quote: 'Con Mastexo pasamos de 30 reservas al mes a más de 480. El sitio web y Google Maps lo cambiaron todo. Ya no dependemos del boca a boca.',
      name: 'Carmen Morales',
      role: 'Dueña, Casa de Campo',
      initials: 'CM',
    },
  },
  {
    id: 'cafe',
    emoji: '☕',
    name: 'Café Central',
    location: 'Las Condes',
    metrics: [
      { label: 'Clientes nuevos',  value: '2100',  change: '+195%', suffix: ''  },
      { label: 'Reservas este mes', value: '890',   change: '+210%', suffix: ''  },
      { label: 'Tasa conversión',  value: '61',    change: '+38%',  suffix: '%' },
      { label: 'ROI campaña',      value: '4.2',   change: '',      suffix: '×' },
    ],
    chartData: [50, 68, 88, 110, 138, 162, 195, 228, 260, 295, 330, 365],
    activity: [
      { event: 'Pedido online — café + pastel',      time: 'hace 1 min' },
      { event: 'Lead WhatsApp — pedido corporativo', time: 'hace 5 min' },
      { event: 'Reseña Google ★★★★★',              time: 'hace 9 min' },
      { event: 'Reserva mesa para 4',               time: 'hace 14 min' },
      { event: 'Pago recibido — catering evento',   time: 'hace 22 min' },
    ],
    testimonial: {
      quote: 'El ROI de 4.2× en los primeros 90 días lo dice todo. Mastexo no solo diseñó el sitio — nos ayudó a vender más desde el día uno.',
      name: 'Diego Vega',
      role: 'Gerente, Café Central',
      initials: 'DV',
    },
  },
]

const BEFORE_AFTER = [
  { before: 'Sin presencia web',      after: 'Sitio profesional activo' },
  { before: '0 reservas online',      after: '300+ reservas / mes' },
  { before: 'Sin automatización',     after: 'Bot WhatsApp 24/7' },
  { before: 'Sin métricas',           after: 'Dashboard en tiempo real' },
  { before: 'Clientes solo por boca a boca', after: 'SEO + Google Maps activos' },
]

/* ═══════════════════════ HOOKS ═══════════════════════ */

function useCountUp(target: string, run: boolean) {
  const [display, setDisplay] = useState('0')
  const rafRef = useRef<number>(0)

  useEffect(() => {
    if (!run) return
    const isDecimal = target.includes('.')
    const suffix = target.endsWith('%') ? '%' : target.endsWith('×') ? '×' : ''
    const raw = parseFloat(target.replace(/[^0-9.]/g, ''))
    if (isNaN(raw)) { setDisplay(target); return }

    const duration = 1400
    const start = performance.now()

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const cur = eased * raw
      const formatted = (isDecimal ? cur.toFixed(1) : Math.round(cur).toLocaleString()) + suffix
      setDisplay(formatted)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setDisplay((isDecimal ? raw.toFixed(1) : raw.toLocaleString()) + suffix)
      }
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [target, run])

  return display
}

/* ═══════════════════════ COMPONENTS ═══════════════════════ */

function MetricCard({
  label, value, change, suffix, run,
}: {
  label: string; value: string; change: string; suffix: string; run: boolean
}) {
  const display = useCountUp(value + suffix, run)

  return (
    <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-5 flex flex-col gap-2 hover:border-[#7C3AED] transition-colors duration-200">
      <p className="text-xs text-[#888888] uppercase tracking-wide">{label}</p>
      <p className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white">
        {display}
      </p>
      {change && (
        <span className="text-xs font-semibold text-[#7C3AED] bg-[rgba(124,58,237,0.1)] px-2 py-0.5 rounded-full self-start">
          {change}
        </span>
      )}
    </div>
  )
}

function LineChart({ data }: { data: number[] }) {
  const W = 600
  const H = 180
  const PX = 24
  const PY = 16

  const max = Math.max(...data)
  const pts = data.map((v, i) => ({
    x: PX + (i / (data.length - 1)) * (W - 2 * PX),
    y: H - PY - (v / max) * (H - 2 * PY),
  }))

  let line = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const cpX = pts[i - 1].x + (pts[i].x - pts[i - 1].x) / 2
    line += ` C ${cpX} ${pts[i - 1].y} ${cpX} ${pts[i].y} ${pts[i].x} ${pts[i].y}`
  }
  const area = `${line} L ${pts[pts.length - 1].x} ${H - PY} L ${pts[0].x} ${H - PY} Z`

  // X-axis labels
  const xLabels = ['S1','S2','S3','S4','S5','S6','S7','S8','S9','S10','S11','S12']

  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${W} ${H + 24}`} className="w-full" aria-hidden>
        <defs>
          <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((t) => {
          const y = H - PY - t * (H - 2 * PY)
          return (
            <line key={t} x1={PX} x2={W - PX} y1={y} y2={y}
              stroke="#2A2A2A" strokeWidth="1" />
          )
        })}

        {/* Area fill */}
        <path d={area} fill="url(#chartFill)" />

        {/* Line */}
        <path d={line} fill="none" stroke="#7C3AED" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round" />

        {/* Data points */}
        {pts.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5"
            fill="#7C3AED" stroke="#111111" strokeWidth="1.5" />
        ))}

        {/* X labels */}
        {pts.map((p, i) => (
          <text key={i} x={p.x} y={H + 16} textAnchor="middle"
            fontSize="10" fill="#555555" fontFamily="Inter, sans-serif">
            {xLabels[i]}
          </text>
        ))}
      </svg>
    </div>
  )
}

function ActivityFeed({ items }: { items: { event: string; time: string }[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map(({ event, time }, i) => (
        <div key={i} className="flex items-center gap-3">
          <span
            className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"
            style={{ animation: `pulse 2s ease-in-out ${i * 0.4}s infinite` }}
            aria-hidden
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#888888] truncate">{event}</p>
          </div>
          <span className="text-xs text-[#555555] flex-shrink-0 whitespace-nowrap">{time}</span>
        </div>
      ))}
    </div>
  )
}

/* ═══════════════════════ PAGE ═══════════════════════ */

export default function ResultadosPage() {
  const [activeId, setActiveId] = useState('barberia')
  const [visible, setVisible] = useState(true)
  const [countRun, setCountRun] = useState(false)

  const client = CLIENTS.find((c) => c.id === activeId) ?? CLIENTS[0]

  const switchClient = useCallback((id: string) => {
    if (id === activeId) return
    setVisible(false)
    setCountRun(false)
    setTimeout(() => {
      setActiveId(id)
      setVisible(true)
      setTimeout(() => setCountRun(true), 80)
    }, 220)
  }, [activeId])

  // Start count-up on first load
  useEffect(() => {
    const t = setTimeout(() => setCountRun(true), 300)
    return () => clearTimeout(t)
  }, [])

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <Navbar />

      <main className="bg-[#111111] min-h-screen">

        {/* ── HERO HEADER ── */}
        <section className="pt-32 pb-14 px-4 sm:px-6 max-w-6xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#888888] hover:text-[#7C3AED] transition-colors duration-200 mb-8">
            ← Volver al inicio
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <span className="brand-badge mb-4 inline-flex">
                <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"
                  style={{ animation: 'pulse 2s ease-in-out infinite' }} />
                Datos actualizados en tiempo real
              </span>
              <h1 className="section-heading mt-3">
                Resultados reales
                <br />
                <span style={{ background: 'linear-gradient(135deg,#7C3AED,#A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  de nuestros clientes
                </span>
              </h1>
              <p className="mt-4 text-[#888888] text-lg">
                Selecciona un negocio para ver su dashboard completo.
              </p>
            </div>

            {/* Client tabs */}
            <div className="flex flex-wrap gap-2">
              {CLIENTS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => switchClient(c.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                    activeId === c.id
                      ? 'bg-[#7C3AED] text-white border border-[#5B21B6]'
                      : 'bg-[#1A1A1A] text-[#888888] border border-[#2A2A2A] hover:border-[#7C3AED] hover:text-white'
                  }`}
                >
                  <span>{c.emoji}</span>
                  <span className="font-[family-name:var(--font-space-grotesk)]">{c.name}</span>
                  <span className="text-xs opacity-60">· {c.location}</span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── MAIN DASHBOARD ── */}
        <section
          className="px-4 sm:px-6 max-w-6xl mx-auto pb-24"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'none' : 'translateY(8px)',
            transition: 'opacity 0.22s ease, transform 0.22s ease',
          }}
        >
          {/* Client header */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-4xl">{client.emoji}</span>
            <div>
              <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
                {client.name}
              </h2>
              <p className="text-[#888888] text-sm">{client.location} · Cliente Mastexo</p>
            </div>
          </div>

          {/* ── Metric cards ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {client.metrics.map((m) => (
              <MetricCard key={m.label + activeId} {...m} run={countRun} />
            ))}
          </div>

          {/* ── Chart + Activity (2 cols) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Chart */}
            <div className="lg:col-span-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-white">
                    Curva de crecimiento
                  </h3>
                  <p className="text-xs text-[#888888] mt-0.5">Reservas por semana · últimas 12 semanas</p>
                </div>
                <span className="text-xs text-[#7C3AED] bg-[rgba(124,58,237,0.1)] px-3 py-1 rounded-full font-medium">
                  +{Math.round(((client.chartData[11] - client.chartData[0]) / client.chartData[0]) * 100)}%
                </span>
              </div>
              <LineChart data={client.chartData} />
            </div>

            {/* Activity feed */}
            <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-6">
              <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-white mb-5">
                Actividad reciente
              </h3>
              <ActivityFeed items={client.activity} />

              {/* Services badges */}
              <div className="mt-6 pt-5 border-t border-[#2A2A2A]">
                <p className="text-xs text-[#555555] mb-3 uppercase tracking-widest">
                  Servicios activos
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Sitio Web', 'Automatización', 'SEO', 'Seguridad'].map((s) => (
                    <span
                      key={s}
                      className="text-[11px] font-medium text-[#7C3AED] bg-[rgba(124,58,237,0.08)] border border-[rgba(124,58,237,0.25)] px-2.5 py-1 rounded-full"
                    >
                      {s} ✓
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Before / After ── */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8 mb-8">
            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white text-center mb-8">
              La transformación de {client.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Before */}
              <div>
                <p className="text-xs font-semibold text-[#555555] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-6 h-px bg-[#2A2A2A] inline-block" />
                  Antes — sin Mastexo
                  <span className="w-6 h-px bg-[#2A2A2A] inline-block" />
                </p>
                <div className="flex flex-col gap-3">
                  {BEFORE_AFTER.map(({ before }) => (
                    <div key={before} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#2A2A2A] flex items-center justify-center text-[#555555] text-xs flex-shrink-0">✕</span>
                      <span className="text-sm text-[#555555]">{before}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* After */}
              <div>
                <p className="text-xs font-semibold text-[#7C3AED] uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-6 h-px bg-[#7C3AED]/30 inline-block" />
                  Después — con Mastexo
                  <span className="w-6 h-px bg-[#7C3AED]/30 inline-block" />
                </p>
                <div className="flex flex-col gap-3">
                  {BEFORE_AFTER.map(({ after }) => (
                    <div key={after} className="flex items-center gap-3">
                      <span className="w-5 h-5 rounded-full bg-[rgba(124,58,237,0.15)] flex items-center justify-center text-[#7C3AED] text-xs flex-shrink-0">✓</span>
                      <span className="text-sm text-white">{after}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Testimonial ── */}
          <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl p-8">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="w-14 h-14 rounded-full bg-[#7C3AED] flex items-center justify-center flex-shrink-0">
                <span className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">
                  {client.testimonial.initials}
                </span>
              </div>
              <div>
                <p className="text-white text-lg leading-relaxed mb-4">
                  &ldquo;{client.testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-[family-name:var(--font-space-grotesk)] font-semibold text-white text-sm">
                    {client.testimonial.name}
                  </p>
                  <p className="text-[#888888] text-xs">{client.testimonial.role}</p>
                </div>
                <div className="flex gap-0.5 mt-2" aria-label="5 estrellas">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-amber-400 text-sm">★</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="bg-[#7C3AED] py-20 px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Quieres este dashboard para tu negocio?
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Primer cliente en 14 días. Sin contratos. Cancela cuando quieras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#7C3AED] font-[family-name:var(--font-space-grotesk)] font-bold text-base px-8 py-4 rounded-full hover:bg-white/90 transition-colors duration-200 cursor-pointer"
              >
                <MessageCircle size={18} />
                Solicitar diagnóstico gratis →
              </a>
              <Link
                href="/#contacto"
                className="inline-flex items-center justify-center gap-2 bg-transparent border-2 border-white/40 hover:border-white text-white font-semibold text-base px-8 py-4 rounded-full transition-colors duration-200"
              >
                Formulario de contacto
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
