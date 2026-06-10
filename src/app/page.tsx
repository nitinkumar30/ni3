"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { GitHubSection } from "@/components/sections/github-section";
import { AILabSection } from "@/components/sections/ai-lab-section";
import { BlogSection } from "@/components/sections/blog-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { RecommendationsSection } from "@/components/sections/recommendations-section";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { ProjectsCarouselSection } from "@/components/sections/projects-carousel-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { KonamiEasterEgg } from "@/components/easter-egg";
import { CoinToss } from "@/components/coin-toss";
import { ScrollToTop } from "@/components/scroll-to-top";

const Scene3D = dynamic(() => import("@/components/three/Scene3D").then((m) => ({ default: m.Scene3D })), {
  ssr: false,
});

const PlaygroundSection = dynamic(
  () => import("@/components/sections/playground-section").then((m) => ({ default: m.PlaygroundSection })),
  { ssr: false }
);

export default function Home() {
  return (
    <>
      <Scene3D />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <PlaygroundSection />
        <AboutSection />
        <ExperienceSection />
        <EducationSection />
        <SkillsSection />
        <CertificationsSection />
        <ProjectsSection />
        <GitHubSection />
        <AILabSection />
        <BlogSection />
        <TestimonialsSection />
        <RecommendationsSection />
        <AchievementsSection />
        <ProjectsCarouselSection />
        <ContactSection />
      </main>
      <Footer />
      <ThemeSwitcher />
      <CustomCursor />
      <KonamiEasterEgg />
      <CoinToss />
      <ScrollToTop />
    </>
  );
}
