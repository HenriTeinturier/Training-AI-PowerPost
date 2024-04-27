import { requiredAuth } from "@/auth/helper";
import {
  ITEMS_PER_PAGE,
  PostsFilter,
  PostsFilterSchema,
} from "@/data/datasFunction";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(request: NextRequest) {
  const user = await requiredAuth();

  if (!user) {
    throw new Error("Not user in route test get");
  }

  const searchParams = request.nextUrl.searchParams;
  const postsFilter: PostsFilter = {
    search: searchParams.get("search") || undefined,
    page: searchParams.get("page") || undefined,
    mode: searchParams.get("mode") || undefined,
    sort: searchParams.get("sort") || undefined,
  };

  try {
    const postsFilterValidated = PostsFilterSchema.parse(postsFilter);
    return NextResponse.json("hello world");
  } catch (e) {
    if (e instanceof ZodError) {
      const issues = e.issues;
      const message = issues.map((issue) => issue.message).join(", ");
      console.log("error zod", message);
      return NextResponse.json({ error: "URL error" }, { status: 400 });
    }
    return NextResponse.json(
      { error: "error in response Unhandled error" },
      { status: 400 }
    );
  }
}
