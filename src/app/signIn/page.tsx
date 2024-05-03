import { auth } from "@/auth/helper";
import { redirect } from "next/navigation";
import { Chrome, Github } from "lucide-react";
import CreateLogo from "@/components/features/layout/CreateLogo";
import {
  LayoutSubTitle,
  LayoutTitle,
} from "@/components/features/layout/Layout";
import { SubmitButton } from "@/components/features/SubmitButton";
import { signIn } from "@/auth";

const SignIn = async () => {
  const user = await auth();

  if (user) {
    redirect("/dashboard");
  }
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-col  lg:flex-row min-h-[600px] xl:min-h-[800px] w-full">
        <div className="flex items-center justify-center py-12 flex-grow lg:flex-grow-0 lg:w-1/2">
          <div className="mx-auto flex flex-col gap-6 w-[350px]">
            <div className="flex flex-col gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Choose a method to login (automatic sign Up if not registered)
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <form
                action={async () => {
                  "use server";
                  await signIn("github", {
                    redirect: true,
                    redirectTo: "/dashboard",
                  });
                }}
              >
                <SubmitButton variant="outline" className="w-full gap-2">
                  <Github className="h-4 w-4" />
                  Login with Github
                </SubmitButton>
              </form>
              <form
                action={async () => {
                  "use server";
                  await signIn("google", {
                    redirect: true,
                    redirectTo: "/dashboard",
                  });
                }}
              >
                <SubmitButton variant="outline" className="w-full gap-2">
                  <Chrome className="h-4 w-4" />
                  Login with Google
                </SubmitButton>
              </form>
            </div>
          </div>
        </div>
        <div className="bg-muted items-center justify-center flex flex-col  lg:w-1/2 gap-4 min-h-[400px] ">
          <CreateLogo size={"big"} text={false} />
          <div className="flex flex-col gap-2 items-center">
            <LayoutTitle>PowerPost</LayoutTitle>
            <LayoutSubTitle>Resume article with AI</LayoutSubTitle>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
