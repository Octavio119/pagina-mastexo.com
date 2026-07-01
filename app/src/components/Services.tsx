import { Monitor, Zap, Search, Shield } from 'lucide-react'

const SERVICES = [
  {
    icon: Monitor,
    title: 'Sitios Web',
    description:
      'No vendemos sitios bonitos. Vendemos máquinas de captar clientes. Cada elemento está diseñado para convertir visitas en reservas, pedidos y contactos.',
    features: ['Diseño personalizado', 'Reservas online', 'Carga < 2 segundos', 'Dominio + hosting'],
    href: '#contacto',
  },
  {
    icon: Zap,
    title: 'Automatización',
    description:
      'Tu WhatsApp atendiendo clientes a las 2am mientras duermes. CRM, seguimientos y recordatorios en piloto automático.',
    features: ['WhatsApp Business 24/7', 'CRM inteligente', 'Seguimiento automático', 'Reportes diarios'],
    href: '#contacto',
  },
  {
    icon: Search,
    title: 'SEO Local',
    description:
      'Cuando alguien busca lo que vendes en Google, que te encuentre a ti. No a tu competencia.',
    features: ['Google Maps top 3', 'Palabras clave locales', 'Reseñas estratégicas', 'Reporte mensual'],
    href: '#contacto',
  },
  {
    icon: Shield,
    title: 'Seguridad Web',
    description:
      'Las pymes son el blanco favorito de los hackers. El 60% cierra dentro del año tras un ciberataque. Nosotros te protegemos.',
    features: ['SSL + firewall activo', 'Backups diarios', 'Monitoreo 24/7', 'Respuesta < 1 hora'],
    href: '#contacto',
  },
]

export default function Services() {
  return (
    <section id="servicios" className="bg-[#111111] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="brand-badge mb-4 inline-flex">Qué hacemos</span>
          <h2 className="section-heading mt-4">
            Todo lo que necesita tu negocio{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              para crecer
            </span>
          </h2>
          <p className="mt-4 text-[#888888] text-lg max-w-xl mx-auto">
            Soluciones digitales completas para pymes que quieren resultados reales, no promesas.
          </p>
        </div>

        {/* Grid 2×2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES.map(({ icon: Icon, title, description, features, href }) => (
            <div
              key={title}
              className="card-dark p-7 flex flex-col gap-5 group cursor-default h-full hover:-translate-y-0.5 transition-transform duration-200"
            >
              <div className="w-12 h-12 rounded-xl bg-[rgba(124,58,237,0.1)] border border-[rgba(124,58,237,0.2)] flex items-center justify-center transition-colors duration-200 group-hover:bg-[rgba(124,58,237,0.2)]">
                <Icon size={22} className="text-[#7C3AED]" />
              </div>

              <div className="flex-1">
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mb-3">
                  {title}
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed">{description}</p>
              </div>

              <ul className="flex flex-col gap-2">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-xs text-[#888888]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C3AED] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={href}
                className="text-sm font-medium text-[#7C3AED] hover:text-[#A78BFA] transition-colors duration-200 flex items-center gap-1 cursor-pointer mt-1"
              >
                Ver más →
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <a
            href="https://wa.me/56929709420?text=Hola%2C%20quiero%20saber%20m%C3%A1s%20sobre%20los%20servicios%20de%20Mastexo."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-3.5"
          >
            Quiero empezar hoy
          </a>
        </div>
      </div>
    </section>
  )
}
