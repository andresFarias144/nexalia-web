"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import Logo from "./Logo";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/90 backdrop-blur-2xl border-b border-white/[0.06]" initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}>
      <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between h-[72px]">
        <Link href="/">
          <Logo height={42} />
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/#servicios" className="text-[.8125rem] text-text-secondary hover:text-text-primary transition font-medium">
            Servicios
          </Link>
          <Link href="/#metodologia" className="text-[.8125rem] text-text-secondary hover:text-text-primary transition font-medium">
            Metodología
          </Link>
          <Link href="/#sectores" className="text-[.8125rem] text-text-secondary hover:text-text-primary transition font-medium">
            Sectores
          </Link>
          <Link href="/#contacto" className="text-[.8125rem] text-text-secondary hover:text-text-primary transition font-medium">
            Contacto
          </Link>
          <Link href="/agenda" className="text-[.8125rem] text-text-secondary hover:text-text-primary transition font-medium">
            Agenda
          </Link>
          <Link
            href="/agenda"
            className="sheen bg-brand-green text-[#0a0a12] px-5 py-2 rounded-full text-[.8125rem] font-semibold hover:bg-brand-green-light transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(128,186,39,0.25)]"
          >
            Agendar diagnóstico →
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-text-secondary">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
        <motion.div className="md:hidden bg-bg-secondary border-t border-white/[0.06] px-8 py-6 flex flex-col gap-4" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.34 }}>
          <Link href="/#servicios" onClick={() => setOpen(false)} className="text-text-secondary hover:text-text-primary transition">Servicios</Link>
          <Link href="/#metodologia" onClick={() => setOpen(false)} className="text-text-secondary hover:text-text-primary transition">Metodología</Link>
          <Link href="/#sectores" onClick={() => setOpen(false)} className="text-text-secondary hover:text-text-primary transition">Sectores</Link>
          <Link href="/#contacto" onClick={() => setOpen(false)} className="text-text-secondary hover:text-text-primary transition">Contacto</Link>
          <Link
            href="/agenda"
            onClick={() => setOpen(false)}
            className="bg-brand-green text-[#0a0a12] px-5 py-3 rounded-full text-center font-semibold mt-2"
          >
            Agendar diagnóstico →
          </Link>
        </motion.div>
      )}
      </AnimatePresence>
    </motion.nav>
  );
}
