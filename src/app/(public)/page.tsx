import About from "@/components/module/Home/About";
import HeroSection from "@/components/module/Home/Hero";

export default async function HomePage() {
  return (
    <div>
      <HeroSection />
      <About />
    </div>
  );
}
