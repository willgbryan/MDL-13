import React from "react";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { StripeCheckout } from "@/app/api/stripe/server";
import { getStripeCustomerId, getUserPaymentStatus } from "@/app/_actions/stripe";
import Stripe from "stripe";

export enum plan {
  weekly = "weekly",
  season = "season",
  enterprise = "enterprise",
}

export type Plan = {
  id: string;
  name: string;
  price: number | string;
  subText?: string;
  currency: string;
  features: string[];
  featured?: boolean;
  buttonText?: string;
  additionalFeatures?: string[];
  paymentType: "one-time" | "subscription";
};

type PaymentStatus = {
  id: string;
  amount: number;
  currency: string;
  status: Stripe.Charge.Status;
  created: string;
  description: string | null;
  metadata: Stripe.Metadata;
} | null;

type PricingProps = {
  session: any;
  latestPayment: PaymentStatus;
};

const plans: Array<Plan> = [
  {
    id: plan.weekly,
    name: "NFL Week 7 Picks",
    price: 2000,
    subText: "",
    currency: "$",
    features: [
      "Access to basic model analytics and historical reports.",
      "Predictions for winners, O/U, and point differentials.",
    ],
    buttonText: "Let's Go",
    paymentType: "one-time",
  },
  {
    id: plan.season,
    name: "NFL Season Pass",
    price: 28000,
    subText: "",
    currency: "$",
    featured: true,
    features: [
      "Access to all model analytics and historical reports.",
      "Predictions through the post-season.",
      "Priority access to experimental modeling for the NBA regular season.",
    ],
    buttonText: "Let's Go",
    additionalFeatures: ["All week by week purchase features"],
    paymentType: "one-time",
  },
  {
    id: plan.enterprise,
    name: "Enterprise",
    price: "Custom",
    subText: "",
    currency: "",
    features: [
      "Custom models.",
      "Analytics for professional organizations.",
      "If you can dream it up, we can execute."
    ],
    additionalFeatures: [],
    buttonText: "Contact Us",
    paymentType: "subscription",
  },
];

export async function Pricing({ session, latestPayment }: PricingProps) {
  let stripeCustomerId: string | undefined | null;

  if (session?.user?.id) {
    stripeCustomerId = await getStripeCustomerId(session.user.id);
    if (stripeCustomerId) {
      latestPayment = await getUserPaymentStatus(stripeCustomerId);
    }
  }

  return (
    <div id="pricing" className="relative isolate bg-gradient-to-bl dark:from-neutral-700 dark:to-neutral-900 w-full px-4 py-0 sm:py-20 lg:px-4">
      <div className="mx-auto grid grid-cols-1 gap-4 mt-20 max-w-7xl mx-auto md:grid-cols-2 xl:grid-cols-3">
        {plans.map((tier) => (
          <Card key={tier.id} plan={tier} session={session} latestPayment={latestPayment} stripeCustomerId={stripeCustomerId} />
        ))}
      </div>
    </div>
  );
}

type CardProps = {
  plan: Plan;
  session: any;
  latestPayment: PaymentStatus;
  stripeCustomerId: string | null | undefined;
};

const Card: React.FC<CardProps> = ({ plan, session, latestPayment, stripeCustomerId }) => {
  return (
    <div className={cn("p-1 sm:p-4 md:p-4 rounded-3xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800")}>
      <div className="flex flex-col gap-4 h-full justify-start">
        <div className={cn("p-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-input w-full dark:shadow-[0px_-1px_0px_0px_var(--neutral-700)]")}>
          <div className="flex justify-between items-start">
            <div className="flex gap-2 flex-col">
              <p className={cn("font-medium text-lg text-black dark:text-white")}>{plan.name}</p>
            </div>
            {plan.featured && (
              <div className={cn("font-medium text-xs px-3 py-1 rounded-full relative bg-neutral-900 dark:bg-white dark:text-black text-white")}>
                Featured
              </div>
            )}
          </div>
          <div className="mt-8">
            <div className="flex items-end">
              <span className={cn("text-lg font-bold text-neutral-500 dark:text-neutral-200")}>{plan.currency}</span>
              <div className="flex items-start gap-2">
                <span className={cn("text-3xl md:text-7xl font-bold dark:text-neutral-50 text-neutral-800")}>
                  {typeof plan.price === 'number' ? (plan.price / 100).toFixed(2) : plan.price}
                </span>
              </div>
              <span className={cn("text-base font-normal text-neutral-500 dark:text-neutral-200 mb-1 md:mb-2")}>{plan.subText}</span>
            </div>
          </div>
          {plan.id !== "enterprise" ? (
            <StripeCheckout
              metadata={{
                userId: session?.user?.id ?? null,
                stripeCustomerId: stripeCustomerId ?? null,
                pricingTier: plan.id,
              }}
              paymentType={plan.paymentType}
              price={typeof plan.price === 'number' ? plan.price : 0}
              className="w-full"
              tierDescription={plan.name}
            >
              <Button className="w-full mt-10 bg-[#4BFFBA]">
                {plan.buttonText}
              </Button>
            </StripeCheckout>
          ) : (
            <Button className="w-full mt-10 bg-[#4BFFBA]">
              <a href="/contact">Contact Us</a>
            </Button>
          )}
        </div>
        <div className="mt-1 p-4">
          {plan.features.map((feature, idx) => (
            <Step key={idx}>{feature}</Step>
          ))}
        </div>
        {plan.additionalFeatures && plan.additionalFeatures.length > 0 && <Divider />}
        <div className="p-4">
          {plan.additionalFeatures?.map((feature, idx) => (
            <Step additional key={idx}>{feature}</Step>
          ))}
        </div>
      </div>
    </div>
  );
};

const Step = ({
  children,
  additional,
}: {
  children: React.ReactNode;
  additional?: boolean;
  featured?: boolean;
}) => {
  return (
    <div className="flex items-start justify-start gap-2 my-4">
      <div
        className={cn(
          "h-4 w-4 rounded-full bg-neutral-700 flex items-center justify-center flex-shrink-0 mt-0.5",
          additional ? "bg-[#4BFFBA]" : "bg-neutral-700"
        )}
      >
        <IconCheck className="h-3 w-3 [stroke-width:4px] text-neutral-300" />
      </div>
      <div className={cn("font-medium text-black text-sm dark:text-white")}>
        {children}
      </div>
    </div>
  );
};

const Divider = () => {
  return (
    <div className="relative">
      <div className={cn("w-full h-px dark:bg-neutral-950 bg-white")} />
      <div className={cn("w-full h-px bg-neutral-200 dark:bg-neutral-800")} />
      <div
        className={cn(
          "absolute inset-0 h-5 w-5 m-auto rounded-xl dark:bg-neutral-800 bg-white shadow-[0px_-1px_0px_0px_var(--neutral-200)] dark:shadow-[0px_-1px_0px_0px_var(--neutral-700)] flex items-center justify-center"
        )}
      >
        <IconPlus
          className={cn(
            "h-3 w-3 [stroke-width:4px] dark:text-neutral-300 text-black"
          )}
        />
      </div>
    </div>
  );
};