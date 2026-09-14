"use client";

import CategorysBanner from "./CategorysBanner";

//
export default function Banner() {
  //
  return (
    <div>
      <CategorysBanner />

      <div className="rounded-md bg-[#F5F5F5] mx-auto max-w-7xl flex justify-between p-6">
        <div>
          <h2 className="text-3xl font-bold">Shopping made easy</h2>
          <p>Enjoy reliability, secure deliveries and hassle-free returns.</p>
        </div>
        <div>
          <button className="px-4 py-1  bg-black text-white rounded-xl">
            start now
          </button>
        </div>
      </div>
      <div className="py-6"></div>
    </div>
  );
}
