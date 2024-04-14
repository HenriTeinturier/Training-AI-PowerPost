import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/Layout";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { prisma } from "@/prisma";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";

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
          <LayoutTitle>Post page reader</LayoutTitle>
          <Alert className="bg-card/80">
            <AlertTitle className=" ">
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
          {/* <LayoutDescription>{post?.title}</LayoutDescription> */}
        </div>
      </LayoutHeader>
      <LayoutContent>
        <article className="prose dark:prose-invert">
          <MDXRemote source={post?.powerPost ?? ""} />
        </article>
      </LayoutContent>
    </Layout>
  );
};

export default PostDetail;
