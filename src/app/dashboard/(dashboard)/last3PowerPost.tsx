import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { prisma } from "@/prisma";
import { Post } from "@prisma/client";
import Link from "next/link";

export const Last3PowerPost = async ({ userId }: { userId: string }) => {
  const Last3PowerPost: Post[] = await prisma.post.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return (
    <div>
      <Table>
        <TableBody>
          {Last3PowerPost.map((post, index) => {
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
