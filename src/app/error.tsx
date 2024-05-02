"use client";

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
        onClick={
          () => {
            router.push("/dashboard");
          }
          // () => reset()
        }
      >
        Back to Home
      </button>
    </main>
  );
}
