"use client";
import { PowerPostCardsSkeleton } from "./PowerPostCard";
import PowerpostCards from "./PowerPostCards";
import { getPosts } from "@/data/datasFunction";
import { useQuery } from "@tanstack/react-query";
import { Post } from "@prisma/client";

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
  const { data } = useQuery<{ posts: Post[]; count: number }>({
    queryKey: ["posts", searchParams],
    queryFn: () => getPosts(searchParams),
  });

  return data ? (
    <div className="flex flex-wrap gap-4 justify-center">
      <div className="flex flex-wrap gap-4 justify-center">
        <PowerpostCards posts={data.posts} totalPage={data.count} />
      </div>
    </div>
  ) : (
    <div className="flex flex-wrap gap-4 justify-center">
      <div className="flex flex-wrap gap-4 justify-center">
        {Array.from({ length: 4 }).map((_, index) => (
          <PowerPostCardsSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default PowerPostCardsWrapper;
