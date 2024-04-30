import type { User } from "@prisma/client";
import { AuthError } from "next-auth";
import { baseAuth } from "@/auth";
import { redirect } from "next/navigation";

export const auth = async () => {
  const session = await baseAuth();

  if (session?.user) {
    const user = session.user as User;
    return user;
  }

  return null;
};

export const requiredAuth = async () => {
  "use server";
  const user = await auth();

  if (!user) {
    redirect("/");
    throw new AuthError("You must be authenticated to access this resource.");
  }

  return user;
};
