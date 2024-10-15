import React from 'react';
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StripeCheckout } from '@/app/api/stripe/server';

const plans = [
  {
    id: "nfl-week-7",
    name: "NFL Week 7 Picks",
    price: 20,
    currency: "$",
    description: "Weekly NFL predictions",
    features: [
      "Access to basic model analytics and historical reports.",
      "Predictions for winners, O/U, and point differentials.",
    ],
    buttonText: "Let's Go",
  },
  {
    id: "nfl-season-pass",
    name: "NFL Season Pass",
    price: 280,
    currency: "$",
    description: "Full season NFL coverage",
    features: [
      "Access to all model analytics and historical reports.",
      "Predictions through the post-season.",
      "Priority access to experimental modeling for the NBA regular season.",
    ],
    buttonText: "Let's Go",
    featured: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    currency: "",
    description: "Tailored solutions for organizations",
    features: [
      "Custom models.",
      "Analytics for professional organizations.",
      "If you can dream it up, we can execute.",
    ],
    buttonText: "Contact Us",
  },
];

const PricingCard = ({ 
  plan, 
  session, 
  latestPayment 
}: { 
  plan: any; 
  session: any; 
  latestPayment: any; 
}) => {
  const isEnterprise = plan.id === "enterprise";
  const hasPurchased = latestPayment && latestPayment.amount === plan.price * 100 && latestPayment.status === 'succeeded';
  const isDisabled = hasPurchased && plan.id !== "enterprise";

  return (
    <Card className={cn(
      "h-full flex flex-col dark:bg-zinc-800 dark:border-transparent",
      plan.featured ? "shadow-lg scale-105" : "shadow-sm",
      isDisabled && "opacity-50"
    )}>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex items-baseline justify-center gap-x-2">
          <span className="text-3xl font-bold">
            {plan.currency}{plan.price}
          </span>
          {typeof plan.price === 'number' && (
            <span className="text-sm text-muted-foreground">/plan</span>
          )}
        </div>
        {!isEnterprise ? (
          <StripeCheckout
            metadata={{
              userId: session?.user?.id ?? null,
              pricingTier: plan.name,
            }}
            paymentType="one-time"
            price={typeof plan.price === 'number' ? plan.price * 100 : 0}
            className="w-full"
            tierDescription={plan.description}
          >
            <Button 
              className="w-full bg-[#4BFFBA] text-black hover:bg-[#3AEEA9]"
              disabled={isDisabled}
            >
              {isDisabled ? "Purchased" : plan.buttonText}
            </Button>
          </StripeCheckout>
        ) : (
          <Button className="w-full bg-[#4BFFBA] text-black hover:bg-[#3AEEA9]">
            {plan.buttonText}
          </Button>
        )}
        <div>
          {plan.features.map((feature: string, index: number) => (
            <div
              key={index}
              className="mb-2 grid grid-cols-[25px_1fr] items-start pb-2 last:mb-0 last:pb-0"
            >
              <Check className="h-4 w-4 text-green-500" />
              <p className="text-sm">{feature}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default function Pricing({ 
  session, 
  latestPayment 
}: { 
  session: any; 
  latestPayment: any; 
}) {
  return (
    <div className="relative isolate bg-gradient-to-bl dark:from-neutral-700 dark:to-neutral-900 w-full px-4 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-neutral-800 dark:text-neutral-100 sm:text-4xl">
            Pricing Plans
          </h2>
          <p className="mt-6 text-lg leading-8 text-neutral-600 dark:text-neutral-300">
            Choose the plan that's right for you
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard 
              key={plan.id} 
              plan={plan} 
              session={session}
              latestPayment={latestPayment}
            />
          ))}
        </div>
      </div>
    </div>
  );
}