import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-montserrat)", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          green: "#80ba27",
          "green-light": "#a3d94e",
          blue: "#3b6bdb",
          "blue-light": "#5b8af0",
          purple: "#604a98",
          "purple-light": "#8b74c0",
        },
        bg: {
          primary: "#090b14",
          secondary: "#0e1120",
          tertiary: "#141830",
          card: "#111528",
        },
        text: {
          primary: "#e8eaf0",
          secondary: "#8a8fb0",
          muted: "#585e78",
        },
      },
      borderColor: {
        DEFAULT: "rgba(100,120,180,0.12)",
        hover: "rgba(100,120,180,0.25)",
      },
    },
  },
  plugins: [],
};
export default config;
