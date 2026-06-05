# NI3 — Developer Operating System: Complete Build Prompt

> Use this prompt to regenerate the entire portfolio. It captures every feature, component, animation, 3D element, theme, and constraint discussed across all sessions.

---

## 🎯 Core Concept

Build a futuristic single-page portfolio/"Developer Operating System" for **Nitin S Kumar** (Senior Automation Engineer). It should not feel like a portfolio — it should feel like booting into a developer's OS. ATMOS-inspired living 3D background, 5 themeable modes, cinematic loading sequence, interactive 3D playground, expandable GitHub analytics dashboard, categorized skill groups, Featured/All projects toggle with category filters, a coin-toss animated profile image that flips between sections on scroll, person-mapped testimonial images, and a Konami Code easter egg.

**Live URL:** https://ni3-chi.vercel.app

---

## 🧱 Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | Next.js 16+ (App Router) | Cutting edge, static export |
| Language | TypeScript strict | Type-safe everything |
| UI Library | React 19 | Latest |
| Styling | Tailwind CSS v4 with `@theme inline` | Utility-first, CSS variable-driven theming |
| Animation | Motion 12.x (successor to Framer Motion) | Same API, smaller bundle |
| 3D | Three.js + React Three Fiber + Drei | WebGL for atmospheric effects |
| Icons | Lucide React + custom SVG brand icons | Lucide has zero brand icons — hand-craft SVGs |
| State | Zustand | ~3 actions, minimal boilerplate |
| Data | Single `portfolio.json` (schema-validated) | Single source of truth |
| Analytics | `@vercel/analytics/next` | Vercel platform integration |
| Fonts | Geist Sans + Geist Mono | Vercel's typeface family |

---

## 🏗️ Project Structure

```
ni3/
├── data/
│   └── portfolio.json           # Central data (~575 lines): projects, skills, images, highlights
├── public/
│   ├── favicon.svg              # Ni3 custom favicon (snake-3 between letters)
│   ├── screenshots/             # README preview images
│   └── images/                  # 5 style-transferred profile photos + 3 person-mapped testimonial images
├── src/
│   ├── app/
│   │   ├── layout.tsx           # SEO metadata, JSON-LD, Geist fonts, skip-to-content, favicon
│   │   ├── page.tsx             # All sections wired in order + CoinToss + overlays
│   │   ├── globals.css          # Design system: 5 themes, glass, holographic, aurora, color-mix()
│   │   ├── providers.tsx        # Query client provider
│   │   ├── robots.ts            # SEO robots config
│   │   ├── sitemap.ts           # Dynamic sitemap
│   │   └── manifest.ts          # PWA manifest
│   ├── components/
│   │   ├── animations/
│   │   │   └── scroll-reveal.tsx    # Reusable scroll-triggered entrance (left/right/up/down/fade)
│   │   ├── layout/
│   │   │   ├── navbar.tsx           # Sticky top nav with active section dot tracking
│   │   │   └── footer.tsx           # Terminal emulator (7 commands) + live clock + 12 social links
│   │   ├── sections/                # 12+ section components (see sections list below)
│   │   ├── three/
│   │   │   ├── Scene3D.tsx          # ATMOS-style living background aurora/particles/core
│   │   │   └── PlaygroundScene.tsx  # Interactive 3D buildings + crystal + data nodes
│   │   ├── ui/
│   │   │   ├── button.tsx           # 4 variants: primary, secondary, ghost, premium
│   │   │   ├── badge.tsx            # 4 variants: default, premium, outline, dot
│   │   │   └── card.tsx             # Glassmorphism card with optional hover/glow/tilt
│   │   ├── coin-toss.tsx            # Fixed right-side profile image — flips 360° between sections
│   │   ├── easter-egg.tsx           # Konami Code detector → sets cyber theme
│   │   ├── loading-screen.tsx       # 6-step cinematic boot sequence
│   │   ├── theme-switcher.tsx        # 5-pill bottom-center theme selector
│   │   └── theme-init.tsx           # Hydrates theme from localStorage on mount
│   └── lib/
│       ├── types.ts              # All TypeScript interfaces (PortfolioData, SkillGroup, etc.)
│       ├── data.ts               # Typed JSON loader (imports portfolio.json, exports typed `data`)
│       ├── store.ts              # Zustand store: activeSection, cyberMode, theme
│       ├── utils.ts              # cn() classname merger, formatDate(), slugify()
│       └── icons.tsx             # 11 custom SVG brand icons (GitHub, LinkedIn, X, etc.)
```

