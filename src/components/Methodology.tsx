"use client";

import { motion } from "framer-motion";
import { Search, Lightbulb, Code2, CheckCircle, Rocket } from "lucide-react";

const steps = [
  { number: 1, icon: Search, color: "b", title: "Diagnóstico", desc: "Visitamos tu empresa y analizamos tus procesos para detectar oportunidades." },
  { number: 2, icon: Lightbulb, color: "p", title: "Diseño de solución", desc: "Creamos una propuesta personalizada alineada a tus objetivos y presupuesto." },
  { number: 3, icon: Code2, color: "b", title: "Implementación", desc: "Desarrollamos e integramos la solución con tus sistemas existentes." },
  { number: 4, icon: CheckCircle, color: "p", title: "Pruebas y ajustes", desc: "Validamos resultados con tu equipo real y optimizamos el rendimiento." },
  { number: 5, icon: Rocket, color: "b", title: "Escalamiento", desc: "Escalamos la solución y te acompañamos con soporte continuo." },
];

export default function Methodology() {
  return (
    <section id="metodologia" className="py-24 bg-bg-secondary">
      <div className="max-w-[1200px] mx-auto px-8">
        <p className="text-[.7rem] uppercase tracking-[.18em] text-brand-blue-light font-semibold mb-3 text-center">
          Nuestra metodología
        </p>
        <h2 className="text-3xl lg:text-4xl font-light text-center mb-4 tracking-tight">
          Así trabajamos <span className="gradient-text">contigo</span>
        </h2>
        <p className="text-center text-text-secondary max-w-[580px] mx-auto mb-12 font-light">
          Un proceso claro de 5 etapas que garantiza resultados rápidos y medibles.
        </p>

        <div className="relative grid grid-cols-1 md:grid-cols-5 gap-8 md:gap-4 mt-12">
          {/* Connecting line */}
          <motion.div className="hidden md:block absolute top-7 left-[10%] right-[10%] h-0.5 origin-left bg-gradient-to-r from-brand-blue to-brand-purple-light opacity-25" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.65, ease: [0.16, 1, 0.3, 1] }} />

          {steps.map((step, i) => {
            const Icon = step.icon;
            const isBlue = step.color === "b";
            return (
              <motion.div
                key={i}
                className="text-center relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.18, duration: 0.86, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-sm mx-auto mb-5 border-2 lift-card ${
                    isBlue
                      ? "bg-brand-blue/10 border-brand-blue/40 text-brand-blue-light"
                      : "bg-brand-purple/10 border-brand-purple/40 text-brand-purple-light"
                  }`}
                >
                  {step.number}
                </div>
                <div className="flex justify-center mb-2">
                  <Icon size={24} className="text-text-secondary" strokeWidth={1.5} />
                </div>
                <h4 className="text-sm font-semibold mb-1.5">{step.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed max-w-[175px] mx-auto font-light">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
