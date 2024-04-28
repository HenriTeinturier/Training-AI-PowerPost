import { requiredAuth } from "@/auth/helper";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/Layout";
import { redirect } from "next/navigation";
import { PostsFilter, getPosts } from "@/data/datasFunction";
import PowerPostCard, { PowerPostCardsSkeleton } from "./PowerPostCard";
import FilterPostsToggle, {
  FilterPostsToggleSkeletton,
} from "./filterPostsToggle";
import { Suspense } from "react";
import PostPagination from "./pagination";

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
      {posts.map((post, index) => (
        <PowerPostCard key={post.id + index} post={post} />
      ))}
      <PostPagination totalPages={totalPage} />
    </>
  );
};
