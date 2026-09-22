"use client";
//
import Image from "next/image";
import banner from "../../../public/images/banner/banner.png";
import Link from "next/link";
//
function BannerAbout() {
  return (
    <div className="my-4">
      <div className="bg-[#F5F5F5] w-full pt-8">
        <h2 className="text-center font-bold text-5xl">কৃষি পন্য</h2>
        <h3 className="text-center text-2xl font-medium mt-5">Hello, hello.</h3>
        <p className="max-w-[500px] mx-auto  text-center">
          Lorem ipsum dtatibus provident. Lorem ipsum dtatibus provident. bus
          provident.
        </p>
        <div className="flex gap-x-4 justify-center mt-5">
          <Link
            href={"/about"}
            className="px-4 py-2 bg-blue-500 white rounded-full text-white font-medium"
          >
            About More
          </Link>
          <Link
            href={"/shop"}
            className="px-4 py-2 bg-white rounded-full font-medium"
          >
            View Product
          </Link>
        </div>
        <div className="overflow-hidden mx-auto h-auto max-w-200 mt-10">
          <Image
            className="h-full w-full object-cover"
            src={banner}
            alt="banner"
            loading="eager"
          />
        </div>
      </div>
    </div>
  );
}

export default BannerAbout;
