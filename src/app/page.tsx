"use client";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import Banner from "@/components/ui/banner";
import { DialogProvider } from "@/hooks/useDialog";
import Dialog from "@/components/utils/dialog";
import { useSession } from "next-auth/react";
  

//
export default function Page() {
  //
const { data: session } = useSession()
console.log(session)
  //
  return (
    <section>
      <DialogProvider>
        <Navbar />
        <Banner />
        <Footer />
        <Dialog />
      </DialogProvider>
    </section>
  );
}
