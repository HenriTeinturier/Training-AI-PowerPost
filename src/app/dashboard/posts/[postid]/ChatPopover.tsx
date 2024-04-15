"use client";
import { MessagesType } from "@/app/api/powerpost/[postid]/chat/post-messages-schema";
import { readStream } from "@/app/api/powerpost/[postid]/chat/readStream";
import { LayoutSmall } from "@/components/features/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMutation } from "@tanstack/react-query";
import { Bot, User2, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";

export type ChatPopoverProps = {};

const ChatPopover = (props: ChatPopoverProps) => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const postId = params.postid;
  const [messages, setMessages] = useState<MessagesType>([
    {
      content: "Hello, how can I help you?",
      role: "assistant",
    },
  ]);

  const submitMutation = useMutation({
    mutationFn: async (input: string) => {
      const newMessages = [
        ...messages,
        { content: input, role: "user" },
      ] satisfies MessagesType;

      setMessages(newMessages);

      const response = await fetch(`/api/powerpost/${postId}/chat`, {
        method: "POST",
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response) {
        setMessages((prev: MessagesType) => [
          ...prev,
          {
            content: "An error occurred while sending the message.",
            role: "system",
          },
        ]);

        return;
      }

      if (!response.ok) {
        setMessages((prev: MessagesType) => [
          ...prev,
          {
            content: "An error occurred while sending the message.",
            role: "system",
          },
        ]);

        return;
      }

      const data = await response.body;

      if (!data) {
        setMessages((prev: MessagesType) => [
          ...prev,
          {
            content: "An error occurred while sending the message.",
            role: "system",
          },
        ]);
        return;
      }

      // Ajouter un message de l'assistant vide
      newMessages.push({
        content: "",
        role: "assistant",
      });

      setMessages([...newMessages]);

      // Lire le stream
      // Chunk représente le message de l'assistant
      await readStream(data, (chunk) => {
        newMessages[newMessages.length - 1].content = chunk;
        setMessages([...newMessages]);
      });
    },
  });

  return (
    <Popover open={open}>
      <PopoverTrigger asChild>
        <Button
          className="fixed bottom-4 left-4 rounded-full hover:cursor-pointer"
          variant={"secondary"}
          size="icon"
          onClick={() => setOpen(!open)}
          asChild
        >
          <Bot />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="divide-y divide-border/50 p-0 mx-4 flex flex-col relative"
        style={{ height: "min(80vh, 600px)", width: "min(80vw, 400px)" }}
      >
        <Button
          className="absolute right-2 top-2 rounded-full border-0"
          variant="ghost"
          size={"sm"}
          onClick={() => setOpen(false)}
        >
          <X size={16} />
        </Button>
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight p-3 ">
          Chat
        </h3>
        <div className="flex flex-1 flex-col gap-4 overflow-auto p-4">
          {messages.map((message, index) => (
            <div key={message.role + index} className="group relative">
              <LayoutSmall className="flex flex-1 flex-row items-center gap-2">
                {message.role === "user" ? (
                  <User2 size={12} />
                ) : (
                  <Bot size={12} />
                )}
                <ReactMarkdown className={"prose dark:prose-invert prose-sm "}>
                  {message.content}
                </ReactMarkdown>
              </LayoutSmall>
            </div>
          ))}
        </div>
        <form
          className="p-3 "
          onSubmit={(e) => {
            e.preventDefault();
            if (submitMutation.isPending) {
              return;
            }
            const formData = new FormData(e.target as HTMLFormElement);
            const input = formData.get("input") as string;

            if (!input) {
              toast.error("Please type a message");
            }

            submitMutation.mutate(input);
            e.currentTarget.reset();
          }}
        >
          <Input
            disabled={submitMutation.isPending}
            placeholder="Type a message"
            type="text"
            name="input"
          />
        </form>
      </PopoverContent>
    </Popover>
  );
};

export default ChatPopover;
