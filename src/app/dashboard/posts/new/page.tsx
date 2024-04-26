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
import { Skeleton } from "@/components/ui/skeleton";

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
          <Suspense fallback={<PostFormSkeletton />}>
            <PostForm user={user} />
          </Suspense>
        </LayoutContent>
      </Layout>
    </>
  );
};

export default NewPost;

export const PostFormSkeletton = () => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      <Skeleton className="h-[17px] w-[47px]" />
      <Skeleton className="h-[36px] w-[896px]" />
      <div className="p-2 flex flex-col gap-2">
        <Skeleton className="h-[17px] w-[40px]" />
        <div className="w-full flex gap-2 justify-center">
          {Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="h-[80px] w-[80px]" />
          ))}
        </div>
        <Skeleton className="h-[17px] w-[65px]" />
        <Skeleton className="h-[36px] w-[896px]" />
        <Skeleton className="h-[36px] w-[896px]" />
      </div>
    </div>
  );
};
