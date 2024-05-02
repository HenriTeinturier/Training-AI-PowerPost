import { buttonVariants } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
import Link from "next/link";

const SignInButton = () => {
  return (
    <Link href="/signIn" className={buttonVariants({ size: "lg" })}>
      <div className="flex gap-2 items-center">
        <CircleUserRound size={16} />
        <div>Sign In</div>
      </div>
    </Link>
  );
};

export default SignInButton;
