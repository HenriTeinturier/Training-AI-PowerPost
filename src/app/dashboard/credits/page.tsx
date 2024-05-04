import { requiredAuth } from "@/auth/helper";
import { SubmitButton } from "@/components/features/SubmitButton";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/features/layout/Layout";
import { buttonVariants } from "@/components/ui/button";
import { getServerUrl } from "@/getServerUrl";
import { stripe } from "@/stripe";
import { Check } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface PricingSectionProps {
  searchParams?: {
    alreadySubscribed?: "true";
    [key: string]: string | undefined;
  };
}

const PricingSection = async ({ searchParams }: PricingSectionProps) => {
  const user = await requiredAuth();

  if (!user) {
    redirect("/");
  }

  return (
    <>
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Pay what you use</LayoutTitle>
          <LayoutDescription>
            We use a simple token system to pay for your usage.
          </LayoutDescription>
        </LayoutHeader>
        <LayoutContent>
          <div className="flex flex-col lg:flex-row  gap-4 lg:gap-10 mt-4">
            {/* <!-- Pricing Card PACK --> */}
            <div className="flex flex-col p-6 mx-auto max-w-md w-full text-center bg-card rounded-lg border border-bg-card shadow  xl:p-8 t">
              <h3 className="mb-4 text-2xl font-semibold">Pack</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                {" add 15 Powerpost to your account."}
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">$5</span>
                <span className="text-gray-500 dark:text-gray-400">
                  one-time
                </span>
              </div>
              {/* <!-- List --> */}
              <ul
                role="list"
                className="mb-8 space-y-4 text-left  flex flex-col flex-grow"
              >
                <li className="flex items-center space-x-3">
                  <Check className="text-green-500" size={16} />

                  <span>15 Powerpost</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="text-green-500" size={16} />

                  <span>openai GPT 4</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="text-green-500" size={16} />

                  <span>AI Chat for every post</span>
                </li>
              </ul>
              <form>
                <SubmitButton
                  formAction={async () => {
                    "use server";

                    if (!user.stripeCustomerId) {
                      throw new Error("No stripe customer id");
                    }

                    const stripeSession = await stripe.checkout.sessions.create(
                      {
                        customer: user.stripeCustomerId,
                        mode: "payment",
                        payment_method_types: ["card", "link"],
                        allow_promotion_codes: true,
                        line_items: [
                          {
                            quantity: 1,
                            price:
                              process.env.MODE_ENV === "development"
                                ? process.env.STRIPE_PACK_PRICE_ID_DEV
                                : process.env.STRIPE_PACK_PRICE_ID_PROD,
                          },
                        ],
                        success_url: `${getServerUrl()}/dashboard?success=true&pack=true`,
                        cancel_url: `${getServerUrl()}/dashboard?canceled=true`,
                      }
                    );

                    if (!stripeSession.url) {
                      throw new Error("No stripe session");
                    }
                    await revalidatePath("/dashboard");
                    // revalidatePath("/dashboard/posts");
                    redirect(stripeSession.url);
                  }}
                  className={buttonVariants({ variant: "default" })}
                >
                  Get started
                </SubmitButton>
              </form>
            </div>
            {/* <!-- Pricing Card PREMIUM--> */}
            <div className="flex flex-col p-6 mx-auto max-w-md w-full text-center bg-card rounded-lg border border-bg-card shadow  xl:p-8 t">
              <h3 className="mb-4 text-2xl font-semibold">Premium</h3>
              <p className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
                get 40 powerpost every months.
              </p>
              <div className="flex justify-center items-baseline my-8">
                <span className="mr-2 text-5xl font-extrabold">$9</span>
                <span className="text-gray-500 dark:text-gray-400">/month</span>
              </div>
              {/* <!-- List --> */}
              <ul
                role="list"
                className="mb-8 space-y-4 text-left  flex flex-col flex-grow"
              >
                <li className="flex items-center space-x-3">
                  <Check className="text-green-500" size={16} />

                  <span>40 powerpost</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="text-green-500" size={16} />

                  <span>openai GPT 4</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Check className="text-green-500" size={16} />

                  <span>AI Chat for every post</span>
                </li>
              </ul>
              <form>
                <SubmitButton
                  formAction={async () => {
                    "use server";

                    if (!user.stripeCustomerId) {
                      throw new Error("No stripe customer id");
                    }

                    const userSubscription = await stripe.subscriptions.list({
                      customer: user.stripeCustomerId,
                      status: "active",
                    });

                    if (userSubscription.data.length > 0) {
                      redirect("/dashboard/credits?alreadySubscribed=true");
                      // throw new Error("You already have a subscription");
                    }

                    const stripeSession = await stripe.checkout.sessions.create(
                      {
                        customer: user.stripeCustomerId,
                        mode: "subscription",
                        payment_method_types: ["card", "link"],
                        allow_promotion_codes: true,
                        line_items: [
                          {
                            quantity: 1,
                            price:
                              process.env.MODE_ENV === "development"
                                ? process.env.STRIPE_PREMIUM_PRICE_ID_DEV
                                : process.env.STRIPE_PREMIUM_PRICE_ID_PROD,
                          },
                        ],
                        success_url: `${getServerUrl()}/dashboard?success=true&premium=true`,
                        cancel_url: `${getServerUrl()}/dashboard?canceled=true`,
                      }
                    );

                    if (!stripeSession.url) {
                      throw new Error("No stripe session");
                    }

                    await revalidatePath("/dashboard");
                    redirect(stripeSession.url);
                  }}
                  className={buttonVariants({ variant: "default" })}
                >
                  Get started
                </SubmitButton>
              </form>
              {searchParams?.alreadySubscribed === "true" ? (
                <div className="m-2 font-bold italic">
                  ✅ Vous êtes déjà abonné
                </div>
              ) : null}
            </div>
          </div>
        </LayoutContent>
      </Layout>
    </>
  );
};

export default PricingSection;
