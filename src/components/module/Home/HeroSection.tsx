import { TAbout } from "@/types";
import Hero from "./Hero";

// 1. Create a dedicated data fetching function
async function getAboutData(): Promise<TAbout | null> {
  try {
    // This fetch is cached and revalidated for performance (ISR)
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/about`, {
      next: {
        revalidate: 604800,
        tags: ["about"],
      },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch about data:", error);
    return null;
  }
}

export default async function HeroSection() {
  // 3. Fetch the data on the server
  const aboutData = await getAboutData();

  // 4. Pass the fetched data to the client component
  return <Hero aboutData={aboutData} />;
}
