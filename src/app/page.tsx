"use client";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/nav/navbar";
import Banner from "@/components/shared/banner";
import { DialogProvider } from "@/hooks/client/useDialog";
import Dialog from "@/components/utils/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Toaster } from "@/components/utils/sonner";
import { toast } from "sonner";
import Header from "@/components/layout/header";
import { useNavboxSearch } from "@/hooks/client/useNavboxSearch";
import { Category } from "@/types/navCategory";
//
export default function Page() {
  const bannerRef = useRef<HTMLDivElement | null>(null);
  const showNavboxSearch = useNavboxSearch(bannerRef);
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
  return (
    <section>
      <DialogProvider>
        <Header />
        <Navbar categories={categories} showNavboxSearch={showNavboxSearch} />
        <Banner bannerRef={bannerRef} showNavboxSearch={showNavboxSearch} />
        <Footer />
        <Dialog />
        <Toaster />
      </DialogProvider>
    </section>
  );
}
