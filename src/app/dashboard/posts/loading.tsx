import { PowerPostCardsSkeleton } from "./PowerPostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Layout } from "@/components/features/layout/Layout";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <Layout className="flex flex-col items-start">
      <Skeleton className="h-[40px] w-[250px]" />
      <Skeleton className="h-[30px] w-[230px]" />
      <div className="flex flex-wrap gap-4 justify-center ">
        {Array.from({ length: 8 }).map((_, index) => (
          <PowerPostCardsSkeleton key={index} />
        ))}
      </div>
    </Layout>
  );
}
