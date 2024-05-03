import { ResumePostGraph } from "./resumePostGraph";
import { getModesCount } from "@/data/datasFunction";

const PostGraph = async () => {
  const postModeStats = await getModesCount();

  if (!postModeStats) {
    return null;
  }

  return <ResumePostGraph postModeStats={postModeStats} />;
};

export default PostGraph;
