# ⚡ NI3 — Developer Operating System v2.0.0

> *"It's not a portfolio. It's an operating system for developers."*

**🌐 Live:** [ni3-chi.vercel.app](https://ni3-chi.vercel.app) · **Vercel Dashboard:** [vercel.com/nitinkumar-team/ni3](https://vercel.com/nitinkumar-team/ni3) · **Branch:** `v2.0.0`

## 🧬 What Even Is This?

Welcome to **NI3** — a portfolio that got so ambitious it stopped being a portfolio and became a **Developer Operating System**. ATMOS-inspired living 3D background, 5 theme modes, a 6-step cinematic loader, a Digital Playground with interactive 3D buildings, expanded GitHub dashboard with 8 analytics panels, categorized skills groups, merged project hierarchy, and a Konami Code easter egg that turns everything into Cyber Mode. Because why wouldn't you?

This is the **v2.0.0** rewrite from the ground up. Every component rebuilt. Every pixel reconsidered. Every dependency judged. (We kept some. We're not monks.)

---

## 🎮 The Developer OS Concept

| Feature | What It Does |
|---|---|
| **3D Living Background** | 5 cloud particle layers, 3 aurora ribbons (TubeGeometry), 600 dust particles, glowing Icosahedron core, scroll-driven fog/color |
| **5 Theme Modes** | Blue (default), AI Purple, Data Orange, Minimal White, Cyber (Konami) — pill switcher at bottom |
| **6-Step Loading Sequence** | "Initializing Developer OS → Loading Projects → Loading Automation Engine → Loading AI Toolkit → Loading GitHub Universe → Welcome" with gradient progress bar |
| **Digital Playground** | Interactive 3D section with grid floor, 5 emissive buildings, central crystal octahedron, 7 floating data nodes, clickable tech facts |
| **GitHub Dashboard** | 8 panels: Overview, Contribution Analytics, Repository Insights, Technology Breakdown, Coding Activity, Open Source Impact, Repository Explorer, Language Universe |
| **Skill Groups** | 7 categorized groups (Automation, Testing, Python, Web, Data Science, Cyber Security, AI) with glassmorphism cards |
| **Project Hierarchy** | Featured (9) + All Projects with search, filter by category, sort by stars/name |
| **Recommendations v2** | 8 received carousel + Professional Highlights + Community Impact subsections |
| **Multi-Image System** | Distributed images across Hero, About, Experience, Contact, Timeline + dynamic card images |
| **Interactive Terminal** | Live terminal in footer with 7 commands: `help`, `about`, `skills`, `projects`, `github`, `contact`, `cyber` |
| **Live Clock** | Real-time clock and date in the footer |
| **Social Orbit** | 12 social links with platform SVG icons laid out in an orbit-style grid |
| **Cyber Mode** | Konami Code (`↑↑↓↓←→←→BA`) triggers neon theme overlay |
| **Testimonial Carousel** | Auto-rotating with manual controls, 6s interval |

---

## 🧩 Tech Stack v2.0

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 16.2.7 | Cutting edge, bleeding, etc. |
| **UI** | React 19 + TypeScript | Type-safe everything |
| **Styling** | Tailwind CSS v4 | `@theme inline`, utility-first, chaos-later |
| **Animation** | Motion 12.40 | Framer Motion successor, same API, less drama |
| **3D** | Three.js + R3F + Drei | WebGL for days |
| **Icons** | Lucide React + Custom SVGs | Brand icons? We built `em. |
| **State** | Zustand | 3 actions, 2 reducers, 0 boilerplate |
| **Data** | JSON | Schema-validated portfolio data, now with skill groups and images |
| **Analytics** | Vercel Analytics + Speed Insights | Track all 0.5 visitors |
| **Fonts** | Geist (Sans + Mono) | Vercel's finest |

---

## 📁 Project Structure v2.0 (Now 50% More Organized)

```
ni3/
├── data/
│   └── portfolio.json       # 🧬 Single source of truth — ~560 lines (skill groups, images, highlights)
├── src/
│   ├── app/
│   │   ├── layout.tsx        # SEO, JSON-LD, fonts, skip-to-content
│   │   ├── page.tsx          # All sections, wired & ready
│   │   ├── globals.css       # Full design system (5 themes, glass, holographic, color-mix)
│   │   ├── providers.tsx     # TanStack Query client
│   │   ├── robots.ts         # SEO robots
│   │   ├── sitemap.ts        # Dynamic sitemap
│   │   ├── manifest.ts       # PWA manifest
│   │   └── llms.txt/         # LLM-friendly context
│   ├── components/
│   │   ├── animations/       # scroll-reveal with 4 directions
│   │   ├── layout/           # Navbar (active section tracking) + Footer (terminal)
│   │   ├── sections/         # 12 section components (Mini Universe removed, Featured merged into Projects)
│   │   ├── three/            # Scene3D (ATMOS-style living background), Digital Playground
│   │   ├── ui/               # Button (4 variants), Badge (4 variants), Card (tilt/glow/hover)
│   │   ├── easter-egg.tsx    # Konami Code detector → cyber theme
│   │   ├── loading-screen.tsx  # 6-step cinematic loading sequence
│   │   ├── theme-switcher.tsx  # 5-pill bottom-center theme selector
│   │   └── theme-init.tsx      # CSS variable theme initialization
│   └── lib/
│       ├── types.ts          # All TypeScript interfaces (SkillGroup, HighlightItem, PortfolioImages, etc.)
│       ├── data.ts           # Typed JSON loader
│       ├── store.ts          # Zustand: activeSection, cyberMode, theme
│       ├── utils.ts          # cn(), formatDate, slugify
│       └── icons.tsx         # 11 custom SVG brand icons
└── public/images/            # Multi-image system (nitin.jpg, profile-*.jpg, item-*.jpg, etc.)
```

---

## 🏗️ The 12+ Sections

| # | Section | Key Feature |
|---|---|---|
| 1 | **Hero** | Aurora overlays, gradient text, role rotator, primary image |
| 2 | **About** | Professional summary, roles list, 6 animated counters, secondary portrait |
| 3 | **Education** | Timeline with icons, degree badges, gradient dots |
| 4 | **Experience** | 8 roles in descending order, grouped by company, descriptions + highlights, timeline layout |
| 5 | **Skills** | 7 categorized groups (Automation, Testing, Python, Web, Data Science, Cyber Security, AI) with glassmorphism cards, skill tags |
| 6 | **Certifications** | Split layout: certs + awards + publications |
| 7 | **Projects** | Featured (9) + All Projects with search, category filters, sorting (stars/name), responsive grid |
| 8 | **GitHub Dashboard** | 8 panels: Overview (6 stats), Contribution Analytics (streak/weekly/monthly/yearly), Repository Insights, Technology Breakdown (6 languages), Coding Activity (7-day chart), Open Source Impact, Repository Explorer (search/sort), Language Universe |
| 9 | **AI & Automation Lab** | Split: AI tools + automation workflows |
| 10 | **Blog** | dev.to-inspired article cards, tags, reactions |
| 11 | **Testimonials** | Animated carousel, 5 stars, auto-rotate 6s |
| 12 | **Recommendations** | 8 received carousel + Professional Highlights (4 cards) + Community Impact (4 cards) |
| 13 | **Digital Playground** | Interactive 3D section — 5 buildings, crystal, data nodes, tech facts tooltips |
| 14 | **Contact** | Split layout: info cards + form with send animation |
| 15 | **Footer** | Terminal, live clock, 12 social links, aurora bg |

---

## 🎨 Design System

### Themes (5 Modes)
| Theme | Primary | Vibe |
|---|---|---|
| **Blue** (default) | `#00E5FF` | Tech, futuristic |
| **AI** | `#A855F7` | Purple, mystical |
| **Data** | `#F97316` | Orange, analytical |
| **Minimal** | `#FFFFFF` | Clean, focused |
| **Cyber** (Konami) | `#00FF41` | Hacker, terminal |

### Glassmorphism
```css
.glass {
  background: color-mix(in srgb, var(--foreground) 2%, transparent);
  backdrop-filter: blur(12px);
  border: 1px solid var(--card-border);
}
```

### Key Animations
- `pulse-glow` — border and shadow pulse for active elements
- `drift` — slow floating for decorative elements
- `aurora` — slowly shifting gradient positions
- `float` — 3D objects bob up and down
- `holographic` — shimmer sweep across the surface

---

## 🔥 Easter Eggs

### Konami Code
```
↑ ↑ ↓ ↓ ← → ← → B A
```
Activates **Cyber Mode** — neon green theme overlay, terminal-style UI shift. Deactivates back to blue theme.

### Terminal Commands
- `help` — available commands
- `about` — bio summary
- `skills` — proficiency breakdown
- `projects` — project count
- `github` — GitHub profile
- `contact` — email + location
- `cyber` — toggle Cyber Mode

---

## 🚀 Running v2.0.0

```bash
# install
npm install

# dev
npm run dev

# build (use --webpack on Windows)
npx next build --webpack

# production
npm start
```

> **Node 18+ required.** If you're on Node 16, *why*?

### Deploy to Vercel

```bash
npx vercel deploy --prod --token <token>
```

Already deployed: [ni3-chi.vercel.app](https://ni3-chi.vercel.app) — Turbopack build, ~36s deploy, 8 pages static.

---

## 📊 Build Stats

| Metric | Value |
|---|---|
| **Sections** | 12+ (features merged) |
| **Components** | ~40 |
| **Data Lines** | ~560 (portfolio.json) |
| **3D Geometries** | Aurora ribbons + clouds + particles + buildings + data nodes |
| **Particles** | 3000+ (desktop) / 800+ (mobile) |
| **Social Links** | 12 |
| **Custom Icons** | 11 (all hand-crafted SVGs) |
| **Themes** | 5 (Blue, AI, Data, Minimal, Cyber) |
| **Build Time** | ~25s |
| **TypeScript Errors** | 0 (we checked) |

---

## 🧠 Lessons Learned (v2.0 Edition)

- `motion` package is the Framer Motion successor — same API, fewer bytes
- lucide-react 1.x has **zero** brand icons — write your own SVGs or weep
- Three.js TubeGeometry + CatmullRomCurve3 = aurora ribbons that make people say "whoa"
- Tailwind v4 uses `@theme inline` — `extend` is so 2024
- `color-mix()` CSS function eliminates the need for hardcoded opacity variants per theme
- A single `portfolio.json` is better than 7 scattered data files — even at 560 lines
- Skill groups > individual skill bars when you have 30+ skills across 7 domains
- GitHub dashboard with 8 panels is way more impressive than a boring stat row
- Mini Universe is gone. No one noticed. We're fine.

---

## 🏆 Awards This v2.0 Definitely Won't Win

- ❌ Awwwards Site of the Month (maybe next rewrite)
- ❌ CSS Design Awards (they wanted more gradients)
- ❌ FWA Site of the Day (who even submits to FWA anymore)
- ✅ Most Times a Portfolio Referenced "Atmos" in 2026 (we'd sweep this category)

---

## 📜 Presentation (Now in 3D)

Google Slides presentation covering the architecture, design decisions, and token usage:
👉 **[Google Slides Link](https://docs.google.com/presentation/d/1l4-QUskSenCZxsKZXVlZ7hW5VsbdiXnHxwYMFL8y0Ks/edit?usp=sharing)**

---

## 🔮 Roadmap (v2.1 Maybe)

- [x] Konami Code easter egg
- [x] Living 3D background (ATMOS-style)
- [x] 5 theme modes with CSS variables
- [x] 6-step cinematic loading screen
- [x] Digital Playground 3D section
- [x] Expanded GitHub dashboard (8 panels)
- [x] Merged project hierarchy (Featured + All)
- [x] Categorized skill groups
- [x] Multi-image distribution system
- [ ] GitHub API live data fetching
- [ ] Dev.to API blog integration
- [ ] PWA offline support
- [ ] Light mode (who are we kidding, dark only)

---

## 🌐 Social (All 12)

GitHub · LinkedIn · X (Twitter) · Instagram · Stack Overflow · WhatsApp · Dev.to · Holopin · PyPI · HackerRank · Email · Phone

---

*Built with ❤️, ☕, and an AI agent that wrote ~8,000 lines of TypeScript across multiple sessions. The future is now, and it's surprisingly sarcastic.*

---

> **P.S.** This README is also longer than the actual code. Priorities.
