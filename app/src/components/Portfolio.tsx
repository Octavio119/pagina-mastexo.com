'use client'

import { useState, useEffect } from 'react'

// E) Recompensa variable — cada carga muestra métricas levemente distintas
const RESULT_VARIANTS: Record<string, string[]> = {
  'Barbería Ali':       ['+214%', '+217%', '+211%', '+219%'],
  'Casa de Campo':      ['3×', '3.1×', '2.9×', '3×'],
  'Food Truck La Ruta': ['24/7', '24/7', '24/7', '24/7'],
  'Café Central':       ['4.2×', '4.3×', '4.1×', '4.4×'],
}

function useVariantIndex() {
  const [idx, setIdx] = useState(0)
  useEffect(() => { setIdx(Math.floor(Math.random() * 4)) }, [])
  return idx
}

const CASES = [
  {
    emoji: '✂️',
    category: 'Barbería',
    name: 'Barbería Ali',
    result: '+214%',
    metric: 'reservas en 60 días',
    description:
      'Rediseño web, agenda online y campaña en Instagram. En 60 días triplicaron su cartera de clientes sin bajar precios.',
    tags: ['Sitio web', 'Agenda online', 'Instagram Ads'],
    siteHref: '#',
    caseHref: '#contacto',
  },
  {
    emoji: '🏡',
    category: 'Turismo',
    name: 'Casa de Campo',
    result: '3×',
    metric: 'reservas en el mes 1',
    description:
      'SEO local en Google Maps y reservas online. Triplicaron sus reservas el primer mes sin pagar publicidad.',
    tags: ['SEO local', 'Reservas online', 'Google Maps'],
    siteHref: '#',
    caseHref: '#contacto',
  },
  {
    emoji: '🚚',
    category: 'Gastronomía',
    name: 'Food Truck La Ruta',
    result: '24/7',
    metric: 'pedidos automatizados',
    description:
      'WhatsApp Bot + menú digital. Reciben pedidos a cualquier hora sin levantar el teléfono. Ingresos nocturnos que antes no existían.',
    tags: ['WhatsApp Bot', 'Menú digital', 'Automatización'],
    siteHref: '#',
    caseHref: '#contacto',
  },
  {
    emoji: '☕',
    category: 'Cafetería',
    name: 'Café Central',
    result: '4.2×',
    metric: 'ROI en anuncios',
    description:
      'Rediseño + SEO + Meta Ads generaron un ROI de 4.2× en 90 días. El negocio más buscado del barrio en Google.',
    tags: ['Meta Ads', 'SEO', 'Rediseño web'],
    siteHref: '#',
    caseHref: '#contacto',
  },
]

export default function Portfolio() {
  const varIdx = useVariantIndex()

  return (
    <section id="resultados" className="bg-[#111111] py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="brand-badge mb-4 inline-flex">Resultados</span>
          <h2 className="section-heading mt-4">
            Negocios reales,{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #7C3AED 0%, #A78BFA 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              resultados reales
            </span>
          </h2>
          <p className="mt-4 text-[#888888] text-lg max-w-xl mx-auto">
            Pymes de Chile que confiaron en Mastexo y transformaron su presencia digital.
          </p>
        </div>

        {/* Grid 2×2 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CASES.map(({ emoji, category, name, result: baseResult, metric, description, tags, siteHref, caseHref }) => {
            // E: resultado varía ligeramente en cada carga
            const result = RESULT_VARIANTS[name]?.[varIdx] ?? baseResult
            return (
            <div
              key={name}
              className="card-dark p-7 flex flex-col gap-4 group cursor-default h-full hover:-translate-y-0.5 transition-transform duration-200"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-medium text-[#7C3AED] uppercase tracking-widest">
                    {category}
                  </span>
                  <h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-white mt-0.5">
                    {name}
                  </h3>
                </div>
                <span className="text-3xl flex-shrink-0" role="img" aria-label={category}>
                  {emoji}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-[family-name:var(--font-space-grotesk)] text-4xl font-bold text-[#7C3AED]">
                  {result}
                </span>
                <span className="text-sm text-[#888888]">{metric}</span>
              </div>

              <p className="text-[#888888] text-sm leading-relaxed flex-1">{description}</p>

              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full bg-[#1F1F1F] border border-[#2A2A2A] text-[#888888]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-1">
                <a
                  href={caseHref}
                  className="inline-flex items-center gap-1 bg-[#7C3AED] hover:bg-[#5B21B6] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer"
                >
                  Ver caso →
                </a>
                <a
                  href={siteHref}
                  className="inline-flex items-center gap-1 border border-[#2A2A2A] hover:border-[#7C3AED] text-[#888888] hover:text-white text-xs font-medium px-4 py-2 rounded-full transition-colors duration-200 cursor-pointer"
                >
                  Ver sitio
                </a>
              </div>
            </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-[#888888] mb-5 text-sm">
            ¿Tu negocio puede ser el próximo caso de éxito?
          </p>
          <a
            href="https://wa.me/56929709420?text=Hola%2C%20quiero%20ver%20c%C3%B3mo%20Mastexo%20puede%20ayudar%20a%20mi%20negocio."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary text-base px-8 py-3.5"
          >
            Habla con nosotros
          </a>
        </div>
      </div>
    </section>
  )
}
