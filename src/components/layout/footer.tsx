
import { motion } from "framer-motion";
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from "@/components/ui/social-icons";
import { portfolioData } from "@/lib/portfolio-data";
import { ArrowUp, Code2, Sparkles } from "lucide-react";

const social = portfolioData.social_links;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.4, 0.25, 1] as const } },
};

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative border-t border-white/10 bg-[#050816] overflow-hidden"
    >
      {/* Animated gradient orbs */}
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
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#00FF9D]/10 rounded-full blur-[80px]"
        />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-[#00E5FF]/30 rounded-full pointer-events-none"
          style={{
            left: `${10 + i * 18}%`,
            top: `${20 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
        >
          <motion.div variants={itemVariants} className="text-center md:text-left">
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <Code2 className="w-5 h-5 text-[#00E5FF]" />
              <span className="text-white/60 text-sm font-mono">MIT License</span>
            </div>
            <p className="text-white/40 text-sm">
              &copy; {year} {portfolioData.personal_info.name}. All rights reserved.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <motion.p
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-white/60 text-sm"
            >
              Made with{" "}
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="text-red-400 inline-block"
              >
                ♥
              </motion.span>{" "}
              and{" "}
              <Sparkles className="w-3.5 h-3.5 inline-block text-yellow-400" />{" "}
              by{" "}
              <a
                href={social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00E5FF] hover:text-[#7B61FF] transition-colors duration-300 font-medium"
              >
                Nitin
              </a>
            </motion.p>
            <p className="text-white/30 text-xs mt-1">Built with Next.js · Three.js · Framer Motion</p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex items-center justify-center md:justify-end gap-3">
            {[
              { icon: GithubIcon, href: social.github, label: "GitHub" },
              { icon: LinkedinIcon, href: social.linkedin, label: "LinkedIn" },
              { icon: TwitterIcon, href: social.twitter, label: "Twitter" },
              { icon: InstagramIcon, href: social.instagram, label: "Instagram" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-2.5 text-white/40 hover:text-[#00E5FF] hover:bg-white/5 rounded-lg transition-colors duration-300 hover:drop-shadow-[0_0_8px_#00E5FF]"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-white/30 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all duration-300 text-xs"
          >
            Back to top
            <ArrowUp className="w-3 h-3" />
          </motion.button>
        </motion.div>
      </div>
    </motion.footer>
  );
}

