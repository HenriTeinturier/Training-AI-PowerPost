"use client";

import { useEffect, useState } from "react";
import powerpostsDark from "../../public/assets/images/powerpostsDark.png";
import powerpostLight from "../../public/assets/images/powerpostLight.png";
import Image from "next/image";
import { useTheme } from "next-themes";

export const PowerpostImg = () => {
  const { theme, resolvedTheme } = useTheme();
  const [imgSrc, setImgSrc] = useState(powerpostLight);

  useEffect(() => {
    if (theme === "dark" || resolvedTheme === "dark") {
      setImgSrc(powerpostsDark);
    } else {
      setImgSrc(powerpostLight);
    }
  }, [theme, resolvedTheme]);

  return (
    <div className="flex justify-center  md:w-[700px]    bg-muted rounded-xl ">
      <Image
        src={imgSrc}
        // width={500}
        alt="Create PowerPost image"
        className="md:p-4 sm:p-2 border sm:border-none rounded-xl w-[500px] "
      />
    </div>
  );
};
