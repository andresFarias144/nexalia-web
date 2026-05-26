"use client";

import { motion } from "framer-motion";
import { viewportOnce } from "@/lib/motion";
import {
  MessageCircle,
  SlidersHorizontal,
  BarChart3,
  FileSearch,
  Workflow,
  Target,
} from "lucide-react";

const services = [
  {
    icon: MessageCircle,
    color: "blue",
    title: "Agentes IA para WhatsApp",
    description: "Atención 24/7 con respuestas automáticas, agenda de turnos, toma de pedidos y derivación inteligente a tu equipo cuando es necesario.",
  },
  {
    icon: SlidersHorizontal,
    color: "purple",
    title: "Automatización administrativa",
    description: "Carga automática de facturas, conciliación bancaria, procesamiento de comprobantes y alertas de vencimientos. Sin tipear nada.",
  },
  {
    icon: BarChart3,
    color: "blue",
    title: "Dashboards inteligentes",
    description: "Visualizá tus datos en tiempo real y hacele preguntas a la IA sobre tu negocio. Reportes que se generan solos.",
  },
  {
    icon: FileSearch,
    color: "purple",
    title: "Gestión inteligente de documentos",
    description: "La IA lee, clasifica y organiza tus documentos. Buscá con lenguaje natural y recibí alertas de vencimientos automáticas.",
  },
  {
    icon: Workflow,
    color: "blue",
    title: "Optimización de flujos de trabajo",
    description: "Conectamos tus sistemas para que la información fluya sola. Pedidos, aprobaciones, notificaciones: todo automático.",
  },
  {
    icon: Target,
    color: "purple",
    title: "Automatización de marketing y ventas",
    description: "Clasificación de leads, seguimiento automático de presupuestos, campañas segmentadas y nurturing inteligente.",
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-24">
      <div className="max-w-[1200px] mx-auto px-8">
        <p className="text-[.7rem] uppercase tracking-[.18em] text-brand-blue-light font-semibold mb-3 text-center">
          Soluciones que generan impacto
        </p>
        <h2 className="text-3xl lg:text-4xl font-light text-center mb-4 tracking-tight">
          Servicios diseñados para{" "}
          <span className="gradient-text">optimizar tu operación</span>
        </h2>
        <p className="text-center text-text-secondary max-w-[580px] mx-auto mb-14 font-light">
          Cada solución resuelve un problema concreto de tu empresa. No vendemos
          tecnología, resolvemos problemas de negocio.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;
            const isBlue = service.color === "blue";
            return (
              <motion.div
                key={i}
                className="bg-bg-card border border-white/[0.06] rounded-2xl p-8 cursor-pointer relative overflow-hidden gradient-top lift-card sheen hover:border-white/[0.14] transition-all duration-300 hover:-translate-y-1"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ delay: i * 0.13, duration: 0.86, ease: [0.16, 1, 0.3, 1] }}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    isBlue
                      ? "bg-brand-blue/10 text-brand-blue-light"
                      : "bg-brand-purple/10 text-brand-purple-light"
                  }`}
                >
                  <motion.div whileHover={{ rotate: -8, scale: 1.08 }} transition={{ type: "spring", stiffness: 260, damping: 14 }}><Icon size={24} strokeWidth={1.5} /></motion.div>
                </div>
                <h3 className="text-base font-semibold mt-5 mb-2">{service.title}</h3>
                <p className="text-[.8125rem] text-text-secondary leading-relaxed font-light">
                  {service.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-[.8125rem] text-brand-blue-light font-medium mt-4">
                  Más información →
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
