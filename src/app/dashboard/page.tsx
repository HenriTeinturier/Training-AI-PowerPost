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
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import NewsPropal from "./posts/newsPropal";
import { Loader } from "@/components/ui/loader";
import Link from "next/link";

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

  const Last3PowerPost: Post[] = await prisma.post.findMany({
    where: {
      userId: user?.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  const isPremiumMember = subscription.data.length > 0;

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Dashboard</LayoutTitle>
        <LayoutDescription>Find your latest PowerPost</LayoutDescription>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4">
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
        <div className="flex  flex-row flex-wrap md:flex-nowrap   gap-4 ">
          {/* LeftCards */}
          <div className="test w-full md:w-1/2 md:grow md:h-full ">
            <div className="flex flex-col md:h-fullh-full gap-4">
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
                  You have{" "}
                  <span className="text-primary bold">
                    {user?.credits} credits
                  </span>{" "}
                  left
                </CardContent>
              </Card>
              <Card className="md:h-full">
                <CardHeader>
                  <CardTitle>Powerpost</CardTitle>
                  <CardDescription>{"Three latest Powerposts"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Last3PowerPostTest Last3PowerPost={Last3PowerPost} />
                </CardContent>
              </Card>
            </div>
          </div>
          {/* right Cards */}
          <div className="test w-full md:h-full md:w-1/2 md:grow ">
            <Card className="md:h-full">
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                {/* <CardDescription>{"statistics"}</CardDescription> */}
              </CardHeader>
              <CardContent>
                <div className=" flex items-center space-x-4 mb-6">
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
                  <div className="flex-1 space-y-1">
                    <ResumePostGraph />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* TODO: reactivate before production */}
        {/* <div>
          <Suspense fallback={<Loader className="text-primary" />}>
            <NewsPropal />
          </Suspense>
        </div> */}
      </LayoutContent>
    </Layout>
  );
}

const Last3PowerPostTest = async ({
  Last3PowerPost,
}: {
  Last3PowerPost: Post[];
}) => {
  return (
    <div>
      <Table>
        <TableBody>
          {Last3PowerPost.map((post, index) => {
            return (
              <TableRow key={post.id + index} className="hover:cursor-pointer">
                <TableCell>
                  <Link
                    key={post.id + post.title}
                    href={`/dashboard/posts/${post.id}`}
                  >
                    {post.title}
                  </Link>
                </TableCell>
              </TableRow>
            );
            // <PowerPostCard key={post.id + index} post={post} />;
          })}
        </TableBody>
      </Table>
    </div>
  );
};
