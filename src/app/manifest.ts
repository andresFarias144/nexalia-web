import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nexalia — Automatización inteligente",
    short_name: "Nexalia",
    description: "Automatización e inteligencia artificial para empresas",
    start_url: "/",
    display: "standalone",
    background_color: "#090b14",
    theme_color: "#80ba27",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
