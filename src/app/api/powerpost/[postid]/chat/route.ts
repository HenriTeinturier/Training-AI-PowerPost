import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { MessagesSchema, MessagesType } from "./post-messages-schema";
import { requiredAuth } from "@/auth/helper";
import { prisma } from "@/prisma";
import { openai } from "@/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { redirect } from "next/navigation";

const BodySchema = z.object({
  messages: MessagesSchema,
});

export const POST = async (
  req: NextRequest,
  { params }: { params: { postid: string } }
) => {
  const user = await requiredAuth();
  if (!user) {
    redirect("/");
  }

  const rawBody = await req.json();

  const body = BodySchema.parse(rawBody);

  const post = await prisma.post.findUnique({
    where: {
      id: params.postid,
    },
    select: {
      id: true,
      content: true,
      title: true,
      userId: true,
    },
  });

  if (!post) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }

  // const user = await requiredAuth();

  if (user.id !== post.userId) {
    redirect("/");
    return NextResponse.json(
      { error: "You are not authorized to access this resource." },
      { status: 401 }
    );
  }

  const messages: MessagesType = [];

  messages.push({
    content: `
      Context:
      Your task is to chat with the user about the post i will give you.
      The subject is about ${post.title}.
      You need to only answer the user questions about the post.

      Criteria:
      - Create short and clear messages
      - Be polite and helpful
      - if the user ask you an out of context questions, answer "i'm sorry, i can't help you with that"

      Post:
      """
      ${post.content}
      """
    `,
    role: "system",
  });

  messages.push(...body.messages.slice(-5));

  const openaiInstance = openai();

  const response = await openaiInstance.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    messages,
    stream: true,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
};
