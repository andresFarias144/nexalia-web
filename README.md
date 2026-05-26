# Nexalia — Web

Sitio web de Nexalia, consultora de automatización e inteligencia artificial para empresas.

## Stack

- **Next.js 15** (App Router)
- **React 18** + TypeScript
- **Tailwind CSS v4**
- **Framer Motion** (animaciones)
- **Lucide React** (íconos)
- **Anthropic SDK** (chatbot Nexa)

## Instalación

```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.local.example .env.local
# Editar .env.local con tu ANTHROPIC_API_KEY

# Desarrollo
npm run dev

# Build de producción
npm run build
npm start
```

## Estructura

```
src/
├── app/
│   ├── layout.tsx          # Layout raíz (Navbar, Footer, Chat)
│   ├── page.tsx            # Home
│   ├── manifest.ts         # PWA manifest
│   ├── globals.css         # Estilos globales + variables de marca
│   └── api/chat/route.ts   # API del chatbot Nexa (Claude Haiku)
├── components/
│   ├── Logo.tsx            # Logo SVG de Nexalia
│   ├── Navbar.tsx          # Navegación fija con menú mobile
│   ├── Hero.tsx            # Sección hero con stats
│   ├── StatsBar.tsx        # Barra de estadísticas
│   ├── Services.tsx        # Grilla de 6 servicios
│   ├── Methodology.tsx     # 5 pasos de metodología
│   ├── Industries.tsx      # 8 sectores
│   ├── CtaSection.tsx      # Call-to-action final
│   ├── Footer.tsx          # Footer con links
│   └── ChatWidget.tsx      # Chatbot flotante "Nexa"
└── lib/                    # Utilidades (por agregar)
```

## Colores de marca

- Verde: `#80ba27` (CTAs)
- Azul: `#3b6bdb` / `#5b8af0` (acentos)
- Violeta: `#604a98` / `#8b74c0` (acentos)
- Fondo: `#090b14` (primary) / `#0e1120` (secondary)

## Deployment

Push a `main` → Vercel deploya automáticamente.
