"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, IconContainer } from "@/components/ui/radar-effect";
import {
  HiGlobeAlt,
  HiShoppingCart,
  HiSpeakerphone,
  HiChartBar,
  HiCog,
  HiSearchCircle,
  HiArrowLeft,
} from "react-icons/hi";

type Service = {
  text: string;
  icon: React.ElementType | null;
  color: string;
  delay: number;
  benefit: string;
};

const services: Service[][] = [
  [
    { text: "Restaurantes",  icon: HiGlobeAlt,     color: "text-orange-400", delay: 0.2,  benefit: "Más reservas sin depender de apps" },
    { text: "Barberías",     icon: HiShoppingCart, color: "text-sky-400",    delay: 0.35, benefit: "Citas incluso fuera del horario" },
    { text: "Salones",       icon: HiSpeakerphone, color: "text-rose-400",   delay: 0.25, benefit: "Llena tu agenda automáticamente" },
  ],
  [
    { text: "Tiendas",       icon: HiChartBar,     color: "text-emerald-400",delay: 0.45, benefit: "Vende más mientras duermes" },
    { text: "Cafeterías",    icon: HiCog,          color: "text-amber-400",  delay: 0.6,  benefit: "Pedidos anticipados sin esfuerzo" },
  ],
  [
    { text: "Food Trucks",   icon: HiSearchCircle, color: "text-violet-400", delay: 0.5,  benefit: "Clientes que te encuentran siempre" },
    { text: "Carritos",      icon: null,           color: "text-slate-400",  delay: 0.55, benefit: "Presencia digital desde hoy" },
  ],
];

const improveOptions = [
  "Conseguir más clientes nuevos",
  "Aparecer mejor en Google",
  "Sistema de reservas o citas",
  "Vender más en redes sociales",
  "Automatizar mi marketing",
  "Todo lo anterior",
];

function CategoryIcon({
  service,
  onClick,
}: {
  service: Service;
  onClick: () => void;
}) {
  return (
    <div className="group relative flex flex-col items-center cursor-pointer" onClick={onClick}>
      <IconContainer
        text={service.text}
        delay={service.delay}
        icon={
          service.icon ? (
            <service.icon
              className={`h-6 w-6 ${service.color} transition-transform duration-200 group-hover:scale-110`}
            />
          ) : (
            <span className="text-base">🛒</span>
          )
        }
      />
      {/* Benefit message — always visible */}
      <span
        className="mt-2.5 max-w-[160px] text-center text-base leading-relaxed text-white/85 transition-colors duration-200 group-hover:text-[#D4A853]"
      >
        {service.benefit}
      </span>
      <span className="pointer-events-none absolute inset-0 -m-1 rounded-2xl border border-[#D4A853]/0 transition-all duration-200 group-hover:border-[#D4A853]/40 group-hover:shadow-[0_0_16px_rgba(212,168,83,0.12)]" />
    </div>
  );
}

interface RadarServicesProps {
  onOpenModal: (category: string, improve?: string) => void;
}

