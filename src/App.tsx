import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import ProjectsSection from "./components/ProjectsSection";
import LearningProjectsSection from "./components/LearningProjectsSection";
import SkillsSection from "./components/SkillsSection";
import AchievementsSection from "./components/AchievementsSection";
import ContactSection from "./components/ContactSection";
import { useLenis } from "./hooks/useLenis";

export default function App() {
  // Initialise Lenis smooth scroll for the entire page
  useLenis();

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#0C0C0C", overflowX: "clip" }}>
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
      <LearningProjectsSection />
      <SkillsSection />
      <AchievementsSection />
      <ContactSection />
    </div>
  );
}
