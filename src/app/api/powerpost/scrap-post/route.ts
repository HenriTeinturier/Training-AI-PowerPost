import { PostSchema } from "@/app/dashboard/posts/new/post.schema";
import { requiredAuth } from "@/auth/helper";
import { NextResponse } from "next/server";
import { scrapPost } from "./scrap-post";
import { redirect } from "next/navigation";

export const POST = async (req: Request) => {
  const user = await requiredAuth();

  if (!user) {
    redirect("/");
    return NextResponse.json(
      { error: "You must be authenticated to access this resource." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const values = PostSchema.parse(body);

    const { markdown, coverUrl } = await scrapPost(values.source);

    return NextResponse.json({ markdown, coverUrl });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: "An error occurred" }, { status: 400 });
  }
};
