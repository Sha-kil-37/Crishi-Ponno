import "../styles/globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "কৃষি পন্য",
  icons:
    "https://res.cloudinary.com/dmbkgbtqj/image/upload/v1789578379/crishi-ponno/logo/imgi_42_462211619_569007435482502_1193305002520903400_n_vy90h2.jpg",
  description: "Smart agricultural sourcing platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
