// src/app/(admin)/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin | Crishi-Ponno",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main>{children}</main>;
}
