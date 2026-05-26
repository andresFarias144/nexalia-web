import type { Metadata } from "next";
import { CalendarDays, Clock } from "lucide-react";
import BookingCalendar from "@/components/BookingCalendar";

export const metadata: Metadata = {
  title: "Agenda tu diagnostico | Nexalia",
  description: "Reserva un turno para un diagnostico gratuito de automatizacion e inteligencia artificial para tu empresa.",
};

export default function AgendaPage() {
  return (
    <section className="relative overflow-hidden px-8 pb-24 pt-36">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_12%,rgba(91,138,240,.14),transparent_34%),radial-gradient(circle_at_18%_55%,rgba(96,74,152,.16),transparent_30%)] pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-[1200px]">
        <div className="mb-10 max-w-[760px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-bg-tertiary/80 px-4 py-1.5 text-[.7rem] font-semibold uppercase tracking-wider text-brand-blue-light">
            <CalendarDays size={14} className="text-brand-green" /> Agenda de diagnostico
          </div>
          <h1 className="text-4xl font-light leading-tight tracking-tight lg:text-5xl">
            Reserva un turno para analizar <span className="gradient-text">oportunidades de automatizacion</span>
          </h1>
          <p className="mt-5 max-w-[620px] text-base font-light leading-relaxed text-text-secondary">
            Elegi un dia habil de lunes a viernes, con al menos 4 dias de anticipacion. Los horarios disponibles comienzan desde las 13 hs.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-[.78rem] text-text-muted">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-bg-card/70 px-4 py-2"><Clock size={15} className="text-brand-green" /> Turnos de 30 minutos</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-bg-card/70 px-4 py-2">Disponibilidad simulada</span>
          </div>
        </div>
        <BookingCalendar />
      </div>
    </section>
  );
}
