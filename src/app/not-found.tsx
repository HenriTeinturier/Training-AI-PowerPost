import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import notFoundImg from "../../public/assets/images/404.svg";
import { Typography } from "@/components/ui/typography";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 pt-8 h-full w-full">
      <Image
        src={notFoundImg}
        width={500}
        height={500}
        alt="Not Found"
        className="mb-8"
      />
      <Typography variant="h2" className="text-primary">
        404 Not Found
      </Typography>
      <Typography variant="h1" className="mb-8">
        Whoops! That page doesn’t exist.
      </Typography>
      <Link href="/">
        <Button variant="outline" className="">
          Return Home
        </Button>
      </Link>
    </div>
  );
}
