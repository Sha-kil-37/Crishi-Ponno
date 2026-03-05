import Banner from "@/components/ui/banner";
import dbConnect from "@/lib/dbConnect";


export default async function Page() {
  //

  await dbConnect()
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log(error);
      console.log("database connection faild")
    });

  //
  return (
    <section>
      <Banner />
    </section>
  );
}
