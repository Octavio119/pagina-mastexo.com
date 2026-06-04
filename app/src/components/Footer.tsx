'use client'

import Link from 'next/link'
import { useState, FormEvent } from 'react'

const WA = 'https://wa.me/56929709420?text=Hola%20Mastexo%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n.'
const IG = 'https://www.instagram.com/mastexo.digital'

const COLS = [
  {
    heading: 'Servicios',
    links: [
      { label: 'Sitios Web', href: '#servicios' },
      { label: 'Automatización', href: '#servicios' },
      { label: 'SEO Local', href: '#servicios' },
      { label: 'Seguridad Web', href: '#servicios' },
    ],
  },
  {
    heading: 'Empresa',
    links: [
      { label: 'Nosotros', href: '#nosotros' },
      { label: 'Proceso', href: '#proceso' },
      { label: 'Resultados', href: '#portfolio' },
      { label: 'Instagram', href: IG, external: true },
    ],
  },
  {
    heading: 'Contacto',
    links: [
      { label: 'Diagnóstico gratis', href: '#contacto' },
      { label: 'WhatsApp', href: WA, external: true },
      { label: 'contactos@mastexo.com', href: 'mailto:contactos@mastexo.com', external: true },
      { label: 'Privacidad', href: '/privacidad' },
    ],
  },
]

function IgIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

function WaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    setEmail('')
  }

  return (
    <div className="flex flex-col gap-3">
      <h4 className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold text-white uppercase tracking-widest">
        Redes
      </h4>
      <div className="flex items-center gap-3 mb-2">
        <a href={IG} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#888888] hover:text-[#7C3AED] hover:border-[#7C3AED] transition-colors duration-200 cursor-pointer">
          <IgIcon />
        </a>
        <a href={WA} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center text-[#888888] hover:text-[#25D366] hover:border-[#25D366] transition-colors duration-200 cursor-pointer">
          <WaIcon />
        </a>
      </div>

      {/* Newsletter */}
      <p className="text-xs text-[#555555]">Tips de marketing digital para pymes.</p>
      {sent ? (
        <p className="text-xs text-[#7C3AED] font-medium">¡Suscrito! 🎉</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
            className="flex-1 min-w-0 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg px-3 py-2 text-xs text-white placeholder:text-[#555555] focus:outline-none focus:border-[#7C3AED] transition-colors duration-200"
          />
          <button
            type="submit"
            className="bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors duration-200 cursor-pointer whitespace-nowrap"
          >
            Suscribir
          </button>
        </form>
      )}
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-[#2A2A2A] pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          {/* Col 1 — Brand (wider) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link
              href="/"
              aria-label="Mastexo Digital"
              className="hover:opacity-90 transition-opacity"
            >
              <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-xl text-white tracking-wide">
                MASTE<span className="text-[#7C3AED]">X</span>O
              </span>
            </Link>
            <p className="text-sm text-[#888888] leading-relaxed max-w-xs">
              Soluciones digitales para negocios que quieren crecer.{' '}
              <span className="text-[#555555]">Chile · LATAM.</span>
            </p>
            <div className="flex items-center gap-2 mt-1">
              {['Santiago', 'México', 'Buenos Aires'].map((city) => (
                <span
                  key={city}
                  className="text-[11px] text-[#555555] bg-[#1A1A1A] border border-[#2A2A2A] rounded-full px-2.5 py-0.5"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Cols 2–4 — Links */}
          {COLS.map(({ heading, links }) => (
            <div key={heading} className="flex flex-col gap-4">
              <h4 className="font-[family-name:var(--font-space-grotesk)] text-sm font-semibold text-white uppercase tracking-widest">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {links.map(({ label, href, external }) =>
                  external ? (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[#888888] hover:text-[#7C3AED] transition-colors duration-200 cursor-pointer"
                      >
                        {label}
                      </a>
                    </li>
                  ) : (
                    <li key={label}>
                      <Link href={href} className="text-sm text-[#888888] hover:text-[#7C3AED] transition-colors duration-200">
                        {label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}

          {/* Col 5 — Newsletter + Redes */}
          <Newsletter />
        </div>

        {/* Divider */}
        <div className="h-px bg-[#2A2A2A] mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#555555]">
          <p>© 2026 Mastexo Digital. Todos los derechos reservados.</p>
          <p>Chile · México · Argentina</p>
        </div>
      </div>
    </footer>
  )
}
