import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nexalia — Automatización inteligente para empresas",
  description:
    "Analizamos tus procesos, detectamos oportunidades y aplicamos inteligencia artificial para que tu empresa opere mejor. Agentes IA, automatización administrativa, dashboards inteligentes y más.",
  keywords: [
    "automatización",
    "inteligencia artificial",
    "IA para empresas",
    "chatbot WhatsApp",
    "automatización de procesos",
    "PyMEs",
    "Argentina",
  ],
  openGraph: {
    title: "Nexalia — Automatización inteligente para empresas",
    description:
      "Optimizamos tu empresa con automatización e inteligencia artificial.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={montserrat.variable}>
      <body className="antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  );
}
