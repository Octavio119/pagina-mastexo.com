"use client";

import React from "react";
import { motion } from "framer-motion";

interface WovenLightHeroProps {
  onOpenModal: (category?: string) => void;
}

/* ── Tokens ─────────────────────────────────────────────────────────── */
const CYAN  = "#06B6D4";
const BLUE  = "#3B82F6";
const BG    = "#020617";

/* ── Chart path data ─────────────────────────────────────────────────── */
const CHART_PATH =
  "M 0,72 C 20,68 35,65 55,58 C 75,51 90,45 115,38 C 135,32 155,27 175,20 C 195,14 220,11 245,9 C 265,7 280,8 300,6";
const CHART_FILL =
  "M 0,72 C 20,68 35,65 55,58 C 75,51 90,45 115,38 C 135,32 155,27 175,20 C 195,14 220,11 245,9 C 265,7 280,8 300,6 L 300,100 L 0,100 Z";

/* ── Fade-up variant ─────────────────────────────────────────────────── */
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: EASE_OUT, delay },
});

/* ── Main component ──────────────────────────────────────────────────── */
export const WovenLightHero = ({ onOpenModal }: WovenLightHeroProps) => {
  const scrollToSolutions = () =>
    document.getElementById("soluciones")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden flex items-center"
      style={{ background: BG }}
    >
      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes gridPulse {
          0%,100% { opacity: 0.35; }
          50%      { opacity: 0.55; }
        }
        @keyframes orbFloat {
          0%,100% { transform: translateY(0px) scale(1); }
          50%      { transform: translateY(-24px) scale(1.06); }
        }
        @keyframes orbFloatAlt {
          0%,100% { transform: translateY(0px) scale(1); }
          50%      { transform: translateY(20px) scale(0.96); }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 900; }
          to   { stroke-dashoffset: 0;   }
        }
        @keyframes fadeFill {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes pulseDot {
          0%,100% { opacity: 1; transform: scale(1); }
          50%      { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes cardFloat {
          0%,100% { transform: translateY(0px) rotateX(0deg); }
          50%      { transform: translateY(-10px) rotateX(1deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position: 400px 0; }
        }
        @keyframes widgetSlide {
          from { opacity:0; transform: translateX(20px); }
          to   { opacity:1; transform: translateX(0); }
        }
        @keyframes barGrow {
          from { height: 0; }
          to   { height: var(--bar-h); }
        }
        @keyframes tickerUp {
          0%   { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
        .hero-grid {
          background-image:
            linear-gradient(rgba(6,182,212,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6,182,212,0.07) 1px, transparent 1px);
          background-size: 64px 64px;
          animation: gridPulse 6s ease-in-out infinite;
        }
        .draw-line {
          stroke-dasharray: 900;
          animation: drawLine 2.4s ease-out 1.8s forwards;
          stroke-dashoffset: 900;
        }
        .fill-fade {
          animation: fadeFill 1.2s ease-out 3.2s forwards;
          opacity: 0;
        }
        .card-float {
          animation: cardFloat 7s ease-in-out infinite;
          transform-origin: center bottom;
        }
        .widget-slide {
          animation: widgetSlide 0.7s ease-out forwards;
        }
      `}</style>

      {/* ── Background grid ── */}
      <div className="hero-grid absolute inset-0 z-0 pointer-events-none" />

      {/* ── Radial center glow ── */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 65% 50%, rgba(6,182,212,0.12) 0%, rgba(59,130,246,0.08) 45%, transparent 70%)",
        }}
      />

      {/* ── Glow orbs ── */}
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "8%", left: "48%",
          width: 520, height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "orbFloat 9s ease-in-out infinite",
        }}
      />
      <div
        className="absolute pointer-events-none z-0"
        style={{
          bottom: "5%", right: "2%",
          width: 380, height: 380,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "orbFloatAlt 11s ease-in-out infinite",
        }}
      />
      <div
        className="absolute pointer-events-none z-0"
        style={{
          top: "60%", left: "0%",
          width: 280, height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "orbFloat 13s ease-in-out infinite 2s",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16 items-center min-h-screen lg:min-h-0 py-24 lg:py-20">

          {/* ════════════════════════════════ LEFT ══════════════════════════════ */}
          <div className="flex flex-col gap-7">

            {/* Status badge */}
            <motion.div {...fadeUp(0.2)} className="w-fit">
              <div
                className="flex items-center gap-2.5 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide"
                style={{
                  background: "rgba(6,182,212,0.08)",
                  border: "1px solid rgba(6,182,212,0.28)",
                  color: CYAN,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: CYAN,
                    boxShadow: `0 0 6px ${CYAN}`,
                    animation: "pulseDot 2s ease-in-out infinite",
                  }}
                />
                Plataforma IA · Activa en Chile
              </div>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.35)}
              className="text-[2.75rem] sm:text-5xl lg:text-[3.4rem] xl:text-6xl font-bold leading-[1.08] tracking-tight"
              style={{ fontFamily: "var(--font-body)", color: "#F0F8FF", position: "relative", zIndex: 10 }}
            >
              <span
                style={{
                  background: `linear-gradient(135deg, ${CYAN} 0%, ${BLUE} 60%, #818CF8 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Resultados
              </span>{" "}
              digitales,
              <br />
              <span style={{ color: "#E2E8F0" }}>sin complicaciones.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUp(0.5)}
              className="text-base sm:text-lg leading-relaxed max-w-md"
              style={{ color: "rgba(226,232,240,0.65)", fontFamily: "var(--font-body)" }}
            >
              Automatizamos negocios con sistemas inteligentes, dashboards y
              herramientas que generan clientes reales.
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.65)} className="flex flex-col sm:flex-row gap-3">
              {/* Primary */}
              <button
                onClick={() => onOpenModal()}
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold cursor-pointer transition-all duration-200 overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${CYAN}, ${BLUE})`,
                  color: "#fff",
                  boxShadow: `0 0 0 1px rgba(6,182,212,0.3), 0 8px 32px rgba(6,182,212,0.25)`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    `0 0 0 1px rgba(6,182,212,0.5), 0 12px 40px rgba(6,182,212,0.4)`;
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.boxShadow =
                    `0 0 0 1px rgba(6,182,212,0.3), 0 8px 32px rgba(6,182,212,0.25)`;
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                Solicitar diagnóstico
                <ArrowRight />
              </button>

              {/* Secondary */}
              <button
                onClick={scrollToSolutions}
                className="inline-flex items-center justify-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold cursor-pointer transition-all duration-200"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  color: "rgba(226,232,240,0.85)",
                  backdropFilter: "blur(12px)",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.22)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
                  (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0)";
                }}
              >
                Ver plataforma
                <PlayIcon />
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div {...fadeUp(0.8)} className="flex items-center gap-7 pt-2">
              {[
                { value: "85+",   label: "Negocios activos" },
                { value: "+247%", label: "Ventas promedio" },
                { value: "14d",   label: "Primeros resultados" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span
                    className="text-xl sm:text-2xl font-bold"
                    style={{
                      background: `linear-gradient(135deg, ${CYAN}, ${BLUE})`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {s.value}
                  </span>
                  <span className="text-xs" style={{ color: "rgba(148,163,184,0.7)" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Trust logos */}
            <motion.div
              {...fadeUp(0.95)}
              className="flex items-center gap-2 pt-1"
            >
              <div className="flex -space-x-2">
                {["JM","CR","LP","AB"].map((init) => (
                  <div
                    key={init}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[9px] font-bold ring-2"
                    style={{
                      background: "linear-gradient(135deg, #1E293B, #334155)",
                      color: CYAN,
                      border: `2px solid ${BG}`,
                    }}
                  >
                    {init}
                  </div>
                ))}
              </div>
              <span className="text-xs ml-1" style={{ color: "rgba(148,163,184,0.6)" }}>
                +81 empresas ya usan Mastexo
              </span>
            </motion.div>
          </div>

          {/* ════════════════════════════════ RIGHT ═════════════════════════════ */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
            className="hidden lg:block"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>

      {/* ── Scroll cue ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer border-none bg-transparent"
        style={{ color: "rgba(148,163,184,0.4)" }}
        onClick={scrollToSolutions}
      >
        <div className="h-9 w-px" style={{ background: "linear-gradient(to bottom, transparent, rgba(148,163,184,0.35))", animation: "pulseDot 2s ease-in-out infinite" }} />
        <span className="text-[9px] uppercase tracking-[0.2em]">scroll</span>
      </motion.button>
    </section>
  );
};

/* ── Dashboard Mockup ────────────────────────────────────────────────── */
const DashboardMockup = () => (
  <div className="relative" style={{ perspective: "1000px" }}>
    {/* Glow behind card */}
    <div
      className="absolute inset-0 rounded-2xl pointer-events-none"
      style={{
        background: `radial-gradient(ellipse at 50% 40%, rgba(6,182,212,0.22) 0%, rgba(59,130,246,0.12) 50%, transparent 75%)`,
        filter: "blur(32px)",
        transform: "scale(1.08) translateY(8px)",
      }}
    />

    {/* Main card */}
    <div
      className="card-float relative rounded-2xl overflow-hidden"
      style={{
        background: "rgba(15,23,42,0.85)",
        border: "1px solid rgba(6,182,212,0.2)",
        backdropFilter: "blur(24px)",
        boxShadow:
          "0 0 0 1px rgba(6,182,212,0.1), 0 32px 80px rgba(2,6,23,0.7), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* ── Card header ── */}
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        <div className="flex items-center gap-2.5">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            {["#FF5F57","#FEBC2E","#28C840"].map((c) => (
              <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <span className="text-xs font-semibold ml-1" style={{ color: "rgba(226,232,240,0.8)" }}>
            Mastexo CRM — Panel Principal
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "#22C55E", boxShadow: "0 0 6px #22C55E", animation: "pulseDot 2.5s ease-in-out infinite" }}
          />
          <span className="text-[10px]" style={{ color: "#22C55E" }}>Sistema Activo</span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-4">
        {/* ── KPI row ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Ventas",       value: "$2.8M",  delta: "+23%",  color: CYAN  },
            { label: "WhatsApp",     value: "94%",    delta: "+8%",   color: "#22C55E" },
            { label: "Reservas hoy", value: "38",     delta: "+5",    color: BLUE  },
          ].map((k) => (
            <div
              key={k.label}
              className="rounded-xl p-3 flex flex-col gap-1"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <span className="text-[10px]" style={{ color: "rgba(148,163,184,0.6)" }}>{k.label}</span>
              <span className="text-lg font-bold" style={{ color: k.color }}>{k.value}</span>
              <span
                className="text-[10px] font-medium"
                style={{
                  color: "#22C55E",
                  background: "rgba(34,197,94,0.1)",
                  borderRadius: 4,
                  padding: "1px 5px",
                  width: "fit-content",
                }}
              >
                {k.delta}
              </span>
            </div>
          ))}
        </div>

        {/* ── Chart ── */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold" style={{ color: "rgba(226,232,240,0.7)" }}>
              Ventas · últimos 30 días
            </span>
            <span className="text-[10px] font-bold" style={{ color: "#22C55E" }}>↑ 23% vs mes anterior</span>
          </div>

          <svg viewBox="0 0 300 90" className="w-full" style={{ height: 80, overflow: "visible" }}>
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={CYAN} />
                <stop offset="100%" stopColor={BLUE} />
              </linearGradient>
              <linearGradient id="fillGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={CYAN} stopOpacity="0.22" />
                <stop offset="100%" stopColor={CYAN} stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Fill */}
            <path d={CHART_FILL} fill="url(#fillGrad)" className="fill-fade" />
            {/* Line */}
            <path
              d={CHART_PATH}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="2"
              strokeLinecap="round"
              className="draw-line"
            />
            {/* End dot */}
            <circle cx="300" cy="6" r="3.5" fill={BLUE} style={{ filter: `drop-shadow(0 0 5px ${BLUE})` }} />
          </svg>
        </div>

        {/* ── Automations bar chart ── */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold" style={{ color: "rgba(226,232,240,0.7)" }}>
              Automatizaciones activas
            </span>
            <span
              className="text-[10px] font-bold rounded-full px-2 py-0.5"
              style={{ background: "rgba(6,182,212,0.15)", color: CYAN }}
            >
              12 corriendo
            </span>
          </div>
          <div className="flex items-end gap-1.5" style={{ height: 48 }}>
            {[35, 55, 40, 70, 60, 80, 65, 90, 75, 95, 85, 100].map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  background:
                    h === 100
                      ? `linear-gradient(to top, ${BLUE}, ${CYAN})`
                      : `rgba(6,182,212,${0.15 + (h / 100) * 0.4})`,
                  boxShadow: h > 80 ? `0 0 6px rgba(6,182,212,0.4)` : "none",
                  transition: "height 0.3s ease",
                }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1.5">
            <span className="text-[9px]" style={{ color: "rgba(100,116,139,0.8)" }}>Lun</span>
            <span className="text-[9px]" style={{ color: "rgba(100,116,139,0.8)" }}>Hoy</span>
          </div>
        </div>

        {/* ── Activity feed ── */}
        <div
          className="rounded-xl p-4"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <span className="text-[11px] font-semibold block mb-3" style={{ color: "rgba(226,232,240,0.7)" }}>
            Actividad reciente
          </span>
          <div className="flex flex-col gap-2.5">
            {[
              { icon: "WA", color: "#22C55E", text: "Lead calificado — Juan M.",    time: "2m" },
              { icon: "AI", color: CYAN,       text: "Reserva confirmada · Mesa 4", time: "5m" },
              { icon: "ML", color: BLUE,       text: "Email enviado · 847 contactos", time: "12m" },
            ].map((a) => (
              <div key={a.text} className="flex items-center gap-2.5">
                <div
                  className="w-6 h-6 rounded-md flex items-center justify-center text-[8px] font-bold flex-shrink-0"
                  style={{ background: `${a.color}22`, color: a.color, border: `1px solid ${a.color}44` }}
                >
                  {a.icon}
                </div>
                <span className="text-[11px] flex-1 truncate" style={{ color: "rgba(148,163,184,0.85)" }}>
                  {a.text}
                </span>
                <span className="text-[10px] flex-shrink-0" style={{ color: "rgba(100,116,139,0.7)" }}>
                  {a.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* ── Floating widget — top right ── */}
    <motion.div
      initial={{ opacity: 0, x: 24, y: -8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 1.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -top-5 -right-6 rounded-2xl px-4 py-3 flex items-center gap-3"
      style={{
        background: "rgba(15,23,42,0.92)",
        border: "1px solid rgba(6,182,212,0.3)",
        backdropFilter: "blur(20px)",
        boxShadow: `0 8px 32px rgba(2,6,23,0.5), 0 0 0 1px rgba(6,182,212,0.08)`,
        minWidth: 180,
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `linear-gradient(135deg, ${CYAN}22, ${BLUE}22)`, border: `1px solid ${CYAN}44` }}
      >
        <BoltIcon color={CYAN} />
      </div>
      <div>
        <p className="text-[10px] font-bold" style={{ color: "#F0F8FF" }}>IA procesando</p>
        <p className="text-[10px]" style={{ color: "rgba(100,116,139,0.8)" }}>847 leads · ahora</p>
      </div>
      <div
        className="w-2 h-2 rounded-full ml-auto"
        style={{ background: "#22C55E", boxShadow: "0 0 8px #22C55E", animation: "pulseDot 1.5s ease-in-out infinite" }}
      />
    </motion.div>

    {/* ── Floating widget — bottom left ── */}
    <motion.div
      initial={{ opacity: 0, x: -24, y: 8 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 2.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -left-6 rounded-2xl px-4 py-3 flex items-center gap-3"
      style={{
        bottom: 40,
        zIndex: 5,
        background: "rgba(15,23,42,0.92)",
        border: "1px solid rgba(59,130,246,0.3)",
        backdropFilter: "blur(20px)",
        boxShadow: `0 8px 32px rgba(2,6,23,0.5), 0 0 0 1px rgba(59,130,246,0.08)`,
        minWidth: 200,
      }}
    >
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${BLUE}22`, border: `1px solid ${BLUE}44` }}
      >
        <ChartIcon color={BLUE} />
      </div>
      <div>
        <p className="text-[10px] font-bold" style={{ color: "#F0F8FF" }}>+$184,000 este mes</p>
        <p className="text-[10px]" style={{ color: "rgba(100,116,139,0.8)" }}>Ingresos generados por IA</p>
      </div>
    </motion.div>
  </div>
);

/* ── SVG Icons ───────────────────────────────────────────────────────── */
const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const PlayIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

const BoltIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const ChartIcon = ({ color }: { color: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6"  y1="20" x2="6"  y2="14" />
  </svg>
);
