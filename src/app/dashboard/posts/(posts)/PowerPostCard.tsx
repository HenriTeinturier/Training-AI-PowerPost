"use client";
import type { Post } from "@prisma/client";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import placeholderImage from "@/../public/assets/images/placeholder.jpg";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { PostShort } from "@/models/models";

export type PowerPostCardProps = {
  post: PostShort;
};

export const PowerPostCardsSkeleton = () => {
  return (
    <div className="max-w-sm bg-card border border-border rounded-lg shadow flex flex-col justify-between min-h-[390px]">
      <div>
        <div className="rounded-t-lg overflow-hidden max-h-52 min-h-52 bg-cover">
          <Skeleton className="h-[208px] w-[400px] rounded-xl" />
        </div>
        <div className="px-5 pt-5">
          <h5 className="mb-2 text-xl font-bold tracking-tight text-foreground line-clamp-2">
            <Skeleton className="h-4 w-[150px]" />
          </h5>
          <div className="mb-3 font-normal text-muted-foreground  ">
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>
      </div>
      <div className="pl-5 pb-5">
        <Skeleton className="h-[50px] w-[100px] rounded-xl" />
      </div>
    </div>
  );
};

export const PowerPostCard = ({ post }: PowerPostCardProps) => {
  const domain = new URL(post.source).hostname;
  return (
    <div
      className="max-w-sm bg-card border border-border rounded-lg shadow flex flex-col justify-between relative min-h-[390px]"
      key={post.mode + post.id}
    >
      <div>
        <div className="rounded-t-lg overflow-hidden max-h-52 min-h-52 bg-cover  ">
          <Badge variant="secondary" className="absolute right-2  top-2 ">
            {post.mode}
          </Badge>
          <Image
            src={post.coverUrl || placeholderImage}
            unoptimized={true}
            height={208}
            width={400}
            alt="cover from source url"
          />
        </div>
        <div className="px-5 pt-5">
          <h5 className="text-xl mb-2 font-bold tracking-tight text-foreground line-clamp-2">
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

export default PowerPostCard;
