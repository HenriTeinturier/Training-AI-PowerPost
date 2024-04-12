import { openai } from "@/openai";
import { PostMode } from "@prisma/client";
import { getPowerPostPrompt } from "./get-powerpost-prompt";

export const generatePowerpost = async ({
  markdown,
  mode,
  language,
}: {
  markdown: string;
  mode: PostMode;
  language: string;
}) => {
  const result = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-0125",
    messages: [
      {
        role: "system",
        content: getPowerPostPrompt({ language, mode }),
      },
      {
        role: "user",
        content: markdown,
      },
    ],
  });

  const post = result.choices[0].message.content;

  if (!post) {
    throw new Error("No post generated");
  }

  return post;
};
