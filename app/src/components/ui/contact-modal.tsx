"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/components/Analytics";

interface ContactModalProps {
  isOpen: boolean;
  category: string;
  onClose: () => void;
}

const categoryEmojis: Record<string, string> = {
  Restaurantes: "🍽️",
  Barberías: "✂️",
  Salones: "💇",
  Tiendas: "🛍️",
  Cafeterías: "☕",
  "Food Trucks": "🚚",
  Carritos: "🛒",
  General: "💼",
};

const WA_NUMBER = "56929709420";
const WA_MESSAGE = encodeURIComponent("Hola, acabo de solicitar un diagnóstico en Mastexo.");

export function ContactModal({ isOpen, category, onClose }: ContactModalProps) {
  const [step, setStep] = useState<"form" | "success">("form");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userName, setUserName] = useState("");
  const overlayRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    name: "",
    business: "",
    email: "",
    whatsapp: "",
    category: category,
    improve: "",
    budget: "",
  });

  // sync category when it changes from outside
  useEffect(() => {
    setForm((f) => ({ ...f, category }));
  }, [category]);

  // reset on close
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep("form");
        setSubmitting(false);
        setError(null);
        setForm((f) => ({
          ...f,
          name: "",
          business: "",
          email: "",
          whatsapp: "",
          improve: "",
          budget: "",
        }));
      }, 400);
    }
  }, [isOpen]);

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const firstName = form.name.split(" ")[0];
    setUserName(firstName);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          business: form.business,
          email: form.email,
          whatsapp: form.whatsapp,
          category: form.category,
          improve: form.improve,
          budget: form.budget || "",
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error ?? "Error desconocido");

      // Save lead to dashboard (fire-and-forget)
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          business: form.business,
          email: form.email,
          whatsapp: form.whatsapp,
          category: form.category,
          message: form.improve,
          budget: form.budget || "",
        }),
      }).catch(() => {});

      trackEvent("form_submit", "lead", form.category);
      setStep("success");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "";
      console.error("[contact] Error:", message);
      setError("Hubo un problema al enviar tu solicitud. Intenta de nuevo o contáctanos por WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  const field =
    "w-full bg-[#111] border border-[#222] text-white text-sm px-4 py-3 outline-none transition-all duration-200 placeholder:text-[#444] focus:border-[#D4A853] focus:bg-[#0f0f0f]";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
            onClick={(e) => e.target === overlayRef.current && onClose()}
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 bottom-0 z-50 mx-auto max-w-lg overflow-hidden rounded-t-2xl bg-[#0A0A0A] border border-[#1a1a1a] border-b-0 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:top-1/2 md:-translate-y-1/2 md:bottom-auto md:rounded-2xl md:border-b md:border-[#1a1a1a]"
          >
            {/* Gold accent top line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#D4A853] to-transparent" />

            <div className="p-6 md:p-8">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute right-5 top-5 text-[#444] hover:text-white transition-colors"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>

              <AnimatePresence mode="wait">
                {step === "form" ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Header */}
                    <div className="mb-6">
                      <div className="mb-2 flex items-center gap-2">
                        <span className="text-xl">
                          {categoryEmojis[category] ?? "💼"}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#D4A853]">
                          {category}
                        </span>
                      </div>
                      <h2
                        className="text-2xl font-light text-white md:text-3xl"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        Cuéntanos sobre{" "}
                        <em className="italic text-[#D4A853]">tu negocio</em>
                      </h2>
                      <p className="mt-1 text-sm text-[#555]">
                        Diagnóstico gratuito · Sin compromiso · Respuesta en el día
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#444]">
                            Nombre *
                          </label>
                          <input
                            required
                            disabled={submitting}
                            className={field}
                            placeholder="Tu nombre"
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#444]">
                            Negocio *
                          </label>
                          <input
                            required
                            disabled={submitting}
                            className={field}
                            placeholder="Nombre del local"
                            value={form.business}
                            onChange={(e) => setForm({ ...form, business: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#444]">
                            Email *
                          </label>
                          <input
                            required
                            type="email"
                            disabled={submitting}
                            className={field}
                            placeholder="tu@correo.com"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#444]">
                            WhatsApp *
                          </label>
                          <input
                            required
                            type="tel"
                            disabled={submitting}
                            className={field}
                            placeholder="+56 9 ..."
                            value={form.whatsapp}
                            onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                          />
                        </div>
                      </div>

                      {/* Category — read-only, pre-filled */}
                      <div>
                        <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#444]">
                          Categoría
                        </label>
                        <div
                          className={cn(
                            field,
                            "flex items-center gap-2 cursor-default select-none text-[#D4A853]"
                          )}
                        >
                          <span>{categoryEmojis[category] ?? "💼"}</span>
                          <span>{category}</span>
                        </div>
                      </div>

                      <div>
                        <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#444]">
                          ¿Qué parte de tu negocio quieres mejorar? *
                        </label>
                        <textarea
                          required
                          rows={3}
                          disabled={submitting}
                          className={cn(field, "resize-none")}
                          placeholder="Ej: Quiero más reservas, mejorar mi presencia en redes, conseguir más clientes nuevos cada semana..."
                          value={form.improve}
                          onChange={(e) => setForm({ ...form, improve: e.target.value })}
                        />
                      </div>

                      <div>
                        <label className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-[#444]">
                          Presupuesto estimado{" "}
                          <span className="normal-case tracking-normal text-[#333]">
                            (opcional)
                          </span>
                        </label>
                        <select
                          disabled={submitting}
                          className={cn(field, "appearance-none cursor-pointer")}
                          value={form.budget}
                          onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        >
                          <option value="">Prefiero discutirlo en la llamada</option>
                          <option>Menos de $100.000 CLP/mes</option>
                          <option>$100.000 – $300.000 CLP/mes</option>
                          <option>$300.000 – $600.000 CLP/mes</option>
                          <option>Más de $600.000 CLP/mes</option>
                        </select>
                      </div>

                      {/* Error message */}
                      <AnimatePresence>
                        {error && (
                          <motion.div
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-start gap-2.5 rounded border border-red-500/20 bg-red-500/8 px-4 py-3"
                          >
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                            <div>
                              <p className="text-[12px] text-red-300 leading-relaxed">{error}</p>
                              <a
                                href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-1 inline-block text-[11px] font-semibold text-[#25D366] underline-offset-2 hover:underline"
                              >
                                Contactar por WhatsApp →
                              </a>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="mt-2 flex w-full items-center justify-center gap-2 bg-[#D4A853] py-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-black transition-all duration-200 hover:bg-[#E8C87A] disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {submitting ? (
                          <span className="flex items-center gap-2">
                            <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                            Enviando...
                          </span>
                        ) : (
                          <>
                            Solicitar diagnóstico gratuito
                            <ArrowRight className="h-4 w-4" />
                          </>
                        )}
                      </button>

                      <p className="text-center text-[10px] text-[#333]">
                        🔒 Tu información es privada. Nunca hacemos spam.
                      </p>
                    </form>
                  </motion.div>
                ) : (
                  /* ── Success screen ── */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center py-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle2
                        className="h-14 w-14 text-[#D4A853]"
                        strokeWidth={1.5}
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.4 }}
                    >
                      <h3
                        className="mt-5 text-2xl font-light text-white"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        ¡Listo,{" "}
                        <em className="italic text-[#D4A853]">{userName}!</em>
                      </h3>
                      <p className="mt-2 text-sm text-[#555] leading-relaxed max-w-xs mx-auto">
                        Recibimos tu solicitud. Te contactaremos hoy mismo con tu
                        diagnóstico personalizado para{" "}
                        <span className="text-[#888]">
                          {categoryEmojis[category]} {category.toLowerCase()}
                        </span>
                        .
                      </p>

                      <div className="mt-6 flex flex-col gap-3">
                        <a
                          href={`https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 bg-[#25D366] px-6 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-white transition-all hover:-translate-y-0.5"
                        >
                          💬 También escríbenos por WhatsApp
                        </a>
                        <button
                          onClick={onClose}
                          className="text-xs text-[#444] hover:text-[#888] transition-colors"
                        >
                          Cerrar
                        </button>
                      </div>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
