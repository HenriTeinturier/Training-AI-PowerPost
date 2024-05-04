"use client";

import { useEffect, useState } from "react";
import createPostDark from "../../public/assets/images/createpostDarkComp.png";
import createPostLight from "../../public/assets/images/createpostLightComp.png";
import Image from "next/image";
import { useTheme } from "next-themes";

export const CreatePostImg = () => {
  const { theme, resolvedTheme } = useTheme();
  const [imgSrc, setImgSrc] = useState(createPostLight);

  useEffect(() => {
    if (theme === "dark" || resolvedTheme === "dark") {
      setImgSrc(createPostDark);
    } else {
      setImgSrc(createPostLight);
    }
  }, [theme, resolvedTheme]);

  return (
    <Image src={imgSrc} alt="Create PowerPost image" className="rounded-xl" />
  );
};
