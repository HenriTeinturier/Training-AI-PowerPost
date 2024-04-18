import { prisma } from "@/prisma";
import { stripe } from "@/stripe";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature") || "";

  let event: Stripe.Event | undefined;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.MODE_ENV === "development"
        ? process.env.STRIPE_WEBHOOK_SECRET_DEV || ""
        : process.env.STRIPE_WEBHOOK_SECRET_PROD || ""
    );
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook Secret Error` },
      { status: 400 }
    );
  }

  if (
    // event.type === "invoice.paid" ||
    event.type === "payment_intent.succeeded"
  ) {
    const paymentInformation = event.data.object as Stripe.PaymentIntent;
    const packAmount = 500;
    const premiumAmount = 900;
    const paymentType =
      paymentInformation?.amount === packAmount
        ? "pack"
        : paymentInformation?.amount === premiumAmount
        ? "premium"
        : undefined;

    const customerId = event.data.object.customer as string;

    if (!paymentType) {
      return NextResponse.json(
        { error: `Payment type not found` },
        { status: 404 }
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        stripeCustomerId: customerId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: `User not found` }, { status: 404 });
    }

    if (paymentType === "premium") {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          credits: {
            increment: 40,
          },
        },
      });
    } else if (paymentType === "pack") {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          credits: {
            increment: 15,
          },
        },
      });
    }
  }

  return NextResponse.json({ received: true });
};
