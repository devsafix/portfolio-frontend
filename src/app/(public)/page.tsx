import About from "@/components/module/Home/About";
import BestProjects from "@/components/module/Home/BestProjects";
import HeroSection from "@/components/module/Home/Hero";
import Skills from "@/components/module/Home/Skills";

export default async function HomePage() {
  return (
    <div>
      <HeroSection />
      <About />
      <Skills />
      <BestProjects />
    </div>
  );
}
