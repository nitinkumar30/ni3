# 🖥️ Local Deployment Guide

> **Branch:** `main`  
> **Stack:** Next.js 16 + React 19 + TypeScript + Tailwind CSS v4

---

## 📋 Prerequisites

- **Node.js** 18.18+ (recommended: 22.x)
- **npm** 9+
- **Git**

---

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/nitinkumar30/ni3.git
cd ni3

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The site will be available at **http://localhost:3000** ✨

---

## 🏗️ Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

> **Note for Windows users**: If you encounter SWC binding errors, use the webpack fallback:
> ```bash
> npx next build --webpack
> ```

---

## 🧹 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Create optimized production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🎨 Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Used for OG images, sitemap, robots.txt |

For local development, no configuration needed — the site works out of the box.

---

## 🏁 What You Get

```
📦 ni3
├── src/
│   ├── app/           # Next.js App Router pages
│   ├── components/    # React components (sections, UI, 3D, animations)
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Data layer (portfolio-data.ts, utils)
│   └── ...
├── public/            # Static assets (images, icons)
├── next.config.ts     # Next.js configuration
├── tailwind.config.ts # Tailwind CSS configuration
└── package.json       # Dependencies and scripts
```

---

## 🖱️ Touch & Mobile

The site is optimized for both desktop and mobile:
- **Desktop**: Full 3D WebGL scene, parallax tilt, magnetic buttons
- **Mobile**: Reduced geometry count, touch-optimized interactions, disabled parallax on touch devices

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| `SWC binary not found` | Use `npx next build --webpack` |
| `Port 3000 in use` | Run `npm run dev -- -p 3001` |
| `Module not found` | Run `npm install` to reinstall dependencies |
| `TypeScript errors in .next/` | Set `typescript.ignoreBuildErrors: true` in next.config.ts (platform bug) |

---

## 📦 Tech Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Three.js · React Three Fiber · GSAP · Lenis · ShadCN UI · Lucide Icons · TanStack Query
