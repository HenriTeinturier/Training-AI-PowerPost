import { requiredAuth } from "@/auth/helper";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/prisma";
import Link from "next/link";

const Posts = async () => {
  const user = await requiredAuth();
  const posts = await prisma.post.findMany({
    where: {
      userId: user.id,
    },
  });

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Posts</LayoutTitle>
        <LayoutDescription>Find your latest created posts</LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardHeader>
            <CardTitle>Your posts</CardTitle>
          </CardHeader>
          <CardContent>
            {posts.map((post) => (
              <li key={post.id}>
                <Link href={`/dashboard/posts/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
};

export default Posts;
