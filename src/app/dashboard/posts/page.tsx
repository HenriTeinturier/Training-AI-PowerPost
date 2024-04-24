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
        {/* //TODO: 
        afficher le type de post (via des tags?) (short, ...) dans le dashboard lien vers  dahsboard a coté des tags: createdpost et newpost 
        ajouter dans la landing page traduction
        redirection  "/" si pas connecté mais page buy plans disponible
        redirection  "/" si pas connecté
       afficher les 3 derniers, 
       visuels dans le dashboard
       voir ce que melvyn a fait ajouter 
       suppression d'un post sur posts? et/ou dans detail view 
       ajouter une navbar ? 
       Ajuster landing page pricing et éviter double avec dashboard pricing
    
         transformer/modifier? un  post dans un autre type de post 
         recréer le logo
         pour le pricing: ajouter juste un pay me a coffe avec la logique stripe.?
         login with google
         ajouter des loader dans les server component: + Suspense
         Préciser que les paiements sont des fake: donner un exemple de fake card
          mise a jour de createdpost quand on  ajout un nouveau post */}
      </LayoutContent>
    </Layout>
  );
};

export default Posts;
