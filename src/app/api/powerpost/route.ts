import { NextResponse } from "next/server";
import { requiredAuth } from "@/auth/helper";
import { prisma } from "@/prisma";

export const POST = async (req: Request) => {
  const user = await requiredAuth();

  const getId = (title: string) => {
    const cleanTitle = title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9]/g, "-")
      .toLowerCase();
    return cleanTitle + Math.random().toString(36).substring(7);
  };

  if (!user) {
    return NextResponse.json(
      { error: "You must be authenticated to access this resource." },
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    // const data = PostSchema.parse(body);
    const { markdown, powerpost, source, coverUrl, title } = body;

    const finalPost = await prisma.post.create({
      data: {
        title,
        content: markdown,
        powerPost: powerpost,
        source: source,
        coverUrl,
        id: getId(title),
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
