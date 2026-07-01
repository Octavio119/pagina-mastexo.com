import { MessageSquare, Lightbulb, Users, TrendingUp, Rocket, Handshake } from 'lucide-react'

const STEPS = [
  {
    number: '01',
    icon: MessageSquare,
    title: 'Cuéntanos tu negocio',
    description: 'Diagnóstico gratuito: analizamos tu situación, competidores y oportunidades sin costo ni compromiso.',
  },
  {
    number: '02',
    icon: Lightbulb,
    title: 'Diseñamos la solución',
    description: 'Creamos un plan a medida — sitio web, automatizaciones y SEO según lo que necesita tu negocio específico.',
  },
  {
    number: '03',
    icon: Users,
    title: 'Primeros clientes',
    description: 'Lanzamos y activamos los canales de captación. Los primeros clientes llegan en promedio en 14 días.',
  },
  {
    number: '04',
    icon: TrendingUp,
    title: 'Optimizamos',
    description: 'Analizamos los datos reales del negocio y ajustamos estrategia para maximizar conversiones.',
  },
  {
    number: '05',
    icon: Rocket,
    title: 'Escalamos',
    description: 'Con la base funcionando, escalamos: más tráfico, más automatización, más mercados.',
  },
  {
    number: '06',
    icon: Handshake,
    title: 'Socios a largo plazo',
    description: 'No somos proveedores, somos tu equipo digital. Crecemos contigo sin contratos forzados.',
  },
]

export default function Process() {
  return (
    <section id="proceso" className="bg-[#111111] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="brand-badge mb-4 inline-flex">Cómo trabajamos</span>
          <h2 className="section-heading mt-4">
            Simple, rápido,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              sin complicaciones
            </span>
          </h2>
          <p className="mt-4 text-[#888888] text-lg max-w-xl mx-auto">
            Un proceso probado con +85 negocios en Chile y LATAM. De cero a clientes en 14 días.
          </p>
        </div>

        {/* Grid 3×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STEPS.map(({ number, icon: Icon, title, description }) => (
            <div
              key={number}
              className="card-dark p-6 flex flex-col gap-4 group cursor-default h-full hover:-translate-y-0.5 transition-transform duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-[#7C3AED] leading-none">
                  {number}
                </span>
                <div className="w-9 h-9 rounded-lg bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] flex items-center justify-center transition-colors duration-200 group-hover:bg-[rgba(124,58,237,0.2)]">
                  <Icon size={17} className="text-[#7C3AED]" />
                </div>
              </div>

              <div>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-base font-semibold text-white mb-2">
                  {title}
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="https://wa.me/56929709420?text=Hola%2C%20quiero%20mi%20diagn%C3%B3stico%20gratuito%20con%20Mastexo."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-3.5"
          >
            Empezar con diagnóstico gratis
          </a>
        </div>
      </div>
    </section>
  )
}
