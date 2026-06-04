"use client"

import { motion } from "motion/react"
import { data } from "@/lib/data"
import { useAppStore } from "@/lib/store"
import { Mail, ArrowUp, Terminal, Sparkles, Phone } from "lucide-react"
import {
  GitHubIcon, LinkedInIcon, XIcon, InstagramIcon, StackOverflowIcon,
  WhatsAppIcon, DevToIcon, HolopinIcon, PyPIIcon, HackerRankIcon,
} from "@/lib/icons"
import { useEffect, useState, useRef } from "react"

const terminalCommands = [
  { cmd: "help", output: "Available: about, skills, projects, github, contact, cyber" },
  { cmd: "about", output: "Automation Engineer | Python | AI | Cyber Security" },
  { cmd: "skills", output: "Python 90% | Selenium 90% | Automation 90% | AI 70%" },
  { cmd: "projects", output: "227 repos | 160+ stars | Top: edu-mail-auto-generator ★119" },
  { cmd: "github", output: "github.com/nitinkumar30 — 227 public repositories" },
  { cmd: "contact", output: "nitinkumarpythonic@gmail.com | Pune, India" },
  { cmd: "cyber", output: "⚠️ CYBER MODE ACTIVATED — System breach detected" },
]

export function Footer() {
  const year = new Date().getFullYear()
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })
  const [termInput, setTermInput] = useState("")
  const [termHistory, setTermHistory] = useState<{ cmd: string; output: string }[]>([])
  const [time, setTime] = useState(new Date())
  const { toggleCyberMode, cyberMode } = useAppStore()
  const termRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = termInput.toLowerCase().trim()
    const found = terminalCommands.find((t) => t.cmd === cmd)
    const output = found ? found.output : `bash: ${cmd}: command not found`
    setTermHistory((prev) => [...prev, { cmd: termInput, output }])
    if (cmd === "cyber") toggleCyberMode()
    setTermInput("")
  }

  return (
    <footer id="footer" className="relative border-t border-white/10 bg-[#050816] overflow-hidden">
      {/* Aurora background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#7B61FF]/10 rounded-full blur-[100px]"
        />
      </div>

      {/* Floating particles */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00E5FF]/30 rounded-full pointer-events-none"
          style={{ left: `${5 + i * 12}%`, top: `${15 + (i % 4) * 25}%` }}
          animate={{ y: [0, -25, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.3, ease: "easeInOut" }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Terminal */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-xs text-white/30 ml-2 font-mono">terminal — ni3@portfolio:~/</span>
              </div>
              <div ref={termRef} className="p-4 font-mono text-xs space-y-1.5 max-h-48 overflow-y-auto">
                <div className="text-[#00E5FF]/60">Welcome to NI3 Terminal. Type 'help' for commands.</div>
                {termHistory.map((h, i) => (
                  <div key={i}>
                    <div className="text-green-400/80">
                      <span className="text-[#00E5FF]">visitor@ni3</span>:~$ <span className="text-white">{h.cmd}</span>
                    </div>
                    <div className="text-white/60 pl-4">{h.output}</div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 px-4 py-2.5 border-t border-white/10">
                <span className="text-[#00E5FF] font-mono text-xs">visitor@ni3:~$</span>
                <input
                  value={termInput}
                  onChange={(e) => setTermInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs placeholder-white/20"
                  placeholder="type a command..."
                  autoFocus={false}
                />
              </form>
            </div>
          </div>

          {/* Live Clock + Social Orbit */}
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-light text-white font-mono tabular-nums">
                {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </div>
              <div className="text-xs text-white/30 mt-1">
                {time.toLocaleDateString([], { weekday: "long", month: "long", day: "numeric" })}
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                { icon: GitHubIcon, href: data.personal_info.github, label: "GitHub" },
                { icon: LinkedInIcon, href: data.personal_info.linkedin, label: "LinkedIn" },
                { icon: XIcon, href: data.personal_info.twitter, label: "X (Twitter)" },
                { icon: InstagramIcon, href: data.personal_info.instagram, label: "Instagram" },
                { icon: StackOverflowIcon, href: data.personal_info.stackoverflow, label: "Stack Overflow" },
                { icon: WhatsAppIcon, href: data.personal_info.whatsapp, label: "WhatsApp" },
                { icon: DevToIcon, href: data.personal_info.devto, label: "Dev.to" },
                { icon: HolopinIcon, href: data.personal_info.holopin, label: "Holopin" },
                { icon: PyPIIcon, href: data.personal_info.pypi, label: "PyPI" },
                { icon: HackerRankIcon, href: data.personal_info.hackerrank, label: "HackerRank" },
                { icon: Mail, href: `mailto:${data.personal_info.email}`, label: "Email" },
              ].map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.2, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-xl bg-white/[0.03] border border-white/10 text-white/40 hover:text-[#00E5FF] hover:border-[#00E5FF]/40 hover:bg-white/[0.06] hover:shadow-[0_0_15px_rgba(0,229,255,0.1)] transition-all duration-300"
                >
                  <Icon className="w-[18px] h-[18px]" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-xs">
            &copy; {year} {data.personal_info.name}. MIT License
          </p>
          <p className="text-white/40 text-xs flex items-center gap-1.5">
            Made with{" "}
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-red-400 inline-block"
            >
              ♥
            </motion.span>{" "}
            and <Sparkles className="w-3 h-3 text-yellow-400" /> by{" "}
            <a
              href={data.personal_info.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00E5FF] hover:text-[#7B61FF] transition-colors font-medium"
            >
              Nitin
            </a>
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg border border-white/10 text-white/30 hover:text-white hover:border-white/20 transition-all duration-300"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  )
}
