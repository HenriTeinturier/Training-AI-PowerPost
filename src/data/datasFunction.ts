"use server";
import { getServerUrl } from "@/getServerUrl";
import { Post, PostMode } from "@prisma/client";
import { headers } from "next/headers";
import { PostsFilter } from "./datasFunctionUtils";
import { prisma } from "@/prisma";

export async function getPosts(
  searchParams: PostsFilter
): Promise<{ posts: Post[]; count: number }> {
  "use server";
  const postsResponse = await fetch(
    `${getServerUrl()}/api/posts?${new URLSearchParams(searchParams)}`,
    {
      headers: new Headers(headers()),
      next: { tags: ["post"] },
    }
  );

  if (!postsResponse.ok) {
    const error = await postsResponse.json();
    throw new Error(`${postsResponse.status}: ${error.error}`);
  } else {
    const { posts, count }: { posts: Post[]; count: number } =
      await postsResponse.json();

    return { posts: posts, count: count };
  }
}

export async function getModesCount(): Promise<
  { name: string; total: number }[]
> {
  "use server";
  try {
    const modes = await prisma.post.groupBy({
      by: ["mode"],
      _count: {
        mode: true,
      },
    });

    const postModeStats: { name: string; total: number }[] = Object.values(
      PostMode
    ).map((mode) => ({
      name: mode,
      total: modes.find((e) => e.mode === mode)?._count?.mode || 0,
    }));

    return postModeStats;
  } catch {
    // return null;
    throw new Error("Error in getModesCount");
  }
}
