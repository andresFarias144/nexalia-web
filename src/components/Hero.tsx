"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import Link from "next/link";
import ColorBends from "./ColorBends";
import HeroImpactCarousel from "./HeroImpactCarousel";

const heroEase = [0.16, 1, 0.3, 1] as const;

const heroContainer = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.28,
      staggerChildren: 0.28,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 34, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.12,
      ease: heroEase,
    },
  },
};

export default function Hero() {
  return (
    <section className="pt-36 lg:pt-40 pb-24 relative overflow-hidden">
      <div className="hero-ambient" aria-hidden="true">
        <div className="hero-dot-grid" />
        <ColorBends
          className="hero-color-bends"
          colors={["#c01464", "#6f45d8", "#284fb8", "#53358f"]}
          rotation={90}
          speed={0.2}
          scale={1}
          frequency={1}
          warpStrength={1}
          mouseInfluence={1}
          noise={0.1}
          parallax={0.5}
          iterations={1}
          intensity={0.95}
          bandWidth={6}
          transparent
          autoRotate={0}
        />
        <div className="hero-vignette" />
      </div>

      <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={heroItem} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-bg-tertiary/80 border border-white/[0.08] text-[.7rem] text-brand-blue-light font-semibold tracking-wider uppercase mb-6 shadow-[0_0_35px_rgba(91,138,240,0.08)]">
            <Sparkles size={13} className="text-brand-green" />
            Consultoría en automatización con IA
          </motion.div>

          <motion.h1 variants={heroItem} className="text-4xl lg:text-[3.25rem] font-light leading-[1.1] mb-6 tracking-tight">
            Optimizamos tu empresa con{" "}
            <span className="gradient-text">automatización inteligente</span>
          </motion.h1>

          <motion.p variants={heroItem} className="text-[1.0625rem] text-text-secondary leading-relaxed mb-9 max-w-[520px] font-light">
            Analizamos tus procesos, detectamos oportunidades y aplicamos
            inteligencia artificial para que tu equipo deje de perder tiempo en
            tareas repetitivas y se enfoque en lo que realmente importa.
          </motion.p>

          <motion.div variants={heroItem} className="flex gap-4 flex-wrap">
            <Link
              href="/agenda"
              className="sheen inline-flex items-center gap-2 bg-brand-green text-[#0a0a12] px-7 py-3 rounded-full font-semibold text-[.875rem] hover:bg-brand-green-light transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(128,186,39,0.28)]"
            >
              Agendar diagnóstico gratuito <ArrowRight size={16} />
            </Link>
            <Link
              href="#servicios"
              className="inline-flex items-center gap-2 border border-white/[0.12] px-7 py-3 rounded-full font-medium text-[.875rem] text-text-primary hover:border-brand-blue hover:text-brand-blue-light transition hover:-translate-y-0.5"
            >
              <Play size={15} /> Conocer servicios
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative hidden lg:block"
          initial={{ opacity: 0, y: 34, scale: 0.97, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.22, delay: 1.26, ease: heroEase }}
        >
          <HeroImpactCarousel />
        </motion.div>
      </div>
    </section>
  );
}
