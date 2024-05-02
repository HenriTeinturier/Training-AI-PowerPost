import { prisma } from "@/prisma";
import { PostMode } from "@prisma/client";
import { ResumePostGraph } from "./resumePostGraph";
import { getModesCount } from "@/data/datasFunction";

const PostGraph = async () => {
  const postModeStats = await getModesCount();

  return <ResumePostGraph postModeStats={postModeStats} />;
};

export default PostGraph;
