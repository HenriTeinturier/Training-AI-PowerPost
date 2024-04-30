import { requiredAuth } from "@/auth/helper";
import {
  ITEMS_PER_PAGE,
  PostsFilter,
  PostsFilterSchema,
  PostsFilterSchemaType,
  postsArraySchema,
  postsShortArraySchema,
} from "@/data/datasFunctionUtils";
import { prisma } from "@/prisma";
import { Post, Prisma } from "@prisma/client";
import { NextApiResponse } from "next";
import { redirect } from "next/navigation";

import { NextRequest, NextResponse } from "next/server";
import { ZodError, z } from "zod";

export async function GET(request: NextRequest) {
  const user = await requiredAuth();

  if (!user) {
    redirect("/");
    throw new Error("Not user in route test get");
  }

  const searchParams = request.nextUrl.searchParams;
  let postsFilter: PostsFilter = {
    search: searchParams.get("search") || undefined,
    page: searchParams.get("page") || undefined,
    mode: searchParams.get("mode") || undefined,
    sort: searchParams.get("sort") || undefined,
  };

  let postsFilterValidated: PostsFilterSchemaType;
  try {
    postsFilterValidated = PostsFilterSchema.parse(postsFilter);
  } catch (error) {
    return NextResponse.json({ error: "Wrong Url" }, { status: 404 });
  }

  try {
    const selectedMode = postsFilterValidated.mode;
    const sortOrder = postsFilterValidated.sort ?? "desc";
    const searchTerm = postsFilterValidated.search ?? "";
    const page = postsFilterValidated.page ?? 1;

    const offset = page - 1 < 1 ? 0 : page - 1;

    const whereClause: Prisma.PostWhereInput = {
      userId: user.id,
    };

    if (selectedMode.length > 0) {
      whereClause.mode = {
        in: selectedMode,
      };
    }
    if (searchTerm) {
      whereClause.title = {
        contains: searchTerm,
        mode: "insensitive",
      };
    }
    const [posts, count] = await Promise.all([
      prisma.post.findMany({
        where: whereClause,
        orderBy: {
          createdAt: sortOrder,
        },
        select: {
          id: true,
          source: true,
          // powerPost: true,
          coverUrl: true,
          userId: true,
          title: true,
          mode: true,
          createdAt: true,
        },
        take: ITEMS_PER_PAGE,
        skip: offset * ITEMS_PER_PAGE,
      }),
      prisma.post.count({
        where: whereClause,
      }),
    ]);
    postsShortArraySchema.parse(posts);
    z.number().parse(count);

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);

    return NextResponse.json({ posts, count: totalPages });
  } catch (e) {
    if (e instanceof ZodError) {
      const issues = e.issues;
      const message = issues.map((issue) => issue.message).join(", ");
      console.log("error zod", message);
      return NextResponse.json({ error: "not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "error in response Unhandled error" },
      { status: 400 }
    );
  }
}
