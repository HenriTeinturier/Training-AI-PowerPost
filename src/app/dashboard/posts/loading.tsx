import { Loader } from "@/components/ui/loader";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="w-full h-1/2 text-slate-300 dark:text-gray-500 flex items-center justify-center ">
      <Loader size={40} />
    </div>
  );
}
