import { create } from "zustand";
import { persist } from "zustand/middleware";

type PostConfigStore = {
  size: "sm" | "default" | "lg" | "xl";
  setConfig: (config: Partial<PostConfigStore>) => void;
};

export const useProseConfig = create(
  persist<PostConfigStore>(
    (set) => ({
      size: "default",
      setConfig: (config) => set(config),
    }),
    {
      name: "mdx-prose-config",
    }
  )
);
