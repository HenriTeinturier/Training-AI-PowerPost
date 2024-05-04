"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import powerpostLogoSvg from "../../../../public/assets/logos/powerpost-logo.svg";
import powerpostLogoSvgDark from "../../../../public/assets/logos/powerpost-logo-dark.svg";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const CreateLogo = ({
  size = "small",
  text = true,
}: {
  size?: "small" | "big";
  text?: boolean;
}) => {
  const { theme, resolvedTheme } = useTheme();
  const [logoSrc, setLogoSrc] = useState(powerpostLogoSvg);

  useEffect(() => {
    if (theme === "dark" || resolvedTheme === "dark") {
      setLogoSrc(powerpostLogoSvgDark);
    } else {
      setLogoSrc(powerpostLogoSvg);
    }
  }, [theme, resolvedTheme]);

  return (
    <div
      className={cn(
        "flex flex-row   ",
        !text ? "justify-center items-center" : "justify-start  items-start"
      )}
    >
      <div
        className={cn(
          " ",
          size === "small" ? "h-6 w-4" : "w-32 max-w-[30px]  tall:max-w-none "
        )}
      >
        <Image
          src={logoSrc}
          alt="PowerPost Logo"
          height={245}
          width={374}
          // responsive={true}
          // cover={true}
          // fill={true}
        />
      </div>
      {text && <div className="font-bold">owerPost</div>}
    </div>
  );
};

export default CreateLogo;
