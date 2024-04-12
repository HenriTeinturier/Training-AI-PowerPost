import { PostSchema } from "@/app/dashboard/posts/new/post.schema";
import { NextResponse } from "next/server";
import { scrapPost } from "./scrap-post";

export const POST = async (req: Request) => {
  const body = await req.json();
  const data = PostSchema.parse(body);

  const { markdown, coverUrl } = await scrapPost(data.source);

  console.log("powerpost", markdown);
  console.log("cover url", coverUrl);

  return NextResponse.json(data);
};
