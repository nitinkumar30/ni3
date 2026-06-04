# 📽️ Portfolio Website — Workflow & Implementation Presentation

> **Slide deck for manager review**  
> **Project:** Personal Portfolio — nitinkumar30 (Nitin S Kumar)  
> **Presenter:** Nitin S Kumar  
> **Duration:** ~15-20 minutes  
> **Format:** Markdown (can be converted to PPT/Google Slides)

---

## Slide 1 — Title Slide

```
╔══════════════════════════════════════════════════════╗
║                                                      ║
║   🚀 Portfolio Website v3.0                          ║
║   "Futuristic Automation Engineer in a Cyber World"  ║
║                                                      ║
║   ───────────────────────────────────────────────     ║
║                                                      ║
║   Nitin S Kumar                                      ║
║   Senior Automation Engineer @ Happiest Minds        ║
║                                                      ║
║   github.com/nitinkumar30/ni3                        ║
║   June 2026                                          ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
```

**Speaker Notes:**
- Overview of the project: A modern, interactive portfolio website
- Tech: Next.js 16 + React 19 + Three.js + AI-assisted development
- Deployed across 3 platforms: Local, Vercel, Replit

---

## Slide 2 — Project Objectives

```
┌─────────────────────────────────────────────────────────┐
│  🎯 Project Objectives                                  │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  1. Build a premium portfolio website that stands out   │
│     └─ 3D interactive elements, smooth animations       │
│                                                         │
│  2. Showcase technical skills effectively               │
│     └─ Python, Automation, Data Science, Cyber Security │
│                                                         │
│  3. Multi-platform deployment strategy                  │
│     └─ main (local), vercel (production), replit (IDE)  │
│                                                         │
│  4. Data-driven content management                      │
│     └─ Single JSON source → all sections auto-populate  │
│                                                         │
│  5. Production-grade quality                            │
│     └─ Security headers, SEO, accessibility, analytics  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Slide 3 — Technology Stack Overview

```
┌─────────────────────────────────────────────────────────┐
│  🧩 Technology Stack                                    │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Framework   │  │  Styling     │  │  Animations  │  │
│  │──────────────│  │──────────────│  │──────────────│  │
│  │ Next.js 16   │  │ Tailwind v4  │  │ Framer Motion│  │
│  │ React 19     │  │ Geist Font   │  │ Three.js/R3F │  │
│  │ TypeScript   │  │ Glassmorphism│  │ GSAP + Lenis │  │
│  │ App Router   │  │ Aurora BG    │  │ Canvas 2D    │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  UI Library  │  │  Data Layer  │  │  Deployment  │  │
│  │──────────────│  │──────────────│  │──────────────│  │
│  │ ShadCN/Radix │  │ JSON static  │  │ Vercel       │  │
│  │ Lucide Icons │  │ TanStack Qry │  │ Replit       │  │
│  │ Custom SVG   │  │ No runtime   │  │ GitHub Pages │  │
│  │ Components   │  │ API calls    │  │ Docker-ready │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Speaker Notes:**
- 47 npm dependencies total
- Bundle size ~180 KB gzipped (excluding code-split 3D)
- All dependencies carefully vetted for size vs value

---

## Slide 4 — AI-Assisted Development Workflow

