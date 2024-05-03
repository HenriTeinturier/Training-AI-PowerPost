import {
  Layout,
  LayoutContent,
  LayoutHeader,
} from "@/components/features/layout/Layout";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { prisma } from "@/prisma";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArticleWrapper } from "./ArticleWrapper";
import PostConfig from "./PostConfig";
import rehypePrism from "rehype-prism-plus";
import "./code-theme.scss";
import ChatPopover from "./ChatPopover";
import { requiredAuth } from "@/auth/helper";
import { notFound, redirect } from "next/navigation";
import BackButton from "@/components/features/BackButton";
import { SubmitButton } from "@/components/features/SubmitButton";
import { deletePost } from "@/lib/actions";
import { Button } from "@/components/ui/button";

const PostDetail = async ({
  params,
}: {
  params: {
    postid: string;
  };
}) => {
  const user = await requiredAuth();
  if (!user) {
    redirect("/");
  }

  const post = await prisma.post.findUnique({
    where: {
      id: params.postid,
    },
    select: {
      title: true,
      coverUrl: true,
      powerPost: true,
      source: true,
    },
  });
  if (!post) {
    notFound();
  }

  return (
    <>
      <Layout>
        <LayoutHeader>
          <div className="p-8 h-96 flex flex-col items-center justify-center text-white text-center w-full rounded-md gap-4 relative">
            <img
              src={post?.coverUrl || ""}
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover rounded-md"
            />
            <div className="z-10 relative">
              <Alert className="bg-gray-300/80 dark:bg-gray-900/80">
                <div>
                  <AlertTitle className="font-bold text-left text-2xl">
                    {post?.title}
                  </AlertTitle>
                </div>
                <AlertTitle className="text-left ">
                  This post is a resume of{" "}
                  <a
                    className="underline text-primary"
                    href={post?.source ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {post?.source}
                  </a>
                  . All right reserved to the original author.
                </AlertTitle>
              </Alert>
            </div>
          </div>
        </LayoutHeader>
        <LayoutContent>
          <PostConfig />
        </LayoutContent>
        <LayoutContent>
          <ArticleWrapper>
            <div className="flex gap-4">
              <BackButton className="hidden md:flex gap-2 " />
              <form
                action={async () => {
                  "use server";
                  redirect("/dashboard/posts");
                }}
              >
                <Button
                  type="submit"
                  variant="outline"
                  className="hidden md:flex "
                >
                  Powerposts
                </Button>
              </form>
            </div>

            <MDXRemote
              options={{
                mdxOptions: {
                  rehypePlugins: [rehypePrism],
                },
              }}
              source={post?.powerPost ?? ""}
            />
            <form
              action={async () => {
                "use server";
                const postDeleted = await deletePost(params.postid);
              }}
            >
              <SubmitButton type="submit" variant="destructive" className="">
                Delete Post
              </SubmitButton>
            </form>
          </ArticleWrapper>
        </LayoutContent>
        <ChatPopover />
      </Layout>
    </>
  );
};

export default PostDetail;
