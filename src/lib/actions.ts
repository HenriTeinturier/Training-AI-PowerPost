"use server";

import { prisma } from "@/prisma";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

export const revalidatePosts = async () => {
  "use server";
  revalidateTag("posts");
};

export const deletePost = async (postId: string) => {
  "use server";

  try {
    const post = await prisma.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (e) {
    console.error("Error deleting post", e);
  }

  revalidatePosts();
  redirect("/dashboard/posts");
};
