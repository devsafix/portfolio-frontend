import ComponentHeader from "@/components/shared/ComponentHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "",
  description: "",
};

const AllBlogsPage = async () => {
  return (
    <div className="py-20 md:py-28">
      <ComponentHeader title="" subTitle="" />
      <div className="mt-10 max-w-6xl mx-auto px-4"></div>
    </div>
  );
};

export default AllBlogsPage;
