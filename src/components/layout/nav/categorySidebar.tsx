"use client";
import { Category } from "@/types/navCategory";
import { useState } from "react";

interface CategorySidebarProps {
  categories: Category[];
}
//
export default function CategorySidebar({ categories }: CategorySidebarProps) {
  //
  const [activeId, setActiveId] = useState("string");
  const [isForYouCategory, setIsForYouCategory] = useState(true);

  //
  return (
    <aside className="">
      <ul>
        <li
          onClick={() => {
            setActiveId("");
            setIsForYouCategory(!isForYouCategory);
          }}
          className={`cursor-pointer py-2 px-4 relative hover:bg-[#f6fbf4] ${isForYouCategory ? "bg-[#f6fbf4] before:absolute before:left-0 before:top-0 before:h-full before:w-1  before:bg-[#1f7a1f]" : null}`}
        >
          Categories for you
        </li>
        {categories.map((category, i) => (
          <li
            key={i}
            onClick={() => {
              setActiveId(category.id);
              setIsForYouCategory(false);
            }}
            className={`cursor-pointer py-2 px-4 ${activeId === category.id ? "bg-[#f6fbf4] relative before:absolute before:left-0 before:top-0 before:h-full before:w-1  before:bg-[#1f7a1f]" : "hover:bg-[#f6fbf4]"}

    `}
          >
            {category.title}
          </li>
        ))}
      </ul>
    </aside>
  );
}
