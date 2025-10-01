import ComponentHeader from "@/components/shared/ComponentHeader";

export default async function RecentBlogs() {
  return (
    <div className="py-10 md:py-16" id="blogs">
      <ComponentHeader title="Recent Blogs" subTitle="" />
      <div className="mt-10 max-w-6xl mx-auto px-4"></div>
    </div>
  );
}
