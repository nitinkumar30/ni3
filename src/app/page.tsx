"use client";

import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { GitHubSection } from "@/components/sections/github-section";
import { AILabSection } from "@/components/sections/ai-lab-section";
import { BlogSection } from "@/components/sections/blog-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { RecommendationsSection } from "@/components/sections/recommendations-section";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { ExploreSection } from "@/components/sections/explore-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/custom-cursor";
import { KonamiEasterEgg } from "@/components/easter-egg";
import { ThemeSwitcher } from "@/components/theme-switcher";

const Scene3D = dynamic(() => import("@/components/three/Scene3D").then((m) => ({ default: m.Scene3D })), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      <Scene3D />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <CertificationsSection />
        <FeaturedProjectsSection />
        <ProjectsSection />
        <GitHubSection />
        <AILabSection />
        <BlogSection />
        <TestimonialsSection />
        <RecommendationsSection />
        <AchievementsSection />
        <ExploreSection />
        <ContactSection />
      </main>
      <Footer />
      <ThemeSwitcher />
      <CustomCursor />
      <KonamiEasterEgg />
    </>
  );
}
