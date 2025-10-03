import { TAbout } from "@/types";
import About from "./About";

// Data fetching function with SSG + ISR
async function getAboutData(): Promise<TAbout | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/about`, {
      next: {
        revalidate: 604800, // Revalidate once a week
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

// The main export is now an async Server Component
export default async function AboutSection() {
  // Fetch data on the server
  const aboutData = await getAboutData();

  // Render the Client Component, passing the fetched data as a prop
  return <About aboutData={aboutData} />;
}
