# ⚡ NI3 — Developer Operating System v2.0.0

> *"It's not a portfolio. It's an operating system for developers."*

**🌐 Live:** [ni3-chi.vercel.app](https://ni3-chi.vercel.app) · **Vercel Dashboard:** [vercel.com/nitinkumar-team/ni3](https://vercel.com/nitinkumar-team/ni3) · **Branch:** `v2.0.0`

## 🧬 What Even Is This?

Welcome to **NI3** — a portfolio that got so ambitious it stopped being a portfolio and became a **Developer Operating System**. ATMOS-inspired living 3D background, 5 theme modes, a 6-step cinematic loader, a Digital Playground with interactive 3D buildings, expanded GitHub dashboard with 8 analytics panels, categorized skills groups, Featured/All Projects toggle with category filters, testimonial carousel with person-mapped images, a coin-toss animated profile that flips between sections as you scroll, a snake-wrapped "Ni3" favicon, a Featured/All Blog toggle with 17 dev.to articles and multi-faceted search/filter/sort, a canvas background-removed character illustration in the Contact section, and a Konami Code easter egg that turns everything into Cyber Mode. Because why wouldn't you?

This is the **v2.0.0** rewrite from the ground up. Every component rebuilt. Every pixel reconsidered. Every dependency judged. (We kept some. We're not monks.)

<!-- <a href="./public/screenshots/full-page.png"><img src="./public/screenshots/full-page.png" width="800" alt="Full page preview" /></a> -->

---

## 🎮 The Developer OS Concept

| Feature | What It Does |
|---|---|
| **3D Living Background** | 5 cloud particle layers, 3 aurora ribbons (TubeGeometry), 600 dust particles, glowing Icosahedron core, scroll-driven fog/color |
| **5 Theme Modes** | Blue (default), AI Purple, Data Orange, Minimal White, Cyber (Konami) — pill switcher at bottom. Text visibility fixed across all themes via `--color-white` override |
| **6-Step Loading Sequence** | "Initializing Developer OS → Loading Projects → Loading Automation Engine → Loading AI Toolkit → Loading GitHub Universe → Welcome" with gradient progress bar |
| **Digital Playground** | Interactive 3D section with grid floor, 5 emissive buildings, central crystal octahedron, 7 floating data nodes, clickable tech facts, character sprite from profile photo |
| **GitHub Dashboard** | 8 panels: Overview, Contribution Analytics, Repository Insights, Technology Breakdown, Coding Activity, Open Source Impact, Repository Explorer, Language Universe |
| **Skill Groups** | 7 categorized groups (Automation, Testing, Python, Web, Data Science, Cyber Security, AI) with glassmorphism cards |
| **Projects** | Featured (top 6 by stars) / All Projects (18) toggle with search, 5 category filters, sort by stars/name |
| **Blog/Articles** | Featured (top 6 by engagement) / All Articles (17) toggle with debounced search, 10 category filter pills, 4 sort options, animated stat counters (articles, comments, tags), article cards with views/reactions/comments |
| **Contact Character** | Background-removed profile PNG with orbiting ring, scanning line, floating code snippets, typing cursor, animated particles |
| **CoinToss** | Fixed position profile image on the right that flips (rotateY 360°), scales, and bounces between sections as you scroll — cycles through all 5 profile photos |
| **Testimonial Carousel** | Auto-rotating with person-mapped profile images (Zeba Bukhtayar, Divya Pakairay, Naveen Kumar), 5 stars, 6s interval |
| **Recommendations v2** | 8 received carousel + Professional Highlights + Community Impact subsections |
| **Multi-Image System** | 5 style-transferred profile photos + 1 background-removed PNG distributed across Hero, About, Experience, Contact, Timeline, Playground |
| **Smart Navbar** | 15 items from data source, IntersectionObserver highest-ratio active tracking, spring-animated sliding indicator, responsive `clamp()` font sizing, hamburger on mobile |
| **Interactive Terminal** | Live terminal in footer with 7 commands: `help`, `about`, `skills`, `projects`, `github`, `contact`, `cyber` |
| **Live Clock** | Real-time clock and date in the footer |
| **Social Orbit** | 12 social links with platform SVG icons laid out in an orbit-style grid |
| **Cyber Mode** | Konami Code (`↑↑↓↓←→←→BA`) triggers neon theme overlay |
| **Ni3 Favicon** | Custom SVG favicon — bold "Ni" in silver foreground, snake-like "3" in gradient winding between the letters with a subtle head and eye |
| **Scroll to Top** | Floating gradient arrow button appears past 80% viewport, smooth scrolls to top |

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
| **Data** | JSON | Schema-validated portfolio data, now with skill groups, images, and highlights |
| **Analytics** | Vercel Analytics + Speed Insights | Track all 0.5 visitors |
| **Fonts** | Geist (Sans + Mono) | Vercel's finest |

---

## 📁 Project Structure v2.0 (Now 50% More Organized)

```
ni3/
├── data/
│   └── portfolio.json       # 🧬 Single source of truth — ~575 lines (skill groups, images, highlights, 18 projects, 15 nav items)
├── PROMPT.md                # 📝 Full build prompt for AI agents
├── DETAILS.json             # 🔍 Personal data extract for context
├── src/
│   ├── app/
│   │   ├── layout.tsx        # SEO, JSON-LD, fonts, skip-to-content, Ni3 favicon
│   │   ├── page.tsx          # All sections + CoinToss + Playground (after Hero), wired & ready
│   │   ├── globals.css       # Full design system (5 themes, glass, holographic, color-mix, scrollbar-hide)
│   │   ├── providers.tsx     # TanStack Query client
│   │   ├── robots.ts         # SEO robots
│   │   ├── sitemap.ts        # Dynamic sitemap
│   │   ├── manifest.ts       # PWA manifest
│   │   └── llms.txt/         # LLM-friendly context
│   ├── components/
│   │   ├── animations/       # scroll-reveal with 4 directions
│   │   ├── layout/           # Navbar (15 items, IntersectionObserver, spring indicator, hamburger) + Footer (terminal)
│   │   ├── sections/         # 15 section components (including blog toggle, contact illustration)
│   │   ├── three/            # Scene3D (ATMOS-style living background), Digital Playground
│   │   ├── ui/               # Button (4 variants), Badge (4 variants), Card (tilt/glow/hover)
│   │   ├── coin-toss.tsx     # Scroll-driven profile image flips between sections
│   │   ├── easter-egg.tsx    # Konami Code detector → cyber theme
│   │   ├── loading-screen.tsx  # 6-step cinematic loading sequence
│   │   ├── scroll-to-top.tsx   # Floating gradient arrow past 80% viewport
│   │   ├── theme-switcher.tsx  # 5-pill bottom-center theme selector
│   │   └── theme-init.tsx      # CSS variable theme initialization
│   └── lib/
│       ├── types.ts          # All TypeScript interfaces (SkillGroup, HighlightItem, PortfolioImages, etc.)
│       ├── data.ts           # Typed JSON loader
│       ├── store.ts          # Zustand: activeSection, mobileMenuOpen, cyberMode, theme
│       ├── utils.ts          # cn(), formatDate, slugify
│       └── icons.tsx         # 11 custom SVG brand icons
├── public/
│   ├── favicon.svg           # Ni3 gradient text favicon
│   ├── screenshots/          # README preview images
│   └── images/               # 5 profile photos + 4 testimonial person images + 1 background-removed PNG
```

---

## 🏗️ The Sections

| # | Section | Key Feature |
|---|---|---|---|
| 1 | **Hero** | Aurora overlays, gradient text, role rotator, primary profile image |
| 2 | **About** | Professional summary, roles list, 6 animated counters, secondary portrait |
| 3 | **Digital Playground** | Interactive 3D section — 5 buildings, crystal, data nodes, tech facts tooltips, character sprite from profile photo |
| 4 | **Education** | Timeline with icons, degree badges, gradient dots, timeline image |
| 5 | **Experience** | 8 roles in descending order, grouped by company, descriptions + highlights, timeline layout |
| 6 | **Skills** | 7 categorized groups (Automation, Testing, Python, Web, Data Science, Cyber Security, AI) with glassmorphism cards |
| 7 | **Certifications** | Split layout: certs + awards + publications |
| 8 | **Projects** | Featured (top 6 by stars) / All Projects (all 18) toggle with search, 5 category filters, sort by stars/name |
| 9 | **GitHub Dashboard** | 8 panels: Overview (6 stats), Contribution Analytics (streak/weekly/monthly/yearly), Repository Insights, Technology Breakdown (6 languages), Coding Activity (7-day chart), Open Source Impact, Repository Explorer (search/sort), Language Universe |
| 10 | **AI & Automation Lab** | Split: AI tools + automation workflows |
| 11 | **Blog** | Featured (top 6 by engagement) / All Articles (17) toggle, debounced search, 10 category filter pills, 4 sort options, animated stat counters, article cards with views/reactions/comments |
| 12 | **Testimonials** | Animated carousel with person-mapped profile images, 5 stars, auto-rotate 6s |
| 13 | **Recommendations** | 8 received carousel + Professional Highlights (4 cards) + Community Impact (4 cards) |
| 14 | **Achievements** | Awards, honors, publications timeline |
| 15 | **Contact** | Split layout: info cards + form + background-removed character illustration with orbiting ring, scanning line, floating code snippets, typing cursor, particles |
| 16 | **Footer** | Terminal, live clock, 12 social links, aurora bg |
| ∞ | **CoinToss** | Fixed-position profile image that flips & rolls between sections on scroll |

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
- **CoinToss** — rotateY 360° flip + scale bounce + brightness flash on section change, gentle bob between flips

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

## 🎥 Demo

Full walkthrough video coming soon. Key highlights to watch for:

| Feature | What to Look For |
|---|---|
| **Cinematic Loader** | 6-step "Initializing Developer OS" sequence with gradient progress bar |
| **3D Background** | Aurora ribbons, floating particles, and glowing core that shift as you scroll |
| **Theme Switching** | Pill selector at bottom — Blue, AI Purple, Data Orange, Minimal White, Cyber (Konami) |
| **CoinToss** | Right-side profile image that flips 360° between sections on scroll |
| **Smart Navbar** | 15 items with active-section tracking, spring indicator, mobile hamburger |
| **Featured/All Projects Toggle** | Switch between top 6 featured projects and the full 18 with search, filters, sort |
| **Featured/All Blog Toggle** | Switch between top 6 articles and full 17 with debounced search, 10 category filters, 4 sort options, animated stats |
| **Contact Character** | Background-removed profile PNG with orbiting ring, scanning line, floating code snippets, typing cursor, particles |
| **Konami Code** | `↑↑↓↓←→←→BA` triggers Cyber Mode |
| **GitHub Dashboard** | 8-panel analytics view with charts and repository explorer |
| **Digital Playground** | Interactive 3D buildings, data nodes, and character sprite with clickable tech facts |

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

Already deployed: [ni3-chi.vercel.app](https://ni3-chi.vercel.app) — Turbopack build, ~34s deploy, 8 pages static.

---

## 📊 Build Stats

| Metric | Value |
|---|---|
| **Sections** | 16 + CoinToss |
| **Components** | ~48 |
| **Data Lines** | ~575 (portfolio.json) + PROMPT.md + DETAILS.json |
| **Profile Photos** | 5 (style-transferred) + 1 background-removed PNG |
| **Testimonial Images** | 3 (person-mapped) |
| **Projects** | 18 (unified view with Featured/All toggle) |
| **Blog Articles** | 17 (dev.to data, Featured/All toggle, search, filters, sort) |
| **Navbar Items** | 15 (dynamic from data source) |
| **3D Geometries** | Aurora ribbons + clouds + particles + buildings + data nodes + character sprite |
| **Particles** | 3000+ (desktop) / 800+ (mobile) |
| **Social Links** | 12 |
| **Themes** | 5 (Blue, AI, Data, Minimal, Cyber) |
| **Favicon** | Custom Ni3 SVG |
| **Build Time** | ~22s |
| **TypeScript Errors** | 0 (we checked) |

---

## 🧠 Lessons Learned (v2.0 Edition)

- `motion` package is the Framer Motion successor — same API, fewer bytes
- lucide-react 1.x has **zero** brand icons — write your own SVGs or weep
- Three.js TubeGeometry + CatmullRomCurve3 = aurora ribbons that make people say "whoa"
- Tailwind v4 uses `@theme inline` — `extend` is so 2024
- `color-mix()` CSS function eliminates the need for hardcoded opacity variants per theme
- Overriding `--color-white` in theme makes all `text-white`/`border-white` classes adapt automatically
- An IntersectionObserver-based coin flip animation is way cooler than a static sidebar image
- People look better in style-transferred photos. We said it.
- Feature toggles (Featured/All) are cleaner than separate sections for curated vs full content
- Filter categories must match data categories exactly — `["Python","Testing"]` do nothing when projects have `category: "Development"`
- Git renaming files to match person names was not part of the plan. But we adapt.

---

## 🏆 Awards This v2.0 Definitely Won't Win

- ❌ Awwwards Site of the Month (maybe next rewrite)
- ❌ CSS Design Awards (they wanted more gradients)
- ❌ FWA Site of the Day (who even submits to FWA anymore)
- ✅ Most Times a Portfolio Referenced "Atmos" in 2026 (we'd sweep this category)
- ✅ Best Use of a Coin Toss Animation in a Professional Portfolio (niche category, but ours)

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
- [x] All projects unified view (18 projects)
- [x] Categorized skill groups (7 groups)
- [x] Coin-toss animated profile
- [x] Person-mapped testimonial images
- [x] Ni3 custom favicon
- [x] Dev.to blog data integration (17 articles with Featured/All toggle, search, filters, sort)
- [ ] GitHub API live data fetching
- [ ] PWA offline support
- [ ] Light mode (who are we kidding, dark only)

---

## 🌐 Social (All 12)

GitHub · LinkedIn · X (Twitter) · Instagram · Stack Overflow · WhatsApp · Dev.to · Holopin · PyPI · HackerRank · Email · Phone

---

*Built with ❤️, ☕, and an AI agent that wrote ~9,000 lines of TypeScript across multiple sessions. The future is now, and it's surprisingly sarcastic.*

---

> **P.S.** This README is also longer than the actual code. Priorities.