---

## 🎨 Design System

### 5 Theme Modes

All themes use CSS custom properties defined on `[data-theme="name"]`. Every component references these variables — never hardcoded colors.

| Theme | data-theme | Primary | Background | Vibe |
|---|---|---|---|---|
| Blue (default) | `blue` | `#00E5FF` | `#050816` | Tech, futuristic |
| Cyber | `cyber` | `#00FF41` | `#0a0a0a` | Hacker terminal |
| AI | `ai` | `#A855F7` | `#0a0015` | Purple, mystical |
| Data | `data` | `#FF8C00` | `#0a0d1a` | Orange, analytical |
| Minimal | `minimal` | `#2563EB` | `#ffffff` | Clean, light |

**Theme CSS variables:**
```
--background, --foreground, --primary, --secondary, --accent, --success, --muted, --danger
--card-bg, --card-border, --nav-bg
--scrollbar-track, --scrollbar-thumb
--aurora-1, --aurora-2, --aurora-3
--theme-gradient (linear-gradient for text gradients)
```

**Minimal theme fix:** Set `--color-white: #111111` and `--color-black: #eeeeee` so Tailwind's `text-white`/`border-white` classes render dark-on-light correctly.

### Glassmorphism
```css
.glass {
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  border: 1px solid var(--card-border);
}
```

### Key Animations
```css
@keyframes spin-slow { to { transform: rotate(360deg); } }
@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes drift { from { transform: translateX(-100%); } to { transform: translateX(100%); } }
@keyframes aurora { from { opacity: 0.3; transform: translateY(0) scale(1); } to { opacity: 0.6; transform: translateY(-20px) scale(1.1); } }
```

### Utility Classes
- `.text-gradient` — applies `--theme-gradient` as background-clip text
- `.aurora-bg` — pseudo-element with 3 radial gradients for atmospheric glow
- `.holographic` — shimmer sweep overlay animation
- `.glass-strong` — more opaque glass variant

---

## 🧩 ALL SECTIONS (Ordered as in page.tsx)

### 1. Hero Section (`#hero`)
- Animated gradient text headline with role rotator (cycles through roles: Senior Automation Engineer, Python Developer, Aspiring Data Scientist, Cyber Security Enthusiast, Prompt Engineer)
- Aurora overlays from 3D background
- Primary profile image (`data.images.hero`)
- CTA buttons (Resume, Contact)
- Scroll indicator at bottom

### 2. About Section (`#about`)
- Two-column layout (image left, content right on desktop; stacked on mobile)
- **Left column:** Circular profile image (`data.images.about`) inside a gradient-bordered card with `aspect-square` container, scrollable text summary below
- **Right column:** Professional summary text, Roles & Specializations list (5 roles with matching icons), Interests as tag badges
- **Stats row:** 6 animated counters (Experience 5+ Years, Projects 200+, Certifications 30+, Tools 11+, AI Tools 4+, Languages 4+) using IntersectionObserver-triggered count-up animation with cubic ease-out

### 3. Education Section (`#education`)
- Timeline layout with degree cards
- Gradient dots connecting entries
- Institution badges, degree names, duration
- Timeline profile image (`data.images.timeline`)

### 4. Experience Section (`#experience`)
- 8 work roles in strict descending chronological order (by start date)
- Grouped by company (companies with multiple roles show all entries together)
- Timeline layout with a vertical line on the left
- Each entry: position, company, duration, type, location, description paragraph, highlights list
- Company grouping header with `Building2` icon

