const VALUES = [
  {
    title: 'Resultados sin excusas',
    desc: 'No cobramos por hacer, cobramos por resultados. Si no crecen, no ganamos.',
    dark: true,
  },
  {
    title: 'Proximidad real',
    desc: 'Somos el equipo de al lado, no una agencia lejana que responde tickets.',
    dark: false,
  },
  {
    title: 'Tecnología para todos',
    desc: 'Herramientas de enterprise al alcance de cualquier pyme de Chile y LATAM.',
    dark: false,
  },
  {
    title: 'Transparencia total',
    desc: 'Métricas claras, precios claros, sin letra pequeña. Siempre.',
    dark: true,
  },
]

const TEAM = [
  { initials: 'OD', name: 'Octavio D.', role: 'Fundador & Estrategia' },
  { initials: 'ML', name: 'M. López', role: 'Diseño & UX' },
  { initials: 'JR', name: 'J. Rodríguez', role: 'Automatización' },
]

export default function Nosotros() {
  return (
    <section id="nosotros" className="bg-[#111111] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="brand-badge mb-4 inline-flex">Nosotros</span>
          <h2 className="section-heading mt-4">
            Una misión clara:
            <br />
            <span
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              democratizar lo digital
            </span>
          </h2>
          <p className="mt-5 text-[#888888] text-lg max-w-2xl mx-auto leading-relaxed">
            Que cualquier pyme en LATAM pueda competir digitalmente con las grandes empresas.
            Sin necesitar un equipo técnico propio. Sin inversiones millonarias.
          </p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {VALUES.map(({ title, desc, dark }) => (
            <div
              key={title}
              className={`rounded-xl p-7 flex flex-col gap-3 ${
                dark
                  ? 'bg-[#7C3AED] border border-[#5B21B6]'
                  : 'bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#7C3AED]'
              } transition-colors duration-200`}
            >
              <h3 className="font-[family-name:var(--font-space-grotesk)] text-lg font-bold text-white">
                {title}
              </h3>
              <p className={`text-sm leading-relaxed ${dark ? 'text-white/80' : 'text-[#888888]'}`}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="text-center mb-6">
          <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-semibold text-white">
            El equipo detrás de Mastexo
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TEAM.map(({ initials, name, role }) => (
            <div key={name} className="card-dark p-7 flex flex-col items-center gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-[#7C3AED] flex items-center justify-center">
                <span className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white">
                  {initials}
                </span>
              </div>
              <div>
                <p className="font-[family-name:var(--font-space-grotesk)] font-semibold text-white">
                  {name}
                </p>
                <p className="text-sm text-[#888888] mt-0.5">{role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
