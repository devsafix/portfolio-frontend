import { Skeleton } from "@/components/ui/skeleton";

export default function DetailsProjectLoadingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 md:py-28 animate-pulse">
      <div className="space-y-8">
        {/* Title Skeleton */}
        <Skeleton className="h-12 w-3/4 mx-auto" />

        {/* Image Skeleton */}
        <Skeleton className="h-auto w-full aspect-video rounded-xl" />

        {/* Description Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-5/6" />
        </div>

        {/* Features/Technologies Skeleton */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-1/4" />
          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
            <Skeleton className="h-8 w-28 rounded-full" />
            <Skeleton className="h-8 w-16 rounded-full" />
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex flex-wrap gap-4 pt-4">
          <Skeleton className="h-12 w-36" />
          <Skeleton className="h-12 w-36" />
        </div>
      </div>
    </div>
  );
}
