"use client";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import Banner from "@/components/shared/banner";
import { DialogProvider } from "@/hooks/useDialog";
import Dialog from "@/components/utils/dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Toaster } from "@/components/utils/sonner";
import { toast } from "sonner";
import Header from "@/components/layout/header";

//
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
  return (
    <section>
      <DialogProvider>
        <Header />
        <Navbar />
        <Banner />
        <Footer />
        <Dialog />
        <Toaster />
      </DialogProvider>
    </section>
  );
}
