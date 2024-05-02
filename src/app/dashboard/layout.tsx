import SubNavbar from "@/components/features/subNavbar";
import { cn } from "@/lib/utils";
import Link from "next/link";

const HEADER_HEIGHT = 64;

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className="max-w-5xl w-full m-auto px-4 flex flex-col flex-grow   "
      // style={{ height: `calc(100vh - ${HEADER_HEIGHT}px)` }}
    >
      <SubNavbar />
      <div className="pt-8  h-full">{children}</div>
    </div>
  );
}
