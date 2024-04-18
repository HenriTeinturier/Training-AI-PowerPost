"use client";

import powerpostCreateImageDark from "../../public/assets/images/powerpostCreateComp.jpg";
import powerpostCreateImage from "../../public/assets/images/createpostwhite.jpg";
import { useTheme } from "next-themes";
import Image from "next/image";

export const CreatePostImg = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Image
      src={powerpostCreateImageDark}
      alt="Create PowerPost image"
      className="rounded-xl"
    />
  );

  // return (
  //   <div>
  //     {theme === "light" ? (
  //       <Image
  //         src={powerpostCreateImage}
  //         alt="Create PowerPost image"
  //         className="rounded-xl"
  //       />
  //     ) : (
  //       <Image
  //         src={powerpostCreateImageDark}
  //         alt="Create PowerPost image"
  //         className="rounded-xl"
  //       />
  //     )}
  //   </div>
  // );
};
