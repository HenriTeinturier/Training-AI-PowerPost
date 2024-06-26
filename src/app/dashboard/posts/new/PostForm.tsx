"use client";
import { z } from "zod";
import { PostSchema } from "./post.schema";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
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
import { PostMode, User } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { PostFormLoader } from "./PostFormLoader";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import usePostCreationStatus, {
  StageName,
} from "@/app/hook/Posts/usePostCreationStatus";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import Link from "next/link";
import { revalidatePosts } from "@/lib/actions";
import StripeDescription from "../../(dashboard)/stripeDescription";

export type PostFormProps = {
  defaultSource?: string;
  user: User;
};

const PostForm = (props: PostFormProps) => {
  const { startLoading, finishLoading, reset } = usePostCreationStatus();
  const { user } = props;
  const router = useRouter();
  function onSubmit(values: z.infer<typeof PostSchema>) {
    postMutation.mutate(values);
  }

  const postMutation = useMutation({
    mutationFn: async (values: PostSchema) => {
      reset();
      if (!user) {
        throw new Error("You must be authenticated to access this resource.");
      }
      startLoading(StageName.Fetching);
      startLoading(StageName.GeneratingCover);
      const scrapPostResponse = await fetch("/api/powerpost/scrap-post", {
        method: "POST",
        body: JSON.stringify(values),
      });
      const { markdown, coverUrl } = await scrapPostResponse.json();
      finishLoading(StageName.Fetching);
      finishLoading(StageName.GeneratingCover);

      startLoading(StageName.CreatingPost);
      const generatePowerpostResponse = await fetch(
        "/api/powerpost/generate-powerpost",
        {
          method: "POST",
          body: JSON.stringify({
            markdown,
            values,
          }),
        }
      );
      const powerpost: string = await generatePowerpostResponse.json();
      finishLoading(StageName.CreatingPost);

      startLoading(StageName.FindingTitle);
      const generateTitleResponse = await fetch(
        "/api/powerpost/generate-title",
        {
          method: "POST",
          body: JSON.stringify({
            markdown,
          }),
        }
      );
      const title: string = await generateTitleResponse.json();
      finishLoading(StageName.FindingTitle);

      startLoading(StageName.PublishingPost);
      const result = await fetch("/api/powerpost", {
        method: "POST",
        body: JSON.stringify({
          markdown,
          powerpost,
          mode: values.mode,
          source: values.source,
          title,
          coverUrl,
        }),
      });

      finishLoading(StageName.PublishingPost);

      const json = await result.json();
      if (!result.ok) {
        throw new Error(json.error);
      }

      return json;
    },
    onSuccess: async (powerpost) => {
      await revalidatePosts();
      // router.push(`/dashboard/posts`);
      router.push(`/dashboard/posts/${powerpost.id}`);
    },
    onError: (error) => {
      toast.error(error.message);
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

  if (user.credits <= 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Not enough credits</CardTitle>
          <CardDescription>
            You need to have at least one credit to create a PowerPost
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/dashboard/credits">Buy credits</Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      {postMutation.isPending && <PostFormLoader />}
      {/* <PostFormLoader /> */}
      {postMutation.isSuccess && <div>Post created successfully</div>}
      <Card>
        <CardHeader>
          <CardDescription>
            You have{" "}
            <span className="text-primary bold">{user?.credits} credits</span>{" "}
            left
          </CardDescription>
        </CardHeader>
      </Card>
      <Form {...form}>
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
                  <Input
                    placeholder="https://medium.com/..."
                    {...field}
                    disabled={postMutation.isPending}
                  />
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
                          disabled={postMutation.isPending}
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={postMutation.isPending}
                >
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
          {postMutation.isError && (
            <Alert>
              <AlertTriangle size={24} />
              <AlertTitle>
                {postMutation.error?.message || "An error occured"}
              </AlertTitle>
            </Alert>
          )}
          <Button type="submit" disabled={postMutation.isPending}>
            {postMutation.isPending ? "Creating ..." : "Create"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default PostForm;
