import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DashboardLoadingPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Welcome Message Skeleton */}
      <div>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-5 w-80" />
      </div>

      {/* Stat Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="p-3 bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-10" />
            <Skeleton className="h-4 w-32 mt-1" />
          </CardContent>
        </Card>
        <Card className="p-3 bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-10" />
            <Skeleton className="h-4 w-32 mt-1" />
          </CardContent>
        </Card>
        <Card className="p-3 bg-card/40">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-10" />
            <Skeleton className="h-4 w-32 mt-1" />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-3 bg-card/40">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56 mt-2" />
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-36" />
          </CardContent>
        </Card>
        <Card className="p-3 bg-card/40">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-56 mt-2" />
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-36" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
