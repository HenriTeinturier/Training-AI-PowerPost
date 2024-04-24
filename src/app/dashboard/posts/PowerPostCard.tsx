import type { Post } from "@prisma/client";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import placeholderImage from "@/../public/assets/images/placeholder.jpg";

export type PowerPostCardProps = {
  post: Post;
};

//TODO add filter by tags, by created at

export const PowerPostCard = ({ post }: PowerPostCardProps) => {
  const domain = new URL(post.source).hostname;
  return (
    <div className="max-w-sm bg-card border border-border rounded-lg shadow flex flex-col justify-between">
      <div>
        <div className="rounded-t-lg overflow-hidden max-h-52 min-h-52 bg-cover">
          <Image
            src={post.coverUrl || placeholderImage}
            unoptimized={true}
            height={208}
            width={400}
            alt="cover from source url"
          />
        </div>
        <div className="px-5 pt-5">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-foreground line-clamp-2">
            {post.title}
          </h5>
          <p className="mb-3 font-normal text-muted-foreground  ">{domain}</p>
        </div>
      </div>
      <div className="pl-5 pb-5">
        <Link
          href={`/dashboard/posts/${post.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-accent bg-primary rounded-lg hover:bg-primary/90 focus:ring focus:outline-none "
        >
          <div>Read more</div>
          <MoveRight size={16} />
        </Link>
      </div>
    </div>
  );
};
