//
"use client";
import { MapPin, PhoneCall } from "lucide-react";
import Link from "next/link";

function Header() {
  return (
    <aside className="py-2 border-b border-[#dcebdc]">
      <div className=" flex items-center justify-between w-7xl mx-auto">
        <div className="flex items-center gap-x-4">
          <Link href={""}>Newest Blogs</Link>
          <Link href={""}>Pre Order</Link>
        </div>
        <div className="flex gap-x-4 justify-center items-center">
          <p>✨ AI-Powered Search</p>
          <p>🤖 AI Shopping Assistant</p>
        </div>
        <div className="flex items-center gap-x-4">
          <div className="flex justify-between items-center gap-x-2">
            <PhoneCall />
            <span>01581-049601</span>
          </div>
          <div className="flex justify-between items-center gap-x-2">
            <MapPin />
            <span>location</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Header;
