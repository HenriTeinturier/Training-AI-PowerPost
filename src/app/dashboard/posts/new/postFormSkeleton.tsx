import { Skeleton } from "@/components/ui/skeleton";

export const PostFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <Skeleton className="h-[17px] w-[47px]" />
      <Skeleton className="h-[36px] w-[896px]" />
      <div className="p-2 flex flex-col gap-2">
        <Skeleton className="h-[17px] w-[40px]" />
        <div className="w-full flex gap-2 justify-center">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-[80px] w-[80px]" />
          ))}
        </div>
        <Skeleton className="h-[17px] w-[65px]" />
        <Skeleton className="h-[36px] w-[896px]" />
        <Skeleton className="h-[36px] w-[896px]" />
      </div>
    </div>
  );
};
