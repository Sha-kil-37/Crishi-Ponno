"use client";
//
import { motion } from "framer-motion";
import { Category } from "@/types/NavCategory";
import CategorySidebar from "./CategorySidebar";
import CategoryContent from "./CategoryContent";

interface NavCategoryMenuProps {
  categories: Category[];
}
//
export default function NavCategoryMenu({ categories }: NavCategoryMenuProps) {
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
      className="absolute left-0 top-full w-full bg-gray-200"
    >
      <div className="w-7xl mx-auto grid grid-cols-[260px_1fr]">
        <CategorySidebar categories={categories} />
        <CategoryContent />
      </div>
    </motion.div>
  );
}