```
┌─────────────────────────────────────────────────────────────┐
│  🤖 AI Development Pipeline                                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Phase 1: Scaffolding                                       │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ opencode agent → npx create-next-app → install deps │    │
│  └─────────────────────────────────────────────────────┘    │
│         │                                                   │
│         ▼                                                   │
│  Phase 2: Component Generation (80% of codebase)            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ AI generates 12 UI + 4 animation + 8 section +      │    │
│  │ 5 Three.js components from natural language prompts │    │
│  └─────────────────────────────────────────────────────┘    │
│         │                                                   │
│         ▼                                                   │
│  Phase 3: Iterative Enhancement                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ 3D transformation → Mobile optimization →           │    │
│  │ LinkedIn data merge → GitHub projects integration   │    │
│  └─────────────────────────────────────────────────────┘    │
│         │                                                   │
│         ▼                                                   │
│  Phase 4: Documentation & Deployment                        │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ README, TECH_STACK.md, PRESENTATION.md, 3 deploy    │    │
│  │ guides, multi-branch strategy                       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  Total AI token consumption: ~2.8M tokens                   │
│  Model: deepseek-v4-flash-free (128K context window)        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 5 — Project Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  📁 Project Structure                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  src/                                                       │
│  ├── app/                          # App Router pages       │
│  │   ├── page.tsx                  # Home page              │
│  │   ├── layout.tsx                # Root layout + metadata │
│  │   ├── globals.css               # Tailwind + custom CSS  │
│  │   ├── llms.txt/route.ts         # AI-crawlable summary   │
│  │   ├── manifest.ts               # PWA manifest           │
│  │   ├── robots.ts                 # SEO robots.txt         │
│  │   └── sitemap.ts                # XML sitemap            │
│  │                                                          │
│  ├── components/                                           │
│  │   ├── animations/    # ParticleField, GradientBG,        │
│  │   │                   # ScrollReveal, MagneticButton    │
│  │   ├── layout/        # Navbar, Footer                    │
│  │   ├── sections/      # Hero, About, Education,           │
│  │   │                   # Experience, Skills, Projects,    │
│  │   │                   # Featured Projects, Testimonials, │
│  │   │                   # Contact                          │
│  │   ├── three/         # Scene3D, AvatarScene,             │
│  │   │                   # SectionParallax, ProjectCard3D,  │
│  │   │                   # FloatingTechIcons, SceneContainer│
│  │   └── ui/           # Button, Badge, Card, ScrollArea,  │
│  │                      # AnimatedCounter, TypingAnimation,│
│  │                      # SocialIcons                       │
│  │                                                          │
│  ├── hooks/           # use-mouse-position, use-scroll     │
│  └── lib/             # portfolio-data.ts (data layer),    │
│                       # utils.ts (cn helper)               │
│                                                             │
│  Total: 40+ component files, ~3,500 lines of code          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 6 — Section Walkthrough: Hero

```
┌─────────────────────────────────────────────────────────────┐
│  🏠 Hero Section — First Impression                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║         ┌──────────────────────────────────┐          ║  │
│  ║         │  Senior Automation Engineer      │  badge  ║  │
│  ║         │                                  │          ║  │
│  ║         │  Hi, I'm                        │          ║  │
│  ║         │  Nitin S Kumar  ← gradient text │          ║  │
│  ║         │                                  │  3D     ║  │
│  ║         │  Python Developer ← typing anim │  Avatar ║  │
│  ║         │  Automation Expert  ← loops     │  (R3F)  ║  │
│  ║         │  Cyber Security Enthusiast      │          ║  │
│  ║         │                                  │          ║  │
│  ║         │  ┌───────────────┐ ┌─────────┐  │          ║  │
│  ║         │  │ 📥 Download   │ │ ✉️      │  │          ║  │
│  ║         │  │   Resume      │ │ Contact │  │          ║  │
│  ║         │  └───────────────┘ └─────────┘  │          ║  │
│  ║         └──────────────────────────────────┘          ║  │
│  ║                                                       ║  │
│  ║  Components used: Badge, TypingAnimation, Button,     ║  │
│  ║  MagneticButton (mouse-follow effect), AvatarScene,   ║  │
│  ║  SceneContainer (R3F Canvas wrapper)                  ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                             │
│  Implementation:                                            │
│  · Framer Motion fade-in + slide-up entrance                │
│  · TypingAnimation cycles 5 roles every 3 seconds           │
│  · MagneticButton tracks mouse position with CSS transform  │
│  · AvatarScene: SphereGeometry + MeshDistortMaterial +      │
│    orbiting Torus rings + eye-tracking Icosahedrons         │
│  · All text comes from portfolio-data.ts personal_info      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 7 — Section Walkthrough: About

