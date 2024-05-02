"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SubNavbar = () => {
  const pathName = usePathname();

  return (
    <nav className="flex items-center gap-4 flex-wrap  ">
      <Link
        href="/dashboard/"
        className={cn(
          "flex h-8 items-center gap-2 rounded-md px-2 transition-colors text-sm bg-accent/20  hover:bg-accent/50 ",
          pathName === "/dashboard" &&
            "bg-accent-foreground text-muted   hover:bg-accent-foreground"
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/dashboard/posts"
        className={cn(
          "flex h-8 items-center gap-2 rounded-md px-2 transition-colors text-sm bg-accent/20  hover:bg-accent/50 ",
          pathName === "/dashboard/posts" &&
            "bg-accent-foreground text-muted   hover:bg-accent-foreground"
        )}
      >
        Powerposts
      </Link>
      <Link
        href="/dashboard/posts/new"
        className={cn(
          "flex h-8 items-center gap-2 rounded-md px-2 transition-colors text-sm bg-accent/20  hover:bg-accent/50 ",
          pathName === "/dashboard/posts/new" &&
            "bg-accent-foreground text-muted   hover:bg-accent-foreground"
        )}
      >
        Create{" "}
      </Link>
      <Link
        href="/dashboard/credits"
        className={cn(
          "flex h-8 items-center gap-2 rounded-md px-2 transition-colors text-sm bg-accent/20  hover:bg-accent/50 ",
          pathName === "/dashboard/credits" &&
            "bg-accent-foreground text-muted   hover:bg-accent-foreground"
        )}
      >
        Credits
      </Link>
    </nav>
  );
};

export default SubNavbar;
