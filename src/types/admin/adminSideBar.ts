
import type { LucideIcon } from "lucide-react";

export interface SidebarItem {
  title: string;
  href?: string;
  icon: LucideIcon;
  children?: SidebarItem[];
  permission?: string;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}