'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Megaphone, Monitor, Zap, Search, Shield } from 'lucide-react'

const SERVICES_ITEMS = [
  { label: 'Sitios Web',     href: '/servicios/sitios-web',    desc: 'Diseño web profesional',          icon: Monitor   },
  { label: 'Automatización', href: '/servicios/automatizacion', desc: 'Procesos automáticos 24/7',       icon: Zap       },
  { label: 'SEO Local',      href: '/servicios/seo',            desc: 'Posicionamiento en Google',       icon: Search    },
  { label: 'Seguridad Web',  href: '/servicios/seguridad',      desc: 'Protección digital',              icon: Shield    },
  { label: 'Meta Ads',       href: '/servicios/meta-ads',       desc: 'Campañas Facebook e Instagram',   icon: Megaphone },
]

const NAV_LINKS = [
  { label: 'Proceso',    href: '/#proceso' },
  { label: 'Resultados', href: '/resultados', hardNav: true },
  { label: 'Nosotros',   href: '/#nosotros' },
  { label: 'Contacto',   href: '/#contacto' },
]

const WA_DIAG =
  'https://wa.me/56929709420?text=Hola%2C%20quiero%20mi%20diagn%C3%B3stico%20gratuito%20con%20Mastexo.'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  /* Cierra el dropdown al hacer click fuera */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#111111]/95 backdrop-blur-md border-b border-[#2A2A2A]'
          : 'bg-gradient-to-b from-[#111111]/70 to-transparent'
      }`}
    >
      <div
        className={`max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-6 transition-all duration-300 ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex-shrink-0 hover:opacity-90 transition-opacity"
          aria-label="Mastexo Digital — Inicio"
        >
          <span className="font-[family-name:var(--font-space-grotesk)] font-bold text-xl text-white tracking-wide">
            MASTE<span className="text-[#7C3AED]">X</span>O
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Navegación principal">

          {/* Dropdown Servicios */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
          >
            <button
              onClick={() => setServicesOpen(v => !v)}
              className="flex items-center gap-1 text-base font-medium text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap px-1 py-2 cursor-pointer"
              style={scrolled ? { textShadow: '0 1px 3px rgba(0,0,0,0.6)' } : undefined}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Servicios
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {servicesOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] overflow-hidden">
                {SERVICES_ITEMS.map(({ label, href, desc, icon: Icon }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setServicesOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#2A2A2A] transition-colors duration-150 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[rgba(124,58,237,0.12)] border border-[rgba(124,58,237,0.2)] flex items-center justify-center flex-shrink-0 group-hover:bg-[rgba(124,58,237,0.2)] transition-colors">
                      <Icon size={14} className="text-[#7C3AED]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white leading-tight">{label}</p>
                      <p className="text-xs text-[#555555]">{desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Resto de links */}
          {NAV_LINKS.map(({ label, href, hardNav }) =>
            hardNav ? (
              <a
                key={href}
                href={href}
                className="text-base font-medium text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap px-1 py-2"
                style={scrolled ? { textShadow: '0 1px 3px rgba(0,0,0,0.6)' } : undefined}
              >
                {label}
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                className="text-base font-medium text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap px-1 py-2"
                style={scrolled ? { textShadow: '0 1px 3px rgba(0,0,0,0.6)' } : undefined}
              >
                {label}
              </Link>
            )
          )}
        </nav>

        {/* Guía gratuita */}
        <Link
          href="/guia-gratuita"
          className="hidden lg:inline-flex items-center gap-1 text-sm text-[#A78BFA] hover:text-white transition-colors duration-200 whitespace-nowrap flex-shrink-0 border border-[rgba(124,58,237,0.3)] px-3 py-1.5 rounded-full hover:border-[#7C3AED]"
        >
          Guía gratis →
        </Link>

        {/* CTA desktop */}
        <a
          href={WA_DIAG}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center gap-2 bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-base font-semibold px-6 py-3 rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap flex-shrink-0"
        >
          Diagnóstico gratis
        </a>

        {/* Hamburger */}
        <button
          className="md:hidden text-white p-2 cursor-pointer flex-shrink-0"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[#1A1A1A] border-t border-[#2A2A2A] px-4 pb-6 pt-4 flex flex-col gap-1">

          {/* Servicios toggle */}
          <button
            onClick={() => setMobileServicesOpen(v => !v)}
            className="flex items-center justify-between w-full text-base font-medium text-gray-300 hover:text-white transition-colors duration-200 py-2 px-1 cursor-pointer"
          >
            Servicios
            <ChevronDown size={14} className={`transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
          </button>

          {mobileServicesOpen && (
            <div className="ml-3 mb-1 border-l border-[#2A2A2A] pl-3 flex flex-col gap-1">
              {SERVICES_ITEMS.map(({ label, href, desc }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => { setOpen(false); setMobileServicesOpen(false) }}
                  className="py-2 px-1"
                >
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-[#555555]">{desc}</p>
                </Link>
              ))}
            </div>
          )}

          {NAV_LINKS.map(({ label, href, hardNav }) =>
            hardNav ? (
              <a
                key={href}
                href={href}
                className="text-base font-medium text-gray-300 hover:text-white transition-colors duration-200 py-2 px-1 cursor-pointer"
              >
                {label}
              </a>
            ) : (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-gray-300 hover:text-white transition-colors duration-200 py-2 px-1 cursor-pointer"
              >
                {label}
              </Link>
            )
          )}

          <a
            href={WA_DIAG}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="btn-primary mt-2 justify-center text-base"
          >
            Diagnóstico gratis
          </a>
        </div>
      )}
    </header>
  )
}
