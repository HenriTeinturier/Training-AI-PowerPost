import { PostSchema } from "@/app/dashboard/posts/new/post.schema";
import { requiredAuth } from "@/auth/helper";
import { NextResponse } from "next/server";
import { generatePowerpost } from "../generate-powerpost";
import { generateTitle } from "../generate-title";
import { scrapPost } from "../scrap-post";

export const POST = async (req: Request) => {
  const user = await requiredAuth();
  console.log("user", user);

  if (!user) {
    return NextResponse.json(
      { error: "You must be authenticated to access this resource." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const values = PostSchema.parse(body);
    console.log("values in post route scrap post", values);

    const { markdown, coverUrl } = await scrapPost(values.source);

    return NextResponse.json({ markdown, coverUrl });
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: "An error occurred" }, { status: 400 });
  }
};
