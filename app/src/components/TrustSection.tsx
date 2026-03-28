"use client";

import { motion } from "framer-motion";

interface Props {
  onOpenModal: () => void;
}

const stats = [
  { value: "+85", label: "negocios activos" },
  { value: "14", label: "días al primer cliente" },
  { value: "3×", label: "más reservas promedio" },
];

const testimonials = [
  {
    quote: "En dos semanas ya tenía clientes nuevos llegando por Instagram. No tuve que hacer nada técnico.",
    name: "Barbería Ali",
    location: "Santiago Centro",
    icon: "✂️",
  },
  {
    quote: "Triplicamos las reservas en el primer mes. El equipo manejó todo, yo solo me encargué de atender.",
    name: "Casona Monetta",
    location: "Mostazal",
    icon: "💇",
  },
  {
    quote: "Siempre tuve miedo de lo digital, pero con Mastexo fue fácil. Ahora recibo pedidos mientras duermo.",
    name: "Food Truck La Ruta",
    location: "Viña del Mar",
    icon: "🚚",
  },
  {
    quote: "El café lleno los viernes gracias a los anuncios que ellos manejan. Yo ni me entero de la parte técnica.",
    name: "Café Central Providencia",
    location: "Las Condes",
    icon: "☕",
  },
  {
    quote: "Mis mesas se llenan los fines de semana sin depender de plataformas externas. Vale cada peso.",
    name: "Restaurante Don Pedro",
    location: "Ñuñoa",
    icon: "🍽️",
  },
];

export default function TrustSection({ onOpenModal }: Props) {
  return (
    <section className="w-full bg-[#050505] py-20 border-t border-white/5">
      <div className="mx-auto max-w-5xl px-6">

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="mb-3 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A853]">
            <span className="block h-px w-7 bg-[#D4A853]" />
            Resultados reales
            <span className="block h-px w-7 bg-[#D4A853]" />
          </p>
          <h2
            className="text-3xl md:text-5xl font-light text-white leading-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            +85 negocios ya trabajan{" "}
            <em className="italic text-[#D4A853]">con nosotros.</em>
          </h2>
          <p className="mt-4 text-white/55 text-base max-w-md mx-auto leading-relaxed">
            Sin complicaciones técnicas. Sin meses de espera. Resultados reales para negocios locales como el tuyo.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px bg-white/5 rounded-sm overflow-hidden mb-14">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col items-center justify-center py-8 px-4 bg-[#0a0a0a] text-center"
            >
              <span
                className="text-3xl md:text-5xl font-light text-[#D4A853]"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {s.value}
              </span>
              <span className="mt-2 text-[10px] uppercase tracking-widest text-white/40">
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 gap-px bg-white/5 mb-14">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`bg-[#0a0a0a] p-6 md:p-8 flex flex-col gap-4 ${
                // last item spans full width if odd count
                i === testimonials.length - 1 && testimonials.length % 2 !== 0
                  ? "md:col-span-2"
                  : ""
              }`}
            >
              <span className="text-2xl">{t.icon}</span>
              <p
                className="text-base text-white/85 leading-relaxed"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-auto flex flex-col gap-0.5">
                <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[#D4A853]">
                  {t.name}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-white/35">
                  {t.location}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA strip */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 border border-white/8 p-6 md:p-8"
        >
          <p
            className="text-lg text-white/80 leading-relaxed max-w-sm"
            style={{ fontFamily: "var(--font-display)" }}
          >
            ¿Tu negocio podría ser el próximo caso de éxito?
          </p>
          <button
            onClick={onOpenModal}
            className="shrink-0 inline-flex items-center gap-2 bg-[#D4A853] px-7 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E8C87A] hover:shadow-[0_8px_28px_rgba(212,168,83,0.3)] cursor-pointer"
          >
            Quiero resultados así →
          </button>
        </motion.div>

      </div>
    </section>
  );
}
