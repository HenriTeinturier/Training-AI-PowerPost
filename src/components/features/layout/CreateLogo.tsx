"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import powerpostLogoSvg from "../../../../public/assets/logos/powerpost-logo.svg";
import powerpostLogoSvgDark from "../../../../public/assets/logos/powerpost-logo-dark.svg";

const CreateLogo = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div>
      {theme === "light" ? (
        <div className="flex flex-row  items-start justify-start ">
          <div className="h-6 w-4 block Slot">
            <Image src={powerpostLogoSvg} alt="PowerPost Logo" />
          </div>
          <div className="font-bold">owerPost</div>
        </div>
      ) : (
        <div className="flex flex-row  items-start justify-start ">
          <div className="h-6 w-4 block Slot">
            <Image src={powerpostLogoSvgDark} alt="PowerPost Logo " />
          </div>
          <div className="font-bold">owerPost</div>
        </div>
      )}
    </div>
  );
};

export default CreateLogo;
