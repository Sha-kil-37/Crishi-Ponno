"use client";
//
import logo from "../../../../public/meta/logo.png";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useDialog } from "@/hooks/client/useDialog";
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
  Bell,
  Camera,
  Search,
} from "lucide-react";
import { Category } from "@/types/NavCategory";
import NavCategoryMenu from "./NavCategoryMenu";
import BecomeASupplier from "@/components/shared/BecomeASupplier";
import FindFactory from "@/components/shared/FindFactory";
import HelpCenter from "@/components/shared/HelpCenter";
import OrderProtection from "@/components/shared/OrderProtection";
import GoogleButton from "@/components/utils/GoogleButton";
import Image from "next/image";
//
interface NavbarProps {
  categories: Category[];
}
//
export default function Navbar({ categories }: NavbarProps) {
  //
  const { openDialog } = useDialog();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpenCategory, setIsOpenCategory] = useState(false);
  const [isOpenFindFactory, setIsOpenFindFactory] = useState(false);
  const [isOpenOrderProtection, setIsOpenOrderProtection] = useState(false);
  const [isOpenBecomeASupplier, setIsOpenBecomeASupplier] = useState(false);
  const [isOpenHelpCenter, setIsOpenHelpCenter] = useState(false);
  // handle theme and navbar search box
  useEffect(() => {
    setMounted(!mounted);
  }, []);

  // handle sign in dialog
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
  // handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log(file);
    }
  };
  // handle search input
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };
  // handle search box
  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("search in progress");
  };
  //
  return (
    <nav className="w-full z-50 sticky top-0 left-0 border-b backdrop-blur-md border-[#dcebdc] pt-3">
      <div className="mx-auto w-7xl">
        <div className="flex justify-between">
          <Link href="/" className="font-bold textxl" >
          Logo
            {/* <Image className="h-auto w-auto"  src={logo} alt="logo" /> */}
          </Link>

          <form
            onSubmit={handleSearch}
            className="animated-border shadow-[0_10px_30px_rgba(15,61,46,0.08)] flex justify-center overflow-x-hidden"
          >
            <div className="w-full flex ">
              <div className="p-2">
                <label htmlFor="searchValue">
                  <input
                    id="searchValue"
                    name="searchValue"
                    onChange={handleSearchInput}
                    type="text"
                    placeholder="Search for products"
                    className="outline-none inline-block"
                  />
                </label>
              </div>
              <div className="p-2">
                <label className="cursor-pointer" htmlFor="fileUpload">
                  <input
                    onChange={handleFileUpload}
                    maxLength={1}
                    id="fileUpload"
                    name="fileUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                  />
                  <Camera className="inline-block" />
                </label>
              </div>

              <button
                type="submit"
                // disabled={loading}
                className="px-2 cursor-pointer bg-[#F5F5F5]"
              >
                <Search className="h-full w-full" />
              </button>
            </div>
          </form>

          <ul className="flex items-center justify-between gap-x-4">
            <li className="relative group transition duration-500 cursor-pointer">
              <Bell />
              <div className="top-[120%] left-[50%] absolute bg-white border border-[#dcebdc] shadow-[0_10px_30px_rgba(15,61,46,0.08)] p-6 hidden group-hover:block rounded-xl xl:w-60 transform -translate-x-1/2 after:content-[''] after:absolute after:top-[-8px] after:left-[50%] after:bg-white after:w-4 after:h-4 after:rotate-45 after:-translate-x-1/2 after:border-t after:border-l after:border-[#dcebdc]">
                <p className="font-medium inline-block">Notification</p>
              </div>
            </li>
            <li className="relative group transition duration-500 cursor-pointer">
              <ShoppingCart />
              <div className="top-[120%] left-[50%] absolute bg-white border border-[#dcebdc] shadow-[0_10px_30px_rgba(15,61,46,0.08)] p-6 hidden group-hover:block rounded-xl xl:w-60 transform -translate-x-1/2 after:content-[''] after:absolute after:top-[-8px] after:left-[50%] after:bg-white after:w-4 after:h-4 after:rotate-45 after:-translate-x-1/2 after:border-t after:border-l after:border-[#dcebdc]">
                <p className="font-medium inline-block">Your cart is empty</p>
              </div>
            </li>
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="cursor-pointer"
            >
              {mounted && theme === "dark" ? (
                <Sun size={18} />
              ) : (
                <MoonStar size={18} />
              )}
            </button>
            <button onClick={handleOpenSignIn} className="cursor-pointer">
              <User />
            </button>
          </ul>
        </div>

        <div className="">
          <ul className="flex justify-between">
            <li
              onMouseEnter={() => setIsOpenCategory(true)}
              onMouseLeave={() => setIsOpenCategory(false)}
              className="py-3 cursor-pointer"
            >
              <button className="flex items-center gap-x-3 cursor-pointer">
                <Menu />
                <span>All Categories</span>
              </button>

              <AnimatePresence>
                {isOpenCategory && <NavCategoryMenu categories={categories} />}
              </AnimatePresence>
            </li>
            <li
              onMouseEnter={() => setIsOpenFindFactory(true)}
              onMouseLeave={() => setIsOpenFindFactory(false)}
              className="py-3 cursor-pointer"
            >
              {
                <AnimatePresence>
                  {isOpenFindFactory && <FindFactory />}
                </AnimatePresence>
              }
              Find Factorys
            </li>
            <li
              className="py-3 cursor-pointer"
              onMouseEnter={() => setIsOpenOrderProtection(true)}
              onMouseLeave={() => setIsOpenOrderProtection(false)}
            >
              {
                <AnimatePresence>
                  {isOpenOrderProtection && <OrderProtection />}
                </AnimatePresence>
              }
              Order Protections
            </li>
            <li
              className="py-3 cursor-pointer"
              onMouseEnter={() => setIsOpenBecomeASupplier(true)}
              onMouseLeave={() => setIsOpenBecomeASupplier(false)}
            >
              {
                <AnimatePresence>
                  {isOpenBecomeASupplier && <BecomeASupplier />}
                </AnimatePresence>
              }
              Become a Supplier
            </li>
            <li
              className="py-3 cursor-pointer"
              onMouseEnter={() => setIsOpenHelpCenter(true)}
              onMouseLeave={() => setIsOpenHelpCenter(false)}
            >
              {
                <AnimatePresence>
                  {isOpenHelpCenter && <HelpCenter />}
                </AnimatePresence>
              }
              Help Center
            </li>
            <li className="py-3 cursor-pointer">Sell on Crishi Ponno</li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
