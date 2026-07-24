"use client";
//
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useDialog } from "@/hooks/client/useDialog";
import GoogleButton from "../../utils/googleButton";
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
import SearchBox from "../../shared/searchBox";
import NavCategoryMenu from "./navCategoryMenu";
import { Category } from "@/types/navCategory";
import FindFactory from "@/components/shared/findFactory";
import OrderProtection from "@/components/shared/orderProtection";
import BecomeASupplier from "@/components/shared/becomeASupplier";
import HelpCenter from "@/components/shared/helpCenter";
//
interface NavbarProps {
  showNavboxSearch: boolean;
  categories: Category[];
}
//
export default function Navbar({ showNavboxSearch, categories }: NavbarProps) {
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

  //
  return (
    <nav className="w-full z-50 sticky top-0 left-0 border-b backdrop-blur-md border-[#dcebdc] pt-3">
      <div className="mx-auto w-7xl grid grid-cols-3 items-center">
        <div>
          <Link href="/" className="text-2xl font-bold text-[#1f7a1f]">
            কৃষি পন্য
          </Link>
          <ul className="flex gap-x-6">
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
          </ul>
        </div>

        <div className="flex justify-center">
          <AnimatePresence>
            {showNavboxSearch && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -20,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -20,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.25,
                }}
                // className="w-full max-w-xl"
              >
                <SearchBox compact />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="">
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
              className="cursor-pointer flex gap-x-2 items-center rounded-full px-3 py-2 hover:bg-[#f6fbf4]"
            >
              <User />
              <span>Sign In</span>
            </button>
          </ul>

          <ul className="flex gap-x-6">
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
