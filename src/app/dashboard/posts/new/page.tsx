import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/Layout";
import PostForm from "./PostForm";

const NewPost = () => {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>New posts</LayoutTitle>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4">
        <PostForm />
      </LayoutContent>
    </Layout>
  );
};

export default NewPost;
