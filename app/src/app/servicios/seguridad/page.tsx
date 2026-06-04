import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Shield, CheckCircle, ArrowRight, Lock, Eye, RefreshCw } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Seguridad Web para Pymes — Mastexo Digital',
  description: 'Protegemos tu sitio web con SSL, firewall, backups y monitoreo 24/7. El 60% de las pymes atacadas cierra en un año.',
}

const FEATURES = [
  'Certificado SSL (HTTPS) instalado',
  'Firewall de aplicaciones web (WAF)',
  'Backups automáticos diarios',
  'Monitoreo 24/7 de disponibilidad',
  'Respuesta a incidentes en < 1 hora',
  'Escaneo de malware semanal',
  'Actualizaciones de seguridad automáticas',
  'Reporte mensual de seguridad',
]

const PROTECTIONS = [
  { icon: Lock, title: 'SSL + HTTPS', desc: 'Encriptación de datos entre tu sitio y tus clientes. Obligatorio para confianza y SEO.' },
  { icon: Shield, title: 'Firewall activo', desc: 'Bloquea ataques de fuerza bruta, inyecciones SQL y otras amenazas en tiempo real.' },
  { icon: RefreshCw, title: 'Backups diarios', desc: 'Copia de seguridad diaria automática. Restauración en menos de 30 minutos.' },
  { icon: Eye, title: 'Monitoreo 24/7', desc: 'Te avisamos antes de que sepas que hay un problema. Uptime garantizado.' },
]

export default function SeguridadPage() {
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
            <Shield size={28} className="text-[#7C3AED]" />
          </div>
          <span className="brand-badge mb-5 inline-flex">Seguridad Web</span>
          <h1 className="section-heading mt-4 mb-6">
            Las pymes son el blanco favorito.
            <br />
            <span style={{ background: 'linear-gradient(135deg,#7C3AED,#A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              El 60% cierra tras un hackeo.
            </span>
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto mb-10">
            No esperes a ser atacado para protegerte. Implementamos seguridad profesional para que tu negocio esté siempre disponible y protegido.
          </p>
          <a href="https://wa.me/56929709420?text=Quiero%20proteger%20mi%20sitio%20web%20con%20Mastexo." target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-3.5">
            Proteger mi negocio <ArrowRight size={16} />
          </a>
        </section>

        {/* Protections */}
        <section className="py-20 px-4 sm:px-6 border-t border-[#2A2A2A]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white text-center mb-12">
              Cómo te protegemos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              {PROTECTIONS.map(({ icon: Icon, title, desc }) => (
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
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white mb-4">Protege tu negocio ahora</h2>
          <p className="text-[#888888] mb-8">Auditoría de seguridad gratuita · Respuesta en 2 horas</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/56929709420?text=Quiero%20la%20auditor%C3%ADa%20de%20seguridad%20gratuita." target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-3.5">Hablar por WhatsApp</a>
            <Link href="/#contacto" className="btn-outline px-8 py-3.5">Formulario de contacto</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
