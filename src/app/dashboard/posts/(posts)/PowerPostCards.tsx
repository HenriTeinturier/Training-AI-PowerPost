import { PostShort } from "@/models/models";
import PowerPostCard from "./PowerPostCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Link2 } from "lucide-react";

const PowerpostCards = ({
  posts,
  totalPage,
}: {
  posts: PostShort[];
  totalPage: number;
}) => {
  if (posts.length === 0) {
    return (
      <Link href="/dashboard/posts/new" className="w-full">
        <Alert className="cursor-pointer l">
          <Link2 size={16} />
          <AlertTitle className="l">{"No Powerpost yet."}</AlertTitle>
          <AlertDescription className="l">
            {"Go to the creation page to start."}
          </AlertDescription>
        </Alert>
      </Link>
    );
  }

  return (
    <>
      {posts.map((post, index) => (
        <PowerPostCard key={post.id + index} post={post} />
      ))}
      {/* <PostPagination totalPages={totalPage} /> */}
    </>
  );
};

export default PowerpostCards;
