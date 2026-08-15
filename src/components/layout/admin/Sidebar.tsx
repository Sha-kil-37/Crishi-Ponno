//
"use client";
import SidebarLink from "@/components/utils/admin/SidebarLink";
//
export default function Sidebar() {
  //
  return (
    <aside className="w-64 border-r bg-muted">
      <ul>
        <li className="py-2 hover:bg-gray-100 text-center">
          <SidebarLink
            href={"/admin/dashboard"}
            className="cursor-default text-[#1f7a1f] font-bold "
          >
            Dashboard
          </SidebarLink>
        </li>
        <li className="py-2 hover:bg-gray-100 text-center">
          <SidebarLink
            href={"/admin/products"}
            className="cursor-default text-[#1f7a1f] font-bold "
          >
            Manage Product
          </SidebarLink>
        </li>
        <li className="py-2 hover:bg-gray-100 text-center">
          <SidebarLink
            href={"/admin/brands"}
            className="cursor-default text-[#1f7a1f] font-bold "
          >
            Manage Brands
          </SidebarLink>
        </li>
        <li className="py-2 hover:bg-gray-100 text-center">
          <SidebarLink
            href={"/admin/categories"}
            className="cursor-default text-[#1f7a1f] font-bold "
          >
            Manage Categories
          </SidebarLink>
        </li>
        <li className="py-2 hover:bg-gray-100 text-center">
          <SidebarLink
            href={"/admin/inventory"}
            className="cursor-default text-[#1f7a1f] font-bold "
          >
            Manage Inventory
          </SidebarLink>
        </li>
        <li className="py-2 hover:bg-gray-100 text-center">
          <SidebarLink
            href={"/admin/orders"}
            className="cursor-default text-[#1f7a1f] font-bold "
          >
            Manage Orders
          </SidebarLink>
        </li>
        <li className="py-2 hover:bg-gray-100 text-center">
          <SidebarLink
            href={"/admin/suppliers"}
            className="cursor-default text-[#1f7a1f] font-bold "
          >
            Manage Suppliers
          </SidebarLink>
        </li>
      </ul>
    </aside>
  );
}
