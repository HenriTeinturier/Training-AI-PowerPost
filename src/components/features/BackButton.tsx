"use client";

import React from "react";
import { Button, ButtonProps } from "../ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowLeftCircle } from "lucide-react";

const BackButton = (props: ButtonProps) => {
  const router = useRouter();

  return (
    <Button
      {...props}
      variant="outline"
      // size={"icon"}
      onClick={() => router.back()}
    >
      <ArrowLeft size={16} />
      Back
      {props.children}
    </Button>
  );
};

export default BackButton;
