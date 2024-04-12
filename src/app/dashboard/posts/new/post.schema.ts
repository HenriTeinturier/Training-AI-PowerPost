import { PostMode } from "@prisma/client";
import { z } from "zod";
import { LANGUAGES } from "./post.const";

export const PostSchema = z.object({
  source: z.string().url(),
  mode: z.nativeEnum(PostMode),
  // language: z.nativeEnum(LANGUAGES),
  language: z.string().default("English"),
});

export type PostSchema = z.infer<typeof PostSchema>;
