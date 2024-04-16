import { requiredAuth } from "@/auth/helper";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/prisma";
import { Post } from "@prisma/client";
import { redirect } from "next/navigation";
import { PowerPostCard } from "./posts/PowerPostCard";
import { Suspense } from "react";

export interface SearchParams {
  success?: string;
  canceled?: string;
  [key: string]: string | string[] | undefined;
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await requiredAuth();

  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Dashboard</LayoutTitle>
        <LayoutDescription>Find your latest PowerPost</LayoutDescription>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4">
        <div className="flex gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Welcome {user?.name}</CardTitle>
              <CardDescription>
                You can create {user?.credits} PowerPost
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        {searchParams?.success ? (
          <Card>
            <CardHeader>
              <CardTitle>You got your credits ✅</CardTitle>
              <CardDescription>
                Your account is now credited with 40 PowerPost.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : null}
        {searchParams?.canceled ? (
          <Card>
            <CardHeader>
              <CardTitle>Sorry, error during your payment ❌</CardTitle>
              <CardDescription>Please retry.</CardDescription>
            </CardHeader>
          </Card>
        ) : null}
        <Card>
          <CardHeader>
            <CardTitle>3 latests PowerPost</CardTitle>
          </CardHeader>
          <Suspense fallback={<div>Loading...</div>}>
            <Last3PowerPost />
          </Suspense>
        </Card>
      </LayoutContent>
    </Layout>
  );
}

const Last3PowerPost = async () => {
  const user = await requiredAuth();

  const Last3PowerPost: Post[] = (await prisma.post.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  })) as Post[];

  return (
    <div className="flex flex-col gap-4 p-4">
      {Last3PowerPost.map((post, index) => {
        return <PowerPostCard key={post.id + index} post={post} />;
      })}
    </div>
  );
};
