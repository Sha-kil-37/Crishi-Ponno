// //
// "use client";
// import SidebarLink from "@/components/utils/admin/SidebarLink";
// //
// export default function Sidebar() {
//   //
//   return (
//     <aside className="w-64 border-r bg-muted">
//       <ul>
//         <li className="py-2 hover:bg-gray-100 text-center">
//           <SidebarLink
//             href={"/admin/dashboard"}
//             className="cursor-default text-[#1f7a1f] font-bold "
//           >
//             Dashboard
//           </SidebarLink>
//         </li>
//         <li className="py-2 hover:bg-gray-100 text-center">
//           <SidebarLink
//             href={"/admin/products"}
//             className="cursor-default text-[#1f7a1f] font-bold "
//           >
//             Manage Product
//           </SidebarLink>
//         </li>
//         <li className="py-2 hover:bg-gray-100 text-center">
//           <SidebarLink
//             href={"/admin/brands"}
//             className="cursor-default text-[#1f7a1f] font-bold "
//           >
//             Manage Brands
//           </SidebarLink>
//         </li>
//         <li className="py-2 hover:bg-gray-100 text-center">
//           <SidebarLink
//             href={"/admin/categories"}
//             className="cursor-default text-[#1f7a1f] font-bold "
//           >
//             Manage Categories
//           </SidebarLink>
//         </li>
//         <li className="py-2 hover:bg-gray-100 text-center">
//           <SidebarLink
//             href={"/admin/inventory"}
//             className="cursor-default text-[#1f7a1f] font-bold "
//           >
//             Manage Inventory
//           </SidebarLink>
//         </li>
//         <li className="py-2 hover:bg-gray-100 text-center">
//           <SidebarLink
//             href={"/admin/orders"}
//             className="cursor-default text-[#1f7a1f] font-bold "
//           >
//             Manage Orders
//           </SidebarLink>
//         </li>
//         <li className="py-2 hover:bg-gray-100 text-center">
//           <SidebarLink
//             href={"/admin/suppliers"}
//             className="cursor-default text-[#1f7a1f] font-bold "
//           >
//             Manage Suppliers
//           </SidebarLink>
//         </li>
//       </ul>
//     </aside>
//   );
// }
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
