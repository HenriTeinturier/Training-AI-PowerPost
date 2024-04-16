"use server";

import { requiredAuth } from "@/auth/helper";
import { getServerUrl } from "@/getServerUrl";
import { stripe } from "@/stripe";

export const managePlanAction = async () => {
  const user = await requiredAuth();

  const stripeCustomerId = user?.stripeCustomerId;

  if (!stripeCustomerId) {
    throw new Error("User has no stripe customer id");
  }

  const returnUrl = `${getServerUrl()}/dashboard`;

  const stripeSession = await stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: returnUrl,
  });

  if (!stripeSession.url) {
    throw new Error("Stripe session has no url");
  }

  return stripeSession.url;
};
