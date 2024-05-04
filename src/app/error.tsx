"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useEffect } from "react";
import errorImage from "../../public/assets/images/error.svg";
import { Typography } from "@/components/ui/typography";
import Link from "next/link";
import Image from "next/image";

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
    <div className="flex flex-col items-center gap-4 pt-8 h-full w-full">
      <Image
        src={errorImage}
        width={500}
        height={500}
        alt="error"
        className="mb-8"
      />
      <Typography variant="h2" className="text-primary">
        Something went wrong
      </Typography>
      <div className="flex gap-4 justify-center">
        <Button
          variant="outline"
          type={"button"}
          onClick={
            () => {
              router.push("/");
            }
            // () => reset()
          }
        >
          Back to Home
        </Button>
        <Button type={"button"} variant="outline" onClick={() => reset()}>
          Retry
        </Button>
      </div>
    </div>
  );
}
