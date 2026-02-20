import Banner from "@/components/ui/banner";
import dbConnect from "@/lib/dbConnect";
//
export default async function Page() {
  //
  await dbConnect()
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((err) => {
      console.log("database connection error:", err);
    });

  //
  return (
    <section className="">
      <Banner />
    </section>
  );
}
