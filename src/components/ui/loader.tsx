import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";
import { Loader2 } from "lucide-react";

export const Loader = ({ className, size, ...props }: LucideProps) => {
  return (
    <Loader2 size={size} {...props} className={cn(className, "animate-spin")} />
  );
};
