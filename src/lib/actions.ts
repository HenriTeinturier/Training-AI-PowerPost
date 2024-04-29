"use server";

import { revalidateTag } from "next/cache";

export const revalidatePosts = async () => {
  "use server";
  revalidateTag("posts");
};
