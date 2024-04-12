import { PostSchema } from "@/app/dashboard/posts/new/post.schema";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const body = await req.json();
  const data = PostSchema.parse(body);

  return NextResponse.json(data);
};