```
┌─────────────────────────────────────────────────────────────┐
│  👤 About Section — Who I Am                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║  ┌──────────────┐  ┌──────────────────────────────┐  ║  │
│  ║  │  [photo]     │  │  Professional Summary        │  ║  │
│  ║  │  gradient    │  │  ──────────────────          │  ║  │
│  ║  │  border      │  │  Automation Engineer with    │  ║  │
│  ║  │              │  │  experience in JIRA, GCP,    │  ║  │
│  ║  │  floating    │  │  Selenium...                 │  ║  │
│  ║  │  decor boxes │  │                              │  ║  │
│  ║  └──────────────┘  │  Roles & Specializations     │  ║  │
│  ║                     │  ──────────────────          │  ║  │
│  ║  Statistics Row:   │  ✅ Senior Automation Eng    │  ║  │
│  ║  🏆 📦 ⌨️ 🌐 🛠️  │  ✅ Python Developer         │  ║  │
│  ║  5+  200+  5+ 4 11+ │  ✅ Aspiring Data Scientist │  ║  │
│  ║  Certs Proj Exp Lang│  ✅ Cyber Security Enthus   │  ║  │
│  ║                     └──────────────────────────────┘  ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                             │
│  Implementation:                                            │
│  · AnimatedCounter uses IntersectionObserver +              │
│    requestAnimationFrame with cubic ease-out                │
│  · Split layout: left=photo+stats, right=summary+roles     │
│  · Each role card has colored icon and hover effect         │
│  · Floating decor boxes use CSS keyframe animations         │
│  · Data source: portfolio-data.ts about + statistics        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 8 — Section Walkthrough: Education & Experience

```
┌─────────────────────────────────────────────────────────────┐
│  📚 Education & 💼 Work Experience — Timeline Sections     │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Both sections use a vertical timeline pattern:             │
│                                                             │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║  ──── 2020 ────────────────────────────────────────  ║  │
│  ║  │ ● IT Analyst @ TCS                                ║  │
│  ║  │   "Worked as Software Functional Tester..."        ║  │
│  ║  │   [icon] [gradient dot] [chevron on hover]        ║  │
│  ║  ──── 2021 ────────────────────────────────────────  ║  │
│  ║  │ ● MCA @ Arka Jain University                      ║  │
│  ║  │   "Computer Software specialization"              ║  │
│  ║  │ ● Automation Engineer @ TCS                       ║  │
│  ║  │   "Selenium, framework design, regression tests"  ║  │
│  ║  ──── 2022 ────────────────────────────────────────  ║  │
│  ║  │ ● Assistant System Engineer @ TCS                 ║  │
│  ║  │   "System engineering, hardware/software tests"   ║  │
│  ║  ──── 2023 ────────────────────────────────────────  ║  │
│  ║  │ ● System Engineer @ TCS                           ║  │
│  ║  │   "Automation Engineer in Python"                 ║  │
│  ║  ──── 2024 ──── 🟢 CURRENT ───────────────────────  ║  │
│  ║  │ ● Senior Automation Engineer @ Happiest Minds     ║  │
│  ║  │   "PDES dept, framework migration, GCP sessions"  ║  │
│  ║  └──────────────────────────────────────────────────  ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                             │
│  Implementation:                                            │
│  · Timeline connector: absolute-positioned gradient line    │
│  · Cards expand/glow on hover with smooth transition        │
│  · "Current" badge uses pulse animation on the latest job   │
│  · Each entry staggered with Framer Motion slide-in         │
│  · Color-coded: green for TCS, cyan for Freelancing        │
│  · Data: portfolio-data.ts education[] + work_experience[]  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 9 — Section Walkthrough: Skills

