"use client";
import React from "react";
import { IconCheck, IconPlus } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";

export enum plan {
  hobby = "hobby",
  starter = "starter",
  pro = "pro",
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
  onClick: () => void;
};

const plans: Array<Plan> = [
  {
    id: plan.hobby,
    name: "NFL Week 7 Picks",
    price: 20,
    subText: "",
    currency: "$",
    features: [
      "Access to basic model analytics and historical reports.",
      "Predictions for winners, O/U, and point differentials.",
    ],
    buttonText: "Let's Go",
    onClick: () => {
      console.log("Get Hobby");
    },
  },
  {
    id: plan.starter,
    name: "NFL Season Pass",
    price: 280,
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
    onClick: () => {
      console.log("Get Starter");
    },
  },
  {
    id: plan.pro,
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
    onClick: () => {
      console.log("Get Pro");
    },
  },
];

export function Pricing() {
  return (
    <div
      id="pricing"
      className="relative isolate bg-gradient-to-bl dark:from-neutral-700 dark:to-neutral-900 w-full px-4 py-0 sm:py-20 lg:px-4 "
    >
      <div
        className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        aria-hidden="true"
      ></div>
      <>
        <h2 className="pt-4 font-bold text-lg md:text-4xl text-center text-neutral-800 dark:text-neutral-100">
          {/* Pricing */}
        </h2>
        <p className="max-w-md mx-auto text-base text-center text-neutral-600 dark:text-neutral-300 mt-4">
          {/* Our pricing is designed for advanced people who need more features and
          more flexibility. */}
        </p>
      </>

      <div
        className={cn(
          "mx-auto grid grid-cols-1 gap-4  mt-20 ",
          "max-w-7xl mx-auto  md:grid-cols-2 xl:grid-cols-3"
        )}
      >
        {plans.map((tier, tierIdx) => {
          return <Card plan={tier} key={tier.id} onClick={tier.onClick} />;
        })}
      </div>
    </div>
  );
}

const Card = ({ plan, onClick }: { plan: Plan; onClick: () => void }) => {
  return (
    <div
      className={cn(
        "p-1 sm:p-4 md:p-4 rounded-3xl bg-gray-50 dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800"
      )}
    >
      <div className="flex flex-col gap-4 h-full justify-start">
        <div
          className={cn(
            "p-4 bg-white dark:bg-neutral-800 rounded-2xl shadow-input w-full dark:shadow-[0px_-1px_0px_0px_var(--neutral-700)]"
          )}
        >
          <div className="flex justify-between items-start ">
            <div className="flex gap-2 flex-col">
              <p
                className={cn("font-medium text-lg text-black dark:text-white")}
              >
                {plan.name}
              </p>
            </div>

            {plan.featured && (
              <div
                className={cn(
                  "font-medium text-xs px-3 py-1 rounded-full relative bg-neutral-900 dark:bg-white dark:text-black text-white"
                )}
              >
                <div className="absolute inset-x-0 bottom-0 w-3/4 mx-auto h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
                Featured
              </div>
            )}
          </div>
          <div className="mt-8 ">
            <div className="flex items-end">
              <span
                className={cn(
                  "text-lg font-bold text-neutral-500 dark:text-neutral-200"
                )}
              >
                {plan.currency}
              </span>
              <div className="flex items-start gap-2">
                <span
                  className={cn(
                    "text-3xl md:text-7xl font-bold dark:text-neutral-50 text-neutral-800"
                  )}
                >
                  {plan?.price}
                </span>
              </div>
              <span
                className={cn(
                  "text-base font-normal text-neutral-500 dark:text-neutral-200 mb-1 md:mb-2"
                )}
              >
                {plan.subText}
              </span>
            </div>
          </div>
          <Button className="w-full mt-10 bg-[#4BFFBA]" onClick={onClick}>
            {plan.buttonText}
          </Button>
        </div>
        <div className="mt-1 p-4">
          {plan.features.map((feature, idx) => (
            <Step key={idx}>{feature}</Step>
          ))}
        </div>
        {plan.additionalFeatures && plan.additionalFeatures.length > 0 && (
          <Divider />
        )}
        <div className="p-4">
          {plan.additionalFeatures?.map((feature, idx) => (
            <Step additional key={idx}>
              {feature}
            </Step>
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
