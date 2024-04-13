import { PostSchema } from "@/app/dashboard/posts/new/post.schema";
import { NextResponse } from "next/server";
import { scrapPost } from "./scrap-post";
import { generatePowerpost } from "./generate-powerpost";
import { generateTitle } from "./generate-title";
import { auth, requiredAuth } from "@/auth/helper";
import { prisma } from "@/prisma";

export const POST = async (req: Request) => {
  const user = await requiredAuth();

  if (!user) {
    return NextResponse.json(
      { error: "You must be authenticated to access this resource." },
      { status: 401 }
    );
  }

  try {
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

    const finalPost = await prisma.post.create({
      data: {
        title,
        content: markdown,
        powerPost: powerpost,
        source: data.source,
        coverUrl,
        id:
          title.replaceAll(" ", "-").toLowerCase() +
          "-" +
          Math.random().toString(36).substring(7),
        userId: user.id,
      },
    });

    return NextResponse.json(finalPost);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: "An error occurred" }, { status: 400 });
  }
};
