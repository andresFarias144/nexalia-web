import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="py-12 border-t border-white/[0.06] bg-bg-secondary">
      <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] gap-12">
        <div>
          <Logo height={30} />
          <p className="text-[.8125rem] text-text-muted mt-3 leading-relaxed max-w-[280px] font-light">
            Automatización e inteligencia artificial para empresas que quieren
            operar mejor.
          </p>
        </div>
        <div>
          <h4 className="text-[.65rem] uppercase tracking-[.12em] text-text-muted font-semibold mb-4">
            Servicios
          </h4>
          <nav className="flex flex-col gap-1">
            <Link href="#" className="text-[.8125rem] text-text-secondary hover:text-brand-blue-light transition py-1 font-light">Agentes IA para WhatsApp</Link>
            <Link href="#" className="text-[.8125rem] text-text-secondary hover:text-brand-blue-light transition py-1 font-light">Automatización administrativa</Link>
            <Link href="#" className="text-[.8125rem] text-text-secondary hover:text-brand-blue-light transition py-1 font-light">Dashboards inteligentes</Link>
            <Link href="#" className="text-[.8125rem] text-text-secondary hover:text-brand-blue-light transition py-1 font-light">Gestión de documentos</Link>
            <Link href="#" className="text-[.8125rem] text-text-secondary hover:text-brand-blue-light transition py-1 font-light">Flujos de trabajo</Link>
            <Link href="#" className="text-[.8125rem] text-text-secondary hover:text-brand-blue-light transition py-1 font-light">Marketing y ventas</Link>
          </nav>
        </div>
        <div>
          <h4 className="text-[.65rem] uppercase tracking-[.12em] text-text-muted font-semibold mb-4">
            Empresa
          </h4>
          <nav className="flex flex-col gap-1">
            <Link href="#" className="text-[.8125rem] text-text-secondary hover:text-brand-blue-light transition py-1 font-light">Nosotros</Link>
            <Link href="#" className="text-[.8125rem] text-text-secondary hover:text-brand-blue-light transition py-1 font-light">Casos de éxito</Link>
            <Link href="#" className="text-[.8125rem] text-text-secondary hover:text-brand-blue-light transition py-1 font-light">Metodología</Link>
            <Link href="#" className="text-[.8125rem] text-text-secondary hover:text-brand-blue-light transition py-1 font-light">Blog</Link>
          </nav>
        </div>
        <div>
          <h4 className="text-[.65rem] uppercase tracking-[.12em] text-text-muted font-semibold mb-4">
            Contacto
          </h4>
          <nav className="flex flex-col gap-1">
            <a href="mailto:info@nexalia.com.ar" className="text-[.8125rem] text-text-secondary hover:text-brand-blue-light transition py-1 font-light">info@nexalia.com.ar</a>
            <a href="https://wa.me/5493364539663" className="text-[.8125rem] text-text-secondary hover:text-brand-blue-light transition py-1 font-light">+54 9 3364 539663</a>
            <span className="text-[.8125rem] text-text-secondary py-1 font-light">San Nicolás, Buenos Aires</span>
          </nav>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-8 mt-8 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-[.7rem] text-text-muted font-normal">© 2026 Nexalia. Todos los derechos reservados.</p>
        <p className="text-[.7rem] text-text-muted font-normal">Hecho con IA en Argentina</p>
      </div>
    </footer>
  );
}
