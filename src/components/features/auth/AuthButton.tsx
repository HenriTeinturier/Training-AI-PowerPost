import { LoginButton } from "./LoginButton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/auth/helper";
import { UserDropdown } from "./UserDropdown";

export const AuthButton = async () => {
  const user = await auth();

  if (user) {
    return (
      <div className="flex gap-4">
        <UserDropdown>
          <Button variant="outline" size="sm">
            <Avatar className="size-6 mr-2">
              <AvatarFallback>
                {user.email ? user.email[0].slice(0, 2) : "??"}
              </AvatarFallback>
              {user.image && (
                <AvatarImage src={user.image} alt={user?.name || ""} />
              )}
            </Avatar>
            {user.name}
          </Button>
        </UserDropdown>
      </div>
    );
  }

  return <LoginButton />;
};
