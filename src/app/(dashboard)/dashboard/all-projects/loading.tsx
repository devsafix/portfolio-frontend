import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function AllProjectsDashboardLoadingPage() {
  return (
    <Card className="bg-card/40">
      <CardHeader>
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-5 w-80" />
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Skeleton className="h-10 w-44" />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Skeleton className="h-5 w-24" />
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <Skeleton className="h-5 w-32" />
                </TableHead>
                <TableHead className="hidden lg:table-cell">
                  <Skeleton className="h-5 w-28" />
                </TableHead>
                <TableHead className="text-right">
                  <Skeleton className="h-5 w-16 ml-auto" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Create 5 skeleton rows */}
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-5 w-40" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-5 w-48" />
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <Skeleton className="h-5 w-24" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
