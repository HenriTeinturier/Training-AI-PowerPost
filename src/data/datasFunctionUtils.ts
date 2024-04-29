import { PostMode } from "@prisma/client";
import { z } from "zod";

export const ITEMS_PER_PAGE = 4;

export const PostModeSchema = z.nativeEnum(PostMode);

export const PostsFilterSchema = z.object({
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

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  source: z.string().url(),
  content: z.string(),
  powerPost: z.string(),
  mode: z.nativeEnum(PostMode),
  coverUrl: z.string().url(),
  userId: z.string(),
});

export const postsArraySchema = z.array(postSchema);

export type PostsFilterSchemaType = z.infer<typeof PostsFilterSchema>;

export type PostsFilter = {
  search?: string;
  page?: string;
  mode?: string;
  sort?: string;
};
