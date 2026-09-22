import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/nav/Navbar";
import { Category } from "@/types/NavCategory";

const categories: Category[] = [
  {
    id: "vegetables",
    title: "Vegetables",
    children: [
      {
        title: "Fresh Vegetables",
        items: ["Potato", "Tomato", "Onion", "Brinjal", "Carrot"],
      },
      { title: "Organic", items: ["Organic Potato", "Organic Tomato"] },
    ],
  },
  {
    id: "fruits",
    title: "Fruits",
    children: [
      {
        title: "Fresh Fruits",
        items: ["Apple", "Jack Fruit", "Banana", "Pine Apple", "Mango"],
      },
      { title: "Organic Fruits", items: ["Papaya", "Lemon"] },
    ],
  },
  {
    id: "tress",
    title: "Tress",
    children: [
      {
        title: "Seedlings grown from seeds",
        items: ["Oak", "Maple", "Birch", "Willow", "Cherry Blossom"],
      },
      {
        title: "Seedlings produced by grafting method",
        items: ["Banyan", "Mango", "Eucalyptus"],
      },
    ],
  },
  {
    id: "agricultural equipment",
    title: "Agricultural Equipment",
    children: [
      {
        title: "Heavy equipment",
        items: ["Tractor", "Crawler Tractor", "Plow", "Rotavator"],
      },
      { title: "General equipment", items: ["Hoe"] },
    ],
  },
];
//
interface Props {
  children: ReactNode;
}
//
export default function ShopLayout({ children }: Props) {
  return (
    <>
      <main>{children}</main>
    </>
  );
}
