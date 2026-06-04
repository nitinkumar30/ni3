
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/lib/portfolio-data";

const navItems = portfolioData.website_metadata.navigation;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (section: string) => {
    setIsOpen(false);
    const id = section.toLowerCase().replace(/\s+/g, "-");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-[#050816]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => scrollTo("Home")}
            className="flex items-center gap-2 group"
          >
            <Code2 className="w-8 h-8 text-[#00E5FF] transition-all duration-300 group-hover:drop-shadow-[0_0_8px_#00E5FF]" />
            <span className="text-lg font-bold bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] bg-clip-text text-transparent">
              NK
            </span>
          </button>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item, i) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className="relative px-4 py-2 text-sm text-white/60 hover:text-white transition-colors duration-300 group"
              >
                {item}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#00E5FF] to-[#7B61FF] transition-all duration-300 group-hover:w-3/4" />
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-white hover:text-[#00E5FF] transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#050816]/95 backdrop-blur-xl border-b border-white/10"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item, i) => (
                <motion.button
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => scrollTo(item)}
                  className="block w-full text-left px-4 py-3 text-white/70 hover:text-[#00E5FF] hover:bg-white/5 rounded-lg transition-all"
                >
                  {item}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

