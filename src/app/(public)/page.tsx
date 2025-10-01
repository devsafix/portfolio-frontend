import About from "@/components/module/Home/About";
import HeroSection from "@/components/module/Home/Hero";
import RecentProjects from "@/components/module/Home/RecentProjects";
import Skills from "@/components/module/Home/Skills";

export default async function HomePage() {
  return (
    <div>
      <HeroSection />
      <About />
      <Skills />
      <RecentProjects />
    </div>
  );
}
