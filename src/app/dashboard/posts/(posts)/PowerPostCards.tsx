import { getPosts } from "@/data/datasFunction";
import { PostsFilter } from "@/data/datasFunctionUtils";
import { Suspense } from "react";
import PowerPostCard from "./PowerPostCard";
import PostPagination from "./pagination";
import { Post } from "@prisma/client";

const PowerpostCards = ({
  posts,
  totalPage,
}: {
  posts: Post[];
  totalPage: number;
}) => {
  return (
    <>
      {posts.map((post, index) => (
        <PowerPostCard key={post.id + index} post={post} />
      ))}
      <PostPagination totalPages={totalPage} />
    </>
  );
};

export default PowerpostCards;
