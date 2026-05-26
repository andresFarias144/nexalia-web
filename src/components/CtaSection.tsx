"use client";

import { motion } from "framer-motion";

export default function CtaSection() {
  return (
    <section id="contacto" className="py-24">
      <div className="max-w-[1200px] mx-auto px-8">
        <motion.div
          className="bg-bg-card border border-white/[0.08] rounded-3xl p-12 lg:p-16 text-center relative overflow-hidden gradient-border lift-card"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1.02, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(59,107,219,0.06)_0%,transparent_70%)] pointer-events-none" />
          <h2 className="text-3xl lg:text-4xl font-light mb-4 relative z-10">
            ¿Listo para transformar tu operación con{" "}
            <span className="gradient-text">inteligencia artificial</span>?
          </h2>
          <p className="text-text-secondary mb-8 text-base relative z-10 font-light">
            Agendemos una reunión gratuita de 30 minutos. Analizamos tus procesos
            y te mostramos qué podemos mejorar. Sin compromiso.
          </p>
          <a
            href="/agenda"
            className="sheen relative z-10 inline-flex bg-brand-green text-[#0a0a12] px-8 py-3.5 rounded-full font-semibold text-[.875rem] hover:bg-brand-green-light transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(128,186,39,0.25)]"
          >
            Agendar diagnóstico gratuito →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
