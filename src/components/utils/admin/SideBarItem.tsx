//
"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import type { SidebarItem as SidebarItem } from "@/types/admin/adminSideBar";

interface SidebarItemProps {
  item: SidebarItem;
  level?: number;
}

export default function SidebarItem({ item, level = 0 }: SidebarItemProps) {
  const pathname = usePathname();
  const hasChildren = Boolean(item.children && item.children.length > 0);

  const isChildActive = item.children?.some(
    (child) =>
      child.href &&
      (pathname === child.href || pathname.startsWith(`${child.href}/`)),
  );
  const [open, setOpen] = useState(Boolean(isChildActive));
  const isActive =
    item.href === "/admin"
      ? pathname === "/admin"
      : Boolean(
          item.href &&
          (pathname === item.href || pathname.startsWith(`${item.href}/`)),
        );

  useEffect(() => {
    if (isChildActive) {
      setOpen(true);
    }
  }, [isChildActive]);

  const Icon = item.icon;

  if (hasChildren) {
    return (
      <div>
        <button
          type="button"
          onClick={() => setOpen((previous) => !previous)}
          aria-expanded={open}
          className={`
            flex w-full items-center justify-between rounded-lg
            px-3 py-2.5 text-sm font-medium
            transition-colors
            hover:bg-muted
            ${isChildActive ? "bg-muted text-foreground" : "text-muted-foreground"}
          `}
        >
          <span className="flex items-center gap-3">
            <Icon className="size-5" />

            <span>{item.title}</span>
          </span>

          <ChevronDown
            className={`
              size-4 transition-transform
              ${open ? "rotate-180" : ""}
            `}
          />
        </button>

        {open && (
          <div className="ml-5 mt-1 space-y-1 border-l pl-3">
            {item.children?.map((child) => (
              <SidebarItem key={child.title} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  }
  //
  return (
    <Link
      href={item.href ?? "#"}
      aria-current={isActive ? "page" : undefined}
      className={`
        flex items-center gap-3 rounded-lg
        px-3 py-2.5 text-sm font-medium
        transition-colors
        ${
          isActive
            ? "bg-primary text-primary-foreground"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }
      `}
    >
      <Icon className="size-5" />

      <span>{item.title}</span>
    </Link>
  );
}
