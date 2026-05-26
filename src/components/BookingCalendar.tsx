"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Building2, CheckCircle2, ChevronLeft, ChevronRight, MapPin, Phone, UserRound } from "lucide-react";

type SlotState = "available" | "busy" | "selected";
type Reservation = {
  dateKey: string;
  time: string;
  name: string;
  lastname: string;
  company: string;
  phone: string;
  address: string;
};

const monthNames = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const dayNames = ["L", "M", "M", "J", "V", "S", "D"];
const times = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30"];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, amount: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + amount);
  return next;
}

function toKey(date: Date) {
  return date.getFullYear() + "-" + String(date.getMonth() + 1).padStart(2, "0") + "-" + String(date.getDate()).padStart(2, "0");
}

function fromKey(key: string) {
  const [year, month, day] = key.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function isWeekday(date: Date) {
  const day = date.getDay();
  return day >= 1 && day <= 5;
}

function isSimulatedBusy(dateKey: string, time: string) {
  const source = dateKey + "-" + time;
  let hash = 0;
  for (let i = 0; i < source.length; i += 1) hash = (hash * 31 + source.charCodeAt(i)) % 997;
  return hash % 10 < 5 || (time.endsWith("00") && hash % 7 === 0);
}

function buildMonth(year: number, month: number) {
  const first = new Date(year, month, 1);
  const startOffset = (first.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = [];

  for (let i = 0; i < startOffset; i += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(new Date(year, month, day));
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export default function BookingCalendar() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const minDate = useMemo(() => addDays(today, 4), [today]);
  const [visibleMonth, setVisibleMonth] = useState(() => new Date(minDate.getFullYear(), minDate.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(() => minDate);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [confirmed, setConfirmed] = useState<Reservation | null>(null);
  const [form, setForm] = useState({ name: "", lastname: "", company: "", phone: "", address: "" });

  useEffect(() => {
    const id = window.setTimeout(() => {
      try {
        const stored = window.localStorage.getItem("nexalia-reservations");
        if (stored) setReservations(JSON.parse(stored));
      } catch {
        setReservations([]);
      }
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  const cells = useMemo(() => buildMonth(visibleMonth.getFullYear(), visibleMonth.getMonth()), [visibleMonth]);
  const selectedKey = selectedDate ? toKey(selectedDate) : "";
  const reservedKeys = useMemo(() => new Set(reservations.map((item) => item.dateKey + "-" + item.time)), [reservations]);

  const getSlotState = (time: string): SlotState => {
    if (!selectedDate) return "busy";
    const key = selectedKey + "-" + time;
    if (selectedTime === time) return "selected";
    if (reservedKeys.has(key) || isSimulatedBusy(selectedKey, time)) return "busy";
    return "available";
  };

  const canSelectDate = (date: Date | null) => {
    if (!date) return false;
    return startOfDay(date) >= minDate && isWeekday(date);
  };

  const nextMonth = () => setVisibleMonth((current) => new Date(current.getFullYear(), current.getMonth() + 1, 1));
  const previousMonth = () => {
    const previous = new Date(visibleMonth.getFullYear(), visibleMonth.getMonth() - 1, 1);
    if (previous >= new Date(today.getFullYear(), today.getMonth(), 1)) setVisibleMonth(previous);
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedDate || !selectedTime) return;
    const reservation: Reservation = { dateKey: selectedKey, time: selectedTime, ...form };
    const next = [...reservations, reservation];
    setReservations(next);
    setConfirmed(reservation);
    window.localStorage.setItem("nexalia-reservations", JSON.stringify(next));
    setSelectedTime(null);
    setForm({ name: "", lastname: "", company: "", phone: "", address: "" });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_.95fr]">
      <div className="rounded-[20px] border border-white/[0.08] bg-bg-card/80 p-5 backdrop-blur-xl gradient-border">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-[.68rem] font-semibold uppercase tracking-[.16em] text-brand-blue-light">Selecciona un dia</p>
            <h2 className="mt-1 text-2xl font-light capitalize text-text-primary">{monthNames[visibleMonth.getMonth()]} {visibleMonth.getFullYear()}</h2>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={previousMonth} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] text-text-secondary transition hover:border-brand-blue hover:text-text-primary" aria-label="Mes anterior">
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={nextMonth} className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] text-text-secondary transition hover:border-brand-blue hover:text-text-primary" aria-label="Mes siguiente">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-[.7rem] text-text-muted">
          {dayNames.map((day, index) => <div key={day + index} className="py-2 font-semibold">{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-2">
          {cells.map((date, index) => {
            const enabled = canSelectDate(date);
            const active = date && selectedKey === toKey(date);
            return (
              <button
                key={date ? toKey(date) : "empty-" + index}
                type="button"
                disabled={!enabled}
                onClick={() => {
                  if (!date) return;
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                className={"aspect-square rounded-[12px] border text-sm transition " + (active
                  ? "border-brand-green bg-brand-green text-[#0a0a12] font-semibold shadow-[0_0_28px_rgba(128,186,39,.2)]"
                  : enabled
                    ? "border-white/[0.08] bg-bg-tertiary/65 text-text-secondary hover:border-brand-blue hover:text-text-primary"
                    : "border-transparent text-text-muted/25")}
              >
                {date?.getDate() ?? ""}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-wrap gap-3 text-[.72rem] text-text-muted">
          <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand-green" />Disponible</span>
          <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-brand-purple" />Seleccionado</span>
          <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-white/20" />Ocupado / no disponible</span>
        </div>
      </div>

      <div className="rounded-[20px] border border-white/[0.08] bg-bg-card/80 p-5 backdrop-blur-xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-[.68rem] font-semibold uppercase tracking-[.16em] text-brand-blue-light">Horarios disponibles</p>
            <h2 className="mt-1 text-xl font-light text-text-primary">
              {selectedDate ? selectedDate.toLocaleDateString("es-AR", { weekday: "long", day: "numeric", month: "long" }) : "Elegi un dia"}
            </h2>
          </div>
          <div className="rounded-[12px] border border-brand-green/25 bg-brand-green/10 px-3 py-2 text-[.7rem] font-medium text-brand-green">desde 13 hs</div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {times.map((time) => {
            const state = getSlotState(time);
            return (
              <button
                key={time}
                type="button"
                disabled={state === "busy"}
                onClick={() => setSelectedTime(time)}
                className={"rounded-[12px] border px-3 py-3 text-sm transition " + (state === "selected"
                  ? "border-brand-green bg-brand-green text-[#0a0a12] font-semibold"
                  : state === "available"
                    ? "border-white/[0.08] bg-bg-tertiary/70 text-text-secondary hover:border-brand-blue hover:text-text-primary"
                    : "border-white/[0.04] bg-white/[0.03] text-text-muted/35 line-through")}
              >
                {time}
              </button>
            );
          })}
        </div>

        <form onSubmit={submit} className="mt-6 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field icon={<UserRound size={16} />} label="Nombre" value={form.name} onChange={(value) => setForm({ ...form, name: value })} />
            <Field icon={<UserRound size={16} />} label="Apellido" value={form.lastname} onChange={(value) => setForm({ ...form, lastname: value })} />
          </div>
          <Field icon={<Building2 size={16} />} label="Empresa" value={form.company} onChange={(value) => setForm({ ...form, company: value })} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field icon={<Phone size={16} />} label="Telefono" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} />
            <Field icon={<MapPin size={16} />} label="Direccion" value={form.address} onChange={(value) => setForm({ ...form, address: value })} />
          </div>
          <button
            type="submit"
            disabled={!selectedDate || !selectedTime || Object.values(form).some((value) => !value.trim())}
            className="sheen mt-2 w-full rounded-full bg-brand-green px-6 py-3 text-sm font-semibold text-[#0a0a12] transition hover:bg-brand-green-light disabled:cursor-not-allowed disabled:opacity-40"
          >
            Reservar diagnostico
          </button>
        </form>

        <AnimatePresence>
          {confirmed && (
            <motion.div
              className="mt-5 rounded-[16px] border border-brand-green/25 bg-brand-green/10 p-4 text-sm text-text-secondary"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
            >
              <div className="mb-1 flex items-center gap-2 font-semibold text-brand-green"><CheckCircle2 size={17} /> Turno reservado</div>
              {confirmed.name}, te esperamos el {fromKey(confirmed.dateKey).toLocaleDateString("es-AR", { day: "numeric", month: "long" })} a las {confirmed.time}.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Field({ icon, label, value, onChange }: { icon: React.ReactNode; label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="block">
      <span className="mb-1.5 flex items-center gap-2 text-[.7rem] font-medium uppercase tracking-[.1em] text-text-muted">{icon}{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required
        className="w-full rounded-[12px] border border-white/[0.08] bg-bg-tertiary/70 px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-brand-blue"
      />
    </label>
  );
}