export default function RadarServices({ onOpenModal }: RadarServicesProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [pickedCategory, setPickedCategory] = useState("");

  const handleCategoryClick = (category: string) => {
    setPickedCategory(category);
    setStep(2);
  };

  const handleImproveClick = (improve: string) => {
    onOpenModal(pickedCategory, improve);
  };

  return (
    <section id="soluciones" className="w-full bg-[#0A0A0A] py-24 overflow-hidden">
      <div className="mx-auto max-w-5xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 text-center"
        >
          <p className="mb-3 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#D4A853]">
            <span className="block h-px w-7 bg-[#D4A853]" />
            Soluciones para tu negocio
            <span className="block h-px w-7 bg-[#D4A853]" />
          </p>

          <AnimatePresence mode="wait">
            {step === 1 ? (
              <motion.div
                key="heading-step1"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h2
                  className="text-4xl font-light leading-tight tracking-tight text-white md:text-5xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  ¿Cuál es tu tipo de{" "}
                  <em className="italic text-[#D4A853]">negocio?</em>
                </h2>
                <p className="mx-auto mt-3 max-w-md text-base text-white/60 leading-relaxed">
                  Selecciona tu categoría y te mostramos exactamente cómo podemos ayudarte.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="heading-step2"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <h2
                  className="text-4xl font-light leading-tight tracking-tight text-white md:text-5xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  ¿Qué parte de tu negocio quieres{" "}
                  <em className="italic text-[#D4A853]">optimizar?</em>
                </h2>
                <p className="mx-auto mt-3 max-w-md text-base text-white/60 leading-relaxed">
                  Seleccionaste{" "}
                  <span className="text-[#D4A853] font-medium">{pickedCategory}</span>
                  {" "}— elige el área que más te interesa.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Pulse hint — step 1 only */}
        <AnimatePresence>
          {step === 1 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mb-10 text-center text-xs font-medium uppercase tracking-widest text-[#D4A853]/40"
            >
              ↑ toca cualquier ícono ↑
            </motion.p>
          )}
        </AnimatePresence>

        {/* Main area */}
        <AnimatePresence mode="wait">
          {step === 1 ? (
            /* ── Step 1: Radar icons ── */
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex min-h-[420px] md:h-[520px] w-full flex-col items-center justify-center gap-6 md:gap-8 overflow-hidden"
            >
              {/* Row 1 */}
              <div className="w-full max-w-2xl">
                <div className="flex w-full items-center justify-between px-4">
                  {services[0].map((s) => (
                    <CategoryIcon key={s.text} service={s} onClick={() => handleCategoryClick(s.text)} />
                  ))}
                </div>
              </div>

              {/* Row 2 */}
              <div className="w-full max-w-sm">
                <div className="flex w-full items-center justify-between px-4">
                  {services[1].map((s) => (
                    <CategoryIcon key={s.text} service={s} onClick={() => handleCategoryClick(s.text)} />
                  ))}
                </div>
              </div>

              {/* Row 3 */}
              <div className="w-full max-w-2xl">
                <div className="flex w-full items-center justify-between px-4">
                  {services[2].map((s) => (
                    <CategoryIcon key={s.text} service={s} onClick={() => handleCategoryClick(s.text)} />
                  ))}
                </div>
              </div>

              {/* Radar */}
              <Radar className="absolute -bottom-16" />
              <div className="absolute bottom-0 z-[41] h-px w-full bg-gradient-to-r from-transparent via-[#D4A853]/20 to-transparent" />
            </motion.div>
          ) : (
            /* ── Step 2: Improve options ── */
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="flex min-h-[420px] w-full flex-col items-center justify-center gap-8 py-8"
            >
              <div className="grid grid-cols-1 gap-3 w-full max-w-lg sm:grid-cols-2">
                {improveOptions.map((option, i) => (
                  <motion.button
                    key={option}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => handleImproveClick(option)}
                    className="group flex items-center gap-3 border border-[#222] bg-[#111] px-5 py-4 text-left text-base text-white/80 transition-all duration-200 hover:border-[#D4A853]/50 hover:bg-[#0f0f0f] hover:text-white hover:shadow-[0_0_20px_rgba(212,168,83,0.08)] cursor-pointer"
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#D4A853]/40 transition-colors duration-200 group-hover:bg-[#D4A853]" />
                    {option}
                  </motion.button>
                ))}
              </div>

              {/* Back button */}
              <button
                onClick={() => { setStep(1); setPickedCategory(""); }}
                className="flex items-center gap-2 text-sm text-white/30 transition-colors hover:text-white/60"
              >
                <HiArrowLeft className="h-4 w-4" />
                Cambiar tipo de negocio
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col items-center gap-3"
        >
          <button
            onClick={() => onOpenModal("")}
            className="inline-flex items-center gap-2 bg-[#D4A853] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.12em] text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E8C87A] hover:shadow-[0_8px_28px_rgba(212,168,83,0.3)] cursor-pointer"
          >
            Solicitar diagnóstico gratuito →
          </button>
          <p className="text-xs text-white/30 uppercase tracking-widest">
            Sin costo · Sin compromiso · Respuesta hoy
          </p>
        </motion.div>
      </div>
    </section>
  );
}
