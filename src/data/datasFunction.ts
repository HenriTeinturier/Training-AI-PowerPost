import { requiredAuth } from "@/auth/helper";
import { prisma } from "@/prisma";
import { PostMode, Prisma, User } from "@prisma/client";
import { z } from "zod";

export const ITEMS_PER_PAGE = 4;

const PostModeSchema = z.nativeEnum(PostMode);

const PostsFilterSchema = z.object({
  search: z.string().optional(),
  page: z
    .string()
    .transform((value) => parseInt(value, 10))
    .optional(),
  mode: z
    .string()
    .optional()
    .transform((mode) =>
      mode
        ? mode.split(",").map((mode) => {
            return PostModeSchema.parse(mode);
          })
        : []
    ),
  sort: z.enum(["asc", "desc"]).optional(),
});

export type PostsFilter = {
  search?: string;
  page?: string;
  mode?: string;
  sort?: string;
};

export async function getPosts(postsFilter: PostsFilter) {
  const user: User | null = await requiredAuth();

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const postsFilterValidated = PostsFilterSchema.parse(postsFilter);
    const selectedMode: PostMode[] = postsFilterValidated.mode;
    const sortOrder: "asc" | "desc" = postsFilterValidated.sort ?? "desc";
    const searchTerm: string = postsFilterValidated.search ?? "";
    const page = postsFilterValidated.page ?? 1;

    const offset = page - 1 < 1 ? 0 : page - 1;

    const whereClause: Prisma.PostWhereInput = {
      userId: user.id,
    };

    if (selectedMode.length > 0) {
      whereClause.mode = {
        in: selectedMode,
      };
    }
    if (searchTerm) {
      whereClause.title = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const posts = await prisma.post.findMany({
      where: whereClause,
      orderBy: {
        createdAt: sortOrder,
      },
      take: ITEMS_PER_PAGE,
      skip: offset * ITEMS_PER_PAGE,
    });

    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
}

export async function getPostsPages(postsFilter: PostsFilter) {
  const user = await requiredAuth();

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const postsFilterValidated = PostsFilterSchema.parse(postsFilter);
    const selectedMode: PostMode[] = postsFilterValidated.mode;
    const searchTerm: string = postsFilterValidated.search ?? "";

    const whereClause: Prisma.PostWhereInput = {
      userId: user.id,
    };
    if (selectedMode.length > 0) {
      whereClause.mode = {
        in: selectedMode,
      };
    }
    if (searchTerm) {
      whereClause.title = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }

    const count = await prisma.post.count({
      where: whereClause,
    });
    console.log("count", count);

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    console.log("totalPage in datafunctions", totalPages);
    return totalPages;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
}
