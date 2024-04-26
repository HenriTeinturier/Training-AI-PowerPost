import { LayoutTitle } from "@/components/features/layout/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { PricingSectionSkeleton } from "./pricingSectionSkeleton";

export default function Loading() {
  return (
    <LayoutTitle className="flex flex-col items-start gap-4 w-full">
      <Skeleton className="h-[48px] w-[250px]" />
      <Skeleton className="h-[28px] w-[230px] mt-2" />
      <PricingSectionSkeleton />
    </LayoutTitle>
  );
}
