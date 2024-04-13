import { PostSchema } from "@/app/dashboard/posts/new/post.schema";
import { requiredAuth } from "@/auth/helper";
import { NextResponse } from "next/server";
import { generatePowerpost } from "../generate-powerpost";

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
    const { markdown, values } = body;
    const data = PostSchema.parse(body);

    const powerpost = await generatePowerpost({
      markdown,
      mode: data.mode,
      language: data.language,
    });

    return NextResponse.json(powerpost);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: "An error occurred" }, { status: 400 });
  }
};
