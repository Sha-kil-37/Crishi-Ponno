"use client";
//
import { useState } from "react";
import Sidebar from "@/components/layout/admin/Sidebar";
import { Menu, X } from "lucide-react";
import Header from "@/components/layout/admin/Header";
interface AdminShellProps {
  children: React.ReactNode;
}
//
export default function AdminShell({ children }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-64 border-r bg-background
          transition-transform duration-300
          lg:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <div className="flex h-full flex-col">
          {/* Mobile close button */}
          <div className="flex h-16 items-center justify-end border-b px-4 lg:hidden">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close sidebar"
              className="rounded-md p-2 hover:bg-muted"
            >
              <X className="size-5" />
            </button>
          </div>

          <Sidebar />
        </div>
      </aside>

      {/* Main area */}
      <div className="min-h-screen lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background/95 backdrop-blur">
          <div className="flex w-full items-center gap-3 px-4 sm:px-6">
            {/* Mobile menu */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
              className="rounded-md p-2 hover:bg-muted lg:hidden"
            >
              <Menu className="size-5" />
            </button>

            <div className="min-w-0 flex-1">
              <Header />
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="w-full">
          <div className="mx-auto w-full max-w-[1920px] p-4 sm:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
