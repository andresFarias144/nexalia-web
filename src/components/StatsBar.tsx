"use client";

import { motion } from "framer-motion";
import { viewportOnce } from "@/lib/motion";

const stats = [
  { number: "7", label: "Soluciones especializadas" },
  { number: "24/7", label: "Atención automatizada" },
  { number: "70%", label: "Menos tareas manuales" },
  { number: "2–4 sem", label: "Primeros resultados" },
];

export default function StatsBar() {
  return (
    <section className="py-12 border-t border-b border-white/[0.06] bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(91,138,240,0.08),transparent_55%)] pointer-events-none" />
      <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center relative z-10">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ delay: 0.9 + i * 0.22, duration: 0.96, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div className="text-3xl font-light gradient-text" whileInView={{ scale: [0.92, 1.08, 1] }} viewport={viewportOnce} transition={{ delay: 1.1 + i * 0.22, duration: 0.9 }}>{stat.number}</motion.div>
            <div className="text-xs text-text-muted mt-1 font-normal">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
