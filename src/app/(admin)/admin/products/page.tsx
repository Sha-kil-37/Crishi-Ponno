import SearchBar from "@/components/shared/admin/SearchBar";

export default function Page() {
  //
  return (
    <main>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          Manage your agricultural products
        </h1>
        <button className="px-3 py-2 bg-[#1f7a1f] text-white cursor-pointer font-bold">
          Add Product
        </button>
      </div>
      <div className="flex justify-between items-center mt-5">
        <SearchBar />
        <h2>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium,
          exercitationem.
        </h2>
      </div>
    </main>
  );
}
