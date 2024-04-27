"use client";

import { getServerUrl } from "@/getServerUrl";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error);
  }, [error]);

  const router = useRouter();

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <h2 className="text-center">Something went wrong!</h2>
      <h3>{error.message} </h3>
      <button
        type={"button"}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
        // onClick={redirectToPosts}
        onClick={
          // Attempt to recover by trying to re-render the invoices route
          () => {
            // router.replace(`./posts`);
            // router.refresh();
            // console.log("test");
            // const newUrl = new URL(`${getServerUrl()}/dashboard/posts`);
            // const test = newUrl.searchParams.get("mode");
            // console.log("test", test);
            // revalidatePath("/dashboard/posts");
            router.push("/dashboard/posts");
            router.refresh();
            // router.reload();
            // router.push("/dashboard/posts");
            // redirect("/dashboard");
            // redirect("/dashboard/posts");
          }
          // () => reset()
        }
      >
        Try again 2
      </button>
    </main>
  );
}
