"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import powerpostLogoSvg from "../../../../public/assets/logos/powerpost-logo.svg";
import powerpostLogoSvgDark from "../../../../public/assets/logos/powerpost-logo-dark.svg";
import { useEffect, useState } from "react";

const CreateLogo = () => {
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
    <div className="flex flex-row  items-start justify-start ">
      <div className="h-6 w-4 block Slot">
        <Image src={logoSrc} alt="PowerPost Logo" />
      </div>
      <div className="font-bold">owerPost</div>
    </div>
  );
};

export default CreateLogo;