### 5. Skills Section (`#skills`)
- 7 categorized skill groups stored in `data.skill_groups`:
  1. **Automation** (icon: Zap) — Selenium, Playwright, Python, APIs, BeautifulSoup, Pandas, Docker, CI/CD, Git
  2. **Testing** (icon: Shield) — Pytest, Manual Testing, API Testing, JIRA
  3. **Python Development** (icon: Code2) — Python, SQL, Git, APIs
  4. **Web Development** (icon: Globe) — Web Development, Bootstrap
  5. **Data Science** (icon: Database) — Data Science, SQL, Pandas
  6. **Cyber Security** (icon: ShieldCheck) — Cyber Security, Cryptography
  7. **AI & Prompt Engineering** (icon: Brain) — Prompt Engineering, Vibe Coding, AI Tools
- Each group rendered as a glassmorphism card with:
  - Category icon (mapped from name → Lucide icon)
  - Category title
  - Description text
  - Skills as pill-shaped tags
- Individual skill proficiency rings are NOT used — replaced by grouped skill tags

### 6. Certifications Section (`#certifications`)
- Split layout: certifications (left) + awards/honors (right) + publications
- Expandable cards for certifications
- Award entries with trophy icons
- Publication entries with external links

### 7. Projects Section (`#projects`) — Featured/All Toggle
- **Toggle UI:** Inline pill-style toggle between "Featured" and "All Projects"
  - Featured tab (default): Shows Sparkles icon, filters `data.projects` where `featured === true`, sorts by stars descending, takes top 6
  - All Projects tab: Shows Folder icon, displays all 18 projects with search bar + category filters + sort dropdown
- **Filters (All Projects only):** Category filter pills: `["Automation", "Development", "Cyber Security", "Data Science", "Data"]` — must exactly match the `category` field values in data
- **Sort (All Projects only):** Most Stars (default), Name A-Z, Name Z-A
- **Search (All Projects only):** Filters by name or description (case-insensitive)
- **Card content (no images):** Project name, description, language badge, star count, up to 3 technology tags, category badge
- Empty state: "No projects match your filters" message
- Grid: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4`

### 8. GitHub Dashboard (`#dashboard`)
- 8 analytics panels in a responsive grid:
  1. **Overview** — 6 stat cards (repos, stars, forks, followers, following, commits)
  2. **Contribution Analytics** — Streak days, weekly/monthly/yearly commit counts
  3. **Repository Insights** — Top repos listed with star/fork counts
  4. **Technology Breakdown** — 6 languages with percentage bars and color coding
  5. **Coding Activity** — 7-day activity chart (bar chart visualization)
  6. **Open Source Impact** — Contribution highlights and open source metrics
  7. **Repository Explorer** — Searchable, sortable repo list
  8. **Language Universe** — Language distribution visualization
- Data sourced from `data.statistics` with fallback defaults
- Uses custom GitHubIcon from `@/lib/icons`

### 9. AI & Automation Lab (`#ai-lab`)
- Split view: AI tools (left) + Automation tools (right)
- AI tools listed from `data.ai_tools` with category and description
- Automation tools from `data.automation_tools` with icon mapping

### 10. Blog Section (`#blog`)
- dev.to-style article cards
- Tags, reaction counts, reading time
- Links to external blog posts

### 11. Testimonials Section (`#testimonials`)
- Animated carousel with auto-rotate (6s interval)
- Each testimonial card: person name, designation, testimonial text, 5-star rating
- **Person-mapped profile images:** Each testimonial's profile image uses person-named files:
  - `Zeba Bukhtayar → /images/Zeba Bukhtayar.jpg`
  - `Divya Pakairay → /images/Divya Pakairay.jpg`
  - `Naveen Kumar → /images/Naveen Kumar.jpg`
- Images displayed as circular avatars with border
- `data.testimonial_images` is a `string[]` with exactly 3 entries
- Manual navigation controls (prev/next arrows)