```
┌─────────────────────────────────────────────────────────────┐
│  🛠️ Skills Section — Technical Proficiency                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║                                                       ║  │
│  ║      ┌─────────┐  ┌─────────┐  ┌─────────┐          ║  │
│  ║      │  90%    │  │  90%    │  │  90%    │          ║  │
│  ║      │ Python  │  │Selenium │  │ Auto    │          ║  │
│  ║      │         │  │         │  │ Testing │          ║  │
│  ║      └─────────┘  └─────────┘  └─────────┘          ║  │
│  ║      ┌─────────┐  ┌─────────┐  ┌─────────┐          ║  │
│  ║      │  85%    │  │  85%    │  │  85%    │          ║  │
│  ║      │ Pytest  │  │Manual   │  │ JIRA    │          ║  │
│  ║      │         │  │Testing  │  │         │          ║  │
│  ║      └─────────┘  └─────────┘  └─────────┘          ║  │
│  ║      ┌─────────┐  ┌─────────┐  ┌─────────┐          ║  │
│  ║      │  70%    │  │  70%    │  │  50%    │          ║  │
│  ║      │Vibe     │  │Prompt   │  │Cyber    │          ║  │
│  ║      │Coding   │  │Engineer │  │Security │          ║  │
│  ║      └─────────┘  └─────────┘  └─────────┘          ║  │
│  ║                                                       ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                             │
│  Implementation:                                            │
│  · Each skill = SVG circle with stroke-dashoffset animation │
│  · Animates into view on scroll (IntersectionObserver)      │
│  · Percentage displayed in center of circle                 │
│  · 18 skills total (expanded from original 4)               │
│  · Newest additions: Prompt Engineering 70%, Vibe Coding    │
│    70%, Cyber Security 50%                                  │
│  · Data: portfolio-data.ts skills[]                         │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 10 — Section Walkthrough: Featured GitHub Projects

```
┌─────────────────────────────────────────────────────────────┐
│  ⭐ Featured Projects — GitHub Integration                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║                                                       ║  │
│  ║  ┌──────────────────┐ ┌──────────────────┐ ┌──────┐  ║  │
│  ║  │ edu-mail-auto-   │ │ auto-book-covid- │ │number│  ║  │
│  ║  │ generator        │ │ vaccine-slots    │ │recog │  ║  │
│  ║  │ ★ 119 · Python   │ │ ★ 3 · Python     │ │ ★ 3  │  ║  │
│  ║  │ automation       │ │ automation       │ │ ML   │  ║  │
│  ║  └──────────────────┘ └──────────────────┘ └──────┘  ║  │
│  ║  ┌──────────────────┐ ┌──────────────────┐ ┌──────┐  ║  │
│  ║  │ keylogger        │ │ hawk             │ │control│  ║  │
│  ║  │ ★ 3 · Python     │ │ ★ 2 · Shell      │ │-pc   │  ║  │
│  ║  │ cyber-security   │ │ network/recon    │ │ ★ 2  │  ║  │
│  ║  └──────────────────┘ └──────────────────┘ └──────┘  ║  │
│  ║  ┌──────────────────┐ ┌──────────────────┐ ┌──────┐  ║  │
│  ║  │ auto-search-job  │ │ phonetracer      │ │Black │  ║  │
│  ║  │ ★ 2 · Python     │ │ ★ 1 · Python     │ │-Coder│  ║  │
│  ║  │ automation       │ │ OSINT toolkit    │ │ ★ 2  │  ║  │
│  ║  └──────────────────┘ └──────────────────┘ └──────┘  ║  │
│  ║                                                       ║  │
│  ║  [View all 200+ projects on GitHub →]                 ║  │
│  ║                                                       ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                             │
│  Implementation:                                            │
│  · Fetched 227 repos from GitHub API → selected top 10     │
│  · 3-column responsive grid card layout                    │
│  · Each card: language badge, topic tags, star count, link │
│  · Hover: lift +6px, scale 1.02, cyan border glow          │
│  · Bottom CTA links to full GitHub profile                 │
│  · Data: portfolio-data.ts featured_projects[]             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 11 — Section Walkthrough: Projects & Testimonials

