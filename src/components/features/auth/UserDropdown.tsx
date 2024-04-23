import { signOut } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LayoutDashboard, LogOut } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { managePlanAction } from "./manage-plan.action";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const UserDropdown = ({ children }: PropsWithChildren) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <form
            action={async () => {
              "use server";
              const url = await managePlanAction();
              revalidatePath("/dashboard");
              redirect(url);
            }}
          >
            <button className="flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              Manage plan
            </button>
          </form>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form
            action={async () => {
              "use server";
              await signOut({ redirect: true, redirectTo: "/" });
            }}
          >
            <button className="flex items-center">
              <LogOut className="mr-2 h-4 w-4" />
              SignOut
            </button>{" "}
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
