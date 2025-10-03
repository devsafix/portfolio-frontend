import AboutSection from "@/components/module/Home/AboutSection";
import BestProjects from "@/components/module/Home/BestProjects";
import Contact from "@/components/module/Home/Contact";
import Faq from "@/components/module/Home/Faq";
import HeroSection from "@/components/module/Home/HeroSection";
import RecentBlogs from "@/components/module/Home/RecentBlogs";
import Skills from "@/components/module/Home/Skills";

export default async function HomePage() {
  return (
    <div>
      <HeroSection />
      <AboutSection />
      <Skills />
      <BestProjects />
      <RecentBlogs />
      <Faq />
      <Contact />
    </div>
  );
}
