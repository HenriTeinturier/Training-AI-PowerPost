import { prisma } from "@/prisma";
import { BellRing } from "lucide-react";

const TotalPostDescription = async () => {
  const totalPost = (await prisma.post.count()) || 0;

  return (
    <>
      <div className=" flex items-center space-x-4 mb-6">
        <BellRing />
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">Total Powerposts</p>
          <p className="text-sm text-muted-foreground">
            {`${totalPost} Powerpost created`}
          </p>
        </div>
      </div>
    </>
  );
};

export default TotalPostDescription;
