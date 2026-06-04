import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Monitor, CheckCircle, ArrowRight, Zap, Globe, ShoppingCart } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sitios Web para Pymes — Mastexo Digital',
  description: 'Diseño y desarrollo web para negocios en Chile y LATAM. Sitios rápidos, optimizados para SEO y diseñados para convertir visitas en clientes.',
}

const FEATURES = [
  'Diseño personalizado acorde a tu marca',
  'Carga en menos de 2 segundos',
  'Reservas o pedidos online integrados',
  'Optimizado para SEO desde el día uno',
  'Responsive — perfecto en móvil y desktop',
  'Dominio + hosting incluido el primer año',
  'Panel de administración simple',
  'Certificado SSL (seguridad HTTPS)',
]

const PLANS = [
  {
    name: 'Landing Page',
    price: 'Desde $290 USD',
    desc: 'Presencia digital básica pero efectiva. Una página con todo lo que necesitas para captar clientes.',
    features: ['1 página optimizada', 'Formulario de contacto', 'Google Maps', 'SEO básico', 'Dominio + hosting 1 año'],
    cta: 'Quiero mi landing',
    highlight: false,
  },
  {
    name: 'Sitio Completo',
    price: 'Desde $590 USD',
    desc: 'El sitio completo para tu negocio. Reservas, galería, blog y mucho más.',
    features: ['Hasta 6 páginas', 'Sistema de reservas', 'Blog / noticias', 'SEO avanzado', 'Integración WhatsApp', 'Dominio + hosting 1 año'],
    cta: 'Quiero mi sitio completo',
    highlight: true,
  },
  {
    name: 'E-commerce',
    price: 'Desde $990 USD',
    desc: 'Tu tienda online lista para vender. Catálogo, pagos y gestión de pedidos.',
    features: ['Productos ilimitados', 'Pago en línea', 'Gestión de inventario', 'Panel de administración', 'Integración WhatsApp', 'SEO para e-commerce'],
    cta: 'Quiero mi tienda',
    highlight: false,
  },
]

export default function SitiosWebPage() {
  return (
    <>
      <Navbar />
      <main className="bg-[#111111] min-h-screen">
        {/* Back */}
        <div className="pt-24 pb-0 px-4 sm:px-6 max-w-5xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-[#888888] hover:text-[#7C3AED] transition-colors duration-200">
            ← Volver al inicio
          </Link>
        </div>

        {/* Hero */}
        <section className="pt-8 pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center">
          <div className="w-16 h-16 rounded-2xl bg-[rgba(124,58,237,0.12)] border border-[rgba(124,58,237,0.3)] flex items-center justify-center mx-auto mb-6">
            <Monitor size={28} className="text-[#7C3AED]" />
          </div>
          <span className="brand-badge mb-5 inline-flex">Sitios Web</span>
          <h1 className="section-heading mt-4 mb-6">
            No vendemos sitios bonitos.
            <br />
            <span style={{ background: 'linear-gradient(135deg,#7C3AED,#A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Vendemos máquinas de captar clientes.
            </span>
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto mb-10">
            Cada elemento de tu sitio está diseñado con un objetivo: convertir visitantes en clientes. Nada más. Nada menos.
          </p>
          <a href="https://wa.me/56929709420?text=Hola%2C%20quiero%20un%20sitio%20web%20para%20mi%20negocio." target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-3.5">
            Quiero mi sitio web <ArrowRight size={16} />
          </a>
        </section>

        {/* Features */}
        <section className="py-20 px-4 sm:px-6 border-t border-[#2A2A2A]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white text-center mb-12">
              Todo incluido en cada proyecto
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FEATURES.map(f => (
                <div key={f} className="flex items-center gap-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-5 py-4">
                  <CheckCircle size={18} className="text-[#7C3AED] flex-shrink-0" />
                  <span className="text-sm text-[#888888]">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-20 px-4 sm:px-6 border-t border-[#2A2A2A]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white text-center mb-12">
              Planes y precios
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PLANS.map(({ name, price, desc, features, cta, highlight }) => (
                <div key={name} className={`rounded-2xl p-7 flex flex-col gap-5 ${highlight ? 'bg-[#7C3AED] border-2 border-[#5B21B6]' : 'bg-[#1A1A1A] border border-[#2A2A2A]'}`}>
                  <div>
                    <p className={`text-xs font-semibold uppercase tracking-widest mb-1 ${highlight ? 'text-white/70' : 'text-[#7C3AED]'}`}>{name}</p>
                    <p className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white">{price}</p>
                    <p className={`text-sm mt-2 ${highlight ? 'text-white/80' : 'text-[#888888]'}`}>{desc}</p>
                  </div>
                  <ul className="flex flex-col gap-2 flex-1">
                    {features.map(f => (
                      <li key={f} className="flex items-center gap-2 text-xs">
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${highlight ? 'bg-white' : 'bg-[#7C3AED]'}`} />
                        <span className={highlight ? 'text-white/90' : 'text-[#888888]'}>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="https://wa.me/56929709420" target="_blank" rel="noopener noreferrer" className={`text-sm font-semibold py-3 px-5 rounded-full text-center transition-colors duration-200 ${highlight ? 'bg-white text-[#7C3AED] hover:bg-white/90' : 'bg-[#7C3AED] text-white hover:bg-[#5B21B6]'}`}>
                    {cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 border-t border-[#2A2A2A] text-center">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white mb-4">¿Listo para tener tu sitio?</h2>
          <p className="text-[#888888] mb-8">Diagnóstico gratuito · Sin compromiso · Respuesta en 2 horas</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/56929709420?text=Quiero%20un%20sitio%20web%20para%20mi%20negocio." target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-3.5">Hablar por WhatsApp</a>
            <Link href="/#contacto" className="btn-outline px-8 py-3.5">Formulario de contacto</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
