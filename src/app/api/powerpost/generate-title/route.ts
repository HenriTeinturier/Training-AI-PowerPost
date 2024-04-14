import { requiredAuth } from "@/auth/helper";
import { NextResponse } from "next/server";
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
    const { markdown } = body;
    const openaiInstance = openai();
    if (!openaiInstance) {
      throw new Error("No OpenAI key found");
    }
    const result = await openaiInstance.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
        {
          role: "system",
          content: `find the title of this article and return it.
          If you find a title, return it whitout any transformation.
          You receive a markdown text and you need to return the title of the article.
          Generally, the title is the first line of the article and or with # at the beginning of the line.
          `,
        },
        {
          role: "user",
          content: markdown,
        },
      ],
    });
    const title = result.choices[0].message.content;

    if (!title) {
      return NextResponse.json(
        { error: "No title generated" },
        { status: 400 }
      );
    }

    return NextResponse.json(title);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    return NextResponse.json({ error: "An error occurred" }, { status: 400 });
  }
};
