import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { prisma } from "@/prisma";
import { Post } from "@prisma/client";
import Link from "next/link";
import { Suspense } from "react";
import PowerPostCard, {
  PowerPostCardsSkeleton,
} from "../posts/(posts)/PowerPostCard";
import { PostShort } from "@/models/models";

export const LastPowerPosts = async ({
  userId,
  displayType,
}: {
  userId: string;
  displayType: "table" | "card";
}) => {
  if (!userId) {
    console.log("no userId in LastPowerPosts");
    return null;
  }

  const LastPowerPostData: PostShort[] = await prisma.post.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      source: true,
      coverUrl: true,
      userId: true,
      title: true,
      mode: true,
      createdAt: true,
      updatedAt: true,
    },
    take: 3,
  });

  if (displayType === "table") {
    return <LastPowerPostTable LastPowerPostData={LastPowerPostData} />;
  }

  if (displayType === "card") {
    return (
      <LastPowerPostCard LastPowerPostData={LastPowerPostData.splice(0, 2)} />
    );
  }
};

const LastPowerPostTable = ({
  LastPowerPostData,
}: {
  LastPowerPostData: PostShort[];
}) => {
  return (
    <div>
      <Table>
        <TableBody>
          {LastPowerPostData.map((post, index) => {
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
          })}
        </TableBody>
      </Table>
    </div>
  );
};

const LastPowerPostCard = ({
  LastPowerPostData,
}: {
  LastPowerPostData: PostShort[];
}) => {
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
            {LastPowerPostData.map((post, index) => (
              <PowerPostCard key={post.id + index} post={post} />
            ))}
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
};
