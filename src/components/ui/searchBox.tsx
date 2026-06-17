"use client";
import cameraIcon from "@/public/icons/camera.png";
import Image from "next/image";
import searchbar from "@/public/icons/searchBar.png";
import React from "react";
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
      className="p-4 border mt-5 xl:w-3xl mx-auto rounded-lg"
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
          <Image
            className="inline-block"
            src={cameraIcon}
            alt="Camera Icon"
            width={24}
            height={24}
          />
          <span className="inline-block ml-2">Image Search</span>
        </label>

        <button
          type="submit"
          className="bg-slate-200 px-4 py-2 rounded-lg flex items-center gap-x-2 cursor-pointer"
        >
          <Image
            className="inline-block"
            src={searchbar}
            alt="Search Icon"
            width={15}
            height={15}
          />
          <span className="inline-block font-medium">Search</span>
        </button>
      </div>
    </form>
  );
}
