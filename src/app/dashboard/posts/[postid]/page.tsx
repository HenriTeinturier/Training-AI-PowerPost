import {
  Layout,
  LayoutContent,
  LayoutHeader,
} from "@/components/features/layout/Layout";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { prisma } from "@/prisma";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { ArticleWrapper } from "./ArticleWrapper";
import PostConfig from "./PostConfig";
import rehypePrism from "rehype-prism-plus";
import "./code-theme.scss";

const PostDetail = async ({
  params,
}: {
  params: {
    postid: string;
  };
}) => {
  const post = await prisma.post.findUnique({
    where: {
      id: params.postid,
    },
  });

  if (!post) {
    <div>Post not found</div>;
  }

  console.log("coverUrl", post?.coverUrl);

  return (
    <Layout>
      <LayoutHeader>
        <div
          style={{ backgroundImage: `url(${post?.coverUrl})` }}
          className="bg-cover bg-center p-8 h-96 flex flex-col items-center justify-center text-white text-center w-full rounded-md gap-4"
        >
          <Alert className="bg-gray-300/80 dark:bg-gray-900/80 ">
            <div>
              <AlertTitle className="font-bold text-left text-2xl">
                {post?.title}
              </AlertTitle>
            </div>
            <AlertTitle className="text-left ">
              This post is a resume of{" "}
              <Link
                className="underline text-primary"
                href={post?.source ?? "#"}
              >
                {post?.source}
              </Link>
              . All right reserved to the original author.
            </AlertTitle>
          </Alert>
        </div>
      </LayoutHeader>
      <LayoutContent>
        <PostConfig />
      </LayoutContent>
      <LayoutContent>
        <ArticleWrapper>
          <MDXRemote
            options={{
              mdxOptions: {
                rehypePlugins: [rehypePrism],
              },
            }}
            source={post?.powerPost ?? ""}
          />
        </ArticleWrapper>
      </LayoutContent>
    </Layout>
  );
};

export default PostDetail;
