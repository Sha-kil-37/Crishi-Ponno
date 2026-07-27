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
          <SidebarLink href={"/admin/products"} className="cursor-default">
            Manage Product
          </SidebarLink>
        </li>
        <li className="py-2 hover:bg-gray-100 text-center">
          <SidebarLink href={"/admin/orders"} className="cursor-default">
            Manage Orders
          </SidebarLink>
        </li>
        <li className="py-2 hover:bg-gray-100 text-center">
          <SidebarLink href={"/admin/suppliers"} className="cursor-default">
            Manage Suppliers
          </SidebarLink>
        </li>
      </ul>
    </aside>
  );
}
