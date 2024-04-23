"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import powerpostLogoSvg from "../../../../public/assets/logos/powerpost-logo.svg";
import powerpostLogoSvgDark from "../../../../public/assets/logos/powerpost-logo-dark.svg";

const CreateLogo = () => {
  const defaultTheme =
    typeof window !== "undefined"
      ? localStorage.getItem("theme") || "light"
      : "light";
  const { setTheme, theme } = useTheme();

  const LogoToDisplay = (): string => {
    let trueTheme = defaultTheme;
    if (theme) {
      trueTheme = theme;
    }

    if (trueTheme === "dark") {
      return powerpostLogoSvgDark;
    } else {
      return powerpostLogoSvg;
    }
  };

  return (
    <div>
      <div className="flex flex-row  items-start justify-start ">
        <div className="h-6 w-4 block Slot">
          <Image src={LogoToDisplay()} alt="PowerPost Logo" />
        </div>
        <div className="font-bold">owerPost</div>
      </div>
    </div>
  );
};

export default CreateLogo;