### 12. Recommendations Section (`#recommendations`)
- Three subsections:
  1. **Received Recommendations** — 8-item carousel showing name, role, date, relationship, and testimonial text
  2. **Professional Highlights** — 4 cards (iAppreciate Q2 '24, Open Source Contributor, 30+ Certifications, Codegoda 2022)
  3. **Community Impact** — 4 cards (Open Source Contributions, Technical Publications, Internship Mentorship, Knowledge Sharing)
- Clickable stat modals for Given (12) and Pending (3) counts
- `data.recommendations` includes `received_count`, `given_count`, `pending_count`, `professional_highlights`, `community_impact`, and `list` array

### 13. Digital Playground (`#playground`)
- Interactive 3D section (client-side only, dynamic import with `ssr: false`)
- 5 emissive buildings on a grid floor
- Central crystal octahedron
- 7 floating data nodes
- Clickable tech facts tooltips
- Built with Three.js + R3F + Drei

### 14. Contact Section (`#contact`)
- Split layout: info cards (left) + contact form (right)
- Info cards: email, phone, location, social links
- Form with send animation (Motion-powered)
- Contact portrait image (`data.images.contact`)

### 15. Footer
- Terminal emulator with 7 commands: `help`, `about`, `skills`, `projects`, `github`, `contact`, `cyber`
- Real-time live clock with date
- 12 social links in orbit-style grid with SVG brand icons
- Aurora background effect

---

## 🎬 Special Components

### CoinToss (`coin-toss.tsx`)
- Fixed-position (`fixed right-4 top-1/2 -translate-y-1/2 z-50`) circular profile image
- **Hidden on mobile/tablet** (`hidden xl:block pointer-events-none`)
- **Scroll-driven flip animation:**
  - Uses IntersectionObserver watching all section IDs
  - When a new section enters the viewport (threshold 0.3, rootMargin "-80px 0px 0px 0px"):
    1. Triggers `rotateY: [0, 180, 360]` (full flip)
    2. `scale: [1, 1.35, 1]` (bounce)
    3. `y: [0, -40, 0]` (upward bounce)
    4. `filter: brightness(1) → brightness(1.3) + blur(1px) → brightness(1)` (flash effect)
  - Between flips: gentle continuous bob animation (`y: [0, -3, 0]` with 3s repeat)
- Cycles through 5 profile images: `[data.images.hero, about, experience, contact, timeline]`
- Uses `AnimatePresence mode="wait"` with unique keys for seamless transitions
- Border and shadow use theme's `--primary` via `color-mix()`

### Loading Screen (`loading-screen.tsx`)
- 6-step cinematic sequence:
  1. "Initializing Developer OS"
  2. "Loading Projects"
  3. "Loading Automation Engine"
  4. "Loading AI Toolkit"
  5. "Loading GitHub Universe"
  6. "Welcome"
- Gradient progress bar filling incrementally
- Animated text transitions between steps

### Konami Code Easter Egg (`easter-egg.tsx`)
- Listens for `↑↑↓↓←→←→BA` key sequence
- Activates Cyber Mode (sets theme to `cyber`)
- Deactivating returns to Blue theme
- Visual feedback: theme pill switcher updates

### Theme Switcher (`theme-switcher.tsx`)
- Fixed bottom-center pill
- 5 theme buttons: Blue, AI, Data, Minimal, Cyber
- Stores preference in localStorage
- Sets `data-theme` attribute on `<html>`

---

## 🖼️ Image System

### 5 Profile Photos (Style-Transferred)
Exactly 5 specific images used across the site — no more, no less:

| Field | Image | Used In |
|---|---|---|
| `hero` | `20260603_221130-IMG_STYLE.jpg` | Hero section, CoinToss |
| `about` | `20260603_220746-IMG_STYLE.jpg` | About section card, CoinToss |
| `experience` | `20260603_214745-IMG_STYLE.jpg` | Experience sidebar (removed, now CoinToss), CoinToss |
| `contact` | `20260603_214824-IMG_STYLE.jpg` | Contact portrait, CoinToss |
| `timeline` | `20260603_220709-IMG_STYLE.jpg` | Education timeline, CoinToss |

`data.images` shape:
```typescript
interface PortfolioImages {
  hero: string
  about: string
  experience: string
  contact: string
  timeline: string
  cards: string[]  // same 5 images
}
```

### 3 Testimonial Images (Person-Mapped)
Files must be named to exactly match the person's name:
- `/images/Zeba Bukhtayar.jpg`
- `/images/Divya Pakairay.jpg`
- `/images/Naveen Kumar.jpg`

`data.testimonial_images` is a `string[]` with exactly those 3 paths.

---

## 🎨 Favicon (`/favicon.svg`)

Custom SVG favicon:
- Dark rounded rectangle background (`#06061a`, rx=24)
- **"N"** in bold white stroke (7.5px) — two vertical strokes at x=8, x=28 with diagonal
- **"3" as a snake** in gradient (`#00E5FF → #A855F7 → #00FF9D`):
  - Diamond-shaped filled head at top (centered ~x=48, y=12)
  - Body winds through classic 3 shape: curves right, back left, then right again to tapered tail
  - Small eye dot on the head
- **"i"** in bold white stroke — vertical stroke at x=78, dot circle at top (r=5)
- Foreground elements ("N" and "i") in `#F0F0F0`, snake in gradient
- Referenced in `layout.tsx` `<head>` and `portfolio.json` meta.favicon

---

## 📊 Portfolio JSON Structure

Single file at `data/portfolio.json` (~575 lines) containing ALL content:

```typescript
interface PortfolioData {
  meta: { title, description, author, siteUrl, language, keywords, favicon }
  personal_info: { name, title, headline, current_role, current_company, current_location, profile_image, resume_url, email, phone, linkedin, github, twitter, instagram, blog, hackerrank, stackoverflow, whatsapp, holopin, devto, pypi }
  about: { summary, roles[], interests[], available_for[] }
  statistics: { experience, projects, certifications, tools, ai_tools, languages, publications, github_repos, github_stars }
  skills: { name, proficiency, category }[]
  skill_groups: { category, icon, description, skills[] }[]
  tech_stack_nodes: string[]
  education: { degree, institution, duration?, year?, description, highlights[] }[]
  work_experience: { position, company, duration, type, location, description?, highlights[] }[]
  certifications: { name, issuer, year, credential_id? }[]
  honors: { title, description, issuer, year }[]
  publications: { title, description, type, url }[]
  projects: { name, description, category, technologies[], stars?, language?, url?, topics[], featured? }[]  // 18 projects, 9 featured
  testimonials: { name, designation, testimonial, rating }[]
  recommendations: { received_count, given_count, pending_count, given_details?, pending_details?, professional_highlights?: { title, items[] }, community_impact?: { title, items[] }, list: { name, role, date, relationship, text }[] }
  images: PortfolioImages
  testimonial_images: string[]
  ai_tools: { name, category, description }[]
  automation_tools: { name, category, icon }[]
  navigation: { id, label, icon }[]
}
```

---

## 🧪 Testing & Build Commands

```bash
npm install
npm run dev          # development (localhost:3000)
npx next build --webpack    # production build (--webpack required on Windows)
npm start            # production server
npx vercel deploy --prod --token <token>  # Vercel deploy
```

---

## 🌐 Social Links (All 12)

GitHub · LinkedIn · X (Twitter) · Instagram · Stack Overflow · WhatsApp · Dev.to · Holopin · PyPI · HackerRank · Email · Phone

---

## 🔥 Easter Eggs

1. **Konami Code:** `↑↑↓↓←→←→BA` → activates Cyber Mode (neon green theme)
2. **Terminal Commands:** 7 commands in the footer terminal: `help`, `about`, `skills`, `projects`, `github`, `contact`, `cyber`

---

## 📱 Responsive Design Constraints

- All sections use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` container (except testimonials which uses `max-w-4xl`)
- Grid layouts follow `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` pattern
- Image containers use `aspect-square` with `overflow-y-auto` to handle long text on mobile
- CoinToss is `hidden xl:block` — only visible on desktop
- Touch-friendly: `font-size: 16px` on mobile inputs/buttons, `touch-action: manipulation`
- `prefers-reduced-motion: reduce` disables all animations
- Section padding: `py-24 sm:py-32`

---

## 💡 Key Implementation Details

1. **Theme system:** CSS custom properties on `[data-theme]` selectors, referenced everywhere via `var(--name)`. Tailwind v4 `@theme inline` directive maps them to utility classes.
2. **color-mix()** used extensively for opacity variants: `color-mix(in srgb, var(--primary) 10%, transparent)` instead of hardcoded alpha hex values.
3. **No images inside project cards** — all project cards are text-only (name, description, tags, category badge).
4. **Featured flag** (`featured: true/false` in project data) controls the Featured tab — top 6 by stars from featured projects.
5. **Filter categories** must exactly match the `category` field values in each project object: `["Automation", "Development", "Cyber Security", "Data Science", "Data"]`.
6. **Experience section** sorts 8 roles by start date descending, groups by company, shows full descriptions and highlights.
7. **Zustand store** manages: `activeSection`, `cyberMode`, `theme`.
8. **ScrollReveal** component provides 4 entrance directions (left, right, up, down, fade) triggered by IntersectionObserver.
9. **Card component** supports optional `hover` (glow on hover), `glow` (persistent glow), and `tilt` (mouse-follow 3D perspective rotation).
10. **Build on Windows** requires `--webpack` flag: `npx next build --webpack`.

---

## 🏆 Awards (Joke Section, Keep in README)

- ❌ Awwwards Site of the Month (maybe next rewrite)
- ❌ CSS Design Awards (they wanted more gradients)
- ❌ FWA Site of the Day
- ✅ Most Times a Portfolio Referenced "Atmos" in 2026
- ✅ Best Use of a Coin Toss Animation in a Professional Portfolio

---

## 📋 Complete File Checklist

All components listed below — every file must be created:

### App Layer
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/app/providers.tsx`
- `src/app/robots.ts`
- `src/app/sitemap.ts`
- `src/app/manifest.ts`

### Sections (12+)
- `src/components/sections/hero-section.tsx`
- `src/components/sections/about-section.tsx`
- `src/components/sections/education-section.tsx`
- `src/components/sections/experience-section.tsx`
- `src/components/sections/skills-section.tsx`
- `src/components/sections/certifications-section.tsx`
- `src/components/sections/projects-section.tsx`
- `src/components/sections/github-section.tsx`
- `src/components/sections/ai-lab-section.tsx`
- `src/components/sections/blog-section.tsx`
- `src/components/sections/testimonials-section.tsx`
- `src/components/sections/recommendations-section.tsx`
- `src/components/sections/achievements-section.tsx`
- `src/components/sections/contact-section.tsx`
- `src/components/sections/playground-section.tsx` (dynamic import, ssr: false)

### Special Components
- `src/components/coin-toss.tsx`
- `src/components/easter-egg.tsx`
- `src/components/loading-screen.tsx`
- `src/components/theme-switcher.tsx`
- `src/components/theme-init.tsx`
- `src/components/custom-cursor.tsx`

### UI Components
- `src/components/ui/button.tsx`
- `src/components/ui/badge.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/expandable-card.tsx`

### Layout
- `src/components/layout/navbar.tsx`
- `src/components/layout/footer.tsx`

### 3D
- `src/components/three/Scene3D.tsx`
- `src/components/three/PlaygroundScene.tsx`

### Libraries
- `src/lib/types.ts`
- `src/lib/data.ts`
- `src/lib/store.ts`
- `src/lib/utils.ts`
- `src/lib/icons.tsx`

### Animations
- `src/components/animations/scroll-reveal.tsx`

### Data & Public
- `data/portfolio.json`
- `public/favicon.svg`
- `public/images/20260603_221130-IMG_STYLE.jpg`
- `public/images/20260603_220746-IMG_STYLE.jpg`
- `public/images/20260603_214745-IMG_STYLE.jpg`
- `public/images/20260603_214824-IMG_STYLE.jpg`
- `public/images/20260603_220709-IMG_STYLE.jpg`
- `public/images/Zeba Bukhtayar.jpg`
- `public/images/Divya Pakairay.jpg`
- `public/images/Naveen Kumar.jpg`

### Root Config
- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `postcss.config.mjs`
- `README.md`
- `PROMPT.md` (this file)
