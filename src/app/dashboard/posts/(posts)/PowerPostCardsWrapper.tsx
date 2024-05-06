"use client";
import { PowerPostCardsSkeleton } from "./PowerPostCard";
import PowerpostCards from "./PowerPostCards";
import { getPosts } from "@/data/datasFunction";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import PostPagination from "./pagination";
import { redirect } from "next/navigation";
import { PostShort } from "@/models/models";

const PowerPostCardsWrapper = ({
  searchParams,
}: {
  searchParams: {
    search?: string;
    page?: string;
    mode?: string;
    sort?: string;
  };
}) => {
  const [totalPage, setTotalPage] = useState<null | number>(1);

  const { data, isSuccess, isError } = useQuery<{
    posts: PostShort[];
    count: number;
  }>({
    queryKey: ["posts", searchParams],
    queryFn: () => getPosts(searchParams),
  });

  if (isError) {
    throw new Error("Error in PowerPostCardsWrapper");
    // redirect("/");
  }

  useEffect(() => {
    if (isSuccess) {
      setTotalPage(data?.count || 1);
    }
  }, [isSuccess, data]);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <div className="flex flex-wrap gap-4 justify-center">
        {data ? (
          <>
            <PowerpostCards posts={data.posts} totalPage={data.count} />
          </>
        ) : (
          <>
            {Array.from({ length: 4 }).map((_, index) => (
              <PowerPostCardsSkeleton key={index} />
            ))}
          </>
        )}
        {totalPage && <PostPagination totalPages={totalPage} />}
      </div>
    </div>
  );
};

export default PowerPostCardsWrapper;
