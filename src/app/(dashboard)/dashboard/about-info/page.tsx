import { TAbout } from "@/types";
import AboutForm from "@/components/module/Dashboard/AboutForm";
import { cookies } from "next/headers";

// Fetcher function to get the current about data
async function getAboutData(): Promise<TAbout | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessTokenPortfolio");
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/about`, {
      headers: { Cookie: `accessTokenPortfolio=${token?.value}` },
      cache: "no-store",
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Failed to fetch about data:", error);
    return null;
  }
}

export default async function AboutInfoPage() {
  const aboutData = await getAboutData();

  return (
    <div>
      <AboutForm aboutData={aboutData} />
    </div>
  );
}
