import { requiredAuth } from "@/auth/helper";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/Layout";
import { redirect } from "next/navigation";
import { getPosts } from "@/data/datasFunction";
import PowerPostCard, { PowerPostCardsSkeleton } from "./posts/PowerPostCard";
import FilterPostsToggle, {
  FilterPostsToggleSkeletton,
} from "./posts/filterPostsToggle";
import { Suspense } from "react";
import PostPagination from "./posts/pagination";
import { PostsFilter } from "@/data/datasFunctionUtils";

export const dynamic = "auto";
const Posts = async ({
  searchParams,
}: {
  searchParams: {
    search?: string;
    page?: string;
    mode?: string;
    sort?: string;
  };
}) => {
  const user = await requiredAuth();
  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Posts</LayoutTitle>
        <LayoutDescription>Find your latest created posts</LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <Suspense fallback={<FilterPostsToggleSkeletton />}>
          <FilterPostsToggle />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="flex flex-wrap gap-4 justify-center">
            <div className="flex flex-wrap gap-4 justify-center">
              <Suspense
                fallback={Array.from({ length: 8 }).map((_, index) => (
                  <PowerPostCardsSkeleton key={index} />
                ))}
              >
                <PowerpostCards searchParams={searchParams} />
              </Suspense>
            </div>
          </div>
        </Suspense>
      </LayoutContent>
    </Layout>
  );
};
export default Posts;

const PowerpostCards = async ({
  searchParams,
}: {
  searchParams: PostsFilter;
}) => {
  const { posts, count: totalPage } = await getPosts(searchParams);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        {posts.map((post, index) => (
          <PowerPostCard key={post.id + index} post={post} />
        ))}
        <PostPagination totalPages={totalPage} />
      </Suspense>
    </>
  );
};
