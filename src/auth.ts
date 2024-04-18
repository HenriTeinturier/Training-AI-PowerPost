import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prisma } from "@/prisma";
import { stripe } from "./stripe";

export const {
  handlers,
  signIn,
  signOut,
  auth: baseAuth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    GitHub({ allowDangerousEmailAccountLinking: true }),
    Google({ allowDangerousEmailAccountLinking: true }),
  ],
  secret: process.env.AUTH_SECRET,
  events: {
    createUser: async (message) => {
      const userId = message.user.id;
      const userEmail = message.user.email;

      if (!userId || !userEmail) {
        return;
      }

      const stripeCustomer = await stripe.customers.create({
        email: userEmail,
        name: message.user.name ?? undefined,
        metadata: {
          id: userId,
        },
      });

      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          stripeCustomerId: stripeCustomer.id,
        },
      });
    },
  },
});

// session: {
//   strategy: "database",
// },
