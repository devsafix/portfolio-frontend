import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function AboutInfoLoadingPage() {
  return (
    <Card className="bg-card/40">
      <CardHeader>
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-5 w-96 mt-2" />
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-20 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-24 w-full" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Skeleton className="h-10 w-32" />
      </CardFooter>
    </Card>
  );
}
