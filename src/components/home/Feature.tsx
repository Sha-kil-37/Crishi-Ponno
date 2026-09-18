"use client";

import { motion } from "framer-motion";
import {
  Headphones,
  HeartPlus,
  RotateCcw,
  ShieldCheck,
  Sparkle,
  Truck,
} from "lucide-react";

const benefits = [
  {
    icon: Truck,
    title: "Fast delivery",
    description: "Fresh essentials delivered to your door on time.",
    accent: "bg-[#e7f4e5] text-[#1f7a1f]",
  },
  {
    icon: ShieldCheck,
    title: "Trusted quality",
    description: "Every product is checked before it reaches you.",
    accent: "bg-[#fff3d9] text-[#b87300]",
  },
  {
    icon: RotateCcw,
    title: "Easy returns",
    description: "Not satisfied? We make returns simple and fair.",
    accent: "bg-[#e8f1f6] text-[#17648a]",
  },
  {
    icon: Headphones,
    title: "Friendly support",
    description: "Our team is ready to help whenever you need us.",
    accent: "bg-[#f4eaf7] text-[#82439a]",
  },
  {
    icon: HeartPlus,
    title: "Organic Products",
    description: "You can get Organic Product with 100% guarantee",
    accent: "bg-[#A5D6A7] text-black",
  },
  {
    icon: Sparkle,
    title: "AI Asst Shopping",
    description: "Easy Shopping with AI Assist",
    accent: "bg-[#F1F0E9] text-black",
  },
];

function Feature() {
  //
  return (
    <section
      aria-labelledby="benefits-heading"
      className="py-12"
    >
      <div className="w-full">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between w-7xl mx-auto">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#1f7a1f]">
              Why shop with us
            </p>
            <h2
              id="benefits-heading"
              className="max-w-xl text-3xl font-bold tracking-tight text-[#163b1b] sm:text-4xl"
            >
              Better shopping, from farm to doorstep.
            </h2>
          </div>
          <p className="max-w-sm">
            Thoughtful service and dependable delivery make every order easier.
          </p>
        </div>

        <div className="grid divide-y divide-[#dcebdc]  border border-[#dcebdc]  sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group p-6 transition-colors duration-300 hover:bg-[#F5F5F5] lg:p-7"
              >
                <div
                  className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${benefit.accent}`}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>
                <h3 className="text-lg font-semibold text-[#163b1b]">
                  {benefit.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-[#55705a]">
                  {benefit.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Feature;
