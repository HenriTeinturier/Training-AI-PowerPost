import { requiredAuth } from "@/auth/helper";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/Layout";
import { redirect } from "next/navigation";
import { PostsFilter, getPosts, getPostsPages } from "@/data/datasFunction";
import PowerPostCard, { PowerPostCardsSkeleton } from "./PowerPostCard";
import FilterPostsToggle, {
  FilterPostsToggleSkeletton,
} from "./filterPostsToggle";
import { Suspense } from "react";
import PostPagination from "./pagination";
import { parse } from "path";

export type PostsSearchParams = {
  search?: string;
  page?: string;
  mode?: string;
  sort?: string;
};

const Posts = async ({
  searchParams,
}: {
  searchParams?: {
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

  const postsFilter: PostsFilter = {
    search: searchParams?.search,
    page: searchParams?.page,
    mode: searchParams?.mode,
    sort: searchParams?.sort,
  };

  if (
    postsFilter.page &&
    (!parseInt(postsFilter.page) || parseInt(postsFilter.page) <= 0)
  ) {
    redirect("/dashboard/posts");
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
              <PowerpostCards postsFilter={postsFilter} />
            </Suspense>
          </div>
        </div>
      </LayoutContent>
    </Layout>
  );
};
export default Posts;

const PowerpostCards = async ({
  postsFilter,
}: {
  postsFilter: PostsFilter;
}) => {
  const totalPagePromise = getPostsPages(postsFilter);
  const postsPromise = getPosts(postsFilter);
  const [totalPage, posts] = await Promise.all([
    totalPagePromise,
    postsPromise,
  ]);

  if (postsFilter.page && parseInt(postsFilter.page) <= 0) {
    redirect("/dashboard/posts");
  }

  return (
    <>
      {posts.map((post, index) => (
        <PowerPostCard key={post.id + index} post={post} />
      ))}
      <PostPagination totalPages={totalPage} />
    </>
  );
};