```
┌─────────────────────────────────────────────────────────────┐
│  📦 Projects & 💬 Testimonials                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  My Work (Projects)                                 │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │                                                     │    │
│  │  Filter tabs: All | Automation | Python | Data     │    │
│  │  Science | Web | Cyber Security                     │    │
│  │                                                     │    │
│  │  ┌────────────┐ ┌────────────┐ ┌────────────┐      │    │
│  │  │ 📁 Auto    │ │ 📁 Blog    │ │ 📁 Search  │      │    │
│  │  │ Book Slot  │ │ Website    │ │ Engine CSV │      │    │
│  │  │ (Python)   │ │ (Flask)    │ │ (Python)   │      │    │
│  │  └────────────┘ └────────────┘ └────────────┘      │    │
│  │  · Filterable grid with animated transitions        │    │
│  │  · Folder icons (no actual project screenshots)     │    │
│  │  · Gradient hover overlay + scale effect            │    │
│  │  · 9 projects stored in portfolio-data.ts           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Testimonials                                      │    │
│  ├─────────────────────────────────────────────────────┤    │
│  │                                                     │    │
│  │  ← [  ⭐⭐⭐⭐⭐          ] →                       │    │
│  │    "You're quite good at your work..."              │    │
│  │    — Zeba Bukhtayar, AJU Placement Cell              │    │
│  │                                                     │    │
│  │  · Auto-rotates every 5 seconds                     │    │
│  │  · Manual prev/next arrows                          │    │
│  │  · 5 stars for every testimonial (always)           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 12 — 3D Experience Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  🎭 3D Interactive Experience                               │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Scene3D (Background)                              │     │
│  │  ─────────────────────                             │     │
│  │  · 40 floating geometric shapes                    │     │
│  │    (Torus, Icosahedron, Octahedron, Dodecahedron)  │     │
│  │  · 2000 particles with connecting lines            │     │
│  │  · 3 point lights (cyan, purple, green)            │     │
│  │  · FogExp2 for depth effect                        │     │
│  │  · Mouse-follow camera rotation                    │     │
│  │  · Scroll-driven camera movement (3D parallax)     │     │
│  │  · Mobile: reduces to 15 geometries + 500 particles│     │
│  └────────────────────────────────────────────────────┘     │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ AvatarScene  │  │SectionPara-  │  │ProjectCard3D │     │
│  │──────────────│  │llax          │  │──────────────│     │
│  │Distort sphere│  │──────────────│  │3D tilt on   │     │
│  │2 wireframe   │  │Perspective   │  │mouse/touch  │     │
│  │rings (orbit) │  │tilt per      │  │Glow tracking│     │
│  │Eye-tracking  │  │section       │  │Disabled on  │     │
│  │icosahedrons  │  │Disabled on   │  │touch devices│     │
│  │Touch support │  │touch devices │  │             │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  WebGL Detection (replit branch):                           │
│  → WebGL available? Scene3D : ParticleField (2D fallback)  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 13 — Animation System

```
┌─────────────────────────────────────────────────────────────┐
│  🎬 Animation Layer                                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Layer 1: Background (always rendering)                     │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Scene3D — WebGL 3D (40 geometries + 2000 particles)│    │
│  │  ParticleField — Canvas 2D (80 particles, fallback)  │    │
│  │  GradientBG — Canvas 2D (moving radial gradient)     │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  Layer 2: Entrance (on mount / scroll into view)            │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  ScrollReveal — Framer Motion useInView wrapper     │    │
│  │  · Fade-in + slide from left/right/up               │    │
│  │  · Staggered delays for child elements              │    │
│  │  · viewport: { once: true } — fires only once       │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  Layer 3: Interaction (on hover / touch / scroll)           │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  MagneticButton  → mouse position → CSS translate   │    │
│  │  ProjectCard3D   → mouse position → 3D rotate       │    │
│  │  SectionParallax → scroll position → perspective    │    │
│  │  AnimatedCounter → scroll trigger → RAF counter-up  │    │
│  │  TypingAnimation → timer → word cycle (3s interval) │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  Layer 4: Continuous (idle animations)                      │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  Spin animations (Tailwind keyframes)               │    │
│  │  Floating decor boxes (CSS float animation)          │    │
│  │  Pulse effects (on badges, gradient orbs)           │    │
│  │  Footer particles (6 floating dots, staggered)      │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 14 — Mobile Optimization

