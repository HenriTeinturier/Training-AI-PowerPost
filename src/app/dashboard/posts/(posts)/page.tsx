import { requiredAuth } from "@/auth/helper";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/Layout";
import { redirect } from "next/navigation";
import FilterPostsToggle, {
  FilterPostsToggleSkeletton,
} from "./filterPostsToggle";
import { Suspense } from "react";
import PowerPostCardsWrapper from "./PowerPostCardsWrapper";

// export const dynamic = "auto";
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
    redirect("/");
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

        <PowerPostCardsWrapper searchParams={searchParams} />
      </LayoutContent>
    </Layout>
  );
};
export default Posts;
