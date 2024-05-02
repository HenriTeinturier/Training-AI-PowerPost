import { Skeleton } from "@/components/ui/skeleton";
import { Layout } from "@/components/features/layout/Layout";

export default function Loading() {
  return (
    <Layout className="flex flex-col items-start w-full">
      <Skeleton className="h-96 w-full rounded-md mb-4" />
      <Skeleton className="h-[30px] w-full mb-4" />
      <div className="w-full flex justify-center">
        <div className="flex flex-col gap-8 w-full md:w-4/5">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="flex flex-col  w-full ">
              <Skeleton className="h-16 w-full mb-4 " />
              <Skeleton className="h-24 w-full mb-2" />
              <Skeleton className="h-24 w-full mb-2" />
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
