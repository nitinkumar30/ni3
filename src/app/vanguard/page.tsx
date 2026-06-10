"use client"

import { useState, useEffect } from "react"
import { ArrowUpRight, Award, Crown, X } from "lucide-react"

const NAV_LINKS = ["Projects", "Studio", "Offerings", "Inquire"]

export default function VanguardPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  return (
    <div className="relative h-screen w-full overflow-hidden font-inter">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
      />

      <div className="absolute inset-0 bg-black/40" />

      <nav className="relative z-40 flex items-center justify-between px-6 sm:px-10 lg:px-16 py-5 lg:py-7">
        <span className="font-podium text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
          VANGUARD
        </span>

        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="font-inter text-sm tracking-widest uppercase text-white/80 transition-colors hover:text-white"
            >
              {link}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center">
          <a
            href="#"
            className="group flex items-center gap-2 border border-white/30 px-6 py-3 text-xs tracking-widest uppercase text-white transition-all hover:border-white/60 hover:bg-white/10"
          >
            GET IN TOUCH
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <button
          onClick={() => setMenuOpen(true)}
          className="flex md:hidden flex-col items-end space-y-1.5"
          aria-label="Open menu"
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-4 bg-white" />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-sm transition-all duration-500 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="flex items-center justify-between px-6 sm:px-10 py-5 lg:py-7">
          <span className="font-podium text-2xl sm:text-3xl font-bold uppercase tracking-wider text-white">
            VANGUARD
          </span>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X className="h-6 w-6 text-white" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-center gap-8 px-6" style={{ height: "calc(100% - 100px)" }}>
          {NAV_LINKS.map((link, i) => (
            <a
              key={link}
              href="#"
              onClick={() => setMenuOpen(false)}
              className="font-podium text-4xl sm:text-5xl uppercase text-white transition-colors hover:text-white/70"
              style={{
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                transition: `all 0.5s ${i * 0.08 + 0.1}s cubic-bezier(0.4, 0, 0.2, 1)`,
              }}
            >
              {link}
            </a>
          ))}
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="mt-4 border border-white/30 px-8 py-4 font-podium text-xl uppercase tracking-wider text-white transition-all hover:border-white/60 hover:bg-white/10"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? "translateY(0)" : "translateY(20px)",
              transition: `all 0.5s ${NAV_LINKS.length * 0.08 + 0.1}s cubic-bezier(0.4, 0, 0.2, 1)`,
            }}
          >
            GET IN TOUCH
          </a>
        </div>
      </div>

      <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-10 lg:px-16">
        <div className="max-w-4xl">
          <div className="animate-fade-up mb-6 lg:mb-8 flex items-center gap-2">
            <Crown className="h-4 w-4 text-white/70" />
            <span className="font-inter text-xs sm:text-sm tracking-[0.3em] uppercase text-white/70">
              World-Class Digital Collective
            </span>
          </div>

          <h1 className="animate-fade-up-delay-1 font-podium uppercase leading-[0.92] tracking-tight text-white">
            <div className="text-[clamp(2.8rem,8vw,7rem)]">Design.</div>
            <div className="text-[clamp(2.8rem,8vw,7rem)]">Disrupt.</div>
            <div className="text-[clamp(2.8rem,8vw,7rem)]">Conquer.</div>
          </h1>

          <div className="animate-fade-up-delay-2 mt-6 lg:mt-8 max-w-md">
            <p className="font-inter text-sm sm:text-base leading-relaxed text-white/70">
              We build fierce brand identities
              <br />
              that don&apos;t just turn heads &mdash;{" "}
              <span className="font-bold text-white">they lead.</span>
            </p>
          </div>

          <div className="animate-fade-up-delay-3 mt-8 lg:mt-10 flex flex-wrap items-center gap-4 sm:gap-6">
            <a
              href="#"
              className="group flex items-center gap-2 bg-black px-5 sm:px-7 py-3 sm:py-4 text-[11px] sm:text-xs tracking-widest uppercase text-white transition-colors hover:bg-neutral-900"
            >
              SEE OUR WORK
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <div className="hidden sm:flex items-center gap-3">
              <Award className="h-8 w-8 text-white/50" />
              <div>
                <p className="text-xs tracking-wider uppercase text-white/60">Top-Rated</p>
                <p className="text-xs tracking-wider uppercase text-white/60">Brand Studio</p>
              </div>
            </div>
          </div>

          <div className="animate-fade-up-delay-4 mt-8 sm:mt-10 lg:mt-14 flex flex-wrap gap-6 sm:gap-12 lg:gap-16">
            {[
              { value: "250+", label: "Brands Transformed" },
              { value: "95%", label: "Client Retention" },
              { value: "10+", label: "Years in the Game" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-inter text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                  {stat.value}
                </p>
                <p className="mt-1 text-[9px] sm:text-xs tracking-widest uppercase text-white/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
