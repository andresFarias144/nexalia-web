"use client";

import { motion } from "framer-motion";
import { viewportOnce } from "@/lib/motion";
import {
  Factory,
  HardHat,
  HeartPulse,
  ShoppingCart,
  Layers,
  GraduationCap,
  Home,
  Truck,
} from "lucide-react";

const industries = [
  { icon: Factory, title: "Industria", desc: "Fábricas y manufactura", color: "blue" },
  { icon: HardHat, title: "Construcción", desc: "Constructoras y obras", color: "purple" },
  { icon: HeartPulse, title: "Salud", desc: "Clínicas y consultorios", color: "blue" },
  { icon: ShoppingCart, title: "Comercio", desc: "Retail y distribuidoras", color: "purple" },
  { icon: Layers, title: "Estudios profesionales", desc: "Contables y jurídicos", color: "blue" },
  { icon: GraduationCap, title: "Educación", desc: "Colegios e institutos", color: "purple" },
  { icon: Home, title: "Inmobiliarias", desc: "Venta y alquiler", color: "blue" },
  { icon: Truck, title: "Logística", desc: "Transporte y distribución", color: "purple" },
];

export default function Industries() {
  return (
    <section id="sectores" className="py-24">
      <div className="max-w-[1200px] mx-auto px-8">
        <p className="text-[.7rem] uppercase tracking-[.18em] text-brand-blue-light font-semibold mb-3 text-center">
          Sectores que transformamos
        </p>
        <h2 className="text-3xl lg:text-4xl font-light text-center mb-4 tracking-tight">
          Soluciones para <span className="gradient-text">cada industria</span>
        </h2>
        <p className="text-center text-text-secondary max-w-[580px] mx-auto mb-14 font-light">
          Trabajamos con empresas de diversos sectores, adaptando cada solución a
          las necesidades específicas del rubro.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            const isBlue = ind.color === "blue";
            return (
              <motion.div
                key={i}
                className="bg-bg-card border border-white/[0.06] rounded-[14px] p-6 text-center lift-card sheen hover:border-brand-blue/30 transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.1, duration: 0.78, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className={`w-11 h-11 rounded-[10px] mx-auto mb-3 flex items-center justify-center ${
                    isBlue
                      ? "bg-brand-blue/10 text-brand-blue-light"
                      : "bg-brand-purple/10 text-brand-purple-light"
                  }`}
                >
                  <Icon size={22} strokeWidth={1.5} />
                </div>
                <h4 className="text-sm font-semibold mb-1">{ind.title}</h4>
                <p className="text-[.6875rem] text-text-muted font-normal">{ind.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
