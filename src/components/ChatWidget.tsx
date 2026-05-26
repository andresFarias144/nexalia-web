"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send } from "lucide-react";

type Message = { text: string; from: "bot" | "user" };

const RESPONSES: Record<string, string> = {
  servicios:
    "Ofrecemos 7 soluciones: Agentes IA para WhatsApp, Automatización administrativa, Dashboards inteligentes, Gestión documental, Optimización de flujos, Automatización de marketing y ventas, y Gestión de RRHH con IA. ¿Te interesa alguno en particular?",
  whatsapp:
    "Nuestros Agentes IA para WhatsApp atienden a tus clientes 24/7, responden consultas frecuentes, agendan turnos y toman pedidos automáticamente. Cuando la consulta es compleja, derivan a un humano con todo el contexto.",
  precio:
    "Cada solución se presupuesta según la complejidad y necesidades de tu empresa. Ofrecemos un diagnóstico gratuito donde analizamos tus procesos y te damos una propuesta con costos claros. ¿Te agendo una reunión?",
  diagnostico:
    "¡Genial! El diagnóstico es una reunión gratuita de 30-60 minutos donde visitamos tu empresa, entendemos tus procesos y detectamos oportunidades de automatización. Sin compromiso. Podés agendarlo por WhatsApp al +54 9 3364 539663.",
  como:
    "Nuestro proceso tiene 5 etapas: 1) Diagnóstico gratuito, 2) Diseño de solución, 3) Implementación ágil (2-4 semanas), 4) Capacitación del equipo, 5) Soporte continuo.",
  default:
    "Gracias por tu consulta. Para darte la mejor respuesta, te sugiero agendar un diagnóstico gratuito. ¿Querés que te cuente cómo funciona?",
};

function getResponse(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes("servicio") || m.includes("solucio") || m.includes("hacen")) return RESPONSES.servicios;
  if (m.includes("whatsapp") || m.includes("chatbot") || m.includes("bot") || m.includes("agente")) return RESPONSES.whatsapp;
  if (m.includes("precio") || m.includes("costo") || m.includes("cuanto") || m.includes("cuánto")) return RESPONSES.precio;
  if (m.includes("diagnos") || m.includes("reunion") || m.includes("reunión") || m.includes("agendar")) return RESPONSES.diagnostico;
  if (m.includes("como") || m.includes("cómo") || m.includes("proceso") || m.includes("trabaj")) return RESPONSES.como;
  return RESPONSES.default;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "¡Hola! Soy Nexa, la asistente virtual de Nexalia. ¿En qué puedo ayudarte? Puedo contarte sobre nuestros servicios, cómo trabajamos, o agendar un diagnóstico gratuito para tu empresa.",
      from: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setMessages((prev) => [...prev, { text, from: "user" }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: getResponse(text), from: "bot" }]);
    }, 700);
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="pulse-ring fixed bottom-6 right-6 w-14 h-14 rounded-full bg-brand-green text-[#0a0a12] flex items-center justify-center shadow-[0_6px_24px_rgba(128,186,39,0.25)] z-50 hover:scale-110 transition"
        initial={{ opacity: 0, scale: 0.7, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.96 }}
        aria-label="Abrir chat"
      >
        <MessageCircle size={26} strokeWidth={1.5} />
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
      {open && (
        <motion.div className="fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-2rem)] h-[500px] bg-bg-secondary border border-white/[0.06] rounded-[20px] z-50 flex flex-col overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]" initial={{ opacity: 0, y: 22, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.96 }} transition={{ duration: 0.34 }}>
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/[0.06] bg-bg-card flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple-light flex items-center justify-center text-white font-semibold text-sm">
                N
              </div>
              <div>
                <h3 className="text-sm font-semibold">Nexa</h3>
                <span className="text-[.65rem] text-brand-green font-medium">● Online</span>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-text-muted hover:text-text-primary transition">
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-4 py-3 text-[.8125rem] leading-relaxed ${
                  msg.from === "bot"
                    ? "bg-bg-card border border-white/[0.06] self-start rounded-[14px] rounded-bl-[4px] font-light"
                    : "bg-gradient-to-br from-brand-blue to-brand-purple-light text-white self-end rounded-[14px] rounded-br-[4px] font-normal"
                }`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEnd} />
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-white/[0.06] bg-bg-card flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escribí tu consulta..."
              className="flex-1 bg-bg-secondary border border-white/[0.06] rounded-full px-4 py-2.5 text-[.8125rem] text-text-primary placeholder:text-text-muted outline-none focus:border-brand-blue transition font-light"
            />
            <button
              onClick={handleSend}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple-light text-white flex items-center justify-center flex-shrink-0 hover:opacity-90 transition"
            >
              <Send size={16} />
            </button>
          </div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
