"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { toast, Toaster } from "sonner";
import Banner from "@/components/home/Banner";
import ReduxProvider from "@/components/utils/providers/ReduxProvider";
import { ThemeProvider } from "next-themes";
import { DialogProvider } from "@/hooks/client/useDialog";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/nav/Navbar";
import Footer from "@/components/layout/Footer";
import Dialog from "@/components/utils/dialog";
import { Category } from "@/types/NavCategory";
import Feature from "@/components/home/Feature";
import Trending from "@/components/home/Tranding";
import MultiSlider from "@/components/home/MultiSlider";
import Blogs from "@/components/home/Blogs";
import Highlight from "@/components/home/Highlight";
import About from "@/components/home/About";
import Categories from "@/components/home/Categories";

//
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
export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isAuthSuccess = searchParams.get("auth") === "success";
  //
  useEffect(() => {
    if (!isAuthSuccess) {
      return;
    }
    //
    toast.success("Sign in success", {
      position: "top-center",
      // description: "Sign in success",
      action: {
        label: "✕",
        onClick: () => console.log("Undo"),
      },
    });
    //
    router.replace("/", { scroll: false });
    router.refresh();
    //
    return;
  }, [isAuthSuccess, router]);
  //

  //
  return (
    <>
      <ReduxProvider>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <DialogProvider>
            <Header />
            <Navbar categories={categories} />
            <Banner />
            <About />
            <Highlight />
            <Categories />
            <Feature />
            <Trending />
            <MultiSlider />
            <Blogs />
            <Footer />
            <Dialog />
            <Toaster />
          </DialogProvider>
        </ThemeProvider>
      </ReduxProvider>
    </>
  );
}
//
