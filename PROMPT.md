# NI3 — Complete Build Prompt: The Cyber Explorer Portfolio

> Use this single prompt to regenerate the entire portfolio. It combines all 9 design prompts, portfolio data, loader code, footer specs, and tech stack into one unified system prompt.

---

## META INSTRUCTION

This document is a **complete system prompt** for building a cinematic 3D portfolio website for **Nitin S Kumar** (Senior Automation Engineer). Execute all 9 prompt domains below as a coordinated multi-agent pipeline. The result must be a single continuous scroll-driven 3D world where a character walks through 16 sections, environments evolve from digital cyber universe to peaceful grassland, and every interaction feels premium and intentional.

**Output target:** `https://ni3-chi.vercel.app`  
**Source:** `https://github.com/nitinkumar30/ni3` (branch: staging)

---

## PROMPT 1: 3D Avatar Character Generation

Generate a fully rigged 3D animated avatar from image `20260603_214824-IMG_STYLE.jpg`. The avatar is the central character of a cinematic scroll-driven portfolio.

- **Style:** Realistic-but-stylized (Pixar x premium game), mid-20s male, Indian, smart casual attire
- **Rig:** Humanoid with IK/FK, blend shapes for expressions
- **Animations (10 clips):** idle (blink, breathe, head turn, eye track cursor), walk, sit down, stand up, reach/touch, point, wave, study hologram, manipulate panels, receive signal
- **Per-section actions:** Hero=looking at user, About=walking, Education=studying holograms, Experience=activating portals, Skills=touching cores, Projects=pointing at buildings, Dashboard=manipulating panels, Blog=reading, Testimonials=receiving signals, Contact/Footer=sitting on grass
- **Pipeline:** Blender modeling, Mixamo + custom Blender animation, Substance Painter texturing
- **Export:** GLTF/GLB with Draco compression, 2K PBR textures, LOD 3 levels (<50K triangles full)
- **Runtime:** R3F + drei useAnimations + THREE.AnimationMixer

---

## PROMPT 2: Core Concept & World Narrative — "The Cyber Explorer"

Theme: Automation Engineering + Cyber Security + AI Systems. Aesthetic: Modern Cyberpunk + Futuristic Engineer + Ethical Hacker + Builder. NOT anonymous-mask hacker or Matrix rain.

**Narrative arc:** Digital awakening -> exploration -> mastery -> creation -> reflection -> human connection. The world evolves from digital/abstract through technical/industrial to organic/natural.

**Character progression table:**
| Section | Action | Section | Action |
|---------|--------|---------|--------|
| Hero | Looking at user | Projects | Building structures |
| About | Walking forward | Dashboard | Manipulating code streams |
| Education | Studying holograms | Blog | Reading floating articles |
| Experience | Activating portals | Testimonials | Receiving signals |
| Skills | Touching energy cores | Contact/Footer | Sitting on grass |

**Security theme (subtle):** packet streams, network nodes, security shields, encrypted data cubes, scanning effects. Firewall opening to reveal technologies in Skills section.

---

## PROMPT 3: UI/UX Design System — Cyber Automation Visual Identity