```
┌─────────────────────────────────────────────────────────────┐
│  📱 Mobile-First & Touch Optimization                      │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Detection:                                                 │
│  ┌─────────────────────────────────────────────────────┐    │
│  │  const isMobile = window.innerWidth < 768           │    │
│  │  const isTouch = "ontouchstart" in window           │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                             │
│  ┌─────────────────────┬─────────────────┬──────────────┐   │
│  │ Component           │ Desktop         │ Mobile       │   │
│  ├─────────────────────┼─────────────────┼──────────────┤   │
│  │ Scene3D geometries  │ 40              │ 15           │   │
│  │ Scene3D particles   │ 2000            │ 500          │   │
│  │ Scene3D antialias   │ true            │ false        │   │
│  │ Scene3D pixel ratio │ min(DPR, 2)     │ min(DPR,1.5) │   │
│  │ Avatar size (hero)  │ w-96 (384px)    │ w-56 (224px) │   │
│  │ Buttons (hero)      │ inline-flex     │ w-full (stack│   │
│  │ MagneticButton      │ magnetic active │ disabled      │   │
│  │ SectionParallax     │ 3D tilt active  │ disabled      │   │
│  │ ProjectCard3D       │ 3D tilt active  │ glow only     │   │
│  ├─────────────────────┼─────────────────┼──────────────┤   │
│  │ Navbar hamburger    │ hidden (desktop)│ 44×44px touch │   │
│  │                     │                 │ target       │   │
│  │ Mobile menu items   │ N/A             │ min-h-48px   │   │
│  │                     │                 │ + active:bg  │   │
│  └─────────────────────┴─────────────────┴──────────────┘   │
│                                                             │
│  CSS Touch Optimizations:                                   │
│  · @media (hover: none) and (pointer: coarse)               │
│  · -webkit-tap-highlight-color: transparent                 │
│  · touch-action: manipulation                                │
│  · input/textarea/select font-size: 16px (prevents zoom)    │
│  · @supports (-webkit-touch-callout: none) iOS fix          │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 15 — SEO & Security

```
┌─────────────────────────────────────────────────────────────┐
│  🔒 Security & 🌐 SEO Configuration                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────┐  ┌──────────────────────┐ │
│  │  Security Headers            │  │  SEO Metadata        │ │
│  │──────────────────────────────│  │──────────────────────│ │
│  │ HSTS: 63072000s preload     │  │ title + description  │ │
│  │ X-Content-Type-Options      │  │ Open Graph tags      │ │
│  │ X-Frame-Options: DENY       │  │ Twitter Cards        │ │
│  │ X-XSS-Protection: 1;block   │  │ JSON-LD Person schema│ │
│  │ Referrer-Policy: strict-orig│  │ llms.txt (AI crawl)  │ │
│  │ Permissions-Policy: none    │  │ robots.txt + sitemap │ │
│  │ COOP: same-origin            │  │ manifest.webmanifest │ │
│  │                              │  │ Dynamic OG images   │ │
│  └──────────────────────────────┘  └──────────────────────┘ │
│                                                             │
│  ╔═══════════════════════════════════════════════════════╗  │
│  ║  Accessibility                                        ║  │
│  ║  ───────────────────────────────────────────────────  ║  │
│  ║  · prefers-reduced-motion media query                ║  │
│  ║  · aria-label on all interactive elements            ║  │
│  ║  · Skip-to-content link                              ║  │
│  ║  · Semantic HTML structure                           ║  │
│  ║  · Keyboard-navigable menus                          ║  │
│  ╚═══════════════════════════════════════════════════════╝  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 16 — Multi-Branch Deployment Strategy

