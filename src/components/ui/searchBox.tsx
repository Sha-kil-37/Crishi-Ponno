"use client";
//
import React from "react";
import { Search, Camera } from "lucide-react";

//
export default function SearchBox() {
  const [file, setFile] = React.useState<File | null>(null);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  // Handle file upload
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Process the uploaded file (e.g., send it to the server or display it)
      setFile(file);
    }
  };
  // handleSearchInput
  const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  //   handle search form submission
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(file, searchQuery);
    // const formData = new FormData(event.currentTarget);
    // const query = formData.get("searchQuery") as string;
    // console.log("Search query:", query);
  };
  //
  return (
    <form
      onSubmit={handleSearch}
      className="animated-border p-6 mt-5 w-4xl mx-auto shadow-[0_10px_30px_rgba(15,61,46,0.08)]"
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
          className="bg-[linear-gradient(135deg,#1f7a1f_0%,#0f3d2e_100%)] border border-[#1f7a1f] transition-all duration-200 ease-in-out hover:-translate-y-px hover:shadow-[0_8px_20px_rgba(31,122,31,0.2)] hover:brightness-[1.03] px-4 py-2 rounded-lg flex items-center gap-x-2 cursor-pointer"
        >
          <Search className="text-white" />
          <span className="inline-block text-white font-medium">Search</span>
        </button>
      </div>
    </form>
  );
}
