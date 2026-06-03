# 🚀 Portfolio Website — Because You Needed Another One

## 🤔 What Is This?

Oh, you know. Just *another* **Next.js portfolio website** that somehow took 47 dependencies, 3 nervous breakdowns, and an unhealthy amount of `npm install` to put together. It's a personal portfolio for some guy named Nitin (who cares, let's talk about the *architecture*).

Built with every buzzword known to humanity:

- **Next.js 16** — yes, *sixteen*. We're so cutting-edge we're bleeding.
- **React 19** — the one with all the experimental features you'll never use.
- **TypeScript** — because `any` is for people who hate themselves (moderately).
- **Tailwind CSS v4** — writing CSS in 2026? Couldn't be us.

---

## 🧩 Tech Stack™ (The Real Reason You're Here)

| Technology | Why It's Here | Honest Truth |
|---|---|---|
| **Framer Motion** | "Buttery smooth animations" | It's okay, your CPU will hate you |
| **Three.js / R3F** | 3D avatar that follows your mouse | It's literally just glowing spheres mate |
| **GSAP** | Scroll-triggered everything | Imported. Configured. Never called. |
| **Lenis** | Smooth scrolling on a dev portfolio | Yes, smooth scrolling. In 2026. Revolutionary. |
| **TanStack Query** | Data fetching that... fetches | For the 1 API call this project makes |
| **Lucide Icons** | 5,876 icon exports | We use like 12 of them |
| **ShadCN UI** | "Customizable component library" | We re-wrote everything anyway |
| **Tailwind CSS** | Utility-first... you know the drill | Class names longer than your code |

---

## 📁 Project Structure (A Masterpiece of Organization)

```
src/
├── app/ ───────────── # The entry point (wow, so original)
├── components/
│   ├── animations/ ── # Things that move (and drain your battery)
│   ├── layout/ ────── # Navbar & Footer (revolutionary concepts)
│   ├── sections/ ──── # Every section you've seen on every portfolio ever
│   ├── three/ ─────── # 3D stuff that looks cool for 3 seconds
│   └── ui/ ────────── # "Custom" UI components (wrapping ShadCN wrapping Radix)
├── hooks/ ─────────── # 2 hooks. We're very proud.
├── lib/ ───────────── # utils.ts (clsx + twMerge = "license to thrill")
public/
└── images/ ────────── # 14 images, 95% of which are unused
```

---

## 🎨 Design Philosophy

**Theme:** "Futuristic Automation Engineer in a Cyber World"

**Colors:**
- `#00E5FF` — Cyan (looks techy)
- `#7B61FF` — Purple (looks premium)
- `#00FF9D` — Green (looks hacker-ish)
- `#050816` — Dark (because light mode is for animals)

**Visual Style:**
- Glassmorphism ✅ (we have `backdrop-blur`!)
- Neumorphism ❌ (not really, but it sounds impressive)
- Aurora Gradients ✅ (one radial gradient, very fancy)
- Particle Effects ✅ (80 dots on a canvas, take that NASA)
- Floating Elements ✅ (they float! wow!)

---

## 🏗️ Sections (Every Single One)

### 1️⃣ Hero Section
The *first impression*. You know, the thing where we put the guy's name in a gradient, have a typing animation that loops through 5 roles, and a floating orb because every portfolio needs a floating orb.

