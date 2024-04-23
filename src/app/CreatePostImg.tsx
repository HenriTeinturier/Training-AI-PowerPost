"use client";

import powerpostCreateImageDark from "../../public/assets/images/powerpostCreateComp.jpg";
import Image from "next/image";

export const CreatePostImg = () => {
  return (
    <Image
      src={powerpostCreateImageDark}
      alt="Create PowerPost image"
      className="rounded-xl"
    />
  );
};
