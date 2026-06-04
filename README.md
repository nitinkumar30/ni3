# ⚡ NI3 — Developer Operating System v2.0.0

> *"It's not a portfolio. It's an operating system for developers."*

## 🧬 What Even Is This?

Welcome to **NI3** — a portfolio that got so ambitious it stopped being a portfolio and became a **Developer Operating System**. 15 interactive sections, a 3D geometric universe, an AI & Automation Lab, a live terminal in the footer, and a Konami Code easter egg that turns everything into Cyber Mode. Because why wouldn't you?

This is the **v2.0.0** rewrite from the ground up. Every component rebuilt. Every pixel reconsidered. Every dependency judged. (We kept some. We're not monks.)

---

## 🎮 The Developer OS Concept

| Feature | What It Does |
|---|---|
| **3D Scene Background** | 50 floating geometries (20 mobile), 3000 particles (800 mobile), 3 point lights, mouse-follow camera |
| **Skill Universe** | 14 skill nodes as glowing spheres with connecting lines from Python center node |
| **Interactive Terminal** | Live terminal in footer with 7 commands: `help`, `about`, `skills`, `projects`, `github`, `contact`, `cyber` |
| **Live Clock** | Real-time clock and date in the footer |
| **Social Orbit** | 12 social links with platform SVG icons laid out in an orbit-style grid |
| **Cyber Mode** | Konami Code (`↑↑↓↓←→←→BA`) triggers neon theme overlay |
| **Animated Counters** | 6 counters that count up when scrolled into view |
| **Skill Rings** | SVG stroke-dashoffset animated proficiency rings |
| **Testimonial Carousel** | Auto-rotating with manual controls, 6s interval |
| **Aurora Background** | Animated gradient orbs with blur, pulse-glow, drift animations |

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
| **Data** | Zod + JSON | Schema-validated portfolio data |
| **Analytics** | Vercel Analytics + Speed Insights | Track all 0.5 visitors |
| **Fonts** | Geist (Sans + Mono) | Vercel's finest |

---

## 📁 Project Structure v2.0 (Now 50% More Organized)

```
ni3/
├── data/
│   └── portfolio.json       # 🧬 Single source of truth — 393 lines
├── src/
│   ├── app/
│   │   ├── layout.tsx        # SEO, JSON-LD, fonts, skip-to-content
│   │   ├── page.tsx          # 15 sections, wired & ready
│   │   ├── globals.css       # Full design system (aurora, glass, holographic)
│   │   ├── providers.tsx     # TanStack Query client
│   │   ├── robots.ts         # SEO robots
│   │   ├── sitemap.ts        # Dynamic sitemap
│   │   ├── manifest.ts       # PWA manifest
│   │   └── llms.txt/         # LLM-friendly context
│   ├── components/
│   │   ├── animations/       # scroll-reveal with 4 directions
│   │   ├── layout/           # Navbar (active section tracking) + Footer (terminal)
│   │   ├── sections/         # 15 section components
│   │   ├── three/            # Scene3D (50 geo), SkillUniverse (14 nodes), SectionParallax
│   │   ├── ui/               # Button (4 variants), Badge (4 variants), Card (glow)
│   │   ├── easter-egg.tsx    # Konami Code detector
│   │   └── json-ld.tsx       # Schema.org Person structured data
│   └── lib/
│       ├── types.ts          # All TypeScript interfaces
│       ├── data.ts           # Typed JSON loader
│       ├── store.ts          # Zustand: activeSection, cyberMode, cursorPos
│       ├── utils.ts          # cn(), formatDate, slugify
│       └── icons.tsx         # 11 custom SVG brand icons
└── public/images/            # me.jpg, favicon-1.png, etc.
```

---

## 🏗️ The 15 Sections (We Counted)

| # | Section | Lines | Key Feature |
|---|---|---|---|
| 1 | **Hero** | ~150 | Aurora overlays, gradient text, role rotator, 3D avatar placeholder |
| 2 | **About** | ~120 | Professional summary, roles list, 6 animated counters |
| 3 | **Education** | ~80 | Timeline with icons, degree badges, gradient dots |
| 4 | **Experience** | ~120 | Work + education merged timeline, sorted by date desc |
| 5 | **Skills** | ~140 | 7 SVG proficiency rings + category badges + 3D universe preview |
| 6 | **Certifications** | ~100 | Split layout: certs + awards + publications |
| 7 | **Featured Projects** | ~113 | GitHub-linked cards, stars, language, topics |
| 8 | **Projects** | ~130 | Toggle featured/all, type-safe union rendering |
| 9 | **GitHub Dashboard** | ~180 | 6 stats, language distribution bars, top repos |
| 10 | **AI & Automation Lab** | ~120 | Split: AI tools + automation workflows |
| 11 | **Blog** | ~100 | dev.to-inspired article cards, tags, reactions |
| 12 | **Testimonials** | ~90 | Animated carousel, 5 stars, auto-rotate 6s |
| 13 | **Achievements** | ~70 | 6 achievement stat cards |
| 14 | **Contact** | ~120 | Split layout: info cards + form with send animation |
| 15 | **Footer** | ~180 | Terminal, live clock, 12 social links, aurora bg |

---

## 🎨 Design System

### Colors
```
Primary:   #00E5FF (Cyan — tech, futuristic)
Secondary: #7B61FF (Purple — premium, mystical)
Accent:    #00FF9D (Green — hacker, terminal)
Surface:   #050816 (Dark — deep space)
```

### Glassmorphism
```css
.glass {
  background: rgba(255, 255, 255, 0.02);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
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
Activates **Cyber Mode** — neon green theme overlay, terminal-style UI shift.

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
# branch
git checkout v2.0.0

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

---

## 📊 Build Stats

| Metric | Value |
|---|---|
| **Sections** | 15 |
| **Components** | ~35 |
| **Data Lines** | 393 (portfolio.json) |
| **3D Geometries** | 50 (desktop) / 20 (mobile) |
| **Particles** | 3000 (desktop) / 800 (mobile) |
| **Social Links** | 12 |
| **Custom Icons** | 11 (all hand-crafted SVGs) |
| **Build Time** | ~25s |
| **TypeScript Errors** | 0 (we checked) |

---

## 🧠 Lessons Learned (v2.0 Edition)

- `motion` package is the Framer Motion successor — same API, fewer bytes
- lucide-react 1.x has **zero** brand icons — write your own SVGs or weep
- Three.js geometry constructors have different signatures — use factory functions
- Tailwind v4 uses `@theme inline` — `extend` is so 2024
- Generating 50 unique geometries in a loop is not as easy as it sounds
- A single `portfolio.json` is better than 7 scattered data files
- TypeScript union types + type guards can save your build (and your sanity)

---

## 🏆 Awards This v2.0 Definitely Won't Win

- ❌ Awwwards Site of the Month (maybe next rewrite)
- ❌ CSS Design Awards (they wanted more gradients)
- ❌ FWA Site of the Day (who even submits to FWA anymore)
- ✅ Most Times a Portfolio Referenced "Konami Code" in 2026 (we'd sweep this category)

---

## 📜 Presentation (Now in 3D)

Google Slides presentation covering the architecture, design decisions, and token usage:
👉 **[Google Slides Link](https://docs.google.com/presentation/d/1l4-QUskSenCZxsKZXVlZ7hW5VsbdiXnHxwYMFL8y0Ks/edit?usp=sharing)**

---

## 🔮 Roadmap (v2.1 Maybe)

- [x] Konami Code easter egg
- [x] 15 sections
- [x] Interactive terminal footer
- [x] 3D geometric universe
- [ ] R3F full avatar (floating head with glowing eyes)
- [ ] GitHub API live data fetching
- [ ] Dev.to API blog integration
- [ ] PWA offline support
- [ ] Dark/light mode (who are we kidding, dark only)

---

## 🌐 Social (All 12)

GitHub · LinkedIn · X (Twitter) · Instagram · Stack Overflow · WhatsApp · Dev.to · Holopin · PyPI · HackerRank · Email · Phone

---

*Built with ❤️, ☕, and an AI agent that wrote ~5,000 lines of TypeScript in a single session. The future is now, and it's surprisingly sarcastic.*

---

> **P.S.** This README is also longer than the actual code. Priorities.
