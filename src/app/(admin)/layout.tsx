import Sidebar from "@/components/layout/admin/Sidebar";
import type { ReactNode } from "react";
//
interface AdminLayoutProps {
  children: ReactNode;
}
//
export default function AdminLayout({ children }: AdminLayoutProps) {
  //

  //
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="h-16 border-b px-6 flex items-center bg-[#dcebdc]">
          <marquee
            behavior="alternate"
            direction="left"
            className="text-lg font-semibold"
          >
            Welcome to the Crishi Ponno  Admin Panel
          </marquee>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
