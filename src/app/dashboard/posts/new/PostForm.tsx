"use client";
import { z } from "zod";
import { PostSchema } from "./post.schema";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LANGUAGES, PostModeDataMap } from "./post.const";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { PostMode } from "@prisma/client";
import { Button } from "@/components/ui/button";

export type PostFormProps = {
  defaultSource?: string;
};

const PostForm = (props: PostFormProps) => {
  function onSubmit(values: z.infer<typeof PostSchema>) {
    postMutation.mutate(values);
  }

  const postMutation = useMutation({
    mutationFn: async (values: PostSchema) => {
      const result = await fetch("/api/powerpost", {
        method: "POST",
        body: JSON.stringify(values),
      });

      const json = await result.json();

      return json;
    },
  });

  const form = useForm<z.infer<typeof PostSchema>>({
    defaultValues: {
      source: props.defaultSource,
      mode: "SHORT",
      language: "English",
    },
    resolver: zodResolver(PostSchema),
  });

  return (
    <Form {...form} disabled={postMutation.isPending}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="source"
          render={({ field }) => (
            <FormItem className="">
              <FormLabel>Source</FormLabel>
              <FormControl>
                <Input placeholder="https://medium.com/..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => (
            <FormItem className="flex flex-col gap-2 border border-border p-2">
              <FormLabel>Mode</FormLabel>
              <FormControl>
                <ToggleGroup
                  className="flex flex-wrap gap-2"
                  type="single"
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  {Object.entries(PostMode).map(([key, value]) => {
                    const data = PostModeDataMap[key as PostMode];
                    return (
                      <ToggleGroupItem
                        key={key}
                        value={key}
                        className="flex flex-col gap-2 h-auto p-4"
                      >
                        {<data.icon size={24} />}
                        {<span>{value}</span>}
                      </ToggleGroupItem>
                    );
                  })}
                </ToggleGroup>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Language</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(LANGUAGES).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value} {key}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {postMutation.isPending ? "Creating ..." : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default PostForm;
