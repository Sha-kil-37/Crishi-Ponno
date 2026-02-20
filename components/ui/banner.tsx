"use client";

import SearchBox from "./searchBox";

//
export default function Banner() {
  return (
    <div className="xl:w-7xl mx-auto py-4">
      <div className="flex gap-x-6 justify-center">
        <h2 className="text-2xl font-bold">Ai Mode</h2>
        <h2 className="text-2xl font-bold">Products</h2>
      </div>
      <SearchBox />
    </div>
  );
}
