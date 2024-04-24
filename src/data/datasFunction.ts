import { requiredAuth } from "@/auth/helper";
import { prisma } from "@/prisma";

export async function getPosts() {
  const user = await requiredAuth();

  if (!user) {
    throw new Error("User not found");
  }

  try {
    const posts = await prisma.post.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error) {
    // Logique de gestion des erreurs ou relancer l'erreur
    console.error("Failed to fetch posts:", error);
    throw error; // Relance l'erreur pour informer le consommateur de l'échec
  }
}
