"use client"

import { useState } from "react"
import { motion } from "motion/react"
import { ScrollReveal } from "@/components/animations/scroll-reveal"
import { Badge } from "@/components/ui/badge"
import { data } from "@/lib/data"
import { Mail, MapPin, Phone, Send, MessageSquare, CheckCircle2, Code, Terminal, Sparkles } from "lucide-react"

function CharacterIllustration() {
  return (
    <div className="relative w-full mx-auto">
      {/* Animated gradient ring behind character */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-25 blur-2xl"
        style={{ background: "var(--theme-gradient)" }}
        animate={{ scale: [1, 1.06, 1], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Orbiting ring */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] aspect-square rounded-full border pointer-events-none"
        style={{ borderColor: "color-mix(in srgb, var(--primary) 15%, transparent)" }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full" style={{ background: "var(--primary)" }} />
      </motion.div>

      {/* Character image — pre-processed PNG with transparent background */}
      <div className="relative z-10 px-4 pt-4">
        <div className="relative mx-auto" style={{ maxWidth: 260 }}>
          <motion.img
            src="/images/20260603_220709-IMG_STYLE-removebg.png"
            alt="Character"
            width={585}
            height={427}
            loading="eager"
            className="w-full h-auto block"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Scanning line effect */}
          <motion.div
            className="absolute inset-x-0 h-0.5 pointer-events-none"
            style={{
              background: "linear-gradient(90deg, transparent, var(--primary), transparent)",
              filter: "blur(1px)",
            }}
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>

      {/* Floating code snippets */}
      <motion.div
        className="absolute left-0 top-[15%] z-30 pointer-events-none"
        animate={{ y: [0, -8, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="px-2 py-1.5 rounded-lg text-[8px] font-mono whitespace-nowrap shadow-lg backdrop-blur-sm" style={{ background: "color-mix(in srgb, var(--primary) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--primary) 25%, transparent)", color: "var(--primary)" }}>
          <Code className="w-2.5 h-2.5 inline mr-1" />
          const dev = true
        </div>
      </motion.div>

      <motion.div
        className="absolute right-0 top-[30%] z-30 pointer-events-none"
        animate={{ y: [0, 8, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      >
        <div className="px-2 py-1.5 rounded-lg text-[8px] font-mono whitespace-nowrap shadow-lg backdrop-blur-sm" style={{ background: "color-mix(in srgb, var(--accent) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--accent) 25%, transparent)", color: "var(--accent)" }}>
          <Terminal className="w-2.5 h-2.5 inline mr-1" />
          npm run build
        </div>
      </motion.div>

      <motion.div
        className="absolute left-1 top-[55%] z-30 pointer-events-none"
        animate={{ y: [0, -5, 0], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="px-2 py-1 rounded-lg text-[8px] font-mono whitespace-nowrap shadow-lg backdrop-blur-sm" style={{ background: "color-mix(in srgb, var(--success) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--success) 25%, transparent)", color: "var(--success)" }}>
          git push origin main
        </div>
      </motion.div>

      {/* Message bubble */}
      <motion.div
        className="absolute right-0 bottom-[15%] z-30 pointer-events-none"
        animate={{ y: [0, -6, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <div className="px-3 py-1.5 rounded-2xl text-[9px] font-medium whitespace-nowrap shadow-lg backdrop-blur-sm" style={{ background: "color-mix(in srgb, var(--success) 12%, transparent)", border: "1px solid color-mix(in srgb, var(--success) 25%, transparent)", color: "var(--success)" }}>
          <Sparkles className="w-2.5 h-2.5 inline mr-1" />
          Let&apos;s build!
        </div>
      </motion.div>

      {/* Typing cursor */}
      <motion.div
        className="absolute bottom-[8%] left-1/2 -translate-x-1/2 z-30 pointer-events-none font-mono text-[9px]"
        style={{ color: "var(--muted)" }}
      >
        <span>_</span>
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          ▎
        </motion.span>
      </motion.div>

      {/* Particles */}
      {[...Array(8)].map((_, i) => {
        const left = 10 + (i * 11) % 80
        const top = 5 + (i * 13) % 70
        const size = 1.5 + (i % 3)
        return (
          <motion.div
            key={i}
            className="absolute rounded-full z-20 pointer-events-none"
            style={{
              width: size,
              height: size,
              background: i % 3 === 0 ? "var(--primary)" : i % 3 === 1 ? "var(--accent)" : "var(--success)",
              left: `${left}%`,
              top: `${top}%`,
              filter: "blur(0.3px)",
            }}
            animate={{
              y: [0, -(6 + (i % 5) * 2), 0],
              x: [0, (i % 3 - 1) * 4, 0],
              opacity: [0.2, 0.9, 0.2],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 2.5 + (i % 3) * 1.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        )
      })}

      {/* Bottom decorative line */}
      <div className="relative z-10 mt-3 flex justify-center gap-1">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-6 h-0.5 rounded-full"
            style={{ background: "var(--theme-gradient)" }}
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}
      </div>
    </div>
  )
}

export function ContactSection() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const errs: Record<string, string> = {}
    if (!form.name.trim()) errs.name = "Name is required"
    if (!form.email.trim()) {
      errs.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email address"
    }
    if (!form.message.trim()) errs.message = "Message is required"
    else if (form.message.trim().length < 10) errs.message = "Message must be at least 10 characters"
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="premium" className="mb-4">
              <MessageSquare className="w-3.5 h-3.5 mr-1.5" />
              Get In Touch
            </Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-gradient">Contact</span>
            </h2>
            <p className="text-white/40 text-sm max-w-xl mx-auto">
              Have a project in mind? Let&apos;s build something extraordinary together.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-5xl mx-auto">
          {/* Portrait */}
          <div className="lg:col-span-2 space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative w-full aspect-square rounded-xl overflow-hidden border border-[var(--card-border)] mb-4"
            >
              <img
                src={data.images.contact}
                alt={data.personal_info.name}
                width={400}
                height={400}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <Mail className="w-4 h-4 text-[#00E5FF] mb-2" />
              <p className="text-xs text-white/40 mb-1">Email</p>
              <p className="text-sm text-white/80">{data.personal_info.email}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <MapPin className="w-4 h-4 text-[#7B61FF] mb-2" />
              <p className="text-xs text-white/40 mb-1">Location</p>
              <p className="text-sm text-white/80">{data.personal_info.current_location}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-4 rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <Phone className="w-4 h-4 text-[#00FF9D] mb-2" />
              <p className="text-xs text-white/40 mb-1">Available</p>
              <p className="text-sm text-white/80">Mon-Fri, 9AM-6PM IST</p>
            </motion.div>
          </div>

          {/* Form + Illustration */}
          <div className="lg:col-span-3 space-y-6">
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="p-6 rounded-xl border border-white/10 bg-white/[0.02]"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="sr-only">Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => {
                      setForm({ ...form, name: e.target.value })
                      if (errors.name) setErrors((prev) => ({ ...prev, name: "" }))
                    }}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "contact-name-error" : undefined}
                    className={`w-full px-4 py-2.5 rounded-lg bg-white/[0.03] text-white text-sm placeholder:text-white/20 focus:outline-none transition-all ${
                      errors.name ? "border border-red-500/60 focus:border-red-500" : "border border-white/10 focus:border-[#00E5FF]/40"
                    }`}
                  />
                  {errors.name && <p id="contact-name-error" className="text-red-400 text-xs mt-1" role="alert">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="contact-email" className="sr-only">Your Email</label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value })
                      if (errors.email) setErrors((prev) => ({ ...prev, email: "" }))
                    }}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "contact-email-error" : undefined}
                    className={`w-full px-4 py-2.5 rounded-lg bg-white/[0.03] text-white text-sm placeholder:text-white/20 focus:outline-none transition-all ${
                      errors.email ? "border border-red-500/60 focus:border-red-500" : "border border-white/10 focus:border-[#00E5FF]/40"
                    }`}
                  />
                  {errors.email && <p id="contact-email-error" className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="contact-message" className="sr-only">Your Message</label>
                  <textarea
                    id="contact-message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={(e) => {
                      setForm({ ...form, message: e.target.value })
                      if (errors.message) setErrors((prev) => ({ ...prev, message: "" }))
                    }}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "contact-message-error" : undefined}
                    rows={4}
                    className={`w-full px-4 py-2.5 rounded-lg bg-white/[0.03] text-white text-sm placeholder:text-white/20 focus:outline-none transition-all resize-none ${
                      errors.message ? "border border-red-500/60 focus:border-red-500" : "border border-white/10 focus:border-[#00E5FF]/40"
                    }`}
                  />
                  {errors.message && <p id="contact-message-error" className="text-red-400 text-xs mt-1" role="alert">{errors.message}</p>}
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] text-white text-sm font-medium hover:shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-all duration-300"
                >
                  {sent ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </motion.form>

            {/* Character illustration filling space below form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]"
              style={{ minHeight: 320 }}
            >
              {/* Card gradient top border */}
              <div className="absolute top-0 inset-x-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--primary), transparent)" }} />

              <CharacterIllustration />

              {/* Card corner accents */}
              <div className="absolute top-3 left-3 w-6 h-6 pointer-events-none" style={{ borderTop: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)", borderLeft: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)" }} />
              <div className="absolute bottom-3 right-3 w-6 h-6 pointer-events-none" style={{ borderBottom: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)", borderRight: "1px solid color-mix(in srgb, var(--primary) 30%, transparent)" }} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
