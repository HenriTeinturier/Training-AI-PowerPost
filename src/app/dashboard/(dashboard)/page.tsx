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
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
// import NewsPropal from "../posts/(posts)/newsPropal";
import { PowerPostCardsSkeleton } from "../posts/(posts)/PowerPostCard";
import { Skeleton } from "@/components/ui/skeleton";
import StripeDescription from "./stripeDescription";
import { LastPowerPosts } from "./lastPowerPosts";
import TotalPostDescription from "./totalPostDescription";
import PostGraph from "./postGraph";
import { headers } from "next/headers";
import { userAgent } from "next/server";
import { request } from "https";

export interface SearchParams {
  success?: string;
  unsubscribed?: string;
  canceled?: string;
  premium?: string;
  pack?: string;
  [key: string]: string | string[] | undefined;
  viewport?: "mobile" | "desktop";
}

export default async function Dashboard({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const user = await requiredAuth();

  if (!user || !user?.stripeCustomerId) {
    redirect("/");
  }

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
        {/* Main widgets (welcome / stat / Powerpost) */}
        <div className="flex  flex-row flex-wrap md:flex-nowrap   gap-4 ">
          {/* LeftCards */}
          <div className="test w-full md:w-1/2 md:grow md:h-full ">
            <div className="flex flex-col md:h-full gap-4">
              {/* Welcome card */}

              <Card>
                <CardHeader>
                  <CardTitle>Welcome {user?.name}</CardTitle>
                  <Suspense
                    fallback={
                      <CardDescription>
                        <Skeleton className="h-[20px] w-[250px] mt-2" />
                      </CardDescription>
                    }
                  >
                    <CardDescription>
                      <StripeDescription stripeId={user.stripeCustomerId} />
                    </CardDescription>
                  </Suspense>
                </CardHeader>
                <CardContent>
                  You have{" "}
                  <span className="text-primary bold">
                    {user?.credits} credits
                  </span>{" "}
                  left
                </CardContent>
              </Card>

              {/* 3 latest powerpost card */}
              {searchParams?.viewport === "desktop" && (
                <Suspense
                  fallback={
                    <Card className="md:h-full">
                      <CardHeader>
                        <CardTitle>
                          <Skeleton className="h-[20px] w-[80x]" />{" "}
                        </CardTitle>
                        <CardDescription>
                          <Skeleton className="h-[17px] w-[150x]" />
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Skeleton className="h-[20px] w-full" />
                        <Skeleton className="h-[20px] w-full" />
                        <Skeleton className="h-[20px] w-full" />
                      </CardContent>
                    </Card>
                  }
                >
                  <Card className="md:h-full">
                    <CardHeader>
                      <CardTitle>Powerpost</CardTitle>
                      <CardDescription>
                        {"Three latest Powerposts"}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <LastPowerPosts userId={user.id} displayType={"table"} />
                    </CardContent>
                  </Card>
                </Suspense>
              )}
            </div>
          </div>
          {/* right Cards */}

          <div className="test w-full md:h-full md:w-1/2 md:grow   ">
            <Card className="md:h-full flex flex-col flex-grow">
              {searchParams?.viewport !== "mobile" && (
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                </CardHeader>
              )}
              <CardContent className="flex-grow flex flex-col  ">
                {searchParams?.viewport !== "mobile" && (
                  <>
                    <Suspense
                      fallback={
                        <div className=" flex items-center space-x-4 mb-6">
                          <Skeleton className=" rounded-full h-[24px] w-[24px] " />
                          <div className="flex-1 space-y-1">
                            <Skeleton className="h-[20px] w-[120px]" />
                            <Skeleton className="h-[17px] w-[150px]" />
                          </div>
                        </div>
                      }
                    >
                      <TotalPostDescription />
                    </Suspense>

                    <Separator className="my-4" />
                  </>
                )}
                <Suspense
                  fallback={
                    <div className=" flex flex-col flex-grow justify-center items-center space-x-4 h-28 mt-6 ">
                      <Skeleton className="h-28 w-full" />
                    </div>
                  }
                >
                  <div className=" flex flex-col flex-grow justify-center items-center space-x-4  mt-6 ">
                    {/* <div className="h-full"> */}
                    <PostGraph />
                    {/* </div> */}
                  </div>
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Last PowerPost Cards */}
        <Suspense
          fallback={
            <Card>
              <CardHeader>
                <CardTitle>PowerPost</CardTitle>
                <CardDescription>{"Two latest Powerposts"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap  justify-center gap-8">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <PowerPostCardsSkeleton key={index} />
                  ))}
                </div>
              </CardContent>
            </Card>
          }
        >
          <LastPowerPosts userId={user.id} displayType={"card"} />
        </Suspense>
      </LayoutContent>
    </Layout>
  );
}
