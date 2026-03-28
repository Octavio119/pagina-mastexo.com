"use client";

import { motion } from "framer-motion";

interface Props {
  onOpenModal: () => void;
}

const benefits = [
  {
    icon: "📈",
    title: "Más clientes",
    description:
      "Atraemos personas que ya están buscando lo que ofreces. No seguidores. Clientes reales.",
    highlight: "hasta 3× más reservas",
  },
  {
    icon: "⏱️",
    title: "Más tiempo",
    description:
      "Automatizamos lo que te quita tiempo: publicaciones, anuncios, respuestas. Tú te enfocas en tu negocio.",
    highlight: "8+ horas semanales libres",
  },
  {
    icon: "✅",
    title: "Menos complicaciones",
    description:
      "No necesitas saber de marketing ni tecnología. Nosotros manejamos todo. Tú ves los resultados.",
    highlight: "0 herramientas que aprender",
  },
];

export default function BenefitsSection({ onOpenModal }: Props) {
  return (
    <section className="w-full bg-[#050505] py-24 border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="mb-3 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A853]">
            <span className="block h-px w-7 bg-[#D4A853]" />
            Por qué Mastexo
            <span className="block h-px w-7 bg-[#D4A853]" />
          </p>
          <h2
            className="text-3xl md:text-5xl font-light text-white leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Todo lo que necesitas{" "}
            <em className="italic text-[#D4A853]">para crecer.</em>
          </h2>
          <p className="mt-4 text-white/55 text-base max-w-md mx-auto">
            Exactamente lo que tu negocio necesita para atraer más clientes, sin complicar tu vida.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-white/5">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group flex flex-col gap-5 bg-[#0a0a0a] p-8 transition-colors hover:bg-[#0f0f0f]"
            >
              <span className="text-3xl">{b.icon}</span>
              <div>
                <h3
                  className="text-xl font-light text-white mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {b.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {b.description}
                </p>
              </div>
              <div className="mt-auto">
                <span className="inline-block border border-[#D4A853]/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-[#D4A853]">
                  {b.highlight}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-col items-center gap-4 text-center"
        >
          <p
            className="text-2xl md:text-3xl font-light text-white"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Esto es exactamente lo que necesitas para{" "}
            <em className="italic text-[#D4A853]">hacer crecer tu negocio.</em>
          </p>
          <button
            onClick={onOpenModal}
            className="mt-4 inline-flex items-center gap-2 bg-[#D4A853] px-10 py-4 text-[13px] font-bold uppercase tracking-[0.14em] text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E8C87A] hover:shadow-[0_12px_40px_rgba(212,168,83,0.4)] cursor-pointer"
          >
            Diagnóstico gratuito — Empieza hoy →
          </button>
          <p className="text-[10px] text-white/25 uppercase tracking-widest">
            85+ negocios ya confían en Mastexo · Sin costo · Sin compromiso
          </p>
        </motion.div>

      </div>
    </section>
  );
}
