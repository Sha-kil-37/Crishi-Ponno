import { SidebarSection } from "@/types/admin/adminSideBar";
import {
  ClipboardList,
  Cog,
  LayoutDashboard,
  Megaphone,
  ClipboardMinus,
  PackageSearch,
  Settings,
  ShoppingCart,
  Sparkles,
  Tags,
  Truck,
  Users,
  Warehouse,
  Ribbon,
  UserStar,
  RefreshCcw,
  AppWindow,
  Puzzle,
  HandHelping,
  BadgeCheck,
  ChartNoAxesCombined,
  ToolCase,
  Plus,
  SquarePen,
  Trash,
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
        icon: ToolCase,
        children: [
          {
            title: "Add Product",
            href: "/admin/products/create",
            icon: Plus,
          },
          {
            title: "Update Product",
            href: "/admin/products/update",
            icon: SquarePen,
          },
          {
            title: "Delete Product",
            href: "/admin/products/delete",
            icon: Trash,
          },
        ],
      },
      {
        title: "Categories",
        href: "/admin/categories",
        icon: Tags,
        children: [
          {
            title: "Add Category",
            href: "/admin/categories/create",
            icon: Plus,
          },
          {
            title: "Update Category",
            href: "/admin/categories/update",
            icon: SquarePen,
          },
          {
            title: "Delete Category",
            href: "/admin/categories/delete",
            icon: Trash,
          },
        ],
      },
      {
        title: "Brands",
        href: "/admin/brands",
        icon: Ribbon,
        children: [
          {
            title: "Add Brand",
            href: "/admin/brands/create",
            icon: Plus,
          },
          {
            title: "Update Brand",
            href: "/admin/brands/update",
            icon: SquarePen,
          },
          {
            title: "Delete Brand",
            href: "/admin/brands/delete",
            icon: Trash,
          },
        ],
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
        icon: RefreshCcw,
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
        icon: UserStar,
      },
    ],
  },

  {
    title: "Marketing",
    items: [
      {
        title: "Coupons",
        href: "/admin/coupons",
        icon: Puzzle,
      },
      {
        title: "Banners",
        href: "/admin/banners",
        icon: AppWindow,
      },
      {
        title: "Affiliates",
        href: "/admin/affiliates",
        icon: Megaphone,
      },
      {
        title: "Promotions",
        href: "/admin/promotions",
        icon: HandHelping,
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
        icon: BadgeCheck,
      },
      {
        title: "Analytics",
        href: "/admin/ai-analytics",
        icon: ChartNoAxesCombined,
      },
    ],
  },

  {
    title: "Reports",
    items: [
      {
        title: "Sales Reports",
        href: "/admin/reports/sales",
        icon: ClipboardMinus,
      },
      {
        title: "Product Reports",
        href: "/admin/reports/products",
        icon: ClipboardMinus,
      },
      {
        title: "Customer Reports",
        href: "/admin/reports/customers",
        icon: ClipboardMinus,
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
