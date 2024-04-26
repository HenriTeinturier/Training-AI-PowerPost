import { prisma } from "@/prisma";
import { ResumePostGraph } from "./resumePostGraph";
import { PostMode } from "@prisma/client";

async function countPostsByModeIncludingZeros() {
  // Initialisation d'un objet pour compter les modes avec des valeurs initiales à 0
  const modeCounts: Record<PostMode, number> = Object.values(PostMode).reduce(
    (acc, mode) => {
      acc[mode] = 0;
      return acc;
    },
    {} as Record<PostMode, number>
  );

  // Requête pour obtenir les comptes actuels depuis la base de données
  const result = await prisma.post.groupBy({
    by: ["mode"],
    _count: {
      mode: true,
    },
  });

  // Mise à jour des comptes avec les données de la base de données
  result.forEach((item) => {
    if (item.mode in modeCounts) {
      modeCounts[item.mode] = item._count.mode;
    }
  });

  console.log(modeCounts);
  return modeCounts;
}

const PostGraph = async () => {
  const totalPowerpostByMode = await countPostsByModeIncludingZeros()
    .catch((e) => {
      throw e;
    })
    .finally(async () => {
      await prisma.$disconnect();
    });

  return <ResumePostGraph totalPowerpostByMode={totalPowerpostByMode} />;
};

export default PostGraph;
