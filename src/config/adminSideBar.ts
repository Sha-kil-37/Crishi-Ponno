// src/config/admin-sidebar.ts

import { SidebarSection } from "@/types/admin/adminSideBar";
import {
  BarChart3,
  Boxes,
  ClipboardList,
  Cog,
  CreditCard,
  FileText,
  LayoutDashboard,
  Megaphone,
  Package,
  PackageSearch,
  Receipt,
  Settings,
  ShoppingCart,
  Sparkles,
  Tags,
  Truck,
  Users,
  Warehouse,
} from "lucide-react";


export const adminSidebarConfig: SidebarSection[] = [
  {
    items: [
      {
        title: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },

  {
    title: "Catalog",
    items: [
      {
        title: "Products",
        href: "/admin/products",
        icon: Package,
      },
      {
        title: "Categories",
        href: "/admin/categories",
        icon: Tags,
      },
      {
        title: "Brands",
        href: "/admin/brands",
        icon: Boxes,
      },
      {
        title: "Units",
        href: "/admin/units",
        icon: PackageSearch,
      },
    ],
  },

  {
    title: "Orders",
    items: [
      {
        title: "All Orders",
        href: "/admin/orders",
        icon: ShoppingCart,
      },
      {
        title: "Pending",
        href: "/admin/orders/pending",
        icon: ClipboardList,
      },
      {
        title: "Processing",
        href: "/admin/orders/processing",
        icon: Receipt,
      },
      {
        title: "Shipped",
        href: "/admin/orders/shipped",
        icon: Truck,
      },
    ],
  },

  {
    title: "Inventory",
    items: [
      {
        title: "Stock",
        href: "/admin/inventory",
        icon: Warehouse,
      },
      {
        title: "Low Stock",
        href: "/admin/inventory/low-stock",
        icon: PackageSearch,
      },
    ],
  },

  {
    title: "Customers",
    items: [
      {
        title: "Customers",
        href: "/admin/customers",
        icon: Users,
      },
      {
        title: "Reviews",
        href: "/admin/reviews",
        icon: FileText,
      },
    ],
  },

  {
    title: "Marketing",
    items: [
      {
        title: "Coupons",
        href: "/admin/coupons",
        icon: CreditCard,
      },
      {
        title: "Banners",
        href: "/admin/banners",
        icon: Megaphone,
      },
    ],
  },

  {
    title: "AI Management",
    items: [
      {
        title: "AI Assistant",
        href: "/admin/ai-assistant",
        icon: Sparkles,
      },
      {
        title: "Recommendations",
        href: "/admin/ai-recommendations",
        icon: Sparkles,
      },
    ],
  },

  {
    title: "Reports",
    items: [
      {
        title: "Sales Reports",
        href: "/admin/reports/sales",
        icon: BarChart3,
      },
    ],
  },

  {
    title: "Settings",
    items: [
      {
        title: "General",
        href: "/admin/settings",
        icon: Settings,
      },
      {
        title: "Admin Settings",
        href: "/admin/settings/admin",
        icon: Cog,
      },
    ],
  },
];