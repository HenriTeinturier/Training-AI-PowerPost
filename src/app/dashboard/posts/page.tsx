import { requiredAuth } from "@/auth/helper";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/Layout";
import { redirect } from "next/navigation";
import { PostsFilter, getPosts, getPostsPages } from "@/data/datasFunction";
import PowerPostCard, { PowerPostCardsSkeleton } from "./PowerPostCard";
import FilterPostsToggle from "./filterPostsToggle";
import { Suspense } from "react";

export type PostsSearchParams = {
  search?: string;
  page?: string;
  mode?: string;
  sort?: string;
};

const Posts = async ({
  searchParams,
}: {
  searchParams?: {
    search?: string;
    page?: string;
    mode?: string;
    sort?: string;
  };
}) => {
  const user = await requiredAuth();
  if (!user) {
    redirect("/api/auth/signin");
  }

  const postsFilter: PostsFilter = {
    search: searchParams?.search,
    page: searchParams?.page,
    mode: searchParams?.mode,
    sort: searchParams?.sort,
  };

  const totalPage = await getPostsPages(postsFilter);
  const posts = await getPosts(postsFilter);

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Posts</LayoutTitle>
        <LayoutDescription>Find your latest created posts</LayoutDescription>
      </LayoutHeader>
      <LayoutContent>
        <FilterPostsToggle />
        <div className="flex flex-wrap gap-4 justify-center">
          <Suspense
            fallback={Array.from({ length: 8 }).map((_, index) => (
              <PowerPostCardsSkeleton key={index} />
            ))}
          >
            {posts.map((post, index) => (
              <PowerPostCard key={post.id + index} post={post} />
            ))}
          </Suspense>
        </div>
        {/* //TODO:
    //     ajouuter des loaders sur toutes les pages
    //     ajouter une vue table dans les powerposts avec pagination
    // pourquoi j'ai 13 mo charger sur dashboard? a cause du graph?
    // ajouter suspense et loader sur accueil
    //     ajouter un lien vers manage plan dans credits + changer affichage si user est premium: ne pas proposer l'option Premium mais proposer un manage plan à la palce
    //     afficher le type de post (via des tags?) (short, ...) dans le dashboard lien vers  dahsboard a coté des tags: createdpost et newpost
    //     ajouter dans la landing page traduction
    //     redirection  "/" si pas connecté mais page buy plans disponible
    //     redirection  "/" si pas connecté
    //    afficher les 3 derniers,
    //    visuels dans le dashboard
    //    voir ce que melvyn a fait ajouter
    //    suppression d'un post sur posts? et/ou dans detail view
    //    ajouter une navbar ?
    ajouter des pages d'erreurs et de notfound
    regler le problème du logo dark
    // ajouter un footer
    //    Ajuster landing page pricing et éviter double avec dashboard pricing
    //       Ajouter un back to post/id to dashboard/posts
    //       + tenter de keep le scroll position? et les filtres
    //      transformer/modifier? un  post dans un autre type de post
    //      recréer le logo
    //      pour le pricing: ajouter juste un pay me a coffe avec la logique stripe.?
    //      login with google
    //      ajouter des loader dans les server component: + Suspense
    //      Préciser que les paiements sont des fake: donner un exemple de fake card
    //       mise a jour de createdpost quand on  ajout un nouveau post  */}
      </LayoutContent>
    </Layout>
  );
};

export default Posts;
