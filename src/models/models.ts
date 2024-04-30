import { Post } from "@prisma/client";

export type PostShort = Omit<Post, "content" | "powerPost">;
