import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Search, CheckCircle, ArrowRight, MapPin, TrendingUp, Star } from 'lucide-react'

export const metadata: Metadata = {
  title: 'SEO Local para Negocios en Chile — Mastexo Digital',
  description: 'Posicionamiento en Google Maps y búsquedas locales para pymes en Chile y LATAM. Aparece primero cuando buscan lo que vendes.',
}

const FEATURES = [
  'Optimización de Google Maps (perfil GMB)',
  'Palabras clave locales estratégicas',
  'Construcción de reseñas en Google',
  'SEO on-page completo',
  'Link building local',
  'Reportes mensuales de posicionamiento',
  'Optimización de velocidad web',
  'Schema markup para negocios locales',
]

const RESULTS = [
  { icon: MapPin, title: 'Google Maps Top 3', desc: 'Aparece en el mapa cuando alguien busca tu tipo de negocio en tu ciudad.' },
  { icon: TrendingUp, title: 'Tráfico orgánico', desc: 'Visitas que llegan gratis desde Google, sin pagar por cada clic.' },
  { icon: Star, title: 'Reseñas estratégicas', desc: 'Sistema para conseguir más reseñas positivas y gestionarlas.' },
  { icon: Search, title: 'Palabras clave locales', desc: 'Optimización específica para búsquedas de tu ciudad y zona.' },
]

export default function SeoPage() {
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
            <Search size={28} className="text-[#7C3AED]" />
          </div>
          <span className="brand-badge mb-5 inline-flex">SEO Local</span>
          <h1 className="section-heading mt-4 mb-6">
            Cuando buscan lo que vendes en Google,
            <br />
            <span style={{ background: 'linear-gradient(135deg,#7C3AED,#A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              que te encuentren a ti.
            </span>
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto mb-10">
            Posicionamos tu negocio en Google Maps y resultados locales para que los clientes de tu zona te encuentren primero.
          </p>
          <a href="https://wa.me/56929709420?text=Quiero%20posicionarme%20en%20Google%20con%20Mastexo." target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-3.5">
            Quiero aparecer en Google <ArrowRight size={16} />
          </a>
        </section>

        {/* Results */}
        <section className="py-20 px-4 sm:px-6 border-t border-[#2A2A2A]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white text-center mb-12">
              Qué conseguimos para tu negocio
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              {RESULTS.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="card-dark p-7 flex gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[rgba(124,58,237,0.12)] border border-[rgba(124,58,237,0.2)] flex items-center justify-center flex-shrink-0">
                    <Icon size={20} className="text-[#7C3AED]" />
                  </div>
                  <div>
                    <h3 className="font-[family-name:var(--font-space-grotesk)] font-semibold text-white mb-1">{title}</h3>
                    <p className="text-sm text-[#888888] leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

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

        {/* CTA */}
        <section className="py-20 px-4 sm:px-6 border-t border-[#2A2A2A] text-center">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white mb-4">Empieza a posicionarte hoy</h2>
          <p className="text-[#888888] mb-8">Auditoría gratuita de tu SEO local · Sin compromiso</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/56929709420?text=Quiero%20mejorar%20mi%20SEO%20local." target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-3.5">Hablar por WhatsApp</a>
            <Link href="/#contacto" className="btn-outline px-8 py-3.5">Formulario de contacto</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