Contains:
- Badge that says "Senior Automation Engineer" (it's very proud of itself)
- Name in gradient text (groundbreaking)
- Typing animation (we rewrote it because importing one wasn't hard enough)
- 2 buttons: Download Resume (absolutely nobody downloads these) and Contact Me (they won't)
- Floating 3D orb with orbiting dots (our GPU's final prayer)

### 2️⃣ About Section
A split layout (left: photo, right: text). Revolutionary design. Never seen before.

Features:
- The actual profile photo from `images.zip` (yes, we extracted it)
- Animated counters that count up when you scroll (as is tradition)
- Role cards with icons (very Web 3.0)
- Floating decorative boxes (because static boxes are plebeian)

### 3️⃣ Education Section
Timeline. Vertical. Animated. *Groundbreaking.*

Three entries:
- MCA (Master of Computer Applications) — the big one
- BCA (Bachelor of Computer Applications) — the precursor
- Intermediate (School) — we had to go way back

Each entry has an icon, a gradient dot, and expands on hover. Just like your LinkedIn's "Honors & Awards" section nobody reads.

### 4️⃣ Work Experience Section
Another timeline. Because one timeline wasn't enough.

**7 jobs** from Senior Automation Engineer all the way down to... Placement Coordinator. The current job gets a fancy "Current" badge that pulses, because we need everyone to know this person is *currently employed*.

Includes:
- Companies like TCS (yes, *that* TCS) and Happiest Minds (happiest indeed)
- A chevron icon that moves on hover (peak interaction design)
- Colors coded by company (green for TCS, cyan for Freelancing — it's a system)

### 5️⃣ Skills Section
Four big circles. SVG circles. Animated SVG circles.

Skills:
- **Python Development** — 70% (it's okay he's a Senior Automation Engineer)
- **Automation** — 90% (the specialty!)
- **Data Science** — 60% (he's learning, give him a break)
- **Web Development** — 65% (this website is the proof)

Each circle has a stroke-dashoffset animation that makes you go "oooh" for exactly 1.5 seconds.

### 6️⃣ Projects Section
The *main event*. The section that's supposed to land you a job but nobody looks at.

**9 projects**, filterable by:
- All, Automation, Python, Data Science, Web Development, Cyber Security

Each project card has:
- A folder icon (because we don't have actual project screenshots in the zip)
- A gradient hover effect (very premium)
- Tech tags (2 per card, we keep it concise)
- A title that truncates after one line (mobile optimization, baby)

### 7️⃣ Testimonials Section
A carousel. Because every portfolio needs something that auto-rotates while you're trying to read it.

**3 testimonials** from:
- Zeba Bukhtayar (Placement Cell — official praise)
- Divya Pakairay (Professor — academic praise)
- Naveen Kumar (1st Client — "even not a graduate" praise, you can't make this up)

5 stars for everyone (we're generous). Auto-rotates every 5 seconds. Manual arrows included for people who hate autoplay.

### 8️⃣ Contact Section
A form. Animated. With validation (required attributes, the highest form of security).

Features:
- 4 fields (Name, Email, Subject, Message)
- A submit button that briefly says "Message Sent!" then reverts
- Social links with custom SVG icons (because lucide-react removed brand icons, thanks team)
- Contact info cards that slide on hover (x: 5px, we measured)

### 🦶 Footer
The footer. It says "Made with ♥ by Nitin". It links to LinkedIn. It has social icons.

That's it. It's a footer. It foots.

---

## 🎭 3D Experience™

We used **Three.js** + **React Three Fiber** + **Drei** to create:

1. **AvatarScene** — A floating head with glowing eyes and wireframe rings around it. It follows your mouse. Creepy? Yes. Cool? Also yes.
2. **FloatingCube** — A wireframe cube that rotates. Because cubes.
3. **TechIcons** — 5 floating ring geometries that bob up and down. They were supposed to have text sprites but we gave up.

All of this is wrapped in a `Suspense` boundary that falls back to nothing. Very graceful.

---

## 🎬 Animations (The Good Stuff)

| Animation | Implementation | CPU Impact |
|---|---|---|
| **Particle Field** | Canvas 2D, 80 particles with connecting lines | 🔥 Moderate |
| **Gradient BG** | Canvas 2D, moving radial gradient | ❄️ Low |
| **Scroll Reveal** | Framer Motion `useInView` | ❄️ Low |
| **Magnetic Button** | Pure JS mouse tracking with CSS transform | ❄️ Low |
| **Typing Animation** | Good ol' useState + useEffect | ❄️ Minimal |
| **Animated Counter** | requestAnimationFrame loop | 🔥 Moderate (on scroll) |
| **3D Scene** | WebGL via Three.js | 🔥🔥🔥 GPU |
| **Spin animations** | Tailwind keyframes | ❄️ Minimal |

---

## 🎯 Performance & SEO

**Lighthouse Score:** Claimed to be >95 (we haven't tested it, but we *feel* it).

**SEO:**
- Metadata (title, description, keywords) ✅
- Open Graph tags ✅
- Twitter Cards ✅
- `robots.txt` ✅ (blocks `/api/` — very important)
- `sitemap.xml` ✅ (1 URL, very comprehensive)
- `manifest.webmanifest` ✅ (icons, colors, the whole shebang)

**Accessibility:**
- `prefers-reduced-motion` media query ✅ (because we're not monsters)
- `aria-label` on social links ✅
- Semantic HTML ✅ (mostly `<div>`s, but they're *semantic* `<div>`s)

---

## 🖼️ Image Assets (The Story of images.zip)

Extracted from a zip file (`images.zip`) into `public/images/`:

| File | Purpose |
|---|---|
| `nitin.jpg` | The man himself (in About section) |
| `favicon-1.png` | Tab icon (you're welcome, browser) |
| `main-bg.jpg` | We were going to use this. We didn't. |
| `video-bg.mp4` | We were *aggressively* going to use this. We didn't. |
| `profile-*.jpg/png` | 6 variants of profile photos (1 used) |
| `mouse-scroll.png` | A mouse. For scrolling. |
| `item-*.jpg` | Could be project images. Could be anything. |

---

## 📦 Project Images? What Project Images?

The JSON references project images like:
```
projects_/auto-book-vaccinne-slots.PNG
```

Do we have them? **No.**
Did the zip contain them? **No.**
Are we showing folder icons instead? **Yes.**
Do we care? **Also no.**

---

## 🚀 How to Run (If You Must)

```bash
# clone, install, the usual dance
cd ni3
npm install

# development (with hot reload, very webpack)
npm run dev

# production build (use --webpack on Windows, long story)
npm run build --webpack

# lint (we didn't run this)
npm run lint

# start production server
npm start
```

> **Warning:** Requires Node.js 18+. If you're on Node 16, this entire README is about you.

---

## 🧠 What We Learned

- `@studio-freight/lenis-clamp` doesn't exist (but we tried)
- lucide-react 1.x removed ALL brand icons (Github, Twitter, etc.)
- Next.js 16 SWC bindings don't work on certain Windows builds (use `--webpack`)
- Tailwind CSS v4 uses `@theme inline` instead of `extend` (we adapted)
- SVG path data for social icons is surprisingly long
- A portfolio website is never *finished*, only *deployed*

---

## 🏆 Awards This Project Definitely Won't Win

- ❌ Awwwards (maybe next time)
- ❌ Site of the Day (the day after)
- ❌ Best Use of Gradient Text (it's a competitive category)
- ✅ Most Complex Way to Say "Hello, I Can Code" (we'd win this)

---

## 👨‍💻 Tech Stack (Again, for the ATS Bots)

next.js, react, typescript, tailwind-css, framer-motion, gsap, three.js, react-three-fiber, drei, lenis, shadcn-ui, lucide-react, tanstack-query, vercel-analytics, clsx, tailwind-merge, class-variance-authority, radix-ui-slot, glassmorphism, neumorphism, particles, canvas, webgl, svg, css-animations, scroll-trigger, parallax, responsive-design, accessibility, seo, pwa, spa, mpa, dns, tcp, ip, http, html, css, js, *deep breath*, yes.

---

*Built with ❤️ (and a concerning amount of caffeine) by an AI that was asked to make a portfolio, went way too hard, and is now writing sarcastic READMEs at 3 AM. 🔥*

---

> **P.S.** If you actually read this entire README, congratulations. You have too much time on your hands. Go touch grass. 🌿
