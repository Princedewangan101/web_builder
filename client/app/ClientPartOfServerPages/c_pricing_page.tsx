'use client'

import { Button } from "@/components/ui/button";
import { ClientPartOfPricingPageButtonProps } from "@/types";

const ClientPartOfPricingPage_Button = ({planId} : ClientPartOfPricingPageButtonProps ) => {
  const plans = [
    {
      id: "starter",
      name: "Starter",
      price: "$7",
      credits: 150,
      description:
        "Perfect for individuals exploring creative tools for the first time.",
      features: [
        "Up to 30 Generations",
        "Access to Core Templates",
        "Essential AI Models",
        "Email-only Support",
        "Basic Performance Insights",
      ],
    },
    {
      id: "growth",
      name: "Growth",
      price: "$25",
      credits: 600,
      description:
        "Designed for growing creators who need more flexibility and power.",
      features: [
        "Up to 120 Generations",
        "Custom Template Builder",
        "Pro AI Models",
        "Priority Email Support",
        "Detailed Performance Reports",
      ],
    },
    {
      id: "ultimate",
      name: "Ultimate",
      price: "$79",
      credits: 1600,
      description:
        "Built for teams and businesses requiring maximum output and reliability.",
      features: [
        "Up to 350 Generations",
        "Team Collaboration Tools",
        "Premium AI Models",
        "24/7 Chat + Email Support",
        "Full Analytics Suite",
      ],
    },
  ];

  const handlePurchase = async (planId: string) => {
    console.log("Selected plan:", planId);
    // You can add your API POST request here
    // await fetch("/api/checkout", { method: "POST", body: JSON.stringify({ planId }) });
  };

  return (
    <>
      <Button
        onClick={() => handlePurchase(planId)}
        className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 active:scale-95 text-sm rounded-md transition-all"
      >
        Buy Now
      </Button>
    </>
  );
};

export default ClientPartOfPricingPage_Button;
