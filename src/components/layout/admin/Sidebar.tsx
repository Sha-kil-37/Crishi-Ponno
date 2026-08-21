
"use client";

import Link from "next/link";
import { adminSidebarConfig } from "@/config/adminSideBar";
import SideBarItem from "@/components/utils/admin/SideBarItem";

//
export default function Sidebar() {
  return (
    <aside className="hidden h-screen w-64 shrink-0 border-r bg-background lg:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center border-b px-6">
          <Link href="/admin" className="text-xl font-bold">
            Crishi Ponno
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <div className="space-y-6">
            {adminSidebarConfig.map((section, index) => (
              <div key={section.title ?? index}>
                {section.title && (
                  <h3 className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {section.title}
                  </h3>
                )}

                <div className="space-y-1">
                  {section.items.map((item) => (
                    <SideBarItem key={item.title} item={item} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}
