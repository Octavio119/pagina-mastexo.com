"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Props {
  onOpenModal: () => void;
}

export default function StickyHeader({ onOpenModal }: Props) {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 80);
      if (window.scrollY <= 80) setMobileOpen(false);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -64, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -64, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-black/90 backdrop-blur-md"
        >
          <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3.5">

            {/* Logo */}
            <button
              onClick={scrollToTop}
              className="cursor-pointer"
              aria-label="Volver al inicio"
            >
              <Image
                src="/logo.png"
                alt="Mastexo Digital"
                width={110}
                height={40}
                className="h-9 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
                priority
              />
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-6 text-[11px] uppercase tracking-widest text-white/50">
              <button
                onClick={() => scrollTo("soluciones")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Soluciones
              </button>
              <span className="text-white/15">·</span>
              <button
                onClick={() => scrollTo("proceso")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                Proceso
              </button>
            </nav>

            {/* Desktop CTA */}
            <button
              onClick={onOpenModal}
              className="hidden md:inline-flex items-center gap-2 bg-[#D4A853] px-5 py-2 text-[11px] font-bold uppercase tracking-[0.12em] text-black transition-all duration-200 hover:bg-[#E8C87A] hover:shadow-[0_4px_20px_rgba(212,168,83,0.3)] cursor-pointer"
            >
              Diagnóstico gratis →
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center gap-[5px] cursor-pointer p-1"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
            >
              <span
                className={`block h-px w-5 bg-white origin-center transition-transform duration-200 ${
                  mobileOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-white transition-opacity duration-200 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-5 bg-white origin-center transition-transform duration-200 ${
                  mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>

          {/* Mobile dropdown */}
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="md:hidden overflow-hidden border-t border-white/8 bg-black/95"
              >
                <div className="flex flex-col px-6 py-5 gap-4">
                  <button
                    onClick={() => scrollTo("soluciones")}
                    className="text-left text-[11px] uppercase tracking-widest text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    Soluciones
                  </button>
                  <button
                    onClick={() => scrollTo("proceso")}
                    className="text-left text-[11px] uppercase tracking-widest text-white/60 hover:text-white transition-colors cursor-pointer"
                  >
                    Proceso
                  </button>
                  <button
                    onClick={() => { onOpenModal(); setMobileOpen(false); }}
                    className="w-full bg-[#D4A853] py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-black transition-colors hover:bg-[#E8C87A] cursor-pointer"
                  >
                    Diagnóstico gratis →
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
