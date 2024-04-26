import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/Layout";
import PostForm from "./PostForm";
import { requiredAuth } from "@/auth/helper";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { PostFormSkeleton } from "./postFormSkeleton";

const NewPost = async () => {
  const user = await requiredAuth();

  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <>
      <Layout>
        <LayoutHeader>
          <LayoutTitle>New posts</LayoutTitle>
          <LayoutDescription>Create a new Powerpost</LayoutDescription>
        </LayoutHeader>
        <LayoutContent className="flex flex-col gap-4">
          <Suspense fallback={<PostFormSkeleton />}>
            <PostForm user={user} />
          </Suspense>
        </LayoutContent>
      </Layout>
    </>
  );
};

export default NewPost;
