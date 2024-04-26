import { stripe } from "@/stripe";

const StripeDescription = async ({ stripeId }: { stripeId: string }) => {
  const subscription = await stripe.subscriptions.list({
    customer: stripeId,
    status: "active",
  });

  const isPremiumMember = subscription.data.length > 0;

  return (
    <div>
      {isPremiumMember
        ? "Premium Member - 40 posts added per month"
        : "Free Member - Limited posting privileges"}
    </div>
  );
};

export default StripeDescription;
