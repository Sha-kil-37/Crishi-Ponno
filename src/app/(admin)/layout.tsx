import Sidebar from "@/components/layout/admin/Sidebar";
import type { ReactNode } from "react";
//
interface Props {
  children: ReactNode;
}
//
export default function Layout({ children }: Props) {
  //

  //
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-1 flex-col">
        <header className="h-16 border-b px-6 flex items-center bg-[#dcebdc]">
          <h1 className="text-lg font-semibold">
            Welcome to the Crishi Ponno Admin Panel
          </h1>
        </header>

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
