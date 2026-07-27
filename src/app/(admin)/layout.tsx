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
        <header className="h-16 border-b px-6 flex items-center">
          Admin Header
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
