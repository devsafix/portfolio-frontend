import { Skeleton } from "@/components/ui/skeleton";

export default function BlogDetailsLoadingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 md:py-28 animate-pulse">
      <div className="space-y-8">
        {/* Back Button Skeleton */}
        <Skeleton className="h-6 w-32" />

        {/* Image Skeleton */}
        <Skeleton className="h-auto w-full aspect-video rounded-xl" />

        {/* Title and Meta Skeleton */}
        <div className="space-y-4 text-center">
          <Skeleton className="h-6 w-48 mx-auto" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-10 w-3/4 mx-auto" />
          <div className="flex justify-center gap-2 pt-2">
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
        </div>

        {/* Content Skeleton */}
        <div className="space-y-4 pt-4">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-1/2" />
        </div>
      </div>
    </div>
  );
}