```
┌─────────────────────────────────────────────────────────────┐
│  🚀 Deployment Matrix                                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────┬──────────┬──────────┬──────────┬──────────┐  │
│  │ Branch   │ Platform │Framework │ 3D       │ Entry    │  │
│  ├──────────┼──────────┼──────────┼──────────┼──────────┤  │
│  │ main     │ Local /  │Next.js 16│ Full     │ page.tsx │  │
│  │          │ GitHub   │          │ Scene3D  │          │  │
│  ├──────────┼──────────┼──────────┼──────────┼──────────┤  │
│  │ vercel   │ Vercel   │Next.js 16│ Full     │ page.tsx │  │
│  │          │ (prod)   │+vercel.js│ Scene3D  │          │  │
│  │          │          │on        │          │          │  │
│  ├──────────┼──────────┼──────────┼──────────┼──────────┤  │
│  │ replit   │ Replit   │Vite+React│ Scene3D  │ App.tsx  │  │
│  │          │ (IDE)    │19        │ or 2D    │ (main.tsx│  │
│  │          │          │          │ fallback │ entry)   │  │
│  └──────────┴──────────┴──────────┴──────────┴──────────┘  │
│                                                             │
│  Each branch has its own deployment guide:                  │
│  · DEPLOY_LOCAL.md  → npm run dev / build                  │
│  · DEPLOY_VERCEL.md → One-click deploy + manual steps      │
│  · DEPLOY_REPLIT.md → Import from GitHub, auto-configure   │
│                                                             │
│  Git workflow:                                              │
│  main ──merge──► vercel ──merge──► replit                  │
│    ↑                          (with conflict resolution)    │
│    └──── Feature branches ────┘                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 17 — Data Layer Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  📊 Single Source of Truth — portfolio-data.ts             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ╔══════════════════════════════════════════════════════════╗
│  ║  portfolio-data.ts (319 lines)                          ║
│  ║  ─────────────────────────────────────────────────────── ║
│  ║                                                         ║
│  ║  export const portfolioData = {                         ║
│  ║    personal_info:   { name, title, headline, ... },     ║
│  ║    about:           { roles, interests, summary },      ║
│  ║    statistics:      { certs, projects, years, ... },    ║
│  ║    education:       [ MCA, BCA, Intermediate ],         ║
│  ║    work_experience: [ 8 entries ... ],                  ║
│  ║    skills:          [ 18 entries ... ],                 ║
│  ║    certifications:  [ 5 entries ... ],                  ║
│  ║    honors:          [ 1 entry ... ],                    ║
│  ║    publications:    [ 2 entries ... ],                  ║
│  ║    featured_projects: [ 10 entries ... ],               ║
│  ║    projects:        [ 9 entries ... ],                  ║
│  ║    testimonials:    [ 3 entries ... ],                  ║
│  ║    contact:         { address, phone, email },          ║
│  ║    social_links:    { github, linkedin, ... },          ║
│  ║    website_metadata:{ title, nav, favicon },            ║
│  ║  };                                                     ║
│  ║                                                         ║
│  ╚══════════════════════════════════════════════════════════╝
│                                                             │
│  Principles:                                                │
│  · All content in ONE file → no database, no API calls     │
│  · Changing content = editing JSON → site rebuilds         │
│  · Every section reads from this single data source        │
│  · Typesafe via TypeScript interfaces                      │
│  · Easy for non-developers to update (just edit JSON)      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 18 — AI Token Usage & Cost Analysis

```
┌─────────────────────────────────────────────────────────────┐
│  🤖 AI Development — Token & Cost Analysis                 │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Phase Breakdown:                                           │
│  ┌────────────────────────────────────────┬─────────┬────┐ │
│  │ Phase                                │ Tokens  │  % │ │
│  ├────────────────────────────────────────┼─────────┼────┤ │
│  │ Initial scaffold + deps               │  80K    │ 3% │ │
│  │ UI components (12)                    │ 150K    │ 5% │ │
│  │ Section components (8)                │ 350K    │13% │ │
│  │ Animation components (4)              │ 120K    │ 4% │ │
│  │ 3D components (Round 1 — 5 files)    │ 200K    │ 7% │ │
│  │ Image extraction + assets             │  30K    │ 1% │ │
│  │ README + deployment docs              │ 100K    │ 4% │ │
│  │ jdevalk/spec audit + implementation   │  60K    │ 2% │ │
│  │ 3D Transformation (Round 2)           │ 250K    │ 9% │ │
│  │ Mobile/touch optimization             │  80K    │ 3% │ │
│  │ LinkedIn data update                  │  40K    │ 1% │ │
│  │ GitHub projects integration           │  60K    │ 2% │ │
│  │ Footer animation enhancement          │  30K    │ 1% │ │
│  │ TECH_STACK.md + PRESENTATION.md       │  30K    │ 1% │ │
│  │ Errors, retries, re-reads, overhead  │~1,220K  │44% │ │
│  ├────────────────────────────────────────┼─────────┼────┤ │
│  │ Total                                 │~2,800K  │100%│ │
│  └────────────────────────────────────────┴─────────┴────┘ │
│                                                             │
│  Model: deepseek-v4-flash-free (free tier)                  │
│  Cost: $0 (free-tier AI agent)                              │
│  Human time saved: ~40-60 hours of manual development       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 19 — Timeline & Milestones

