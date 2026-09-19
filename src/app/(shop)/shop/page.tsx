"use client";
import Footer from "@/components/layout/Footer";
//
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/nav/Navbar";
import Products from "@/components/shop/Products";
import Dialog from "@/components/utils/dialog";
import { Toaster } from "@/components/utils/sonner";
import { DialogProvider } from "@/hooks/client/useDialog";
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
      {
        title: "Organic",
        items: ["Organic Potato", "Organic Tomato"],
      },
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
      {
        title: "Organic Fruits",
        items: ["Papaya", "Lemon"],
      },
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
      {
        title: "General equipment",
        items: ["Hoe"],
      },
    ],
  },
];
//
function Page() {
  //
  return (
    <DialogProvider>
      <Header />
      <Navbar categories={categories} />
      <Products />
      <Dialog />
      <Toaster />
      <Footer />
    </DialogProvider>
  );
}

export default Page;
