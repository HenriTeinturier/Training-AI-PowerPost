import Link from "next/link";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-5xl m-auto px-4 h-full">
      <nav className="flex items-center gap-4 mt-4">
        <Link
          href="/dashboard/"
          className="flex h-8 items-center gap-2 rounded-md px-2 transition-colors text-sm bg-accent/20 hover:bg-accent/50 "
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/posts"
          className="flex h-8 items-center gap-2 rounded-md px-2 transition-colors text-sm bg-accent/20 hover:bg-accent/50 "
        >
          Created Posts
        </Link>
        <Link
          href="/dashboard/posts/new"
          className="flex h-8 items-center gap-2 rounded-md px-2 transition-colors text-sm bg-accent/20 hover:bg-accent/50"
        >
          New post
        </Link>
        <Link
          href="/dashboard/credits"
          className="flex h-8 items-center gap-2 rounded-md px-2 transition-colors text-sm bg-accent/20 hover:bg-accent/50"
        >
          Buy credits plan
        </Link>
      </nav>
      <div className="mt-8">{children}</div>
    </div>
  );
}
