"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Bot,
  CheckCircle2,
  FileSearch,
  MessageCircle,
  TrendingUp,
  Workflow,
  Zap,
} from "lucide-react";

const cards = [
  {
    eyebrow: "Atencion automatizada",
    title: "WhatsApp responde sin espera",
    value: "24/7",
    description: "Consultas frecuentes, turnos y pedidos resueltos al instante.",
    accent: "blue",
    icon: MessageCircle,
    layout: "flow",
    stats: [
      { value: "-62%", label: "consultas repetitivas" },
      { value: "+38%", label: "respuesta mas rapida" },
    ],
    flow: ["Consulta", "Nexa", "Derivacion"],
  },
  {
    eyebrow: "Administracion",
    title: "Menos carga manual diaria",
    value: "-70%",
    description: "Facturas, comprobantes y vencimientos ordenados sin tipear.",
    accent: "green",
    icon: Workflow,
    layout: "kpi",
    stats: [
      { value: "3", label: "procesos activos" },
      { value: "+45%", label: "productividad" },
    ],
  },
  {
    eyebrow: "Dashboards inteligentes",
    title: "Reportes que aparecen solos",
    value: "+4 h",
    description: "Informacion operativa visible para decidir cada semana.",
    accent: "blue",
    icon: BarChart3,
    layout: "chart",
    stats: [
      { value: "100%", label: "visibilidad" },
      { value: "diario", label: "reporte automatico" },
    ],
    chart: [34, 52, 46, 68, 61, 78, 86],
  },
  {
    eyebrow: "Gestion documental",
    title: "Documentos encontrados en segundos",
    value: "-58%",
    description: "La IA clasifica archivos y anticipa vencimientos importantes.",
    accent: "purple",
    icon: FileSearch,
    layout: "checklist",
    stats: [
      { value: "IA", label: "clasificacion" },
      { value: "alertas", label: "vencimientos" },
    ],
    checks: ["Contratos ordenados", "Busqueda natural", "Alertas preventivas"],
  },
  {
    eyebrow: "Marketing y ventas",
    title: "Seguimiento comercial sin olvidos",
    value: "+32%",
    description: "Leads clasificados y presupuestos acompanados automaticamente.",
    accent: "pink",
    icon: TrendingUp,
    layout: "bars",
    stats: [
      { value: "-40%", label: "oportunidades perdidas" },
      { value: "auto", label: "follow-up" },
    ],
    bars: [64, 78, 52],
  },
];

const accentClasses = {
  blue: "text-brand-blue-light bg-brand-blue/10 border-brand-blue/25",
  green: "text-brand-green bg-brand-green/10 border-brand-green/25",
  purple: "text-brand-purple-light bg-brand-purple/10 border-brand-purple/25",
  pink: "text-[#d85b9b] bg-[#e8126f]/10 border-[#e8126f]/25",
};

