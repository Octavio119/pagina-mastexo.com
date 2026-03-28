"use client";

import { motion } from "framer-motion";

interface Props {
  onOpenModal: () => void;
}

const steps = [
  {
    number: "01",
    title: "Cuéntanos tu negocio",
    description: "Completa el diagnóstico gratuito en 2 minutos. Nos dices qué tipo de negocio tienes y qué quieres mejorar.",
    icon: "💬",
  },
  {
    number: "02",
    title: "Diseñamos la solución",
    description: "Creamos una estrategia personalizada: redes sociales, publicidad, web o todo junto. Sin tecnicismos.",
    icon: "⚡",
  },
  {
    number: "03",
    title: "Empiezas a recibir clientes",
    description: "En 14 días tienes prospectos reales listos para comprar. Tú te encargas de tu negocio, nosotros del resto.",
    icon: "🚀",
  },
];

export default function ProcessSection({ onOpenModal }: Props) {
  return (
    <section id="proceso" className="w-full bg-[#0A0A0A] py-24 border-t border-white/5">
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
            Así funciona
            <span className="block h-px w-7 bg-[#D4A853]" />
          </p>
          <h2
            className="text-3xl md:text-5xl font-light text-white leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Simple, rápido,{" "}
            <em className="italic text-[#D4A853]">sin complicaciones.</em>
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-[calc(50%-0.5px)] top-0 bottom-0 w-px bg-gradient-to-b from-[#D4A853]/30 via-[#D4A853]/10 to-transparent hidden md:block" />

          <div className="flex flex-col gap-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                  <div
                    className={`flex items-center gap-3 mb-3 ${
                      i % 2 === 1 ? "md:justify-end" : ""
                    }`}
                  >
                    <span className="text-2xl">{step.icon}</span>
                    <span
                      className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A853]"
                    >
                      Paso {step.number}
                    </span>
                  </div>
                  <h3
                    className="text-2xl md:text-3xl font-light text-white mb-3"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.title}
                  </h3>
                  <p className="text-white/55 leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>

                {/* Center number */}
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center border border-[#D4A853]/30 bg-[#0A0A0A]">
                  <span
                    className="text-xl font-light text-[#D4A853]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {step.number}
                  </span>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex flex-col items-center gap-3"
        >
          <button
            onClick={onOpenModal}
            className="inline-flex items-center gap-2 bg-[#D4A853] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E8C87A] hover:shadow-[0_8px_28px_rgba(212,168,83,0.3)] cursor-pointer"
          >
            Empezar ahora — es gratis →
          </button>
          <p className="text-[10px] text-white/30 uppercase tracking-widest">
            Sin tarjeta · Sin contratos · Cancela cuando quieras
          </p>
        </motion.div>

      </div>
    </section>
  );
}
