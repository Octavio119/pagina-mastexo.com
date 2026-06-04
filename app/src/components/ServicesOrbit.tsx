'use client'

import Link from 'next/link'
import { PixelTrail } from '@/components/ui/pixel-trail'

export default function ServicesOrbit() {
  return (
    <section className="relative bg-[#111111] py-14 sm:py-20 overflow-hidden">
      {/* Pixel trail interactivo de fondo */}
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
          <p className="mt-5 text-gray-400 text-xl max-w-[600px] mx-auto leading-relaxed">
            Cuatro servicios que trabajan juntos para que crezcas online sin complicaciones,
            sin tecnicismos, con resultados reales.
          </p>
        </div>

        {/* ── Desktop orbit ── */}
        <div className="hidden lg:flex items-center justify-center">
          <div className="relative w-[640px] h-[500px]">

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
                  <span className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white">
                    MX
                  </span>
                </div>
                <p className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white tracking-wide">
                  MASTE<span className="text-[#7C3AED]">X</span>O
                </p>
                <p className="text-xs text-[#888888]">Agencia Digital · LATAM</p>
              </div>
            </div>

            {/* TOP — Sitios Web · float-1 · 3s */}
            <Link
              href="/servicios/sitios-web"
              className="orbit-circle absolute left-1/2 top-0 -translate-x-1/2 -translate-y-4 w-36 h-36 rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer bg-[#7C3AED] border-2 border-[#5B21B6] text-white"
              style={{ animationName: 'float-1', animationDuration: '3s', animationDelay: '0s' }}
            >
              <span className="text-sm font-semibold font-[family-name:var(--font-space-grotesk)] text-center leading-tight px-2">
                Sitios Web
              </span>
              <span className="text-xs opacity-75">→</span>
            </Link>

            {/* RIGHT — Automatización · float-2 · 4s */}
            <Link
              href="/servicios/automatizacion"
              className="orbit-circle absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-36 h-36 rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer bg-[#1A1A1A] border-2 border-[#7C3AED] text-white"
              style={{ animationName: 'float-2', animationDuration: '4s', animationDelay: '0.3s' }}
            >
              <span className="text-sm font-semibold font-[family-name:var(--font-space-grotesk)] text-center leading-tight px-2">
                Automatización
              </span>
              <span className="text-xs text-[#7C3AED]">→</span>
            </Link>

            {/* BOTTOM — Seguridad · float-4 · 4.5s */}
            <Link
              href="/servicios/seguridad"
              className="orbit-circle absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-4 w-36 h-36 rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer bg-[#7C3AED] border-2 border-[#5B21B6] text-white"
              style={{ animationName: 'float-4', animationDuration: '4.5s', animationDelay: '0.6s' }}
            >
              <span className="text-sm font-semibold font-[family-name:var(--font-space-grotesk)] text-center leading-tight px-2">
                Seguridad
              </span>
              <span className="text-xs opacity-75">→</span>
            </Link>

            {/* LEFT — SEO · float-3 · 3.5s */}
            <Link
              href="/servicios/seo"
              className="orbit-circle absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-36 h-36 rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer bg-[#1A1A1A] border-2 border-[#7C3AED] text-white"
              style={{ animationName: 'float-3', animationDuration: '3.5s', animationDelay: '0.9s' }}
            >
              <span className="text-sm font-semibold font-[family-name:var(--font-space-grotesk)] text-center leading-tight px-2">
                SEO Local
              </span>
              <span className="text-xs text-[#7C3AED]">→</span>
            </Link>
          </div>
        </div>

        {/* ── Mobile — 2×2 grid ── */}
        <div className="lg:hidden">
          <div className="flex flex-col items-center gap-2 mb-10">
            <div className="w-16 h-16 rounded-xl bg-[#7C3AED] flex items-center justify-center shadow-[0_0_30px_rgba(124,58,237,0.3)]">
              <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">
                MX
              </span>
            </div>
            <p className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">
              MASTE<span className="text-[#7C3AED]">X</span>O
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Sitios Web',     href: '/servicios/sitios-web',    purple: true,  anim: 'float-1', dur: '3s' },
              { label: 'Automatización', href: '/servicios/automatizacion', purple: false, anim: 'float-2', dur: '4s' },
              { label: 'Seguridad',      href: '/servicios/seguridad',      purple: true,  anim: 'float-4', dur: '4.5s' },
              { label: 'SEO Local',      href: '/servicios/seo',            purple: false, anim: 'float-3', dur: '3.5s' },
            ].map(({ label, href, purple, anim, dur }) => (
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
                <span className="text-sm font-semibold font-[family-name:var(--font-space-grotesk)]">
                  {label}
                </span>
                <span className={`text-xs ${purple ? 'opacity-75' : 'text-[#7C3AED]'}`}>→</span>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a href="#contacto" className="btn-primary text-base px-8 py-3.5">
            Ver todos los servicios
          </a>
        </div>
      </div>
    </section>
  )
}
