import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Smartphone, TrendingUp, Pen, BarChart2, CheckCircle, ArrowRight, Megaphone, ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Meta Ads para Pymes Chile | Mastexo Digital',
  description: 'Campañas de Facebook e Instagram para negocios chilenos. Gestión profesional de pauta, diseño de anuncios y reportes mensuales.',
}

const INCLUDES = [
  {
    icon: Smartphone,
    title: 'Campañas Facebook e Instagram',
    desc: 'Creamos y lanzamos campañas orientadas a resultados: ventas, leads, tráfico o reconocimiento. Segmentamos tu audiencia ideal en Chile y LATAM.',
  },
  {
    icon: TrendingUp,
    title: 'Gestión de presupuesto publicitario',
    desc: 'Administramos tu inversión publicitaria para maximizar el retorno. Sin presupuesto desperdiciado: cada peso trabaja para atraer clientes.',
  },
  {
    icon: Pen,
    title: 'Creación de anuncios (copy + diseño)',
    desc: 'Producimos los textos y piezas visuales de cada anuncio, adaptados al formato de cada plataforma y al comportamiento de tu audiencia.',
  },
  {
    icon: BarChart2,
    title: 'Reportes de rendimiento',
    desc: 'Cada mes recibes un reporte claro con métricas reales: alcance, clics, costo por lead y retorno sobre inversión.',
  },
]

const FOR_WHOM = [
  'Pymes que quieren clientes nuevos cada mes',
  'Negocios locales en Chile que ya tienen producto pero no saben cómo llegar a más personas',
  'Emprendedores que han intentado pautar solos y han perdido dinero',
  'Empresas que quieren escalar ventas sin depender solo del boca a boca',
]

const STEPS = [
  { n: '01', title: 'Diagnóstico', desc: 'Analizamos tu negocio, competencia y audiencia objetivo.' },
  { n: '02', title: 'Estrategia',  desc: 'Definimos objetivos, presupuesto y tipos de campaña.' },
  { n: '03', title: 'Producción',  desc: 'Creamos los anuncios: copy, imágenes y segmentación.' },
  { n: '04', title: 'Optimización', desc: 'Monitoreamos y ajustamos semana a semana para mejorar resultados.' },
]

const FAQS = [
  {
    q: '¿Cuánto presupuesto mínimo necesito para Meta Ads?',
    a: 'Recomendamos partir desde $150.000 CLP mensuales en pauta. Nosotros cobramos aparte por la gestión.',
  },
  {
    q: '¿Cuánto tiempo tarda en verse resultados?',
    a: 'Los primeros datos llegan en 72 horas. Resultados optimizados se ven entre la semana 2 y 4.',
  },
  {
    q: '¿Necesito tener página web para hacer Meta Ads?',
    a: 'Sí, es altamente recomendable. Si no tienes, podemos construirte una antes de lanzar la campaña.',
  },
  {
    q: '¿Ustedes crean los diseños de los anuncios?',
    a: 'Sí, incluimos copy y diseño visual en todos nuestros planes.',
  },
]

const WA = 'https://wa.me/56929709420?text=Quiero%20m%C3%A1s%20clientes%20con%20Meta%20Ads%20en%20Mastexo.'

export default function MetaAdsPage() {
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
            <Megaphone size={28} className="text-[#7C3AED]" />
          </div>
          <span className="brand-badge mb-5 inline-flex">Meta Ads</span>
          <h1 className="section-heading mt-4 mb-6">
            Meta Ads que generan
            <br />
            <span style={{ background: 'linear-gradient(135deg,#7C3AED,#A78BFA)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              clientes reales.
            </span>
          </h1>
          <p className="text-[#888888] text-lg max-w-2xl mx-auto mb-10">
            Campañas en Facebook e Instagram diseñadas para pymes chilenas que quieren vender más, no solo tener likes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary text-base px-8 py-3.5">
              Quiero más clientes <ArrowRight size={16} />
            </a>
            <Link href="/resultados" className="btn-outline text-base px-8 py-3.5">
              Ver resultados →
            </Link>
          </div>
        </section>

        {/* ¿Qué incluye? */}
        <section className="py-20 px-4 sm:px-6 border-t border-[#2A2A2A]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white text-center mb-12">
              ¿Qué incluye?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {INCLUDES.map(({ icon: Icon, title, desc }) => (
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
          </div>
        </section>

        {/* ¿Para quién es? */}
        <section className="py-20 px-4 sm:px-6 border-t border-[#2A2A2A]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white text-center mb-12">
              ¿Para quién es?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {FOR_WHOM.map(f => (
                <div key={f} className="flex items-start gap-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl px-5 py-4">
                  <CheckCircle size={18} className="text-[#7C3AED] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#888888] leading-relaxed">{f}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Proceso en 4 pasos */}
        <section className="py-20 px-4 sm:px-6 border-t border-[#2A2A2A]">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white text-center mb-12">
              Proceso en 4 pasos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map(({ n, title, desc }) => (
                <div key={n} className="card-dark p-6 flex flex-col gap-3">
                  <span className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-[#7C3AED]/30 leading-none">
                    {n}
                  </span>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] font-bold text-white">{title}</h3>
                  <p className="text-sm text-[#888888] leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-20 px-4 sm:px-6 border-t border-[#2A2A2A]">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-white text-center mb-12">
              Preguntas frecuentes
            </h2>
            <div className="flex flex-col gap-3">
              {FAQS.map(({ q, a }) => (
                <details key={q} className="group border border-[#2A2A2A] rounded-xl overflow-hidden bg-[#1A1A1A]">
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer text-white font-semibold font-[family-name:var(--font-space-grotesk)] text-sm select-none list-none hover:bg-[#222222] transition-colors duration-200">
                    {q}
                    <ChevronDown size={16} className="flex-shrink-0 text-[#7C3AED] transition-transform duration-200 group-open:rotate-180" />
                  </summary>
                  <div className="px-5 pb-5 pt-3 text-sm text-[#888888] leading-relaxed border-t border-[#2A2A2A]">
                    {a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA final */}
        <section className="py-20 px-4 sm:px-6 border-t border-[#2A2A2A] text-center">
          <h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white mb-4">
            ¿Listo para conseguir clientes con Meta Ads?
          </h2>
          <p className="text-[#888888] mb-8 max-w-xl mx-auto">
            Cuéntanos sobre tu negocio y te mostramos cómo podríamos ayudarte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-primary px-8 py-3.5">
              Solicitar diagnóstico gratis <ArrowRight size={16} />
            </a>
            <Link href="/#contacto" className="btn-outline px-8 py-3.5">Formulario de contacto</Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
