"use client";

import { motion } from "framer-motion";
//
export default function OrderProtection() {
  //
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 8,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 8,
      }}
      transition={{
        duration: 0.2,
      }}
      className="absolute left-0 top-full  w-full bg-gray-200"
    >
      <div className="w-7xl mx-auto">
        <h2 className="text-center">Order Protection</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Animi,
          voluptate expedita repellendus consequatur odit reprehenderit fugit
          ducimus maiores porro necessitatibus, labore, ipsam quos? Expedita
          enim debitis similique doloremque voluptatum sed!
        </p>
      </div>
    </motion.div>
  );
}
