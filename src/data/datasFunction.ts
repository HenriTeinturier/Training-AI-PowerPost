import { requiredAuth } from "@/auth/helper";
import { prisma } from "@/prisma";
import { PostMode, Prisma } from "@prisma/client";
import { z } from "zod";

const ITEMS_PER_PAGE = 8;

const PostModeValues = Object.values(PostMode).filter(
  (value) => typeof value === "string"
);

const PostModeSchema = z.enum(PostModeValues as [PostMode, ...PostMode[]]);

const PostsFilterSchema = z.object({
  search: z.string().optional(),
  page: z
    .string()
    .transform((value) => parseInt(value, 10))
    .optional(),
  modes: z
    .string()
    .optional()
    .transform((modes) =>
      modes
        ? modes.split(",").map((mode) => {
            return PostModeSchema.parse(mode);
          })
        : []
    ),
  sort: z.enum(["asc", "desc"]).optional(),
});

export type PostsFilter = {
  search?: string;
  page?: string;
  modes?: string;
  sort?: string;
};

export async function getPosts(postsFilter: PostsFilter) {
  const user = await requiredAuth();

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const postsFilterValidated = PostsFilterSchema.parse(postsFilter);
    const excludedModes: PostMode[] = postsFilterValidated.modes;
    const sortOrder: "asc" | "desc" = postsFilterValidated.sort ?? "desc";
    const searchTerm: string = postsFilterValidated.search ?? "";
    const page = postsFilterValidated.page ?? 0;

    const whereClause: Prisma.PostWhereInput = {
      userId: user.id,
    };
    if (excludedModes.length > 0) {
      whereClause.mode = {
        notIn: excludedModes,
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
      skip: page * ITEMS_PER_PAGE,
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
    const excludedModes: PostMode[] = postsFilterValidated.modes;
    const searchTerm: string = postsFilterValidated.search ?? "";

    const whereClause: Prisma.PostWhereInput = {
      userId: user.id,
    };
    if (excludedModes.length > 0) {
      whereClause.mode = {
        notIn: excludedModes,
      };
    }
    if (searchTerm) {
      whereClause.title = {
        contains: searchTerm,
      };
    }

    const count = await prisma.post.count({
      where: whereClause,
    });

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

    return totalPages;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw error;
  }
}
