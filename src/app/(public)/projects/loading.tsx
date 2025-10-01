import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectsLoadingPage() {
  return (
    <div className="py-20 md:py-28">
      {/* Header Skeleton */}
      <div className="max-w-4xl mx-auto px-4 text-center">
        <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-1/2 mx-auto" />
      </div>

      <div className="mt-10 max-w-6xl mx-auto px-4">
        {/* Tabs Skeleton */}
        <div className="flex justify-center mb-8">
          <div className="flex flex-wrap gap-4">
            <Skeleton className="h-12 w-20 rounded-full" />
            <Skeleton className="h-12 w-28 rounded-full" />
            <Skeleton className="h-12 w-24 rounded-full" />
            <Skeleton className="h-12 w-28 rounded-full" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="h-[250px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
