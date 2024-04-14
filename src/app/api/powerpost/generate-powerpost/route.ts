import { PostSchema } from "@/app/dashboard/posts/new/post.schema";
import { requiredAuth } from "@/auth/helper";
import { NextResponse } from "next/server";
import { getPowerPostPrompt } from "./get-powerpost-prompt";
import { openai } from "@/openai";

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
    const data = PostSchema.parse(values);

    const systemContent = getPowerPostPrompt({
      language: data.language,
      mode: data.mode,
    });
    const openaiInstance = openai();

    if (!openaiInstance) {
      throw new Error("No OpenAI key found");
    }

    const result = await openaiInstance.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: systemContent,
        },
        {
          role: "user",
          content: markdown,
        },
      ],
    });

    const powerpost = result.choices[0].message.content;

    if (!powerpost) {
      return NextResponse.json({ error: "no post generated" }, { status: 400 });
    }

    return NextResponse.json(powerpost);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: "An error occurred" }, { status: 400 });
  }
};
