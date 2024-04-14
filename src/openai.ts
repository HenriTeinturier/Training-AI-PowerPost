import OpenAI from "openai";

export const openai = (): OpenAI => {
  const openAiKey = process.env.OPENAI_API_KEY;

  if (!openAiKey) {
    throw new Error("No OpenAI key found");
  }

  const openaiInstance = new OpenAI({
    apiKey: openAiKey,
  });

  return openaiInstance;
};
