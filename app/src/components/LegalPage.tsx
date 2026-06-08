import Link from 'next/link'

interface Section {
  id: string
  title: string
}

interface LegalPageProps {
  title: string
  lastUpdated: string
  sections: Section[]
  children: React.ReactNode
}

export default function LegalPage({ title, lastUpdated, sections, children }: LegalPageProps) {
  return (
    <>
      {/* Hero */}
      <div className="border-b border-[#2A2A2A] bg-[#0D0D0D] px-4 pt-16 pb-12 sm:pt-20 sm:pb-14">
        <div className="mx-auto max-w-5xl">
          <nav aria-label="Miga de pan" className="mb-6 flex items-center gap-1.5 text-xs text-[#555555]">
            <Link href="/" className="transition-colors hover:text-[#7C3AED]">Inicio</Link>
            <span>›</span>
            <span className="text-[#888888]">Legal</span>
            <span>›</span>
            <span className="text-[#A78BFA]">{title}</span>
          </nav>
          <span className="mb-4 inline-flex items-center rounded-full border border-[#7C3AED]/40 bg-[#7C3AED]/10 px-3 py-1 text-xs font-medium text-[#A78BFA]">
            Actualizado: {lastUpdated}
          </span>
          <h1 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-bold text-white sm:text-4xl">
            {title}
          </h1>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:py-16">
        <div className="lg:grid lg:grid-cols-[220px_1fr] lg:gap-12">

          {/* TOC — sticky en desktop */}
          <nav aria-label="Índice de contenidos" className="mb-10 lg:mb-0">
            <div className="lg:sticky lg:top-24">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#555555]">
                Contenido
              </p>
              <ul className="space-y-2.5">
                {sections.map(({ id, title: sectionTitle }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className="block border-l border-[#2A2A2A] pl-3 text-sm leading-snug text-[#888888] transition-all duration-200 hover:border-[#7C3AED] hover:text-[#A78BFA]"
                    >
                      {sectionTitle}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          {/* Contenido principal */}
          <div className="min-w-0 space-y-8">
            {children}
          </div>
        </div>

        {/* Volver */}
        <div className="mt-16 border-t border-[#2A2A2A] pt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-[#2A2A2A] px-5 py-2.5 text-sm text-[#888888] transition-all duration-200 hover:border-[#7C3AED] hover:text-white"
          >
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </>
  )
}
