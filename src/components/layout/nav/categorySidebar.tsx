"use client";
import { Category } from "@/types/navCategory";
import { useState } from "react";

interface CategorySidebarProps {
  categories: Category[];
}
//
export default function CategorySidebar({ categories }: CategorySidebarProps) {
  //
  const [activeId, setActiveId] = useState(categories[0].id);
  // console.log(categories);

  //
  return (
    <div>
      {categories.map((category) => (
        <div
          key={category.id}
          onMouseEnter={() => setActiveId(category.id)}
          className={`
        flex
        items-center
        gap-3
        px-5
        py-4
        cursor-pointer

        ${activeId === category.id ? "bg-gray-100" : ""}

    `}
        >
          {category.title}
        </div>
      ))}
    </div>
  );
}
