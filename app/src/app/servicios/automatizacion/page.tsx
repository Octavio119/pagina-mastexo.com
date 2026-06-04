import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Zap, CheckCircle, ArrowRight, Bot, MessageSquare, Bell } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Automatización Digital para Negocios — Mastexo Digital',
  description: 'Automatizamos WhatsApp, CRM, reservas y seguimiento de clientes para pymes en Chile y LATAM. Tu negocio funcionando solo 24/7.',
}

const FEATURES = [
  'WhatsApp Business automatizado 24/7',
  'CRM con seguimiento de clientes',
  'Recordatorios automáticos de citas',
  'Respuestas inteligentes a preguntas frecuentes',
  'Pipeline de ventas automático',
  'Notificaciones por pedidos y reservas',
  'Reportes diarios por WhatsApp',
  'Integración con tu sitio web',
]

const AUTOMATIONS = [
  { icon: MessageSquare, title: 'WhatsApp Bot', desc: 'Responde preguntas, toma pedidos y agenda citas a las 3am sin que nadie esté despierto.' },
  { icon: Bot, title: 'CRM Inteligente', desc: 'Registra cada cliente, su historial y el estado de su compra. Todo en un solo lugar.' },
  { icon: Bell, title: 'Recordatorios', desc: 'Reduce las inasistencias con recordatorios automáticos de citas por WhatsApp.' },
  { icon: Zap, title: 'Flujos de ventas', desc: 'Nurtura a tus prospectos automáticamente hasta que están listos para comprar.' },
]

export default function AutomatizacionPage() {
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
            <Zap size={28} className="text-[#7C3AED]" />
          </div>
          <span className="brand-badge mb-5 inline-flex">Automatización</span>
          <h1 className="section-heading mt-4 mb-6">
            Tu WhatsApp atendiendo clientes
            <br />
            <span style={{ background: 'linear-gradient(135deg,#7C3AED,#A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              a las 2am mientras duermes.
            </span>
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto mb-10">
            Automatizamos los procesos repetitivos de tu negocio para que puedas enfocarte en lo que importa: crecer.
          </p>
          <a href="https://wa.me/56929709420?text=Quiero%20automatizar%20mi%20negocio%20con%20Mastexo." target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-3.5">
            Quiero automatizar mi negocio <ArrowRight size={16} />
          </a>
        </section>

        {/* Automations */}
        <section className="py-20 px-4 sm:px-6 border-t border-[#2A2A2A]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white text-center mb-12">
              Qué automatizamos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              {AUTOMATIONS.map(({ icon: Icon, title, desc }) => (
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

            <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-semibold text-white text-center mb-8">Todo incluido</h3>
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
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white mb-4">Tu negocio, funcionando solo</h2>
          <p className="text-[#888888] mb-8">Diagnóstico gratuito · Implementación en 7 días · Sin contratos</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/56929709420?text=Quiero%20automatizar%20mi%20negocio." target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-3.5">Hablar por WhatsApp</a>
            <Link href="/#contacto" className="btn-outline px-8 py-3.5">Formulario de contacto</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
