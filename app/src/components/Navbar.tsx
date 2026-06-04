'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Servicios',  href: '/#servicios' },
  { label: 'Proceso',    href: '/#proceso' },
  { label: 'Resultados', href: '/#resultados' },
  { label: 'Nosotros',   href: '/#nosotros' },
  { label: 'Contacto',   href: '/#contacto' },
]

const WA_DIAG =
  'https://wa.me/56929709420?text=Hola%2C%20quiero%20mi%20diagn%C3%B3stico%20gratuito%20con%20Mastexo.'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    // Run once on mount in case page loads already scrolled
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
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
        <nav
          className="hidden md:flex items-center gap-6 lg:gap-8"
          aria-label="Navegación principal"
        >
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-base font-medium text-gray-300 hover:text-white transition-colors duration-200 whitespace-nowrap px-1 py-2"
              style={scrolled ? { textShadow: '0 1px 3px rgba(0,0,0,0.6)' } : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* D) Reciprocidad — guía gratuita */}
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
        <div className="md:hidden bg-[#1A1A1A] border-t border-[#2A2A2A] px-4 pb-6 pt-4 flex flex-col gap-3">
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-gray-300 hover:text-white transition-colors duration-200 py-2 px-1 cursor-pointer"
            >
              {label}
            </Link>
          ))}
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
