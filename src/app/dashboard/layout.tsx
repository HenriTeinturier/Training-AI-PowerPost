import Link from "next/link";

const HEADER_HEIGHT = 64;

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="max-w-5xl m-auto px-4 flex flex-col flex-grow   "
      style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      <nav className="flex items-center gap-4">
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
          Powerposts
        </Link>
        <Link
          href="/dashboard/posts/new"
          className="flex h-8 items-center gap-2 rounded-md px-2 transition-colors text-sm bg-accent/20 hover:bg-accent/50"
        >
          Create Powerpost
        </Link>
        <Link
          href="/dashboard/credits"
          className="flex h-8 items-center gap-2 rounded-md px-2 transition-colors text-sm bg-accent/20 hover:bg-accent/50"
        >
          Credits
        </Link>
      </nav>
      <div className="pt-8  h-full">{children}</div>
    </div>
  );
}