**Design tokens:**
- Primary: #00E5FF, Secondary: #7B61FF, Accent: #00FF9D
- Background: #050816, Surface: rgba(255,255,255,0.05), Border: rgba(255,255,255,0.12)
- Text Primary: #FFFFFF, Text Secondary: #A1A1AA
- Success: #00FF9D, Warning: #FFB800, Error: #FF4D6D
- Theme gradient: linear-gradient(135deg, #00E5FF, #4488FF, #7B61FF)

**Typography:** Inter (primary, loaded via next/font/google), PODIUM Sharp (display, loaded via @font-face). Scale: Display XL 72px/700, Display LG 56px/700, H1 48px/700, H2 36px/700, H3 28px/600, H4 22px/600, Body 16px/400, Caption 14px/400.

**Spacing:** 8pt grid. Container widths: Mobile 100%, Tablet 768px, Laptop 1200px, Desktop 1440px, Ultra-wide 1600px.

**Components:** Glass buttons (primary/secondary/ghost with magnetic hover, min 44px height), glass cards (blur + border + hover tilt/glow), inputs (16px radius, glass, focus ring), navbar (scroll-aware transparent glass, animated indicator spring), terminal (7 commands, green/cyan prompt, history).

**CSS variables (already in globals.css):** `--background`, `--foreground`, `--primary`, `--secondary`, `--accent`, `--success`, `--muted`, `--danger`, `--card-bg`, `--card-border`, `--nav-bg`, `--scrollbar-*`, `--aurora-*`, `--theme-gradient`. Also 3 theme variants: `[data-theme="cyber"]` (green), `[data-theme="ai"]` (purple), `[data-theme="data"]` (orange).

**Accessibility:** WCAG AA, keyboard nav, reduced motion, semantic HTML, ARIA labels.

---

## PROMPT 4: Motion Design System — Cinematic Animation Choreography

**Global tokens:** Durations (instant 120ms, fast 200ms, normal 350ms, medium 600ms, slow 900ms, cinematic 1400ms). Easings (standard power2.out, emphasized power3.out, decelerate expo.out, overshoot back.out(1.7), gentle sine.inOut).

**Scroll system:** One master GSAP timeline + ScrollTrigger + Lenis 1.3.23 smooth scrolling. Camera spline path. Character spline path. Environment blends. Content reveals tied to world progression.

**Section choreography (11 sections):**
- Hero: face emerges from darkness, typing effect, CTA float up
- About: particles -> structured nodes, stat counters, orbit cards
- Education: timeline draws, holographic cards unfold, certificates glow
- Experience: memory portals scan, cards expand, lights pulse
- Skills: energy cores ignite stagger 80ms, progress rings, character touches
- Projects: buildings rise power4.out, hover expands, filter morphs
- Dashboard: contribution graph grows, satellites orbit, data streams
- Blog: parallax articles drift, hover unfolds, warmth shift
- Testimonials: carousel glide, soft pulse, character receives signals
- Contact: particles -> fireflies, network -> organic, form rises
- Footer: character sits, sunset warms, stars fade, terminal types

**Microinteractions:** Buttons scale 1.03 hover/0.98 press/spring ease. Cards translate 4-8px up + 4deg rotate. Inputs 180ms focus ring. All 200-300ms ease-out.

**Ambient:** Floating particles (200 desktop/500 mobile), data streams, rotating nodes, breathing gradients, drifting holograms. Slow, calming, additive blending. Pause on tab hidden. Respect prefers-reduced-motion.

**Performance:** 60 FPS desktop, 30+ FPS mobile. CSS transforms + opacity. RAF throttled mousemove. Reduce density 50-70% mobile.

---

## PROMPT 5: SEO, GEO, Security & Performance

**Keywords:** Nitin Kumar, Python Developer, Automation Engineer, Cyber Security Enthusiast, Data Science Learner, AI Automation Engineer, Cloud and Security Engineer.

**Structured data:** Person schema (name Nitin S Kumar, jobTitle Senior Automation Engineer, location Pune India, sameAs all social profiles), Website, Breadcrumb, Article, FAQ, ItemList schemas. Already has JSON-LD in layout.tsx.

**Routes (13 static):** `/`, `/feed.xml`, `/llms.txt`, `/llms-full.txt`, `/manifest.webmanifest`, `/privacy`, `/robots.txt`, `/sitemap.xml`, `/toonhub`, `/vanguard`.

**Security headers:** CSP, HSTS (max-age 63072000), X-Frame-Options DENY, X-Content-Type-Options nosniff, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy (camera/microphone/geolocation=()). Already in next.config.ts.

**Form protection:** Zod validation (in deps), honeypot, Cloudflare Turnstile, rate limiting, XSS sanitization.

**Lighthouse targets:** Performance >95, Accessibility >95, Best Practices >95, SEO >95. LCP <2.5s, CLS <0.1, INP <200ms.

**Optimizations:** next/image AVIF/WebP, dynamic imports for 3D (next/dynamic), GLTF Draco compression, preload Inter + PODIUM Sharp fonts, bundle analysis, stale-while-revalidate caching, server components where possible.

**AI search targets:** Google AI Overviews, Bing Copilot, ChatGPT Search, Gemini, Perplexity, Claude.

---

## PROMPT 6: World Environment Design — Background Evolution

**ONE continuous world** transforming per section:

1. **HERO (Digital Awakening):** Deep-space digital void. Dark blue/black (#050816). Floating particles 3 depth layers. Geometric shapes (icosahedron, octahedron, dodecahedron). Neural connection lines. Volumetric fog. Face emerges center.
2. **ABOUT (Reality Forming):** Digital terrain grid materializes. Ground plane beneath character. Floating memory orbs with holographic objects (laptop, drone, terminal, books, AI orb). Blues shifting to cyan-teal.
3. **EDUCATION (Knowledge Archive):** Futuristic library. Holographic timeline panels. Glowing certificate glass panels. Digital monuments. Timeline portals with glow edges. Deep blues + gold/amber accents.
4. **EXPERIENCE (Memory Corridor):** Advanced futuristic architecture. Each job = distinct portal with unique color. Scan-line edge glow. Floating achievement metrics. Pulsing infrastructure lights. Steel blues + cyan + warm amber.
5. **SKILLS (Cyber Laboratory):** Energy core pedestals circle. Each core unique color (frontend=blue, backend=green, cloud=purple, security=red, AI=cyan, DevOps=orange). Firewall entry with hex grid. Progress rings orbit. Code columns background.
6. **PROJECTS (Innovation District):** Cityscape. Buildings rise procedurally. Each project = unique building style. Glowing street lanes. Drone traffic between buildings. Neon blues, purples, warm windows.
7. **DASHBOARD (Living Code Network):** Data landscape terrain. Contribution graph = rolling hills. Repository satellites elliptical. Code stream rivers. Language energy streams. Commit particles. Green, blue, amber.
8. **BLOG (Knowledge Nebula):** Cosmic calm. Digital paper orbits. Holographic scroll articles. Warm color transition. Reading light around character. Warm whites, soft ambers.
9. **TESTIMONIALS (Trust Network):** Bright open space. Circular card carousel. Avatar orbit float. Connection line particles. Gold/white/gradient.
10. **CONTACT->FOOTER (Nature Rising):** Digital particles -> fireflies. Grid -> organic grass. Wireframe -> full trees. Network nodes -> flowers. Sunset warming. Campfire embers + smoke. Stars fade in. Night sky. Sunset magenta/orange/purple -> deep blue/white stars.

**Environmental effects:** Max 2000 particles (500 mobile), instanced rendering. 2-3 real-time lights max. Baked lighting priority. Depth fog per section color. Subtle bloom + chromatic aberration. Frustum culling + LOD all objects. 15-20% scroll range for each transition. Crossfade particle systems + geometry morphs.

---

## PROMPT 7: Interactive Companion Objects

**1. Drone Companion:** Small quadcopter with cyan core. Spring-based follow at shoulder height with 0.5s delay. Pulses 2x near interactables. Emits light beam on first visit. Gentle hover bob idle. Particle trail (50-100 particles, #00E5FF, 0.02 size). THREE.PointLight dynamic intensity.

**2. Floating Terminal:** Holographic panel near GitHub/Skills. CRT scan-line overlay. Typewriter text effect. Section-specific commands: Skills=skill core scan, GitHub=git log, Experience=process status, Security=firewall logs. Hover expands for full history. Monospace font with glow. GSAP TextPlugin or 30-50ms per character typewriter. PlaneGeometry with custom shader.

**3. Security Scanner:** Sweeping light plane every 10-15s inactivity or scroll-velocity tied. Hex-grid pattern overlay. Reveals Easter eggs (data cubes, hidden percentages, shield visualizations). 1.5s per sweep. #00E5FF at 30% opacity. Custom post-processing pass or overlay sprite with animated UV.

**4. Hidden Terminal (Cyber Lab Mode):** Konami code (up up down down left right left right b a) or logo click 5x or typing 'cyberlab'. Unlocks: full certification list with verification, CTF completions, bug bounty history, security projects highlighted, shield icons on security items, 'CLEARANCE LEVEL: 5' badge. Visual: color grading darkens, character gets holographic visor, persistent terminal with security scans, grid overlay, denser particles, scan lines. Zustand cyberMode flag. sessionStorage persistence.

---

## PROMPT 8: Scroll Storytelling System — Camera Spline & Master Timeline

**Tech:** GSAP ScrollTrigger + Lenis 1.3.23 + R3F 3D world + Framer Motion UI reveals.

**Master timeline scroll ranges:**
| Section | Range | Section | Range |
|---------|-------|---------|-------|
| Hero | 0-8% | Certifications | 50-55% |
| About | 8-18% | Projects | 55-68% |
| Education | 18-28% | Dashboard | 68-75% |
| Experience | 28-40% | Blog | 75-82% |
| Skills | 40-50% | Testimonials | 82-87% |
| | | Contact | 87-94% |
| | | Footer | 94-100% |

2-3% transition overlap zones. power2.inOut easing.

**Camera CatmullRom spline** with 11 control points (Hero through Footer). Camera position + lookTarget per point. Subtle sine wave sway on look target.

**Character spline** offset from camera. Always visible. Faces movement direction + idle rotations toward interactive objects.

**Content reveals:** Framer Motion useInView or GSAP markers. Stagger 40-80ms. Fade + translateY 30px. First reveal at section start + 1%, full reveal at section end - 1%.

**Environment transitions:** Background color GSAP .to(), particle system crossfade, light interpolation, fog lerp, asset scale 0->1 for in, 1->0 for out. All power2.inOut over transition zone.

**Mobile:** Lenis smoothTouch:false below 768px. Condensed scroll ranges. Simplified camera spline. Faster reveals. Hide 3D on very small screens.

**Reduced motion:** Disable Lenis, disable GSAP animations, CSS fade-only reveals. aria-hidden on 3D canvas. Skip to content button.

---

## PROMPT 9: Agent Orchestration — Multi-Agent Execution Pipeline

Execute all 8 prompts as a coordinated swarm. The Lead Agent dispatches sub-agents in dependency order, collects outputs, resolves conflicts, and verifies the build.

**Execution order:**
1. Prompt 1 (3D Character) + Prompt 2 (Narrative) + Prompt 3 (UI/UX) — parallel, no deps
2. Prompt 4 (Motion) — depends on Prompt 3 tokens
3. Prompt 5 (SEO/Security) — depends on Prompt 3 structure
4. Prompt 6 (World Environment) — depends on Prompts 1+2
5. Prompt 7 (Companion Objects) — depends on Prompts 1+6
6. Prompt 8 (Scroll System) — depends on ALL previous

**Shared context for ALL agents:**

### Portfolio Data (Nitin S Kumar)
- Role: Senior Automation Engineer at Happiest Minds Technologies, Pune
- 5+ years experience (TCS 5 roles 2020-2024, Happiest Minds 2024-present)
- Education: MCA + BCA from Arka Jain University
- Skills: Automation 90%, Python 90%, Testing 85%, Web Dev 70%, AI 70%, Data Science 60%, Cyber Security 50%
- GitHub: 227 repos, 160+ stars (top: edu-mail-auto-generator 119★)
- Projects: 18 total (9 featured), 17 articles on dev.to
- Certifications: 30+ across automation, data science, cybersecurity, cloud
- Social: GitHub, LinkedIn, X, Instagram, Stack Overflow, WhatsApp, Dev.to, Holopin, PyPI, HackerRank, Email

### Loading Screen Spec
- requestAnimationFrame-driven 3s cubic ease-out progress bar
- "Nitin Kumar" 11 character reveal (rotateX + y transform per char)
- Theme gradient on name + progress bar
- Blinking cursor at 0.8s interval
- AnimatePresence fade-out exit 0.8s
- Code: `src/components/loading-screen.tsx` (150 lines)

### Footer Spec
- Terminal with 7 commands: help, about, skills, projects, github, contact, cyber
- Prompts: visitor@ni3:~$ in #00E5FF, output in rgba(255,255,255,0.6)
- Live clock via setInterval 1000ms + toLocaleTimeString
- Date via toLocaleDateString(weekday/month/day)
- 11 social links in hover-scale grid
- Aurora: 2 animated blobs (#00E5FF + #7B61FF) with blur-[100px] + scale keyframes
- 8 floating particles with y bounce + opacity fade
- Copyright: new Date().getFullYear() with name + MIT License

### Tech Stack (Exact Versions)
- Next.js 16.2.7 (App Router), React 19.2.0, TypeScript 5.7 strict
- Tailwind CSS v4 (PostCSS plugin, @theme inline, CSS variables)
- Three.js 0.184.0, @react-three/fiber 9.6.1, @react-three/drei 10.7.7
- Framer Motion 12.40.0 / motion 12.40.0, GSAP 3.15.0, Lenis 1.3.23
- @radix-ui/react-slot 1.2.4, lucide-react 1.17.0
- clsx + tailwind-merge + class-variance-authority
- Zustand (store: activeSection, cyberMode, theme, mobileMenuOpen)
- @vercel/analytics, @vercel/speed-insights
- Inter (next/font/google), PODIUM Sharp (@font-face)
- Critical bundle ~180KB gzipped (3D code-split separately)
- Security headers: HSTS, CSP, X-Frame-Options, Permissions-Policy in next.config.ts

### Themes (CSS Custom Properties)
Base: --background=#050816, --primary=#00E5FF, --secondary=#4488FF, --accent=#7B61FF
Cyber: --background=#0a0a0a, --primary=#00FF41
AI: --background=#0a0015, --primary=#A855F7
Data: --background=#0a0d1a, --primary=#FF8C00

### 16 Sections (in order)
hero -> playground -> about -> experience -> education -> skills -> certifications -> projects -> dashboard -> ai-lab -> blog -> testimonials -> recommendations -> achievements -> contact -> footer

### Build Commands
```bash
npm install
npm run dev          # dev at localhost:3000
npx next build --webpack  # production (Windows)
npm run build        # production (macOS/Linux/Vercel)
npm start            # production server
```

### Integration Rules
- Every component matches UI Design System tokens exactly
- Every animation follows Motion Design System tokens exactly
- SEO metadata + security headers + accessibility verified before commit
- Lighthouse >95 all categories, LCP <2.5s, CLS <0.1
- All code uses motion/react, Tailwind v4 @theme inline, TypeScript strict
- Build passes with zero errors

---

## FINAL OUTPUT

The completed portfolio must feel like:
- A single continuous cinematic world, not stitched sections
- A polished interactive film with intentional motion
- A premium Awwwards-level experience
- Futuristic automation meets cybersecurity meets AI storytelling

**All 9 prompts must be executed. All shared context must be respected. The build must pass. The result deploys to Vercel.**
