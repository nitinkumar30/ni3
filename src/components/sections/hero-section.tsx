import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Download, Mail, Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { MagneticButton } from "@/components/animations/magnetic-button";
import { portfolioData } from "@/lib/portfolio-data";

const AvatarScene = lazy(() => import("@/components/three/avatar-scene").then((m) => ({ default: m.AvatarScene })));
const SceneContainer = lazy(() => import("@/components/three/scene-container").then((m) => ({ default: m.SceneContainer })));

const data = portfolioData.personal_info;
const about = portfolioData.about;

export function HeroSection() {
  const scrollToContact = () => {
    const el = document.getElementById("contact-me");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#00E5FF]/10 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#7B61FF]/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FF9D]/5 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <Badge variant="default" className="mb-6 animate-fade-in">
                <Sparkles className="w-3 h-3 mr-1" />
                {data.current_role}
              </Badge>

              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4">
                <span className="text-white">Hi, I&apos;m </span>
                <span className="bg-gradient-to-r from-[#00E5FF] via-[#7B61FF] to-[#00FF9D] bg-clip-text text-transparent">
                  {data.name}
                </span>
              </h1>

              <div className="text-xl sm:text-2xl lg:text-3xl text-white/80 mb-4 h-10">
                <TypingAnimation
                  words={["Python Developer", "Automation Expert", "Cyber Security Enthusiast", "Data Science Learner", "Web Developer"]}
                  className="text-white/80"
                />
              </div>

              <p className="text-base sm:text-lg text-white/50 max-w-xl mb-8 leading-relaxed">
                {data.headline}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start w-full sm:w-auto">
                <MagneticButton>
                  <a href={data.resume_url} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="group w-full sm:w-auto touch-manipulation">
                      <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                      Download Resume
                    </Button>
                  </a>
                </MagneticButton>
                <MagneticButton>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={scrollToContact}
                    className="group w-full sm:w-auto touch-manipulation"
                  >
                    <Mail className="w-4 h-4 mr-2 group-hover:animate-pulse" />
                    Contact Me
                  </Button>
                </MagneticButton>
              </div>

              <div className="flex flex-wrap gap-2 mt-8 justify-center lg:justify-start">
                {about.interests.map((interest, i) => (
                  <motion.div
                    key={interest}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                  >
                    <Badge variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            className="flex-1 flex justify-center items-center"
          >
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <Suspense fallback={null}>
                <SceneContainer className="w-full h-full">
                  <AvatarScene />
                </SceneContainer>
              </Suspense>
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00E5FF]/10 via-[#7B61FF]/5 to-transparent blur-3xl pointer-events-none" />
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/30"
        >
          <span className="text-xs">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
