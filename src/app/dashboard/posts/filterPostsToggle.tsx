"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PostMode } from "@prisma/client";
import { ResetIcon } from "@radix-ui/react-icons";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { z } from "zod";
import { useDebouncedCallback } from "use-debounce";

const FilterPostsToggle = () => {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const { replace } = useRouter();

  const filterPostsToggleSchema = z.object({
    mode: z.nativeEnum(PostMode).optional(),
    search: z.string().optional(),
    sort: z.enum(["asc", "desc"]),
  });
  type FilterPostsToggle = z.infer<typeof filterPostsToggleSchema>;

  const [filterPosts, setFilterPosts] = useState<FilterPostsToggle>({
    mode: searchParams.get("mode") as PostMode | undefined,
    search: searchParams.get("search") as string | undefined,
    sort: searchParams.get("sort") as FilterPostsToggle["sort"] | "desc",
  });

  const updateParams = useDebouncedCallback(
    (filterPosts: FilterPostsToggle) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "0");
      if (filterPosts.mode) {
        params.set("mode", filterPosts.mode);
      } else {
        params.delete("mode");
      }
      if (filterPosts.sort) {
        params.set("sort", filterPosts.sort);
      }
      if (filterPosts.search) {
        params.set("search", filterPosts.search);
      } else {
        params.delete("search");
      }
      replace(`${pathName}?${params.toString()}`);
    },
    300
  );

  return (
    <div className="flex justify-center">
      <div className="flex  gap-2 justify-between p-4 w-[810px]  max-[816px]:w-fit">
        <div className="flex gap-2 ">
          <Select
            key={filterPosts.mode}
            value={filterPosts.mode ?? undefined}
            onValueChange={(e) => {
              const modeValue: FilterPostsToggle["mode"] =
                e as FilterPostsToggle["mode"];
              const newFilterPost = {
                ...filterPosts,
                mode: modeValue,
              };
              setFilterPosts(newFilterPost);
              updateParams(newFilterPost);
            }}
          >
            <SelectTrigger className="w-[220px] max-[816px]:w-fit relative">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent className="relative">
              <SelectItem value="SHORT">SHORT</SelectItem>
              <SelectItem value="TWEET">TWEET</SelectItem>
              <SelectItem value="THREAD">THREAD</SelectItem>
              <SelectItem value="BULLET_POINT">BULLET_POINT</SelectItem>
              <SelectItem value="TOP3">TOP3</SelectItem>
              <SelectItem value="MAIN_POINTS">MAIN_POINTS</SelectItem>
              <SelectItem value="CODE">CODE</SelectItem>
            </SelectContent>
          </Select>
          {filterPosts.mode && (
            <Button
              variant={"outline"}
              type={"button"}
              onClick={() => {
                const newFilterPost = {
                  ...filterPosts,
                  mode: undefined,
                };
                setFilterPosts(newFilterPost);
                updateParams(newFilterPost);
              }}
              size={"icon"}
            >
              <ResetIcon className="h-4 w-4" />
            </Button>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size={"icon"}
            onClick={() => {
              const newFilterPost = {
                ...filterPosts,
                sort:
                  filterPosts.sort === "asc"
                    ? "desc"
                    : ("asc" as FilterPostsToggle["sort"]),
              };
              setFilterPosts(newFilterPost);
              updateParams(newFilterPost);
            }}
          >
            {filterPosts.sort === "asc" ? (
              <ArrowDown className="h-4 w-4 bold" />
            ) : (
              <ArrowUp className="h-4 w-4 bold" />
            )}
          </Button>
          <Input
            value={filterPosts.search}
            type={"search"}
            placeholder="Research"
            className="w-72 max-[816px]:w-fit"
            onChange={(e) => {
              const newFilterPost = {
                ...filterPosts,
                search: e.target.value !== "" ? e.target.value : undefined,
              };
              setFilterPosts(newFilterPost);
              updateParams(newFilterPost);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterPostsToggle;
