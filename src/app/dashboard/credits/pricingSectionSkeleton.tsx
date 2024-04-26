import { Skeleton } from "@/components/ui/skeleton";

export const PricingSectionSkeleton = () => {
  return (
    <div className="flex max-lg:flex-col gap-10 mt-4 items-center justify-center w-full">
      <Skeleton className="h-[428px] w-[428px]" />
      <Skeleton className="h-[428px] w-[428px]" />
    </div>
  );
};
