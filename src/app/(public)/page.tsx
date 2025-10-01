import About from "@/components/module/Home/About";
import BestProjects from "@/components/module/Home/BestProjects";
import Faq from "@/components/module/Home/Faq";
import HeroSection from "@/components/module/Home/Hero";
import RecentBlogs from "@/components/module/Home/RecentBlogs";
import Skills from "@/components/module/Home/Skills";

export default async function HomePage() {
  return (
    <div>
      <HeroSection />
      <About />
      <Skills />
      <BestProjects />
      <RecentBlogs />
      <Faq />
    </div>
  );
}
