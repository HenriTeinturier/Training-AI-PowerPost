import Link from "next/link";
import { AuthButton } from "../auth/AuthButton";
import { ThemeToggle } from "./ThemeToggle";
import CreateLogo from "./CreateLogo";

export const Header = () => {
  return (
    <header className="sticky flex  top-0 z-40 w-full  bg-background justify-center">
      <div className="flex w-full max-w-screen-xl justify-between ">
        <div className="mt-0 w-full flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex items-center gap-2 m-2 ">
            <Link href="/">
              <CreateLogo />
            </Link>
            {/* <Link href="/dashboard/posts">posts</Link>
            <Link href="/dashboard/credits">credits</Link>
            <Link href="/dashboard/posts/new">posts/new</Link>
            <Link href="/dashboard">dashboard</Link> */}
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
