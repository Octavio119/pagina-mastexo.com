"use client";

import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import * as THREE from "three";

interface WovenLightHeroProps {
  onOpenModal: (category?: string) => void;
}

export const WovenLightHero = ({ onOpenModal }: WovenLightHeroProps) => {
  const textControls = useAnimation();
  const buttonControls = useAnimation();

  useEffect(() => {
    textControls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08 + 1.2,
        duration: 1.2,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }));
    buttonControls.start({
      opacity: 1,
      transition: { delay: 2.4, duration: 1 },
    });
  }, [textControls, buttonControls]);

  const handleScrollToSolutions = () => {
    document.getElementById("soluciones")?.scrollIntoView({ behavior: "smooth" });
  };

  const line1 = "Resultados,";
  const line2 = "no herramientas.";

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-black">
      <WovenCanvas />

      {/* Dark gradient overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/60 via-black/30 to-black/70 pointer-events-none" />

      {/* Hero text */}
      <div className="relative z-10 text-center px-6">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0, transition: { delay: 0.9, duration: 0.8 } }}
          className="mb-6 flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#D4A853]"
        >
          <span className="block h-px w-8 bg-[#D4A853]" />
          Para restaurantes · barberías · salones · tiendas
          <span className="block h-px w-8 bg-[#D4A853]" />
        </motion.p>

        {/* Headline line 1 */}
        <h1
          className="text-5xl md:text-8xl text-white leading-[1.05]"
          style={{
            fontFamily: "var(--font-display)",
            textShadow: "0 2px 40px rgba(0,0,0,0.8), 0 0 60px rgba(212,168,83,0.15)",
          }}
        >
          <span className="block">
            {line1.split("").map((char, j) => (
              <motion.span
                key={`l1-${j}`}
                custom={j}
                initial={{ opacity: 0, y: 50 }}
                animate={textControls}
                style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </motion.span>
            ))}
          </span>
          {/* Headline line 2 — italic gold */}
          <span className="block italic text-[#D4A853]">
            {line2.split("").map((char, j) => (
              <motion.span
                key={`l2-${j}`}
                custom={line1.length + j}
                initial={{ opacity: 0, y: 50 }}
                animate={textControls}
                style={{ display: "inline-block", whiteSpace: char === " " ? "pre" : "normal" }}
              >
                {char}
              </motion.span>
            ))}
          </span>
        </h1>

        {/* Subline */}
        <motion.p
          custom={line1.length + line2.length}
          initial={{ opacity: 0, y: 24 }}
          animate={textControls}
          className="mx-auto mt-6 max-w-lg text-base text-white/80 leading-relaxed"
          style={{
            fontFamily: "var(--font-body)",
            textShadow: "0 1px 12px rgba(0,0,0,0.9)",
          }}
        >
          Escala tu negocio sin tocar una sola herramienta técnica. Prospectos listos para comprar en 14 días.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={buttonControls}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => onOpenModal()}
            className="inline-flex items-center gap-2 bg-[#D4A853] px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-black transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#E8C87A] hover:shadow-[0_8px_28px_rgba(212,168,83,0.45)] cursor-pointer"
          >
            Diagnóstico gratuito →
          </button>
          <button
            onClick={handleScrollToSolutions}
            className="inline-flex items-center gap-2 border border-white/30 bg-white/10 px-6 py-3.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur-sm transition-all hover:border-white/50 hover:bg-white/15 hover:text-white cursor-pointer"
          >
            Ver soluciones
          </button>
        </motion.div>

        {/* Social proof */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 3, duration: 1 } }}
          className="mt-8 text-[11px] text-white/60 tracking-widest uppercase"
          style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}
        >
          85+ negocios locales ya crecen con Mastexo
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 3.2, duration: 1 } }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 cursor-pointer"
        onClick={handleScrollToSolutions}
      >
        <div className="h-10 w-px bg-gradient-to-b from-transparent to-white/40 animate-pulse" />
        <span className="text-[9px] uppercase tracking-[0.2em]">Scroll</span>
      </motion.div>
    </div>
  );
};

/* ── Three.js canvas ─────────────────────────────────────── */
const WovenCanvas = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();

    // Gold/amber palette for Mastexo
    const palette = [
      new THREE.Color("#D4A853"),
      new THREE.Color("#E8C87A"),
      new THREE.Color("#A67C3A"),
      new THREE.Color("#FFE0A0"),
      new THREE.Color("#ffffff"),
    ];

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 7000 : 40000;
    const positions = new Float32Array(particleCount * 3);
    const originalPositions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const geometry = new THREE.BufferGeometry();
    const torusKnot = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 32);

    for (let i = 0; i < particleCount; i++) {
      const vertexIndex = i % torusKnot.attributes.position.count;
      const x = torusKnot.attributes.position.getX(vertexIndex);
      const y = torusKnot.attributes.position.getY(vertexIndex);
      const z = torusKnot.attributes.position.getZ(vertexIndex);

      positions[i * 3]     = x + (Math.random() - 0.5) * 0.05;
      positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.05;
      positions[i * 3 + 2] = z + (Math.random() - 0.5) * 0.05;
      originalPositions[i * 3]     = positions[i * 3];
      originalPositions[i * 3 + 1] = positions[i * 3 + 1];
      originalPositions[i * 3 + 2] = positions[i * 3 + 2];

      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;

      velocities[i * 3] = velocities[i * 3 + 1] = velocities[i * 3 + 2] = 0;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.018,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.75,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    let animFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const mouseWorld = new THREE.Vector3(mouse.x * 3, mouse.y * 3, 0);

      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3, iy = i * 3 + 1, iz = i * 3 + 2;

        const dx = positions[ix]  - mouseWorld.x;
        const dy = positions[iy]  - mouseWorld.y;
        const dz = positions[iz]  - mouseWorld.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 1.5) {
          const force = (1.5 - dist) * 0.012;
          const inv = 1 / (dist + 0.001);
          velocities[ix] += dx * inv * force;
          velocities[iy] += dy * inv * force;
          velocities[iz] += dz * inv * force;
        }

        // spring back
        velocities[ix] += (originalPositions[ix] - positions[ix]) * 0.001;
        velocities[iy] += (originalPositions[iy] - positions[iy]) * 0.001;
        velocities[iz] += (originalPositions[iz] - positions[iz]) * 0.001;

        // damping
        velocities[ix] *= 0.95;
        velocities[iy] *= 0.95;
        velocities[iz] *= 0.95;

        positions[ix] += velocities[ix];
        positions[iy] += velocities[iy];
        positions[iz] += velocities[iz];
      }

      geometry.attributes.position.needsUpdate = true;
      points.rotation.y = elapsed * 0.05;
      points.rotation.x = Math.sin(elapsed * 0.02) * 0.15;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 z-0" />;
};
