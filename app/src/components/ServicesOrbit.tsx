'use client'

import Link from 'next/link'
import { PixelTrail } from '@/components/ui/pixel-trail'

/*
  Pentagon — 5 nodos a 72° de separación, radio 210px.
  Contenedor: 680×560. Centro: (340, 280).

  Ángulos desde las 12 (sentido horario):
    0°   → Sitios Web      (top)
   72°   → Automatización  (top-derecha)
  144°   → Meta Ads        (bottom-derecha)
  216°   → Seguridad       (bottom-izquierda)
  288°   → SEO Local       (top-izquierda)

  Cada nodo es w-36 h-36 (144×144px).
  top/left = centro_y − 72, centro_x − 72
*/
const ORBIT_NODES = [
  { label: 'Sitios Web',     href: '/servicios/sitios-web',    purple: true,  anim: 'float-1', dur: '3s',   delay: '0s',    style: { top: -2,  left: 268 } },
  { label: 'Automatización', href: '/servicios/automatizacion', purple: false, anim: 'float-2', dur: '4s',   delay: '0.3s',  style: { top: 143, left: 467 } },
  { label: 'Meta Ads',       href: '/servicios/meta-ads',       purple: true,  anim: 'float-3', dur: '3.8s', delay: '0.15s', style: { top: 378, left: 391 } },
  { label: 'Seguridad',      href: '/servicios/seguridad',      purple: false, anim: 'float-4', dur: '4.5s', delay: '0.6s',  style: { top: 378, left: 124 } },
  { label: 'SEO Local',      href: '/servicios/seo',            purple: true,  anim: 'float-1', dur: '3.2s', delay: '0.9s',  style: { top: 143, left: 68  } },
]

const MOBILE_NODES = [
  { label: 'Sitios Web',     href: '/servicios/sitios-web',    purple: true,  anim: 'float-1', dur: '3s'   },
  { label: 'Automatización', href: '/servicios/automatizacion', purple: false, anim: 'float-2', dur: '4s'   },
  { label: 'Meta Ads',       href: '/servicios/meta-ads',       purple: true,  anim: 'float-3', dur: '3.8s' },
  { label: 'Seguridad',      href: '/servicios/seguridad',      purple: false, anim: 'float-4', dur: '4.5s' },
  { label: 'SEO Local',      href: '/servicios/seo',            purple: true,  anim: 'float-1', dur: '3.2s' },
]

export default function ServicesOrbit() {
  return (
    <section className="relative bg-[#111111] py-8 overflow-hidden">
      <PixelTrail pixelSize={50} fadeDuration={900} delay={0} pixelClassName="rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="brand-badge mb-4 inline-flex">Nuestros servicios</span>
          <h2
            className="font-[family-name:var(--font-space-grotesk)] leading-[1.05] text-white mt-4"
            style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', fontWeight: 800 }}
          >
            Tu negocio necesita
            <br />
            <span className="text-[#7C3AED]">todo esto.</span>
          </h2>
        </div>

        {/* ── Desktop orbit — pentágono ── */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-[680px] h-[560px]">

            {/* Orbit ring decorativo */}
            <div
              className="absolute inset-0 m-auto rounded-full border border-[#2A2A2A]"
              style={{ width: 420, height: 420 }}
              aria-hidden
            />

            {/* CENTER */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3 z-10">
                <div className="w-20 h-20 rounded-2xl bg-[#7C3AED] flex items-center justify-center shadow-[0_0_40px_rgba(124,58,237,0.35)]">
                  <span className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white">MX</span>
                </div>
                <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white tracking-wide">
                  MASTE<span className="text-[#7C3AED]">X</span>O
                </p>
                <p className="text-xs text-[#888888]">Agencia Digital · LATAM</p>
              </div>
            </div>

            {/* Nodos del pentágono */}
            {ORBIT_NODES.map(({ label, href, purple, anim, dur, delay, style }) => (
              <Link
                key={label}
                href={href}
                className={`orbit-circle absolute w-36 h-36 rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer ${
                  purple
                    ? 'bg-[#7C3AED] border-2 border-[#5B21B6] text-white'
                    : 'bg-[#1A1A1A] border-2 border-[#7C3AED] text-white'
                }`}
                style={{
                  top: style.top,
                  left: style.left,
                  animationName: anim,
                  animationDuration: dur,
                  animationDelay: delay,
                }}
              >
                <span className="text-sm font-semibold font-[family-name:var(--font-space-grotesk)] text-center leading-tight px-2">
                  {label}
                </span>
                <span className={`text-xs ${purple ? 'opacity-75' : 'text-[#7C3AED]'}`}>→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Mobile — grid 2+2+1 ── */}
        <div className="lg:hidden">
          <div className="flex flex-col items-center gap-2 mb-10">
            <div className="w-16 h-16 rounded-xl bg-[#7C3AED] flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.3)]">
              <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">MX</span>
            </div>
            <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">
              MASTE<span className="text-[#7C3AED]">X</span>O
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {MOBILE_NODES.slice(0, 4).map(({ label, href, purple, anim, dur }) => (
              <Link
                key={label}
                href={href}
                className={`orbit-circle rounded-2xl p-5 flex flex-col items-center justify-center gap-2 text-center ${
                  purple
                    ? 'bg-[#7C3AED] border border-[#5B21B6] text-white'
                    : 'bg-[#1A1A1A] border border-[#7C3AED] text-white'
                }`}
                style={{ animationName: anim, animationDuration: dur }}
              >
                <span className="text-sm font-semibold font-[family-name:var(--font-space-grotesk)]">{label}</span>
                <span className={`text-xs ${purple ? 'opacity-75' : 'text-[#7C3AED]'}`}>→</span>
              </Link>
            ))}
          </div>

          {/* 5to nodo centrado */}
          <div className="flex justify-center mt-4">
            <Link
              href={MOBILE_NODES[4].href}
              className={`orbit-circle rounded-2xl p-5 flex flex-col items-center justify-center gap-2 text-center w-[calc(50%-8px)] ${
                MOBILE_NODES[4].purple
                  ? 'bg-[#7C3AED] border border-[#5B21B6] text-white'
                  : 'bg-[#1A1A1A] border border-[#7C3AED] text-white'
              }`}
              style={{ animationName: MOBILE_NODES[4].anim, animationDuration: MOBILE_NODES[4].dur }}
            >
              <span className="text-sm font-semibold font-[family-name:var(--font-space-grotesk)]">{MOBILE_NODES[4].label}</span>
              <span className={`text-xs ${MOBILE_NODES[4].purple ? 'opacity-75' : 'text-[#7C3AED]'}`}>→</span>
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}
