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
import { stripe } from "@/stripe";
import { BellRing } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ResumePostGraph } from "./resumePostGraph";

export interface SearchParams {
  success?: string;
  unsubscribed?: string;
  canceled?: string;
  premium?: string;
  pack?: string;
  [key: string]: string | string[] | undefined;
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await requiredAuth();

  if (!user || !user?.stripeCustomerId) {
    redirect("/api/auth/signin");
  }

  const subscription = await stripe.subscriptions.list({
    customer: user.stripeCustomerId,
    status: "active",
  });

  const isPremiumMember = subscription.data.length > 0;

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Dashboard</LayoutTitle>
        <LayoutDescription>Find your latest PowerPost</LayoutDescription>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4">
        <div className="flex  flex-row flex-wrap md:flex-nowrap   gap-4">
          <div className="w-full md:w-1/3 md:grow ">
            <Card>
              <CardHeader>
                <CardTitle>Welcome {user?.name}</CardTitle>
                <CardDescription>
                  {isPremiumMember
                    ? "Premium Member - 40 posts added per month"
                    : "Free Member - Limited posting privileges"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                You can create {user?.credits} PowerPost
              </CardContent>
            </Card>
          </div>
          <div className="w-full md:w-2/3 md:grow ">
            <Card>
              <CardHeader>
                <CardTitle>Powerpost</CardTitle>
                <CardDescription>{"statistiques"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className=" flex items-center space-x-4 my-6">
                  <BellRing />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      Total Powerposts
                    </p>
                    <p className="text-sm text-muted-foreground">
                      25 Powerpost created
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className=" flex items-center space-x-4 my-6">
                  <BellRing />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      3 lastest Powerposts
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Choisir un gps
                    </p>
                    <p className="text-sm text-muted-foreground">
                      A quoi sert Nextjs
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Comment faire de leeau froide
                    </p>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className=" flex items-center space-x-4 my-6">
                  <div className="flex-1 space-y-1">
                    <ResumePostGraph />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {searchParams?.unsubscribed ? (
          <Card>
            <CardHeader>
              <CardTitle>
                📌 You have been successfully unsubscribed 📌
              </CardTitle>
              <CardDescription>
                {`You can continue tu use your PowerPosts.`}
              </CardDescription>
            </CardHeader>
          </Card>
        ) : null}
        {searchParams?.success ? (
          <Card>
            <CardHeader>
              <CardTitle>You got your credits ✅</CardTitle>
              <CardDescription>
                {`Your account is now credited with ${
                  searchParams?.premium === "true"
                    ? "40"
                    : searchParams?.pack === "true"
                    ? "15"
                    : "0"
                } PowerPost.`}
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
