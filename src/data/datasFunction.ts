"use server";
import { requiredAuth } from "@/auth/helper";
import { getServerUrl } from "@/getServerUrl";
import { revalidatePosts } from "@/lib/actions";
import { Post, PostMode, User } from "@prisma/client";
import { revalidatePath, revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { z } from "zod";
import { PostsFilter } from "./datasFunctionUtils";

export async function getPosts(
  searchParams: PostsFilter
): Promise<{ posts: Post[]; count: number }> {
  const user: User | null = await requiredAuth();

  if (!user) {
    throw new Error("User not found");
  }

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
