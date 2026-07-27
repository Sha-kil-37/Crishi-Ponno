"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
//
interface SideBarLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

//

export default function SidebarLink({
  href,
  children,
  className,
}: SideBarLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  if (isActive) {
    return <span className={`${className}`}>{children}</span>;
  }

  return <Link href={href}>{children}</Link>;
}
