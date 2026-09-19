"use client";
//
import BannerSlider from "./BannerSlider";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Tranding from "./Tranding";
import BannerCategorys from "./BannerCategorys";
import Image from "next/image";
import { motion } from "motion/react";
import fruitsandvegetables from "../../../public/images/banner/fruits&vegetables.png";
import plantsandgardening from "../../../public/images/banner/plants&gardening.png";
import organicandrural from "../../../public/images/banner/organic&rural.png";
import seedsandpesticide from "../../../public/images/banner/seeds&pesticide.png";
import equevment from "../../../public/images/banner/equevment.png";
import advice from "../../../public/images/banner/advice.png";
import poultry from "../../../public/images/banner/poultry.png";
import fish from "../../../public/images/banner/fish.jpg";
import MultiSlider from "./MultiSlider";
import Feature from "./Feature";
import BannerAbout from "./BannerAbout";
//

//
export default function Banner() {
  //
  const bannerItems = [
    {
      id: 1,
      title: "Fruits & Vegetables",
      description: "Fresh and naturally grown fruits and vegetables",
      image: fruitsandvegetables,
      href: "/products?category=vegetables",
      position: "center",
    },
    {
      id: 2,
      title: "Plants & Gardening",
      description: "Healthy plants for your garden",
      image: plantsandgardening,
      href: "/products?category=plants",
      position: "center",
    },
    {
      id: 3,
      title: "Organic & Rural Products",
      description: "Natural agricultural products",
      image: organicandrural,
      href: "/products?category=organic",
      position: "center",
    },
    {
      id: 4,
      title: "Seeds & Pesticide",
      description: "Everything you need to grow",
      image: seedsandpesticide,
      href: "/products?category=seeds",
      position: "center",
    },
    {
      id: 5,
      title: "Agriculture Equevment",
      description: "Make easy agriculture",
      image: equevment,
      href: "/products?category=seeds",
      position: "center",
    },
    {
      id: 6,
      title: "Advice & Source",
      description: "Find solutions to agriculture-related problems.",
      image: advice,
      href: "/products?category=seeds",
      position: "center",
    },
    {
      id: 7,
      title: "Poultry and Livestock",
      description: "Organically produced",
      image: poultry,
      href: "/products?category=seeds",
      position: "center",
    },
    {
      id: 7,
      title: "Fish production",
      description: "Organically produced",
      image: fish,
      href: "/products?category=seeds",
      position: "center",
    },
  ];
  //
  return (
    <div>
      <BannerSlider />
      <BannerAbout />
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 px-2">
        {bannerItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5 }}
            className="group relative min-h-[420px] overflow-hidden  md:min-h-[520px]"
          >
            {/* Background Image */}
            <Image
              src={item.image}
              alt={item.title}
              fill
              priority={item.id <= 2}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/20 transition-colors duration-500 group-hover:bg-[#F5F5F5]" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center ">
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em]">
                Crishi Ponno
              </p>

              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                {item.title}
              </h2>

              <p className="mt-3 max-w-md text-sm  sm:text-base">
                {item.description}
              </p>

              <Link
                href={item.href}
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-all duration-300 hover:gap-3 hover:bg-green-600 hover:text-white"
              >
                Explore
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
      <BannerCategorys />
      <Feature />
      <MultiSlider />
      <Tranding />
      <div className="flex justify-between p-12 bg-[#F5F5F5] w-7xl mx-auto rounded-xl my-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Make shopping easier.
          </h2>
          <p className="mt-1">
            Enjoy the benefits of reliability, safe delivery, and hassle-free
            returns.
          </p>
        </div>
        <div>
          <Link
            href=""
            className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#1f7a3a] transition hover:bg-lime-100"
          >
            start now
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
