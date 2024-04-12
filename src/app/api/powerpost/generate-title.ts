import { openai } from "@/openai";
import { PostMode } from "@prisma/client";
import { getPowerPostPrompt } from "./get-powerpost-prompt";

export const generateTitle = async ({ markdown }: { markdown: string }) => {
  const result = await openai.chat.completions.create({
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
    throw new Error("No title generated");
  }

  return title;
};
