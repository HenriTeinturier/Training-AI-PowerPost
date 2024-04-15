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
import {
  ArrowDown,
  Bot,
  Check,
  Copy,
  Square,
  Trash2,
  Trash2Icon,
  User2,
  X,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { Loader } from "@/components/ui/loader";

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
  const [isAutoScrollEnabled, setIsAutoScrollEnabled] = useState(true);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const chatAbortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!isAutoScrollEnabled || !messagesContainerRef.current) {
      return;
    }

    messagesContainerRef.current.scrollTop =
      messagesContainerRef.current.scrollHeight;
  }, [messages, isAutoScrollEnabled]);

  const submitMutation = useMutation({
    mutationFn: async (input: string) => {
      const newMessages = [
        ...messages,
        { content: input, role: "user" },
      ] satisfies MessagesType;

      setMessages(newMessages);

      const abortController = new AbortController();
      const response = await fetch(`/api/powerpost/${postId}/chat`, {
        method: "POST",
        body: JSON.stringify({
          messages: newMessages,
        }),
        signal: abortController.signal,
      });

      chatAbortControllerRef.current = abortController;

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
        <div
          className="flex flex-1 flex-col gap-4 overflow-auto p-4"
          ref={messagesContainerRef}
          onWheel={(e) => {
            if (!e.isTrusted || e.deltaY === 0) {
              return;
            }
            setIsAutoScrollEnabled(false);
          }}
        >
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
                <div className="absolute group-hover:flex  right-1 top-0 flex-col gap-1 hidden">
                  <CopyButton markdown={message.content} />
                </div>
              </LayoutSmall>
            </div>
          ))}
          {submitMutation.isPending &&
            messages[messages.length - 1].role === "user" && <Loader />}
        </div>
        <form
          className="p-3 relative"
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
          <div className="absolute inset-x-0 bottom-16 flex items-start px-4">
            {!isAutoScrollEnabled && (
              <Button
                type="button"
                className="size-6 p-0"
                variant="ghost"
                onClick={() => {
                  setIsAutoScrollEnabled(true);
                }}
              >
                <ArrowDown size={12} />
              </Button>
            )}
            {submitMutation.isPending && (
              <Button
                type="button"
                className="size-6 p-0"
                variant="ghost"
                onClick={() => {
                  chatAbortControllerRef.current?.abort();
                }}
              >
                <Square size={12} />
              </Button>
            )}
            {messages.length > 1 && (
              <Button
                type="button"
                className="size-6 p-0"
                variant="ghost"
                onClick={() => {
                  setMessages([
                    {
                      content: "Hello, how can I help you?",
                      role: "assistant",
                    },
                  ]);
                }}
              >
                <Trash2Icon size={12} />
              </Button>
            )}
          </div>
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

const CopyButton = ({ markdown }: { markdown: string }) => {
  const [copied, setCopied] = useState(false);

  return (
    <Button
      type="button"
      className="size-6 p-0"
      variant="ghost"
      onClick={() => {
        navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      }}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </Button>
  );
};
