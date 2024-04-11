import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";

export function LoginButton() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button variant="outline" type="submit" size="sm">
        Signin with GitHub
      </Button>
    </form>
  );
}
