"use client";

import { useProseConfig } from "@/app/hook/Posts/useProseConfig";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const ArticleWrapper = ({ children }: PropsWithChildren) => {
  const size = useProseConfig((p) => p.size);

  return (
    <article
      className={cn("prose dark:prose-invert m-auto w-fit", {
        "prose-sm": size === "sm",
        "prose-lg": size === "lg",
        "prose-xl": size === "xl",
      })}
    >
      {children}
    </article>
  );
};
