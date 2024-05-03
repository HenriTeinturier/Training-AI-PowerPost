"use client";

import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeftCircle } from "lucide-react";

const BackButton = (props: ButtonProps) => {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      size={"icon"}
      className="hidden md:flex"
      onClick={() => router.back()}
    >
      <ArrowLeftCircle />
      {props.children}
    </Button>
  );
};

export default BackButton;
