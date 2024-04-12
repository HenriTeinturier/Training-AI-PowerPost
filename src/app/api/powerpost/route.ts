import { PostSchema } from "@/app/dashboard/posts/new/post.schema";
import { NextResponse } from "next/server";
import { scrapPost } from "./scrap-post";
import { generatePowerpost } from "./generate-powerpost";
import { generateTitle } from "./generate-title";

export const POST = async (req: Request) => {
  const body = await req.json();
  const data = PostSchema.parse(body);

  const { markdown, coverUrl } = await scrapPost(data.source);

  const powerpost = await generatePowerpost({
    markdown,
    mode: data.mode,
    language: data.language,
  });

  const title = await generateTitle({
    markdown,
  });

  return NextResponse.json(data);
};
