"use client";

import { Heart } from "lucide-react";

//

function AddToWatchList() {
  return (
    <button
      type="button"
      className="py-3 bg-[#F5F5F5] rounded-3xl font-medium mt-4 flex gap-x-2 items-center justify-center"
    >
      <Heart />
      Add To Watch List
    </button>
  );
}

export default AddToWatchList;
