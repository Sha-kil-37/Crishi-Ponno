"use client";
//
import React from "react";
import { Search, Camera } from "lucide-react";
//
interface SearchBoxProps {
  compact?: boolean;
}

export default function SearchBox({ compact = false }: SearchBoxProps) {
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
    <div className="w-full max-w-4xl mx-auto">
      <form
        onSubmit={handleSearch}
        className="animated-border p-6 mt-5 shadow-[0_10px_30px_rgba(15,61,46,0.08)]"
      >
        <input
          onChange={handleSearchInput}
          type="text"
          placeholder="Search for products"
          className="w-full outline-none"
        />
        <div className="mt-2 flex items-center justify-between">
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
            <span className="inline-block ml-2">Image Search</span>
          </label>

          <button
            type="submit"
            // disabled={loading}
            className="bg-[linear-gradient(135deg,#1f7a1f_0%,#0f3d2e_100%)] border border-[#1f7a1f] transition-all duration-200 ease-in-out hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(31,122,31,0.2)] hover:brightness-[1.03] px-4 py-2 rounded-lg flex items-center gap-x-2 cursor-pointer disabled:opacity-70"
          >
            <Search />
          </button>
        </div>
      </form>
    </div>
  );
}
