"use client";
//
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useDialog } from "@/hooks/useDialog";
import GoogleButton from "../utils/googleButton";
import {
  ShoppingBag,
  ShieldPlus,
  Zap,
  ClipboardClock,
  ShoppingCart,
  User,
  Menu,
  MoonStar,
  Sun,
} from "lucide-react";
//
//
export default function Navbar() {
  //
  const { openDialog } = useDialog();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  //
  const handleOpenSignIn = () => {
    openDialog({
      //
      children: (
        <div>
          <div className="flex items-center gap-x-4">
            <ShoppingBag size={30} />
            <h2 className="font-bold text-2xl text-[#1f7a1f]">কৃষি পন্য</h2>
          </div>
          <p className="mt-2 mb-5 text-xl">
            Sign in to manage your orders, wishlist, and shopping cart.
          </p>
          <GoogleButton />
          <ul className="flex justify-center gap-x-4 items-center mt-5">
            <li className="flex items-center gap-x-2">
              <ShieldPlus size={20} />
              <span>Secure shopping</span>
            </li>
            <li className="flex items-center gap-x-2">
              <Zap size={20} />
              <span>Fast checkout</span>
            </li>
            <li className="flex items-center gap-x-2">
              <ClipboardClock size={20} />
              <span>Order tracking</span>
            </li>
          </ul>
        </div>
      ),
    });
  };
  //
  return (
    <nav className="py-2 w-full z-50 sticky top-0 left-0 border-b backdrop-blur-md border-[#dcebdc] bg-[rgba(255,255,255,0.94)]">
      <div className="mx-auto w-7xl">
        <div className="flex items-center justify-between py-2">
          <Link href="/" className="text-2xl font-bold text-[#1f7a1f]">
            কৃষি পন্য
          </Link>
          <ul className="flex gap-x-8 items-center">
            <li className="relative group transition duration-500 cursor-pointer">
              <ShoppingCart />
              <div className="top-[120%] left-[50%] absolute bg-white border border-[#dcebdc] shadow-[0_10px_30px_rgba(15,61,46,0.08)] p-6 hidden group-hover:block rounded-xl xl:w-60 transform -translate-x-1/2 after:content-[''] after:absolute after:top-[-8px] after:left-[50%] after:bg-white after:w-4 after:h-4 after:rotate-45 after:-translate-x-1/2 after:border-t after:border-l after:border-[#dcebdc]">
                <p className="font-medium inline-block">Your cart is empty</p>
              </div>
            </li>
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="cursor-pointer flex gap-x-2 items-center rounded-full px-3 py-2 border border-[#dcebdc] bg-white hover:bg-[#f6fbf4] text-[#163b1b]"
            >
              {mounted && theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <MoonStar size={18} />
              )}
              <span>
                {mounted && theme === "dark" ? "Light mode" : "Dark mode"}
              </span>
            </button>
            <button
              onClick={handleOpenSignIn}
              className="cursor-pointer flex gap-x-2 items-center rounded-full px-3 py-2 hover:bg-[#f6fbf4] text-[#163b1b]"
              
            >
              <User />
              <span>Sign In</span>
            </button>
          </ul>
        </div>

        <div className="flex items-center justify-between py-2">
          <ul className="flex gap-x-6">
            <li className="flex">
              <Menu />
              <span>All Categories</span>
            </li>
            <li>Find Factorys</li>
            <li>Order protections</li>
          </ul>
          <ul className="flex gap-x-6">
            <li>Become a Supplier</li>
            <li>Help Center</li>
            <li>App</li>
            <li>Sell on Crishi Ponno</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
