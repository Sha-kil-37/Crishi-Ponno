export default function Loading() {
  //
  // for (let index = 0; index < 10; index++) {
  //   console.log(index);
  // }
  return (
    <section className="h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-5xl text-blue-500 font-bold">Loading...</h1>
        <p>Please wait while we fetch the data. This may take a few moments.</p>
      </div>
    </section>
  );
}
