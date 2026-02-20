"use client";
import BarIcon from "@/public/icons/bar.png";
import Link from "next/link";
import Image from "next/image";
import CartIcon from "@/public/icons/shoppingCart.png";
import BangladeshIcon from "@/public/icons/bangladesh.png";
import LanguageIcon from "@/public/icons/language.png";
import UserIcon from "@/public/icons/user.png";
//
export default function Navbar() {
  //
  let user = false;
  //
  return (
    <nav className="py-2 bg-gray-50 absolute w-full z-50 sticky top-0 left-0">
      <div className="xl:w-7xl mx-auto ">
        <div className="flex items-center justify-between py-2">
          <Link href="/" className="text-2xl font-bold text-[#006A4E]">
            কৃষি পন্য
          </Link>
          <ul className="flex gap-x-8 items-center">
            <li className="relative group transition duration-500 cursor-pointer flex items-center">
              <span>Delevery To:</span>
              <Image
                src={BangladeshIcon}
                alt="Crishi Ponno Logo"
                width={32}
                height={32}
              />

              <div className="top-[120%] left-[50%] absolute bg-white p-6 hidden group-hover:block rounded border border-gray-300 shadow xl:w-100 transform -translate-x-1/2 after:content-[''] after:absolute after:top-[-8px] after:left-[50%] after:bg-white after:w-4 after:h-4 after:rotate-45 after:-translate-x-1/2 after:border-t after:border-l after:border-gray-300">
                <h3 className="font-medium text-xl">Specify your location</h3>
                <p>Shipping fees vary based on your location</p>
                <button className="w-full mx-auto rounded bg-[#006A4E] py-2 text-white mt-5 font-medium cursor-pointer">
                  Sign in to add Address
                </button>
                <div className="mt-3 flex items-center gap-x-3">
                  <hr className="inline-block w-full" />
                  <p className="text-center font-medium inline-block">Or</p>
                  <hr className="inline-block w-full" />
                </div>
                <form className="mt-5">
                  <select className="w-full py-2 px-2 outline-none border rounded">
                    <option value="bd">Bangladesh</option>
                    <option value="in">India</option>
                    <option value="pk">Pakistan</option>
                    <option value="lk">Sri Lanka</option>
                  </select>
                  <input
                    className="w-full py-2 px-2 outline-none border rounded mt-2"
                    placeholder="Enter Postal Code"
                    type="number"
                    required
                  />
                  <button
                    type="submit"
                    className="rounded w-full mx-auto bg-[#006A4E] text-white py-2 font-medium mt-5 cursor-pointer"
                  >
                    Save
                  </button>
                </form>
              </div>
            </li>
            <li className="relative group transition duration-500 cursor-pointer flex items-center gap-x-1">
              <Image
                src={LanguageIcon}
                alt="Language Icon"
                width={25}
                height={25}
                className="inline-block"
              />
              <span className="inline-block">English-BDT</span>
              <div className="top-[120%] left-[50%] absolute bg-white p-6 hidden group-hover:block rounded border border-gray-300 shadow xl:w-100 transform -translate-x-1/2 after:content-[''] after:absolute after:top-[-8px] after:left-[50%] after:bg-white after:w-4 after:h-4 after:rotate-45 after:-translate-x-1/2 after:border-t after:border-l after:border-gray-300">
                <h3 className="font-medium text-xl">
                  Set language and currency
                </h3>
                <p>
                  Select your preferred language and currency. You can update
                  the settings at any time.
                </p>
                <form className="mt-5">
                  <select className="w-full py-2 px-2 outline-none border rounded">
                    <option value="en">English</option>
                    <option value="bn">Bangla</option>
                    <option value="hi">Hindi</option>
                    <option value="ur">Urdu</option>
                  </select>
                  <select className="w-full py-2 px-2 outline-none border rounded mt-2">
                    <option value="bdt">BDT</option>
                    <option value="usd">USD</option>
                    <option value="inr">INR</option>
                    <option value="pkr">PKR</option>
                  </select>
                  <button
                    type="submit"
                    className="rounded w-full mx-auto bg-[#006A4E] text-white py-2 font-medium mt-5 cursor-pointer"
                  >
                    Save
                  </button>
                </form>
              </div>
            </li>
            <li className="relative group transition duration-500 cursor-pointer">
              <Image
                src={CartIcon}
                alt="Crishi Ponno Logo"
                width={32}
                height={32}
              />
              <div className="top-[120%] left-[50%] absolute bg-white p-6 hidden group-hover:block rounded border border-gray-300 shadow xl:w-60 transform -translate-x-1/2 after:content-[''] after:absolute after:top-[-8px] after:left-[50%] after:bg-white after:w-4 after:h-4 after:rotate-45 after:-translate-x-1/2 after:border-t after:border-l after:border-gray-300">
                <p className="font-medium inline-block">Your cart is empty</p>
              </div>
            </li>
            {user ? (
              <Link href={"/login"} className="flex gap-x-1 items-center">
                <Image src={UserIcon} alt="User Icon" width={20} height={20} />
                <span>Log out</span>
              </Link>
            ) : (
              <Link href={"/login"} className="flex gap-x-1 items-center">
                <Image src={UserIcon} alt="User Icon" width={20} height={20} />
                <span>Log in</span>
              </Link>
            )}
          </ul>
        </div>
        <div className="flex items-center justify-between py-2">
          <ul className="flex gap-x-6">
            <li className="flex">
              <Image src={BarIcon} alt="Bar Icon" />
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