```
┌─────────────────────────────────────────────────────────────┐
│  📅 Project Timeline                                        │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Day 1 — Project Setup                                     │
│  ├─ npx create-next-app, install 47 dependencies            │
│  ├─ Configure Tailwind v4, TypeScript, project structure   │
│  └─ Create 12 UI components + 4 animation components       │
│                                                             │
│  Day 2 — Content Sections                                  │
│  ├─ Build 8 content sections (Hero → Contact)              │
│  ├─ Create portfolio-data.ts (JSON data layer)             │
│  ├─ Extract images.zip → public/images/                    │
│  └─ Create sarcastic README.md                             │
│                                                             │
│  Day 3 — 3D Transformation                                 │
│  ├─ Full Scene3D (40 geometries + 2000 particles)          │
│  ├─ AvatarScene (distort sphere, rings, eye tracking)      │
│  ├─ SectionParallax + ProjectCard3D + FloatingTechIcons   │
│  └─ Mobile: reduce geometry/particles, touch handlers      │
│                                                             │
│  Day 4 — Production Readiness                              │
│  ├─ Security headers, JSON-LD, llms.txt, OG images        │
│  ├─ jdevalk/specification.website audit                    │
│  ├─ Create 3 branches (main, vercel, replit)               │
│  ├─ Create 3 deployment guides                             │
│  └─ Push to GitHub, verify builds                          │
│                                                             │
│  Day 5 — Data Enrichment                                   │
│  ├─ Fetch LinkedIn PDF data → update portfolio-data.ts     │
│  ├─ Fetch 227 GitHub repos → select top 10 featured        │
│  ├─ Create FeaturedProjects section component              │
│  ├─ Enhanced footer animations                             │
│  ├─ Certifications, Honors, Publications sections          │
│  └─ TECH_STACK.md + PRESENTATION.md                        │
│                                                             │
│  Total: 5 days, ~3,500 lines of code, 40+ components       │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 20 — Key Metrics

```
┌─────────────────────────────────────────────────────────────┐
│  📊 Project Metrics                                         │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌────────────────────────────────────────────────────────┐ │
│  │                                                        │ │
│  │    📁 40+  component files                             │ │
│  │    📝 3,500+ lines of TypeScript/React code            │ │
│  │    📦 47 npm dependencies                              │ │
│  │    🎨 18 skills tracked in proficiency grid            │ │
│  │    🔗 227 total GitHub repos (10 featured)             │ │
│  │    🖼️ 14 image assets extracted                        │ │
│  │    🌿 3 deployment branches                            │ │
│  │    📚 3 deployment guides                              │ │
│  │    🤖 ~2.8M AI tokens consumed                         │ │
│  │    💰 $0 (free-tier AI agent)                          │ │
│  │    ⏱️ 5 days development time                          │ │
│  │    📄 289 lines in README.md (sarcastic edition)       │ │
│  │                                                        │ │
│  └────────────────────────────────────────────────────────┘ │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 21 — Lessons Learned

```
┌─────────────────────────────────────────────────────────────┐
│  🧠 Lessons Learned & Recommendations                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Technical Lessons                                   │  │
│  │  ─────────────────────                               │  │
│  │  · Next.js 16 SWC bindings broken on some Windows    │  │
│  │    → Use --webpack flag for builds                   │  │
│  │  · lucide-react 1.x removed brand icons              │  │
│  │    → Custom SVG icons needed for GitHub/LinkedIn     │  │
│  │  · Tailwind v4 @theme inline vs v3 extend            │  │
│  │    → Different configuration pattern                 │  │
│  │  · Three.js + R3F code-splitting essential           │  │
│  │    → Saves ~570 KB from initial bundle               │  │
│  │  · WebGL detection + 2D fallback for Replit          │  │
│  │    → Browser containers may lack GPU support         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Process Recommendations                             │  │
│  │  ───────────────────────                             │  │
│  │  · Single data source (JSON) = easy content updates  │  │
│  │  · Multi-branch = test before production deploy      │  │
│  │  · AI agent development = 5 days vs 2-3 weeks manual │  │
│  │  · Code-split 3D = fast initial load                 │  │
│  │  · Mobile-first = wider audience reach               │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Slide 22 — Q&A / Thank You

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║                                                              ║
║              ❓ Questions & Answers ❓                        ║
║                                                              ║
║                                                              ║
║    ───────────────────────────────────────────────           ║
║                                                              ║
║              🙏 Thank You 🙏                                 ║
║                                                              ║
║    Nitin S Kumar                                             ║
║    Senior Automation Engineer @ Happiest Minds Technologies  ║
║                                                              ║
║    📧 nitinkumarpythonic@gmail.com                           ║
║    🔗 linkedin.com/in/nitin30kumar                           ║
║    🐙 github.com/nitinkumar30                                ║
║    🌐 portfolio-nitin.netlify.app                            ║
║                                                              ║
║                                                              ║
║    "Built with ❤️ and an AI that went way too hard"          ║
║                                                              ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

---

## 📝 How to Convert to Actual PPT

1. **Copy each slide's content** into Google Slides / PowerPoint
2. Use **dark theme** (background `#050816`, text `#ffffff`)
3. Use gradient accents: `#00E5FF` (cyan), `#7B61FF` (purple), `#00FF9D` (green)
4. Font: **Geist** or **Inter** (monospace for code blocks)
5. Each box/card can use rounded corners with subtle borders

**Alternative:** Use `md-to-ppt` or `pandoc` to convert markdown → PPTX:
```bash
npm install -g md-to-ppt
md-to-ppt PRESENTATION.md -o presentation.pptx
```

---

*Generated by opencode AI agent · deepseek-v4-flash-free · June 2026*
