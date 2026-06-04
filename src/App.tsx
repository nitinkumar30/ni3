import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect, useState } from "react";
import { ParticleField } from "@/components/animations/particle-field";
import { GradientBg } from "@/components/animations/gradient-bg";
import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { ContactSection } from "@/components/sections/contact-section";
import { Footer } from "@/components/layout/footer";
import { JsonLd } from "@/components/json-ld";

const Scene3D = lazy(() => import("@/components/three/Scene3D").then((m) => ({ default: m.Scene3D })));

function useWebGLSupport() {
  const [supported, setSupported] = useState<boolean | null>(null);
  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      const gl = c.getContext("webgl2") || c.getContext("webgl");
      setSupported(!!gl);
    } catch {
      setSupported(false);
    }
  }, []);
  return supported;
}

function SceneLayer() {
  const webgl = useWebGLSupport();

  if (webgl === null) return <ParticleField />;

  return (
    <Suspense fallback={<ParticleField />}>
      {webgl ? <Scene3D /> : <ParticleField />}
    </Suspense>
  );
}

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SceneLayer />
      <GradientBg />
      <Navbar />
      <main id="main-content">
        <HeroSection />
        <AboutSection />
        <EducationSection />
        <ExperienceSection />
        <SkillsSection />
        <FeaturedProjectsSection />
        <ProjectsSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <JsonLd />
    </QueryClientProvider>
  );
}
