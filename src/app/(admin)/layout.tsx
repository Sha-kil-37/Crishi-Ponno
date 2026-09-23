import type { Metadata } from "next";
import "../../styles/globals.css";
import ReduxProvider from "@/components/utils/providers/ReduxProvider";
import { ThemeProvider } from "next-themes";
import Dialog from "@/components/utils/dialog";
import { Toaster } from "sonner";
import { DialogProvider } from "@/hooks/client/useDialog";
import AdminShell from "@/components/layout/admin/AdminShell";
//
export const metadata: Metadata = {
  title: "কৃষি পন্য",
  description: "Smart agricultural sourcing platform",
  icons: {
    icon: "https://res.cloudinary.com/dmbkgbtqj/image/upload/v1789578379/crishi-ponno/logo/imgi_42_462211619_569007435482502_1193305002520903400_n_vy90h2.jpg",
  },
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <DialogProvider>
          <AdminShell>{children}</AdminShell>
          <Dialog />
          <Toaster position="top-right" richColors />
        </DialogProvider>
      </ThemeProvider>
    </ReduxProvider>
  );
}
