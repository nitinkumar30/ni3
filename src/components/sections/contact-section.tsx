
import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/animations/scroll-reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { portfolioData } from "@/lib/portfolio-data";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from "@/components/ui/social-icons";

const contact = portfolioData.contact;
const social = portfolioData.social_links;

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact-me" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="default" className="mb-4">Contact</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              <span className="bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left - Contact info */}
          <ScrollReveal direction="left">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Let&apos;s Work Together</h3>
                <p className="text-white/60 leading-relaxed">
                  Have a project in mind or just want to say hi? Feel free to reach out.
                  I&apos;m always open to discussing new opportunities.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
                  { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone}` },
                  { icon: MapPin, label: "Location", value: contact.address },
                ].map((item) => (
                  <motion.div
                    key={item.label}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:border-[#00E5FF]/30 transition-all duration-300 group"
                  >
                    <div className="p-3 rounded-lg bg-gradient-to-br from-[#00E5FF]/20 to-[#7B61FF]/20 group-hover:from-[#00E5FF]/30 group-hover:to-[#7B61FF]/30 transition-all">
                      <item.icon className="w-5 h-5 text-[#00E5FF]" />
                    </div>
                    <div>
                      <p className="text-xs text-white/40 mb-0.5">{item.label}</p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-white/80 hover:text-[#00E5FF] transition-colors text-sm"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-white/80 text-sm">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Social links */}
              <div>
                <p className="text-sm text-white/40 mb-4">Social Links</p>
                <div className="flex gap-3">
                  {[
                    { icon: GithubIcon, href: social.github, label: "GitHub" },
                    { icon: LinkedinIcon, href: social.linkedin, label: "LinkedIn" },
                    { icon: TwitterIcon, href: social.twitter, label: "Twitter" },
                    { icon: InstagramIcon, href: social.instagram, label: "Instagram" },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="p-3 rounded-lg border border-white/10 text-white/40 hover:text-[#00E5FF] hover:border-[#00E5FF]/30 hover:bg-[#00E5FF]/5 transition-all duration-300"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right - Contact form */}
          <ScrollReveal direction="right">
            <motion.form
              onSubmit={handleSubmit}
              className="p-8 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
            >
              <div className="space-y-5">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00E5FF]/50 focus:ring-1 focus:ring-[#00E5FF]/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00E5FF]/50 focus:ring-1 focus:ring-[#00E5FF]/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="What's this about?"
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00E5FF]/50 focus:ring-1 focus:ring-[#00E5FF]/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Message</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Your message..."
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:outline-none focus:border-[#00E5FF]/50 focus:ring-1 focus:ring-[#00E5FF]/20 transition-all duration-300 resize-none"
                  />
                </div>
                <Button type="submit" size="lg" className="w-full group">
                  {submitted ? (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      Message Sent!
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Send Message
                    </span>
                  )}
                </Button>
              </div>
            </motion.form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

