import Link from "next/link";
import { AuthButton } from "../auth/AuthButton";
import { ThemeToggle } from "./ThemeToggle";

export const Header = () => {
  return (
    <header className="sticky flex  top-0 z-40 w-full border-b bg-background justify-center">
      <div className="flex w-full max-w-screen-xl justify-between ">
        <div className="mt-0 w-full flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex items-center gap-2 m-2 ">
            <Link href="/" className="text-xl font-bold">
              PowerPost
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <AuthButton />
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
