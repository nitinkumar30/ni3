# 🔁 Replit Deployment Guide

> **Branch:** `replit`  
> **Stack:** Vite + React 19 + TypeScript + Tailwind CSS v4

---

## 🚀 Import to Replit

### 1. Create a new Repl

1. Go to [replit.com](https://replit.com) and click **+ Create Repl**
2. Choose **Import from GitHub**
3. Enter: `https://github.com/nitinkumar30/ni3`
4. Set **Branch** to `replit`
5. Click **Import from GitHub**

### 2. Configure Run Command

After import, set the run command:

```bash
npm run dev
```

Replit will automatically detect the Vite dev server and provide a public URL.

---

## 📋 Manual Setup (Alternative)

```bash
# Clone the replit branch
git clone -b replit https://github.com/nitinkumar30/ni3.git
cd ni3

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## ⚙️ What's Different

The `replit` branch is optimized for Replit's browser-based environment:

| Feature | main/vercel | replit |
|---------|-------------|--------|
| Framework | Next.js 16 (SSR) | Vite + React (CSR) |
| 3D Background | Full Scene3D (40 geometries + 2000 particles) | Scene3D with WebGL detection + 2D fallback |
| Animations | Framer Motion + GSAP + Lenis | Framer Motion only |
| Entry Point | `src/app/page.tsx` | `src/main.tsx` → `src/App.tsx` |
| Config | `next.config.ts` | `vite.config.ts` |

---

## 🧹 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with HMR |
| `npm run build` | Create optimized production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## 🔧 Troubleshooting

| Issue | Solution |
|-------|----------|
| **Blank page or no 3D on Replit** | Replit's browser container may block WebGL — 3D automatically falls back to 2D particles. Check your browser supports WebGL at https://get.webgl.org/ |
| **`Module not found`** | Run `npm install` to reinstall dependencies |
| **Port already in use** | Vite will auto-prompt to use a different port |
| **Tailwind styles not applied** | Ensure `src/index.css` imports `tailwindcss` (it does by default) |
| **Three.js errors** | The 3D avatar uses WebGL — if unsupported in your Replit browser tab, it gracefully fails (Suspense fallback) |

---

## 📦 Tech Stack

React 19 · TypeScript · Tailwind CSS v4 · Framer Motion · Three.js · React Three Fiber · Vite · Lucide Icons · TanStack Query