function MiniVisual({ card }: { card: (typeof cards)[number] }) {
  if (card.layout === "flow") {
    return (
      <div className="grid grid-cols-3 gap-2 mt-5">
        {card.flow?.map((step, index) => (
          <div key={step} className="relative rounded-[12px] border border-white/[0.07] bg-bg-tertiary/80 px-3 py-3 text-center">
            <div className="mx-auto mb-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/[0.08] bg-bg-card text-brand-green">
              {index === 1 ? <Bot size={15} /> : <Zap size={14} />}
            </div>
            <span className="text-[.62rem] text-text-muted">{step}</span>
          </div>
        ))}
      </div>
    );
  }

  if (card.layout === "chart") {
    const points = card.chart ?? [];
    const width = 210;
    const height = 70;
    const path = points
      .map((value, index) => {
        const x = (index / (points.length - 1)) * width;
        const y = height - (value / 100) * height;
        return `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(" ");

    return (
      <div className="mt-5 rounded-[14px] border border-white/[0.07] bg-bg-tertiary/70 p-4">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-[70px] w-full overflow-visible">
          <path d={path} fill="none" stroke="url(#heroLine)" strokeWidth="4" strokeLinecap="round" />
          <defs>
            <linearGradient id="heroLine" x1="0" x2="1" y1="0" y2="0">
              <stop stopColor="#5b8af0" />
              <stop offset="1" stopColor="#8b74c0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  if (card.layout === "checklist") {
    return (
      <div className="mt-5 space-y-2">
        {card.checks?.map((check) => (
          <div key={check} className="flex items-center gap-2 rounded-[12px] border border-white/[0.07] bg-bg-tertiary/70 px-3 py-2">
            <CheckCircle2 size={15} className="text-brand-green" />
            <span className="text-[.72rem] text-text-secondary">{check}</span>
          </div>
        ))}
      </div>
    );
  }

  if (card.layout === "bars") {
    return (
      <div className="mt-5 space-y-3 rounded-[14px] border border-white/[0.07] bg-bg-tertiary/70 p-4">
        {card.bars?.map((bar, index) => (
          <div key={index}>
            <div className="mb-1 flex justify-between text-[.62rem] text-text-muted">
              <span>{["Lead", "Propuesta", "Cierre"][index]}</span>
              <span>{bar}%</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#e8126f] via-brand-purple-light to-brand-blue-light"
                initial={{ width: 0 }}
                animate={{ width: `${bar}%` }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

export default function HeroImpactCarousel() {
  const [active, setActive] = useState(0);
  const card = cards[active];
  const Icon = card.icon;

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % cards.length);
    }, 5200);
    return () => window.clearInterval(id);
  }, []);

  const progress = useMemo(() => cards.map((_, index) => index === active), [active]);

  return (
    <div className="relative min-h-[390px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={card.title}
          className="absolute inset-x-0 top-0 rounded-[22px] border border-white/[0.08] bg-bg-card/88 p-7 shadow-[0_24px_90px_rgba(0,0,0,.34)] backdrop-blur-xl gradient-border lift-card"
          initial={{ opacity: 0, y: 22, scale: 0.97, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -18, scale: 0.98, filter: "blur(8px)" }}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-start justify-between gap-5">
            <div>
              <div className="mb-3 text-[.65rem] font-semibold uppercase tracking-[.16em] text-text-muted">
                {card.eyebrow}
              </div>
              <div className="text-5xl font-light gradient-text">{card.value}</div>
              <h3 className="mt-2 text-[.95rem] font-semibold text-text-primary">{card.title}</h3>
              <p className="mt-1 max-w-[390px] text-[.78rem] font-light leading-relaxed text-text-secondary">
                {card.description}
              </p>
            </div>
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] border ${accentClasses[card.accent as keyof typeof accentClasses]}`}>
              <Icon size={23} strokeWidth={1.6} />
            </div>
          </div>

          <MiniVisual card={card} />

          <div className="mt-5 grid grid-cols-2 gap-3">
            {card.stats.map((stat) => (
              <div key={stat.label} className="rounded-[14px] border border-white/[0.07] bg-bg-tertiary/85 px-4 py-4">
                <div className="text-2xl font-light text-brand-blue-light">{stat.value}</div>
                <div className="mt-0.5 text-[.68rem] text-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="absolute -right-5 top-5 rounded-[14px] border border-white/[0.08] bg-bg-card px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.32)]"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Zap size={20} className="mb-1 text-brand-green" />
        <div className="text-[.6875rem] text-text-muted">
          <strong className="block text-[.8125rem] font-semibold text-text-primary">{active + 1}/{cards.length} casos</strong>
          escenarios de impacto
        </div>
      </motion.div>

      <div className="absolute -bottom-6 left-3 flex gap-2 opacity-70">
        {progress.map((isActive, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Ver caso ${index + 1}`}
            onClick={() => setActive(index)}
            className={`h-1.5 rounded-full transition-all ${isActive ? "w-7 bg-brand-purple" : "w-1.5 bg-brand-purple/25 hover:bg-brand-purple/45"}`}
          />
        ))}
      </div>
    </div>
  );
}
