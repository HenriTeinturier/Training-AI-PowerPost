import { signIn } from "@/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Chrome, Github } from "lucide-react";
import { PropsWithChildren } from "react";

export const LoginDropdown = ({ children }: PropsWithChildren) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem asChild>
          <form
            action={async () => {
              "use server";
              await signIn("github", {
                redirect: true,
                redirectTo: "/dashboard",
              });
            }}
          >
            <button className="flex items-center hover:cursor-pointer">
              <div className="w-7">
                <Github className="h-4 w-4S" />
              </div>
              Signin with GitHub
            </button>
          </form>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <form
            action={async () => {
              "use server";
              await signIn("google", {
                redirect: true,
                redirectTo: "/dashboard",
              });
            }}
          >
            <button className="flex items-center hover:cursor-pointer">
              <div className="w-7">
                <Chrome className=" h-4 w-4" />
              </div>
              Signin with Google
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
