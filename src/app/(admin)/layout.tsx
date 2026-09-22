import type { Metadata } from "next";
import ReduxProvider from "@/components/utils/providers/ReduxProvider";
import "../../styles/globals.css";
//
export const metadata: Metadata = {
  title: "কৃষি পন্য",
  icons:
    "https://res.cloudinary.com/dmbkgbtqj/image/upload/v1789578379/crishi-ponno/logo/imgi_42_462211619_569007435482502_1193305002520903400_n_vy90h2.jpg",
  description: "Smart agricultural sourcing platform",
};
export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {/* Admin-specific UI */}
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
