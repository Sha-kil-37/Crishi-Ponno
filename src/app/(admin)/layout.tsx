import type { ReactNode } from "react";
import Sidebar from "@/components/layout/admin/Sidebar";
//
interface Props {
  children: ReactNode;
}
//
export default function AdminLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}
