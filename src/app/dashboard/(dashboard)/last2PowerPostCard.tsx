import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/prisma";
import { Post } from "@prisma/client";
import { Suspense } from "react";
import PowerPostCard, {
  PowerPostCardsSkeleton,
} from "../posts/(posts)/PowerPostCard";

export const Last2PowerPost = async ({ userId }: { userId: string }) => {
  const getLast2PowerPost: Post[] = await prisma.post.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 2,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>PowerPost</CardTitle>
        <CardDescription>{"Two latest Powerposts"}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap  justify-center gap-8">
          <Suspense
            fallback={Array.from({ length: 2 }).map((_, index) => (
              <PowerPostCardsSkeleton key={index} />
            ))}
          >
            {getLast2PowerPost.map((post, index) => (
              <PowerPostCard key={post.id + index} post={post} />
            ))}
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
};
