"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Banner from "@/components/home/Banner";
import { Toaster } from "sonner";
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
    // Toaster.success("Sign in success", {
    //   position: "top-center",
    //   // description: "Sign in success",
    //   action: {
    //     label: "✕",
    //     onClick: () => console.log("Undo"),
    //   },
    // });
    //
    router.replace("/", { scroll: false });
    router.refresh();
    //
    return;
  }, [isAuthSuccess, router]);
  //

  //
  return (
    <div>
      <Banner />
    </div>
  );
}
//
