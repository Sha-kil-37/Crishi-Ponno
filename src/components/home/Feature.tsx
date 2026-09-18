"use client";

import { motion } from "framer-motion";
import { Headphones, RotateCcw, ShieldCheck, Truck } from "lucide-react";

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
];

function Feature() {
  return (
    <section
      aria-labelledby="benefits-heading"
      className="border-y border-[#dcebdc] bg-[#f6fbf4] px-4 py-12 sm:px-6 lg:px-8 lg:py-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-3 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#1f7a1f]">
              Why shop with us
            </p>
            <h2
              id="benefits-heading"
              className="max-w-xl text-3xl font-semibold tracking-tight text-[#163b1b] sm:text-4xl"
            >
              Better shopping, from farm to doorstep.
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-[#55705a]">
            Thoughtful service and dependable delivery make every order easier.
          </p>
        </div>

        <div className="grid divide-y divide-[#dcebdc] rounded-2xl border border-[#dcebdc] bg-white sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-4">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;

            return (
              <motion.article
                key={benefit.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group p-6 transition-colors duration-300 hover:bg-[#fbfdf9] lg:p-7"
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
