"use client";
//
import React from "react";
import { Search } from "lucide-react";
//
// interface SearchBarProps {
//   compact?: boolean;
// }

export default function SearchBar() {
  // handle file upload

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
    <form onSubmit={handleSearch} className="w-full">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative">
        <Search className="w-7 h-7 absolute left-0 top-[50%] transform translate-y-[-50%]" />
        <input
          onChange={handleSearchInput}
          type="text"
          id="search"
          name="search"
          placeholder="Search for products ...."
          className="w-full h-full px-10 py-3 outline-none"
        />
      </div>
    </form>
  );
}
