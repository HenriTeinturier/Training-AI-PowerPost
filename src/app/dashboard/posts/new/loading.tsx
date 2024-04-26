import { LayoutTitle } from "@/components/features/layout/Layout";
import { Skeleton } from "@/components/ui/skeleton";
import { PostFormSkeleton } from "./postFormSkeleton";

export default function Loading() {
  return (
    <LayoutTitle className="flex flex-col items-start gap-4">
      <Skeleton className="h-[48px] w-[250px]" />
      <Skeleton className="h-[28px] w-[230px] mt-2" />
      <PostFormSkeleton />
    </LayoutTitle>
  );
}
