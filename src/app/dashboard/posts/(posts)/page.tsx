import { requiredAuth } from "@/auth/helper";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/Layout";
import { RedirectType, redirect } from "next/navigation";
import { PostsFilter, getPosts, getPostsPages } from "@/data/datasFunction";
import PowerPostCard, { PowerPostCardsSkeleton } from "./PowerPostCard";
import FilterPostsToggle, {
  FilterPostsToggleSkeletton,
} from "./filterPostsToggle";
import { Suspense } from "react";
import PostPagination from "./pagination";
import { getServerUrl } from "@/getServerUrl";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

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

  // if (
  //   postsFilter.page &&
  //   (!parseInt(postsFilter.page) || parseInt(postsFilter.page) <= 0)
  // ) {
  //   redirect("/dashboard/posts");
  // }

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
  // const totalPagePromise = getPostsPages(postsFilter);
  // const postsPromise = getPosts(postsFilter);
  // const [totalPage, posts] = await Promise.all([
  //   totalPagePromise,
  //   postsPromise,
  // ]);
  // const posts = [];
  // const totalPage = 0;

  console.log("postsFilter before fetch", postsFilter);
  const filteredParams = Object.entries(postsFilter).reduce(
    (acc, [key, value]) => {
      if (value !== undefined) {
        // Ici, on vérifie si la valeur n'est pas undefined
        acc[key] = value;
      }
      return acc;
    },
    {} as Record<string, string>
  );

  try {
    const postsTestsResponse = await fetch(
      `${getServerUrl()}/api/posts?${new URLSearchParams(filteredParams)}`,
      {
        headers: new Headers(headers()),
      }
    );
    if (!postsTestsResponse.ok) {
      const errorData = await postsTestsResponse.json();
      throw new Error(errorData.error);
    }

    console.log("hello world");
  } catch (error) {
    throw error;
  }

  return <div>test</div>;

  return (
    <>
      {posts.map((post, index) => (
        <PowerPostCard key={post.id + index} post={post} />
      ))}
      <PostPagination totalPages={totalPage} />
    </>
  );
};
