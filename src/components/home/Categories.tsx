import Link from "next/link";
//
function Categories() {
  //
  return (
    <section className="mt-10 py-10">
      <div className="mx-auto w-7xl text-center bg-blue-400 p-10 rounded-xl">
        <Link href={"/shop/categories"}>Find Categories</Link>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus
          quos aspernatur at autem quasi consequatur saepe ut vitae asperiores
          corrupti omnis dolores, alias dolore distinctio nobis voluptas
          deleniti? Iure eveniet id laborum, rem fugiat rerum tenetur cumque
          nulla est similique.
        </p>
      </div>
    </section>
  );
}

export default Categories;
